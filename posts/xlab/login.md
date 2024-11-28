## Cookie-Based SSO Implementaion

```ts
export class CookieBasedSSO {
   private readonly domain: string
    private readlony cookieName: string = '__sso_token'
    constructor(domain: string) {
        this.domain = domain
    } 

    async login(username: string, password): Promise<boolean> {
        const response = await fetch(`${this.domain}/sso/auth`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'comm
            },
            body: JSON.stringify({username, password})  
        })
        
    }
}

```