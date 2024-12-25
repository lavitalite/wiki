## debug


```sh
 rm -rf node_modules pnpm-loca.yaml .pnpm-store && pnpm i

```

```sh
~ pnpm list tailwindcss postcss autoprefixer
Legend: production dependency, optional only, dev only

@xiyuan/tech-insight@0.1.0 /mnt/c/wamp64/www/dev/project-apollo

dependencies:
autoprefixer 10.4.20
postcss 8.4.49
tailwindcss 3.4.17

```

```sh
# remove cache
~ rm -rf $(pnpm store path)
# config check peer deps
echo "strict-peer-dependencies=false" >> .npmrc
```

pnpm list 

pnpm cache list

"traceResolution": true

pnpm why vue

ts command paltte`> restart tsServer`

WATCH OPTIONS

Including --watch, -w will start watching the current project for the file changes. Once set, you can config watch mode with:


BUILD OPTIONS

Using --build, -b will make tsc behave more like a build orchestrator than a compiler. This is used to trigger building composite projects which you can learn more about at https://aka.ms/tsc-composite-builds


tsc BEmbed.vue --traceResolution > trace.md

pnpm config set shamefully-hoist=true

ls -la node_modules/* | rg  "vue|react"
lrwxrwxrwx 1 office office   37 Dec 23 16:02 node_modules/react -> .pnpm/react@18.3.1/node_modules/react
lrwxrwxrwx 1 office office  149 Dec 23 16:02 node_modules/vitepress -> .pnpm/vitepress@1.5.0_@algolia+client-search@5.18.0_@types+node@22.10.2_postcss@8.4.49_react@18.3.1_7gkshjenuylhdtvnhf4ktjn34e/node_modules/vitepress
lrwxrwxrwx 1 office office   50 Dec 23 16:02 node_modules/vue -> .pnpm/vue@3.5.13_typescript@5.6.3/node_modules/vue
lrwxrwxrwx 1 office office   58 Dec 23 16:53 node_modules/vue-tsc -> .pnpm/vue-tsc@2.1.10_typescript@5.6.3/node_modules/vue-tsc


 pnpm store status
 ERR_PNPM_UNEXPECTED_STORE  Unexpected store location

The dependencies at "/mnt/c/wamp64/www/dev/project-apollo/interactive/node_modules" are currently linked from the store at "/mnt/c/wamp64/www/dev/project-apollo/.pnpm-store/v3".

```sh
~ npm ls -g typescript
/home/office/n/lib
~  npm i -g typescript
~ cd ~/n/lib/node_modules
~  ls -la 
total 32
drwxr-xr-x 8 office office 4096 Dec 24 10:27 .
drwxr-xr-x 3 office office 4096 Dec 16 17:46 ..
drwxr-xr-x 4 office office 4096 Dec 16 18:01 corepack
drwxr-xr-x 7 office office 4096 Dec 16 18:01 npm
drwxr-xr-x 4 office office 4096 Dec 18 10:16 pnpm
drwxr-xr-x 5 office office 4096 Dec 23 12:08 tree-node-cli
drwxr-xr-x 4 office office 4096 Dec 24 10:27 typescript
drwxr-xr-x 7 office office 4096 Dec 16 18:33 vite
```