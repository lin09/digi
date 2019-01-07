export const cloneDeepTest = cloneDeep => {
  it(`测试使用${cloneDeep.name}克隆对象`, () => {
    const obj = { a: 123, b: [1, 2] }
    const newObj = cloneDeep(obj)
    expect(newObj).not.toBe(obj)
    expect(newObj.b).not.toBe(obj.b)
    expect(JSON.stringify(newObj)).toBe(JSON.stringify(obj))
  })
}