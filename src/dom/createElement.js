import { forEach, isObject, isString, cloneDeep } from '../utils'
import { addWatch } from '../data'
const tpRE = /{{((\w|[-.\[\]])+)}}/g

export const createElement = data => {
  if (isString(data)) {
    data = { tagName: data }
  }

  if (!isObject(data)) {
    console.error('createElement Error: ', data)
    return
  }

  const element = document.createElement(data.tagName || 'div')
  data = cloneDeep(data)
  delete data.tagName

  forEach(data, (value, key) => {
    if (isString(value)) {
      let tp = ''
      let valObj = {}
      do {
        tp = tpRE.exec(value)
        if (tp !== null) {
          valObj[tp[1]] = {
            key: tp[1],
            RE: RegExp(tp[0].replace(/(\[|\]|\.)/g, '\\$1'), 'g'),
            val: ''
          }
        }
      } while (tp !== null)

      const updated = () => {
        let newVal = value
        forEach(valObj, (item) => {
          newVal = newVal.replace(item.RE, item.val)
        })
        element[key] = newVal
      }

      forEach(valObj, (item, k) => {
        addWatch(k, (val) => {
          item.val = val
          updated()
        })
      })
    } else if (key === 'children') {} else {
      element[key] = value
    }
  })

  return element
}
