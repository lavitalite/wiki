# Icon components



## Usage

Icons inherit the current font color and font size from their parent container element. 

To change the color of the icon, refer to the [Variants](#variants) section, 

and to change the size of the icon refer to the [Sizing](#sizing) section.



##  variants

By default, the icon will inherit the current text color of their parent element.

icon components provide a `variant` prop to apply one of contextual text variants color

you can also use custom CSS to set the icon color


<VIcon icon="directory-line" animation="throb" class="custom-class" style="color: #7952b3;"></VIcon>

```vue [vue]
<template>
  <div class="h2 mb-0">
    <v-icon icon="author"  style="color: #7952b3"></v-icon>
  </div>
</template>

```
the `variant` prop places the [color utility class](/ui/color-variants) `text-${variant}` on the icon's root element


## Sizing


Icons have a default width and height of `1em`, which means they will scale with the size of current font size

```vue [vue]
<template>
   <div>
    <p class="h1 mb-2">Icon <b-icon icon="exclamation-circle-fill"></b-icon></p>
    <p class="h2 mb-2">Icon <b-icon icon="exclamation-circle-fill"></b-icon></p>
    <p class="h3 mb-2">Icon <b-icon icon="exclamation-circle-fill"></b-icon></p>
    <p class="h4 mb-2">Icon <b-icon icon="exclamation-circle-fill"></b-icon></p>
    <p class="h5 mb-2">Icon <b-icon icon="exclamation-circle-fill"></b-icon></p>
  </div>
</template>
```

you can also use the custom CSS to set the icon size, either via direct `style` attribute, or via classes

```vue [vue]
<template>
  <div>
    <b-icon icon="exclamation-circle" style="width: 120px; height: 120px;"></b-icon>
  </div>
</template>
```


You can also use the prop `font-scale` to scale the icon's current font size by the specified factor:


```vue [vue]
<template>
  <div>
    <b-icon icon="camera" font-scale="0.5"></b-icon>
    <b-icon icon="camera" font-scale="1"></b-icon>
    <b-icon icon="camera" font-scale="2"></b-icon>
    <b-icon icon="camera" font-scale="3"></b-icon>
    <b-icon icon="camera" font-scale="4"></b-icon>
    <b-icon icon="camera" font-scale="5"></b-icon>
    <b-icon icon="camera" font-scale="7.5"></b-icon>
  </div>
</template>
```


## Styling

With the use of border, background and padding utility classes, you can create various styling effects:

```vue [vue]
<template>
  <div style="font-size: 4rem;">
    <b-icon icon="bell-fill" class="border rounded p-2"></b-icon>
    <b-icon icon="bell-fill" class="border border-info rounded p-2" variant="info"></b-icon>
    <b-icon icon="bell-fill" class="rounded-circle bg-danger p-2" variant="light"></b-icon>
    <b-icon icon="unlock-fill" class="rounded bg-primary p-1" variant="light"></b-icon>
  </div>
</template>
```



## SVG transforms


provide several props for applying basic SVG transforms to the `<svg>`.
All transforms can be combined for added effect.
Note that the transforms are applied to the `<svg>` content and not the `<svg>` bounding box.


### Flipping
```vue [vue]

<template>
  <div style="font-size: 4rem;">
    <b-icon icon="bar-chart-fill"></b-icon>
    <b-icon icon="bar-chart-fill" flip-h></b-icon>
    <b-icon icon="bar-chart-fill" flip-v></b-icon>
    <b-icon icon="bar-chart-fill" flip-h flip-v></b-icon>
  </div>
</template>
```


### Rotate

Rotate the icon by specified degrees via `rotate` prop
Positive value will rotate the icon clockwise,
while negative value will rotate the icon counterclockwise


```vue [vue]
<template>
  <div style="font-size: 4rem;">
    <b-icon icon="camera"></b-icon>
    <b-icon icon="camera" rotate="45"></b-icon>
    <b-icon icon="camera" rotate="90"></b-icon>
    <b-icon icon="camera" rotate="180"></b-icon>
    <b-icon icon="camera" rotate="270"></b-icon>
    <b-icon icon="camera" rotate="-45"></b-icon>
  </div>
</template>

```

:::info
Note that any [flipping](#flipping) is applied before the rotation.
:::


### Scale

Scale the icon by any positive factor via `scale` prop.
 Note this changes the icon's visual size but not its physical font size. 


 

### Shifting

Shifting affects icon location without changing or moving the svg container.
To move icons on the horizontal and/or vertical axis, use the `shift-h` and `shift-v` props with any arbitrary numeric value, including decimals.


For `shift-v`, positive value will move the icon upwards,
while negative value will move the icon downwards.


For `shift-h`, positive value will move the icon to the right,
while negative value will move the icon to the left.


Both props accept values that are in units of `1/16em` (relative to the icon's current font size).

:::info 
Shifting is applied after  rotation transforms

As with scaling, backgrounds and borders are not affected
:::



## Animated icons
includes/comes with  the following built-in/preset animations 

- `slide` 
- `slide-v`
- `fade` fade the icon in and out
- `spin` smoothly spin the icon clockwise
- `spin-reverse` smoothly spin the icon clockwise
- `throb` scales the icon in and out

To use the animation, set the `animation` prop to one of the animation above



The animation prop translates to the class name `b-icon-animation-{animationName}`


Need a custom animation?
Just create a custom class defining the animation, and apply that class to the icon component

or create a new animation class in the form of `b-icon-animation-{animationName}` and pass the custom animation name to the animation prop.



## Using in components



### Buttons groups and toolbar


```vue
<template>
  <div>
    <b-button-group>
      <b-button variant="outline-primary">
        <b-icon icon="tools"></b-icon> Settings
      </b-button>
      <b-button variant="outline-primary">
        <b-icon icon="person-fill"></b-icon> Account
      </b-button>
      <b-button variant="outline-primary">
        <b-icon icon="inbox-fill"></b-icon> Messages
      </b-button>
    </b-button-group>
  </div>
</template>

```


```vue
<template>
 <b-button-toolbar>
   <b-button-group class="mr-1">
        <b-button title="Save file">
          <b-icon icon="cloud-upload" aria-hidden="true"></b-icon>
        </b-button>
        <b-button title="Load file">
          <b-icon icon="cloud-download" aria-hidden="true"></b-icon>
        </b-button>
        <b-button title="New document">
          <b-icon icon="file-earmark" aria-hidden="true"></b-icon>
        </b-button>
      </b-button-group>
 <b-button-toolbar>
</template>
```


### Input gorups

```vue
<template>
   <b-input-group size="sm" class="mb-2">
      <b-input-group-prepend is-text>
        <b-icon icon="search"></b-icon>
      </b-input-group-prepend>
      <b-form-input type="search" placeholder="Search terms"></b-form-input>
    </b-input-group>
</template>

```



### Dropdowns

## Component reference


### `<v-icon>`


#### Properties


| Property (Click to sort ascending) | Type (Click to sort ascending) | Default | Description                                                                                                                          |
|------------------------------------|--------------------------------|---------|--------------------------------------------------------------------------------------------------------------------------------------|
| animation  v2.7.0+                 | String                         |         | Animate the icon. Supported built-in animations are 'cylon', 'fade', 'pulse', 'spin' and 'throb'                                     |
| flip-h                             | Boolean                        | false   | Flips the icon horizontally                                                                                                          |
| flip-v                             | Boolean                        | false   | Flips the icon vertically                                                                                                            |
| font-scale                         | Number or String               | 1       | Scale the icons current font size                                                                                                    |
| icon                               | String                         |         | Name of icon to render. The corresponding icon component must be installed                                                           |
| rotate                             | Number or String               | 0       | Rotates the icon by the specified number of degrees. Positive values rotate clockwise, while negative values rotate counterclockwise |
| scale                              | Number or String               | 1       | Scales the icon's SVG, without increasing the font size                                                                              |
| shift-h                            | Number or String               | 0       | Moves the icon horizontally. Positive numbers will shift the icon right, negative left. Value is in 1/16em units                     |
| shift-v                            | Number or String               | 0       | Moves the icon vertically. Positive numbers will shift the icon up, negative down. Value is in 1/16em units                          |
| stacked  v2.3.0+                   | Boolean                        | false   | Set this prop to true when placing inside a BIconstack component                                                                     |
| title  v2.17.0+                    | String                         |         | Text content to place in the title                                                                                                   |
| variant                            | String                         |         | Contextual color variant. By default the icon inherits the current text color                                                        |



#### Importing as components

| Component  | Named Export | Import Path      |
|------------|--------------|------------------|
| `<v-icon>` | `VIcon`      | `@lavitalite/ui` |


```vue
import { VIcon } from '@lavitalite/ui'
Vue.component('v-icon', VIcon)
```


#### Importing as plugin

| Named Export | Import Path      |
|--------------|------------------|
| `IconPlugin` | `@lavitalite/ui` |



```vue
import { IconPlugin } from '@lavitalite/ui'
Vue.use(IconPlugin)
```