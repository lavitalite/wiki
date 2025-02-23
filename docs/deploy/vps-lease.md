KVM virtualization technology 


billing


renewal


refunds


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


## server security



## cloud computing provider
 compute-storage separation architecture 

## cloud storage provider



## VPS


`VPS`: sit between dedicated server and shared server.
divides dedicated compute and storage resources, share infra


amazon vps

GCP


## 
API/CLI/UI




| Days after the expiration date       | Impact                                                                                                                                                                   | Solution          |
|--------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------|
| 7 days before expiration             | As your VPS instance approaches its expiration date, our system will prompt or notify you to ensure timely renewal.                                                      | grace period      |
| Within 7 days of instance expiration | Your VPS instance will be forcibly shut down and placed in a “Suspended" state, which means that VPS resources cannot be accessed. Access will be restored upon renewal. | redemption period |
| after 7days of instance expiration   | On the 8th day following the expiration of your VPS, your instance will be in a "Terminated" state, and your data will be unrecoverable.                                 | destroyed         |


