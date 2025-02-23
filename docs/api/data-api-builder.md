uses the singular name of an entity whenever the query is expected to return a single item.


uses the plural name of an entity whenever the query is expected to return a list of items.


book_by_pk(): to return zero or one entity
books(): to return a list of zero or more entities


returning zero or more items support pagination and nextLink:

create base Configuration
`dab-config.json` 
Create env-specific Configurations
`dab-config.dev.json`
`dab-config.test.json`
`dab-config.prod.json`

Setting env
`DAB_ENVIRONMENT=development` or `DAB_ENVIRONMENT=production` variable determines which set of configurations to apply.


Accessing environment variables





"BookDetail": {
  "methods": [ "GET", "POST" ]
  "source": {

    identity provider
    db provider
    type: "dbObject" | "3rd-endpoint"
    "type": "view" | "endpoint" | "table" | "store-procedure"
    "object": "dbo.vw_books_details",
    "key-fields": [ "id" ]
  },
  "permissions": [{
    "role": "anonymous",
    "actions": [ "read" ]
  }]
}
