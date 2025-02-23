

# commit

store change on previous commit



every commit is just save state/snapshot of your repo is retrievable

## commit tree: type and association
head(the commit your currently on)
except for a repo's root(first) commit, all commits have a parent commit






## commit

each commit id is associated with:
- parent commit(s)
- root tree
- type: commit
- metadata: commit time, commit message, committer, author





### conventional commit message

summary of the proposed changes 
(#1812) (#1898) fix bug ref

```md
# [type](scope): (If applied, this commit will ...)[messages](Use the imperative mood)

# Separate subject from body with a blank line

# Use the body to explain to explain why this change is being made
```








### Signing commits

code blame requires a sign-off message

```bash
$ git config gpg.format ssh
$ git config user.signingkey ~/.ssh/id_github.pub
$ git commit --signoff --message 'commit message'
$ git commit --gpg-sign --message 'commit message'
$ git cat-file -p HEAD

```

```
git commit -s -m "commit message"
```
to amend a sign-off
If you have authored a commit that is missing the signed-off-by line, you can amend your commits and push them to GitHub


```
git commit --amend --signoff
```

If you've pushed your changes to GitHub already you'll need to force push your branch after this with git push -f.


### choose the email address that will be associated with the commits you push 

security notification
password reset


To ensure that commits are attributed to you and appear in your contributions graph, use an email address that is connected to your account on GitHub, 

- Set an email address associated with commits
- Confirm that you have set the email address 

noreply email address

### change commit message


**amend most recent commit message**
- on the cli, navigate to the repo that contains the commit you want to amend
- type git `commit --amend` and press Enter in cli

If you have already pushed the commit to remote. you will have to force push the amended commit

```bash
git push --force-with-lease origin <branch>
```

**amend older or multiple commit message**

- display list of last `n` commits in your branch
```bash
# Use the `git rebase -i HEAD~n` command 
$ git rebase -i HEAD~3
# use --force command to force push over the old commit
git push --force origin <branch>
```



### Creating co-authored commits on cli

ensure there are two newlines between the end of your commit description and the on-behalf-of: commit trailer.

If you're adding multiple co-authors, give each co-author their own line and `Co-authored-by:`commit trailer. Do not add blank lines between each co-author line.

```bash
$ git commit -m "Refactor usability tests.
>
>
Co-authored-by: NAME <NAME@EXAMPLE.COM>
Co-authored-by: ANOTHER-NAME <ANOTHER-NAME@EXAMPLE.COM>"
```



### Creating a commit on behalf of an organization

ensure there are two  newlines between the end of your commit description and the on-behalf-of: commit trailer.
On the next line of the commit message, type `on-behalf-of: @org <name@organization.com>`, then a closing quotation mark.