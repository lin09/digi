export const objectEach = (object, callBack) => {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      if (callBack(object[key], key) === false) break
    }
  }
}