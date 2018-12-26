import { objectEach } from './base/objectEach'
import tags from './base/objectTag'

// 生成函数
const fun = {}
objectEach(tags, (tag, key) => {
  const newKey = 'is' + key[0].toUpperCase() + key.replace(/^.|Tag$/g, '')
  fun[newKey] = (value) => {
    return toString.call(value) === tag
  }
  // function name
  Object.defineProperty(fun[newKey], 'name', { value: newKey })
})

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
   * var isString = digi.utils.isString
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
   * var isObject = digi.utils.isObject
   *
   * object({})
   * // => true
   * object([])
   * // => false
   */
  isObject
} = fun
