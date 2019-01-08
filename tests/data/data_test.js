export const createDataTest = createData => {
  describe("测试data，sourceData = { a: 123, b: { c: 'abc' }, c: ['a'] }", () => {
    const sourceData = { a: 123, b: { c: 'abc' }, c: ['a'] }

    describe(`测试${ createData.name }`, () => {
      const data = createData(sourceData)

      it('创建数据', () => {
        expect(data.a).toBe(sourceData.a)
        expect(typeof data.$tp).toBe('function')
      })

      it('改变数据', () => {
        data.a = 666
        expect(data.a).toBe(666)
      })

      it('获取模板', () => {
        // 模板ID以1开始累加，{{id.a}}
        expect(data.$tp('a')).toBe('{{1.a}}')
      })
    })

    describe(`测试watch`, () => {
      let oldDataA = sourceData.a
      let oldDataB = sourceData.b
      let oldDataC = sourceData.c
      let newDataA = 321
      let newDataB = { c: '312', d: '123' }
      let newDataC = ['a1', 'c']
      const data = createData(sourceData, { watch: {
        a: (newVal, oldVal) => {
          it('监听a值, a: 123 => 321', () => {
            expect(oldVal).toBe(oldDataA)
            expect(newVal).toBe(newDataA)
          })
        },
        b: (newVal, old) => {
          it("监听b值, b: { c: 'abc' } => { c: '312', d: '123' }", () => {
            expect(JSON.stringify(old)).toBe(JSON.stringify(oldDataB))
            expect(JSON.stringify(newVal)).toBe(JSON.stringify(newDataB))
          })
        },
        'b.c': (newVal, old) => {
          it("监听b.c值, b.c: 'abc' => '321'", () => {
            expect(old).toBe(oldDataB.c)
            expect(newVal).toBe(newDataB.c)
          })
        },
        'b.d': (newVal, old) => {
          it('添加对象未来属性, b.d: undefined => 123', () => {
            expect(old).toBe(oldDataB.d)
            expect(newVal).toBe(newDataB.d)
          })
        },
        c: (newVal, old) => {
          it("监听数组, c: ['a'] => ['a1', 'c']", () => {
            expect(JSON.stringify(old)).toBe(JSON.stringify(oldDataC))
            expect(JSON.stringify(newVal)).toBe(JSON.stringify(newDataC))
          })
        },
        'c[0]': (newVal, old) => {
          it("监听数组某个值, c[0]: 'a' => 'a1'", () => {
            expect(old).toBe(oldDataC[0])
            expect(newVal).toBe(newDataC[0])
          })
        },
        'c[1]': (newVal, old) => {
          it("添加数组一个值, c[1]: undefined => 'c'", () => {
            expect(old).toBe(oldDataC[1])
            expect(newVal).toBe(newDataC[1])
          })
        }
      }})
      data.a = newDataA
      data.a = newDataA
      data.b = newDataB
      data.c = newDataC
    })
  })
}
