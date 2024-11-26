## arch

image layer
linux kernal(bootfs) -> rootfs


## image的获取

- pull from registry
- dockerfile



```sh
groupadd docker
gpasswd -a 
service docker restart

```

## build image

```sh
docker run --help
-i --interactive Keep STDIN open even if not attached
-t --tty allocate a pseudo-TTY
```

## publish image


批量删除
```sh
docker container -h
-a, --all             Show all containers (default shows just running)
-q, --quiet           Only display container IDs
-f, --filter filter   Filter output based on conditions provided

docker container rm $(docker container ls -aq)
docker container rm $(docker container ls -f "status=exited" -q)
```
:::a


## 构建自己的镜像

```sh
docker container commit

docker image build

```


lo loopback 环回接口
eth0 


## docker hub

