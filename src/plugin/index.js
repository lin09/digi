import { isArray, forEach, isObject } from '../utils'

/**
 * 存储插件handlerFun
 * @private
 * @property {string} [key] - key为元素属性名，plugins[key] = handler
 */
export const plugins = {}

/**
 * 添加单个插件
 * @private
 * @function
 * @param {Array|Object} plugin      - plugin = { property: '元素属性名', handler: (元素, 元素属性值) => {} };<br>
 *                                     handler在创建元素时抓捕到对应属性被触发, 并plugin.options = Object.assign(plugin.options, options)
 * @param {Object|Undefined} options - 插件自定义配置
 */
const addPlugin = (plugin, options) => {
  if (isArray(plugin)) {
    addPlugin(plugin[0], plugin[1])
  } else if (!isObject(plugin)) {
    window.console.error('plugins Error: ', plugin)
    window.console.log('View document: https://digi1874.github.io/digi-doc/1.0.1/global.html#plugins')
  } else {
    // 存储插件handlerFun
    plugins[plugin.property] = plugin.handler

    // 修改可配置
    plugin.options && options && Object.assign(plugin.options, options)
  }
}

/**
 * 添加插件
 * @function
 * @name plugins
 * @param {Array} plugins - 值 = [plugin1, ..., pluginN]; <br>
 *                          plugin = { property: '元素属性名', handler: (元素, 元素属性值) => {} };<br>
 *                          或 plugin = [{ property: '元素属性名', handler: (元素, 元素属性值) => {} }, options]; options = {...}<br>
 *                          handler在创建元素时抓捕到对应属性被触发, 并plugin.options = Object.assign(plugin.options, options)
 * @example
 * import digi, { plugins } from 'digi'
 * import refs, { allotId } from 'digi-refs'
 * console.log(refs)
 * // {property: "ref", handler: ƒ, allotId: ƒ}
 *
 * // 添加插件: plugins([refs]) 或 digi.plugins([refs])
 * plugins([refs])
 *
 * // 分配标记id
 * const textRefId = allotId()
 *
 * // 添加元素
 * digi({ ref: textRefId, text: 'hello world' })
 *
 * console.log(refs[textRefId].outerHTML)
 * // => <div>hello world</div>
 */
export const addPlugins = plugins => forEach(plugins, item => addPlugin(item))
