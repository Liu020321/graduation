let currentTool = "标尺工具"; // 默认初始化的工具为长度工具

// 默认初始化使用长度工具的代码
document.addEventListener("DOMContentLoaded", function () {
    selectTool(currentTool, false);
});

// 控制点击选择按钮时弹出选择列表
function toggleDropdownMenu(event) {
    const dropdownContent = document.getElementById("dropdown-content");
    dropdownContent.classList.toggle("show");
    event.stopPropagation(); // 阻止事件冒泡
}

// 点击文档其他区域时关闭选择列表
document.addEventListener("click", function (event) {
    const dropdownContent = document.getElementById("dropdown-content");
    dropdownContent.classList.remove("show");
});

function selectTool(tool, shouldTriggerOnClick = true) {
    const selectedToolCode = document.getElementById("selected-tool-code");
    const tooltipText = getToolTooltip(tool); // 获取对应工具的tooltip文本
    selectedToolCode.setAttribute("title", tooltipText); // 设置tooltip文本

    switch (tool) {
        case '标尺工具':
            selectedToolCode.innerHTML = `
                <!-- 这里放置标尺工具的完整代码 -->
                <a 
                     href="#" onclick="selectTool('标尺工具');activateTool('Length')">
                    <i class="las la-pen1"></i>
                </a>
            `;
            break;
        case '比例叠加工具':
            selectedToolCode.innerHTML = `
                <!-- 这里放置比例叠加工具的完整代码 -->
               
                <a 
                                        href="#" onclick="selectTool('比例叠加工具');activateTool('ScaleOverlay')">
                                        <i class="las la-tasks1"></i>
                                    </a>
            `;
            break;
        case '角度工具':
            selectedToolCode.innerHTML = `
                <!-- 这里放置角度工具的完整代码 -->
                <a 
                                       href="#" onclick="selectTool('角度工具');activateTool('Angle')">
                                        <i class="las la-play1"></i>
                                    </a>
            `;
            break;
        case '柯布角工具':
            selectedToolCode.innerHTML = `
                <!-- 这里放置柯布角工具的完整代码 -->
                <a 
                                        href="#" onclick="selectTool('柯布角工具');activateTool('CobbAngle')">
                                        <i class="las la-cut1"></i>
                                    </a>
            `;
            break;
        case '双向工具':
            selectedToolCode.innerHTML = `
                <!-- 这里放置双向工具的完整代码 -->
                                    <a 
                    href="#" onclick="selectTool('双向工具');activateTool('Bidirectional')">
                    <i class="las la-copy1"></i>
                </a>
            `;
            break;
        default:
            // 默认为空，以防止无法匹配到任何工具时保持图标区域为空
            selectedToolCode.innerHTML = '';
            break;
    }

    // 更新选择列表中的工具显示/隐藏
    currentTool = tool;
    updateToolItemsVisibility(currentTool);

    if (shouldTriggerOnClick) {
        // 触发已选择工具的onclick效果
        const selectedToolElement = document.querySelector('.tool-item.active');
        if (selectedToolElement) {
            const onClick = selectedToolElement.getAttribute("onclick");
            if (onClick) {
                eval(onClick);
            }
        }
    }
}

// 获取对应工具的tooltip文本
function getToolTooltip(tool) {
    switch (tool) {
        case '标尺工具':
            return "标尺工具";
        case '比例叠加工具':
            return "比例叠加工具";
        case '角度工具':
            return "角度工具";
        case '柯布角工具':
            return "柯布角工具";
        case '双向工具':
            return "双向工具";
        default:
            return "";
    }
}

// // 新增：执行图标区域的onclick效果
// const iconContainer = document.getElementById("selected-icon-button");
// iconContainer.addEventListener("click", function (event) {
//     event.preventDefault();
//     triggerSelectedTool();
// });
//
// // 触发已选择工具的onclick效果
// function triggerSelectedTool() {
//     const selectedToolElement = document.querySelector('.tool-item.active');
//     if (selectedToolElement) {
//         const onClick = selectedToolElement.getAttribute("onclick");
//         if (onClick) {
//             eval(onClick);
//         }
//     }
// }

// 更新选择列表中的工具显示/隐藏
function updateToolItemsVisibility(currentTool) {
    const dropdownContent = document.getElementById("dropdown-content");
    const toolItems = dropdownContent.getElementsByClassName("tool-item");
    for (let i = 0; i < toolItems.length; i++) {
        const toolName = toolItems[i].getAttribute("data-original-title");
        if (toolName === currentTool) {
            toolItems[i].style.display = "none";
        } else {
            toolItems[i].style.display = "block";
        }
    }
}
