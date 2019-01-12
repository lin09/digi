export const updateTest = ({ createElement, createData }) => {
  // 在其他地方测试过的功能不再测试，下面只是完善测试覆盖率
  describe('测试update', () => {
    const data = createData({ a: 'a', b: { c: 123 }, u: undefined, n: NaN })
    const e = createElement({
      // 元素属性为对象测试
      dataset: {
        // 多个同样模板测试
        a: data.$tp('a')
      },
      textContent: data.$tp('a') + data.$tp('b') + data.$tp('u') + data.$tp('n'),
    })

    document.body.appendChild(e)
    e.remove()
    expect(e.outerHTML).toBe('<div data-a="a">a{"c":123}0</div>')
  })
}
