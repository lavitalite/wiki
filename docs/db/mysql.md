brew services start mysql


## 更改mysql密码

### 修改配置文件

```ini [my.ini]
[mysqld]
port = 3306
skip-grant-tables
```
### 登录更改密码

USE mysql;

UPDATE user SET authentication_string = PASSWORD('new_password') WHERE User = 'root';
