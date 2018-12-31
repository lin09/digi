export const forEachTest = (forEach) => {
  it(`测试使用${forEach.name}遍历对象和数组`, () => {
    const obj = { a: 1, b: 2 }
    // 测试不遍历原型对象
    obj.__proto__.c = 3

    forEach(obj, (value, key) => {
      expect(value).toBe(obj[key])
      expect(value).not.toBe(obj.__proto__.c)
    })

    forEach(obj, (value, key) => {
      expect(value).toBe(obj.a)
      expect(key).toBe('a')
      // 测试提前结束遍历
      return false
    })

    const array = ['a', 'b']
    forEach(array, (value, index) => {
      expect(value).toBe(array[index])
    })

    forEach(array, (value, index) => {
      expect(value).toBe(array[0])
      expect(index).toBe(0)
      // 测试提前结束遍历
      return false
    })
  })
}
