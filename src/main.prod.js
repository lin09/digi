import * as utils from './utils'
import * as dom from './dom'
import * as data from './data'
import { addPlugins } from './plugin'

const digi = (data, element) => {
  let digiElement = element || document.getElementById('digi') || document.body

  utils.isArray(data)
    ? utils.forEach(data, (val) => digiElement.appendChild(dom.createElement(val)))
    : digiElement.appendChild(dom.createElement(data))
}

digi.utils = utils
digi.dom = dom
digi.data = data
digi.plugins = addPlugins

export default digi
