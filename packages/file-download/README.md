


如果想为当前项目单独安装依赖
```sh
pnpm add -D eslint @eslint/js typescript typescript-eslint

# or use workspace if you perfer
pnpm rm  eslint @eslint/js typescript typescript-eslint
pnpm add eslint @eslint/js typescript typescript-eslint -w -D

```[package.json]
{
  "devDependencies": {
    "eslint": "workspace:*",
    ""
  }
}
```
```


## 目录结构
```
src/
├── types/
│   └── download.ts          # 类型定义
├── errors/
│   └── DownloadError.ts     # 错误处理
├── utils/
│   ├── ProgressTracker.ts   # 进度跟踪
│   └── TimeoutManager.ts    # 超时管理
├── __tests__/
│   └── file-download.test.ts # 测试文件
├── FileDownloader.ts        # 主类
└── index.ts                 # 导出
```



