import { forEach, isTofObject, isUndefined, isNull, isObject, pathJoin, isArray, isEmpty } from '../utils'
import { addWatch, removeWatch } from './watchs'
import { getFilter, removeFilter, restoreFilter } from './filters'

// 匹配路径和过滤器id正则
const tpRE = /{{(([\s\S]+?)(?:\|([0-9]+))?)}}/g

/**
 * 正则渲染元素
 * @private
 * @param {Object} element    - 元素
 * @param {String} template   - 属性值模板
 * @param {Object} tpData     - 模板数据，tpData = { val: 匹配模板最新值, tp: { [路径|id]: { RE: 匹配模板正则, filterId: 过滤器id }, ... }};
 * @param {Function} callBack - 回调渲染后的值，callBack(newVal)
 */
const updated = (template, tpData, callBack) => {
  // 属性值
  let newVal = template
  forEach(tpData, item => {
    forEach(item.tp, tp => {
      let val = item.val

      if (tp.filterId) {
        forEach(getFilter(tp.filterId), args => {
          // 数组第1个是过滤器，后面的是参数
          args = [ ...args ]
          const filter = args[0]
          args[0] = val
          val = filter(...args)
        })
      }

      if (isTofObject(val)) {
        // 转 typeOf ojbect 为字符串
        val = JSON.stringify(val)
      } else if (isUndefined(val) || isNull(val)) {
        // undefined 和 Null 转成空字符串
        val = ''
      }

      // 正则替换
      newVal = newVal.replace(tp.RE, val)

      if (newVal === val + '') {
        newVal = item.val
      }
    })
  })

  // 回调值
  callBack(newVal)
}

/**
 * 处理监听
 * @private
 * @param {Object}   element  - 元素
 * @param {string}   path     - 元素的属性名
 * @param {String}   template - 属性值模板
 * @param {Object}   tpData   - 模板匹配数据
 * @param {Function} callBack - 回调渲染后的值和路径，callBack(newVal, path)
 */
const handlerWatch = (element, path, template, tpData, callBack) => {
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
