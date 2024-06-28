"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("./enums");
(function (documentObject, windowObject, mathObject, jsonObject) {
    // Variables: Configuration
    var _configuration = {};
    // Variables: Elements
    var _elements_Type = {};
    var _elements_Day_Width = null;
    // Variables: Date Counts
    var _elements_DateCounts = {};
    // Variables: Internal Names
    var _internal_Name_Holiday = "HOLIDAY";
    // Variables: Local Storage
    var _local_Storage_Start_ID = "HJS_";
    // Variables: Defaults
    var _default_MonthsToShow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    var _default_DaysToShow = [1, 2, 3, 4, 5, 6, 7];
    // Variables: Attribute Names
    var _attribute_Name_Options = "data-heat-js";
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Date/Time
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function getTotalDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }
    function getWeekdayNumber(date) {
        return date.getDay() - 1 < 0 ? 6 : date.getDay() - 1;
    }
    function getDayOrdinal(value) {
        var result = _configuration.thText;
        if (value === 31 || value === 21 || value === 1) {
            result = _configuration.stText;
        }
        else if (value === 22 || value === 2) {
            result = _configuration.ndText;
        }
        else if (value === 23 || value === 3) {
            result = _configuration.rdText;
        }
        return result;
    }
    function getCustomFormattedDateText(dateFormat, date) {
        var result = dateFormat;
        var weekDayNumber = getWeekdayNumber(date);
        result = result.replace("{dddd}", _configuration.dayNames[weekDayNumber]);
        result = result.replace("{dd}", padNumber(date.getDate()));
        result = result.replace("{d}", date.getDate().toString());
        result = result.replace("{o}", getDayOrdinal(date.getDate()));
        result = result.replace("{mmmm}", _configuration.monthNames[date.getMonth()]);
        result = result.replace("{mm}", padNumber(date.getMonth() + 1));
        result = result.replace("{m}", (date.getMonth() + 1).toString());
        result = result.replace("{yyyy}", date.getFullYear().toString());
        result = result.replace("{yyy}", date.getFullYear().toString().substring(1));
        result = result.replace("{yy}", date.getFullYear().toString().substring(2));
        result = result.replace("{y}", parseInt(date.getFullYear().toString().substring(2)).toString());
        return result;
    }
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Element Handling
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function createElementWithNoContainer(type) {
        var result = null;
        var nodeType = type.toLowerCase();
        var isText = nodeType === "text";
        if (!_elements_Type.hasOwnProperty(nodeType)) {
            _elements_Type[nodeType] = isText ? documentObject.createTextNode(enums_1.STRING.empty) : documentObject.createElement(nodeType);
        }
        result = _elements_Type[nodeType].cloneNode(false);
        return result;
    }
    function createElement(container, type, className, beforeNode) {
        if (className === void 0) { className = enums_1.STRING.empty; }
        if (beforeNode === void 0) { beforeNode = null; }
        var result = null;
        var nodeType = type.toLowerCase();
        var isText = nodeType === "text";
        if (!_elements_Type.hasOwnProperty(nodeType)) {
            _elements_Type[nodeType] = isText ? documentObject.createTextNode(enums_1.STRING.empty) : documentObject.createElement(nodeType);
        }
        result = _elements_Type[nodeType].cloneNode(false);
        if (isDefined(className)) {
            result.className = className;
        }
        if (isDefined(beforeNode)) {
            container.insertBefore(result, beforeNode);
        }
        else {
            container.appendChild(result);
        }
        return result;
    }
    function createElementWithHTML(container, type, className, html, beforeNode) {
        if (beforeNode === void 0) { beforeNode = null; }
        var element = createElement(container, type, className, beforeNode);
        element.innerHTML = html;
        return element;
    }
    function getStyleValueByName(element, stylePropertyName, toNumber) {
        if (toNumber === void 0) { toNumber = false; }
        var value = null;
        if (documentObject.defaultView.getComputedStyle) {
            value = documentObject.defaultView.getComputedStyle(element, null).getPropertyValue(stylePropertyName);
        }
        else if (element.currentStyle) {
            value = element.currentStyle[stylePropertyName];
        }
        if (toNumber) {
            value = parseFloat(value);
        }
        return value;
    }
    function addClass(element, className) {
        element.className += enums_1.STRING.space + className;
        element.className = element.className.trim();
    }
    function removeClass(element, className) {
        element.className = element.className.replace(className, enums_1.STRING.empty);
        element.className = element.className.trim();
    }
    function cancelBubble(e) {
        e.preventDefault();
        e.cancelBubble = true;
    }
    function getScrollPosition() {
        var doc = documentObject.documentElement;
        var left = (windowObject.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
        var top = (windowObject.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        return {
            left: left,
            top: top
        };
    }
    function showElementAtMousePosition(e, element) {
        var left = e.pageX;
        var top = e.pageY;
        var scrollPosition = getScrollPosition();
        element.style.display = "block";
        if (left + element.offsetWidth > windowObject.innerWidth) {
            left -= element.offsetWidth;
        }
        else {
            left++;
        }
        if (top + element.offsetHeight > windowObject.innerHeight) {
            top -= element.offsetHeight;
        }
        else {
            top++;
        }
        if (left < scrollPosition.left) {
            left = e.pageX + 1;
        }
        if (top < scrollPosition.top) {
            top = e.pageY + 1;
        }
        element.style.left = left + "px";
        element.style.top = top + "px";
    }
    function reverseElementsOrder(parent) {
        var children = parent.children;
        var childrenLength = children.length - 1;
        for (; childrenLength--;) {
            parent.appendChild(children[childrenLength]);
        }
    }
    function buildCheckBox(container, labelText, checked, onClick) {
        var lineContainer = createElement(container, "div");
        var label = createElement(lineContainer, "label", "checkbox");
        var input = createElement(label, "input");
        input.type = "checkbox";
        if (isDefined(onClick)) {
            input.onclick = onClick;
        }
        if (isDefined(checked)) {
            input.checked = checked;
        }
        createElement(label, "span", "check-mark");
        createElementWithHTML(label, "span", "text", labelText);
        return {
            input: input,
            label: label
        };
    }
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Triggering Custom Events
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function fireCustomTrigger(triggerFunction) {
        var result = null;
        if (isDefinedFunction(triggerFunction)) {
            result = triggerFunction.apply(null, [].slice.call(arguments, 1));
        }
        return result;
    }
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Validation
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function isDefined(value) {
        return value !== null && value !== undefined && value.toString() !== enums_1.STRING.empty;
    }
    function isDefinedObject(object) {
        return isDefined(object) && typeof object === "object";
    }
    function isDefinedBoolean(object) {
        return isDefined(object) && typeof object === "boolean";
    }
    function isDefinedString(object) {
        return isDefined(object) && typeof object === "string";
    }
    function isDefinedFunction(object) {
        return isDefined(object) && typeof object === "function";
    }
    function isDefinedNumber(object) {
        return isDefined(object) && typeof object === "number";
    }
    function isDefinedArray(object) {
        return isDefinedObject(object) && object instanceof Array;
    }
    function isDefinedDate(object) {
        return isDefinedObject(object) && object instanceof Date;
    }
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Default Parameter/Option Handling
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function getDefaultAnyString(value, defaultValue) {
        return typeof value === "string" ? value : defaultValue;
    }
    function getDefaultString(value, defaultValue) {
        return isDefinedString(value) ? value : defaultValue;
    }
    function getDefaultBoolean(value, defaultValue) {
        return isDefinedBoolean(value) ? value : defaultValue;
    }
    function getDefaultNumber(value, defaultValue) {
        return isDefinedNumber(value) ? value : defaultValue;
    }
    function getDefaultFunction(value, defaultValue) {
        return isDefinedFunction(value) ? value : defaultValue;
    }
    function getDefaultArray(value, defaultValue) {
        return isDefinedArray(value) ? value : defaultValue;
    }
    function getDefaultObject(value, defaultValue) {
        return isDefinedObject(value) ? value : defaultValue;
    }
    function getDefaultStringOrArray(value, defaultValue) {
        var result = defaultValue;
        if (isDefinedString(value)) {
            var values = value.toString().split(enums_1.STRING.space);
            if (values.length === 0) {
                value = defaultValue;
            }
            else {
                result = values;
            }
        }
        else {
            value = getDefaultArray(value, defaultValue);
        }
        return value;
    }
    function getObjectFromString(objectString) {
        var parsed = true, result = null;
        try {
            if (isDefinedString(objectString)) {
                result = jsonObject.parse(objectString);
            }
        }
        catch (e1) {
            try {
                var evalResult = result = eval("(" + objectString + ")");
                if (isDefinedFunction(result)) {
                    result = evalResult();
                }
            }
            catch (e2) {
                if (!_configuration.safeMode) {
                    console.error(_configuration.objectErrorText.replace("{{error_1}}", e1.message).replace("{{error_2}}", e2.message));
                    parsed = false;
                }
                result = null;
            }
        }
        return {
            parsed: parsed,
            result: result
        };
    }
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * String Handling
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function newGuid() {
        var result = [];
        for (var charIndex = 0; charIndex < 32; charIndex++) {
            if (charIndex === 8 || charIndex === 12 || charIndex === 16 || charIndex === 20) {
                result.push(enums_1.STRING.dash);
            }
            var character = mathObject.floor(mathObject.random() * 16).toString(16);
            result.push(character);
        }
        return result.join(enums_1.STRING.empty);
    }
    function padNumber(number) {
        var numberString = number.toString();
        return numberString.length === 1 ? enums_1.STRING.zero + numberString : numberString;
    }
    function startsWithAnyCase(data, start) {
        return data.substring(0, start.length).toLowerCase() === start.toLowerCase();
    }
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Storage Dates
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    function toStorageDate(date) {
        return date.getFullYear() + enums_1.STRING.dash + padNumber(date.getMonth() + 1) + enums_1.STRING.dash + padNumber(date.getDate());
    }
    function getStorageDate(data) {
        return data.split(enums_1.STRING.dash);
    }
    function getStorageDateYear(data) {
        return data.split(enums_1.STRING.dash)[0];
    }
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Initialize Heat.js
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    (function () {
    })();
})(document, window, Math, JSON);
//# sourceMappingURL=heat.js.map