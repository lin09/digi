const objectType = {
  stringTag: toString.call(''),
  // arrayTag: toString.call([]),
  // objectTag: toString.call({}),
  // numberTag: toString.call(1),
  // functionTag: toString.call(()=>{}),
  // booleanTag: toString.call(true),
  // undefineTag: toString.call(undefined),
  // nullTag: toString.call(null),
  // regExpTag: toString.call(new RegExp())
}

for (const key in objectType) {
  const newKey = 'is' + key[0].toUpperCase() + key.replace(/^.|Tag$/g, '')
  objectType[newKey] = (value) => {
    return toString.call(value) === objectType[key]
  }
}


export const {
  /**
   * @module isString
   */

  /**
   * Checks if value is classified as a String primitive or object.
   * @static
   * @function
   * @param {any} value The value to check.
   * @returns {boolean} Returns true if value is a string, else false.
   * @example
   * // npm
   * import { isString } from 'digi'
   *
   * // cdn
   * var isString = digi.utils.isString
   *
   * isString('1')
   * // => true
   */
  isString
} = objectType
