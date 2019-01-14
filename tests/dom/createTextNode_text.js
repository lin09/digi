export const createTextNode = ({ createTextNode, createData }) => {
  it('测试createTextNode', () => {
    const data = createData({ a: 123 })
    const textNode = createTextNode(data.$tp('a'))
    // 未添加到页面不更新
    expect(/^{{[0-9]+\.a}}$/.test(textNode.nodeValue)).toBe(true)

    document.body.appendChild(textNode)
    jest.advanceTimersByTime(1000)
    // 添加到页面后自动更新
    expect(textNode.nodeValue).toBe('123')

    data.a = 321
    // 自动更新
    expect(textNode.nodeValue).toBe('321')

    textNode.remove()
    jest.advanceTimersByTime(1000)
    data.a = 666
    // 移出页面后不更新
    expect(textNode.nodeValue).toBe('321')
  })
}