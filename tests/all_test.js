import * as unitTests from './units'
// import { createElementTest } from './dom'
import { dataTest } from './data'

export default ({ digi, all }) => {
  digi.$utils.forEach(digi.$utils, (fun, funName) => {
    const testName = funName + 'Test'
    // unitTests[testName](fun)
    all[funName] && unitTests[testName] && unitTests[testName](all[funName])
  })
  dataTest(all)
  // createElementTest()
}
