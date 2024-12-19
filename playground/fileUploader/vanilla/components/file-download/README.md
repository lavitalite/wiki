## 工程化配置


rm -rf node_modules pnpm-lock.yaml
pnpm install





## foler structure
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
│   └── FileDownloader.test.ts # 测试文件
├── FileDownloader.ts        # 主类
└── index.ts                 # 导出
```



