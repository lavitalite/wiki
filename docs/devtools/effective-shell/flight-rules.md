```sh [tree]
npm install -g clipboard-cli # 跨平台剪贴板
tree -dF -I node_modules -L 4 | clipboard # windows
tree -dF -I node_modules -L 4 | clip.exe # windows
tree -dF -I node_modules -L 4 | pbcopy # maocs
# shell scripts
chmod u+x clip
mv clip /usr/local/bin/

```

```sh
#!/bin/bash

# Use platform-specific clipboard tools
case "$OSTYPE" in
  darwin*)   pbcopy ;;                          # macOS
  msys*|cygwin*) clip.exe ;;                    # Windows (including WSL)
  linux*)    xclip -selection clipboard ;;      # Linux (with xclip installed)
  *)         echo "Unsupported OS: $OSTYPE" >&2; exit 1 ;;
esac
```

