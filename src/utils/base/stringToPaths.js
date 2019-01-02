// [ => \u005b , ] => \u005d
const reBracket = /\u005b|\u005d/g
const reDoublePoint = /\.\.+/g
const reHTPoint = /^\.|\.$/g
export const stringToPaths = (string) => {
  return string.replace(reBracket, '.').replace(reDoublePoint, '.').replace(reHTPoint, '').split('.')
}