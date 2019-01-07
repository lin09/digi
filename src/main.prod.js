import * as utils from './utils'
import { createElement, createTextNode } from './dom'
import { createData  } from './data'
import { addPlugins } from './plugin'

/**
 * 把data转成元素添加为element的子元素
 * @param {Array|Object|String} data - data = tagName || { ...element } || [..., tagName, ..., { ...element }, ...];<br>
 *                                     扩展元素属性：{ child: 子元素, text: 文本节点 }，<br>
 *                                     child = [data1, ..., dataN] 或 data <br>
 *                                     文本节点的属性名为 'text' 或 'text' + 数字 { text: '内容', text0: '内容', text1: '内容', ... } <br>
 *                                     参数详情查看{@link createElement}
 * @param {Object|Undefined} element - 元素，默认为#digi元素或document.body，把data转成元素添加为其子元素
 * @example
 * import digi, { createData } from 'digi'
 *
 * // 创建监听数据
 * const data = createData({ a: 123 })
 *
 * // 添加元素
 * digi({ text: data.$tp('a') })
 *
 * console.log(document.body.lastChild.outerHTML)
 * // => <div>123</div>
 *
 * data.a = 321
 * // => watch a => newVal: 321, oldVal: 123
 *
 * console.log(document.body.lastChild.outerHTML)
 * // => <div>321</div>
 */
const digi = (data, element = digi.el) => {
  utils.isArray(data)
    ? utils.forEach(data, val => element.appendChild(createElement(val)))
    : element.appendChild(createElement(data))
}

Object.defineProperties(digi, {
  el: { value: document.getElementById('digi') || document.body },
  createElement: { value: createElement },
  createTextNode: { value: createTextNode },
  utils: { value: utils },
  createData: { value: createData },
  plugins: { value: addPlugins }
})

digi.el.$isUpdate = true
document.body.$isUpdate = true

const appendChild = document.appendChild
document.body.__proto__.__proto__.appendChild = function (child) {
  appendChild.call(this, child)
  child.$update && child.$update()
}

export default digi
