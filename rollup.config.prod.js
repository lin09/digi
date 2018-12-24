/**
 * 打包后的文件供浏览器使用
 */
import path from 'path'
import buble from 'rollup-plugin-buble'
import { uglify } from "rollup-plugin-uglify"
import { rollupConfig, DICT } from './config/rollup.config'

export default {
  ...rollupConfig,
  input: path.join('src', 'main.prod.js'),
  output: {
    ...rollupConfig.output,
    file: path.join(DICT.OUTPUT_DIR, DICT.OUTPUT_NAME + '.min.js'),
    format: 'umd'
  },
  plugins: [
    ...rollupConfig.plugins,
    buble(),
    uglify()
  ]
}
