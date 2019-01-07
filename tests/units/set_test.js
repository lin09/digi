export const setTest = set => {
  it(`测试使用${set.name}改变对象`, () => {
    const obj = { a: { b: 1, c: [ 2 ] }}
    set(obj, 'a.b', 123)
    expect(obj.a.b).toBe(123)

    set(obj, ['a', 'b'], 321)
    expect(obj.a.b).toBe(321)

    set(obj, 'a.c[0]', 6)
    expect(obj.a.c[0]).toBe(6)

    set(obj, 'a.d.e', 1)
    expect(obj.a.d.e).toBe(1)
  })
}
