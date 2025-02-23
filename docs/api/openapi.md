without access to source code, documentation, or through network traffic inspection


## usecase

An OpenAPI definition can then be used by documentation generation tools to display the API, code generation tools to generate servers and clients in various programming languages

 mark path segment as replaceable using path parameters


The value for these path parameters The value for these path parameters MUST NOT contain any unescaped
forward slashes (/), question marks (?), or hashes (#).


provide clarifications to, this document

security mechanisms can be used across the API.

The list of values includes alternative security requirement
Only one of the security requirement  need to be satisfied to be a authorized request.


## info object

Info Object provides metadata about the API.

```json

{
  "title": "Sample Pet Store App",
  "summary": "A pet store manager.",
  "description": "This is a sample server for a pet store.",
  "termsOfService": "https://example.com/terms/",
  "contact": {
    "name": "API Support",
    "url": "https://www.example.com/support",
    "email": "support@example.com"
  },
  "license": {
    "name": "Apache 2.0",
    "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
  },
  "version": "1.0.1"
}

```


```yaml

title: Sample Pet Store App
summary: A pet store manager.
description: This is a sample server for a pet store.
termsOfService: https://example.com/terms/
contact:
  name: API Support
  url: https://www.example.com/support
  email: support@example.com
license:
  name: Apache 2.0
  url: https://www.apache.org/licenses/LICENSE-2.0.html
version: 1.0.1
```


Parameter Locations





/**
 * Audience-Restricted Access Tokens
 *  The authorization server associates the access token with the particular resource server 
 */


/**
 * authorization server knows the URLs of all resource servers
 * the client needs to tell the authorization server the intended resource server
 * the authorization server may just refuse to issue access tokens for unknown resource server URLs
 *  the authorization server may just refuse to issue access tokens
 *  the resource server will detect the audience mismatch  and refuse to serve the request
 */



Preventing Leakage via Metadata

return metadata
```ts
{
  "issuer":"https://server.site",
  "authorization_endpoint":
    "https://site.com/authorize",
  "resource_servers":[
    "email.site.com",
    "storage.site.com",
    "video.site.com"
  ]
}


return access token


Refresh Token Protection

back end implementation and client side consumption.


Authentication is delegated to a supported identity provider where access token can be issued. 


An acquired access token must be included with incoming requests by the client

the resource server is then supposed to verify the 
presented access tokens
ensuring that it was the intended audience of the token


Anonymous requests
open API
Requests can also be made without being authenticated. 


authorization server

authentication server


Roles set the permissions context in which a request should be executed



"book": {
      "source": "dbo.books",
      "permissions": [
        {
          "role": "free-access",
          "actions": [
            "create",
            "update",
            "delete",
            {
              "action": "read",
              "fields": {
                "include": [ "Column1", "Column2" ],
                "exclude": [ "Column3" ]
              }
            }
          ]
        }
      ]
    }