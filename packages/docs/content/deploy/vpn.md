


## modern vpn solutions spectrums

adopter
Noise is currently used by WhatsApp, WireGuard, Lightning, and I2P.

Swan/IPsec 
OpenVPN/OpenSSL

technical whitepaper

considerations that went into each design decision.
and dive into implementation details, choices

topologically  peers single round trip public key exchange mechanism
key distribution
openssh
cfssl
key management

PGP-signed
self-signed
 using LDAP and signed by certificate authorities

send/receive flow


wireguard with easy to connect/deploy(exchanging ssh keys) and configurable

- with [IPsec](): abstraction:layer of separation to academic perfection

### wireguard
[WireGuard](), in contrast, starts from flawed layering violations
using practical engineering solutions and cryptographic techniques that solve real world problems


All issues of key distribution and pushed configurations are out of scope of WireGuard;

### model: parties involved act as
model of SSH and Mosh; both parties have each other's public keys, and then they're simply able to begin exchanging packets through the interface.


is used for registering a virtual interface.
configured by modern network utilities like  `ip(1)`
or obsoleted network utilities like `ifconfig(8)` and `route(8)`.

| Legacy utility   | Replacement command | Note                                |
|------------------|---------------------|-------------------------------------|
| ifconfig         | ip addr, ip link    | Address and link configuration      |
| route            | ip route            | Routing tables                      |
| arp              | ip neigh            | Neighbors                           |
| iptunnel         | ip tunnel           | Tunnels                             |
| nameif, ifrename | ip link set name    | Rename network interfaces           |
| ipmaddr          | ip maddr            | Multicast                           |
| netstat          | ss, ip route        | Show various networking statistics  |
| brctl            | bridge              | Handle bridge addresses and devices |


> For a Unix domain socket, the name is a `/path/filename`.
> For an Internet domain socket, the name is an `IP address:Port number`.
> Iproute2 is a collection of utilities for controlling and monitoring TCP/IP networking and traffic in Linux
> including routing, network interfaces, tunnels, traffic control, and network-related device drivers.

>`/etc/net` project: use all modern Linux network technologies in a convenient way.
Bridging
Bonding
Tunneling


Encrypt entire IP packet using peer ABCDEFGH's public key.

the guarantee/ensure that incoming packets arrives on firewall interface `wg0` with ip range `10.192.124.0/24` will be authenticated,attributed after decrypted



DTLS and IKEv2 HIPv2 

 encapsulates IP packets over UDP. 
private key and your peers' public keys


IP ownership cookie is simply the result of computing a MAC of the initiator’s source IP address using this changing secret 

ties messages sent from an initiator to its IP address mechanism


allowing for rate limiting using
classical IP rate limiting algorithms (token bucket, etc—see section 7.4 for implementation details).

suffers from three major flaws.


end off a compute resource  CPU-exhaustion attack

peers
listening port
dest port
src port

### silent and invisible to unauthorized clients

remain silent
to elicit any kind of response,this first MAC (msg.mac1) always is required to be present and valid.
provoked a cookie reply message

> attacker with an man-in-the-middle position:drop cookie reply messages anyway to prevent a connection
torrents of
>flood/torrent forge invalid cookie replies to initiators to prevent them from authenticating with a correct cookie

use the AD(additional data) field to bind cookie replies to initiation messages

knowing the responder’s public key is sufficient proof
for already knowing of its existence

invisible to illegitimate peers and network scanners

no reply to unauthenticated messages

replay initial handshake messages

### what is accomplished
handshake phase: secure session is establishing in round trip(over passing back and forth.)
transport phase: agreed-upon key

Each party maintains the following variables:

Identity hiding
```asciidoc
+----------------+  +----------------+     +----------------+  +----------------+
|    Initiator   |  |   Responder   |     |    Initiator   |  |   Responder   |
+----------------+  +----------------+     +----------------+  +----------------+
        |                  |                      |                  |         
        |  Handshake Init  |                      |  Handshake Init  |         
        |----------------->|                      |----------------->|         
        |                  |                      |                  |         
        |  Handshake Resp  |                      |   Cookie Reply   |         
        |<-----------------|                      |<-----------------|         
        |                  |                      |                  |         
        |  Transport Data  |                      |  Handshake Init  |         
        |----------------->|                      |----------------->|         
        |                  |                      |                  |         
        |  Transport Data  |                      | Handshake Resp   |         
        |<-----------------|                      |<-----------------|         
        |                  |                      |                  |         
        |                  |                      |  Transport Data  |         
        |                  |                      |----------------->|         
        |                  |                      |                  |         
        |                  |                      |  Transport Data  |         
        |                  |                      |<-----------------|         
        |                  |                      |                  |         

```

```
msg = handshake_initiation {
    u8 message_type
    u8 reserved_zero[3]
    u32 sender_index
    u8 unencrypted_ephemeral[32]
    u8 encrypted_static[AEAD_LEN(32)]
    u8 encrypted_timestamp[AEAD_LEN(12)]
    u8 mac1[16]
    u8 mac2[16]
}
```



remaining fields are populated 
package arrive out of order, order label to resemble



under no case send an initiation handshake message more than once 
Whenever a handshake initiation message is sent as the result
of an expiring timer, 

connection has failed,attempt to retry count

session key alive
mechanism to ensure that
sessions stay active

`Keepalive-Timeout`seconds  

 must integrate as natively and smoothly as
possible with existing kernel infrastructure and userland expectations, tools, and API

key rotation

current secure session, the previous secure
session, and the next secure session

The handshake initiation message that kicks off  the handshake process for establishing a secure
session


timestamp is included,

when sending packets, the list of allowed IPs behaves as a sort of routing table, and when receiving packets, the list of allowed IPs behaves as a sort of access control list.



| Interface Public Key | Interface Private Key            | Listening UDP Port |
|----------------------|----------------------------------|--------------------|
| zTIB_p8Dg            | 10.192.122.3/32, 10.192.124.0/24 |                    |

association of public keys and allowed IPs.

| Peer Public Key | Allowed Source IPs               | Internet Endpoint |
|-----------------|----------------------------------|-------------------|
| zTIB_p8Dg       | 10.192.122.3/32, 10.192.124.0/24 |                   |
| TkMn_9Kzc       | 10.192.122/32, 192.168.0/16      |                   |
| gN6S_eEEA       | 10.10.10.230/32                  | 192.95.5.64:21841 |


server discovers the endpoint of its peers 

```
[Interface]
PrivateKey = yAnz5TF+lXXJte14tji3zlMNq+hd2rYUIgJBgB3fBmk=
ListenPort = 51820

[Peer]
PublicKey = xTIBA5rboUvnH4htodjb6e697QjLERt1NAB4mZqp8Dg=
AllowedIPs = 10.192.122.3/32, 10.192.124.1/24

[Peer]
PublicKey = TrMvSoP4jYQlY6RIzBgbssQqY3vxI2Pi+y71lOWWXX0=
AllowedIPs = 10.192.122.4/32, 192.168.0.0/16

[Peer]
PublicKey = gN65BkIKy1eCE9pP1wdc8ROUtkHLF2PfAqYdyYBz6EA=
AllowedIPs = 10.10.10.230/32
```



```
[Interface]
PrivateKey = gI6EdUSYvn8ugXOt8QQD6Yc+JyiZxIhp3GInSWRfWGE=
ListenPort = 21841

[Peer]
PublicKey = HIgo9xNzJMWLKASShiTqIybxZ0U3wGLiUeJ1PKf8ykw=
Endpoint = 192.95.5.69:51820
AllowedIPs = 0.0.0.0/0

```

containerize
```bash
ip netns add container
lp link add wg0 type wireguard
# move to new namespace
ip link set wg0 netns container
ip -n container addr add 192.168.4.32/32 dev wg0
ip netns exec container wg setconf wg0 /etc/wireguard/wg0.conf
ip -n container link set wg0 up
ip -n container route add default dev wg0
```


```bash
# ip route del default
# ip route add default dev wg0
# ip route add 163.172.161.0/32 via 192.168.1.1 dev eth0
```


a packet that locally generated (or forwarded) is being transmitted on wg0 interface
, the cryptokey routing table is consulted to determine which public key to use for encryption

- The destination IP address of the packet, 192.168.87.21, is inspected, which matches the peer `TrMv...WXX0`.
(If it matches no peer, it is dropped, and the sender is informed by a standard ICMP “no route to host”
packet, as well as returning -ENOKEY to user space.)


symmetric session key.
peer match:choosing peer based on the source IP, 
allowed IPs list,


- On the other end of the spectrum is [OpenVPN]( )
 user space TUN/TAP based solution that uses TLS
 kernel space and user spac

which achieves the requirements of authenticated key exchange (AKE) security [18],
avoids key-compromise impersonation, avoids replay attacks, provides perfect forward secrecy, provides identity
hiding of static public keys similar to SIGMA [16], and has resistance to denial of service attacks

### open source alternative




home router:

firewall
dnat-gateway
dns resolver


file transfer over network  

Airdrop the file from another device

Store the file in a cloud app and open it ion your device


using sftp. They are located in /etc/openvpn/server/easy-rsa/pki



## recommend DynDNS solutions

From streaming and the cloud to gaming: 

Uploads/downloads
bandwidth



FTTC
Fiber to the Curb
roadside cabinet

FTTB
Fiber to the Building:

FTTH
Fiber to the Home

### connect to instance


### server setup

user management
group assignment,

> superuser: has the ability to override any file ownership and permission restrictions.

> xargs: piping output as command arg
````bash


sudo adduser <username>


# list existing users and groups belongs
cut -d: -f1 /etc/passwd | xargs group



# show all the groups that your user is currently a member of.
groups

# To show all the currently existing group in os
cat /etc/group
root:x:0: daemon:x:1: bin:x:2:
root : x : 0 : 
│     │   │   └─ 第四字段：组成员列表（这里是空的）
│     │   └───── 第三字段：GID（组ID号）
│     └───────── 第二字段：密码占位符
└─────────────── 第一字段：组名

# grant sudo privileges to a user, append to sudo privileges group
sudo usermod -aG wheel <username>


# list the users on os
cat /etc/passwd
```asciidoc
root:*:0:0:System Administrator:/var/root:/bin/sh
│    │ │ │ │                  │         │
│    │ │ │ │                  │         └── Shell
│    │ │ │ │                  └─────────── Home Directory
│    │ │ │ └────────────────────────────── User Info (GECOS)
│    │ │ └──────────────────────────────── Primary Group ID
│    │ └────────────────────────────────── UID (0 is reserved for root and UIDs 1-99 are reserved for other predefined accounts)
│    └──────────────────────────────────── Password (*=encrypted and salted password is stored in /etc/shadow file.d)
└───────────────────────────────────────── Login Name
```

# change user's password 
# root privileges is not required 
passwd <newpassword>


cat /etc/shadow
```asciidoc
mark:$6$.n.:17736:0:99999:7:::
[--] [----] [---] - [---] ----
|      |      |   |   |   |||+-----------> Unused
|      |      |   |   |   ||+------------> Expiration date
|      |      |   |   |   |+-------------> Inactivity period
|      |      |   |   |   +--------------> Warning period
|      |      |   |   +------------------> Maximum password age
|      |      |   +----------------------> Minimum password age
|      |      +--------------------------> Last password change
|      +---------------------------------> Encrypted Password
+----------------------------------------> Username
Encrypted Password. The password is using the `$type$salt$hashed` format. ]
`$type` is the algorithm prefix used On GNU/Linux as follows

`$1$` – MD5
`$2a$` – Blowfish
`$2y$` - eksblowfish
`$5$` – SHA-256
`$6$` – SHA-512
```



# list/show users belong to sudo privileges group
sudo lid -g root
 root(uid=0)
 sync(uid=5)
 shutdown(uid=6)
 halt(uid=7)
 operator(uid=11)

# delete user
sudo userdel <username>

# delete with user’s home directory
sudo userdel -r <username>
# either command  removed from groups that they were added to

./sacli --key "auth.module.type" --value "pam" 
````


**file permission controls**

Octal values

- `4` = read permissions
- `2` = write permissions
- `1` = execute permission

Symbolic values


```bash

# default set permission for new created directories are `777`


# Setting Default Permissions with Unmask


# the owner and members of the owner group to be able to write to newly created directories
```

### Find the URLs for your web server

When you complete the installation process on the command line, the output displays the URLs for your admin UI and client UI as well as the username and randomly generated password for the admin account.
```bash
+++++++++++++++++++++++++++++++++++++++++++++++ 
Access Server 2.14.1 has been successfully installed in /usr/local/openvpn_as
Configuration log file has been written to /usr/local/openvpn_as/init.log

Access Server Web UIs are available here:
Admin UI: https://198.51.100.130:943/admin
Client UI: https://198.51.100.130:943 
Login as "openvpn" with "RR4ImyhwbFFq" to continue
(password can be changed on Admin UI)
+++++++++++++++++++++++++++++++++++++++++++++++
```
integrated certificate management

### setup authentication

supported authentication systems

- local auth
stores usernames and password hashes in the user properties database(located in `/usr/local/openvpn_as/etc/db/userprop.db`)

- external auth

Multi-Factor Authentication (MFA)
a time-based one-time password (TOTP) generated on a separate user device that regularly changes.

auth mode
`LDAP`: Directory Access Protocol for querying user information from tools such as Active Directory, OpenLDAP
Google Secure LDAP, okta,jumpcloud

Upload your certificate to directory:`/etc/ssl/certs/ `
Upload your key to directory: `/etc/ssl/private/`
`RADIUS`:RADIUS: Remote Authentication Dial-in User Service protocol for authenticating remote users in a system such as JumpCloud, Okta, etc.
`SAML SSO`: Security Assertion Markup Language using XML to transfer identity data from a system such as Azure AD, OneLogin, etc.
`PAM`: Pluggable Authentication Modules, a centralized authentication in Linux where you manage the user accounts in the server's operating system where you’ve installed Access Server.



Global server configuration: /usr/local/openvpn_as/etc/db/config.db

Server and client certificates: /usr/local/openvpn_as/etc/db/certs.db

User and group properties: /usr/local/openvpn_as/etc/db/userprop.db

Log database: /usr/local/openvpn_as/etc/db/log.db

Debug and low level settings: /usr/local/openvpn_as/etc/as.conf

These were added since Access Server 2.6.1:

Local server node configuration: /usr/local/openvpn_as/etc/db/config_local.db

Cluster configuration: /usr/local/openvpn_as/etc/db/cluster.db

Cluster notification system: /usr/local/openvpn_as/etc/db/notification.db

backup and failover

>Whenever you execute a program, the operating system always opens three files, standard input, standard output, and standard error as we know whenever a file is opened, the operating system (from kernel) returns a non-negative integer called a file descriptor. The file descriptor for these files are 0, 1, and 2, respectively.



## backup server conf
::: info  i/o redirection
`stdin`: expect standard input usually receive input from a device, such as a keyboard
`stderr`: the default dest for this stream is the terminal display.
`stdout`: generated by a program. when not redirected, it will output  directly to the terminal.


_**Stream Redirection**_

to a file:

**Overwrite**

- `>` - standard output
- `<` - standard input
- `2>` - standard error

**Append**

- `>>` - standard output
- `<<` - standard input
- `2>>` - standard error

to another program:

**Pipes**

redirect from one program stdout to another stdin


command processing and execution happens in phases and while each phase is (generally) done left-to-right, each phase will (again, generally) be finished before the next one starts.
- The shell parses the command line (this is actually several phases itself).
- The shell processes I/O redirections (from left to right).
- The shell executes the command (with all redirects already in place).

```bash
which apt > /dev/null 2>&1 && apt -y install sqlite3
which yum > /dev/null 2>&1 && yum -y install sqlite
cd /usr/local/openvpn_as/etc/db
[ -e config.db ]&&sqlite3 config.db .dump>../../config.db.bak
[ -e certs.db ]&&sqlite3 certs.db .dump>../../certs.db.bak
[ -e userprop.db ]&&sqlite3 userprop.db .dump>../../userprop.db.bak
[ -e log.db ]&&sqlite3 log.db .dump>../../log.db.bak
[ -e config_local.db ]&&sqlite3 config_local.db .dump>../../config_local.db.bak
[ -e cluster.db ]&&sqlite3 cluster.db .dump>../../cluster.db.bak
[ -e notification.db ]&&sqlite3 notification.db .dump>../../notification.db.bak 
cp ../as.conf ../../as.conf.bak
```



````bash

```
[client]
user=<MYSQL_USER_NAME>
password=<MYSQL_PASSWORD>
port=3306
```
# restrict to root access
chmod go-rwx /etc/.my.cnf
# link to root's home directory over direct file in root home 
# bypassing root user entering credentials
ln -s /etc/.my.cnf /root/.my.cnf
````

Connect to the RDS instance with the mysql command line tool:
```bash
mysql -h auroratest-cluster.cluster-ctqs9e0kxora.us-east-1.rds.amazonaws.com
```
Use the mysql command-line prompt to create the databases:
```bash
mysql> create database as_certs;
Query OK, 1 row affected (0.01 sec)
mysql> create database as_config;
Query OK, 1 row affected (0.01 sec)
mysql> create database as_log;
Query OK, 1 row affected (0.01 sec)
mysql> create database as_userprop;
Query OK, 1 row affected (0.01 sec)
```


Default Services and Ports
| Service         | Protocol | Default Port |
|-----------------|----------|--------------|
| OpenVPN daemons | UDP      | 1194         |
| OpenVPN daemons | TCP      | 443 (shared) |
| Web services    | TCP      | 443 (shared) |
| Web services    | TCP      | 943          |
| Clustering API  | TCP      | 945          |


private network


gateway: has public-facing IP address
forwards TCP/UDP port traffic 
VPN tunnel traffic
client-server web traffic



One is the control channel, where key negotiation, authentication occur
The other is the data channel where the encryption packets are



## install and setup

| Ubuntu*                  | 24.04 LTS (x86_64 and ARM64)<br>22.04LTS (x86_64 and ARM64)<br>20.04 LTS (x86_64 and ARM64) |
|--------------------------|---------------------------------------------------------------------------------------------|
| Debian                   | 1211                                                                                        |
| Red Hat Enterprise Linux | 98                                                                                          |


network stack.

network topology
Site-to-Site
hub-to-spoke
branch office


OS hostname.
displayed server hostname from the command-line interface with the command `hostnamectl`.

>Almost all modern Linux distro comes with systemd an init system used in Linux distributions to bootstrap the user space and to manage system processes after booting.

