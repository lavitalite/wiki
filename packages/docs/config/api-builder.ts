export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"


export interface ParameterConfig {
  locationL: 'path' | 'query' | 'header' | 'body'
}

path: "/repos/:owner/:repo/:git/blobs",
  operations: {
  get: {

  }
}


type APIConfig = {
  baseUrl: string
  restPath: string
}


export class APIBuilder {
  private baseUrl: string;
  private restPath: string;
  constructor(config: APIConfig) {
    // strip forward and trailing slashes, leave path segments
    this.baseUrl = config.baseUrl.replace(/\/$/, '')
    this.restPath = config.restPath.replace(/^|\/$/, '')
  }

  private buildUrl(path)
}



