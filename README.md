## Command Shortcuts

```sh
export run="python manage.py runserver --settings=game_on.settings.dev"
export static="python manage.py collectstatic --settings=game_on.settings.dev"
export test="python manage.py test --settings=game_on.settings.dev"

python manage.py makemigrations games --settings=game_on.settings.dev
python manage.py migrate --settings=game_on.settings.dev
```

- push master to staging
  - `git push gameon-staging master`

## Deployment Checklist

- Run the `grunt build` task
- Test dev branch on staging
  - `git push heroku-staging dev:master`
- Merge dev/working branch to master
- Upload to prod
  - `git push heroku-prod master`

## Various

- add `--app APP` to the end of a command to specify which app
  - `heroku run python manage.py migrate --app gameon-staging`

## Tools

- [datepicker](https://github.com/eternicode/bootstrap-datepicker)
