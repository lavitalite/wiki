## awesome dockerfile w/ offical dockerfile libs

shell 格式

```dockerfile
RUN apt-get install -y nvim
ENV LANG en_US.UTF-8
LABEL maintainer=Xi Yuan<hack.xiyuan@gmail.com>
```

exec 格式

```dockerfile
RUN ["apt-get", "install", "-y", "nvim"]
ENV LANG en_US.UTF-8
ENTRYPOINT ["/bin/bash", "-c", "/bin/echo $LANG"]
```

## entrypoint battle-proof practice

```dockerfile

ENV LANG en_US.UTF-8
ENTRYPOINT ["/bin/bash", "-c", "/bin/echo $LANG"]
COPY docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["docker-entrypoint.sh"]
```

:::info sh -c flag
Read commands from the command_string
:::

```dockerfile
FROM ubuntu
RUN apt-get update && apt-get install stress
ENTRYPOINT ['/usr/bin/stress']
CMD []
```
