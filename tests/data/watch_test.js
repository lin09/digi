import { addWatch, removeWatch } from '../../src/data'

const sourceData = { a: 123, b: { c: 'abc' }, c: ['a'], un: { u: '123' } }

export const addWatchTest = createData => {
  describe('添加watch', () => {
    let oldDataA = sourceData.a
    let oldDataB = sourceData.b
    let oldDataC = sourceData.c
    let newDataA = 321
    let newDataB = { c: '312', d: '123' }
    let newDataC = ['a1', 'c']

    const data = createData(sourceData, {
      watch: {
        a: (newVal, oldVal) => {
          it('createData 的 watch', () => {
            expect(oldVal).toBe(oldDataA)
            expect(newVal).toBe(newDataA)
          })
        },
        'un.u': (newVal, oldVal) => {
          it('createData 的 watch', () => {
            expect(oldVal).toBe('123')
            expect(newVal).toBe(undefined)
          })
        }
      }
    })
    data.a = newDataA
    data.b = newDataB
    data.c = newDataC
    data.un = undefined
    // 值不变不触发watch
    data.a = newDataA
    data.b = newDataB
    data.c = newDataC

    // 添加时fun会被调用一次
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
}

export const removeWatchTest = createData => {
  describe('删除watch', () => {
    it('删除watch', () => {
      let isDel = true
      const data = createData(sourceData)
      const watchKey = data.$tp('a').replace(/{|}/g, '')
      const watchFun = () => isDel = false

      addWatch(watchKey, watchFun)
      // 添加时watchFun调用一次
      expect(isDel).toBe(false)

      isDel = true
      data.a += 666
      // a值改变watchFun调用一次
      expect(isDel).toBe(false)

      removeWatch(watchKey, watchFun)
      isDel = true
      data.a += 666
      // watch已删除， a值改变不会调用watchFun
      expect(isDel).toBe(true)
    })
  })
}