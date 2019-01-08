import * as unitTests from './units'
import { createDataTest, addWatchTest, removeWatchTest, filtersText, updateTest } from './data'
import { createElementTest, createTextNode } from './dom'

export default ({ digi, all }) => {
  describe('测试utils', () => {
    digi.utils.forEach(digi.utils, (fun, funName) => {
      it('混入' + funName, () => expect(all[funName]).toBe(fun))

      const testName = funName + 'Test'
      // console.log(testName)
      unitTests[testName](fun)
    })
  })

  describe('测试data', () => {
    it('混入' + digi.createData.name, () => expect(all.createData).toBe(digi.createData))
    createDataTest(all.createData)
    addWatchTest(all.createData)
    removeWatchTest(all.createData)
    filtersText(all)
    updateTest(all)
  })

  describe('测试dom', () => {
    it('混入' + digi.createElement.name, () => expect(all.createElement).toBe(digi.createElement))
    createElementTest(all)
    it('混入' + digi.createTextNode.name, () => expect(all.createTextNode).toBe(digi.createTextNode))
    createTextNode(all)
  })
}
