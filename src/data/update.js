import { forEach, isTofObject, isUndefined, isNull, isObject, set, pathJoin, isArray } from '../utils'
import { addWatch, removeWatch } from './watchs'
import { filters, removeFilter, restoreFilter } from './filters'

// 匹配路径和过滤器id正则
const tpRE = /{{(([\s\S]+?)(?:\|([0-9]+))?)}}/g

/**
 * 正则渲染元素
 * @private
 * @param {Object} element  - 元素
 * @param {String} key      - 元素的属性路径
 * @param {String} template - 属性值模板
 * @param {Object} tpData   - 模板数据，tpData = { val: 匹配模板最新值, tp: { [路径|id]: { RE: 匹配模板正则, filterId: 过滤器id }, ... }};
 */
const updated = (element, key, template, tpData) => {
  // 属性值
  let newVal = template
  forEach(tpData, item => {
    forEach(item.tp, tp => {
      let val = item.val

      if (tp.filterId) {
        forEach(filters[tp.filterId], args => {
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
    })
  })

  // 更新element属性
  set(element, key, newVal)
}

/**
 * 处理监听
 * @private
 * @param {Object} element    - 元素
 * @param {string} key        - 元素的属性名
 * @param {String} template   - 属性值模板
 * @param {Object} tpData     - 模板匹配数据
 * @param {Array}  filtersIds - 过滤器id
 */
const handlerWatch = (element, key, template, tpData, filtersIds) => {
  // 存储监听方法，用于元素移除时清除监听方法
  const watchFuns = {}
  // 存储移除时的过滤器，用于恢复
  const filters = {}

  // 添加监听
  forEach(tpData, (item, path) => {
    const fun = val => {
      item.val = val
      updated(element, key, template, tpData)
    }
    watchFuns[path] = fun
    addWatch(path, fun)
  })

  // 移除监听
  const $removeWatch = element.$removeWatch
  element.$removeWatch = () => {
    forEach(watchFuns, (fun, path) => removeWatch(path, fun))
    $removeWatch && $removeWatch()
  }
  // 恢复监听
  const $addWatch = element.$addWatch
  element.$addWatch = () => {
    forEach(watchFuns, (fun, path) => addWatch(path, fun))
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
 * @param {Object} element  - 元素
 * @param {String} key      - 元素的属性
 * @param {Any}    value    - 属性值或模板
 */
export const update = (element, key, value) => {
  if (isObject(value) || isArray(value)) {
    // 不能用element[key]，其可能是空或不是对象，所以组装路径
    forEach(value, (val, k) => update(element, pathJoin(key, k), val))
    return
  }
  // 设置element属性
  set(element, key, value)

  // 模板数据，tpData = { val: 匹配模板最新值, tp: { [路径|id]: { RE: 匹配模板正则, filterId: 过滤器id }}};
  const tpData = {}
  // 存储过滤器id，用于元素移除时清除过滤器
  const filtersIds = []

  // 暂存匹配数据
  let tp = ''
  do {
    tp = tpRE.exec(value)
    if (tp !== null) {
      // 路径|id
      const key = tp[1]
      // 路径
      const path = tp[2]
      if (!tpData[path]) {
        tpData[path] = { val: '', tp: {} }
      }
      if (!tpData[path].tp[key]) {
        // 模板转正则
        const RE = RegExp(tp[0].replace('|', '\\|'), 'g')
        const filterId = tp[3]
        tpData[path].tp[key] = { RE, filterId }

        filterId && filtersIds.push(filterId)
      }
    }
  } while (tp !== null)

  // 处理监听
  JSON.stringify(tpData) !== JSON.stringify({}) &&  handlerWatch(element, key, value, tpData, filtersIds)
}
