export interface PlatformConfig {
  name: string
  baseUrl: string;
  version: string;
  auth?: {
    type: "bearer" | "apiKey" | "bot" | "basic" | "oauth"
    tokenEnvKey?: string;
    headerKey?: string;
    addTo: "query" | "header"
  }
  defaultHeaders?: Record<string, string>
  rateLimit?: {
    maxRequests: number;
    remainingRequests: number;
    window: number;
    reset: number; // seconds until reset
  }
}


export interface OAuth2Token {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope?: Record<string, boolean>
}


type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export interface EndpointDefinition {
  name: string;
  method: HttpMethod

}

export interface ResourceDefinition {
  name: string;
  endpoints: EndpointDefinition[]
  pathParams?: string[]
  queryParams?: string[]
  response: {
    type: string
    schema: Record<string, any>
  }
}


export interface ApiDefinition {
  platform: PlatformConfig;
  resources: ResourceDefinition[]
  features?: {
    cache?: {
      enabled: boolean;
      defaultTTL: number;
    };
    rateLimit?: {
      enabled: boolean;
      storage: 'memory' | 'redis'
    }
  }
}



