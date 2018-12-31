export const createElementTest = ({ createElement, createData, addWatch }) => {
  describe('测试DOM', () => {
    it('测试创建DOM', () => {
      expect(createElement().outerHTML).toBe('<div></div>')
      expect(createElement({}).outerHTML).toBe('<div></div>')
      expect(createElement({ tagName: 'test' }).localName).toBe('test')
    })
    it('测试DOM绑定数据', () => {
      const data = createData({ a: 'test' })
      expect(data.a).toBe('test')
      const textPart1 = 'testaaaa'
      const textPart2 = 'testbbbb'
      const e = createElement({ innerText: textPart1 + data.$tp('a') + textPart2 })
      expect(e.innerText).toBe(textPart1 + data.a + textPart2)
      data.a = 'tttttt'
      expect(data.a).toBe('tttttt')
      expect(e.innerText).toBe(textPart1 + data.a + textPart2)
    })
  })
}