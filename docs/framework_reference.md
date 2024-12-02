## 模块化架构

### url-access vs CLI-access



###  module access control

```php
'MODULE_DENY_LIST' => array('Common','Runtime', 'Api')
'MODULE_ALLOW_LIST' => array('Home','Admin','User')
# 默认模块可以不出现在URL片段中
'DEFAULT_MODULE' => 'HOME'
```
### default module

直接访问入口文件，由于URL中没有模块，控制器，系统会访问默认模块(Home)下的默认控制器(Index)的默认操作(Index)

### 应用多入口设计


### url mode

从当前的url参数中解析访问的模块和控制器

#### parse from url query string

`http://localhost/?m=home&c=user&a=login&var=value`

```php
'VAR_MODULE'            =>  'module',     // 默认模块获取变量
'VAR_CONTROLLER'        =>  'controller',    // 默认控制器获取变量
'VAR_ACTION'            =>  'action',    // 默认操作获取变量
```

#### parse from path segement

`http://localhost/index.php/home/user/login?var=value`
重写默认配置
```php
'URL_PATHINFO_DEPR'=>'-', 
```

在web部署目录下(index.php同级目录)创建新的应用入口文件


### controller

外部请求响应和内部事件处理




### AOP

当应用程序运行到行为作用的位置(也称为钩子)，发生之前或发生之后，就会被拦截下来，统一执行相关的行为

beforeRender
浏览器检测、多语言检测，用户权限检测

app_init
module_check
view_begin
view_filter
view_parse
view_end


## 遵循框架和语言的命名规范和目录规范


## 配置格式

配置格式customizable
支持`.ini`, `.yaml`, `.json`, `.xml`

## 配置文件的加载顺序和命名规范

## reasonable default 配置

`ThinkPHP/Conf/convention.php` 项目配置
`Application/Common/Conf/config.php` 应用配置
`Application/Commmon/Conf/office.php` 环境(状态)配置
`Application/module_name/Conf/config.php` 模块配置

### 配置文件的拆分

## 配置的读取

#


## server side routing

path matching pattern(validation) -> Module/Controller/Method


client side routing
path matching pattern(validation) ->  Route component

```php
define("CONF_EXT", '.ini')

```
## 支付和广告投放

graphic banner or text ad placemnt


## 控制器


### 前置和后置操作
### 空操作和空控制器
请求的操作方法的时候，会定位到空操作（_empty）方法来执行

系统找不到请求的控制器名称的时候，系统会尝试定位空控制器(EmptyController)，利用这个机制我们可以用来定制错误页面和进行URL的优化。
```php
namespace Home\Action;
use Think\Controller;

class EmptyAction extends Controller {
    public function index(){
        $cityName = CONTROLLER_NAME;
        $this->city($cityName)
    }
    protected function city($name) {
        echo '当前城市:' . $name
    }
}

```


## 模型



### 约定对应数据库表名映射规则
CategoryModel，按照系统的约定，这个模型的名称是Category，对应的数据表名称应该是think_category（全部小写），但是现在的数据表名称是think_categories



#### 模型常见属性

```php
namespace Home\Model;
use Think\Model;
class CategoryModel extends Model {
    protected $tablePrefix = 'top'
    protected $tableName = 'categories'
    protected $trueTableName = 'top_categories'；
    protected $dbName = 'top';
    protected $pk = '_id';
    protected $schema 
    protected $field
    protected $type
    protected $disuse
    protected $suffix = '_en' 
  // 数据转换为驼峰命名
    protected $convertNameToCamel = true,
}

```

#### 模型字段


从模型外部获取字段`ObejctAcess`
```php
$user = User::find(1)
echo $user->create_at
echo $user->update_at
```

模型类实现了`ArrayAcess`接口，可以当成数组使用
```php
$user = User::find(1)
echo $user['create_at']
echo $user['update_at']
```

从模型内部访问

模型赋值

#### 模型操作

自动匹配对应的数据表

更新时间自动写入


#### 新增

```php

User::create([
    'status' => 'not_started',
    'token' => 'a16'
], ['status', 'token'])

$user->saveAll($list);
```
外部数据源新增字段过滤

批量新增

#### 字段更新

查找并更新,条件更新

```php
User::where('status','wip')
    ->where('update_at', '<', '1d')
    ->find()

User:update([], ['status'=> 'supsended'])
```


字段写入过滤
`$user->allowField(['name','email'])->save($_POST)`
批量跟新数据

```php

$batch_update = [
     ['id'=>1, 'name'=>'thinkphp', 'email'=>'thinkphp@qq.com'],
    ['id'=>2, 'name'=>'onethink', 'email'=>'onethink@qq.com']
]
$user->saveAll($bactch_update)
```


### 数据库连接配置



### 连接格式
DSN格式`type://username:passwd@hostname:port/DbName#charset`

数据格式
```php
$connection = arrary(
    'db_type' => 'mysql',
    'db_user' => 'root',
    'db_pwd' => 'admin',
    'db_hostname' => '127.0.0.1',
    'db_port' => 3306,
    'db_name' => 'user'
    'db_charset' => 'utf8'
)
```
#### 字段
模型类是操作某个数据表，在大多数情况下，系统会自动获取当前数据表的字段信息。

```php
// 关闭字段缓存
'DB_FIELD_CACHE' => false
```
生成字段缓存文件在`Runtime/Data/_fields/<dbName>.<db_prefix>+<model_name_(lowercase)>.php`

获取当前表的所有字段`$model->getDbFields()`

设置数据库表的字段和类型

```php
namespace Home\Model;
use Think\Model;

class ScoreModel extends Model {
    protected $fields = array('user_id', 'lession_id', 'scrore'
    '_type'=>array('id'=>'bigint','username'=>'varchar','email'=>'varchar','age'=>'int')
);
    protected $pk = array('user_id', 'lession_id')
}

```

mysql, pgsql, oracle, mongo

使用模型中定义的数据库连接而不是配置文件中
```php
namespace Home\Model;
use Thinl\Model;
class UserModel extends Model {
    protected $connection = arrary(
        'db_type' => 'mysql',
        'db_user' => 'root',
        'db_pwd' => '',
        'db_host' => 'localhost',
        'db_port' => '3306',
        'db_name' => 'sass',
        'db_charset' => 'utf8'
    )
    // 额外数据库连接配置
    portected $connection = 'DB_CONF_BACKUP'
}
```

#### 切换数据库连接


#### 数据库表的链式操作

链式查询`$User->order('create_time')->limit(10)->where('status=1')->select();`

参数查询`$User->select(array('order'=>'create_time','where'=>'status=1','limit'=>'10'));`


#### 字段映射


#### 查询方式


查询条件
```php
$User = M('User');
$condition['_logic'] = 'OR';
$conditoin['account'] = '-xzsy';
$condition['_string'] = 'status = wip And conncection = active'
$User->where($condition)->select()
```
统计查询

方法	说明
Count	统计数量，参数是要统计的字段名（可选）
Max	获取最大值，参数是要统计的字段名（必须）
Min	获取最小值，参数是要统计的字段名（必须）
Avg	获取平均值，参数是要统计的字段名（必须）
Sum	获取总分，参数是要统计的字段名（必须）


getBy 和 getFieldBy

#### 字段验证

验证条件 （可选）
self::EXISTS_VALIDATE 或者0 存在字段就验证（默认）
self::MUST_VALIDATE 或者1 必须验证
self::VALUE_VALIDATE或者2 值不为空的时候验证


验证规则 （可选）
in	验证是否在某个范围内，定义的验证规则可以是一个数组或者逗号分割的字符串
notin	验证是否不在某个范围内，定义的验证规则可以是一个数组或者逗号分割的字符串（3.1.2版本新增）
length	验证长度，定义的验证规则可以是一个数字（表示固定长度）或者数字范围（例如3,12 表示长度从3到12的范围）
between	验证范围，定义的验证规则表示范围，可以使用字符串或者数组，例如1,31或者array(1,31)
notbetween	验证不在某个范围，定义的验证规则表示范围，可以使用字符串或者数组（3.1.2版本新增）
expire	验证是否在有效期，定义的验证规则表示时间范围，可以到时间，例如可以使用 2012-1-15,2013-1-15 表示当前提交有效期在2012-1-15到2013-1-15之间，也可以使用时间戳定义
ip_allow	验证IP是否允许，定义的验证规则表示允许的IP地址列表，用逗号分隔，例如201.12.2.5,201.12.2.6
ip_deny	验证IP是否禁止，定义的验证规则表示禁止的ip地址列表，用逗号分隔，例如201.12.2.5,201.12.2.6
unique	验证是否唯一，系统会根据字段目前的值查询数据库来判断是否存在相同的值，当表单数据中包含主键字段时unique不可用于判断主键字段本身

验证时间（可选）
self::MODEL_INSERT或者1新增数据时候验证
self::MODEL_UPDATE或者2编辑数据时候验证
self::MODEL_BOTH或者3全部情况下验证（默认）



