"use strict";

var Constant;

(e => {
    e.HEAT_JS_ATTRIBUTE_NAME = "data-heat-js";
})(Constant || (Constant = {}));

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
    function a(e) {
        return t(e) && typeof e === "string";
    }
    e.definedString = a;
    function i(e) {
        return t(e) && typeof e === "function";
    }
    e.definedFunction = i;
    function r(e) {
        return t(e) && typeof e === "number";
    }
    e.definedNumber = r;
    function s(e) {
        return n(e) && e instanceof Array;
    }
    e.definedArray = s;
    function l(e) {
        return n(e) && e instanceof Date;
    }
    e.definedDate = l;
    function c(e, t = 1) {
        return !s(e) || e.length < t;
    }
    e.invalidOptionArray = c;
})(Is || (Is = {}));

var Data;

(e => {
    let t;
    (e => {
        function t() {
            const e = [];
            for (let t = 0; t < 32; t++) {
                if (t === 8 || t === 12 || t === 16 || t === 20) {
                    e.push("-");
                }
                const n = Math.floor(Math.random() * 16).toString(16);
                e.push(n);
            }
            return e.join("");
        }
        e.newGuid = t;
        function n(e) {
            const t = e.toString();
            return t.length === 1 ? "0" + t : t;
        }
        e.padNumber = n;
        function o(e, t) {
            return e.substring(0, t.length).toLowerCase() === t.toLowerCase();
        }
        e.startsWithAnyCase = o;
    })(t = e.String || (e.String = {}));
    function n(e, t) {
        return typeof e === "string" ? e : t;
    }
    e.getDefaultAnyString = n;
    function o(e, t) {
        return Is.definedString(e) ? e : t;
    }
    e.getDefaultString = o;
    function a(e, t) {
        return Is.definedBoolean(e) ? e : t;
    }
    e.getDefaultBoolean = a;
    function i(e, t) {
        return Is.definedNumber(e) ? e : t;
    }
    e.getDefaultNumber = i;
    function r(e, t) {
        return Is.definedFunction(e) ? e : t;
    }
    e.getDefaultFunction = r;
    function s(e, t) {
        return Is.definedArray(e) ? e : t;
    }
    e.getDefaultArray = s;
    function l(e, t) {
        return Is.definedObject(e) ? e : t;
    }
    e.getDefaultObject = l;
    function c(e, t) {
        let n = t;
        if (Is.definedString(e)) {
            const o = e.toString().split(" ");
            if (o.length === 0) {
                e = t;
            } else {
                n = o;
            }
        } else {
            n = s(e, t);
        }
        return n;
    }
    e.getDefaultStringOrArray = c;
})(Data || (Data = {}));

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
        const a = t.toLowerCase();
        const i = a === "text";
        let r = i ? document.createTextNode("") : document.createElement(a);
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
    function o(e, t, o, a, i = null) {
        const r = n(e, t, o, i);
        r.innerHTML = a;
        return r;
    }
    e.createWithHTML = o;
    function a(e, t, n = false) {
        const o = getComputedStyle(e);
        let a = o.getPropertyValue(t);
        if (n) {
            a = parseFloat(a);
        }
        return a;
    }
    e.getStyleValueByName = a;
    function i(e, t) {
        e.classList.add(t);
    }
    e.addClass = i;
    function r(e, t) {
        e.classList.remove(t);
    }
    e.removeClass = r;
    function s(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    e.cancelBubble = s;
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
        const a = l();
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
        if (n < a.left) {
            n = e.pageX + 1;
        }
        if (o < a.top) {
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
    function d(e, t) {
        const a = n(e, "div");
        const i = n(a, "label", "checkbox");
        const r = n(i, "input");
        r.type = "checkbox";
        n(i, "span", "check-mark");
        o(i, "span", "text", t);
        return r;
    }
    e.createCheckBox = d;
})(DomElement || (DomElement = {}));

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
    function a(e, t, a) {
        let i = t;
        const r = n(a);
        i = i.replace("{dddd}", e.text.dayNames[r]);
        i = i.replace("{dd}", Data.String.padNumber(a.getDate()));
        i = i.replace("{d}", a.getDate().toString());
        i = i.replace("{o}", o(e, a.getDate()));
        i = i.replace("{mmmm}", e.text.monthNames[a.getMonth()]);
        i = i.replace("{mm}", Data.String.padNumber(a.getMonth() + 1));
        i = i.replace("{m}", (a.getMonth() + 1).toString());
        i = i.replace("{yyyy}", a.getFullYear().toString());
        i = i.replace("{yyy}", a.getFullYear().toString().substring(1));
        i = i.replace("{yy}", a.getFullYear().toString().substring(2));
        i = i.replace("{y}", parseInt(a.getFullYear().toString().substring(2)).toString());
        return i;
    }
    e.getCustomFormattedDateText = a;
    function i(e) {
        return e.getFullYear() + "-" + Data.String.padNumber(e.getMonth() + 1) + "-" + Data.String.padNumber(e.getDate());
    }
    e.toStorageDate = i;
    function r(e) {
        return e.split("-");
    }
    e.getStorageDate = r;
    function s(e) {
        return e.split("-")[0];
    }
    e.getStorageDateYear = s;
})(DateTime || (DateTime = {}));

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
        n("mousemove", (() => {
            i(e);
        }));
        o("scroll", (() => {
            i(e);
        }));
    }
    e.assignToEvents = n;
    function o(e, t, n) {
        if (e !== null) {
            e.onmousemove = e => {
                a(e, t, n);
            };
        }
    }
    e.add = o;
    function a(e, t, n) {
        DomElement.cancelBubble(e);
        i(t);
        t._currentView.tooltipTimer = setTimeout((() => {
            t._currentView.tooltip.innerHTML = n;
            t._currentView.tooltip.style.display = "block";
            DomElement.showElementAtMousePosition(e, t._currentView.tooltip);
        }), t.tooltip.delay);
    }
    e.show = a;
    function i(e) {
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
    e.hide = i;
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

var binding;

(e => {
    let t;
    (e => {
        const t = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
        const n = [ 1, 2, 3, 4, 5, 6, 7 ];
        function o(e) {
            let t = Data.getDefaultObject(e, {});
            t.views = Data.getDefaultObject(t.views, {});
            t.exportOnlyYearBeingViewed = Data.getDefaultBoolean(t.exportOnlyYearBeingViewed, true);
            t.year = Data.getDefaultNumber(t.year, (new Date).getFullYear());
            t.view = Data.getDefaultString(t.view, "map");
            t.exportType = Data.getDefaultString(t.exportType, "csv");
            t.useLocalStorageForData = Data.getDefaultBoolean(t.useLocalStorageForData, false);
            t.allowFileImports = Data.getDefaultBoolean(t.allowFileImports, true);
            t.yearsToHide = Data.getDefaultArray(t.yearsToHide, []);
            t.dataFetchDelay = Data.getDefaultNumber(t.dataFetchDelay, 6e4);
            t.showOnlyDataForYearsAvailable = Data.getDefaultBoolean(t.showOnlyDataForYearsAvailable, false);
            t.showHolidaysInDayToolTips = Data.getDefaultBoolean(t.showHolidaysInDayToolTips, false);
            t = a(t);
            t = i(t);
            t = r(t);
            t = s(t);
            t = l(t);
            t = c(t);
            t = u(t);
            t = d(t);
            t = m(t);
            t = f(t);
            t = g(t);
            return t;
        }
        e.get = o;
        function a(e) {
            if (Is.definedArray(e.colorRanges)) {
                const t = e.colorRanges.length;
                for (let n = 0; n < t; n++) {
                    const t = e.colorRanges[n];
                    t.id = Data.getDefaultString(t.id, Data.String.newGuid());
                    t.name = Data.getDefaultString(t.name, "");
                    t.minimum = Data.getDefaultNumber(t.minimum, 0);
                    t.cssClassName = Data.getDefaultString(t.cssClassName, "");
                    t.mapCssClassName = Data.getDefaultString(t.mapCssClassName, "");
                    t.chartCssClassName = Data.getDefaultString(t.chartCssClassName, "");
                    t.statisticsCssClassName = Data.getDefaultString(t.statisticsCssClassName, "");
                    t.tooltipText = Data.getDefaultString(t.tooltipText, "");
                    t.visible = Data.getDefaultBoolean(t.visible, true);
                }
            } else {
                e.colorRanges = [ {
                    id: Data.String.newGuid(),
                    name: "Day Color 1",
                    minimum: 10,
                    cssClassName: "day-color-1",
                    tooltipText: "Day Color 1",
                    visible: true
                }, {
                    id: Data.String.newGuid(),
                    name: "Day Color 2",
                    minimum: 15,
                    cssClassName: "day-color-2",
                    tooltipText: "Day Color 2",
                    visible: true
                }, {
                    id: Data.String.newGuid(),
                    name: "Day Color 3",
                    minimum: 20,
                    cssClassName: "day-color-3",
                    tooltipText: "Day Color 3",
                    visible: true
                }, {
                    id: Data.String.newGuid(),
                    name: "Day Color 4",
                    minimum: 25,
                    cssClassName: "day-color-4",
                    tooltipText: "Day Color 4",
                    visible: true
                } ];
            }
            return e;
        }
        function i(e) {
            if (Is.definedArray(e.holidays)) {
                const t = e.holidays.length;
                for (let n = 0; n < t; n++) {
                    const t = e.holidays[n];
                    t.date = Data.getDefaultString(t.date, "");
                    t.name = Data.getDefaultString(t.name, "");
                    t.showInViews = Data.getDefaultBoolean(t.showInViews, true);
                }
            } else {
                e.holidays = [];
            }
            return e;
        }
        function r(e) {
            e.title = Data.getDefaultObject(e.title, {});
            e.title.text = Data.getDefaultString(e.title.text, "Heat.js");
            e.title.showText = Data.getDefaultBoolean(e.title.showText, true);
            e.title.showYearSelector = Data.getDefaultBoolean(e.title.showYearSelector, true);
            e.title.showRefreshButton = Data.getDefaultBoolean(e.title.showRefreshButton, false);
            e.title.showExportButton = Data.getDefaultBoolean(e.title.showExportButton, false);
            e.title.extraSelectionYears = Data.getDefaultNumber(e.title.extraSelectionYears, 50);
            e.title.showYearSelectionDropDown = Data.getDefaultBoolean(e.title.showYearSelectionDropDown, true);
            e.title.showImportButton = Data.getDefaultBoolean(e.title.showImportButton, false);
            e.title.showConfigurationButton = Data.getDefaultBoolean(e.title.showConfigurationButton, true);
            e.title.showTitleDropDownButton = Data.getDefaultBoolean(e.title.showTitleDropDownButton, true);
            e.title.showTitleDropDownHeaders = Data.getDefaultBoolean(e.title.showTitleDropDownHeaders, true);
            return e;
        }
        function s(e) {
            e.description = Data.getDefaultObject(e.description, {});
            e.description.text = Data.getDefaultString(e.description.text, "");
            e.description.url = Data.getDefaultString(e.description.url, "");
            e.description.urlTarget = Data.getDefaultString(e.description.urlTarget, "_blank");
            return e;
        }
        function l(e) {
            e.guide = Data.getDefaultObject(e.guide, {});
            e.guide.enabled = Data.getDefaultBoolean(e.guide.enabled, true);
            e.guide.colorRangeTogglesEnabled = Data.getDefaultBoolean(e.guide.colorRangeTogglesEnabled, true);
            e.guide.showLessAndMoreLabels = Data.getDefaultBoolean(e.guide.showLessAndMoreLabels, true);
            e.guide.showNumbersInGuide = Data.getDefaultBoolean(e.guide.showNumbersInGuide, false);
            return e;
        }
        function c(e) {
            e.tooltip = Data.getDefaultObject(e.tooltip, {});
            e.tooltip.delay = Data.getDefaultNumber(e.tooltip.delay, 750);
            e.tooltip.dayText = Data.getDefaultString(e.tooltip.dayText, "{d}{o} {mmmm} {yyyy}");
            return e;
        }
        function u(e) {
            e.views.map = Data.getDefaultObject(e.views.map, {});
            e.views.map.showMonthDayGaps = Data.getDefaultBoolean(e.views.map.showMonthDayGaps, true);
            e.views.map.showDayNames = Data.getDefaultBoolean(e.views.map.showDayNames, true);
            e.views.map.placeMonthNamesOnTheBottom = Data.getDefaultBoolean(e.views.map.placeMonthNamesOnTheBottom, false);
            e.views.map.showDayNumbers = Data.getDefaultBoolean(e.views.map.showDayNumbers, false);
            e.views.map.showMonthNames = Data.getDefaultBoolean(e.views.map.showMonthNames, true);
            e.views.map.showDaysInReverseOrder = Data.getDefaultBoolean(e.views.map.showDaysInReverseOrder, false);
            e.views.map.showNoDataMessageWhenDataIsNotAvailable = Data.getDefaultBoolean(e.views.map.showNoDataMessageWhenDataIsNotAvailable, false);
            e.views.map.showMinimalDayNames = Data.getDefaultBoolean(e.views.map.showMinimalDayNames, false);
            e.views.map.showMonthsInReverseOrder = Data.getDefaultBoolean(e.views.map.showMonthsInReverseOrder, false);
            e.views.map.keepScrollPositions = Data.getDefaultBoolean(e.views.map.keepScrollPositions, false);
            if (Is.invalidOptionArray(e.views.map.monthsToShow)) {
                e.views.map.monthsToShow = t;
            }
            if (Is.invalidOptionArray(e.views.map.daysToShow)) {
                e.views.map.daysToShow = n;
            }
            return e;
        }
        function d(e) {
            e.views.chart = Data.getDefaultObject(e.views.chart, {});
            e.views.chart.enabled = Data.getDefaultBoolean(e.views.chart.enabled, true);
            e.views.chart.showChartYLabels = Data.getDefaultBoolean(e.views.chart.showChartYLabels, true);
            e.views.chart.showMonthNames = Data.getDefaultBoolean(e.views.chart.showMonthNames, true);
            e.views.chart.showLineNumbers = Data.getDefaultBoolean(e.views.chart.showLineNumbers, false);
            e.views.chart.showInReverseOrder = Data.getDefaultBoolean(e.views.chart.showInReverseOrder, false);
            e.views.chart.keepScrollPositions = Data.getDefaultBoolean(e.views.chart.keepScrollPositions, false);
            if (Is.invalidOptionArray(e.views.chart.monthsToShow)) {
                e.views.chart.monthsToShow = t;
            }
            if (Is.invalidOptionArray(e.views.chart.daysToShow)) {
                e.views.chart.daysToShow = n;
            }
            return e;
        }
        function m(e) {
            e.views.days = Data.getDefaultObject(e.views.days, {});
            e.views.days.enabled = Data.getDefaultBoolean(e.views.days.enabled, true);
            e.views.days.showChartYLabels = Data.getDefaultBoolean(e.views.days.showChartYLabels, true);
            e.views.days.showDayNames = Data.getDefaultBoolean(e.views.days.showDayNames, true);
            e.views.days.showInReverseOrder = Data.getDefaultBoolean(e.views.days.showInReverseOrder, false);
            e.views.days.showDayNumbers = Data.getDefaultBoolean(e.views.days.showDayNumbers, false);
            e.views.days.keepScrollPositions = Data.getDefaultBoolean(e.views.days.keepScrollPositions, false);
            if (Is.invalidOptionArray(e.views.days.monthsToShow)) {
                e.views.days.monthsToShow = t;
            }
            if (Is.invalidOptionArray(e.views.days.daysToShow)) {
                e.views.days.daysToShow = n;
            }
            return e;
        }
        function f(e) {
            e.views.statistics = Data.getDefaultObject(e.views.statistics, {});
            e.views.statistics.enabled = Data.getDefaultBoolean(e.views.statistics.enabled, true);
            e.views.statistics.showChartYLabels = Data.getDefaultBoolean(e.views.statistics.showChartYLabels, true);
            e.views.statistics.showColorRangeLabels = Data.getDefaultBoolean(e.views.statistics.showColorRangeLabels, true);
            e.views.statistics.useColorRangeNamesForLabels = Data.getDefaultBoolean(e.views.statistics.useColorRangeNamesForLabels, false);
            e.views.statistics.showRangeNumbers = Data.getDefaultBoolean(e.views.statistics.showRangeNumbers, false);
            e.views.statistics.showInReverseOrder = Data.getDefaultBoolean(e.views.statistics.showInReverseOrder, false);
            e.views.statistics.keepScrollPositions = Data.getDefaultBoolean(e.views.statistics.keepScrollPositions, false);
            if (Is.invalidOptionArray(e.views.statistics.monthsToShow)) {
                e.views.statistics.monthsToShow = t;
            }
            if (Is.invalidOptionArray(e.views.statistics.daysToShow)) {
                e.views.statistics.daysToShow = n;
            }
            return e;
        }
        function g(e) {
            e.events = Data.getDefaultObject(e.events, {});
            e.events.onDayClick = Data.getDefaultFunction(e.events.onDayClick, null);
            e.events.onBackYear = Data.getDefaultFunction(e.events.onBackYear, null);
            e.events.onNextYear = Data.getDefaultFunction(e.events.onNextYear, null);
            e.events.onRefresh = Data.getDefaultFunction(e.events.onRefresh, null);
            e.events.onBeforeRender = Data.getDefaultFunction(e.events.onBeforeRender, null);
            e.events.onRenderComplete = Data.getDefaultFunction(e.events.onRenderComplete, null);
            e.events.onDestroy = Data.getDefaultFunction(e.events.onDestroy, null);
            e.events.onExport = Data.getDefaultFunction(e.events.onExport, null);
            e.events.onSetYear = Data.getDefaultFunction(e.events.onSetYear, null);
            e.events.onTypeSwitch = Data.getDefaultFunction(e.events.onTypeSwitch, null);
            e.events.onDayToolTipRender = Data.getDefaultFunction(e.events.onDayToolTipRender, null);
            e.events.onAdd = Data.getDefaultFunction(e.events.onAdd, null);
            e.events.onRemove = Data.getDefaultFunction(e.events.onRemove, null);
            e.events.onReset = Data.getDefaultFunction(e.events.onReset, null);
            e.events.onViewSwitch = Data.getDefaultFunction(e.events.onViewSwitch, null);
            e.events.onColorRangeTypeToggle = Data.getDefaultFunction(e.events.onColorRangeTypeToggle, null);
            e.events.onImport = Data.getDefaultFunction(e.events.onImport, null);
            e.events.onStatisticClick = Data.getDefaultFunction(e.events.onStatisticClick, null);
            e.events.onDataFetch = Data.getDefaultFunction(e.events.onDataFetch, null);
            e.events.onClear = Data.getDefaultFunction(e.events.onClear, null);
            e.events.onUpdate = Data.getDefaultFunction(e.events.onUpdate, null);
            e.events.onOptionsUpdate = Data.getDefaultFunction(e.events.onOptionsUpdate, null);
            e.events.onWeekDayClick = Data.getDefaultFunction(e.events.onWeekDayClick, null);
            return e;
        }
    })(t = e.options || (e.options = {}));
})(binding || (binding = {}));

var Config;

(e => {
    let t;
    (e => {
        function t(e = null) {
            let t = Data.getDefaultObject(e, {});
            t.safeMode = Data.getDefaultBoolean(t.safeMode, true);
            t.domElementTypes = Data.getDefaultStringOrArray(t.domElementTypes, [ "*" ]);
            t = n(t);
            t = o(t);
            return t;
        }
        e.get = t;
        function n(e) {
            e.text = Data.getDefaultObject(e.text, {});
            e.text.stText = Data.getDefaultAnyString(e.text.stText, "st");
            e.text.ndText = Data.getDefaultAnyString(e.text.ndText, "nd");
            e.text.rdText = Data.getDefaultAnyString(e.text.rdText, "rd");
            e.text.thText = Data.getDefaultAnyString(e.text.thText, "th");
            e.text.backButtonText = Data.getDefaultAnyString(e.text.backButtonText, "Back");
            e.text.nextButtonText = Data.getDefaultAnyString(e.text.nextButtonText, "Next");
            e.text.refreshButtonText = Data.getDefaultAnyString(e.text.refreshButtonText, "Refresh");
            e.text.exportButtonText = Data.getDefaultAnyString(e.text.exportButtonText, "Export");
            e.text.lessText = Data.getDefaultAnyString(e.text.lessText, "Less");
            e.text.moreText = Data.getDefaultAnyString(e.text.moreText, "More");
            e.text.dateText = Data.getDefaultAnyString(e.text.dateText, "Date");
            e.text.countText = Data.getDefaultAnyString(e.text.countText, "Count");
            e.text.mapText = Data.getDefaultAnyString(e.text.mapText, "Map");
            e.text.chartText = Data.getDefaultAnyString(e.text.chartText, "Chart");
            e.text.noChartDataMessage = Data.getDefaultAnyString(e.text.noChartDataMessage, "There is currently no data to view.");
            e.text.statisticsText = Data.getDefaultAnyString(e.text.statisticsText, "Statistics");
            e.text.noStatisticsDataMessage = Data.getDefaultAnyString(e.text.noStatisticsDataMessage, "There are currently no statistics to view.");
            e.text.unknownTrendText = Data.getDefaultAnyString(e.text.unknownTrendText, "Unknown");
            e.text.importButtonText = Data.getDefaultAnyString(e.text.importButtonText, "Import");
            e.text.noMapDataMessage = Data.getDefaultAnyString(e.text.noMapDataMessage, "There is currently no data to view.");
            e.text.objectErrorText = Data.getDefaultAnyString(e.text.objectErrorText, "Errors in object: {{error_1}}, {{error_2}}");
            e.text.attributeNotValidErrorText = Data.getDefaultAnyString(e.text.attributeNotValidErrorText, "The attribute '{{attribute_name}}' is not a valid object.");
            e.text.attributeNotSetErrorText = Data.getDefaultAnyString(e.text.attributeNotSetErrorText, "The attribute '{{attribute_name}}' has not been set correctly.");
            e.text.closeToolTipText = Data.getDefaultAnyString(e.text.closeToolTipText, "Close");
            e.text.configurationToolTipText = Data.getDefaultAnyString(e.text.configurationToolTipText, "Configuration");
            e.text.configurationTitleText = Data.getDefaultAnyString(e.text.configurationTitleText, "Configuration");
            e.text.visibleMonthsText = Data.getDefaultAnyString(e.text.visibleMonthsText, "Visible Months");
            e.text.visibleDaysText = Data.getDefaultAnyString(e.text.visibleDaysText, "Visible Days");
            e.text.dataText = Data.getDefaultAnyString(e.text.dataText, "Data");
            e.text.colorRangesText = Data.getDefaultAnyString(e.text.colorRangesText, "Color Ranges");
            e.text.yearText = Data.getDefaultAnyString(e.text.yearText, "Year");
            e.text.daysText = Data.getDefaultAnyString(e.text.daysText, "Days");
            e.text.noDaysDataMessage = Data.getDefaultAnyString(e.text.noDaysDataMessage, "There are currently no days to view.");
            e.text.backButtonSymbolText = Data.getDefaultAnyString(e.text.backButtonSymbolText, "←");
            e.text.nextButtonSymbolText = Data.getDefaultAnyString(e.text.nextButtonSymbolText, "→");
            e.text.refreshButtonSymbolText = Data.getDefaultAnyString(e.text.refreshButtonSymbolText, "↻");
            e.text.exportButtonSymbolText = Data.getDefaultAnyString(e.text.exportButtonSymbolText, "↓");
            e.text.importButtonSymbolText = Data.getDefaultAnyString(e.text.importButtonSymbolText, "↑");
            return e;
        }
        function o(e) {
            if (Is.invalidOptionArray(e.text.monthNames, 12)) {
                e.text.monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
            }
            if (Is.invalidOptionArray(e.text.dayNames, 7)) {
                e.text.dayNames = [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ];
            }
            return e;
        }
    })(t = e.Options || (e.Options = {}));
})(Config || (Config = {}));

(() => {
    let _configuration = {};
    let _elements_Day_Width = 0;
    let _elements_DateCounts = {};
    const _internal_Name_Holiday = "HOLIDAY";
    const _local_Storage_Start_ID = "HJS_";
    function renderDisabledBackground(e) {
        e._currentView.disabledBackground = DomElement.create(e._currentView.element, "div", "disabled");
    }
    function showDisabledBackground(e) {
        if (Is.defined(e._currentView.disabledBackground) && e._currentView.disabledBackground.style.display !== "block") {
            e._currentView.disabledBackground.style.display = "block";
        }
    }
    function hideDisabledBackground(e) {
        if (Is.defined(e._currentView.disabledBackground) && e._currentView.disabledBackground.style.display !== "none") {
            e._currentView.disabledBackground.style.display = "none";
        }
    }
    function render() {
        const e = _configuration.domElementTypes;
        const t = e.length;
        for (let n = 0; n < t; n++) {
            const t = document.getElementsByTagName(e[n]);
            const o = [].slice.call(t);
            const a = o.length;
            for (let e = 0; e < a; e++) {
                if (!renderElement(o[e])) {
                    break;
                }
            }
        }
    }
    function renderElement(e) {
        let t = true;
        if (Is.defined(e) && e.hasAttribute(Constant.HEAT_JS_ATTRIBUTE_NAME)) {
            const n = e.getAttribute(Constant.HEAT_JS_ATTRIBUTE_NAME);
            if (Is.definedString(n)) {
                const o = getObjectFromString(n);
                if (o.parsed && Is.definedObject(o.object)) {
                    renderControl(renderBindingOptions(o.object, e));
                } else {
                    if (!_configuration.safeMode) {
                        console.error(_configuration.text.attributeNotValidErrorText.replace("{{attribute_name}}", Constant.HEAT_JS_ATTRIBUTE_NAME));
                        t = false;
                    }
                }
            } else {
                if (!_configuration.safeMode) {
                    console.error(_configuration.text.attributeNotSetErrorText.replace("{{attribute_name}}", Constant.HEAT_JS_ATTRIBUTE_NAME));
                    t = false;
                }
            }
        }
        return t;
    }
    function renderBindingOptions(e, t) {
        const n = binding.options.get(e);
        const o = Data.getDefaultString(n.view, "").toLowerCase();
        let a = {};
        a.element = t;
        a.disabledBackground = null;
        a.configurationDialog = null;
        a.dayCheckBoxes = [];
        a.monthCheckBoxes = [];
        a.tooltip = null;
        a.tooltipTimer = 0;
        a.mapContents = null;
        a.mapContentsScrollLeft = 0;
        a.year = n.year;
        a.type = _configuration.text.unknownTrendText;
        a.isInFetchMode = Is.definedFunction(n.events.onDataFetch);
        a.isInFetchModeTimer = 0;
        a.yearsAvailable = [];
        if (n.views.chart.enabled) {
            a.chartContents = null;
            a.chartContentsScrollLeft = 0;
        }
        if (n.views.days.enabled) {
            a.daysContents = null;
            a.daysContentsScrollLeft = 0;
        }
        if (n.views.statistics.enabled) {
            a.statisticsContents = null;
            a.statisticsContentsScrollLeft = 0;
        }
        if (o === "map") {
            a.view = 1;
        } else if (o === "chart") {
            a.view = 2;
        } else if (o === "days") {
            a.view = 3;
        } else if (o === "statistics") {
            a.view = 4;
        } else {
            a.view = 1;
        }
        n._currentView = a;
        return n;
    }
    function renderControl(e) {
        Trigger.customEvent(e.events.onBeforeRender, e._currentView.element);
        if (!Is.definedString(e._currentView.element.id)) {
            e._currentView.element.id = Data.String.newGuid();
        }
        if (e._currentView.element.className.trim() === "") {
            e._currentView.element.className = "heat-js";
        } else {
            DomElement.addClass(e._currentView.element, "heat-js");
        }
        e._currentView.element.removeAttribute(Constant.HEAT_JS_ATTRIBUTE_NAME);
        createDateStorageForElement(e._currentView.element.id, e);
        renderControlContainer(e);
        Trigger.customEvent(e.events.onRenderComplete, e._currentView.element);
    }
    function renderControlContainer(e, t = false, n = false) {
        if (t) {
            storeDataInLocalStorage(e);
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
        e._currentView.yearsAvailable = getYearsAvailableInData(e);
        ToolTip.hide(e);
        startDataPullTimer(e);
        if (e.title.showConfigurationButton) {
            renderDisabledBackground(e);
            renderConfigurationDialog(e);
        }
        ToolTip.renderControl(e);
        renderControlTitleBar(e);
        renderControlMap(e, n);
        if (e.views.chart.enabled) {
            renderControlChart(e, n);
            e._currentView.chartContents.style.display = "none";
        }
        if (e.views.days.enabled) {
            renderControlDays(e, n);
            e._currentView.daysContents.style.display = "none";
        }
        if (e.views.statistics.enabled) {
            renderControlStatistics(e, n);
            e._currentView.statisticsContents.style.display = "none";
        }
        e._currentView.mapContents.style.display = "none";
        if (e._currentView.view === 1) {
            e._currentView.mapContents.style.display = "block";
        } else if (e.views.chart.enabled && e._currentView.view === 2) {
            e._currentView.chartContents.style.display = "block";
        } else if (e.views.days.enabled && e._currentView.view === 3) {
            e._currentView.daysContents.style.display = "block";
        } else if (e.views.statistics.enabled && e._currentView.view === 4) {
            e._currentView.statisticsContents.style.display = "block";
        } else {
            e._currentView.view = 1;
            e._currentView.mapContents.style.display = "block";
        }
    }
    function renderConfigurationDialog(e) {
        e._currentView.configurationDialog = DomElement.create(e._currentView.disabledBackground, "div", "dialog configuration");
        const t = DomElement.create(e._currentView.configurationDialog, "div", "dialog-title-bar");
        const n = DomElement.create(e._currentView.configurationDialog, "div", "dialog-contents");
        const o = DomElement.create(t, "div", "dialog-close");
        const a = DomElement.create(n, "div", "side-container panel");
        const i = DomElement.create(n, "div", "side-container panel");
        DomElement.createWithHTML(t, "span", "dialog-title-bar-text", _configuration.text.configurationTitleText);
        DomElement.createWithHTML(a, "div", "side-container-title-text", _configuration.text.visibleDaysText + ":");
        DomElement.createWithHTML(i, "div", "side-container-title-text", _configuration.text.visibleMonthsText + ":");
        const r = DomElement.create(i, "div", "side-container");
        const s = DomElement.create(i, "div", "side-container");
        o.onclick = () => {
            hideConfigurationDialog(e);
        };
        for (let t = 0; t < 7; t++) {
            e._currentView.dayCheckBoxes[t] = DomElement.createCheckBox(a, _configuration.text.dayNames[t]);
        }
        for (let t = 0; t < 7; t++) {
            e._currentView.monthCheckBoxes[t] = DomElement.createCheckBox(r, _configuration.text.monthNames[t]);
        }
        for (let t = 7; t < 12; t++) {
            e._currentView.monthCheckBoxes[t] = DomElement.createCheckBox(s, _configuration.text.monthNames[t]);
        }
        ToolTip.add(o, e, _configuration.text.closeToolTipText);
    }
    function showConfigurationDialog(e) {
        showDisabledBackground(e);
        if (Is.defined(e._currentView.configurationDialog) && e._currentView.configurationDialog.style.display !== "block") {
            e._currentView.configurationDialog.style.display = "block";
        }
        let t = [];
        let n = [];
        if (e._currentView.view === 1) {
            t = e.views.map.daysToShow;
            n = e.views.map.monthsToShow;
        } else if (e.views.chart.enabled && e._currentView.view === 2) {
            t = e.views.chart.daysToShow;
            n = e.views.chart.monthsToShow;
        } else if (e.views.days.enabled && e._currentView.view === 3) {
            t = e.views.days.daysToShow;
            n = e.views.days.monthsToShow;
        } else if (e.views.statistics.enabled && e._currentView.view === 4) {
            t = e.views.statistics.daysToShow;
            n = e.views.statistics.monthsToShow;
        } else {
            t = e.views.map.daysToShow;
            n = e.views.map.monthsToShow;
        }
        for (let n = 0; n < 7; n++) {
            e._currentView.dayCheckBoxes[n].checked = isDayVisible(t, n + 1);
        }
        for (let t = 0; t < 12; t++) {
            e._currentView.monthCheckBoxes[t].checked = isMonthVisible(n, t);
        }
        ToolTip.hide(e);
    }
    function hideConfigurationDialog(e) {
        hideDisabledBackground(e);
        if (Is.defined(e._currentView.configurationDialog) && e._currentView.configurationDialog.style.display !== "none") {
            e._currentView.configurationDialog.style.display = "none";
        }
        const t = [];
        const n = [];
        let o = false;
        for (let n = 0; n < 7; n++) {
            if (e._currentView.dayCheckBoxes[n].checked) {
                t.push(n + 1);
            }
        }
        for (let t = 0; t < 12; t++) {
            if (e._currentView.monthCheckBoxes[t].checked) {
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
            } else if (e.views.statistics.enabled && e._currentView.view === 4) {
                e.views.statistics.monthsToShow = n;
            } else {
                e.views.map.monthsToShow = n;
            }
            o = true;
        }
        if (o) {
            renderControlContainer(e);
            Trigger.customEvent(e.events.onOptionsUpdate, e._currentView.element, e);
        } else {
            ToolTip.hide(e);
        }
    }
    function renderControlTitleBar(e) {
        if (e.title.showText || e.title.showYearSelector || e.title.showRefreshButton || e.title.showExportButton || e.title.showImportButton) {
            const t = DomElement.create(e._currentView.element, "div", "title-bar");
            const n = DomElement.create(t, "div", "title");
            if (e.views.chart.enabled || e.views.days.enabled || e.views.statistics.enabled) {
                if (e.title.showTitleDropDownButton) {
                    DomElement.create(n, "div", "down-arrow");
                }
            } else {
                DomElement.addClass(n, "no-click");
            }
            if (e.title.showText) {
                n.innerHTML += e.title.text;
            }
            if (e.views.chart.enabled || e.views.days.enabled || e.views.statistics.enabled) {
                renderTitleDropDownMenu(e, n);
            }
            if (e.title.showImportButton && !e._currentView.isInFetchMode) {
                const n = DomElement.createWithHTML(t, "button", "import", _configuration.text.importButtonSymbolText);
                ToolTip.add(n, e, _configuration.text.importButtonText);
                n.onclick = () => {
                    importFromFilesSelected(e);
                };
            }
            if (e.title.showExportButton) {
                const n = DomElement.createWithHTML(t, "button", "export", _configuration.text.exportButtonSymbolText);
                ToolTip.add(n, e, _configuration.text.exportButtonText);
                n.onclick = () => {
                    exportAllData(e);
                };
            }
            if (e.title.showRefreshButton) {
                const n = DomElement.createWithHTML(t, "button", "refresh", _configuration.text.refreshButtonSymbolText);
                ToolTip.add(n, e, _configuration.text.refreshButtonText);
                n.onclick = () => {
                    renderControlContainer(e);
                    Trigger.customEvent(e.events.onRefresh, e._currentView.element);
                };
            }
            if (e.title.showYearSelector) {
                const n = DomElement.createWithHTML(t, "button", "back", _configuration.text.backButtonSymbolText);
                ToolTip.add(n, e, _configuration.text.backButtonText);
                n.onclick = () => {
                    moveToPreviousYear(e);
                };
                if (isFirstVisibleYear(e, e._currentView.year)) {
                    n.disabled = true;
                }
                e._currentView.yearText = DomElement.createWithHTML(t, "div", "year-text", e._currentView.year.toString());
                if (e.title.showYearSelectionDropDown) {
                    renderYearDropDownMenu(e);
                } else {
                    DomElement.addClass(e._currentView.yearText, "no-click");
                }
                if (e.title.showConfigurationButton) {
                    let n = DomElement.create(t, "div", "configure");
                    ToolTip.add(n, e, _configuration.text.configurationToolTipText);
                    n.onclick = () => {
                        showConfigurationDialog(e);
                    };
                }
                const o = DomElement.createWithHTML(t, "button", "next", _configuration.text.nextButtonSymbolText);
                ToolTip.add(o, e, _configuration.text.nextButtonText);
                o.onclick = () => {
                    moveToNextYear(e);
                };
                if (isLastVisibleYear(e, e._currentView.year)) {
                    o.disabled = true;
                }
            }
        }
    }
    function renderTitleDropDownMenu(e, t) {
        const n = DomElement.create(t, "div", "titles-menu-container");
        const o = DomElement.create(n, "div", "titles-menu");
        if (e.title.showTitleDropDownHeaders) {
            DomElement.createWithHTML(o, "div", "title-menu-header", _configuration.text.dataText + ":");
        }
        const a = DomElement.createWithHTML(o, "div", "title-menu-item", _configuration.text.mapText);
        renderTitleDropDownMenuItemClickEvent(e, a, 1, "map");
        if (e.views.chart.enabled) {
            const t = DomElement.createWithHTML(o, "div", "title-menu-item", _configuration.text.chartText);
            renderTitleDropDownMenuItemClickEvent(e, t, 2, "chart");
        }
        if (e.views.days.enabled) {
            if (e.title.showTitleDropDownHeaders) {
                DomElement.createWithHTML(o, "div", "title-menu-header", _configuration.text.yearText + ":");
            }
            const t = DomElement.createWithHTML(o, "div", "title-menu-item", _configuration.text.daysText);
            renderTitleDropDownMenuItemClickEvent(e, t, 3, "days");
        }
        if (e.views.statistics.enabled) {
            if (e.title.showTitleDropDownHeaders) {
                DomElement.createWithHTML(o, "div", "title-menu-header", _configuration.text.statisticsText + ":");
            }
            const t = DomElement.createWithHTML(o, "div", "title-menu-item", _configuration.text.colorRangesText);
            renderTitleDropDownMenuItemClickEvent(e, t, 4, "statistics");
        }
    }
    function renderTitleDropDownMenuItemClickEvent(e, t, n, o) {
        if (e._currentView.view === n) {
            DomElement.addClass(t, "title-menu-item-active");
        } else {
            t.onclick = () => {
                e._currentView.view = n;
                Trigger.customEvent(e.events.onViewSwitch, o);
                renderControlContainer(e, false, true);
            };
        }
    }
    function renderYearDropDownMenu(e) {
        DomElement.create(e._currentView.yearText, "div", "down-arrow");
        const t = DomElement.create(e._currentView.yearText, "div", "years-menu-container");
        const n = DomElement.create(t, "div", "years-menu");
        const o = (new Date).getFullYear();
        let a = null;
        t.style.display = "block";
        t.style.visibility = "hidden";
        for (let t = o - e.title.extraSelectionYears; t < o + e.title.extraSelectionYears; t++) {
            if (isYearVisible(e, t)) {
                let i = renderYearDropDownMenuItem(e, n, t, o);
                if (!Is.defined(a)) {
                    a = i;
                }
            }
        }
        if (Is.defined(a)) {
            n.scrollTop = a.offsetTop - n.offsetHeight / 2;
        }
        t.style.display = "none";
        t.style.visibility = "visible";
    }
    function renderYearDropDownMenuItem(e, t, n, o) {
        let a = null;
        const i = DomElement.createWithHTML(t, "div", "year-menu-item", n.toString());
        if (e._currentView.year !== n) {
            i.onclick = () => {
                e._currentView.year = n;
                renderControlContainer(e);
                Trigger.customEvent(e.events.onSetYear, e._currentView.year);
            };
            if (n === o) {
                DomElement.addClass(i, "year-menu-item-current");
            }
        } else {
            DomElement.addClass(i, "year-menu-item-active");
            a = i;
        }
        return a;
    }
    function renderControlMap(e, t) {
        e._currentView.mapContents = DomElement.create(e._currentView.element, "div", "map-contents");
        if (e.views.chart.enabled) {
            renderControlChartContents(e);
        }
        if (e.views.days.enabled) {
            renderControlDaysContents(e);
        }
        if (e.views.statistics.enabled) {
            renderControlStatisticsContents(e);
        }
        renderControlViewGuide(e);
        if (e.views.map.showNoDataMessageWhenDataIsNotAvailable && !isDataAvailableForYear(e)) {
            const n = DomElement.createWithHTML(e._currentView.mapContents, "div", "no-data-message", _configuration.text.noMapDataMessage);
            if (t) {
                DomElement.addClass(n, "view-switch");
            }
        } else {
            e._currentView.mapContents.style.minHeight = "unset";
            makeAreaDroppable(e._currentView.mapContents, e);
            const n = DomElement.create(e._currentView.mapContents, "div", "map");
            const o = e._currentView.year;
            let a = false;
            if (t) {
                DomElement.addClass(n, "view-switch");
            }
            if (e.views.map.showDayNames) {
                const t = DomElement.create(n, "div", "days");
                const o = e.views.map.showMinimalDayNames && e.views.map.daysToShow.length === 7;
                if (!e.views.map.showMonthNames || e.views.map.placeMonthNamesOnTheBottom) {
                    t.className = "days-months-bottom";
                }
                for (let n = 0; n < 7; n++) {
                    if (isDayVisible(e.views.map.daysToShow, n + 1)) {
                        const e = !o || n % 3 === 0 ? _configuration.text.dayNames[n] : " ";
                        DomElement.createWithHTML(t, "div", "day-name", e);
                    }
                }
                if (e.views.map.showDaysInReverseOrder) {
                    DomElement.reverseChildrenOrder(t);
                }
            }
            const i = DomElement.create(n, "div", "months");
            const r = getSortedColorRanges(e);
            for (let t = 0; t < 12; t++) {
                if (isMonthVisible(e.views.map.monthsToShow, t)) {
                    const n = DomElement.create(i, "div", "month");
                    const s = DomElement.create(n, "div", "day-columns");
                    let l = DateTime.getTotalDaysInMonth(o, t);
                    let c = DomElement.create(s, "div", "day-column");
                    let u = false;
                    const d = new Date(o, t, 1);
                    const m = DateTime.getWeekdayNumber(d);
                    let f = 1;
                    l += m;
                    for (let n = 0; n < l; n++) {
                        if (n >= m) {
                            u = true;
                        } else {
                            if (isDayVisible(e.views.map.daysToShow, f)) {
                                DomElement.create(c, "div", "day-disabled");
                            }
                        }
                        if (u) {
                            let a = null;
                            if (isDayVisible(e.views.map.daysToShow, f)) {
                                a = renderControlMapMonthDay(e, c, n - m, t, o, r);
                            }
                            if ((n + 1) % 7 === 0) {
                                if (e.views.map.showDaysInReverseOrder) {
                                    DomElement.reverseChildrenOrder(c);
                                }
                                c = DomElement.create(s, "div", "day-column");
                                f = 0;
                                if (_elements_Day_Width === 0 && Is.defined(a)) {
                                    let e = DomElement.getStyleValueByName(a, "margin-left", true);
                                    let t = DomElement.getStyleValueByName(a, "margin-right", true);
                                    _elements_Day_Width = a.offsetWidth + e + t;
                                }
                            }
                        }
                        f++;
                    }
                    if (e.views.map.showMonthNames) {
                        let o;
                        const a = n.offsetWidth;
                        if (!e.views.map.placeMonthNamesOnTheBottom) {
                            o = DomElement.createWithHTML(n, "div", "month-name", _configuration.text.monthNames[t], s);
                        } else {
                            o = DomElement.createWithHTML(n, "div", "month-name-bottom", _configuration.text.monthNames[t]);
                        }
                        if (Is.defined(o)) {
                            if (e.views.map.showMonthDayGaps) {
                                o.style.width = `${a}px`;
                            } else {
                                o.style.width = `${a - _elements_Day_Width}px`;
                            }
                        }
                    }
                    if (a && Is.defined(_elements_Day_Width)) {
                        if (m > 0 && !e.views.map.showMonthDayGaps) {
                            n.style.marginLeft = `${-_elements_Day_Width}px`;
                        } else if (m === 0 && e.views.map.showMonthDayGaps) {
                            n.style.marginLeft = `${_elements_Day_Width}px`;
                        }
                    }
                    if (e.views.map.showMonthsInReverseOrder) {
                        DomElement.reverseChildrenOrder(s);
                    }
                    a = true;
                }
            }
            if (e.views.map.showMonthsInReverseOrder) {
                DomElement.reverseChildrenOrder(i);
            }
            if (e.views.map.keepScrollPositions) {
                e._currentView.mapContents.scrollLeft = e._currentView.mapContentsScrollLeft;
            }
        }
    }
    function renderControlMapMonthDay(e, t, n, o, a, i) {
        const r = n + 1;
        const s = DomElement.create(t, "div", "day");
        const l = new Date(a, o, r);
        let c = _elements_DateCounts[e._currentView.element.id].typeData[e._currentView.type][DateTime.toStorageDate(l)];
        c = Data.getDefaultNumber(c, 0);
        renderDayToolTip(e, s, l, c);
        if (e.views.map.showDayNumbers && c > 0) {
            s.innerHTML = c.toString();
        }
        if (Is.definedFunction(e.events.onDayClick)) {
            s.onclick = () => {
                Trigger.customEvent(e.events.onDayClick, l, c);
            };
        } else {
            DomElement.addClass(s, "no-hover");
        }
        const u = getColorRange(e, i, c, l);
        if (Is.defined(u) && isColorRangeVisible(e, u.id)) {
            if (Is.definedString(u.mapCssClassName)) {
                DomElement.addClass(s, u.mapCssClassName);
            } else {
                DomElement.addClass(s, u.cssClassName);
            }
        }
        return s;
    }
    function isDataAvailableForYear(e) {
        let t = false;
        const n = getCurrentViewData(e);
        const o = e._currentView.year.toString();
        for (let e in n) {
            if (n.hasOwnProperty(e)) {
                if (DateTime.getStorageDateYear(e) === o) {
                    t = true;
                    break;
                }
            }
        }
        return t;
    }
    function renderControlChartContents(e) {
        e._currentView.chartContents = DomElement.create(e._currentView.element, "div", "chart-contents");
        makeAreaDroppable(e._currentView.chartContents, e);
    }
    function renderControlChart(e, t) {
        const n = DomElement.create(e._currentView.chartContents, "div", "chart");
        let o = DomElement.create(n, "div", "y-labels");
        const a = DomElement.create(n, "div", "day-lines");
        const i = getSortedColorRanges(e);
        const r = getLargestValueForChartYear(e);
        const s = e._currentView.year;
        let l = 0;
        if (t) {
            DomElement.addClass(n, "view-switch");
        }
        if (r > 0 && e.views.chart.showChartYLabels) {
            const e = DomElement.createWithHTML(o, "div", "label-0", r.toString());
            DomElement.createWithHTML(o, "div", "label-25", (Math.floor(r / 4) * 3).toString());
            DomElement.createWithHTML(o, "div", "label-50", Math.floor(r / 2).toString());
            DomElement.createWithHTML(o, "div", "label-75", Math.floor(r / 4).toString());
            DomElement.createWithHTML(o, "div", "label-100", "0");
            o.style.width = `${e.offsetWidth}px`;
            l = o.offsetWidth + DomElement.getStyleValueByName(o, "margin-right", true);
        } else {
            o.parentNode.removeChild(o);
            o = null;
        }
        if (r === 0) {
            e._currentView.chartContents.style.minHeight = `${e._currentView.mapContents.offsetHeight}px`;
            n.parentNode.removeChild(n);
            const o = DomElement.createWithHTML(e._currentView.chartContents, "div", "no-data-message", _configuration.text.noChartDataMessage);
            if (t) {
                DomElement.addClass(o, "view-switch");
            }
        } else {
            const t = e._currentView.mapContents.offsetHeight / r;
            let n = 0;
            let o = 0;
            for (let r = 0; r < 12; r++) {
                if (isMonthVisible(e.views.chart.monthsToShow, r)) {
                    const l = DateTime.getTotalDaysInMonth(s, r);
                    let c = 1;
                    n++;
                    for (let n = 0; n < l; n++) {
                        if (isDayVisible(e.views.chart.daysToShow, c)) {
                            renderControlChartDay(a, e, n + 1, r, s, i, t);
                        }
                        if ((n + 1) % 7 === 0) {
                            c = 0;
                        }
                        c++;
                        o++;
                    }
                }
            }
            if (e.views.chart.showInReverseOrder) {
                DomElement.reverseChildrenOrder(a);
            }
            if (e.views.chart.showMonthNames) {
                const t = DomElement.create(e._currentView.chartContents, "div", "chart-months");
                const o = a.offsetWidth / n;
                let i = 0;
                const r = n => {
                    if (isMonthVisible(e.views.chart.monthsToShow, n)) {
                        let e = DomElement.createWithHTML(t, "div", "month-name", _configuration.text.monthNames[n]);
                        e.style.left = `${l + o * i}px`;
                        i++;
                    }
                };
                if (e.views.chart.showInReverseOrder) {
                    for (let e = 12; e--; ) {
                        r(e);
                    }
                } else {
                    for (let e = 0; e < 12; e++) {
                        r(e);
                    }
                }
                t.style.width = `${a.offsetWidth}px`;
                const s = DomElement.create(t, "div", "month-name-space");
                s.style.height = `${t.offsetHeight}px`;
                s.style.width = `${l}px`;
            }
            if (e.views.chart.keepScrollPositions) {
                e._currentView.chartContents.scrollLeft = e._currentView.chartContentsScrollLeft;
            }
        }
    }
    function renderControlChartDay(e, t, n, o, a, i, r) {
        const s = new Date(a, o, n);
        const l = DomElement.create(e, "div", "day-line");
        let c = getCurrentViewData(t)[DateTime.toStorageDate(s)];
        c = Data.getDefaultNumber(c, 0);
        renderDayToolTip(t, l, s, c);
        if (t.views.chart.showLineNumbers && c > 0) {
            DomElement.addClass(l, "day-line-number");
            l.innerHTML = c.toString();
        }
        const u = c * r;
        l.style.height = `${u}px`;
        if (u <= 0) {
            l.style.visibility = "hidden";
        }
        if (Is.definedFunction(t.events.onDayClick)) {
            l.onclick = () => {
                Trigger.customEvent(t.events.onDayClick, s, c);
            };
        } else {
            DomElement.addClass(l, "no-hover");
        }
        const d = getColorRange(t, i, c, s);
        if (Is.defined(d) && isColorRangeVisible(t, d.id)) {
            if (Is.definedString(d.chartCssClassName)) {
                DomElement.addClass(l, d.chartCssClassName);
            } else {
                DomElement.addClass(l, d.cssClassName);
            }
        }
    }
    function getLargestValueForChartYear(e) {
        let t = 0;
        const n = getCurrentViewData(e);
        for (let o = 0; o < 12; o++) {
            const a = DateTime.getTotalDaysInMonth(e._currentView.year, o);
            for (let i = 0; i < a; i++) {
                const a = DateTime.toStorageDate(new Date(e._currentView.year, o, i + 1));
                if (n.hasOwnProperty(a)) {
                    if (isMonthVisible(e.views.chart.monthsToShow, o) && isDayVisible(e.views.chart.daysToShow, i + 1)) {
                        t = Math.max(t, n[a]);
                    }
                }
            }
        }
        return t;
    }
    function renderControlDaysContents(e) {
        e._currentView.daysContents = DomElement.create(e._currentView.element, "div", "days-contents");
        makeAreaDroppable(e._currentView.daysContents, e);
    }
    function renderControlDays(e, t) {
        const n = DomElement.create(e._currentView.daysContents, "div", "days");
        const o = DomElement.create(e._currentView.daysContents, "div", "day-names");
        let a = DomElement.create(n, "div", "y-labels");
        const i = DomElement.create(n, "div", "day-lines");
        const r = getLargestValuesForEachDay(e);
        if (t) {
            DomElement.addClass(n, "view-switch");
        }
        if (r.largestValue > 0 && e.views.days.showChartYLabels) {
            const e = DomElement.createWithHTML(a, "div", "label-0", r.largestValue.toString());
            DomElement.createWithHTML(a, "div", "label-25", (Math.floor(r.largestValue / 4) * 3).toString());
            DomElement.createWithHTML(a, "div", "label-50", Math.floor(r.largestValue / 2).toString());
            DomElement.createWithHTML(a, "div", "label-75", Math.floor(r.largestValue / 4).toString());
            DomElement.createWithHTML(a, "div", "label-100", "0");
            a.style.width = `${e.offsetWidth}px`;
            o.style.paddingLeft = `${a.offsetWidth + DomElement.getStyleValueByName(a, "margin-right", true)}px`;
        } else {
            a.parentNode.removeChild(a);
            a = null;
        }
        if (r.largestValue === 0) {
            e._currentView.daysContents.style.minHeight = `${e._currentView.mapContents.offsetHeight}px`;
            n.parentNode.removeChild(n);
            o.parentNode.removeChild(o);
            const a = DomElement.createWithHTML(e._currentView.daysContents, "div", "no-days-message", _configuration.text.noDaysDataMessage);
            if (t) {
                DomElement.addClass(a, "view-switch");
            }
        } else {
            const t = e._currentView.mapContents.offsetHeight / r.largestValue;
            for (let n in r.days) {
                if (r.days.hasOwnProperty(n) && isDayVisible(e.views.days.daysToShow, parseInt(n))) {
                    renderControlDaysDayLine(i, parseInt(n), r.days[n], e, t);
                    if (e.views.days.showDayNames) {
                        DomElement.createWithHTML(o, "div", "day-name", _configuration.text.dayNames[parseInt(n) - 1]);
                    }
                }
            }
            if (e.views.days.showInReverseOrder) {
                DomElement.reverseChildrenOrder(i);
                DomElement.reverseChildrenOrder(o);
            }
            if (e.views.days.keepScrollPositions) {
                e._currentView.daysContents.scrollLeft = e._currentView.daysContentsScrollLeft;
            }
        }
    }
    function renderControlDaysDayLine(e, t, n, o, a) {
        const i = DomElement.create(e, "div", "day-line");
        const r = n * a;
        i.style.height = `${r}px`;
        if (r <= 0) {
            i.style.visibility = "hidden";
        }
        ToolTip.add(i, o, n.toString());
        if (Is.definedFunction(o.events.onWeekDayClick)) {
            i.onclick = () => {
                Trigger.customEvent(o.events.onWeekDayClick, t, n);
            };
        } else {
            DomElement.addClass(i, "no-hover");
        }
        if (o.views.days.showDayNumbers && n > 0) {
            DomElement.addClass(i, "day-line-number");
            DomElement.createWithHTML(i, "div", "count", n.toString());
        }
    }
    function getLargestValuesForEachDay(e) {
        const t = {
            days: {
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
        const n = getCurrentViewData(e);
        for (let o = 0; o < 12; o++) {
            const a = DateTime.getTotalDaysInMonth(e._currentView.year, o);
            for (let i = 0; i < a; i++) {
                const a = DateTime.toStorageDate(new Date(e._currentView.year, o, i + 1));
                if (n.hasOwnProperty(a)) {
                    const o = DateTime.getStorageDate(a);
                    const i = new Date(parseInt(o[2]), parseInt(o[1]), parseInt(o[0]));
                    const r = DateTime.getWeekdayNumber(i) + 1;
                    if (!isHoliday(e, i).matched && isMonthVisible(e.views.days.monthsToShow, i.getMonth()) && isDayVisible(e.views.days.daysToShow, r)) {
                        t.days[r] += n[a];
                        t.largestValue = Math.max(t.largestValue, t.days[r]);
                    }
                }
            }
        }
        return t;
    }
    function renderControlStatisticsContents(e) {
        e._currentView.statisticsContents = DomElement.create(e._currentView.element, "div", "statistics-contents");
        makeAreaDroppable(e._currentView.statisticsContents, e);
    }
    function renderControlStatistics(e, t) {
        const n = DomElement.create(e._currentView.statisticsContents, "div", "statistics");
        const o = DomElement.create(e._currentView.statisticsContents, "div", "statistics-ranges");
        let a = DomElement.create(n, "div", "y-labels");
        const i = DomElement.create(n, "div", "range-lines");
        const r = getSortedColorRanges(e);
        const s = getLargestValuesForEachRangeType(e, r);
        if (t) {
            DomElement.addClass(n, "view-switch");
        }
        if (s.largestValue > 0 && e.views.statistics.showChartYLabels) {
            const e = DomElement.createWithHTML(a, "div", "label-0", s.largestValue.toString());
            DomElement.createWithHTML(a, "div", "label-25", (Math.floor(s.largestValue / 4) * 3).toString());
            DomElement.createWithHTML(a, "div", "label-50", Math.floor(s.largestValue / 2).toString());
            DomElement.createWithHTML(a, "div", "label-75", Math.floor(s.largestValue / 4).toString());
            DomElement.createWithHTML(a, "div", "label-100", "0");
            a.style.width = `${e.offsetWidth}px`;
            o.style.paddingLeft = `${a.offsetWidth + DomElement.getStyleValueByName(a, "margin-right", true)}px`;
        } else {
            a.parentNode.removeChild(a);
            a = null;
        }
        if (s.largestValue === 0) {
            e._currentView.statisticsContents.style.minHeight = `${e._currentView.mapContents.offsetHeight}px`;
            n.parentNode.removeChild(n);
            o.parentNode.removeChild(o);
            const a = DomElement.createWithHTML(e._currentView.statisticsContents, "div", "no-statistics-message", _configuration.text.noStatisticsDataMessage);
            if (t) {
                DomElement.addClass(a, "view-switch");
            }
        } else {
            const t = e._currentView.mapContents.offsetHeight / s.largestValue;
            if (!e.views.statistics.showColorRangeLabels) {
                o.parentNode.removeChild(o);
            }
            for (let n in s.types) {
                if (s.types.hasOwnProperty(n)) {
                    renderControlStatisticsRangeLine(parseInt(n), i, s.types[n], e, r, t);
                    const a = getColorRangeByMinimum(r, parseInt(n));
                    if (e.views.statistics.showColorRangeLabels) {
                        if (!e.views.statistics.useColorRangeNamesForLabels || !Is.defined(a) || !Is.definedString(a.name)) {
                            DomElement.createWithHTML(o, "div", "range-name", n + "+");
                        } else {
                            DomElement.createWithHTML(o, "div", "range-name", a.name);
                        }
                    }
                }
            }
            if (e.views.statistics.showInReverseOrder) {
                DomElement.reverseChildrenOrder(i);
                DomElement.reverseChildrenOrder(o);
            }
            if (e.views.statistics.keepScrollPositions) {
                e._currentView.statisticsContents.scrollLeft = e._currentView.statisticsContentsScrollLeft;
            }
        }
    }
    function renderControlStatisticsRangeLine(e, t, n, o, a, i) {
        const r = DomElement.create(t, "div", "range-line");
        const s = getColorRangeByMinimum(a, e);
        const l = n * i;
        r.style.height = `${l}px`;
        if (l <= 0) {
            r.style.visibility = "hidden";
        }
        ToolTip.add(r, o, n.toString());
        if (o.views.statistics.showRangeNumbers && n > 0) {
            DomElement.addClass(r, "range-line-number");
            DomElement.createWithHTML(r, "div", "count", n.toString());
        }
        if (Is.definedFunction(o.events.onStatisticClick)) {
            r.onclick = () => {
                Trigger.customEvent(o.events.onStatisticClick, s);
            };
        } else {
            DomElement.addClass(r, "no-hover");
        }
        if (Is.defined(s) && isColorRangeVisible(o, s.id)) {
            if (Is.definedString(s.statisticsCssClassName)) {
                DomElement.addClass(r, s.statisticsCssClassName);
            } else {
                DomElement.addClass(r, s.cssClassName);
            }
        }
    }
    function getLargestValuesForEachRangeType(e, t) {
        const n = getCurrentViewData(e);
        const o = {
            types: {},
            largestValue: 0
        };
        o.types["0"] = 0;
        for (let a = 0; a < 12; a++) {
            const i = DateTime.getTotalDaysInMonth(e._currentView.year, a);
            for (let r = 0; r < i; r++) {
                const i = DateTime.toStorageDate(new Date(e._currentView.year, a, r + 1));
                if (n.hasOwnProperty(i)) {
                    const a = DateTime.getStorageDate(i);
                    const r = new Date(parseInt(a[2]), parseInt(a[1]), parseInt(a[0]));
                    const s = DateTime.getWeekdayNumber(r) + 1;
                    if (!isHoliday(e, r).matched && isMonthVisible(e.views.statistics.monthsToShow, r.getMonth()) && isDayVisible(e.views.statistics.daysToShow, s)) {
                        const a = getColorRange(e, t, n[i]);
                        if (!Is.defined(a)) {
                            o.types["0"]++;
                        } else {
                            if (!o.types.hasOwnProperty(a.minimum.toString())) {
                                o.types[a.minimum.toString()] = 0;
                            }
                            o.types[a.minimum]++;
                            o.largestValue = Math.max(o.largestValue, o.types[a.minimum]);
                        }
                    }
                }
            }
        }
        return o;
    }
    function renderControlViewGuide(e) {
        const t = DomElement.create(e._currentView.element, "div", "guide");
        const n = DomElement.create(t, "div", "map-types");
        let o = 0;
        for (let t in _elements_DateCounts[e._currentView.element.id].typeData[_configuration.text.unknownTrendText]) {
            if (_elements_DateCounts[e._currentView.element.id].typeData[_configuration.text.unknownTrendText].hasOwnProperty(t)) {
                o++;
                break;
            }
        }
        if (_elements_DateCounts[e._currentView.element.id].totalTypes > 1) {
            if (Is.definedString(e.description.text)) {
                const n = DomElement.create(e._currentView.element, "div", "description", t);
                renderDescription(e, n);
            }
            for (let t in _elements_DateCounts[e._currentView.element.id].typeData) {
                if (t !== _configuration.text.unknownTrendText || o > 0) {
                    if (o === 0 && e._currentView.type === _configuration.text.unknownTrendText) {
                        e._currentView.type = t;
                    }
                    renderControlViewGuideTypeButton(e, n, t);
                }
            }
        } else {
            renderDescription(e, n);
        }
        if (e.guide.enabled) {
            const n = DomElement.create(t, "div", "map-toggles");
            if (e.guide.showLessAndMoreLabels) {
                let t = DomElement.createWithHTML(n, "div", "less-text", _configuration.text.lessText);
                if (e.guide.colorRangeTogglesEnabled) {
                    t.onclick = () => {
                        updateColorRangeToggles(e, false);
                    };
                } else {
                    DomElement.addClass(t, "no-click");
                }
            }
            const o = DomElement.create(n, "div", "days");
            const a = getSortedColorRanges(e);
            const i = a.length;
            for (let t = 0; t < i; t++) {
                renderControlViewGuideDay(e, o, a[t]);
            }
            if (e.guide.showLessAndMoreLabels) {
                const t = DomElement.createWithHTML(n, "div", "more-text", _configuration.text.moreText);
                if (e.guide.colorRangeTogglesEnabled) {
                    t.onclick = () => {
                        updateColorRangeToggles(e, true);
                    };
                } else {
                    DomElement.addClass(t, "no-click");
                }
            }
        }
    }
    function renderControlViewGuideTypeButton(e, t, n) {
        const o = DomElement.createWithHTML(t, "button", "type", n);
        if (e._currentView.type === n) {
            DomElement.addClass(o, "active");
        }
        o.onclick = () => {
            if (e._currentView.type !== n) {
                e._currentView.type = n;
                Trigger.customEvent(e.events.onTypeSwitch, n);
                renderControlContainer(e);
            }
        };
    }
    function renderControlViewGuideDay(e, t, n) {
        const o = DomElement.create(t, "div");
        o.className = "day";
        ToolTip.add(o, e, n.tooltipText);
        if (isColorRangeVisible(e, n.id)) {
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
            o.innerHTML = n.minimum + "+";
        }
        if (e.guide.colorRangeTogglesEnabled) {
            o.onclick = () => {
                toggleColorRangeVisibleState(e, n.id);
            };
        } else {
            DomElement.addClass(o, "no-hover");
        }
    }
    function renderDescription(e, t) {
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
    function renderDayToolTip(e, t, n, o) {
        if (Is.definedFunction(e.events.onDayToolTipRender)) {
            ToolTip.add(t, e, Trigger.customEvent(e.events.onDayToolTipRender, n, o));
        } else {
            let o = DateTime.getCustomFormattedDateText(_configuration, e.tooltip.dayText, n);
            if (e.showHolidaysInDayToolTips) {
                let t = isHoliday(e, n);
                if (t.matched && Is.definedString(t.name)) {
                    o += ":" + " " + t.name;
                }
            }
            ToolTip.add(t, e, o);
        }
    }
    function createDateStorageForElement(e, t, n = true) {
        _elements_DateCounts[e] = {
            options: t,
            typeData: {},
            totalTypes: 1
        };
        _elements_DateCounts[e].typeData[_configuration.text.unknownTrendText] = {};
        if (n && !t._currentView.isInFetchMode) {
            loadDataFromLocalStorage(t);
        }
    }
    function getCurrentViewData(e) {
        return _elements_DateCounts[e._currentView.element.id].typeData[e._currentView.type];
    }
    function isMonthVisible(e, t) {
        return e.indexOf(t + 1) > -1;
    }
    function isDayVisible(e, t) {
        return e.indexOf(t) > -1;
    }
    function getYearsAvailableInData(e) {
        let t = [];
        if (e.showOnlyDataForYearsAvailable) {
            let n = getCurrentViewData(e);
            for (let e in n) {
                if (n.hasOwnProperty(e)) {
                    let n = parseInt(DateTime.getStorageDateYear(e));
                    if (t.indexOf(n) === -1) {
                        t.push(n);
                    }
                }
            }
        }
        t = t.sort((function(e, t) {
            return e - t;
        }));
        return t;
    }
    function isYearVisible(e, t) {
        return e.yearsToHide.indexOf(t) === -1 && (e._currentView.yearsAvailable.length === 0 || e._currentView.yearsAvailable.indexOf(t) > -1);
    }
    function isFirstVisibleYear(e, t) {
        return e._currentView.yearsAvailable.length > 0 && t <= e._currentView.yearsAvailable[0];
    }
    function isLastVisibleYear(e, t) {
        return e._currentView.yearsAvailable.length > 0 && t >= e._currentView.yearsAvailable[e._currentView.yearsAvailable.length - 1];
    }
    function loadDataFromLocalStorage(e) {
        if (e.useLocalStorageForData && window.localStorage) {
            const t = window.localStorage.length;
            const n = e._currentView.element.id;
            for (let e = 0; e < t; e++) {
                const t = window.localStorage.key(e);
                if (Data.String.startsWithAnyCase(t, _local_Storage_Start_ID)) {
                    const e = window.localStorage.getItem(t);
                    const o = getObjectFromString(e);
                    if (o.parsed) {
                        _elements_DateCounts[n].typeData = o.object;
                        _elements_DateCounts[n].totalTypes = 0;
                        for (let e in _elements_DateCounts[n].typeData) {
                            if (_elements_DateCounts[n].typeData.hasOwnProperty(e)) {
                                _elements_DateCounts[n].totalTypes++;
                            }
                        }
                    }
                }
            }
        }
    }
    function storeDataInLocalStorage(e) {
        if (e.useLocalStorageForData && window.localStorage) {
            const t = e._currentView.element.id;
            clearLocalStorageObjects(e);
            const n = JSON.stringify(_elements_DateCounts[t].typeData);
            window.localStorage.setItem(_local_Storage_Start_ID + t, n);
        }
    }
    function clearLocalStorageObjects(e) {
        if (e.useLocalStorageForData && window.localStorage) {
            const t = window.localStorage.length;
            const n = [];
            const o = e._currentView.element.id;
            for (let e = 0; e < t; e++) {
                if (Data.String.startsWithAnyCase(window.localStorage.key(e), _local_Storage_Start_ID + o)) {
                    n.push(window.localStorage.key(e));
                }
            }
            const a = n.length;
            for (let e = 0; e < a; e++) {
                window.localStorage.removeItem(n[e]);
            }
        }
    }
    function startDataPullTimer(e) {
        if (e._currentView.isInFetchMode) {
            if (e._currentView.isInFetchModeTimer === 0) {
                pullDataFromCustomTrigger(e);
            }
            if (e._currentView.isInFetchModeTimer === 0) {
                e._currentView.isInFetchModeTimer = setInterval((() => {
                    pullDataFromCustomTrigger(e);
                    renderControlContainer(e);
                }), e.dataFetchDelay);
            }
        }
    }
    function pullDataFromCustomTrigger(e) {
        const t = e._currentView.element.id;
        const n = Trigger.customEvent(e.events.onDataFetch, t);
        if (Is.definedObject(n)) {
            createDateStorageForElement(t, e, false);
            for (let e in n) {
                if (n.hasOwnProperty(e)) {
                    if (!_elements_DateCounts[t].typeData[_configuration.text.unknownTrendText].hasOwnProperty(e)) {
                        _elements_DateCounts[t].typeData[_configuration.text.unknownTrendText][e] = 0;
                    }
                    _elements_DateCounts[t].typeData[_configuration.text.unknownTrendText][e] += n[e];
                }
            }
        }
    }
    function cancelAllPullDataTimers() {
        for (let e in _elements_DateCounts) {
            if (_elements_DateCounts.hasOwnProperty(e)) {
                const t = _elements_DateCounts[e].options;
                if (Is.defined(t._currentView.isInFetchModeTimer)) {
                    clearInterval(t._currentView.isInFetchModeTimer);
                    t._currentView.isInFetchModeTimer = 0;
                }
            }
        }
    }
    function isColorRangeVisible(e, t) {
        let n = false;
        if (t === _internal_Name_Holiday) {
            n = true;
        } else {
            const o = e.colorRanges.length;
            for (let a = 0; a < o; a++) {
                const o = e.colorRanges[a];
                if (o.id === t && Data.getDefaultBoolean(o.visible, true)) {
                    n = true;
                    break;
                }
            }
        }
        return n;
    }
    function updateColorRangeToggles(e, t) {
        const n = e.colorRanges.length;
        for (let o = 0; o < n; o++) {
            e.colorRanges[o].visible = t;
            Trigger.customEvent(e.events.onColorRangeTypeToggle, e.colorRanges[o].id, t);
        }
        renderControlContainer(e);
    }
    function toggleColorRangeVisibleState(e, t) {
        const n = e.colorRanges.length;
        for (let o = 0; o < n; o++) {
            const n = e.colorRanges[o];
            if (n.id === t) {
                n.visible = !Data.getDefaultBoolean(n.visible, true);
                Trigger.customEvent(e.events.onColorRangeTypeToggle, n.id, n.visible);
                renderControlContainer(e);
                break;
            }
        }
    }
    function getColorRange(e, t, n, o = null) {
        let a = null;
        if (Is.defined(o) && isHoliday(e, o).matched) {
            a = {
                cssClassName: "holiday",
                id: _internal_Name_Holiday,
                visible: true,
                minimum: 0
            };
        }
        if (!Is.defined(a)) {
            const e = t.length;
            for (let o = 0; o < e; o++) {
                const e = t[o];
                if (n >= e.minimum) {
                    a = e;
                } else {
                    break;
                }
            }
        }
        return a;
    }
    function getColorRangeByMinimum(e, t) {
        const n = e.length;
        let o = null;
        for (let a = 0; a < n; a++) {
            const n = e[a];
            if (t.toString() === n.minimum.toString()) {
                o = n;
                break;
            }
        }
        return o;
    }
    function getSortedColorRanges(e) {
        return e.colorRanges.sort((function(e, t) {
            return e.minimum - t.minimum;
        }));
    }
    function isHoliday(e, t) {
        const n = {
            matched: false,
            name: null
        };
        const o = e.holidays.length;
        const a = t.getDate();
        const i = t.getMonth() + 1;
        const r = t.getFullYear();
        for (let t = 0; t < o; t++) {
            let o = e.holidays[t];
            if (Is.definedString(o.date) && o.showInViews) {
                const e = o.date.split("/");
                if (e.length === 2) {
                    n.matched = a === parseInt(e[0]) && i === parseInt(e[1]);
                } else if (e.length === 3) {
                    n.matched = a === parseInt(e[0]) && i === parseInt(e[1]) && r === parseInt(e[2]);
                }
                if (n.matched) {
                    n.name = o.name;
                    break;
                }
            }
        }
        return n;
    }
    function makeAreaDroppable(e, t) {
        if (t.allowFileImports && !t._currentView.isInFetchMode) {
            e.ondragover = DomElement.cancelBubble;
            e.ondragenter = DomElement.cancelBubble;
            e.ondragleave = DomElement.cancelBubble;
            e.ondrop = e => {
                DomElement.cancelBubble(e);
                if (Is.defined(window.FileReader) && e.dataTransfer.files.length > 0) {
                    importFromFiles(e.dataTransfer.files, t);
                }
            };
        }
    }
    function importFromFilesSelected(e) {
        const t = DomElement.createWithNoContainer("input");
        t.type = "file";
        t.accept = ".json, .txt, .csv";
        t.multiple = true;
        t.onchange = () => {
            importFromFiles(t.files, e);
        };
        t.click();
    }
    function importFromFiles(e, t) {
        const n = e.length;
        const o = [];
        const a = getCurrentViewData(t);
        const i = (e, i) => {
            o.push(e);
            for (let e in i) {
                if (i.hasOwnProperty(e)) {
                    if (!a.hasOwnProperty(e)) {
                        a[e] = 0;
                    }
                    a[e] += i[e];
                }
            }
            if (o.length === n) {
                Trigger.customEvent(t.events.onImport, t._currentView.element);
                renderControlContainer(t);
            }
        };
        for (let t = 0; t < n; t++) {
            const n = e[t];
            const o = n.name.split(".").pop().toLowerCase();
            if (o === "json") {
                importFromJson(n, i);
            } else if (o === "txt") {
                importFromTxt(n, i);
            } else if (o === "csv") {
                importFromCsv(n, i);
            }
        }
    }
    function importFromJson(e, t) {
        const n = new FileReader;
        let o = {};
        n.readAsText(e);
        n.onloadend = () => {
            t(e.name, o);
        };
        n.onload = e => {
            const t = getObjectFromString(e.target.result);
            if (t.parsed && Is.definedObject(t.object)) {
                o = t.object;
            }
        };
    }
    function importFromTxt(e, t) {
        const n = new FileReader;
        const o = {};
        n.readAsText(e);
        n.onloadend = () => {
            t(e.name, o);
        };
        n.onload = e => {
            const t = e.target.result.toString().split("\n");
            const n = t.length;
            for (let e = 0; e < n; e++) {
                const n = t[e].split(":");
                o[n[0].trim()] = parseInt(n[1].trim());
            }
        };
    }
    function importFromCsv(e, t) {
        const n = new FileReader;
        const o = {};
        n.readAsText(e);
        n.onloadend = () => {
            t(e.name, o);
        };
        n.onload = e => {
            const t = e.target.result.toString().replace(new RegExp('"', "g"), "");
            const n = t.split("\n");
            n.shift();
            let a = n.length;
            for (let e = 0; e < a; e++) {
                let t = n[e].split(",");
                o[t[0].trim()] = parseInt(t[1].trim());
            }
        };
    }
    function exportAllData(e, t = null) {
        let n = null;
        const o = getExportMimeType(e);
        const a = Data.getDefaultString(t, e.exportType).toLowerCase();
        if (a === "csv") {
            n = getCsvContent(e);
        } else if (a === "json") {
            n = getJsonContent(e);
        } else if (a === "xml") {
            n = getXmlContents(e);
        } else if (a === "txt") {
            n = getTxtContents(e);
        }
        if (Is.definedString(n)) {
            const t = DomElement.create(document.body, "a");
            t.style.display = "none";
            t.setAttribute("target", "_blank");
            t.setAttribute("href", `data:${o};charset=utf-8,${encodeURIComponent(n)}`);
            t.setAttribute("download", getExportFilename(e));
            t.click();
            document.body.removeChild(t);
            Trigger.customEvent(e.events.onExport, e._currentView.element);
        }
    }
    function getCsvContent(e) {
        const t = getExportData(e);
        const n = [];
        for (let e in t) {
            if (t.hasOwnProperty(e)) {
                n.push(getCsvValueLine([ getCsvValue(e), getCsvValue(t[e].toString()) ]));
            }
        }
        if (n.length > 0) {
            n.unshift(getCsvValueLine([ getCsvValue(_configuration.text.dateText), getCsvValue(_configuration.text.countText) ]));
        }
        return n.join("\n");
    }
    function getJsonContent(e) {
        return JSON.stringify(getExportData(e));
    }
    function getXmlContents(e) {
        const t = getExportData(e);
        const n = [];
        n.push('<?xml version="1.0" ?>');
        n.push("<Dates>");
        for (let e in t) {
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
    function getTxtContents(e) {
        const t = getExportData(e);
        const n = [];
        for (let e in t) {
            if (t.hasOwnProperty(e)) {
                n.push(e + ":" + " " + t[e].toString());
            }
        }
        return n.join("\n");
    }
    function getExportData(e) {
        const t = {};
        const n = getCurrentViewData(e);
        if (e.exportOnlyYearBeingViewed) {
            for (let o = 0; o < 12; o++) {
                const a = DateTime.getTotalDaysInMonth(e._currentView.year, o);
                for (let i = 0; i < a; i++) {
                    const a = DateTime.toStorageDate(new Date(e._currentView.year, o, i + 1));
                    if (n.hasOwnProperty(a)) {
                        t[a] = n[a];
                    }
                }
            }
        } else {
            const e = [];
            for (let t in n) {
                if (n.hasOwnProperty(t)) {
                    e.push(t);
                }
            }
            e.sort();
            const o = e.length;
            for (let a = 0; a < o; a++) {
                const o = e[a];
                if (n.hasOwnProperty(o)) {
                    t[o] = n[o];
                }
            }
        }
        return t;
    }
    function getExportMimeType(e) {
        let t = null;
        if (e.exportType.toLowerCase() === "csv") {
            t = "text/csv";
        } else if (e.exportType.toLowerCase() === "json") {
            t = "application/json";
        } else if (e.exportType.toLowerCase() === "xml") {
            t = "application/xml";
        } else if (e.exportType.toLowerCase() === "txt") {
            t = "text/plain";
        }
        return t;
    }
    function getExportFilename(e) {
        const t = new Date;
        const n = Data.String.padNumber(t.getDate()) + "-" + Data.String.padNumber(t.getMonth() + 1) + "-" + t.getFullYear();
        const o = Data.String.padNumber(t.getHours()) + "-" + Data.String.padNumber(t.getMinutes());
        let a = "";
        if (e._currentView.type !== _configuration.text.unknownTrendText) {
            a = e._currentView.type.toLowerCase().replace(" ", "_") + "_";
        }
        return `${a + n + "_" + o}.${e.exportType.toLowerCase()}`;
    }
    function getCsvValue(e) {
        let t = e.toString().replace(/(\r\n|\n|\r)/gm, "").replace(/(\s\s)/gm, " ");
        t = t.replace(/"/g, '""');
        t = '"' + t + '"';
        return t;
    }
    function getCsvValueLine(e) {
        return e.join(",");
    }
    function getObjectFromString(objectString) {
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
                if (!_configuration.safeMode) {
                    console.error(_configuration.text.objectErrorText.replace("{{error_1}}", e1.message).replace("{{error_2}}", e.message));
                    result.parsed = false;
                }
                result.object = null;
            }
        }
        return result;
    }
    function moveToPreviousYear(e, t = true) {
        let n = true;
        let o = e._currentView.year;
        o--;
        while (!isYearVisible(e, o)) {
            if (isFirstVisibleYear(e, o)) {
                n = false;
                break;
            }
            o--;
        }
        if (n) {
            e._currentView.year = o;
            renderControlContainer(e);
            if (t) {
                Trigger.customEvent(e.events.onBackYear, e._currentView.year);
            }
        }
    }
    function moveToNextYear(e, t = true) {
        let n = true;
        let o = e._currentView.year;
        o++;
        while (!isYearVisible(e, o)) {
            if (isLastVisibleYear(e, o)) {
                n = false;
                break;
            }
            o++;
        }
        if (n) {
            e._currentView.year = o;
            renderControlContainer(e);
            if (t) {
                Trigger.customEvent(e.events.onBackYear, e._currentView.year);
            }
        }
    }
    function destroyElement(e) {
        e._currentView.element.innerHTML = "";
        DomElement.removeClass(e._currentView.element, "heat-js");
        ToolTip.assignToEvents(e, false);
        document.body.removeChild(e._currentView.tooltip);
        if (e._currentView.isInFetchMode && Is.defined(e._currentView.isInFetchModeTimer)) {
            clearInterval(e._currentView.isInFetchModeTimer);
        }
        Trigger.customEvent(e.events.onDestroy, e._currentView.element);
    }
    const _public = {
        addDates: function(e, t, n = null, o = true) {
            if (Is.definedString(e) && Is.definedArray(t) && _elements_DateCounts.hasOwnProperty(e)) {
                const a = _elements_DateCounts[e].options;
                if (!a._currentView.isInFetchMode) {
                    n = Data.getDefaultString(n, _configuration.text.unknownTrendText);
                    const i = t.length;
                    for (let o = 0; o < i; o++) {
                        _public.addDate(e, t[o], n, false);
                    }
                    if (o) {
                        renderControlContainer(a, true);
                    }
                }
            }
            return _public;
        },
        addDate: function(e, t, n = null, o = true) {
            if (Is.definedString(e) && Is.definedDate(t) && _elements_DateCounts.hasOwnProperty(e)) {
                const a = _elements_DateCounts[e].options;
                if (!a._currentView.isInFetchMode) {
                    n = Data.getDefaultString(n, _configuration.text.unknownTrendText);
                    const i = DateTime.toStorageDate(t);
                    if (!_elements_DateCounts[e].typeData.hasOwnProperty(n)) {
                        _elements_DateCounts[e].typeData[n] = {};
                        _elements_DateCounts[e].totalTypes++;
                    }
                    if (!_elements_DateCounts[e].typeData[n].hasOwnProperty(i)) {
                        _elements_DateCounts[e].typeData[n][i] = 0;
                    }
                    _elements_DateCounts[e].typeData[n][i]++;
                    Trigger.customEvent(a.events.onAdd, a._currentView.element);
                    if (o) {
                        renderControlContainer(a, true);
                    }
                }
            }
            return _public;
        },
        updateDate: function(e, t, n, o = null, a = true) {
            if (Is.definedString(e) && Is.definedDate(t) && _elements_DateCounts.hasOwnProperty(e)) {
                const i = _elements_DateCounts[e].options;
                if (!i._currentView.isInFetchMode && n > 0) {
                    const r = DateTime.toStorageDate(t);
                    if (_elements_DateCounts[e].typeData.hasOwnProperty(o)) {
                        o = Data.getDefaultString(o, _configuration.text.unknownTrendText);
                        _elements_DateCounts[e].typeData[o][r] = n;
                        Trigger.customEvent(i.events.onUpdate, i._currentView.element);
                        if (a) {
                            renderControlContainer(i, true);
                        }
                    }
                }
            }
            return _public;
        },
        removeDates: function(e, t, n = null, o = true) {
            if (Is.definedString(e) && Is.definedArray(t) && _elements_DateCounts.hasOwnProperty(e)) {
                const a = _elements_DateCounts[e].options;
                if (!a._currentView.isInFetchMode) {
                    n = Data.getDefaultString(n, _configuration.text.unknownTrendText);
                    const i = t.length;
                    for (let o = 0; o < i; o++) {
                        _public.removeDate(e, t[o], n, false);
                    }
                    if (o) {
                        renderControlContainer(a, true);
                    }
                }
            }
            return _public;
        },
        removeDate: function(e, t, n = null, o = true) {
            if (Is.definedString(e) && Is.definedDate(t) && _elements_DateCounts.hasOwnProperty(e)) {
                const a = _elements_DateCounts[e].options;
                if (!a._currentView.isInFetchMode) {
                    const i = DateTime.toStorageDate(t);
                    if (_elements_DateCounts[e].typeData.hasOwnProperty(n) && _elements_DateCounts[e].typeData[n].hasOwnProperty(i)) {
                        n = Data.getDefaultString(n, _configuration.text.unknownTrendText);
                        if (_elements_DateCounts[e].typeData[n][i] > 0) {
                            _elements_DateCounts[e].typeData[n][i]--;
                        }
                        Trigger.customEvent(a.events.onRemove, a._currentView.element);
                        if (o) {
                            renderControlContainer(a, true);
                        }
                    }
                }
            }
            return _public;
        },
        clearDate: function(e, t, n = null, o = true) {
            if (Is.definedString(e) && Is.definedDate(t) && _elements_DateCounts.hasOwnProperty(e)) {
                const a = _elements_DateCounts[e].options;
                if (!a._currentView.isInFetchMode) {
                    const i = DateTime.toStorageDate(t);
                    if (_elements_DateCounts[e].typeData.hasOwnProperty(n) && _elements_DateCounts[e].typeData[n].hasOwnProperty(i)) {
                        n = Data.getDefaultString(n, _configuration.text.unknownTrendText);
                        delete _elements_DateCounts[e].typeData[n][i];
                        Trigger.customEvent(a.events.onClear, a._currentView.element);
                        if (o) {
                            renderControlContainer(a, true);
                        }
                    }
                }
            }
            return _public;
        },
        resetAll: function(e = true) {
            for (let t in _elements_DateCounts) {
                if (_elements_DateCounts.hasOwnProperty(t)) {
                    _public.reset(t, e);
                }
            }
            return _public;
        },
        reset: function(e, t = true) {
            if (Is.definedString(e) && _elements_DateCounts.hasOwnProperty(e)) {
                const n = _elements_DateCounts[e].options;
                if (!n._currentView.isInFetchMode) {
                    n._currentView.type = _configuration.text.unknownTrendText;
                    createDateStorageForElement(e, n, false);
                    Trigger.customEvent(n.events.onReset, n._currentView.element);
                    if (t) {
                        renderControlContainer(n, true);
                    }
                }
            }
            return _public;
        },
        import: function(e, t = null) {
            if (Is.definedString(e) && _elements_DateCounts.hasOwnProperty(e)) {
                if (Is.definedArray(t)) {
                    importFromFiles(t, _elements_DateCounts[e].options);
                } else {
                    importFromFilesSelected(_elements_DateCounts[e].options);
                }
            }
            return _public;
        },
        export: function(e, t = null) {
            if (Is.definedString(e) && _elements_DateCounts.hasOwnProperty(e)) {
                exportAllData(_elements_DateCounts[e].options, t);
            }
            return _public;
        },
        refresh: function(e) {
            if (Is.definedString(e) && _elements_DateCounts.hasOwnProperty(e)) {
                const t = _elements_DateCounts[e].options;
                renderControlContainer(t, true);
                Trigger.customEvent(t.events.onRefresh, t._currentView.element);
            }
            return _public;
        },
        refreshAll: function() {
            for (let e in _elements_DateCounts) {
                if (_elements_DateCounts.hasOwnProperty(e)) {
                    const t = _elements_DateCounts[e].options;
                    renderControlContainer(t, true);
                    Trigger.customEvent(t.events.onRefresh, t._currentView.element);
                }
            }
            return _public;
        },
        setYear: function(e, t) {
            if (Is.definedString(e) && Is.definedNumber(t) && _elements_DateCounts.hasOwnProperty(e)) {
                const n = _elements_DateCounts[e].options;
                n._currentView.year = t;
                if (!isYearVisible(n, n._currentView.year)) {
                    moveToNextYear(n, false);
                } else {
                    renderControlContainer(n);
                }
                Trigger.customEvent(n.events.onSetYear, n._currentView.year);
            }
            return _public;
        },
        setYearToHighest: function(e) {
            if (Is.definedString(e) && _elements_DateCounts.hasOwnProperty(e)) {
                const t = _elements_DateCounts[e].options;
                const n = getCurrentViewData(t);
                let o = 0;
                for (let e in n) {
                    if (n.hasOwnProperty(e)) {
                        o = Math.max(o, parseInt(DateTime.getStorageDateYear(e)));
                    }
                }
                if (o > 0) {
                    t._currentView.year = o;
                    if (!isYearVisible(t, t._currentView.year)) {
                        moveToNextYear(t, false);
                    } else {
                        renderControlContainer(t);
                    }
                    Trigger.customEvent(t.events.onSetYear, t._currentView.year);
                }
            }
            return _public;
        },
        setYearToLowest: function(e) {
            if (Is.definedString(e) && _elements_DateCounts.hasOwnProperty(e)) {
                const t = _elements_DateCounts[e].options;
                const n = getCurrentViewData(t);
                let o = 9999;
                for (let e in n) {
                    if (n.hasOwnProperty(e)) {
                        o = Math.min(o, parseInt(DateTime.getStorageDateYear(e)));
                    }
                }
                if (o < 9999) {
                    t._currentView.year = o;
                    if (!isYearVisible(t, t._currentView.year)) {
                        moveToPreviousYear(t, false);
                    } else {
                        renderControlContainer(t);
                    }
                    Trigger.customEvent(t.events.onSetYear, t._currentView.year);
                }
            }
            return _public;
        },
        moveToPreviousYear: function(e) {
            if (Is.definedString(e) && _elements_DateCounts.hasOwnProperty(e)) {
                moveToPreviousYear(_elements_DateCounts[e].options);
            }
            return _public;
        },
        moveToNextYear: function(e) {
            if (Is.definedString(e) && _elements_DateCounts.hasOwnProperty(e)) {
                moveToNextYear(_elements_DateCounts[e].options);
            }
            return _public;
        },
        moveToCurrentYear: function(e) {
            if (Is.definedString(e) && _elements_DateCounts.hasOwnProperty(e)) {
                const t = _elements_DateCounts[e].options;
                t._currentView.year = (new Date).getFullYear();
                if (!isYearVisible(t, t._currentView.year)) {
                    moveToNextYear(t, false);
                } else {
                    renderControlContainer(t);
                }
                Trigger.customEvent(t.events.onSetYear, t._currentView.year);
            }
            return _public;
        },
        getYear: function(e) {
            let t = -1;
            if (Is.definedString(e) && _elements_DateCounts.hasOwnProperty(e)) {
                const n = _elements_DateCounts[e].options;
                t = n._currentView.year;
            }
            return t;
        },
        render: function(e, t) {
            if (Is.definedObject(e) && Is.definedObject(t)) {
                renderControl(renderBindingOptions(t, e));
            }
            return _public;
        },
        renderAll: function() {
            render();
            return _public;
        },
        switchView: function(e, t) {
            if (Is.definedString(e) && Is.definedString(t) && _elements_DateCounts.hasOwnProperty(e)) {
                const n = _elements_DateCounts[e].options;
                let o;
                if (t.toLowerCase() === "map") {
                    o = 1;
                } else if (t.toLowerCase() === "chart") {
                    o = 2;
                } else if (t.toLowerCase() === "days") {
                    o = 3;
                } else if (t.toLowerCase() === "statistics") {
                    o = 4;
                } else {
                    o = 1;
                }
                if (Is.definedNumber(o)) {
                    n._currentView.view = o;
                    Trigger.customEvent(n.events.onViewSwitch, t);
                    renderControlContainer(n, false, true);
                }
            }
            return _public;
        },
        switchType: function(e, t) {
            if (Is.definedString(e) && Is.definedString(t) && _elements_DateCounts.hasOwnProperty(e) && _elements_DateCounts[e].typeData.hasOwnProperty(t)) {
                const n = _elements_DateCounts[e].options;
                if (n._currentView.type !== t) {
                    n._currentView.type = t;
                    Trigger.customEvent(n.events.onTypeSwitch, t);
                    renderControlContainer(n);
                }
            }
            return _public;
        },
        updateOptions: function(e, t) {
            if (Is.definedString(e) && Is.definedObject(t) && _elements_DateCounts.hasOwnProperty(e)) {
                const n = _elements_DateCounts[e].options;
                const o = binding.options.get(t);
                let a = false;
                for (let e in o) {
                    if (o.hasOwnProperty(e) && n.hasOwnProperty(e) && n[e] !== o[e]) {
                        n[e] = o[e];
                        a = true;
                    }
                }
                if (a) {
                    renderControlContainer(n, true);
                    Trigger.customEvent(n.events.onRefresh, n._currentView.element);
                    Trigger.customEvent(n.events.onOptionsUpdate, n._currentView.element, n);
                }
            }
            return _public;
        },
        destroyAll: function() {
            for (let e in _elements_DateCounts) {
                if (_elements_DateCounts.hasOwnProperty(e)) {
                    destroyElement(_elements_DateCounts[e].options);
                }
            }
            _elements_DateCounts = {};
            return _public;
        },
        destroy: function(e) {
            if (Is.definedString(e) && _elements_DateCounts.hasOwnProperty(e)) {
                destroyElement(_elements_DateCounts[e].options);
                delete _elements_DateCounts[e];
            }
            return _public;
        },
        setConfiguration: function(e, t = true) {
            if (Is.definedObject(e)) {
                let n = false;
                const o = _configuration;
                for (let t in e) {
                    if (e.hasOwnProperty(t) && _configuration.hasOwnProperty(t) && o[t] !== e[t]) {
                        o[t] = e[t];
                        n = true;
                    }
                }
                if (n) {
                    _configuration = Config.Options.get(o);
                    if (t) {
                        _public.refreshAll();
                    }
                }
            }
            return _public;
        },
        getIds: function() {
            const e = [];
            for (let t in _elements_DateCounts) {
                if (_elements_DateCounts.hasOwnProperty(t)) {
                    e.push(t);
                }
            }
            return e;
        },
        getVersion: function() {
            return "4.1.0";
        }
    };
    (() => {
        _configuration = Config.Options.get();
        document.addEventListener("DOMContentLoaded", (() => {
            render();
        }));
        window.addEventListener("pagehide", (() => {
            cancelAllPullDataTimers();
        }));
        if (!Is.defined(window.$heat)) {
            window.$heat = _public;
        }
    })();
})();//# sourceMappingURL=heat.js.map