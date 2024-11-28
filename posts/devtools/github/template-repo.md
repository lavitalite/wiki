## create a template repo


```sh
gh repo admin-template-repo \
    --private \
    --clone \
    --gitignore Python \
    --disable-wiki \
    --license MIT
```


```sh
gh repo edit <username>/<reponame> --template

```


## create a repo from template


```sh

gh repo create new-repo \
    --public \
    --clone \
    --template template-repo
```