`index.all` module is package entry point for esmodule user.In other words, it is the module we are interfacing with when we import from whole package instead of from a submodule

```js
import {map} from 'underscore' 
```

The difference with ./index-default, which is the package entry point for CommonJS, AMD and UMD users, is purely technical. In ES modules, named and default exports are considered to be siblings, so when you have a default export, its properties are not automatically available as named exports. For this reason, we re-export the named exports in addition to providing the same default export as in ./index-defaul