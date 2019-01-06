import * as utils from './utils'
import { createElement } from './dom'
import * as data from './data'
import { addPlugins } from './plugin'

const digiEl = document.getElementById('digi')

/**
 * 把data转成元素添加为element的子元素
 * @param {array|object|string} data - data = tagName || { ...element } || [..., tagName, ..., { ...element }, ...]
 * @param {object|undefined} element - 元素，默认为#digi元素或document.body，把data转成元素添加为其子元素
 */
const digi = (data, element = digiEl || document.body) => {
  utils.isArray(data)
    ? utils.forEach(data, val => element.appendChild(createElement(val)))
    : element.appendChild(createElement(data))
}

digi.createElement = createElement
digi.utils = utils
digi.data = data
digi.plugins = addPlugins

const appendChild = document.appendChild
document.body.__proto__.__proto__.appendChild = function (child) {
  appendChild.call(this, child)
  child.$update && child.$update()
}

export default digi
