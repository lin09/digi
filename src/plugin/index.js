import { isArray, forEach, isObject } from '../utils'

/**
 * 存储插件handlerFun
 * @property {string} [key] - key为element的属性名，plugins[key] = handler
 */
export const plugins = {}

/**
 * 添加单个插件
 * @function
 * @param {array|object} plugin  - plugin = { propertiy: 'element的属性名(可自定义名)', handler: fun }; plugin = plugin 或 [plugin, options]
 * @param {object}       options - 插件自定义配置
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
 * @function
 * @param {array} plugins - plugins = [plugin1, ..., pluginN];
 *                        - plugin = { propertiy: 'element的属性名(可自定义名)', handler: fun }; plugin = plugin 或 [plugin, options]
 *                        - handler创建element抓捕到对应属性触发, 并plugin.options = Object.assign(plugin.options, options)
 */
export const addPlugins = plugins => {
  forEach(plugins, item => addPlugin(item))
}
