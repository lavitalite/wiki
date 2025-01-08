export interface Config {
  $select?: string[]
  $filter?: string;
  $orderby?: string
  $first?: number
  $after?: string
}



export interface Author {
  email: string
  bio: string | null
  avatar_url: string | null
}
const type: RequestInit = {

}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiResponse<T> {
  value: T[]
}


{
  appKey: config.apiKey,
    appSecret: config.apiSecret,
      accessToken: config.accessToken,
        accessSecret: config.accessSecret
}