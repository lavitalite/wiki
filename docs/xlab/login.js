export class CookieBasedSSO {
    constructor(domain) {
        this.cookieName = 'sso_token';
        this.domain = domain;
    }
    async login(username, password) {
        try {
            const response = await fetch(`${this.domain}/sso/auth`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
        }
        finally {
        }
    }
}
