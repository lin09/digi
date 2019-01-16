import { handlerRemove } from './handlerRemove'
import { handlerRestore } from './handlerRestore'

/**
 * 给元素添加$isUpdate属性，true更新，false不是更新
 * @private
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
}