import * as utils from './utils'
import * as dom from './dom'
import * as data from './data'

const digi = (data) => {
  let digiElement = document.getElementById('digi')
  digiElement = digiElement ? digiElement : document.body
  digiElement.append(dom.createElement(data))
}

digi.$utils = utils
digi.$dom = dom
digi.$data = data

export default digi
