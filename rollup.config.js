/**
 * 打包后的文件用于发布到npm
 */
import { rollupConfig, DICT } from './config/config'
import fs from 'fs'

// 创建文件夹
if (!fs.existsSync(DICT.NPM_DIR)) {
  fs.mkdirSync(DICT.NPM_DIR);
}

// 拷贝文件
for (const fileName of ['package.json', 'LICENSE', 'README.md']) {
  fs.copyFile(fileName, `${DICT.NPM_DIR}/${fileName}`, err => {
    if (err) throw err
    console.log('\x1b[32m%s\x1b[0m', `${fileName} was copied to ${DICT.NPM_DIR}/${fileName}✔️`)
  })
}

// rollup
export default {
  ...rollupConfig,
  output: {
    ...rollupConfig.output,
    file: `${DICT.NPM_DIR}/${DICT.INPUT_FILENAME}`
  }
}
