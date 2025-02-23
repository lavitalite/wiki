


## compare changes

- git diff
- git patch

### compare diff

compare file 
compare snapshot of repo
`man git-diff` for more ref

```bash
# compare change between working tree to index (staging area for the next commit).
$ git diff 
# compare latest two commit
$ git diff head head^
$ git diff HEAD:Makefile HEAD^1:Makefile
# compare index to latest commit, or synonym --staged flag, it defaults to head you you do not provide
$ git diff --cached [<commit>]
$ git diff-index
$ git diff-tree
```


### diff tool config setup

```bash [$HOME/.gitconfig]
[core]
  pager = delta

[interactive]
  diffFilter = delta --color-only
[delta]
  navigate --true
  dark=true
[merge]
  conflictstyle = zdiff3
```

### Search & Find

- by date `--before / --after`
- by message `--grep`
- by author `--author`
- by file `-- <filename>`
- by branch `<base_branch>..<compare_branch>`
- By amount
- or combine


```bash
$ git log --after="2024-1-1" --before="2025-1-1" 
$ git log --grep="feat: "
$ git log --author="ransom"
$ git log -- README.md

```



**By author:**
It groups each commit by author and displays the first line of each commit message. 
```bash
$git shortlog
```

**Custom formatting:**
[log format refs](https://www.kernel.org/pub/software/scm/git/docs/git-log.html#_pretty_formats)
```bash
$git log --pretty=format:"%cn committed %h on %cd"
```
**By branch:**
The `main..feature` range contains all of the commits that are in the feature branch, but aren’t in the main branch.
```bash
$ git log origin/main..HEAD
$ git log main..feature
```

## Inspecting changes

- git log
- git show


### list commit


- An abbreviated object ID.
- The subject line of the commit message
- The commit date in short form
- display all the refs(e.g. branch, tag, HEAD) `--decorate` enabled by default



### diffs

- to see actual change introduced by each commit
  
```bash
$ git log -p 
```
- to see the brief summary introduced by each commit
```bash
$ git log --stat
#number of insertions and deletions to each file altered
67 insertion(+), 38 deletions(-)
```
  

```bash
$ alias gitlog=git log --graph --oneline --all

# show default branch if not specified
$ git log <remote-or-local-branch>
# start/stop log at another ref
$ git log <ref> 
# show commits that touch this file
$ git log <path/to/file> 
# combine the above both 
$ git log <ref> -- <path/to/file> 
$ git log --stat
```
