export const createElementTest = ({ createElement, createData }) => {
  describe('测试createElement', () => {
    it('测试创建DOM', () => {
      expect(createElement().localName).toBe('div')
      expect(createElement({}).localName).toBe('div')
      expect(createElement({ tagName: 'test' }).localName).toBe('test')
      expect(createElement({ abc: '123' }).outerHTML).toBe('<div abc="123"></div>')
      expect(createElement({ tagName: 'svg', child: { tagName: 'a' } }).localName).toBe('svg')
    })
    it('测试错误数据创建DOM报错', () => {
      expect(createElement(['测试错误数据创建DOM报错'])).toBe(undefined)
    })
    it('测试创建子元素', () => {
      expect(createElement({ child: 'a' }).childNodes[0].localName).toBe('a')
      // 属性名：child + 数字
      expect(createElement({ ['child' + Math.floor(Math.random() * 100)]: { tagName: 'a' } }).childNodes[0].localName).toBe('a')
      expect(createElement({ ['child' + Math.floor(Math.random() * 100)]: [ 'a' ] }).childNodes[0].localName).toBe('a')
    })
    it('测试创建文本节点', () => {
      expect(createElement({ text: 'text' }).innerHTML).toBe('text')
      // 属性名：text + 数字
      expect(createElement({ ['text' + Math.floor(Math.random() * 100)]: 'text' }).innerHTML).toBe('text')
    })
    it('测试DOM绑定数据', async () => {
      const data = createData({ a: 'test' })
      const textPart1 = 'testaaaa'
      const textPart2 = 'testbbbb'
      const e = createElement({ textContent: textPart1 + data.$tp('a') + textPart2 + data.$tp('a') + textPart1 })
      await document.body.appendChild(e)

      expect(e.textContent).toBe(textPart1 + data.a + textPart2 + data.a + textPart1)

      data.a = 'tttttt'
      expect(data.a).toBe('tttttt')
      expect(e.textContent).toBe(textPart1 + data.a + textPart2 + data.a + textPart1)

      expect(e.$isUpdate).toBe(true)

      await e.remove()
      expect(e.$isUpdate).toBe(false)

      e.$isUpdate = true
      expect(e.$isUpdate).toBe(false)
      e.$isUpdate = false
    })
  })
}