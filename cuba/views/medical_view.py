from flask import Flask, render_template, redirect, flash, Blueprint, request, session
from flask_login import login_required
from cuba.extends import db
from cuba.models import *

medical = Blueprint("medical", __name__)


# 上下文处理器
@medical.context_processor
def inject_user_info():
    userHead = session.get('userHead')
    username = session.get('username')
    isAdmin = session.get('admin')
    return dict(username=username, isAdmin=isAdmin, userHead=userHead)


# ------------医疗界面

@medical.route('/importPicture')
@login_required
def import_picture():
    context = {"breadcrumb": {"parent": "3D医疗图片解析", "child": "解析医疗图片", "jsFunction": 'startTime()'}}
    return render_template("medical/importPicture/importPicture.html", **context)

@medical.route('/viewPicture')
@login_required
def view_picture():
    context = {"breadcrumb": {"parent": "3D医疗图片解析", "child": "查看医疗图片"}}
    return render_template("medical/viewPicture/viewPicture.html", **context)