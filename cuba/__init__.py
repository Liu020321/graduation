from flask import Flask, redirect
from flask_login import LoginManager, current_user
from flask_admin import Admin, AdminIndexView
from flask_admin.contrib.sqla import ModelView
from flask_assets import Environment
from sassutils.wsgi import SassMiddleware

from cuba.views.routes import main as main_blueprint
from cuba.views.auth_view import auth as auth_blueprint
from cuba.views.medical_view import medical as medical_blueprint

from .models import User, Todo
# 数据迁移
from .extends import *

app = Flask(__name__)

assets = Environment(app)

try:
    # 引用自定义的mysql地址
    from instance.mysql import *
    has_db_url = True
except ImportError:
    has_db_url = False

if has_db_url and DB_URL:
    app.config["SECRET_KEY"] = "Lht20020321"
    app.config["SQLALCHEMY_DATABASE_URI"] = DB_URL
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cuba.db'
    app.config['SECRET_KEY'] = 'Lht20020321'

init_extends(app=app)

app.wsgi_app = SassMiddleware(
    app.wsgi_app,
    {"cuba": ("static/assets/scss", "static/assets/css", "/static/assets/css", False)},
)


class UserModelView(ModelView):
    def is_accessible(self):
        isAdmin = False
        if current_user.is_authenticated:
            isAdmin = current_user.isAdmin
        return isAdmin

    def inaccessible_callback(self, name, **kwargs):
        return redirect("/login_home")


class cubaAdminIndexView(AdminIndexView):
    def is_accessible(self):
        isAdmin = True
        if current_user.is_authenticated:
            isAdmin = current_user.isAdmin
        return isAdmin

    def inaccessible_callback(self, name, **kwargs):
        return redirect("/login_home")


admin = Admin(app, index_view=cubaAdminIndexView())

login_manager = LoginManager()
login_manager.login_view = "auth.login_home"
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


# 注册蓝图
app.register_blueprint(main_blueprint)
app.register_blueprint(auth_blueprint)
app.register_blueprint(medical_blueprint)

admin.add_view(ModelView(Todo, db.session))
admin.add_view(ModelView(User, db.session))


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
