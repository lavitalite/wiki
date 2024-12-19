## shell as command interperter program

内部命令`pwd`
外部命令: 本身都是一个应用程序，比如 ls

```sh
pid_t pid;

# fork + exec 子进程创建方式
pid = fork();
if (pid == 0) {
  exec ls;
} else {
  wait(NULL);// 等待子进程执行完成
}
```



on windows:
to use Bash-like shell
- Use a tool like cwygin which provides common bash command which have been written to work with Windows
- Use a "virtual machine" running Linux
- Use the Windows Subsystem for Linux




DevOps, system adminstators and site reliability engineer
connect to remote machine, connect to container, manage clusters or cloud environments

## Navigaiton


![](oss/pushd-popd-stack.png)


## Managing files

```sh
cp /etc/ssh-config.bak/* ~/.ssh/

```


## clipboard gymnast


```sh
# on wsl
alias pbcopy='clip.exe'
alias pbpaste="powershell.exe -command 'Get-Clipboard' | tr -d '\r' | head -n -1"
# on linux
sudo apt install -y xclip
alias pbcopy="xclip -selection c"
alias pbpast="xclip -selection c -o"
```


```sh
# usecase: text processing
$ pbpaste | sort | uniq | tr " " "_" | sed 's/$/@simpons.com/'
Agnes_Skinner@simpons.com
Artie_Ziff@simpons.com
Cletus_Spuckler@simpons.com
Hank_Scorpio@simpons.com
Helen_Lovejoy@simpons.com
John_Frink@simpons.com
Kirk_Van_Houten@simpons.com
Nick_Riviera@simpons.com
Ruth_Powers@simpons.com
Seymore_Skinner@simpons.com
```


### getting help


```sh
# list listening port for a given process
 netstat -tnlp

```


Go to beginning / end

Quickly jump to the beginning or end of the text:

- `Ctrl + a` - Go to beginning
- `Ctrl + e` - Go to end

Move oneword forward/backward

- `Alt + b` - Go back one word
- `Alt + f` - Go forward one word

delete 
- `ctrl + w` delete one word
- `ctrl + u` delete whole line
- `ctrl + k` delete to end