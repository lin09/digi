import { forEach, isTofObject, isUndefined, isNull } from '../../utils'
import { getFilter } from '../filters'
/**
 * 渲染模板，调回渲染后的值
 * @private
 * @param {String}   template - 模板
 * @param {Object}   tpData   - 模板数据，tpData = { val: 匹配模板最新值, tp: { [路径|id]: { RE: 匹配模板正则, filterId: 过滤器id }, ... }};
 * @param {Function} callBack - 回调渲染后的值，callBack(newVal)
 */
export const updated = (template, tpData, callBack) => {
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

      let valStr = val
      if (isTofObject(valStr)) {
        // 转 typeOf object 为字符串
        valStr = JSON.stringify(valStr)
      } else if (isUndefined(valStr) || isNull(valStr)) {
        // undefined 和 Null 转成空字符串
        valStr = ''
      }

      // 正则替换
      newVal = newVal.replace(tp.RE, valStr)

      if (newVal === valStr + '') {
        newVal = val
      }
    })
  })

  // 回调值
  callBack(newVal)
}
