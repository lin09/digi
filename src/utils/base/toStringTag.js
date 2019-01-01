export const getToStringTag = value => toString.call(value)

const tags = {
  stringTag: getToStringTag(''),
  objectTag: getToStringTag({}),
  arrayTag: getToStringTag([]),
  numberTag: getToStringTag(1),
  functionTag: getToStringTag(()=>{}),
  // booleanTag: getToStringTag(true),
  undefinedTag: getToStringTag(undefined),
  nullTag: getToStringTag(null),
  // regExpTag: getToStringTag(new RegExp())
}

export const {
  stringTag,
  objectTag,
  arrayTag,
  numberTag,
  functionTag,
  undefinedTag,
  nullTag
} = tags

export default tags