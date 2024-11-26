one process per connection

10k client connection

Nginx 使用了 Master-Worker 机制机制，真正处理请求的是 Worker 进程。 Master 进程可以监控 Worker 进
程的运行状况，当某个 Worker 进程因意外原因退出的时候， Master 会重新启动 Worker 进程；
![](../)
