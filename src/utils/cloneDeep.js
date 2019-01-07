import { arrayTag, objectTag, getToStringTag } from './base/toStringTag'

/**
 * 克隆对象或数组
 * @function
 * @param {Array|Object} value - 源数据
 * @returns {Array|Object}     - 返回新的数据
 * @example
 * import { cloneDeep } from 'digi'
 *
 * const obj = { a: 123 }
 * const newObj = cloneDeep(obj)
 *
 * console.log(obj === newObj)
 * // => false
 * console.log(obj.a === newObj.a)
 * // => true
 */
export const cloneDeep = value => {
  const tag = getToStringTag(value)

  if (!(tag === arrayTag || tag === objectTag)) {
    return value
  }

  let rValue

  if (tag === objectTag) {
    rValue = { ...value }
  } else if (tag === arrayTag) {
    rValue = [ ...value ]
  }

  for (let key in rValue) {
    rValue[key] = cloneDeep(rValue[key])
  }

  return rValue
}
