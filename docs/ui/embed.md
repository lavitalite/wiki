# Embed

> Create responsive video or slideshow embeds based on the width of the parent by creating an intrinsic ratio that scales on any device.




## Props


| Prop   | Type   | Default | Description |   |
|--------|--------|---------|-------------|---|
| aspect | String | '16by9' |             |   |
| tag    | String | 'div    |             |   |
| type | String | 'iframe' | 


### Embed types

Supported embed types are iframe (default), video, embed and object, which translate to the standard HTML `<iframe>`, `<video>`, `<embed>` and `<object>` elements.


## Aspect ratios

Aspect ratios can be set via the aspect prop. Supported aspect ratios are: 21by9 (21:9), 16by9 (16:9), 4by3 (4:3) and 1by1 (1:1). The default aspect is 16by9. Aspect ratios are defined in Bootstrap's SCSS and translate to the classname embed-responsive-{aspect} (i.e. embed-responsive-16by9, embed-responsive-4by3, etc.).


## Wrapper element
The Responsive embed is wrapped in an outer element (default is div) to enforce the responsive aspect ratio. You can change this tag via the tag prop.

## Attributes


Any additional attributes provided to `<b-embed>` (other than the above type, aspect and tag props) are applied to the inner embedded element (i.e. the iframe, video, embed or object).

## Slots


Any children elements between the opening and closing `<b-embed>` will be placed inside the inner embedded element. Note that the type iframe does not support any children.

| Name    | Desc                          |
|---------|-------------------------------|
| default | content to place in the embed |


## Import as Component


| Import Alias | Named Export | Import Path |
|-----------|--------------| --------------|
| `<b-embed>`          |   `BEmbed` |


**Example**:

```vue
import {BEmbed} from ''
Vue.component('b-embed', BEmbed)
```

## Import as Plugin


| Named Export | Import Path |
|--------------|-------------|
| EmbedPlugin  |             |