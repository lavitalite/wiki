# Vitepress flavored markdown

## EMOJI


```md
:tada:
:100:
```
## container

- custom title

```
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```


## code block

  
### line highlight

- Line ranges:  `{5-8}`, `{3-10}`, `{10-17}`
- Multiple single lines:  `{4,7,9}`
- Line ranges and single lines:  `{4,7-13,16,23-27,40}`

### code diffs

Adding the // [!code --] or // [!code ++] comments on a line will create a diff of that line

### Error and warning

Adding the `// [!code warning ]` or `// [!code error]` comments on a line will color it accordingly

### line numbers

add `:line-numbers` / `:no-line-numbers` mark in your fenced code blocks to override the the value set in config

customize the starting line number by adding = after :line-numbers.

### code snippet injection

import code snippets from existing files



::: tip
The value of `@` corresponds to the source root. By default it's the VitePress project root, unless `srcDir` is configured. Alternatively, you can also import from relative paths:

```md
<<< ../snippets/snippet.js
```

:::


### code groups

group multiple code blocks


### code block title

for fenced code block, provide a custom title in `[]`

on code injection, filename is used as title by default, we could provide a custom name in `[]`

**Input**

````
::: code-group
<!-- filename is used as -->

```js:line-numbers=2 {1,3-} [fenced-block-name]
export default {
  data () {
    return {
        msg: 'Highlighted!',
        msg: "focus", // [!code focus]
        msg: "deleted", // [!code --]
        msg: "added" // [!code ++]
        msg: "error" // [!code error]
        msg: "warning" // [!code warning]
    }
  }
}

```

<<< @/snippets/-clone.ts{1-2 ts:line-numbers} [injected block name]
:::
````

**Output**

::: code-group

```js:line-numbers=2 {1, 3-5} [fenced-block-name]
export default {
  data () {
    return {
        msg: 'Highlighted!',
        msg: "focus", // [!code focus]
        msg: "deleted", // [!code --]
        msg: "added" // [!code ++]
        msg: "error" // [!code error]
        msg: "warning" // [!code warning]
    }
  }
}

```

<<< @/snippets/math-utils.ts{1,2 ts:line-numbers} [injected block name]

:::


### markdown injection


include a markdown file in another markdown file

#### selecte line range

The format of the selected line range can be: `{3,}`,`{,10}`, `{1,10}`

::: tip
TIP
You can also prefix the markdown path with @, it will act as the source root. By default, it's the VitePress project root, unless srcDir is configured.
:::



** input **
```md
<!-- @include: ./routing.md{,3} -->
```


## Math Equations

This is currently opt-in. To enable it, you need to install `markdown-it-mathjax3` and set `markdown.math` to `true` in your config file:

```sh
npm add -D markdown-it-mathjax3
```

```ts
// .vitepress/config.ts
export default {
  markdown: {
    math: true
  }
}
```

**Input**

```md
When $a \ne 0$, there are two solutions to $(ax^2 + bx + c = 0)$ and they are
$$ x = {-b \pm \sqrt{b^2-4ac} \over 2a} $$
```

When $a \ne 0$, there are two solutions to $(ax^2 + bx + c = 0)$ and they are
$$ x = {-b \pm \sqrt{b^2-4ac} \over 2a} $$



## frontmatter

### support format

json or yaml

### accesing frontmatter

```md

---
tile: docs
---
# {{ $frontmatter.title}}
```

access current page frontmatter in `<script setup` with the `useData()` helper

```html
<script setup> 
import {useData} from 'vitepress'
const pageData = useData()
</script>

<pre> {{pageData}} </pre>
```

<script setup> 
import {useData} from 'vitepress'
const {page:pageData} = useData()
</script>


<pre> {{pageData}} </pre>

## using Vue in markdown


The HTML wrapped by `code` will display as it is; only the HTML that is not wrapped will be parsed by Vue.

### unescape in code block

enable vue-style interpolation inside code block, append the language iwth `vue` suffix at code block fence

```js-vue

```


### vscode language support
