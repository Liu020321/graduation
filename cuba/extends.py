from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_socketio import SocketIO

db = SQLAlchemy()
migrate = Migrate()


def init_extends(app):
    db.init_app(app=app)
    migrate.init_app(app=app, db=db)


def init_socketio(app):
    socketio = SocketIO(app)

    return socketio