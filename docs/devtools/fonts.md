````sh
```sh
## 查询字体名
ls -la /mnt/c/windows/fonts/ | grep -E "(Fira|Hack|JetBrains|Robot)" | clip.exe
```
```json [.vscode/settings.json]
"terminal.integrated.fontFamily": "'Hack','JetBrainsMono Nerd Font'"
```
# restart computer to take effect
shutdown /r /t 0
````