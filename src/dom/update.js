import { forEach, isTofObject, isUndefined, isNull, isObject, set, pathJoin } from '../utils'
import { addWatch, removeWatch, filters, removeFilter } from '../data'
const tpRE = /{{([\s\S]+?)(?:\|([0-9]+))?}}/g

const updated = (element, key, template, tpObj) => {
  let newVal = template
  forEach(tpObj, (item) => {
    let val = item.val

    if (item.filterId) {
      forEach(filters[item.filterId], args => {
        args = [ ...args ]
        const filter = args[0]
        args[0] = val
        val = filter(...args)
      })
    }

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
    forEach(template, (val, k) => update(element, pathJoin(key, k), val))
    return
  }

  const tpObj = {}
  const filtersIds = []

  let tp = ''
  do {
    tp = tpRE.exec(template)
    if (tp !== null) {
      tpObj[tp[1]] = {
        RE: RegExp(tp[0].replace('|', '\\|'), 'g'),
        val: '',
        filterId: tp[2]
      }

      tp[2] && filtersIds.push(tp[2])
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
      forEach(filtersIds, id => { removeFilter(id) })
      element.oldRemove()
    }
  }
}