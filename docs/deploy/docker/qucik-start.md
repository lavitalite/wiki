

## 最小可用env setup





install with prefer package

build from binary source

## install from centos
利用vagrant配置文件创建两台虚拟机

```sh
vagrant up
vagrant status

```

``` [Vagrantfile]

Vagrant.require_version ">= 1.6.0"

boxs = [
  {
    name: "docker-node1",
    :eth1: "192.168.205.10",
    :mem: "1024",
    :cpu: "1"
  },
  {
    name: "docker-node2",
    :eth1: "192.168.205.11",
    :mem: "1024",
    :cpu: "1"
  },
]


Vagrant.configure(2) do |config|

  config.vm.box = "centos/7"

  boxes.each do |opts|
    config.vm.define opts[:name] do |config|
      config.vm.hostname = opts:[:name]
      config.vm.provider  "vmware_fusion" do |v|
        v.vmx['memsize'] = opts[:mem]
        v.vmx['numvcpus'] = opts[:cpu]
      end

      config.vm.provider "virtualbox" do |v|
      v.customize ["modifyvm", :id, "--memory", opts[:mem]]
      v.customize ["modifyvm", :id, "--cpus", opts[:cpu]]
      end

      config.vm.network :private_network, ip: opts[:eth1]
      end
  end

  config.vm.sync_folder "./labs", "/home/vagrant/labs"
  config.vm.provision "shell", privileged: true, path: "./setup.sh"
end
```


```sh [setup.sh]
/bin/sh

# install tools

sudo yum install -y git nvim gcc glibc-static telnet bridge-utils

# install docker
curl -fsSL get.docker.com -o get-docker.sh
sh get-docker.sh


# start docker service
sudo groupadd docker
sudo usermod -aG docker vagrant
sudo systemctl start docker

rm -rf get-docker.sh
```
### 代理端口转发

## service up and running 