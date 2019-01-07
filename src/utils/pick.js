import { isString } from './objectType'
import { forEach } from './forEach'

/**
 * 选择对象中的一些属性组成新的对象
 * @function
 * @param {Object} object      - 源对象
 * @param {String|Array} paths - 要选择的属性路径
 * @returns {Object}           - 返回新的对象
 * @example
 * import { pick } from 'digi'
 *
 * var obj = { a: 1, b: 2, c: 3 }
 * pick(obj, 'a')
 * // => { a: 1}
 *
 * pick(obj, ['a', 'b'])
 * // => { a: 1, b: 3 }
 */
export const pick = (object, paths) => {
  if (isString(paths)) {
    paths = [paths]
  }

  const newObj = {}

  forEach(paths, path => {
    if (object.hasOwnProperty(path)) {
      newObj[path] = object[path]
    }
  })

  return newObj
}
