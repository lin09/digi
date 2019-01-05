import { objectEach } from './base/objectEach'
import tosTags, { getToStringTag } from './base/toStringTag'
import tofTags, { getTypeofTag } from './base/typeofTag'


// 生成函数
const fun = {}
const addFun = (tag, key, getTag) => {
  const newKey = 'is' + key[0].toUpperCase() + key.replace(/^.|Tag$/g, '')
  fun[newKey] = value => getTag(value) === tag
  // function name
  Object.defineProperty(fun[newKey], 'name', { value: newKey })
}
objectEach(tosTags, (tag, key) => addFun(tag, key, getToStringTag))
objectEach(tofTags, (tag, key) => addFun(tag, key, getTypeofTag))

export const {
  /**
   * 检查值是否为字符串类型
   * @function
   * @tutorial isString
   * @param {any} value 要检查的值
   * @returns {boolean} 是字符串返回true, 否则返回false
   * @example
   * import { isString } from 'digi'
   *
   * isString('1')
   * // => true
   * isString(1)
   * // => false
   */
  isString,

  /**
   * 检查值是否为对象类型
   * @function
   * @param {any} value 要检查的值
   * @returns {boolean} 是对象返回true, 否则返回false
   * @example
   * import { isObject } from 'digi'
   *
   * isObject({})
   * // => true
   * isObject([])
   * // => false
   */
  isObject,

  /**
   * typeof值是否为object
   * @function
   * @param {any} value 要typeof的值
   * @returns {boolean} 是object返回true, 否则返回false
   * @example
   * import { isTofObject } from 'digi'
   *
   * isTofObject({})
   * // => true
   * isTofObject([])
   * // => false
   */
  isTofObject,

  /**
   * 检查值是否为函数类型
   * @function
   * @param {any} value 要检查的值
   * @returns {boolean} 是函数返回true, 否则返回false
   * @example
   * import { isFunction } from 'digi'
   *
   * isFunction(isFunction)
   * // => true
   */
  isFunction,

  /**
   * 检查值是否为数组类型
   * @function
   * @param {any} value 要检查的值
   * @returns {boolean} 是数组返回true, 否则返回false
   * @example
   * import { isArray } from 'digi'
   *
   * isArray([])
   * // => true
   */
  isArray,

  /**
   * 检查值是否为数字类型
   * @function
   * @param {any} value 要检查的值
   * @returns {boolean} 是数字返回true, 否则返回false
   * @example
   * import { isNumber } from 'digi'
   *
   * isNumber(1)
   * // => true
   *
   * isNumber(NaN)
   * // => true
   *
   * isNumber('1')
   * // => false
   */
  isNumber,

  /**
   * 检查值是否为undefined
   * @function
   * @param {any} value 要检查的值
   * @returns {boolean} 是undefined返回true, 否则返回false
   * @example
   * import { isUndefined } from 'digi'
   *
   * isUndefined(undefined)
   * // => true
   *
   * isUndefined('undefined')
   * // => false
   */
  isUndefined,

  /**
   * 检查值是否为null
   * @function
   * @param {any} value 要检查的值
   * @returns {boolean} 是null返回true, 否则返回false
   * @example
   * import { isNull } from 'digi'
   *
   * isNull(null)
   * // => true
   *
   * isNull('null')
   * // => false
   */
  isNull
} = fun
