export const pathJoinTest = pathJoin => {
  it(`测试使用${pathJoin.name}连接路径`, () => {
    expect(pathJoin('a', '[3].b')).toBe('a.3.b')
  })
}

export const pathSplitTest = pathSplit => {
  it(`测试使用${pathSplit.name}把数组路径转成字符串路径`, () => {
    expect(JSON.stringify(pathSplit('a[3].b'))).toBe(JSON.stringify(['a', '3', 'b']))
  })
}
