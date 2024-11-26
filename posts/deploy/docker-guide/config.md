```sh
more etc/docker/daemon.json
{"insecure-registries": ["10.777.44.222:500"]}
vi /lib/systemd/system/docker.service
ExecStart=/usr/bin/dockerd
EnvironmentFile=/etc/docker/daemon.json
service docker restart  
```