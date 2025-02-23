

# reference store


>named pointer(具名指针) point to key in object db

think of the reference store as a two-column table with columns for the `reference name` and the `object ID`


- tags
- branches
- head
- prior ref caret symbol`^` tilde(`~`) symbol
- name^{tree}
- name1…name2 triple dot range
- name1..name2 double dot range



- branch head pointer(
分支头指针)



branch are mutable pointer/reference to a commit

it can move via `commit`, `reset`, `rebase`

branch head（分支头）pointer are store in 
`.git/refs` dir



when you checkout a branch, the checkout revision is the latest commit in that branch is your checkout version




## spectrum


team/member branch
feature branch
`feature/newsletter`
`feature/login`



## detached head

head points to a commit currently on








##  checking branch

```bash

# default branch
git branch
# list local branch
git branch --list
# list remote branch
git branch  --remote
# combine above both
git branch --list --all
# currently on branch
git status
```
## Create a  newbranch

> a ref is commit, tag, local branch, or remote branch or any other spec point to commit in history
```bash
#   -b <branch> - create and checkout new branch
# create at HEAD() unless otherwise specified
# ref - the location to stare the new branch at
$ git checkout -b <branch-name> [<ref>]

$ git branch feature/login b1a249b 
$ git switch feature/login
```

## delete branch

```bash
$ git branch --delete 
# -d, --delete 
# -D Shortcut for --delete --force.


$ git branch --delete --remotes origin/feature/login
```


### `gitreflog`: headpointer log

:::usecase
recovering deleted commit
recovering deleted branch
:::

```bash
$ git reflog
```



## restore a branch


## Rename a local branch

```sh
git checkout <local-branch>
$ git branch [<options>] (-m | -M) [<old-branch>] <new-branch>
``` 

## delete a branch


```bash
$ git branch -d <local-branch-to-delete>

git push --delete <remote-repo> <remote-branch>
```



## change the default branch for a project


settings:nav->general:sidebar->default branch:option->switch-to-another-branch:action


## pushing commit to remote repo



### About git push
The `git push` command takes two arguments:

- A remote repo name like `origin`
- A remote branch name like `main`

```bash
git push <remote-name> <local-branch-name>:<remote-branch-name>
```
v3-vitepress-rc
###  Dealing with "non-fast-forward" errors


If your local copy of a repository is out of sync with, or "behind" the upstream repository you're pushing to, you'll get a message saying non-fast-forward updates were rejected









## Tags Lifecycle management

git are ref store(name pointer) point to commit sha


- lightweight tag
- annotated tag: containing metadata such as the tagger’s name, email, date, and a tagging message.
### Pushing tag

```bash

git push <remote-name> <tag-name>
# To push all your tags, you can type the command:
git push <remote-name> --tags
# to delete remote tag
$ git push <remote> --delete <tagname>
$ git push <remote> :refs/tags/<tagname>
# Verifying the Deletion
$ git fetch --prune origin "+refs/tags/*:refs/tags/*"
$ git ls-remote --tags <remote>
$ git ls-remote --tags origin
```
### Tag Deletion



### Why Delete Remote Tags?
- Obsolete Releases: Removing tags that reference outdated or incorrect releases.
- Incorrect Tagging: Correcting mistakes in tag names or the commits they point to.
- Repository Cleanup: Maintaining a clean and organized repository by removing unnecessary tags.


### Delete a remote tag

```bash
# checking existing tags
$ git push <remote> --delete <tagname>
# patch deletion
$ git push -d <remote> $(git tag -l "<tag-prefix>*")
# 
$ git push <remote> :refs/tags/<tagname>

# verify the deletion
$ git fetch --prune origin "+refs/tags/*:refs/tags/*"
# or just
$ git fetch --prune origin
# To see the current tags on the remote:
git ls-remote --tags origin
```


### Deleting a Local Tag

```bash
$ git tag -d <tagname>
# patch deletion
$ git tag -d $(git tag -l "<tag_prefix>*")
$ git tag -d $(git tag -l "v9.11.*")
Deleted tag 'v9.11.1' (was 78d8858)
Deleted tag 'v9.11.2' (was edd3eb9)
# verify Deletion
$ git tag -l
```




### Deleting remote branch
```bash
git push <remote-repo-name> :<remote-branch-name> 
git push --delete <remote-repo-name> <remote-branch-name>
```


## merge commit

### fast-forward merge


assume we are checkout to foo
foo are reachable on bar

```bash
$ git merge bar
$ git reset --hard bar
```

### Clone and forks





## interactive rebase
::: waring
Do NOT use interactive rebase on commits that already pushed on a remote repo.
Instead, use it for cleaning local commit. before merge it into a shared team branch
:::

change commit message `reword`
squash into one
split into multi
delete commit `drop`
reorder commit


`git rebase -i HEAD~2`

`git rebase --continue`
`git rebase --abort`
`git rebase --edit-todo`
`git rebase --skip`
## cherry-pick




