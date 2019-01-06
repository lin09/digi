import { update } from '../data'

export const createTextNode = (text) => {
  const textNode = document.createTextNode(text)
  update(textNode, 'nodeValue', text)
  return textNode
}