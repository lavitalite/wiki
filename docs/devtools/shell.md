
awk
sed

effect-shell


文件互传
`cp -r /mnt/c/Users/34476/.ssh/* ~/.ssh/`


## heredoc: 回显写入文件内容




## file & dir ownership
```sh
# take ownership of system folder
sudo chown -R $(whoami) /usr/local/n
# take ownership of Node.js install destination folders
sudo chown -R $(whoami) /usr/local/bin /usr/local/lib /usr/local/include /usr/local/share
# install fron releasing scripts
:::info install info
n-install sets both PREFIX and N_PREFIX to $HOME/n, installs n to $HOME/n/bin, modifies the initialization files of supported shells to export N_PREFIX and add $HOME/n/bin to the PATH, and installs the latest LTS Node.js version.
:::
```

## test conditions

```sh
export NVM_DIR="$HOME/.nvm"
[-s "$NVM_DIR/nvm.sh"] && source "$NVM_DIR/nvm.sh"
```




