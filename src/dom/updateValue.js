import { set, isTofObject } from '../utils'

/**
 * 更新属性值
 * @private
 * @function
 * @param {Any}    value  - 属性值
 * @param {String} key    - 属性名
 * @param {String} path   - 路径
 * @param {Any}    newVal - 路径对应的更新值
 */
export const updateValue = (value, key, path, newVal) => {
  if (isTofObject(value) && key !== path) {
    set(value, path.replace(key + '.', ''), newVal)
    return value
  } else {
    return newVal
  }
}
