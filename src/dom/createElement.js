import { forEach, isObject, isString, cloneDeep, isUndefined, isArray } from '../utils'
import { plugins } from '../plugin'
import { update } from '../data'
import { createTextNode } from './createTextNode'

/**
 * 处理移除元素
 * @private
 * @param {Object} element    - 元素
 */
const handlerRemove = element => {
  element.$removeWatch && element.$removeWatch()
  element.$removeFilter && element.$removeFilter()
  forEach(element.childNodes, e => handlerRemove(e))
}

/**
 * 处理恢复元素
 * @private
 * @param {Object} element   - 元素
 */
const handlerRestore = element => {
  element.$restoreFilter && element.$restoreFilter()
  element.$addWatch && element.$addWatch()
  forEach(element.childNodes, e => handlerRestore(e))
}

/**
 * 创建element
 * @function
 * @param {String|Object|Undefined} data - data = tagName || { ...element }
 * @returns {Object}                     - 返回element
 * @example
 * import { createElement } from 'digi'
 *
 * let el = createElement()
 * console.log(el.outerHTML)
 * // => '<div></div>'
 *
 *  el = createElement('a')
 * console.log(el.outerHTML)
 * // => '<a></a>'
 *
 *  el = createElement({ tagName: 'a' })
 * console.log(el.outerHTML)
 * // => '<a></a>'
 *
 *  el = createElement({ text: '123', text2: 'aa' })
 * console.log(el.outerHTML)
 * // => '<div>123aa</div>'
 */
export const createElement = data => {
  if (isString(data) || isUndefined(data)) {
    data = { tagName: data }
  }

  if (!isObject(data)) {
    window.console.error('createElement Error: ', data)
    // window.console.log('see link ...')
    return
  }

  // 创建element，无tagName时默认为'div'
  const element = document.createElement(data.tagName || 'div')
  data = cloneDeep(data)
  delete data.tagName

  forEach(data, (value, key) => {
    if (plugins[key]) {
      // 调用插件
      plugins[key](element, value)
    }
    else if (key === 'child') {
      // 子元素
      if (isArray(value)) {
        forEach(value, val => element.appendChild(createElement(val)))
      } else {
        element.appendChild(createElement(value))
      }
    } else if (/^text[0-9]*$/.test(key)) {
      // 文本
      element.appendChild(createTextNode(value))
    }
    else {
      update(element, key, value)
    }
  })


  // 移除元素
  const remove = element.remove
  element.remove = () => {
    handlerRemove(element)
    remove.call(element)
  }

  // 恢复元素
  const oldUpdate = element.$update
  element.$update = () => {
    handlerRestore(element)
    oldUpdate && oldUpdate()
  }

  return element
}
