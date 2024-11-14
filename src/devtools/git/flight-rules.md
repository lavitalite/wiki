

::: info What are "flight rules"?

A guide for astronauts (now, programmers using Git) about what to do when things go wrong.

Flight Rules are the hard-earned body of knowledge recorded in manuals that list, step-by-step, what to do if X occurs, and why. Essentially, they are extremely detailed, scenario-specific standard operating procedures. [...]

NASA has been capturing our missteps, disasters and solutions since the early 1960s, when Mercury-era ground teams first started gathering "lessons learned" into a compendium that now lists thousands of problematic situations, from engine failure to busted hatch handles to computer glitches, and their solutions.

— Chris Hadfield, An Astronaut's Guide to Life on Earth.
::: 
--- 



## 提交历史


### 查看本地和远程提交历史

```sh
git log --oneline --graph --decorate --all
git log --stat --graph --decorate --all
# see the changes introduced by  commit on file
git show upstream/vitepress .gitignore
```
git show

git log -n1 -p

to see the file I just commited

```sh
git show <commit-id>:filename
```

### correct the mistake in last commit

not yet been pushed to remote

```sh
git commit --amend --only -m 'xxx' # change commit message
git commit --amend --no-edit # amend without changing commit message
```

wrong email config

```sh
git commit --amend --no-dit --author "newAuthrorName <authoremail@mydomain.com"
```

or alternative, `git config --global author.(name|email) and then

```sh
git commit --amend --reset-author --no-edit
```

### remove file from previous commit


```sh
git checkout HEAD^ <filename>
git add <filename>
git commit --amend --no-edit
```


### move change from one commit ot another



### accidentally commit and push sercet

```sh
git add <file-cleanup-scerct>
git commit --amend --no-edit
git push --force-with-lease origin <remote-branch>
```

remove entire file but keep it locally
```sh
git rm --cached .env.local
echo ".env.local" >> .gitignore
git add .gitignore
git coomit --amend --no-edit
git push --force-with-lease origin <remote-branch>
```

to remove an entire file (and not keep it locally), 
```sh
git rm .env.local
```


## Discarding changes

discard all your local staged and unstaged changes
```sh
git reset --hard
```


```sh
touch .gitignore
echo "node_modules" >> .gitignore
```

## Branches

### 变更本地分支名

```sh
git branch -m <new-branch>
```





### 查看本地和远程分支

```sh
git branch # list local branches
git branch -r # list remote branches
git branch -a # list both local and remote branches
```

### 新建分支


```sh
git checkout -b <branch> <sh1-of-commit> # create a branch from a commit

```


### 切换分支


## 推送到远程仓库

### 推送本地分支到远程分支

```sh

git push -u <remote-repo> <remote-branch> # 将本地所在分支推送到远程分支
git push <remote-repo> <local-repo>:<remote-repo> # 指定本地分支推送到远程分支
```


### 查看远程仓库有配置
```sh
git remote show upstream
Enter passphrase for key '/c/Users/34476/.ssh/id_ed25519': 
* remote upstream
  Fetch URL: git@github.com:xiyuan404/yet_another_insigificant.git
  Push  URL: git@github.com:xiyuan404/yet_another_insigificant.git
  HEAD branch: main
  Remote branches:
    gh-pages  new (next fetch will store in remotes/upstream)
    main      new (next fetch will store in remotes/upstream)
    vitepress tracked
  Local branch configured for 'git pull':
    main merges with remote vitepress
  Local ref configured for 'git push':
    main pushes to main (local out of date)
```


```sh
echo "" > ~/.ssh/github_id_ed25519 # windows下创建文件
ssh-keygen -t ed25519 -f ~/.ssh/github_id_ed25519 -C "bayesianifeg1@gmail.com" -N "office_only"
```
在`~/.ssh/config`添加如下配置
```
Host github.com
    User git
    IdentityFile ~/.ssh/github_access/
```
测试ssh连接

导出公钥到github `SSH and GPG keys` settings中
```sh
pbcopy < ~/.ssh/id_ed25519.pub # mac
cat ~/.ssh/id_ed25519.pub | clip # windows
```

推送分支
```sh
git push <upstream-name> <localbranch>:<remotebranch> # 推送本地分支到远程分支
git branch --set-upstream-to=<upstream>/<remote-branch> <local-branch> # 设置上游分支
gi
```

拉取分支

```sh
git fetch <remote> <branch>
```

```sh
git config --list --show-origin
git config --global user.name "xxx"
git config --global user.email "xxx"
```




## 远程仓库

git remote 


## git flow

trunk-based 和 feature-based git flow


## git fork

origin and upstream
clone and fork


## git remote 

```sh
git remote add upstream git@github.com:xiyuan404/yet_another_insigificant.git
git remove -v # view 
git remote set-url upstream git@github.com:xiyuan404/yet_another_insigificant.git
```


## git ignore

```sh
echo "node_modules" >> .gitignore
git cat .gitignore
git status
git rm -r --cached .

```


## git merge


```sh
$ git log --oneline --graph --all
* 9e18063 (HEAD -> main) empty commit trigger redeploy, clear firefox dns cache for CNAM
| * 8188eec (upstream/vitepress) Delete CNAME
| * 9268456 Create CNAME
|/
* 14d6ac7 fix the base options setting
* b2ac4fc try to fix deploy site can not visis
* a76d75f fix: github actions in build proecss Upload artifact path corrected
* b5c8081 fix： 搭建好博客框架
* 2b0bb1e fix: correct the deploy branch
*   64bdf11 merge: merge gitignore conflict
|\
| * 5a15fe5 switch SSG to vitepress
* 455ac6e fix：amend 改变了提交sha,远程和本地分支没有共同历史了
* fc59259 update push config
:
```

```sh
git merge upstream/vitepress --allow-unrelated-histories
```

## git tags

## git lens

## references


[1^]: [git-flight-rules]:(https://github.com/k88hudson/git-flight-rules/blob/master/README.md#repositories)

[2^]: [atlassian](https://www.atlassian.com/git/tutorials/monorepos)