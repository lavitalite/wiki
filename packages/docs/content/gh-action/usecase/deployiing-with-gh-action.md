## Triggering your deployment

```yaml
on:
  push:
    branches: 
      - main
  pull_requests:
    branches:
      - main:
  - name: Setup Kustomize
    run: |- 
    curl -sfLo  kustomize https://github.com/kubernetes-sigs/kustomize/releases/download/v3.1.0/kustomize_3.1.0_linux_amd64
    chmod u+x ./kustomize
    

```


from a cloud provider that supports OpenID Connect (OIDC)



