


- prefetch page chunks for links within viewport. possbily be the next navigation

- preload `<link rel="preload" href="welocome.mp4" as="track"/>` in the current navigation,not inside the viewport, will be seen soon`font,fetch,image,script,style,track`

## install requirement

## setup wizard/intergrated side project

## file structure


### the project root 

the docs directory is consider as the project root for the vitePress site.

reserved location for  VitePress' config file, dev server cache, build output, and optional theme customization code.
```tree
- docs # porject root
    - .vitepress # config dir
        - config.js
        - dist/
        - cache/
    - src # source dir
    - 
```

## up and running

## deployment


## config 






```typescript
function nav():D
```




the `srcDir` option is resovled reltive to project root

link between pages(files)
linking to assets


### site config

### frontmatter config

forntmatter enable page based configuration.can be used to override side-level or theme-level config.

You can access frontmatter data via the $frontmatter global in Vue expressions:







<script setup>
    import {useData} from 'vitepress'
    const {theme,page, frontmatter} = useData()
</script>

<pre> {{theme}}</pre>


### Page Data
<pre>{{ page }}</pre>

### Page Frontmatter
<pre>{{ frontmatter }}</pre>
