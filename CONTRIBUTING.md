# Contributing Guide


##  Pull Request Guidelines

Checkout a topic branch from a base branch (e.g. main), and merge back against that branch.

- If adding a new feature:
  - Add accompanying test case. 
  - Provide a convincing reason to add this feature. Ideally, you should open a suggestion issue first, and have it approved before working on it.
- If fixing a bug:
  - If you are resolving a special issue, add (`fix #xxxx[,#xxxx]`)  in your PR title for a better release log (e.g. `fix: update entities encoding/decoding (fix #3899)`).
  - Provide a detailed description of the bug in the PR. Live demo preferred.
  - Add appropriate test coverage if applicable.


`main` branch: the document site is deployed from the this branch
`next` branch: experiment features
`vprefix` branch: archiving old version of site
`rc` in active developing branch

## Release 

There are two phases for the release step: "Release" and "Publish".

- "Release" is done locally to generate the changelogs and git tags:

Run `pnpm release` and follow the prompts to choose a release for a package. It will generate the changelog, a git release tag, and push them to `origin`. You can run with the --dry flag to test it out.



- "Publish" is done on GitHub Actions to publish the package to npm:




## Repo Setup


1. run `pnpm i` in repo root dir


containerized Docker setup for Vite.js development.


## Documentation


## Debugging
To use breakpoints and explore code execution, you can use the "Run and Debug" feature from VS Code.

1. Add a debugger statement where you want to stop the code execution.

2. Click the "Run and Debug" icon in the activity bar of the editor, which opens the Run and Debug view.

3. Click the "JavaScript Debug Terminal" button in the Run and Debug view, which opens a terminal in VS Code.

4. From that terminal, go to playground/xxx, and run `pnpm run dev`.

The execution will stop at the debugger statement, and you can use the Debug toolbar to continue, step over, and restart the process...


## Test against external packages

You may wish to test your locally modified copy of Vite against another package that is built with yours. For pnpm, after building the package, you can use `pnpm.overrides` to do this.

 Note that pnpm.overrides must be specified in the root package.json, and you must list the package as a dependency in the root package.json:


```json


{
  "dependencies": {
    "vite": "^6.0.0"
  },
  "pnpm": {
    "overrides": {
      "vite": "link:../path/to/packages/bump"
    }
  }
}
```

And re-run `pnpm install` to link the package.

## Running Tests


Each package under `playground/ `contains a`__tests__` directory.



## Debug logging

You can set the `--debug` option to turn on debugging logs (e.g.`vite --debug resolve`). 

visit [vite repo](https://github.com/search?q=repo%3Avitejs%2Fvite+%22createDebugger%28%27vite%3A%22+path%3Apackages%2Fvite%2Fsrc%2F&type=code) to see a available debug scopes
