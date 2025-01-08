```ts
export type HeadersInit = 
  | string[][] 
  | Record<string, string | ReadonlyArray<string>> 
  | Headers
```

This union type allows headers to be initialized  in three formats:

`string[][]`: Array of key-value pairs

```ts
[['Content-Type', 'application/json'], ['Authorization', 'Bearer token']]
```

`Record<string, string | ReadonlyArray<string>>`: Object format

```ts
{
  'Content-Type': 'application/json',
  'Accept-Language': ['en-US', 'en'] // Multiple values for one header
}
```
Headers: Existing Headers instance


new Headers(existingHeadersInstance)


upsert: `create if not exists` or `replace if exists`