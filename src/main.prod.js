import * as utils from './utils'
import { createElement, createTextNode } from './dom'
import * as data from './data'
import { addPlugins } from './plugin'

/**
 * 把data转成元素添加为element的子元素
 * @param {array|object|string} data - data = tagName || { ...element } || [..., tagName, ..., { ...element }, ...]
 * @param {object|undefined} element - 元素，默认为#digi元素或document.body，把data转成元素添加为其子元素
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
  data: { value: data },
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
