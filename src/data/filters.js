import { isArray, forEach } from '../utils'
/**
 * 存储过滤器数据
 * filters[addFilter.id] = [filter1, ..., filterN]; filter = [handleFun, arg1, ..., arg2]
 * @private
 */
const filters = {}

/**
 * 添加过滤器数据
 * @private
 * @function
 * @param {Array} args - args = [filter1, ..., filterN]; filter = [handleFun, arg1, ..., arg2] || handleFun
 * @returns {Number}   - 返回id值
 */
export const addFilter = args => {
  const item = []
  forEach(args, filter => isArray(filter) ? item.push(filter) : item.push([filter]))

  filters[++ addFilter.id] = item

  return addFilter.id
}

/**
 * 累计id
 * @property {Number} addFilter.id 最后一个id值
 */
Object.defineProperty(addFilter, 'id', { value: 0, writable: true })

/**
 * 获取过滤器
 * @param {Number} id - {@link addFilter}返回的id
 * @returns {Array}   - 返回[[filter, arg1, ..., argN], ... ]
 */
export const getFilter = id => filters[id]

/**
 * 删除过滤器
 * @private
 * @function
 * @param {Number} id - {@link addFilter}返回的id
 * @returns {Array}   - 成功返回[[filter, arg1, ..., argN], ... ]，否则返回undefined
 */
export const removeFilter = id => {
  const filter = filters[id]
  delete filters[id]
  return filter
}

/**
 * 恢复过滤器
 * @private
 * @function
 * @param {Number} id     - {@link removeFilter}删除过滤器的id
 * @param {Array}  filter - {@link removeFilter}删除过滤器返回的数据
 */
export const restoreFilter = (id, filter) => filters[id] = filter
