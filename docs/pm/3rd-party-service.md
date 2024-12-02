# 第三方服务接入

SMS短信服务
邮件通知
支付服务
OAuth数据共享服务
域名服务
ip地址查询


```json
{
    "code":0,
    "message": "成功",
    "data": [
        {
        "ip": "183.192.70.211",
        "continent":"亚洲",
        "country":"中国",
        "province":"上海",
        "city":"上海",
        "district":"徐汇区",
        "isp":"移动",
        "areacode":"310100",
        "countrycode":"CN",
        "countryenglish":"China",
        "longitude":"121.472644",
        "latitude":"31.231706",
         "radius":"105.2321",
        }
    ]
}


```

ICP域名备案查询

```json
{
    "code":0,
    "message": "成功",
    "data": {
        "Owner": "刘晨",
        "CompanyName": "上海顶想信息科技有限公司",
        "CompanyType": "企业",
        "SiteLicense": "沪ICP备12007941号",
        "SiteName": "ThinkPHP框架",
        "MainPage": "www.thinkphp.cn",
        "VerifyTime": "2019-11-15"
    }
}

```


## 身份认证（AppCode）

如果你不是基于SDK进行调用而是自己调用接口地址的话，需要进行身份认证，目前支持使用两种方式进行身份认证：
第一种：通过Header信息认证

在请求Header中添加的Authorization字段，配置值为“AppCode ＋ 半角空格 ＋AppCode值”。

格式如下：

Authorization:AppCode AppCode值

第二种：通过请求参数认证

ThinkAPI的接口均支持GET和POST请求调用，你需要在请求Query中添加appCode参数，参数的值为用户AppCode的值。

https://API接口地址?appCode=AppCode值

    不一定是GET方式，POST参数一样可以支持

返回数据

ThinkAPI所有的接口返回数据为JSON格式，通用规范如下：
名称	类型	说明
code	int	返回码,0 表示成功 其它表示失败
message	string	返回提示信息
data	object	返回数据


:::info
接口传参建议使用驼峰命名，例如orderId而不是order_id
:::

## 短信服务

于国内验证码短信、通知短信以及营销短信，支持群发助手，