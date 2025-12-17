"use strict";

var Constant;

(e => {
    e.HEAT_JS_ATTRIBUTE_NAME = "data-heat-js";
    e.HEAT_JS_MAP_DATE_ATTRIBUTE_NAME = "data-heat-js-map-date";
    e.HEAT_JS_MAP_MONTH_NUMBER_ATTRIBUTE_NAME = "data-heat-js-month-number";
    e.HEAT_JS_CHART_DATE_ATTRIBUTE_NAME = "data-heat-js-chart-date";
    e.HEAT_JS_DAY_NUMBER_ATTRIBUTE_NAME = "data-heat-js-day-number";
    e.HEAT_JS_MONTH_NUMBER_ATTRIBUTE_NAME = "data-heat-js-month-number";
    e.HEAT_JS_STATISTICS_COLOR_RANGE_NAME_ATTRIBUTE_NAME = "data-heat-js-statistics-color-range-name";
    e.LOCAL_STORAGE_START_ID = "HJS_";
    e.COLOR_RANGE_HOLIDAY_ID = "HOLIDAY";
})(Constant || (Constant = {}));

var ImportType = (e => {
    e["csv"] = "csv";
    e["json"] = "json";
    e["txt"] = "txt";
    e["md"] = "md";
    e["tsv"] = "tsv";
    e["yaml"] = "yaml";
    e["toml"] = "toml";
    return e;
})(ImportType || {});

var ExportType = (e => {
    e["csv"] = "csv";
    e["json"] = "json";
    e["xml"] = "xml";
    e["txt"] = "txt";
    e["html"] = "html";
    e["md"] = "md";
    e["tsv"] = "tsv";
    e["yaml"] = "yaml";
    e["toml"] = "toml";
    return e;
})(ExportType || {});

var Is;

(e => {
    function t(e) {
        return e !== null && e !== void 0 && e.toString() !== "";
    }
    e.defined = t;
    function n(e) {
        return t(e) && typeof e === "object";
    }
    e.definedObject = n;
    function o(e) {
        return t(e) && typeof e === "boolean";
    }
    e.definedBoolean = o;
    function i(e) {
        return t(e) && typeof e === "string";
    }
    e.definedString = i;
    function s(e) {
        return t(e) && typeof e === "function";
    }
    e.definedFunction = s;
    function r(e) {
        return t(e) && typeof e === "number";
    }
    e.definedNumber = r;
    function a(e) {
        return n(e) && e instanceof Array;
    }
    e.definedArray = a;
    function l(e) {
        return n(e) && e instanceof Date;
    }
    e.definedDate = l;
    function c(e, t = 1) {
        return !a(e) || e.length < t;
    }
    e.invalidOptionArray = c;
    function u(t, n) {
        const o = {
            matched: false,
            name: null
        };
        const i = t.holidays.length;
        const s = n.getDate();
        const r = n.getMonth() + 1;
        const a = n.getFullYear();
        for (let n = 0; n < i; n++) {
            let i = t.holidays[n];
            if (e.definedString(i.date) && i.showInViews) {
                const e = i.date.split("/");
                if (e.length === 2) {
                    o.matched = s === parseInt(e[0]) && r === parseInt(e[1]);
                } else if (e.length === 3) {
                    o.matched = s === parseInt(e[0]) && r === parseInt(e[1]) && a === parseInt(e[2]);
                }
                if (o.matched) {
                    o.name = i.name;
                    break;
                }
            }
        }
        return o;
    }
    e.holiday = u;
    function d(e, t) {
        return e.indexOf(t + 1) > -1;
    }
    e.monthVisible = d;
    function m(e, t) {
        return e.indexOf(t) > -1;
    }
    e.dayVisible = m;
    function f(e, t) {
        return e.yearsToHide.indexOf(t) === -1 && (e._currentView.yearsAvailable.length === 0 || e._currentView.yearsAvailable.indexOf(t) > -1);
    }
    e.yearVisible = f;
    function w(e, t) {
        return e._currentView.yearsAvailable.length > 0 && t <= e._currentView.yearsAvailable[0];
    }
    e.firstVisibleYear = w;
    function h(e, t) {
        return e._currentView.yearsAvailable.length > 0 && t >= e._currentView.yearsAvailable[e._currentView.yearsAvailable.length - 1];
    }
    e.lastVisibleYear = h;
    function g(e) {
        return e.startsWith("rgba") || e.startsWith("rgb");
    }
    e.rgbColor = g;
    function p(e) {
        return e.startsWith("#") && (e.length === 6 || e.length === 8);
    }
    e.hexColor = p;
})(Is || (Is = {}));

var Default2;

(Default => {
    function getAnyString(e, t) {
        return typeof e === "string" ? e : t;
    }
    Default.getAnyString = getAnyString;
    function getString(e, t) {
        return Is.definedString(e) ? e : t;
    }
    Default.getString = getString;
    function getBoolean(e, t) {
        return Is.definedBoolean(e) ? e : t;
    }
    Default.getBoolean = getBoolean;
    function getNumber(e, t) {
        return Is.definedNumber(e) ? e : t;
    }
    Default.getNumber = getNumber;
    function getNumberInRange(e, t, n, o) {
        return Is.definedNumber(e) ? e >= t && e <= n ? e : o : o;
    }
    Default.getNumberInRange = getNumberInRange;
    function getFunction(e, t) {
        return Is.definedFunction(e) ? e : t;
    }
    Default.getFunction = getFunction;
    function getArray(e, t) {
        return Is.definedArray(e) ? e : t;
    }
    Default.getArray = getArray;
    function getObject(e, t) {
        return Is.definedObject(e) ? e : t;
    }
    Default.getObject = getObject;
    function getStringOrArray(e, t) {
        let n = t;
        if (Is.definedString(e)) {
            const o = e.toString().split(" ");
            if (o.length === 0) {
                e = t;
            } else {
                n = o;
            }
        } else {
            n = getArray(e, t);
        }
        return n;
    }
    Default.getStringOrArray = getStringOrArray;
    function getObjectFromString(objectString, configurationOptions) {
        const result = {
            parsed: true,
            object: null
        };
        try {
            if (Is.definedString(objectString)) {
                result.object = JSON.parse(objectString);
            }
        } catch (e1) {
            try {
                result.object = eval(`(${objectString})`);
                if (Is.definedFunction(result.object)) {
                    result.object = result.object();
                }
            } catch (e) {
                if (!configurationOptions.safeMode) {
                    console.error(configurationOptions.text.objectErrorText.replace("{{error_1}}", e1.message).replace("{{error_2}}", e.message));
                    result.parsed = false;
                }
                result.object = null;
            }
        }
        return result;
    }
    Default.getObjectFromString = getObjectFromString;
})(Default2 || (Default2 = {}));

var Str;

(e => {
    function t(e) {
        const t = e.toString();
        return t.length === 1 ? "0" + t : t;
    }
    e.padNumber = t;
    function n(e, t) {
        return e.substring(0, t.length).toLowerCase() === t.toLowerCase();
    }
    e.startsWithAnyCase = n;
    function o(e) {
        return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    e.friendlyNumber = o;
})(Str || (Str = {}));

var DateTime;

(e => {
    function t(e, t) {
        return new Date(e, t + 1, 0).getDate();
    }
    e.getTotalDaysInMonth = t;
    function n(e) {
        return e.getDay() - 1 < 0 ? 6 : e.getDay() - 1;
    }
    e.getWeekdayNumber = n;
    function o(e, t) {
        let n = e.text.thText;
        if (t === 31 || t === 21 || t === 1) {
            n = e.text.stText;
        } else if (t === 22 || t === 2) {
            n = e.text.ndText;
        } else if (t === 23 || t === 3) {
            n = e.text.rdText;
        }
        return n;
    }
    e.getDayOrdinal = o;
    function i(e, t, i) {
        let s = t;
        const r = n(i);
        s = s.replace("{dddd}", e.text.dayNames[r]);
        s = s.replace("{dd}", Str.padNumber(i.getDate()));
        s = s.replace("{d}", i.getDate().toString());
        s = s.replace("{o}", o(e, i.getDate()));
        s = s.replace("{mmmm}", e.text.monthNames[i.getMonth()]);
        s = s.replace("{mm}", Str.padNumber(i.getMonth() + 1));
        s = s.replace("{m}", (i.getMonth() + 1).toString());
        s = s.replace("{yyyy}", i.getFullYear().toString());
        s = s.replace("{yyy}", i.getFullYear().toString().substring(1));
        s = s.replace("{yy}", i.getFullYear().toString().substring(2));
        s = s.replace("{y}", parseInt(i.getFullYear().toString().substring(2)).toString());
        return s;
    }
    e.getCustomFormattedDateText = i;
    function s(e) {
        return e.getFullYear() + "-" + Str.padNumber(e.getMonth() + 1) + "-" + Str.padNumber(e.getDate());
    }
    e.toStorageDate = s;
    function r(e) {
        return e.split("-")[0];
    }
    e.getStorageDateYear = r;
    function a() {
        const e = new Date;
        const t = e.getDay();
        const n = (t === 0 ? -6 : 1) - t;
        const o = new Date(e);
        o.setDate(e.getDate() + n);
        return o;
    }
    e.getDateForMondayOfCurrentWeek = a;
    function l(e) {
        const t = new Date;
        return e.getDate() === t.getDate() && e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
    }
    e.isTodaysDate = l;
})(DateTime || (DateTime = {}));

var DomElement;

(e => {
    function t(e) {
        const t = e.toLowerCase();
        const n = t === "text";
        let o = n ? document.createTextNode("") : document.createElement(t);
        return o;
    }
    e.createWithNoContainer = t;
    function n(e, t, n = "", o = null) {
        const i = t.toLowerCase();
        const s = i === "text";
        let r = s ? document.createTextNode("") : document.createElement(i);
        if (Is.defined(n)) {
            r.className = n;
        }
        if (Is.defined(o)) {
            e.insertBefore(r, o);
        } else {
            e.appendChild(r);
        }
        return r;
    }
    e.create = n;
    function o(e, t, o, i, s = null) {
        const r = n(e, t, o, s);
        r.innerHTML = i;
        if (t === "button") {
            const e = r;
            e.type = "button";
        }
        return r;
    }
    e.createWithHTML = o;
    function i(e, t, o, i = null, s = null) {
        const r = n(e, t, o, s);
        r.type = "button";
        if (Is.defined(i)) {
            r.innerHTML = i;
        }
        return r;
    }
    e.createButton = i;
    function s(t, o, i, s, r = null) {
        const a = n(t, o, i, r);
        a.type = "button";
        e.create(a, "i", s);
        return a;
    }
    e.createIconButton = s;
    function r(e, t, n = false) {
        const o = getComputedStyle(e);
        let i = o.getPropertyValue(t);
        if (n) {
            i = parseFloat(i);
            i = isNaN(i) ? 0 : i;
        }
        return i;
    }
    e.getStyleValueByName = r;
    function a(e, t) {
        const n = getComputedStyle(e);
        const o = n.getPropertyValue(t);
        const i = parseFloat(o);
        return o.replace(i.toString(), "");
    }
    e.getStyleValueByNameSizingMetic = a;
    function l(e, t) {
        e.classList.add(t);
    }
    e.addClass = l;
    function c(e, t) {
        e.classList.remove(t);
    }
    e.removeClass = c;
    function u(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    e.cancelBubble = u;
    function d() {
        const e = document.documentElement;
        const t = {
            left: e.scrollLeft - (e.clientLeft || 0),
            top: e.scrollTop - (e.clientTop || 0)
        };
        return t;
    }
    e.getScrollPosition = d;
    function m(e, t) {
        let n = e.pageX;
        let o = e.pageY;
        const i = d();
        t.style.display = "block";
        if (n + t.offsetWidth > window.innerWidth) {
            n -= t.offsetWidth;
        } else {
            n++;
        }
        if (o + t.offsetHeight > window.innerHeight) {
            o -= t.offsetHeight;
        } else {
            o++;
        }
        if (n < i.left) {
            n = e.pageX + 1;
        }
        if (o < i.top) {
            o = e.pageY + 1;
        }
        t.style.left = `${n}px`;
        t.style.top = `${o}px`;
    }
    e.showElementAtMousePosition = m;
    function f(e) {
        const t = Array.from(e.children);
        t.reverse();
        t.forEach(t => e.appendChild(t));
    }
    e.reverseChildrenOrder = f;
    function w(e, t, i) {
        const s = n(e, "div");
        const r = n(s, "label", "checkbox");
        const a = n(r, "input");
        a.type = "checkbox";
        a.name = i;
        n(r, "span", "check-mark");
        o(r, "span", "text", t);
        return a;
    }
    e.createCheckBox = w;
    function h(t, n) {
        const o = e.getStyleValueByName(t, "background-color");
        const i = e.getStyleValueByName(n, "background-color");
        n.style.background = `linear-gradient(to top, ${o}, ${i})`;
    }
    e.addGradientEffect = h;
})(DomElement || (DomElement = {}));

var ToolTip;

(e => {
    function t(e) {
        if (!Is.defined(e._currentView.tooltip)) {
            e._currentView.tooltip = DomElement.create(document.body, "div", "heat-js-tooltip");
            e._currentView.tooltip.style.display = "none";
            n(e);
        }
    }
    e.render = t;
    function n(e, t = true) {
        let n = t ? window.addEventListener : window.removeEventListener;
        let o = t ? document.addEventListener : document.removeEventListener;
        n("mousemove", () => s(e));
        o("scroll", () => s(e));
    }
    e.assignToEvents = n;
    function o(e, t, n) {
        if (e !== null) {
            e.onmousemove = e => i(e, t, n);
        }
    }
    e.add = o;
    function i(e, t, n) {
        DomElement.cancelBubble(e);
        s(t);
        t._currentView.tooltipTimer = setTimeout(() => {
            t._currentView.tooltip.innerHTML = n;
            t._currentView.tooltip.style.display = "block";
            DomElement.showElementAtMousePosition(e, t._currentView.tooltip);
        }, t.tooltip.delay);
    }
    e.show = i;
    function s(e) {
        if (Is.defined(e._currentView.tooltip)) {
            if (e._currentView.tooltipTimer !== 0) {
                clearTimeout(e._currentView.tooltipTimer);
                e._currentView.tooltipTimer = 0;
            }
            if (e._currentView.tooltip.style.display !== "none") {
                e._currentView.tooltip.style.display = "none";
            }
        }
    }
    e.hide = s;
})(ToolTip || (ToolTip = {}));

var Trigger;

(e => {
    function t(e, ...t) {
        let n = null;
        if (Is.definedFunction(e)) {
            n = e.apply(null, [].slice.call(t, 0));
        }
        return n;
    }
    e.customEvent = t;
})(Trigger || (Trigger = {}));

var Binding;

(e => {
    let t;
    (e => {
        const t = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
        const n = [ 1, 2, 3, 4, 5, 6, 7 ];
        function o(e, t, n) {
            const o = i(t);
            const s = Default2.getString(o.view, "").toLowerCase();
            o._currentView = {};
            o._currentView.element = n;
            o._currentView.disabledBackground = null;
            o._currentView.configurationDialog = null;
            o._currentView.configurationDialogDayCheckBoxes = [];
            o._currentView.configurationDialogMonthCheckBoxes = [];
            o._currentView.tooltip = null;
            o._currentView.tooltipTimer = 0;
            o._currentView.mapContents = null;
            o._currentView.mapContentsScrollLeft = 0;
            o._currentView.year = o.year;
            o._currentView.type = e.text.unknownTrendText;
            o._currentView.isInFetchMode = Is.definedFunction(o.events.onDataFetch);
            o._currentView.isInFetchModeTimer = 0;
            o._currentView.yearsAvailable = [];
            o._currentView.dayWidth = 0;
            o._currentView.mapZoomLevel = -1;
            o._currentView.mapZoomIncrement = -1;
            if (o.views.chart.enabled) {
                o._currentView.chartContents = null;
                o._currentView.chartContentsScrollLeft = 0;
            }
            if (o.views.days.enabled) {
                o._currentView.daysContents = null;
                o._currentView.daysContentsScrollLeft = 0;
            }
            if (o.views.statistics.enabled) {
                o._currentView.statisticsContents = null;
                o._currentView.statisticsContentsScrollLeft = 0;
            }
            if (s === "map") {
                o._currentView.view = 1;
            } else if (s === "chart") {
                o._currentView.view = 2;
            } else if (s === "days") {
                o._currentView.view = 3;
            } else if (s === "statistics") {
                o._currentView.view = 4;
            } else {
                o._currentView.view = 1;
            }
            return o;
        }
        e.getForNewInstance = o;
        function i(e) {
            const t = Default2.getObject(e, {});
            t.views = Default2.getObject(t.views, {});
            t.exportOnlyDataBeingViewed = Default2.getBoolean(t.exportOnlyDataBeingViewed, true);
            t.year = Default2.getNumber(t.year, (new Date).getFullYear());
            t.view = Default2.getString(t.view, "map");
            t.exportType = Default2.getString(t.exportType, "json");
            t.useLocalStorageForData = Default2.getBoolean(t.useLocalStorageForData, false);
            t.allowFileImports = Default2.getBoolean(t.allowFileImports, true);
            t.yearsToHide = Default2.getArray(t.yearsToHide, []);
            t.dataFetchDelay = Default2.getNumber(t.dataFetchDelay, 6e4);
            t.showOnlyDataForYearsAvailable = Default2.getBoolean(t.showOnlyDataForYearsAvailable, false);
            t.showHolidaysInDayToolTips = Default2.getBoolean(t.showHolidaysInDayToolTips, false);
            t.resizable = Default2.getBoolean(t.resizable, false);
            t.startMonth = Default2.getNumberInRange(t.startMonth, 0, 11, 0);
            t.allowMultipleFileImports = Default2.getBoolean(t.allowMultipleFileImports, true);
            t.percentageDecimalPoints = Default2.getNumber(t.percentageDecimalPoints, 2);
            t.allowTypeAdding = Default2.getBoolean(t.allowTypeAdding, false);
            t.chartsAnimationDelay = Default2.getNumber(t.chartsAnimationDelay, 50);
            t.colorRanges = s(t);
            t.holidays = r(t);
            t.title = a(t);
            t.description = l(t);
            t.guide = c(t);
            t.tooltip = u(t);
            t.views.map = d(t);
            t.views.chart = m(t);
            t.views.days = f(t);
            t.views.months = w(t);
            t.views.statistics = h(t);
            t.yearlyStatistics = g(t);
            t.events = p(t);
            if (t.startMonth > 0) {
                t.yearsToHide = [];
            }
            return t;
        }
        e.get = i;
        function s(e) {
            let t = [];
            if (Is.definedArray(e.colorRanges)) {
                const n = e.colorRanges.length;
                for (let o = 0; o < n; o++) {
                    const n = e.colorRanges[o];
                    n.id = Default2.getString(n.id, crypto.randomUUID());
                    n.name = Default2.getString(n.name, "");
                    n.minimum = Default2.getNumber(n.minimum, 0);
                    n.cssClassName = Default2.getString(n.cssClassName, "");
                    n.mapCssClassName = Default2.getString(n.mapCssClassName, "");
                    n.chartCssClassName = Default2.getString(n.chartCssClassName, "");
                    n.statisticsCssClassName = Default2.getString(n.statisticsCssClassName, "");
                    n.tooltipText = Default2.getString(n.tooltipText, "");
                    n.visible = Default2.getBoolean(n.visible, true);
                    t.push(n);
                }
            } else {
                t = [ {
                    id: crypto.randomUUID(),
                    name: "Day Color 1",
                    minimum: 10,
                    cssClassName: "day-color-1",
                    tooltipText: "Day Color 1",
                    visible: true
                }, {
                    id: crypto.randomUUID(),
                    name: "Day Color 2",
                    minimum: 15,
                    cssClassName: "day-color-2",
                    tooltipText: "Day Color 2",
                    visible: true
                }, {
                    id: crypto.randomUUID(),
                    name: "Day Color 3",
                    minimum: 20,
                    cssClassName: "day-color-3",
                    tooltipText: "Day Color 3",
                    visible: true
                }, {
                    id: crypto.randomUUID(),
                    name: "Day Color 4",
                    minimum: 25,
                    cssClassName: "day-color-4",
                    tooltipText: "Day Color 4",
                    visible: true
                } ];
            }
            return t;
        }
        function r(e) {
            let t = [];
            if (Is.definedArray(e.holidays)) {
                const n = e.holidays.length;
                for (let o = 0; o < n; o++) {
                    const n = e.holidays[o];
                    n.date = Default2.getString(n.date, "");
                    n.name = Default2.getString(n.name, "");
                    n.showInViews = Default2.getBoolean(n.showInViews, true);
                    t.push(n);
                }
            }
            return t;
        }
        function a(e) {
            e.title = Default2.getObject(e.title, {});
            e.title.text = Default2.getString(e.title.text, "Heat.js");
            e.title.showText = Default2.getBoolean(e.title.showText, true);
            e.title.showYearSelector = Default2.getBoolean(e.title.showYearSelector, true);
            e.title.showRefreshButton = Default2.getBoolean(e.title.showRefreshButton, false);
            e.title.showExportButton = Default2.getBoolean(e.title.showExportButton, false);
            e.title.extraSelectionYears = Default2.getNumber(e.title.extraSelectionYears, 50);
            e.title.showYearSelectionDropDown = Default2.getBoolean(e.title.showYearSelectionDropDown, true);
            e.title.showImportButton = Default2.getBoolean(e.title.showImportButton, false);
            e.title.showConfigurationButton = Default2.getBoolean(e.title.showConfigurationButton, true);
            e.title.showTitleDropDownButton = Default2.getBoolean(e.title.showTitleDropDownButton, true);
            e.title.showTitleDropDownHeaders = Default2.getBoolean(e.title.showTitleDropDownHeaders, true);
            e.title.showCurrentYearButton = Default2.getBoolean(e.title.showCurrentYearButton, true);
            e.title.showSectionText = Default2.getBoolean(e.title.showSectionText, true);
            e.title.showToolTips = Default2.getBoolean(e.title.showToolTips, true);
            e.title.showTitleDropDownMenu = Default2.getBoolean(e.title.showTitleDropDownMenu, true);
            e.title.showClearButton = Default2.getBoolean(e.title.showClearButton, false);
            return e.title;
        }
        function l(e) {
            e.description = Default2.getObject(e.description, {});
            e.description.text = Default2.getString(e.description.text, "");
            e.description.url = Default2.getString(e.description.url, "");
            e.description.urlTarget = Default2.getString(e.description.urlTarget, "_blank");
            return e.description;
        }
        function c(e) {
            e.guide = Default2.getObject(e.guide, {});
            e.guide.enabled = Default2.getBoolean(e.guide.enabled, true);
            e.guide.colorRangeTogglesEnabled = Default2.getBoolean(e.guide.colorRangeTogglesEnabled, true);
            e.guide.showLessAndMoreLabels = Default2.getBoolean(e.guide.showLessAndMoreLabels, true);
            e.guide.showNumbersInGuide = Default2.getBoolean(e.guide.showNumbersInGuide, false);
            e.guide.showToolTips = Default2.getBoolean(e.guide.showToolTips, true);
            return e.guide;
        }
        function u(e) {
            e.tooltip = Default2.getObject(e.tooltip, {});
            e.tooltip.delay = Default2.getNumber(e.tooltip.delay, 750);
            return e.tooltip;
        }
        function d(e) {
            e.views.map = Default2.getObject(e.views.map, {});
            e.views.map.showMonthDayGaps = Default2.getBoolean(e.views.map.showMonthDayGaps, true);
            e.views.map.showDayNames = Default2.getBoolean(e.views.map.showDayNames, true);
            e.views.map.placeMonthNamesOnTheBottom = Default2.getBoolean(e.views.map.placeMonthNamesOnTheBottom, false);
            e.views.map.showDayCounts = Default2.getBoolean(e.views.map.showDayCounts, false);
            e.views.map.showMonthNames = Default2.getBoolean(e.views.map.showMonthNames, true);
            e.views.map.showDaysInReverseOrder = Default2.getBoolean(e.views.map.showDaysInReverseOrder, false);
            e.views.map.showNoDataMessageWhenDataIsNotAvailable = Default2.getBoolean(e.views.map.showNoDataMessageWhenDataIsNotAvailable, false);
            e.views.map.showMinimalDayNames = Default2.getBoolean(e.views.map.showMinimalDayNames, false);
            e.views.map.showMonthsInReverseOrder = Default2.getBoolean(e.views.map.showMonthsInReverseOrder, false);
            e.views.map.keepScrollPositions = Default2.getBoolean(e.views.map.keepScrollPositions, false);
            e.views.map.showDayDateNumbers = Default2.getBoolean(e.views.map.showDayDateNumbers, false);
            e.views.map.showToolTips = Default2.getBoolean(e.views.map.showToolTips, true);
            e.views.map.highlightCurrentDay = Default2.getBoolean(e.views.map.highlightCurrentDay, false);
            e.views.map.dayToolTipText = Default2.getString(e.views.map.dayToolTipText, "{dddd}, {d}{o} {mmmm} {yyyy}");
            e.views.map.showYearsInMonthNames = Default2.getBoolean(e.views.map.showYearsInMonthNames, true);
            e.views.map.allowZooming = Default2.getBoolean(e.views.map.allowZooming, false);
            e.views.map.zoomLevel = Default2.getNumber(e.views.map.zoomLevel, 0);
            e.views.map.showCountsInToolTips = Default2.getBoolean(e.views.map.showCountsInToolTips, true);
            if (Is.invalidOptionArray(e.views.map.monthsToShow)) {
                e.views.map.monthsToShow = t;
            }
            if (Is.invalidOptionArray(e.views.map.daysToShow)) {
                e.views.map.daysToShow = n;
            }
            return e.views.map;
        }
        function m(e) {
            e.views.chart = Default2.getObject(e.views.chart, {});
            e.views.chart.enabled = Default2.getBoolean(e.views.chart.enabled, true);
            e.views.chart.showChartYLabels = Default2.getBoolean(e.views.chart.showChartYLabels, true);
            e.views.chart.showMonthNames = Default2.getBoolean(e.views.chart.showMonthNames, true);
            e.views.chart.showLineCounts = Default2.getBoolean(e.views.chart.showLineCounts, false);
            e.views.chart.showInReverseOrder = Default2.getBoolean(e.views.chart.showInReverseOrder, false);
            e.views.chart.keepScrollPositions = Default2.getBoolean(e.views.chart.keepScrollPositions, false);
            e.views.chart.showLineDateNumbers = Default2.getBoolean(e.views.chart.showLineDateNumbers, false);
            e.views.chart.showToolTips = Default2.getBoolean(e.views.chart.showToolTips, true);
            e.views.chart.useGradients = Default2.getBoolean(e.views.chart.useGradients, false);
            e.views.chart.highlightCurrentDay = Default2.getBoolean(e.views.chart.highlightCurrentDay, false);
            e.views.chart.dayToolTipText = Default2.getString(e.views.chart.dayToolTipText, "{dddd}, {d}{o} {mmmm} {yyyy}");
            e.views.chart.showYearsInMonthNames = Default2.getBoolean(e.views.chart.showYearsInMonthNames, true);
            e.views.chart.showCountsInToolTips = Default2.getBoolean(e.views.chart.showCountsInToolTips, true);
            if (Is.invalidOptionArray(e.views.chart.monthsToShow)) {
                e.views.chart.monthsToShow = t;
            }
            if (Is.invalidOptionArray(e.views.chart.daysToShow)) {
                e.views.chart.daysToShow = n;
            }
            return e.views.chart;
        }
        function f(e) {
            e.views.days = Default2.getObject(e.views.days, {});
            e.views.days.enabled = Default2.getBoolean(e.views.days.enabled, true);
            e.views.days.showChartYLabels = Default2.getBoolean(e.views.days.showChartYLabels, true);
            e.views.days.showDayNames = Default2.getBoolean(e.views.days.showDayNames, true);
            e.views.days.showInReverseOrder = Default2.getBoolean(e.views.days.showInReverseOrder, false);
            e.views.days.showDayCounts = Default2.getBoolean(e.views.days.showDayCounts, false);
            e.views.days.keepScrollPositions = Default2.getBoolean(e.views.days.keepScrollPositions, false);
            e.views.days.showToolTips = Default2.getBoolean(e.views.days.showToolTips, true);
            e.views.days.useGradients = Default2.getBoolean(e.views.days.useGradients, false);
            e.views.days.useDifferentOpacities = Default2.getBoolean(e.views.days.useDifferentOpacities, true);
            e.views.days.showDayCountPercentages = Default2.getBoolean(e.views.days.showDayCountPercentages, true);
            if (Is.invalidOptionArray(e.views.days.monthsToShow)) {
                e.views.days.monthsToShow = t;
            }
            if (Is.invalidOptionArray(e.views.days.daysToShow)) {
                e.views.days.daysToShow = n;
            }
            return e.views.days;
        }
        function w(e) {
            e.views.months = Default2.getObject(e.views.months, {});
            e.views.months.enabled = Default2.getBoolean(e.views.months.enabled, true);
            e.views.months.showChartYLabels = Default2.getBoolean(e.views.months.showChartYLabels, true);
            e.views.months.showMonthNames = Default2.getBoolean(e.views.months.showMonthNames, true);
            e.views.months.showInReverseOrder = Default2.getBoolean(e.views.months.showInReverseOrder, false);
            e.views.months.showMonthCounts = Default2.getBoolean(e.views.months.showMonthCounts, false);
            e.views.months.keepScrollPositions = Default2.getBoolean(e.views.months.keepScrollPositions, false);
            e.views.months.showToolTips = Default2.getBoolean(e.views.months.showToolTips, true);
            e.views.months.useGradients = Default2.getBoolean(e.views.months.useGradients, false);
            e.views.months.useDifferentOpacities = Default2.getBoolean(e.views.months.useDifferentOpacities, true);
            e.views.months.highlightCurrentMonth = Default2.getBoolean(e.views.months.highlightCurrentMonth, false);
            e.views.months.showMonthCountPercentages = Default2.getBoolean(e.views.months.showMonthCountPercentages, true);
            if (Is.invalidOptionArray(e.views.months.monthsToShow)) {
                e.views.months.monthsToShow = t;
            }
            if (Is.invalidOptionArray(e.views.months.daysToShow)) {
                e.views.months.daysToShow = n;
            }
            return e.views.months;
        }
        function h(e) {
            e.views.statistics = Default2.getObject(e.views.statistics, {});
            e.views.statistics.enabled = Default2.getBoolean(e.views.statistics.enabled, true);
            e.views.statistics.showChartYLabels = Default2.getBoolean(e.views.statistics.showChartYLabels, true);
            e.views.statistics.showColorRangeLabels = Default2.getBoolean(e.views.statistics.showColorRangeLabels, true);
            e.views.statistics.useColorRangeNamesForLabels = Default2.getBoolean(e.views.statistics.useColorRangeNamesForLabels, false);
            e.views.statistics.showRangeCounts = Default2.getBoolean(e.views.statistics.showRangeCounts, false);
            e.views.statistics.showInReverseOrder = Default2.getBoolean(e.views.statistics.showInReverseOrder, false);
            e.views.statistics.keepScrollPositions = Default2.getBoolean(e.views.statistics.keepScrollPositions, false);
            e.views.statistics.showToolTips = Default2.getBoolean(e.views.statistics.showToolTips, true);
            e.views.statistics.useGradients = Default2.getBoolean(e.views.statistics.useGradients, false);
            e.views.statistics.showRangeCountPercentages = Default2.getBoolean(e.views.statistics.showRangeCountPercentages, true);
            e.views.statistics.showRangeNamesInToolTips = Default2.getBoolean(e.views.statistics.showRangeNamesInToolTips, true);
            if (Is.invalidOptionArray(e.views.statistics.monthsToShow)) {
                e.views.statistics.monthsToShow = t;
            }
            if (Is.invalidOptionArray(e.views.statistics.daysToShow)) {
                e.views.statistics.daysToShow = n;
            }
            return e.views.statistics;
        }
        function g(e) {
            e.yearlyStatistics = Default2.getObject(e.yearlyStatistics, {});
            e.yearlyStatistics.enabled = Default2.getBoolean(e.yearlyStatistics.enabled, false);
            e.yearlyStatistics.showToday = Default2.getBoolean(e.yearlyStatistics.showToday, true);
            e.yearlyStatistics.showThisWeek = Default2.getBoolean(e.yearlyStatistics.showThisWeek, true);
            e.yearlyStatistics.showThisMonth = Default2.getBoolean(e.yearlyStatistics.showThisMonth, true);
            e.yearlyStatistics.showThisYear = Default2.getBoolean(e.yearlyStatistics.showThisYear, true);
            e.yearlyStatistics.showOnlyForCurrentYear = Default2.getBoolean(e.yearlyStatistics.showOnlyForCurrentYear, false);
            e.yearlyStatistics.showPercentages = Default2.getBoolean(e.yearlyStatistics.showPercentages, true);
            return e.yearlyStatistics;
        }
        function p(e) {
            e.events = Default2.getObject(e.events, {});
            e.events.onBackYear = Default2.getFunction(e.events.onBackYear, null);
            e.events.onNextYear = Default2.getFunction(e.events.onNextYear, null);
            e.events.onRefresh = Default2.getFunction(e.events.onRefresh, null);
            e.events.onBeforeRender = Default2.getFunction(e.events.onBeforeRender, null);
            e.events.onRenderComplete = Default2.getFunction(e.events.onRenderComplete, null);
            e.events.onDestroy = Default2.getFunction(e.events.onDestroy, null);
            e.events.onExport = Default2.getFunction(e.events.onExport, null);
            e.events.onSetYear = Default2.getFunction(e.events.onSetYear, null);
            e.events.onTypeSwitch = Default2.getFunction(e.events.onTypeSwitch, null);
            e.events.onMapDayToolTipRender = Default2.getFunction(e.events.onMapDayToolTipRender, null);
            e.events.onChartDayToolTipRender = Default2.getFunction(e.events.onChartDayToolTipRender, e.events.onMapDayToolTipRender);
            e.events.onAdd = Default2.getFunction(e.events.onAdd, null);
            e.events.onRemove = Default2.getFunction(e.events.onRemove, null);
            e.events.onReset = Default2.getFunction(e.events.onReset, null);
            e.events.onViewSwitch = Default2.getFunction(e.events.onViewSwitch, null);
            e.events.onColorRangeTypeToggle = Default2.getFunction(e.events.onColorRangeTypeToggle, null);
            e.events.onImport = Default2.getFunction(e.events.onImport, null);
            e.events.onDataFetch = Default2.getFunction(e.events.onDataFetch, null);
            e.events.onClear = Default2.getFunction(e.events.onClear, null);
            e.events.onUpdate = Default2.getFunction(e.events.onUpdate, null);
            e.events.onOptionsUpdate = Default2.getFunction(e.events.onOptionsUpdate, null);
            e.events.onMapDayClick = Default2.getFunction(e.events.onMapDayClick, null);
            e.events.onMapDayDblClick = Default2.getFunction(e.events.onMapDayDblClick, null);
            e.events.onChartDayClick = Default2.getFunction(e.events.onChartDayClick, e.events.onMapDayClick);
            e.events.onChartDayDblClick = Default2.getFunction(e.events.onChartDayDblClick, e.events.onMapDayDblClick);
            e.events.onWeekDayClick = Default2.getFunction(e.events.onWeekDayClick, null);
            e.events.onWeekDayDblClick = Default2.getFunction(e.events.onWeekDayDblClick, null);
            e.events.onMonthClick = Default2.getFunction(e.events.onMonthClick, null);
            e.events.onMonthDblClick = Default2.getFunction(e.events.onMonthDblClick, null);
            e.events.onStatisticClick = Default2.getFunction(e.events.onStatisticClick, null);
            e.events.onStatisticDblClick = Default2.getFunction(e.events.onStatisticDblClick, null);
            e.events.onMapZoomLevelChange = Default2.getFunction(e.events.onMapZoomLevelChange, null);
            return e.events;
        }
    })(t = e.Options || (e.Options = {}));
})(Binding || (Binding = {}));

var Configuration;

(e => {
    let t;
    (e => {
        function t(e = null) {
            const t = Default2.getObject(e, {});
            t.safeMode = Default2.getBoolean(t.safeMode, true);
            t.observationMode = Default2.getBoolean(t.observationMode, true);
            t.domElementTypes = Default2.getStringOrArray(t.domElementTypes, [ "*" ]);
            t.text = n(t);
            t.text = o(t.text);
            return t;
        }
        e.get = t;
        function n(e) {
            e.text = Default2.getObject(e.text, {});
            e.text.stText = Default2.getAnyString(e.text.stText, "st");
            e.text.ndText = Default2.getAnyString(e.text.ndText, "nd");
            e.text.rdText = Default2.getAnyString(e.text.rdText, "rd");
            e.text.thText = Default2.getAnyString(e.text.thText, "th");
            e.text.backButtonText = Default2.getAnyString(e.text.backButtonText, "Back");
            e.text.nextButtonText = Default2.getAnyString(e.text.nextButtonText, "Next");
            e.text.refreshButtonText = Default2.getAnyString(e.text.refreshButtonText, "Refresh");
            e.text.exportButtonText = Default2.getAnyString(e.text.exportButtonText, "Export");
            e.text.lessText = Default2.getAnyString(e.text.lessText, "Less");
            e.text.moreText = Default2.getAnyString(e.text.moreText, "More");
            e.text.dateText = Default2.getAnyString(e.text.dateText, "Date");
            e.text.countText = Default2.getAnyString(e.text.countText, "Count");
            e.text.mapText = Default2.getAnyString(e.text.mapText, "Map");
            e.text.chartText = Default2.getAnyString(e.text.chartText, "Chart");
            e.text.noChartDataMessage = Default2.getAnyString(e.text.noChartDataMessage, "There is currently no data to view.");
            e.text.statisticsText = Default2.getAnyString(e.text.statisticsText, "Statistics");
            e.text.noStatisticsDataMessage = Default2.getAnyString(e.text.noStatisticsDataMessage, "There are currently no statistics to view.");
            e.text.unknownTrendText = Default2.getAnyString(e.text.unknownTrendText, "Unknown");
            e.text.importButtonText = Default2.getAnyString(e.text.importButtonText, "Import");
            e.text.noMapDataMessage = Default2.getAnyString(e.text.noMapDataMessage, "There is currently no data to view.");
            e.text.objectErrorText = Default2.getAnyString(e.text.objectErrorText, "Errors in object: {{error_1}}, {{error_2}}");
            e.text.attributeNotValidErrorText = Default2.getAnyString(e.text.attributeNotValidErrorText, "The attribute '{{attribute_name}}' is not a valid object.");
            e.text.attributeNotSetErrorText = Default2.getAnyString(e.text.attributeNotSetErrorText, "The attribute '{{attribute_name}}' has not been set correctly.");
            e.text.closeButtonText = Default2.getAnyString(e.text.closeButtonText, "Close");
            e.text.configurationButtonText = Default2.getAnyString(e.text.configurationButtonText, "Configuration");
            e.text.configurationTitleText = Default2.getAnyString(e.text.configurationTitleText, "Configuration");
            e.text.visibleMonthsText = Default2.getAnyString(e.text.visibleMonthsText, "Visible Months");
            e.text.visibleDaysText = Default2.getAnyString(e.text.visibleDaysText, "Visible Days");
            e.text.dataText = Default2.getAnyString(e.text.dataText, "Data");
            e.text.colorRangesText = Default2.getAnyString(e.text.colorRangesText, "Color Ranges");
            e.text.yearText = Default2.getAnyString(e.text.yearText, "Year");
            e.text.daysText = Default2.getAnyString(e.text.daysText, "Days");
            e.text.noDaysDataMessage = Default2.getAnyString(e.text.noDaysDataMessage, "There are currently no days to view.");
            e.text.currentYearText = Default2.getAnyString(e.text.currentYearText, "Current Year");
            e.text.todayText = Default2.getAnyString(e.text.todayText, "Today");
            e.text.thisWeekText = Default2.getAnyString(e.text.thisWeekText, "This Week");
            e.text.thisMonthText = Default2.getAnyString(e.text.thisMonthText, "This Month");
            e.text.thisYearText = Default2.getAnyString(e.text.thisYearText, "This Year");
            e.text.unavailableText = Default2.getAnyString(e.text.unavailableText, "Unavailable");
            e.text.monthsText = Default2.getAnyString(e.text.monthsText, "Months");
            e.text.noMonthsDataMessage = Default2.getAnyString(e.text.noMonthsDataMessage, "There are currently no months to view.");
            e.text.selectTypeText = Default2.getAnyString(e.text.selectTypeText, "Select Type");
            e.text.filenamePlaceholderText = Default2.getAnyString(e.text.filenamePlaceholderText, "Filename (optional)");
            e.text.onlyDataBeingViewedText = Default2.getAnyString(e.text.onlyDataBeingViewedText, "Only data being viewed");
            e.text.zoomInText = Default2.getAnyString(e.text.zoomInText, "Zoom In");
            e.text.zoomOutText = Default2.getAnyString(e.text.zoomOutText, "Zoom Out");
            e.text.clearButtonText = Default2.getAnyString(e.text.clearButtonText, "Clear");
            e.text.selectFilesText = Default2.getAnyString(e.text.selectFilesText, "Select File(s)");
            e.text.dragAndDropFilesText = Default2.getAnyString(e.text.dragAndDropFilesText, "Drag and drop your file(s) here ...");
            e.text.addTypeText = Default2.getAnyString(e.text.addTypeText, "Add Type");
            e.text.typePlaceholderText = Default2.getAnyString(e.text.typePlaceholderText, "Type");
            e.text.addButtonText = Default2.getAnyString(e.text.addButtonText, "Add");
            e.text.removeButtonText = Default2.getAnyString(e.text.removeButtonText, "Remove");
            return e.text;
        }
        function o(e) {
            if (Is.invalidOptionArray(e.monthNames, 12)) {
                e.monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
            }
            if (Is.invalidOptionArray(e.dayNames, 7)) {
                e.dayNames = [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ];
            }
            return e;
        }
    })(t = e.Options || (e.Options = {}));
})(Configuration || (Configuration = {}));

var Disabled;

(e => {
    let t;
    (e => {
        function t(e) {
            e._currentView.disabledBackground = DomElement.create(e._currentView.element, "div", "disabled");
        }
        e.render = t;
        function n(e) {
            if (Is.defined(e._currentView.disabledBackground) && e._currentView.disabledBackground.style.display !== "block") {
                e._currentView.disabledBackground.style.display = "block";
            }
        }
        e.show = n;
        function o(e) {
            if (Is.defined(e._currentView.disabledBackground) && e._currentView.disabledBackground.style.display !== "none") {
                e._currentView.disabledBackground.style.display = "none";
            }
        }
        e.hide = o;
    })(t = e.Background || (e.Background = {}));
})(Disabled || (Disabled = {}));

var Visible;

(e => {
    function t(e) {
        let t = [];
        if (e._currentView.view === 1) {
            t = e.views.map.monthsToShow;
        } else if (e.views.chart.enabled && e._currentView.view === 2) {
            t = e.views.chart.monthsToShow;
        } else if (e.views.days.enabled && e._currentView.view === 3) {
            t = e.views.days.monthsToShow;
        } else if (e.views.months.enabled && e._currentView.view === 5) {
            t = e.views.months.monthsToShow;
        } else if (e.views.statistics.enabled && e._currentView.view === 4) {
            t = e.views.statistics.monthsToShow;
        } else {
            t = e.views.map.monthsToShow;
        }
        return t;
    }
    e.months = t;
    function n(e) {
        let t = [];
        if (e._currentView.view === 1) {
            t = e.views.map.daysToShow;
        } else if (e.views.chart.enabled && e._currentView.view === 2) {
            t = e.views.chart.daysToShow;
        } else if (e.views.days.enabled && e._currentView.view === 3) {
            t = e.views.days.daysToShow;
        } else if (e.views.months.enabled && e._currentView.view === 5) {
            t = e.views.months.daysToShow;
        } else if (e.views.statistics.enabled && e._currentView.view === 4) {
            t = e.views.statistics.daysToShow;
        } else {
            t = e.views.map.daysToShow;
        }
        return t;
    }
    e.days = n;
})(Visible || (Visible = {}));

var Import;

(e => {
    function t(e, t, c, u) {
        if (t === "json") {
            n(e, c, u);
        } else if (t === "txt") {
            o(e, c);
        } else if (t === "csv") {
            i(e, c);
        } else if (t === "tsv") {
            s(e, c);
        } else if (t === "md") {
            r(e, c);
        } else if (t === "yaml") {
            a(e, c);
        } else if (t === "toml") {
            l(e, c);
        }
    }
    e.file = t;
    function n(e, t, n) {
        const o = new FileReader;
        let i = {};
        o.onloadend = () => t(e.name, i);
        o.onload = e => {
            const t = Default2.getObjectFromString(e.target.result, n);
            if (t.parsed && Is.definedObject(t.object)) {
                i = t.object;
            }
        };
        o.readAsText(e);
    }
    function o(e, t) {
        const n = new FileReader;
        const o = {};
        n.onloadend = () => t(e.name, o);
        n.onload = e => {
            const t = e.target.result.toString().split("\n");
            const n = t.length;
            for (let e = 0; e < n; e++) {
                const n = t[e].split(":");
                o[n[0].trim()] = parseInt(n[1].trim());
            }
        };
        n.readAsText(e);
    }
    function i(e, t) {
        const n = new FileReader;
        const o = {};
        n.onloadend = () => t(e.name, o);
        n.onload = e => {
            const t = e.target.result.toString().replace(new RegExp('"', "g"), "");
            const n = t.split("\n");
            const i = n.length;
            for (let e = 1; e < i; e++) {
                let t = n[e].split(",");
                o[t[0].trim()] = parseInt(t[1].trim());
            }
        };
        n.readAsText(e);
    }
    function s(e, t) {
        const n = new FileReader;
        const o = {};
        n.onloadend = () => t(e.name, o);
        n.onload = e => {
            const t = e.target.result.toString().split("\n");
            const n = t.length;
            for (let e = 1; e < n; e++) {
                const n = t[e].split("\t");
                o[n[0].trim()] = parseInt(n[1].trim());
            }
        };
        n.readAsText(e);
    }
    function r(e, t) {
        const n = new FileReader;
        const o = {};
        n.onloadend = () => t(e.name, o);
        n.onload = e => {
            const t = e.target.result.toString().split("\n");
            const n = t.length;
            for (let e = 2; e < n; e++) {
                const n = t[e].trim();
                const i = n.substring(1, n.length - 1).trim();
                const s = i.split("|");
                o[s[0].trim()] = parseInt(s[1].trim());
            }
        };
        n.readAsText(e);
    }
    function a(e, t) {
        const n = new FileReader;
        const o = {};
        n.onloadend = () => t(e.name, o);
        n.onload = e => {
            const t = e.target.result.toString().split("\n");
            const n = t.length;
            for (let e = 1; e < n; e++) {
                const n = t[e].split(":");
                o[n[0].trim()] = parseInt(n[1].trim());
            }
        };
        n.readAsText(e);
    }
    function l(e, t) {
        const n = new FileReader;
        const o = {};
        n.onloadend = () => t(e.name, o);
        n.onload = e => {
            const t = e.target.result.toString().split("\n");
            const n = t.length;
            for (let e = 3; e < n; e++) {
                const n = t[e].split("=");
                o[n[0].trim()] = parseInt(n[1].trim());
            }
        };
        n.readAsText(e);
    }
})(Import || (Import = {}));

var Export;

(e => {
    let t;
    (e => {
        function t(e) {
            let t = null;
            if (e.toLowerCase() === "csv") {
                t = "text/csv";
            } else if (e.toLowerCase() === "json") {
                t = "application/json";
            } else if (e.toLowerCase() === "xml") {
                t = "application/xml";
            } else if (e.toLowerCase() === "txt") {
                t = "text/plain";
            } else if (e.toLowerCase() === "html") {
                t = "text/html";
            } else if (e.toLowerCase() === "md") {
                t = "text/x-markdown";
            } else if (e.toLowerCase() === "tsv") {
                t = "text/tab-separated-values";
            } else if (e.toLowerCase() === "yaml") {
                t = "application/yaml";
            } else if (e.toLowerCase() === "toml") {
                t = "application/toml";
            }
            return t;
        }
        e.mimeType = t;
        function n(e, t, n, o) {
            let i = null;
            if (Is.definedString(n)) {
                i = `${n}.${o.toLowerCase()}`;
            } else {
                const n = new Date;
                const s = `${Str.padNumber(n.getDate())}${"-"}${Str.padNumber(n.getMonth() + 1)}${"-"}${n.getFullYear()}`;
                const r = `${Str.padNumber(n.getHours())}${"-"}${Str.padNumber(n.getMinutes())}`;
                let a = "";
                if (t._currentView.type !== e.text.unknownTrendText) {
                    a = `${t._currentView.type.toLowerCase().replace(/ /g, "_")}${"_"}`;
                }
                i = `${a}${s}${"_"}${r}.${o.toLowerCase()}`;
            }
            return i;
        }
        e.filename = n;
    })(t = e.File || (e.File = {}));
    let n;
    (e => {
        function t(e, t, d) {
            let m = null;
            if (e === "csv") {
                m = n(t, d);
            } else if (e === "json") {
                m = o(t);
            } else if (e === "xml") {
                m = i(t);
            } else if (e === "txt") {
                m = s(t);
            } else if (e === "html") {
                m = r(t, d);
            } else if (e === "md") {
                m = a(t);
            } else if (e === "tsv") {
                m = l(t);
            } else if (e === "yaml") {
                m = c(t, d);
            } else if (e === "toml") {
                m = u(t, d);
            }
            return m;
        }
        e.get = t;
        function n(e, t) {
            const n = [];
            for (const t in e) {
                if (e.hasOwnProperty(t)) {
                    n.push(m([ d(t), d(e[t].toString()) ]));
                }
            }
            if (n.length > 0) {
                n.unshift(m([ d(t.text.dateText), d(t.text.countText) ]));
            }
            return n.join("\n");
        }
        function o(e) {
            return JSON.stringify(e);
        }
        function i(e) {
            const t = [];
            t.push('<?xml version="1.0" ?>');
            t.push("<Dates>");
            for (const n in e) {
                if (e.hasOwnProperty(n)) {
                    t.push("<Date>");
                    t.push(`<FullDate>${n}</FullDate>`);
                    t.push(`<Count>${e[n].toString()}</Count>`);
                    t.push("</Date>");
                }
            }
            t.push("</Dates>");
            return t.join("\n");
        }
        function s(e) {
            const t = [];
            for (const n in e) {
                if (e.hasOwnProperty(n)) {
                    t.push(`${n}${":"}${" "}${e[n].toString()}`);
                }
            }
            return t.join("\n");
        }
        function r(e, t) {
            const n = [];
            const o = DateTime.getCustomFormattedDateText(t, "{dddd}, {d}{0} {mmmm} {yyyy}", new Date);
            n.push("<!DOCTYPE html>");
            n.push("<html>");
            n.push("<head>");
            n.push('<meta charset="utf-8" />');
            n.push(`<meta http-equiv="Last-Modified" content="${o} GMT" />`);
            n.push("</head>");
            n.push("<body>");
            n.push("<ul>");
            for (const t in e) {
                if (e.hasOwnProperty(t)) {
                    n.push(`<li><b>${t}:</b> ${e[t].toString()}</li>`);
                }
            }
            n.push("</ul>");
            n.push("</body>");
            n.push("</html>");
            return n.join("\n");
        }
        function a(e) {
            const t = [];
            t.push("| Full Date | Count |");
            t.push("| --- | --- |");
            for (const n in e) {
                if (e.hasOwnProperty(n)) {
                    t.push(`| ${n} | ${e[n].toString()} |`);
                }
            }
            return t.join("\n");
        }
        function l(e) {
            const t = [];
            t.push(`Full Date${"\t"}Count`);
            for (const n in e) {
                if (e.hasOwnProperty(n)) {
                    t.push(`${n}${"\t"}${e[n].toString()}`);
                }
            }
            return t.join("\n");
        }
        function c(e, t) {
            const n = [];
            const o = DateTime.getCustomFormattedDateText(t, "{dddd}, {d}{o} {mmmm} {yyyy}", new Date);
            n.push(`Last-Modified:${" "}${o}`);
            for (const t in e) {
                if (e.hasOwnProperty(t)) {
                    n.push(`${t}${":"}${" "}${e[t].toString()}`);
                }
            }
            return n.join("\n");
        }
        function u(e, t) {
            const n = [];
            const o = DateTime.getCustomFormattedDateText(t, "{dddd}, {d}{o} {mmmm} {yyyy}", new Date);
            n.push(`last_modified = "${o}"`);
            n.push("");
            n.push("[dates]");
            for (const t in e) {
                if (e.hasOwnProperty(t)) {
                    n.push(`${t} = ${e[t].toString()}`);
                }
            }
            return n.join("\n");
        }
        function d(e) {
            let t = e.toString().replace(/(\r\n|\n|\r)/gm, "").replace(/(\s\s)/gm, " ");
            t = t.replace(/"/g, '""');
            t = `"${t}"`;
            return t;
        }
        function m(e) {
            return e.join(",");
        }
    })(n = e.Contents || (e.Contents = {}));
})(Export || (Export = {}));

var Convert;

(e => {
    function t(e, t) {
        const n = e.indexOf(") ") > -1 ? `${e.split(") ")[0]})` : e;
        let o = n.replace("rgba(", "").replace("rgb(", "").replace(")", "").split(",");
        if (n.startsWith("rgba")) {
            o[o.length - 1] = t.toString();
        } else {
            o.push(t.toString());
        }
        return `rgba(${o.join()})`;
    }
    e.toRgbOpacityColor = t;
    function n(e) {
        const t = e.trim().replace("#", "");
        let n = 1;
        const o = parseInt(t.substring(0, 2), 16);
        const i = parseInt(t.substring(2, 4), 16);
        const s = parseInt(t.substring(4, 6), 16);
        if (e.length === 8) {
            n = parseInt(t.substring(6, 8), 16);
        }
        return `rgba(${o}, ${i}, ${s}, ${n})`;
    }
    e.hexToRgba = n;
    function o(e) {
        const t = Object.values(e.values).sort((e, t) => e - t);
        const n = t.length;
        const o = 1 / n;
        for (let i = 0; i < n; i++) {
            e.valueOpacities[t[i]] = parseFloat((o * (i + 1)).toFixed(2));
        }
    }
    e.valuesToOpacitiesOrder = o;
})(Convert || (Convert = {}));

var Css;

(e => {
    let t;
    (e => {
        e.DaySize = "--heat-js-day-size";
        e.Spacing = "--heat-js-spacing";
    })(t = e.Variables || (e.Variables = {}));
})(Css || (Css = {}));

var Animate;

(e => {
    function t(e, t, n, o = true) {
        if (n > 0) {
            if (o && e.chartsAnimationDelay > 0) {
                setTimeout(() => {
                    t.style.height = `${n}px`;
                }, e.chartsAnimationDelay);
            } else {
                t.style.height = `${n}px`;
            }
        }
    }
    e.setHeight = t;
})(Animate || (Animate = {}));

(() => {
    let e = {};
    let t = null;
    let n = {};
    function o() {
        const t = e.domElementTypes;
        const n = t.length;
        for (let e = 0; e < n; e++) {
            const n = document.getElementsByTagName(t[e]);
            const o = [].slice.call(n);
            const s = o.length;
            for (let e = 0; e < s; e++) {
                if (!i(o[e])) {
                    break;
                }
            }
        }
    }
    function i(t) {
        let n = true;
        if (Is.defined(t) && t.hasAttribute(Constant.HEAT_JS_ATTRIBUTE_NAME)) {
            const o = t.getAttribute(Constant.HEAT_JS_ATTRIBUTE_NAME);
            if (Is.definedString(o)) {
                const i = Default2.getObjectFromString(o, e);
                if (i.parsed && Is.definedObject(i.object)) {
                    s(Binding.Options.getForNewInstance(e, i.object, t));
                } else {
                    if (!e.safeMode) {
                        console.error(e.text.attributeNotValidErrorText.replace("{{attribute_name}}", Constant.HEAT_JS_ATTRIBUTE_NAME));
                        n = false;
                    }
                }
            } else {
                if (!e.safeMode) {
                    console.error(e.text.attributeNotSetErrorText.replace("{{attribute_name}}", Constant.HEAT_JS_ATTRIBUTE_NAME));
                    n = false;
                }
            }
        }
        return n;
    }
    function s(e) {
        Trigger.customEvent(e.events.onBeforeRender, e._currentView.element);
        if (!Is.definedString(e._currentView.element.id)) {
            e._currentView.element.id = crypto.randomUUID();
        }
        if (e._currentView.element.className.trim() === "") {
            e._currentView.element.className = "heat-js";
        } else {
            DomElement.addClass(e._currentView.element, "heat-js");
        }
        if (e.resizable) {
            DomElement.addClass(e._currentView.element, "resizable");
        }
        e._currentView.element.removeAttribute(Constant.HEAT_JS_ATTRIBUTE_NAME);
        ce(e._currentView.element.id, e);
        r(e);
        a(e);
        Trigger.customEvent(e.events.onRenderComplete, e._currentView.element);
    }
    function r(e, t = false, n = false, o = false) {
        if (t) {
            we(e);
        }
        if (Is.defined(e._currentView.mapContents)) {
            e._currentView.mapContentsScrollLeft = e._currentView.mapContents.scrollLeft;
        }
        if (e.views.chart.enabled && Is.defined(e._currentView.chartContents)) {
            e._currentView.chartContentsScrollLeft = e._currentView.chartContents.scrollLeft;
        }
        if (e.views.days.enabled && Is.defined(e._currentView.daysContents)) {
            e._currentView.daysContentsScrollLeft = e._currentView.daysContents.scrollLeft;
        }
        if (e.views.statistics.enabled && Is.defined(e._currentView.statisticsContents)) {
            e._currentView.statisticsContentsScrollLeft = e._currentView.statisticsContents.scrollLeft;
        }
        e._currentView.element.innerHTML = "";
        e._currentView.yearsAvailable = de(e);
        ToolTip.hide(e);
        ge(e);
        ae(e);
        if (e.title.showConfigurationButton || e.title.showExportButton || e.title.showImportButton || e.allowTypeAdding) {
            Disabled.Background.render(e);
        }
        if (e.title.showConfigurationButton) {
            l(e);
        }
        if (e.title.showExportButton) {
            d(e);
        }
        if (e.title.showImportButton) {
            p(e);
        }
        if (e.allowTypeAdding) {
            _(e);
        }
        ToolTip.render(e);
        E(e);
        N(e);
        F(e, n, o);
        if (e.views.chart.enabled) {
            Y(e, n);
        }
        if (e.views.days.enabled) {
            Z(e, n);
        }
        if (e.views.months.enabled) {
            J(e, n);
        }
        if (e.views.statistics.enabled) {
            K(e, n);
        }
        te(e);
        e._currentView.mapContentsContainer.style.display = "none";
        if (e._currentView.view === 1) {
            e._currentView.mapContentsContainer.style.display = "block";
        } else if (e.views.chart.enabled && e._currentView.view === 2) {
            e._currentView.chartContents.style.display = "block";
        } else if (e.views.days.enabled && e._currentView.view === 3) {
            e._currentView.daysContents.style.display = "block";
        } else if (e.views.months.enabled && e._currentView.view === 5) {
            e._currentView.monthsContents.style.display = "block";
        } else if (e.views.statistics.enabled && e._currentView.view === 4) {
            e._currentView.statisticsContents.style.display = "block";
        } else {
            e._currentView.view = 1;
            e._currentView.mapContentsContainer.style.display = "block";
        }
    }
    function a(e, t = true) {
        const n = t ? window.addEventListener : window.removeEventListener;
        n("blur", () => ToolTip.hide(e));
    }
    function l(t) {
        t._currentView.configurationDialog = DomElement.create(t._currentView.disabledBackground, "div", "dialog configuration");
        const n = DomElement.create(t._currentView.configurationDialog, "div", "dialog-title-bar");
        const o = DomElement.create(t._currentView.configurationDialog, "div", "dialog-contents");
        const i = DomElement.create(n, "div", "dialog-close");
        const s = DomElement.create(o, "div", "side-container panel");
        const r = DomElement.create(o, "div", "side-container panel");
        DomElement.createWithHTML(n, "span", "dialog-title-bar-text", e.text.configurationTitleText);
        DomElement.createWithHTML(s, "div", "side-container-title-text", `${e.text.visibleDaysText}${":"}`);
        DomElement.createWithHTML(r, "div", "side-container-title-text", `${e.text.visibleMonthsText}${":"}`);
        const a = DomElement.create(r, "div", "side-container");
        const l = DomElement.create(r, "div", "side-container");
        i.onclick = () => u(t);
        for (let n = 0; n < 7; n++) {
            t._currentView.configurationDialogDayCheckBoxes[n] = DomElement.createCheckBox(s, e.text.dayNames[n], n.toString());
        }
        let c = a;
        let d = 0;
        for (let n = t.startMonth; n < 12 + t.startMonth; n++) {
            let o = n;
            if (t.startMonth > 0 && n > 11) {
                o = n - 12;
            }
            t._currentView.configurationDialogMonthCheckBoxes[o] = DomElement.createCheckBox(c, e.text.monthNames[o], o.toString());
            d++;
            if (d > 6) {
                c = l;
            }
        }
        ToolTip.add(i, t, e.text.closeButtonText);
    }
    function c(e) {
        Disabled.Background.show(e);
        if (Is.defined(e._currentView.configurationDialog) && e._currentView.configurationDialog.style.display !== "block") {
            e._currentView.configurationDialog.style.display = "block";
        }
        const t = Visible.days(e);
        const n = Visible.months(e);
        for (let n = 0; n < 7; n++) {
            e._currentView.configurationDialogDayCheckBoxes[n].checked = Is.dayVisible(t, n + 1);
        }
        for (let t = 0; t < 12; t++) {
            e._currentView.configurationDialogMonthCheckBoxes[t].checked = Is.monthVisible(n, t);
        }
        ToolTip.hide(e);
    }
    function u(e) {
        Disabled.Background.hide(e);
        if (Is.defined(e._currentView.configurationDialog) && e._currentView.configurationDialog.style.display !== "none") {
            e._currentView.configurationDialog.style.display = "none";
        }
        const t = [];
        const n = [];
        let o = false;
        for (let n = 0; n < 7; n++) {
            if (e._currentView.configurationDialogDayCheckBoxes[n].checked) {
                t.push(n + 1);
            }
        }
        for (let t = 0; t < 12; t++) {
            if (e._currentView.configurationDialogMonthCheckBoxes[t].checked) {
                n.push(t + 1);
            }
        }
        if (t.length >= 1) {
            if (e._currentView.view === 1) {
                e.views.map.daysToShow = t;
            } else if (e.views.chart.enabled && e._currentView.view === 2) {
                e.views.chart.daysToShow = t;
            } else if (e.views.days.enabled && e._currentView.view === 3) {
                e.views.days.daysToShow = t;
            } else if (e.views.months.enabled && e._currentView.view === 5) {
                e.views.months.daysToShow = t;
            } else if (e.views.statistics.enabled && e._currentView.view === 4) {
                e.views.statistics.daysToShow = t;
            } else {
                e.views.map.daysToShow = t;
            }
            o = true;
        }
        if (n.length >= 1) {
            if (e._currentView.view === 1) {
                e.views.map.monthsToShow = n;
            } else if (e.views.chart.enabled && e._currentView.view === 2) {
                e.views.chart.monthsToShow = n;
            } else if (e.views.days.enabled && e._currentView.view === 3) {
                e.views.days.monthsToShow = n;
            } else if (e.views.months.enabled && e._currentView.view === 5) {
                e.views.months.monthsToShow = n;
            } else if (e.views.statistics.enabled && e._currentView.view === 4) {
                e.views.statistics.monthsToShow = n;
            } else {
                e.views.map.monthsToShow = n;
            }
            o = true;
        }
        if (o) {
            r(e);
            Trigger.customEvent(e.events.onOptionsUpdate, e._currentView.element, e);
        } else {
            ToolTip.hide(e);
        }
    }
    function d(t) {
        t._currentView.exportDialog = DomElement.create(t._currentView.disabledBackground, "div", "dialog export");
        const n = DomElement.create(t._currentView.exportDialog, "div", "dialog-title-bar");
        const o = DomElement.create(t._currentView.exportDialog, "div", "dialog-contents");
        const i = DomElement.create(n, "div", "dialog-close");
        DomElement.createWithHTML(n, "span", "dialog-title-bar-text", e.text.selectTypeText);
        t._currentView.exportDialogExportTypeSelect = DomElement.create(o, "select", "input-box");
        t._currentView.exportDialogExportTypeSelect.name = crypto.randomUUID();
        t._currentView.exportDialogExportFilenameInput = DomElement.create(o, "input", "input-box filename");
        t._currentView.exportDialogExportFilenameInput.name = crypto.randomUUID();
        t._currentView.exportDialogExportFilenameInput.placeholder = e.text.filenamePlaceholderText;
        t._currentView.exportDialogExportOnlyDataBeingViewedCheckBox = DomElement.createCheckBox(o, e.text.onlyDataBeingViewedText, crypto.randomUUID());
        t._currentView.exportDialogExportOnlyDataBeingViewedCheckBox.checked = t.exportOnlyDataBeingViewed;
        const s = DomElement.create(o, "div", "buttons");
        const r = DomElement.createButton(s, "button", "default", e.text.exportButtonText);
        m(t);
        const a = () => {
            const e = t._currentView.exportDialogExportTypeSelect.value;
            const n = t._currentView.exportDialogExportFilenameInput.value;
            const o = t._currentView.exportDialogExportOnlyDataBeingViewedCheckBox.checked;
            w(t);
            h(t, e, n, o);
        };
        t._currentView.exportDialogExportFilenameInput.onkeydown = e => {
            if (e.key === "Enter") {
                a();
            }
        };
        r.onclick = () => a();
        i.onclick = () => w(t);
        ToolTip.add(i, t, e.text.closeButtonText);
    }
    function m(e) {
        let t;
        let n = [];
        for (t in ExportType) {
            const o = DomElement.createWithNoContainer("option");
            o.value = ExportType[t];
            o.textContent = t.toString().toUpperCase();
            o.selected = t === e.exportType;
            n.push(o);
        }
        n.sort((e, t) => e.text.toLowerCase().localeCompare(t.text.toLowerCase()));
        n.forEach(t => e._currentView.exportDialogExportTypeSelect.add(t));
    }
    function f(e) {
        Disabled.Background.show(e);
        if (Is.defined(e._currentView.exportDialog) && e._currentView.exportDialog.style.display !== "block") {
            e._currentView.exportDialogExportFilenameInput.value = "";
            e._currentView.exportDialog.style.display = "block";
            e._currentView.exportDialogExportFilenameInput.focus();
        }
        ToolTip.hide(e);
    }
    function w(e) {
        Disabled.Background.hide(e);
        if (Is.defined(e._currentView.exportDialog) && e._currentView.exportDialog.style.display !== "none") {
            e._currentView.exportDialog.style.display = "none";
        }
        ToolTip.hide(e);
    }
    function h(t, n = null, o = null, i = true) {
        const s = Default2.getString(n, t.exportType).toLowerCase();
        const r = Export.File.mimeType(s);
        const a = g(t, i);
        const l = Export.Contents.get(s, a, e);
        if (Is.definedString(l)) {
            const n = DomElement.create(document.body, "a");
            n.style.display = "none";
            n.setAttribute("target", "_blank");
            n.setAttribute("href", `data:${r};charset=utf-8,${encodeURIComponent(l)}`);
            n.setAttribute("download", Export.File.filename(e, t, o, s));
            n.click();
            document.body.removeChild(n);
            Trigger.customEvent(t.events.onExport, t._currentView.element);
        }
    }
    function g(e, t) {
        const n = {};
        const o = ue(e);
        if (t) {
            const t = e._currentView.year;
            const i = Visible.days(e);
            const s = Visible.months(e);
            for (let r = e.startMonth; r < 12 + e.startMonth; r++) {
                let a = r;
                let l = t;
                if (e.startMonth > 0 && r > 11) {
                    a = r - 12;
                    l++;
                }
                if (Is.monthVisible(s, a)) {
                    const e = DateTime.getTotalDaysInMonth(l, a);
                    for (let t = 0; t < e; t++) {
                        const e = new Date(l, a, t + 1);
                        const s = DateTime.toStorageDate(e);
                        const r = DateTime.getWeekdayNumber(e) + 1;
                        if (Is.dayVisible(i, r)) {
                            if (o.hasOwnProperty(s)) {
                                n[s] = o[s];
                            }
                        }
                    }
                }
            }
        } else {
            const e = [];
            for (const t in o) {
                if (o.hasOwnProperty(t)) {
                    e.push(t);
                }
            }
            e.sort();
            const t = e.length;
            for (let i = 0; i < t; i++) {
                const t = e[i];
                if (o.hasOwnProperty(t)) {
                    n[t] = o[t];
                }
            }
        }
        return n;
    }
    function p(t) {
        t._currentView.importDialog = DomElement.create(t._currentView.disabledBackground, "div", "dialog import");
        const n = DomElement.create(t._currentView.importDialog, "div", "dialog-title-bar");
        const o = DomElement.create(t._currentView.importDialog, "div", "dialog-contents");
        const i = DomElement.create(n, "div", "dialog-close");
        DomElement.createWithHTML(n, "span", "dialog-title-bar-text", e.text.selectFilesText);
        t._currentView.importDialogDragAndDrop = DomElement.createWithHTML(o, "div", "drag-and-drop-files", e.text.dragAndDropFilesText);
        v(t._currentView.importDialogDragAndDrop, t);
        const s = DomElement.create(o, "div", "buttons");
        const r = DomElement.createButton(s, "button", "", "...");
        t._currentView.importDialogImportButton = DomElement.createButton(s, "button", "default", e.text.importButtonText);
        t._currentView.importDialogImportButton.disabled = true;
        i.onclick = () => D(t);
        r.onclick = () => T(t);
        t._currentView.importDialogImportButton.onclick = () => V(t._currentView.importDialogFileList, t);
        ToolTip.add(i, t, e.text.closeButtonText);
    }
    function y(e) {
        Disabled.Background.show(e);
        if (Is.defined(e._currentView.importDialog) && e._currentView.importDialog.style.display !== "block") {
            e._currentView.importDialog.style.display = "block";
        }
        ToolTip.hide(e);
    }
    function D(e) {
        Disabled.Background.hide(e);
        if (Is.defined(e._currentView.importDialog) && e._currentView.importDialog.style.display !== "none") {
            e._currentView.importDialogFileList = null;
            e._currentView.importDialogImportButton.disabled = true;
            e._currentView.importDialog.style.display = "none";
        }
        ToolTip.hide(e);
    }
    function v(e, t) {
        if (t.allowFileImports && !t._currentView.isInFetchMode) {
            e.ondragover = DomElement.cancelBubble;
            e.ondragenter = DomElement.cancelBubble;
            e.ondragleave = DomElement.cancelBubble;
            e.ondrop = e => {
                DomElement.cancelBubble(e);
                if (Is.defined(window.FileReader) && e.dataTransfer.files.length > 0) {
                    const n = new DataTransfer;
                    if (!t.allowFileImports) {
                        n.items.add(e.dataTransfer.files[0]);
                    } else {
                        const t = e.dataTransfer.files.length;
                        for (let o = 0; o < t; o++) {
                            n.items.add(e.dataTransfer.files[o]);
                        }
                    }
                    b(t, n.files);
                }
            };
        }
    }
    function T(e) {
        const t = [];
        let n;
        for (n in ImportType) {
            t.push(`.${n}`);
        }
        const o = DomElement.createWithNoContainer("input");
        o.type = "file";
        o.accept = t.join(", ");
        o.multiple = e.allowMultipleFileImports;
        o.onchange = () => b(e, o.files);
        o.click();
    }
    function b(t, n) {
        if (n.length <= 0) {
            t._currentView.importDialogDragAndDrop.innerHTML = e.text.dragAndDropFilesText;
            t._currentView.importDialogImportButton.disabled = true;
        } else {
            t._currentView.importDialogFileList = n;
            t._currentView.importDialogDragAndDrop.innerHTML = "";
            t._currentView.importDialogImportButton.disabled = false;
            const o = n.length;
            for (let i = 0; i < o; i++) {
                const o = n[i].name;
                const s = DomElement.createWithHTML(t._currentView.importDialogDragAndDrop, "div", "filename", `<b>${i + 1}</b>. ${o}`);
                const r = DomElement.create(s, "div", "remove");
                ToolTip.add(r, t, e.text.removeButtonText);
                r.onclick = () => x(t, i);
            }
        }
    }
    function x(e, t) {
        const n = new DataTransfer;
        const o = e._currentView.importDialogFileList.length;
        for (let i = 0; i < o; i++) {
            if (i !== t) {
                n.items.add(e._currentView.importDialogFileList[i]);
            }
        }
        b(e, n.files);
    }
    function V(t, n) {
        const o = t.length;
        const i = [];
        const s = ue(n);
        const a = (e, t) => {
            i.push(e);
            for (const e in t) {
                if (t.hasOwnProperty(e)) {
                    if (!s.hasOwnProperty(e)) {
                        s[e] = 0;
                    }
                    s[e] += t[e];
                }
            }
            if (i.length === o) {
                Trigger.customEvent(n.events.onImport, n._currentView.element);
                r(n, true);
            }
        };
        for (let n = 0; n < o; n++) {
            const o = t[n];
            const i = o.name.split(".").pop().toLowerCase();
            Import.file(o, i, a, e);
        }
    }
    function _(t) {
        t._currentView.typeAddingDialog = DomElement.create(t._currentView.disabledBackground, "div", "dialog add-type");
        const o = DomElement.create(t._currentView.typeAddingDialog, "div", "dialog-title-bar");
        const i = DomElement.create(t._currentView.typeAddingDialog, "div", "dialog-contents");
        const s = DomElement.create(o, "div", "dialog-close");
        DomElement.createWithHTML(o, "span", "dialog-title-bar-text", e.text.addTypeText);
        t._currentView.typeAddingDialogTypeInput = DomElement.create(i, "input", "input-box type");
        t._currentView.typeAddingDialogTypeInput.name = crypto.randomUUID();
        t._currentView.typeAddingDialogTypeInput.placeholder = e.text.typePlaceholderText;
        const a = DomElement.create(i, "div", "buttons");
        const l = DomElement.createButton(a, "button", "default", e.text.addButtonText);
        const c = () => {
            const e = t._currentView.typeAddingDialogTypeInput.value.trim();
            if (Is.definedString(e)) {
                const o = t._currentView.element.id;
                if (!n[o].typeData.hasOwnProperty(e)) {
                    n[o].typeData[e] = {};
                    n[o].totalTypes++;
                }
                t._currentView.type = e;
                Trigger.customEvent(t.events.onTypeSwitch, e);
                w(t);
                r(t, true);
            } else {
                w(t);
            }
        };
        t._currentView.typeAddingDialogTypeInput.onkeydown = e => {
            if (e.key === "Enter") {
                c();
            }
        };
        l.onclick = () => c();
        s.onclick = () => S(t);
        ToolTip.add(s, t, e.text.closeButtonText);
    }
    function C(e) {
        Disabled.Background.show(e);
        if (Is.defined(e._currentView.typeAddingDialog) && e._currentView.typeAddingDialog.style.display !== "block") {
            e._currentView.typeAddingDialogTypeInput.value = "";
            e._currentView.typeAddingDialog.style.display = "block";
            e._currentView.typeAddingDialogTypeInput.focus();
        }
        ToolTip.hide(e);
    }
    function S(e) {
        Disabled.Background.hide(e);
        if (Is.defined(e._currentView.typeAddingDialog) && e._currentView.typeAddingDialog.style.display !== "none") {
            e._currentView.typeAddingDialog.style.display = "none";
        }
        ToolTip.hide(e);
    }
    function E(t) {
        if (t.title.showText || t.title.showYearSelector || t.title.showRefreshButton || t.title.showExportButton || t.title.showImportButton || t.title.showClearButton) {
            const n = DomElement.create(t._currentView.element, "div", "title-bar");
            const o = DomElement.create(n, "div", "title");
            const i = t.title.showTitleDropDownMenu && (t.views.chart.enabled || t.views.days.enabled || t.views.statistics.enabled);
            if (i) {
                if (t.title.showTitleDropDownButton) {
                    DomElement.create(o, "div", "down-arrow");
                }
            } else {
                DomElement.addClass(o, "no-click");
            }
            if (t.title.showText) {
                o.innerHTML += t.title.text;
                if (t.title.showSectionText) {
                    DomElement.createWithHTML(o, "span", "section-text", "[");
                    if (t._currentView.view === 1) {
                        DomElement.createWithHTML(o, "span", "section-text-name", e.text.mapText);
                    } else if (t.views.chart.enabled && t._currentView.view === 2) {
                        DomElement.createWithHTML(o, "span", "section-text-name", e.text.chartText);
                    } else if (t.views.days.enabled && t._currentView.view === 3) {
                        DomElement.createWithHTML(o, "span", "section-text-name", e.text.daysText);
                    } else if (t.views.months.enabled && t._currentView.view === 5) {
                        DomElement.createWithHTML(o, "span", "section-text-name", e.text.monthsText);
                    } else if (t.views.statistics.enabled && t._currentView.view === 4) {
                        DomElement.createWithHTML(o, "span", "section-text-name", e.text.colorRangesText);
                    } else {
                        DomElement.createWithHTML(o, "span", "section-text-name", e.text.mapText);
                    }
                    DomElement.createWithHTML(o, "span", "section-text", "]");
                }
            }
            if (i) {
                I(t, o);
            }
            if (t.title.showImportButton && !t._currentView.isInFetchMode) {
                const o = DomElement.createIconButton(n, "button", "import", "arrow-up");
                o.onclick = () => y(t);
                if (t.title.showToolTips) {
                    ToolTip.add(o, t, e.text.importButtonText);
                }
            }
            if (t.title.showExportButton) {
                const o = DomElement.createIconButton(n, "button", "export", "arrow-down");
                o.onclick = () => f(t);
                if (t.title.showToolTips) {
                    ToolTip.add(o, t, e.text.exportButtonText);
                }
            }
            if (t.title.showRefreshButton) {
                const o = DomElement.createIconButton(n, "button", "refresh", "refresh");
                if (t.title.showToolTips) {
                    ToolTip.add(o, t, e.text.refreshButtonText);
                }
                o.onclick = () => {
                    r(t);
                    Trigger.customEvent(t.events.onRefresh, t._currentView.element);
                };
            }
            if (t.title.showClearButton) {
                const o = DomElement.createIconButton(n, "button", "clear", "close");
                if (t.title.showToolTips) {
                    ToolTip.add(o, t, e.text.clearButtonText);
                }
                o.onclick = () => {
                    me(t);
                    r(t, true);
                };
            }
            if (t.title.showYearSelector) {
                const o = DomElement.createIconButton(n, "button", "back", "arrow-left");
                o.onclick = () => _e(t);
                if (t.title.showToolTips) {
                    ToolTip.add(o, t, e.text.backButtonText);
                }
                if (Is.firstVisibleYear(t, t._currentView.year)) {
                    o.disabled = true;
                }
                let i = t._currentView.year.toString();
                if (t.startMonth > 0) {
                    i += ` / ${t._currentView.year + 1}`;
                }
                t._currentView.yearText = DomElement.createWithHTML(n, "div", "year-text", i);
                if (t.title.showYearSelectionDropDown) {
                    A(t);
                } else {
                    DomElement.addClass(t._currentView.yearText, "no-click");
                }
                if (t.title.showConfigurationButton) {
                    let o = DomElement.create(n, "div", "configure");
                    o.onclick = () => c(t);
                    if (t.title.showToolTips) {
                        ToolTip.add(o, t, e.text.configurationButtonText);
                    }
                }
                if (t.title.showCurrentYearButton) {
                    const o = DomElement.createIconButton(n, "button", "current", "pin");
                    if (t.title.showToolTips) {
                        ToolTip.add(o, t, e.text.currentYearText);
                    }
                    o.onclick = () => {
                        t._currentView.year = (new Date).getFullYear() - 1;
                        Ce(t, false);
                        Trigger.customEvent(t.events.onSetYear, t._currentView.year);
                    };
                }
                const s = DomElement.createIconButton(n, "button", "next", "arrow-right");
                s.onclick = () => Ce(t);
                if (t.title.showToolTips) {
                    ToolTip.add(s, t, e.text.nextButtonText);
                }
                if (Is.lastVisibleYear(t, t._currentView.year)) {
                    s.disabled = true;
                }
            }
        }
    }
    function I(t, n) {
        const o = DomElement.create(n, "div", "titles-menu-container");
        const i = DomElement.create(o, "div", "titles-menu");
        if (t.title.showTitleDropDownHeaders) {
            DomElement.createWithHTML(i, "div", "title-menu-header", `${e.text.dataText}${":"}`);
        }
        const s = M(t, i, e.text.mapText);
        B(t, s, 1, "map");
        if (t.views.chart.enabled) {
            const n = M(t, i, e.text.chartText);
            B(t, n, 2, "chart");
        }
        let r = null;
        if (t.views.days.enabled) {
            if (t.title.showTitleDropDownHeaders) {
                r = DomElement.createWithHTML(i, "div", "title-menu-header", `${e.text.yearText}${":"}`);
            }
            const n = M(t, i, e.text.daysText);
            B(t, n, 3, "days");
        }
        if (t.views.months.enabled) {
            if (t.title.showTitleDropDownHeaders && !Is.defined(r)) {
                r = DomElement.createWithHTML(i, "div", "title-menu-header", `${e.text.yearText}${":"}`);
            }
            const n = M(t, i, e.text.monthsText);
            B(t, n, 5, "months");
        }
        if (t.views.statistics.enabled) {
            if (t.title.showTitleDropDownHeaders) {
                DomElement.createWithHTML(i, "div", "title-menu-header", `${e.text.statisticsText}${":"}`);
            }
            const n = M(t, i, e.text.colorRangesText);
            B(t, n, 4, "statistics");
        }
    }
    function M(e, t, n) {
        const o = DomElement.createWithHTML(t, "div", "title-menu-item", n);
        if (e.title.showTitleDropDownHeaders) {
            DomElement.addClass(o, "indented");
        }
        return o;
    }
    function B(e, t, n, o) {
        if (e._currentView.view === n) {
            DomElement.addClass(t, "title-menu-item-active");
        } else {
            t.onclick = () => re(e, n, o);
        }
    }
    function A(e) {
        DomElement.create(e._currentView.yearText, "div", "down-arrow");
        const t = DomElement.create(e._currentView.yearText, "div", "years-menu-container");
        const n = DomElement.create(t, "div", "years-menu");
        const o = (new Date).getFullYear();
        let i = null;
        t.style.display = "block";
        t.style.visibility = "hidden";
        for (let t = o - e.title.extraSelectionYears; t < o + e.title.extraSelectionYears; t++) {
            if (Is.yearVisible(e, t)) {
                let s = O(e, n, t, o);
                if (!Is.defined(i)) {
                    i = s;
                }
            }
        }
        if (Is.defined(i)) {
            n.scrollTop = i.offsetTop - n.offsetHeight / 2;
        }
        t.style.display = "none";
        t.style.visibility = "visible";
    }
    function O(e, t, n, o) {
        let i = null;
        const s = e.startMonth === 0 ? n.toString() : `${n} / ${n + 1}`;
        const a = DomElement.createWithHTML(t, "div", "year-menu-item", s);
        if (e._currentView.year !== n) {
            a.onclick = () => {
                e._currentView.year = n;
                r(e);
                Trigger.customEvent(e.events.onSetYear, e._currentView.year);
            };
            if (n === o) {
                DomElement.addClass(a, "year-menu-item-current");
            }
        } else {
            DomElement.addClass(a, "year-menu-item-active");
            i = a;
        }
        return i;
    }
    function N(t) {
        const o = new Date;
        const i = t._currentView.year === o.getFullYear();
        if (t.yearlyStatistics.enabled && (!t.yearlyStatistics.showOnlyForCurrentYear || i)) {
            const s = DomElement.create(t._currentView.element, "div", "yearly-statistics");
            const r = Visible.days(t);
            const a = Visible.months(t);
            const l = new Date(t._currentView.year, t.startMonth, 1);
            const c = new Date(t._currentView.year + 1, t.startMonth, 1);
            const u = L(t, r, a, l, c);
            if (t.yearlyStatistics.showToday) {
                let a = n[t._currentView.element.id].typeData[t._currentView.type][DateTime.toStorageDate(o)];
                const l = DomElement.create(s, "div", "statistics-box");
                const c = DateTime.getWeekdayNumber(o) + 1;
                if (!Is.defined(a) || !Is.dayVisible(r, c)) {
                    a = 0;
                }
                const d = i ? Str.friendlyNumber(a) : e.text.unavailableText;
                DomElement.createWithHTML(l, "div", "statistics-box-title", `${e.text.todayText}${":"}`);
                const m = DomElement.createWithHTML(l, "div", "statistics-box-count", d);
                if (!i) {
                    DomElement.addClass(m, "unavailable");
                }
                k(t, m, u, a, i);
            }
            if (t.yearlyStatistics.showThisWeek) {
                let n = 0;
                if (i) {
                    const e = DateTime.getDateForMondayOfCurrentWeek();
                    const o = new Date(e);
                    o.setDate(e.getDate() + 7);
                    n = L(t, r, a, e, o);
                }
                const o = i ? Str.friendlyNumber(n) : e.text.unavailableText;
                const l = DomElement.create(s, "div", "statistics-box");
                DomElement.createWithHTML(l, "div", "statistics-box-title", `${e.text.thisWeekText}${":"}`);
                const c = DomElement.createWithHTML(l, "div", "statistics-box-count", o);
                if (!i) {
                    DomElement.addClass(c, "unavailable");
                }
                k(t, c, u, n, i);
            }
            if (t.yearlyStatistics.showThisMonth) {
                let n = 0;
                if (i) {
                    const e = new Date(o.getFullYear(), o.getMonth(), 1);
                    const i = new Date(o.getFullYear(), o.getMonth(), DateTime.getTotalDaysInMonth(o.getFullYear(), o.getMonth()) + 1);
                    n = L(t, r, a, e, i);
                }
                const l = i ? Str.friendlyNumber(n) : e.text.unavailableText;
                const c = DomElement.create(s, "div", "statistics-box");
                DomElement.createWithHTML(c, "div", "statistics-box-title", `${e.text.thisMonthText}${":"}`);
                const d = DomElement.createWithHTML(c, "div", "statistics-box-count", l);
                if (!i) {
                    DomElement.addClass(d, "unavailable");
                }
                k(t, d, u, n, i);
            }
            if (t.yearlyStatistics.showThisYear) {
                const t = DomElement.create(s, "div", "statistics-box");
                DomElement.createWithHTML(t, "div", "statistics-box-title", `${e.text.thisYearText}${":"}`);
                DomElement.createWithHTML(t, "div", "statistics-box-count", Str.friendlyNumber(u));
            }
            if (s.innerHTML === "") {
                s.parentNode.removeChild(s);
            }
        }
    }
    function k(e, t, n, o, i) {
        if (i && e.yearlyStatistics.showPercentages) {
            const i = o / n * 100;
            if (!isNaN(i)) {
                const n = `${i.toFixed(e.percentageDecimalPoints)}%`;
                const o = DomElement.create(t, "span", "percentage");
                DomElement.createWithHTML(o, "span", "percentage-bracket", "(");
                DomElement.createWithHTML(o, "span", "percentage-text", n);
                DomElement.createWithHTML(o, "span", "percentage-bracket", ")");
            }
        }
    }
    function L(e, t, o, i, s) {
        let r = 0;
        let a = new Date(i);
        while (a < s) {
            const i = n[e._currentView.element.id].typeData[e._currentView.type][DateTime.toStorageDate(a)];
            const s = DateTime.getWeekdayNumber(a) + 1;
            if (Is.monthVisible(o, a.getMonth()) && Is.dayVisible(t, s) && Is.definedNumber(i)) {
                r += i;
            }
            a.setDate(a.getDate() + 1);
        }
        return r;
    }
    function F(t, n = false, o) {
        t._currentView.mapContentsContainer = DomElement.create(t._currentView.element, "div", "map-contents-container");
        t._currentView.mapContents = DomElement.create(t._currentView.mapContentsContainer, "div", "map-contents");
        if (t.views.map.showNoDataMessageWhenDataIsNotAvailable && !P(t)) {
            const o = DomElement.createWithHTML(t._currentView.mapContents, "div", "no-data-message", e.text.noMapDataMessage);
            if (n) {
                DomElement.addClass(o, "view-switch");
            }
        } else {
            t._currentView.mapContents.style.minHeight = "unset";
            const i = DomElement.create(t._currentView.mapContents, "div", "map");
            const s = t._currentView.year;
            if (n) {
                DomElement.addClass(i, "view-switch");
            }
            if (t.views.map.showDayNames) {
                const n = DomElement.create(i, "div", "days");
                const o = t.views.map.showMinimalDayNames && t.views.map.daysToShow.length === 7;
                if (!t.views.map.showMonthNames || t.views.map.placeMonthNamesOnTheBottom) {
                    n.className = "days-months-bottom";
                }
                for (let i = 0; i < 7; i++) {
                    if (Is.dayVisible(t.views.map.daysToShow, i + 1)) {
                        const s = !o || i % 3 === 0 ? e.text.dayNames[i] : " ";
                        const r = DomElement.createWithHTML(n, "div", "day-name", s);
                        if (t.views.days.enabled) {
                            r.ondblclick = () => re(t, 3, "days");
                        }
                    }
                }
                if (t.views.map.showDaysInReverseOrder) {
                    DomElement.reverseChildrenOrder(n);
                }
            }
            const r = DomElement.create(i, "div", "months");
            const a = Ve(t);
            for (let n = t.startMonth; n < 12 + t.startMonth; n++) {
                let o = n;
                let i = s;
                if (t.startMonth > 0 && n > 11) {
                    o = n - 12;
                    i++;
                }
                if (Is.monthVisible(t.views.map.monthsToShow, o)) {
                    const n = DomElement.create(r, "div", "month");
                    const s = DomElement.create(n, "div", "day-columns");
                    const l = new Date(i, o, 1);
                    const c = DateTime.getWeekdayNumber(l);
                    let u = DateTime.getTotalDaysInMonth(i, o);
                    let d = DomElement.create(s, "div", "day-column");
                    let m = false;
                    let f = 1;
                    n.setAttribute(Constant.HEAT_JS_MAP_MONTH_NUMBER_ATTRIBUTE_NAME, `${o + 1}`);
                    u += c;
                    for (let e = 0; e < u; e++) {
                        if (e >= c) {
                            m = true;
                        } else {
                            if (Is.dayVisible(t.views.map.daysToShow, f)) {
                                DomElement.create(d, "div", "day-disabled");
                            }
                        }
                        if (m) {
                            let n = null;
                            if (Is.dayVisible(t.views.map.daysToShow, f)) {
                                n = W(t, d, e - c, o, i, a);
                            }
                            if ((e + 1) % 7 === 0) {
                                if (t.views.map.showDaysInReverseOrder) {
                                    DomElement.reverseChildrenOrder(d);
                                }
                                d = DomElement.create(s, "div", "day-column");
                                f = 0;
                                if (t._currentView.dayWidth === 0 && Is.defined(n)) {
                                    let e = DomElement.getStyleValueByName(n, "margin-left", true);
                                    let o = DomElement.getStyleValueByName(n, "margin-right", true);
                                    t._currentView.dayWidth = n.offsetWidth + e + o;
                                }
                            }
                        }
                        f++;
                    }
                    R(t, f, d);
                    if (t.views.map.showMonthNames) {
                        let r;
                        const a = n.offsetWidth;
                        let l = e.text.monthNames[o];
                        if (t.startMonth > 0 && t.views.map.showYearsInMonthNames) {
                            l += `${" "}${i}`;
                        }
                        if (!t.views.map.placeMonthNamesOnTheBottom) {
                            r = DomElement.createWithHTML(n, "div", "month-name", l, s);
                        } else {
                            r = DomElement.createWithHTML(n, "div", "month-name-bottom", l);
                        }
                        if (t.views.map.showMonthDayGaps) {
                            r.style.width = `${a}px`;
                        } else {
                            r.style.width = `${a - t._currentView.dayWidth}px`;
                        }
                        if (t.views.months.enabled) {
                            r.ondblclick = () => re(t, 5, "months");
                        }
                    }
                    if (t.views.map.showMonthsInReverseOrder) {
                        DomElement.reverseChildrenOrder(s);
                    }
                }
            }
            if (t.views.map.showMonthsInReverseOrder) {
                DomElement.reverseChildrenOrder(r);
            }
            H(t, r);
            $(t, i);
            if (t.views.map.keepScrollPositions || o) {
                t._currentView.mapContents.scrollLeft = t._currentView.mapContentsScrollLeft;
            }
        }
    }
    function R(e, t, n) {
        const o = 7 - n.children.length;
        if (o > 0 && o < 7) {
            for (let i = 0; i < o; i++) {
                if (Is.dayVisible(e.views.map.daysToShow, t)) {
                    DomElement.create(n, "div", "day-disabled");
                }
                t++;
            }
        }
        if (e.views.map.showDaysInReverseOrder) {
            DomElement.reverseChildrenOrder(n);
        }
    }
    function H(e, t) {
        const n = t.children.length;
        for (let o = 1; o < n; o++) {
            const n = t.children[o];
            const i = n.getElementsByClassName("day-column");
            const s = [].slice.call(i);
            const r = s[0].getElementsByClassName("day-disabled");
            if (!e.views.map.showMonthDayGaps && r.length > 0) {
                n.style.marginLeft = `${-e._currentView.dayWidth}px`;
            } else if (e.views.map.showMonthDayGaps && r.length === 0) {
                n.style.marginLeft = `${e._currentView.dayWidth}px`;
            }
        }
    }
    function $(t, n) {
        const o = DomElement.getStyleValueByNameSizingMetic(document.documentElement, Css.Variables.DaySize);
        let i = DomElement.getStyleValueByName(document.documentElement, Css.Variables.DaySize, true);
        if (t._currentView.mapZoomIncrement === -1) {
            t._currentView.mapZoomIncrement = i / 10;
        }
        if (t.views.map.allowZooming) {
            const s = DomElement.create(t._currentView.mapContentsContainer, "div", "zooming");
            const a = DomElement.create(s, "div", "zoom-close-button");
            const l = DomElement.createIconButton(s, "button", "zoom-out", "minus");
            const c = DomElement.createWithHTML(s, "span", "zoom-level", `+${Str.friendlyNumber(t._currentView.mapZoomLevel * 10)}%`);
            const u = DomElement.createIconButton(s, "button", "zoom-in", "plus");
            const d = DomElement.getStyleValueByName(document.documentElement, Css.Variables.Spacing, true);
            i = DomElement.getStyleValueByName(t._currentView.element, Css.Variables.DaySize, true);
            if (i === 0) {
                i = DomElement.getStyleValueByName(document.documentElement, Css.Variables.DaySize, true);
            }
            ToolTip.add(a, t, e.text.closeButtonText);
            ToolTip.add(u, t, e.text.zoomInText);
            ToolTip.add(l, t, e.text.zoomOutText);
            s.style.bottom = t._currentView.mapContentsContainer.offsetHeight - n.offsetHeight + "px";
            if (t.views.map.zoomLevel > 0 && t._currentView.mapZoomLevel === -1) {
                i += parseFloat((t.views.map.zoomLevel * t._currentView.mapZoomIncrement).toFixed(1));
                t._currentView.mapZoomLevel = t.views.map.zoomLevel;
                t._currentView.element.style.setProperty(Css.Variables.DaySize, `${i}${o}`);
                t._currentView.dayWidth = 0;
                c.innerText = `+${Str.friendlyNumber(t._currentView.mapZoomLevel * 10)}%`;
                r(t, false, false, true);
            }
            if (t._currentView.mapZoomLevel === -1) {
                t._currentView.mapZoomLevel = 0;
                c.innerText = `+${Str.friendlyNumber(t._currentView.mapZoomLevel * 10)}%`;
            }
            t._currentView.mapContents.style.paddingRight = `${s.offsetWidth + d}px`;
            l.disabled = t._currentView.mapZoomLevel === 0;
            a.onclick = () => {
                t.views.map.allowZooming = false;
                t._currentView.mapContents.style.paddingRight = "0px";
                s.parentNode.removeChild(s);
            };
            u.onclick = () => {
                i += t._currentView.mapZoomIncrement;
                i = parseFloat(i.toFixed(1));
                t._currentView.mapZoomLevel++;
                t._currentView.element.style.setProperty(Css.Variables.DaySize, `${i}${o}`);
                t._currentView.dayWidth = 0;
                l.disabled = false;
                c.innerText = `+${Str.friendlyNumber(t._currentView.mapZoomLevel * 10)}%`;
                Trigger.customEvent(t.events.onMapZoomLevelChange, t._currentView.element, t._currentView.mapZoomLevel);
                r(t, false, false, true);
            };
            l.onclick = () => {
                if (t._currentView.mapZoomLevel > 0) {
                    i -= t._currentView.mapZoomIncrement;
                    i = parseFloat(i.toFixed(1));
                    t._currentView.mapZoomLevel--;
                    t._currentView.element.style.setProperty(Css.Variables.DaySize, `${i}${o}`);
                    t._currentView.dayWidth = 0;
                    l.disabled = t._currentView.mapZoomLevel === 0;
                    c.innerText = `+${Str.friendlyNumber(t._currentView.mapZoomLevel * 10)}%`;
                    Trigger.customEvent(t.events.onMapZoomLevelChange, t._currentView.element, t._currentView.mapZoomLevel);
                    r(t, false, false, true);
                }
            };
        } else {
            if (t.views.map.zoomLevel > 0 && t._currentView.mapZoomLevel === -1) {
                i += parseFloat((t.views.map.zoomLevel * t._currentView.mapZoomIncrement).toFixed(1));
                t._currentView.mapZoomLevel = t.views.map.zoomLevel;
                t._currentView.element.style.setProperty(Css.Variables.DaySize, `${i}${o}`);
            }
        }
    }
    function W(t, o, i, s, r, a) {
        const l = i + 1;
        const c = DomElement.create(o, "div", "day");
        const u = new Date(r, s, l);
        const d = Is.holiday(t, u);
        let m = n[t._currentView.element.id].typeData[t._currentView.type][DateTime.toStorageDate(u)];
        m = Default2.getNumber(m, 0);
        c.setAttribute(Constant.HEAT_JS_MAP_DATE_ATTRIBUTE_NAME, `${Str.padNumber(l)}-${Str.padNumber(s + 1)}-${r}`);
        if (t.views.map.showToolTips) {
            se(t, c, u, m, t.views.map.dayToolTipText, t.events.onMapDayToolTipRender, d.matched, t.views.map.showCountsInToolTips);
        }
        if (t.views.map.showDayDateNumbers) {
            DomElement.createWithHTML(c, "div", "count-date", `${l.toString()}<sup>${DateTime.getDayOrdinal(e, l)}</sup>`);
        }
        if (t.views.map.showDayCounts && m > 0) {
            DomElement.createWithHTML(c, "div", "count", Str.friendlyNumber(m));
        }
        if (Is.definedFunction(t.events.onMapDayClick)) {
            c.onclick = () => Trigger.customEvent(t.events.onMapDayClick, u, m, d.matched);
        } else if (Is.definedFunction(t.events.onMapDayDblClick)) {
            c.ondblclick = () => Trigger.customEvent(t.events.onMapDayDblClick, u, m, d.matched);
        } else {
            DomElement.addClass(c, "no-hover");
        }
        const f = be(t, a, m, u);
        if (Is.defined(f) && De(t, f.id)) {
            if (Is.definedString(f.mapCssClassName)) {
                DomElement.addClass(c, f.mapCssClassName);
            } else {
                DomElement.addClass(c, f.cssClassName);
            }
        }
        if (t.views.map.highlightCurrentDay && DateTime.isTodaysDate(u)) {
            DomElement.addClass(c, "today");
        }
        return c;
    }
    function P(e) {
        let t = false;
        const n = ue(e);
        const o = e._currentView.year.toString();
        const i = (e._currentView.year + 1).toString();
        for (const s in n) {
            if (n.hasOwnProperty(s)) {
                if (DateTime.getStorageDateYear(s) === o) {
                    t = true;
                    break;
                } else if (e.startMonth > 0 && DateTime.getStorageDateYear(s) === i) {
                    t = true;
                    break;
                }
            }
        }
        return t;
    }
    function Y(t, n) {
        t._currentView.chartContents = DomElement.create(t._currentView.element, "div", "chart-contents");
        const o = DomElement.create(t._currentView.chartContents, "div", "chart");
        let i = DomElement.create(o, "div", "y-labels");
        const s = DomElement.create(o, "div", "day-lines");
        const r = Ve(t);
        const a = U(t);
        const l = t._currentView.year;
        let c = 0;
        if (n) {
            DomElement.addClass(o, "view-switch");
        }
        if (a > 0 && t.views.chart.showChartYLabels) {
            const e = DomElement.createWithHTML(i, "div", "label-0", a.toString());
            DomElement.createWithHTML(i, "div", "label-25", (Math.floor(a / 4) * 3).toString());
            DomElement.createWithHTML(i, "div", "label-50", Math.floor(a / 2).toString());
            DomElement.createWithHTML(i, "div", "label-75", Math.floor(a / 4).toString());
            DomElement.createWithHTML(i, "div", "label-100", "0");
            i.style.width = `${e.offsetWidth}px`;
            c = i.offsetWidth + DomElement.getStyleValueByName(i, "margin-right", true);
        } else {
            i.parentNode.removeChild(i);
            i = null;
        }
        if (a === 0) {
            t._currentView.chartContents.style.minHeight = `${t._currentView.mapContents.offsetHeight}px`;
            o.parentNode.removeChild(o);
            const i = DomElement.createWithHTML(t._currentView.chartContents, "div", "no-data-message", e.text.noChartDataMessage);
            if (n) {
                DomElement.addClass(i, "view-switch");
            }
        } else {
            const o = DomElement.getStyleValueByName(s, "border-bottom-width", true);
            const i = (s.offsetHeight - o) / a;
            let u = 0;
            let d = 0;
            let m = [];
            for (let e = t.startMonth; e < 12 + t.startMonth; e++) {
                let o = e;
                let a = l;
                if (t.startMonth > 0 && e > 11) {
                    o = e - 12;
                    a++;
                }
                if (Is.monthVisible(t.views.chart.monthsToShow, o)) {
                    const e = DateTime.getTotalDaysInMonth(a, o);
                    let l = 1;
                    let c = false;
                    u++;
                    for (let u = 0; u < e; u++) {
                        const e = new Date(a, o, l);
                        const f = DateTime.getWeekdayNumber(e) + 1;
                        if (Is.dayVisible(t.views.chart.daysToShow, f)) {
                            const e = j(s, t, u + 1, o, a, r, i, n);
                            if (!c) {
                                m.push(e);
                                c = true;
                            }
                        }
                        if ((u + 1) % 7 === 0) {
                            l = 0;
                        }
                        l++;
                        d++;
                    }
                }
            }
            if (t.views.chart.showInReverseOrder) {
                DomElement.reverseChildrenOrder(s);
                m = m.reverse();
            }
            if (t.views.chart.showMonthNames) {
                const n = DomElement.create(t._currentView.chartContents, "div", "chart-months");
                let o = 0;
                const i = i => {
                    let s = i + t.startMonth;
                    let r = l;
                    if (t.startMonth > 0 && s > 11) {
                        s -= 12;
                        r++;
                    }
                    if (Is.monthVisible(t.views.chart.monthsToShow, s)) {
                        let i = e.text.monthNames[s];
                        if (t.startMonth > 0 && t.views.chart.showYearsInMonthNames) {
                            i += `${" "}${r}`;
                        }
                        let a = DomElement.createWithHTML(n, "div", "month-name", i);
                        a.style.left = `${m[o].offsetLeft}px`;
                        if (t.views.months.enabled) {
                            a.ondblclick = () => re(t, 5, "months");
                        }
                        o++;
                    }
                };
                if (t.views.chart.showInReverseOrder) {
                    for (let e = 12; e--; ) {
                        i(e);
                    }
                } else {
                    for (let e = 0; e < 12; e++) {
                        i(e);
                    }
                }
                n.style.width = `${s.offsetWidth}px`;
                const r = DomElement.create(n, "div", "month-name-space");
                r.style.height = `${n.offsetHeight}px`;
                r.style.width = `${c}px`;
            }
            if (t.views.chart.keepScrollPositions) {
                t._currentView.chartContents.scrollLeft = t._currentView.chartContentsScrollLeft;
            }
        }
        t._currentView.chartContents.style.display = "none";
    }
    function j(t, n, o, i, s, r, a, l) {
        const c = new Date(s, i, o);
        const u = DomElement.create(t, "div", "day-line");
        const d = Is.holiday(n, c);
        let m = ue(n)[DateTime.toStorageDate(c)];
        m = Default2.getNumber(m, 0);
        u.setAttribute(Constant.HEAT_JS_CHART_DATE_ATTRIBUTE_NAME, `${Str.padNumber(o)}-${Str.padNumber(i + 1)}-${s}`);
        if (n.views.chart.showToolTips) {
            se(n, u, c, m, n.views.chart.dayToolTipText, n.events.onChartDayToolTipRender, d.matched, n.views.chart.showCountsInToolTips);
        }
        if (n.views.chart.showLineCounts || n.views.chart.showLineDateNumbers) {
            DomElement.addClass(u, "day-line-count");
        }
        if (n.views.chart.showLineDateNumbers) {
            DomElement.createWithHTML(u, "div", "count-date", `${o.toString()}<sup>${DateTime.getDayOrdinal(e, o)}</sup>`);
        }
        if (n.views.chart.showLineCounts && m > 0) {
            DomElement.createWithHTML(u, "div", "count", Str.friendlyNumber(m));
        }
        const f = m * a;
        if (f <= 0) {
            u.style.visibility = "hidden";
        }
        if (Is.definedFunction(n.events.onChartDayClick)) {
            u.onclick = () => Trigger.customEvent(n.events.onChartDayClick, c, m, d.matched);
        } else if (Is.definedFunction(n.events.onChartDayDblClick)) {
            u.ondblclick = () => Trigger.customEvent(n.events.onChartDayDblClick, c, m, d.matched);
        } else {
            DomElement.addClass(u, "no-hover");
        }
        const w = be(n, r, m, c);
        if (Is.defined(w) && De(n, w.id)) {
            if (Is.definedString(w.chartCssClassName)) {
                DomElement.addClass(u, w.chartCssClassName);
            } else {
                DomElement.addClass(u, w.cssClassName);
            }
        }
        if (n.views.chart.highlightCurrentDay && DateTime.isTodaysDate(c)) {
            DomElement.addClass(u, "today");
        }
        if (n.views.chart.useGradients) {
            DomElement.addGradientEffect(n._currentView.element, u);
        }
        Animate.setHeight(n, u, f, l);
        return u;
    }
    function U(e) {
        let t = 0;
        const n = ue(e);
        const o = e._currentView.year;
        for (let i = e.startMonth; i < 12 + e.startMonth; i++) {
            let s = i;
            let r = o;
            if (e.startMonth > 0 && i > 11) {
                s = i - 12;
                r++;
            }
            if (Is.monthVisible(e.views.chart.monthsToShow, s)) {
                const o = DateTime.getTotalDaysInMonth(r, s);
                for (let i = 0; i < o; i++) {
                    const o = new Date(r, s, i + 1);
                    const a = DateTime.toStorageDate(o);
                    const l = DateTime.getWeekdayNumber(o) + 1;
                    if (n.hasOwnProperty(a)) {
                        if (Is.dayVisible(e.views.chart.daysToShow, l)) {
                            t = Math.max(t, n[a]);
                        }
                    }
                }
            }
        }
        return t;
    }
    function Z(t, n) {
        t._currentView.daysContents = DomElement.create(t._currentView.element, "div", "days-contents");
        const o = DomElement.create(t._currentView.daysContents, "div", "days");
        const i = DomElement.create(t._currentView.daysContents, "div", "day-names");
        let s = DomElement.create(o, "div", "y-labels");
        const r = DomElement.create(o, "div", "day-lines");
        const a = Ve(t);
        const l = G(t, a);
        if (n && (!t.views.days.useDifferentOpacities || !t.views.days.showDayCounts)) {
            DomElement.addClass(o, "view-switch");
        }
        if (l.largestValue > 0 && t.views.days.showChartYLabels) {
            const e = DomElement.createWithHTML(s, "div", "label-0", l.largestValue.toString());
            DomElement.createWithHTML(s, "div", "label-25", (Math.floor(l.largestValue / 4) * 3).toString());
            DomElement.createWithHTML(s, "div", "label-50", Math.floor(l.largestValue / 2).toString());
            DomElement.createWithHTML(s, "div", "label-75", Math.floor(l.largestValue / 4).toString());
            DomElement.createWithHTML(s, "div", "label-100", "0");
            s.style.width = `${e.offsetWidth}px`;
            i.style.paddingLeft = `${s.offsetWidth + DomElement.getStyleValueByName(s, "margin-right", true)}px`;
        } else {
            s.parentNode.removeChild(s);
            s = null;
        }
        if (l.largestValue === 0) {
            t._currentView.daysContents.style.minHeight = `${t._currentView.mapContents.offsetHeight}px`;
            o.parentNode.removeChild(o);
            i.parentNode.removeChild(i);
            const s = DomElement.createWithHTML(t._currentView.daysContents, "div", "no-days-message", e.text.noDaysDataMessage);
            if (n) {
                DomElement.addClass(s, "view-switch");
            }
        } else {
            const n = DomElement.getStyleValueByName(r, "border-bottom-width", true);
            const o = (r.offsetHeight - n) / l.largestValue;
            for (const n in l.values) {
                if (l.values.hasOwnProperty(n) && Is.dayVisible(t.views.days.daysToShow, parseInt(n))) {
                    const s = l.valueOpacities[l.values[n]];
                    z(r, parseInt(n), l.values[n], t, o, s, l.totalValue);
                    if (t.views.days.showDayNames) {
                        DomElement.createWithHTML(i, "div", "day-name", e.text.dayNames[parseInt(n) - 1]);
                    }
                }
            }
            if (t.views.days.showInReverseOrder) {
                DomElement.reverseChildrenOrder(r);
                DomElement.reverseChildrenOrder(i);
            }
            if (t.views.days.keepScrollPositions) {
                t._currentView.daysContents.scrollLeft = t._currentView.daysContentsScrollLeft;
            }
        }
        t._currentView.daysContents.style.display = "none";
    }
    function z(e, t, n, o, i, s, r) {
        const a = DomElement.create(e, "div", "day-line");
        const l = n * i;
        let c = null;
        a.setAttribute(Constant.HEAT_JS_DAY_NUMBER_ATTRIBUTE_NAME, t.toString());
        if (l <= 0) {
            a.style.visibility = "hidden";
        }
        if (o.views.days.showToolTips) {
            ToolTip.add(a, o, Str.friendlyNumber(n));
        }
        if (Is.definedFunction(o.events.onWeekDayClick)) {
            a.onclick = () => Trigger.customEvent(o.events.onWeekDayClick, t, n, o._currentView.year);
        } else if (Is.definedFunction(o.events.onWeekDayDblClick)) {
            a.ondblclick = () => Trigger.customEvent(o.events.onWeekDayDblClick, t, n, o._currentView.year);
        } else {
            DomElement.addClass(a, "no-hover");
        }
        if (o.views.days.showDayCounts && n > 0) {
            DomElement.addClass(a, "day-line-count");
            c = DomElement.createWithHTML(a, "div", "count", Str.friendlyNumber(n));
            if (o.views.days.showDayCountPercentages) {
                DomElement.createWithHTML(c, "div", "percentage", `${(n / r * 100).toFixed(o.percentageDecimalPoints)}%`);
            }
        }
        if (o.views.days.useGradients) {
            DomElement.addGradientEffect(o._currentView.element, a);
            if (Is.defined(c)) {
                DomElement.addClass(c, "blend-colors");
            }
        } else if (o.views.days.useDifferentOpacities) {
            const e = DomElement.getStyleValueByName(a, "background-color");
            const t = DomElement.getStyleValueByName(a, "border-color");
            if (Is.defined(c)) {
                DomElement.addClass(c, "blend-colors");
            }
            if (Is.rgbColor(e)) {
                a.style.backgroundColor = Convert.toRgbOpacityColor(e, s);
            } else if (Is.hexColor(e)) {
                a.style.backgroundColor = Convert.toRgbOpacityColor(Convert.hexToRgba(e), s);
            }
            if (Is.rgbColor(t)) {
                a.style.borderColor = Convert.toRgbOpacityColor(t, s);
            } else if (Is.hexColor(t)) {
                a.style.borderColor = Convert.toRgbOpacityColor(Convert.hexToRgba(t), s);
            }
        }
        Animate.setHeight(o, a, l);
    }
    function G(e, t) {
        const n = {
            values: {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0
            },
            valueOpacities: {},
            largestValue: 0,
            totalValue: 0
        };
        const o = ue(e);
        const i = e._currentView.year;
        for (let s = e.startMonth; s < 12 + e.startMonth; s++) {
            let r = s;
            let a = i;
            if (e.startMonth > 0 && s > 11) {
                r = s - 12;
                a++;
            }
            if (Is.monthVisible(e.views.days.monthsToShow, r)) {
                const i = DateTime.getTotalDaysInMonth(a, r);
                for (let s = 0; s < i; s++) {
                    const i = DateTime.toStorageDate(new Date(a, r, s + 1));
                    if (o.hasOwnProperty(i)) {
                        const l = new Date(a, r, s + 1);
                        const c = DateTime.getWeekdayNumber(l) + 1;
                        if (!Is.holiday(e, l).matched && Is.dayVisible(e.views.days.daysToShow, c)) {
                            const s = o[i];
                            const r = be(e, t, s);
                            if (!Is.defined(r) || r.visible) {
                                n.values[c] += s;
                                n.totalValue += s;
                                n.largestValue = Math.max(n.largestValue, n.values[c]);
                            }
                        }
                    }
                }
            }
        }
        Convert.valuesToOpacitiesOrder(n);
        return n;
    }
    function J(t, n) {
        t._currentView.monthsContents = DomElement.create(t._currentView.element, "div", "months-contents");
        const o = DomElement.create(t._currentView.monthsContents, "div", "months");
        const i = DomElement.create(t._currentView.monthsContents, "div", "month-names");
        let s = DomElement.create(o, "div", "y-labels");
        const r = DomElement.create(o, "div", "month-lines");
        const a = Ve(t);
        const l = q(t, a);
        if (n && (!t.views.months.useDifferentOpacities || !t.views.months.showMonthCounts)) {
            DomElement.addClass(o, "view-switch");
        }
        if (l.largestValue > 0 && t.views.months.showChartYLabels) {
            const e = DomElement.createWithHTML(s, "div", "label-0", l.largestValue.toString());
            DomElement.createWithHTML(s, "div", "label-25", (Math.floor(l.largestValue / 4) * 3).toString());
            DomElement.createWithHTML(s, "div", "label-50", Math.floor(l.largestValue / 2).toString());
            DomElement.createWithHTML(s, "div", "label-75", Math.floor(l.largestValue / 4).toString());
            DomElement.createWithHTML(s, "div", "label-100", "0");
            s.style.width = `${e.offsetWidth}px`;
            i.style.paddingLeft = `${s.offsetWidth + DomElement.getStyleValueByName(s, "margin-right", true)}px`;
        } else {
            s.parentNode.removeChild(s);
            s = null;
        }
        if (l.largestValue === 0) {
            t._currentView.monthsContents.style.minHeight = `${t._currentView.mapContents.offsetHeight}px`;
            o.parentNode.removeChild(o);
            i.parentNode.removeChild(i);
            const s = DomElement.createWithHTML(t._currentView.monthsContents, "div", "no-months-message", e.text.noMonthsDataMessage);
            if (n) {
                DomElement.addClass(s, "view-switch");
            }
        } else {
            const n = DomElement.getStyleValueByName(r, "border-bottom-width", true);
            const o = (r.offsetHeight - n) / l.largestValue;
            for (let n = t.startMonth; n < 12 + t.startMonth; n++) {
                let s = n;
                if (t.startMonth > 0 && n > 11) {
                    s = n - 12;
                }
                const a = s + 1;
                if (l.values.hasOwnProperty(a) && Is.monthVisible(t.views.months.monthsToShow, s)) {
                    const n = l.valueOpacities[l.values[a]];
                    X(r, a, l.values[a], t, o, n, l.totalValue);
                    if (t.views.months.showMonthNames) {
                        DomElement.createWithHTML(i, "div", "month-name", e.text.monthNames[s]);
                    }
                }
            }
            if (t.views.months.showInReverseOrder) {
                DomElement.reverseChildrenOrder(r);
                DomElement.reverseChildrenOrder(i);
            }
            if (t.views.months.keepScrollPositions) {
                t._currentView.monthsContents.scrollLeft = t._currentView.monthsContentsScrollLeft;
            }
        }
        t._currentView.monthsContents.style.display = "none";
    }
    function X(e, t, n, o, i, s, r) {
        const a = DomElement.create(e, "div", "month-line");
        const l = n * i;
        const c = new Date;
        let u = null;
        a.setAttribute(Constant.HEAT_JS_MONTH_NUMBER_ATTRIBUTE_NAME, t.toString());
        if (l <= 0) {
            a.style.visibility = "hidden";
        }
        if (o.views.months.showToolTips) {
            ToolTip.add(a, o, Str.friendlyNumber(n));
        }
        let d = o._currentView.year;
        if (o.startMonth > 0 && t - 1 < o.startMonth) {
            d++;
        }
        if (Is.definedFunction(o.events.onMonthClick)) {
            a.onclick = () => Trigger.customEvent(o.events.onMonthClick, t, n, d);
        } else if (Is.definedFunction(o.events.onMonthDblClick)) {
            a.ondblclick = () => Trigger.customEvent(o.events.onMonthDblClick, t, n, d);
        } else {
            DomElement.addClass(a, "no-hover");
        }
        if (o.views.months.showMonthCounts && n > 0) {
            DomElement.addClass(a, "month-line-count");
            u = DomElement.createWithHTML(a, "div", "count", Str.friendlyNumber(n));
            if (o.views.months.showMonthCountPercentages) {
                DomElement.createWithHTML(u, "div", "percentage", `${(n / r * 100).toFixed(o.percentageDecimalPoints)}%`);
            }
        }
        if (o.views.months.highlightCurrentMonth && c.getMonth() === t - 1 && o._currentView.year === c.getFullYear()) {
            DomElement.addClass(a, "today");
        }
        if (o.views.months.useGradients) {
            DomElement.addGradientEffect(o._currentView.element, a);
            if (Is.defined(u)) {
                DomElement.addClass(u, "blend-colors");
            }
        } else if (o.views.months.useDifferentOpacities) {
            const e = DomElement.getStyleValueByName(a, "background-color");
            const t = DomElement.getStyleValueByName(a, "border-color");
            if (Is.defined(u)) {
                DomElement.addClass(u, "blend-colors");
            }
            if (Is.rgbColor(e)) {
                a.style.backgroundColor = Convert.toRgbOpacityColor(e, s);
            } else if (Is.hexColor(e)) {
                a.style.backgroundColor = Convert.toRgbOpacityColor(Convert.hexToRgba(e), s);
            }
            if (Is.rgbColor(t)) {
                a.style.borderColor = Convert.toRgbOpacityColor(t, s);
            } else if (Is.hexColor(t)) {
                a.style.borderColor = Convert.toRgbOpacityColor(Convert.hexToRgba(t), s);
            }
        }
        Animate.setHeight(o, a, l);
    }
    function q(e, t) {
        const n = {
            values: {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0,
                10: 0,
                11: 0,
                12: 0
            },
            valueOpacities: {},
            largestValue: 0,
            totalValue: 0
        };
        const o = ue(e);
        const i = e._currentView.year;
        for (let s = e.startMonth; s < 12 + e.startMonth; s++) {
            let r = s;
            let a = i;
            if (e.startMonth > 0 && s > 11) {
                r = s - 12;
                a++;
            }
            if (Is.monthVisible(e.views.months.monthsToShow, r)) {
                const i = r + 1;
                const s = DateTime.getTotalDaysInMonth(a, r);
                for (let l = 0; l < s; l++) {
                    const s = DateTime.toStorageDate(new Date(a, r, l + 1));
                    if (o.hasOwnProperty(s)) {
                        const c = new Date(a, r, l + 1);
                        const u = DateTime.getWeekdayNumber(c) + 1;
                        if (!Is.holiday(e, c).matched && Is.dayVisible(e.views.days.daysToShow, u)) {
                            const r = o[s];
                            const a = be(e, t, r);
                            if (!Is.defined(a) || a.visible) {
                                n.values[i] += r;
                                n.totalValue += r;
                                n.largestValue = Math.max(n.largestValue, n.values[i]);
                            }
                        }
                    }
                }
            }
        }
        Convert.valuesToOpacitiesOrder(n);
        return n;
    }
    function K(t, n) {
        t._currentView.statisticsContents = DomElement.create(t._currentView.element, "div", "statistics-contents");
        const o = DomElement.create(t._currentView.statisticsContents, "div", "statistics");
        const i = DomElement.create(t._currentView.statisticsContents, "div", "statistics-ranges");
        let s = DomElement.create(o, "div", "y-labels");
        const r = DomElement.create(o, "div", "range-lines");
        const a = Ve(t);
        const l = ee(t, a);
        if (n) {
            DomElement.addClass(o, "view-switch");
        }
        if (l.largestValue > 0 && t.views.statistics.showChartYLabels) {
            const e = DomElement.createWithHTML(s, "div", "label-0", l.largestValue.toString());
            DomElement.createWithHTML(s, "div", "label-25", (Math.floor(l.largestValue / 4) * 3).toString());
            DomElement.createWithHTML(s, "div", "label-50", Math.floor(l.largestValue / 2).toString());
            DomElement.createWithHTML(s, "div", "label-75", Math.floor(l.largestValue / 4).toString());
            DomElement.createWithHTML(s, "div", "label-100", "0");
            s.style.width = `${e.offsetWidth}px`;
            i.style.paddingLeft = `${s.offsetWidth + DomElement.getStyleValueByName(s, "margin-right", true)}px`;
        } else {
            s.parentNode.removeChild(s);
            s = null;
        }
        if (l.largestValue === 0) {
            t._currentView.statisticsContents.style.minHeight = `${t._currentView.mapContents.offsetHeight}px`;
            o.parentNode.removeChild(o);
            i.parentNode.removeChild(i);
            const s = DomElement.createWithHTML(t._currentView.statisticsContents, "div", "no-statistics-message", e.text.noStatisticsDataMessage);
            if (n) {
                DomElement.addClass(s, "view-switch");
            }
        } else {
            const e = DomElement.getStyleValueByName(r, "border-bottom-width", true);
            const o = (r.offsetHeight - e) / l.largestValue;
            if (!t.views.statistics.showColorRangeLabels) {
                i.parentNode.removeChild(i);
            }
            for (const e in l.types) {
                if (l.types.hasOwnProperty(e)) {
                    Q(parseInt(e), r, l.types[e], t, a, o, l.totalValue, n);
                    const s = xe(a, parseInt(e));
                    if (t.views.statistics.showColorRangeLabels) {
                        if (!t.views.statistics.useColorRangeNamesForLabels || !Is.defined(s) || !Is.definedString(s.name)) {
                            DomElement.createWithHTML(i, "div", "range-name", `${e}${"+"}`);
                        } else {
                            DomElement.createWithHTML(i, "div", "range-name", s.name);
                        }
                    }
                }
            }
            if (t.views.statistics.showInReverseOrder) {
                DomElement.reverseChildrenOrder(r);
                DomElement.reverseChildrenOrder(i);
            }
            if (t.views.statistics.keepScrollPositions) {
                t._currentView.statisticsContents.scrollLeft = t._currentView.statisticsContentsScrollLeft;
            }
        }
        t._currentView.statisticsContents.style.display = "none";
    }
    function Q(e, t, n, o, i, s, r, a) {
        const l = DomElement.create(t, "div", "range-line");
        const c = xe(i, e);
        const u = n * s;
        if (Is.defined(c) && Is.definedString(c.name)) {
            l.setAttribute(Constant.HEAT_JS_STATISTICS_COLOR_RANGE_NAME_ATTRIBUTE_NAME, c.name);
        }
        if (u <= 0) {
            l.style.visibility = "hidden";
        }
        if (o.views.statistics.showToolTips) {
            let e;
            if (Is.defined(c) && Is.definedString(c.name) && o.views.statistics.showRangeNamesInToolTips) {
                e = `${c.name}${":"}${" "}<b class="tooltip-count">${Str.friendlyNumber(n)}</b>`;
            } else {
                e = Str.friendlyNumber(n);
            }
            ToolTip.add(l, o, e);
        }
        if (o.views.statistics.showRangeCounts && n > 0) {
            DomElement.addClass(l, "range-line-count");
            const e = DomElement.createWithHTML(l, "div", "count", Str.friendlyNumber(n));
            if (o.views.statistics.showRangeCountPercentages) {
                DomElement.createWithHTML(e, "div", "percentage", `${(n / r * 100).toFixed(o.percentageDecimalPoints)}%`);
            }
        }
        if (Is.definedFunction(o.events.onStatisticClick)) {
            l.onclick = () => Trigger.customEvent(o.events.onStatisticClick, c, n, o._currentView.year);
        } else if (Is.definedFunction(o.events.onStatisticDblClick)) {
            l.ondblclick = () => Trigger.customEvent(o.events.onStatisticDblClick, c, n, o._currentView.year);
        } else {
            DomElement.addClass(l, "no-hover");
        }
        if (Is.defined(c) && De(o, c.id)) {
            if (Is.definedString(c.statisticsCssClassName)) {
                DomElement.addClass(l, c.statisticsCssClassName);
            } else {
                DomElement.addClass(l, c.cssClassName);
            }
        }
        if (o.views.statistics.useGradients) {
            DomElement.addGradientEffect(o._currentView.element, l);
        }
        Animate.setHeight(o, l, u, a);
    }
    function ee(e, t) {
        const n = ue(e);
        const o = e._currentView.year;
        const i = {
            types: {},
            largestValue: 0,
            totalValue: 0
        };
        for (let s = e.startMonth; s < 12 + e.startMonth; s++) {
            let r = s;
            let a = o;
            if (e.startMonth > 0 && s > 11) {
                r = s - 12;
                a++;
            }
            if (Is.monthVisible(e.views.statistics.monthsToShow, r)) {
                const o = DateTime.getTotalDaysInMonth(a, r);
                for (let s = 0; s < o; s++) {
                    const o = DateTime.toStorageDate(new Date(a, r, s + 1));
                    if (n.hasOwnProperty(o)) {
                        const l = new Date(a, r, s + 1);
                        const c = DateTime.getWeekdayNumber(l) + 1;
                        if (!Is.holiday(e, l).matched && Is.dayVisible(e.views.statistics.daysToShow, c)) {
                            const s = be(e, t, n[o]);
                            const r = Is.defined(s) ? s.minimum.toString() : "0";
                            if (!i.types.hasOwnProperty(r)) {
                                i.types[r] = 0;
                            }
                            i.types[r]++;
                            i.totalValue++;
                            i.largestValue = Math.max(i.largestValue, i.types[r]);
                        }
                    }
                }
            }
        }
        return i;
    }
    function te(t) {
        const o = DomElement.create(t._currentView.element, "div", "guide");
        const i = DomElement.create(o, "div", "map-types");
        const s = le(t);
        if (n[t._currentView.element.id].totalTypes > 1) {
            if (Is.definedString(t.description.text)) {
                const e = DomElement.create(t._currentView.element, "div", "description", o);
                ie(t, e);
            }
            const r = Object.keys(n[t._currentView.element.id].typeData).sort();
            const a = r.length;
            for (let n = 0; n < a; n++) {
                const o = r[n];
                if (o !== e.text.unknownTrendText || s > 0) {
                    ne(t, i, o);
                }
            }
            if (t.allowTypeAdding) {
                const n = DomElement.createIconButton(i, "button", "add", "plus");
                ToolTip.add(n, t, e.text.addTypeText);
                n.onclick = () => C(t);
            }
        } else {
            ie(t, i);
        }
        if (t.guide.enabled) {
            const n = DomElement.create(o, "div", "map-toggles");
            if (t.guide.showLessAndMoreLabels) {
                let o = DomElement.createWithHTML(n, "div", "less-text", e.text.lessText);
                if (t.guide.colorRangeTogglesEnabled) {
                    o.onclick = () => ve(t, false);
                } else {
                    DomElement.addClass(o, "no-click");
                }
            }
            const i = DomElement.create(n, "div", "days");
            const s = Ve(t);
            const r = s.length;
            for (let e = 0; e < r; e++) {
                oe(t, i, s[e]);
            }
            if (t.guide.showLessAndMoreLabels) {
                const o = DomElement.createWithHTML(n, "div", "more-text", e.text.moreText);
                if (t.guide.colorRangeTogglesEnabled) {
                    o.onclick = () => ve(t, true);
                } else {
                    DomElement.addClass(o, "no-click");
                }
            }
        }
    }
    function ne(e, t, n) {
        const o = DomElement.createButton(t, "button", "type", n);
        if (e._currentView.type === n) {
            DomElement.addClass(o, "active");
        }
        o.onclick = () => {
            if (e._currentView.type !== n) {
                e._currentView.type = n;
                Trigger.customEvent(e.events.onTypeSwitch, n);
                r(e);
            }
        };
    }
    function oe(e, t, n) {
        const o = DomElement.create(t, "div");
        o.className = "day";
        if (e.guide.showToolTips) {
            ToolTip.add(o, e, n.tooltipText);
        }
        if (De(e, n.id)) {
            if (e._currentView.view === 1 && Is.definedString(n.mapCssClassName)) {
                DomElement.addClass(o, n.mapCssClassName);
            } else if (e.views.chart.enabled && e._currentView.view === 2 && Is.definedString(n.chartCssClassName)) {
                DomElement.addClass(o, n.chartCssClassName);
            } else if (e.views.statistics.enabled && e._currentView.view === 4 && Is.definedString(n.statisticsCssClassName)) {
                DomElement.addClass(o, n.statisticsCssClassName);
            } else {
                DomElement.addClass(o, n.cssClassName);
            }
        }
        if (e.guide.showNumbersInGuide) {
            DomElement.addClass(o, "day-number");
            o.innerHTML = `${n.minimum}${"+"}`;
        }
        if (e.guide.colorRangeTogglesEnabled) {
            o.onclick = () => Te(e, n.id);
        } else {
            DomElement.addClass(o, "no-hover");
        }
    }
    function ie(e, t) {
        if (Is.definedString(e.description.text)) {
            if (Is.definedString(e.description.url)) {
                const n = DomElement.createWithHTML(t, "a", "label", e.description.text);
                n.href = e.description.url;
                n.target = e.description.urlTarget;
            } else {
                DomElement.createWithHTML(t, "span", "label", e.description.text);
            }
        }
    }
    function se(t, n, o, i, s, r, a, l) {
        if (Is.definedFunction(r)) {
            ToolTip.add(n, t, Trigger.customEvent(r, o, i, a));
        } else {
            let r = DateTime.getCustomFormattedDateText(e, s, o);
            if (t.showHolidaysInDayToolTips) {
                let e = Is.holiday(t, o);
                if (e.matched && Is.definedString(e.name)) {
                    r += `${":"}${" "}${e.name}`;
                }
            }
            if (l) {
                r += `${":"}${" "}<b class="tooltip-count">${Str.friendlyNumber(i)}</b>`;
            }
            ToolTip.add(n, t, r);
        }
    }
    function re(e, t, n) {
        e._currentView.view = t;
        Trigger.customEvent(e.events.onViewSwitch, n);
        r(e, false, true);
    }
    function ae(t) {
        const o = le(t);
        if (n[t._currentView.element.id].totalTypes > 1) {
            for (const i in n[t._currentView.element.id].typeData) {
                if (i !== e.text.unknownTrendText || o > 0) {
                    if (o === 0 && t._currentView.type === e.text.unknownTrendText) {
                        t._currentView.type = i;
                    }
                }
            }
        }
    }
    function le(t) {
        let o = 0;
        for (const i in n[t._currentView.element.id].typeData[e.text.unknownTrendText]) {
            if (n[t._currentView.element.id].typeData[e.text.unknownTrendText].hasOwnProperty(i)) {
                o++;
                break;
            }
        }
        return o;
    }
    function ce(t, o, i = true) {
        n[t] = {
            options: o,
            typeData: {},
            totalTypes: 1
        };
        n[t].typeData[e.text.unknownTrendText] = {};
        if (i && !o._currentView.isInFetchMode) {
            fe(o);
        }
    }
    function ue(e) {
        return n[e._currentView.element.id].typeData[e._currentView.type];
    }
    function de(e) {
        let t = [];
        if (e.showOnlyDataForYearsAvailable) {
            let n = ue(e);
            for (const e in n) {
                if (n.hasOwnProperty(e)) {
                    let n = parseInt(DateTime.getStorageDateYear(e));
                    if (t.indexOf(n) === -1) {
                        t.push(n);
                    }
                }
            }
        }
        t = t.sort((e, t) => e - t);
        return t;
    }
    function me(e) {
        const t = e._currentView.year;
        let n = ue(e);
        for (let o = e.startMonth; o < 12 + e.startMonth; o++) {
            let i = o;
            let s = t;
            if (e.startMonth > 0 && o > 11) {
                i = o - 12;
                s++;
            }
            const r = DateTime.getTotalDaysInMonth(s, i);
            for (let e = 0; e < r; e++) {
                const t = new Date(s, i, e + 1);
                const o = DateTime.toStorageDate(t);
                if (n.hasOwnProperty(o)) {
                    delete n[o];
                }
            }
        }
    }
    function fe(t) {
        if (t.useLocalStorageForData && window.localStorage) {
            const o = window.localStorage.length;
            const i = t._currentView.element.id;
            for (let t = 0; t < o; t++) {
                const o = window.localStorage.key(t);
                if (Str.startsWithAnyCase(o, Constant.LOCAL_STORAGE_START_ID)) {
                    const t = window.localStorage.getItem(o);
                    const s = Default2.getObjectFromString(t, e);
                    if (s.parsed) {
                        n[i].typeData = s.object;
                        n[i].totalTypes = 0;
                        for (const e in n[i].typeData) {
                            if (n[i].typeData.hasOwnProperty(e)) {
                                n[i].totalTypes++;
                            }
                        }
                    }
                }
            }
        }
    }
    function we(e) {
        if (e.useLocalStorageForData && window.localStorage) {
            const t = e._currentView.element.id;
            he(e);
            const o = JSON.stringify(n[t].typeData);
            window.localStorage.setItem(`${Constant.LOCAL_STORAGE_START_ID}${t}`, o);
        }
    }
    function he(e) {
        if (e.useLocalStorageForData && window.localStorage) {
            const t = window.localStorage.length;
            const n = [];
            const o = e._currentView.element.id;
            for (let e = 0; e < t; e++) {
                if (Str.startsWithAnyCase(window.localStorage.key(e), `${Constant.LOCAL_STORAGE_START_ID}${o}`)) {
                    n.push(window.localStorage.key(e));
                }
            }
            const i = n.length;
            for (let e = 0; e < i; e++) {
                window.localStorage.removeItem(n[e]);
            }
        }
    }
    function ge(e) {
        if (e._currentView.isInFetchMode) {
            if (e._currentView.isInFetchModeTimer === 0) {
                pe(e);
            }
            if (e._currentView.isInFetchModeTimer === 0) {
                e._currentView.isInFetchModeTimer = setInterval(() => {
                    pe(e);
                    r(e);
                }, e.dataFetchDelay);
            }
        }
    }
    function pe(t) {
        const o = t._currentView.element.id;
        const i = Trigger.customEvent(t.events.onDataFetch, o);
        if (Is.definedObject(i)) {
            ce(o, t, false);
            for (const t in i) {
                if (i.hasOwnProperty(t)) {
                    if (!n[o].typeData[e.text.unknownTrendText].hasOwnProperty(t)) {
                        n[o].typeData[e.text.unknownTrendText][t] = 0;
                    }
                    n[o].typeData[e.text.unknownTrendText][t] += i[t];
                }
            }
        }
    }
    function ye() {
        for (const e in n) {
            if (n.hasOwnProperty(e)) {
                const t = n[e].options;
                a(t, false);
                if (Is.defined(t._currentView.isInFetchModeTimer)) {
                    clearInterval(t._currentView.isInFetchModeTimer);
                    t._currentView.isInFetchModeTimer = 0;
                }
            }
        }
        if (e.observationMode && Is.defined(t)) {
            t.disconnect();
            t = null;
        }
    }
    function De(e, t) {
        let n = false;
        if (t === Constant.COLOR_RANGE_HOLIDAY_ID) {
            n = true;
        } else {
            const o = e.colorRanges.length;
            for (let i = 0; i < o; i++) {
                const o = e.colorRanges[i];
                if (o.id === t && Default2.getBoolean(o.visible, true)) {
                    n = true;
                    break;
                }
            }
        }
        return n;
    }
    function ve(e, t) {
        const n = e.colorRanges.length;
        for (let o = 0; o < n; o++) {
            e.colorRanges[o].visible = t;
            Trigger.customEvent(e.events.onColorRangeTypeToggle, e.colorRanges[o].id, t);
        }
        r(e);
    }
    function Te(e, t) {
        const n = e.colorRanges.length;
        for (let o = 0; o < n; o++) {
            const n = e.colorRanges[o];
            if (n.id === t) {
                n.visible = !Default2.getBoolean(n.visible, true);
                Trigger.customEvent(e.events.onColorRangeTypeToggle, n.id, n.visible);
                r(e);
                break;
            }
        }
    }
    function be(e, t, n, o = null) {
        let i = null;
        if (Is.defined(o) && Is.holiday(e, o).matched) {
            i = {
                cssClassName: "holiday",
                id: Constant.COLOR_RANGE_HOLIDAY_ID,
                visible: true,
                minimum: 0
            };
        }
        if (!Is.defined(i)) {
            const e = t.length;
            for (let o = 0; o < e; o++) {
                const e = t[o];
                if (n >= e.minimum) {
                    i = e;
                } else {
                    break;
                }
            }
        }
        return i;
    }
    function xe(e, t) {
        const n = e.length;
        let o = null;
        for (let i = 0; i < n; i++) {
            const n = e[i];
            if (t.toString() === n.minimum.toString()) {
                o = n;
                break;
            }
        }
        return o;
    }
    function Ve(e) {
        return e.colorRanges.sort((e, t) => e.minimum - t.minimum);
    }
    function _e(e, t = true) {
        let n = true;
        let o = e._currentView.year;
        o--;
        while (!Is.yearVisible(e, o)) {
            if (Is.firstVisibleYear(e, o)) {
                n = false;
                break;
            }
            o--;
        }
        if (n) {
            e._currentView.year = o;
            r(e);
            if (t) {
                Trigger.customEvent(e.events.onBackYear, e._currentView.year);
            }
        }
    }
    function Ce(e, t = true) {
        let n = true;
        let o = e._currentView.year;
        o++;
        while (!Is.yearVisible(e, o)) {
            if (Is.lastVisibleYear(e, o)) {
                n = false;
                break;
            }
            o++;
        }
        if (n) {
            e._currentView.year = o;
            r(e);
            if (t) {
                Trigger.customEvent(e.events.onNextYear, e._currentView.year);
            }
        }
    }
    function Se(e) {
        e._currentView.element.innerHTML = "";
        DomElement.removeClass(e._currentView.element, "heat-js");
        ToolTip.assignToEvents(e, false);
        document.body.removeChild(e._currentView.tooltip);
        if (e._currentView.isInFetchMode && Is.defined(e._currentView.isInFetchModeTimer)) {
            clearInterval(e._currentView.isInFetchModeTimer);
        }
        Trigger.customEvent(e.events.onDestroy, e._currentView.element);
    }
    function Ee() {
        if (e.observationMode) {
            if (!Is.defined(t)) {
                t = new MutationObserver((e, t) => {
                    Ie.renderAll();
                });
                const e = {
                    attributes: true,
                    childList: true,
                    subtree: true
                };
                t.observe(document.body, e);
            }
        } else {
            t.disconnect();
            t = null;
        }
    }
    const Ie = {
        addType: function(e, t, o = true) {
            if (Is.definedString(e) && Is.definedString(t) && n.hasOwnProperty(e)) {
                const i = n[e].options;
                if (!i._currentView.isInFetchMode && i.allowTypeAdding) {
                    if (!n[e].typeData.hasOwnProperty(t)) {
                        n[e].typeData[t] = {};
                        n[e].totalTypes++;
                    }
                    if (o) {
                        r(i, true);
                    }
                }
            }
            return Ie;
        },
        addDates: function(t, o, i = null, s = true) {
            if (Is.definedString(t) && Is.definedArray(o) && n.hasOwnProperty(t)) {
                const a = n[t].options;
                if (!a._currentView.isInFetchMode) {
                    i = Default2.getString(i, e.text.unknownTrendText);
                    const n = o.length;
                    for (let e = 0; e < n; e++) {
                        Ie.addDate(t, o[e], i, false);
                    }
                    if (s) {
                        r(a, true);
                    }
                }
            }
            return Ie;
        },
        addDate: function(t, o, i = null, s = true) {
            if (Is.definedString(t) && Is.definedDate(o) && n.hasOwnProperty(t)) {
                const a = n[t].options;
                if (!a._currentView.isInFetchMode) {
                    i = Default2.getString(i, e.text.unknownTrendText);
                    const l = DateTime.toStorageDate(o);
                    if (!n[t].typeData.hasOwnProperty(i)) {
                        n[t].typeData[i] = {};
                        n[t].totalTypes++;
                    }
                    if (!n[t].typeData[i].hasOwnProperty(l)) {
                        n[t].typeData[i][l] = 0;
                    }
                    n[t].typeData[i][l]++;
                    Trigger.customEvent(a.events.onAdd, a._currentView.element);
                    if (s) {
                        r(a, true);
                    }
                }
            }
            return Ie;
        },
        updateDate: function(t, o, i, s = null, a = true) {
            if (Is.definedString(t) && Is.definedDate(o) && n.hasOwnProperty(t)) {
                const l = n[t].options;
                if (!l._currentView.isInFetchMode && i > 0) {
                    const c = DateTime.toStorageDate(o);
                    if (n[t].typeData.hasOwnProperty(s)) {
                        s = Default2.getString(s, e.text.unknownTrendText);
                        n[t].typeData[s][c] = i;
                        Trigger.customEvent(l.events.onUpdate, l._currentView.element);
                        if (a) {
                            r(l, true);
                        }
                    }
                }
            }
            return Ie;
        },
        removeDates: function(t, o, i = null, s = true) {
            if (Is.definedString(t) && Is.definedArray(o) && n.hasOwnProperty(t)) {
                const a = n[t].options;
                if (!a._currentView.isInFetchMode) {
                    i = Default2.getString(i, e.text.unknownTrendText);
                    const n = o.length;
                    for (let e = 0; e < n; e++) {
                        Ie.removeDate(t, o[e], i, false);
                    }
                    if (s) {
                        r(a, true);
                    }
                }
            }
            return Ie;
        },
        removeDate: function(t, o, i = null, s = true) {
            if (Is.definedString(t) && Is.definedDate(o) && n.hasOwnProperty(t)) {
                const a = n[t].options;
                if (!a._currentView.isInFetchMode) {
                    const l = DateTime.toStorageDate(o);
                    if (n[t].typeData.hasOwnProperty(i) && n[t].typeData[i].hasOwnProperty(l)) {
                        i = Default2.getString(i, e.text.unknownTrendText);
                        if (n[t].typeData[i][l] > 0) {
                            n[t].typeData[i][l]--;
                        }
                        Trigger.customEvent(a.events.onRemove, a._currentView.element);
                        if (s) {
                            r(a, true);
                        }
                    }
                }
            }
            return Ie;
        },
        clearDate: function(t, o, i = null, s = true) {
            if (Is.definedString(t) && Is.definedDate(o) && n.hasOwnProperty(t)) {
                const a = n[t].options;
                if (!a._currentView.isInFetchMode) {
                    const l = DateTime.toStorageDate(o);
                    if (n[t].typeData.hasOwnProperty(i) && n[t].typeData[i].hasOwnProperty(l)) {
                        i = Default2.getString(i, e.text.unknownTrendText);
                        delete n[t].typeData[i][l];
                        Trigger.customEvent(a.events.onClear, a._currentView.element);
                        if (s) {
                            r(a, true);
                        }
                    }
                }
            }
            return Ie;
        },
        resetAll: function(e = true) {
            for (const t in n) {
                if (n.hasOwnProperty(t)) {
                    Ie.reset(t, e);
                }
            }
            return Ie;
        },
        reset: function(t, o = true) {
            if (Is.definedString(t) && n.hasOwnProperty(t)) {
                const i = n[t].options;
                if (!i._currentView.isInFetchMode) {
                    i._currentView.type = e.text.unknownTrendText;
                    ce(t, i, false);
                    Trigger.customEvent(i.events.onReset, i._currentView.element);
                    if (o) {
                        r(i, true);
                    }
                }
            }
            return Ie;
        },
        import: function(e, t = null) {
            if (Is.definedString(e) && n.hasOwnProperty(e)) {
                if (Is.definedArray(t)) {
                    V(t, n[e].options);
                } else {
                    T(n[e].options);
                }
            }
            return Ie;
        },
        export: function(e, t = null) {
            if (Is.definedString(e) && n.hasOwnProperty(e)) {
                const o = n[e].options;
                h(o, t, null, o.exportOnlyDataBeingViewed);
            }
            return Ie;
        },
        refresh: function(e) {
            if (Is.definedString(e) && n.hasOwnProperty(e)) {
                const t = n[e].options;
                r(t, true);
                Trigger.customEvent(t.events.onRefresh, t._currentView.element);
            }
            return Ie;
        },
        refreshAll: function() {
            for (const e in n) {
                if (n.hasOwnProperty(e)) {
                    const t = n[e].options;
                    r(t, true);
                    Trigger.customEvent(t.events.onRefresh, t._currentView.element);
                }
            }
            return Ie;
        },
        setYear: function(e, t) {
            if (Is.definedString(e) && Is.definedNumber(t) && n.hasOwnProperty(e)) {
                const o = n[e].options;
                o._currentView.year = t;
                if (!Is.yearVisible(o, o._currentView.year)) {
                    Ce(o, false);
                } else {
                    r(o);
                }
                Trigger.customEvent(o.events.onSetYear, o._currentView.year);
            }
            return Ie;
        },
        setYearToHighest: function(e) {
            if (Is.definedString(e) && n.hasOwnProperty(e)) {
                const t = n[e].options;
                const o = ue(t);
                let i = 0;
                for (const e in o) {
                    if (o.hasOwnProperty(e)) {
                        i = Math.max(i, parseInt(DateTime.getStorageDateYear(e)));
                    }
                }
                if (i > 0) {
                    t._currentView.year = i;
                    if (!Is.yearVisible(t, t._currentView.year)) {
                        Ce(t, false);
                    } else {
                        r(t);
                    }
                    Trigger.customEvent(t.events.onSetYear, t._currentView.year);
                }
            }
            return Ie;
        },
        setYearToLowest: function(e) {
            if (Is.definedString(e) && n.hasOwnProperty(e)) {
                const t = n[e].options;
                const o = ue(t);
                let i = 9999;
                for (const e in o) {
                    if (o.hasOwnProperty(e)) {
                        i = Math.min(i, parseInt(DateTime.getStorageDateYear(e)));
                    }
                }
                if (i < 9999) {
                    t._currentView.year = i;
                    if (!Is.yearVisible(t, t._currentView.year)) {
                        _e(t, false);
                    } else {
                        r(t);
                    }
                    Trigger.customEvent(t.events.onSetYear, t._currentView.year);
                }
            }
            return Ie;
        },
        moveToPreviousYear: function(e) {
            if (Is.definedString(e) && n.hasOwnProperty(e)) {
                _e(n[e].options);
            }
            return Ie;
        },
        moveToNextYear: function(e) {
            if (Is.definedString(e) && n.hasOwnProperty(e)) {
                Ce(n[e].options);
            }
            return Ie;
        },
        moveToCurrentYear: function(e) {
            if (Is.definedString(e) && n.hasOwnProperty(e)) {
                const t = n[e].options;
                t._currentView.year = (new Date).getFullYear();
                if (!Is.yearVisible(t, t._currentView.year)) {
                    Ce(t, false);
                } else {
                    r(t);
                }
                Trigger.customEvent(t.events.onSetYear, t._currentView.year);
            }
            return Ie;
        },
        getYear: function(e) {
            let t = -1;
            if (Is.definedString(e) && n.hasOwnProperty(e)) {
                t = n[e].options._currentView.year;
            }
            return t;
        },
        render: function(t, n) {
            if (Is.definedObject(t) && Is.definedObject(n)) {
                s(Binding.Options.getForNewInstance(e, n, t));
            }
            return Ie;
        },
        renderAll: function() {
            o();
            return Ie;
        },
        switchView: function(e, t) {
            if (Is.definedString(e) && Is.definedString(t) && n.hasOwnProperty(e)) {
                const o = n[e].options;
                let i;
                if (t.toLowerCase() === "map") {
                    i = 1;
                } else if (t.toLowerCase() === "chart") {
                    i = 2;
                } else if (t.toLowerCase() === "days") {
                    i = 3;
                } else if (t.toLowerCase() === "months") {
                    i = 5;
                } else if (t.toLowerCase() === "statistics") {
                    i = 4;
                } else {
                    i = 1;
                }
                if (Is.definedNumber(i)) {
                    re(o, i, t);
                }
            }
            return Ie;
        },
        switchType: function(e, t) {
            if (Is.definedString(e) && Is.definedString(t) && n.hasOwnProperty(e) && n[e].typeData.hasOwnProperty(t)) {
                const o = n[e].options;
                if (o._currentView.type !== t) {
                    o._currentView.type = t;
                    Trigger.customEvent(o.events.onTypeSwitch, t);
                    r(o);
                }
            }
            return Ie;
        },
        updateOptions: function(e, t) {
            if (Is.definedString(e) && Is.definedObject(t) && n.hasOwnProperty(e)) {
                const t = n[e].options;
                const o = Binding.Options.get(t);
                let i = false;
                for (const e in o) {
                    if (o.hasOwnProperty(e) && t.hasOwnProperty(e) && t[e] !== o[e]) {
                        t[e] = o[e];
                        i = true;
                    }
                }
                if (i) {
                    r(t, true);
                    Trigger.customEvent(t.events.onRefresh, t._currentView.element);
                    Trigger.customEvent(t.events.onOptionsUpdate, t._currentView.element, t);
                }
            }
            return Ie;
        },
        getActiveView: function(e) {
            let t = "";
            if (Is.definedString(e) && n.hasOwnProperty(e)) {
                const o = n[e].options;
                if (o._currentView.view === 1) {
                    t = "map";
                } else if (o._currentView.view === 2) {
                    t = "chart";
                } else if (o._currentView.view === 3) {
                    t = "days";
                } else if (o._currentView.view === 5) {
                    t = "months";
                } else if (o._currentView.view === 4) {
                    t = "statistics";
                } else {
                    t = "map";
                }
            }
            return t;
        },
        destroyAll: function() {
            for (const e in n) {
                if (n.hasOwnProperty(e)) {
                    Se(n[e].options);
                }
            }
            n = {};
            return Ie;
        },
        destroy: function(e) {
            if (Is.definedString(e) && n.hasOwnProperty(e)) {
                Se(n[e].options);
                delete n[e];
            }
            return Ie;
        },
        setConfiguration: function(t, n = true) {
            if (Is.definedObject(t)) {
                const o = e;
                const i = t;
                let s = false;
                for (const t in i) {
                    if (i.hasOwnProperty(t) && e.hasOwnProperty(t) && o[t] !== i[t]) {
                        o[t] = i[t];
                        s = true;
                    }
                }
                if (s) {
                    e = Configuration.Options.get(o);
                    Ee();
                    if (n) {
                        Ie.refreshAll();
                    }
                }
            }
            return Ie;
        },
        getIds: function() {
            const e = [];
            for (const t in n) {
                if (n.hasOwnProperty(t)) {
                    e.push(t);
                }
            }
            return e;
        },
        getVersion: function() {
            return "5.0.0";
        }
    };
    (() => {
        e = Configuration.Options.get();
        document.addEventListener("DOMContentLoaded", () => {
            Ee();
            o();
        });
        window.addEventListener("pagehide", () => ye());
        if (!Is.defined(window.$heat)) {
            window.$heat = Ie;
        }
    })();
})();//# sourceMappingURL=heat.js.map