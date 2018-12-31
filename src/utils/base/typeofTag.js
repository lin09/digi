export const getTypeofTag = value => typeof value

const tofTags = {
  tofObjectTag: getTypeofTag({})
}

export const {
  tofObjectTag
} = tofTags

export default tofTags
