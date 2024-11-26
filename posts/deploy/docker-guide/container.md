
## Running Container

isolate fs, networking and process tree

### command form
```sh
docker run [OPTIONS] IMAGE[:TAG|@DIGEST] [COMMAND] [ARG...]
```

### Image refs

the image refs is the name and version of the image 

`docker run image[:TAG][@DIGEST`

an image tag is the image the version, which defaults to `latest` when omitted
content addressable identifier called a digest

## OPTIONS 配置项


### start up cmd and args

specify the command to run on container start up 





### 容器的持久化存储和数据共享

#### data volume

`docker run -v db:/var/lib/mysql`
`VOLUME /var/lib/mysql`


#### bind mounting

`docker run -v $(pwd):/usr/share/nginx/html -p 80:80`

temp/presistent data storage
fs mount

nas/aws/native data volume


:::info 文件拷贝和同步
```sh
vagrant scp <local_path> [vm_name]:<remote_path>
```
:::



```dockerfile
FROM python:2.7
LABEL maintainer="Xi Yuan<hack.xiyuan@gmail.com"

COPY . /boilerplate
WORKDIR /boilerplate
RUN pip install -r requirements.txt
EXPOSE 5000
ENTRYPOINT ["scripts/setup.sh"]
```

```sh [setup.sh]
export APP_SETTINGS="skeleton.server.config.ProductionConfig"
python manage.py create_db
python manage.py create_admin
python manage.py create_data
python manage.py runserver -h 0.0.0.0

```


### 容器运行的资源限制

```sh
docker run --help
-c --cpu-shares(相对权重） 
-m --memory-bytes Memory limit
```




### 容器运行的连通性(connectivity)


internal connectivity
external connectivity


configure nat for external access
test network connectivity



#### docker built-in net driver
macvlan
multi-host
bridge
multiple hosts or clouds.

`iptables`: rich L3/L4 firewall that provides rule chains for packet marking and dropping.


multi-tenant microservices deployments

--subnet
--gateway

端口映射

`-p IP:host_port:container_port`
when an IP address is not specified, or `0.0.0.0:host_port` 
port mapping will be expose on all interfaces of a host(主机的所有网卡)

