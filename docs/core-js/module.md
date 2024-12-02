## IIFE



Prevents Global Pollution: No variables leak into the global namespace

```ts
(function(config){
    globalThis.__VITEPRESS__=!0
})({
    debug
})

```