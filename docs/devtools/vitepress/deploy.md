

## Setting a served root Path

vitepress assume the site is going to be deployed at the root path of a domain. 

To serve site at sub-domain,root-path
To serve site at sub-path, you need to set the base option to '/blog/' in the vitepress config file




vercel config file `vercel.json` should be place at the root of your repository.
```json
{
    "headers": [
        {
            "source": "/assets/(.*)",
            "headers": [
                {
                    "key": "Cache-Control",
                    "value": "max-age=31536000, immutable"
                }
            ] 
        }
    ]
}
```

## Deploy Platform Guide

### Netlify/Vercel/GihHub Page/Cloudfare Page/AWS Amplify/ Render


### GitHub Page

create a file named `deploy.yml` inside `.github/workflows` directory of your project


```yml
name: 
```



::: info slugfiy
It's an informal name given to a story during the production process. As the story winds its path from the beat reporter (assuming these even exist any more?) through to editor through to the "printing presses", this is the name it is referenced by, e.g., "Have you fixed those errors in the 'kate-and-william' story?".
:::