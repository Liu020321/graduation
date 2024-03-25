from sqlalchemy.orm import relationship

from .extends import db
import datetime
from flask_login import UserMixin
import datetime
from email.policy import default


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    userHead = db.Column(db.String(255), nullable=False, default="assets/images/dashboard/profile.png")
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(600), nullable=False)
    name = db.Column(db.String(20),  nullable=False, index=True)
    age = db.Column(db.Integer,  nullable=False, index=True)
    idCard = db.Column(db.BigInteger, unique=True,  default=0)
    isAdmin = db.Column(db.Boolean,  default=False)

    def __repr__(self):
        return f"User('{self.username}','{self.email}')"


class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    description = db.Column(db.String(500), unique=True, nullable=False)
    completed = db.Column(db.Boolean, default=False)
    timeStamp = db.Column(db.DateTime, default=datetime.datetime.utcnow)


class MedicalPicture(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    imageType = db.Column(db.String(20), nullable=False)
    uploadTime = db.Column(db.DateTime, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    submitImage = db.Column(db.String(255), nullable=False)
    outputImage = db.Column(db.String(255), nullable=True)
    isDoing = db.Column(db.Boolean, default=False)

    user = db.relationship('User', foreign_keys=user_id, backref='medical_pictures')


class ModalList(db.Model):
    # __tablename__ = 'modal_lists'  # 表名为 modal_lists
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    image_id = db.Column(db.Integer, db.ForeignKey(MedicalPicture.id), nullable=False)
    image_time = db.Column(db.DateTime, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String(255), nullable=False)

    images = db.relationship('MedicalPicture', foreign_keys=image_id, backref='modal_list')


