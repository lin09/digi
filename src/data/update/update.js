import { forEach, isObject, pathJoin, isArray, isEmpty } from '../../utils'
import { handlerWatch } from './handlerWatch'

// 匹配路径和过滤器id正则
const tpRE = /{{(([\s\S]+?)(?:\|([0-9]+))?)}}/g

/**
 * 设置元素属性，如有模板会监听模板
 * @private
 * @function
 * @param {Object}   element  - 元素
 * @param {String}   path     - 元素的属性或路径
 * @param {Any}      value    - 属性值或模板
 * @param {Function} callBack - 回调值和路径，callBack(newVal, path)
 */
export const update = (element, path, value, callBack) => {
  if (isObject(value) || isArray(value)) {
    // 不能用element[path]，其可能是空或不是对象，所以组装路径
    forEach(value, (val, k) => update(element, pathJoin(path, k), val, callBack))
    return
  }
  // 回调路径和值
  callBack(value, path)

  // 模板数据，tpData = { val: 匹配模板最新值, tp: { [路径|id]: { RE: 匹配模板正则, filterId: 过滤器id }}};
  const tpData = {}

  // 暂存匹配数据
  let tp = ''
  do {
    //
    tp = tpRE.exec(value)
    if (tp !== null) {
      // 路径|id
      const key = tp[1]
      // 路径
      const tpPath = tp[2]
      if (!tpData[tpPath]) {
        tpData[tpPath] = { val: '', tp: {} }
      }
      if (!tpData[tpPath].tp[key]) {
        // 模板转正则
        tpData[tpPath].tp[key] = {
          RE: RegExp(tp[0].replace('|', '\\|'), 'g'),
          filterId: tp[3]
        }
      }
    }
  } while (tp !== null)

  // 处理监听
  !isEmpty(tpData) &&  handlerWatch(element, path, value, tpData, callBack)
}
