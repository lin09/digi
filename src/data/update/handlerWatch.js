import { forEach } from '../../utils'
import { addWatch, removeWatch } from '../watchs'
import { removeFilter, restoreFilter } from '../filters'
import { updated } from './updated'

/**
 * 处理监听
 * @private
 * @param {Object}   element  - 元素
 * @param {string}   path     - 元素的属性名
 * @param {String}   template - 属性值模板
 * @param {Object}   tpData   - 模板匹配数据
 * @param {Function} callBack - 回调渲染后的值和路径，callBack(newVal, path)
 */
export const handlerWatch = (element, path, template, tpData, callBack) => {
  // 存储监听方法，用于元素移除时清除监听方法
  const watchFuns = {}
  // 存储过滤器id，用于元素移除时清除过滤器
  const filtersIds = []
  // 存储移除时的过滤器，用于恢复
  const filters = {}

  forEach(tpData, (item, tpPath) => {
    // 存储监听方法
    watchFuns[tpPath] = val => {
      item.val = val
      // 值变更，回调渲染后的值和路径
      updated(template, tpData, newVal => callBack(newVal, path))
    }

    // 存储过滤器
    forEach(item.tp, tp => tp.filterId && filtersIds.push(tp.filterId))
  })

  // 移除监听
  const $removeWatch = element.$removeWatch
  element.$removeWatch = () => {
    forEach(watchFuns, (fun, tpPath) => removeWatch(tpPath, fun))
    $removeWatch && $removeWatch()
  }
  // 恢复监听
  const $addWatch = element.$addWatch
  element.$addWatch = () => {
    forEach(watchFuns, (fun, tpPath) => addWatch(tpPath, fun))
    $addWatch && $addWatch()
  }
  // 移除过滤器
  const $removeFilter = element.$removeFilter
  element.$removeFilter = () => {
    forEach(filtersIds, id => filters[id] = removeFilter(id) || filters[id])
    $removeFilter && $removeFilter()
  }
  // 恢复过滤器
  const $restoreFilter = element.$restoreFilter
  element.$restoreFilter = () => {
    forEach(filters, (filter, id) => restoreFilter(id, filter))
    $restoreFilter && $restoreFilter()
  }
}
