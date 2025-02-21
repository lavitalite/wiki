gitlab merge request


## branch policy

lock branch

branch is read-only, users cannot push to the branch

## code review

require review from code owner


## pull policy

require a pull request before merge
require approvals
require linear history
require conversation resolution before merge


## build validation
require deployments to succeed before merging



## full PR testing and merge workflow 
Before You Submit a Pull Request
Run Local Verifications
The Pull Request Submit Process
Marking Unfinished Pull Requests
Pull Requests and the Release Cycle
Comment Commands Reference
Automation
How the e2e Tests Work
Why was my pull request closed?
Why is my pull request not getting reviewed?
Best Practices for Faster Reviews
Familiarize yourself with project conventions
Is the feature wanted? File a Kubernetes Enhancement Proposal
Smaller Is Better: Small Commits, Small Pull Requests
Open a Different Pull Request for Fixes and Generic Features
Don’t Open Pull Requests That Span the Whole Repository
Comments Matter
Test
Squashing
Commit Message Guidelines
KISS, YAGNI, MVP, etc.
It’s OK to Push Back
Common Sense and Courtesy
Trivial Edits
The Testing and Merge Workflow
More About Ok-To-Test
The Code Review 


### collaborative development models


- fork and pull model 
- shared repository model.
use a topic branch for your pull request

with a topic branch you can push follow-up commits if you need to update your proposed changes.





azure repo

gitlab
Github 联合创始人 Scott Chacon 



Fork and pull model


https://skills.github.com/

https://opensource.guide/


Shared repository model 

 initiate code review and general discussion about a set of changes before the changes are merged into the main development branch



## code owners
 require that pull requests have to be
 
 code owners are received/notified to review request
  reviewed and approved by code owners before they can be merged.


organization membership, 
 team membership.



## .gitignore glob pattern

`**` match all file and zero or more directories
 
### A leading `**`

`**/*.png` All .png files in all directories
`**/*.{png,ico,md}` All .png, .ico or .md files in all directories
`**/*` All files inside all directory
### a trailing `**`
equivalent to `/**/*`

### between `**`

`/src/**/*.ts` All .ts files inside src directory (and all its subdirectories)
`/src/!(*.module).ts` All `.ts` files but not `.module.ts`

