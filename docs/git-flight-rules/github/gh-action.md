```
  build:
    runs-on: ubuntu-latest
    if: ${{ github.actor != 'github-actions[bot]' && github.event_name != 'push' || github.event.pusher.name != "github-actions[bot]"}} 
  - name: Skip if commit
    if: contains(env.COMMIT_MESSAGE, '[skip ci]')
    run:  |
      echo "Automated commit detected - skipping job"
      exit 0

```

```sh
git log -1 --pretty=format:'%s'
git log --pretty=format:"%h - %s" 
```