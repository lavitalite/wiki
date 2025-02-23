
- what data it stored? 
  stream of snapshot , not delta(
a set of files and the change made to each file over time)
-  How the data is stored ?

object is stored in the `.git/objects` directory




key-value store

content-addressable(retrievable)
we can retrieve the contents of an object by providing a hash of those contents




value: data -- blob
object ID : hash of the content
  sha1: a cryptographic hash function
  return: 40 digit hex 
  give the same content, generate the same key

1. where does git store this data?
   
.git directory


blob store 
data lake
data log
backup file
media store






## ref
> named pointers to object id. exists in `.git/refs` dir





## object type
- commit
- tree
- blob

### commit object
a snapshot of the worktree at a point in time
it contains:
- parent commit(s)
- root tree
- type: commit
- metadata: commit time, commit message, committer, author

### tree object

### blob object

blob store file contents


### hop through lookup the object database 

![alt](./_illustartion/hop-through-db.png)





#### about `git cat-file` command

will do the object lookup 


#### about `git add` command

git add command hashes new changes in the worktree 

and then create the list of blob objects to stage area known as the git index

#### about `git commit` command

`git commit` command takes those staged changes and creates trees object(entry)  points to all of the new blobs, then create a  commit object points to the new tree. and finally update the current branch points to the new commit




## Object storage

### loose objects

looking into the `.git/objects` directory.
we might see directories with two-dight name
. The directory then contain file with long hex name. The files are called the `loose objects`


### compress object


`.git/objects/pack`