## why module

Modules are executed within their own scope, not in the  shared global scope. 
var, func, class, etc. declared in a module are not visible outside the module 
unless they are explictly exported


bundle multi files into one file or use multi tags in HTML to load those file in correct order

## how esmodules are defined

js spec dclares that any js file
a file without any top-level import or export declarations is treated as a scrip and not a module.

 import './mod', if it implemented the same logic as node, we’d have to download: mod.js, mod.cjs, mod.mjs, mod/index.js, 

## Type-Only imports and Exports

transiple pipleline


## module specifier 

 bare specifiers (module specifiers that don’t begin with `./`, `../`, or `/`) 
like `mod/submod` isn't relative or abosoulte or have a file extension. 
you have to setup import map


## module  Resolution 

[--moduleResolution bundler (formerly known as hybrid](https://github.com/microsoft/TypeScript/pull/51669)

treats bare module specifiers, looks up in node_modules subdirectories
node_modules/@types
package.json "imports" field lookups 


## on-demand import



## module output format





`module: "esnext"`  feature support like `import.meta` and `export * as ns from 'mod'` and top-level `await` are available


### Module format detection
 

`.mjs` and `.cjs` files are always interpreted as ES modules and CJS modules, respectively.

`.js` files are interpreted as ES modules if the nearest `package.json` file contains a type field with the value `"module"`. If there is no package.json file, or if the type field is missing or has any other value, .js files are interpreted as CJS modules.

## esm and cjs interop

Can an ES module import a CommonJS module? If so, does a default import link to exports or exports.default? 
Can a CommonJS module require an ES module? 

`import * as process from 'node:process'` act the same as `const process = require('moment')`

`import process from 'node:process'` act the same as `const process = require('moment').default`