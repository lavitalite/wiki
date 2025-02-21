##  Parameter Expansion

`$#`: num of position arguments
`$0`: command 
`$1,$2,$3`: arguments
`$?`: recent command exit status
`$*`:whole positional parameter delimited by IFS (Internal Field Separator)
`$@`:  expands into a list of separate parameters

`[[-f ]], [[ -d ]], `:test command, file exist




test condition: `-eq`, `-ge`, `-le`, `-lt`, `-ne`


## command substitution 

Command substitution allows the output of a command to replace the command name.  There are two forms:

$(command)