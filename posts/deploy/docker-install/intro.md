# 容器技术

::: info 
容器（集装箱）是一种技术，Docker是让容器技术普及开来的最成功实现
:::

---

## 为什么容器技术会出现

容器技术出现之前

![](./img/why_container_bf.webp){width=50%}
容器技术出现之后
![](./img/why_container_af.webp){width=50%}

容器vs虚拟机
![](./img/container_vs_vm.webp)



Linux Container主要由Namespace 2 和Cgroups 3 两大机制来保证实现

Namespace命名空间主要用于资源的隔离（诞生于2002年）

Cgroups(Control Groups)就负责资源管理控制作用，比如进程组使用CPU/MEM的限制，进程组的优先级控制，进程组的挂起和恢复等等。（由Google贡献，2008年合并到了Linux Kernel）

## 容器的标准化

在2015年，由Google，Docker、红帽等厂商联合发起了OCI（Open Container Initiative[^2]）组织，致力于容器技术的标准化

### 容器运行时标准 （runtime spec）

简单来讲就是规定了容器的基本操作规范，比如如何下载镜像，创建容器，启动容器等。
容器镜像标准（image spec）
主要定义镜像的基本格式。


## 架构

![](./img/docker-architecture.webp)



## 参考资料

[^1]: [cgroup is a Linux kernel feature that limits, accounts for, and isolates the resource usage (CPU, memory, disk I/O, etc) of a collection of processes]()

[^2]: [open container](https://opencontainers.org/)


[^1]: fastapi
