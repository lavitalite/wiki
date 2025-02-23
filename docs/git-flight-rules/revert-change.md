



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

