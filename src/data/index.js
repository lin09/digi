import { forEach, isObject, isArray, cloneDeep, isNumber } from '../utils'

const watchs = {}

const setProperty = (obj, key, data, state = {}, watchKey) => {
  watchKey = isNumber(key) ? `${watchKey}[${key}]` : `${watchKey}.${key}`
  watchs[watchKey] = watchs[watchKey] ? watchs[watchKey] : []

  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get: () => state[key],
    set: newVal => {
      let oldVal = state[key]

      if (JSON.stringify(newVal) === JSON.stringify(oldVal)) {
        return
      }

      newVal = cloneDeep(newVal)
      oldVal = cloneDeep(oldVal)
      Object.defineProperties(watchs[watchKey], {
        newVal: { value: newVal, writable: true },
        oldVal: { value: oldVal, writable: true }
      })

      forEach(watchs[watchKey], fun => fun(newVal, oldVal))

      if (isObject(newVal)) {
        state[key] = {}
        if (!isObject(oldVal)) {
          oldVal = {}
        }
        const newState = {}
        forEach(newVal, (val, k) => {
          newState[k] = oldVal[k]
        })
        forEach(newVal, (val, k) => {
          setProperty(obj[key], k, newVal, newState, watchKey)
        })
      } else if (isArray(newVal)) {
        state[key] = []
        if (!isArray(oldVal)) {
          oldVal = []
        }
        const newState = []
        forEach(newVal, (val, k) => {
          newState[k] = oldVal[k]
        })
        forEach(newVal, (val, k) => {
          setProperty(obj[key], k, newVal, newState, watchKey)
        })
      } else {
        state[key] = newVal
      }
    }
  })

  obj[key] = cloneDeep(data[key])
}

export const createData = (data, { watch } = {}) => {
  const index = createData.index ? createData.index + 1 : 1
  createData.index = index

  const newData = {}
  forEach(data, (value, key) => {
    setProperty(newData, key, data, {}, `[${index}]`)
  })

  forEach(watch, (fun, key) => {
    watchs[`[${index}].${key}`] = [fun]
  })

  Object.defineProperty(newData, '$tp', {
    value: path => `{{[${index}].${path}}}`
  })

  return newData
}

export const addWatch = (key, fun) => {
  if (watchs[key]) {
    watchs[key].push(fun)
  } else {
    watchs[key] = [fun]
  }
  fun(watchs[key].newVal, watchs[key].oldVal)
}

export const delWatch = (key, fun) => watchs[key].splice(watchs[key].indexOf(fun), 1)
