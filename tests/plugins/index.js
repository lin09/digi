export const addPluginsText = ({ plugins, createElement }) => {
  const data = 'aaa'

  it('测试添加插件', () => {
    const plugin = {
      property: 'test1',
      handler: (element, value) => {
        expect(value).toBe(data)
        expect(element.outerHTML).toBe('<div></div>')
      }
    }
    plugins([plugin])
    createElement({ test1: data })
  })

  it('测试配置插件', () => {
    const plugin = {
      property: 'test2',
      handler: (element, value) => {
        expect(value).toBe(data)
        expect(element.outerHTML).toBe('<div></div>')
        expect(plugin.options.a).toBe(321)
      },
      options: { a: 123 }
    }
    plugins([[plugin, { a: 321 }]])
    createElement({ test2: data })
  })

  it('测试错误插件报错', () => {
    plugins(['测试错误插件报错'])
  })
}

