// [ = \u005b ； ] = \u005d
// 匹配中括号
const bracketRE = /[\u005b\u005d]/g
// 匹配多个点
const pointsRE = /\.{2,}/g
// 匹配前后点
const beforeAndAfterRE = /^\.|\.$/g

/**
 * 数组和对象的路径都用“.”分隔。
 * 1、path.join('.')，2、中括号替换为点，3、多点替换为一个点，4、去掉前后点
 * @function
 * @param {[]string} paths 路径
 * @returns {string} 新的路径
 */
export const pathJoin = (...paths) => paths.join('.').replace(bracketRE, '.').replace(pointsRE, '.').replace(beforeAndAfterRE, '')

export const pathSplit = path => path.replace(bracketRE, '.').replace(pointsRE, '.').replace(beforeAndAfterRE, '').split('.')