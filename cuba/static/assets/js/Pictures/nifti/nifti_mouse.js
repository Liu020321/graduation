let currentTool1 = "滚轮缩放工具"; // 默认初始化的工具为长度工具

// 默认初始化使用长度工具的代码
document.addEventListener("DOMContentLoaded", function () {
    selectTool1(currentTool1, false);
});

// 控制点击选择按钮时弹出选择列表
function toggleDropdownMenu1(event) {
    const dropdownContent1 = document.getElementById("dropdown-content1");
    dropdownContent1.classList.toggle("show");
    event.stopPropagation(); // 阻止事件冒泡
}

// 点击文档其他区域时关闭选择列表
document.addEventListener("click", function (event) {
    const dropdownContent1 = document.getElementById("dropdown-content1");
    dropdownContent1.classList.remove("show");
});

function selectTool1(tool1, shouldTriggerOnClick1 = true) {
    const selectedToolCode1 = document.getElementById("selected-tool-code1");
    const tooltipText1 = getToolTooltip1(tool1); // 获取对应工具的tooltip文本
    selectedToolCode1.setAttribute("title", tooltipText1); // 设置tooltip文本

    switch (tool1) {
        case '鼠标缩放工具':
            selectedToolCode1.innerHTML = `
                <!-- 这里放置滚轮缩放工具的完整代码 -->
                <a 
                                           href="#" onclick="selectTool1('鼠标缩放工具');activateTool('Zoom')">
                                            <i class="fa fa-crop1"></i>
                                        </a>
            `;
            break;
        case '滚轮缩放工具':
            selectedToolCode1.innerHTML = `
                <!-- 这里放置鼠标缩放工具的完整代码 -->
               
                <a 
                    href="#" onclick="selectTool1('滚轮缩放工具');activateTool('ZoomMouseWheel')">
                    <i class="fa fa-bug1"></i>
                </a>
            `;
            break;
        case '堆栈滚动工具':
            selectedToolCode1.innerHTML = `
                <!-- 这里放置堆栈滚动工具的完整代码 -->
                  <a 
                    href="#" onclick="selectTool1('堆栈滚动工具');activateTool('StackScroll')">
                    <i class="fa fa-book1"></i>
                </a>
            `;
            break;
        default:
            // 默认为空，以防止无法匹配到任何工具时保持图标区域为空
            selectedToolCode1.innerHTML = '';
            break;
    }

    // 更新选择列表中的工具显示/隐藏
    currentTool1 = tool1;
    updateToolItemsVisibility1(currentTool1);

    if (shouldTriggerOnClick1) {
        // 触发已选择工具的onclick效果
        const selectedToolElement1 = document.querySelector('.tool-item1.active');
        if (selectedToolElement1) {
            const onClick1 = selectedToolElement1.getAttribute("onclick");
            if (onClick1) {
                eval(onClick1);
            }
        }
    }
}

function getToolTooltip1(tool1) {
    switch (tool1) {
        case '鼠标缩放工具':
            return "鼠标缩放工具";
        case '滚轮缩放工具':
            return "滚轮缩放工具";
        case '堆栈滚动工具':
            return "堆栈滚动工具";
        default:
            return "";
    }
}

// // 新增：执行图标区域的onclick效果
// const iconContainer1 = document.getElementById("selected-icon-button1");
// iconContainer1.addEventListener("click", function (event) {
//     event.preventDefault();
//     triggerSelectedTool1();
// });
//
// // 触发已选择工具的onclick效果
// function triggerSelectedTool1() {
//     const selectedToolElement1 = document.querySelector('.tool-item1.active');
//     if (selectedToolElement1) {
//         const onClick1 = selectedToolElement1.getAttribute("onclick");
//         if (onClick1) {
//             eval(onClick1);
//         }
//     }
// }

// 更新选择列表中的工具显示/隐藏
function updateToolItemsVisibility1(currentTool1) {
    const dropdownContent = document.getElementById("dropdown-content1");
    const toolItems1 = dropdownContent.getElementsByClassName("tool-item1");
    for (let i = 0; i < toolItems1.length; i++) {
        const toolName1 = toolItems1[i].getAttribute("data-original-title");
        if (toolName1 === currentTool1) {
            toolItems1[i].style.display = "none";
        } else {
            toolItems1[i].style.display = "block";
        }
    }
}

