export const isEmptyTest = isEmpty => {
  it(`测试使用${isEmpty.name}检查对象或数组是否为空`, () => {
    expect(isEmpty([])).toBe(true)
    expect(isEmpty({})).toBe(true)
    expect(isEmpty('1')).toBe(true)
    expect(isEmpty(true)).toBe(true)

    expect(isEmpty([ 1 ])).toBe(false)
    expect(isEmpty({ a:1 })).toBe(false)
  })
}
