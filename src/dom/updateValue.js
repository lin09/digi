import { set, isTofObject } from '../utils'

export const updateValue = (value, key, path, newVal) => {
  if (isTofObject(value)) {
    set(value, path.replace(key + '.', ''), newVal)
    return value
  } else {
    return newVal
  }
}
