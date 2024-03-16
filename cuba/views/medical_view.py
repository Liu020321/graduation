import os

from flask import Flask, render_template, redirect, flash, Blueprint, request, session, jsonify, current_app
from flask_login import login_required
import datetime
from werkzeug.utils import secure_filename
from cuba.extends import db
from cuba.models import *
from cuba.views.commands import *

from multiprocessing import Process


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
    medical_pictures = MedicalPicture.query.all()
    users = User.query.all()
    context = {"breadcrumb": {"parent": "3D医疗图片解析", "child": "查看医疗图片"}}
    return render_template("medical/viewPicture/viewPicture.html", **context, medical_pictures=medical_pictures, users=users )


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

            # 处理文件上传
            if 'file' in request.files:
                files = request.files.getlist('file')  # 获取所有上传的文件列表
                if files:
                    # 构建目标文件夹路径
                    target_folder = os.path.join(current_app.root_path, 'static', 'medical', folder_name, 'submit')
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

                            # 构建目标文件的路径
                            target_file_path = os.path.join(target_folder, new_filename)

                            # 保存文件到目标路径
                            file.save(target_file_path)

                            # 将文件路径以及其他信息存入数据库
                            medical_picture = MedicalPicture(
                                name=name,
                                imageType=image_type,
                                age=age,
                                uploadTime=upload_time,
                                description=description,
                                medicalImage=target_file_path,  # 保存目标文件的路径
                                isDoing=0
                            )
                            db.session.add(medical_picture)
                            db.session.commit()

                            # 在上传文件处理完成后，启动新进程执行 nnunet() 函数
                            target_submit_folder = os.path.join(current_app.root_path, 'static', 'medical', folder_name,
                                                                'submit')
                            target_output_folder = os.path.join(current_app.root_path, 'static', 'medical', folder_name,
                                                                'output')
                            nnunet_process = Process(target=nnunet, args=(target_submit_folder, target_output_folder))
                            nnunet_process.start()

                            # 向前端发送成功响应
                            return jsonify({'message': '文件上传成功!'}), 200

            return jsonify({'error': '请求中缺少文件!'}), 400
        except Exception as e:
            return jsonify({'error': str(e)}), 500  # 返回更具体的错误信息
    return jsonify({'error': '请求失败!'}), 400


