import subprocess
import sys

from flask import current_app, jsonify
import os
from cuba.extends import db
from cuba.models import *


def nnunet(target_submit_folder, target_output_folder, user_id, medical_picture_id):
    # 获取目标目录的路径
    target_dir = os.path.abspath(os.path.join(current_app.root_path, "..", "PaddleSeg", "contrib", "MedicalSeg"))

    # 定义conda命令的绝对路径
    conda_command = "/home/lht/Environments/anaconda3/bin/conda"

    # 激活虚拟环境
    conda_env = "graduation"  # 您的 Conda 虚拟环境名称
    activate_cmd = f"source /home/lht/Environments/anaconda3/bin/activate {conda_env}"  # 使用绝对路径激活虚拟环境
    subprocess.Popen(activate_cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    # 构建 nnunet 命令
    command = f"""cd {target_dir} && {conda_command} run -n {conda_env} python nnunet/infer.py \
        --image_folder {target_submit_folder} \
        --output_folder {target_output_folder} \
        --plan_path inference_model/nnUNetPlansv2.1_plans_3D.pkl \
        --model_paths inference_model/model.pdmodel \
        --param_paths inference_model/model.pdiparams \
        --postprocessing_json_path inference_model/postprocessing.json \
        --model_type cascade_lowres"""

    # 执行命令
    process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    output, error = process.communicate()

    if process.returncode == 0:
        print("命令运行成功!")
        print("Output:", output.decode())  # 打印命令的输出信息
        # 修改数据库中对应的 isDoing 字段为 0
        medical_picture = MedicalPicture.query.filter((MedicalPicture.id == medical_picture_id) & (MedicalPicture.user_id == user_id)).first()
        if medical_picture:
            medical_picture.isDoing = 0
            db.session.commit()
            print("数据库中 isDoing 字段修改成功！")
        else:
            print("找不到对应的数据库记录！")
    else:
        print("命令运行失败!")
        print("Error:", error.decode())


def execute_command2():
    command = "echo 'Command 2 executed'"
    process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    output, error = process.communicate()

    if process.returncode == 0:
        print("Command 2 executed successfully")
    else:
        print("Command 2 execution failed")
        print("Error:", error.decode())

# 添加更多命令的函数
