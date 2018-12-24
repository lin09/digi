import { isString } from './objectType'
import { forEach } from './forEach'
/**
 * @module pick
 */

/**
 * Creates an object composed of the picked object properties.
 * @function
 * @param {Object} object The source object.
 * @param {string|string[]} paths The property paths to pick.
 * @returns {Object} Returns the new object.
 * @example
 * // npm
 * import { pick } from 'digi'
 *
 * // cdn
 * var pick = digi.utils.pick
 *
 * pick({ a: 1, b: 2, c: 3 }, ['a', 'b'])
 * // => { a: 1, b: 3 }
 */
export const pick = (object, paths) => {
  if (isString(paths)) {
    paths = [paths]
  }

  const newObj = {}

  forEach(paths, (path) => {
    if (object.hasOwnProperty(path)) {
      newObj[path] = object[path]
    }
  })

  return newObj
}
