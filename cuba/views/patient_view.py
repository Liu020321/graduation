from flask import Flask, render_template, redirect, flash, Blueprint, request, session, jsonify, current_app, url_for
from flask_login import login_required
import datetime
from sqlalchemy.orm import joinedload
from werkzeug.utils import secure_filename
from cuba.extends import db
from cuba.models import *

patient = Blueprint("patient", __name__)

# 上下文处理器
@patient.context_processor
def inject_user_info():
    userHead = session.get('userHead')
    username = session.get('username')
    isAdmin = session.get('admin')
    return dict(username=username, isAdmin=isAdmin, userHead=userHead)


@patient.route('/report')
@login_required
def file_manager():
    user_id = session.get('user_id')
    print(user_id)
    # 页码：默认显示第dd一页
    page = int(request.args.get('page', 1))
    # per_page: 每页显示数据量
    per_page = int(request.args.get('per_page', 7))

    medical_pictures = (MedicalPicture.query
                        .join(User, MedicalPicture.user_id == User.id)
                        .join(UserMessage, User.id == UserMessage.user_id)
                        .filter(User.id == user_id)
                        .options(joinedload('user'), joinedload('user.user_message'))
                        .paginate(page=page, per_page=per_page, error_out=False))

    context = {"breadcrumb": {"parent": "文件管理", "child": "病例报告管理"}}
    return render_template("patient/report-list/report.html", **context, medical_pictures=medical_pictures)


# 解析排班信息
def parse_schedule(schedule_str):
    schedule = []
    days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    parts = schedule_str.split('至')
    start_day_index = days.index(parts[0][:2])
    end_day_index = days.index(parts[1][:2])
    time_period = parts[1][2:]

    # 计算可预约的日期和时间段
    for day_index in range(start_day_index, end_day_index + 1):
        date = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
        while date.weekday() != day_index:
            date += datetime.timedelta(days=1)
        schedule.append((date, time_period))

    return schedule


# 判断是否是今天
def is_today(date):
    today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
    return date == today


# 获取当天可挂号的时间段
def get_today_schedule(schedule_str):
    schedule = parse_schedule(schedule_str)
    today = datetime.now()
    today_schedule = []
    for date, time_period in schedule:
        if is_today(date):
            today_schedule.append((date, time_period))
    return today_schedule


# 挂号页面路由
@patient.route('/make_appointment', methods=['GET', 'POST'])
def make_appointment():
    if request.method == 'POST':
        doctor_id = request.form['doctor_id']
        appointment_time = datetime.strptime(request.form['time'], '%Y-%m-%d %H:%M')
        user_name = request.form['user_name']
        existing_appointment = Appointment.query.filter_by(doctor_id=doctor_id, time=appointment_time).first()
        if existing_appointment:
            flash('该时间段已有其他预约，请选择其他时间！', 'danger')
        else:
            appointment = Appointment(doctor_id=doctor_id, time=appointment_time, user_name=user_name)
            db.session.add(appointment)
            db.session.commit()
            flash('预约成功！', 'success')
            return redirect(url_for('index'))
    doctors = Doctor.query.all()
    return render_template('make_appointment.html', doctors=doctors)


# 预约记录页面路由
@patient.route('/appointments')
def appointments():
    appointments = Appointment.query.all()
    return render_template('appointments.html', appointments=appointments)


@patient.route('/apply_appointment')
@login_required
def apply_appointment():

    context = {"breadcrumb": {"parent": "挂号诊断", "child": "挂号复诊", "jsFunction": 'startTime()'}}
    return render_template('patient/appointment/appointment.html', **context)
