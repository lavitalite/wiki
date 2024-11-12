## 新建本地分支

```sh
git branch <localbranch> # 新建本地分支
git checkout -b <localbranch> # 新建本地分支并切换到该分支 
```

git checkout -b name


## 推送本地分支到远程分支



1. push without specifying `<repo-name` arugment, `branch.*.remote` conf for the current branch is consulted.
2. If the conf is missing, it defaults to origin




```sh


git push origin localbranch:remotebranch

```




```sh
git remote add origin git@github.com:<username>.git # 连接远程仓库
git branch --set-upstream=to=origin/remotebranch # 本地分支连接远程分支
git push origin localbranch:remotebranch

```


```sh
git checkout -b branch origin/remotebranch # 根据远程分支创建本地对应分支

```
## 本地分支连接远程分支


```sh

```


## 删除远程分支

```sh
git push oirigin --delete remotebranch
```





## GIT URLS

In general, URLs contain information about the transport protocol, the address of the remote server, and the path to the repository.


Git supports ssh, git, http, and https protocols





- ssh://[<user>@]<host>[:<port>]/<path-to-git-repo>

- git://<host>[:<port>]/<path-to-git-repo>

- http[s]://<host>[:<port>]/<path-to-git-repo>
