/**
 * 打包后的文件供浏览器使用
 */
import { rollupConfig, DICT } from './config/config'

export default {
  ...rollupConfig,
  output: {
    ...rollupConfig.output,
    file: `${DICT.OUTPUT_DIR}/${DICT.OUTPUT_NAME}.min.js`,
    format: 'iife'
  }
}
