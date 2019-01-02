import { stringToPaths } from './base/stringToPaths'
import { isString, isUndefined } from './objectType'
import { forEach } from './forEach'

export const set = (object, paths, value) => {
  if (isString(paths)) {
    paths = stringToPaths(paths)
  }

  let obj = object
  const lastPath = paths.pop()
  forEach(paths, path => {
    if (isUndefined(obj[path])) {
      obj[path] = {}
    }
    obj = obj[path]
  })
  obj[lastPath] = value
}
