export const API_ENDPOINTS = {
  telegram: {
    baseUrl: 'https://api.telegram.org',


  }
}

type HttpMethod = 'GET' | 'POST'

export interface ParameterConfig {
  method: HttpMethod,
  location: "path" | "query"
  description: {
    en: string;
    zh: string;
  };
  required?: boolean
  default?: string

}


export interface FiledConstraints {
  enum: string[]
}


export interface ResourceParameter {
  in: "path" | "query" | "body" | "header"
}