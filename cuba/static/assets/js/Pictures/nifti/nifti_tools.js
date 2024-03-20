let currentTool2 = "放大镜工具"; // 默认初始化的工具为长度工具

// 默认初始化使用长度工具的代码
document.addEventListener("DOMContentLoaded", function () {
    selectTool2(currentTool2, false);
});

// 控制点击选择按钮时弹出选择列表
function toggleDropdownMenu2(event) {
    const dropdownContent2 = document.getElementById("dropdown-content2");
    dropdownContent2.classList.toggle("show");
    event.stopPropagation(); // 阻止事件冒泡
}

// 点击文档其他区域时关闭选择列表
document.addEventListener("click", function (event) {
    const dropdownContent2 = document.getElementById("dropdown-content2");
    dropdownContent2.classList.remove("show");
});

function selectTool2(tool2, shouldTriggerOnClick2 = true) {
    const selectedToolCode2 = document.getElementById("selected-tool-code2");
    const tooltipText2 = getToolTooltip2(tool2); // 获取对应工具的tooltip文本
    selectedToolCode2.setAttribute("title", tooltipText2); // 设置tooltip文本

    switch (tool2) {
        case '放大镜工具':
            selectedToolCode2.innerHTML = `
                <!-- 这里放置放大镜工具的完整代码 -->
                             <a 
                    href="#" onclick="selectTool2('放大镜工具');activateTool('Magnify')">
                    <i data-icon="G" class="icon" style="font-size: 22px"></i>
                </a>
            `;
            break;
        case '拖动探针工具':
            selectedToolCode2.innerHTML = `
                <!-- 这里放置拖动探针工具的完整代码 -->
               
                                <a 
                    href="#" onclick="selectTool2('拖动探针工具');activateTool('DragProbe')">
                    <i data-icon="f" class="icon" style="font-size: 22px"></i>
                </a>
            `;
            break;
        case '探针定位工具':
            selectedToolCode2.innerHTML = `
                <!-- 这里放置探针定位工具的完整代码 -->
                  <a 
                    href="#" onclick="selectTool2('探针定位工具');activateTool('Probe')">
                    <i data-icon="K" class="icon" style="font-size: 22px"></i>
                </a>
            `;
            break;
        default:
            // 默认为空，以防止无法匹配到任何工具时保持图标区域为空
            selectedToolCode2.innerHTML = '';
            break;
    }

    // 更新选择列表中的工具显示/隐藏
    currentTool2 = tool2;
    updateToolItemsVisibility2(currentTool2);

    if (shouldTriggerOnClick2) {
        // 触发已选择工具的onclick效果
        const selectedToolElement2 = document.querySelector('.tool-item2.active');
        if (selectedToolElement2) {
            const onClick2 = selectedToolElement2.getAttribute("onclick");
            if (onClick2) {
                eval(onClick2);
            }
        }
    }
}

function getToolTooltip2(tool2) {
    switch (tool2) {
        case '放大镜工具':
            return "放大镜工具";
        case '拖动探针工具':
            return "拖动探针工具";
        case '探针定位工具':
            return "探针定位工具";
        default:
            return "";
    }
}

// // 新增：执行图标区域的onclick效果
// const iconContainer2 = document.getElementById("selected-icon-button2");
// iconContainer2.addEventListener("click", function (event) {
//     event.preventDefault();
//     triggerSelectedTool2();
// });
//
// // 触发已选择工具的onclick效果
// function triggerSelectedTool2() {
//     const selectedToolElement2 = document.querySelector('.tool-item2.active');
//     if (selectedToolElement2) {
//         const onClick2 = selectedToolElement2.getAttribute("onclick");
//         if (onClick2) {
//             eval(onClick2);
//         }
//     }
// }

// 更新选择列表中的工具显示/隐藏
function updateToolItemsVisibility2(currentTool2) {
    const dropdownContent2 = document.getElementById("dropdown-content2");
    const toolItems2 = dropdownContent2.getElementsByClassName("tool-item2");
    for (let i = 0; i < toolItems2.length; i++) {
        const toolName2 = toolItems2[i].getAttribute("data-original-title");
        if (toolName2 === currentTool2) {
            toolItems2[i].style.display = "none";
        } else {
            toolItems2[i].style.display = "block";
        }
    }
}

