ssh-keygen -t ed25519 -b 4096 -f $HOME/.ssh/id_github -C xiyuan@hack.xiyuan@gmail.com


ls -la $HOME/.ssh  

rm $HOME/.ssh/id_github 

rm$HOME/.ssh/id_github.pub


Host github.com
    HostName github.com
    User xiyuan
    IdentityFile ~/.ssh/id_github
    IdentitiesOnly yes	
