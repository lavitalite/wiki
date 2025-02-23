## .gitignore glob pattern

`**` match all file and zero or more directories

`*`	Matches any char except path separators (/)
`[]`	Matches any  in set
`[!]`	Matches any  not in set
 
`{s1,s2,s3}`	Matches any one of 
`{num1..num2}`	match in between

### A leading `**`

`**/*.png` All .png files in all directories
`**/*.{png,ico,md}` All .png, .ico or .md files in all directories
`**/*` All files inside all directory
### a trailing `**`
equivalent to `/**/*`

### between `**`

`/src/**/*.ts` All .ts files inside src directory (and all its subdirectories)
`/src/!(*.module).ts` All `.ts` files but not `.module.ts`
