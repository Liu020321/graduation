import os

from flask import Flask, render_template, redirect, flash, Blueprint, request, session, jsonify, current_app
from flask_login import login_required
import datetime
from werkzeug.utils import secure_filename
from cuba.extends import db
from cuba.models import *

from multiprocessing import Process

from cuba.views.commands import nnunet

import base64

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
    users = User.query.all()  # 获取所有用户
    ages = [user.age for user in users]  # 获取所有用户的年龄
    context = {"breadcrumb": {"parent": "3D医疗图片解析", "child": "解析医疗图片", "jsFunction": 'startTime()'}}
    return render_template("medical/importPicture/importPicture.html", **context, users=users, ages=ages)


@medical.route('/viewPicture/')
@login_required
def view_picture():
    # 页码：默认显示第一页
    page = int(request.args.get('page', 1))
    # per_page: 每页显示数据量
    per_page = int(request.args.get('per_page', 6))

    medical_pictures = MedicalPicture.query.join(User, (MedicalPicture.user_id == User.id)).paginate(page=page, per_page=per_page, error_out=False)
    processes = MedicalPicture.query.filter(MedicalPicture.isDoing).paginate(page=page, per_page=per_page, error_out=False)
    completes = MedicalPicture.query.filter(~MedicalPicture.isDoing).paginate(page=page, per_page=per_page, error_out=False)
    context = {"breadcrumb": {"parent": "3D医疗图片解析", "child": "查看医疗图片"}}
    return render_template("medical/viewPicture/viewPicture.html", **context, medical_pictures=medical_pictures, processes=processes, complates=completes)


@medical.route('/check_isDoing')
@login_required
def check_isDoing():
    # 查询医疗图片数据
    medical_pictures = MedicalPicture.query.join(User, (MedicalPicture.user_id == User.id)).all()
    # 构造返回给前端的数据
    medical_pictures_data = []
    for medical_picture in medical_pictures:
        medical_pictures_data.append({
            'id': medical_picture.id,
            'isDoing': medical_picture.isDoing
        })
    # 返回 JSON 格式的数据
    return jsonify({'medicalPictures': medical_pictures_data})


@medical.route('/Pictures')
@login_required
def Pictures():
    submit = request.args.get('submit')
    output = request.args.get('output')
    hide_footer = True

    # 根据 output 和 submit 查询医疗图片信息
    medical_picture = MedicalPicture.query.filter_by(outputImage=output, submitImage=submit).first()
    if medical_picture:
        # 如果找到医疗图片信息，则获取用户 ID 和图片信息
        user_id = medical_picture.user_id
        user = User.query.get(user_id)  # 查询用户信息
        image_info = {
            'id': medical_picture.id,
            'imageType': medical_picture.imageType,
            'uploadTime': medical_picture.uploadTime,
            'description': medical_picture.description,
            'submitImage': medical_picture.submitImage,
            'outputImage': medical_picture.outputImage,
            'isDoing': medical_picture.isDoing,
            'user': {
                'id': user.id,
                'username': user.username,
                'userHead': user.userHead,
                'email': user.email,
                'name': user.name,
                'age': user.age,
                'idCard': user.idCard,
                'isAdmin': user.isAdmin
            }
        }
    else:
        user_id = None
        image_info = None

    return render_template("medical/Pictures/Pictures.html", hide_footer=hide_footer, submit=submit, output=output, user_id=user_id, image_info=image_info)


@medical.route('/save_screenshot', methods=['POST'])
@login_required
def save_screenshot():
    # 从请求中获取截图数据
    screenshot_data = request.form['screenshot']

    # 将截图数据保存到静态目录中
    with open(os.path.join(current_app.root_path, 'static', 'assets', 'images', 'screenPictures' 'screenshot.png'), 'wb') as f:
        f.write(screenshot_data.decode('base64'))

    return 'Screenshot saved successfully!'


@medical.route('/medical', methods=['POST'])
@login_required
def medical_add():
    if request.method == 'POST':
        try:
            name = request.form['name']
            image_type = request.form['imageType']
            age = int(request.form['age'])
            upload_time = datetime.datetime.strptime(request.form['uploadTime'], '%Y/%m/%d %I:%M %p')
            description = request.form['description']

            # 格式化上传时间
            formatted_upload_time = upload_time.strftime('%Y-%m-%d_%H_%M').replace(' ', '').replace(':', '_')
            # 格式化文件夹名
            folder_name = f"{name}_{age}_{formatted_upload_time}"

            # 查询用户的唯一ID
            user = User.query.filter_by(name=name, age=age).first()
            if user:
                user_id = user.id
            else:
                return jsonify({'error': '找不到对应的用户!'}), 400

            # 处理文件上传
            if 'file' in request.files:
                files = request.files.getlist('file')  # 获取所有上传的文件列表
                if files:
                    # 构建目标文件夹路径
                    target_folder = os.path.join(current_app.root_path, 'static', 'medical', folder_name, 'submit')
                    save_folder = os.path.join('medical', folder_name, 'output')
                    # 确保目标文件夹存在
                    os.makedirs(target_folder, exist_ok=True)

                    for file in files:
                        if file.filename != '':
                            # 获取文件后缀
                            file_extension = '.' + file.filename.split('.', 1)[-1]

                            # 构建新文件名，根据文件数量递增并补齐至四位数
                            existing_files = os.listdir(target_folder)
                            file_count = len(existing_files)
                            new_filename = f"{folder_name}_{str(file_count).zfill(4)}{file_extension}"
                            save_filename = f"{folder_name}{file_extension}"

                            # 构建目标文件的路径
                            target_file_path = os.path.join(target_folder, new_filename)
                            submit_path = os.path.join('/static', 'medical', folder_name, 'submit', new_filename)
                            output_path = os.path.join('/static', save_folder, save_filename)

                            # 保存文件到目标路径
                            file.save(target_file_path)

                            # 将文件路径以及其他信息存入数据库
                            medical_picture = MedicalPicture(
                                imageType=image_type,
                                user_id=user_id,
                                uploadTime=upload_time,
                                description=description,
                                submitImage=submit_path,  # 保存目标文件的路径
                                outputImage=output_path,
                                isDoing=1
                            )
                            db.session.add(medical_picture)
                            db.session.commit()

                            # 获取刚插入到数据库的MedicalPicture的id
                            medical_picture_id = medical_picture.id

                            # 在上传文件处理完成后，启动新进程执行 nnunet() 函数
                            target_submit_folder = os.path.join(current_app.root_path, 'static', 'medical', folder_name,
                                                                'submit')
                            target_output_folder = os.path.join(current_app.root_path, 'static', 'medical', folder_name,
                                                                'output')
                            nnunet_process = Process(target=nnunet, args=(target_submit_folder, target_output_folder, user_id, medical_picture_id))
                            nnunet_process.start()

                            # 向前端发送成功响应
                            return jsonify({'message': '文件上传成功!'}), 200

            return jsonify({'error': '请求中缺少文件!'}), 400
        except Exception as e:
            print('error:', str(e))
            return jsonify({'error': str(e)}), 500  # 返回更具体的错误信息
    return jsonify({'error': '请求失败!'}), 400


