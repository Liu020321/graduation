// 点击按钮触发截图操作
    $('#screenPicture').click(function() {
       html2canvas($('#contentToScreenshot')[0], {
        width: 1500, // 指定截图宽度
        height: 500 // 指定截图高度
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
        // 显示模态框
        $('#screenshotModal').show();

            // // 发送截图数据给后端保存
            // $.ajax({
            //     type: 'POST',
            //     url: '/save_screenshot',
            //     data: {
            //         screenshot_data: screenshotImage
            //     },
            //     success: function(response) {
            //         console.log(response);
            //         // 展开模态框
            //         $('#addModal').modal('show');
            //     },
            //     error: function(err) {
            //         console.error('Error:', err);
            //     }
            // });
        });
    });


function toggleDropdownMenu(event, dropdownId) {
    const dropdownContent = document.getElementById(dropdownId);
    dropdownContent.classList.toggle("show");
    event.stopPropagation(); // 阻止事件冒泡
}

function modifyButtonStyles(button) {
    const allButtons = document.querySelectorAll('.btn'); // 获取所有按钮
    allButtons.forEach(btn => {
        btn.classList.remove('btn-success'); // 移除所有按钮的成功样式
        btn.classList.add('btn-primary'); // 将所有按钮的样式设置为默认
    });
    button.classList.remove('btn-primary'); // 移除当前按钮的默认样式
    button.classList.add('btn-success'); // 将当前按钮的样式设置为成功（或者你需要的任何样式）
}

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

function toggleButton(button, tool, event) {
    modifyButtonStyles(button); // 修改单个按钮样式
    activateTool(tool); // 执行 activateTool 函数

    // event.stopPropagation(); // 阻止事件冒泡
}

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