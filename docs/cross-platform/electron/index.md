---
title: GitHub Markdown syntax for alerts considered harmful
tags: electron, course 101
publishedAt: 2024-02-03
excerpt: I loved the _GitHub Markdown syntax for alerts_ until it [landed in Vitepress](https://github.com/vuejs/vitepress/blob/main/CHANGELOG.md#100-rc40-2024-1-22), which made me think about it. Now [I think it sucks]().
---

::: info post updated on <time datetime="2024-02-04">4 February 2024</time>
[Read about the changes](./github-alerts-markdown-syntax.md#updates-to-this-article).
:::

---

# Electron app: up and running

package打包应用为安装文件
```sh
# create installer for linux&win&mac.
npm run package-all

# create installer only for linux.
npm run package-linux

# create installer only for win.
npm run package-win

# create installer only for mac.
npm run package-mac
```