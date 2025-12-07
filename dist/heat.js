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
    function i(e) {
        return t(e) && typeof e === "boolean";
    }
    e.definedBoolean = i;
    function o(e) {
        return t(e) && typeof e === "string";
    }
    e.definedString = o;
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
        const i = {
            matched: false,
            name: null
        };
        const o = t.holidays.length;
        const s = n.getDate();
        const r = n.getMonth() + 1;
        const a = n.getFullYear();
        for (let n = 0; n < o; n++) {
            let o = t.holidays[n];
            if (e.definedString(o.date) && o.showInViews) {
                const e = o.date.split("/");
                if (e.length === 2) {
                    i.matched = s === parseInt(e[0]) && r === parseInt(e[1]);
                } else if (e.length === 3) {
                    i.matched = s === parseInt(e[0]) && r === parseInt(e[1]) && a === parseInt(e[2]);
                }
                if (i.matched) {
                    i.name = o.name;
                    break;
                }
            }
        }
        return i;
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
            const i = e.toString().split(" ");
            if (i.length === 0) {
                e = t;
            } else {
                n = i;
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
    function i(e) {
        return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    e.friendlyNumber = i;
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
    function i(e, t) {
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
    e.getDayOrdinal = i;
    function o(e, t, o) {
        let s = t;
        const r = n(o);
        s = s.replace("{dddd}", e.text.dayNames[r]);
        s = s.replace("{dd}", Str.padNumber(o.getDate()));
        s = s.replace("{d}", o.getDate().toString());
        s = s.replace("{o}", i(e, o.getDate()));
        s = s.replace("{mmmm}", e.text.monthNames[o.getMonth()]);
        s = s.replace("{mm}", Str.padNumber(o.getMonth() + 1));
        s = s.replace("{m}", (o.getMonth() + 1).toString());
        s = s.replace("{yyyy}", o.getFullYear().toString());
        s = s.replace("{yyy}", o.getFullYear().toString().substring(1));
        s = s.replace("{yy}", o.getFullYear().toString().substring(2));
        s = s.replace("{y}", parseInt(o.getFullYear().toString().substring(2)).toString());
        return s;
    }
    e.getCustomFormattedDateText = o;
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
        const i = new Date(e);
        i.setDate(e.getDate() + n);
        return i;
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
        let i = n ? document.createTextNode("") : document.createElement(t);
        return i;
    }
    e.createWithNoContainer = t;
    function n(e, t, n = "", i = null) {
        const o = t.toLowerCase();
        const s = o === "text";
        let r = s ? document.createTextNode("") : document.createElement(o);
        if (Is.defined(n)) {
            r.className = n;
        }
        if (Is.defined(i)) {
            e.insertBefore(r, i);
        } else {
            e.appendChild(r);
        }
        return r;
    }
    e.create = n;
    function i(e, t, i, o, s = null) {
        const r = n(e, t, i, s);
        r.innerHTML = o;
        return r;
    }
    e.createWithHTML = i;
    function o(e, t, n = false) {
        const i = getComputedStyle(e);
        let o = i.getPropertyValue(t);
        if (n) {
            o = parseFloat(o);
        }
        return o;
    }
    e.getStyleValueByName = o;
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
        let i = e.pageY;
        const o = l();
        t.style.display = "block";
        if (n + t.offsetWidth > window.innerWidth) {
            n -= t.offsetWidth;
        } else {
            n++;
        }
        if (i + t.offsetHeight > window.innerHeight) {
            i -= t.offsetHeight;
        } else {
            i++;
        }
        if (n < o.left) {
            n = e.pageX + 1;
        }
        if (i < o.top) {
            i = e.pageY + 1;
        }
        t.style.left = `${n}px`;
        t.style.top = `${i}px`;
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
    function d(e, t, o) {
        const s = n(e, "div");
        const r = n(s, "label", "checkbox");
        const a = n(r, "input");
        a.type = "checkbox";
        a.name = o;
        n(r, "span", "check-mark");
        i(r, "span", "text", t);
        return a;
    }
    e.createCheckBox = d;
    function m(t, n) {
        const i = e.getStyleValueByName(t, "background-color");
        const o = e.getStyleValueByName(n, "background-color");
        n.style.background = `linear-gradient(to top, ${i}, ${o})`;
    }
    e.adGradientEffect = m;
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
        let i = t ? document.addEventListener : document.removeEventListener;
        n("mousemove", () => s(e));
        i("scroll", () => s(e));
    }
    e.assignToEvents = n;
    function i(e, t, n) {
        if (e !== null) {
            e.onmousemove = e => o(e, t, n);
        }
    }
    e.add = i;
    function o(e, t, n) {
        DomElement.cancelBubble(e);
        s(t);
        t._currentView.tooltipTimer = setTimeout(() => {
            t._currentView.tooltip.innerHTML = n;
            t._currentView.tooltip.style.display = "block";
            DomElement.showElementAtMousePosition(e, t._currentView.tooltip);
        }, t.tooltip.delay);
    }
    e.show = o;
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
        function i(e, t, n) {
            const i = o(t);
            const s = Default2.getString(i.view, "").toLowerCase();
            i._currentView = {};
            i._currentView.element = n;
            i._currentView.disabledBackground = null;
            i._currentView.configurationDialog = null;
            i._currentView.configurationDialogDayCheckBoxes = [];
            i._currentView.configurationDialogMonthCheckBoxes = [];
            i._currentView.tooltip = null;
            i._currentView.tooltipTimer = 0;
            i._currentView.mapContents = null;
            i._currentView.mapContentsScrollLeft = 0;
            i._currentView.year = i.year;
            i._currentView.type = e.text.unknownTrendText;
            i._currentView.isInFetchMode = Is.definedFunction(i.events.onDataFetch);
            i._currentView.isInFetchModeTimer = 0;
            i._currentView.yearsAvailable = [];
            i._currentView.dayWidth = 0;
            if (i.views.chart.enabled) {
                i._currentView.chartContents = null;
                i._currentView.chartContentsScrollLeft = 0;
            }
            if (i.views.days.enabled) {
                i._currentView.daysContents = null;
                i._currentView.daysContentsScrollLeft = 0;
            }
            if (i.views.statistics.enabled) {
                i._currentView.statisticsContents = null;
                i._currentView.statisticsContentsScrollLeft = 0;
            }
            if (s === "map") {
                i._currentView.view = 1;
            } else if (s === "chart") {
                i._currentView.view = 2;
            } else if (s === "days") {
                i._currentView.view = 3;
            } else if (s === "statistics") {
                i._currentView.view = 4;
            } else {
                i._currentView.view = 1;
            }
            return i;
        }
        e.getForNewInstance = i;
        function o(e) {
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
            t.views.chart = m(t);
            t.views.days = f(t);
            t.views.months = h(t);
            t.views.statistics = w(t);
            t.yearlyStatistics = g(t);
            t.events = y(t);
            if (t.startMonth > 0) {
                t.yearsToHide = [];
            }
            return t;
        }
        e.get = o;
        function s(e) {
            let t = [];
            if (Is.definedArray(e.colorRanges)) {
                const n = e.colorRanges.length;
                for (let i = 0; i < n; i++) {
                    const n = e.colorRanges[i];
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
                for (let i = 0; i < n; i++) {
                    const n = e.holidays[i];
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
            e.views.map.dayToolTipText = Default2.getString(e.views.map.dayToolTipText, "{d}{o} {mmmm} {yyyy}");
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
            e.views.chart.showLineNumbers = Default2.getBoolean(e.views.chart.showLineNumbers, false);
            e.views.chart.showInReverseOrder = Default2.getBoolean(e.views.chart.showInReverseOrder, false);
            e.views.chart.keepScrollPositions = Default2.getBoolean(e.views.chart.keepScrollPositions, false);
            e.views.chart.showLineDateNumbers = Default2.getBoolean(e.views.chart.showLineDateNumbers, false);
            e.views.chart.showToolTips = Default2.getBoolean(e.views.chart.showToolTips, true);
            e.views.chart.useGradients = Default2.getBoolean(e.views.chart.useGradients, false);
            e.views.chart.highlightCurrentDay = Default2.getBoolean(e.views.chart.highlightCurrentDay, false);
            e.views.chart.dayToolTipText = Default2.getString(e.views.chart.dayToolTipText, "{d}{o} {mmmm} {yyyy}");
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
        function h(e) {
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
        function w(e) {
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
            t.text = i(t.text);
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
            e.text.onlyDataBeingViewedText = Default2.getAnyString(e.text.onlyDataBeingViewedText, "Only data being viewed");
            return e.text;
        }
        function i(e) {
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
        function i(e) {
            if (Is.defined(e._currentView.disabledBackground) && e._currentView.disabledBackground.style.display !== "none") {
                e._currentView.disabledBackground.style.display = "none";
            }
        }
        e.hide = i;
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
    let t;
    (e => {
        function t(e, t, n) {
            const i = new FileReader;
            let o = {};
            i.onloadend = () => t(e.name, o);
            i.onload = e => {
                const t = Default2.getObjectFromString(e.target.result, n);
                if (t.parsed && Is.definedObject(t.object)) {
                    o = t.object;
                }
            };
            i.readAsText(e);
        }
        e.json = t;
        function n(e, t) {
            const n = new FileReader;
            const i = {};
            n.onloadend = () => t(e.name, i);
            n.onload = e => {
                const t = e.target.result.toString().split("\n");
                const n = t.length;
                for (let e = 0; e < n; e++) {
                    const n = t[e].split(":");
                    i[n[0].trim()] = parseInt(n[1].trim());
                }
            };
            n.readAsText(e);
        }
        e.txt = n;
        function i(e, t) {
            const n = new FileReader;
            const i = {};
            n.onloadend = () => t(e.name, i);
            n.onload = e => {
                const t = e.target.result.toString().replace(new RegExp('"', "g"), "");
                const n = t.split("\n");
                n.shift();
                let o = n.length;
                for (let e = 0; e < o; e++) {
                    let t = n[e].split(",");
                    i[t[0].trim()] = parseInt(t[1].trim());
                }
            };
            n.readAsText(e);
        }
        e.csv = i;
        function o(e, t) {
            const n = new FileReader;
            const i = {};
            n.onloadend = () => t(e.name, i);
            n.onload = e => {
                const t = e.target.result.toString().split("\n");
                const n = t.length;
                for (let e = 1; e < n; e++) {
                    const n = t[e].split("\t");
                    i[n[0].trim()] = parseInt(n[1].trim());
                }
            };
            n.readAsText(e);
        }
        e.tsv = o;
        function s(e, t) {
            const n = new FileReader;
            const i = {};
            n.onloadend = () => t(e.name, i);
            n.onload = e => {
                const t = e.target.result.toString().split("\n");
                const n = t.length;
                for (let e = 2; e < n; e++) {
                    const n = t[e].trim();
                    const o = n.substring(1, n.length - 1).trim();
                    const s = o.split("|");
                    i[s[0].trim()] = parseInt(s[1].trim());
                }
            };
            n.readAsText(e);
        }
        e.md = s;
        function r(e, t) {
            const n = new FileReader;
            const i = {};
            n.onloadend = () => t(e.name, i);
            n.onload = e => {
                const t = e.target.result.toString().split("\n");
                const n = t.length;
                for (let e = 1; e < n; e++) {
                    const n = t[e].split(":");
                    i[n[0].trim()] = parseInt(n[1].trim());
                }
            };
            n.readAsText(e);
        }
        e.yaml = r;
    })(t = e.File || (e.File = {}));
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
            }
            return t;
        }
        e.mimeType = t;
        function n(e, t, n, i) {
            let o = null;
            if (Is.definedString(n)) {
                o = `${n}.${i.toLowerCase()}`;
            } else {
                const n = new Date;
                const s = `${Str.padNumber(n.getDate())}${"-"}${Str.padNumber(n.getMonth() + 1)}${"-"}${n.getFullYear()}`;
                const r = `${Str.padNumber(n.getHours())}${"-"}${Str.padNumber(n.getMinutes())}`;
                let a = "";
                if (t._currentView.type !== e.text.unknownTrendText) {
                    a = `${t._currentView.type.toLowerCase().replace(/ /g, "_")}${"_"}`;
                }
                o = `${a}${s}${"_"}${r}.${i.toLowerCase()}`;
            }
            return o;
        }
        e.filename = n;
    })(t = e.File || (e.File = {}));
    let n;
    (e => {
        function t(e, t) {
            const n = [];
            for (const t in e) {
                if (e.hasOwnProperty(t)) {
                    n.push(u([ c(t), c(e[t].toString()) ]));
                }
            }
            if (n.length > 0) {
                n.unshift(u([ c(t.text.dateText), c(t.text.countText) ]));
            }
            return n.join("\n");
        }
        e.csv = t;
        function n(e) {
            return JSON.stringify(e);
        }
        e.json = n;
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
        e.xml = i;
        function o(e) {
            const t = [];
            for (const n in e) {
                if (e.hasOwnProperty(n)) {
                    t.push(`${n}${":"}${" "}${e[n].toString()}`);
                }
            }
            return t.join("\n");
        }
        e.txt = o;
        function s(e, t) {
            const n = [];
            const i = DateTime.getCustomFormattedDateText(t, "{dddd}, {d}{0} {mmmm} {yyyy}", new Date);
            n.push("<!DOCTYPE html>");
            n.push("<html>");
            n.push("<head>");
            n.push('<meta charset="utf-8" />');
            n.push(`<meta http-equiv="Last-Modified" content="${i} GMT" />`);
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
        e.html = s;
        function r(e) {
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
        e.md = r;
        function a(e) {
            const t = [];
            t.push(`Full Date${"\t"}Count`);
            for (const n in e) {
                if (e.hasOwnProperty(n)) {
                    t.push(`${n}${"\t"}${e[n].toString()}`);
                }
            }
            return t.join("\n");
        }
        e.tsv = a;
        function l(e, t) {
            const n = [];
            const i = DateTime.getCustomFormattedDateText(t, "{dddd}, {d}{o} {mmmm} {yyyy}", new Date);
            n.push(`Last-Modified:${" "}${i}`);
            for (const t in e) {
                if (e.hasOwnProperty(t)) {
                    n.push(`${t}${":"}${" "}${e[t].toString()}`);
                }
            }
            return n.join("\n");
        }
        e.yaml = l;
        function c(e) {
            let t = e.toString().replace(/(\r\n|\n|\r)/gm, "").replace(/(\s\s)/gm, " ");
            t = t.replace(/"/g, '""');
            t = `"${t}"`;
            return t;
        }
        function u(e) {
            return e.join(",");
        }
    })(n = e.Contents || (e.Contents = {}));
})(Export || (Export = {}));

(() => {
    let e = {};
    let t = null;
    let n = {};
    const i = "HOLIDAY";
    const o = "HJS_";
    function s() {
        const t = e.domElementTypes;
        const n = t.length;
        for (let e = 0; e < n; e++) {
            const n = document.getElementsByTagName(t[e]);
            const i = [].slice.call(n);
            const o = i.length;
            for (let e = 0; e < o; e++) {
                if (!r(i[e])) {
                    break;
                }
            }
        }
    }
    function r(t) {
        let n = true;
        if (Is.defined(t) && t.hasAttribute(Constant.HEAT_JS_ATTRIBUTE_NAME)) {
            const i = t.getAttribute(Constant.HEAT_JS_ATTRIBUTE_NAME);
            if (Is.definedString(i)) {
                const o = Default2.getObjectFromString(i, e);
                if (o.parsed && Is.definedObject(o.object)) {
                    a(Binding.Options.getForNewInstance(e, o.object, t));
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
        X(e._currentView.element.id, e);
        l(e);
        c(e);
        Trigger.customEvent(e.events.onRenderComplete, e._currentView.element);
    }
    function l(e, t = false, n = false) {
        if (t) {
            ne(e);
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
        e._currentView.yearsAvailable = K(e);
        ToolTip.hide(e);
        oe(e);
        if (e.title.showConfigurationButton) {
            Disabled.Background.render(e);
            u(e);
        }
        if (e.title.showExportButton) {
            f(e);
        }
        ToolTip.renderControl(e);
        y(e);
        S(e, n);
        if (e.views.chart.enabled) {
            C(e, n);
            e._currentView.chartContents.style.display = "none";
        }
        if (e.views.days.enabled) {
            k(e, n);
            e._currentView.daysContents.style.display = "none";
        }
        if (e.views.months.enabled) {
            A(e, n);
            e._currentView.monthsContents.style.display = "none";
        }
        if (e.views.statistics.enabled) {
            R(e, n);
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
        x(e);
    }
    function c(e, t = true) {
        const n = t ? window.addEventListener : window.removeEventListener;
        n("blur", () => ToolTip.hide(e));
    }
    function u(t) {
        t._currentView.configurationDialog = DomElement.create(t._currentView.disabledBackground, "div", "dialog configuration");
        const n = DomElement.create(t._currentView.configurationDialog, "div", "dialog-title-bar");
        const i = DomElement.create(t._currentView.configurationDialog, "div", "dialog-contents");
        const o = DomElement.create(n, "div", "dialog-close");
        const s = DomElement.create(i, "div", "side-container panel");
        const r = DomElement.create(i, "div", "side-container panel");
        DomElement.createWithHTML(n, "span", "dialog-title-bar-text", e.text.configurationTitleText);
        DomElement.createWithHTML(s, "div", "side-container-title-text", `${e.text.visibleDaysText}${":"}`);
        DomElement.createWithHTML(r, "div", "side-container-title-text", `${e.text.visibleMonthsText}${":"}`);
        const a = DomElement.create(r, "div", "side-container");
        const l = DomElement.create(r, "div", "side-container");
        o.onclick = () => m(t);
        for (let n = 0; n < 7; n++) {
            t._currentView.configurationDialogDayCheckBoxes[n] = DomElement.createCheckBox(s, e.text.dayNames[n], n.toString());
        }
        let c = a;
        let u = 0;
        for (let n = t.startMonth; n < 12 + t.startMonth; n++) {
            let i = n;
            if (t.startMonth > 0 && n > 11) {
                i = n - 12;
            }
            t._currentView.configurationDialogMonthCheckBoxes[i] = DomElement.createCheckBox(c, e.text.monthNames[i], i.toString());
            u++;
            if (u > 6) {
                c = l;
            }
        }
        ToolTip.add(o, t, e.text.closeToolTipText);
    }
    function d(e) {
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
    function m(e) {
        Disabled.Background.hide(e);
        if (Is.defined(e._currentView.configurationDialog) && e._currentView.configurationDialog.style.display !== "none") {
            e._currentView.configurationDialog.style.display = "none";
        }
        const t = [];
        const n = [];
        let i = false;
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
            i = true;
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
            i = true;
        }
        if (i) {
            l(e);
            Trigger.customEvent(e.events.onOptionsUpdate, e._currentView.element, e);
        } else {
            ToolTip.hide(e);
        }
    }
    function f(t) {
        t._currentView.exportDialog = DomElement.create(t._currentView.disabledBackground, "div", "dialog export");
        const n = DomElement.create(t._currentView.exportDialog, "div", "dialog-title-bar");
        const i = DomElement.create(t._currentView.exportDialog, "div", "dialog-contents");
        const o = DomElement.create(n, "div", "dialog-close");
        DomElement.createWithHTML(n, "span", "dialog-title-bar-text", e.text.selectTypeText);
        t._currentView.exportDialogExportTypeSelect = DomElement.create(i, "select", "input-box");
        t._currentView.exportDialogExportTypeSelect.name = crypto.randomUUID();
        t._currentView.exportDialogExportFilenameInput = DomElement.create(i, "input", "input-box filename");
        t._currentView.exportDialogExportFilenameInput.placeholder = e.text.filenamePlaceholderText;
        t._currentView.exportDialogExportOnlyDataBeingViewedCheckBox = DomElement.createCheckBox(i, e.text.onlyDataBeingViewedText, crypto.randomUUID());
        t._currentView.exportDialogExportOnlyDataBeingViewedCheckBox.checked = t.exportOnlyDataBeingViewed;
        const s = DomElement.create(i, "div", "buttons");
        const r = DomElement.createWithHTML(s, "button", "", e.text.exportButtonText);
        h(t);
        const a = () => {
            const e = t._currentView.exportDialogExportTypeSelect.value;
            const n = t._currentView.exportDialogExportFilenameInput.value;
            const i = t._currentView.exportDialogExportOnlyDataBeingViewedCheckBox.checked;
            g(t);
            ge(t, e, n, i);
        };
        t._currentView.exportDialogExportFilenameInput.onkeydown = e => {
            if (e.key === "Enter") {
                a();
            }
        };
        r.onclick = () => a();
        o.onclick = () => g(t);
        ToolTip.add(o, t, e.text.closeToolTipText);
    }
    function h(e) {
        let t;
        let n = [];
        for (t in ExportType) {
            const i = DomElement.createWithNoContainer("option");
            i.value = ExportType[t];
            i.textContent = t.toString().toUpperCase();
            i.selected = t === e.exportType;
            n.push(i);
        }
        n.sort((e, t) => e.text.toLowerCase().localeCompare(t.text.toLowerCase()));
        n.forEach(t => e._currentView.exportDialogExportTypeSelect.add(t));
    }
    function w(e) {
        Disabled.Background.show(e);
        if (Is.defined(e._currentView.exportDialog) && e._currentView.exportDialog.style.display !== "block") {
            e._currentView.exportDialogExportFilenameInput.value = "";
            e._currentView.exportDialog.style.display = "block";
        }
        ToolTip.hide(e);
    }
    function g(e) {
        Disabled.Background.hide(e);
        if (Is.defined(e._currentView.exportDialog) && e._currentView.exportDialog.style.display !== "none") {
            e._currentView.exportDialog.style.display = "none";
        }
        ToolTip.hide(e);
    }
    function y(t) {
        if (t.title.showText || t.title.showYearSelector || t.title.showRefreshButton || t.title.showExportButton || t.title.showImportButton) {
            const n = DomElement.create(t._currentView.element, "div", "title-bar");
            const i = DomElement.create(n, "div", "title");
            const o = t.title.showTitleDropDownMenu && (t.views.chart.enabled || t.views.days.enabled || t.views.statistics.enabled);
            if (o) {
                if (t.title.showTitleDropDownButton) {
                    DomElement.create(i, "div", "down-arrow");
                }
            } else {
                DomElement.addClass(i, "no-click");
            }
            if (t.title.showText) {
                i.innerHTML += t.title.text;
                if (t.title.showSectionText) {
                    DomElement.createWithHTML(i, "span", "section-text", "[");
                    if (t._currentView.view === 1) {
                        DomElement.createWithHTML(i, "span", "section-text-name", e.text.mapText);
                    } else if (t.views.chart.enabled && t._currentView.view === 2) {
                        DomElement.createWithHTML(i, "span", "section-text-name", e.text.chartText);
                    } else if (t.views.days.enabled && t._currentView.view === 3) {
                        DomElement.createWithHTML(i, "span", "section-text-name", e.text.daysText);
                    } else if (t.views.months.enabled && t._currentView.view === 5) {
                        DomElement.createWithHTML(i, "span", "section-text-name", e.text.monthsText);
                    } else if (t.views.statistics.enabled && t._currentView.view === 4) {
                        DomElement.createWithHTML(i, "span", "section-text-name", e.text.colorRangesText);
                    } else {
                        DomElement.createWithHTML(i, "span", "section-text-name", e.text.mapText);
                    }
                    DomElement.createWithHTML(i, "span", "section-text", "]");
                }
            }
            if (o) {
                D(t, i);
            }
            if (t.title.showImportButton && !t._currentView.isInFetchMode) {
                const i = DomElement.createWithHTML(n, "button", "import", e.text.importButtonSymbolText);
                i.onclick = () => he(t);
                if (t.title.showToolTips) {
                    ToolTip.add(i, t, e.text.importButtonText);
                }
            }
            if (t.title.showExportButton) {
                const i = DomElement.createWithHTML(n, "button", "export", e.text.exportButtonSymbolText);
                i.onclick = () => w(t);
                if (t.title.showToolTips) {
                    ToolTip.add(i, t, e.text.exportButtonText);
                }
            }
            if (t.title.showRefreshButton) {
                const i = DomElement.createWithHTML(n, "button", "refresh", e.text.refreshButtonSymbolText);
                if (t.title.showToolTips) {
                    ToolTip.add(i, t, e.text.refreshButtonText);
                }
                i.onclick = () => {
                    l(t);
                    Trigger.customEvent(t.events.onRefresh, t._currentView.element);
                };
            }
            if (t.title.showYearSelector) {
                const i = DomElement.createWithHTML(n, "button", "back", e.text.backButtonSymbolText);
                i.onclick = () => De(t);
                if (t.title.showToolTips) {
                    ToolTip.add(i, t, e.text.backButtonText);
                }
                if (Z(t, t._currentView.year)) {
                    i.disabled = true;
                }
                let o = t._currentView.year.toString();
                if (t.startMonth > 0) {
                    o += ` / ${t._currentView.year + 1}`;
                }
                t._currentView.yearText = DomElement.createWithHTML(n, "div", "year-text", o);
                if (t.title.showYearSelectionDropDown) {
                    v(t);
                } else {
                    DomElement.addClass(t._currentView.yearText, "no-click");
                }
                if (t.title.showConfigurationButton) {
                    let i = DomElement.create(n, "div", "configure");
                    i.onclick = () => d(t);
                    if (t.title.showToolTips) {
                        ToolTip.add(i, t, e.text.configurationToolTipText);
                    }
                }
                if (t.title.showCurrentYearButton) {
                    const i = DomElement.createWithHTML(n, "button", "current", e.text.currentYearSymbolText);
                    if (t.title.showToolTips) {
                        ToolTip.add(i, t, e.text.currentYearText);
                    }
                    i.onclick = () => {
                        t._currentView.year = (new Date).getFullYear() - 1;
                        pe(t, false);
                        Trigger.customEvent(t.events.onSetYear, t._currentView.year);
                    };
                }
                const s = DomElement.createWithHTML(n, "button", "next", e.text.nextButtonSymbolText);
                s.onclick = () => pe(t);
                if (t.title.showToolTips) {
                    ToolTip.add(s, t, e.text.nextButtonText);
                }
                if (ee(t, t._currentView.year)) {
                    s.disabled = true;
                }
            }
        }
    }
    function D(t, n) {
        const i = DomElement.create(n, "div", "titles-menu-container");
        const o = DomElement.create(i, "div", "titles-menu");
        if (t.title.showTitleDropDownHeaders) {
            DomElement.createWithHTML(o, "div", "title-menu-header", `${e.text.dataText}${":"}`);
        }
        const s = DomElement.createWithHTML(o, "div", "title-menu-item", e.text.mapText);
        p(t, s, 1, "map");
        if (t.views.chart.enabled) {
            const n = DomElement.createWithHTML(o, "div", "title-menu-item", e.text.chartText);
            p(t, n, 2, "chart");
        }
        let r = null;
        if (t.views.days.enabled) {
            if (t.title.showTitleDropDownHeaders) {
                r = DomElement.createWithHTML(o, "div", "title-menu-header", `${e.text.yearText}${":"}`);
            }
            const n = DomElement.createWithHTML(o, "div", "title-menu-item", e.text.daysText);
            p(t, n, 3, "days");
        }
        if (t.views.months.enabled) {
            if (t.title.showTitleDropDownHeaders && !Is.defined(r)) {
                r = DomElement.createWithHTML(o, "div", "title-menu-header", `${e.text.yearText}${":"}`);
            }
            const n = DomElement.createWithHTML(o, "div", "title-menu-item", e.text.monthsText);
            p(t, n, 5, "months");
        }
        if (t.views.statistics.enabled) {
            if (t.title.showTitleDropDownHeaders) {
                DomElement.createWithHTML(o, "div", "title-menu-header", `${e.text.statisticsText}${":"}`);
            }
            const n = DomElement.createWithHTML(o, "div", "title-menu-item", e.text.colorRangesText);
            p(t, n, 4, "statistics");
        }
    }
    function p(e, t, n, i) {
        if (e._currentView.view === n) {
            DomElement.addClass(t, "title-menu-item-active");
        } else {
            t.onclick = () => z(e, n, i);
        }
    }
    function v(e) {
        DomElement.create(e._currentView.yearText, "div", "down-arrow");
        const t = DomElement.create(e._currentView.yearText, "div", "years-menu-container");
        const n = DomElement.create(t, "div", "years-menu");
        const i = (new Date).getFullYear();
        let o = null;
        t.style.display = "block";
        t.style.visibility = "hidden";
        for (let t = i - e.title.extraSelectionYears; t < i + e.title.extraSelectionYears; t++) {
            if (Q(e, t)) {
                let s = T(e, n, t, i);
                if (!Is.defined(o)) {
                    o = s;
                }
            }
        }
        if (Is.defined(o)) {
            n.scrollTop = o.offsetTop - n.offsetHeight / 2;
        }
        t.style.display = "none";
        t.style.visibility = "visible";
    }
    function T(e, t, n, i) {
        let o = null;
        const s = e.startMonth === 0 ? n.toString() : `${n} / ${n + 1}`;
        const r = DomElement.createWithHTML(t, "div", "year-menu-item", s);
        if (e._currentView.year !== n) {
            r.onclick = () => {
                e._currentView.year = n;
                l(e);
                Trigger.customEvent(e.events.onSetYear, e._currentView.year);
            };
            if (n === i) {
                DomElement.addClass(r, "year-menu-item-current");
            }
        } else {
            DomElement.addClass(r, "year-menu-item-active");
            o = r;
        }
        return o;
    }
    function x(t) {
        const i = new Date;
        const o = t._currentView.year === i.getFullYear();
        if (t.yearlyStatistics.enabled && (!t.yearlyStatistics.showOnlyForCurrentYear || o)) {
            const s = DomElement.create(t._currentView.element, "div", "yearly-statistics", t._currentView.mapContents);
            const r = Visible.days(t);
            const a = Visible.months(t);
            if (t.yearlyStatistics.showTotalToday) {
                let a = n[t._currentView.element.id].typeData[t._currentView.type][DateTime.toStorageDate(i)];
                const l = DomElement.create(s, "div", "statistics-box");
                const c = DateTime.getWeekdayNumber(i) + 1;
                if (!Is.defined(a) || !Is.dayVisible(r, c)) {
                    a = 0;
                }
                const u = o ? Str.friendlyNumber(a) : e.text.unknownText;
                DomElement.createWithHTML(l, "div", "statistics-box-title", `${e.text.totalTodayText}${":"}`);
                DomElement.createWithHTML(l, "div", "statistics-box-count", u);
            }
            if (t.yearlyStatistics.showTotalThisWeek) {
                let n = 0;
                if (o) {
                    const e = DateTime.getDateForMondayOfCurrentWeek();
                    const i = new Date(e);
                    i.setDate(e.getDate() + 7);
                    n = b(t, r, a, e, i);
                }
                const i = o ? Str.friendlyNumber(n) : e.text.unknownText;
                const l = DomElement.create(s, "div", "statistics-box");
                DomElement.createWithHTML(l, "div", "statistics-box-title", `${e.text.totalThisWeekText}${":"}`);
                DomElement.createWithHTML(l, "div", "statistics-box-count", i);
            }
            if (t.yearlyStatistics.showTotalThisMonth) {
                let n = 0;
                if (o) {
                    const e = new Date(i.getFullYear(), i.getMonth(), 1);
                    const o = new Date(i.getFullYear(), i.getMonth(), DateTime.getTotalDaysInMonth(i.getFullYear(), i.getMonth()) + 1);
                    n = b(t, r, a, e, o);
                }
                const l = o ? Str.friendlyNumber(n) : e.text.unknownText;
                const c = DomElement.create(s, "div", "statistics-box");
                DomElement.createWithHTML(c, "div", "statistics-box-title", `${e.text.totalThisMonthText}${":"}`);
                DomElement.createWithHTML(c, "div", "statistics-box-count", l);
            }
            if (t.yearlyStatistics.showTotalThisYear) {
                const n = new Date(t._currentView.year, t.startMonth, 1);
                const i = new Date(t._currentView.year + 1, t.startMonth, 1);
                const o = b(t, r, a, n, i);
                const l = DomElement.create(s, "div", "statistics-box");
                DomElement.createWithHTML(l, "div", "statistics-box-title", `${e.text.totalThisYearText}${":"}`);
                DomElement.createWithHTML(l, "div", "statistics-box-count", Str.friendlyNumber(o));
            }
            if (s.innerHTML === "") {
                s.parentNode.removeChild(s);
            }
        }
    }
    function b(e, t, i, o, s) {
        let r = 0;
        let a = new Date(o);
        while (a < s) {
            const o = n[e._currentView.element.id].typeData[e._currentView.type][DateTime.toStorageDate(a)];
            const s = DateTime.getWeekdayNumber(a) + 1;
            if (Is.monthVisible(i, a.getMonth()) && Is.dayVisible(t, s) && Is.definedNumber(o)) {
                r += o;
            }
            a.setDate(a.getDate() + 1);
        }
        return r;
    }
    function S(t, n) {
        t._currentView.mapContents = DomElement.create(t._currentView.element, "div", "map-contents");
        if (t.views.chart.enabled) {
            E(t);
        }
        if (t.views.days.enabled) {
            B(t);
        }
        if (t.views.months.enabled) {
            L(t);
        }
        if (t.views.statistics.enabled) {
            W(t);
        }
        P(t);
        if (t.views.map.showNoDataMessageWhenDataIsNotAvailable && !_(t)) {
            const i = DomElement.createWithHTML(t._currentView.mapContents, "div", "no-data-message", e.text.noMapDataMessage);
            if (n) {
                DomElement.addClass(i, "view-switch");
            }
        } else {
            t._currentView.mapContents.style.minHeight = "unset";
            fe(t._currentView.mapContents, t);
            const i = DomElement.create(t._currentView.mapContents, "div", "map");
            const o = t._currentView.year;
            let s = false;
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
                            r.ondblclick = () => z(t, 3, "days");
                        }
                    }
                }
                if (t.views.map.showDaysInReverseOrder) {
                    DomElement.reverseChildrenOrder(n);
                }
            }
            const r = DomElement.create(i, "div", "months");
            const a = me(t);
            for (let n = t.startMonth; n < 12 + t.startMonth; n++) {
                let i = n;
                let l = o;
                if (t.startMonth > 0 && n > 11) {
                    i = n - 12;
                    l++;
                }
                if (Is.monthVisible(t.views.map.monthsToShow, i)) {
                    const n = DomElement.create(r, "div", "month");
                    const o = DomElement.create(n, "div", "day-columns");
                    let c = DateTime.getTotalDaysInMonth(l, i);
                    let u = DomElement.create(o, "div", "day-column");
                    let d = false;
                    const m = new Date(l, i, 1);
                    const f = DateTime.getWeekdayNumber(m);
                    let h = 1;
                    c += f;
                    for (let e = 0; e < c; e++) {
                        if (e >= f) {
                            d = true;
                        } else {
                            if (Is.dayVisible(t.views.map.daysToShow, h)) {
                                DomElement.create(u, "div", "day-disabled");
                            }
                        }
                        if (d) {
                            let n = null;
                            if (Is.dayVisible(t.views.map.daysToShow, h)) {
                                n = V(t, u, e - f, i, l, a);
                            }
                            if ((e + 1) % 7 === 0) {
                                if (t.views.map.showDaysInReverseOrder) {
                                    DomElement.reverseChildrenOrder(u);
                                }
                                u = DomElement.create(o, "div", "day-column");
                                h = 0;
                                if (t._currentView.dayWidth === 0 && Is.defined(n)) {
                                    let e = DomElement.getStyleValueByName(n, "margin-left", true);
                                    let i = DomElement.getStyleValueByName(n, "margin-right", true);
                                    t._currentView.dayWidth = n.offsetWidth + e + i;
                                }
                            }
                        }
                        h++;
                    }
                    if (t.views.map.showMonthNames) {
                        let s;
                        const r = n.offsetWidth;
                        let a = e.text.monthNames[i];
                        if (t.startMonth > 0) {
                            a += `${" "}${l}`;
                        }
                        if (!t.views.map.placeMonthNamesOnTheBottom) {
                            s = DomElement.createWithHTML(n, "div", "month-name", a, o);
                        } else {
                            s = DomElement.createWithHTML(n, "div", "month-name-bottom", a);
                        }
                        if (t.views.map.showMonthDayGaps) {
                            s.style.width = `${r}px`;
                        } else {
                            s.style.width = `${r - t._currentView.dayWidth}px`;
                        }
                        if (t.views.months.enabled) {
                            s.ondblclick = () => z(t, 5, "months");
                        }
                    }
                    if (s && Is.defined(t._currentView.dayWidth)) {
                        if (f > 0 && !t.views.map.showMonthDayGaps) {
                            n.style.marginLeft = `${-t._currentView.dayWidth}px`;
                        } else if (f === 0 && t.views.map.showMonthDayGaps) {
                            n.style.marginLeft = `${t._currentView.dayWidth}px`;
                        }
                    }
                    if (t.views.map.showMonthsInReverseOrder) {
                        DomElement.reverseChildrenOrder(o);
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
    function V(e, t, i, o, s, r) {
        const a = i + 1;
        const l = DomElement.create(t, "div", "day");
        const c = new Date(s, o, a);
        const u = Is.holiday(e, c);
        let d = n[e._currentView.element.id].typeData[e._currentView.type][DateTime.toStorageDate(c)];
        d = Default2.getNumber(d, 0);
        l.setAttribute(Constant.HEAT_JS_MAP_DATE_ATTRIBUTE_NAME, `${Str.padNumber(a)}-${Str.padNumber(o + 1)}-${s}`);
        if (e.views.map.showToolTips) {
            J(e, l, c, d, e.views.map.dayToolTipText);
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
        const m = ue(e, r, d, c);
        if (Is.defined(m) && ae(e, m.id)) {
            if (Is.definedString(m.mapCssClassName)) {
                DomElement.addClass(l, m.mapCssClassName);
            } else {
                DomElement.addClass(l, m.cssClassName);
            }
        }
        if (e.views.map.highlightCurrentDay && DateTime.isTodaysDate(c)) {
            DomElement.addClass(l, "today");
        }
        return l;
    }
    function _(e) {
        let t = false;
        const n = q(e);
        const i = e._currentView.year.toString();
        const o = (e._currentView.year + 1).toString();
        for (const s in n) {
            if (n.hasOwnProperty(s)) {
                if (DateTime.getStorageDateYear(s) === i) {
                    t = true;
                    break;
                } else if (e.startMonth > 0 && DateTime.getStorageDateYear(s) === o) {
                    t = true;
                    break;
                }
            }
        }
        return t;
    }
    function E(e) {
        e._currentView.chartContents = DomElement.create(e._currentView.element, "div", "chart-contents");
        fe(e._currentView.chartContents, e);
    }
    function C(t, n) {
        const i = DomElement.create(t._currentView.chartContents, "div", "chart");
        let o = DomElement.create(i, "div", "y-labels");
        const s = DomElement.create(i, "div", "day-lines");
        const r = me(t);
        const a = I(t);
        const l = t._currentView.year;
        let c = 0;
        if (n) {
            DomElement.addClass(i, "view-switch");
        }
        if (a > 0 && t.views.chart.showChartYLabels) {
            const e = DomElement.createWithHTML(o, "div", "label-0", a.toString());
            DomElement.createWithHTML(o, "div", "label-25", (Math.floor(a / 4) * 3).toString());
            DomElement.createWithHTML(o, "div", "label-50", Math.floor(a / 2).toString());
            DomElement.createWithHTML(o, "div", "label-75", Math.floor(a / 4).toString());
            DomElement.createWithHTML(o, "div", "label-100", "0");
            o.style.width = `${e.offsetWidth}px`;
            c = o.offsetWidth + DomElement.getStyleValueByName(o, "margin-right", true);
        } else {
            o.parentNode.removeChild(o);
            o = null;
        }
        if (a === 0) {
            t._currentView.chartContents.style.minHeight = `${t._currentView.mapContents.offsetHeight}px`;
            i.parentNode.removeChild(i);
            const o = DomElement.createWithHTML(t._currentView.chartContents, "div", "no-data-message", e.text.noChartDataMessage);
            if (n) {
                DomElement.addClass(o, "view-switch");
            }
        } else {
            const n = s.offsetHeight / a;
            let i = 0;
            let o = 0;
            let u = [];
            for (let e = t.startMonth; e < 12 + t.startMonth; e++) {
                let a = e;
                let c = l;
                if (t.startMonth > 0 && e > 11) {
                    a = e - 12;
                    c++;
                }
                if (Is.monthVisible(t.views.chart.monthsToShow, a)) {
                    const e = DateTime.getTotalDaysInMonth(c, a);
                    let l = 1;
                    let d = false;
                    i++;
                    for (let i = 0; i < e; i++) {
                        const e = new Date(c, a, l);
                        const m = DateTime.getWeekdayNumber(e) + 1;
                        if (Is.dayVisible(t.views.chart.daysToShow, m)) {
                            const e = M(s, t, i + 1, a, c, r, n);
                            if (!d) {
                                u.push(e);
                                d = true;
                            }
                        }
                        if ((i + 1) % 7 === 0) {
                            l = 0;
                        }
                        l++;
                        o++;
                    }
                }
            }
            if (t.views.chart.showInReverseOrder) {
                DomElement.reverseChildrenOrder(s);
                u = u.reverse();
            }
            if (t.views.chart.showMonthNames) {
                const n = DomElement.create(t._currentView.chartContents, "div", "chart-months");
                let i = 0;
                const o = o => {
                    let s = o + t.startMonth;
                    let r = l;
                    if (t.startMonth > 0 && s > 11) {
                        s -= 12;
                        r++;
                    }
                    if (Is.monthVisible(t.views.chart.monthsToShow, s)) {
                        let o = e.text.monthNames[s];
                        if (t.startMonth > 0) {
                            o += `${" "}${r}`;
                        }
                        let a = DomElement.createWithHTML(n, "div", "month-name", o);
                        a.style.left = `${u[i].offsetLeft}px`;
                        if (t.views.months.enabled) {
                            a.ondblclick = () => z(t, 5, "months");
                        }
                        i++;
                    }
                };
                if (t.views.chart.showInReverseOrder) {
                    for (let e = 12; e--; ) {
                        o(e);
                    }
                } else {
                    for (let e = 0; e < 12; e++) {
                        o(e);
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
    function M(e, t, n, i, o, s, r) {
        const a = new Date(o, i, n);
        const l = DomElement.create(e, "div", "day-line");
        const c = Is.holiday(t, a);
        let u = q(t)[DateTime.toStorageDate(a)];
        u = Default2.getNumber(u, 0);
        l.setAttribute(Constant.HEAT_JS_CHART_DATE_ATTRIBUTE_NAME, `${Str.padNumber(n)}-${Str.padNumber(i + 1)}-${o}`);
        if (t.views.chart.showToolTips) {
            J(t, l, a, u, t.views.chart.dayToolTipText);
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
        const m = ue(t, s, u, a);
        if (Is.defined(m) && ae(t, m.id)) {
            if (Is.definedString(m.chartCssClassName)) {
                DomElement.addClass(l, m.chartCssClassName);
            } else {
                DomElement.addClass(l, m.cssClassName);
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
    function I(e) {
        let t = 0;
        const n = q(e);
        const i = e._currentView.year;
        for (let o = e.startMonth; o < 12 + e.startMonth; o++) {
            let s = o;
            let r = i;
            if (e.startMonth > 0 && o > 11) {
                s = o - 12;
                r++;
            }
            if (Is.monthVisible(e.views.chart.monthsToShow, s)) {
                const i = DateTime.getTotalDaysInMonth(r, s);
                for (let o = 0; o < i; o++) {
                    const i = new Date(r, s, o + 1);
                    const a = DateTime.toStorageDate(i);
                    const l = DateTime.getWeekdayNumber(i) + 1;
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
    function B(e) {
        e._currentView.daysContents = DomElement.create(e._currentView.element, "div", "days-contents");
        fe(e._currentView.daysContents, e);
    }
    function k(t, n) {
        const i = DomElement.create(t._currentView.daysContents, "div", "days");
        const o = DomElement.create(t._currentView.daysContents, "div", "day-names");
        let s = DomElement.create(i, "div", "y-labels");
        const r = DomElement.create(i, "div", "day-lines");
        const a = O(t);
        if (n) {
            DomElement.addClass(i, "view-switch");
        }
        if (a.largestValue > 0 && t.views.days.showChartYLabels) {
            const e = DomElement.createWithHTML(s, "div", "label-0", a.largestValue.toString());
            DomElement.createWithHTML(s, "div", "label-25", (Math.floor(a.largestValue / 4) * 3).toString());
            DomElement.createWithHTML(s, "div", "label-50", Math.floor(a.largestValue / 2).toString());
            DomElement.createWithHTML(s, "div", "label-75", Math.floor(a.largestValue / 4).toString());
            DomElement.createWithHTML(s, "div", "label-100", "0");
            s.style.width = `${e.offsetWidth}px`;
            o.style.paddingLeft = `${s.offsetWidth + DomElement.getStyleValueByName(s, "margin-right", true)}px`;
        } else {
            s.parentNode.removeChild(s);
            s = null;
        }
        if (a.largestValue === 0) {
            t._currentView.daysContents.style.minHeight = `${t._currentView.mapContents.offsetHeight}px`;
            i.parentNode.removeChild(i);
            o.parentNode.removeChild(o);
            const s = DomElement.createWithHTML(t._currentView.daysContents, "div", "no-days-message", e.text.noDaysDataMessage);
            if (n) {
                DomElement.addClass(s, "view-switch");
            }
        } else {
            const n = r.offsetHeight / a.largestValue;
            const i = 1 / 7;
            let s = i;
            for (const l in a.values) {
                if (a.values.hasOwnProperty(l) && Is.dayVisible(t.views.days.daysToShow, parseInt(l))) {
                    N(r, parseInt(l), a.values[l], t, n, s);
                    if (t.views.days.showDayNames) {
                        DomElement.createWithHTML(o, "div", "day-name", e.text.dayNames[parseInt(l) - 1]);
                    }
                }
                s += i;
            }
            if (t.views.days.showInReverseOrder) {
                DomElement.reverseChildrenOrder(r);
                DomElement.reverseChildrenOrder(o);
            }
            if (t.views.days.keepScrollPositions) {
                t._currentView.daysContents.scrollLeft = t._currentView.daysContentsScrollLeft;
            }
        }
    }
    function N(e, t, n, i, o, s) {
        const r = DomElement.create(e, "div", "day-line");
        const a = n * o;
        r.style.height = `${a}px`;
        r.setAttribute(Constant.HEAT_JS_DAY_NUMBER_ATTRIBUTE_NAME, t.toString());
        if (a <= 0) {
            r.style.visibility = "hidden";
        }
        if (i.views.days.showToolTips) {
            ToolTip.add(r, i, Str.friendlyNumber(n));
        }
        if (Is.definedFunction(i.events.onWeekDayClick)) {
            r.onclick = () => Trigger.customEvent(i.events.onWeekDayClick, t, n, i._currentView.year);
        } else if (Is.definedFunction(i.events.onWeekDayDblClick)) {
            r.ondblclick = () => Trigger.customEvent(i.events.onWeekDayDblClick, t, n, i._currentView.year);
        } else {
            DomElement.addClass(r, "no-hover");
        }
        if (i.views.days.showDayNumbers && n > 0) {
            DomElement.addClass(r, "day-line-number");
            DomElement.createWithHTML(r, "div", "count", Str.friendlyNumber(n));
        }
        if (i.views.days.useGradients) {
            DomElement.adGradientEffect(i._currentView.element, r);
        } else if (i.views.days.useDifferentBackgroundOpacities) {
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
    function O(e) {
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
        const n = q(e);
        const i = e._currentView.year;
        for (let o = e.startMonth; o < 12 + e.startMonth; o++) {
            let s = o;
            let r = i;
            if (e.startMonth > 0 && o > 11) {
                s = o - 12;
                r++;
            }
            if (Is.monthVisible(e.views.days.monthsToShow, s)) {
                const i = DateTime.getTotalDaysInMonth(r, s);
                for (let o = 0; o < i; o++) {
                    const i = DateTime.toStorageDate(new Date(r, s, o + 1));
                    if (n.hasOwnProperty(i)) {
                        const o = DateTime.getStorageDate(i);
                        const s = new Date(parseInt(o[2]), parseInt(o[1]), parseInt(o[0]));
                        const r = DateTime.getWeekdayNumber(s) + 1;
                        if (!Is.holiday(e, s).matched && Is.dayVisible(e.views.days.daysToShow, r)) {
                            t.values[r] += n[i];
                            t.largestValue = Math.max(t.largestValue, t.values[r]);
                        }
                    }
                }
            }
        }
        return t;
    }
    function L(e) {
        e._currentView.monthsContents = DomElement.create(e._currentView.element, "div", "months-contents");
        fe(e._currentView.monthsContents, e);
    }
    function A(t, n) {
        const i = DomElement.create(t._currentView.monthsContents, "div", "months");
        const o = DomElement.create(t._currentView.monthsContents, "div", "month-names");
        let s = DomElement.create(i, "div", "y-labels");
        const r = DomElement.create(i, "div", "month-lines");
        const a = H(t);
        if (n) {
            DomElement.addClass(i, "view-switch");
        }
        if (a.largestValue > 0 && t.views.months.showChartYLabels) {
            const e = DomElement.createWithHTML(s, "div", "label-0", a.largestValue.toString());
            DomElement.createWithHTML(s, "div", "label-25", (Math.floor(a.largestValue / 4) * 3).toString());
            DomElement.createWithHTML(s, "div", "label-50", Math.floor(a.largestValue / 2).toString());
            DomElement.createWithHTML(s, "div", "label-75", Math.floor(a.largestValue / 4).toString());
            DomElement.createWithHTML(s, "div", "label-100", "0");
            s.style.width = `${e.offsetWidth}px`;
            o.style.paddingLeft = `${s.offsetWidth + DomElement.getStyleValueByName(s, "margin-right", true)}px`;
        } else {
            s.parentNode.removeChild(s);
            s = null;
        }
        if (a.largestValue === 0) {
            t._currentView.monthsContents.style.minHeight = `${t._currentView.mapContents.offsetHeight}px`;
            i.parentNode.removeChild(i);
            o.parentNode.removeChild(o);
            const s = DomElement.createWithHTML(t._currentView.monthsContents, "div", "no-months-message", e.text.noMonthsDataMessage);
            if (n) {
                DomElement.addClass(s, "view-switch");
            }
        } else {
            const n = r.offsetHeight / a.largestValue;
            const i = 1 / 12;
            let s = i;
            for (let l = t.startMonth; l < 12 + t.startMonth; l++) {
                let c = l;
                if (t.startMonth > 0 && l > 11) {
                    c = l - 12;
                }
                const u = c + 1;
                if (a.values.hasOwnProperty(u) && Is.monthVisible(t.views.months.monthsToShow, c)) {
                    F(r, u, a.values[u], t, n, s);
                    if (t.views.months.showMonthNames) {
                        DomElement.createWithHTML(o, "div", "month-name", e.text.monthNames[c]);
                    }
                }
                s += i;
            }
            if (t.views.months.showInReverseOrder) {
                DomElement.reverseChildrenOrder(r);
                DomElement.reverseChildrenOrder(o);
            }
            if (t.views.months.keepScrollPositions) {
                t._currentView.monthsContents.scrollLeft = t._currentView.monthsContentsScrollLeft;
            }
        }
    }
    function F(e, t, n, i, o, s) {
        const r = DomElement.create(e, "div", "month-line");
        const a = n * o;
        const l = new Date;
        r.style.height = `${a}px`;
        r.setAttribute(Constant.HEAT_JS_MONTH_NUMBER_ATTRIBUTE_NAME, t.toString());
        if (a <= 0) {
            r.style.visibility = "hidden";
        }
        if (i.views.months.showToolTips) {
            ToolTip.add(r, i, Str.friendlyNumber(n));
        }
        let c = i._currentView.year;
        if (i.startMonth > 0 && t - 1 < i.startMonth) {
            c++;
        }
        if (Is.definedFunction(i.events.onMonthClick)) {
            r.onclick = () => Trigger.customEvent(i.events.onMonthClick, t, n, c);
        } else if (Is.definedFunction(i.events.onMonthDblClick)) {
            r.ondblclick = () => Trigger.customEvent(i.events.onMonthDblClick, t, n, c);
        } else {
            DomElement.addClass(r, "no-hover");
        }
        if (i.views.months.showMonthNumbers && n > 0) {
            DomElement.addClass(r, "month-line-number");
            DomElement.createWithHTML(r, "div", "count", Str.friendlyNumber(n));
        }
        if (i.views.months.highlightCurrentMonth && l.getMonth() === t - 1 && i._currentView.year === l.getFullYear()) {
            DomElement.addClass(r, "today");
        }
        if (i.views.months.useGradients) {
            DomElement.adGradientEffect(i._currentView.element, r);
        } else if (i.views.months.useDifferentBackgroundOpacities) {
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
    function H(e) {
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
        const n = q(e);
        const i = e._currentView.year;
        for (let o = e.startMonth; o < 12 + e.startMonth; o++) {
            let s = o;
            let r = i;
            if (e.startMonth > 0 && o > 11) {
                s = o - 12;
                r++;
            }
            if (Is.monthVisible(e.views.months.monthsToShow, s)) {
                const i = s + 1;
                const o = DateTime.getTotalDaysInMonth(r, s);
                for (let a = 0; a < o; a++) {
                    const o = DateTime.toStorageDate(new Date(r, s, a + 1));
                    if (n.hasOwnProperty(o)) {
                        const s = DateTime.getStorageDate(o);
                        const r = new Date(parseInt(s[2]), parseInt(s[1]), parseInt(s[0]));
                        const a = DateTime.getWeekdayNumber(r) + 1;
                        if (!Is.holiday(e, r).matched && Is.dayVisible(e.views.days.daysToShow, a)) {
                            t.values[i] += n[o];
                            t.largestValue = Math.max(t.largestValue, t.values[i]);
                        }
                    }
                }
            }
        }
        return t;
    }
    function W(e) {
        e._currentView.statisticsContents = DomElement.create(e._currentView.element, "div", "statistics-contents");
        fe(e._currentView.statisticsContents, e);
    }
    function R(t, n) {
        const i = DomElement.create(t._currentView.statisticsContents, "div", "statistics");
        const o = DomElement.create(t._currentView.statisticsContents, "div", "statistics-ranges");
        let s = DomElement.create(i, "div", "y-labels");
        const r = DomElement.create(i, "div", "range-lines");
        const a = me(t);
        const l = Y(t, a);
        if (n) {
            DomElement.addClass(i, "view-switch");
        }
        if (l.largestValue > 0 && t.views.statistics.showChartYLabels) {
            const e = DomElement.createWithHTML(s, "div", "label-0", l.largestValue.toString());
            DomElement.createWithHTML(s, "div", "label-25", (Math.floor(l.largestValue / 4) * 3).toString());
            DomElement.createWithHTML(s, "div", "label-50", Math.floor(l.largestValue / 2).toString());
            DomElement.createWithHTML(s, "div", "label-75", Math.floor(l.largestValue / 4).toString());
            DomElement.createWithHTML(s, "div", "label-100", "0");
            s.style.width = `${e.offsetWidth}px`;
            o.style.paddingLeft = `${s.offsetWidth + DomElement.getStyleValueByName(s, "margin-right", true)}px`;
        } else {
            s.parentNode.removeChild(s);
            s = null;
        }
        if (l.largestValue === 0) {
            t._currentView.statisticsContents.style.minHeight = `${t._currentView.mapContents.offsetHeight}px`;
            i.parentNode.removeChild(i);
            o.parentNode.removeChild(o);
            const s = DomElement.createWithHTML(t._currentView.statisticsContents, "div", "no-statistics-message", e.text.noStatisticsDataMessage);
            if (n) {
                DomElement.addClass(s, "view-switch");
            }
        } else {
            const e = r.offsetHeight / l.largestValue;
            if (!t.views.statistics.showColorRangeLabels) {
                o.parentNode.removeChild(o);
            }
            for (const n in l.types) {
                if (l.types.hasOwnProperty(n)) {
                    $(parseInt(n), r, l.types[n], t, a, e);
                    const i = de(a, parseInt(n));
                    if (t.views.statistics.showColorRangeLabels) {
                        if (!t.views.statistics.useColorRangeNamesForLabels || !Is.defined(i) || !Is.definedString(i.name)) {
                            DomElement.createWithHTML(o, "div", "range-name", `${n}${"+"}`);
                        } else {
                            DomElement.createWithHTML(o, "div", "range-name", i.name);
                        }
                    }
                }
            }
            if (t.views.statistics.showInReverseOrder) {
                DomElement.reverseChildrenOrder(r);
                DomElement.reverseChildrenOrder(o);
            }
            if (t.views.statistics.keepScrollPositions) {
                t._currentView.statisticsContents.scrollLeft = t._currentView.statisticsContentsScrollLeft;
            }
        }
    }
    function $(e, t, n, i, o, s) {
        const r = DomElement.create(t, "div", "range-line");
        const a = de(o, e);
        const l = n * s;
        r.style.height = `${l}px`;
        if (Is.defined(a) && Is.definedString(a.name)) {
            r.setAttribute(Constant.HEAT_JS_STATISTICS_COLOR_RANGE_NAME_ATTRIBUTE_NAME, a.name);
        }
        if (l <= 0) {
            r.style.visibility = "hidden";
        }
        if (i.views.statistics.showToolTips) {
            ToolTip.add(r, i, Str.friendlyNumber(n));
        }
        if (i.views.statistics.showRangeNumbers && n > 0) {
            DomElement.addClass(r, "range-line-number");
            DomElement.createWithHTML(r, "div", "count", Str.friendlyNumber(n));
        }
        if (Is.definedFunction(i.events.onStatisticClick)) {
            r.onclick = () => Trigger.customEvent(i.events.onStatisticClick, a, n, i._currentView.year);
        } else if (Is.definedFunction(i.events.onStatisticDblClick)) {
            r.ondblclick = () => Trigger.customEvent(i.events.onStatisticDblClick, a, n, i._currentView.year);
        } else {
            DomElement.addClass(r, "no-hover");
        }
        if (Is.defined(a) && ae(i, a.id)) {
            if (Is.definedString(a.statisticsCssClassName)) {
                DomElement.addClass(r, a.statisticsCssClassName);
            } else {
                DomElement.addClass(r, a.cssClassName);
            }
        }
        if (i.views.statistics.useGradients) {
            DomElement.adGradientEffect(i._currentView.element, r);
        }
    }
    function Y(e, t) {
        const n = q(e);
        const i = e._currentView.year;
        const o = t.length;
        const s = {
            types: {},
            largestValue: 0
        };
        s.types["0"] = 0;
        for (let e = 0; e < o; e++) {
            s.types[t[e].minimum.toString()] = 0;
        }
        for (let o = e.startMonth; o < 12 + e.startMonth; o++) {
            let r = o;
            let a = i;
            if (e.startMonth > 0 && o > 11) {
                r = o - 12;
                a++;
            }
            if (Is.monthVisible(e.views.statistics.monthsToShow, r)) {
                const i = DateTime.getTotalDaysInMonth(a, r);
                for (let o = 0; o < i; o++) {
                    const i = DateTime.toStorageDate(new Date(a, r, o + 1));
                    if (n.hasOwnProperty(i)) {
                        const o = DateTime.getStorageDate(i);
                        const r = new Date(parseInt(o[2]), parseInt(o[1]), parseInt(o[0]));
                        const a = DateTime.getWeekdayNumber(r) + 1;
                        if (!Is.holiday(e, r).matched && Is.dayVisible(e.views.statistics.daysToShow, a)) {
                            const o = ue(e, t, n[i]);
                            if (!Is.defined(o)) {
                                s.types["0"]++;
                            } else {
                                if (!s.types.hasOwnProperty(o.minimum.toString())) {
                                    s.types[o.minimum.toString()] = 0;
                                }
                                s.types[o.minimum]++;
                                s.largestValue = Math.max(s.largestValue, s.types[o.minimum]);
                            }
                        }
                    }
                }
            }
        }
        return s;
    }
    function P(t) {
        const i = DomElement.create(t._currentView.element, "div", "guide");
        const o = DomElement.create(i, "div", "map-types");
        let s = 0;
        for (const i in n[t._currentView.element.id].typeData[e.text.unknownTrendText]) {
            if (n[t._currentView.element.id].typeData[e.text.unknownTrendText].hasOwnProperty(i)) {
                s++;
                break;
            }
        }
        if (n[t._currentView.element.id].totalTypes > 1) {
            if (Is.definedString(t.description.text)) {
                const e = DomElement.create(t._currentView.element, "div", "description", i);
                G(t, e);
            }
            for (const i in n[t._currentView.element.id].typeData) {
                if (i !== e.text.unknownTrendText || s > 0) {
                    if (s === 0 && t._currentView.type === e.text.unknownTrendText) {
                        t._currentView.type = i;
                    }
                    j(t, o, i);
                }
            }
        } else {
            G(t, o);
        }
        if (t.guide.enabled) {
            const n = DomElement.create(i, "div", "map-toggles");
            if (t.guide.showLessAndMoreLabels) {
                let i = DomElement.createWithHTML(n, "div", "less-text", e.text.lessText);
                if (t.guide.colorRangeTogglesEnabled) {
                    i.onclick = () => le(t, false);
                } else {
                    DomElement.addClass(i, "no-click");
                }
            }
            const o = DomElement.create(n, "div", "days");
            const s = me(t);
            const r = s.length;
            for (let e = 0; e < r; e++) {
                U(t, o, s[e]);
            }
            if (t.guide.showLessAndMoreLabels) {
                const i = DomElement.createWithHTML(n, "div", "more-text", e.text.moreText);
                if (t.guide.colorRangeTogglesEnabled) {
                    i.onclick = () => le(t, true);
                } else {
                    DomElement.addClass(i, "no-click");
                }
            }
        }
    }
    function j(e, t, n) {
        const i = DomElement.createWithHTML(t, "button", "type", n);
        if (e._currentView.type === n) {
            DomElement.addClass(i, "active");
        }
        i.onclick = () => {
            if (e._currentView.type !== n) {
                e._currentView.type = n;
                Trigger.customEvent(e.events.onTypeSwitch, n);
                l(e);
            }
        };
    }
    function U(e, t, n) {
        const i = DomElement.create(t, "div");
        i.className = "day";
        if (e.guide.showToolTips) {
            ToolTip.add(i, e, n.tooltipText);
        }
        if (ae(e, n.id)) {
            if (e._currentView.view === 1 && Is.definedString(n.mapCssClassName)) {
                DomElement.addClass(i, n.mapCssClassName);
            } else if (e.views.chart.enabled && e._currentView.view === 2 && Is.definedString(n.chartCssClassName)) {
                DomElement.addClass(i, n.chartCssClassName);
            } else if (e.views.statistics.enabled && e._currentView.view === 4 && Is.definedString(n.statisticsCssClassName)) {
                DomElement.addClass(i, n.statisticsCssClassName);
            } else {
                DomElement.addClass(i, n.cssClassName);
            }
        }
        if (e.guide.showNumbersInGuide) {
            DomElement.addClass(i, "day-number");
            i.innerHTML = `${n.minimum}${"+"}`;
        }
        if (e.guide.colorRangeTogglesEnabled) {
            i.onclick = () => ce(e, n.id);
        } else {
            DomElement.addClass(i, "no-hover");
        }
    }
    function G(e, t) {
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
    function J(t, n, i, o, s) {
        if (Is.definedFunction(t.events.onDayToolTipRender)) {
            ToolTip.add(n, t, Trigger.customEvent(t.events.onDayToolTipRender, i, o));
        } else {
            let o = DateTime.getCustomFormattedDateText(e, s, i);
            if (t.showHolidaysInDayToolTips) {
                let e = Is.holiday(t, i);
                if (e.matched && Is.definedString(e.name)) {
                    o += `${":"}${" "}${e.name}`;
                }
            }
            ToolTip.add(n, t, o);
        }
    }
    function z(e, t, n) {
        e._currentView.view = t;
        Trigger.customEvent(e.events.onViewSwitch, n);
        l(e, false, true);
    }
    function X(t, i, o = true) {
        n[t] = {
            options: i,
            typeData: {},
            totalTypes: 1
        };
        n[t].typeData[e.text.unknownTrendText] = {};
        if (o && !i._currentView.isInFetchMode) {
            te(i);
        }
    }
    function q(e) {
        return n[e._currentView.element.id].typeData[e._currentView.type];
    }
    function K(e) {
        let t = [];
        if (e.showOnlyDataForYearsAvailable) {
            let n = q(e);
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
    function Q(e, t) {
        return e.yearsToHide.indexOf(t) === -1 && (e._currentView.yearsAvailable.length === 0 || e._currentView.yearsAvailable.indexOf(t) > -1);
    }
    function Z(e, t) {
        return e._currentView.yearsAvailable.length > 0 && t <= e._currentView.yearsAvailable[0];
    }
    function ee(e, t) {
        return e._currentView.yearsAvailable.length > 0 && t >= e._currentView.yearsAvailable[e._currentView.yearsAvailable.length - 1];
    }
    function te(t) {
        if (t.useLocalStorageForData && window.localStorage) {
            const i = window.localStorage.length;
            const s = t._currentView.element.id;
            for (let t = 0; t < i; t++) {
                const i = window.localStorage.key(t);
                if (Str.startsWithAnyCase(i, o)) {
                    const t = window.localStorage.getItem(i);
                    const o = Default2.getObjectFromString(t, e);
                    if (o.parsed) {
                        n[s].typeData = o.object;
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
    function ne(e) {
        if (e.useLocalStorageForData && window.localStorage) {
            const t = e._currentView.element.id;
            ie(e);
            const i = JSON.stringify(n[t].typeData);
            window.localStorage.setItem(o + t, i);
        }
    }
    function ie(e) {
        if (e.useLocalStorageForData && window.localStorage) {
            const t = window.localStorage.length;
            const n = [];
            const i = e._currentView.element.id;
            for (let e = 0; e < t; e++) {
                if (Str.startsWithAnyCase(window.localStorage.key(e), o + i)) {
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
                se(e);
            }
            if (e._currentView.isInFetchModeTimer === 0) {
                e._currentView.isInFetchModeTimer = setInterval(() => {
                    se(e);
                    l(e);
                }, e.dataFetchDelay);
            }
        }
    }
    function se(t) {
        const i = t._currentView.element.id;
        const o = Trigger.customEvent(t.events.onDataFetch, i);
        if (Is.definedObject(o)) {
            X(i, t, false);
            for (const t in o) {
                if (o.hasOwnProperty(t)) {
                    if (!n[i].typeData[e.text.unknownTrendText].hasOwnProperty(t)) {
                        n[i].typeData[e.text.unknownTrendText][t] = 0;
                    }
                    n[i].typeData[e.text.unknownTrendText][t] += o[t];
                }
            }
        }
    }
    function re() {
        for (const e in n) {
            if (n.hasOwnProperty(e)) {
                const t = n[e].options;
                c(t, false);
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
    function ae(e, t) {
        let n = false;
        if (t === i) {
            n = true;
        } else {
            const i = e.colorRanges.length;
            for (let o = 0; o < i; o++) {
                const i = e.colorRanges[o];
                if (i.id === t && Default2.getBoolean(i.visible, true)) {
                    n = true;
                    break;
                }
            }
        }
        return n;
    }
    function le(e, t) {
        const n = e.colorRanges.length;
        for (let i = 0; i < n; i++) {
            e.colorRanges[i].visible = t;
            Trigger.customEvent(e.events.onColorRangeTypeToggle, e.colorRanges[i].id, t);
        }
        l(e);
    }
    function ce(e, t) {
        const n = e.colorRanges.length;
        for (let i = 0; i < n; i++) {
            const n = e.colorRanges[i];
            if (n.id === t) {
                n.visible = !Default2.getBoolean(n.visible, true);
                Trigger.customEvent(e.events.onColorRangeTypeToggle, n.id, n.visible);
                l(e);
                break;
            }
        }
    }
    function ue(e, t, n, o = null) {
        let s = null;
        if (Is.defined(o) && Is.holiday(e, o).matched) {
            s = {
                cssClassName: "holiday",
                id: i,
                visible: true,
                minimum: 0
            };
        }
        if (!Is.defined(s)) {
            const e = t.length;
            for (let i = 0; i < e; i++) {
                const e = t[i];
                if (n >= e.minimum) {
                    s = e;
                } else {
                    break;
                }
            }
        }
        return s;
    }
    function de(e, t) {
        const n = e.length;
        let i = null;
        for (let o = 0; o < n; o++) {
            const n = e[o];
            if (t.toString() === n.minimum.toString()) {
                i = n;
                break;
            }
        }
        return i;
    }
    function me(e) {
        return e.colorRanges.sort(function(e, t) {
            return e.minimum - t.minimum;
        });
    }
    function fe(e, t) {
        if (t.allowFileImports && !t._currentView.isInFetchMode) {
            e.ondragover = DomElement.cancelBubble;
            e.ondragenter = DomElement.cancelBubble;
            e.ondragleave = DomElement.cancelBubble;
            e.ondrop = e => {
                DomElement.cancelBubble(e);
                if (Is.defined(window.FileReader) && e.dataTransfer.files.length > 0) {
                    we(e.dataTransfer.files, t);
                }
            };
        }
    }
    function he(e) {
        const t = DomElement.createWithNoContainer("input");
        t.type = "file";
        t.accept = ".json, .txt, .csv, .tsv, .md, .yaml";
        t.multiple = true;
        t.onchange = () => we(t.files, e);
        t.click();
    }
    function we(t, n) {
        const i = t.length;
        const o = [];
        const s = q(n);
        const r = (e, t) => {
            o.push(e);
            for (const e in t) {
                if (t.hasOwnProperty(e)) {
                    if (!s.hasOwnProperty(e)) {
                        s[e] = 0;
                    }
                    s[e] += t[e];
                }
            }
            if (o.length === i) {
                Trigger.customEvent(n.events.onImport, n._currentView.element);
                l(n);
            }
        };
        for (let n = 0; n < i; n++) {
            const i = t[n];
            const o = i.name.split(".").pop().toLowerCase();
            if (o === "json") {
                Import.File.json(i, r, e);
            } else if (o === "txt") {
                Import.File.txt(i, r);
            } else if (o === "csv") {
                Import.File.csv(i, r);
            } else if (o === "tsv") {
                Import.File.tsv(i, r);
            } else if (o === "md") {
                Import.File.md(i, r);
            } else if (o === "yaml") {
                Import.File.yaml(i, r);
            }
        }
    }
    function ge(t, n = null, i = null, o = true) {
        let s = null;
        const r = Export.File.mimeType(n);
        const a = Default2.getString(n, t.exportType).toLowerCase();
        const l = ye(t, o);
        if (a === "csv") {
            s = Export.Contents.csv(l, e);
        } else if (a === "json") {
            s = Export.Contents.json(l);
        } else if (a === "xml") {
            s = Export.Contents.xml(l);
        } else if (a === "txt") {
            s = Export.Contents.txt(l);
        } else if (a === "html") {
            s = Export.Contents.html(l, e);
        } else if (a === "md") {
            s = Export.Contents.md(l);
        } else if (a === "tsv") {
            s = Export.Contents.tsv(l);
        } else if (a === "yaml") {
            s = Export.Contents.yaml(l, e);
        }
        if (Is.definedString(s)) {
            const n = DomElement.create(document.body, "a");
            n.style.display = "none";
            n.setAttribute("target", "_blank");
            n.setAttribute("href", `data:${r};charset=utf-8,${encodeURIComponent(s)}`);
            n.setAttribute("download", Export.File.filename(e, t, i, a));
            n.click();
            document.body.removeChild(n);
            Trigger.customEvent(t.events.onExport, t._currentView.element);
        }
    }
    function ye(e, t) {
        const n = {};
        const i = q(e);
        if (t) {
            const t = e._currentView.year;
            const o = Visible.days(e);
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
                        if (Is.dayVisible(o, r)) {
                            if (i.hasOwnProperty(s)) {
                                n[s] = i[s];
                            }
                        }
                    }
                }
            }
        } else {
            const e = [];
            for (const t in i) {
                if (i.hasOwnProperty(t)) {
                    e.push(t);
                }
            }
            e.sort();
            const t = e.length;
            for (let o = 0; o < t; o++) {
                const t = e[o];
                if (i.hasOwnProperty(t)) {
                    n[t] = i[t];
                }
            }
        }
        return n;
    }
    function De(e, t = true) {
        let n = true;
        let i = e._currentView.year;
        i--;
        while (!Q(e, i)) {
            if (Z(e, i)) {
                n = false;
                break;
            }
            i--;
        }
        if (n) {
            e._currentView.year = i;
            l(e);
            if (t) {
                Trigger.customEvent(e.events.onBackYear, e._currentView.year);
            }
        }
    }
    function pe(e, t = true) {
        let n = true;
        let i = e._currentView.year;
        i++;
        while (!Q(e, i)) {
            if (ee(e, i)) {
                n = false;
                break;
            }
            i++;
        }
        if (n) {
            e._currentView.year = i;
            l(e);
            if (t) {
                Trigger.customEvent(e.events.onNextYear, e._currentView.year);
            }
        }
    }
    function ve(e) {
        e._currentView.element.innerHTML = "";
        DomElement.removeClass(e._currentView.element, "heat-js");
        ToolTip.assignToEvents(e, false);
        document.body.removeChild(e._currentView.tooltip);
        if (e._currentView.isInFetchMode && Is.defined(e._currentView.isInFetchModeTimer)) {
            clearInterval(e._currentView.isInFetchModeTimer);
        }
        Trigger.customEvent(e.events.onDestroy, e._currentView.element);
    }
    function Te() {
        if (e.observationMode) {
            if (!Is.defined(t)) {
                t = new MutationObserver((e, t) => {
                    xe.renderAll();
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
    const xe = {
        addDates: function(t, i, o = null, s = true) {
            if (Is.definedString(t) && Is.definedArray(i) && n.hasOwnProperty(t)) {
                const r = n[t].options;
                if (!r._currentView.isInFetchMode) {
                    o = Default2.getString(o, e.text.unknownTrendText);
                    const n = i.length;
                    for (let e = 0; e < n; e++) {
                        xe.addDate(t, i[e], o, false);
                    }
                    if (s) {
                        l(r, true);
                    }
                }
            }
            return xe;
        },
        addDate: function(t, i, o = null, s = true) {
            if (Is.definedString(t) && Is.definedDate(i) && n.hasOwnProperty(t)) {
                const r = n[t].options;
                if (!r._currentView.isInFetchMode) {
                    o = Default2.getString(o, e.text.unknownTrendText);
                    const a = DateTime.toStorageDate(i);
                    if (!n[t].typeData.hasOwnProperty(o)) {
                        n[t].typeData[o] = {};
                        n[t].totalTypes++;
                    }
                    if (!n[t].typeData[o].hasOwnProperty(a)) {
                        n[t].typeData[o][a] = 0;
                    }
                    n[t].typeData[o][a]++;
                    Trigger.customEvent(r.events.onAdd, r._currentView.element);
                    if (s) {
                        l(r, true);
                    }
                }
            }
            return xe;
        },
        updateDate: function(t, i, o, s = null, r = true) {
            if (Is.definedString(t) && Is.definedDate(i) && n.hasOwnProperty(t)) {
                const a = n[t].options;
                if (!a._currentView.isInFetchMode && o > 0) {
                    const c = DateTime.toStorageDate(i);
                    if (n[t].typeData.hasOwnProperty(s)) {
                        s = Default2.getString(s, e.text.unknownTrendText);
                        n[t].typeData[s][c] = o;
                        Trigger.customEvent(a.events.onUpdate, a._currentView.element);
                        if (r) {
                            l(a, true);
                        }
                    }
                }
            }
            return xe;
        },
        removeDates: function(t, i, o = null, s = true) {
            if (Is.definedString(t) && Is.definedArray(i) && n.hasOwnProperty(t)) {
                const r = n[t].options;
                if (!r._currentView.isInFetchMode) {
                    o = Default2.getString(o, e.text.unknownTrendText);
                    const n = i.length;
                    for (let e = 0; e < n; e++) {
                        xe.removeDate(t, i[e], o, false);
                    }
                    if (s) {
                        l(r, true);
                    }
                }
            }
            return xe;
        },
        removeDate: function(t, i, o = null, s = true) {
            if (Is.definedString(t) && Is.definedDate(i) && n.hasOwnProperty(t)) {
                const r = n[t].options;
                if (!r._currentView.isInFetchMode) {
                    const a = DateTime.toStorageDate(i);
                    if (n[t].typeData.hasOwnProperty(o) && n[t].typeData[o].hasOwnProperty(a)) {
                        o = Default2.getString(o, e.text.unknownTrendText);
                        if (n[t].typeData[o][a] > 0) {
                            n[t].typeData[o][a]--;
                        }
                        Trigger.customEvent(r.events.onRemove, r._currentView.element);
                        if (s) {
                            l(r, true);
                        }
                    }
                }
            }
            return xe;
        },
        clearDate: function(t, i, o = null, s = true) {
            if (Is.definedString(t) && Is.definedDate(i) && n.hasOwnProperty(t)) {
                const r = n[t].options;
                if (!r._currentView.isInFetchMode) {
                    const a = DateTime.toStorageDate(i);
                    if (n[t].typeData.hasOwnProperty(o) && n[t].typeData[o].hasOwnProperty(a)) {
                        o = Default2.getString(o, e.text.unknownTrendText);
                        delete n[t].typeData[o][a];
                        Trigger.customEvent(r.events.onClear, r._currentView.element);
                        if (s) {
                            l(r, true);
                        }
                    }
                }
            }
            return xe;
        },
        resetAll: function(e = true) {
            for (const t in n) {
                if (n.hasOwnProperty(t)) {
                    xe.reset(t, e);
                }
            }
            return xe;
        },
        reset: function(t, i = true) {
            if (Is.definedString(t) && n.hasOwnProperty(t)) {
                const o = n[t].options;
                if (!o._currentView.isInFetchMode) {
                    o._currentView.type = e.text.unknownTrendText;
                    X(t, o, false);
                    Trigger.customEvent(o.events.onReset, o._currentView.element);
                    if (i) {
                        l(o, true);
                    }
                }
            }
            return xe;
        },
        import: function(e, t = null) {
            if (Is.definedString(e) && n.hasOwnProperty(e)) {
                if (Is.definedArray(t)) {
                    we(t, n[e].options);
                } else {
                    he(n[e].options);
                }
            }
            return xe;
        },
        export: function(e, t = null) {
            if (Is.definedString(e) && n.hasOwnProperty(e)) {
                const i = n[e].options;
                ge(i, t, null, i.exportOnlyDataBeingViewed);
            }
            return xe;
        },
        refresh: function(e) {
            if (Is.definedString(e) && n.hasOwnProperty(e)) {
                const t = n[e].options;
                l(t, true);
                Trigger.customEvent(t.events.onRefresh, t._currentView.element);
            }
            return xe;
        },
        refreshAll: function() {
            for (const e in n) {
                if (n.hasOwnProperty(e)) {
                    const t = n[e].options;
                    l(t, true);
                    Trigger.customEvent(t.events.onRefresh, t._currentView.element);
                }
            }
            return xe;
        },
        setYear: function(e, t) {
            if (Is.definedString(e) && Is.definedNumber(t) && n.hasOwnProperty(e)) {
                const i = n[e].options;
                i._currentView.year = t;
                if (!Q(i, i._currentView.year)) {
                    pe(i, false);
                } else {
                    l(i);
                }
                Trigger.customEvent(i.events.onSetYear, i._currentView.year);
            }
            return xe;
        },
        setYearToHighest: function(e) {
            if (Is.definedString(e) && n.hasOwnProperty(e)) {
                const t = n[e].options;
                const i = q(t);
                let o = 0;
                for (const e in i) {
                    if (i.hasOwnProperty(e)) {
                        o = Math.max(o, parseInt(DateTime.getStorageDateYear(e)));
                    }
                }
                if (o > 0) {
                    t._currentView.year = o;
                    if (!Q(t, t._currentView.year)) {
                        pe(t, false);
                    } else {
                        l(t);
                    }
                    Trigger.customEvent(t.events.onSetYear, t._currentView.year);
                }
            }
            return xe;
        },
        setYearToLowest: function(e) {
            if (Is.definedString(e) && n.hasOwnProperty(e)) {
                const t = n[e].options;
                const i = q(t);
                let o = 9999;
                for (const e in i) {
                    if (i.hasOwnProperty(e)) {
                        o = Math.min(o, parseInt(DateTime.getStorageDateYear(e)));
                    }
                }
                if (o < 9999) {
                    t._currentView.year = o;
                    if (!Q(t, t._currentView.year)) {
                        De(t, false);
                    } else {
                        l(t);
                    }
                    Trigger.customEvent(t.events.onSetYear, t._currentView.year);
                }
            }
            return xe;
        },
        moveToPreviousYear: function(e) {
            if (Is.definedString(e) && n.hasOwnProperty(e)) {
                De(n[e].options);
            }
            return xe;
        },
        moveToNextYear: function(e) {
            if (Is.definedString(e) && n.hasOwnProperty(e)) {
                pe(n[e].options);
            }
            return xe;
        },
        moveToCurrentYear: function(e) {
            if (Is.definedString(e) && n.hasOwnProperty(e)) {
                const t = n[e].options;
                t._currentView.year = (new Date).getFullYear();
                if (!Q(t, t._currentView.year)) {
                    pe(t, false);
                } else {
                    l(t);
                }
                Trigger.customEvent(t.events.onSetYear, t._currentView.year);
            }
            return xe;
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
                a(Binding.Options.getForNewInstance(e, n, t));
            }
            return xe;
        },
        renderAll: function() {
            s();
            return xe;
        },
        switchView: function(e, t) {
            if (Is.definedString(e) && Is.definedString(t) && n.hasOwnProperty(e)) {
                const i = n[e].options;
                let o;
                if (t.toLowerCase() === "map") {
                    o = 1;
                } else if (t.toLowerCase() === "chart") {
                    o = 2;
                } else if (t.toLowerCase() === "days") {
                    o = 3;
                } else if (t.toLowerCase() === "months") {
                    o = 5;
                } else if (t.toLowerCase() === "statistics") {
                    o = 4;
                } else {
                    o = 1;
                }
                if (Is.definedNumber(o)) {
                    z(i, o, t);
                }
            }
            return xe;
        },
        switchType: function(e, t) {
            if (Is.definedString(e) && Is.definedString(t) && n.hasOwnProperty(e) && n[e].typeData.hasOwnProperty(t)) {
                const i = n[e].options;
                if (i._currentView.type !== t) {
                    i._currentView.type = t;
                    Trigger.customEvent(i.events.onTypeSwitch, t);
                    l(i);
                }
            }
            return xe;
        },
        updateOptions: function(e, t) {
            if (Is.definedString(e) && Is.definedObject(t) && n.hasOwnProperty(e)) {
                const i = n[e].options;
                const o = Binding.Options.get(t);
                let s = false;
                for (const e in o) {
                    if (o.hasOwnProperty(e) && i.hasOwnProperty(e) && i[e] !== o[e]) {
                        i[e] = o[e];
                        s = true;
                    }
                }
                if (s) {
                    l(i, true);
                    Trigger.customEvent(i.events.onRefresh, i._currentView.element);
                    Trigger.customEvent(i.events.onOptionsUpdate, i._currentView.element, i);
                }
            }
            return xe;
        },
        getActiveView: function(e) {
            let t = "";
            if (Is.definedString(e) && n.hasOwnProperty(e)) {
                const i = n[e].options;
                if (i._currentView.view === 1) {
                    t = "map";
                } else if (i._currentView.view === 2) {
                    t = "chart";
                } else if (i._currentView.view === 3) {
                    t = "days";
                } else if (i._currentView.view === 5) {
                    t = "months";
                } else if (i._currentView.view === 4) {
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
                    ve(n[e].options);
                }
            }
            n = {};
            return xe;
        },
        destroy: function(e) {
            if (Is.definedString(e) && n.hasOwnProperty(e)) {
                ve(n[e].options);
                delete n[e];
            }
            return xe;
        },
        setConfiguration: function(t, n = true) {
            if (Is.definedObject(t)) {
                let i = false;
                const o = e;
                for (const n in t) {
                    if (t.hasOwnProperty(n) && e.hasOwnProperty(n) && o[n] !== t[n]) {
                        o[n] = t[n];
                        i = true;
                    }
                }
                if (i) {
                    e = Config.Options.get(o);
                    Te();
                    if (n) {
                        xe.refreshAll();
                    }
                }
            }
            return xe;
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
            Te();
            s();
        });
        window.addEventListener("pagehide", () => re());
        if (!Is.defined(window.$heat)) {
            window.$heat = xe;
        }
    })();
})();//# sourceMappingURL=heat.js.map