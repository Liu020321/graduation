(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('cornerstone-math'), require('cornerstone-core'), require('cornerstone-tools')) :
    typeof define === 'function' && define.amd ? define(['cornerstone-math', 'cornerstone-core', 'cornerstone-tools'], factory) :
    (global.RotatedEllipticalRoiTool = factory(global.cornerstoneMath,global.cornerstone,global.cornerstoneTools));
}(this, (function (cornerstoneMath,cornerstone,cornerstoneTools) { 'use strict';

    cornerstoneMath = cornerstoneMath && cornerstoneMath.hasOwnProperty('default') ? cornerstoneMath['default'] : cornerstoneMath;
    cornerstone = cornerstone && cornerstone.hasOwnProperty('default') ? cornerstone['default'] : cornerstone;
    cornerstoneTools = cornerstoneTools && cornerstoneTools.hasOwnProperty('default') ? cornerstoneTools['default'] : cornerstoneTools;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var MouseCursor = cornerstoneTools.import('tools/cursors/MouseCursor');
    var rotatedEllipticalRoiCursor = new MouseCursor("<ellipse stroke=\"ACTIVE_COLOR\" fill=\"none\" stroke-width=\"3\" cx=\"16\" cy=\"16\" rx=\"14\" ry=\"8\" transform=\"rotate(30, 16, 16)\"/>", {
        viewBox: {
            x: 32,
            y: 32,
        },
    });

    /**
     * Returns true if a point is within an ellipse
     * @export @public @method
     * @name pointInEllipse
     *
     * @param  {Object} ellipse  Object defining the ellipse.
     * @param  {Object} location The location of the point.
     * @param  {Number} theta The angle of ellipse.
     * @returns {boolean} True if the point is within the ellipse.
     */
    function pointInRotatedEllipse (ellipse, location, theta) {
        var xRadius = ellipse.xRadius, yRadius = ellipse.yRadius, center = ellipse.center;
        if (xRadius <= 0.0 || yRadius <= 0.0) {
            return false;
        }
        var normalized = {
            x: location.x - center.x,
            y: location.y - center.y,
        };
        var square = function (x) { return x * x; };
        /*
         * ((𝑋−𝐶𝑥)cos(𝜃)+(𝑌−𝐶𝑦)sin(𝜃))^2 / (Rx)^2
         * + ((𝑋−𝐶𝑥)sin(𝜃)−(𝑌−𝐶𝑦)cos(𝜃))^2 / (𝑅𝑦)^2 * <= 1
         */
        var ll = normalized.x * Math.cos(theta);
        var lr = normalized.y * Math.sin(theta);
        var rl = normalized.x * Math.sin(theta);
        var rr = normalized.y * Math.cos(theta);
        var r = square(ll + lr) / square(xRadius) + square(rl - rr) / square(yRadius) <= 1.0;
        return r;
    }

    var _a = cornerstoneTools.store, getters = _a.getters, state = _a.state;
    var BaseAnnotationTool = cornerstoneTools.import('base/baseAnnotationTool');
    var BaseBrushTool = cornerstoneTools.import('base/BaseBrushTool');
    var getActiveToolsForElement = function (element, tools, handlerType) {
        if (handlerType === void 0) { handlerType = undefined; }
        return tools.filter(function (tool) {
            return tool.element === element &&
                tool.mode === 'active' &&
                (handlerType === undefined || tool.options["is" + handlerType + "Active"]);
        });
    };
    var filterToolsUseableWithMultiPartTools = function (tools) {
        return tools.filter(function (tool) {
            return !tool.isMultiPartTool &&
                !(tool instanceof BaseAnnotationTool) &&
                !(tool instanceof BaseBrushTool);
        });
    };
    function getActiveTool(element, buttons, interactionType) {
        if (interactionType === void 0) { interactionType = 'mouse'; }
        var tools;
        if (interactionType === 'touch') {
            tools = getActiveToolsForElement(element, getters.touchTools());
            tools = tools.filter(function (tool) { return tool.options.isTouchActive; });
        }
        else {
            // Filter out disabled, enabled, and passive
            tools = getActiveToolsForElement(element, getters.mouseTools());
            // Filter out tools that do not match mouseButtonMask
            tools = tools.filter(function (tool) {
                return Array.isArray(tool.options.mouseButtonMask) &&
                    buttons &&
                    tool.options.mouseButtonMask.includes(buttons) &&
                    tool.options.isMouseActive;
            });
            if (state.isMultiPartToolActive) {
                tools = filterToolsUseableWithMultiPartTools(tools);
            }
        }
        if (tools.length === 0) {
            return;
        }
        return tools[0];
    }

    var EVENTS = cornerstoneTools.EVENTS;
    var triggerEvent = cornerstoneTools.import('util/triggerEvent');
    var clipToBox = cornerstoneTools.import('util/clipToBox');
    var BaseAnnotationTool$1 = cornerstoneTools.import('base/BaseAnnotationTool');
    function getCenter(handles) {
        var start = handles.start, end = handles.end;
        var w = Math.abs(start.x - end.x);
        var h = Math.abs(start.y - end.y);
        var xMin = Math.min(start.x, end.x);
        var yMin = Math.min(start.y, end.y);
        var center = {
            x: xMin + w / 2,
            y: yMin + h / 2,
        };
        return center;
    }
    function movePerpendicularHandle (mouseEventData, toolType, data, handle, doneMovingCallback, preventHandleOutsideImage) {
        var image = mouseEventData.image, currentPoints = mouseEventData.currentPoints, element = mouseEventData.element, buttons = mouseEventData.buttons;
        var distanceFromTool = {
            x: handle.x - currentPoints.image.x,
            y: handle.y - currentPoints.image.y,
        };
        var columns = mouseEventData.image.columns;
        function mouseDragCallback(e) {
            var eventData = e.detail;
            if (handle.hasMoved === false) {
                handle.hasMoved = true;
            }
            handle.active = true;
            var _a = data.handles, start = _a.start, end = _a.end;
            var center = getCenter(data.handles);
            var inclination = (end.y - start.y) / (end.x - start.x);
            var rInclination = -(1 / inclination);
            var b = center.y - rInclination * center.x;
            var bb = eventData.currentPoints.image.y +
                distanceFromTool.y -
                inclination * (eventData.currentPoints.image.x + distanceFromTool.x);
            var f = function (a, x, b) { return a * x + b; };
            if (handle.key === 'perpendicular') {
                var longLine = {
                    start: {
                        x: 0,
                        y: f(rInclination, 0, b),
                    },
                    end: {
                        x: columns,
                        y: f(rInclination, columns, b),
                    },
                };
                var shortLine = {
                    start: {
                        x: 0,
                        y: f(inclination, 0, bb),
                    },
                    end: {
                        x: columns,
                        y: f(inclination, columns, bb),
                    },
                };
                var intersection = cornerstoneMath.lineSegment.intersectLine(longLine, shortLine);
                var square = function (x) { return x * x; };
                var shortestDistance = Math.sqrt(square(intersection.x - center.x) + square(intersection.y - center.y));
                data.shortestDistance = shortestDistance;
                handle.x = intersection.x;
                handle.y = intersection.y;
            }
            else {
                handle.x = eventData.currentPoints.image.x + distanceFromTool.x;
                handle.y = eventData.currentPoints.image.y + distanceFromTool.y;
                center = getCenter(data.handles);
                var theta = Math.atan(rInclination);
                data.handles.perpendicularPoint.x =
                    center.x - data.shortestDistance * Math.cos(theta);
                data.handles.perpendicularPoint.y =
                    center.y - data.shortestDistance * Math.sin(theta);
            }
            if (preventHandleOutsideImage) {
                clipToBox(handle, eventData.image);
            }
            cornerstone.updateImage(element);
            // todo
            var activeTool = getActiveTool(element, buttons, 'mouse');
            if (activeTool instanceof BaseAnnotationTool$1) {
                activeTool.updateCachedStats(image, element, data);
            }
            var eventType = EVENTS.MEASUREMENT_MODIFIED;
            var modifiedEventData = {
                toolType: toolType,
                element: element,
                measurementData: data,
            };
            triggerEvent(element, eventType, modifiedEventData);
        }
        element.addEventListener(EVENTS.MOUSE_DRAG, mouseDragCallback);
        function mouseUpCallback() {
            handle.active = false;
            element.removeEventListener(EVENTS.MOUSE_DRAG, mouseDragCallback);
            element.removeEventListener(EVENTS.MOUSE_UP, mouseUpCallback);
            element.removeEventListener(EVENTS.MOUSE_CLICK, mouseUpCallback);
            cornerstone.updateImage(element);
            if (typeof doneMovingCallback === 'function') {
                doneMovingCallback();
            }
        }
        element.addEventListener(EVENTS.MOUSE_UP, mouseUpCallback);
        element.addEventListener(EVENTS.MOUSE_CLICK, mouseUpCallback);
    }

    var path = cornerstoneTools.import('drawing/path');
    /**
     * Translate a point using a rotation angle.
     * @export @public @method
     * @name rotatePoint
     *
     * @param {Object} point - `{ x, y }` in either pixel or canvas coordinates.
     * @param {Object} center - `{ x, y }` in either pixel or canvas coordinates.
     * @param {Number} angle - angle in degrees
     * @returns {Object} - `{ x, y }` new point translated
     */
    function rotatePoint(point, center, angle) {
        var angleRadians = angle * (Math.PI / 180); // Convert to radians
        var rotatedX = Math.cos(angleRadians) * (point.x - center.x) -
            Math.sin(angleRadians) * (point.y - center.y) +
            center.x;
        var rotatedY = Math.sin(angleRadians) * (point.x - center.x) +
            Math.cos(angleRadians) * (point.y - center.y) +
            center.y;
        return {
            x: rotatedX,
            y: rotatedY,
        };
    }
    /**
     * Draw an ellipse within the bounding box defined by `corner1` and `corner2`.
     * @public
     * @method drawRotatedEllipse
     * @memberof Drawing
     *
     * @param {CanvasRenderingContext2D} context - Target context
     * @param {HTMLElement} element - The DOM Element to draw on
     * @param {Object} corner1 - `{ x, y }` in either pixel or canvas coordinates.
     * @param {Object} corner2 - `{ x, y }` in either pixel or canvas coordinates.
     * @param {Object} corner3 - `{ x, y }` in either pixel or canvas coordinates.
     * @param {Object} options - See {@link path}
     * @param {String} [coordSystem='pixel'] - Can be "pixel" (default) or "canvas". The coordinate
     *     system of the points passed in to the function. If "pixel" then cornerstone.pixelToCanvas
     *     is used to transform the points from pixel to canvas coordinates.
     * @param {Number} initialRotation - Ellipse initial rotation
     * @returns {undefined}
     */
    function drawRotatedEllipse (context, element, corner1, corner2, corner3, options, coordSystem, initialRotation) {
        if (coordSystem === void 0) { coordSystem = 'pixel'; }
        if (initialRotation === void 0) { initialRotation = 0.0; }
        var isFirst = corner3.isFirst;
        if (coordSystem === 'pixel') {
            corner1 = cornerstone.pixelToCanvas(element, corner1);
            corner2 = cornerstone.pixelToCanvas(element, corner2);
            corner3 = cornerstone.pixelToCanvas(element, corner3);
        }
        var viewport = cornerstone.getViewport(element);
        // Calculate the center of the image
        var width = element.clientWidth, height = element.clientHeight;
        var scale = viewport.scale, translation = viewport.translation;
        var rotation = viewport.rotation - initialRotation;
        var centerPoint = {
            x: width / 2 + translation.x * scale,
            y: height / 2 + translation.y * scale,
        };
        if (Math.abs(rotation) > 0.05) {
            corner1 = rotatePoint(corner1, centerPoint, -rotation);
            corner2 = rotatePoint(corner2, centerPoint, -rotation);
            corner3 = cornerstone.pixelToCanvas(element, corner3);
        }
        var w = Math.abs(corner1.x - corner2.x);
        var h = Math.abs(corner1.y - corner2.y);
        var xMin = Math.min(corner1.x, corner2.x);
        var yMin = Math.min(corner1.y, corner2.y);
        var center = {
            x: xMin + w / 2,
            y: yMin + h / 2,
        };
        if (Math.abs(rotation) > 0.05) {
            center = rotatePoint(center, centerPoint, rotation);
        }
        var square = function (x) { return x * x; };
        var longestDistance = Math.sqrt(square(w) + square(h));
        var shortestDistance = isFirst
            ? 0
            : Math.sqrt(square(corner3.x - center.x) + square(corner3.y - center.y));
        var angle = (rotation * Math.PI) / 180 +
            Math.atan2(corner2.y - corner1.y, corner2.x - corner1.x);
        path(context, options, function (context) {
            context.ellipse(center.x, center.y, longestDistance / 2, shortestDistance, angle, 0, Math.PI * 2);
        });
    }

    /**
     * Determine the coordinates that will place the textbox to the right of the
     * annotation, taking rotation, hflip, and vflip into account.
     *
     * @param {Object} viewport - The object that stores rotation, hflip, and vflip.
     * @param {Object} handles - The handles of the annotation.
     * @returns {Object} - The coordinates for default placement of the textbox
     */
    function getROITextBoxCoords(viewport, handles) {
        var corners = _determineCorners(handles);
        var centerX = (corners.left.x + corners.right.x) / 2;
        var centerY = (corners.top.y + corners.bottom.y) / 2;
        var textBox = {};
        if (viewport.rotation >= 0 && viewport.rotation < 90) {
            textBox.x = viewport.hflip ? corners.left.x : corners.right.x;
            textBox.y = centerY;
        }
        if (viewport.rotation >= 90 && viewport.rotation < 180) {
            textBox.x = centerX;
            textBox.y = viewport.vflip ? corners.bottom.y : corners.top.y;
        }
        if (viewport.rotation >= 180 && viewport.rotation < 270) {
            textBox.x = viewport.hflip ? corners.right.x : corners.left.x;
            textBox.y = centerY;
        }
        if (viewport.rotation >= 270 && viewport.rotation < 360) {
            textBox.x = centerX;
            textBox.y = viewport.vflip ? corners.top.y : corners.bottom.y;
        }
        return textBox;
    }
    /**
     * Determine the handles that have the min/max x and y values.
     *
     * @param {Object} handles - The handles of the annotation.
     * @returns {Object} - The top, left, bottom, and right handles
     */
    function _determineCorners(handles) {
        var handlesLeftToRight = [handles.start, handles.end].sort(_compareX);
        var handlesTopToBottom = [handles.start, handles.end].sort(_compareY);
        var left = handlesLeftToRight[0];
        var right = handlesLeftToRight[handlesLeftToRight.length - 1];
        var top = handlesTopToBottom[0];
        var bottom = handlesTopToBottom[handlesTopToBottom.length - 1];
        return {
            top: top,
            left: left,
            bottom: bottom,
            right: right,
        };
        function _compareX(a, b) {
            return a.x < b.x ? -1 : 1;
        }
        function _compareY(a, b) {
            return a.y < b.y ? -1 : 1;
        }
    }

    /**
     * Calculates the statistics of an elliptical region of interest.
     *
     * @private
     * @function calculateRotatedEllipseStatistics
     *
     * @param {number[]} sp - Array of the image data's pixel values.
     * @param {Object} ellipse - { top, left, height, width, xRadius, yRadius } - An object describing the ellipse.
     * @param {number} theta - a inclination angle this ellipse
     * @returns {Object} { count, mean, variance, stdDev, min, max }
     */
    function calculateRotatedEllipseStatistics (sp, ellipse, theta) {
        var sum = 0;
        var sumSquared = 0;
        var count = 0;
        var index = 0;
        var min = null;
        var max = null;
        for (var y = ellipse.top; y < ellipse.top + ellipse.height; y++) {
            for (var x = ellipse.left; x < ellipse.left + ellipse.width; x++) {
                var point = {
                    x: x,
                    y: y,
                };
                if (pointInRotatedEllipse(ellipse, point, theta)) {
                    if (min === null) {
                        min = sp[index];
                        max = sp[index];
                    }
                    sum += sp[index];
                    sumSquared += sp[index] * sp[index];
                    min = Math.min(min, sp[index]);
                    max = Math.max(max, sp[index]);
                    count++;
                }
                index++;
            }
        }
        if (count === 0) {
            return {
                count: count,
                mean: 0.0,
                variance: 0.0,
                stdDev: 0.0,
                min: 0.0,
                max: 0.0,
            };
        }
        var mean = sum / count;
        var variance = sumSquared / count - mean * mean;
        return {
            count: count,
            mean: mean,
            variance: variance,
            stdDev: Math.sqrt(variance),
            min: min,
            max: max,
        };
    }

    var _a$1 = cornerstoneTools.store, state$1 = _a$1.state, modules = _a$1.modules;
    var globalConfiguration = modules.globalConfiguration;
    /**
     * Creates an SVG Cursor for the target element
     *
     * @param {HTMLElement} element - The DOM Element to draw on
     * @param {MouseCursor} svgCursor - The cursor.
     * @returns {void}
     */
    function setToolCursor(element, svgCursor) {
        if (!globalConfiguration.configuration.showSVGCursors) {
            return;
        }
        // TODO: (state vs options) Exit if cursor wasn't updated
        // TODO: Exit if invalid options to create cursor
        // Note: Max size of an SVG cursor is 128x128, default is 32x32.
        var cursorBlob = svgCursor.getIconWithPointerSVG();
        var mousePoint = svgCursor.mousePoint;
        var svgCursorUrl = window.URL.createObjectURL(cursorBlob);
        element.style.cursor = "url('" + svgCursorUrl + "') " + mousePoint + ", auto";
        state$1.svgCursorUrl = svgCursorUrl;
    }

    var BaseAnnotationTool$2 = cornerstoneTools.import('base/BaseAnnotationTool');
    var throttle = cornerstoneTools.import('util/throttle');
    var EVENTS$1 = cornerstoneTools.EVENTS;
    var getLogger = cornerstoneTools.import('util/getLogger');
    var logger = getLogger('tools:annotation:RotatedEllipticalRoiTool');
    var handleActivator = cornerstoneTools.import('manipulators/handleActivator');
    var anyHandlesOutsideImage = cornerstoneTools.import('manipulators/anyHandlesOutsideImage');
    var getHandleNearImagePoint = cornerstoneTools.import('manipulators/getHandleNearImagePoint');
    var moveAllHandles = cornerstoneTools.import('manipulators/moveAllHandles');
    var moveNewHandle = cornerstoneTools.import('manipulators/moveNewHandle');
    var getPixelSpacing = cornerstoneTools.import('util/getPixelSpacing');
    var getNewContext = cornerstoneTools.import('drawing/getNewContext');
    var draw = cornerstoneTools.import('drawing/draw');
    var setShadow = cornerstoneTools.import('drawing/setShadow');
    var drawHandles = cornerstoneTools.import('drawing/drawHandles');
    var drawLinkedTextBox = cornerstoneTools.import('drawing/drawLinkedTextBox');
    var numbersWithCommas = cornerstoneTools.import('util/numbersWithCommas');
    var calculateSUV = cornerstoneTools.import('util/calculateSUV');
    var RotatedEllipticalRoiTool = /** @class */ (function (_super) {
        __extends(RotatedEllipticalRoiTool, _super);
        function RotatedEllipticalRoiTool(props) {
            if (props === void 0) { props = {}; }
            var _this = this;
            var defaultProps = {
                name: 'RotatedEllipticalRoi',
                supportedInteractionTypes: ['Mouse', 'Touch'],
                configuration: {
                // showMinMax: false,
                // showHounsfieldUnits: true,
                },
                svgCursor: rotatedEllipticalRoiCursor,
            };
            _this = _super.call(this, props, defaultProps) || this;
            _this.throttledUpdateCachedStats = throttle(_this.updateCachedStats, 110);
            return _this;
        }
        RotatedEllipticalRoiTool.prototype.addNewMeasurement = function (evt) {
            var _this = this;
            var eventData = evt.detail;
            var element = eventData.element, image = eventData.image;
            var measurementData = this.createNewMeasurement(eventData);
            cornerstoneTools.addToolState(element, this.name, measurementData);
            var end = measurementData.handles.end;
            cornerstone.updateImage(element);
            moveNewHandle(eventData, this.name, measurementData, end, {}, 'mouse', function () {
                if (anyHandlesOutsideImage(eventData, measurementData.handles)) {
                    // Delete the measurement
                    cornerstoneTools.removeToolState(element, _this.name, measurementData);
                }
                else {
                    var center = getCenter$1(measurementData.handles);
                    measurementData.handles.perpendicularPoint.x = center.x;
                    measurementData.handles.perpendicularPoint.y = center.y;
                    measurementData.handles.perpendicularPoint.isFirst = false;
                    _this.updateCachedStats(image, element, measurementData);
                    cornerstone.triggerEvent(element, EVENTS$1.MEASUREMENT_COMPLETED, measurementData);
                }
            });
        };
        RotatedEllipticalRoiTool.prototype.createNewMeasurement = function (eventData) {
            var goodEventData = eventData && eventData.currentPoints && eventData.currentPoints.image;
            if (!goodEventData) {
                logger.error("required eventData not supplied to tool " + this.name + "'s createNewMeasurement");
                return;
            }
            return {
                visible: true,
                active: true,
                color: undefined,
                invalidated: true,
                shortestDistance: 0,
                handles: {
                    start: {
                        x: eventData.currentPoints.image.x,
                        y: eventData.currentPoints.image.y,
                        highlight: true,
                        active: false,
                        key: 'start',
                    },
                    end: {
                        x: eventData.currentPoints.image.x,
                        y: eventData.currentPoints.image.y,
                        highlight: true,
                        active: true,
                        key: 'end',
                    },
                    perpendicularPoint: {
                        x: eventData.currentPoints.image.x,
                        y: eventData.currentPoints.image.y,
                        highlight: true,
                        active: false,
                        isFirst: true,
                        key: 'perpendicular',
                    },
                    initialRotation: eventData.viewport.rotation,
                    textBox: {
                        active: false,
                        hasMoved: false,
                        movesIndependently: false,
                        drawnIndependently: true,
                        allowedOutsideImage: true,
                        hasBoundingBox: true,
                    },
                },
            };
        };
        RotatedEllipticalRoiTool.prototype.pointNearTool = function (element, data, coords, interactionType) {
            if (interactionType === void 0) { interactionType = 'mouse'; }
            var hasStartAndEndHandles = data && data.handles && data.handles.start && data.handles.end;
            var validParameters = hasStartAndEndHandles;
            if (!validParameters) {
                logger.warn("invalid parameters supplied to tool " + this.name + "'s pointNearTool");
            }
            if (!validParameters || data.visible === false) {
                return false;
            }
            var distance = interactionType === 'mouse' ? 15 : 25;
            var center = getCenter$1(data.handles);
            var startCanvas = cornerstone.pixelToCanvas(element, data.handles.start);
            var endCanvas = cornerstone.pixelToCanvas(element, data.handles.end);
            var perpendicularCanvas = cornerstone.pixelToCanvas(element, data.handles.perpendicularPoint);
            var centerCanvas = cornerstone.pixelToCanvas(element, center);
            var square = function (x) { return x * x; };
            var minorEllipse = {
                xRadius: Math.sqrt(square(startCanvas.x - endCanvas.x) +
                    square(startCanvas.y - endCanvas.y)) /
                    2 -
                    distance / 2,
                yRadius: Math.sqrt(square(perpendicularCanvas.x - centerCanvas.x) +
                    square(perpendicularCanvas.y - centerCanvas.y)) -
                    distance / 2,
                center: centerCanvas,
            };
            var majorEllipse = {
                xRadius: Math.sqrt(square(startCanvas.x - endCanvas.x) +
                    square(startCanvas.y - endCanvas.y)) /
                    2 +
                    distance / 2,
                yRadius: Math.sqrt(square(perpendicularCanvas.x - centerCanvas.x) +
                    square(perpendicularCanvas.y - centerCanvas.y)) +
                    distance / 2,
                center: centerCanvas,
            };
            var theta = Math.atan2(endCanvas.y - startCanvas.y, endCanvas.x - startCanvas.x);
            var pointInMinorEllipse = pointInRotatedEllipse(minorEllipse, coords, theta);
            var pointInMajorEllipse = pointInRotatedEllipse(majorEllipse, coords, theta);
            if (pointInMajorEllipse && !pointInMinorEllipse) {
                return true;
            }
            return false;
        };
        RotatedEllipticalRoiTool.prototype.mouseMoveCallback = function (e) {
            var eventData = e.detail;
            var element = eventData.element;
            cornerstoneTools.toolCoordinates.setCoords(eventData);
            // If we have no tool data for this element, do nothing
            var toolData = cornerstoneTools.getToolState(element, this.name);
            if (!toolData) {
                return;
            }
            // We have tool data, search through all data
            // And see if we can activate a handle
            var imageNeedsUpdate = false;
            for (var i = 0; i < toolData.data.length; i++) {
                // Get the cursor position in canvas coordinates
                var coords = eventData.currentPoints.canvas;
                var data = toolData.data[i];
                if (handleActivator(eventData.element, data.handles, coords) === true) {
                    imageNeedsUpdate = true;
                }
                if ((this.pointNearTool(element, data, coords) && !data.active) ||
                    (!this.pointNearTool(element, data, coords) && data.active)) {
                    data.active = !data.active;
                    imageNeedsUpdate = true;
                }
            }
            // Handle activation status changed, redraw the image
            if (imageNeedsUpdate === true) {
                cornerstone.updateImage(eventData.element);
            }
        };
        RotatedEllipticalRoiTool.prototype.handleSelectedCallback = function (e) {
            var _this = this;
            var eventData = e.detail;
            var data;
            var element = eventData.element;
            var handleDoneMove = function (handle) {
                data.invalidated = true;
                if (anyHandlesOutsideImage(eventData, data.handles)) {
                    // Delete the measurement
                    cornerstoneTools.removeToolState(element, _this.name, data);
                }
                if (handle) {
                    handle.moving = false;
                    handle.selected = true;
                }
                setToolCursor(_this.element, _this.svgCursor);
                cornerstone.updateImage(element);
                element.addEventListener(EVENTS$1.MOUSE_MOVE, _this.mouseMoveCallback);
                element.addEventListener(EVENTS$1.TOUCH_START, _this._moveCallback);
            };
            var coords = eventData.startPoints.canvas;
            var toolData = cornerstoneTools.getToolState(e.currentTarget, this.name);
            if (!toolData) {
                return;
            }
            var i;
            // Now check to see if there is a handle we can move
            for (i = 0; i < toolData.data.length; i++) {
                data = toolData.data[i];
                var distance = 6;
                var handle = getHandleNearImagePoint(element, data.handles, coords, distance);
                if (handle) {
                    element.removeEventListener(EVENTS$1.MOUSE_MOVE, this.mouseMoveCallback);
                    data.active = true;
                    movePerpendicularHandle(eventData, this.name, data, handle, handleDoneMove, true);
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                    e.preventDefault();
                    return;
                }
            }
            // Now check to see if there is a line we can move
            // Now check to see if we have a tool that we can move
            if (!this.pointNearTool) {
                return;
            }
            var opt = {
                deleteIfHandleOutsideImage: true,
                preventHandleOutsideImage: false,
            };
            for (i = 0; i < toolData.data.length; i++) {
                data = toolData.data[i];
                data.active = false;
                if (this.pointNearTool(element, data, coords)) {
                    data.active = true;
                    element.removeEventListener(EVENTS$1.MOUSE_MOVE, this.mouseMoveCallback);
                    moveAllHandles(e, data, toolData, this.name, opt, handleDoneMove);
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                    e.preventDefault();
                    return;
                }
            }
        };
        RotatedEllipticalRoiTool.prototype.updateCachedStats = function (image, element, data) {
            var seriesModule = cornerstone.metaData.get('generalSeriesModule', image.imageId) || {};
            var modality = seriesModule.modality;
            var pixelSpacing = getPixelSpacing(image);
            var stats = _calculateStats(image, element, data.handles, modality, pixelSpacing);
            data.cachedStats = stats;
            data.invalidated = false;
        };
        RotatedEllipticalRoiTool.prototype.renderToolData = function (evt) {
            var _this = this;
            var toolData = cornerstoneTools.getToolState(evt.currentTarget, this.name);
            if (!toolData) {
                return;
            }
            var eventData = evt.detail;
            var image = eventData.image, element = eventData.element;
            var lineWidth = cornerstoneTools.toolStyle.getToolWidth();
            var _a = this.configuration, handleRadius = _a.handleRadius, drawHandlesOnHover = _a.drawHandlesOnHover;
            var context = getNewContext(eventData.canvasContext.canvas);
            var _b = getPixelSpacing(image), rowPixelSpacing = _b.rowPixelSpacing, colPixelSpacing = _b.colPixelSpacing;
            // Meta
            var seriesModule = cornerstone.metaData.get('generalSeriesModule', image.imageId) || {};
            // Pixel Spacing
            var modality = seriesModule.modality;
            var hasPixelSpacing = rowPixelSpacing && colPixelSpacing;
            draw(context, function (context) {
                // If we have tool data for this element - iterate over each set and draw it
                for (var i = 0; i < toolData.data.length; i++) {
                    var data = toolData.data[i];
                    if (data.visible === false) {
                        continue;
                    }
                    // Configure
                    var color = cornerstoneTools.toolColors.getColorIfActive(data);
                    var handleOptions = {
                        color: color,
                        handleRadius: handleRadius,
                        drawHandlesIfActive: drawHandlesOnHover,
                    };
                    setShadow(context, _this.configuration);
                    // Draw
                    drawRotatedEllipse(context, element, data.handles.start, data.handles.end, data.handles.perpendicularPoint, {
                        color: color,
                    }, 'pixel', data.handles.initialRotation);
                    drawHandles(context, eventData, data.handles, handleOptions);
                    // Update textbox stats
                    if (data.invalidated === true) {
                        if (data.cachedStats) {
                            _this.throttledUpdateCachedStats(image, element, data);
                        }
                        else {
                            _this.updateCachedStats(image, element, data);
                        }
                    }
                    // Default to textbox on right side of ROI
                    if (!data.handles.textBox.hasMoved) {
                        var defaultCoords = getROITextBoxCoords(eventData.viewport, data.handles);
                        Object.assign(data.handles.textBox, defaultCoords);
                    }
                    var textBoxAnchorPoints = function (handles) {
                        return _findTextBoxAnchorPoints(handles);
                    };
                    var textBoxContent = _createTextBoxContent(context, image.color, data.cachedStats, modality, hasPixelSpacing, _this.configuration);
                    drawLinkedTextBox(context, element, data.handles.textBox, textBoxContent, data.handles, textBoxAnchorPoints, color, lineWidth, 10, true);
                }
            });
        };
        return RotatedEllipticalRoiTool;
    }(BaseAnnotationTool$2));
    /**
     *
     *
     * @param {*} handles
     * @returns {Array.<{x: number, y: number}>}
     */
    function _findTextBoxAnchorPoints(handles) {
        // Retrieve the bounds of the ellipse (left, top, width, and height)
        return [
            {
                x: handles.start.x,
                y: handles.start.y,
            },
            {
                x: handles.end.x,
                y: handles.end.y,
            },
            {
                x: handles.perpendicularPoint.x,
                y: handles.perpendicularPoint.y,
            },
        ];
    }
    /**
     *
     *
     * @param {*} context
     * @param {*} isColorImage
     * @param {*} { area, mean, stdDev, min, max, meanStdDevSUV }
     * @param {*} modality
     * @param {*} hasPixelSpacing
     * @param {*} [options={}] - { showMinMax, showHounsfieldUnits }
     * @returns {string[]}
     */
    function _createTextBoxContent(context, isColorImage, statistics, modality, hasPixelSpacing, options) {
        if (statistics === void 0) { statistics = {}; }
        if (options === void 0) { options = {}; }
        var area = statistics.area, mean = statistics.mean, stdDev = statistics.stdDev, min = statistics.min, max = statistics.max, meanStdDevSUV = statistics.meanStdDevSUV;
        var showMinMax = options.showMinMax || false;
        var showHounsfieldUnits = options.showHounsfieldUnits !== false;
        var textLines = [];
        // Don't display mean/standardDev for color images
        var otherLines = [];
        if (!isColorImage) {
            var hasStandardUptakeValues = meanStdDevSUV && meanStdDevSUV.mean !== 0;
            var suffix = modality === 'CT' && showHounsfieldUnits ? ' HU' : '';
            var meanString = "Mean: " + numbersWithCommas(mean.toFixed(2)) + suffix;
            var stdDevString = "Std Dev: " + numbersWithCommas(stdDev.toFixed(2)) + suffix;
            // If this image has SUV values to display, concatenate them to the text line
            if (hasStandardUptakeValues) {
                var SUVtext = ' SUV: ';
                var meanSuvString = "" + SUVtext + numbersWithCommas(meanStdDevSUV.mean.toFixed(2));
                var stdDevSuvString = "" + SUVtext + numbersWithCommas(meanStdDevSUV.stdDev.toFixed(2));
                var targetStringLength = Math.floor(context.measureText(stdDevString + "     ").width);
                while (context.measureText(meanString).width < targetStringLength) {
                    meanString += ' ';
                }
                otherLines.push("" + meanString + meanSuvString);
                otherLines.push(stdDevString + "     " + stdDevSuvString);
            }
            else {
                otherLines.push(meanString + "     " + stdDevString);
            }
            if (showMinMax) {
                var minString = "Min: " + min + suffix;
                var maxString = "Max: " + max + suffix;
                var targetStringLength = hasStandardUptakeValues
                    ? Math.floor(context.measureText(stdDevString + "     ").width)
                    : Math.floor(context.measureText(meanString + "     ").width);
                while (context.measureText(minString).width < targetStringLength) {
                    minString += ' ';
                }
                otherLines.push("" + minString + maxString);
            }
        }
        textLines.push(_formatArea(area, hasPixelSpacing));
        otherLines.forEach(function (x) { return textLines.push(x); });
        return textLines;
    }
    /**
     *
     *
     * @param {*} area
     * @param {*} hasPixelSpacing
     * @returns {string} The formatted label for showing area
     */
    function _formatArea(area, hasPixelSpacing) {
        // This uses Char code 178 for a superscript 2
        var suffix = hasPixelSpacing
            ? " mm" + String.fromCharCode(178)
            : " px" + String.fromCharCode(178);
        return "Area: " + numbersWithCommas(area.toFixed(2)) + suffix;
    }
    /**
     *
     *
     * @param {*} image
     * @param {*} element
     * @param {*} handles
     * @param {*} modality
     * @param {*} pixelSpacing
     * @returns {Object} The Stats object
     */
    function _calculateStats(image, element, handles, modality, pixelSpacing) {
        // Retrieve the bounds of the ellipse in image coordinates
        if (handles.perpendicularPoint.isFirst) {
            return {
                area: 0,
                count: 0,
                mean: 0,
                variance: 0,
                stdDev: 0,
                min: 0,
                max: 0,
                meanStdDevSUV: 0,
            };
        }
        var ellipseCoordinates = _getEllipseImageCoordinates(handles.start, handles.end);
        var center = getCenter$1(handles);
        var square = function (x) { return x * x; };
        var xRadius = Math.sqrt(square(handles.start.x - handles.end.x) +
            square(handles.start.y - handles.end.y)) / 2;
        var yRadius = Math.sqrt(square(handles.perpendicularPoint.x - center.x) +
            square(handles.perpendicularPoint.y - center.y));
        var theta = Math.atan2(handles.end.y - handles.start.y, handles.end.x - handles.start.x);
        ellipseCoordinates.xRadius = xRadius;
        ellipseCoordinates.yRadius = yRadius;
        ellipseCoordinates.center = center;
        // Retrieve the array of pixels that the ellipse bounds cover
        var pixels = cornerstone.getPixels(element, ellipseCoordinates.left, ellipseCoordinates.top, ellipseCoordinates.width, ellipseCoordinates.height);
        // Calculate the mean & standard deviation from the pixels and the ellipse details.
        var ellipseMeanStdDev = calculateRotatedEllipseStatistics(pixels, ellipseCoordinates, theta);
        var meanStdDevSUV;
        if (modality === 'PT') {
            meanStdDevSUV = {
                mean: calculateSUV(image, ellipseMeanStdDev.mean, true) || 0,
                stdDev: calculateSUV(image, ellipseMeanStdDev.stdDev, true) || 0,
            };
        }
        // Calculate the image area from the ellipse dimensions and pixel spacing
        var transformedHalfWidth = Math.abs(center.x - handles.start.x) * (pixelSpacing.colPixelSpacing || 1);
        var transformedHalfHeight = Math.abs(center.y - handles.start.y) * (pixelSpacing.rowPixelSpacing || 1);
        var transformedHalfLongestDistance = Math.sqrt(square(transformedHalfWidth) + square(transformedHalfHeight));
        var transformedPerpendicularWidth = Math.abs(center.x - handles.perpendicularPoint.x) *
            (pixelSpacing.colPixelSpacing || 1);
        var transformedPerpendicularHeight = Math.abs(center.y - handles.perpendicularPoint.y) *
            (pixelSpacing.rowPixelSpacing || 1);
        var transformedHalfShortestDistance = Math.sqrt(square(transformedPerpendicularWidth) +
            square(transformedPerpendicularHeight));
        var area = Math.PI * transformedHalfLongestDistance * transformedHalfShortestDistance;
        return {
            area: area || 0,
            count: ellipseMeanStdDev.count || 0,
            mean: ellipseMeanStdDev.mean || 0,
            variance: ellipseMeanStdDev.variance || 0,
            stdDev: ellipseMeanStdDev.stdDev || 0,
            min: ellipseMeanStdDev.min || 0,
            max: ellipseMeanStdDev.max || 0,
            meanStdDevSUV: meanStdDevSUV,
        };
    }
    /**
     * Retrieve the bounds of the ellipse in image coordinates
     *
     * @param {*} startHandle
     * @param {*} endHandle
     * @returns {{ left: number, top: number, width: number, height: number }}
     */
    function _getEllipseImageCoordinates(startHandle, endHandle) {
        return {
            left: Math.round(Math.min(startHandle.x, endHandle.x)),
            top: Math.round(Math.min(startHandle.y, endHandle.y)),
            width: Math.round(Math.abs(startHandle.x - endHandle.x)),
            height: Math.round(Math.abs(startHandle.y - endHandle.y)),
        };
    }
    var getCenter$1 = function (handles) {
        var start = handles.start, end = handles.end;
        var w = Math.abs(start.x - end.x);
        var h = Math.abs(start.y - end.y);
        var xMin = Math.min(start.x, end.x);
        var yMin = Math.min(start.y, end.y);
        var center = {
            x: xMin + w / 2,
            y: yMin + h / 2,
        };
        return center;
    };

    return RotatedEllipticalRoiTool;

})));
//# sourceMappingURL=rotated-elliptical-roi-tool.umd.js.map
