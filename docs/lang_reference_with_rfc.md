## php as CGI and CLI program

## type of value

value type can be assign into variable or passing into or return from function

### insection type
a insection type accept value satifies all type declarations joined by the & symbol

<h2> character encoding</h2>
<p> possible representation of character encoding
<p>ISO-8859-1 "\xE1"</p>
<p>UTF-8 "\xC3\xA1"</p>
 <p>string will be encoded as detection(what fashion written script file is using</p>
 <p>explictly declaration</p>
 <p>unicode encoding support</p>


 <ul>enclose in double quote string</h2>
 <li>variable name expanded/substitution string interpolation</li>
 <li></li>

 <h3>unciode escaping</h2>
 <code>\u{[0-9A-Fa-f]*}</code>
 <p>wil be output to the string as that codepoint's UTF-8 representation</p>
 <p>"\u${41} === "A"</p>

<h2>Arrays is actually an ordered map</h2>
<p>A map is a type that associate values to keys</p>
<p>it can be treated as an array, list(vector), hash table, dictionary, collection, stack, queue</p>
<p>as array values can be other arrays, trees are also be possible</p>


<h3> array construct</h3>
<p> the comma after the last element in arr is optional and can be omitted</p>
<p>for mulit-line arr,the trailing comma is commonly used as it allows eaiser addition of new elements at the end</p>
<p>for single-line arr,omiting the trailing comma is preferred </p>
<p> Array and objects cannot be used as keys. Doing oso will result a warning: Illegal offset type</p>
<p>PHP arrays can contain int and string keys at the same time as PHP odes not distinguish between indexed and associative arrays</p>
<p>the key is optinal. If it is not specified, PHP will use the increment of the largeest previouly used int key</p>
<h3>array accessing</h3>
<p>as menttion aboved, if no key is specified the maximun of the existing int indicesi taken</p>

<h3>arr desrtucting</h3>
<p>specifing the index when destructing</p>
<code>assign the element at index 2 to variable $baz</code>
<h3>arr utils</h3>
<p>unset will remove the k</p>
<code>
 class OrderController {
    protected A;
    private B;
    public C;
    function __construct(){

    }
 }
</code>
<p>callable type declaration</p>
<p>any object implements `__invoke()`</p>
<code>public function __invokde</code>
<p>callback: `Classname: methodName`</p>

 <p>void is a return-only type declaration that does not return a value but still run to complettion/terminate</p>
 <P>never indicating the function does not terminate. This means it either call exit(early return), throw a exception, or infinite loop</P>
 <h3>determine the value type</h3>
 <p>determine the value type is notble only check the type of a value but also the value itself. </p>
 <p>iterable | traverble</p>

 <h2>scalar data type and composite data type </h2>
 <p>in Data Science, composite data type contain multi value, scalar data type only contain one value</p>

 <h2>type declaration</h2>
 <h3>function signature and type declaration</h3>
 <p>type declaration can be added to function arguments, return value, class property</p>

 <p>ensure the passing value is specified type at called time </p>
 <p>dynamic type: type of a variable is determined by the value it stored </p>


 <h2>type casting and coercive typing mode(强制类型转换）</h2>
 <p>force a variable to be evaluated to a certain type</p>

 <h2>type conversion</h2>
 <p>PHP try to convert the type of value to another type</p>
 <p>in numeric context, using an arithmetical operator</p>

 <p>logical context, when using conditional statements, ternary operator, logical operator, will be treat as logical context,and will be interpreted as bool</p>
 <p>comparison context, the type conversion which occur in this context are explain in the comparsion with various type table</p>

 <h3>function context</h3>
 <p>the type of pass-in value or return value must be specfic type(throw error or type coercion)</p>

 <h2>variable </h2>
 <p>variable are represented by a dollar sign followed by the name of the variable</p>
    
 <h2>varaible assignment</h2>
 <p>By default, variable always assgin by value.That is to say, when an expression is assigned to a variable, the entire value of the original expression is copied into destination varaible.This means, after assign the variable's value to another, change one of those variable will not affect the other,</h2>
 <p>PHP offers another way, assign by references.This means that the new variable references(to put it in another word, points to, become an alias to) the original variable. change the orginal variable affect the destination, and vice versa</p>
 <p>to assign by reference, simply preprend the ampersand(&) to the beginning of the variable which is being assigned.</p>
 <h2>userland naming guide</h2>

## variable scope: binding and lookup 
 global scope: parent of all scope
 function scope: within user-defined function, local function scope was introdcued  
 module scope: when enable module, each file is treated as module scope
> in PHP, global varaible must be declare global inside a function if they are going to be used inside a function


 <h3>static variable modifier</h3>
 <p>does not lose its value when leave this scope/exectuion context</p>
 <p>static variable is initialized the first call of function </p>
 <p>will not lose track of current count</p>
 <h2>variable variable and symbol tree</h2>
 

 <p>access property using variable name</p>
 <h3>dot in incoming variable name</h3>
 <p>what the parset see is a varaible name, follow by a string concatenation operator,follow by a bare string(unquoto, no match any reserved or known key). php will replacing any incoming dot to underscore</p>


 <h2>accessing data from html form</h2>
 <?php 
    $_GET['id']
 ?>
    <h2>expression</h2>
    <h3>classify expression category</h3>
    <li>literal, variable,function call expression, member call expression</li>
    <li>variable assign expression</li>
    <li> pre- and post-increment and decrement.  Pre-increment, which is written ++$variable, evaluates to the incremented value (PHP increments the variable before reading its value, thus the name 'pre-increment'). Post-increment, which is written $variable++ evaluates to the original value of $variable, before it was incremented (PHP increments the variable after reading its value, thus the name 'post-increment').</li>
    <li>comparison evaluate to true or false value</li>
    <li>combined operator-assignment expressions.</li>
    <li>condition expression: ternary  operator. if the frist subexpression is evaluated to true, the whole expression is evaluted to the second expression.otherwise evaluated to the third expression</li>

    <h2>operator</h2>
    <p>operator can be grouped according the number of values they take</p>


    <h2>operator precedence and associativity</h2>
    <textarea name="" id="">
    +$a	Identity operator	Conversion of $a to int or float as appropriate.
    </textarea>
    <li>Operands of modulo are converted to int before processing. For floating-point modulo, see fmod().</li>
    <li>The division operator ("/") returns a float value.For integer division, see intdiv().</li>
    

    <h2>operator</h2>
    <li>left operand get set to the value of the right operand</li>
    <li>null coalescing operator</li>
    <h3>bitwise operator</h3>
    <li><code>$a << $b</code> left shift: shift the bits of $a $b steps to the left(each step means "multi by two") </li>
    <p>left shift have zero shift in on the right while the sign bit is shifted out on the left, meaing the sign of operand is not perserved</p>
    <li><code>$a >> $b</code> right shift: shift the bit of $a $b steps to the right(each step means "divide by two")</li>
    <p>right shift has copied of the sign bits shift in on the left, meaning the sign of an operand is preserved </p>
    

## variable



## expression





## operator
left operand get set to the value of the right operand
null coalescing operator
### bitwise operator 按位运算操作符
**left shift:*
$a << $b 
result:shift the bits of $a $b steps to the left(each step means "multi by two") 

left shift have zero shift in on the right while the sign bit is shifted out on the left, meaing the sign of operand is not perserved

$a >> $b
result: shift the bit of $a $b steps to the right(each step means "divide by two)

right shift has copied of the sign bits shift in on the left, meaning the sign of an operand is preserved 

### error control operator

sign @ when preprend to an expression in PHP, any diagnostic error that might be  generated by that expression will be suppressed
set_error_handler()
error_reporting()
error_get_last()

## execiton operator

execute as a shell command

## string operator

string concatenation operator

## Array operator

`$a+$b` union
`$a == $b` equality: have the same key/value pair
`$a === $b` idnetity:  	true if $a and $b have the same key/value pairs in the same order and of the same types.
`$a != $b` || `$a <> $b` Ineuqality
`$a !== $b` Not-indentity

## instance operator

instantiated object of a certain class


## vscode shortcut
```json
{
  "key": "shift+right",
  "command": "cursorColumnSelectRight",
  "when": "editorColumnSelection && textInputFocus"
}
{
  "key": "ctrl+shift+right",
  "command": "cursorWordAccessibilityRightSelect",
  "when": "accessibilityModeEnabled && isWindows && textInputFocus && focusedView == 'workbench.panel.output'"
}
```

## return conotrl

If called from the within a function,
the return statement immediately ends execution of the current file.

If called from the global scope, the execution of the current script file is ended

If the current script file was included or required, then control is passed back to the calling file.

## including file

including file and have it inherit the parent file's variable scope


## runtime configuration

target file extension with `.php`: interprets the target file as PHP code


## function

redefine previously-declared functions

function overloading

All function and calsses in PHP have the globe scope

they can be called outside a function even if they were defined inside. and vice versa.

### positonal arguments, named arguments and rest argument

####  named arguments 
the order in which the named arguments are passsed does not matter.

named arguments are passed by prefixing the value with the parameter name followed by a colon.

```php
array_fill(start_index: 0, count: 100, value:50)
```

... spread operator can be used to unpack an array or unpack an arugments

positional arguments

#### mixed used named arguments and positional arguments


### imutable or mutable, working directly on  pass in value

## passing argument type expection 

TypeError exception is suppoed to be thrown If passing an array when a string is expected

strlen() function expects the parameter $string to be a non-nullable string. For historical reasons, PHP allows passing null for this parameter in coercive mode, and the parameter is implicitly cast to string, resulting in a "" value. In contrast, a TypeError is emitted in strict mode.


## anonymous function

mostly used as the value of callable parameters


closure may inheriting variables from the parent scope. Any such variables must be passed to the use language construct

```php
class Cart {
    const PRCIE_BUTTER = 1.00;
    const PRICE_MILK = 3.00;
    const PRCIE_EGGS = 6.95;

    protected $products = array()

    public function($product, $quantity) {
        $this->products[$product] = $quantity;
    }

    public function getQuantity($product) {
        return isset($this->products[$prodcut]) ? $this->prodcuts[$prodcut] : $this->products[product]
    }

    public function getTotal($tax) {
        $total = 0.00
        $callback = function($quantity, $product) use ($tax, &$total) {
            $pricePerItem = constant(__CLASS__ . "::PRICE_") . strtoupper($product);
            $total += ($pricePerItem * $quantity) * ($tax + 1.0)

        }
        array_walk($this->products, $callback)
        return round($total, 2)
    }
}
```



the parent scope of a fucntion is in which the function was declared

## class and object


## intro
php treat objects as references or handles, each variable contain/store an object reference rahter than a copy of the entire object

### readonly class

### member visibility, accessibility

### property access and method call 

#### Nullsafe property access and method call

if the object being deferenced is null then null will be return rahter than throw a exception.If the deference is part of the chain, the rest of the chain is skipped.
> The nullsafe operator is best used when null is considered a valid and expected possible value for a property or method return. For indicating an error, a thrown exception is preferable.

#### with class methods

not-static properties may be accessed by using->: `$this-property`
static properties may be accessed by using the ::(Double Colon)`self:$property`
this is the value of the calling object
this is avaiable inside any class method when that method is calling from an object context.

### property declaration

Property are defined by using at least one modifier(Visibility, Static Keyword, readonly), optionally(except for readonly properties). followed by a type declaration, followed by a variable declartion. This declaration may include an initialization, but this initializtion must be a constant value

#### readonly modifier

prevent modification of the property after initialization

A readonly property can only be initialized once, and only from the scope where it has been declared. Any other assignment or modification of the property will result in an Error exception.

Specifying an explicit default value on readonly properties is not allowed, because a readonly property with a default value is essentially the same as a constant, and thus not particularly useful.


readonly property do not exlclude interior mutability.object stored in readonly property may still be modified.

private and protected set



### static mehtod call

Non-static method cannot be called staically

### extend

the inherited constant, method and properties can be overriden by redeclaring them with the same name defined in the parent.

However, if the parent has defined a method or constant as final, they may not be overriden.

It is possible to access the overriden method or static property by reference them with `parent::`


### signature compatibility rules

covariance
```php
class Food {}
class AnimalFood extends Food {}


abstract class Animal 
{
    protected string $breed
    public function __construct(string $breed) {
        $this->breed = $breed
    }
    abstract public function speak();
    public function eat(AnimalFood $food) {
        echo $this->breed . " eats " . $food
    }
}

class Cat 
{
  public function speak() {
    echo $this->breed . ".meows"
  }
  public function eat(Food $food) {
    echo $this->breed . " eats " . get_class(food)
  }
}


class CatShelter implements AnimalShelter
{
    public function adopt(string $breed): Cat
    {
        return new Cat($breed)
    }
}

$kitty = (new CatShelter) -> adopt("British Shorthairs")
```


### class Constants


constant is just name for a value, that usually will be replaced when it gets compiled

```php
abstract class dbBase {
    protected $host = 'localhost'
    protected $user = 'corp';
    protected $password = 'crop.www'    
    protected $db = 'user'

    const TABLE_NAME = 'undefined'
    public static function GetAll() {
        $c = get_called_class()
        # self binding or static binding
        echo self::TABLE_NAME
        echo static::TABLE_NAME
        return "SELECT * FROM `" .$c::TABLE_NAME."`"
    }
}

class dbAdmin extends dbBase {
    const TABLE_NAME = 'admins'    
}

echo dbAdmin::GetAll()
```


#### covariance and contravarince

`covariance`: A subclass can override a method in the parent class with one that has a narrow return type

`contravariance`: A subclass can override a method in the parent class with one that has a parameter  with a wider type

why covariance and contravarince are applied to parameter type  and return type respectively



## 获取php

`http://www.thinkphp.cn` 官网
`http://doc.thikphp.cn` 文档

项目分发或托管地址
包管理器安装




## 环境要求

系统环境要求视开发所设计的模块决定
服务器运行系统环境支持windows/unix
Apache, nginx多种web服务器
支持MySQL,postSQL,Mongo多种数据库连接

## 应用入口文件

入口文件主要完成
- 定义应用目录 `./Applicaton/`, `./App/`, `./src/`
- 载入框架入口文件

```php
define('APP_PATH', './Appliation/')
define('APP_DEBUG', True)
define('RUNTIME_PATH', './Runtime/')
require './ThinkPHP/ThinkPHP.php`
```

```zsh
www WEB部署目录
- index.php 应用入口文件
- Apps 应用目录
- Public 资源目录
- Runtime 运行时目录
- Think 框架目录
```


## 项目搭建和模块(文件)自动生成

默认的应用入口文件的自动生成
默认的应用的目录`Application`
自动生成了公共模块`Common`, 首页模块`Home`, 运行时目录`Cahce`

```bash
Application
|- Common 
    |- Common 公共函数目录
    |- Config 应用配置
|- Home
    |- Conf 模块配置
    |- Common 模块公共函数目录
    |- Controller 模块控制器目录
    |- Model 模块模型目录
    |- View 模块视图目录
|- Runtime
    |- data 数据目录
    |- logs 日志目录
    |- temp 缓存目录
    |- cache 
```
### 目录安全文件

在自动生成目录的同时，还在各个目录下看到ThinkPHP生成的目录安全文件`index.php`
为避免服务器开启了目录浏览权限，可以直接在浏览器输入URL地址查看目录
可以在入口文件设置安全文件
```php
define("DIR_SECURE_FILENAME", "default.html")
define("APP_PATH", "./Application")
require "./ThinkPHP/ThinkPHP.php`
```
如果环境足够安全，不想生成目录安全文件，可以在入口里面关闭目录安全文件的生成
```php
define("BUILD_DIR_SECURE", false)
```


## object constructor

PHP allows declare constructor method for every classes. class which has a constructor method will call this method on each newly-created object.
constructor method are called during the instantiation of their corresponding object.
constructor are called by placing the arugments inside the parentheses after class

Prior to PHP8.0. the class will interpret a method named the same as class as an old-style constructor. That synstax is deprecated.
and will result in an E_DEPRECATED error but still can function as a constructor. If both `__constructor()` and the same name method are defined,__construct wil be called.



### constructor method inheritance


parent constructor are not called implictly if the child class defines a constor.
to call the parent constructor, a call to `parent::__construct()` within the child constructor is required.


## constructor property promotion

It is very common for constructor parameter to be assigned to a property in the constructor.


## constructor visibility modifier

the consturctor may be private or protected to prevent it from being called externally.


## static creation and constructor wrapper

```php
class Product {
    private ?int id;
    private ?string name;
    
    __constructor(?string $name = null, ?int $id = null) {
        $this->$name = $name;
        $this->$id = $id;
    }

    public static function fromValue(string $name，int $id):static {
        $new = new static($id, $name);
        return $new
    }

    public static function fromJSON(string $json):static {
        $data = json_decode($json, true);
        return new static($data['id'], $data['name']);
    }
    public static function fromXML(string $xml):static {
        $data = convert_xml_to_array($xml)
        $new = new static()
        $new->id = $new['id']
        $new->name = $new['name']
        return $new
    }
    
    
}
```

### destructor

#### destructor method inheritance 

a child class may inherit the parent destructor if it does not implement itself.
to call the parent destructor, one would have to explictly call `parent::destruct()`


## property visibility

`proetected`: memeber declare protected can be accessed only within the class itself and by inheriting or parent class.
`private`: member declare as private can only be accessed by the class that defines it.
`public`: member declare as public can be access anywhere.

property declared without any explict keyword are defined as public

## asymmetric property visibility

the set visibility may be specified separately
the set visibility must be the same or more restrictive.

```php
class Book {
    protected title $title;
    public protected(set) string $author;
    protected private(set) int $pubYear;
}
```

#### visibility from same type object

###  inheritance and overwrite

subclass inherits all of the public and protected method, property and constant from the parent class.
unless the subclass overwrite the memthod, it will retian its original functionality.
> it is not allowed to overwrite a read-write property with a readonly property or vice ~~versa~~

it's leave up to the extend class to decide on whteher or not the parent's method is called.

Final Keyword ¶
The final keyword prevents child classes from overriding a method, property, or constant by prefixing the definition with final. If the class itself is being defined final then it cannot be extended.


### property descriptor

writable
configurable
enumerable

### scope resoultion operator

is a token that allows access to a constants,static property or static method of a class or its parent.

### object operator

### class reference
reference them outside the class definition, use the name of the class.
three special keyword `self`, `parent`, `static` are used to access property or method inside a class.


### property access

static property are accessed using scope resolution operator.and cannot be accessed throught object operator(->)


### class abstraction vs interface

class defined as abstract cannot be instantiated, any class contain at least one abstract method must also be abstract.
methods defined as abstact simply declare the method signature. they can define the implementation
accpet and operate on a argument conforms to an interface.
`Iterable`, `Cacheable`, `Renderable`
implements multiple interface multiple database access services, multiple payment gateways, or different caching strategies


### overloading

overloading provide the ability to have multi method with same name but with different quantities and types of argument


### acessor overloading

```php
public __set(string $name, mixed $value): void

public __get(string $name): mixed

public __isset(string $name): bool

public __unset(string $name): void



public __call(string $method, $array arguments): mixed

public __callStatic(string $method, $array arguments): mixed
```

> all method started with __ are reserved by PHP.
The __invoke() method is called when a script tries to call an object as a function.




## forward call


## Everything you need to know about namesapce 

alias or provide context extra long name perfix

accessing internal classes in namespaces

use a class from the current namespace

accessing a global function, class, or constant

```php
nameSpace Admin\Controller
$c = new \stdClass
```

### name resolution

unqualified name
qualified name

for qualified names the first segment of the name is translated according to the current class/namespace import table. For example, if the namespace A\B\C is imported as C, the name C\D\E is translated to A\B\C\D\E.
for qualified names, if no import rule applies, the current namespace is prepended to the name. For example, the name C\D\E inside namespace A\B, resolves to A\B\C\D\E.
full qualified name



#### how does a bare name like `name` resolve?

if no import rule applies and the name refers to a class-like symbol,
First, the currentnamespace is prepend.
If the constant or function does not exist in current namespace, a global constant or function is used if it exists


### importing/aliasing

recycle in three usecase.

importing is accomplishing with `use` operator
outmost scope of a file(global scope)


### fallback

function or constants are fallback to global namespace if not found in the current namesapce
classes always resolve to current namespace namme


### enums 

making invalid states  unpresentable
like C, C++, and C#, think of an enum as a list of named integers

round-trip to database or datastore
```php
$record = getAll($id)

$suit = Suit::tryFrom('A') || Suit:spades;


```


## attribue


Similar concepts exist in other languages named Annotations in Java, Attributes in C#, C++, Rust, Hack and Decorators in Python, Javascript.


Attribute::TARGET_CLASS
Attribute::TARGET_FUNCTION
Attribute::TARGET_METHOD
Attribute::TARGET_PROPERTY
Attribute::TARGET_CLASS_CONSTANT
Attribute::TARGET_PARAMETER
Attribute::TARGET_ALL


```php
# which event is handled by which method on the class in the getSubscribedEvents() method.
class RequestSubscriber implements EventSubscriberInterface {
    public static function getSubscriedEvents(): array {
        return [RequestEvent::class => 'onKernalRequest']
    }
    public function onKernalRequest(RequestEvent $event) {
        
    }
}


class EventDispatcher {
    private listeners = []
    function dispatch($event, ...$args){
        forEach($this->listeners[$event] as $listener) {
            $listener(...$args)
        }
    }
}
```

```EBNF
<value> :== <php-constant> | <php-expression>
```



Interfaces can be implemented by classes, yet attributes can also be declared on methods, functions, parameters, properties and class constants. As such they are more flexible than interfaces.
Interfaces can be implemented by classes, yet attributes can also be declared on methods, functions, parameters, properties and class constants. As such they are more flexible than interfaces.


## error


```php
set_exception_handler()
error_reporting()

interface Throwable extends Stringable {
    public getMessage():string
    public getCode(): int
public getFile(): string
public getLine(): int
public getTrace(): array
public getTraceAsString(): string
public getPrevious(): ?Throwable
public __toString(): string
}

class Error implements Throwable {
    protected string $message;
    protected string $code;
    protected string $file;
    protected string $line;
    private array $trace = [];
    private ?Throwable previous = null;    

    public __construct(string $message = "", int $code = 0, ?Throwable $previous = null)
    final public getMessage():string
    final public getPrevious():?Throwable
    final public getCode():int
    final public getFile():string
    final public getLine():int
    final public getTrace(): array
    final public getTraceAsString(): string
    public __toString():string
    private __clone():void
}
```


```php
$suit = E_ALL & E_NOTICE & E_DEPRECATED
```


## fiber

pause execution/ supsend from anywhere in the call-stack, and resume execution later


```php
function exception($severity, $message, $filename, $line){
}

```



```php
final class Fiber {
    public __construct(callable $callback)
    public start(mixed ...$args):mixed
    public resume(mixed $value = null): mixed
    public static suspend(mix $value = null): mixed
    public throw(Throwable $exception):mixed
    public static getCurrent():?Fiber
    public getReturn():mixed
    public isStarted():bool
    public isSuspended():bool
    public isRunning():bool
    public isTerminated():bool
}
```
## generator:rfc


```php
final class Generator implements Iterator {
    void rewind();
    void current()；
    void next();
    
} 
```

accessing file , exec command, open network connection
require  two forms of biometric validation (such as a retinal scan and a fingerprint


### yield syntax

yield keyword is use both for sending and receiving value inside generator.


three forms of yield expression.
`yield $value`
`yield`: yield the value null


the return value of the yied expression is whatever send to the generator() using `send()`. If nothing was sent(during foreach iteration). null is return.


### yield by reference. 


just like pass by reference. return by reference and assign by reference

### sending value.

value can be send into a generator using the send method. send($value) will set $value as the return value of the current expression and resume the expression. when the generator hit anthoer yield expression the yielded value will be the return value of send. 


### rewinding

as they are mainly intended as one-time data sources that are not supposed to be iterated another time. On the other hand, most generators probably *are* rewindable and it might make sense to allow it

rewinding (as in jumping back to the execution context state at the initial call to the generator)


### cloning

> Support for cloning was included in the initial version, but removed in PHP 5.5 Beta 3 due to implementational difficulties, unclear semantics and no particularly convincing use cases.

### closing 

reach the return statement or the end of functon block, or throw a exception an exception from it.


## security

the config file php.ini

### IP or role based access control

#### only serve public file

#### 
telling the request is direct or redirect
#### scipt are not executed outside the script root direcotry
php script are not executed but display as html document
setup script doc_root separated from document root. you can be sure no script is executed outside the directory

support any way of telling if the request is direct or redirect

a request like `~user/srcipt.php` will result in user directory expansion under the user directory setting

#### shell escape mechanism #!

> also make the file executable

```php
#!/usr/local/bin/php
```


### session maagement

visit website assign a unique id.
### session storage

It is either store in cookie on the client side, or propagate in the URL.

```php
if(session_status() === PHP_SESSION_NONE) {
    session_start()
}

interface SessionHandlerInterface {
    public close(): bool
    public open(string $path, string $name): bool
    public destroy(string $id):bool
    public gc(int max_life_time): int | false
    public read(): string | false
    public write(string $id, string $data):bool
}

class FileBasedSessionHandler implements SessionHandlerInterface {
    private $savePath
    public function open($savePath, $sessionName):bool {
        $this->savePath = $savePath
        if(!is_dir($this->savePath)){
            mkdir($savePath, 0777)
        }
        return true
    }
    public function close():bool {
        return true
    }
    #[\ReturnTypeWillChange]
    public function read($id) {
        return (string) @file_get_contents("$this->savePath/sess_$id")
    }
    
    public function write($id,$data):bool {
        return file_put_contents("$this->savePath/sess_$id", $data) === false ? false : true
    }

    public function destroy($id):bool {
        $file = "$this->savePath/sess_$id"
        if(file_exists($file)){
            unlink($file)
        }
        return true
    }

    public function gc($maxlifetime){
        foreach (glob("$this->savePath/sess_*") as file) {
            if(time() - filetime(file) > $maxlifetime && file_exists($file)) {
                unlink($file)
            }
        }
        return true

    }
}

$handler = new MySessionHandler();
session_set_save_handler($handler, true);
session_start()


$_session[] = array(
    "startTime" =>,
    "content_length" =>,
    "btyes_processed" =>, 
    "done" => fasle,
    0 => array(
        "field_name" =>
        "startTime" =>,
      "content_length" =>,
      "btyes_processed" =>, 
        "done" => fasle,
        
    )

)

```


session are stored in server and associated with respective user by session identifier.

effectively hjacking user identifier by obtaining them.
reveal three class of attack against session: interception, prediction and brute-force attack, session fixation

session ID transport mechanism (URL arguments,hidden form fields, cookies) 

#### session id expires and regenerate

### session security

#### intro
HTTP is stateless protocol, which means that it provide no intergrated way for a web server to maintain a states through user's subsequent request.To overcome this problem, the web server implement various kind of session management.
the idea behind the web session management. the server generate a session identified(ID), send this ID to user browser. and make sure the same ID will be sent back to browser along with subsequent request.

 Session IDs thereby become identification tokens for users, 
issued the session ID
carefully choose seed or nounce that don't leak from server

use them to maintain session data (e.g., variables) and create a session-like
experience to the users.

session hjacking, prediction, brute-force, session fixation

### session transport mechanism



### attack against session

session hjacking, session fixation(start a session using the sessionid provided by the attacker), predication, brute-force
 session IDs in URLs, packet sniffing, physical access to the device
### session leaking


### method A: cross-site script attack

Presisten cookie
client-side script that sets a cookie on a browser. `http://online.worldbank.com/<script>document.cookie="__sessionid=123;%20Expires=Friday,%201-Jan-2099&2000:00:00%20GMT"</script>`
Domain cookie
`http://online.worldbank.com/<script>document.cookie="__sessionid=123;domain=.worldbank.com"</script>`

#### method B: Issuing a cookie using <meat> tag with Set-Cookie attribute

`<meta http-equiv=Set-Cookie content="sessionid=1234">`
> meta tag
> Permitted content	None; it is a void element.
> Tag omission:Must have a start tag and must not have an end tag.

#### meta tag injection

`http://online.worldbank.dom/<meta%20http-equiv=Set-Cookie%20content="sessionid=234;%20Expires=Friday,%201-Jan-2010%2000:00:00%20GMT”>.idc`


#### DNS ATTACK

adds a record to the user’s DNS server, mapping the hostname hack.worldbank.dom to her web server’s IP address

