import email
from flask import Blueprint, render_template, redirect, request, flash, session, url_for
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required
from cuba.models import *
from cuba.extends import db

auth = Blueprint("auth", __name__)

next_page = "/"


@auth.route("/login_home")
def login_home():
    global next_page
    next = request.args.get("next")
    page = 'login'
    if next:
        next_page = next
    else:
        next_page = "/"
    return render_template("main-login.html", page=page)


@auth.route("/login_home", methods=["POST", "GET"])
def login_post():
    global next_page
    email = request.form.get("email")
    password = request.form.get("password")
    remember = True if request.form.get("remember") else False
    user = User.query.filter_by(email=email).first()
    user_message = UserMessage.query.filter_by(user_id=user.id).first()
    if user and check_password_hash(user.password, password):
        login_user(user, remember=remember)
        session['username'] = user.username
        session['admin'] = user.isAdmin
        session['userHead'] = user_message.userHead
        session['user_id'] = user.id
        if next_page:
            return redirect(next_page)
        else:
            return redirect(url_for('index', username=session['username'], admin=session['admin']))
    else:
        flash("please Check you login details and try again!")
        return redirect("/")


@auth.route("/forget_password")
def forget_password():
    page = 'forgot'
    return render_template("pages/others/authentication/forget-password/forget-password.html", page=page)


@auth.route("/signUp")
def signUp():
    page = 'register'
    return render_template("signup.html", page=page)


@auth.route("/signUp", methods=["POST"])
def signUpPost():
    email = request.form.get("email")
    username = request.form.get("username")
    password = request.form.get("password")

    user = User.query.filter_by(email=email).first()

    if user:
        flash("邮箱已经被注册！")
        return redirect("/signUp")

    new_user = User(
        email=email,
        username=username,
        password=generate_password_hash(password, method="sha256"),
    )

    db.session.add(new_user)
    db.session.commit()

    return redirect("/login_home")


@auth.route("/logout")
@login_required
def logout():
    global next_page
    next_page = "/"
    logout_user()
    return redirect("/")
