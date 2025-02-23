Reusing workflows

## Creating your first workflow


In you repo on Github, create a workflow file called `github-workflow.yml` in the `.github/workflows` dir.

- If `.github/workflow` dir already exists,
- If your repo doesn't have  `.github/workflow` dir yet,

::: info 

For Github to discover any Github actions workflows in your repo. you must save the workflow files in a dir called `.github/workflows`

workflow file anything you want, but must use `yml` or `yaml` as the file extension. yaml is a markup language mostly used for config file
:::

## using workflow templates





ready-to-use workflow templates are classified as following:

- deployment
- integration
- automation
- security
- building and testing projects

build upon this workflows or use as-is

browse the full list of workflow templates in the [actions/starter-workflows](https://github.com/actions/starter-workflows) repository.

[deployment marketplace](https://github.com/marketplace?category=deployment&type=actions)

## using env

## using secret



```yaml
on:
  push: 
    branches: 
      - main
  pull: 
    branches:
      - main

```