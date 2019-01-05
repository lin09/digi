import { addFilter } from './filters'

/**
 * 生成渲染模板并存储过滤器
 * @function
 * @param {String} path 对象属性路径
 * @param  {...([Function,...String]|Function)} filters 过滤器 filters = [filter1, ..., filterN]; filter = fun || [fun, arg1, ..., argN]
 */
export const createTemplates = (path, ...filters) => {
  if (filters.length === 0) {
    // 无过滤器，返回`{{监听对象路径}}`
    return `{{${path}}}`
  }

  const filterId = addFilter(filters)
  // 有过滤器，返回`{{监听对象路径|过滤器id}}`
  return `{{${path}|${filterId}}}`
}
