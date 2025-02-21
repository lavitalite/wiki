# Setup

```bash
$ git clone --bare

$ git clone --template
```


## Checking existing client config

```bash
$ git config --list --local
```

::: base dir
base dir relative to which files/where these files should be located/looked for
[xdg base directory spec](https://specifications.freedesktop.org/basedir-spec/latest/)
`DATA_HOME`
`CONFIG_HOME`
`CACHE_HOME`
`RUNTIME_HOME`
:::
#### config file location
- `/etc/gitconfig` system-wide config file
- `$HOME/.gitconfig` user-specific config file
- `$GIT_DIR/config`  repo-specific config 

```bash
$ git config --list --show-origin --show-scope
global  file:/Users/ayao/.gitconfig color.diff.whitespace=red reverse
local   file:.git/config    core.repositoryformatversion=0
```

#### config file scopes
- system
- global
- local
- worktree
- command
  Pass a configuration parameter to the git command `git -c <name>=<value>`



## essential config


`core.editor`

git pick up your default editor from one of the shell env variables `VISUAL` or `EDITOR`
or else fall back to `vi` editor to create and edit commit and tag messages.
To change the default to something else, you can use the `core.editor` setting:
```bash
git config --global core.editor nvim
```

`commit.template`

keep the subject line short(for the sake of git log --oneline output)

to add further detail under that, and to refer to an issue or bug tracker ticket number if one exists.

```bash
[type](scope): (If applied, this commit will ...)[summary](Use the imperative mood)    

Separate subject from body with a blank line  
Use the body to explain to explain why this change is being made  
```
To tell git to use it as default message that appears in your editor when you run `git commit`
set the `commit.template` configuration value:
```bash
$ git config --global commit.template ~/.gitmessage.txt
$ git commit
```

If you team has a commit-message policy, then putting a template for that policy on your system and configuring git to use it by default


`help.autocorrect`:

If you mistype a command, it shows you something like this:
```bash
$ git chekcout master
git: 'chekcout' is not a git command. See 'git --help'.

The most similar command is
    checkout
```
git will try to figure out what you try to do, but it stills refuses to do it.


### formatting and whitespace
`core.autocrlf`

windows use both carriage return character and line feed character for newlines in files,
>Carriage Return (ASCII 13, \r ) Line Feed (ASCII 10, \n )

whereas mac nad linux system use only the line feed character

This is subtle but annoying fact of cross-platform work.


you tell Git to replace existing LF-style line endings with CRLF on commit or when you add a file into index.
```bash
# set to `true` to turn on this functionality
$ git config --global core.autocrlf true
# set to `input`,keeps LF line endings as-is
$ git config --global core.autocrlf input
# set to false if prefers not perform any line-ending conversions
$ git config --global core.autocrlf false
```




**`core.whitespace`**

git come presets to detect and fix whitespace issues

it can look for six primary whitespace issues - three are enabled by default and can be turn off,
and three are disabled by default can be activated

The three are turned on by default are:

`blank-at-eol`: which look for spaces at the end of line

`blank-at-eof`: which notices blank lines at the end of a file

`space-before-tab`: which look for space before tab at the beginning of a line
>Space:  visible representation` ` : ascii value are 32 `0x20` in hex
>
>Tab:  visible representation`\t`: ascii value are `0x09` in hex







THe three are disabled by default are:

`indent-with-non-tab`: which look for lines that begin with a space instead of tabs

you can tell git which of these you want enable by setting `core.whitespace` to the value you want on, separated by commas
you can disable an option by prepending `-` in front of its name.

```bash
git config --global core.whitespace \
  trailing-space,-space-before-tab,blank-at-eol,cr-at-eol,indent-with-non-tab
```
git will try to detect these issues when you run `git diff` command and try to color them so you can possibly fix them before you commit










