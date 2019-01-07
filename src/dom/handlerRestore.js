import { forEach } from '../utils'

/**
 * 处理恢复元素
 * @private
 * @param {Object} element - 元素
 */
export const handlerRestore = element => {
  // 父元素是更新状态
  if (!element.$isUpdate && element.parentNode && element.parentNode.$isUpdate) {
    // 标记元素状态更新
    element.$isUpdate = true
    // 优先恢复过滤器
    element.$restoreFilter && element.$restoreFilter()
    // 恢复监听
    element.$addWatch && element.$addWatch()
    // 继续处理子元素
    forEach(element.childNodes, e => handlerRestore(e))
  }
}
