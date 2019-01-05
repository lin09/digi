import { forEach, cloneDeep, isArray, isObject, pathJoin } from '../utils'
import { addWatch, triggerWatch } from './watchs'
import { createTemplates } from './template'

/**
 * 设置对象defineProperty
 * @param {Object|Array} newData 产生新的数据
 * @param {String|Number} key 对象属性名
 * @param {Object|Array} data 源数据
 * @param {Object|Array} state 存储最新数据
 * @param {String} watchPath 所有父属性名连接
 */
const setProperty = (newData, key, data, state = {}, watchPath) => {
  watchPath = pathJoin(watchPath, key)
  addWatch(watchPath)

  Object.defineProperty(newData, key, {
    // 可改变，可删除属性
    configurable: true,
    // 可枚举
    enumerable: true,
    // 读取属性的值
    get: () => state[key],
    // 赋值调用方法
    set: newVal => {
      let oldVal = state[key]

      // 无数据变更
      if (JSON.stringify(newVal) === JSON.stringify(oldVal)) {
        return
      }

      // 触发watch
      triggerWatch(watchPath, newVal, oldVal)

      // 对象处理
      if (isObject(newVal)) {
        state[key] = {}
        if (!isObject(oldVal)) {
          oldVal = {}
        }
        const newState = {}
        // 组装新属性，保留oldVal对应newVal的key值
        forEach(newVal, (val, k) => {
          newState[k] = oldVal[k]
        })
        // 设置新属性
        forEach(newVal, (val, k) => setProperty(newData[key], k, newVal, newState, watchPath))
      }

      // 数组处理
      else if (isArray(newVal)) {
        state[key] = []
        if (!isArray(oldVal)) {
          oldVal = []
        }
        const newState = []
        forEach(newVal, (val, k) => {
          newState[k] = oldVal[k]
        })
        forEach(newVal, (val, k) => setProperty(newData[key], k, newVal, newState, watchPath))
      }

      // 其它类型
      else {
        state[key] = newVal
      }
    }
  })

  // 赋值
  newData[key] = cloneDeep(data[key])
}

/**
 * 创建可监听对象
 * @param {Object} data 源对象
 * @param {Object} watch watch = { [ 源对象路径 ]: (newVal, oldVal) => {}, ... }
 * @returns {Object} 返回可监听对象
 */
export const createData = (data, { watch } = {}) => {
  // 记录惟一值
  const id = ++ createData.id

  // 可监听对象
  const newData = {}
  // 设置属性
  forEach(data, (value, key) => setProperty(newData, key, data, {}, id))

  // 添加监听
  forEach(watch, (handler, path) => addWatch(pathJoin(id, path), handler))

  // 生成渲染模板
  Object.defineProperty(newData, '$tp', {
    value: (path, ...filters) => createTemplates(pathJoin(id, path), ...filters)
  })

  return newData
}

/**
 * 累计id
 * @property {Number} createData.id 最后一个id值
 */
Object.defineProperty(createData, 'id', { value: 0, writable: true })