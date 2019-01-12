export const createElementTest = ({ createElement, createData }) => {
  describe('测试createElement', () => {
    it('测试创建DOM', () => {
      expect(createElement().outerHTML).toBe('<div></div>')
      expect(createElement({}).outerHTML).toBe('<div></div>')
      expect(createElement({ tagName: 'test' }).localName).toBe('test')
    })
    it('测试错误数据创建DOM报错', () => {
      expect(createElement(['测试错误数据创建DOM报错'])).toBe(undefined)
    })
    it('测试创建子元素', () => {
      expect(createElement({ child: 'a' }).outerHTML).toBe('<div><a></a></div>')
      // 属性名：child + 数字
      expect(createElement({ ['child' + Math.floor(Math.random() * 100)]: { tagName: 'a' } }).outerHTML).toBe('<div><a></a></div>')
      expect(createElement({ ['child' + Math.floor(Math.random() * 100)]: [ 'a' ] }).outerHTML).toBe('<div><a></a></div>')
    })
    it('测试创建文本节点', () => {
      expect(createElement({ text: 'a' }).outerHTML).toBe('<div>a</div>')
      // 属性名：text + 数字
      expect(createElement({ ['text' + Math.floor(Math.random() * 100)]: 'a' }).outerHTML).toBe('<div>a</div>')
    })
    it('测试DOM绑定数据', () => {
      const data = createData({ a: 'test' })
      const textPart1 = 'testaaaa'
      const textPart2 = 'testbbbb'
      const e = createElement({ textContent: textPart1 + data.$tp('a') + textPart2 + data.$tp('a') + textPart1 })
      document.body.appendChild(e)

      expect(e.textContent).toBe(textPart1 + data.a + textPart2 + data.a + textPart1)

      data.a = 'tttttt'
      expect(data.a).toBe('tttttt')
      expect(e.textContent).toBe(textPart1 + data.a + textPart2 + data.a + textPart1)
      expect(e.$isUpdate).toBe(true)
      e.remove()
      expect(e.$isUpdate).toBe(false)
      e.remove()
      expect(e.$isUpdate).toBe(false)
    })
  })
}