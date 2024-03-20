

// Doing some dark magic here to make sure we don't add our
// synchronizer/tool until all canvases have rendered an image.
let canvasesReady = false;
let numImagesLoaded = 0;
const firstElement = document.getElementById('topgram_element');
const secondElement = document.getElementById('chest_element');

let synchronizer = new cornerstoneTools.Synchronizer(
    'cornerstonenewimage',
    cornerstoneTools.updateImageSynchronizer
);

// 默认使用cornerstonenewimage和cornerstoneTools.updateImageSynchronizer
let curTool = 'Wwwc';

function acTool(toame) {
    if (toame !== curTool) {
        if (synchronizer) {
            synchronizer.destroy();
        }

        curTool = toame;

        // 创建合适类型的synchronizer并赋值给全局的synchronizer变量
        if (curTool === 'Crosshairs') {
            synchronizer = new cornerstoneTools.Synchronizer(
                'cornerstonenewimage',
                cornerstoneTools.updateImageSynchronizer
            );
            // These have to be added to our synchronizer before we pass it to our tool
            synchronizer.add(firstElement);
            synchronizer.add(secondElement);
            const tool = cornerstoneTools.CrosshairsTool;
            cornerstoneTools.addTool(tool);
            cornerstoneTools.addTool(cornerstoneTools.ReferenceLinesTool);
            cornerstoneTools.setToolActive('Crosshairs', {
                mouseButtonMask: 1,
                synchronizationContext: synchronizer,
            });
            cornerstoneTools.setToolEnabled('ReferenceLines', {
                synchronizationContext: synchronizer,
            });

        } else if (curTool === 'Wwwc') {
            synchronizer = new cornerstoneTools.Synchronizer(
                'cornerstoneimagerendered',
                cornerstoneTools.wwwcSynchronizer
            );
            // These have to be added to our synchronizer before we pass it to our tool
            synchronizer.add(firstElement);
            synchronizer.add(secondElement);
            cornerstoneTools.addTool(cornerstoneTools.WwwcTool);
            cornerstoneTools.setToolActive('Wwwc', {
                mouseButtonMask: 1,
                synchronizationContext: synchronizer,
            });
        }

        synchronizer.enabled = true;
    }
}


function addCrosshairsTool() {


    //方向标记工具
    const OrientationMarkersTool = cornerstoneTools.OrientationMarkersTool;
    cornerstoneTools.addTool(OrientationMarkersTool);
    cornerstoneTools.setToolActive('OrientationMarkers', {mouseButtonMask: 1})
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
    cornerstoneTools.addTool(ZoomTool, {
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
}

let activeTool = null;

function activateTool(toolName) {
    if (activeTool === toolName) return; //

    //
    const toolMap = {
        // 1.长度工具
        Length: {mouseButtonMask: 1},
        // 2.鼠标滚轮工具
        StackScrollMouseWheel: {},
        // 3.屏幕触摸工具
        StackScrollMultiTouchTool: {mouseButtonMask: 1},
        // 4.放大器工具
        Magnify: {mouseButtonMask: 1},
        // 5.拖动探针工具
        DragProbe: {mouseButtonMask: 1},
        // 6.平移工具
        Pan: {mouseButtonMask: 1},
        // 7.比例叠加工具
        ScaleOverlay: {mouseButtonMask: 1},
        // 8.旋转工具
        Rotate: {mouseButtonMask: 1},
        // 9.WWWC区域工具
        WwwcRegion: {mouseButtonMask: 1},
        // 10.WWWC工具
        Wwwc: {mouseButtonMask: 1},
        // 11.鼠标缩放工具
        ZoomMouseWheel: {mouseButtonMask: 1},
        // 12.滑动缩放工具
        Zoom: {mouseButtonMask: 1},
        // 13.角度工具
        Angle: {mouseButtonMask: 1},
        // 14.箭头注释工具
        ArrowAnnotate: {mouseButtonMask: 1},
        // 15.双向工具
        Bidirectional: {mouseButtonMask: 1},
        // 16.柯布角工具
        CobbAngle: {mouseButtonMask: 1},
        // 17.椭圆工具
        EllipticalRoi: {mouseButtonMask: 1},
        // 18.画笔工具
        FreehandRoi: {mouseButtonMask: 1},
        // 19.探针定位工具
        Probe: {mouseButtonMask: 1},
        // 20.矩形工具
        RectangleRoi: {mouseButtonMask: 1},
        // 21.文本注释工具
        TextMarker: {mouseButtonMask: 1},
        // 22.堆栈滚动工具
        StackScroll: {mouseButtonMask: 1},
        // 23.自定义椭圆工具
        RotatedEllipticalRoi: {mouseButtonMask: 1},
        // 24.自定义数据信息工具
        ImageStatistics: {},
        Crosshairs: {
            mouseButtonMask: 1,
            synchronizationContext: synchronizer,
        },
        ReferenceLines: {
            mouseButtonMask: 1,
            synchronizationContext: synchronizer,
        },
    };

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

const handleImageRendered = (evt) => {
    evt.detail.element.removeEventListener('cornerstoneimagerendered', handleImageRendered)

    numImagesLoaded++;
    if (numImagesLoaded === 2) {
        addCrosshairsTool();
    }
}
firstElement.addEventListener('cornerstoneimagerendered', handleImageRendered)
secondElement.addEventListener('cornerstoneimagerendered', handleImageRendered)


window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const dicUrl = urlParams.get('imageId');

    const baseUrl = `/Files/Dicom/${dicUrl}/`;
    loadAndView(baseUrl);
}
const urlParams = new URLSearchParams(window.location.search);
let dicUrl1 = urlParams.get('imageId');
function loadr(){
    window.location.href = `http://localhost:8081/viewDicom?imageId=${dicUrl1}`
}
_initCornerstone();
_initInterface();
const toolName = 'Crosshairs';

function loadAndView(baseUrl){
    const topgramElement = document.getElementById('topgram_element');
    const chestElement = document.getElementById('chest_element');
    const elements = [topgramElement, chestElement];

    // Init CornerstoneTools
    cornerstoneTools.init({
        globalToolSyncEnabled: true,
        showSVGCursors: true,
    });
    // image enable the dicomImage element and add canvas to it
    elements.forEach(element => {
        cornerstone.enable(element);
    });

    const topgramImageIds = [
        `wadouri:${baseUrl}1-1.dcm`,
    ];

    const chestImageIds = new Array();
    for (let i = 1; i <= 230; i++) {
        let number = i.toString().padStart(3, '0');
        let filename = `1-${number}.dcm`;
        chestImageIds.push(
            `wadouri:${baseUrl}${filename}`
        );
    }

    const chestStack = {
        currentImageIdIndex: 0,
        imageIds: chestImageIds,
    };

    const topgramStack = {
        currentImageIdIndex: 0,
        imageIds: topgramImageIds,
    };

    // Add Default tools; set them active
    cornerstoneTools.addTool(cornerstoneTools.StackScrollTool);
    cornerstoneTools.addTool(cornerstoneTools.StackScrollMouseWheelTool);
    // cornerstoneTools.setToolActive('StackScroll', {mouseButtonMask: 1});
    // cornerstoneTools.setToolActive('StackScrollMouseWheel', {});


    loadSeries(cornerstone, chestImageIds, chestElement, chestStack);
    loadSeries(cornerstone, topgramImageIds, topgramElement, topgramStack);

}

function loadSeries(cornerstone, imageIds, element, stack) {

    // Cache all images and metadata
    imageIds.forEach(imageId => cornerstone.loadAndCacheImage(imageId));

    // Load and display first image in stack
    return cornerstone.loadImage(imageIds[0]).then(image => {
        // display this image
        cornerstone.displayImage(element, image);

        // set the stack as tool state
        cornerstoneTools.addStackStateManager(element, ['stack', toolName]);
        cornerstoneTools.addToolState(element, 'stack', stack);

    });
}

function _initCornerstone() {
    // Externals
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
    cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
    cornerstoneTools.external.cornerstone = cornerstone;
    cornerstoneTools.external.Hammer = Hammer;

    // Image Loader
    const config = {
        webWorkerPath: `http://localhost:8081/js/cornerstone/cornerstoneWADOImageLoaderWebWorker.js`,
        taskConfiguration: {
            decodeTask: {
                codecsPath: `http://localhost:8081/js/cornerstone/cornerstoneWADOImageLoaderCodecs.js`,
            },
        },
    };
    cornerstoneWADOImageLoader.webWorkerManager.initialize(config);
}

/***
 *
 *
 */
function _initInterface() {
    const handleClick = function (evt) {
        const action = this.dataset.action;
        const options = {
            mouseButtonMask:
                evt.buttons || convertMouseEventWhichToButtons(evt.which),
        };

        cornerstoneTools[`setTool${action}`](toolName, options);

        // Remove active style from all buttons
        const buttons = document.querySelectorAll('.set-tool-mode');
        buttons.forEach(btn => {
            btn.classList.remove('is-primary');
        });

        // Add active style to this button
        this.classList.add('is-primary');

        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        return false;
    };

    const buttons = document.querySelectorAll('.set-tool-mode');

    buttons.forEach(btn => {
        btn.addEventListener('contextmenu', handleClick);
        btn.addEventListener('auxclick', handleClick);
        btn.addEventListener('click', handleClick);
    });
}

const convertMouseEventWhichToButtons = which => {
    switch (which) {
        // no button
        case 0:
            return 0;
        // left
        case 1:
            return 1;
        // middle
        case 2:
            return 4;
        // right
        case 3:
            return 2;
    }
    return 0;
};