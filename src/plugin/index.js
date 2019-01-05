import { isArray, forEach, isObject } from '../utils'

/**
 * plugins.key = handler: key 名为element的属性名；handler(element, value)
 */
export const plugins = {}

const addPlugin = (data, options) => {
  if (isArray(data)) {
    addPlugin(data[0], data[1])
  } else if (!isObject(data)) {
    window.console.error('plugins Error: ', data)
  } else {
    plugins[data.propertiy] = data.handler
    forEach(options, (option, key) => {
      data.options = data.options || {}
      data.options[key] = option
    })
  }
}

export const addPlugins = (plugins) => {
  forEach(plugins, item => addPlugin(item))
}