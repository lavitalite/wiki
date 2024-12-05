## For windows

### install preferences

install interactively with install wizard

build from source

with package manager

### system requirement

### what is included




## windows with wsl2
### wsl2开发环境搭建
set up a user name and password for your installed Linux distribution(s),
setting up GPU acceleration, 
 customizing Windows Terminal, set up for Git version control,
`win+r` type `winver`

Change the default Linux distribution installed
```sh
wsl --list --online
wsl --install -d <distribution-name>

```

:::info 
To change or reset your password, open the Linux distribution and enter the command: passwd.
You will be asked to enter your current password, then asked to enter your new password, and then to confirm your new password.
:::

```sh
 curl --verbose -I --compressed https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/nvm.sh
* Uses proxy env variable https_proxy == 'https://127.0.0.1:7897'
*   Trying 127.0.0.1:7897...
* TCP_NODELAY set
* connect to 127.0.0.1 port 7897 failed: Connection refused
* Failed to connect to 127.0.0.1 port 7897: Connection refused
* Closing connection 0
curl: (7) Failed to connect to 127.0.0.1 port 7897: Connection refused
```
Make sure you have a service started and listening on the port.
```sh
$netstat -ln | grep 7897
office@Dan:~$ sudo netstat -tulpn
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
```

`-t`：显示 TCP 连接。
`-u`：显示 UDP 连接。
`-l`：只显示正在监听（listening）的套接字。
`-p`：显示与每个连接相关联的进程 ID（PID）和程序名称。
`-n`：以数字形式显示地址和端口号，而不是尝试确定主机名和服务名。