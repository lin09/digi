import { forEach, isObject, isString, cloneDeep } from '../utils'
import { update } from './update'

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
    element[key] = value

    if (isString(value)) {
      update(element, key, value)
    } else if (key === 'children') {} else {
    }
  })

  return element
}

export default createElement
