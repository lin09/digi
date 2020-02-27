export const objectEach = (object, callBack) => {
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      if (callBack(object[key], key) === false) break
    }
  }
}