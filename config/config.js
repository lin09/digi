export const DICT = {
  NPM_DIR: 'npm_package',   // 此文件夹存放的文件用于发布到npm
  OUTPUT_NAME: 'digi', // 打包后的文件名
  OUTPUT_DIR: 'dist',       // 些文件存放打包后的文件
  INPUT_FILENAME: 'main.js' // 入口文件
}

// rollup 基础配置
export const rollupConfig = {
  input: `src/${DICT.INPUT_FILENAME}`,
  output: {
    file: `${ DICT.OUTPUT_DIR }/${ DICT.OUTPUT_NAME }.js`,
    format: 'cjs',
    name: DICT.OUTPUT_NAME
  }
}
