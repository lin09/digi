import { forEach, isObject, isString, cloneDeep, isUndefined, isArray, set } from '../utils'
import { plugins } from '../plugin'
import { update } from '../data'
import { updateValue } from './updateValue'
import { createTextNode } from './createTextNode'
import { defineIsUpdate } from './defineIsUpdate'
import { version } from '../../package.json'

// 匹配为文本节点的属性名
const textKeyRE = /^text(Content)*[0-9]*$/
// 匹配为子元素的属性名
const childKeyRE = /^child[0-9]*$/

/**
 * 创建元素
 * @function
 * @param {String|Object|Undefined} data - data = tagName || { ...元素属性 };<br>
 *                                         扩展元素属性：{ child: 子元素, text: 文本节点 };<br>
 *                                         child = data 或 [data1, ..., dataN]; <br>
 *                                         子元素的属性名为 'child' 或 'child' + 数字 { child: 子元素, child0: 子元素, child1: 子元素, ... }; <br>
 *                                         文本节点的属性名为 'text' 或 'text' + 数字 { text: '内容', text0: '内容', text1: '内容', ... }; <br>
 *                                         注意：值为字符串会调用setAttribute，例外['value', 'className'].indexOf(key) === -1，例外后继会添加
 * @param {String|Undefined}        ptn  - 父元素的tagName，父元素的tagName为svg时必需传
 * @returns {Object}                     - 返回元素
 * @example
 * import { createElement } from 'digi'
 *
 * let el = createElement()
 * console.log(el.outerHTML)
 * // => '<div></div>'
 *
 * el = createElement('a')
 * console.log(el.outerHTML)
 * // => '<a></a>'
 *
 * el = createElement({ tagName: 'a' })
 * console.log(el.outerHTML)
 * // => '<a></a>'
 *
 * // 子元素1
 * el = createElement({ child: 'a' })
 * console.log(el.outerHTML)
 * // => '<div><a></a></div>'
 *
 * // 子元素2
 * el = createElement({ child: { tagName: 'a' } })
 * console.log(el.outerHTML)
 * // => '<div><a></a></div>'
 *
 * // 子元素3
 * el = createElement({ child: [{ tagName: 'a' }, 'p'] })
 * console.log(el.outerHTML)
 * // => '<div><a></a><p></p></div>'
 *
 * // 文本节点
 * el = createElement({ text: '123', text2: 'aa' })
 * console.log(el.outerHTML)
 * // => '<div>123aa</div>'
 */
export const createElement = (data, ptn) => {
  if (isString(data) || isUndefined(data)) {
    data = { tagName: data }
  }

  if (!isObject(data)) {
    window.console.error('createElement Error: ', data)
    window.console.log(`View document: https://digi1874.github.io/digi-doc/${ version }/global.html#digi`)
    return
  }

  // 创建element，无tagName时默认为'div'
  ptn = ptn === 'svg' ? 'svg' : data.tagName === 'svg' ? 'svg' : ''
  const element = ptn === 'svg' ?
    document.createElementNS('http://www.w3.org/2000/svg', data.tagName) :
    document.createElement(data.tagName || 'div')
  data = cloneDeep(data)
  delete data.tagName

  forEach(data, (value, key) => {
    if (childKeyRE.test(key)) {
      // 子元素
      if (isArray(value)) {
        forEach(value, val => {
          const el = createElement(val, ptn)
          el && element.appendChild(el)
        })
      } else {
        const el = createElement(value, ptn)
        el && element.appendChild(el)
      }
    } else if (textKeyRE.test(key)) {
      // 文本
      const text = createTextNode(value)
      text && element.appendChild(text)
    }
    else {
      update(element, key, value, (newVal, path) => {
        value = updateValue(value, key, path, newVal)
        if (Object.prototype.hasOwnProperty.call(plugins, key)) {
          // 调用插件
          plugins[key](element, value, path, newVal)
        } else if (['value', 'className'].indexOf(key) === -1 && isString(value)) {
          element.setAttribute(key, value)
        } else {
          set(element, path, newVal)
        }
      })
    }
  })

  defineIsUpdate(element)

  return element
}
