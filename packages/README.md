## 工程化配置
当前项目开启了pnpm workspace,配置了依赖共享和统一管理


## 依赖解释
 ### 跨子项目依赖解析

 ```json
 // playground/file-uploader/package.json
 {
   "dependencies": {
     "shared-utils": "workspace:*"
   }
 }
 ```

 - `pnpm` 会解析 `shared-utils` 的本地路径 (如 `playground/shared-utils`)。
 - 它会创建符号链接，将 `playground/shared-utils` 连接到 `playground/file-uploader/node_modules/shared-utils`。

 ### 跨项目共享依赖
 如果多个子项目依赖相同的第三方包（如 `lodash`），`pnpm` 会优化依赖管理：
 - 依赖仅存储一次，通常位于 `.pnpm-store` 中。
 - 每个项目通过链接引用共享缓存中的依赖，避免重复安装。


```
project-root/
├── playground/
│   ├── file-uploader/
│   │   └── node_modules/
│   │       └── shared-utils -> ../../shared-utils (symlink)
│   ├── shared-utils/
│   │   └── node_modules/
│   └── lodash -> .pnpm-store/v3/files/<hash>/lodash (symlink)
└── .pnpm-store/
    └── v3/
        └── files/
            └── <hash>/lodash


```



如果想为当前项目单独安装依赖
```sh
pnpm add -D eslint @eslint/js typescript typescript-eslint

# or use workspace if you perfer
pnpm rm  eslint @eslint/js typescript typescript-eslint
```



Error: libsecret-1.so.0: cannot open shared object file: No such file or directory 

Codemod CLI uses "keytar" to store your credentials securely. 
Please make sure you have "libsecret" installed on your system. 
Depending on your distribution, you will need to run the following command 
Debian/Ubuntu: sudo apt-get install libsecret-1-dev 
Fedora: sudo dnf install libsecret 
Arch Linux: sudo pacman -S libsecret 

 WARN  GET https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz error (ECONNRESET). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmjs.org/tr46/-/tr46-0.0.3.tgz error (ECONNRESET). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz error (ECONNRESET). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmjs.org/emoji-regex/-/emoji-regex-9.2.2.tgz error (ECONNRESET). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmjs.org/os-tmpdir/-/os-tmpdir-1.0.2.tgz error (ECONNRESET). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmjs.org/inflight error (ECONNRESET). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmjs.org/path-is-absolute error (ECONNRESET). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmjs.org/isexe error (ECONNRESET). Will retry in 10 seconds. 2 retries left.
Progress: resolved 329, reused 0, downloaded 293, added 293, done


## 外部依赖管理 pnpm catalog feature


依赖版本的范围

 catalog:default
 catalog


```sh
# 查看已安装的依赖
pnpm list
# 查看已安装的依赖版本
~ pnpm list tailwindcss postcss autoprefixer
Legend: production dependency, optional only, dev only

@xiyuan/tech-insight@0.1.0 /mnt/c/wamp64/www/dev/project-apollo

dependencies:
autoprefixer 10.4.20
postcss 8.4.49
tailwindcss 3.4.17


```


## 内部依赖管理 pnpm worksapce feature

给出如下目录结构
```sh
<project-root>
├── playground/
│   ├── schema/
│   └── shared-utils/
├── package.json
└── pnpm-workspace.yaml
```



- 在 `<project-root>` 中为 `playground/schema` 安装 `workspace` 子项目 `playground/shared-utils`

```sh
pnpm add playground/shared-utils --filter=playground/schema
```

- 在 `<project-root>` 中为 `playground/schema` 子项目安装外部依赖 `chalk`

```sh
pnpm add chalk --filter=playground/schema
```

- 在`playground/schema`中安装workspace子项目`shared-utils`
pnpm add shared-utils
```sh
# --workspace  Only adds the new dependency if it is found in the workspace
pnpm add shared-utils --workspace
```

- 在 `playground/schema` 中安装外部依赖 `chalk`

```sh
pnpm add chalk ora -P  
```

- 安装共享外部依赖到根项目下
  
```sh
pnpm add  eslint @eslint/js typescript typescript-eslint @types/node --workspace-root --save-dev

# 从共享依赖中安装项目

```



## React,Vue实现monorepo的实现方式

React 用yarn
Vue 用pnpm


## pnpm: store feature

```sh
# on wsl  
 pnpm config set store-dir "/mnt/c/.pnpm-store/v3" --global
# or in global config ~/.npmrc
store-dir=/mnt/c/.pnpm-store/v3
```



