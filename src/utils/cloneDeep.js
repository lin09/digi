/**
 * 非全功能克隆，只针对 array 和 object 做了简单处理
 */
import { arrayTag, objectTag, getToStringTag } from './base/toStringTag'

export const cloneDeep = value => {
  const tag = getToStringTag(value)

  if (!(tag === arrayTag || tag === objectTag)) {
    return value
  }

  let rValue

  if (tag === objectTag) {
    rValue = { ...value }
  } else if (tag === arrayTag) {
    rValue = [ ...value ]
  }

  for (let key in rValue) {
    rValue[key] = cloneDeep(rValue[key])
  }

  return rValue
}
