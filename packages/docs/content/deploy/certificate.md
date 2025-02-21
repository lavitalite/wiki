Upload your own certificates


## Publicly-Trusted TLS Server Certificate





 CA therefore acts as a trusted third party 


use the private key of the root certificate to sign  certificates

be validated using the public key of the root certificate 



 Web hosting services
 installed and activated on the origin server


- SSL/TLS certificate issued by a certificate authority (CA)
- self-signed certificate


### certificate chain 

Root certificate publicly trust is established through distribution of the root certificates in operating systems or browsers

 intermediate and root certificates

contains two things:

certificate signing request

Build the CSR payload
```bash
request_body=$(cat <<EOF
{
  "country": "US",
  "state": "MA",
  "locality": "Boston",
  "organization": "City of Boston",
  "organizational_unit": "Championship Parade Detail",
  "common_name": "app.example.com",
  "sans": [
    "app.example.com",
    "www.example.com",
    "blog.example.com",
    "example.com"
  ],
  "key_type": "p256v1"
}
EOF
)
```
All fields except for organizational_unit and key_type(fall back to default`rsa2048` if not specified) are required. 


optimized for maximum browser compatibility
optimized for shortest chain
bundle method: `compatible` or `modern`

identity info: who owns the certificate and which domains the certificate is valid for.

public key: The public half of a key pair

the domain controls
the public key of the owner


validate  certificates 

Digital Signing

Secure Access


Data & Email Encryption

certificates chain
root CA

e-mail connection, file transfers, video/audio conferencing, instant messaging, voice-over-IP (VoIP),email
跨越卢比河

 X.509 standard for Public Key Infrastructures (PKIs).
### use case

### how a DNS zone operates.
DNS zone file stored in DNS server

troubleshooting, spam filtering, and bot detection.

reverse lookup zone lookup

 Start of Authority (SOA) record, 

 Secondary servers maintain duplicate of the zone's DNS records


REFRESH: time period (in seconds) secondary servers should wait before asking primary servers for the SOA record to see if it has been updated.

RETRY: The time to wait before asking an unresponsive primary nameserver for an update again.


权威应答
缓存应答  
转发应答  
递归应答



EXPIRE: If a secondary server does not get a response from the primary server for this amount of time, it should stop responding to queries for the zone.

zone transfer

### the burden of certificate lifecycle management

- delegate managing all the certificate issuance and renewals on your behalf
- maintain control over your TLS private keys by uploading your  own certificates.

Cloudflare for SaaS 
revoke

auto-renew 

issuance/distribution


### certificate status

Validation(Pending)
Issuance  
Active
Expired

### fit into/act as in big picture

a self-signed certificate and purchasing a publicly trusted certificate—


## why TLS:its necessary:

### step walkthrough


Validation  
CAs are supposed to only give certificates to sites that own the domain(s) listed in the certificate. Domain validation is usually done in one of three ways:

- Putting a challenge in the DNS zone


- Putting a challenge into a meta-tag of an HTML page hosted on the domain


- Sending an email challenge to the domain registrant from the WhoIs DB


 trusted by browsers


domain control validation 

to secure transmit HTTP requests
it must first establish the TLS session

 certificate signing request (CSR)
Unified Communications Certificates (UCC)
Subject Alternative Name (SAN) certificate 


CA ecosystem 

Root CAs 
Intermediate CAs


Certificates Managed
## dashboard control panel and API

If you've been granted access to the API yet, you may generate a token from control panel

 attach your token as the `Authorization: Bearer {token} header`  with every request.

GET /api/v1/servers/{server}/status
status: `online | offline`

POST /api/v1/servers/{server}/shutdown

POST /api/v1/servers/{server}/boot 

POST /api/v1/servers/{server}/reboot
POST /api/v1/servers/{server}/cancel


DELETE /api/v1/keys/{key}

````[deploy]
```bash
 --data '{
        "product": "nvme-2gb",
        "location": "AMS",
        "billing": "monthly",
        "image": "almalinux8",
        "hostname": "my-new-server",
        "features": {
            "ipv6": true,
            "additional-ipv4": 2,
            "ssh_keys": [118, 119]
        }
    }'
```

```json [response]
data": {
  "invoice_id": 445566,
  "invoice_url": "https://cloud.hosthatch.com/invoices/445566",
  "server_id": 112233,
  "server_url": "https://cloud.hosthatch.com/servers/112233",
  "requires_payment": true,
  "outstanding_balance": {
      "price": 10,
      "currency": "USD"
  }
}
```

````
 ```
"billing_cycles": {
    "monthly": {
        "price": 0,
        "setupfee": 0,
        "currency": "USD"
    },
    "quarterly": {
        "price": 0,
        "setupfee": 0,
        "currency": "USD"
    }
}
 ```

Export report



  

domain name registrar provide":

data access secure from malicious actors.

domain hijacking attacks, 
registration of a domain name without the original registrants’s permission
impersonate the original site or disrupt its business.


The registrar facilitates the transactions and provides support services,
ICANN has a published list of every accredited and active domain name registrar on their website.



domain names can technically only be leased.


the registrar’s info is provided in the WHOIS listing for that domain, and the registrar acts as a proxy for the registrant.



upload you own certificates

### Issue


###  validation

#### Domain control validation flow.

parties involved in the process:
Certification Authorities(证书颁发机构)

Registration Authorities

there are four major steps to take

serverNotReady | exceedsRateLimit | lackSufficientAuthorized 


```
                        directory
                            |
                            +--> newNonce
                            |
+----------+----------+-----+-----+------------+
|          |          |           |            |
|          |          |           |            |
V          V          V           V            V
newAccount   newAuthz   newOrder   revokeCert   keyChange
|          |          |
|          |          |
V          |          V
account       |        order --+--> finalize
           |          |     |
           |          |     +--> cert
           |          V
           +---> authorization
                     | ^
                     | | "up"
                     V |
                   challenge

```

Before a certificate authority (CA) will issue a certificate for a domain, the requester must prove they have control over that domain.  That is when the DCV process takes place


retry this validation check for a finite period before timing out. 


host/serve challenge files on`./well-known/acme-challenge/` path


download the signed certificate

## Renew

## Certificate details and compatibility

The primary certificate uses a P-256 key, is SHA-2/ECDSA signed, and will be presented to browsers that support elliptic curve cryptography (ECC). The secondary or fallback certificate uses an RSA 2048-bit key, is SHA-2/RSA signed, and will be presented to browsers that do not support ECC.


Ensure the certificate file format is Apache-compatible, such as X509/Base64 or PEM/CER format.



>a hostname (archaically nodename) is a label that is assigned to a device/machine connected to a network, and that is used by network program to identify the device in various forms of electronic communication

to change a hostname
| Redhat / CentOS / Fedora | /etc/sysconfig/network |
|--------------------------|------------------------|
| Debian / Ubuntu          | /etc/hostname          |

