

## linguist:repo lang stats

By default, Linguist treats all of the paths defined in `lib/linguist/vendor.yml` as vendored 
and therefore doesn't include them in the language statistics for a repository.

Use the `linguist-vendored` attribute to vendor or un-vendor paths.

```bash
$ cat .gitattributes
special-vendored-path/* linguist-vendored
jquery.js linguist-vendored=false
```


Just like vendored files, Linguist excludes documentation files from your project's language stats.
`lib/linguist/documentation.yml` lists common documentation paths and excludes them from the language statistics for your repository.

Use the `linguist-documentation` attribute to mark or unmark paths as documentation.

```bash
$ cat .gitattributes
project-docs/* linguist-documentation
docs/formatter.rb linguist-documentation=false
```


Modelines can be placed anywhere within a file and are respected when determining how to syntax-highlight a file on GitHub.com


## product map
```
digraph gh_product {

  subgrpah subDomain {
    docs.github.com
    support.github.com
    community.github.com    
  }

  subgraph CI/CD and DevOps {

  }

  subgraph API and Webhooks {

  }

  subgraph Code Search and Navigation {
    
  }

  subgraph Collaborative coding {

  }

  subgrpah project management {

  }

}
```