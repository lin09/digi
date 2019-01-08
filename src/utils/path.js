// [ = \u005b ； ] = \u005d
// 匹配中括号
const bracketRE = /[\u005b\u005d]/g
// 匹配多个点
const pointsRE = /\.{2,}/g
// 匹配前后点
const beforeAndAfterRE = /^\.|\.$/g

/**
 * 接连路径<br>
 * @function
 * @param {Array} paths - 多个路径
 * @returns {String}    - 返回连接成的新路径; 数组和对象的路径都用“.”分隔: 1、paths.join('.')，2、中括号替换为点，3、多点替换为一个点，4、去掉前后点
 * @example
 * import { pathJoin } from 'digi'
 *
 * console.log(pathJoin(a, '[1].b'))
 * // => a.1.b
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
