import { update } from '../data'
import { defineIsUpdate } from './defineIsUpdate'

/**
 * 创建文本节点
 * @function
 * @param {String} text - 节点的文本
 * @returns {Object}    - 返回文本节点
 * @example
 * import { createTextNode, createData } from 'digi'
 *
 * const data = createData({ a: 123 })
 * const textNode = createTextNode(data.$tp('a'))
 *
 * // 没有添加到页面的元素不更新
 * console.log(textNode.nodeValue)
 * // => {{1.a}}
 *
 * // 添加到页面，自动更新
 * document.body.appendChild(textNode)
 * console.log(textNode.nodeValue)
 * // => 123
 *
 * // 可自动更新
 * data.a = 321
 * console.log(textNode.nodeValue)
 * // => 321
 */
export const createTextNode = text => {
  const textNode = document.createTextNode(text)
  update(textNode, 'nodeValue', text, newValue => textNode.nodeValue = newValue)
  defineIsUpdate(textNode)

  return textNode
}
