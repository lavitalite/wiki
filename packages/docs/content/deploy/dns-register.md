## why dns

DNS can be described as being analogous to a phone book

::: info  ip addressing

Every device connected to the Internet needs to have an identifier.
come from finite pools of numbers.

are divided into two parts: 
`network section`: aka network prefix, identifies the particular network 
`host section`: identifies the particular node on the Local Area Network (LAN).
 IP addressing and name system for the resource in internet
:::

ip change from time to time

## DNS products and tools spectrums

dig

```bash
dig @server type name
dig -x #make a reverse DNS query
```
`name`:the name (like google.com). The default is a query for the empty name (.).
`type`: the DNS query type (like A or CNAME). The default is A.
`server`: resolver send the query to (like 8.8.8.8). The default is what’s in `/etc/resolv.conf`.

zone.vision, which is nice because it queries the authoritative nameservers for a domain directly
zone.vision ，这很好，因为它直接查询域的权威名称服务器
mxtoolbox.com, which seems a bit more oriented towards MX/SPF queries but does lots more
mxtoolbox.com ，它似乎更面向 MX/SPF 查询，但还有更多功能
the Google DNS lookup tool again
再次使用Google DNS查找工具

## DNS infra

The primary objective of is to develop open source software and 

[NLnet Labs](https://nlnetlabs.nl/)  is a nonprofit foundation with the mission to develop open source software and open
standards for the benefit of the Internet, particularly in the area of DNS and routing

We also provide technical expertise to policy-making bodies, including regulators and governments
so they have the understanding they need when making public policy decisions related to the Internet infrastructure.

We are funded through long-term subsidy, regular donations, as well as support contracts, paid enhancements to our software, consultancy and training delivery


## DNS involved

from DNSSEC, through DNS-over-TLS, DNS-over-HTTPS


## hierarchical name space/ tree.
domain style names
每一层都需要知道下一层的权威服务器

the delegated children in the root zone

with the hierarchy roughly corresponding to organizational structure
and names using "."  as the character to mark the boundary between hierarchy levels.

organize as hierarchical, upside-down tree with the DNS root domain at the top

extendsiable in mind

be divided to zone

### DNS zone

stats
The top ten TLDs count are:



lease/hold a DNS zone `google.com`




behind registrar org whose client you are, is a registry
client -> registrar -> registry 
delegate registrar to register to `NS` record to TLD server for the zone you lease


delegate authoritative nameserver `ns1.google.com` to host the zone


 change NS  records of  zone (`google.com`) at my registrar,

 how zone changes are made in practice at TLDs 
 between registrars and registries

console/control panel/dashboard
or API
https://api-sandbox.nic.fr/api-docs/




`google.com`: root domain(zone apex)

`google` associated with the organization name,domain is bought 

DOMAIN-SUFFIX(also known as top level domains)`.com`indicate the type of domain, in this case, it is for commercial or business purpose domain.


### Naming policy and and convention


- First Come, First Served
- prior review list: offense terms associated with racism, Nazism, etc  
- Domain names (unallocated, reserved for future expansion/reserved) for the Registry 



rules that are non-discriminatory and transparent
ensuring respect for the freedom of communication, entrepreneurial freedom and intellectual property rights.






originally generic top-level domain names (gTLDs);
```
net: network organization
org: non-profit organization
edu: educational institutions
gov: government agencies
mil: military purpose
```
country-code top-level domain names (ccTLDs);



Google offers variety of products and services from first-level subdomains(`DOMAIN_PREFIX) or subpath(use `site:google.com` when search to find out)
```
ads.google.com
adsense.google.com
pay.google.com
calendar.google.com
docs.google.com
earth.google.com
map.google.com
store.google.com
firebase.google.com
drive.google.com
meet.google.com
news.google.com
rss.google.com
chat.google.com
cloud.google.com
developers.google.com
ns.google.com 
```




## DNS lookup/query resolution

Root nameserver 


## DNS infrastructure
first stop
last stop



## DNS record.


### record lifecycle management

gets added to or removed from your authoritative name server



### records quota


### DNS proxy

- expose your origin server’s IP address 
- hide behind  proxy(CDN edge server IP act as reverse proxy)  
routes incoming traffic to the nearest data center
DNS queries for your domain response with CDN edge server IP

Name servers should be should be distributed (topologically and geographically)
forwarded to your origin server.
routing scheme: Unicast and anycast

routing schemes: Unicast, Multicast, Broadcast, and Anycast.





With Multicast, one node sends packets that hit multiple (but not all) recipient nodes

Unicast and Anycast are one-to-one routing schemes. In both, there is one sender and one recipient of the packet

one possible dest
multiple possible dest, pick the the shortest path from the sender to the recipient. 

one of the IPs that CloudFlare announces for DNS services is 173.245.58.205. A route to that IP address is announced from all 23 CloudFlare data centers.

sit behind a gateway using NAT,
router act as gateway use one public IP address 
all the devices that sit behind the network use a unique private IP address




### type of record

`A`:
`MX` record
`SOA` records

```
refresh after 6 hour
retry after 6 hour
expire after 1 week
minimum of 1 hour

```

`NS` authoritative name server
`CNAME` the canonical name for an alias

```
name	            TTL	      record type	  value
www.twitter.com.	419	      CNAME	        twitter.com.
twitter.com.	   1619     	A     	      104.244.42.1
```

`DS` records, 
`TXT`: use for domain verification.
set this DNS record `google-site-verification`. prove to Google that you own twitter.com
`glue`
- authoritative lie outside  the zone
- authoritative lie inside the zone
 provide both the name and the IP address of the authoritative  name servers that lie inside the zone
if the authoritative name server for `google.com` is `ns1.google.com`, resolver will try to resolve  resolves `ns1.google.com`. Since ns1 is contained in example.org, this requires resolving example.org first, which presents a circular dependency. 

<detail>
<summary>tld server response for `google.com` DNS query</summary>
Message header:
Authority Section:
google.com. IN NS ns1.google.com.

Additional Section (Glue Records):
ns1.google.com  IN A 192.0.2.1
</detail>


resolve to Cloudflare anycast IPs
instead of origin server IPs

| Domain   | Record Type | Value     | TTL   |
|----------|-------------|-----------|-------|
| site.com | A           | 192.0.2.1 | 14400 |

The "@" symbol indicates that this is a record for the root domain, 

times out or returns an error if no record is found

## DNS provider/authorization name server registration



## DNS resolve/lookup chain/flow

imagine a scavenger hunt(寻宝游戏)where each clue points to another clue, and the final clue points to the treasure

If the hostname is found in the `"/etc/hosts"` file

>a hostname (archaically nodename) is a label that is assigned to a device connected to a network, and that is used to identify the device in various forms of electronic communication

DNS recursive resolver inside ISP

does not have the A records, but does have the NS records for the authoritative 
nameservers, bypassing lookup from the root and TLD nameservers

does not have the NS records,but has the A records for TLD servers

unlikely does not have the record point to the TLD servers, it query the root servers 
```
+-------------+          +----------------+
|             |     1    | DNS Root      |
|             |--------->| Nameserver    |
|             |     2    |               |
|             |<---------+----------------+
|             |          |
|             |     3    | DNS TLD       |
|             |--------->| Nameserver    |
|    DNS      |     4    |               |
|  Recursive  |<---------+----------------+
|  Resolver   |          |
|             |     5    | cloudflare.com|
|             |--------->| Auth Server   |
|             |     6    |               |
|             |<---------+----------------+
|             |          |
|             |     7    | blog.cf.com   |
|             |--------->| Auth Server   |
|             |     8    | (CNAME)       |
+-------------+<---------+----------------+

```

### reveal the hidden part


 (the conversation with the resolver and the authoritative nameserver)

 provide extra debugging information in DNS response
filtering-
DNS-over-TLS and DNS-over-HTTPS 
 the scope of a `SERVFAIL` is so board

### DMS server type



:::info List of network configuration tools

:::

content hosted on several redundant web servers
round-robin 
move to the recently responded ip back of the queue, operating on a loop. 

makes a request to Netflix
, such as the movie thumbnail images, the Netflix logo, 


fall into one of four categories: 

`TLDs`

- Ask the root nameserver about `github.com`
    
```bash
dig @198.41.0.4 +all github.com

;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 57953
;; flags: qr rd; QUERY: 1, ANSWER: 0, AUTHORITY: 13, ADDITIONAL: 27
;; WARNING: recursion requested but not available

;; QUESTION SECTION:
;github.com.                    IN      A
;; AUTHORITY SECTION:
com.                    172800  IN      NS      l.gtld-servers.net.
...

;; ADDITIONAL SECTION:
l.gtld-servers.net.     172800  IN      A       192.41.162.30
l.gtld-servers.net.     172800  IN      AAAA    2001:500:d937::30
...
```
IN query response:
the ip of TLDs is retrieved
authority section with serval NS records and additional section with A records so you don’t need to do an extra lookup to get the IP addresses of those nameservers.

- Ask the `.com` nameservers about `github.com`

```bash
~  dig @192.41.162.30 +all github.com

;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 14238
;; flags: qr rd; QUERY: 1, ANSWER: 0, AUTHORITY: 8, ADDITIONAL: 2

;; QUESTION SECTION:
;github.com.                    IN      A

;; AUTHORITY SECTION:
github.com.             172800  IN      NS      ns-421.awsdns-52.com.

;; ADDITIONAL SECTION:
ns-421.awsdns-52.com.   172800  IN      A       205.251.193.165
```

- ask `ns-421.awsdns-52.com.` for `github.com.`

```bash
~  dig @205.251.193.165 +all github.com
 
id 9992
opcode QUERY
rcode NOERROR
flags QR RD RA
;; QUERY: 1, ANSWER: 1, AUTHORITY: 8, ADDITIONAL: 1

;; QUESTION SECTION:
;github.com.                    IN      A

;; ANSWER SECTION:
github.com.             60      IN      A       20.205.243.166
```

`authoritative DNS server` 
 RRDNS in Go(cloudfare)

**DNS is pull, not push**

When you create/edit a DNS record for a domain, you set the DNS record on an authoritative nameserver.


There are 2 ways you could imagine this working:

-  When an authoritative nameserver gets an update for a DNS record, it immediately starts pushing updates to every resolver it knows about (false)

The authoritative nameserver never pushes updates, it just replies with the current record when it receives a query (true)
权威名称服务器从不推送更新，它只是在收到查询时回复当前记录（true）



`firewall`: adblockers contry-IP blocking

`stub resolver`: built into client OS
fingerprinting stub resolvers
 They've got pcaps
> from the downstream side of their caching servers and are looking at
> trying to pull more interesting statistics than query counts out of
> them

Dnsmasq: DNS forwarder and DHCP server.

hand out range and lease period
#dhcp-range=192.168.0.50,192.168.0.150,12h
all DNS queries from the local machine need to go to dnsmasq,
while at the same time, dnsmasq must be configured to forward all those queries to upstream resolver

put `"nameserver 127.0.0.1"` in `/etc/resolv.conf` to force all queries sent from local processes Need To Go Through `unbound` First
>Many existing home networks use their router as their  only DNS server

`/etc/network/interfaces`
 `/etc/NetworkManager/NetworkManager.conf`

reach the IP address needed to access a website 
`recursive resolver`: 


know who to ask: 
- public resolver: 
  1.1.1.1(cloudflare), 208.67.220.220,208.67.222.222(openDNS,part of cisco), 8.8.8.8(google)
- local resolver: [ISC BIND9](https://www.icann.org/en/blogs/details/ten-million-dns-resolvers-on-the-internet-22-3-2012-en) and [NLNet Labs’ unbound](https://www.nlnetlabs.nl/projects/unbound/about/).,powerDNS
 cache that IP address in case they’re asked again. 
if cache expired, stale, or missing
negative cache(cache the absence/noexist of that record)
>browser and OS caching

nonexistent domains to an IP they control that shows you ads or a weird search page that they control.

configure the root zone hint files,to bootstrap the DNS resolution process 

[the names and IP addresses of the authoritative name servers for the root zone](https://www.iana.org/domains/root/files)

```c [https://github.com/NLnetLabs/unbound/blob/6e0756e819779d9cc2a14741b501cadffe446c93/iterator/iter_hints.c#L131]
 if(do_ip4) {
	if(!ah(dp, "A.ROOT-SERVERS.NET.", "198.41.0.4"))	goto failed;
	if(!ah(dp, "B.ROOT-SERVERS.NET.", "199.9.14.201")) goto failed;
	if(!ah(dp, "C.ROOT-SERVERS.NET.", "192.33.4.12"))	goto failed;
	if(!ah(dp, "D.ROOT-SERVERS.NET.", "199.7.91.13"))	goto failed;
	if(!ah(dp, "E.ROOT-SERVERS.NET.", "192.203.230.10")) goto failed;
	if(!ah(dp, "F.ROOT-SERVERS.NET.", "192.5.5.241"))	goto failed;
	if(!ah(dp, "G.ROOT-SERVERS.NET.", "192.112.36.4"))	goto failed;
	if(!ah(dp, "H.ROOT-SERVERS.NET.", "198.97.190.53"))	goto failed;
	if(!ah(dp, "I.ROOT-SERVERS.NET.", "192.36.148.17"))	goto failed;
	if(!ah(dp, "J.ROOT-SERVERS.NET.", "192.58.128.30"))	goto failed;
	if(!ah(dp, "K.ROOT-SERVERS.NET.", "193.0.14.129"))	goto failed;
	if(!ah(dp, "L.ROOT-SERVERS.NET.", "199.7.83.42"))	goto failed;
	if(!ah(dp, "M.ROOT-SERVERS.NET.", "202.12.27.33"))	goto failed;
} 
```


function as: 


### setting up local resolver [unbound](https://www.nlnetlabs.nl/projects/unbound/about/) for your local/remote machine(even network)

```bash
# chroot Jail:A program that is run in such a modified environment cannot access files and commands outside that environmental directory tree
chroot: "/etc/unbound"
directory: "/etc/unbound"
logfile: "/etc/unbound/unbound.log"
pidfile: "/etc/unbound/unbound.pid"
```

display info for your remote machine os distro 
```bash
cat /etc/os-release
NAME="CentOS Linux"
VERSION="7 (Core)"
ID="centos"
ID_LIKE="rhel fedora"
VERSION_ID="7"
PRETTY_NAME="CentOS Linux 7 (Core)"
ANSI_COLOR="0;31"
CPE_NAME="cpe:/o:centos:centos:7"
HOME_URL="https://www.centos.org/"
BUG_REPORT_URL="https://bugs.centos.org/"

CENTOS_MANTISBT_PROJECT="CentOS-7"
CENTOS_MANTISBT_PROJECT_VERSION="7"
REDHAT_SUPPORT_PRODUCT="centos"
REDHAT_SUPPORT_PRODUCT_VERSION="7"
```

you machine consult `/etc/systemd/resolved.conf` file settings for default resolver
change will only take effect on this uptime

### setting up for network

minimal usable configuration” are as follows

<detail>
<summary> [RFC1918: address location reserved for private network](https://datatracker.ietf.org/doc/html/rfc1918.html)   
</summary>
```
10.0.0.0 - 10.255.255.255 (10/8)
172.16.0.0 - 172.31.255.255 (172.16/12)
192.168.0.0 - 192.168.255.255 (192.168/16)
```


</detail>





### 本机的网interface cataloging

- loopback (回环网卡)
- vEthernet（虚拟网卡）比如 `wls2`
- eth0 (connecting it to the Internet with a public/external facing IP)
- tun0 (virtual tunnel interface)
- wlan0（虚拟网卡）
- tun0 tunnel interface
 can be added and configured to have a tunnel IP address of 10.192.122.3 in a /24 subnet
 the kernel’s RTNL layer/subsystem  is used for registering a virtual interface.
known inside the kernel as a “link”. This easily gives access to
the kernel APIs accessed by ip-link(8) and ip-set(8).
moving toward an entirely Netlink-based configuration API,
move between network namespaces

 routing table implementations—an LC-trie [22] for IPv4
and a radix trie for IPv6
etwork namespaces to entirely isolate the WireGuard interface
and routing table from the physical interfaces and routing tables. 
```bash
$ ip link add dev wg0 type wireguard
$ ip address add dev wg0 10.192.122.3/24
$ ip route add 10.0.0.0/8 dev wg0
$ ip address show
$ ip link set wg0 up
$ ping 10.10.10.230
```



配置监听主机`host`
interface is used to listened incoming traffic  from clients
the list of IP addresses on that interface 
`interface-automatic`: listen on all address on all(current and future) interfaces

- `localhost`: 限制只能从本机访问,
- bind server to host `0.0.0.0` : 不限定只能从本机访问，还可以从局域网的其他设备通过局域网ip访问

to find all ip address of the machine(本机所有网卡的 IP 地址)

`interface: 0.0.0.0`: listen traffic on all interfaces,
```bash
# on macos
ifconfig | grep "inet " | awk '{print $2}'
```



```bash
[Resolve]
DNS=127.0.0.1
FallbackDNS=1.1.1.1
#Domains
DNSSEC=true
#DNSoverTLS=no 
#MulticastDNS=no
#LLMNR=0
#Cache=no-negative
DNSStubListener=no # not use a resolver that is “recommended” by your router.
#DNSStubListenerExtra=
```
make DNS resolver config remain effect on system reboot `nvim /etc/systemd/resolved.conf`
```
ln -fs /run/systemd/resolve/resolv.conf /etc/resolv.conf
```
restart `systemd-resolved` to make change to configuration  take effect
```bash
systemctl restart systemd-resolved
```




```bash
scutil --dns
DNS configuration

resolver #1
  nameserver[0] : 192.168.10.1
  if_index : 12 (en0)
  flags    : Request A records
  reach    : 0x00020002 (Reachable,Directly Reachable Address)

resolver #2
  domain   : local
  options  : mdns
  timeout  : 5
  flags    : Request A records
  reach    : 0x00000000 (Not Reachable)
  order    : 300000

resolver #3
  domain   : 254.169.in-addr.arpa
  options  : mdns
  timeout  : 5
  flags    : Request A records
  reach    : 0x00000000 (Not Reachable)
  order    : 300200

resolver #4
  domain   : 8.e.f.ip6.arpa
  options  : mdns
  timeout  : 5
  flags    : Request A records
  reach    : 0x00000000 (Not Reachable)
  order    : 300400

resolver #5
  domain   : 9.e.f.ip6.arpa
  options  : mdns
  timeout  : 5
  flags    : Request A records
  reach    : 0x00000000 (Not Reachable)
  order    : 300600

resolver #6
  domain   : a.e.f.ip6.arpa
  options  : mdns
  timeout  : 5
  flags    : Request A records
  reach    : 0x00000000 (Not Reachable)
  order    : 300800

resolver #7
  domain   : b.e.f.ip6.arpa
  options  : mdns
  timeout  : 5
  flags    : Request A records
  reach    : 0x00000000 (Not Reachable)
  order    : 301000

DNS configuration (for scoped queries)

resolver #1
  nameserver[0] : 192.168.10.1
  if_index : 12 (en0)
  flags    : Scoped, Request A records
  reach    : 0x00020002 (Reachable,Directly Reachable Address)

networksetup -setdnsservers Wi-Fi 1.1.1.1
```




stop sharing your DNS traffic with third parties(ISP)


which don’t know any domains themselves but know who to ask. q
typically managed by your Internet access provider(ISP)
cloud provider offer public DNS 
Google Public DNS  `8.8.8.8`
cloudflare public DNS `1.1.1.1`

DNS caching  miss or (OS) level DNS caching  or browser caching miss(chrome://net-internals/#dns)

`root nameserver`:  
stores top level domain(.com, .org)
responds to the resolver with the address of a Top Level Domain (TLD) DNS server 

`authoritative nameserver`: 
responds to the resolver with the address of the origin server
 as it is the final source of truth for certain DNS records,satisfy queries from its own record without needing to further query source 

````



````

## CDN

personal computing,cloud computing
IaaS,NaaS,PasS,SasS,FasS

distribute content closer to website visitors

go the the farm where the food is grown or local grocery store

load balance
distribute requests 
 active health checks
 steering direct traffic to the fastest origin
server pool for a given user

filtering and monitoring HTTP traffic

## firewall

ruleset
 abuse detection and rate limiting,


traffic detection: attack or bot
check on  passenger: no-fly list and tickets dest is matched flight serve 
check on  Baggage: carrying  disallow items
Intrusion Detection 


IP Lists 

```bash

curl https://api.cloudflare.com/client/v4/rulesets/{ruleset_id}/rules \
--header "Authorization: Bearer $cf_api_token" \
--header "Content-Type: application/json" \
--data '{
  "action": "skip",
  "action_parameters": {
    "ruleset": "current"
  },
  "expression": "ip.src in $iplist",
  "description": "Allowed IPs from iplist",
}'
```



```bash
  "rules": [
    {
      "action": "skip",
      "action_parameters": { "ruleset": "current" },
      "expression": "tcp.dstport in { 8080 } ",
      "description": "Allow port 8080"
    },
  ]

```


Proxies server
anonymous:VPNs, and TOR nodes
Botnets
```sh
curl https://api.cloudflare.com \
--header "Authorization: Bearer $CF_API_TOKEN" \
--header "Content-Type: application/json" \
--data '{
  "phase": "magic_transit",
  "rules": [
    {
      "action": "block",
      "expression": "ip.src in $cf.anonymizer",
      "description": "Block traffic from anonymizer proxies"
    }
  ]
}'
```
Geo-blocking


```bash
curl https://api.cloudflare.com \
--header "Authorization: Bearer $CF_API_TOKEN" \
--header "Content-Type: application/json" \
--data '{
  "phase": "magic_transit",
  "rules": [
    {
      "action": "block",
      "expression": "ip.geoip.country == \"BR\"",
      "description": "Block traffic from Brazil"
    }
  ]
}'

```

Stateful inspection:

Identity awareness

Sandboxing
Application awareness 

malware

Ransomware
Spyware keylogger
worms self-replicate 
Trojan Horses encrypt files 



1、白名单和黑名单均为空时，默认所有域名可以被正常解析；
2、只有白名单时，仅白名单里的域名可以被正常解析；
3、只有黑名单时，仅黑名单里的域名会被拒绝解析，其他域名均可以被正常解析；
4、当白名单和黑名单同时存在时，添加在白名单中的域名可以被正常解析，而白名单之外的域名会被拒绝解析。若域名同时被添加在白名单和黑名单中，会被拒绝解析。

blockList denyList blacklist
rate limit

whileList allowList  exclusive party(only pre-proved)

lose control hand over the responsibility to a third party

## load balance


runtime environment:on-premise, hybrid, or multi-cloud .
An industry leader in marketing automation
software 


Investigating: Cloudflare is investigating an issue
Identified/pinpointed:The cause of this issue has been identified and we are working toward a fix.
fixed

## DNS security

data transfer 
encryption
compression

detection
mitigation
Source IP Verification 
prevention

man-in-the-middle position 


tamper,
Snooping prevention
hijacking
intercept
impersonation


reflection attack.
prevents the source IP from being forged.


 DNSSEC, DDoS mitigation,
 firewall(rate limit)
 dns query privacy

DNS tunneling
DNS hijacking
DNS spoofing/cache poisoning: 
DDoS protection, 
 DNS tampering, 


 subdomain takeover.
 BGP hijacking, 



DMS flood attack
nonexistent subdomain attacks against one site
‘phantom’ domain servers that either respond to requests very slowly or not at all.
causing a denial of service for legitimate traffic

## DNS log

## DNS cache






until  time to live (TTL) expires 


timer

网络切换

域名解析机制需要遵循以下设计策略：

兜底策略
虽然阿里公共DNS已经接入 BGP Anycast，并实现了多地跨机房容灾，但为了保证在最坏的情况下客户端域名解析依然不受影响，建议您采用以下的兜底策略：

1.先向阿里公共DNS发起域名查询请求。

2.如果阿里公共DNS查询返回结果的statusCode为非200、连接超时等，则通过本地 LocalDNS 进行域名解析。超时时间建议为3s。

缓存策略
为了尽可能地减少域名解析次数，建议在本地进行缓存。缓存规则如下：

1.缓存时间：缓存时间建议设置为60s至600s。

2.缓存更新： 缓存更新应在以下两种情形下进行：

用户网络状态发生变化时：客户端的网络状态由WWAN切换 Wi-Fi，Wi-Fi 切换WWAN的情况下，其接入点的网络归属可能发生变化，需要重新向阿里公共DNS发起域名解析请求，以获得用户当前网络归属下的最优指向。

缓存过期时：当域名解析的结果缓存时间到期时，客户端应该向阿里公共DNS重新发起域名解析请求以获取最新的域名对应的 IP。为了使用户在缓存过期后尽早获取到最新的IP地址，建议使用定时器每间隔1min更新一下过期缓存。

IP优选策略
在向阿里公共DNS发起域名查询请求并获取到解析结果后可先将结果存入缓存，同时异步对解析结果进行测速（socket方式或ping方式）、排序，最后更新缓存中的数据，通过该策略实现IP优选。


## CDN Cache/Proxy

the CDN fetches that content from an origin server, 
and then saves a copy of the content for future requests.




## spectrum of DNS attacks

attack vectors

SQL injection
Cross-site scripting (XSS)
Remote Code Execution (RCE)


Attack Score Class: attack | 'likely attack' | 'likely clean' | 'clean'


## rule engine

### actions

actions: how to handle matches for the rule expression

list the  actions supports in rule engine
```ts
type action = 
  /** ensuring that the site visitor is human, not automated. */
  "Managed Challenge" |
  "interactive challenge" |
  "bot challenge" |
  "block" |
  "skip" |
  "bypass"
  "log" |
  "execute" |
  "rewrite" |
  "redirect" | 
  /** resolved hostname, and/or resolved destination port of incoming requests. */
  "route" |
  "set cache" |
  "set configuration" |
  "set compression"
```

storage provider

datadog
azure blob
amazon s3
google cloud 
sumo logic
splunk

bic (browser integrity check)
hot (hotlink protection)
macro (the reputation list)


cache rules created  via API dashboard/ rule expression builder/ rule expression editor / Expression validation
join multi clause via logic operator
`ip.src == 192.0.2.1 && (tcp.flags.push || tcp.flags.reset)`

<field> <comparison_operator> <value>

addressing

routing table 
<networl><subnet><host>

A CIDR block(netblock) is a collection of IP addresses that share the same network prefix
rules template

ruleset engine
transform functions
any,all,concat,json_lookup, ends_with


A fully populated ruleset object 

endpoints

List and view 

Create or upsert:  `create if not exists` or `replace if exists`


rule phase:
network layer:
ddos_l4
firewall

check on  passenger: no-fly list and tickets dest is matched flight serve 
check on  Baggage: carrying  disallow items

Stateful inspection:


Application layer
Request phases
Response phases 
http_request_sanitize
http_request_dynamic_redirect
http_request_transform

uuidv4(seed)
```ts 
export type CacheStatus = 
  'hit' |
  /**  resource not found in cache and served from origin  */
  'miss'|
  /** resource  was found in cache but was expired and served from the  */
  'expired' |
  /**  resource was served from  cache but was expired.  could not retrieve an updated resource from the origin */
  'stale'
  /** respect Cache-Control directives received from the origin server. */
```

targeting DNS infrastructure
DDoS attacks on DNS resolvers 
DDoS attacks at network layer


phase of the attack lifecycle

mirai scans the Internet for devices that still
have the factory-default username and password
settings, 

reverse proxy: sits in front of an origin server
 forward proxy:  sits in front of a client 


  real-time traffic data.


## network security
 access control, cyber attack prevention, malware detection,

## network 


origin server: host web content/ web assets
Networks connect and network edge device

connected device
autonomous system

wan office location(office in Paris LAN and an office in New York LAN)


undersea cables that cross the Atlantic Ocean.


![alt text](/oss/autonomous.png)
IP address space 

BGP trust-based system. 
BGP hjacking: announcing a IP that wasn't actually behind them.
upstream providers or peers
how a Pakistani ISP shut down YouTube with blackhole routing


timing, cache info


e-commerce

private equity
fintech

Cloud Giants
 Surveys of IT and security leaders
 remote or  hybrid  workforce
 multitenancys 


 employee, former employee, contractor, consultant, board member, or vendor.


##  identity and access management(IAM)

authentication/ identity verification
they are who they claims to be

authentication factors
 user knows user has user is

grant permissions  to operation on resources




 rule-based access control
 attribute-based access control
 rule-based access control


 cross-site scripting
  collect identity credentials,geolocation,webcam data
persistent 
 post content that other users will see, such as comments forum or social media site

 input sanitization and output escaping


## social engineering attack

drive drops.

  The Associated Press Twitter account being compromised, and the attackers tweeted out a fake news story about an explosion in the White House


  Advanced-fee scam 
 Nigerian prince or wealthy Spanish prisoner,
 Account deactivation scam
 Website forgery scam
 clone phishing

   email security 




   <embed src="https://cfl.re/3T4s1Ic#toolbar=1&amp;navpanes=0&amp;page=1" width="100%" height="1200" alt="pdf" pluginspage="http://www.adobe.com/products/acrobat/readstep2.html">




  
## review active sessions

IP address, location, device type, browser type, and last active login.

the session timeout for the Cloudflare dashboard ↗ is 72 hours without any activity.


## Review audit logs 

storage services, SIEMs, and log management providers 

## Endpoints



 HTTP request logs.
logpush logpull

```ts
export interface ILogPush {
  dataset: 'firewall_events' | 'nel_reports' | 'dns_logs' |  'http_requests' | 'page_shield_events' | 
  "Workers Trace Events"
}
```

Account-scoped datasets use /accounts/{account_id} and Zone-scoped datasets use /zone/{zone_id}. 

`{DATASET}` argument indicates the log category \
`http_requests`, spectrum_events, `firewall_events`, `nel_reports`, or `dns_logs`.
`http_requests` or `audit_logs`


```http
"action_parameters": {
  "request_fields": [
    { "name": "<http_request_header_name_1_in_lower_case>" },
    { "name": "<http_request_header_name_2_in_lower_case>" },
    // ...
  ],
  "response_fields": [
    { "name": "<http_response_header_name_1_in_lower_case>" },
    { "name": "<http_response_header_name_2_in_lower_case>" },
    // ...
  ],
  "cookie_fields": [
    { "name": "<cookie_name_1>" },
    { "name": "<cookie_name_2>" },
    // ...
  ]
}

```


```ts
export interface NelReport {
  id: string;
  client_ip_asn: number;
  client_ip_asn_name: string;
  client_ip_country: string;
  last_known_good_colo_code: string;
  phase: NelReportPhase;
  timestamp: Date;
  type: string;
  created_at: Date;
}
```

errorPhase
errorType



DNS over TLS
DNS over HTTPs



```ts
export interface DNSLog {
  // IATA airport code of data center that received the request.
  coloCOde: string;
  // send Client Subnet to authoritative DNS name servers(response geo-located closest data center)
  ednsSubnet: string;

  queryType: DNSQueryType;
  
  /** Indicates if the response was served from cache */
  responseCached: boolean;
  
  /** DNS response code (e.g., 0 for NOERROR, 3 for NXDOMAIN) */
  responseCode: DNSResponseCode;
  
  /** Client's IPv4 or IPv6 address */
  sourceIp: string;
  
  /** When the DNS query occurred */
  timestamp: Date;
  
  /** When this record was created in the database */
  createdAt: Date;
}

```


`firewall_events`

```ts
export interface FirewallEvent {
  action: 'allow' | 'block' | 'challenge'
  ClientASN: number
  ClientCountry  
  /** classify IPs as  */
  ClientIPClass: 'searchEngine' | 'allowList' | 'monitoringService' | 'scan' | 'tor'
}
```

ipInfo: 'ASN' | 'country' | 'user agent' | 'device type'
`ASN`: (Autonomous System Number) is a 32 bit number used in BGP routing which uniquely identifies each network on the Internet.

>Name servers should be dispersed (topologically and geographically) across the Internet to avoid risk of single point of failure (RFC 2182).
> test will display distribution of name servers among Autonomous Systems. warns users if all IP addresses are located in a single ASN.

[IPv4 to ASN/country code map db](https://iptoasn.com/)




customize  zone view

the dataset (table), the metrics to retrieve and filter or group by

clients:
 GraphiQL Altair ↗ and Insomnia ↗.


## TLD  domain registration

register root domain(zone apex) tld nameserver


- lease a domain from registrar(domain provider) if you do not already own a domain

- registered your domain name through a reseller 

<detail>
<summary>
 a exhaustive list domain registrars provider
</summary>
</detail>


<detail>
<summary>why have to disable DNSSEC: signing and validation</summary>
when DNSSEC enabled, added DNS records 
are  
supports DNSSEC: trace upward auth chain




a digit signature signed by your DNS provider
are attached to the DNS record(s) that the server sends to the client 


verifies DNS query responses you receive are unaltered
verify the source of the answers that it receives

This action prevents issuing new DNS records on your behalf 
redirect traffic intended for your domain 

offer a comprehensive series of hands-on guides about the implementation of DNSSEC in Infoblox, PowerDNS, BIND and Unbound.

not exhaustive list of widely used(market shared) software packages, stating the key features of each.
For you to consider solution to use,

DNSSEC signing on authoritative servers:


DNSSEC validation on caching resolvers

DNSSEC-validating resolvers: 
Bind,
Dnsmasq,
Knot Resolver,
PowerDNS Recursor, 
systemd-resolved and Unbound. 


</detail>

domain contact info privacy(being displayed in the Whois record.) 

DNS records  DNS 记录
Nameservers  名称服务器
Domain expiration date  域到期日期
Registration date  注册日期
Registrar organization  注册商组织
Domain owner contact information

## 更换域名解析服务器


修改为自建DNS服务器


grace period renew
redemption period.


## whois database and Registration Data Access Protocol (RDAP)


data collected that are required to identify natural and legal persons holding domain names and domain
name registrations

public record maintained by domain registrars that contains details about the owner of a domain name


## DNS setup

connect with cloudflare 
manage DNS records through the Cloudflare dashboard or API.

setup (full), you add your domain, import your DNS records, and update your authoritative nameservers 



## Record Types




Batch record changes.

at least one required
```
-H "X-Auth-Email: $cf_email" \
-H "X-Auth-Key: $cf_token" \
```
```
ARecord = {
comment: stringOptional
Comments or notes about the DNS record. This field has no effect on DNS responses.

content: stringOptional
A valid IPv4 address.

name: stringOptional
DNS record name (or @ for the zone apex) in Punycode.

proxied: booleanOptional
Whether the record is receiving the performance and security benefits of Cloudflare.


settings: { Optional
Settings for the DNS record.

ipv4_only: booleanOptional
When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

ipv6_only: booleanOptional
When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

}
tags: Array<RecordTags>Optional
Custom tags for the DNS record. This field has no effect on DNS responses.

ttl: TTLOptional
Time To Live (TTL) of the DNS record in seconds. Setting to 1 means 'automatic'. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.


type: "A"Optional
Record type.

}

Domain types


ARecord = { comment, content, name, 5 more... }

AAAARecord = { comment, content, name, 5 more... }

BatchPatch = ARecord | AAAARecord | CAARecord | 18 more...

BatchPut = ARecord | AAAARecord | CAARecord | 18 more...

CAARecord = { comment, content, data, 6 more... }

CERTRecord = { comment, content, data, 6 more... }

CNAMERecord = { comment, content, name, 5 more... }

DNSKEYRecord = { comment, content, data, 6 more... }

DSRecord = { comment, content, data, 6 more... }

HTTPSRecord = { comment, content, data, 6 more... }

LOCRecord = { comment, content, data, 6 more... }

MXRecord = { comment, content, name, 6 more... }

NAPTRRecord = { comment, content, data, 6 more... }

NSRecord = { comment, content, name, 5 more... }

PTRRecord = { comment, content, name, 5 more... }

Record = ARecord | AAAARecord | CAARecord | 18 more...

RecordResponse = ARecord | AAAARecord | CAARecord | 18 more...
RecordTags = string
Individual tag of the form name:value (the name must consist of only letters, numbers, underscores and hyphens)


SMIMEARecord = { comment, content, data, 6 more... }

SRVRecord = { comment, content, data, 6 more... }

SSHFPRecord = { comment, content, data, 6 more... }

SVCBRecord = { comment, content, data, 6 more... }

TLSARecord = { comment, content, data, 6 more... }

TTL = number | 1
Time To Live (TTL) of the DNS record in seconds. Setting to 1 means 'automatic'. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.


TXTRecord = { comment, content, name, 5 more... }

URIRecord = { comment, content, data, 7 more... }
```






## the awareness of e-mail security protocols,
 
 offer a comprehensive series of hands-on guides about the implementation of SPF/DKIM/DMARC and DANE in the Postfix and Exim mail server software. In addition, .nl registrars have access to a free e-learning module about e-mail security standards.



 