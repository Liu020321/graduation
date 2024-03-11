from .extends import db
import datetime
from flask_login import UserMixin
import datetime
from email.policy import default


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    userHead = db.Column(db.String(255), unique=True, nullable=False, default="assets/images/dashboard/profile.png")
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(600), nullable=False)
    isAdmin = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f"User('{self.username}','{self.email}')"


class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    description = db.Column(db.String(500), unique=True, nullable=False)
    completed = db.Column(db.Boolean, default=False)
    timeStamp = db.Column(db.DateTime, default=datetime.datetime.utcnow)


class MedicalPicture(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(20), nullable=False)
    imageType = db.Column(db.String(20), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    uploadTime = db.Column(db.DateTime, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    medicalImage = db.Column(db.String(255),nullable=False)

