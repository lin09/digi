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
 * @param {Array|Object} plugin      - plugin = { propertiy: '元素属性名', handler: (元素, 元素属性值) => {} };<br>
 *                                     handler在创建元素时抓捕到对应属性被触发, 并plugin.options = Object.assign(plugin.options, options)
 * @param {Object|Undefined} options - 插件自定义配置
 */
const addPlugin = (plugin, options) => {
  if (isArray(plugin)) {
    addPlugin(plugin[0], plugin[1])
  } else if (!isObject(plugin)) {
    window.console.error('plugins Error: ', plugin)
    // window.console.log('see link ...')
  } else {
    // 存储插件handlerFun
    plugins[plugin.propertiy] = plugin.handler

    // 修改可配置
    plugin.options && options && Object.assign(plugin.options, options)
  }
}

/**
 * 添加多个插件
 * @private
 * @function
 * @param {array} plugins - plugins = [plugin1, ..., pluginN]; plugin = plugin || [plugin, options]; 查看{@link addPlugin}
 */
export const addPlugins = plugins => forEach(plugins, item => addPlugin(item))
