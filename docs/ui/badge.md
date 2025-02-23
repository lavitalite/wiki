## Badge


<v-chip
  prepend-icon="clock"
  append-icon="trophy"
  variant="outlined"
  closeable
>
  Chip
</v-chip>

Small and adaptive tag for adding context to just about any content.

also known asChip



## Usage


Badges can be used as part of links or buttons to provide a counter (or similar flag).



To change the color of Badge, refer to the [Variants](#variants) section, 

and to change the size of Badge, refer to the [Sizing](#sizing) section.

## Label

## Closeable


Closable chips can be controlled with a v-model. You can also listen to the click:close event if you want to know when a chip has been closed.

```vue
<template>
  <div class="text-center">
    <v-chip
      v-if="chip"
      class="ma-2"
      closable
      @click:close="chip = false"
    >
      Closable
    </v-chip>
  </div>
</template>
```



## Variant amd Color

badge components provide a `variant` prop to change the appearance of badge


you can also apply one of contextual text variants color using `color` prop



If no variant is specified default will be used.
- flat Removes chip s hadow
- elevated Elevates the chip with a shadow
- tonal(default) Background color is a lowered opacity of the current text color
- outline - Applies a thin border with the current text color
- text - Removes the background and removes shadow


## Sizing and Density





Badge scale to match to the size of the direct parent element by using relative font sizing and `em` units





```html
<template>
  <div class="d-flex justify-center align-center ga-2">
    <v-label style="width: 100px">default</v-label>

    <v-chip size="x-small">
      x-small
    </v-chip>

    <v-chip size="small">
      small
    </v-chip>

    <v-chip>
      default
    </v-chip>

    <v-chip size="large">
      large
    </v-chip>

    <v-chip size="x-large">
      x-large
    </v-chip>
  </div>
  <div class="d-flex justify-center align-center ga-2 mt-2">
    <v-label style="width: 100px">comfortable</v-label>

    <v-chip density="comfortable" size="x-small">
      x-small
    </v-chip>

    <v-chip density="comfortable" size="small">
      small
    </v-chip>

    <v-chip density="comfortable">
      default
    </v-chip>

    <v-chip density="comfortable" size="large">
      large
    </v-chip>

    <v-chip density="comfortable" size="x-large">
      x-large
    </v-chip>
  </div>
  <div class="d-flex justify-center align-center ga-2 mt-2">
    <v-label style="width: 100px">compact</v-label>

    <v-chip density="compact" size="x-small">
      x-small
    </v-chip>

    <v-chip density="compact" size="small">
      small
    </v-chip>

    <v-chip density="compact">
      default
    </v-chip>

    <v-chip density="compact" size="large">
      large
    </v-chip>

    <v-chip density="compact" size="x-large">
      x-large
    </v-chip>
  </div>
</template>
```


```vue
<div>
  <h2>Example heading <v-badge>New</v-badge></h2>
  <h3>Example heading <v-badge>New</v-badge></h3>
  <h4>Example heading <v-badge>New</v-badge></h4>
  <h5>Example heading <v-badge>New</v-badge></h5>
  <h6>Example heading <v-badge>New</v-badge></h6>
</div>
```


## Pill badges

Use the `pill` prop to make badges more rounded



## Using in components


### In Select


## Component reference


### `<v-badge>`


- `<v-badge>` Properties
- `<v-badge>` Slots

#### Property

#### Slot

### Import as Component


| Component   | Named Export | Import Path    |
|-------------|--------------|----------------|
| `<v-badge>` | `VBadge`     | `@vitalite/ui` |


```vue
import { VBadge } from '@vitalite/ui'
Vue.component('v-badge', VBadge)

```


### Import as Plugin

This plugin includes all of the above listed individual components. Plugins also include any component aliases.


| Named Export | Import Path      |
|--------------|------------------|
| `IconPlugin` | `@lavitalite/ui` |


```vue
import { BadgePlugin } from '@vitalite/ui'
Vue.use(BadgePlugin)
```