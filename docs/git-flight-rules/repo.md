# build a git flow from bottom up


```bash
$ echo "ref: refs/heads/main" > .git/HEAD
$ echo "file content" > newfile.txt
$ git hash-object -w newfile.txt
# pickup register content hash from stage area
$ git write-tree
$ git commit-tree  [tree-hash] -m "commit message"
commit-hash
# register commit object id as new head of the branch 
$ echo [commit-hash] > .git/heads/main
```



## local and remote repo
repo are just dir with hidden `.git` dir which store the git internal data


## remote repo url

`@user:IP`

## init local repo 
```bash
$ git init <branch-name>
```
## clone from remote repo


## checking exiting remote repo setup

```bash
$ git remote show origin
* remote origin
  Fetch URL: git@github.com:lavitalite/zest-ui.git
  Push  URL: git@github.com:lavitalite/zest-ui.git
  HEAD branch: main
  Remote branch:
    main tracked
  Local branch configured for 'git pull':
    main merges with remote main
  Local ref configured for 'git push':
    main pushes to main (up to date)
```



## subrepo 

### subtree

```bash
# adding a remote repo as subtree
# --squash avoid floating with another remote repo commit history

$ git subtree add --prefix=<subfolder> [--squash]<remote-repo-url> <remote-branch-name>
# only merge commit was left
$ cd <subfolder> && git log README.md

# reset to before merge the remote repo
$ git reset --hard <commit-sha>

# reset the subtree from <current-state>..<older-state>
$ git subtree merge -P <folder> --squash <old-commit-sha>
```


### submodule

`.gitmodules`
`.git/config`
`.git/modules`

```bash
# shared-config, vendor-lib,vendor-utils
$ git submodule add <remote-repo-url> .github

$ git clone --recurse-submodules <remote-repo-url>
# navigate to submodule
$ cd git .github
$ git submodule update --init --recursive
```


```bash
$ git clone <source-repo-url> 


$ git submodule update --init
```

### git filter-repo

```bash
# preserve only commit that touch the subfolder
# commit that only touch other files are removed
$ git filter-repo --path <folder-name> --refs <branch-name>

$ git remote add origin <new-repo-url>

$ git push -u origin main


```


### git subtree

## monorepo



## collaboration 