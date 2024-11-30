---
outline: deep
---

# Routing

vitepress map between visited url and served file

## File_Based Routing

access url to generated HTML pages are mapped from the file strcture of the  source markdown files 
## fs resolution and url path resolution

base path

src dir and project root

###  source to url mapping

The rusulting source-to-url mapping
```
src/index.md --> /index.html(accessible as /)
src/guide.md --> /guide.html
```
### project root

`.vitepress`: reserved location for `vitepress config file`, `dev server cache`, `build output`, `optional theme customization`

Project root is where vitepress will try to look the look for the `.vitpress`


when you run `vitepress dev` or `vitepress build` from the command line, 
the vitepress will use the current working direcotry(will be treated) as proejct root.

`project root`: default to `process.cwd()` or specify sub directory `vitepress dev docs`



## File reference

you can use both absolute and relative path when linking between page


```md
<!-- sibling/peer directory  -->
[reference](./reference/site-co.md)
<!-- under same/current directory -->
[](../guide/routing.md)
```


### Linking to Non-vitepress page

::: tip Note

Alternatively, you can directly use the anchor tag syntax:

```md
<a href="/pure.html" target="_self">Link to pure.html</a>
```

:::

## cleaner URL

:::
To serve clean URLs with VitePress, server-side support is required.
:::


hosting platforms (for example Netlify, Vercel, GitHub Pages) provide the ability to map a URL like `/foo` to `/foo.html` if it exists, without a redirect:



- Netlify and GitHub Pages support this by default.
- Vercel requires enabling the [`cleanUrls` option in `vercel.json`](https://vercel.com/docs/concepts/projects/project-configuration#cleanurls).



## Route Rewrites
