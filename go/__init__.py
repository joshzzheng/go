import os
import json
from flask import Flask

app = Flask(__name__)

app.config.from_object('go.settings')
app.url_map.strict_slashes = False


import go.core
import go.models
import go.controllers