> *Everything changes and nothing stands still.*
>
>  ​    — Heraclitus of Ephesus, as quoted by Plato in *Cratylus* (360 BCE)

---

schema-on-read or schemaless




requires a change to data that it stores: perhaps a new field or record type needs to be captured,

so the database can contain a mixture of older and newer data 

- With server-side applications *rolling upgrade* (also known as a *staged rollout*),



向后兼容 (backward compatibility)

新的代码可以读取由旧的代码写入的数据。

向前兼容 (forward compatibility)

旧的代码可以读取由新的代码写入的数据。


data encoding format JSON,xml,csv used for data transfer and storage

In-memory represent/data-strcture
在内存中，数据保存在对象、结构体、列表、数组、散列表、树等中。这些数据结构针对 CPU 的高效访问和操作进行了优化（通常使用指针）。
如果要将数据写入文件，或通过网络发送，则必须将其 编码（encode） 为某种自包含的字节序列（例如，JSON 文档）。由于每个进程都有自己独立的地址空间，一个进程中的指针对任何其他进程都没有意义，所以这个字节序列表示会与通常在内存中使用的数据结构完全不


内存中表示到字节序列的转换称为 编码（Encoding） （也称为 序列化（serialization）

解码（Decoding）反序列化（deserialization），


## 数据类型和模式演变

如何改变字段的数据类型？有一个风险，值将失去精度或被截断。 假设你将一个 32 位的整数变成一个 64 位的整数。新代码可以轻松读取旧代码写入的数据，因为解析器可以用零填充任何缺失的位。但是，如果旧代码读取由新代码写入的数据，则旧代码仍使用 32 位变量来保存该值。如果解码的 64 位值不适合 32 位，则它将被截断。

Protobuf 没有列表或数组数据类型，而是有一个字段的重复标记（repeated，这是除必需和可选之外的第三个选项）
读取旧数据的新代码会看到一个包含零个或一个元素的列表（取决于该字段是否存在）。读取新数据的旧代码只能看到列表的最后一个元素。



## 数据流的类型


我们曾经说过，无论何时你想要将某些数据发送到不共享内存的另一个进程，例如，只要你想通过网络发送数据或将其写入文件，就需要将它编码为一个字节序列。然后我们讨论了做这个的各种不同的编码。

我们讨论了向前和向后的兼容性，这对于可演化性来说非常重要（通过允许你独立升级系统的不同部分，而不必一次改变所有内容，可以轻松地进行更改）。



通过数据库（请参阅 “数据库中的数据流”）
通过服务调用（请参阅 “服务中的数据流：REST 与 RPC”）
通过异步消息传递（请参阅 “消息传递中的数据流”）


大多数关系数据库都允许简单的模式更改，例如添加一个默认值为空的新列，而不重写现有数据 [^v]。读取旧行时，对于磁盘上的编码数据缺少的任何列，数据库将填充空值。

快照 备份和数据仓库

服务器本身可以是另一个服务的客户端（例如，典型的 Web 应用服务器充当数据库的客户端）
面向服务的体系结构（service-oriented architecture，SOA），最近被改进和更名为 微服务架构

web服务
当服务使用 HTTP 作为底层通信协议时，可称之为 Web 服务。
由在线服务（如信用卡处理系统）提供的公共 API，或用于共享访问用户数据的 OAuth。
短信服务