#!/bin/bash

# Use platform-specific clipboard tools
case "$OSTYPE" in
  darwin*)   pbcopy ;;                          # macOS
  msys*|cygwin*) clip.exe ;;                    # Windows (including WSL)
  linux*)    xclip -selection clipboard ;;      # Linux (with xclip installed)
  *)         echo "Unsupported OS: $OSTYPE" >&2; exit 1 ;;
esac