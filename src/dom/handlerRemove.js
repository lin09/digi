import { forEach } from '../utils'

/**
 * 处理移除元素
 * @private
 * @param {Object} element - 元素
 */
export const handlerRemove = element => {
  // 移除监听
  element.$removeWatch && element.$removeWatch()
  // 移除过滤器
  element.$removeFilter && element.$removeFilter()
  // 继续处理子元素
  forEach(element.childNodes, e => e.$isUpdate = false)
}
