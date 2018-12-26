export const isStringTest = (isString) => {
  test(`测试使用${isString.name}检查值是否为字符串`, () => {
    expect(isString('1')).toBe(true)
    expect(isString(1)).toBe(false)
  })
}

export const isObjectTest = (isObject) => {
  test(`测试使用${isObject.name}检查值是否为普通对象`, () => {
    expect(isObject({})).toBe(true)
    expect(isObject([])).toBe(false)
  })
}
