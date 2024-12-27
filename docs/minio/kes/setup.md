
MinIO is built to deploy anywhere - public or private cloud, baremetal infrastructure, orchestrated environments, and edge infrastructure.


## install

requriement checklist
- build from rel w/ go toolchain
- pulling from docker image
- install from prefer package


OS and Arch

::: code-group

| **OS**         | **ARCH** | **Binary**                                                                                   |
| -------------- | -------- | -------------------------------------------------------------------------------------------- |
| Linux          | amd64    | [linux-amd64](https://github.com/minio/kes/releases/latest/download/kes-linux-amd64)         |
| Linux          | arm64    | [linux-arm64](https://github.com/minio/kes/releases/latest/download/kes-linux-arm64)         |
| Linux          | ppc64le  | [linux-ppc64le](https://github.com/minio/kes/releases/latest/download/kes-linux-ppc64le)     |
| Linux          | s390x    | [linux-s390x](https://github.com/minio/kes/releases/latest/download/kes-linux-s390x)         |
| Apple (M1, M2) | arm64    | [darwin-arm64](https://github.com/minio/kes/releases/latest/download/kes-darwin-arm64)       |
| Apple (Intel)  | amd64    | [darwin-amd64](https://github.com/minio/kes/releases/latest/download/kes-darwin-amd64)       |
| Windows        | amd64    | [windows-amd64](https://github.com/minio/kes/releases/latest/download/kes-windows-amd64.exe) |


move the dowload script store location
```sh
export PATH=$PATH:$HOME/minio-bins/
```

check command available by running the follow


```sh [macos]
brew install minio/stable/minio
```



env variable restrive source

create a env file at `etc/default/minio`



- build from source



## setup and running

- check existing key & certtificate


- generate privary key & certificate

- generate client crendentials/session key

- create the server config file

```yaml
address: 0.0.0.0:7373 # Listen on all network interfaces on port 7373

admin:
  identity: 02ef5321ca409dbc7b10e7e8ee44d1c3b91e4bf6e2198befdebee6312745267b # The client.crt identity

tls:
  key: private.key    # The KES server TLS private key
  cert: public.crt    # The KES server TLS certificate
```

- start KES Server

kes server --config config.yml

## deploy

Single-Node Single-Drive

Direct-Attached Storage voulme (DAS) 
Network-attached storage volume(NAS, SAN, NFS)
flash storage (NVMe, SSD)
 
 
in-memory key store

read-after-write and list-after-write consistency
exclusive access





minio offical training course

minio offical docs

minio source code 源码解析



Cloud native storage administrators
Site reliability engineers
Infrastructure engineers and architects


MinIO is a cloud-native object store


Primary use cases include data lakes, databases, AI/ML, SaaS applications and fast backup & recovery. 

deploy, secure, and scale a production MinIO object stor

## essentials
 multi-tenant, multi-node MinIO object store cluster.

replication，recovery
object lifecycle management,
MinIO SDK, and the S3 API. 
 webhooks for event handling and object transforms. 





```


## MINIO conosole

Dashaboard displays metrics for the MinIO deployment.



### log

log filter


### Audit



### trace

trace calls.


### Event


event notification

 display summary information 