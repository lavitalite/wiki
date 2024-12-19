## on Linux,macos, or wsl

### install n from releasing Bash scripts

- Download the releasing install bash script
- Make it executable with `chmod +x`
- Move or symlink it to a directory in your `$PATH`
- Invoke `n-stall`


### cleanup conflict nvm pkg if exists

cleanup shell rc file like `.bashrc` or `.zshrc`

```sh 
# comment or remove load scripts
export NVM_DIR="$HOME/.nvm"
[-s "$NVM_DIR/nvm.sh"] && source "$NVM_DIR/nvm.sh"
# rm nvm path varaibles
`export PATH="$HOME/.nvm:$PATH`
# rm nvm install dir
rm -rf ~/.nvm
# reload the rc the make the change effect
source ~/.zshrc
```

### install deps
no node.js to be install first


### what is included

`n-update` for later on-demand updating of `n`
`n-unistall` for uninstalling


### `n` is installed as follows:

n-install sets `N_PREFIX` to `$HOME/n`, installs `n` to `$HOME/n/bin`

### install directory

can be overridden with env variable `N_PREFIX`

- when overwrriding, is is advisable to choose a user location(with write permission), a subfoler of `~`, so as to avoid the need to use `sudo` for installation of global `npm` package
- Either way, the target directory must either be empty or not exists
- since both Node.js version are placed in the dedicated directory,simplifies the later unistallation


your default interactive shell( as reflected in environment variable `$SHELL`) initialization file is modified

- env var `N_PREFIX` is defined to point to the installation dir
- dir `$N_PREFIX/bin`is append to the `$PATH`
- **NOTE**: If you want to overwrite which init file is modified, set the `SHELL` env var to that shell's filename
- 

n caches Node.js versions in subdirectory n/versions. The active Node.js version is installed in subdirectories bin, include, lib, and share.

:::info install on system foler
to take ownership of the system directories

```sh
# make cache folder (if missing) and take ownership
sudo mkdir -p /usr/local/n
sudo chown -R $(whoami) /usr/local/n
# make sure the required folders exist (safe to execute even if they already exist)
sudo mkdir -p /usr/local/bin /usr/local/lib /usr/local/include /usr/local/share
# take ownership of Node.js install destination folders
sudo chown -R $(whoami) /usr/local/bin /usr/local/lib /usr/local/include /usr/local/share
```
:::


### overwritting install target directory
The `n` command downloads and installs to `/usr/local`by default. to overwrite install location
add followingl lines to shell init file
```.zhsrc
export N_PREFIX=$HOME/.n
export PATH=$N_PREFIX/bin:$PATH
```


### migrating to use n to manage package


```sh
npm list --global
npm uninstall --global *
```