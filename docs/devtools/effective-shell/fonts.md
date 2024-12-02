## Github Monaspace install Guide


cd `~/Downloads/monaspace-v1.101`
type `nvim install.sh` and past following scripts
`"*p` paste from system clipboard
```sh
#!/bin/bash

# remove all fonts from ~/Library/Fonts that start with "Monaspace"
rm -rf ~/Library/Fonts/Monaspace*

# copy all fonts from ./otf to ~/Library/Fonts
cp ./fonts/otf/* ~/Library/Fonts

# copy variable fonts from ./variable to ~/Library/Fonts
cp ./fonts/variable/* ~/Library/Fonts
```


add execute permission for current user `chmod u+x install.sh`


set the font family in vscode

```json
  "editor.fontFamily": "'Monaspace Neon', 'Fira Code', 'jetBrains Mono'",
  "terminal.integrated.fontFamily": "'Monaspace Argon', 'Fira Code', 'jetBrains Mono'",
```

shutdown and restart now
`sudo shutdown -r now`