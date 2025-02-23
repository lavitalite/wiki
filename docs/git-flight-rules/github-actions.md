task runner


schedule
```yml
# run every day
on: 
  workflow_dispatch:
  schedule:
    - cron: "0 0 * * *"
```
```bash
  issues:
    types: [labeled]

on:
  push:
    tags:
      - "v*" # Push events to matching v*, i.e. v1.0, v20.15.10
      - "plugin-*" # Push events to matching plugin-*, i.e. plugin-(vue|vue-jsx|react|legacy)@1.0.0
      - "create-vite*" # # Push events to matching create-vite*, i.e. create-vite@1.0

on:
  push:
    branches: ["main"]
  pull_request:
    branches: ["main"]
    types: ["opened", "synchronize", "reopened", "ready_for_review", "review_requested"]
```



variables

workflow scope level
```yml
env:
  - user-name: lavitalite

jobs:
  steps:
    - name: test
      run: echo "$user-name"
```

job level
step level

`steps.<step_id>.outputs`
`jobs.<job_id>.name`

inputs.

env.