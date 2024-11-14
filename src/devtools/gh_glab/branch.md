## change the remote branch name 

1. 拉取远程分支到本地

::: tip fetch vs pull
git fetch 不会自动合并
git pull 会合并分支
:::

::: tip Detach head 

:::


2. 切换到本地分支，重命名

```sh
git checkout <local-branch>
git branch -m <old-branch> <new-branch>
``` 

3. 删除远程分支

```sh
git push --delete <remote-repo> <remote-branch>
```

4. 推送新分支到远程分支并当前所在的本地本质追踪到上游分支

```sh
git push -u <remote-repo> <local-branch>:<remote-branch>

git push -u upstream main:v1-vitepress
Enter passphrase for key '/c/Users/34476/.ssh/id_ed25519': 
branch 'main' set up to track 'upstream/v1-vitepress'.
```

## change the default branch for a project


