export const createTextNode = ({ createTextNode, createData }) => {
  it('测试createTextNode', async () => {
    const data = createData({ a: 123 })
    const textNode = createTextNode(data.$tp('a'))
    // 未添加到页面不更新
    expect(/^{{[0-9]+\.a}}$/.test(textNode.nodeValue)).toBe(true)

    await document.body.appendChild(textNode)
    // 添加到页面后自动更新
    expect(textNode.nodeValue).toBe('123')

    data.a = 321
    // 自动更新
    expect(textNode.nodeValue).toBe('321')

    await textNode.remove()
    data.a = 666
    // 移出页面后不更新
    expect(textNode.nodeValue).toBe('321')
  })
}