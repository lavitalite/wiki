
---
date: 2020/10/02 21:29
categories:
 - github
tags:
 - github
 - git
showArticleMetadata: false
editLink: false
lastUpdated: false
showComment: false
---



## setup upstream branch


```bash
# check for existing upstream branch
# see also git remote show <remote>
# show sha1 and commit subject line for each head, along with relationship to upstream branch (if any)
$ git branch -vv
* main 87677f2 [origin/main] ignore temp file

# setup upstream branch for new feature branch
$ git push -u <remote-repo> <local-branch>:<remote-branch> # --set-upstream
$ git branch -u <remote-repo>/<remote-branch>
```

## git fetch



```bash
$ git fetch --tags


```

pull remote commit history to local repo



## git pull

`FETCH_HEAD` is a short-lived ref to keep track of what has just been fetched from a remote repo

force you to be explicit about which remote you're fetching from




## git push 
```sh
git push -u <remote-repo> <local-branch>:<remote-branch>

git push -u origin main:v1-vitepress
Enter passphrase for key '/c/Users/34476/.ssh/id_ed25519': 
branch 'main' set up to track 'upstream/v1-vitepress'.
```



```sh
git checkout <local-branch>
git branch -m <old-branch> <new-branch>
``` 


```sh
git push --delete <remote-repo> <remote-branch>
```




## change the default branch for a project


settings:nav->general:sidebar->default branch:option->switch-to-another-branch:action


## merge
### select merge method
- no fast-forward merge
- fast forward merge
- three way merge
- rebase and merge
- squash and merge



`git merge --no-ff <feature>`



### merge conflict
marks the beginning and end of the conflict block 


you wil get a merge conflict when both commit modifies the same line of same file

when conflicts arise, you must decide which changes to keep.


- `<<<<<<<` HEAD marks the beginning of the conflict block.
- `=======` marks the end of your changes.
- `>>>>>>>` marks the end of the conflict.




```bash
$ git merge origin/remote
# ahead commits
$ git fetch origin main
$ git checkout feature/login
$ git branch backup/login
$ git rebase origin/main
$ git push origin feature/login --force-with-lease
```


```bash
$ git merge --squash <target-branch>


$ git merge --ff <feature>
```


delete after merge


### merge policy

In Squash commits when merging, select the default behavior for handling commits:

- `Do not allow`: Squashing is never performed, and the user cannot change the behavior.
- `Allow`: Squashing is off by default, but the user can change the behavior.
- `Encourage`: Squashing is on by default, but the user can change the behavior.
- `Require`: Squashing is always performed, and the user cannot change the behavior.