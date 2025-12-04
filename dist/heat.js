"use strict";

var Constant;

(e => {
    e.HEAT_JS_ATTRIBUTE_NAME = "data-heat-js";
    e.HEAT_JS_MAP_DATE_ATTRIBUTE_NAME = "data-heat-js-map-date";
    e.HEAT_JS_CHART_DATE_ATTRIBUTE_NAME = "data-heat-js-chart-date";
    e.HEAT_JS_DAY_NUMBER_ATTRIBUTE_NAME = "data-heat-js-day-number";
    e.HEAT_JS_MONTH_NUMBER_ATTRIBUTE_NAME = "data-heat-js-month-number";
    e.HEAT_JS_STATISTICS_COLOR_RANGE_NAME_ATTRIBUTE_NAME = "data-heat-js-statistics-color-range-name";
})(Constant || (Constant = {}));

var ExportType = (e => {
    e["csv"] = "csv";
    e["json"] = "json";
    e["xml"] = "xml";
    e["txt"] = "txt";
    e["html"] = "html";
    e["md"] = "md";
    e["tsv"] = "tsv";
    e["yaml"] = "yaml";
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
    function getObjectFromString(objectString, configuration) {
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
                if (!configuration.safeMode) {
                    console.error(configuration.text.objectErrorText.replace("{{error_1}}", e1.message).replace("{{error_2}}", e.message));
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
        return e.split("-");
    }
    e.getStorageDate = r;
    function a(e) {
        return e.split("-")[0];
    }
    e.getStorageDateYear = a;
    function l() {
        const e = new Date;
        const t = e.getDay();
        const n = (t === 0 ? -6 : 1) - t;
        const o = new Date(e);
        o.setDate(e.getDate() + n);
        return o;
    }
    e.getDateForMondayOfCurrentWeek = l;
    function c(e) {
        const t = new Date;
        return e.getDate() === t.getDate() && e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
    }
    e.isTodaysDate = c;
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
        return r;
    }
    e.createWithHTML = o;
    function i(e, t, n = false) {
        const o = getComputedStyle(e);
        let i = o.getPropertyValue(t);
        if (n) {
            i = parseFloat(i);
        }
        return i;
    }
    e.getStyleValueByName = i;
    function s(e, t) {
        e.classList.add(t);
    }
    e.addClass = s;
    function r(e, t) {
        e.classList.remove(t);
    }
    e.removeClass = r;
    function a(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    e.cancelBubble = a;
    function l() {
        const e = document.documentElement;
        const t = {
            left: e.scrollLeft - (e.clientLeft || 0),
            top: e.scrollTop - (e.clientTop || 0)
        };
        return t;
    }
    e.getScrollPosition = l;
    function c(e, t) {
        let n = e.pageX;
        let o = e.pageY;
        const i = l();
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
    e.showElementAtMousePosition = c;
    function u(e) {
        const t = e.children;
        let n = t.length - 1;
        for (;n--; ) {
            e.appendChild(t[n]);
        }
    }
    e.reverseChildrenOrder = u;
    function d(e, t, i) {
        const s = n(e, "div");
        const r = n(s, "label", "checkbox");
        const a = n(r, "input");
        a.type = "checkbox";
        a.name = i;
        n(r, "span", "check-mark");
        o(r, "span", "text", t);
        return a;
    }
    e.createCheckBox = d;
    function f(t, n) {
        const o = e.getStyleValueByName(t, "background-color");
        const i = e.getStyleValueByName(n, "background-color");
        n.style.background = `linear-gradient(to top, ${o}, ${i})`;
    }
    e.adGradientEffect = f;
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
    e.renderControl = t;
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
            t.startMonth = Default2.getNumber(t.startMonth, 0);
            t.colorRanges = s(t);
            t.holidays = r(t);
            t.title = a(t);
            t.description = l(t);
            t.guide = c(t);
            t.tooltip = u(t);
            t.views.map = d(t);
            t.views.chart = f(t);
            t.views.days = m(t);
            t.views.months = w(t);
            t.views.statistics = h(t);
            t.yearlyStatistics = g(t);
            t.events = y(t);
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
            e.tooltip.dayText = Default2.getString(e.tooltip.dayText, "{d}{o} {mmmm} {yyyy}");
            return e.tooltip;
        }
        function d(e) {
            e.views.map = Default2.getObject(e.views.map, {});
            e.views.map.showMonthDayGaps = Default2.getBoolean(e.views.map.showMonthDayGaps, true);
            e.views.map.showDayNames = Default2.getBoolean(e.views.map.showDayNames, true);
            e.views.map.placeMonthNamesOnTheBottom = Default2.getBoolean(e.views.map.placeMonthNamesOnTheBottom, false);
            e.views.map.showDayNumbers = Default2.getBoolean(e.views.map.showDayNumbers, false);
            e.views.map.showMonthNames = Default2.getBoolean(e.views.map.showMonthNames, true);
            e.views.map.showDaysInReverseOrder = Default2.getBoolean(e.views.map.showDaysInReverseOrder, false);
            e.views.map.showNoDataMessageWhenDataIsNotAvailable = Default2.getBoolean(e.views.map.showNoDataMessageWhenDataIsNotAvailable, false);
            e.views.map.showMinimalDayNames = Default2.getBoolean(e.views.map.showMinimalDayNames, false);
            e.views.map.showMonthsInReverseOrder = Default2.getBoolean(e.views.map.showMonthsInReverseOrder, false);
            e.views.map.keepScrollPositions = Default2.getBoolean(e.views.map.keepScrollPositions, false);
            e.views.map.showDayDateNumbers = Default2.getBoolean(e.views.map.showDayDateNumbers, false);
            e.views.map.showToolTips = Default2.getBoolean(e.views.map.showToolTips, true);
            e.views.map.highlightCurrentDay = Default2.getBoolean(e.views.map.highlightCurrentDay, false);
            if (Is.invalidOptionArray(e.views.map.monthsToShow)) {
                e.views.map.monthsToShow = t;
            }
            if (Is.invalidOptionArray(e.views.map.daysToShow)) {
                e.views.map.daysToShow = n;
            }
            return e.views.map;
        }
        function f(e) {
            e.views.chart = Default2.getObject(e.views.chart, {});
            e.views.chart.enabled = Default2.getBoolean(e.views.chart.enabled, true);
            e.views.chart.showChartYLabels = Default2.getBoolean(e.views.chart.showChartYLabels, true);
            e.views.chart.showMonthNames = Default2.getBoolean(e.views.chart.showMonthNames, true);
            e.views.chart.showLineNumbers = Default2.getBoolean(e.views.chart.showLineNumbers, false);
            e.views.chart.showInReverseOrder = Default2.getBoolean(e.views.chart.showInReverseOrder, false);
            e.views.chart.keepScrollPositions = Default2.getBoolean(e.views.chart.keepScrollPositions, false);
            e.views.chart.showLineDateNumbers = Default2.getBoolean(e.views.chart.showLineDateNumbers, false);
            e.views.chart.showToolTips = Default2.getBoolean(e.views.chart.showToolTips, true);
            e.views.chart.useGradients = Default2.getBoolean(e.views.chart.useGradients, false);
            e.views.chart.highlightCurrentDay = Default2.getBoolean(e.views.chart.highlightCurrentDay, false);
            if (Is.invalidOptionArray(e.views.chart.monthsToShow)) {
                e.views.chart.monthsToShow = t;
            }
            if (Is.invalidOptionArray(e.views.chart.daysToShow)) {
                e.views.chart.daysToShow = n;
            }
            return e.views.chart;
        }
        function m(e) {
            e.views.days = Default2.getObject(e.views.days, {});
            e.views.days.enabled = Default2.getBoolean(e.views.days.enabled, true);
            e.views.days.showChartYLabels = Default2.getBoolean(e.views.days.showChartYLabels, true);
            e.views.days.showDayNames = Default2.getBoolean(e.views.days.showDayNames, true);
            e.views.days.showInReverseOrder = Default2.getBoolean(e.views.days.showInReverseOrder, false);
            e.views.days.showDayNumbers = Default2.getBoolean(e.views.days.showDayNumbers, false);
            e.views.days.keepScrollPositions = Default2.getBoolean(e.views.days.keepScrollPositions, false);
            e.views.days.showToolTips = Default2.getBoolean(e.views.days.showToolTips, true);
            e.views.days.useGradients = Default2.getBoolean(e.views.days.useGradients, false);
            e.views.days.useDifferentBackgroundOpacities = Default2.getBoolean(e.views.days.useDifferentBackgroundOpacities, false);
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
            e.views.months.showMonthNumbers = Default2.getBoolean(e.views.months.showMonthNumbers, false);
            e.views.months.keepScrollPositions = Default2.getBoolean(e.views.months.keepScrollPositions, false);
            e.views.months.showToolTips = Default2.getBoolean(e.views.months.showToolTips, true);
            e.views.months.useGradients = Default2.getBoolean(e.views.months.useGradients, false);
            e.views.months.useDifferentBackgroundOpacities = Default2.getBoolean(e.views.months.useDifferentBackgroundOpacities, false);
            e.views.months.highlightCurrentMonth = Default2.getBoolean(e.views.months.highlightCurrentMonth, false);
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
            e.views.statistics.showRangeNumbers = Default2.getBoolean(e.views.statistics.showRangeNumbers, false);
            e.views.statistics.showInReverseOrder = Default2.getBoolean(e.views.statistics.showInReverseOrder, false);
            e.views.statistics.keepScrollPositions = Default2.getBoolean(e.views.statistics.keepScrollPositions, false);
            e.views.statistics.showToolTips = Default2.getBoolean(e.views.statistics.showToolTips, true);
            e.views.statistics.useGradients = Default2.getBoolean(e.views.statistics.useGradients, false);
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
            e.yearlyStatistics.showTotalToday = Default2.getBoolean(e.yearlyStatistics.showTotalToday, true);
            e.yearlyStatistics.showTotalThisWeek = Default2.getBoolean(e.yearlyStatistics.showTotalThisWeek, true);
            e.yearlyStatistics.showTotalThisMonth = Default2.getBoolean(e.yearlyStatistics.showTotalThisMonth, true);
            e.yearlyStatistics.showTotalThisYear = Default2.getBoolean(e.yearlyStatistics.showTotalThisYear, true);
            e.yearlyStatistics.showOnlyForCurrentYear = Default2.getBoolean(e.yearlyStatistics.showOnlyForCurrentYear, false);
            return e.yearlyStatistics;
        }
        function y(e) {
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
            e.events.onDayToolTipRender = Default2.getFunction(e.events.onDayToolTipRender, null);
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
            e.events.onDayClick = Default2.getFunction(e.events.onDayClick, null);
            e.events.onDayDblClick = Default2.getFunction(e.events.onDayDblClick, null);
            e.events.onWeekDayClick = Default2.getFunction(e.events.onWeekDayClick, null);
            e.events.onWeekDayDblClick = Default2.getFunction(e.events.onWeekDayDblClick, null);
            e.events.onMonthClick = Default2.getFunction(e.events.onMonthClick, null);
            e.events.onMonthDblClick = Default2.getFunction(e.events.onMonthDblClick, null);
            e.events.onStatisticClick = Default2.getFunction(e.events.onStatisticClick, null);
            e.events.onStatisticDblClick = Default2.getFunction(e.events.onStatisticDblClick, null);
            return e.events;
        }
    })(t = e.Options || (e.Options = {}));
})(Binding || (Binding = {}));

var Config;

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
            e.text.closeToolTipText = Default2.getAnyString(e.text.closeToolTipText, "Close");
            e.text.configurationToolTipText = Default2.getAnyString(e.text.configurationToolTipText, "Configuration");
            e.text.configurationTitleText = Default2.getAnyString(e.text.configurationTitleText, "Configuration");
            e.text.visibleMonthsText = Default2.getAnyString(e.text.visibleMonthsText, "Visible Months");
            e.text.visibleDaysText = Default2.getAnyString(e.text.visibleDaysText, "Visible Days");
            e.text.dataText = Default2.getAnyString(e.text.dataText, "Data");
            e.text.colorRangesText = Default2.getAnyString(e.text.colorRangesText, "Color Ranges");
            e.text.yearText = Default2.getAnyString(e.text.yearText, "Year");
            e.text.daysText = Default2.getAnyString(e.text.daysText, "Days");
            e.text.noDaysDataMessage = Default2.getAnyString(e.text.noDaysDataMessage, "There are currently no days to view.");
            e.text.backButtonSymbolText = Default2.getAnyString(e.text.backButtonSymbolText, "←");
            e.text.nextButtonSymbolText = Default2.getAnyString(e.text.nextButtonSymbolText, "→");
            e.text.refreshButtonSymbolText = Default2.getAnyString(e.text.refreshButtonSymbolText, "↻");
            e.text.exportButtonSymbolText = Default2.getAnyString(e.text.exportButtonSymbolText, "↓");
            e.text.importButtonSymbolText = Default2.getAnyString(e.text.importButtonSymbolText, "↑");
            e.text.currentYearText = Default2.getAnyString(e.text.currentYearText, "Current Year");
            e.text.currentYearSymbolText = Default2.getAnyString(e.text.currentYearSymbolText, "⏎");
            e.text.totalTodayText = Default2.getAnyString(e.text.totalTodayText, "Total Today");
            e.text.totalThisWeekText = Default2.getAnyString(e.text.totalThisWeekText, "Total This Week");
            e.text.totalThisMonthText = Default2.getAnyString(e.text.totalThisMonthText, "Total This Month");
            e.text.totalThisYearText = Default2.getAnyString(e.text.totalThisYearText, "Total This Year");
            e.text.unknownText = Default2.getAnyString(e.text.unknownText, "Unknown");
            e.text.monthsText = Default2.getAnyString(e.text.monthsText, "Months");
            e.text.noMonthsDataMessage = Default2.getAnyString(e.text.noMonthsDataMessage, "There are currently no months to view.");
            e.text.selectTypeText = Default2.getAnyString(e.text.selectTypeText, "Select Type");
            e.text.filenamePlaceholderText = Default2.getAnyString(e.text.filenamePlaceholderText, "Filename (optional)");
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
})(Config || (Config = {}));

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

(() => {
    let e = {};
    let t = null;
    let n = {};
    const o = "HOLIDAY";
    const i = "HJS_";
    function s() {
        const t = e.domElementTypes;
        const n = t.length;
        for (let e = 0; e < n; e++) {
            const n = document.getElementsByTagName(t[e]);
            const o = [].slice.call(n);
            const i = o.length;
            for (let e = 0; e < i; e++) {
                if (!r(o[e])) {
                    break;
                }
            }
        }
    }
    function r(t) {
        let n = true;
        if (Is.defined(t) && t.hasAttribute(Constant.HEAT_JS_ATTRIBUTE_NAME)) {
            const o = t.getAttribute(Constant.HEAT_JS_ATTRIBUTE_NAME);
            if (Is.definedString(o)) {
                const i = Default2.getObjectFromString(o, e);
                if (i.parsed && Is.definedObject(i.object)) {
                    a(Binding.Options.getForNewInstance(e, i.object, t));
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
    function a(e) {
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
        G(e._currentView.element.id, e);
        l(e);
        Trigger.customEvent(e.events.onRenderComplete, e._currentView.element);
    }
    function l(e, t = false, n = false) {
        if (t) {
            te(e);
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
        e._currentView.yearsAvailable = q(e);
        ToolTip.hide(e);
        oe(e);
        if (e.title.showConfigurationButton) {
            Disabled.Background.render(e);
            c(e);
        }
        if (e.title.showExportButton) {
            f(e);
        }
        ToolTip.renderControl(e);
        h(e);
        x(e, n);
        if (e.views.chart.enabled) {
            V(e, n);
            e._currentView.chartContents.style.display = "none";
        }
        if (e.views.days.enabled) {
            I(e, n);
            e._currentView.daysContents.style.display = "none";
        }
        if (e.views.months.enabled) {
            O(e, n);
            e._currentView.monthsContents.style.display = "none";
        }
        if (e.views.statistics.enabled) {
            F(e, n);
            e._currentView.statisticsContents.style.display = "none";
        }
        e._currentView.mapContents.style.display = "none";
        if (e._currentView.view === 1) {
            e._currentView.mapContents.style.display = "block";
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
            e._currentView.mapContents.style.display = "block";
        }
        T(e);
    }
    function c(t) {
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
        i.onclick = () => d(t);
        for (let n = 0; n < 7; n++) {
            t._currentView.configurationDialogDayCheckBoxes[n] = DomElement.createCheckBox(s, e.text.dayNames[n], n.toString());
        }
        let c = a;
        let u = 0;
        for (let n = t.startMonth; n < 12 + t.startMonth; n++) {
            let o = n;
            if (t.startMonth > 0 && n > 11) {
                o = n - 12;
            }
            t._currentView.configurationDialogMonthCheckBoxes[o] = DomElement.createCheckBox(c, e.text.monthNames[o], o.toString());
            u++;
            if (u > 6) {
                c = l;
            }
        }
        ToolTip.add(i, t, e.text.closeToolTipText);
    }
    function u(e) {
        Disabled.Background.show(e);
        if (Is.defined(e._currentView.configurationDialog) && e._currentView.configurationDialog.style.display !== "block") {
            e._currentView.configurationDialog.style.display = "block";
        }
        const t = We(e);
        const n = Fe(e);
        for (let n = 0; n < 7; n++) {
            e._currentView.configurationDialogDayCheckBoxes[n].checked = X(t, n + 1);
        }
        for (let t = 0; t < 12; t++) {
            e._currentView.configurationDialogMonthCheckBoxes[t].checked = z(n, t);
        }
        ToolTip.hide(e);
    }
    function d(e) {
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
            l(e);
            Trigger.customEvent(e.events.onOptionsUpdate, e._currentView.element, e);
        } else {
            ToolTip.hide(e);
        }
    }
    function f(t) {
        t._currentView.exportDialog = DomElement.create(t._currentView.disabledBackground, "div", "dialog export");
        const n = DomElement.create(t._currentView.exportDialog, "div", "dialog-title-bar");
        const o = DomElement.create(t._currentView.exportDialog, "div", "dialog-contents");
        const i = DomElement.create(n, "div", "dialog-close");
        DomElement.createWithHTML(n, "span", "dialog-title-bar-text", e.text.selectTypeText);
        t._currentView.exportDialogExportTypeSelect = DomElement.create(o, "select", "input-box");
        t._currentView.exportDialogExportTypeSelect.name = crypto.randomUUID();
        t._currentView.exportDialogExportFilenameInput = DomElement.create(o, "input", "input-box filename");
        t._currentView.exportDialogExportFilenameInput.placeholder = e.text.filenamePlaceholderText;
        let s;
        let r = [];
        for (s in ExportType) {
            const e = DomElement.createWithNoContainer("option");
            e.value = ExportType[s];
            e.textContent = s.toString().toUpperCase();
            e.selected = s === t.exportType;
            r.push(e);
        }
        r.sort((e, t) => e.text.toLowerCase().localeCompare(t.text.toLowerCase()));
        r.forEach(e => t._currentView.exportDialogExportTypeSelect.add(e));
        const a = DomElement.create(o, "div", "buttons");
        const l = DomElement.createWithHTML(a, "button", "", e.text.exportButtonText);
        l.onclick = () => {
            const e = t._currentView.exportDialogExportTypeSelect.value;
            w(t);
            xe(t, e, t._currentView.exportDialogExportFilenameInput.value);
        };
        i.onclick = () => w(t);
        ToolTip.add(i, t, e.text.closeToolTipText);
    }
    function m(e) {
        Disabled.Background.show(e);
        if (Is.defined(e._currentView.exportDialog) && e._currentView.exportDialog.style.display !== "block") {
            e._currentView.exportDialogExportFilenameInput.value = "";
            e._currentView.exportDialog.style.display = "block";
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
    function h(t) {
        if (t.title.showText || t.title.showYearSelector || t.title.showRefreshButton || t.title.showExportButton || t.title.showImportButton) {
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
                g(t, o);
            }
            if (t.title.showImportButton && !t._currentView.isInFetchMode) {
                const o = DomElement.createWithHTML(n, "button", "import", e.text.importButtonSymbolText);
                o.onclick = () => we(t);
                if (t.title.showToolTips) {
                    ToolTip.add(o, t, e.text.importButtonText);
                }
            }
            if (t.title.showExportButton) {
                const o = DomElement.createWithHTML(n, "button", "export", e.text.exportButtonSymbolText);
                o.onclick = () => m(t);
                if (t.title.showToolTips) {
                    ToolTip.add(o, t, e.text.exportButtonText);
                }
            }
            if (t.title.showRefreshButton) {
                const o = DomElement.createWithHTML(n, "button", "refresh", e.text.refreshButtonSymbolText);
                if (t.title.showToolTips) {
                    ToolTip.add(o, t, e.text.refreshButtonText);
                }
                o.onclick = () => {
                    l(t);
                    Trigger.customEvent(t.events.onRefresh, t._currentView.element);
                };
            }
            if (t.title.showYearSelector) {
                const o = DomElement.createWithHTML(n, "button", "back", e.text.backButtonSymbolText);
                o.onclick = () => Ae(t);
                if (t.title.showToolTips) {
                    ToolTip.add(o, t, e.text.backButtonText);
                }
                if (Q(t, t._currentView.year)) {
                    o.disabled = true;
                }
                let i = t._currentView.year.toString();
                if (t.startMonth > 0) {
                    i += ` / ${t._currentView.year + 1}`;
                }
                t._currentView.yearText = DomElement.createWithHTML(n, "div", "year-text", i);
                if (t.title.showYearSelectionDropDown) {
                    D(t);
                } else {
                    DomElement.addClass(t._currentView.yearText, "no-click");
                }
                if (t.title.showConfigurationButton) {
                    let o = DomElement.create(n, "div", "configure");
                    o.onclick = () => u(t);
                    if (t.title.showToolTips) {
                        ToolTip.add(o, t, e.text.configurationToolTipText);
                    }
                }
                if (t.title.showCurrentYearButton) {
                    const o = DomElement.createWithHTML(n, "button", "current", e.text.currentYearSymbolText);
                    if (t.title.showToolTips) {
                        ToolTip.add(o, t, e.text.currentYearText);
                    }
                    o.onclick = () => {
                        t._currentView.year = (new Date).getFullYear() - 1;
                        He(t, false);
                        Trigger.customEvent(t.events.onSetYear, t._currentView.year);
                    };
                }
                const s = DomElement.createWithHTML(n, "button", "next", e.text.nextButtonSymbolText);
                s.onclick = () => He(t);
                if (t.title.showToolTips) {
                    ToolTip.add(s, t, e.text.nextButtonText);
                }
                if (Z(t, t._currentView.year)) {
                    s.disabled = true;
                }
            }
        }
    }
    function g(t, n) {
        const o = DomElement.create(n, "div", "titles-menu-container");
        const i = DomElement.create(o, "div", "titles-menu");
        if (t.title.showTitleDropDownHeaders) {
            DomElement.createWithHTML(i, "div", "title-menu-header", `${e.text.dataText}${":"}`);
        }
        const s = DomElement.createWithHTML(i, "div", "title-menu-item", e.text.mapText);
        y(t, s, 1, "map");
        if (t.views.chart.enabled) {
            const n = DomElement.createWithHTML(i, "div", "title-menu-item", e.text.chartText);
            y(t, n, 2, "chart");
        }
        let r = null;
        if (t.views.days.enabled) {
            if (t.title.showTitleDropDownHeaders) {
                r = DomElement.createWithHTML(i, "div", "title-menu-header", `${e.text.yearText}${":"}`);
            }
            const n = DomElement.createWithHTML(i, "div", "title-menu-item", e.text.daysText);
            y(t, n, 3, "days");
        }
        if (t.views.months.enabled) {
            if (t.title.showTitleDropDownHeaders && !Is.defined(r)) {
                r = DomElement.createWithHTML(i, "div", "title-menu-header", `${e.text.yearText}${":"}`);
            }
            const n = DomElement.createWithHTML(i, "div", "title-menu-item", e.text.monthsText);
            y(t, n, 5, "months");
        }
        if (t.views.statistics.enabled) {
            if (t.title.showTitleDropDownHeaders) {
                DomElement.createWithHTML(i, "div", "title-menu-header", `${e.text.statisticsText}${":"}`);
            }
            const n = DomElement.createWithHTML(i, "div", "title-menu-item", e.text.colorRangesText);
            y(t, n, 4, "statistics");
        }
    }
    function y(e, t, n, o) {
        if (e._currentView.view === n) {
            DomElement.addClass(t, "title-menu-item-active");
        } else {
            t.onclick = () => {
                e._currentView.view = n;
                Trigger.customEvent(e.events.onViewSwitch, o);
                l(e, false, true);
            };
        }
    }
    function D(e) {
        DomElement.create(e._currentView.yearText, "div", "down-arrow");
        const t = DomElement.create(e._currentView.yearText, "div", "years-menu-container");
        const n = DomElement.create(t, "div", "years-menu");
        const o = (new Date).getFullYear();
        let i = null;
        t.style.display = "block";
        t.style.visibility = "hidden";
        for (let t = o - e.title.extraSelectionYears; t < o + e.title.extraSelectionYears; t++) {
            if (K(e, t)) {
                let s = p(e, n, t, o);
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
    function p(e, t, n, o) {
        let i = null;
        const s = e.startMonth === 0 ? n.toString() : `${n} / ${n + 1}`;
        const r = DomElement.createWithHTML(t, "div", "year-menu-item", s);
        if (e._currentView.year !== n) {
            r.onclick = () => {
                e._currentView.year = n;
                l(e);
                Trigger.customEvent(e.events.onSetYear, e._currentView.year);
            };
            if (n === o) {
                DomElement.addClass(r, "year-menu-item-current");
            }
        } else {
            DomElement.addClass(r, "year-menu-item-active");
            i = r;
        }
        return i;
    }
    function T(t) {
        const o = new Date;
        const i = t._currentView.year === o.getFullYear();
        if (t.yearlyStatistics.enabled && (!t.yearlyStatistics.showOnlyForCurrentYear || i)) {
            const s = DomElement.create(t._currentView.element, "div", "yearly-statistics", t._currentView.mapContents);
            const r = We(t);
            const a = Fe(t);
            if (t.yearlyStatistics.showTotalToday) {
                let a = n[t._currentView.element.id].typeData[t._currentView.type][DateTime.toStorageDate(o)];
                const l = DomElement.create(s, "div", "statistics-box");
                const c = DateTime.getWeekdayNumber(o) + 1;
                if (!Is.defined(a) || !X(r, c)) {
                    a = 0;
                }
                const u = i ? Str.friendlyNumber(a) : e.text.unknownText;
                DomElement.createWithHTML(l, "div", "statistics-box-title", `${e.text.totalTodayText}${":"}`);
                DomElement.createWithHTML(l, "div", "statistics-box-count", u);
            }
            if (t.yearlyStatistics.showTotalThisWeek) {
                let n = 0;
                if (i) {
                    const e = DateTime.getDateForMondayOfCurrentWeek();
                    const o = new Date(e);
                    o.setDate(e.getDate() + 7);
                    n = v(t, r, a, e, o);
                }
                const o = i ? Str.friendlyNumber(n) : e.text.unknownText;
                const l = DomElement.create(s, "div", "statistics-box");
                DomElement.createWithHTML(l, "div", "statistics-box-title", `${e.text.totalThisWeekText}${":"}`);
                DomElement.createWithHTML(l, "div", "statistics-box-count", o);
            }
            if (t.yearlyStatistics.showTotalThisMonth) {
                let n = 0;
                if (i) {
                    const e = new Date(o.getFullYear(), o.getMonth(), 1);
                    const i = new Date(o.getFullYear(), o.getMonth(), DateTime.getTotalDaysInMonth(o.getFullYear(), o.getMonth()) + 1);
                    n = v(t, r, a, e, i);
                }
                const l = i ? Str.friendlyNumber(n) : e.text.unknownText;
                const c = DomElement.create(s, "div", "statistics-box");
                DomElement.createWithHTML(c, "div", "statistics-box-title", `${e.text.totalThisMonthText}${":"}`);
                DomElement.createWithHTML(c, "div", "statistics-box-count", l);
            }
            if (t.yearlyStatistics.showTotalThisYear) {
                const n = new Date(t._currentView.year, t.startMonth, 1);
                const o = new Date(t._currentView.year + 1, t.startMonth, 1);
                const i = v(t, r, a, n, o);
                const l = DomElement.create(s, "div", "statistics-box");
                DomElement.createWithHTML(l, "div", "statistics-box-title", `${e.text.totalThisYearText}${":"}`);
                DomElement.createWithHTML(l, "div", "statistics-box-count", Str.friendlyNumber(i));
            }
            if (s.innerHTML === "") {
                s.parentNode.removeChild(s);
            }
        }
    }
    function v(e, t, o, i, s) {
        let r = 0;
        let a = new Date(i);
        while (a < s) {
            const i = n[e._currentView.element.id].typeData[e._currentView.type][DateTime.toStorageDate(a)];
            const s = DateTime.getWeekdayNumber(a) + 1;
            if (z(o, a.getMonth()) && X(t, s) && Is.definedNumber(i)) {
                r += i;
            }
            a.setDate(a.getDate() + 1);
        }
        return r;
    }
    function x(t, n) {
        t._currentView.mapContents = DomElement.create(t._currentView.element, "div", "map-contents");
        if (t.views.chart.enabled) {
            _(t);
        }
        if (t.views.days.enabled) {
            M(t);
        }
        if (t.views.months.enabled) {
            N(t);
        }
        if (t.views.statistics.enabled) {
            H(t);
        }
        $(t);
        if (t.views.map.showNoDataMessageWhenDataIsNotAvailable && !S(t)) {
            const o = DomElement.createWithHTML(t._currentView.mapContents, "div", "no-data-message", e.text.noMapDataMessage);
            if (n) {
                DomElement.addClass(o, "view-switch");
            }
        } else {
            t._currentView.mapContents.style.minHeight = "unset";
            me(t._currentView.mapContents, t);
            const o = DomElement.create(t._currentView.mapContents, "div", "map");
            const i = t._currentView.year;
            let s = false;
            if (n) {
                DomElement.addClass(o, "view-switch");
            }
            if (t.views.map.showDayNames) {
                const n = DomElement.create(o, "div", "days");
                const i = t.views.map.showMinimalDayNames && t.views.map.daysToShow.length === 7;
                if (!t.views.map.showMonthNames || t.views.map.placeMonthNamesOnTheBottom) {
                    n.className = "days-months-bottom";
                }
                for (let o = 0; o < 7; o++) {
                    if (X(t.views.map.daysToShow, o + 1)) {
                        const t = !i || o % 3 === 0 ? e.text.dayNames[o] : " ";
                        DomElement.createWithHTML(n, "div", "day-name", t);
                    }
                }
                if (t.views.map.showDaysInReverseOrder) {
                    DomElement.reverseChildrenOrder(n);
                }
            }
            const r = DomElement.create(o, "div", "months");
            const a = de(t);
            for (let n = t.startMonth; n < 12 + t.startMonth; n++) {
                let o = n;
                let l = i;
                if (t.startMonth > 0 && n > 11) {
                    o = n - 12;
                    l++;
                }
                if (z(t.views.map.monthsToShow, o)) {
                    const n = DomElement.create(r, "div", "month");
                    const i = DomElement.create(n, "div", "day-columns");
                    let c = DateTime.getTotalDaysInMonth(l, o);
                    let u = DomElement.create(i, "div", "day-column");
                    let d = false;
                    const f = new Date(l, o, 1);
                    const m = DateTime.getWeekdayNumber(f);
                    let w = 1;
                    c += m;
                    for (let e = 0; e < c; e++) {
                        if (e >= m) {
                            d = true;
                        } else {
                            if (X(t.views.map.daysToShow, w)) {
                                DomElement.create(u, "div", "day-disabled");
                            }
                        }
                        if (d) {
                            let n = null;
                            if (X(t.views.map.daysToShow, w)) {
                                n = b(t, u, e - m, o, l, a);
                            }
                            if ((e + 1) % 7 === 0) {
                                if (t.views.map.showDaysInReverseOrder) {
                                    DomElement.reverseChildrenOrder(u);
                                }
                                u = DomElement.create(i, "div", "day-column");
                                w = 0;
                                if (t._currentView.dayWidth === 0 && Is.defined(n)) {
                                    let e = DomElement.getStyleValueByName(n, "margin-left", true);
                                    let o = DomElement.getStyleValueByName(n, "margin-right", true);
                                    t._currentView.dayWidth = n.offsetWidth + e + o;
                                }
                            }
                        }
                        w++;
                    }
                    if (t.views.map.showMonthNames) {
                        let s;
                        const r = n.offsetWidth;
                        let a = e.text.monthNames[o];
                        if (t.startMonth > 0) {
                            a += `${" "}${l}`;
                        }
                        if (!t.views.map.placeMonthNamesOnTheBottom) {
                            s = DomElement.createWithHTML(n, "div", "month-name", a, i);
                        } else {
                            s = DomElement.createWithHTML(n, "div", "month-name-bottom", a);
                        }
                        if (Is.defined(s)) {
                            if (t.views.map.showMonthDayGaps) {
                                s.style.width = `${r}px`;
                            } else {
                                s.style.width = `${r - t._currentView.dayWidth}px`;
                            }
                        }
                    }
                    if (s && Is.defined(t._currentView.dayWidth)) {
                        if (m > 0 && !t.views.map.showMonthDayGaps) {
                            n.style.marginLeft = `${-t._currentView.dayWidth}px`;
                        } else if (m === 0 && t.views.map.showMonthDayGaps) {
                            n.style.marginLeft = `${t._currentView.dayWidth}px`;
                        }
                    }
                    if (t.views.map.showMonthsInReverseOrder) {
                        DomElement.reverseChildrenOrder(i);
                    }
                    s = true;
                }
            }
            if (t.views.map.showMonthsInReverseOrder) {
                DomElement.reverseChildrenOrder(r);
            }
            if (t.views.map.keepScrollPositions) {
                t._currentView.mapContents.scrollLeft = t._currentView.mapContentsScrollLeft;
            }
        }
    }
    function b(e, t, o, i, s, r) {
        const a = o + 1;
        const l = DomElement.create(t, "div", "day");
        const c = new Date(s, i, a);
        const u = fe(e, c);
        let d = n[e._currentView.element.id].typeData[e._currentView.type][DateTime.toStorageDate(c)];
        d = Default2.getNumber(d, 0);
        l.setAttribute(Constant.HEAT_JS_MAP_DATE_ATTRIBUTE_NAME, `${Str.padNumber(a)}-${Str.padNumber(i + 1)}-${s}`);
        if (e.views.map.showToolTips) {
            U(e, l, c, d);
        }
        if (e.views.map.showDayNumbers && d > 0) {
            l.innerHTML = Str.friendlyNumber(d);
        } else if (e.views.map.showDayDateNumbers) {
            l.innerHTML = a.toString();
        }
        if (Is.definedFunction(e.events.onDayClick)) {
            l.onclick = () => Trigger.customEvent(e.events.onDayClick, c, d, u.matched);
        } else if (Is.definedFunction(e.events.onDayDblClick)) {
            l.ondblclick = () => Trigger.customEvent(e.events.onDayDblClick, c, d, u.matched);
        } else {
            DomElement.addClass(l, "no-hover");
        }
        const f = ce(e, r, d, c);
        if (Is.defined(f) && re(e, f.id)) {
            if (Is.definedString(f.mapCssClassName)) {
                DomElement.addClass(l, f.mapCssClassName);
            } else {
                DomElement.addClass(l, f.cssClassName);
            }
        }
        if (e.views.map.highlightCurrentDay && DateTime.isTodaysDate(c)) {
            DomElement.addClass(l, "today");
        }
        return l;
    }
    function S(e) {
        let t = false;
        const n = J(e);
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
    function _(e) {
        e._currentView.chartContents = DomElement.create(e._currentView.element, "div", "chart-contents");
        me(e._currentView.chartContents, e);
    }
    function V(t, n) {
        const o = DomElement.create(t._currentView.chartContents, "div", "chart");
        let i = DomElement.create(o, "div", "y-labels");
        const s = DomElement.create(o, "div", "day-lines");
        const r = de(t);
        const a = C(t);
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
            const n = t._currentView.mapContents.offsetHeight / a;
            let o = 0;
            let i = 0;
            let u = [];
            for (let e = t.startMonth; e < 12 + t.startMonth; e++) {
                let a = e;
                let c = l;
                if (t.startMonth > 0 && e > 11) {
                    a = e - 12;
                    c++;
                }
                if (z(t.views.chart.monthsToShow, a)) {
                    const e = DateTime.getTotalDaysInMonth(c, a);
                    let l = 1;
                    let d = false;
                    o++;
                    for (let o = 0; o < e; o++) {
                        const e = new Date(c, a, l);
                        const f = DateTime.getWeekdayNumber(e) + 1;
                        if (X(t.views.chart.daysToShow, f)) {
                            const e = E(s, t, o + 1, a, c, r, n);
                            if (!d) {
                                u.push(e);
                                d = true;
                            }
                        }
                        if ((o + 1) % 7 === 0) {
                            l = 0;
                        }
                        l++;
                        i++;
                    }
                }
            }
            if (t.views.chart.showInReverseOrder) {
                DomElement.reverseChildrenOrder(s);
                u = u.reverse();
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
                    if (z(t.views.chart.monthsToShow, s)) {
                        let i = e.text.monthNames[s];
                        if (t.startMonth > 0) {
                            i += `${" "}${r}`;
                        }
                        let a = DomElement.createWithHTML(n, "div", "month-name", i);
                        a.style.left = `${u[o].offsetLeft}px`;
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
    }
    function E(e, t, n, o, i, s, r) {
        const a = new Date(i, o, n);
        const l = DomElement.create(e, "div", "day-line");
        const c = fe(t, a);
        let u = J(t)[DateTime.toStorageDate(a)];
        u = Default2.getNumber(u, 0);
        l.setAttribute(Constant.HEAT_JS_CHART_DATE_ATTRIBUTE_NAME, `${Str.padNumber(n)}-${Str.padNumber(o + 1)}-${i}`);
        if (t.views.chart.showToolTips) {
            U(t, l, a, u);
        }
        if (t.views.chart.showLineNumbers && u > 0) {
            DomElement.addClass(l, "day-line-number");
            l.innerHTML = u.toString();
        } else if (t.views.chart.showLineDateNumbers) {
            DomElement.addClass(l, "day-line-number");
            l.innerHTML = n.toString();
        }
        const d = u * r;
        l.style.height = `${d}px`;
        if (d <= 0) {
            l.style.visibility = "hidden";
        }
        if (Is.definedFunction(t.events.onDayClick)) {
            l.onclick = () => Trigger.customEvent(t.events.onDayClick, a, u, c.matched);
        } else if (Is.definedFunction(t.events.onDayDblClick)) {
            l.ondblclick = () => Trigger.customEvent(t.events.onDayDblClick, a, u, c.matched);
        } else {
            DomElement.addClass(l, "no-hover");
        }
        const f = ce(t, s, u, a);
        if (Is.defined(f) && re(t, f.id)) {
            if (Is.definedString(f.chartCssClassName)) {
                DomElement.addClass(l, f.chartCssClassName);
            } else {
                DomElement.addClass(l, f.cssClassName);
            }
        }
        if (t.views.chart.highlightCurrentDay && DateTime.isTodaysDate(a)) {
            DomElement.addClass(l, "today");
        }
        if (t.views.chart.useGradients) {
            DomElement.adGradientEffect(t._currentView.element, l);
        }
        return l;
    }
    function C(e) {
        let t = 0;
        const n = J(e);
        const o = e._currentView.year;
        for (let i = e.startMonth; i < 12 + e.startMonth; i++) {
            let s = i;
            let r = o;
            if (e.startMonth > 0 && i > 11) {
                s = i - 12;
                r++;
            }
            const a = DateTime.getTotalDaysInMonth(r, s);
            for (let o = 0; o < a; o++) {
                const i = new Date(r, s, o + 1);
                const a = DateTime.toStorageDate(i);
                const l = DateTime.getWeekdayNumber(i) + 1;
                if (n.hasOwnProperty(a)) {
                    if (z(e.views.chart.monthsToShow, s) && X(e.views.chart.daysToShow, l)) {
                        t = Math.max(t, n[a]);
                    }
                }
            }
        }
        return t;
    }
    function M(e) {
        e._currentView.daysContents = DomElement.create(e._currentView.element, "div", "days-contents");
        me(e._currentView.daysContents, e);
    }
    function I(t, n) {
        const o = DomElement.create(t._currentView.daysContents, "div", "days");
        const i = DomElement.create(t._currentView.daysContents, "div", "day-names");
        let s = DomElement.create(o, "div", "y-labels");
        const r = DomElement.create(o, "div", "day-lines");
        const a = k(t);
        if (n) {
            DomElement.addClass(o, "view-switch");
        }
        if (a.largestValue > 0 && t.views.days.showChartYLabels) {
            const e = DomElement.createWithHTML(s, "div", "label-0", a.largestValue.toString());
            DomElement.createWithHTML(s, "div", "label-25", (Math.floor(a.largestValue / 4) * 3).toString());
            DomElement.createWithHTML(s, "div", "label-50", Math.floor(a.largestValue / 2).toString());
            DomElement.createWithHTML(s, "div", "label-75", Math.floor(a.largestValue / 4).toString());
            DomElement.createWithHTML(s, "div", "label-100", "0");
            s.style.width = `${e.offsetWidth}px`;
            i.style.paddingLeft = `${s.offsetWidth + DomElement.getStyleValueByName(s, "margin-right", true)}px`;
        } else {
            s.parentNode.removeChild(s);
            s = null;
        }
        if (a.largestValue === 0) {
            t._currentView.daysContents.style.minHeight = `${t._currentView.mapContents.offsetHeight}px`;
            o.parentNode.removeChild(o);
            i.parentNode.removeChild(i);
            const s = DomElement.createWithHTML(t._currentView.daysContents, "div", "no-days-message", e.text.noDaysDataMessage);
            if (n) {
                DomElement.addClass(s, "view-switch");
            }
        } else {
            const n = t._currentView.mapContents.offsetHeight / a.largestValue;
            const o = 1 / 7;
            let s = o;
            for (const l in a.values) {
                if (a.values.hasOwnProperty(l) && X(t.views.days.daysToShow, parseInt(l))) {
                    B(r, parseInt(l), a.values[l], t, n, s);
                    if (t.views.days.showDayNames) {
                        DomElement.createWithHTML(i, "div", "day-name", e.text.dayNames[parseInt(l) - 1]);
                    }
                }
                s += o;
            }
            if (t.views.days.showInReverseOrder) {
                DomElement.reverseChildrenOrder(r);
                DomElement.reverseChildrenOrder(i);
            }
            if (t.views.days.keepScrollPositions) {
                t._currentView.daysContents.scrollLeft = t._currentView.daysContentsScrollLeft;
            }
        }
    }
    function B(e, t, n, o, i, s) {
        const r = DomElement.create(e, "div", "day-line");
        const a = n * i;
        r.style.height = `${a}px`;
        r.setAttribute(Constant.HEAT_JS_DAY_NUMBER_ATTRIBUTE_NAME, t.toString());
        if (a <= 0) {
            r.style.visibility = "hidden";
        }
        if (o.views.days.showToolTips) {
            ToolTip.add(r, o, Str.friendlyNumber(n));
        }
        if (Is.definedFunction(o.events.onWeekDayClick)) {
            r.onclick = () => Trigger.customEvent(o.events.onWeekDayClick, t, n, o._currentView.year);
        } else if (Is.definedFunction(o.events.onWeekDayDblClick)) {
            r.ondblclick = () => Trigger.customEvent(o.events.onWeekDayDblClick, t, n, o._currentView.year);
        } else {
            DomElement.addClass(r, "no-hover");
        }
        if (o.views.days.showDayNumbers && n > 0) {
            DomElement.addClass(r, "day-line-number");
            DomElement.createWithHTML(r, "div", "count", Str.friendlyNumber(n));
        }
        if (o.views.days.useGradients) {
            DomElement.adGradientEffect(o._currentView.element, r);
        } else if (o.views.days.useDifferentBackgroundOpacities) {
            const e = DomElement.getStyleValueByName(r, "background-color");
            if (e.startsWith("rgba") || e.startsWith("rgb")) {
                let t = e.replace("rgba(", "").replace("rgb(", "").replace(")", "").split(",");
                if (e.startsWith("rgba")) {
                    t[t.length - 1] = s.toString();
                } else {
                    t.push(s.toString());
                }
                r.style.backgroundColor = `rgba(${t.join()})`;
            }
        }
    }
    function k(e) {
        const t = {
            values: {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0
            },
            largestValue: 0
        };
        const n = J(e);
        const o = e._currentView.year;
        for (let i = e.startMonth; i < 12 + e.startMonth; i++) {
            let s = i;
            let r = o;
            if (e.startMonth > 0 && i > 11) {
                s = i - 12;
                r++;
            }
            if (z(e.views.days.monthsToShow, s)) {
                const o = DateTime.getTotalDaysInMonth(r, s);
                for (let i = 0; i < o; i++) {
                    const o = DateTime.toStorageDate(new Date(r, s, i + 1));
                    if (n.hasOwnProperty(o)) {
                        const i = DateTime.getStorageDate(o);
                        const s = new Date(parseInt(i[2]), parseInt(i[1]), parseInt(i[0]));
                        const r = DateTime.getWeekdayNumber(s) + 1;
                        if (!fe(e, s).matched && X(e.views.days.daysToShow, r)) {
                            t.values[r] += n[o];
                            t.largestValue = Math.max(t.largestValue, t.values[r]);
                        }
                    }
                }
            }
        }
        return t;
    }
    function N(e) {
        e._currentView.monthsContents = DomElement.create(e._currentView.element, "div", "months-contents");
        me(e._currentView.monthsContents, e);
    }
    function O(t, n) {
        const o = DomElement.create(t._currentView.monthsContents, "div", "months");
        const i = DomElement.create(t._currentView.monthsContents, "div", "month-names");
        let s = DomElement.create(o, "div", "y-labels");
        const r = DomElement.create(o, "div", "month-lines");
        const a = A(t);
        if (n) {
            DomElement.addClass(o, "view-switch");
        }
        if (a.largestValue > 0 && t.views.months.showChartYLabels) {
            const e = DomElement.createWithHTML(s, "div", "label-0", a.largestValue.toString());
            DomElement.createWithHTML(s, "div", "label-25", (Math.floor(a.largestValue / 4) * 3).toString());
            DomElement.createWithHTML(s, "div", "label-50", Math.floor(a.largestValue / 2).toString());
            DomElement.createWithHTML(s, "div", "label-75", Math.floor(a.largestValue / 4).toString());
            DomElement.createWithHTML(s, "div", "label-100", "0");
            s.style.width = `${e.offsetWidth}px`;
            i.style.paddingLeft = `${s.offsetWidth + DomElement.getStyleValueByName(s, "margin-right", true)}px`;
        } else {
            s.parentNode.removeChild(s);
            s = null;
        }
        if (a.largestValue === 0) {
            t._currentView.monthsContents.style.minHeight = `${t._currentView.mapContents.offsetHeight}px`;
            o.parentNode.removeChild(o);
            i.parentNode.removeChild(i);
            const s = DomElement.createWithHTML(t._currentView.monthsContents, "div", "no-months-message", e.text.noMonthsDataMessage);
            if (n) {
                DomElement.addClass(s, "view-switch");
            }
        } else {
            const n = t._currentView.mapContents.offsetHeight / a.largestValue;
            const o = 1 / 12;
            let s = o;
            for (let l = t.startMonth; l < 12 + t.startMonth; l++) {
                let c = l;
                if (t.startMonth > 0 && l > 11) {
                    c = l - 12;
                }
                const u = c + 1;
                if (a.values.hasOwnProperty(u) && z(t.views.months.monthsToShow, c)) {
                    L(r, u, a.values[u], t, n, s);
                    if (t.views.months.showMonthNames) {
                        DomElement.createWithHTML(i, "div", "month-name", e.text.monthNames[c]);
                    }
                }
                s += o;
            }
            if (t.views.months.showInReverseOrder) {
                DomElement.reverseChildrenOrder(r);
                DomElement.reverseChildrenOrder(i);
            }
            if (t.views.months.keepScrollPositions) {
                t._currentView.monthsContents.scrollLeft = t._currentView.monthsContentsScrollLeft;
            }
        }
    }
    function L(e, t, n, o, i, s) {
        const r = DomElement.create(e, "div", "month-line");
        const a = n * i;
        const l = new Date;
        r.style.height = `${a}px`;
        r.setAttribute(Constant.HEAT_JS_MONTH_NUMBER_ATTRIBUTE_NAME, t.toString());
        if (a <= 0) {
            r.style.visibility = "hidden";
        }
        if (o.views.months.showToolTips) {
            ToolTip.add(r, o, Str.friendlyNumber(n));
        }
        let c = o._currentView.year;
        if (o.startMonth > 0 && t - 1 < o.startMonth) {
            c++;
        }
        if (Is.definedFunction(o.events.onMonthClick)) {
            r.onclick = () => Trigger.customEvent(o.events.onMonthClick, t, n, c);
        } else if (Is.definedFunction(o.events.onMonthDblClick)) {
            r.ondblclick = () => Trigger.customEvent(o.events.onMonthDblClick, t, n, c);
        } else {
            DomElement.addClass(r, "no-hover");
        }
        if (o.views.months.showMonthNumbers && n > 0) {
            DomElement.addClass(r, "month-line-number");
            DomElement.createWithHTML(r, "div", "count", Str.friendlyNumber(n));
        }
        if (o.views.months.highlightCurrentMonth && l.getMonth() === t - 1 && o._currentView.year === l.getFullYear()) {
            DomElement.addClass(r, "today");
        }
        if (o.views.months.useGradients) {
            DomElement.adGradientEffect(o._currentView.element, r);
        } else if (o.views.months.useDifferentBackgroundOpacities) {
            const e = DomElement.getStyleValueByName(r, "background-color");
            if (e.startsWith("rgba") || e.startsWith("rgb")) {
                let t = e.replace("rgba(", "").replace("rgb(", "").replace(")", "").split(",");
                if (e.startsWith("rgba")) {
                    t[t.length - 1] = s.toString();
                } else {
                    t.push(s.toString());
                }
                r.style.backgroundColor = `rgba(${t.join()})`;
            }
        }
    }
    function A(e) {
        const t = {
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
            largestValue: 0
        };
        const n = J(e);
        const o = e._currentView.year;
        for (let i = e.startMonth; i < 12 + e.startMonth; i++) {
            let s = i;
            let r = o;
            if (e.startMonth > 0 && i > 11) {
                s = i - 12;
                r++;
            }
            if (z(e.views.months.monthsToShow, s)) {
                const o = s + 1;
                const i = DateTime.getTotalDaysInMonth(r, s);
                for (let a = 0; a < i; a++) {
                    const i = DateTime.toStorageDate(new Date(r, s, a + 1));
                    if (n.hasOwnProperty(i)) {
                        const s = DateTime.getStorageDate(i);
                        const r = new Date(parseInt(s[2]), parseInt(s[1]), parseInt(s[0]));
                        const a = DateTime.getWeekdayNumber(r) + 1;
                        if (!fe(e, r).matched && X(e.views.days.daysToShow, a)) {
                            t.values[o] += n[i];
                            t.largestValue = Math.max(t.largestValue, t.values[o]);
                        }
                    }
                }
            }
        }
        return t;
    }
    function H(e) {
        e._currentView.statisticsContents = DomElement.create(e._currentView.element, "div", "statistics-contents");
        me(e._currentView.statisticsContents, e);
    }
    function F(t, n) {
        const o = DomElement.create(t._currentView.statisticsContents, "div", "statistics");
        const i = DomElement.create(t._currentView.statisticsContents, "div", "statistics-ranges");
        let s = DomElement.create(o, "div", "y-labels");
        const r = DomElement.create(o, "div", "range-lines");
        const a = de(t);
        const l = R(t, a);
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
            const e = t._currentView.mapContents.offsetHeight / l.largestValue;
            if (!t.views.statistics.showColorRangeLabels) {
                i.parentNode.removeChild(i);
            }
            for (const n in l.types) {
                if (l.types.hasOwnProperty(n)) {
                    W(parseInt(n), r, l.types[n], t, a, e);
                    const o = ue(a, parseInt(n));
                    if (t.views.statistics.showColorRangeLabels) {
                        if (!t.views.statistics.useColorRangeNamesForLabels || !Is.defined(o) || !Is.definedString(o.name)) {
                            DomElement.createWithHTML(i, "div", "range-name", `${n}${"+"}`);
                        } else {
                            DomElement.createWithHTML(i, "div", "range-name", o.name);
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
    }
    function W(e, t, n, o, i, s) {
        const r = DomElement.create(t, "div", "range-line");
        const a = ue(i, e);
        const l = n * s;
        r.style.height = `${l}px`;
        if (Is.defined(a) && Is.definedString(a.name)) {
            r.setAttribute(Constant.HEAT_JS_STATISTICS_COLOR_RANGE_NAME_ATTRIBUTE_NAME, a.name);
        }
        if (l <= 0) {
            r.style.visibility = "hidden";
        }
        if (o.views.statistics.showToolTips) {
            ToolTip.add(r, o, Str.friendlyNumber(n));
        }
        if (o.views.statistics.showRangeNumbers && n > 0) {
            DomElement.addClass(r, "range-line-number");
            DomElement.createWithHTML(r, "div", "count", Str.friendlyNumber(n));
        }
        if (Is.definedFunction(o.events.onStatisticClick)) {
            r.onclick = () => Trigger.customEvent(o.events.onStatisticClick, a, n, o._currentView.year);
        } else if (Is.definedFunction(o.events.onStatisticDblClick)) {
            r.ondblclick = () => Trigger.customEvent(o.events.onStatisticDblClick, a, n, o._currentView.year);
        } else {
            DomElement.addClass(r, "no-hover");
        }
        if (Is.defined(a) && re(o, a.id)) {
            if (Is.definedString(a.statisticsCssClassName)) {
                DomElement.addClass(r, a.statisticsCssClassName);
            } else {
                DomElement.addClass(r, a.cssClassName);
            }
        }
        if (o.views.statistics.useGradients) {
            DomElement.adGradientEffect(o._currentView.element, r);
        }
    }
    function R(e, t) {
        const n = J(e);
        const o = e._currentView.year;
        const i = {
            types: {},
            largestValue: 0
        };
        i.types["0"] = 0;
        for (let s = e.startMonth; s < 12 + e.startMonth; s++) {
            let r = s;
            let a = o;
            if (e.startMonth > 0 && s > 11) {
                r = s - 12;
                a++;
            }
            if (z(e.views.statistics.monthsToShow, r)) {
                const o = DateTime.getTotalDaysInMonth(a, r);
                for (let s = 0; s < o; s++) {
                    const o = DateTime.toStorageDate(new Date(a, r, s + 1));
                    if (n.hasOwnProperty(o)) {
                        const s = DateTime.getStorageDate(o);
                        const r = new Date(parseInt(s[2]), parseInt(s[1]), parseInt(s[0]));
                        const a = DateTime.getWeekdayNumber(r) + 1;
                        if (!fe(e, r).matched && X(e.views.statistics.daysToShow, a)) {
                            const s = ce(e, t, n[o]);
                            if (!Is.defined(s)) {
                                i.types["0"]++;
                            } else {
                                if (!i.types.hasOwnProperty(s.minimum.toString())) {
                                    i.types[s.minimum.toString()] = 0;
                                }
                                i.types[s.minimum]++;
                                i.largestValue = Math.max(i.largestValue, i.types[s.minimum]);
                            }
                        }
                    }
                }
            }
        }
        return i;
    }
    function $(t) {
        const o = DomElement.create(t._currentView.element, "div", "guide");
        const i = DomElement.create(o, "div", "map-types");
        let s = 0;
        for (const o in n[t._currentView.element.id].typeData[e.text.unknownTrendText]) {
            if (n[t._currentView.element.id].typeData[e.text.unknownTrendText].hasOwnProperty(o)) {
                s++;
                break;
            }
        }
        if (n[t._currentView.element.id].totalTypes > 1) {
            if (Is.definedString(t.description.text)) {
                const e = DomElement.create(t._currentView.element, "div", "description", o);
                j(t, e);
            }
            for (const o in n[t._currentView.element.id].typeData) {
                if (o !== e.text.unknownTrendText || s > 0) {
                    if (s === 0 && t._currentView.type === e.text.unknownTrendText) {
                        t._currentView.type = o;
                    }
                    Y(t, i, o);
                }
            }
        } else {
            j(t, i);
        }
        if (t.guide.enabled) {
            const n = DomElement.create(o, "div", "map-toggles");
            if (t.guide.showLessAndMoreLabels) {
                let o = DomElement.createWithHTML(n, "div", "less-text", e.text.lessText);
                if (t.guide.colorRangeTogglesEnabled) {
                    o.onclick = () => ae(t, false);
                } else {
                    DomElement.addClass(o, "no-click");
                }
            }
            const i = DomElement.create(n, "div", "days");
            const s = de(t);
            const r = s.length;
            for (let e = 0; e < r; e++) {
                P(t, i, s[e]);
            }
            if (t.guide.showLessAndMoreLabels) {
                const o = DomElement.createWithHTML(n, "div", "more-text", e.text.moreText);
                if (t.guide.colorRangeTogglesEnabled) {
                    o.onclick = () => ae(t, true);
                } else {
                    DomElement.addClass(o, "no-click");
                }
            }
        }
    }
    function Y(e, t, n) {
        const o = DomElement.createWithHTML(t, "button", "type", n);
        if (e._currentView.type === n) {
            DomElement.addClass(o, "active");
        }
        o.onclick = () => {
            if (e._currentView.type !== n) {
                e._currentView.type = n;
                Trigger.customEvent(e.events.onTypeSwitch, n);
                l(e);
            }
        };
    }
    function P(e, t, n) {
        const o = DomElement.create(t, "div");
        o.className = "day";
        if (e.guide.showToolTips) {
            ToolTip.add(o, e, n.tooltipText);
        }
        if (re(e, n.id)) {
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
            o.onclick = () => le(e, n.id);
        } else {
            DomElement.addClass(o, "no-hover");
        }
    }
    function j(e, t) {
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
    function U(t, n, o, i) {
        if (Is.definedFunction(t.events.onDayToolTipRender)) {
            ToolTip.add(n, t, Trigger.customEvent(t.events.onDayToolTipRender, o, i));
        } else {
            let i = DateTime.getCustomFormattedDateText(e, t.tooltip.dayText, o);
            if (t.showHolidaysInDayToolTips) {
                let e = fe(t, o);
                if (e.matched && Is.definedString(e.name)) {
                    i += `${":"}${" "}${e.name}`;
                }
            }
            ToolTip.add(n, t, i);
        }
    }
    function G(t, o, i = true) {
        n[t] = {
            options: o,
            typeData: {},
            totalTypes: 1
        };
        n[t].typeData[e.text.unknownTrendText] = {};
        if (i && !o._currentView.isInFetchMode) {
            ee(o);
        }
    }
    function J(e) {
        return n[e._currentView.element.id].typeData[e._currentView.type];
    }
    function z(e, t) {
        return e.indexOf(t + 1) > -1;
    }
    function X(e, t) {
        return e.indexOf(t) > -1;
    }
    function q(e) {
        let t = [];
        if (e.showOnlyDataForYearsAvailable) {
            let n = J(e);
            for (const e in n) {
                if (n.hasOwnProperty(e)) {
                    let n = parseInt(DateTime.getStorageDateYear(e));
                    if (t.indexOf(n) === -1) {
                        t.push(n);
                    }
                }
            }
        }
        t = t.sort(function(e, t) {
            return e - t;
        });
        return t;
    }
    function K(e, t) {
        return e.yearsToHide.indexOf(t) === -1 && (e._currentView.yearsAvailable.length === 0 || e._currentView.yearsAvailable.indexOf(t) > -1);
    }
    function Q(e, t) {
        return e._currentView.yearsAvailable.length > 0 && t <= e._currentView.yearsAvailable[0];
    }
    function Z(e, t) {
        return e._currentView.yearsAvailable.length > 0 && t >= e._currentView.yearsAvailable[e._currentView.yearsAvailable.length - 1];
    }
    function ee(t) {
        if (t.useLocalStorageForData && window.localStorage) {
            const o = window.localStorage.length;
            const s = t._currentView.element.id;
            for (let t = 0; t < o; t++) {
                const o = window.localStorage.key(t);
                if (Str.startsWithAnyCase(o, i)) {
                    const t = window.localStorage.getItem(o);
                    const i = Default2.getObjectFromString(t, e);
                    if (i.parsed) {
                        n[s].typeData = i.object;
                        n[s].totalTypes = 0;
                        for (const e in n[s].typeData) {
                            if (n[s].typeData.hasOwnProperty(e)) {
                                n[s].totalTypes++;
                            }
                        }
                    }
                }
            }
        }
    }
    function te(e) {
        if (e.useLocalStorageForData && window.localStorage) {
            const t = e._currentView.element.id;
            ne(e);
            const o = JSON.stringify(n[t].typeData);
            window.localStorage.setItem(i + t, o);
        }
    }
    function ne(e) {
        if (e.useLocalStorageForData && window.localStorage) {
            const t = window.localStorage.length;
            const n = [];
            const o = e._currentView.element.id;
            for (let e = 0; e < t; e++) {
                if (Str.startsWithAnyCase(window.localStorage.key(e), i + o)) {
                    n.push(window.localStorage.key(e));
                }
            }
            const s = n.length;
            for (let e = 0; e < s; e++) {
                window.localStorage.removeItem(n[e]);
            }
        }
    }
    function oe(e) {
        if (e._currentView.isInFetchMode) {
            if (e._currentView.isInFetchModeTimer === 0) {
                ie(e);
            }
            if (e._currentView.isInFetchModeTimer === 0) {
                e._currentView.isInFetchModeTimer = setInterval(() => {
                    ie(e);
                    l(e);
                }, e.dataFetchDelay);
            }
        }
    }
    function ie(t) {
        const o = t._currentView.element.id;
        const i = Trigger.customEvent(t.events.onDataFetch, o);
        if (Is.definedObject(i)) {
            G(o, t, false);
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
    function se() {
        for (const e in n) {
            if (n.hasOwnProperty(e)) {
                const t = n[e].options;
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
    function re(e, t) {
        let n = false;
        if (t === o) {
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
    function ae(e, t) {
        const n = e.colorRanges.length;
        for (let o = 0; o < n; o++) {
            e.colorRanges[o].visible = t;
            Trigger.customEvent(e.events.onColorRangeTypeToggle, e.colorRanges[o].id, t);
        }
        l(e);
    }
    function le(e, t) {
        const n = e.colorRanges.length;
        for (let o = 0; o < n; o++) {
            const n = e.colorRanges[o];
            if (n.id === t) {
                n.visible = !Default2.getBoolean(n.visible, true);
                Trigger.customEvent(e.events.onColorRangeTypeToggle, n.id, n.visible);
                l(e);
                break;
            }
        }
    }
    function ce(e, t, n, i = null) {
        let s = null;
        if (Is.defined(i) && fe(e, i).matched) {
            s = {
                cssClassName: "holiday",
                id: o,
                visible: true,
                minimum: 0
            };
        }
        if (!Is.defined(s)) {
            const e = t.length;
            for (let o = 0; o < e; o++) {
                const e = t[o];
                if (n >= e.minimum) {
                    s = e;
                } else {
                    break;
                }
            }
        }
        return s;
    }
    function ue(e, t) {
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
    function de(e) {
        return e.colorRanges.sort(function(e, t) {
            return e.minimum - t.minimum;
        });
    }
    function fe(e, t) {
        const n = {
            matched: false,
            name: null
        };
        const o = e.holidays.length;
        const i = t.getDate();
        const s = t.getMonth() + 1;
        const r = t.getFullYear();
        for (let t = 0; t < o; t++) {
            let o = e.holidays[t];
            if (Is.definedString(o.date) && o.showInViews) {
                const e = o.date.split("/");
                if (e.length === 2) {
                    n.matched = i === parseInt(e[0]) && s === parseInt(e[1]);
                } else if (e.length === 3) {
                    n.matched = i === parseInt(e[0]) && s === parseInt(e[1]) && r === parseInt(e[2]);
                }
                if (n.matched) {
                    n.name = o.name;
                    break;
                }
            }
        }
        return n;
    }
    function me(e, t) {
        if (t.allowFileImports && !t._currentView.isInFetchMode) {
            e.ondragover = DomElement.cancelBubble;
            e.ondragenter = DomElement.cancelBubble;
            e.ondragleave = DomElement.cancelBubble;
            e.ondrop = e => {
                DomElement.cancelBubble(e);
                if (Is.defined(window.FileReader) && e.dataTransfer.files.length > 0) {
                    he(e.dataTransfer.files, t);
                }
            };
        }
    }
    function we(e) {
        const t = DomElement.createWithNoContainer("input");
        t.type = "file";
        t.accept = ".json, .txt, .csv, .tsv, .md, .yaml";
        t.multiple = true;
        t.onchange = () => he(t.files, e);
        t.click();
    }
    function he(e, t) {
        const n = e.length;
        const o = [];
        const i = J(t);
        const s = (e, s) => {
            o.push(e);
            for (const e in s) {
                if (s.hasOwnProperty(e)) {
                    if (!i.hasOwnProperty(e)) {
                        i[e] = 0;
                    }
                    i[e] += s[e];
                }
            }
            if (o.length === n) {
                Trigger.customEvent(t.events.onImport, t._currentView.element);
                l(t);
            }
        };
        for (let t = 0; t < n; t++) {
            const n = e[t];
            const o = n.name.split(".").pop().toLowerCase();
            if (o === "json") {
                ge(n, s);
            } else if (o === "txt") {
                ye(n, s);
            } else if (o === "csv") {
                De(n, s);
            } else if (o === "tsv") {
                pe(n, s);
            } else if (o === "md") {
                Te(n, s);
            } else if (o === "yaml") {
                ve(n, s);
            }
        }
    }
    function ge(t, n) {
        const o = new FileReader;
        let i = {};
        o.onloadend = () => n(t.name, i);
        o.onload = t => {
            const n = Default2.getObjectFromString(t.target.result, e);
            if (n.parsed && Is.definedObject(n.object)) {
                i = n.object;
            }
        };
        o.readAsText(t);
    }
    function ye(e, t) {
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
    function De(e, t) {
        const n = new FileReader;
        const o = {};
        n.onloadend = () => t(e.name, o);
        n.onload = e => {
            const t = e.target.result.toString().replace(new RegExp('"', "g"), "");
            const n = t.split("\n");
            n.shift();
            let i = n.length;
            for (let e = 0; e < i; e++) {
                let t = n[e].split(",");
                o[t[0].trim()] = parseInt(t[1].trim());
            }
        };
        n.readAsText(e);
    }
    function pe(e, t) {
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
    function Te(e, t) {
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
    function ve(e, t) {
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
    function xe(e, t = null, n = null) {
        let o = null;
        const i = ke(e);
        const s = Default2.getString(t, e.exportType).toLowerCase();
        if (s === "csv") {
            o = be(e);
        } else if (s === "json") {
            o = Se(e);
        } else if (s === "xml") {
            o = _e(e);
        } else if (s === "txt") {
            o = Ve(e);
        } else if (s === "html") {
            o = Ee(e);
        } else if (s === "md") {
            o = Ce(e);
        } else if (s === "tsv") {
            o = Me(e);
        } else if (s === "yaml") {
            o = Ie(e);
        }
        if (Is.definedString(o)) {
            const t = DomElement.create(document.body, "a");
            t.style.display = "none";
            t.setAttribute("target", "_blank");
            t.setAttribute("href", `data:${i};charset=utf-8,${encodeURIComponent(o)}`);
            t.setAttribute("download", Ne(e, n, s));
            t.click();
            document.body.removeChild(t);
            Trigger.customEvent(e.events.onExport, e._currentView.element);
        }
    }
    function be(t) {
        const n = Be(t);
        const o = [];
        for (const e in n) {
            if (n.hasOwnProperty(e)) {
                o.push(Le([ Oe(e), Oe(n[e].toString()) ]));
            }
        }
        if (o.length > 0) {
            o.unshift(Le([ Oe(e.text.dateText), Oe(e.text.countText) ]));
        }
        return o.join("\n");
    }
    function Se(e) {
        return JSON.stringify(Be(e));
    }
    function _e(e) {
        const t = Be(e);
        const n = [];
        n.push('<?xml version="1.0" ?>');
        n.push("<Dates>");
        for (const e in t) {
            if (t.hasOwnProperty(e)) {
                n.push("<Date>");
                n.push(`<FullDate>${e}</FullDate>`);
                n.push(`<Count>${t[e].toString()}</Count>`);
                n.push("</Date>");
            }
        }
        n.push("</Dates>");
        return n.join("\n");
    }
    function Ve(e) {
        const t = Be(e);
        const n = [];
        for (const e in t) {
            if (t.hasOwnProperty(e)) {
                n.push(`${e}${":"}${" "}${t[e].toString()}`);
            }
        }
        return n.join("\n");
    }
    function Ee(t) {
        const n = Be(t);
        const o = [];
        const i = DateTime.getCustomFormattedDateText(e, "{dddd}, {d}{0} {mmmm} {yyyy}", new Date);
        o.push("<!DOCTYPE html>");
        o.push("<html>");
        o.push("<head>");
        o.push('<meta charset="utf-8" />');
        o.push(`<meta http-equiv="Last-Modified" content="${i} GMT" />`);
        o.push("</head>");
        o.push("<body>");
        o.push("<ul>");
        for (const e in n) {
            if (n.hasOwnProperty(e)) {
                o.push(`<li><b>${e}:</b> ${n[e].toString()}</li>`);
            }
        }
        o.push("</ul>");
        o.push("</body>");
        o.push("</html>");
        return o.join("\n");
    }
    function Ce(e) {
        const t = Be(e);
        const n = [];
        n.push("| Full Date | Count |");
        n.push("| --- | --- |");
        for (const e in t) {
            if (t.hasOwnProperty(e)) {
                n.push(`| ${e} | ${t[e].toString()} |`);
            }
        }
        return n.join("\n");
    }
    function Me(e) {
        const t = Be(e);
        const n = [];
        n.push(`Full Date${"\t"}Count`);
        for (const e in t) {
            if (t.hasOwnProperty(e)) {
                n.push(`${e}${"\t"}${t[e].toString()}`);
            }
        }
        return n.join("\n");
    }
    function Ie(t) {
        const n = Be(t);
        const o = [];
        const i = DateTime.getCustomFormattedDateText(e, "{dddd}, {d}{o} {mmmm} {yyyy}", new Date);
        o.push(`Last-Modified:${" "}${i}`);
        for (const e in n) {
            if (n.hasOwnProperty(e)) {
                o.push(`${e}${":"}${" "}${n[e].toString()}`);
            }
        }
        return o.join("\n");
    }
    function Be(e) {
        const t = {};
        const n = J(e);
        if (e.exportOnlyDataBeingViewed) {
            const o = e._currentView.year;
            const i = We(e);
            const s = Fe(e);
            for (let r = e.startMonth; r < 12 + e.startMonth; r++) {
                let a = r;
                let l = o;
                if (e.startMonth > 0 && r > 11) {
                    a = r - 12;
                    l++;
                }
                if (z(s, a)) {
                    const e = DateTime.getTotalDaysInMonth(l, a);
                    for (let o = 0; o < e; o++) {
                        const e = new Date(l, a, o + 1);
                        const s = DateTime.toStorageDate(e);
                        const r = DateTime.getWeekdayNumber(e) + 1;
                        if (X(i, r)) {
                            if (n.hasOwnProperty(s)) {
                                t[s] = n[s];
                            }
                        }
                    }
                }
            }
        } else {
            const e = [];
            for (const t in n) {
                if (n.hasOwnProperty(t)) {
                    e.push(t);
                }
            }
            e.sort();
            const o = e.length;
            for (let i = 0; i < o; i++) {
                const o = e[i];
                if (n.hasOwnProperty(o)) {
                    t[o] = n[o];
                }
            }
        }
        return t;
    }
    function ke(e) {
        let t = null;
        if (e.exportType.toLowerCase() === "csv") {
            t = "text/csv";
        } else if (e.exportType.toLowerCase() === "json") {
            t = "application/json";
        } else if (e.exportType.toLowerCase() === "xml") {
            t = "application/xml";
        } else if (e.exportType.toLowerCase() === "txt") {
            t = "text/plain";
        } else if (e.exportType.toLowerCase() === "html") {
            t = "text/html";
        } else if (e.exportType.toLowerCase() === "md") {
            t = "text/x-markdown";
        } else if (e.exportType.toLowerCase() === "tsv") {
            t = "text/tab-separated-values";
        } else if (e.exportType.toLowerCase() === "yaml") {
            t = "application/yaml";
        }
        return t;
    }
    function Ne(t, n, o) {
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
    function Oe(e) {
        let t = e.toString().replace(/(\r\n|\n|\r)/gm, "").replace(/(\s\s)/gm, " ");
        t = t.replace(/"/g, '""');
        t = `"${t}"`;
        return t;
    }
    function Le(e) {
        return e.join(",");
    }
    function Ae(e, t = true) {
        let n = true;
        let o = e._currentView.year;
        o--;
        while (!K(e, o)) {
            if (Q(e, o)) {
                n = false;
                break;
            }
            o--;
        }
        if (n) {
            e._currentView.year = o;
            l(e);
            if (t) {
                Trigger.customEvent(e.events.onBackYear, e._currentView.year);
            }
        }
    }
    function He(e, t = true) {
        let n = true;
        let o = e._currentView.year;
        o++;
        while (!K(e, o)) {
            if (Z(e, o)) {
                n = false;
                break;
            }
            o++;
        }
        if (n) {
            e._currentView.year = o;
            l(e);
            if (t) {
                Trigger.customEvent(e.events.onNextYear, e._currentView.year);
            }
        }
    }
    function Fe(e) {
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
    function We(e) {
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
    function Re(e) {
        e._currentView.element.innerHTML = "";
        DomElement.removeClass(e._currentView.element, "heat-js");
        ToolTip.assignToEvents(e, false);
        document.body.removeChild(e._currentView.tooltip);
        if (e._currentView.isInFetchMode && Is.defined(e._currentView.isInFetchModeTimer)) {
            clearInterval(e._currentView.isInFetchModeTimer);
        }
        Trigger.customEvent(e.events.onDestroy, e._currentView.element);
    }
    function $e() {
        if (e.observationMode) {
            if (!Is.defined(t)) {
                t = new MutationObserver((e, t) => {
                    Ye.renderAll();
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
    const Ye = {
        addDates: function(t, o, i = null, s = true) {
            if (Is.definedString(t) && Is.definedArray(o) && n.hasOwnProperty(t)) {
                const r = n[t].options;
                if (!r._currentView.isInFetchMode) {
                    i = Default2.getString(i, e.text.unknownTrendText);
                    const n = o.length;
                    for (let e = 0; e < n; e++) {
                        Ye.addDate(t, o[e], i, false);
                    }
                    if (s) {
                        l(r, true);
                    }
                }
            }
            return Ye;
        },
        addDate: function(t, o, i = null, s = true) {
            if (Is.definedString(t) && Is.definedDate(o) && n.hasOwnProperty(t)) {
                const r = n[t].options;
                if (!r._currentView.isInFetchMode) {
                    i = Default2.getString(i, e.text.unknownTrendText);
                    const a = DateTime.toStorageDate(o);
                    if (!n[t].typeData.hasOwnProperty(i)) {
                        n[t].typeData[i] = {};
                        n[t].totalTypes++;
                    }
                    if (!n[t].typeData[i].hasOwnProperty(a)) {
                        n[t].typeData[i][a] = 0;
                    }
                    n[t].typeData[i][a]++;
                    Trigger.customEvent(r.events.onAdd, r._currentView.element);
                    if (s) {
                        l(r, true);
                    }
                }
            }
            return Ye;
        },
        updateDate: function(t, o, i, s = null, r = true) {
            if (Is.definedString(t) && Is.definedDate(o) && n.hasOwnProperty(t)) {
                const a = n[t].options;
                if (!a._currentView.isInFetchMode && i > 0) {
                    const c = DateTime.toStorageDate(o);
                    if (n[t].typeData.hasOwnProperty(s)) {
                        s = Default2.getString(s, e.text.unknownTrendText);
                        n[t].typeData[s][c] = i;
                        Trigger.customEvent(a.events.onUpdate, a._currentView.element);
                        if (r) {
                            l(a, true);
                        }
                    }
                }
            }
            return Ye;
        },
        removeDates: function(t, o, i = null, s = true) {
            if (Is.definedString(t) && Is.definedArray(o) && n.hasOwnProperty(t)) {
                const r = n[t].options;
                if (!r._currentView.isInFetchMode) {
                    i = Default2.getString(i, e.text.unknownTrendText);
                    const n = o.length;
                    for (let e = 0; e < n; e++) {
                        Ye.removeDate(t, o[e], i, false);
                    }
                    if (s) {
                        l(r, true);
                    }
                }
            }
            return Ye;
        },
        removeDate: function(t, o, i = null, s = true) {
            if (Is.definedString(t) && Is.definedDate(o) && n.hasOwnProperty(t)) {
                const r = n[t].options;
                if (!r._currentView.isInFetchMode) {
                    const a = DateTime.toStorageDate(o);
                    if (n[t].typeData.hasOwnProperty(i) && n[t].typeData[i].hasOwnProperty(a)) {
                        i = Default2.getString(i, e.text.unknownTrendText);
                        if (n[t].typeData[i][a] > 0) {
                            n[t].typeData[i][a]--;
                        }
                        Trigger.customEvent(r.events.onRemove, r._currentView.element);
                        if (s) {
                            l(r, true);
                        }
                    }
                }
            }
            return Ye;
        },
        clearDate: function(t, o, i = null, s = true) {
            if (Is.definedString(t) && Is.definedDate(o) && n.hasOwnProperty(t)) {
                const r = n[t].options;
                if (!r._currentView.isInFetchMode) {
                    const a = DateTime.toStorageDate(o);
                    if (n[t].typeData.hasOwnProperty(i) && n[t].typeData[i].hasOwnProperty(a)) {
                        i = Default2.getString(i, e.text.unknownTrendText);
                        delete n[t].typeData[i][a];
                        Trigger.customEvent(r.events.onClear, r._currentView.element);
                        if (s) {
                            l(r, true);
                        }
                    }
                }
            }
            return Ye;
        },
        resetAll: function(e = true) {
            for (const t in n) {
                if (n.hasOwnProperty(t)) {
                    Ye.reset(t, e);
                }
            }
            return Ye;
        },
        reset: function(t, o = true) {
            if (Is.definedString(t) && n.hasOwnProperty(t)) {
                const i = n[t].options;
                if (!i._currentView.isInFetchMode) {
                    i._currentView.type = e.text.unknownTrendText;
                    G(t, i, false);
                    Trigger.customEvent(i.events.onReset, i._currentView.element);
                    if (o) {
                        l(i, true);
                    }
                }
            }
            return Ye;
        },
        import: function(e, t = null) {
            if (Is.definedString(e) && n.hasOwnProperty(e)) {
                if (Is.definedArray(t)) {
                    he(t, n[e].options);
                } else {
                    we(n[e].options);
                }
            }
            return Ye;
        },
        export: function(e, t = null) {
            if (Is.definedString(e) && n.hasOwnProperty(e)) {
                xe(n[e].options, t);
            }
            return Ye;
        },
        refresh: function(e) {
            if (Is.definedString(e) && n.hasOwnProperty(e)) {
                const t = n[e].options;
                l(t, true);
                Trigger.customEvent(t.events.onRefresh, t._currentView.element);
            }
            return Ye;
        },
        refreshAll: function() {
            for (const e in n) {
                if (n.hasOwnProperty(e)) {
                    const t = n[e].options;
                    l(t, true);
                    Trigger.customEvent(t.events.onRefresh, t._currentView.element);
                }
            }
            return Ye;
        },
        setYear: function(e, t) {
            if (Is.definedString(e) && Is.definedNumber(t) && n.hasOwnProperty(e)) {
                const o = n[e].options;
                o._currentView.year = t;
                if (!K(o, o._currentView.year)) {
                    He(o, false);
                } else {
                    l(o);
                }
                Trigger.customEvent(o.events.onSetYear, o._currentView.year);
            }
            return Ye;
        },
        setYearToHighest: function(e) {
            if (Is.definedString(e) && n.hasOwnProperty(e)) {
                const t = n[e].options;
                const o = J(t);
                let i = 0;
                for (const e in o) {
                    if (o.hasOwnProperty(e)) {
                        i = Math.max(i, parseInt(DateTime.getStorageDateYear(e)));
                    }
                }
                if (i > 0) {
                    t._currentView.year = i;
                    if (!K(t, t._currentView.year)) {
                        He(t, false);
                    } else {
                        l(t);
                    }
                    Trigger.customEvent(t.events.onSetYear, t._currentView.year);
                }
            }
            return Ye;
        },
        setYearToLowest: function(e) {
            if (Is.definedString(e) && n.hasOwnProperty(e)) {
                const t = n[e].options;
                const o = J(t);
                let i = 9999;
                for (const e in o) {
                    if (o.hasOwnProperty(e)) {
                        i = Math.min(i, parseInt(DateTime.getStorageDateYear(e)));
                    }
                }
                if (i < 9999) {
                    t._currentView.year = i;
                    if (!K(t, t._currentView.year)) {
                        Ae(t, false);
                    } else {
                        l(t);
                    }
                    Trigger.customEvent(t.events.onSetYear, t._currentView.year);
                }
            }
            return Ye;
        },
        moveToPreviousYear: function(e) {
            if (Is.definedString(e) && n.hasOwnProperty(e)) {
                Ae(n[e].options);
            }
            return Ye;
        },
        moveToNextYear: function(e) {
            if (Is.definedString(e) && n.hasOwnProperty(e)) {
                He(n[e].options);
            }
            return Ye;
        },
        moveToCurrentYear: function(e) {
            if (Is.definedString(e) && n.hasOwnProperty(e)) {
                const t = n[e].options;
                t._currentView.year = (new Date).getFullYear();
                if (!K(t, t._currentView.year)) {
                    He(t, false);
                } else {
                    l(t);
                }
                Trigger.customEvent(t.events.onSetYear, t._currentView.year);
            }
            return Ye;
        },
        getYear: function(e) {
            let t = -1;
            if (Is.definedString(e) && n.hasOwnProperty(e)) {
                const o = n[e].options;
                t = o._currentView.year;
            }
            return t;
        },
        render: function(t, n) {
            if (Is.definedObject(t) && Is.definedObject(n)) {
                a(Binding.Options.getForNewInstance(e, n, t));
            }
            return Ye;
        },
        renderAll: function() {
            s();
            return Ye;
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
                    o._currentView.view = i;
                    Trigger.customEvent(o.events.onViewSwitch, t);
                    l(o, false, true);
                }
            }
            return Ye;
        },
        switchType: function(e, t) {
            if (Is.definedString(e) && Is.definedString(t) && n.hasOwnProperty(e) && n[e].typeData.hasOwnProperty(t)) {
                const o = n[e].options;
                if (o._currentView.type !== t) {
                    o._currentView.type = t;
                    Trigger.customEvent(o.events.onTypeSwitch, t);
                    l(o);
                }
            }
            return Ye;
        },
        updateOptions: function(e, t) {
            if (Is.definedString(e) && Is.definedObject(t) && n.hasOwnProperty(e)) {
                const o = n[e].options;
                const i = Binding.Options.get(t);
                let s = false;
                for (const e in i) {
                    if (i.hasOwnProperty(e) && o.hasOwnProperty(e) && o[e] !== i[e]) {
                        o[e] = i[e];
                        s = true;
                    }
                }
                if (s) {
                    l(o, true);
                    Trigger.customEvent(o.events.onRefresh, o._currentView.element);
                    Trigger.customEvent(o.events.onOptionsUpdate, o._currentView.element, o);
                }
            }
            return Ye;
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
                    Re(n[e].options);
                }
            }
            n = {};
            return Ye;
        },
        destroy: function(e) {
            if (Is.definedString(e) && n.hasOwnProperty(e)) {
                Re(n[e].options);
                delete n[e];
            }
            return Ye;
        },
        setConfiguration: function(t, n = true) {
            if (Is.definedObject(t)) {
                let o = false;
                const i = e;
                for (const n in t) {
                    if (t.hasOwnProperty(n) && e.hasOwnProperty(n) && i[n] !== t[n]) {
                        i[n] = t[n];
                        o = true;
                    }
                }
                if (o) {
                    e = Config.Options.get(i);
                    $e();
                    if (n) {
                        Ye.refreshAll();
                    }
                }
            }
            return Ye;
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
        e = Config.Options.get();
        document.addEventListener("DOMContentLoaded", () => {
            $e();
            s();
        });
        window.addEventListener("pagehide", () => se());
        if (!Is.defined(window.$heat)) {
            window.$heat = Ye;
        }
    })();
})();//# sourceMappingURL=heat.js.map