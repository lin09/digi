import { objectEach } from './base/objectEach'
import tosTags, { getToStringTag } from './base/toStringTag'
import tofTags, { getTypeofTag } from './base/typeofTag'


// 生成函数
const fun = {}
const addFun = (tag, key, getFun) => {
  const newKey = 'is' + key[0].toUpperCase() + key.replace(/^.|Tag$/g, '')
  fun[newKey] = value => getFun(value) === tag
  // function name
  Object.defineProperty(fun[newKey], 'name', { value: newKey })
}
objectEach(tosTags, (tag, key) => addFun(tag, key, getToStringTag))
objectEach(tofTags, (tag, key) => addFun(tag, key, getTypeofTag))

export const {
  /**
   * @module isString
   */
  /**
   * 检查值是否为字符串类型
   * @static
   * @function
   * @param {any} value 要检查的值
   * @returns {boolean} 是字符串返回true, 否则返回false
   * @example
   * // npm
   * import { isString } from 'digi'
   *
   * // cdn
   * var isString = digi.$utils.isString
   *
   * isString('1')
   * // => true
   * isString(1)
   * // => false
   */
  isString,

  /**
   * @module isObject
   */
  /**
   * 检查值是否为对象类型
   * @static
   * @function
   * @param {any} value 要检查的值
   * @returns {boolean} 是对象返回true, 否则返回false
   * @example
   * // npm
   * import { isObject } from 'digi'
   *
   * // cdn
   * var isObject = digi.$utils.isObject
   *
   * isObject({})
   * // => true
   * isObject([])
   * // => false
   */
  isObject,

  /**
   * @module isTofObject
   */
  /**
   * typeof值是否为object
   * @static
   * @function
   * @param {any} value 要typeof的值
   * @returns {boolean} 是object返回true, 否则返回false
   * @example
   * // npm
   * import { isTofObject } from 'digi'
   *
   * // cdn
   * var isTofObject = digi.$utils.isTofObject
   *
   * isTofObject({})
   * // => true
   * isTofObject([])
   * // => false
   */
  isTofObject,

  /**
   * @module isFunction
   */
  /**
   * 检查值是否为函数类型
   * @static
   * @function
   * @param {any} value 要检查的值
   * @returns {boolean} 是函数返回true, 否则返回false
   * @example
   * // npm
   * import { isFunction } from 'digi'
   *
   * // cdn
   * var isFunction = digi.$utils.isFunction
   *
   * isFunction(isFunction)
   * // => true
   */
  isFunction,

  /**
   * @module isArray
   */
  /**
   * 检查值是否为数组类型
   * @static
   * @function
   * @param {any} value 要检查的值
   * @returns {boolean} 是数组返回true, 否则返回false
   * @example
   * // npm
   * import { isArray } from 'digi'
   *
   * // cdn
   * var isArray = digi.$utils.isArray
   *
   * isArray([])
   * // => true
   */
  isArray,

  /**
   * @module isNumber
   */
  /**
   * 检查值是否为数字类型
   * @static
   * @function
   * @param {any} value 要检查的值
   * @returns {boolean} 是数字返回true, 否则返回false
   * @example
   * // npm
   * import { isNumber } from 'digi'
   *
   * // cdn
   * var isNumber = digi.$utils.isNumber
   *
   * isNumber(1)
   * // => true
   *
   * isNumber('1')
   * // => false
   */
  isNumber,

  /**
   * @module isUndefined
   */
  /**
   * 检查值是否为数字类型
   * @static
   * @function
   * @param {any} value 要检查的值
   * @returns {boolean} 是数字返回true, 否则返回false
   * @example
   * // npm
   * import { isUndefined } from 'digi'
   *
   * // cdn
   * var isUndefined = digi.$utils.isUndefined
   *
   * isUndefined(undefined)
   * // => true
   *
   * isUndefined('undefined')
   * // => false
   */
  isUndefined,

  /**
   * @module isNull
   */
  /**
   * 检查值是否为数字类型
   * @static
   * @function
   * @param {any} value 要检查的值
   * @returns {boolean} 是数字返回true, 否则返回false
   * @example
   * // npm
   * import { isNull } from 'digi'
   *
   * // cdn
   * var isNull = digi.$utils.isNull
   *
   * isNull(undefined)
   * // => true
   *
   * isNull('undefined')
   * // => false
   */
  isNull
} = fun
