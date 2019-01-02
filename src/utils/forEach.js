import { arrayTag, getToStringTag } from './base/toStringTag'
import { arrayEach } from './base/arrayEach'
import { objectEach } from './base/objectEach'

/**
 * @module forEach
 */
/**
 * 遍历对象或数组，每遍历一个值调用callBack(value, key|index)，callBack 返回 false 可提前结束遍历。
 * @function
 * @param {Array|Object} data 要遍历的对象或数组
 * @param {Function} callBack 每遍历一个值调用的函数
 * @example
 * // npm
 * import { forEach } from 'digi'
 *
 * // cdn
 * var forEach = digi.utils.forEach
 *
 * var obj = { a: 1, b: 2 }
 * forEach(obj, (value, key) => console.log(value, key))
 * // => a, 1
 * // => b, 2
 *
 * forEach(obj, (value, key) => {
 *   console.log(value, key)
 *   return false   // 提前结束遍历
 * })
 * // => a, 1
 */
export const forEach = (data, callBack) => {
  if (getToStringTag(data) === arrayTag) {
    arrayEach(data, callBack)
  } else {
    objectEach(data, callBack)
  }
}
