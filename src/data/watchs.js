import { forEach, cloneDeep } from '../utils'

/**
 * 存储变化数据和调用方法
 * watchs.key = [handler1, ..., handlerN]; handler = (newVal, oldVal) { ... }
 * @static
 */
const watchs = {}

/**
 * 添加监听，添加时handler会被调用一次
 * @function
 * @param {string} path 生成渲染模板中的监听对象路径（{{监听对象路径|过滤器id}}）
 * @param {function|undefined} handler handler = (newVal, oldVal) { ... }; watchs[path]初始化时可为空
 */
export const addWatch = (path, handler) => {
  if (!watchs[path]) {
    watchs[path] = []
    Object.defineProperties(watchs[path], {
      newVal: { writable: true },
      oldVal: { writable: true }
    })
  }

  if (handler) {
    watchs[path].push(handler)

    // 添加时handler会被调用一次
    handler(watchs[path].newVal, watchs[path].oldVal)
  }
}

/**
 * 删除监听
 * @function
 * @param {string} path 添加监听时的path
 * @param {function} handler 添加监听时的handler
 */
export const removeWatch = (path, handler) => watchs[path].splice(watchs[path].indexOf(handler), 1)

/**
 * 触发
 */
export const triggerWatch = (path, newVal, oldVal) => {
  newVal = cloneDeep(newVal)
  oldVal = cloneDeep(oldVal)
  watchs[path].newVal = newVal
  watchs[path].oldVal = oldVal
  // 调用监听
  forEach(watchs[path], handler => handler(newVal, oldVal))
}
