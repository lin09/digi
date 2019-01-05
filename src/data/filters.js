import { isArray, forEach } from '../utils'
/**
 * 存储过滤器数据
 * filters[addFilter.id] = [filter1, ..., filterN]; filter = [handleFun, arg1, ..., arg2]
 */
export const filters = {}
window.filters = filters

/**
 * 添加过滤器数据
 * @function
 * @param {Array} args args = [filter1, ..., filterN]; filter = [handleFun, arg1, ..., arg2] || handleFun
 * @returns {Number} 返回id值
 */
export const addFilter = args => {
  const item = []
  forEach(args, filter => {
    if (isArray(filter)) {
      item.push(filter)
    } else {
      item.push([filter])
    }
  })

  filters[++ addFilter.id] = item

  return addFilter.id
}

/**
 * 累计id
 * @property {Number} addFilter.id 最后一个id值
 */
Object.defineProperty(addFilter, 'id', { value: 0, writable: true })

/**
 * 删除过滤器
 * @function
 * @param {Number} id {@link addFilter}返回的id
 * @returns {Boolean} 删除成功返回true，否则false
 */
export const removeFilter = id => delete filters[id]
