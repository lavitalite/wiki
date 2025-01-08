export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"


export interface EndpointConfig {
  path: string

}


export interface Paramter {
  name: string
  type: string
  in: 'path' | 'query' | 'header' | 'body'
  required: boolean;
  description: {
    zh: string
    en: string
  }
} 