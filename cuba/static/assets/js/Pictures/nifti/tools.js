// 截图操作按钮
$('#screenPicture').click(function() {
    html2canvas($('#contentToScreenshot')[0], {
        width: 1500, // 指定截图宽度
        height: 800, // 指定截图高度
    }).then(canvas => {
        // 获取截图的像素数据
        var context = canvas.getContext('2d');
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        var pixels = imageData.data;
        var width = canvas.width;
        var height = canvas.height;

        // 计算左侧留白
        var leftTrim = 0;
        for (var x = 0; x < canvas.width; x++) {
            var isEmptyColumn = true;
            for (var y = 0; y < canvas.height; y++) {
                var index = (y * width + x) * 4;
                var alpha = pixels[index + 3];
                if (alpha !== 0) {
                    isEmptyColumn = false;
                    break;
                }
            }
            if (!isEmptyColumn) {
                leftTrim = x;
                break;
            }
        }

        // 计算右侧留白
        var rightTrim = 0;
        for (var x = canvas.width - 1; x >= 0; x--) {
            var isEmptyColumn = true;
            for (var y = 0; y < canvas.height; y++) {
                var index = (y * width + x) * 4;
                var alpha = pixels[index + 3];
                if (alpha !== 0) {
                    isEmptyColumn = false;
                    break;
                }
            }
            if (!isEmptyColumn) {
                rightTrim = canvas.width - x - 1;
                break;
            }
        }

        // 计算顶部留白
        var topTrim = 0;
        for (var y = 0; y < canvas.height; y++) {
            var isEmptyRow = true;
            for (var x = 0; x < canvas.width; x++) {
                var index = (y * width + x) * 4;
                var alpha = pixels[index + 3];
                if (alpha !== 0) {
                    isEmptyRow = false;
                    break;
                }
            }
            if (!isEmptyRow) {
                topTrim = y;
                break;
            }
        }

        // 计算底部留白
        var bottomTrim = 0;
        for (var y = canvas.height - 1; y >= 0; y--) {
            var isEmptyRow = true;
            for (var x = 0; x < canvas.width; x++) {
                var index = (y * width + x) * 4;
                var alpha = pixels[index + 3];
                if (alpha !== 0) {
                    isEmptyRow = false;
                    break;
                }
            }
            if (!isEmptyRow) {
                bottomTrim = canvas.height - y - 1;
                break;
            }
        }

        // 创建一个新的 Canvas 元素用于裁剪
        var croppedCanvas = document.createElement('canvas');
        var croppedContext = croppedCanvas.getContext('2d');

        // 指定裁剪后的尺寸
        var croppedWidth = canvas.width - leftTrim - rightTrim;
        var croppedHeight = canvas.height - topTrim - bottomTrim;

        // 设置新 Canvas 的尺寸
        croppedCanvas.width = croppedWidth;
        croppedCanvas.height = croppedHeight;

        // 在新 Canvas 上绘制原始截图，裁剪掉上下左右留白的区域
        croppedContext.drawImage(canvas, leftTrim, topTrim, croppedWidth, croppedHeight, 0, 0, croppedWidth, croppedHeight);

        // 将裁剪后的 Canvas 转换为图片的 Data URL
        var screenshotImage = croppedCanvas.toDataURL();

        // 将 Data URL 设置为图片的 src 属性
        $('#screenshotImage').attr('src', screenshotImage);
        // 将 Data URL 设置到隐藏的表单元素中，以便提交到后端
        $('#imageData').val(screenshotImage);
        // 显示模态框
        $('#screenshotModal').show();
    });
});

// 关闭子级返回父级
function closeAndReturnToListModal(modalId) {
    $('#' + modalId).modal('hide'); // 关闭当前模态框
    $('#listModal').modal('show'); // 显示列表模态框
}

// 控制表单异步加载
$(document).ready(function () {
    $("#fetchBtn").click(function (e) {
        e.preventDefault(); // 阻止默认行为，即阻止<a>标签跳转

        var image_id = $(this).data("image-id"); // 获取按钮的 data-image-id 属性

        $.ajax({
            url: "/queryModal", // 发送请求到 Flask 后端的路由
            type: "GET",
            data: {image_id: image_id}, // 将图片 ID 传递给后端
            success: function (response) {
                // 清空表格中的旧数据
                $("#recordsTable tbody").empty();
                // 将获取的数据动态更新到表格中
                response.modal_list.forEach(function (list) {
                    var modalId = "updateModal_" + list.id; // 使用图片ID动态生成模态框ID
                    var modalLabelId = "updateModalLabel_" + list.id; // 使用图片ID动态生成模态框ID
                    $("#recordsTable tbody").append(
                        `<tr>
                                    <th scope="row">${list.image_id}</th>
                                    <td>${list.image_time}</td>
                                   <td>
                                        <a data-original-title="记录列表" type="button" data-bs-toggle="modal" data-bs-target="#${modalId}" title="记录列表"  href="#" >
                                          <i data-feather="edit"></i>
                                        </a>
                                         <div class="modal fade" id="${modalId}" tabindex="-1" role="dialog" aria-labelledby="${modalLabelId}"
                                                             aria-hidden="true">
                                         <div class="modal-dialog" role="document">
                                          <div class="modal-content">
                                            <div class="modal-header">
                                             <h5 class="modal-title" id="${modalLabelId}">添加标记</h5>
                                              <button class="btn-close" type="button" aria-label="Close" onclick="closeAndReturnToListModal('${modalId}')"></button>
                                              </div>
                                              <form  id="updateImage" action="/updateModal" method="post" enctype="multipart/form-data">
                                              <div class="modal-body">
                                                              <input type="hidden" id="list_id" name="list_id" value="${list.id}">
                                                              <input type="hidden" id="query_id" name="query_id" value="${list.image_id}">
                                                                     <div class="col-md-12">
                                                                         <label class="form-label" for="dt-minimum"><h6>标记时间</h6></label>
                                                                         <div class="col-md-12">
                                                                             <div class="input-group date" id="dt-minimum_${list.id}" data-target-input="nearest">
                                                                                 <input class="form-control datetimepicker-input digits" type="text" name="updateImageTime" id="updateImageTime" data-target="#dt-minimum_${list.id}" value="${list.image_time}">
                                                                                 <div class="input-group-text" data-target="#dt-minimum_${list.id}" data-toggle="datetimepicker"><i
                                                                                         class="fa fa-calendar"> </i></div>
                                                                             </div>
                                                                         </div>
                                                                     </div>
                                                                      <div class="mb-3" style="height: 7px;"></div> <!-- 添加一个空白的div -->
                                                                      <div class="col-md-12">
                                                                          <div>
                                                                              <label class="form-label" for="updateDescription"><h6>病情描述</h6></label>
                                                                              <textarea class="form-control col-md-12" name="updateDescription" id="updateDescription" placeholder="请输入描述" rows="3">${list.description}</textarea>
                                                                          </div>
                                                                      </div>
                                                                     <div class="mb-3" style="height: 7px;"></div> <!-- 添加一个空白的div -->
                                                                    <div class="col-md-12">
                                                                   <div class="d-flex justify-content-center align-items-center">
                                                                  <img style="width: 550px;height: 154px " src="${list.image}" id="updateScreenImage" alt="添加标记中...">
                                                               </div>
                                                             </div>
                                                          </div>
                                                         <div class="modal-footer">
                                                        <button  class="btn btn-primary" type="button"  aria-label="Close" onclick="closeAndReturnToListModal('${modalId}')">关闭</button>
                                                     <button class="btn btn-secondary" type="submit">修改标记</button>
                                                  </div>
                                               </form>
                                              </div>
                                           </div>
                                        </div>
                                   </td>
                                   <td><a data-original-title="删除标记" data-placement="top" data-bs-toggle="tooltip" title="删除标记" href="#" onclick="deleteModal(${list.id})"><i data-feather="delete"></i></a></td>
                            </tr>`
                    );
                    feather.replace();
                });
            },
            error: function (xhr) {
                console.log("Error:", xhr);
                // 处理错误
            }
        });
    });
});

// 监听表单提交事件
document.getElementById('imageForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止默认提交行为

    // 获取表单数据
    let formData = new FormData(this);

    // 发送 AJAX 请求
    fetch('/addModal', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                return response.json(); // 解析 JSON 响应数据
            } else {
                throw new Error('网络错误');
            }
        })
        .then(data => {
            // 使用 SweetAlert2 弹窗提示保存成功
            Swal.fire({
                icon: 'success',
                title: '成功',
                text: data.message,
                showConfirmButton: false,
                timer: 1500
            });
        })
        .catch(error => {
            console.error('错误:', error);
            Swal.fire({
                icon: 'error',
                title: '添加失败',
                text: '发生错误，请稍后重试',
                showConfirmButton: false,
                timer: 1500
            });
        });
});

// 监听表单修改事件
$(document).on("submit", "#updateImage", function (event) {
    event.preventDefault(); // 阻止默认提交行为

    // 获取表单数据
    let formData = new FormData(this);

    // 发送 AJAX 请求
    fetch('/updateModal', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                return response.json(); // 解析 JSON 响应数据
            } else {
                throw new Error('网络错误');
            }
        })
        .then(data => {
            // 使用 SweetAlert2 弹窗提示保存成功
            Swal.fire({
                icon: 'success',
                title: '成功',
                text: data.message,
                showConfirmButton: false,
                timer: 1500
            });
        })
        .catch(error => {
            console.error('错误:', error);
            Swal.fire({
                icon: 'error',
                title: '修改失败',
                text: '发生错误，请稍后重试',
                showConfirmButton: false,
                timer: 1500
            });
        });
});

// JavaScript代码，处理删除按钮的点击事件
function deleteModal(modalId) {
    // 发送删除请求到后端
    fetch(`/deleteModal/${modalId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                return response.json(); // 解析 JSON 响应数据
            } else {
                throw new Error('网络错误');
            }
        })
        .then(data => {
            // 使用 SweetAlert2 弹窗提示保存成功
            Swal.fire({
                icon: 'success',
                title: '删除成功',
                text: data.message,
                showConfirmButton: false,
                timer: 1500
            });
            // 删除成功后重新加载 modal_list 数据
            $("#fetchBtn").click(); // 执行点击事件，重新加载 modal_list 数据
        })
        .catch(error => {
            console.error('错误:', error);
            Swal.fire({
                icon: 'error',
                title: '修改失败',
                text: '发生错误，请稍后重试',
                showConfirmButton: false,
                timer: 1500
            });
        });
}

// 报告生成函数
function generateReport(imageId) {
    // 显示加载中的提示
    Swal.fire({
    title: '报告生成中',
    text: '请稍候...',
    allowOutsideClick: false,
    showConfirmButton: false, // 不显示确认按钮
    onBeforeOpen: () => {
        Swal.showLoading();
    }
});
    // 发送生成报告请求到后端
    $.ajax({
        url: '/insertMoadlDocx',
        type: 'POST',
        data: { image_id: imageId },
    })
    .then(data => {
        // 关闭加载提示
        Swal.close();

        console.log(data); // 打印响应数据

        if (data.message === "报告生成成功!") {
            // 处理报告生成成功的情况
            Swal.fire({
                icon: 'success',
                title: '成功',
                text: '报告生成成功!',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            // 处理报告生成失败的情况
            throw new Error('报告生成失败');
        }
    })
    .catch(error => {
        console.error('错误:', error);
        // 关闭加载提示
        Swal.close();
        // 处理错误情况
        Swal.fire({
            icon: 'error',
            title: '生成失败',
            text: '发生错误，请稍后重试',
            showConfirmButton: false,
            timer: 1500
        });
    });
}

// 监听按钮下拉列表
function toggleDropdownMenu(event, dropdownId) {
    const dropdownContent = document.getElementById(dropdownId);
    dropdownContent.classList.toggle("show");
    event.stopPropagation(); // 阻止事件冒泡
}


// 控制按钮样式转变
function modifyButtonStyles(button) {
    const allButtons = document.querySelectorAll('.btn'); // 获取所有按钮
    allButtons.forEach(btn => {
        btn.classList.remove('btn-success'); // 移除所有按钮的成功样式
        btn.classList.add('btn-primary'); // 将所有按钮的样式设置为默认
    });
    button.classList.remove('btn-primary'); // 移除当前按钮的默认样式
    button.classList.add('btn-success'); // 将当前按钮的样式设置为成功（或者你需要的任何样式）
}


// 控制按钮点击工具激活
function selectAndActivateTool(element, toolType, tool, event) {
    const dropdownButton = element.closest('.btn-group').querySelector('.dropdown-toggle');
    const dropdownContent = dropdownButton.nextElementSibling;

    console.log('选择了' + toolType + '工具');

    // 修改按钮的 data-bs-original-title 属性
    dropdownButton.setAttribute('data-bs-original-title', toolType + '工具');

    modifyButtonStyles(dropdownButton); // 修改下拉按钮样式
    activateTool(tool);  // 这里调用你原来定义的激活工具函数，并传递参数

    // 关闭下拉菜单
    dropdownContent.classList.remove("show");

    event.stopPropagation(); // 阻止事件冒泡
}


// 修改单个按钮点击变色
function toggleButton(button, tool, event) {
    modifyButtonStyles(button); // 修改单个按钮样式
    activateTool(tool); // 执行 activateTool 函数

    // event.stopPropagation(); // 阻止事件冒泡
}


// 控制返回访问路径
function goBack() {
    // 获取前一个页面的 URL
    const previousPage = document.referrer;

    // 如果存在前一个页面的 URL，则返回到该页面
    if (previousPage) {
        window.location.href = previousPage;
    } else {
        // 如果不存在前一个页面的 URL，则执行默认的返回操作
        window.history.back();
    }
}

// 点击文档其他区域时关闭选择列表
document.addEventListener("click", function (event) {
    const dropdownContents = document.querySelectorAll(".dropdown-menu");
    dropdownContents.forEach(function (dropdownContent) {
        dropdownContent.classList.remove("show");
    });
});