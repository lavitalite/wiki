```yml
version: 3

services: 

    wordpress:
      image: wordpress
      ports:
        - 8000:80
      environment:
        WORDPRESS_DB_HOST: mysql
        WORDPRESS_DB_PASSWORD: root
      networks:
        - my-bridge
    mysql:
      image: mysql
      environment:
        MYSQL_ROOT_PASSWORD: root
        MYSQL_DATABASE: wordpress
      volumes:
        - mysql-data:/var/lib/mysql
      networks:
        - my-bridge


volumes:
  mysql-data

networks:
  my-bridge:
    driver: bridge

```



```yml [docker-compose]
version: "3"

services:
  redis: 
    image: redis
  
  web: 
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - 8080:5000
    environment:
      REDIS_HOST: redis
```


`--scale`负载均衡和弹性伸缩


```yml [docker-compose]
version: '3'

services: 
  voting-web:
    build: ./voting-web
    volumes: 
      - ./voting-web:/web
    ports:
      - "5000:80"
    links:
      - redis
    networks:
      - front-tier
      - back-tier
  dashboard-admin:
    build: ./dashboard-admin
    volumes: 
      - ./dashboard-admin/app
    ports: 
      - "5001:80"
    links: 
      - db
    network:
      - front-tier
      - back-tier
  
  worker:
    build: ./worker
    links:
      - db
      - redis
    networks:
      - back-tier
  
  redis: 
    image: redis
    ports: ['6379']
    network: 
      - back-tier
  db:
    image: postgres:9.4
    volumes: 
      - "db-data:/var/lib/postgresql/data"
    network:
      - back-tier
volumes:
  db-data

networks:
  front-tier
  back-tier
```