export const digiTest = digi => {
  beforeEach(() => document.body.innerHTML = '')

  describe('测试digi方法', () => {
    it('dom数据为字符串', () => {
      digi('a')
      expect(document.body.childNodes[0].localName).toBe('a')
    })
    it('dom数据为对象', () => {
      digi({ tagName: 'p' })
      expect(document.body.childNodes[0].localName).toBe('p')
    })
    it('dom数据为数组', () => {
      digi(['h1'])
      expect(document.body.childNodes[0].localName).toBe('h1')
    })
    it('插入到目标元素', () => {
      const p = digi.createElement('p')
      expect(p.localName).toBe('p')
      digi('a', p)
      expect(p.childNodes[0].localName).toBe('a')
    })
  })
}