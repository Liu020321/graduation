import hashlib

from flask import Flask, render_template, redirect, flash, Blueprint, request, session, jsonify, current_app, url_for
from flask_login import login_required
import datetime
from sqlalchemy.orm import joinedload
from werkzeug.security import check_password_hash
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


# 挂号页面路由
@patient.route('/make_appointment', methods=['GET', 'POST'])
@login_required
def make_appointment():
    doctor_id = request.form.get('doctor')
    print('docterId:'+doctor_id)
    appointment_time = datetime.datetime.strptime(request.form.get('time'), '%Y/%m/%d %I:%M %p').date()
    print(appointment_time)
    user_id = User.query.filter_by(username=session.get('username')).first().id
    print(user_id)
    description = request.form.get('description')
    print(description)
    isRepeat = request.form.get('isRepeat')
    print(isRepeat)
    status = 1
    appointment = Appointment(
        doctor_id=doctor_id,
        time=appointment_time,
        user_id=user_id,
        description=description,
        isRepeat=isRepeat,
        status=status
    )
    db.session.add(appointment)
    db.session.commit()

    return redirect(url_for('patient.appointments'))


# 预约记录页面路由
@patient.route('/appointments')
def appointments():
    # 页码：默认显示第一页
    page = int(request.args.get('page', 1))
    # per_page: 每页显示数据量
    per_page = int(request.args.get('per_page', 7))
    user_id = User.query.filter_by(username=session.get('username')).first().id
    appointment_list = db.session.query(Appointment, Doctor, Department, UserMessage). \
        join(Doctor, Appointment.doctor_id == Doctor.id). \
        join(Department, Doctor.department_id == Department.id). \
        join(UserMessage, Doctor.user_id == UserMessage.user_id). \
        filter(Appointment.user_id == user_id). \
        paginate(page=page, per_page=per_page)

    context = {"breadcrumb": {"parent": "挂号诊断", "child": "查看挂号"}}
    return render_template('patient/appointment-list/appointment-list.html', **context, appointment_list=appointment_list)


@patient.route('/apply_appointment')
@login_required
def apply_appointment():
    departments = Department.query.all()
    context = {"breadcrumb": {"parent": "挂号诊断", "child": "挂号复诊", "jsFunction": 'startTime()'}}
    return render_template('patient/appointment/appointment.html', **context, departments=departments)


@patient.route('/get_department')
def get_department():
    departments = Department.query.all()
    department_data = [{'department_id': department.id, 'department_name': department.name} for department in departments]
    return jsonify(department_data)



@patient.route('/get_doctors', methods=['POST', 'GET'])
def get_doctors():
    department_id = request.args.get('department_id') or request.form.get('department_id')
    doctors = Doctor.query.filter_by(department_id=department_id).all()
    doctors_data = [{'id': doctor.id, 'name': UserMessage.query.filter_by(user_id=doctor.user_id).first().name, 'schedule': doctor.schedule} for doctor in doctors]

    return jsonify(doctors_data)


# 检查时间是否在排班范围内
def is_within_schedule(doctor_schedule, selected_date):
    # 解析医生的排班信息
    schedule_parts = doctor_schedule.split('至')

    # 提取开始日期
    start_day = schedule_parts[0]  # 排班开始日期

    # 在结束日期和时间段的部分中查找第一个 "周" 的位置
    end_day_index = schedule_parts[1].find('周')

    # 根据找到的位置将结束日期和时间段分割开来
    end_day = schedule_parts[1][:end_day_index + 2]  # 结束日期，包括 "周"
    time_of_day = schedule_parts[1][end_day_index + 2:]  # 时间段

    print(start_day)
    print(end_day)
    print(time_of_day)

    # 将字符串日期转换为对应的星期数
    weekdays = {'周一': 0, '周二': 1, '周三': 2, '周四': 3, '周五': 4, '周六': 5, '周日': 6}
    selected_weekday = selected_date.weekday()
    print(weekdays[start_day])
    print(selected_weekday)
    print(weekdays[end_day])

    # 检查选定日期是否在排班范围内
    if weekdays[start_day] <= selected_weekday <= weekdays[end_day]:
        # 检查选定时间是否在上午或下午
        if time_of_day == '上午' and selected_date.strftime('%p') == 'AM':
            return True
        elif time_of_day == '下午' and selected_date.strftime('%p') == 'PM':
            return True
    else:
        return False


# 路由：获取医生剩余名额
@patient.route('/get_remaining_quota', methods=['POST'])
@login_required
def get_remaining_quota():
    data = request.json
    doctor_id = data.get('doctorId')
    print(doctor_id)
    selected_date = datetime.datetime.strptime(data.get('selectedDate'), '%Y/%m/%d %I:%M %p')
    print(selected_date.date())

    # 获取医生的排班信息
    doctor = Doctor.query.get(doctor_id)
    if not doctor:
        return jsonify({'error': 'Invalid doctor ID'}), 400

    doctor_schedule = doctor.schedule  # 获取医生的排班信息
    if not doctor_schedule:
        return jsonify({'error': 'Doctor has no schedule information'}), 400

    # 检查预约时间是否在医生排班内
    if not is_within_schedule(doctor_schedule, selected_date):
        return jsonify({'error': 'Selected date/time is not within doctor\'s schedule'}), 400

    appointments = Appointment.query.filter_by(doctor_id=doctor_id, time=selected_date.date()).count()
    print(appointments)
    # 计算剩余名额
    quota = 10 - appointments  # 假设每天最多可预约 10 个名额
    return jsonify({'remainingQuota': quota}), 200
