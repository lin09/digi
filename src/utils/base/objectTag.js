export const getTag = (value) => {
  return toString.call(value)
}

const tags = {
  stringTag: getTag(''),
  objectTag: getTag({}),
  arrayTag: getTag([]),
  numberTag: getTag(1),
  functionTag: getTag(()=>{}),
  // booleanTag: getTag(true),
  // undefineTag: getTag(undefined),
  // nullTag: getTag(null),
  // regExpTag: getTag(new RegExp())
}

export const {
  stringTag,
  objectTag,
  arrayTag,
  numberTag,
  functionTag
} = tags
export default tags