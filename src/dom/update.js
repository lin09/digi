import { forEach, isTofObject, isUndefined, isNull, isObject, set } from '../utils'
import { addWatch, removeWatch } from '../data'
// [ => \u005b , ] => \u005d
const tpRE = /{{((\w|[-.\u005b\u005d])+)}}/g

const updated = (element, key, template, tpObj) => {
  let newVal = template
  forEach(tpObj, (item) => {
    let val = item.val
    if (isTofObject(val)) {
      val = JSON.stringify(val)
    } else if (isUndefined(val) || isNull(val)) {
      val = ''
    }

    newVal = newVal.replace(item.RE, val)
  })
  set(element, key, newVal)
}

export const update = (element, key, template) => {
  if (isObject(template)) {
    forEach(template, (val, k) => update(element, key + '.' + k, val))
    return
  }

  const tpObj = {}

  let tp = ''
  do {
    tp = tpRE.exec(template)
    if (tp !== null) {
      tpObj[tp[1]] = {
        RE: RegExp(tp[0].replace(/(\u005b|\u005d|\.)/g, '\\$1'), 'g'),
        val: ''
      }
    }
  } while (tp !== null)

  const watchFuns = {}

  forEach(tpObj, (item, k) => {
    const fun = (val) => {
      item.val = val
      updated(element, key, template, tpObj)
    }
    watchFuns[k] = fun
    addWatch(k, fun)
  })

  if (JSON.stringify(tpObj) !== JSON.stringify({})) {
    element.oldRemove = element.remove
    element.remove = () => {
      forEach(watchFuns, (fun, k) => removeWatch(k, fun))
      element.oldRemove()
    }
  }
}