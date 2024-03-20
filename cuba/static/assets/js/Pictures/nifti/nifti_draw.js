let currentTool4 = "画笔工具"; // 默认初始化的工具为长度工具

// 默认初始化使用长度工具的代码
document.addEventListener("DOMContentLoaded", function () {
    selectTool4(currentTool4, false);
});


// 控制点击选择按钮时弹出选择列表
function toggleDropdownMenu4(event) {
    const dropdownContent4 = document.getElementById("dropdown-content4");
    dropdownContent4.classList.toggle("show");
    event.stopPropagation(); // 阻止事件冒泡
}

// 点击文档其他区域时关闭选择列表
document.addEventListener("click", function (event) {
    const dropdownContent4 = document.getElementById("dropdown-content4");
    dropdownContent4.classList.remove("show");
});

function selectTool4(tool4, shouldTriggerOnClick4 = true) {
    const selectedToolCode4 = document.getElementById("selected-tool-code4");
    const tooltipText4 = getToolTooltip4(tool4); // 获取对应工具的tooltip文本
    selectedToolCode4.setAttribute("title", tooltipText4); // 设置tooltip文本


    switch (tool4) {
        case '画笔工具':
            selectedToolCode4.innerHTML = `
                <!-- 这里放置画笔工具的完整代码 -->
                <a 
                   href="#" onclick="selectTool4('画笔工具');activateTool('FreehandRoi')">
                    <i class="ri-cellphone-line1"></i>
                </a>
            `;
            break;
        case '椭圆工具':
            selectedToolCode4.innerHTML = `
                <!-- 这里放置椭圆工具的完整代码 -->
               
                               <a 
                    href="#" onclick="selectTool4('椭圆工具');activateTool('EllipticalRoi')">
                    <i class="ri-drop-line1"></i>
                </a>
            `;
            break;
        case '矩形工具':
            selectedToolCode4.innerHTML = `
                <!-- 这里放置矩形工具的完整代码 -->
                  <a 
                   href="#" onclick="selectTool4('矩形工具');activateTool('RectangleRoi')">
                    <i class="ri-tablet-line1"></i>
                </a>
            `;
            break;
        case '自定义椭圆工具':
            selectedToolCode4.innerHTML = `
                <!-- 这里放置自定义椭圆工具的完整代码 -->
                  <a 
                   href="#" onclick="selectTool4('自定义椭圆工具');activateTool('RotatedEllipticalRoi')">
                    <i class="ri-map-pin-line1"></i>
                </a>
            `;
            break;
        case '屏幕触控工具':
            selectedToolCode4.innerHTML = `
                <!-- 这里放置屏幕触控工具的完整代码 -->
                  <a 
                   href="#" onclick="selectTool4('屏幕触控工具');activateTool('StackScrollMultiTouchTool')">
                    <i class="ri-computer-line1"></i>
                </a>
            `;
            break;
        default:
            // 默认为空，以防止无法匹配到任何工具时保持图标区域为空
            selectedToolCode4.innerHTML = '';
            break;
    }

    // 更新选择列表中的工具显示/隐藏
    currentTool4 = tool4;
    updateToolItemsVisibility4(currentTool4);

    if (shouldTriggerOnClick4) {
        // 触发已选择工具的onclick效果
        const selectedToolElement4 = document.querySelector('.tool-item4.active');
        if (selectedToolElement4) {
            const onClick4 = selectedToolElement4.getAttribute("onclick");
            if (onClick4) {
                eval(onClick4);
            }
        }
    }
}

// // 新增：执行图标区域的onclick效果
// const iconContainer4 = document.getElementById("selected-icon-button4");
// iconContainer4.addEventListener("click", function (event) {
//     event.preventDefault();
//     triggerSelectedTool4();
// });
//
// // 触发已选择工具的onclick效果
// function triggerSelectedTool4() {
//     const selectedToolElement4 = document.querySelector('.tool-item4.active');
//     if (selectedToolElement4) {
//         const onClick4 = selectedToolElement4.getAttribute("onclick");
//         if (onClick4) {
//             eval(onClick4);
//         }
//     }
// }

function getToolTooltip4(tool4) {
    switch (tool4) {
        case '画笔工具':
            return "画笔工具";
        case '椭圆工具':
            return "椭圆工具";
        case '矩形工具':
            return "矩形工具";
        case '自定义椭圆工具':
            return "自定义椭圆工具";
        case '屏幕触控工具':
            return "屏幕触控工具";
        default:
            return "";
    }
}

// 更新选择列表中的工具显示/隐藏
function updateToolItemsVisibility4(currentTool4) {
    const dropdownContent4 = document.getElementById("dropdown-content4");
    const toolItems4 = dropdownContent4.getElementsByClassName("tool-item4");
    for (let i = 0; i < toolItems4.length; i++) {
        const toolName4 = toolItems4[i].getAttribute("data-original-title");
        if (toolName4 === currentTool4) {
            toolItems4[i].style.display = "none";
        } else {
            toolItems4[i].style.display = "block";
        }
    }
}

