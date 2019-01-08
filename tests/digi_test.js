export const digiTest = digi => {
  beforeEach(() => document.body.innerHTML = '')

  describe('测试digi方法', () => {
    it('dom数据为字符串', () => {
      digi('a')
      expect(document.body.outerHTML).toBe('<body><a></a></body>')
    })
    it('dom数据为对象', () => {
      digi({ tagName: 'p' })
      expect(document.body.outerHTML).toBe('<body><p></p></body>')
    })
    it('dom数据为数组', () => {
      digi(['h1'])
      expect(document.body.outerHTML).toBe('<body><h1></h1></body>')
    })
    it('插入到目标元素', () => {
      const p = digi.createElement('p')
      expect(p.outerHTML).toBe('<p></p>')
      digi('a', p)
      expect(p.outerHTML).toBe('<p><a></a></p>')
    })
  })
}