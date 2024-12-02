
export type LocationQueryValue = string | null
/**
 * Possible values when defining a query.
 *
 * @internal
 */
export type LocationQueryValueRaw = LocationQueryValue | number | undefined
/**
 * Normalized query object that appears in {@link RouteLocationNormalized}
 *
 * @public
 */
export type LocationQuery = Record<
  string,
  LocationQueryValue | LocationQueryValue[]
>
export type LocationQueryRaw = Record<
  string | number,
  LocationQueryValueRaw | LocationQueryValueRaw[]
>

export function parseQuery(search:string): LocationQuery {
    const query: LocationQuery = {}
    if(search === '' || search === '?') return query
    const hasLeadingIM = search[0] === '?'
    const searchParams = (hasLeadingIM ? search.slice(1) : search).split('&')
    
    return query
}

export function stringfyQuery(query: LocationQueryRaw): string {

}