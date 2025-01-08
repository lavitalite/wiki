Database service and connection information
Global and runtime configuration options
Set of exposed entities
Authentication method
Security rules required to access identities


## Configuration field


includes all possible configuration fields that are available for a configuration file.



### Top-level fields

description of the top-level fields in  table format:


`$schema`


`data-sources`

`data-source-files`

`runtime`

`entities`

## mini configuration for a single file

```json
{
  "$schema": "schema.json",
  "data-sources": {
    "database-type": "mysql",
    "connection-string": "@env('sql-connection-string')"
  },
  "entities": {
    "Book": {
    "source": "dbo.books",
      "permissions": [{
        "actions": ["*"],
        "role":  "anonymous"
      }]
    }
  }
}
```




### Connection resiliency