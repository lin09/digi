import { forEach, isObject, isString, cloneDeep, isUndefined, isArray } from '../utils'
import { plugins } from '../plugin'
import { update } from './update'

export const createElement = data => {
  if (isString(data) || isUndefined(data)) {
    data = { tagName: data }
  }

  if (!isObject(data)) {
    window.console.error('createElement Error: ', data)
    return
  }

  const element = document.createElement(data.tagName || 'div')
  data = cloneDeep(data)
  delete data.tagName

  forEach(data, (value, key) => {
    if (plugins[key]) {
      plugins[key](element, value)
    }
    else if (key === 'child') {
      if (isArray(value)) {
        forEach(value, val => element.appendChild(createElement(val)))
      } else {
        element.appendChild(createElement(value))
      }
    }
    else if (isObject(value) || isObject(value)) {
      forEach(value, (val, k) => {
        element[key][k] = val
      })
      update(element, key, value)
    }
    else {
      element[key] = value
      isString(value) && update(element, key, value)
    }
  })

  return element
}

export default createElement
