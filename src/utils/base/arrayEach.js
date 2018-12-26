export const arrayEach = (array, callBack) => {
  for (let i = 0; i < array.length; i ++) {
    if (callBack(array[i], i) === false) break
  }
}