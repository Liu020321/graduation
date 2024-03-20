let currentTool3 = "箭头注释工具"; // 默认初始化的工具为长度工具

// 默认初始化使用长度工具的代码
document.addEventListener("DOMContentLoaded", function () {
    selectTool3(currentTool3, false);
});

// 控制点击选择按钮时弹出选择列表
function toggleDropdownMenu3(event) {
    const dropdownContent3 = document.getElementById("dropdown-content3");
    dropdownContent3.classList.toggle("show");
    event.stopPropagation(); // 阻止事件冒泡
}

// 点击文档其他区域时关闭选择列表
document.addEventListener("click", function (event) {
    const dropdownContent3 = document.getElementById("dropdown-content3");
    dropdownContent3.classList.remove("show");
});

function selectTool3(tool3, shouldTriggerOnClick3 = true) {
    const selectedToolCode3 = document.getElementById("selected-tool-code3");
    const tooltipText3 = getToolTooltip3(tool3); // 获取对应工具的tooltip文本
    selectedToolCode3.setAttribute("title", tooltipText3); // 设置tooltip文本


    switch (tool3) {
        case '箭头注释工具':
            selectedToolCode3.innerHTML = `
                <!-- 这里放置箭头注释工具的完整代码 -->
                                            <a 
                    href="#" onclick="selectTool3('箭头注释工具');activateTool('ArrowAnnotate')">
                    <i class="las la-download1"></i>
                </a>
            `;
            break;
        case '文本注释工具':
            selectedToolCode3.innerHTML = `
                <!-- 这里放置文本注释工具具的完整代码 -->
               
                       <a 
                    href="#" onclick="selectTool3('文本注释工具');activateTool('TextMarker')">
                    <i class="las la-edit1"></i>
                </a>
            `;
            break;
        case '数据信息工具':
            selectedToolCode3.innerHTML = `
                <!-- 这里放置数据信息工具的完整代码 -->
                  <a 
                    href="#" onclick="selectTool3('数据信息工具');activateTool('ImageStatistics')">
                    <i class="las la-comment1"></i>
                </a>
            `;
            break;
        default:
            // 默认为空，以防止无法匹配到任何工具时保持图标区域为空
            selectedToolCode3.innerHTML = '';
            break;
    }

    // 更新选择列表中的工具显示/隐藏
    currentTool3 = tool3;
    updateToolItemsVisibility3(currentTool3);

    if (shouldTriggerOnClick3) {
        // 触发已选择工具的onclick效果
        const selectedToolElement3 = document.querySelector('.tool-item3.active');
        if (selectedToolElement3) {
            const onClick3 = selectedToolElement3.getAttribute("onclick");
            if (onClick3) {
                eval(onClick3);
            }
        }
    }
}

// // 新增：执行图标区域的onclick效果
// const iconContainer3 = document.getElementById("selected-icon-button3");
// iconContainer3.addEventListener("click", function (event) {
//     event.preventDefault();
//     triggerSelectedTool3();
// });
//
// // 触发已选择工具的onclick效果
// function triggerSelectedTool3() {
//     const selectedToolElement3 = document.querySelector('.tool-item3.active');
//     if (selectedToolElement3) {
//         const onClick3 = selectedToolElement3.getAttribute("onclick");
//         if (onClick3) {
//             eval(onClick3);
//         }
//     }
// }


function getToolTooltip3(tool3) {
    switch (tool3) {
        case '箭头注释工具':
            return "箭头注释工具";
        case '文本注释工具':
            return "文本注释工具";
        case '数据信息工具':
            return "数据信息工具";
        default:
            return "";
    }
}

// 更新选择列表中的工具显示/隐藏
function updateToolItemsVisibility3(currentTool3) {
    const dropdownContent3 = document.getElementById("dropdown-content3");
    const toolItems3 = dropdownContent3.getElementsByClassName("tool-item3");
    for (let i = 0; i < toolItems3.length; i++) {
        const toolName3 = toolItems3[i].getAttribute("data-original-title");
        if (toolName3 === currentTool3) {
            toolItems3[i].style.display = "none";
        } else {
            toolItems3[i].style.display = "block";
        }
    }
}

