## docker命令行的基本使用
docker + 管理的对象（比如容器，镜像） + 具体操作（比如创建，启动，停止，删除）



- `docker image pull nginx` 拉取一个叫nginx的docker image镜像

- `docker container stop web` 停止一个叫web的docker container容器



## container action


## contianer mode

attach
`docker container run -p 80:80 nginx`
detach
`docker container run -d -p 80:80 nginx`


## `docker container run`背后发生了什么



- 在本地查找是否有nginx这个image镜像，但是没有发现

- 去远程的image registry查找nginx镜像（默认的registry是Docker Hub)

- 下载最新版本的nginx镜像 （nginx:latest 默认)

- 基于nginx镜像来创建一个新的容器，并且准备运行

