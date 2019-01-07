import { forEach } from '../utils'

/**
 * 处理移除元素
 * @private
 * @param {Object} element - 元素
 */
export const handlerRemove = element => {
  if (element.$isUpdate) {
    // 移除监听
    element.$removeWatch && element.$removeWatch()
    // 移除过滤器
    element.$removeFilter && element.$removeFilter()
    // 继续处理子元素
    forEach(element.childNodes, e => handlerRemove(e))
    // 标记元素状态为不更新
    element.$isUpdate = false
  }
}
