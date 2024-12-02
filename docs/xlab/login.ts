export class CookieBasedSSO {
    private readonly domain: string;
    private readonly cookieName: string = 'sso_token'

    constructor(domain: string) {
        this.domain = domain
    }

    async login(username: string, password: string):Promise<boolean> {
        try {
            const response = await fetch(`${this.domain}/sso/auth`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            })
        }
    }
}