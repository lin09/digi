export const isStringTest = (isString) => {
  it(`测试使用${isString.name}检查值是否为字符串`, () => {
    expect(isString('1')).toBe(true)
    expect(isString(1)).toBe(false)
  })
}

export const isObjectTest = (isObject) => {
  it(`测试使用${isObject.name}检查值是否为普通对象`, () => {
    expect(isObject({})).toBe(true)
    expect(isObject([])).toBe(false)
  })
}

export const isTofObjectTest = (isTofObject) => {
  it(`测试使用${isTofObject.name}检查值是否为typeof对象`, () => {
    expect(isTofObject({})).toBe(true)
    expect(isTofObject([])).toBe(true)
  })
}

export const isFunctionTest = (isFunction) => {
  it(`测试使用${isFunction.name}检查值是否为函数`, () => {
    expect(isFunction(isFunction)).toBe(true)
  })
}

export const isArrayTest = (isArray) => {
  it(`测试使用${isArray.name}检查值是否为数组`, () => {
    expect(isArray([])).toBe(true)
  })
}

export const isNumberTest = (isNumber) => {
  it(`测试使用${isNumber.name}检查值是否为数字`, () => {
    expect(isNumber(0)).toBe(true)
    expect(isNumber('1')).toBe(false)
  })
}

export const isUndefinedTest = (isUndefined) => {
  it(`测试使用${isUndefined.name}检查值是否为数字`, () => {
    expect(isUndefined(undefined)).toBe(true)
    expect(isUndefined('undefined')).toBe(false)
  })
}

export const isNullTest = (isNull) => {
  it(`测试使用${isNull.name}检查值是否为数字`, () => {
    expect(isNull(null)).toBe(true)
    expect(isNull('null')).toBe(false)
  })
}
