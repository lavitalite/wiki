#!/bin/sh
# Uncomment below and rerun script to enable an option.
# git config blame.markIgnoredLines
# git config blame.markUnblamables


git config blame.ignoreRevsFile .git-blame-ignore-revs
git config --get blame.ignoreRevsFile