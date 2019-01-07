## 一个简单的 js 框架
- [文档](https://digi1874.github.io/digi-doc/1.0.0-Beta/index.html)
- [demo](https://github.com/lin09/digi-demo)

```
// 简单例子
import digi, { createData } from 'digi'

// 创建监听数据
const data = createData({ a: 123 })

// 添加元素
digi({ text: data.$tp('a') })

console.log(document.body.lastChild.outerHTML)
// => <div>123</div>

data.a = 321
// => watch a => newVal: 321, oldVal: 123

console.log(document.body.lastChild.outerHTML)
// => <div>321</div>
```
