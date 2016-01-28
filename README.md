```
export run="python manage.py runserver"
export static="python manage.py collectstatic"
export test="clear && python manage.py test"

export run="python manage.py runserver --settings=game_on.settings.dev"
export static="python manage.py collectstatic --settings=game_on.settings.dev"
export test="claer && python manage.py test --settings=game_on.settings.dev"
```

## Deploying to Heroku

```sh
$ heroku create
$ git push heroku master
$ heroku run python manage.py migrate
$ heroku open
```
