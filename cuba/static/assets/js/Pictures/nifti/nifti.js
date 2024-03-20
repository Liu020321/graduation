//加载cornerstoneNIFTIImageLoader.js
cornerstoneNIFTIImageLoader.external.cornerstone = cornerstone;
const ImageId = cornerstoneNIFTIImageLoader.nifti.ImageId;
let loaded = false;
//加载cornerstoneTools工具
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;

//初始化方法，从路径变量里获取到图像的名字，在赋值给downloadAndView函数
window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const niftiName = urlParams.get('imageId');
    downloadAndView(niftiName);
};

//从前端获取文件名字在这里执行
function downloadAndView(niftiName) {
    let url = `/Files/Nifti/${niftiName}`;
    loadAndViewImage(`nifti:${url}`);
}

cornerstoneTools.init({
    showSVGCursors: true,
});
//
let activeTool = null;

function activateTool(toolName) {
    if (activeTool === toolName) return; //

    //
    const toolMap = {
        // 1.长度工具
        Length:{mouseButtonMask: 1},
        // 2.鼠标滚轮工具
        StackScrollMouseWheel:{},
        // 3.屏幕触摸工具
        StackScrollMultiTouchTool:{mouseButtonMask: 1},
        // 4.放大器工具
        Magnify:{mouseButtonMask: 1},
        // 5.拖动探针工具
        DragProbe:{mouseButtonMask: 1},
        // 6.平移工具
        Pan:{mouseButtonMask: 1},
        // 7.比例叠加工具
        ScaleOverlay:{mouseButtonMask: 1},
        // 8.旋转工具
        Rotate:{mouseButtonMask: 1},
        // 9.WWWC区域工具
        WwwcRegion:{mouseButtonMask: 1},
        // 10.WWWC工具
        Wwwc:{mouseButtonMask: 1},
        // 11.鼠标缩放工具
        ZoomMouseWheel:{mouseButtonMask: 1},
        // 12.滑动缩放工具
        Zoom:{mouseButtonMask: 1},
        // 13.角度工具
        Angle:{mouseButtonMask: 1},
        // 14.箭头注释工具
        ArrowAnnotate:{mouseButtonMask: 1},
        // 15.双向工具
        Bidirectional:{mouseButtonMask: 1},
        // 16.柯布角工具
        CobbAngle:{mouseButtonMask: 1},
        // 17.椭圆工具
        EllipticalRoi:{mouseButtonMask: 1},
        // 18.画笔工具
        FreehandRoi:{mouseButtonMask: 1},
        // 19.探针定位工具
        Probe:{mouseButtonMask: 1},
        // 20.矩形工具
        RectangleRoi:{mouseButtonMask: 1},
        // 21.文本注释工具
        TextMarker:{mouseButtonMask: 1},
        // 22.堆栈滚动工具
        StackScroll:{mouseButtonMask: 1},
        // 23.自定义椭圆工具
        RotatedEllipticalRoi:{mouseButtonMask: 1},
        // 24.自定义数据信息工具
        ImageStatistics:{}
    };

    //
    if (toolName === 'ImageStatistics') {
        //
        cornerstoneTools.setToolEnabled('ImageStatistics');
    } else {
        //
        for (const tool in toolMap) {
            if (tool === toolName) {
                //
                cornerstoneTools.setToolActive(tool, toolMap[tool]);
            } else {
                //
                cornerstoneTools.setToolPassive(tool, toolMap[tool]);
            }
        }
    }
    //
    activeTool = toolName;
}
const urlParams1 = new URLSearchParams(window.location.search);
let dicUrl1 = urlParams1.get('imageId');
function loadr3(){
    window.location.href = `http://localhost:8081/viewNfi?imageId=${dicUrl1}`
}




function loadAndViewImage(imageId) {
    //获取图像信息
    const element = document.querySelector('.cornerstone-element');
    cornerstone.enable(element);
    const imageIdObject = ImageId.fromURL(imageId);

    try {
        cornerstone.loadAndCacheImage(imageIdObject.url).then(
            function (image) {
                console.log(image);
                //加载nifti图像
                const numberOfSlices = cornerstone.metaData.get(
                    'multiFrameModule',
                    imageIdObject.url
                ).numberOfFrames;
                const stack = {
                    currentImageIdIndex: imageIdObject.slice.index,
                    imageIds: Array.from(
                        Array(numberOfSlices),
                        (_, i) =>
                            `nifti:${imageIdObject.filePath}#${imageIdObject.slice.dimension}-${i}`
                    ),
                };

                //定义视图并添加显示
                const viewport = cornerstone.getDefaultViewportForImage(
                    element,
                    image
                );
                cornerstone.displayImage(element, image, viewport);
                cornerstoneTools.addStackStateManager(element, ['stack'])
                cornerstoneTools.addToolState(element, 'stack', stack)

                //定义长度工具并添加
                const LengthTool = cornerstoneTools['LengthTool'];
                cornerstoneTools.addTool(LengthTool);
                //鼠标滚动工具
                const StackScrollMouseWheelTool = cornerstoneTools.StackScrollMouseWheelTool
                cornerstoneTools.addTool(StackScrollMouseWheelTool)
                //屏幕触控显示工具
                const StackScrollMultiTouchTool = cornerstoneTools.StackScrollMultiTouchTool
                cornerstoneTools.addTool(StackScrollMultiTouchTool)
                //指针探针工具
                const DragProbeTool = cornerstoneTools.DragProbeTool;
                cornerstoneTools.addTool(DragProbeTool)
                //放大器工具
                const MagnifyTool = cornerstoneTools.MagnifyTool;
                cornerstoneTools.addTool(MagnifyTool)
                //方向标记工具
                const OrientationMarkersTool = cornerstoneTools.OrientationMarkersTool;
                cornerstoneTools.addTool(OrientationMarkersTool)
                //平移工具
                const PanTool = cornerstoneTools.PanTool;
                cornerstoneTools.addTool(PanTool)
                //旋转工具
                const RotateTool = cornerstoneTools.RotateTool;
                cornerstoneTools.addTool(RotateTool)
                //比例叠加工具
                const ScaleOverlayTool = cornerstoneTools.ScaleOverlayTool;
                cornerstoneTools.addTool(ScaleOverlayTool)
                //WWWC区域工具
                const WwwcRegionTool = cornerstoneTools.WwwcRegionTool;
                cornerstoneTools.addTool(WwwcRegionTool)
                //WWWC工具
                const WwwcTool = cornerstoneTools.WwwcTool;
                cornerstoneTools.addTool(WwwcTool)
                //鼠标滚轮缩放工具
                const ZoomMouseWheelTool = cornerstoneTools.ZoomMouseWheelTool;
                cornerstoneTools.addTool(ZoomMouseWheelTool)
                //滑动缩放工具
                const ZoomTool = cornerstoneTools.ZoomTool;
                cornerstoneTools.addTool(cornerstoneTools.ZoomTool, {
                    configuration: {
                        invert: false,
                        preventZoomOutsideImage: false,
                        minScale: .1,
                        maxScale: 20.0,
                    }
                });
                //角度工具
                const AngleTool = cornerstoneTools.AngleTool;
                cornerstoneTools.addTool(AngleTool)
                //箭头注释工具
                const ArrowAnnotateTool = cornerstoneTools.ArrowAnnotateTool;
                cornerstoneTools.addTool(ArrowAnnotateTool)
                //双向工具
                const BidirectionalTool = cornerstoneTools.BidirectionalTool;
                cornerstoneTools.addTool(BidirectionalTool)
                //柯布角工具
                const CobbAngleTool = cornerstoneTools.CobbAngleTool;
                cornerstoneTools.addTool(CobbAngleTool)
                //椭圆工具
                const EllipticalRoiTool = cornerstoneTools.EllipticalRoiTool;
                cornerstoneTools.addTool(EllipticalRoiTool)
                //画笔工具
                const FreehandRoiTool = cornerstoneTools.FreehandRoiTool;
                cornerstoneTools.addTool(FreehandRoiTool)
                //探针定位工具
                const ProbeTool = cornerstoneTools.ProbeTool;
                cornerstoneTools.addTool(ProbeTool)
                //矩形工具
                const RectangleRoiTool = cornerstoneTools.RectangleRoiTool;
                cornerstoneTools.addTool(RectangleRoiTool)
                //文本注释工具
                const TextMarkerTool = cornerstoneTools.TextMarkerTool
                const configuration = {
                    markers: ['F5', 'F4', 'F3', 'F2', 'F1'],
                    current: 'F5',
                    ascending: true,
                    loop: true,
                }
                cornerstoneTools.addTool(TextMarkerTool, {configuration})
                //堆栈滚动工具
                const StackScrollTool = cornerstoneTools.StackScrollTool;
                cornerstoneTools.addTool(StackScrollTool)
                //自定义数据信息工具
                const ImageStatisticsTool = ImageStatistics.default;
                cornerstoneTools.addTool(ImageStatisticsTool);
                //自定义椭圆工具
                cornerstoneTools.addTool(RotatedEllipticalRoiTool);


                if (loaded === false) {
                    console.log(cornerstoneTools.store);
                    //方向标记工具
                    cornerstoneTools.setToolActive('OrientationMarkers', {mouseButtonMask: 1})
                    //加载图片
                    loaded = true;
                }
            },
            function (err) {
                alert(err);
                console.error(err);
            }
        );
    } catch (err) {
        alert(err);
        console.error(err);
    }
}