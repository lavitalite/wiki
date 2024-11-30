vitepress build option to track down error

serve virtual file


```sh
rm -rf docs/.vitepress/.temp
rm -rf docs/.vitepress/.cache
rm -rf node_modules
rm -rf pnpm-lock.yaml

pnpm install


pnpm run docs:build
```