import { forEach } from './utils'
/**
 * 监听document.body.childNode变化
 * @private
 * @function
 */
export const observe = () => {
  const observer = new MutationObserver(mutationsList => {
    forEach(mutationsList, mutation => {
      forEach(mutation.removedNodes, node => { node.$isUpdate = false })
      forEach(mutation.addedNodes, node => { node.$isUpdate = true })
    })
  })
  observer.observe(document.body, { childList: true, subtree: true })
}
