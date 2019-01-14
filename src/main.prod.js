import * as utils from './utils'
import { createElement, createTextNode } from './dom'
import { createData  } from './data'
import { addPlugins } from './plugin'
import { observe } from './observe'

/**
 * 把data转成元素添加为element的子元素
 * @param {Array|Object|String} data - data = tagName || { ...element } || [..., tagName, ..., { ...element }, ...];<br>
 *                                     扩展元素属性：{ child: 子元素, text: 文本节点 }，<br>
 *                                     child = [data1, ..., dataN] 或 data <br>
 *                                     子元素的属性名为 'child' 或 'child' + 数字 { child: 子元素, child0: 子元素, child1: 子元素, ... }; <br>
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
  if (utils.isArray(data)) {
    utils.forEach(data, val => {
      const el = createElement(val)
      el && element.appendChild(el)
    })
  } else {
    const el = createElement(data)
    el && element.appendChild(el)
  }
}

Object.defineProperties(digi, {
  el: { value: document.getElementById('digi') || document.body },
  createElement: { value: createElement },
  createTextNode: { value: createTextNode },
  utils: { value: {} },
  createData: { value: createData },
  plugins: { value: addPlugins }
})
utils.forEach(utils, (value, key) => {
  Object.defineProperty(digi.utils, key, { value, enumerable: true })
})

digi.el.$isUpdate = true
document.body.$isUpdate = true

// 监听document.body.childNode变化
observe()

export default digi
