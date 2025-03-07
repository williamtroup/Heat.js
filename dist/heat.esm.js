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
    function i(e) {
        return t(e) && typeof e === "boolean";
    }
    e.definedBoolean = i;
    function o(e) {
        return t(e) && typeof e === "string";
    }
    e.definedString = o;
    function r(e) {
        return t(e) && typeof e === "function";
    }
    e.definedFunction = r;
    function s(e) {
        return t(e) && typeof e === "number";
    }
    e.definedNumber = s;
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
        let r = t;
        const s = n(o);
        r = r.replace("{dddd}", e.text.dayNames[s]);
        r = r.replace("{dd}", Str.padNumber(o.getDate()));
        r = r.replace("{d}", o.getDate().toString());
        r = r.replace("{o}", i(e, o.getDate()));
        r = r.replace("{mmmm}", e.text.monthNames[o.getMonth()]);
        r = r.replace("{mm}", Str.padNumber(o.getMonth() + 1));
        r = r.replace("{m}", (o.getMonth() + 1).toString());
        r = r.replace("{yyyy}", o.getFullYear().toString());
        r = r.replace("{yyy}", o.getFullYear().toString().substring(1));
        r = r.replace("{yy}", o.getFullYear().toString().substring(2));
        r = r.replace("{y}", parseInt(o.getFullYear().toString().substring(2)).toString());
        return r;
    }
    e.getCustomFormattedDateText = o;
    function r(e) {
        return e.getFullYear() + "-" + Str.padNumber(e.getMonth() + 1) + "-" + Str.padNumber(e.getDate());
    }
    e.toStorageDate = r;
    function s(e) {
        return e.split("-");
    }
    e.getStorageDate = s;
    function a(e) {
        return e.split("-")[0];
    }
    e.getStorageDateYear = a;
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
        const r = o === "text";
        let s = r ? document.createTextNode("") : document.createElement(o);
        if (Is.defined(n)) {
            s.className = n;
        }
        if (Is.defined(i)) {
            e.insertBefore(s, i);
        } else {
            e.appendChild(s);
        }
        return s;
    }
    e.create = n;
    function i(e, t, i, o, r = null) {
        const s = n(e, t, i, r);
        s.innerHTML = o;
        return s;
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
    function r(e, t) {
        e.classList.add(t);
    }
    e.addClass = r;
    function s(e, t) {
        e.classList.remove(t);
    }
    e.removeClass = s;
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
        const r = n(e, "div");
        const s = n(r, "label", "checkbox");
        const a = n(s, "input");
        a.type = "checkbox";
        a.name = o;
        n(s, "span", "check-mark");
        i(s, "span", "text", t);
        return a;
    }
    e.createCheckBox = d;
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
        n("mousemove", (() => r(e)));
        i("scroll", (() => r(e)));
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
        r(t);
        t._currentView.tooltipTimer = setTimeout((() => {
            t._currentView.tooltip.innerHTML = n;
            t._currentView.tooltip.style.display = "block";
            DomElement.showElementAtMousePosition(e, t._currentView.tooltip);
        }), t.tooltip.delay);
    }
    e.show = o;
    function r(e) {
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
    e.hide = r;
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
            const r = Default2.getString(i.view, "").toLowerCase();
            i._currentView = {};
            i._currentView.element = n;
            i._currentView.disabledBackground = null;
            i._currentView.configurationDialog = null;
            i._currentView.dayCheckBoxes = [];
            i._currentView.monthCheckBoxes = [];
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
            if (r === "map") {
                i._currentView.view = 1;
            } else if (r === "chart") {
                i._currentView.view = 2;
            } else if (r === "days") {
                i._currentView.view = 3;
            } else if (r === "statistics") {
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
            t.exportOnlyYearBeingViewed = Default2.getBoolean(t.exportOnlyYearBeingViewed, true);
            t.year = Default2.getNumber(t.year, (new Date).getFullYear());
            t.view = Default2.getString(t.view, "map");
            t.exportType = Default2.getString(t.exportType, "csv");
            t.useLocalStorageForData = Default2.getBoolean(t.useLocalStorageForData, false);
            t.allowFileImports = Default2.getBoolean(t.allowFileImports, true);
            t.yearsToHide = Default2.getArray(t.yearsToHide, []);
            t.dataFetchDelay = Default2.getNumber(t.dataFetchDelay, 6e4);
            t.showOnlyDataForYearsAvailable = Default2.getBoolean(t.showOnlyDataForYearsAvailable, false);
            t.showHolidaysInDayToolTips = Default2.getBoolean(t.showHolidaysInDayToolTips, false);
            t.colorRanges = r(t);
            t.holidays = s(t);
            t.title = a(t);
            t.description = l(t);
            t.guide = c(t);
            t.tooltip = u(t);
            t.views.map = d(t);
            t.views.chart = f(t);
            t.views.days = m(t);
            t.views.statistics = w(t);
            t.events = g(t);
            return t;
        }
        e.get = o;
        function r(e) {
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
        function s(e) {
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
            if (Is.invalidOptionArray(e.views.days.monthsToShow)) {
                e.views.days.monthsToShow = t;
            }
            if (Is.invalidOptionArray(e.views.days.daysToShow)) {
                e.views.days.daysToShow = n;
            }
            return e.views.days;
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
            if (Is.invalidOptionArray(e.views.statistics.monthsToShow)) {
                e.views.statistics.monthsToShow = t;
            }
            if (Is.invalidOptionArray(e.views.statistics.daysToShow)) {
                e.views.statistics.daysToShow = n;
            }
            return e.views.statistics;
        }
        function g(e) {
            e.events = Default2.getObject(e.events, {});
            e.events.onDayClick = Default2.getFunction(e.events.onDayClick, null);
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
            e.events.onStatisticClick = Default2.getFunction(e.events.onStatisticClick, null);
            e.events.onDataFetch = Default2.getFunction(e.events.onDataFetch, null);
            e.events.onClear = Default2.getFunction(e.events.onClear, null);
            e.events.onUpdate = Default2.getFunction(e.events.onUpdate, null);
            e.events.onOptionsUpdate = Default2.getFunction(e.events.onOptionsUpdate, null);
            e.events.onWeekDayClick = Default2.getFunction(e.events.onWeekDayClick, null);
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

(() => {
    let e = {};
    let t = {};
    const n = "HOLIDAY";
    const i = "HJS_";
    function o() {
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
                    s(Binding.Options.getForNewInstance(e, o.object, t));
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
        e._currentView.element.removeAttribute(Constant.HEAT_JS_ATTRIBUTE_NAME);
        A(e._currentView.element.id, e);
        a(e);
        Trigger.customEvent(e.events.onRenderComplete, e._currentView.element);
    }
    function a(e, t = false, n = false) {
        if (t) {
            U(e);
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
        e._currentView.yearsAvailable = W(e);
        ToolTip.hide(e);
        G(e);
        if (e.title.showConfigurationButton) {
            Disabled.Background.render(e);
            l(e);
        }
        ToolTip.renderControl(e);
        d(e);
        h(e, n);
        if (e.views.chart.enabled) {
            v(e, n);
            e._currentView.chartContents.style.display = "none";
        }
        if (e.views.days.enabled) {
            b(e, n);
            e._currentView.daysContents.style.display = "none";
        }
        if (e.views.statistics.enabled) {
            E(e, n);
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
    function l(t) {
        t._currentView.configurationDialog = DomElement.create(t._currentView.disabledBackground, "div", "dialog configuration");
        const n = DomElement.create(t._currentView.configurationDialog, "div", "dialog-title-bar");
        const i = DomElement.create(t._currentView.configurationDialog, "div", "dialog-contents");
        const o = DomElement.create(n, "div", "dialog-close");
        const r = DomElement.create(i, "div", "side-container panel");
        const s = DomElement.create(i, "div", "side-container panel");
        DomElement.createWithHTML(n, "span", "dialog-title-bar-text", e.text.configurationTitleText);
        DomElement.createWithHTML(r, "div", "side-container-title-text", `${e.text.visibleDaysText}${":"}`);
        DomElement.createWithHTML(s, "div", "side-container-title-text", `${e.text.visibleMonthsText}${":"}`);
        const a = DomElement.create(s, "div", "side-container");
        const l = DomElement.create(s, "div", "side-container");
        o.onclick = () => u(t);
        for (let n = 0; n < 7; n++) {
            t._currentView.dayCheckBoxes[n] = DomElement.createCheckBox(r, e.text.dayNames[n], n.toString());
        }
        for (let n = 0; n < 7; n++) {
            t._currentView.monthCheckBoxes[n] = DomElement.createCheckBox(a, e.text.monthNames[n], n.toString());
        }
        for (let n = 7; n < 12; n++) {
            t._currentView.monthCheckBoxes[n] = DomElement.createCheckBox(l, e.text.monthNames[n], n.toString());
        }
        ToolTip.add(o, t, e.text.closeToolTipText);
    }
    function c(e) {
        Disabled.Background.show(e);
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
            e._currentView.dayCheckBoxes[n].checked = R(t, n + 1);
        }
        for (let t = 0; t < 12; t++) {
            e._currentView.monthCheckBoxes[t].checked = H(n, t);
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
        let i = false;
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
            i = true;
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
            i = true;
        }
        if (i) {
            a(e);
            Trigger.customEvent(e.events.onOptionsUpdate, e._currentView.element, e);
        } else {
            ToolTip.hide(e);
        }
    }
    function d(t) {
        if (t.title.showText || t.title.showYearSelector || t.title.showRefreshButton || t.title.showExportButton || t.title.showImportButton) {
            const n = DomElement.create(t._currentView.element, "div", "title-bar");
            const i = DomElement.create(n, "div", "title");
            if (t.views.chart.enabled || t.views.days.enabled || t.views.statistics.enabled) {
                if (t.title.showTitleDropDownButton) {
                    DomElement.create(i, "div", "down-arrow");
                }
            } else {
                DomElement.addClass(i, "no-click");
            }
            if (t.title.showText) {
                i.innerHTML += t.title.text;
            }
            if (t.views.chart.enabled || t.views.days.enabled || t.views.statistics.enabled) {
                f(t, i);
            }
            if (t.title.showImportButton && !t._currentView.isInFetchMode) {
                const i = DomElement.createWithHTML(n, "button", "import", e.text.importButtonSymbolText);
                i.onclick = () => oe(t);
                ToolTip.add(i, t, e.text.importButtonText);
            }
            if (t.title.showExportButton) {
                const i = DomElement.createWithHTML(n, "button", "export", e.text.exportButtonSymbolText);
                i.onclick = () => ce(t);
                ToolTip.add(i, t, e.text.exportButtonText);
            }
            if (t.title.showRefreshButton) {
                const i = DomElement.createWithHTML(n, "button", "refresh", e.text.refreshButtonSymbolText);
                ToolTip.add(i, t, e.text.refreshButtonText);
                i.onclick = () => {
                    a(t);
                    Trigger.customEvent(t.events.onRefresh, t._currentView.element);
                };
            }
            if (t.title.showYearSelector) {
                const i = DomElement.createWithHTML(n, "button", "back", e.text.backButtonSymbolText);
                i.onclick = () => De(t);
                ToolTip.add(i, t, e.text.backButtonText);
                if (Y(t, t._currentView.year)) {
                    i.disabled = true;
                }
                t._currentView.yearText = DomElement.createWithHTML(n, "div", "year-text", t._currentView.year.toString());
                if (t.title.showYearSelectionDropDown) {
                    w(t);
                } else {
                    DomElement.addClass(t._currentView.yearText, "no-click");
                }
                if (t.title.showConfigurationButton) {
                    let i = DomElement.create(n, "div", "configure");
                    i.onclick = () => c(t);
                    ToolTip.add(i, t, e.text.configurationToolTipText);
                }
                if (t.title.showCurrentYearButton) {
                    const i = DomElement.createWithHTML(n, "button", "current", e.text.currentYearSymbolText);
                    ToolTip.add(i, t, e.text.currentYearText);
                    i.onclick = () => {
                        t._currentView.year = (new Date).getFullYear() - 1;
                        ve(t, false);
                        Trigger.customEvent(t.events.onSetYear, t._currentView.year);
                    };
                }
                const o = DomElement.createWithHTML(n, "button", "next", e.text.nextButtonSymbolText);
                o.onclick = () => ve(t);
                ToolTip.add(o, t, e.text.nextButtonText);
                if (j(t, t._currentView.year)) {
                    o.disabled = true;
                }
            }
        }
    }
    function f(t, n) {
        const i = DomElement.create(n, "div", "titles-menu-container");
        const o = DomElement.create(i, "div", "titles-menu");
        if (t.title.showTitleDropDownHeaders) {
            DomElement.createWithHTML(o, "div", "title-menu-header", `${e.text.dataText}${":"}`);
        }
        const r = DomElement.createWithHTML(o, "div", "title-menu-item", e.text.mapText);
        m(t, r, 1, "map");
        if (t.views.chart.enabled) {
            const n = DomElement.createWithHTML(o, "div", "title-menu-item", e.text.chartText);
            m(t, n, 2, "chart");
        }
        if (t.views.days.enabled) {
            if (t.title.showTitleDropDownHeaders) {
                DomElement.createWithHTML(o, "div", "title-menu-header", `${e.text.yearText}${":"}`);
            }
            const n = DomElement.createWithHTML(o, "div", "title-menu-item", e.text.daysText);
            m(t, n, 3, "days");
        }
        if (t.views.statistics.enabled) {
            if (t.title.showTitleDropDownHeaders) {
                DomElement.createWithHTML(o, "div", "title-menu-header", `${e.text.statisticsText}${":"}`);
            }
            const n = DomElement.createWithHTML(o, "div", "title-menu-item", e.text.colorRangesText);
            m(t, n, 4, "statistics");
        }
    }
    function m(e, t, n, i) {
        if (e._currentView.view === n) {
            DomElement.addClass(t, "title-menu-item-active");
        } else {
            t.onclick = () => {
                e._currentView.view = n;
                Trigger.customEvent(e.events.onViewSwitch, i);
                a(e, false, true);
            };
        }
    }
    function w(e) {
        DomElement.create(e._currentView.yearText, "div", "down-arrow");
        const t = DomElement.create(e._currentView.yearText, "div", "years-menu-container");
        const n = DomElement.create(t, "div", "years-menu");
        const i = (new Date).getFullYear();
        let o = null;
        t.style.display = "block";
        t.style.visibility = "hidden";
        for (let t = i - e.title.extraSelectionYears; t < i + e.title.extraSelectionYears; t++) {
            if (P(e, t)) {
                let r = g(e, n, t, i);
                if (!Is.defined(o)) {
                    o = r;
                }
            }
        }
        if (Is.defined(o)) {
            n.scrollTop = o.offsetTop - n.offsetHeight / 2;
        }
        t.style.display = "none";
        t.style.visibility = "visible";
    }
    function g(e, t, n, i) {
        let o = null;
        const r = DomElement.createWithHTML(t, "div", "year-menu-item", n.toString());
        if (e._currentView.year !== n) {
            r.onclick = () => {
                e._currentView.year = n;
                a(e);
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
    function h(t, n) {
        t._currentView.mapContents = DomElement.create(t._currentView.element, "div", "map-contents");
        if (t.views.chart.enabled) {
            D(t);
        }
        if (t.views.days.enabled) {
            S(t);
        }
        if (t.views.statistics.enabled) {
            C(t);
        }
        B(t);
        if (t.views.map.showNoDataMessageWhenDataIsNotAvailable && !p(t)) {
            const i = DomElement.createWithHTML(t._currentView.mapContents, "div", "no-data-message", e.text.noMapDataMessage);
            if (n) {
                DomElement.addClass(i, "view-switch");
            }
        } else {
            t._currentView.mapContents.style.minHeight = "unset";
            ie(t._currentView.mapContents, t);
            const i = DomElement.create(t._currentView.mapContents, "div", "map");
            const o = t._currentView.year;
            let r = false;
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
                    if (R(t.views.map.daysToShow, i + 1)) {
                        const t = !o || i % 3 === 0 ? e.text.dayNames[i] : " ";
                        DomElement.createWithHTML(n, "div", "day-name", t);
                    }
                }
                if (t.views.map.showDaysInReverseOrder) {
                    DomElement.reverseChildrenOrder(n);
                }
            }
            const s = DomElement.create(i, "div", "months");
            const a = te(t);
            for (let n = 0; n < 12; n++) {
                if (H(t.views.map.monthsToShow, n)) {
                    const i = DomElement.create(s, "div", "month");
                    const l = DomElement.create(i, "div", "day-columns");
                    let c = DateTime.getTotalDaysInMonth(o, n);
                    let u = DomElement.create(l, "div", "day-column");
                    let d = false;
                    const f = new Date(o, n, 1);
                    const m = DateTime.getWeekdayNumber(f);
                    let w = 1;
                    c += m;
                    for (let e = 0; e < c; e++) {
                        if (e >= m) {
                            d = true;
                        } else {
                            if (R(t.views.map.daysToShow, w)) {
                                DomElement.create(u, "div", "day-disabled");
                            }
                        }
                        if (d) {
                            let i = null;
                            if (R(t.views.map.daysToShow, w)) {
                                i = y(t, u, e - m, n, o, a);
                            }
                            if ((e + 1) % 7 === 0) {
                                if (t.views.map.showDaysInReverseOrder) {
                                    DomElement.reverseChildrenOrder(u);
                                }
                                u = DomElement.create(l, "div", "day-column");
                                w = 0;
                                if (t._currentView.dayWidth === 0 && Is.defined(i)) {
                                    let e = DomElement.getStyleValueByName(i, "margin-left", true);
                                    let n = DomElement.getStyleValueByName(i, "margin-right", true);
                                    t._currentView.dayWidth = i.offsetWidth + e + n;
                                }
                            }
                        }
                        w++;
                    }
                    if (t.views.map.showMonthNames) {
                        let o;
                        const r = i.offsetWidth;
                        if (!t.views.map.placeMonthNamesOnTheBottom) {
                            o = DomElement.createWithHTML(i, "div", "month-name", e.text.monthNames[n], l);
                        } else {
                            o = DomElement.createWithHTML(i, "div", "month-name-bottom", e.text.monthNames[n]);
                        }
                        if (Is.defined(o)) {
                            if (t.views.map.showMonthDayGaps) {
                                o.style.width = `${r}px`;
                            } else {
                                o.style.width = `${r - t._currentView.dayWidth}px`;
                            }
                        }
                    }
                    if (r && Is.defined(t._currentView.dayWidth)) {
                        if (m > 0 && !t.views.map.showMonthDayGaps) {
                            i.style.marginLeft = `${-t._currentView.dayWidth}px`;
                        } else if (m === 0 && t.views.map.showMonthDayGaps) {
                            i.style.marginLeft = `${t._currentView.dayWidth}px`;
                        }
                    }
                    if (t.views.map.showMonthsInReverseOrder) {
                        DomElement.reverseChildrenOrder(l);
                    }
                    r = true;
                }
            }
            if (t.views.map.showMonthsInReverseOrder) {
                DomElement.reverseChildrenOrder(s);
            }
            if (t.views.map.keepScrollPositions) {
                t._currentView.mapContents.scrollLeft = t._currentView.mapContentsScrollLeft;
            }
        }
    }
    function y(e, n, i, o, r, s) {
        const a = i + 1;
        const l = DomElement.create(n, "div", "day");
        const c = new Date(r, o, a);
        let u = t[e._currentView.element.id].typeData[e._currentView.type][DateTime.toStorageDate(c)];
        u = Default2.getNumber(u, 0);
        L(e, l, c, u);
        if (e.views.map.showDayNumbers && u > 0) {
            l.innerHTML = u.toString();
        }
        if (Is.definedFunction(e.events.onDayClick)) {
            l.onclick = () => Trigger.customEvent(e.events.onDayClick, c, u);
        } else {
            DomElement.addClass(l, "no-hover");
        }
        const d = Z(e, s, u, c);
        if (Is.defined(d) && z(e, d.id)) {
            if (Is.definedString(d.mapCssClassName)) {
                DomElement.addClass(l, d.mapCssClassName);
            } else {
                DomElement.addClass(l, d.cssClassName);
            }
        }
        return l;
    }
    function p(e) {
        let t = false;
        const n = F(e);
        const i = e._currentView.year.toString();
        for (const e in n) {
            if (n.hasOwnProperty(e)) {
                if (DateTime.getStorageDateYear(e) === i) {
                    t = true;
                    break;
                }
            }
        }
        return t;
    }
    function D(e) {
        e._currentView.chartContents = DomElement.create(e._currentView.element, "div", "chart-contents");
        ie(e._currentView.chartContents, e);
    }
    function v(t, n) {
        const i = DomElement.create(t._currentView.chartContents, "div", "chart");
        let o = DomElement.create(i, "div", "y-labels");
        const r = DomElement.create(i, "div", "day-lines");
        const s = te(t);
        const a = x(t);
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
            const n = t._currentView.mapContents.offsetHeight / a;
            let i = 0;
            let o = 0;
            for (let e = 0; e < 12; e++) {
                if (H(t.views.chart.monthsToShow, e)) {
                    const a = DateTime.getTotalDaysInMonth(l, e);
                    let c = 1;
                    i++;
                    for (let i = 0; i < a; i++) {
                        if (R(t.views.chart.daysToShow, c)) {
                            T(r, t, i + 1, e, l, s, n);
                        }
                        if ((i + 1) % 7 === 0) {
                            c = 0;
                        }
                        c++;
                        o++;
                    }
                }
            }
            if (t.views.chart.showInReverseOrder) {
                DomElement.reverseChildrenOrder(r);
            }
            if (t.views.chart.showMonthNames) {
                const n = DomElement.create(t._currentView.chartContents, "div", "chart-months");
                const o = r.offsetWidth / i;
                let s = 0;
                const a = i => {
                    if (H(t.views.chart.monthsToShow, i)) {
                        let t = DomElement.createWithHTML(n, "div", "month-name", e.text.monthNames[i]);
                        t.style.left = `${c + o * s}px`;
                        s++;
                    }
                };
                if (t.views.chart.showInReverseOrder) {
                    for (let e = 12; e--; ) {
                        a(e);
                    }
                } else {
                    for (let e = 0; e < 12; e++) {
                        a(e);
                    }
                }
                n.style.width = `${r.offsetWidth}px`;
                const l = DomElement.create(n, "div", "month-name-space");
                l.style.height = `${n.offsetHeight}px`;
                l.style.width = `${c}px`;
            }
            if (t.views.chart.keepScrollPositions) {
                t._currentView.chartContents.scrollLeft = t._currentView.chartContentsScrollLeft;
            }
        }
    }
    function T(e, t, n, i, o, r, s) {
        const a = new Date(o, i, n);
        const l = DomElement.create(e, "div", "day-line");
        let c = F(t)[DateTime.toStorageDate(a)];
        c = Default2.getNumber(c, 0);
        L(t, l, a, c);
        if (t.views.chart.showLineNumbers && c > 0) {
            DomElement.addClass(l, "day-line-number");
            l.innerHTML = c.toString();
        }
        const u = c * s;
        l.style.height = `${u}px`;
        if (u <= 0) {
            l.style.visibility = "hidden";
        }
        if (Is.definedFunction(t.events.onDayClick)) {
            l.onclick = () => Trigger.customEvent(t.events.onDayClick, a, c);
        } else {
            DomElement.addClass(l, "no-hover");
        }
        const d = Z(t, r, c, a);
        if (Is.defined(d) && z(t, d.id)) {
            if (Is.definedString(d.chartCssClassName)) {
                DomElement.addClass(l, d.chartCssClassName);
            } else {
                DomElement.addClass(l, d.cssClassName);
            }
        }
    }
    function x(e) {
        let t = 0;
        const n = F(e);
        for (let i = 0; i < 12; i++) {
            const o = DateTime.getTotalDaysInMonth(e._currentView.year, i);
            for (let r = 0; r < o; r++) {
                const o = new Date(e._currentView.year, i, r + 1);
                const s = DateTime.toStorageDate(o);
                const a = DateTime.getWeekdayNumber(o);
                if (n.hasOwnProperty(s)) {
                    if (H(e.views.chart.monthsToShow, i) && R(e.views.chart.daysToShow, a)) {
                        t = Math.max(t, n[s]);
                    }
                }
            }
        }
        return t;
    }
    function S(e) {
        e._currentView.daysContents = DomElement.create(e._currentView.element, "div", "days-contents");
        ie(e._currentView.daysContents, e);
    }
    function b(t, n) {
        const i = DomElement.create(t._currentView.daysContents, "div", "days");
        const o = DomElement.create(t._currentView.daysContents, "div", "day-names");
        let r = DomElement.create(i, "div", "y-labels");
        const s = DomElement.create(i, "div", "day-lines");
        const a = _(t);
        if (n) {
            DomElement.addClass(i, "view-switch");
        }
        if (a.largestValue > 0 && t.views.days.showChartYLabels) {
            const e = DomElement.createWithHTML(r, "div", "label-0", a.largestValue.toString());
            DomElement.createWithHTML(r, "div", "label-25", (Math.floor(a.largestValue / 4) * 3).toString());
            DomElement.createWithHTML(r, "div", "label-50", Math.floor(a.largestValue / 2).toString());
            DomElement.createWithHTML(r, "div", "label-75", Math.floor(a.largestValue / 4).toString());
            DomElement.createWithHTML(r, "div", "label-100", "0");
            r.style.width = `${e.offsetWidth}px`;
            o.style.paddingLeft = `${r.offsetWidth + DomElement.getStyleValueByName(r, "margin-right", true)}px`;
        } else {
            r.parentNode.removeChild(r);
            r = null;
        }
        if (a.largestValue === 0) {
            t._currentView.daysContents.style.minHeight = `${t._currentView.mapContents.offsetHeight}px`;
            i.parentNode.removeChild(i);
            o.parentNode.removeChild(o);
            const r = DomElement.createWithHTML(t._currentView.daysContents, "div", "no-days-message", e.text.noDaysDataMessage);
            if (n) {
                DomElement.addClass(r, "view-switch");
            }
        } else {
            const n = t._currentView.mapContents.offsetHeight / a.largestValue;
            for (const i in a.days) {
                if (a.days.hasOwnProperty(i) && R(t.views.days.daysToShow, parseInt(i))) {
                    V(s, parseInt(i), a.days[i], t, n);
                    if (t.views.days.showDayNames) {
                        DomElement.createWithHTML(o, "div", "day-name", e.text.dayNames[parseInt(i) - 1]);
                    }
                }
            }
            if (t.views.days.showInReverseOrder) {
                DomElement.reverseChildrenOrder(s);
                DomElement.reverseChildrenOrder(o);
            }
            if (t.views.days.keepScrollPositions) {
                t._currentView.daysContents.scrollLeft = t._currentView.daysContentsScrollLeft;
            }
        }
    }
    function V(e, t, n, i, o) {
        const r = DomElement.create(e, "div", "day-line");
        const s = n * o;
        r.style.height = `${s}px`;
        if (s <= 0) {
            r.style.visibility = "hidden";
        }
        ToolTip.add(r, i, n.toString());
        if (Is.definedFunction(i.events.onWeekDayClick)) {
            r.onclick = () => Trigger.customEvent(i.events.onWeekDayClick, t, n);
        } else {
            DomElement.addClass(r, "no-hover");
        }
        if (i.views.days.showDayNumbers && n > 0) {
            DomElement.addClass(r, "day-line-number");
            DomElement.createWithHTML(r, "div", "count", n.toString());
        }
    }
    function _(e) {
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
        const n = F(e);
        for (let i = 0; i < 12; i++) {
            const o = DateTime.getTotalDaysInMonth(e._currentView.year, i);
            for (let r = 0; r < o; r++) {
                const o = DateTime.toStorageDate(new Date(e._currentView.year, i, r + 1));
                if (n.hasOwnProperty(o)) {
                    const i = DateTime.getStorageDate(o);
                    const r = new Date(parseInt(i[2]), parseInt(i[1]), parseInt(i[0]));
                    const s = DateTime.getWeekdayNumber(r) + 1;
                    if (!ne(e, r).matched && H(e.views.days.monthsToShow, r.getMonth()) && R(e.views.days.daysToShow, s)) {
                        t.days[s] += n[o];
                        t.largestValue = Math.max(t.largestValue, t.days[s]);
                    }
                }
            }
        }
        return t;
    }
    function C(e) {
        e._currentView.statisticsContents = DomElement.create(e._currentView.element, "div", "statistics-contents");
        ie(e._currentView.statisticsContents, e);
    }
    function E(t, n) {
        const i = DomElement.create(t._currentView.statisticsContents, "div", "statistics");
        const o = DomElement.create(t._currentView.statisticsContents, "div", "statistics-ranges");
        let r = DomElement.create(i, "div", "y-labels");
        const s = DomElement.create(i, "div", "range-lines");
        const a = te(t);
        const l = M(t, a);
        if (n) {
            DomElement.addClass(i, "view-switch");
        }
        if (l.largestValue > 0 && t.views.statistics.showChartYLabels) {
            const e = DomElement.createWithHTML(r, "div", "label-0", l.largestValue.toString());
            DomElement.createWithHTML(r, "div", "label-25", (Math.floor(l.largestValue / 4) * 3).toString());
            DomElement.createWithHTML(r, "div", "label-50", Math.floor(l.largestValue / 2).toString());
            DomElement.createWithHTML(r, "div", "label-75", Math.floor(l.largestValue / 4).toString());
            DomElement.createWithHTML(r, "div", "label-100", "0");
            r.style.width = `${e.offsetWidth}px`;
            o.style.paddingLeft = `${r.offsetWidth + DomElement.getStyleValueByName(r, "margin-right", true)}px`;
        } else {
            r.parentNode.removeChild(r);
            r = null;
        }
        if (l.largestValue === 0) {
            t._currentView.statisticsContents.style.minHeight = `${t._currentView.mapContents.offsetHeight}px`;
            i.parentNode.removeChild(i);
            o.parentNode.removeChild(o);
            const r = DomElement.createWithHTML(t._currentView.statisticsContents, "div", "no-statistics-message", e.text.noStatisticsDataMessage);
            if (n) {
                DomElement.addClass(r, "view-switch");
            }
        } else {
            const e = t._currentView.mapContents.offsetHeight / l.largestValue;
            if (!t.views.statistics.showColorRangeLabels) {
                o.parentNode.removeChild(o);
            }
            for (const n in l.types) {
                if (l.types.hasOwnProperty(n)) {
                    I(parseInt(n), s, l.types[n], t, a, e);
                    const i = ee(a, parseInt(n));
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
                DomElement.reverseChildrenOrder(s);
                DomElement.reverseChildrenOrder(o);
            }
            if (t.views.statistics.keepScrollPositions) {
                t._currentView.statisticsContents.scrollLeft = t._currentView.statisticsContentsScrollLeft;
            }
        }
    }
    function I(e, t, n, i, o, r) {
        const s = DomElement.create(t, "div", "range-line");
        const a = ee(o, e);
        const l = n * r;
        s.style.height = `${l}px`;
        if (l <= 0) {
            s.style.visibility = "hidden";
        }
        ToolTip.add(s, i, n.toString());
        if (i.views.statistics.showRangeNumbers && n > 0) {
            DomElement.addClass(s, "range-line-number");
            DomElement.createWithHTML(s, "div", "count", n.toString());
        }
        if (Is.definedFunction(i.events.onStatisticClick)) {
            s.onclick = () => Trigger.customEvent(i.events.onStatisticClick, a);
        } else {
            DomElement.addClass(s, "no-hover");
        }
        if (Is.defined(a) && z(i, a.id)) {
            if (Is.definedString(a.statisticsCssClassName)) {
                DomElement.addClass(s, a.statisticsCssClassName);
            } else {
                DomElement.addClass(s, a.cssClassName);
            }
        }
    }
    function M(e, t) {
        const n = F(e);
        const i = {
            types: {},
            largestValue: 0
        };
        i.types["0"] = 0;
        for (let o = 0; o < 12; o++) {
            const r = DateTime.getTotalDaysInMonth(e._currentView.year, o);
            for (let s = 0; s < r; s++) {
                const r = DateTime.toStorageDate(new Date(e._currentView.year, o, s + 1));
                if (n.hasOwnProperty(r)) {
                    const o = DateTime.getStorageDate(r);
                    const s = new Date(parseInt(o[2]), parseInt(o[1]), parseInt(o[0]));
                    const a = DateTime.getWeekdayNumber(s) + 1;
                    if (!ne(e, s).matched && H(e.views.statistics.monthsToShow, s.getMonth()) && R(e.views.statistics.daysToShow, a)) {
                        const o = Z(e, t, n[r]);
                        if (!Is.defined(o)) {
                            i.types["0"]++;
                        } else {
                            if (!i.types.hasOwnProperty(o.minimum.toString())) {
                                i.types[o.minimum.toString()] = 0;
                            }
                            i.types[o.minimum]++;
                            i.largestValue = Math.max(i.largestValue, i.types[o.minimum]);
                        }
                    }
                }
            }
        }
        return i;
    }
    function B(n) {
        const i = DomElement.create(n._currentView.element, "div", "guide");
        const o = DomElement.create(i, "div", "map-types");
        let r = 0;
        for (const i in t[n._currentView.element.id].typeData[e.text.unknownTrendText]) {
            if (t[n._currentView.element.id].typeData[e.text.unknownTrendText].hasOwnProperty(i)) {
                r++;
                break;
            }
        }
        if (t[n._currentView.element.id].totalTypes > 1) {
            if (Is.definedString(n.description.text)) {
                const e = DomElement.create(n._currentView.element, "div", "description", i);
                k(n, e);
            }
            for (const i in t[n._currentView.element.id].typeData) {
                if (i !== e.text.unknownTrendText || r > 0) {
                    if (r === 0 && n._currentView.type === e.text.unknownTrendText) {
                        n._currentView.type = i;
                    }
                    O(n, o, i);
                }
            }
        } else {
            k(n, o);
        }
        if (n.guide.enabled) {
            const t = DomElement.create(i, "div", "map-toggles");
            if (n.guide.showLessAndMoreLabels) {
                let i = DomElement.createWithHTML(t, "div", "less-text", e.text.lessText);
                if (n.guide.colorRangeTogglesEnabled) {
                    i.onclick = () => K(n, false);
                } else {
                    DomElement.addClass(i, "no-click");
                }
            }
            const o = DomElement.create(t, "div", "days");
            const r = te(n);
            const s = r.length;
            for (let e = 0; e < s; e++) {
                N(n, o, r[e]);
            }
            if (n.guide.showLessAndMoreLabels) {
                const i = DomElement.createWithHTML(t, "div", "more-text", e.text.moreText);
                if (n.guide.colorRangeTogglesEnabled) {
                    i.onclick = () => K(n, true);
                } else {
                    DomElement.addClass(i, "no-click");
                }
            }
        }
    }
    function O(e, t, n) {
        const i = DomElement.createWithHTML(t, "button", "type", n);
        if (e._currentView.type === n) {
            DomElement.addClass(i, "active");
        }
        i.onclick = () => {
            if (e._currentView.type !== n) {
                e._currentView.type = n;
                Trigger.customEvent(e.events.onTypeSwitch, n);
                a(e);
            }
        };
    }
    function N(e, t, n) {
        const i = DomElement.create(t, "div");
        i.className = "day";
        ToolTip.add(i, e, n.tooltipText);
        if (z(e, n.id)) {
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
            i.onclick = () => Q(e, n.id);
        } else {
            DomElement.addClass(i, "no-hover");
        }
    }
    function k(e, t) {
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
    function L(t, n, i, o) {
        if (Is.definedFunction(t.events.onDayToolTipRender)) {
            ToolTip.add(n, t, Trigger.customEvent(t.events.onDayToolTipRender, i, o));
        } else {
            let o = DateTime.getCustomFormattedDateText(e, t.tooltip.dayText, i);
            if (t.showHolidaysInDayToolTips) {
                let e = ne(t, i);
                if (e.matched && Is.definedString(e.name)) {
                    o += `${":"}${" "}${e.name}`;
                }
            }
            ToolTip.add(n, t, o);
        }
    }
    function A(n, i, o = true) {
        t[n] = {
            options: i,
            typeData: {},
            totalTypes: 1
        };
        t[n].typeData[e.text.unknownTrendText] = {};
        if (o && !i._currentView.isInFetchMode) {
            $(i);
        }
    }
    function F(e) {
        return t[e._currentView.element.id].typeData[e._currentView.type];
    }
    function H(e, t) {
        return e.indexOf(t + 1) > -1;
    }
    function R(e, t) {
        return e.indexOf(t) > -1;
    }
    function W(e) {
        let t = [];
        if (e.showOnlyDataForYearsAvailable) {
            let n = F(e);
            for (const e in n) {
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
    function P(e, t) {
        return e.yearsToHide.indexOf(t) === -1 && (e._currentView.yearsAvailable.length === 0 || e._currentView.yearsAvailable.indexOf(t) > -1);
    }
    function Y(e, t) {
        return e._currentView.yearsAvailable.length > 0 && t <= e._currentView.yearsAvailable[0];
    }
    function j(e, t) {
        return e._currentView.yearsAvailable.length > 0 && t >= e._currentView.yearsAvailable[e._currentView.yearsAvailable.length - 1];
    }
    function $(n) {
        if (n.useLocalStorageForData && window.localStorage) {
            const o = window.localStorage.length;
            const r = n._currentView.element.id;
            for (let n = 0; n < o; n++) {
                const o = window.localStorage.key(n);
                if (Str.startsWithAnyCase(o, i)) {
                    const n = window.localStorage.getItem(o);
                    const i = Default2.getObjectFromString(n, e);
                    if (i.parsed) {
                        t[r].typeData = i.object;
                        t[r].totalTypes = 0;
                        for (const e in t[r].typeData) {
                            if (t[r].typeData.hasOwnProperty(e)) {
                                t[r].totalTypes++;
                            }
                        }
                    }
                }
            }
        }
    }
    function U(e) {
        if (e.useLocalStorageForData && window.localStorage) {
            const n = e._currentView.element.id;
            J(e);
            const o = JSON.stringify(t[n].typeData);
            window.localStorage.setItem(i + n, o);
        }
    }
    function J(e) {
        if (e.useLocalStorageForData && window.localStorage) {
            const t = window.localStorage.length;
            const n = [];
            const o = e._currentView.element.id;
            for (let e = 0; e < t; e++) {
                if (Str.startsWithAnyCase(window.localStorage.key(e), i + o)) {
                    n.push(window.localStorage.key(e));
                }
            }
            const r = n.length;
            for (let e = 0; e < r; e++) {
                window.localStorage.removeItem(n[e]);
            }
        }
    }
    function G(e) {
        if (e._currentView.isInFetchMode) {
            if (e._currentView.isInFetchModeTimer === 0) {
                X(e);
            }
            if (e._currentView.isInFetchModeTimer === 0) {
                e._currentView.isInFetchModeTimer = setInterval((() => {
                    X(e);
                    a(e);
                }), e.dataFetchDelay);
            }
        }
    }
    function X(n) {
        const i = n._currentView.element.id;
        const o = Trigger.customEvent(n.events.onDataFetch, i);
        if (Is.definedObject(o)) {
            A(i, n, false);
            for (const n in o) {
                if (o.hasOwnProperty(n)) {
                    if (!t[i].typeData[e.text.unknownTrendText].hasOwnProperty(n)) {
                        t[i].typeData[e.text.unknownTrendText][n] = 0;
                    }
                    t[i].typeData[e.text.unknownTrendText][n] += o[n];
                }
            }
        }
    }
    function q() {
        for (const e in t) {
            if (t.hasOwnProperty(e)) {
                const n = t[e].options;
                if (Is.defined(n._currentView.isInFetchModeTimer)) {
                    clearInterval(n._currentView.isInFetchModeTimer);
                    n._currentView.isInFetchModeTimer = 0;
                }
            }
        }
    }
    function z(e, t) {
        let i = false;
        if (t === n) {
            i = true;
        } else {
            const n = e.colorRanges.length;
            for (let o = 0; o < n; o++) {
                const n = e.colorRanges[o];
                if (n.id === t && Default2.getBoolean(n.visible, true)) {
                    i = true;
                    break;
                }
            }
        }
        return i;
    }
    function K(e, t) {
        const n = e.colorRanges.length;
        for (let i = 0; i < n; i++) {
            e.colorRanges[i].visible = t;
            Trigger.customEvent(e.events.onColorRangeTypeToggle, e.colorRanges[i].id, t);
        }
        a(e);
    }
    function Q(e, t) {
        const n = e.colorRanges.length;
        for (let i = 0; i < n; i++) {
            const n = e.colorRanges[i];
            if (n.id === t) {
                n.visible = !Default2.getBoolean(n.visible, true);
                Trigger.customEvent(e.events.onColorRangeTypeToggle, n.id, n.visible);
                a(e);
                break;
            }
        }
    }
    function Z(e, t, i, o = null) {
        let r = null;
        if (Is.defined(o) && ne(e, o).matched) {
            r = {
                cssClassName: "holiday",
                id: n,
                visible: true,
                minimum: 0
            };
        }
        if (!Is.defined(r)) {
            const e = t.length;
            for (let n = 0; n < e; n++) {
                const e = t[n];
                if (i >= e.minimum) {
                    r = e;
                } else {
                    break;
                }
            }
        }
        return r;
    }
    function ee(e, t) {
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
    function te(e) {
        return e.colorRanges.sort((function(e, t) {
            return e.minimum - t.minimum;
        }));
    }
    function ne(e, t) {
        const n = {
            matched: false,
            name: null
        };
        const i = e.holidays.length;
        const o = t.getDate();
        const r = t.getMonth() + 1;
        const s = t.getFullYear();
        for (let t = 0; t < i; t++) {
            let i = e.holidays[t];
            if (Is.definedString(i.date) && i.showInViews) {
                const e = i.date.split("/");
                if (e.length === 2) {
                    n.matched = o === parseInt(e[0]) && r === parseInt(e[1]);
                } else if (e.length === 3) {
                    n.matched = o === parseInt(e[0]) && r === parseInt(e[1]) && s === parseInt(e[2]);
                }
                if (n.matched) {
                    n.name = i.name;
                    break;
                }
            }
        }
        return n;
    }
    function ie(e, t) {
        if (t.allowFileImports && !t._currentView.isInFetchMode) {
            e.ondragover = DomElement.cancelBubble;
            e.ondragenter = DomElement.cancelBubble;
            e.ondragleave = DomElement.cancelBubble;
            e.ondrop = e => {
                DomElement.cancelBubble(e);
                if (Is.defined(window.FileReader) && e.dataTransfer.files.length > 0) {
                    re(e.dataTransfer.files, t);
                }
            };
        }
    }
    function oe(e) {
        const t = DomElement.createWithNoContainer("input");
        t.type = "file";
        t.accept = ".json, .txt, .csv";
        t.multiple = true;
        t.onchange = () => re(t.files, e);
        t.click();
    }
    function re(e, t) {
        const n = e.length;
        const i = [];
        const o = F(t);
        const r = (e, r) => {
            i.push(e);
            for (const e in r) {
                if (r.hasOwnProperty(e)) {
                    if (!o.hasOwnProperty(e)) {
                        o[e] = 0;
                    }
                    o[e] += r[e];
                }
            }
            if (i.length === n) {
                Trigger.customEvent(t.events.onImport, t._currentView.element);
                a(t);
            }
        };
        for (let t = 0; t < n; t++) {
            const n = e[t];
            const i = n.name.split(".").pop().toLowerCase();
            if (i === "json") {
                se(n, r);
            } else if (i === "txt") {
                ae(n, r);
            } else if (i === "csv") {
                le(n, r);
            }
        }
    }
    function se(t, n) {
        const i = new FileReader;
        let o = {};
        i.onloadend = () => n(t.name, o);
        i.onload = t => {
            const n = Default2.getObjectFromString(t.target.result, e);
            if (n.parsed && Is.definedObject(n.object)) {
                o = n.object;
            }
        };
        i.readAsText(t);
    }
    function ae(e, t) {
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
    function le(e, t) {
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
    function ce(e, t = null) {
        let n = null;
        const i = ge(e);
        const o = Default2.getString(t, e.exportType).toLowerCase();
        if (o === "csv") {
            n = ue(e);
        } else if (o === "json") {
            n = de(e);
        } else if (o === "xml") {
            n = fe(e);
        } else if (o === "txt") {
            n = me(e);
        }
        if (Is.definedString(n)) {
            const t = DomElement.create(document.body, "a");
            t.style.display = "none";
            t.setAttribute("target", "_blank");
            t.setAttribute("href", `data:${i};charset=utf-8,${encodeURIComponent(n)}`);
            t.setAttribute("download", he(e));
            t.click();
            document.body.removeChild(t);
            Trigger.customEvent(e.events.onExport, e._currentView.element);
        }
    }
    function ue(t) {
        const n = we(t);
        const i = [];
        for (const e in n) {
            if (n.hasOwnProperty(e)) {
                i.push(pe([ ye(e), ye(n[e].toString()) ]));
            }
        }
        if (i.length > 0) {
            i.unshift(pe([ ye(e.text.dateText), ye(e.text.countText) ]));
        }
        return i.join("\n");
    }
    function de(e) {
        return JSON.stringify(we(e));
    }
    function fe(e) {
        const t = we(e);
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
    function me(e) {
        const t = we(e);
        const n = [];
        for (const e in t) {
            if (t.hasOwnProperty(e)) {
                n.push(`${e}${":"}${" "}${t[e].toString()}`);
            }
        }
        return n.join("\n");
    }
    function we(e) {
        const t = {};
        const n = F(e);
        if (e.exportOnlyYearBeingViewed) {
            for (let i = 0; i < 12; i++) {
                const o = DateTime.getTotalDaysInMonth(e._currentView.year, i);
                for (let r = 0; r < o; r++) {
                    const o = DateTime.toStorageDate(new Date(e._currentView.year, i, r + 1));
                    if (n.hasOwnProperty(o)) {
                        t[o] = n[o];
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
            const i = e.length;
            for (let o = 0; o < i; o++) {
                const i = e[o];
                if (n.hasOwnProperty(i)) {
                    t[i] = n[i];
                }
            }
        }
        return t;
    }
    function ge(e) {
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
    function he(t) {
        const n = new Date;
        const i = `${Str.padNumber(n.getDate())}${"-"}${Str.padNumber(n.getMonth() + 1)}${"-"}${n.getFullYear()}`;
        const o = `${Str.padNumber(n.getHours())}${"-"}${Str.padNumber(n.getMinutes())}`;
        let r = "";
        if (t._currentView.type !== e.text.unknownTrendText) {
            r = `${t._currentView.type.toLowerCase().replace(/ /g, "_")}${"_"}`;
        }
        return `${r}${i}${"_"}${o}.${t.exportType.toLowerCase()}`;
    }
    function ye(e) {
        let t = e.toString().replace(/(\r\n|\n|\r)/gm, "").replace(/(\s\s)/gm, " ");
        t = t.replace(/"/g, '""');
        t = `"${t}"`;
        return t;
    }
    function pe(e) {
        return e.join(",");
    }
    function De(e, t = true) {
        let n = true;
        let i = e._currentView.year;
        i--;
        while (!P(e, i)) {
            if (Y(e, i)) {
                n = false;
                break;
            }
            i--;
        }
        if (n) {
            e._currentView.year = i;
            a(e);
            if (t) {
                Trigger.customEvent(e.events.onBackYear, e._currentView.year);
            }
        }
    }
    function ve(e, t = true) {
        let n = true;
        let i = e._currentView.year;
        i++;
        while (!P(e, i)) {
            if (j(e, i)) {
                n = false;
                break;
            }
            i++;
        }
        if (n) {
            e._currentView.year = i;
            a(e);
            if (t) {
                Trigger.customEvent(e.events.onNextYear, e._currentView.year);
            }
        }
    }
    function Te(e) {
        e._currentView.element.innerHTML = "";
        DomElement.removeClass(e._currentView.element, "heat-js");
        ToolTip.assignToEvents(e, false);
        document.body.removeChild(e._currentView.tooltip);
        if (e._currentView.isInFetchMode && Is.defined(e._currentView.isInFetchModeTimer)) {
            clearInterval(e._currentView.isInFetchModeTimer);
        }
        Trigger.customEvent(e.events.onDestroy, e._currentView.element);
    }
    const xe = {
        addDates: function(n, i, o = null, r = true) {
            if (Is.definedString(n) && Is.definedArray(i) && t.hasOwnProperty(n)) {
                const s = t[n].options;
                if (!s._currentView.isInFetchMode) {
                    o = Default2.getString(o, e.text.unknownTrendText);
                    const t = i.length;
                    for (let e = 0; e < t; e++) {
                        xe.addDate(n, i[e], o, false);
                    }
                    if (r) {
                        a(s, true);
                    }
                }
            }
            return xe;
        },
        addDate: function(n, i, o = null, r = true) {
            if (Is.definedString(n) && Is.definedDate(i) && t.hasOwnProperty(n)) {
                const s = t[n].options;
                if (!s._currentView.isInFetchMode) {
                    o = Default2.getString(o, e.text.unknownTrendText);
                    const l = DateTime.toStorageDate(i);
                    if (!t[n].typeData.hasOwnProperty(o)) {
                        t[n].typeData[o] = {};
                        t[n].totalTypes++;
                    }
                    if (!t[n].typeData[o].hasOwnProperty(l)) {
                        t[n].typeData[o][l] = 0;
                    }
                    t[n].typeData[o][l]++;
                    Trigger.customEvent(s.events.onAdd, s._currentView.element);
                    if (r) {
                        a(s, true);
                    }
                }
            }
            return xe;
        },
        updateDate: function(n, i, o, r = null, s = true) {
            if (Is.definedString(n) && Is.definedDate(i) && t.hasOwnProperty(n)) {
                const l = t[n].options;
                if (!l._currentView.isInFetchMode && o > 0) {
                    const c = DateTime.toStorageDate(i);
                    if (t[n].typeData.hasOwnProperty(r)) {
                        r = Default2.getString(r, e.text.unknownTrendText);
                        t[n].typeData[r][c] = o;
                        Trigger.customEvent(l.events.onUpdate, l._currentView.element);
                        if (s) {
                            a(l, true);
                        }
                    }
                }
            }
            return xe;
        },
        removeDates: function(n, i, o = null, r = true) {
            if (Is.definedString(n) && Is.definedArray(i) && t.hasOwnProperty(n)) {
                const s = t[n].options;
                if (!s._currentView.isInFetchMode) {
                    o = Default2.getString(o, e.text.unknownTrendText);
                    const t = i.length;
                    for (let e = 0; e < t; e++) {
                        xe.removeDate(n, i[e], o, false);
                    }
                    if (r) {
                        a(s, true);
                    }
                }
            }
            return xe;
        },
        removeDate: function(n, i, o = null, r = true) {
            if (Is.definedString(n) && Is.definedDate(i) && t.hasOwnProperty(n)) {
                const s = t[n].options;
                if (!s._currentView.isInFetchMode) {
                    const l = DateTime.toStorageDate(i);
                    if (t[n].typeData.hasOwnProperty(o) && t[n].typeData[o].hasOwnProperty(l)) {
                        o = Default2.getString(o, e.text.unknownTrendText);
                        if (t[n].typeData[o][l] > 0) {
                            t[n].typeData[o][l]--;
                        }
                        Trigger.customEvent(s.events.onRemove, s._currentView.element);
                        if (r) {
                            a(s, true);
                        }
                    }
                }
            }
            return xe;
        },
        clearDate: function(n, i, o = null, r = true) {
            if (Is.definedString(n) && Is.definedDate(i) && t.hasOwnProperty(n)) {
                const s = t[n].options;
                if (!s._currentView.isInFetchMode) {
                    const l = DateTime.toStorageDate(i);
                    if (t[n].typeData.hasOwnProperty(o) && t[n].typeData[o].hasOwnProperty(l)) {
                        o = Default2.getString(o, e.text.unknownTrendText);
                        delete t[n].typeData[o][l];
                        Trigger.customEvent(s.events.onClear, s._currentView.element);
                        if (r) {
                            a(s, true);
                        }
                    }
                }
            }
            return xe;
        },
        resetAll: function(e = true) {
            for (const n in t) {
                if (t.hasOwnProperty(n)) {
                    xe.reset(n, e);
                }
            }
            return xe;
        },
        reset: function(n, i = true) {
            if (Is.definedString(n) && t.hasOwnProperty(n)) {
                const o = t[n].options;
                if (!o._currentView.isInFetchMode) {
                    o._currentView.type = e.text.unknownTrendText;
                    A(n, o, false);
                    Trigger.customEvent(o.events.onReset, o._currentView.element);
                    if (i) {
                        a(o, true);
                    }
                }
            }
            return xe;
        },
        import: function(e, n = null) {
            if (Is.definedString(e) && t.hasOwnProperty(e)) {
                if (Is.definedArray(n)) {
                    re(n, t[e].options);
                } else {
                    oe(t[e].options);
                }
            }
            return xe;
        },
        export: function(e, n = null) {
            if (Is.definedString(e) && t.hasOwnProperty(e)) {
                ce(t[e].options, n);
            }
            return xe;
        },
        refresh: function(e) {
            if (Is.definedString(e) && t.hasOwnProperty(e)) {
                const n = t[e].options;
                a(n, true);
                Trigger.customEvent(n.events.onRefresh, n._currentView.element);
            }
            return xe;
        },
        refreshAll: function() {
            for (const e in t) {
                if (t.hasOwnProperty(e)) {
                    const n = t[e].options;
                    a(n, true);
                    Trigger.customEvent(n.events.onRefresh, n._currentView.element);
                }
            }
            return xe;
        },
        setYear: function(e, n) {
            if (Is.definedString(e) && Is.definedNumber(n) && t.hasOwnProperty(e)) {
                const i = t[e].options;
                i._currentView.year = n;
                if (!P(i, i._currentView.year)) {
                    ve(i, false);
                } else {
                    a(i);
                }
                Trigger.customEvent(i.events.onSetYear, i._currentView.year);
            }
            return xe;
        },
        setYearToHighest: function(e) {
            if (Is.definedString(e) && t.hasOwnProperty(e)) {
                const n = t[e].options;
                const i = F(n);
                let o = 0;
                for (const e in i) {
                    if (i.hasOwnProperty(e)) {
                        o = Math.max(o, parseInt(DateTime.getStorageDateYear(e)));
                    }
                }
                if (o > 0) {
                    n._currentView.year = o;
                    if (!P(n, n._currentView.year)) {
                        ve(n, false);
                    } else {
                        a(n);
                    }
                    Trigger.customEvent(n.events.onSetYear, n._currentView.year);
                }
            }
            return xe;
        },
        setYearToLowest: function(e) {
            if (Is.definedString(e) && t.hasOwnProperty(e)) {
                const n = t[e].options;
                const i = F(n);
                let o = 9999;
                for (const e in i) {
                    if (i.hasOwnProperty(e)) {
                        o = Math.min(o, parseInt(DateTime.getStorageDateYear(e)));
                    }
                }
                if (o < 9999) {
                    n._currentView.year = o;
                    if (!P(n, n._currentView.year)) {
                        De(n, false);
                    } else {
                        a(n);
                    }
                    Trigger.customEvent(n.events.onSetYear, n._currentView.year);
                }
            }
            return xe;
        },
        moveToPreviousYear: function(e) {
            if (Is.definedString(e) && t.hasOwnProperty(e)) {
                De(t[e].options);
            }
            return xe;
        },
        moveToNextYear: function(e) {
            if (Is.definedString(e) && t.hasOwnProperty(e)) {
                ve(t[e].options);
            }
            return xe;
        },
        moveToCurrentYear: function(e) {
            if (Is.definedString(e) && t.hasOwnProperty(e)) {
                const n = t[e].options;
                n._currentView.year = (new Date).getFullYear();
                if (!P(n, n._currentView.year)) {
                    ve(n, false);
                } else {
                    a(n);
                }
                Trigger.customEvent(n.events.onSetYear, n._currentView.year);
            }
            return xe;
        },
        getYear: function(e) {
            let n = -1;
            if (Is.definedString(e) && t.hasOwnProperty(e)) {
                const i = t[e].options;
                n = i._currentView.year;
            }
            return n;
        },
        render: function(t, n) {
            if (Is.definedObject(t) && Is.definedObject(n)) {
                s(Binding.Options.getForNewInstance(e, n, t));
            }
            return xe;
        },
        renderAll: function() {
            o();
            return xe;
        },
        switchView: function(e, n) {
            if (Is.definedString(e) && Is.definedString(n) && t.hasOwnProperty(e)) {
                const i = t[e].options;
                let o;
                if (n.toLowerCase() === "map") {
                    o = 1;
                } else if (n.toLowerCase() === "chart") {
                    o = 2;
                } else if (n.toLowerCase() === "days") {
                    o = 3;
                } else if (n.toLowerCase() === "statistics") {
                    o = 4;
                } else {
                    o = 1;
                }
                if (Is.definedNumber(o)) {
                    i._currentView.view = o;
                    Trigger.customEvent(i.events.onViewSwitch, n);
                    a(i, false, true);
                }
            }
            return xe;
        },
        switchType: function(e, n) {
            if (Is.definedString(e) && Is.definedString(n) && t.hasOwnProperty(e) && t[e].typeData.hasOwnProperty(n)) {
                const i = t[e].options;
                if (i._currentView.type !== n) {
                    i._currentView.type = n;
                    Trigger.customEvent(i.events.onTypeSwitch, n);
                    a(i);
                }
            }
            return xe;
        },
        updateOptions: function(e, n) {
            if (Is.definedString(e) && Is.definedObject(n) && t.hasOwnProperty(e)) {
                const i = t[e].options;
                const o = Binding.Options.get(n);
                let r = false;
                for (const e in o) {
                    if (o.hasOwnProperty(e) && i.hasOwnProperty(e) && i[e] !== o[e]) {
                        i[e] = o[e];
                        r = true;
                    }
                }
                if (r) {
                    a(i, true);
                    Trigger.customEvent(i.events.onRefresh, i._currentView.element);
                    Trigger.customEvent(i.events.onOptionsUpdate, i._currentView.element, i);
                }
            }
            return xe;
        },
        destroyAll: function() {
            for (const e in t) {
                if (t.hasOwnProperty(e)) {
                    Te(t[e].options);
                }
            }
            t = {};
            return xe;
        },
        destroy: function(e) {
            if (Is.definedString(e) && t.hasOwnProperty(e)) {
                Te(t[e].options);
                delete t[e];
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
                    if (n) {
                        xe.refreshAll();
                    }
                }
            }
            return xe;
        },
        getIds: function() {
            const e = [];
            for (const n in t) {
                if (t.hasOwnProperty(n)) {
                    e.push(n);
                }
            }
            return e;
        },
        getVersion: function() {
            return "4.3.0";
        }
    };
    (() => {
        e = Config.Options.get();
        document.addEventListener("DOMContentLoaded", (() => o()));
        window.addEventListener("pagehide", (() => q()));
        if (!Is.defined(window.$heat)) {
            window.$heat = xe;
        }
    })();
})();//# sourceMappingURL=heat.esm.js.map