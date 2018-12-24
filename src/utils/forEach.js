/**
 * @module forEach
 */
/**
 * Iterates over elements of collection and invokes callBack for each element. The callBack is invoked with two arguments: (value, index|key). callBack functions may exit iteration early by explicitly returning false.
 * @function
 * @param {Array|Object} data - The collection to iterate over.
 * @param {Function} callBack - The function invoked per iteration.
   * @example
   * // npm
   * import { forEach } from 'digi'
   *
   * // cdn
   * var forEach = digi.utils.forEach
   *
   * forEach({ a: 1, b: 2 }, (value, key) => console.log(value, key))
   * // => a, 1
   * // => b, 2
 */
export const forEach = (data, callBack) => {
  for (const i in data) {
    if (callBack(data[i], i) === false) break
  }
}