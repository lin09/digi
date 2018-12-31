import { forEach, isTofObject, isUndefined, isNull } from '../utils'
import { addWatch } from '../data'
const tpRE = /{{((\w|[-.\[\]])+)}}/g

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
  element[key] = newVal
}

export const update = (element, key, template) => {
  let tp = ''
  let tpObj = {}

  do {
    tp = tpRE.exec(template)
    if (tp !== null) {
      tpObj[tp[1]] = {
        key: tp[1],
        RE: RegExp(tp[0].replace(/(\[|\]|\.)/g, '\\$1'), 'g'),
        val: ''
      }
    }
  } while (tp !== null)

  forEach(tpObj, (item, k) => {
    addWatch(k, (val) => {
      item.val = val
      updated(element, key, template, tpObj)
    })
  })
}