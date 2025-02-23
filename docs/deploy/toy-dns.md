## Message format
[RFC 1035] DOMAIN NAMES - IMPLEMENTATION AND SPECIFICATION


```asciidoc
 +-------------+          +----------------+
|             |  query   | DNS Root      |
|             |--------->| Nameserver    |
|             |          |               |
|             |<---------+----------------+
|             | response |               |
|             |          |               |  
|             |     3    | DNS TLD       |
|             |--------->| Nameserver    |
|    DNS      |  request |               |
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


## Request message format


```asciidoc
+---------------------+
|        Header       |
+---------------------+
|       Question      | the question for the name server
+---------------------+
|        Answer       | Resource Records (RRs) answering the question
+---------------------+
|      Authority      | RRs pointing toward an authority
+---------------------+
|      Additional     | RRs holding additional information
+---------------------+

```
All DNS messages have the same format:

Query and response messages fill out different parts of the message


 fields aren't relevant to our query, and will be set to 0




### Header




```asciidoc

0  1  2  3  4  5  6  7  8  9  A  B  C  D  E  F
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
|                      ID                       |
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
|QR|   Opcode  |AA|TC|RD|RA|   Z    |   RCODE   |
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
|                    QDCOUNT                    |
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
|                    ANCOUNT                    |
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
|                    NSCOUNT                    |
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
|                    ARCOUNT                    |
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+

```


In this diagram, each cell represents a single bit. In each row, there are sixteen columns, representing two bytes of data.
The diagram is split into rows to make it easier to read, but the actual message is a continuous series of bytes.


`QR`: A 1 bit flag specifying whether this message is a query (`0`) or a response (`1`). 

`Opcode`: A 4 bit field that specifies the query type. used types are: 
- `0`: Standard query 
- `1`: Inverse query 
- `2`: Server status request
- `3-15`: Reserved for future use


### DNS Header Flags

> In DNS query header there is a flag field in the second 16 bit,
> in query from bit 5 through bit 11 

```
Bit 	Flag 	Description 	Reference 
bit 5	AA	Authoritative Answer	[RFC1035]
bit 6	TC	Truncated Response	[RFC1035]
bit 7	RD	Recursion Desired	[RFC1035]
bit 8	RA	Recursion Available	[RFC1035]
bit 9		Reserved	
bit 10	AD	Authentic Data	[RFC4035][RFC6840][RFC Errata 4924]
bit 11	CD	Checking Disabled	[RFC4035][RFC6840][RFC Errata 4927]
```

### DNS RCODEs

| RCODE | Name     | Description         | Reference                                   |
|-------|----------|---------------------|---------------------------------------------|
| 0     | NoError  | No Error            | [RFC1035]                                   |
| 1     | FormErr  | Format Error        | [RFC1035]                                   |
| 2     | ServFail | Server Failure      | [RFC1035]                                   |
| 3     | NXDomain | Non-Existent Domain | [RFC1035]                                   |
| 4     | NotImp   | Not Implemented     | cloudflare deprecated DNS ANY meta-quer[^1] |
| 5     | Refused  | Query Refused       | [RFC1035]                                   |




header in hex
```
AA AA - ID
01 00 - Query parameters
00 01 - Number of questions
00 00 - Number of answers
00 00 - Number of authority records
00 00 - Number of additional records
```
in query parameters:
`0000 0001 0000 0000` which is `01 00` in hex


## question section 


The question section has the format:
```
0  1  2  3  4  5  6  7  8  9  A  B  C  D  E  F
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
|                                               |
/                     QNAME                     /
/                                               /
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
|                     QTYPE                     |
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
|                     QCLASS                    |
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
```

`QNAME`: 
```
对于第一个标签 "example":
+--+--+--+--+--+--+--+--+
|07|65|78|61|6D|70|6C|65|
+--+--+--+--+--+--+--+--+
 ↑  ↑  ↑  ↑  ↑  ↑  ↑  ↑
 |  e  x  a  m  p  l  e
 长度(7)

对于第二个标签 "com":
+--+--+--+--+
|03|63|6F|6D|
+--+--+--+--+
 ↑  ↑  ↑  ↑
 |  c  o  m
 长度(3)

07 65 78 61 6D 70 6C 65 03 63 6F 6D 00
↑  ↑---------------↑  ↑  ↑--------↑  ↑
|     example         |     com      |
长度7                长度3           结束符

```
a length octet followed by that number of octets(8位)
ASCII code for each character
The QNAME section is terminated with a zero byte (00).
`QTYPE`:  DNS record type we're looking up. `A` records, whose value is `1`.
`QCLASS`: `IN`, which has a value of `1`.


```
07 65 - 'example' has length 7, e
78 61 - x, a
6D 70 - m, p
6C 65 - l, e
03 63 - 'com' has length 3, c
6F 6D - o, m
00    - zero byte to end the QNAME
00 01 - QTYPE
00 01 - QCLASS
```

```bash
 ~  dig  +all +recurse google.com        

; <<>> DiG 9.10.6 <<>> +all +recurse google.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 41689
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 4, ADDITIONAL: 8

;; QUESTION SECTION:
;google.com.                    IN      A

;; ANSWER SECTION:
google.com.             300     IN      A       59.24.3.174

;; AUTHORITY SECTION:
google.com.             57453   IN      NS      ns4.google.com.
google.com.             57453   IN      NS      ns1.google.com.
google.com.             57453   IN      NS      ns2.google.com.
google.com.             57453   IN      NS      ns3.google.com.

;; ADDITIONAL SECTION:
ns2.google.com.         94575   IN      A       216.239.34.10
ns3.google.com.         93058   IN      A       216.239.36.10
ns4.google.com.         300878  IN      A       216.239.38.10
ns1.google.com.         300618  IN      A       216.239.32.10
ns2.google.com.         93161   IN      AAAA    2001:4860:4802:34::a
ns3.google.com.         145116  IN      AAAA    2001:4860:4802:36::a
ns4.google.com.         303782  IN      AAAA    2001:4860:4802:38::a
ns1.google.com.         302577  IN      AAAA    2001:4860:4802:32::a

```





### Sending the request

```python
message = "AA AA 01 00 00 01 00 00 00 00 00 00 " \
"07 65 78 61 6d 70 6c 65 03 63 6f 6d 00 00 01 00 01"

response = send_udp_message(message, "8.8.8.8", 53)
```




## reading the response


### header section

The message starts out with a header, just like our query message:
```
AA AA - Same ID as before
81 80 -  flags, look at this below
00 01 - 1 question
00 01 - 1 answer
00 00 - No authority records
00 00 - No additional records
```
convert `81 80` to binary:
> 8 bits in binary(octet) or 2 digits in hex
```
8    1    8    0
1000 0001 1000 0000
```
QR = 1: This message is a response
AA = 0: This server isn't an authority for the domain name example.com
RD = 1: Recursion was desired for this request
RA = 1: Recursion is available on this DNS server
RCODE = 0: No errors reported



### anser section



The answer section has a resource record format:
```
0  1  2  3  4  5  6  7  8  9  A  B  C  D  E  F
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
|                                               |
/                                               /
/                      NAME                     /
|                                               |
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
|                      TYPE                     |
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
|                     CLASS                     |
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
|                      TTL                      |
|                                               |
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
|                   RDLENGTH                    |
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--|
/                     RDATA                     /
/                                               /
+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
```


```
C0 0C - NAME
00 01 - TYPE
00 01 - CLASS
00 00
18 4C - TTL
00 04 - RDLENGTH = 4 bytes
5D B8
D8 22 - RDDATA
```

`TTL`: 4 octets(32 bit)
`RDLENGTH`:  the 2 octets(16 bits/1 row)
The byte length of the following RDDATA section. In this case, the length is 4.
`RDATA`:  4 octets(32 bits) contain the four segments of our IP address: 93.184.216.34.


## build a DNS query


Write header_to_bytes and question_to_bytes functions to convert those objects into byte strings
Write a build_query(domain_name, record_type) function that creates a DNS query


```py
from dataclasses import dataclass
import dataclasses
import struct

@dataclass
class DNSHeader:
    id: int
    flags: int
    num_questions: int = 0
    num_answers: int = 0
    num_authorities: int = 0
    num_additionals: int = 0

```


```py
@dataclass
class DNSQuestion:
    name: bytes
    type_: int 
    class_: int 
```


encode the domain

b"\x06google\x03com\x00"


```py
def encode_dns_name(domain_name):
    encoded = b""
    for part in domain_name.encode("ascii").split(b"."):
        encoded += bytes([len(part)]) + part
    return encoded + b"\x00"
```


```py
import random
random.seed(1)

TYPE_A = 1
CLASS_IN = 1

def build_query(domain_name, record_type):
    name = encode_dns_name(domain_name)
    id = random.randint(0, 65535) # 2 octets
    RECURSION_DESIRED = 1 << 8 # 9th bit from right
    header = DNSHeader(id=id, num_questions=1, flags=RECURSION_DESIRED)
    question = DNSQuestion(name=name, type_=record_type, class_=CLASS_IN)
    return header_to_bytes(header) + question_to_bytes(question)
```


```py
import socket

query = build_query("www.example.com", 1)

# create a UDP socket
# `socket.AF_INET` means that we're connecting to the internet
#                  (as opposed to a Unix domain socket `AF_UNIX` for example)
# `socket.SOCK_DGRAM` means "UDP"
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

# send our query to 8.8.8.8, port 53. Port 53 is the DNS port.
sock.sendto(query, ("8.8.8.8", 53))

# read the response. UDP DNS responses are usually less than 512 bytes
# (see https://www.netmeister.org/blog/dns-size.html for MUCH more on that)
# so reading 1024 bytes is enough
response, _ = sock.recvfrom(1024)

```

## send query

```py
import socket

def send_query(resolver_ip, domain_name, record_type_desired):
    query = build_query(domain_name, record_type_desired)
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.sendto(query, (resolver_ip, 53))

    data, _ = sock.recvfrom(1024)
    return parse_dns_packet(data)
```




## parse the response

[an official list of all the root nameserver IPs from IANA](https://www.iana.org/domains/root/servers)
[the source code in `bind` which hardcodes the root nameserver IPs.](https://gitlab.isc.org/isc-projects/bind9/-/blame/4c3b063ef8bd6e47b13c1dac3087daa1301a78ac/lib/dns/rootns.c#L37-80)
[the source code in `unbound` which hardcodes the root nameserver IPs](https://github.com/NLnetLabs/unbound/blob/1fb78afc291a72f2a69f2c8215e36428d5bfb8f8/iterator/iter_hints.c#L131-L143)




### parse the domain name


### parse the answer section



####  parse the record

```py
from dataclasses import dataclass 

@dataclass
class DNSRecord:
    name: bytes
    type_: int
    class_: int
    ttl: int
    data: bytes 

TYPE_A = 1
TYPE_NS = 2
import struct

def parse_record(reader):
    name = decode_name(reader)
    data = reader.read(10)
    type_, class_, ttl, data_len = struct.unpack("!HHIH", data)
    # It would be more hygenic here to store the raw data and the
    # parsed result in separate fields in DNSRecord, but we're lazy.
    if type_ == TYPE_NS: # here's the code we're adding
        data = decode_name(reader)
    elif type_ == TYPE_A:
        data = ip_to_string(reader.read(data_len))
    else:
        data = reader.read(data_len)
    return DNSRecord(name, type_, class_, ttl, data)


```


### parse the record 


### wrapping up
```py
def parse_dns_packet(data):
    reader = BytesIO(data)
    header = parse_header(reader)
    questions = [parse_question(reader) for _ in range(header.num_questions)]
    answers = [parse_record(reader) for _ in range(header.num_answers)]
    authorities = [parse_record(reader) for _ in range(header.num_authorities)]
    additionals = [parse_record(reader) for _ in range(header.num_additionals)]

    return DNSPacket(header, questions, answers, authorities, additionals)
```


### test

```py
import socket

TYPE_A = 1

def domain_lookup(domain_name):
    query = build_query(domain_name, TYPE_A)
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.sendto(query, ("8.8.8.8", 53))

    # get the response
    data, _ = sock.recvfrom(1024)
    response = parse_dns_packet(data)
    return ip_to_string(response.answers[0].data)
```



[^1]: instead of being a query for a single type like A , AAAA or MX, ANY retrieves all the available types for a given name. Over the years there have been many arguments over the semantics of ANY with some people arguing it really means ALL. Answers to ANY queries are among the biggest that DNS servers give out. The original reason for adding the ANY to DNS was to aid in debugging and testing and there is no real reason why a normal application would ever issue a ANY query.
.The AXFR operation could be used to transfer all data for a DNS zone between two servers. 
For security reasons,
recommended option is to restrict the scope of IP addresses that can carry this action(list all entries in your DNS zone) and return REFUSED or drop the query for all others(authoritative server should be allowed to refuse to answer it)


DNS reflection attacks 
an attacker sending a DNS name lookup request to an open DNS server with the source address spoofed to be the target’s address.flood a target system with DNS response traffic
Solution
Detection

this attack that US-CERT has observed involves DNS servers configured to allow unrestricted DNS zone queries
using Response Rate Limiting to restrict the amount of traffic.


