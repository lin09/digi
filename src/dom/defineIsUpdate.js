import { handlerRemove } from './handlerRemove'
import { handlerRestore } from './handlerRestore'

/**
 * 给元素添加$isUpdate属性，true更新，false不是更新
 * @param {Object} element - 元素
 */
export const defineIsUpdate = element => {
  let isUpdate = false

  Object.defineProperty(element, '$isUpdate', {
    get: () => isUpdate,
    set: newVal => {
      if (newVal !== isUpdate) {
        if (newVal && element.parentNode && element.parentNode.$isUpdate) {
          isUpdate = newVal
          handlerRestore(element)
        } else if (!newVal) {
          isUpdate = newVal
          handlerRemove(element)
        }
      }
    }
  })

  // 移除元素
  const remove = element.remove
  element.remove = () => {
    element.$isUpdate = false
    remove.call(element)
  }
}