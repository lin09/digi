export const createDataTest = createData => {
  describe(`测试${ createData.name }`, () => {
    const sourceData = { a: 123, b: { d: 'abc' }, d: ['a'] }
    const data = createData(sourceData)

    it('创建数据', () => {
      expect(data.a).toBe(sourceData.a)
      expect(typeof data.$tp).toBe('function')
    })

    it('改变数据', () => {
      data.a = 666
      expect(data.a).toBe(666)

      data.b = {}
      expect(data.b.d).toBe(undefined)

      data.d = []
      expect(data.d[0]).toBe(undefined)
    })

    it('获取模板', () => {
      // 模板ID以1开始累加，{{id.a}}
      expect(/^{{[0-9]+\.a}}$/.test(data.$tp('a'))).toBe(true)
    })
  })
}

