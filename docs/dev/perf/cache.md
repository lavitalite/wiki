## 静态资源加载策略
### SVG处理
[vite-plugin-svg-icons](https://github.com/vbenjs/vite-plugin-svg-icons)

实现机制

在构建时扫描指定目录的SVG文件


将SVG转换为sprites
生成一个虚拟模块
在运行时可直接使用这些SVG

```js
function domInject(inject: DomInject = 'body-last') {
  switch (inject) {
    case 'body-first':
    // position based on child or parent(prepend or append)
      return 'svgDOM.before(body.firstChild)'
    default:
      return 'svgDOM.after(body.lastChild)'
  }
}
```






性能优化

将多个SVG合并为sprite
减少HTTP请求
缓存友好


开发体验
SVG的自动导入
统一管理


构建效率

编译时处理
按需加载
体积优化

## cache

Browser Cache 
`max-age=31536000,immutable`

File System Cache 