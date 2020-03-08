export const filtersText = ({ createData, createElement }) => {
  describe('测试过滤器', () => {
    it('测试过滤器', async () => {
      // 创建数据
      const data = createData({ a: 123 })
      // 过滤器1
      const filter1 = val => val * 2 + ''
      // 过滤器2
      const filter2 = (val, arg) => val * 1 + arg + ''

      // 创建元素
      const e = createElement({ class: data.$tp('a', filter1, [filter2, 2])})
      // 未添加到页面不会渲染
      expect(/^{{[0-9]+\.a\|1}}$/.test(e.className)).toBe(true)

      let className = data.a * 2 + 2 + ''
      await document.body.appendChild(e)
      // 添加到页面后自动渲染
      expect(e.className).toBe(className)

      await e.remove()
      // 如果多次触发移除过滤器，不会影响结果。正常情况不触发多次
      e.$removeFilter()
      // 如果多次触发移除监听，不会影响结果。正常情况不触发多次
      e.$removeWatch()
      data.a = 321
      // 移除元素后，停止更新
      expect(e.className).toBe(className)

      await document.body.appendChild(e)
      className = data.a * 2 + 2 + ''
      // 重新添加回页面后自动更新
      expect(e.className).toBe(className)
    }),
    it('调用自定义事件', async () => {
      // 创建数据
      const data = createData({ a: 123 })
      // 过滤器1
      const filter1 = val => val * 2 + ''
      // 过滤器2
      const filter2 = (val, arg) => val * 1 + arg + ''

      // 创建元素
      const e = createElement({ $removeFilter: () => {
        data.a = 321
      },
      $restoreFilter: () => {
        data.a = 123
      }, class: data.$tp('a', filter1, [filter2, 2])})

      await document.body.appendChild(e)
      await e.remove()
      e.$removeFilter()
      expect(data.a).toBe(321)
      await document.body.appendChild(e)
      expect(data.a).toBe(123)
    })
  })
}
