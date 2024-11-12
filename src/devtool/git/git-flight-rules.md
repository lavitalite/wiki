

What are "flight rules"?

A guide for astronauts (now, programmers using Git) about what to do when things go wrong.

    Flight Rules are the hard-earned body of knowledge recorded in manuals that list, step-by-step, what to do if X occurs, and why. Essentially, they are extremely detailed, scenario-specific standard operating procedures. [...]

    NASA has been capturing our missteps, disasters and solutions since the early 1960s, when Mercury-era ground teams first started gathering "lessons learned" into a compendium that now lists thousands of problematic situations, from engine failure to busted hatch handles to computer glitches, and their solutions.

— Chris Hadfield, An Astronaut's Guide to Life on Earth.

--- 



## Editing Commits

### what did I just commit?
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
git branch -m local_dev
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


```


```


## 远程仓库

git remote 


## git flow

trunk-based 和 feature-based git flow


## git fork

origin and upstream
clone and fork


## git remote 


## git ignore

```sh
echo "node_modules" >> .gitignore
git cat .gitignore
git status
git rm -r --cached .

```
```sh
git remote add upstream git@github.com:xiyuan404/yet_another_insigificant.git
git remove -v # view 
git remote set-url upstream git@github.com:xiyuan404/yet_another_insigificant.git
```

## git tags

## git lens

## references


[1^]: [git-flight-rules]:(https://github.com/k88hudson/git-flight-rules/blob/master/README.md#repositories)

[2^]: [atlassian](https://www.atlassian.com/git/tutorials/monorepos)