## before everything


```sh
$ head -4 ~/.zshrc
# proxy
export http_proxy=172.25.96.1:7897
export https_proxy=172.25.96.1:7899
export all_proxy=172.25.96.1:7898
```

## .zshrc


### prompt
````zsh
$ curl -s https://ohmyposh.dev/install.sh | bash -s -- -d /usr/local/bin
$ ls ~/.local/bin
oh-my-posh

```  [nvim .zshrc]
# ohmyposh exeuctable
export PATH=~/.local/bin:$PATH
# ohmyposh prompt
eval "$(oh-my-posh init zsh --config ~/.ohmyposh/cloud-native-azure.omp.json)"
```

$ ls ~/ohmyposh
cloud-native-azure.omp.json  spaceship.omp.json
$ mkdir -p ~/.ohmyposh
$ mv ~/ohmyposh/* ~/.ohmyposh/
$ ls ~/.ohmyposh
cloud-native-azure.omp.json spaceship.omp.json
````


### n pkgmgr


```sh
$ curl -I $(npm config get registry)
HTTP/1.1 200 Connection established
HTTP/2 200 
date: Mon, 16 Dec 2024 09:50:00 GMT
content-type: application/json
cf-ray: 8f2dc4435b05f910-SIN
cf-cache-status: DYNAMIC
npm-notice: This endpoint is deprecated. Use https://replicate.npmjs.com instead.
server: cloudflare

$ npm config set registry  https://registry.npmjs.org 


nvim .npmrc

```.npmrc
registry=https://replicate.npmjs.com
```
$ npm config ls
; "user" config from /home/office/.npmrc

registry = "https://replicate.npmjs.com"
; node bin location = /home/office/n/bin/node
; node version = v22.12.0
; npm local prefix = /mnt/c/wamp64/www/dev/project-apollo
; npm version = 10.9.0
; cwd = /mnt/c/wamp64/www/dev/project-apollo
; HOME = /home/office

$ npm config ls -l | grep proxy
; https-proxy = null ; overridden by user
noproxy = [""]
; proxy = null ; overridden by user
https-proxy = "http://172.25.96.1:7897"
proxy = "http://172.25.96.1:7897"
```