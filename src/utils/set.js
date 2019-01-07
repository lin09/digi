import { pathSplit } from './path'
import { isString, isUndefined } from './objectType'
import { forEach } from './forEach'

/**
 * 设置对象或数组属性值
 * @function
 * @param {Object|Array} data  - 将要被改变属性的数据源
 * @param {String|Array} paths - 属性路径
 * @param {Any} value          - 属性值
 * @example
 * import { set } from 'digi'
 *
 * const obj = {}
 * set(obj, 'a.b.c', 123)
 * console.log(obj)
 * // => { a: { b: { c: 123 } } }
 *
 * set(obj, ['a', 'b', 'c'], 321)
 * console.log(obj)
 * // => { a: { b: { c: 321 } } }
 */
export const set = (data, paths, value) => {
  if (isString(paths)) {
    paths = pathSplit(paths)
  }

  let obj = data
  const lastPath = paths.pop()
  forEach(paths, path => {
    if (isUndefined(obj[path])) {
      obj[path] = {}
    }
    obj = obj[path]
  })
  obj[lastPath] = value
}
