import * as unitTests from './units'

export default ({ digi, utils }) => {
  digi.utils.forEach(digi.utils, (fun, funName) => {
    const testName = funName + 'Test'
    unitTests[testName](fun)
    utils[funName] && unitTests[testName](utils[funName])
  })
}
