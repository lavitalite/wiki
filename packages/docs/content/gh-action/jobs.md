## creating dependent jobs

```yaml

jobs:
  setup:
    runs-on: ubuntu-latest
    steps:
      - run ./setup_server.sh
  build:
    needs: setup
    runs-on: ubuntu-latest
    steps:
      - run ./build_server.sh
  test: 
    needs: build
    runs-on: ubuntu-latest
    steps:
      - run: ./test_server.sh

```


## using a matrix policy


test your code in multiple versions of a language or on multiple operating systems.

```yaml
jobs:
  build: 
    runs-on: ubuntu-latest
    strategy: 
      matrix:
        node: [14, 16]
    steps: 
      - uses: actions/setup-node@v4
        with:
          node-version:  ${{ matrix.node }}
```