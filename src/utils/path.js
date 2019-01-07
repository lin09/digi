// [ = \u005b ； ] = \u005d
// 匹配中括号
const bracketRE = /[\u005b\u005d]/g
// 匹配多个点
const pointsRE = /\.{2,}/g
// 匹配前后点
const beforeAndAfterRE = /^\.|\.$/g

/**
 * 把数组路径转成字符串路径<br>
 * 数组和对象的路径都用“.”分隔: 1、path.join('.')，2、中括号替换为点，3、多点替换为一个点，4、去掉前后点
 * @function
 * @param {Array} paths - 数组路径
 * @returns {String}    - 字符串路径
 * @example
 * import { pathJoin } from 'digi'
 *
 * console.log(pathJoin(['a', 1]))
 * // => a.1
 */
export const pathJoin = (...paths) => paths.join('.').replace(bracketRE, '.').replace(pointsRE, '.').replace(beforeAndAfterRE, '')

/**
 * 将路径转成数组
 * @function
 * @param {String} paths - 字符串路径
 * @returns {Array}      - 数组路径
 * @example
 * import { pathSplit } from 'digi'
 *
 * console.log(pathSplit('a[1]'))
 * // => ['a', '1']
 */
export const pathSplit = path => path.replace(bracketRE, '.').replace(pointsRE, '.').replace(beforeAndAfterRE, '').split('.')