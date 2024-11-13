---
titile: Setup vitepress
---

## install and setup

Install vitepress with your preferred package manager:


viepress shipped with core package

```sh
$ npm add -D vitepress
```

creat a config file manually or run `npx vitepress init` to boostrap a biolerplate





## Up and Running

when you run `vitepress dev` or `vitepress build` from the command line, vitePress will use current working directory as project root. To specify a sub-directory as proejct root, you need to pass the realtive path to command. If your vitepress project is located in `./docs`, you should run `vitepress dev docs`.


Project root is where vitepress will try to look for the `.vitepress` speical directory. the `.vitepress` directory is a reserved location for vitepress config file, dev server cache, build output


