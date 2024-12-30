> responsive video or slideshow embed based of the width of the parent by creating an intrinsic ratio that scales on device

## Altert styles(type)

`color`, `outlined`, `border`



### color style

support: `warning`, `success`, `error`, `info`, hex,rgb color

### border 

border-postion: `top`,`left`,`right`,`bottom`


## dense


- title
- icon
- description
- close



## center
## Embed types

supported embedtypes are `iframe`(default),`vidoe`, `embed` and `object`

which translate to native `iframe`, `vidoe`, `embed` and `object` elements

set the type of embed you would like via `type` prop

##  Aspect ratios

Aspect ratio can be set via the `aspect` prop. 

Supported aspect ratios are: `21by9`(21:9), `16by9`(16:9), `4by3`(4:3) and `1by`(1:1). The default aspect is `16by9`. 

Aspect ratios are defined in Bottstrap' Scss and translate to the classname
`embed-responsive-${aspect}`(i.e.`embed-responsive-16by9`,`embed-responsive-4by3`)

## wrapper element

The Responsive embed is wrapped in an outer element(default is `div`) to enforce the responsive aspect ratio.

You can change this tag via the `tag` prop


## Attribute and child elements

Any additional attrubtes provided to `b-embed`(other than the above `type`,`aspect`, `embed` or `object`) are applied to the inner embeded element(i.e the `iframe`,`video`,`embed` or `object`)

**Example: Responsive embedding of the an HTML5 <video>**
```html
<b-embed type="video" asepct="4by3" controls poster="poster.png">
  <source src="stories.webm" type="video/webm">
  <source src="stories.mp4" type="video/mp4">
</b-embed> 
```





## Component Reference

tag: functional component

- <b-embed> Props
- <b-embed> slots

### Props


| Props  | Type   | Defualt  | Desc                                                                                                             |
| ------ | ------ | -------- | ---------------------------------------------------------------------------------------------------------------- |
| asepct | String | '16by9'  | aspect ratio of embed. supports value are '16by9', '21by9', '4by3' and '1by1', and are translate to css classes. |
| tag    | String | 'div'    | the html tag  wrapper render                                                                                     |
| type   | String | 'iframe' | type of embeded. possible values are 'iframe', 'video', 'embed' or 'object'                                      |



### Slots

| Name    | Desc                          |
| ------- | ----------------------------- |
| defualt | content to place in the embed |



### Import as component

| Import Alias | Name Export | Import Path |
| ------------ | ----------- | ----------- |
| <b-embed>    | BEmbed      | b-vue       |

**Example:**

```vue
import {BEmbed} from 'b-vue'
Vue.component('b-embed', BEembed)

```

`tse`

## Import as plugin

| Name Export | Import Path |
| ----------- | ----------- |
| EmbedPlugin | b-vue       |


**Example:**

```vue
import {EmbedPlugin} from 'b-vue'
Vue.use(EmbedPlugin)
```

