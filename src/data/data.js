import { forEach, isArray, isObject, pathJoin } from '../utils'
import { addWatch, triggerWatch } from './watchs'
import { createTemplates } from './template'

/**
 * 设置Proxy
 * @private
 * @param   {Object|Array}  target - 对象类型值，target = {} || []
 * @param   {Object|Array}  path   - 对象路径，用于组装监听路径和触发监听
 * @returns {Proxy}                - 返回代理对象
 */
const setProxy = (target, path) => {
  const handler = {
    get: (target, prop) => target[prop],
    set: (target, prop, newVal) => {
      let oldVal = target[prop]

      // 无数据变更
      if (JSON.stringify(newVal) === JSON.stringify(oldVal)) {
        return true
      }

      const watchPath = pathJoin(path, prop)

      // 触发watch
      triggerWatch(watchPath, newVal, oldVal)

      // 对象处理
      if (isObject(newVal)) {
        if (!isObject(oldVal)) {
          target[prop] = setProxy({}, watchPath)
        }
        forEach(newVal, (val, k) => target[prop][k] = val)
      }

      // 数组处理
      else if (isArray(newVal)) {
        if (!isArray(oldVal)) {
          target[prop] = setProxy([], watchPath)
        }
        forEach(newVal, (val, k) => target[prop][k] = val)
      }

      // 其它类型
      else {
        target[prop] = newVal
      }

      return true
    }
  }
  return new Proxy(target, handler)
}

/**
 * 创建可监听对象
 * @function
 * @param   {Object} data  - 源对象
 * @param   {Object} watch - watch = { path1: fun1, ..., pathN: funN };<br>
 *                           path = 源对象路径; <br>
 *                           fun = (newVal, [oldVal]) => {};
 * @returns {Object}       - 返回可监听对象
 * @example
 * import digi, { createData } from 'digi'
 * import refs, { allotId } from 'digi-refs'
 *
 * digi.plugins([refs])
 *
 * // 创建监听数据
 * const data = createData({ a: 123 }, { watch: {
 *   a: (newVal, oldVal) => {
 *     console.log(`watch a => newVal: ${ newVal }, oldVal: ${ oldVal }`)
 *   }
 * }})
 *
 * // 分配标记id
 * const textRefId = allotId()
 *
 * // 添加元素
 * digi({ ref: textRefId, text: data.$tp('a') })
 *
 * console.log(refs[textRefId].outerHTML)
 * // => <div>123</div>
 *
 * data.a = 321
 * // => watch a => newVal: 321, oldVal: 123
 *
 * console.log(refs[textRefId].outerHTML)
 * // => <div>321</div>
 */
export const createData = (data, { watch } = {}) => {
  // 记录惟一值
  const id = ++ createData.id

  // 可监听对象
  const newData = setProxy({}, id)
  forEach(data, (value, key) => newData[key] = value)

  // 添加监听
  forEach(watch, (handler, path) => addWatch(pathJoin(id, path), handler, false))

  // 生成渲染模板
  Object.defineProperty(newData, '$tp', {
    value: (path, ...filters) => createTemplates(pathJoin(id, path), ...filters)
  })

  return newData
}

/**
 * 累计id
 * @private
 * @property {Number} createData.id 最后一个id值
 */
Object.defineProperty(createData, 'id', { value: 0, writable: true })
