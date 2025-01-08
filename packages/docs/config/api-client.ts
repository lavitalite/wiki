export class ApiClient {
  constructor(
    private baseUrl: string,
    private restPath: string = 'api'
  ) {
    this.baseUrl = baseUrl.replace(/\/$/, '')
    this.restPath = restPath.replace(/^\/|\/$/g, '')
  }

  async get<T>(
    entity: string,
    params: QueryParams = {}
  ): Promise<{ value: T[]; nextLink?: string }> {
    const url = new URL(
      this.buildUrl(entity) + QueryBuilder.buildQueryString(params)
    )

    const response = await fetch(url.toString(), {
      headers: { 'Content-Type': "application/json" }

    })

    if (!response.ok) {

    }
    return response.json()
  }

}