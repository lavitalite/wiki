## docker 命令行的基本使用

docker + 管理的对象（比如容器，镜像） + 具体操作（比如创建，启动，停止，删除）

- docker image pull nginx 拉取一个叫 nginx 的 docker image 镜像

- docker container stop web 停止一个叫 web 的 docker container 容器

## 容器

### 容器 vs 镜像

`镜像`： read-only 文件 包含依赖

`容器`： docker image 加入 `read-write`层

![](../imgs/container-arch.png)

### 容器的操作



| action | command                            |
|--------|------------------------------------|
| create | docker container run <image-name>  |
| list   | docker container ls                |
| stop   | docker container stop <name or id> |
| delete | docker container rm <name or id>   |



:::tip 批量停止和删除
`docker container stop cd3 269 34b 751` 批量停止
`docker container rm $(docker container ps -ap)` 批量删除
:::


## manage docker as a not-root user 



