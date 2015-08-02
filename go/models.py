from datetime import datetime

from go.core import db
from go import app

class Redirects(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.Text, unique=True)
  url = db.Column(db.Text)
  created_time = db.Column(db.DateTime(timezone=True))
  num_visits = db.Column(db.Integer)

  def __init__(self, name, url):
    self.name = name
    self.url = url
    self.created_time = datetime.utcnow()
    self.num_visits = 0

  def __repr__(self):
    return '<Link %r:%r>' % (self.name, self.url)

# models for which we want to create API endpoints
app.config['API_MODELS'] = { 'redirects': Redirects }