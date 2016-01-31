import datetime
import os

import dj_database_url

from .base import *

SECRET_KEY = os.environ['SECRET_KEY']

DEBUG = True
BUILD = 'staging'

DATABASES = {'default': dj_database_url.config()}
