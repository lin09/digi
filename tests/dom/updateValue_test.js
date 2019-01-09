import { updateValue } from '../../src/dom/updateValue'

export const updateValueTest = () => {
  it('测试updateValue', () => {
    expect(updateValue(123, '', '', 321)).toBe(321)

    let obj = { a: { b: 123 } }
    expect(updateValue(obj.a, 'a', 'a.b', 321).b).toBe(321)
  })
}
