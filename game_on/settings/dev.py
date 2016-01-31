import datetime
import os

import dj_database_url

from .base import *

DEBUG = True
BUILD = 'dev'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'gameon_local',
        'USER': '',
        'PASSWORD': '',
        'HOST': 'localhost',
        'PORT': '5432',
        'CONN_MAX_AGE': 500
    }
}

# for dev builds, read the secret key from file
with open('etc/secret_key.txt') as f:
    SECRET_KEY = f.read().strip()
