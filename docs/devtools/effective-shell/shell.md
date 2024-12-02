
## find the path of executable
to find the path of executable from env variable($PATH)

```sh
ls /usr/bin | grep -w "ls"
# from env variable
echo $PATH | grep -o '[^:]*node[^:]*'
```

## shell: command interpeter

```sh
cat /etc/shells
# /etc/shells: valid login shells
/bin/sh
/bin/bash
/usr/bin/bash
/bin/rbash
/usr/bin/rbash
/bin/dash
/usr/bin/dash
/usr/bin/tmux
/usr/bin/screen
/bin/zsh
/usr/bin/zsh
```


## CLI

vendor of cli

- terminal in macos
- powershell in windows

## cli framework

- yargs
  - gulp-cli
  - rollup-cli(vie底层)
  - create-vue scafold
- commander
  - vue-cli
  - wepack-cli
  - create-react-app
- oclif(脚手架生成)



