export const dataTest = ({ createData, addWatch }) => {
  describe('测试data', () => {
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
        expect(data.$tp('a')).toBe('{{[1].a}}')
      })
    })

    describe(`测试watch`, () => {
      describe("监控改变, { a: 123, b: { c: 'abc' }, c: ['a'] } => { a: 321, b: { c: '312', d: '123' }, c: ['a1', 'c'] }", () => {
        let oldDataA = sourceData.a
        let oldDataB = sourceData.b
        let oldDataC = sourceData.c
        let newDataA = 321
        let newDataB = { c: '312', d: '123' }
        let newDataC = ['a1', 'c']
        const data = createData(sourceData, { watch: {
          a: (newVal, old) => {
            it('改变数字, a: 123 => 321', () => {
              expect(old).toBe(oldDataA)
              expect(newVal).toBe(newDataA)
            })
          },
          b: (newVal, old) => {
            it("改变对象, b: { c: 'abc' } => { c: '312', d: '123' }", () => {
              expect(JSON.stringify(old)).toBe(JSON.stringify(oldDataB))
              expect(JSON.stringify(newVal)).toBe(JSON.stringify(newDataB))
            })
          },
          'b.c': (newVal, old) => {
            it("改变对象属性, b.c: 'abc' => '321'", () => {
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
            it("改变数组, c: ['a'] => ['a1', 'c']", () => {
              expect(JSON.stringify(old)).toBe(JSON.stringify(oldDataC))
              expect(JSON.stringify(newVal)).toBe(JSON.stringify(newDataC))
            })
          },
          'c[0]': (newVal, old) => {
            it("改变数组某个值, c[0]: 'a' => 'a1'", () => {
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
        data.b = newDataB
        data.c = newDataC
      })
      describe('添加watch', () => {
        let oldDataA = sourceData.a
        let oldDataB = sourceData.b
        let oldDataC = sourceData.c
        let newDataA = 321
        let newDataB = { c: '312', d: '123' }
        let newDataC = ['a1', 'c']

        const data = createData(sourceData)
        data.a = newDataA
        data.b = newDataB
        data.c = newDataC

        addWatch(data.$tp('a').replace(/{|}/g, ''), (newVal, oldVal) => {
          it('添加现有属性watch', () => {
            expect(oldVal).toBe(oldDataA)
            expect(newVal).toBe(newDataA)
          })
        })
        addWatch(data.$tp('b.d').replace(/{|}/g, ''), (newVal, oldVal) => {
          it('添加未来属性watch', () => {
            expect(oldVal).toBe(oldDataB.d)
            expect(newVal).toBe(newDataB.d)
          })
        })
        addWatch(data.$tp('c[1]').replace(/{|}/g, ''), (newVal, oldVal) => {
          it('添加数组未来值watch', () => {
            expect(oldVal).toBe(oldDataC[1])
            expect(newVal).toBe(newDataC[1])
          })
        })
      })
    })
  })
}