import hashlib

from flask import Flask, render_template, redirect, flash, Blueprint, request, session, jsonify, current_app, url_for
from flask_login import login_required
import datetime
from sqlalchemy.orm import joinedload
from werkzeug.security import check_password_hash
from werkzeug.utils import secure_filename
from cuba.extends import db
from cuba.models import *

phone = Blueprint("phone", __name__)


@phone.context_processor
def inject_user_info():
    userHead = session.get('userHead')
    username = session.get('username')
    isAdmin = session.get('admin')
    return dict(username=username, isAdmin=isAdmin, userHead=userHead)


@phone.route('/phone_appointment', methods=['POST'])
def phone_appointment():
    try:
        data = request.json
        print('Received JSON data:', data)

        # 从 JSON 数据中提取所需信息
        doctor_id = data.get('doctor_id')
        appointment_time = data.get('datetime')
        description = data.get('description')
        revisit = data.get('revisit')
        user_id = data.get('user_id')

        # 设置 isRepeat 的值等于 revisit
        isRepeat = revisit
        selected_date = datetime.datetime.strptime(appointment_time, '%Y-%m-%d %H:%M')
        appointment_time = datetime.datetime.strptime(appointment_time, '%Y-%m-%d %H:%M').date()

        # 查询医生的排班信息
        doctor = Doctor.query.get(doctor_id)
        doctor_schedule = doctor.schedule

        # 检查预约时间是否在医生的排班时间内
        if not is_within_schedule_phone(doctor_schedule, selected_date):
            return jsonify({"error": "预约时间不在医生的排班时间内"}), 400


        # 打印提取的信息到控制台
        print('Doctor ID:', doctor_id)
        print('Appointment Time:', appointment_time)
        print('Description:', description)
        print('Is Repeat:', isRepeat)
        print('User ID:', user_id)

        # 创建预约对象并将其添加到数据库
        appointment = Appointment(
            doctor_id=doctor_id,
            time=appointment_time,
            user_id=user_id,
            description=description,
            isRepeat=isRepeat,
            status=1  # 默认为 1，表示预约状态正常
        )
        db.session.add(appointment)
        db.session.commit()

        # 返回成功消息
        return 'ok', 200
    except Exception as e:
        # 如果发生异常，打印错误消息并返回错误响应
        print('Error:', e)
        return 'Error: ' + str(e), 500


def is_within_schedule_phone(doctor_schedule, selected_date):
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
        # 检查选定时间是否在上午或下午
        if time_of_day == '上午' and selected_date.hour < 12:
            return True
        elif time_of_day == '下午' and selected_date.hour >= 12:
            return True
    else:
        return False


@phone.route('/phone_login', methods=['POST'])
def phone_login():
    # 检查请求是否为 JSON 格式
    if not request.is_json:
        return jsonify({"error": "请求必须是 JSON 格式"}), 400

    # 从 JSON 中提取用户名和密码
    data = request.get_json()
    print(data)
    email = data.get('username')
    password = data.get('password')

    # 检查是否提供了用户名和密码
    if not email or not password:
        return jsonify({"error": "用户名和密码是必需的"}), 400

    # 查询数据库以获取用户
    user = User.query.filter_by(email=email).first()

    # 如果找不到用户或密码不匹配，则返回错误消息
    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "无效的用户名或密码"}), 401

    # 检查是否是管理员用户，如果是则不允许登录
    if user.isAdmin:
        return jsonify({"error": "管理员用户无法登录"}), 403

    # 如果密码匹配且不是管理员用户，则返回用户名和用户ID
    return jsonify({"username": user.email, "user_id": user.id}), 200


@phone.route('/phone_view_appointments', methods=['POST', 'GET'])
def phone_view_appointments():
    try:
        # 页码：默认显示第一页
        page = int(request.args.get('page', 1))
        # per_page: 每页显示数据量
        per_page = int(request.args.get('per_page', 7))

        data = request.json
        user_id = data.get('user_id')
        # user_id=2

        appointment_data = db.session.query(Appointment, Doctor, Department, UserMessage). \
            join(Doctor, Appointment.doctor_id == Doctor.id). \
            join(Department, Doctor.department_id == Department.id). \
            join(UserMessage, Doctor.user_id == UserMessage.user_id). \
            filter(Appointment.user_id == user_id). \
            paginate(page=page, per_page=per_page, error_out=False)

        total_pages = appointment_data.pages
        total_records = appointment_data.total

        # 构建 JSON 数据
        appointments_json = []
        for appointment, doctor, department, user_message in appointment_data.items:
            appointment_json = {
                "doctor_name": user_message.name,
                "department_name": department.name,
                "appointment_time": appointment.time.strftime('%Y-%m-%d'),
                "description": appointment.description,
                "revisit": appointment.isRepeat,
                "status": appointment.status
            }
            appointments_json.append(appointment_json)

        response_data = {
            "total_pages": total_pages,
            "total_records": total_records,
            "appointments": appointments_json
        }

        return jsonify(response_data)
    except Exception as e:
        print('Error:', e)
        return jsonify({"error": str(e)})

