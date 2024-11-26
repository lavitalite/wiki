# 镜像的创建管理和发布

[toc]

## 镜像的获取

- pull from registry
- load from file
- build from dockerflie

![](../img/docker-stages.png)



## 镜像操作

:::tip etc stands for 
almost all system-wide configuration files are under /etc
You can find references to "et cetera" in old Bell Labs UNIX manuals and so on – nowadays it's used only for system configuration, but it used to be where all the stuff that didn't fit into other directories went.
:::
```sh
docker image

```

## build image from dockerfile

```dockerfile
FROM ubuntu:20.04
RUN apt-get update
RUN apt-get install -y wget
RUN wget https://github.com/ipinfo/cli/releases/download/ipinfo-2.0.1/ipinfo_2.0.1_linux_amd64.tar.gz
RUN tar zxf ipinfo_2.0.1_linux_amd64.tar.gz
RUN mv ipinfo_2.0.1_linux_amd64 /usr/bin/ipinfo
RUN rm -rf ipinfo_2.0.1_linux_amd64.tar.gz
```

改进版Dockerfile
```dockerfile
FROM ubuntu:20.04
RUN apt-get update && \
    apt-get install -y wget && \
    wget https://github.com/ipinfo/cli/releases/download/ipinfo-2.0.1/ipinfo_2.0.1_linux_amd64.tar.gz && \
    tar zxf ipinfo_2.0.1_linux_amd64.tar.gz && \
    mv ipinfo_2.0.1_linux_amd64 /usr/bin/ipinfo && \
    rm -rf ipinfo_2.0.1_linux_amd64.tar.gz

```



### 构建参数和环境变量

![](../img/docker_env_vs_args.webp)

```dockerfile
FROM ubuntu:20.04
ENV VERSION=2.0.1
RUN apt-get update && \
    apt-get install -y wget && \
    wget https://github.com/ipinfo/cli/releases/download/ipinfo-${VERSION}/ipinfo_${VERSION}_linux_amd64.tar.gz && \
    tar zxf ipinfo_${VERSION}_linux_amd64.tar.gz && \
    mv ipinfo_${VERSION}_linux_amd64 /usr/bin/ipinfo && \
    rm -rf ipinfo_${VERSION}_linux_amd64.tar.gz
```


### 容器启动命令

ENTRYPOINT

CMD

shell格式

exec格式

:::info shell -c flag

The -c argument is:

Read commands from the command_string operand instead of from the standard input.  the positional parameters ($1, $2, etc.)
:::


:::info 0.0.0.0 环回地址 私有地址
​启动本地开发服务器(Client和Server可以不在一台机器上)配置监听host
`localhost`: 限制只能从本机访问,
`0.0.0.0`: 不限定只能从本机访问，还可以从局域网的其他设备通过局域网ip访问



本机的三块网卡
loopback（虚拟网卡）
en0 ethernet（有线网卡）
wlan（你的无线网卡）

bind server to host `0.0.0.0`
NAT会将我们的私有地址转成路由器中的公网IP与外部Internet连接

监听本机所有网卡的 IP 地址
iptables

::: tip reference
　现在有两台pc在同一个局域网内，分别为pc1与pc2，pc1上有一个网卡，IP地址为192.168.10.128，那么：

（1）pc1中sever监听127.0.0.1，则pc1中的client可以连上127.0.0.1，192.168.10.128连不上；而pc2中client都连不上。

（2）pc1中sever监听192.168.10.128，则pc1中的client可以连上192.168.10.128，127.0.0.1连不上；而pc2中client能连上192.168.10.128。

（3）pc1中sever监听0.0.0.0，则pc1中的client可以连上127.0.0.1和192.168.10.128，pc2中的client能连上192.168.10.128。
:::


查询本机出口公网ip`curl ifconfig.me` `tracert www.google.com`
查询本机内网ip`ipconfig | grep en0` `ipconfig | grep wlan`

![](../img/ip_break_down.jpg)
:::