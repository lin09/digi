export const filtersText = ({ createData, createElement }) => {
  it('测试过滤器', () => {
    // 创建数据
    const data = createData({ a: 123 })
    // 过滤器1
    const filter1 = val => val * 2
    // 过滤器2
    const filter2 = (val, arg) => val + arg

    // 创建元素
    const e = createElement({ text: data.$tp('a', filter1, [filter2, 2])})
    // 未添加到页面不会渲染
    expect(e.outerHTML).toBe('<div>{{1.a|1}}</div>')

    let html = `<div>${data.a * 2 + 2}</div>`
    document.body.appendChild(e)
    // 添加到页面后自动渲染
    expect(e.outerHTML).toBe(html)

    e.remove()
    data.a = 321
    // 移除元素后，停止更新
    expect(e.outerHTML).toBe(html)

    document.body.appendChild(e)
    html = `<div>${data.a * 2 + 2}</div>`
    // 重新添加回页面后自动更新
    expect(e.outerHTML).toBe(html)
  })
}
