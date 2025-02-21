
## Inspecting changes

- git log
- git show


### list commit


- An abbreviated object ID.
- The subject line of the commit message
- The commit date in short form


```bash
$ alias gitlog=git log --graph --oneline --all

# show default branch if not specified
$ git log <remote-or-local-branch>
# start/stop log at another ref
$ git log <ref> 
# show commits that touch this file
$ git log <path/to/file> 
# combine the above both 
$ git log <ref> -- <path/to/file> 
$ git log --stat
```

## compare changes

- git diff
- git patch

### compare diff

compare file 
compare snapshot of repo
`man git-diff` for more ref

```bash
# compare change between working tree to index (staging area for the next commit).
$ git diff 
# compare latest two commit
$ git diff head head^
$  git diff HEAD:Makefile HEAD^1:Makefile
# compare index to latest commit, or synonym --staged flag, it defaults to head you you do not provide
$ git diff --cached [<commit>]
$ git diff-index
$ git diff-tree
```


### diff tool config setup

```bash [$HOME/.gitconfig]
[core]
  pager = delta

[interactive]
  diffFilter = delta --color-only
[delta]
  navigate --true
  dark=true
[merge]
  conflictstyle = zdiff3
```

### Search & Find

- by date `--before / --after`
- by message `--grep`
- by author `--author`
- by file `-- <filename>`
- by branch `<branch>`
- or combine


```bash
$ git log --after="2024-1-1" --before="2025-1-1" 
$ git log --grep="feat: "
$ git log --author="ransom"
$ git log -- README.md
$ git log feature/login..main
```


Revert unstaged local changes

```bash
$ git checkout -- <file>
$ git reset --hard
```


Revert staged local changes

```bash
# Confirm that the file is staged with git status:
$ git status

$ git restore --staged <file>
$ git reset --mixed
$ git reset HEAD <file>
```


Revert commits but  preserve history


```bash
# To revert changes introduced by commit 
$ git revert <commit-SHA>
#  changes on a single file or directory from commit, but retain them in the staged state:
$ git checkout <commit-SHA> <...file>
# revert changes on a single file or directory from commit, but retain them in the unstaged state:
$ git reset <commit-sha> <...file>
```

## cherry-pick
:::usecase
commit to wrong branch
:::

```bash
$ git checkout <feature-branch>
$ git cherry-pick <ref>
$ git checkout <main-branch>
$ git reset --hard HEAD~1
```


## git merge

### mergetool$$

### merge base

- locate common ancestor
- calculate diff
- apply both patch together

| base | branch a | branch b | 3-way merge result |
|------|----------|----------|--------------------|
| x    | x        | y        | accept b           |
| x    | y        | x        | accept a           |
| x    | x        | x        | do nothing         |
| x    | y        | y        | accept (a | b)           |


### merge conflict

review how a merge conflict get resolved

```bash
$ git show --remerge-diff <commit-sha>
$ git log --remerge-diff <branch>
```

investigate the conflict resolution you have done so far

```bash
$ git diff AUTO_MERGE
```


## about git reset


## about gir revert



## about git rebase


## about git cherry-pick
## revert a public change

removed in the old commit will be added in the new commit 
added in the old commit will be removed in the new commit.

