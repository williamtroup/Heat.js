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
    function h(e, t) {
        return e._currentView.yearsAvailable.length > 0 && t <= e._currentView.yearsAvailable[0];
    }
    e.firstVisibleYear = h;
    function w(e, t) {
        return e._currentView.yearsAvailable.length > 0 && t >= e._currentView.yearsAvailable[e._currentView.yearsAvailable.length - 1];
    }
    e.lastVisibleYear = w;
    function g(e) {
        return e.startsWith("rgba") || e.startsWith("rgb");
    }
    e.rgbColor = g;
    function y(e) {
        return e.startsWith("#") && (e.length === 6 || e.length === 8);
    }
    e.hexColor = y;
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
    function m(t, n) {
        const o = e.getStyleValueByName(t, "background-color");
        const i = e.getStyleValueByName(n, "background-color");
        n.style.background = `linear-gradient(to top, ${o}, ${i})`;
    }
    e.addGradientEffect = m;
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
            t.startMonth = Default2.getNumberInRange(t.startMonth, 0, 11, 0);
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
            e.views.days.useDifferentOpacities = Default2.getBoolean(e.views.days.useDifferentOpacities, false);
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
            e.views.months.useDifferentOpacities = Default2.getBoolean(e.views.months.useDifferentOpacities, false);
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
            e.events.onMapDayClick = Default2.getFunction(e.events.onMapDayClick, null);
            e.events.onMapDayDblClick = Default2.getFunction(e.events.onMapDayDblClick, null);
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
            e.text.onlyDataBeingViewedText = Default2.getAnyString(e.text.onlyDataBeingViewedText, "Only data being viewed");
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
        e.json = t;
        function n(e, t) {
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
        e.txt = n;
        function o(e, t) {
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
        e.csv = o;
        function i(e, t) {
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
        e.tsv = i;
        function s(e, t) {
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
        e.md = s;
        function r(e, t) {
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
        e.yaml = r;
        function a(e, t) {
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
        e.toml = a;
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
        function t(e, t) {
            const n = [];
            for (const t in e) {
                if (e.hasOwnProperty(t)) {
                    n.push(d([ u(t), u(e[t].toString()) ]));
                }
            }
            if (n.length > 0) {
                n.unshift(d([ u(t.text.dateText), u(t.text.countText) ]));
            }
            return n.join("\n");
        }
        e.csv = t;
        function n(e) {
            return JSON.stringify(e);
        }
        e.json = n;
        function o(e) {
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
        e.xml = o;
        function i(e) {
            const t = [];
            for (const n in e) {
                if (e.hasOwnProperty(n)) {
                    t.push(`${n}${":"}${" "}${e[n].toString()}`);
                }
            }
            return t.join("\n");
        }
        e.txt = i;
        function s(e, t) {
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
            const o = DateTime.getCustomFormattedDateText(t, "{dddd}, {d}{o} {mmmm} {yyyy}", new Date);
            n.push(`Last-Modified:${" "}${o}`);
            for (const t in e) {
                if (e.hasOwnProperty(t)) {
                    n.push(`${t}${":"}${" "}${e[t].toString()}`);
                }
            }
            return n.join("\n");
        }
        e.yaml = l;
        function c(e, t) {
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
        e.toml = c;
        function u(e) {
            let t = e.toString().replace(/(\r\n|\n|\r)/gm, "").replace(/(\s\s)/gm, " ");
            t = t.replace(/"/g, '""');
            t = `"${t}"`;
            return t;
        }
        function d(e) {
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
})(Convert || (Convert = {}));

(() => {
    const e = "HOLIDAY";
    const t = "HJS_";
    let n = {};
    let o = null;
    let i = {};
    function s() {
        const e = n.domElementTypes;
        const t = e.length;
        for (let n = 0; n < t; n++) {
            const t = document.getElementsByTagName(e[n]);
            const o = [].slice.call(t);
            const i = o.length;
            for (let e = 0; e < i; e++) {
                if (!r(o[e])) {
                    break;
                }
            }
        }
    }
    function r(e) {
        let t = true;
        if (Is.defined(e) && e.hasAttribute(Constant.HEAT_JS_ATTRIBUTE_NAME)) {
            const o = e.getAttribute(Constant.HEAT_JS_ATTRIBUTE_NAME);
            if (Is.definedString(o)) {
                const i = Default2.getObjectFromString(o, n);
                if (i.parsed && Is.definedObject(i.object)) {
                    a(Binding.Options.getForNewInstance(n, i.object, e));
                } else {
                    if (!n.safeMode) {
                        console.error(n.text.attributeNotValidErrorText.replace("{{attribute_name}}", Constant.HEAT_JS_ATTRIBUTE_NAME));
                        t = false;
                    }
                }
            } else {
                if (!n.safeMode) {
                    console.error(n.text.attributeNotSetErrorText.replace("{{attribute_name}}", Constant.HEAT_JS_ATTRIBUTE_NAME));
                    t = false;
                }
            }
        }
        return t;
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
            Z(e);
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
        te(e);
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
            E(e, n);
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
    function u(e) {
        e._currentView.configurationDialog = DomElement.create(e._currentView.disabledBackground, "div", "dialog configuration");
        const t = DomElement.create(e._currentView.configurationDialog, "div", "dialog-title-bar");
        const o = DomElement.create(e._currentView.configurationDialog, "div", "dialog-contents");
        const i = DomElement.create(t, "div", "dialog-close");
        const s = DomElement.create(o, "div", "side-container panel");
        const r = DomElement.create(o, "div", "side-container panel");
        DomElement.createWithHTML(t, "span", "dialog-title-bar-text", n.text.configurationTitleText);
        DomElement.createWithHTML(s, "div", "side-container-title-text", `${n.text.visibleDaysText}${":"}`);
        DomElement.createWithHTML(r, "div", "side-container-title-text", `${n.text.visibleMonthsText}${":"}`);
        const a = DomElement.create(r, "div", "side-container");
        const l = DomElement.create(r, "div", "side-container");
        i.onclick = () => m(e);
        for (let t = 0; t < 7; t++) {
            e._currentView.configurationDialogDayCheckBoxes[t] = DomElement.createCheckBox(s, n.text.dayNames[t], t.toString());
        }
        let c = a;
        let u = 0;
        for (let t = e.startMonth; t < 12 + e.startMonth; t++) {
            let o = t;
            if (e.startMonth > 0 && t > 11) {
                o = t - 12;
            }
            e._currentView.configurationDialogMonthCheckBoxes[o] = DomElement.createCheckBox(c, n.text.monthNames[o], o.toString());
            u++;
            if (u > 6) {
                c = l;
            }
        }
        ToolTip.add(i, e, n.text.closeToolTipText);
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
    function f(e) {
        e._currentView.exportDialog = DomElement.create(e._currentView.disabledBackground, "div", "dialog export");
        const t = DomElement.create(e._currentView.exportDialog, "div", "dialog-title-bar");
        const o = DomElement.create(e._currentView.exportDialog, "div", "dialog-contents");
        const i = DomElement.create(t, "div", "dialog-close");
        DomElement.createWithHTML(t, "span", "dialog-title-bar-text", n.text.selectTypeText);
        e._currentView.exportDialogExportTypeSelect = DomElement.create(o, "select", "input-box");
        e._currentView.exportDialogExportTypeSelect.name = crypto.randomUUID();
        e._currentView.exportDialogExportFilenameInput = DomElement.create(o, "input", "input-box filename");
        e._currentView.exportDialogExportFilenameInput.placeholder = n.text.filenamePlaceholderText;
        e._currentView.exportDialogExportOnlyDataBeingViewedCheckBox = DomElement.createCheckBox(o, n.text.onlyDataBeingViewedText, crypto.randomUUID());
        e._currentView.exportDialogExportOnlyDataBeingViewedCheckBox.checked = e.exportOnlyDataBeingViewed;
        const s = DomElement.create(o, "div", "buttons");
        const r = DomElement.createWithHTML(s, "button", "", n.text.exportButtonText);
        h(e);
        const a = () => {
            const t = e._currentView.exportDialogExportTypeSelect.value;
            const n = e._currentView.exportDialogExportFilenameInput.value;
            const o = e._currentView.exportDialogExportOnlyDataBeingViewedCheckBox.checked;
            g(e);
            fe(e, t, n, o);
        };
        e._currentView.exportDialogExportFilenameInput.onkeydown = e => {
            if (e.key === "Enter") {
                a();
            }
        };
        r.onclick = () => a();
        i.onclick = () => g(e);
        ToolTip.add(i, e, n.text.closeToolTipText);
    }
    function h(e) {
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
    function y(e) {
        if (e.title.showText || e.title.showYearSelector || e.title.showRefreshButton || e.title.showExportButton || e.title.showImportButton) {
            const t = DomElement.create(e._currentView.element, "div", "title-bar");
            const o = DomElement.create(t, "div", "title");
            const i = e.title.showTitleDropDownMenu && (e.views.chart.enabled || e.views.days.enabled || e.views.statistics.enabled);
            if (i) {
                if (e.title.showTitleDropDownButton) {
                    DomElement.create(o, "div", "down-arrow");
                }
            } else {
                DomElement.addClass(o, "no-click");
            }
            if (e.title.showText) {
                o.innerHTML += e.title.text;
                if (e.title.showSectionText) {
                    DomElement.createWithHTML(o, "span", "section-text", "[");
                    if (e._currentView.view === 1) {
                        DomElement.createWithHTML(o, "span", "section-text-name", n.text.mapText);
                    } else if (e.views.chart.enabled && e._currentView.view === 2) {
                        DomElement.createWithHTML(o, "span", "section-text-name", n.text.chartText);
                    } else if (e.views.days.enabled && e._currentView.view === 3) {
                        DomElement.createWithHTML(o, "span", "section-text-name", n.text.daysText);
                    } else if (e.views.months.enabled && e._currentView.view === 5) {
                        DomElement.createWithHTML(o, "span", "section-text-name", n.text.monthsText);
                    } else if (e.views.statistics.enabled && e._currentView.view === 4) {
                        DomElement.createWithHTML(o, "span", "section-text-name", n.text.colorRangesText);
                    } else {
                        DomElement.createWithHTML(o, "span", "section-text-name", n.text.mapText);
                    }
                    DomElement.createWithHTML(o, "span", "section-text", "]");
                }
            }
            if (i) {
                p(e, o);
            }
            if (e.title.showImportButton && !e._currentView.isInFetchMode) {
                const o = DomElement.createWithHTML(t, "button", "import", n.text.importButtonSymbolText);
                o.onclick = () => de(e);
                if (e.title.showToolTips) {
                    ToolTip.add(o, e, n.text.importButtonText);
                }
            }
            if (e.title.showExportButton) {
                const o = DomElement.createWithHTML(t, "button", "export", n.text.exportButtonSymbolText);
                o.onclick = () => w(e);
                if (e.title.showToolTips) {
                    ToolTip.add(o, e, n.text.exportButtonText);
                }
            }
            if (e.title.showRefreshButton) {
                const o = DomElement.createWithHTML(t, "button", "refresh", n.text.refreshButtonSymbolText);
                if (e.title.showToolTips) {
                    ToolTip.add(o, e, n.text.refreshButtonText);
                }
                o.onclick = () => {
                    l(e);
                    Trigger.customEvent(e.events.onRefresh, e._currentView.element);
                };
            }
            if (e.title.showYearSelector) {
                const o = DomElement.createWithHTML(t, "button", "back", n.text.backButtonSymbolText);
                o.onclick = () => we(e);
                if (e.title.showToolTips) {
                    ToolTip.add(o, e, n.text.backButtonText);
                }
                if (Is.firstVisibleYear(e, e._currentView.year)) {
                    o.disabled = true;
                }
                let i = e._currentView.year.toString();
                if (e.startMonth > 0) {
                    i += ` / ${e._currentView.year + 1}`;
                }
                e._currentView.yearText = DomElement.createWithHTML(t, "div", "year-text", i);
                if (e.title.showYearSelectionDropDown) {
                    v(e);
                } else {
                    DomElement.addClass(e._currentView.yearText, "no-click");
                }
                if (e.title.showConfigurationButton) {
                    let o = DomElement.create(t, "div", "configure");
                    o.onclick = () => d(e);
                    if (e.title.showToolTips) {
                        ToolTip.add(o, e, n.text.configurationToolTipText);
                    }
                }
                if (e.title.showCurrentYearButton) {
                    const o = DomElement.createWithHTML(t, "button", "current", n.text.currentYearSymbolText);
                    if (e.title.showToolTips) {
                        ToolTip.add(o, e, n.text.currentYearText);
                    }
                    o.onclick = () => {
                        e._currentView.year = (new Date).getFullYear() - 1;
                        ge(e, false);
                        Trigger.customEvent(e.events.onSetYear, e._currentView.year);
                    };
                }
                const s = DomElement.createWithHTML(t, "button", "next", n.text.nextButtonSymbolText);
                s.onclick = () => ge(e);
                if (e.title.showToolTips) {
                    ToolTip.add(s, e, n.text.nextButtonText);
                }
                if (Is.lastVisibleYear(e, e._currentView.year)) {
                    s.disabled = true;
                }
            }
        }
    }
    function p(e, t) {
        const o = DomElement.create(t, "div", "titles-menu-container");
        const i = DomElement.create(o, "div", "titles-menu");
        if (e.title.showTitleDropDownHeaders) {
            DomElement.createWithHTML(i, "div", "title-menu-header", `${n.text.dataText}${":"}`);
        }
        const s = DomElement.createWithHTML(i, "div", "title-menu-item", n.text.mapText);
        D(e, s, 1, "map");
        if (e.views.chart.enabled) {
            const t = DomElement.createWithHTML(i, "div", "title-menu-item", n.text.chartText);
            D(e, t, 2, "chart");
        }
        let r = null;
        if (e.views.days.enabled) {
            if (e.title.showTitleDropDownHeaders) {
                r = DomElement.createWithHTML(i, "div", "title-menu-header", `${n.text.yearText}${":"}`);
            }
            const t = DomElement.createWithHTML(i, "div", "title-menu-item", n.text.daysText);
            D(e, t, 3, "days");
        }
        if (e.views.months.enabled) {
            if (e.title.showTitleDropDownHeaders && !Is.defined(r)) {
                r = DomElement.createWithHTML(i, "div", "title-menu-header", `${n.text.yearText}${":"}`);
            }
            const t = DomElement.createWithHTML(i, "div", "title-menu-item", n.text.monthsText);
            D(e, t, 5, "months");
        }
        if (e.views.statistics.enabled) {
            if (e.title.showTitleDropDownHeaders) {
                DomElement.createWithHTML(i, "div", "title-menu-header", `${n.text.statisticsText}${":"}`);
            }
            const t = DomElement.createWithHTML(i, "div", "title-menu-item", n.text.colorRangesText);
            D(e, t, 4, "statistics");
        }
    }
    function D(e, t, n, o) {
        if (e._currentView.view === n) {
            DomElement.addClass(t, "title-menu-item-active");
        } else {
            t.onclick = () => z(e, n, o);
        }
    }
    function v(e) {
        DomElement.create(e._currentView.yearText, "div", "down-arrow");
        const t = DomElement.create(e._currentView.yearText, "div", "years-menu-container");
        const n = DomElement.create(t, "div", "years-menu");
        const o = (new Date).getFullYear();
        let i = null;
        t.style.display = "block";
        t.style.visibility = "hidden";
        for (let t = o - e.title.extraSelectionYears; t < o + e.title.extraSelectionYears; t++) {
            if (Is.yearVisible(e, t)) {
                let s = T(e, n, t, o);
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
    function T(e, t, n, o) {
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
    function x(e) {
        const t = new Date;
        const o = e._currentView.year === t.getFullYear();
        if (e.yearlyStatistics.enabled && (!e.yearlyStatistics.showOnlyForCurrentYear || o)) {
            const s = DomElement.create(e._currentView.element, "div", "yearly-statistics", e._currentView.mapContents);
            const r = Visible.days(e);
            const a = Visible.months(e);
            if (e.yearlyStatistics.showTotalToday) {
                let a = i[e._currentView.element.id].typeData[e._currentView.type][DateTime.toStorageDate(t)];
                const l = DomElement.create(s, "div", "statistics-box");
                const c = DateTime.getWeekdayNumber(t) + 1;
                if (!Is.defined(a) || !Is.dayVisible(r, c)) {
                    a = 0;
                }
                const u = o ? Str.friendlyNumber(a) : n.text.unknownText;
                DomElement.createWithHTML(l, "div", "statistics-box-title", `${n.text.totalTodayText}${":"}`);
                DomElement.createWithHTML(l, "div", "statistics-box-count", u);
            }
            if (e.yearlyStatistics.showTotalThisWeek) {
                let t = 0;
                if (o) {
                    const n = DateTime.getDateForMondayOfCurrentWeek();
                    const o = new Date(n);
                    o.setDate(n.getDate() + 7);
                    t = b(e, r, a, n, o);
                }
                const i = o ? Str.friendlyNumber(t) : n.text.unknownText;
                const l = DomElement.create(s, "div", "statistics-box");
                DomElement.createWithHTML(l, "div", "statistics-box-title", `${n.text.totalThisWeekText}${":"}`);
                DomElement.createWithHTML(l, "div", "statistics-box-count", i);
            }
            if (e.yearlyStatistics.showTotalThisMonth) {
                let i = 0;
                if (o) {
                    const n = new Date(t.getFullYear(), t.getMonth(), 1);
                    const o = new Date(t.getFullYear(), t.getMonth(), DateTime.getTotalDaysInMonth(t.getFullYear(), t.getMonth()) + 1);
                    i = b(e, r, a, n, o);
                }
                const l = o ? Str.friendlyNumber(i) : n.text.unknownText;
                const c = DomElement.create(s, "div", "statistics-box");
                DomElement.createWithHTML(c, "div", "statistics-box-title", `${n.text.totalThisMonthText}${":"}`);
                DomElement.createWithHTML(c, "div", "statistics-box-count", l);
            }
            if (e.yearlyStatistics.showTotalThisYear) {
                const t = new Date(e._currentView.year, e.startMonth, 1);
                const o = new Date(e._currentView.year + 1, e.startMonth, 1);
                const i = b(e, r, a, t, o);
                const l = DomElement.create(s, "div", "statistics-box");
                DomElement.createWithHTML(l, "div", "statistics-box-title", `${n.text.totalThisYearText}${":"}`);
                DomElement.createWithHTML(l, "div", "statistics-box-count", Str.friendlyNumber(i));
            }
            if (s.innerHTML === "") {
                s.parentNode.removeChild(s);
            }
        }
    }
    function b(e, t, n, o, s) {
        let r = 0;
        let a = new Date(o);
        while (a < s) {
            const o = i[e._currentView.element.id].typeData[e._currentView.type][DateTime.toStorageDate(a)];
            const s = DateTime.getWeekdayNumber(a) + 1;
            if (Is.monthVisible(n, a.getMonth()) && Is.dayVisible(t, s) && Is.definedNumber(o)) {
                r += o;
            }
            a.setDate(a.getDate() + 1);
        }
        return r;
    }
    function S(e, t) {
        e._currentView.mapContents = DomElement.create(e._currentView.element, "div", "map-contents");
        if (e.views.chart.enabled) {
            _(e);
        }
        if (e.views.days.enabled) {
            B(e);
        }
        if (e.views.months.enabled) {
            L(e);
        }
        if (e.views.statistics.enabled) {
            W(e);
        }
        P(e);
        if (e.views.map.showNoDataMessageWhenDataIsNotAvailable && !C(e)) {
            const o = DomElement.createWithHTML(e._currentView.mapContents, "div", "no-data-message", n.text.noMapDataMessage);
            if (t) {
                DomElement.addClass(o, "view-switch");
            }
        } else {
            e._currentView.mapContents.style.minHeight = "unset";
            ue(e._currentView.mapContents, e);
            const o = DomElement.create(e._currentView.mapContents, "div", "map");
            const i = e._currentView.year;
            let s = false;
            if (t) {
                DomElement.addClass(o, "view-switch");
            }
            if (e.views.map.showDayNames) {
                const t = DomElement.create(o, "div", "days");
                const i = e.views.map.showMinimalDayNames && e.views.map.daysToShow.length === 7;
                if (!e.views.map.showMonthNames || e.views.map.placeMonthNamesOnTheBottom) {
                    t.className = "days-months-bottom";
                }
                for (let o = 0; o < 7; o++) {
                    if (Is.dayVisible(e.views.map.daysToShow, o + 1)) {
                        const s = !i || o % 3 === 0 ? n.text.dayNames[o] : " ";
                        const r = DomElement.createWithHTML(t, "div", "day-name", s);
                        if (e.views.days.enabled) {
                            r.ondblclick = () => z(e, 3, "days");
                        }
                    }
                }
                if (e.views.map.showDaysInReverseOrder) {
                    DomElement.reverseChildrenOrder(t);
                }
            }
            const r = DomElement.create(o, "div", "months");
            const a = ce(e);
            for (let t = e.startMonth; t < 12 + e.startMonth; t++) {
                let o = t;
                let l = i;
                if (e.startMonth > 0 && t > 11) {
                    o = t - 12;
                    l++;
                }
                if (Is.monthVisible(e.views.map.monthsToShow, o)) {
                    const t = DomElement.create(r, "div", "month");
                    const i = DomElement.create(t, "div", "day-columns");
                    let c = DateTime.getTotalDaysInMonth(l, o);
                    let u = DomElement.create(i, "div", "day-column");
                    let d = false;
                    const m = new Date(l, o, 1);
                    const f = DateTime.getWeekdayNumber(m);
                    let h = 1;
                    c += f;
                    for (let t = 0; t < c; t++) {
                        if (t >= f) {
                            d = true;
                        } else {
                            if (Is.dayVisible(e.views.map.daysToShow, h)) {
                                DomElement.create(u, "div", "day-disabled");
                            }
                        }
                        if (d) {
                            let n = null;
                            if (Is.dayVisible(e.views.map.daysToShow, h)) {
                                n = V(e, u, t - f, o, l, a);
                            }
                            if ((t + 1) % 7 === 0) {
                                if (e.views.map.showDaysInReverseOrder) {
                                    DomElement.reverseChildrenOrder(u);
                                }
                                u = DomElement.create(i, "div", "day-column");
                                h = 0;
                                if (e._currentView.dayWidth === 0 && Is.defined(n)) {
                                    let t = DomElement.getStyleValueByName(n, "margin-left", true);
                                    let o = DomElement.getStyleValueByName(n, "margin-right", true);
                                    e._currentView.dayWidth = n.offsetWidth + t + o;
                                }
                            }
                        }
                        h++;
                    }
                    if (e.views.map.showMonthNames) {
                        let s;
                        const r = t.offsetWidth;
                        let a = n.text.monthNames[o];
                        if (e.startMonth > 0) {
                            a += `${" "}${l}`;
                        }
                        if (!e.views.map.placeMonthNamesOnTheBottom) {
                            s = DomElement.createWithHTML(t, "div", "month-name", a, i);
                        } else {
                            s = DomElement.createWithHTML(t, "div", "month-name-bottom", a);
                        }
                        if (e.views.map.showMonthDayGaps) {
                            s.style.width = `${r}px`;
                        } else {
                            s.style.width = `${r - e._currentView.dayWidth}px`;
                        }
                        if (e.views.months.enabled) {
                            s.ondblclick = () => z(e, 5, "months");
                        }
                    }
                    if (s && Is.defined(e._currentView.dayWidth)) {
                        if (f > 0 && !e.views.map.showMonthDayGaps) {
                            t.style.marginLeft = `${-e._currentView.dayWidth}px`;
                        } else if (f === 0 && e.views.map.showMonthDayGaps) {
                            t.style.marginLeft = `${e._currentView.dayWidth}px`;
                        }
                    }
                    if (e.views.map.showMonthsInReverseOrder) {
                        DomElement.reverseChildrenOrder(i);
                    }
                    s = true;
                }
            }
            if (e.views.map.showMonthsInReverseOrder) {
                DomElement.reverseChildrenOrder(r);
            }
            if (e.views.map.keepScrollPositions) {
                e._currentView.mapContents.scrollLeft = e._currentView.mapContentsScrollLeft;
            }
        }
    }
    function V(e, t, n, o, s, r) {
        const a = n + 1;
        const l = DomElement.create(t, "div", "day");
        const c = new Date(s, o, a);
        const u = Is.holiday(e, c);
        let d = i[e._currentView.element.id].typeData[e._currentView.type][DateTime.toStorageDate(c)];
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
        if (Is.definedFunction(e.events.onMapDayClick)) {
            l.onclick = () => Trigger.customEvent(e.events.onMapDayClick, c, d, u.matched);
        } else if (Is.definedFunction(e.events.onMapDayDblClick)) {
            l.ondblclick = () => Trigger.customEvent(e.events.onMapDayDblClick, c, d, u.matched);
        } else {
            DomElement.addClass(l, "no-hover");
        }
        const m = ae(e, r, d, c);
        if (Is.defined(m) && ie(e, m.id)) {
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
    function C(e) {
        let t = false;
        const n = q(e);
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
        ue(e._currentView.chartContents, e);
    }
    function E(e, t) {
        const o = DomElement.create(e._currentView.chartContents, "div", "chart");
        let i = DomElement.create(o, "div", "y-labels");
        const s = DomElement.create(o, "div", "day-lines");
        const r = ce(e);
        const a = M(e);
        const l = e._currentView.year;
        let c = 0;
        if (t) {
            DomElement.addClass(o, "view-switch");
        }
        if (a > 0 && e.views.chart.showChartYLabels) {
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
            e._currentView.chartContents.style.minHeight = `${e._currentView.mapContents.offsetHeight}px`;
            o.parentNode.removeChild(o);
            const i = DomElement.createWithHTML(e._currentView.chartContents, "div", "no-data-message", n.text.noChartDataMessage);
            if (t) {
                DomElement.addClass(i, "view-switch");
            }
        } else {
            const t = s.offsetHeight / a;
            let o = 0;
            let i = 0;
            let u = [];
            for (let n = e.startMonth; n < 12 + e.startMonth; n++) {
                let a = n;
                let c = l;
                if (e.startMonth > 0 && n > 11) {
                    a = n - 12;
                    c++;
                }
                if (Is.monthVisible(e.views.chart.monthsToShow, a)) {
                    const n = DateTime.getTotalDaysInMonth(c, a);
                    let l = 1;
                    let d = false;
                    o++;
                    for (let o = 0; o < n; o++) {
                        const n = new Date(c, a, l);
                        const m = DateTime.getWeekdayNumber(n) + 1;
                        if (Is.dayVisible(e.views.chart.daysToShow, m)) {
                            const n = I(s, e, o + 1, a, c, r, t);
                            if (!d) {
                                u.push(n);
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
            if (e.views.chart.showInReverseOrder) {
                DomElement.reverseChildrenOrder(s);
                u = u.reverse();
            }
            if (e.views.chart.showMonthNames) {
                const t = DomElement.create(e._currentView.chartContents, "div", "chart-months");
                let o = 0;
                const i = i => {
                    let s = i + e.startMonth;
                    let r = l;
                    if (e.startMonth > 0 && s > 11) {
                        s -= 12;
                        r++;
                    }
                    if (Is.monthVisible(e.views.chart.monthsToShow, s)) {
                        let i = n.text.monthNames[s];
                        if (e.startMonth > 0) {
                            i += `${" "}${r}`;
                        }
                        let a = DomElement.createWithHTML(t, "div", "month-name", i);
                        a.style.left = `${u[o].offsetLeft}px`;
                        if (e.views.months.enabled) {
                            a.ondblclick = () => z(e, 5, "months");
                        }
                        o++;
                    }
                };
                if (e.views.chart.showInReverseOrder) {
                    for (let e = 12; e--; ) {
                        i(e);
                    }
                } else {
                    for (let e = 0; e < 12; e++) {
                        i(e);
                    }
                }
                t.style.width = `${s.offsetWidth}px`;
                const r = DomElement.create(t, "div", "month-name-space");
                r.style.height = `${t.offsetHeight}px`;
                r.style.width = `${c}px`;
            }
            if (e.views.chart.keepScrollPositions) {
                e._currentView.chartContents.scrollLeft = e._currentView.chartContentsScrollLeft;
            }
        }
    }
    function I(e, t, n, o, i, s, r) {
        const a = new Date(i, o, n);
        const l = DomElement.create(e, "div", "day-line");
        const c = Is.holiday(t, a);
        let u = q(t)[DateTime.toStorageDate(a)];
        u = Default2.getNumber(u, 0);
        l.setAttribute(Constant.HEAT_JS_CHART_DATE_ATTRIBUTE_NAME, `${Str.padNumber(n)}-${Str.padNumber(o + 1)}-${i}`);
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
        if (Is.definedFunction(t.events.onMapDayClick)) {
            l.onclick = () => Trigger.customEvent(t.events.onMapDayClick, a, u, c.matched);
        } else if (Is.definedFunction(t.events.onMapDayDblClick)) {
            l.ondblclick = () => Trigger.customEvent(t.events.onMapDayDblClick, a, u, c.matched);
        } else {
            DomElement.addClass(l, "no-hover");
        }
        const m = ae(t, s, u, a);
        if (Is.defined(m) && ie(t, m.id)) {
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
            DomElement.addGradientEffect(t._currentView.element, l);
        }
        return l;
    }
    function M(e) {
        let t = 0;
        const n = q(e);
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
    function B(e) {
        e._currentView.daysContents = DomElement.create(e._currentView.element, "div", "days-contents");
        ue(e._currentView.daysContents, e);
    }
    function k(e, t) {
        const o = DomElement.create(e._currentView.daysContents, "div", "days");
        const i = DomElement.create(e._currentView.daysContents, "div", "day-names");
        let s = DomElement.create(o, "div", "y-labels");
        const r = DomElement.create(o, "div", "day-lines");
        const a = O(e);
        if (t) {
            DomElement.addClass(o, "view-switch");
        }
        if (a.largestValue > 0 && e.views.days.showChartYLabels) {
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
            e._currentView.daysContents.style.minHeight = `${e._currentView.mapContents.offsetHeight}px`;
            o.parentNode.removeChild(o);
            i.parentNode.removeChild(i);
            const s = DomElement.createWithHTML(e._currentView.daysContents, "div", "no-days-message", n.text.noDaysDataMessage);
            if (t) {
                DomElement.addClass(s, "view-switch");
            }
        } else {
            const t = r.offsetHeight / a.largestValue;
            const o = 1 / 7;
            let s = o;
            for (const l in a.values) {
                if (a.values.hasOwnProperty(l) && Is.dayVisible(e.views.days.daysToShow, parseInt(l))) {
                    N(r, parseInt(l), a.values[l], e, t, s);
                    if (e.views.days.showDayNames) {
                        DomElement.createWithHTML(i, "div", "day-name", n.text.dayNames[parseInt(l) - 1]);
                    }
                }
                s += o;
            }
            if (e.views.days.showInReverseOrder) {
                DomElement.reverseChildrenOrder(r);
                DomElement.reverseChildrenOrder(i);
            }
            if (e.views.days.keepScrollPositions) {
                e._currentView.daysContents.scrollLeft = e._currentView.daysContentsScrollLeft;
            }
        }
    }
    function N(e, t, n, o, i, s) {
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
            DomElement.addGradientEffect(o._currentView.element, r);
        } else if (o.views.days.useDifferentOpacities) {
            const e = DomElement.getStyleValueByName(r, "background-color");
            const t = DomElement.getStyleValueByName(r, "border-color");
            if (Is.rgbColor(e)) {
                r.style.backgroundColor = Convert.toRgbOpacityColor(e, s);
            } else if (Is.hexColor(e)) {
                r.style.backgroundColor = Convert.toRgbOpacityColor(Convert.hexToRgba(e), s);
            }
            if (Is.rgbColor(t)) {
                r.style.borderColor = Convert.toRgbOpacityColor(t, s);
            } else if (Is.hexColor(t)) {
                r.style.borderColor = Convert.toRgbOpacityColor(Convert.hexToRgba(t), s);
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
        const o = e._currentView.year;
        for (let i = e.startMonth; i < 12 + e.startMonth; i++) {
            let s = i;
            let r = o;
            if (e.startMonth > 0 && i > 11) {
                s = i - 12;
                r++;
            }
            if (Is.monthVisible(e.views.days.monthsToShow, s)) {
                const o = DateTime.getTotalDaysInMonth(r, s);
                for (let i = 0; i < o; i++) {
                    const o = DateTime.toStorageDate(new Date(r, s, i + 1));
                    if (n.hasOwnProperty(o)) {
                        const i = DateTime.getStorageDate(o);
                        const s = new Date(parseInt(i[2]), parseInt(i[1]), parseInt(i[0]));
                        const r = DateTime.getWeekdayNumber(s) + 1;
                        if (!Is.holiday(e, s).matched && Is.dayVisible(e.views.days.daysToShow, r)) {
                            t.values[r] += n[o];
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
        ue(e._currentView.monthsContents, e);
    }
    function A(e, t) {
        const o = DomElement.create(e._currentView.monthsContents, "div", "months");
        const i = DomElement.create(e._currentView.monthsContents, "div", "month-names");
        let s = DomElement.create(o, "div", "y-labels");
        const r = DomElement.create(o, "div", "month-lines");
        const a = H(e);
        if (t) {
            DomElement.addClass(o, "view-switch");
        }
        if (a.largestValue > 0 && e.views.months.showChartYLabels) {
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
            e._currentView.monthsContents.style.minHeight = `${e._currentView.mapContents.offsetHeight}px`;
            o.parentNode.removeChild(o);
            i.parentNode.removeChild(i);
            const s = DomElement.createWithHTML(e._currentView.monthsContents, "div", "no-months-message", n.text.noMonthsDataMessage);
            if (t) {
                DomElement.addClass(s, "view-switch");
            }
        } else {
            const t = r.offsetHeight / a.largestValue;
            const o = 1 / 12;
            let s = o;
            for (let l = e.startMonth; l < 12 + e.startMonth; l++) {
                let c = l;
                if (e.startMonth > 0 && l > 11) {
                    c = l - 12;
                }
                const u = c + 1;
                if (a.values.hasOwnProperty(u) && Is.monthVisible(e.views.months.monthsToShow, c)) {
                    F(r, u, a.values[u], e, t, s);
                    if (e.views.months.showMonthNames) {
                        DomElement.createWithHTML(i, "div", "month-name", n.text.monthNames[c]);
                    }
                }
                s += o;
            }
            if (e.views.months.showInReverseOrder) {
                DomElement.reverseChildrenOrder(r);
                DomElement.reverseChildrenOrder(i);
            }
            if (e.views.months.keepScrollPositions) {
                e._currentView.monthsContents.scrollLeft = e._currentView.monthsContentsScrollLeft;
            }
        }
    }
    function F(e, t, n, o, i, s) {
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
            DomElement.addGradientEffect(o._currentView.element, r);
        } else if (o.views.months.useDifferentOpacities) {
            const e = DomElement.getStyleValueByName(r, "background-color");
            const t = DomElement.getStyleValueByName(r, "border-color");
            if (Is.rgbColor(e)) {
                r.style.backgroundColor = Convert.toRgbOpacityColor(e, s);
            } else if (Is.hexColor(e)) {
                r.style.backgroundColor = Convert.toRgbOpacityColor(Convert.hexToRgba(e), s);
            }
            if (Is.rgbColor(t)) {
                r.style.borderColor = Convert.toRgbOpacityColor(t, s);
            } else if (Is.hexColor(t)) {
                r.style.borderColor = Convert.toRgbOpacityColor(Convert.hexToRgba(t), s);
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
        const o = e._currentView.year;
        for (let i = e.startMonth; i < 12 + e.startMonth; i++) {
            let s = i;
            let r = o;
            if (e.startMonth > 0 && i > 11) {
                s = i - 12;
                r++;
            }
            if (Is.monthVisible(e.views.months.monthsToShow, s)) {
                const o = s + 1;
                const i = DateTime.getTotalDaysInMonth(r, s);
                for (let a = 0; a < i; a++) {
                    const i = DateTime.toStorageDate(new Date(r, s, a + 1));
                    if (n.hasOwnProperty(i)) {
                        const s = DateTime.getStorageDate(i);
                        const r = new Date(parseInt(s[2]), parseInt(s[1]), parseInt(s[0]));
                        const a = DateTime.getWeekdayNumber(r) + 1;
                        if (!Is.holiday(e, r).matched && Is.dayVisible(e.views.days.daysToShow, a)) {
                            t.values[o] += n[i];
                            t.largestValue = Math.max(t.largestValue, t.values[o]);
                        }
                    }
                }
            }
        }
        return t;
    }
    function W(e) {
        e._currentView.statisticsContents = DomElement.create(e._currentView.element, "div", "statistics-contents");
        ue(e._currentView.statisticsContents, e);
    }
    function R(e, t) {
        const o = DomElement.create(e._currentView.statisticsContents, "div", "statistics");
        const i = DomElement.create(e._currentView.statisticsContents, "div", "statistics-ranges");
        let s = DomElement.create(o, "div", "y-labels");
        const r = DomElement.create(o, "div", "range-lines");
        const a = ce(e);
        const l = Y(e, a);
        if (t) {
            DomElement.addClass(o, "view-switch");
        }
        if (l.largestValue > 0 && e.views.statistics.showChartYLabels) {
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
            e._currentView.statisticsContents.style.minHeight = `${e._currentView.mapContents.offsetHeight}px`;
            o.parentNode.removeChild(o);
            i.parentNode.removeChild(i);
            const s = DomElement.createWithHTML(e._currentView.statisticsContents, "div", "no-statistics-message", n.text.noStatisticsDataMessage);
            if (t) {
                DomElement.addClass(s, "view-switch");
            }
        } else {
            const t = r.offsetHeight / l.largestValue;
            if (!e.views.statistics.showColorRangeLabels) {
                i.parentNode.removeChild(i);
            }
            for (const n in l.types) {
                if (l.types.hasOwnProperty(n)) {
                    $(parseInt(n), r, l.types[n], e, a, t);
                    const o = le(a, parseInt(n));
                    if (e.views.statistics.showColorRangeLabels) {
                        if (!e.views.statistics.useColorRangeNamesForLabels || !Is.defined(o) || !Is.definedString(o.name)) {
                            DomElement.createWithHTML(i, "div", "range-name", `${n}${"+"}`);
                        } else {
                            DomElement.createWithHTML(i, "div", "range-name", o.name);
                        }
                    }
                }
            }
            if (e.views.statistics.showInReverseOrder) {
                DomElement.reverseChildrenOrder(r);
                DomElement.reverseChildrenOrder(i);
            }
            if (e.views.statistics.keepScrollPositions) {
                e._currentView.statisticsContents.scrollLeft = e._currentView.statisticsContentsScrollLeft;
            }
        }
    }
    function $(e, t, n, o, i, s) {
        const r = DomElement.create(t, "div", "range-line");
        const a = le(i, e);
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
        if (Is.defined(a) && ie(o, a.id)) {
            if (Is.definedString(a.statisticsCssClassName)) {
                DomElement.addClass(r, a.statisticsCssClassName);
            } else {
                DomElement.addClass(r, a.cssClassName);
            }
        }
        if (o.views.statistics.useGradients) {
            DomElement.addGradientEffect(o._currentView.element, r);
        }
    }
    function Y(e, t) {
        const n = q(e);
        const o = e._currentView.year;
        const i = t.length;
        const s = {
            types: {},
            largestValue: 0
        };
        s.types["0"] = 0;
        for (let e = 0; e < i; e++) {
            s.types[t[e].minimum.toString()] = 0;
        }
        for (let i = e.startMonth; i < 12 + e.startMonth; i++) {
            let r = i;
            let a = o;
            if (e.startMonth > 0 && i > 11) {
                r = i - 12;
                a++;
            }
            if (Is.monthVisible(e.views.statistics.monthsToShow, r)) {
                const o = DateTime.getTotalDaysInMonth(a, r);
                for (let i = 0; i < o; i++) {
                    const o = DateTime.toStorageDate(new Date(a, r, i + 1));
                    if (n.hasOwnProperty(o)) {
                        const i = DateTime.getStorageDate(o);
                        const r = new Date(parseInt(i[2]), parseInt(i[1]), parseInt(i[0]));
                        const a = DateTime.getWeekdayNumber(r) + 1;
                        if (!Is.holiday(e, r).matched && Is.dayVisible(e.views.statistics.daysToShow, a)) {
                            const i = ae(e, t, n[o]);
                            if (!Is.defined(i)) {
                                s.types["0"]++;
                            } else {
                                if (!s.types.hasOwnProperty(i.minimum.toString())) {
                                    s.types[i.minimum.toString()] = 0;
                                }
                                s.types[i.minimum]++;
                                s.largestValue = Math.max(s.largestValue, s.types[i.minimum]);
                            }
                        }
                    }
                }
            }
        }
        return s;
    }
    function P(e) {
        const t = DomElement.create(e._currentView.element, "div", "guide");
        const o = DomElement.create(t, "div", "map-types");
        let s = 0;
        for (const t in i[e._currentView.element.id].typeData[n.text.unknownTrendText]) {
            if (i[e._currentView.element.id].typeData[n.text.unknownTrendText].hasOwnProperty(t)) {
                s++;
                break;
            }
        }
        if (i[e._currentView.element.id].totalTypes > 1) {
            if (Is.definedString(e.description.text)) {
                const n = DomElement.create(e._currentView.element, "div", "description", t);
                G(e, n);
            }
            for (const t in i[e._currentView.element.id].typeData) {
                if (t !== n.text.unknownTrendText || s > 0) {
                    if (s === 0 && e._currentView.type === n.text.unknownTrendText) {
                        e._currentView.type = t;
                    }
                    j(e, o, t);
                }
            }
        } else {
            G(e, o);
        }
        if (e.guide.enabled) {
            const o = DomElement.create(t, "div", "map-toggles");
            if (e.guide.showLessAndMoreLabels) {
                let t = DomElement.createWithHTML(o, "div", "less-text", n.text.lessText);
                if (e.guide.colorRangeTogglesEnabled) {
                    t.onclick = () => se(e, false);
                } else {
                    DomElement.addClass(t, "no-click");
                }
            }
            const i = DomElement.create(o, "div", "days");
            const s = ce(e);
            const r = s.length;
            for (let t = 0; t < r; t++) {
                U(e, i, s[t]);
            }
            if (e.guide.showLessAndMoreLabels) {
                const t = DomElement.createWithHTML(o, "div", "more-text", n.text.moreText);
                if (e.guide.colorRangeTogglesEnabled) {
                    t.onclick = () => se(e, true);
                } else {
                    DomElement.addClass(t, "no-click");
                }
            }
        }
    }
    function j(e, t, n) {
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
    function U(e, t, n) {
        const o = DomElement.create(t, "div");
        o.className = "day";
        if (e.guide.showToolTips) {
            ToolTip.add(o, e, n.tooltipText);
        }
        if (ie(e, n.id)) {
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
            o.onclick = () => re(e, n.id);
        } else {
            DomElement.addClass(o, "no-hover");
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
    function J(e, t, o, i, s) {
        if (Is.definedFunction(e.events.onDayToolTipRender)) {
            ToolTip.add(t, e, Trigger.customEvent(e.events.onDayToolTipRender, o, i));
        } else {
            let i = DateTime.getCustomFormattedDateText(n, s, o);
            if (e.showHolidaysInDayToolTips) {
                let t = Is.holiday(e, o);
                if (t.matched && Is.definedString(t.name)) {
                    i += `${":"}${" "}${t.name}`;
                }
            }
            ToolTip.add(t, e, i);
        }
    }
    function z(e, t, n) {
        e._currentView.view = t;
        Trigger.customEvent(e.events.onViewSwitch, n);
        l(e, false, true);
    }
    function X(e, t, o = true) {
        i[e] = {
            options: t,
            typeData: {},
            totalTypes: 1
        };
        i[e].typeData[n.text.unknownTrendText] = {};
        if (o && !t._currentView.isInFetchMode) {
            Q(t);
        }
    }
    function q(e) {
        return i[e._currentView.element.id].typeData[e._currentView.type];
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
    function Q(e) {
        if (e.useLocalStorageForData && window.localStorage) {
            const o = window.localStorage.length;
            const s = e._currentView.element.id;
            for (let e = 0; e < o; e++) {
                const o = window.localStorage.key(e);
                if (Str.startsWithAnyCase(o, t)) {
                    const e = window.localStorage.getItem(o);
                    const t = Default2.getObjectFromString(e, n);
                    if (t.parsed) {
                        i[s].typeData = t.object;
                        i[s].totalTypes = 0;
                        for (const e in i[s].typeData) {
                            if (i[s].typeData.hasOwnProperty(e)) {
                                i[s].totalTypes++;
                            }
                        }
                    }
                }
            }
        }
    }
    function Z(e) {
        if (e.useLocalStorageForData && window.localStorage) {
            const n = e._currentView.element.id;
            ee(e);
            const o = JSON.stringify(i[n].typeData);
            window.localStorage.setItem(t + n, o);
        }
    }
    function ee(e) {
        if (e.useLocalStorageForData && window.localStorage) {
            const n = window.localStorage.length;
            const o = [];
            const i = e._currentView.element.id;
            for (let e = 0; e < n; e++) {
                if (Str.startsWithAnyCase(window.localStorage.key(e), t + i)) {
                    o.push(window.localStorage.key(e));
                }
            }
            const s = o.length;
            for (let e = 0; e < s; e++) {
                window.localStorage.removeItem(o[e]);
            }
        }
    }
    function te(e) {
        if (e._currentView.isInFetchMode) {
            if (e._currentView.isInFetchModeTimer === 0) {
                ne(e);
            }
            if (e._currentView.isInFetchModeTimer === 0) {
                e._currentView.isInFetchModeTimer = setInterval(() => {
                    ne(e);
                    l(e);
                }, e.dataFetchDelay);
            }
        }
    }
    function ne(e) {
        const t = e._currentView.element.id;
        const o = Trigger.customEvent(e.events.onDataFetch, t);
        if (Is.definedObject(o)) {
            X(t, e, false);
            for (const e in o) {
                if (o.hasOwnProperty(e)) {
                    if (!i[t].typeData[n.text.unknownTrendText].hasOwnProperty(e)) {
                        i[t].typeData[n.text.unknownTrendText][e] = 0;
                    }
                    i[t].typeData[n.text.unknownTrendText][e] += o[e];
                }
            }
        }
    }
    function oe() {
        for (const e in i) {
            if (i.hasOwnProperty(e)) {
                const t = i[e].options;
                c(t, false);
                if (Is.defined(t._currentView.isInFetchModeTimer)) {
                    clearInterval(t._currentView.isInFetchModeTimer);
                    t._currentView.isInFetchModeTimer = 0;
                }
            }
        }
        if (n.observationMode && Is.defined(o)) {
            o.disconnect();
            o = null;
        }
    }
    function ie(t, n) {
        let o = false;
        if (n === e) {
            o = true;
        } else {
            const e = t.colorRanges.length;
            for (let i = 0; i < e; i++) {
                const e = t.colorRanges[i];
                if (e.id === n && Default2.getBoolean(e.visible, true)) {
                    o = true;
                    break;
                }
            }
        }
        return o;
    }
    function se(e, t) {
        const n = e.colorRanges.length;
        for (let o = 0; o < n; o++) {
            e.colorRanges[o].visible = t;
            Trigger.customEvent(e.events.onColorRangeTypeToggle, e.colorRanges[o].id, t);
        }
        l(e);
    }
    function re(e, t) {
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
    function ae(t, n, o, i = null) {
        let s = null;
        if (Is.defined(i) && Is.holiday(t, i).matched) {
            s = {
                cssClassName: "holiday",
                id: e,
                visible: true,
                minimum: 0
            };
        }
        if (!Is.defined(s)) {
            const e = n.length;
            for (let t = 0; t < e; t++) {
                const e = n[t];
                if (o >= e.minimum) {
                    s = e;
                } else {
                    break;
                }
            }
        }
        return s;
    }
    function le(e, t) {
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
    function ce(e) {
        return e.colorRanges.sort(function(e, t) {
            return e.minimum - t.minimum;
        });
    }
    function ue(e, t) {
        if (t.allowFileImports && !t._currentView.isInFetchMode) {
            e.ondragover = DomElement.cancelBubble;
            e.ondragenter = DomElement.cancelBubble;
            e.ondragleave = DomElement.cancelBubble;
            e.ondrop = e => {
                DomElement.cancelBubble(e);
                if (Is.defined(window.FileReader) && e.dataTransfer.files.length > 0) {
                    me(e.dataTransfer.files, t);
                }
            };
        }
    }
    function de(e) {
        const t = [];
        let n;
        for (n in ImportType) {
            t.push(`.${n}`);
        }
        const o = DomElement.createWithNoContainer("input");
        o.type = "file";
        o.accept = t.join(", ");
        o.multiple = true;
        o.onchange = () => me(o.files, e);
        o.click();
    }
    function me(e, t) {
        const o = e.length;
        const i = [];
        const s = q(t);
        const r = (e, n) => {
            i.push(e);
            for (const e in n) {
                if (n.hasOwnProperty(e)) {
                    if (!s.hasOwnProperty(e)) {
                        s[e] = 0;
                    }
                    s[e] += n[e];
                }
            }
            if (i.length === o) {
                Trigger.customEvent(t.events.onImport, t._currentView.element);
                l(t);
            }
        };
        for (let t = 0; t < o; t++) {
            const o = e[t];
            const i = o.name.split(".").pop().toLowerCase();
            if (i === "json") {
                Import.File.json(o, r, n);
            } else if (i === "txt") {
                Import.File.txt(o, r);
            } else if (i === "csv") {
                Import.File.csv(o, r);
            } else if (i === "tsv") {
                Import.File.tsv(o, r);
            } else if (i === "md") {
                Import.File.md(o, r);
            } else if (i === "yaml") {
                Import.File.yaml(o, r);
            } else if (i === "toml") {
                Import.File.toml(o, r);
            }
        }
    }
    function fe(e, t = null, o = null, i = true) {
        let s = null;
        const r = Export.File.mimeType(t);
        const a = Default2.getString(t, e.exportType).toLowerCase();
        const l = he(e, i);
        if (a === "csv") {
            s = Export.Contents.csv(l, n);
        } else if (a === "json") {
            s = Export.Contents.json(l);
        } else if (a === "xml") {
            s = Export.Contents.xml(l);
        } else if (a === "txt") {
            s = Export.Contents.txt(l);
        } else if (a === "html") {
            s = Export.Contents.html(l, n);
        } else if (a === "md") {
            s = Export.Contents.md(l);
        } else if (a === "tsv") {
            s = Export.Contents.tsv(l);
        } else if (a === "yaml") {
            s = Export.Contents.yaml(l, n);
        } else if (a === "toml") {
            s = Export.Contents.toml(l, n);
        }
        if (Is.definedString(s)) {
            const t = DomElement.create(document.body, "a");
            t.style.display = "none";
            t.setAttribute("target", "_blank");
            t.setAttribute("href", `data:${r};charset=utf-8,${encodeURIComponent(s)}`);
            t.setAttribute("download", Export.File.filename(n, e, o, a));
            t.click();
            document.body.removeChild(t);
            Trigger.customEvent(e.events.onExport, e._currentView.element);
        }
    }
    function he(e, t) {
        const n = {};
        const o = q(e);
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
    function we(e, t = true) {
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
            l(e);
            if (t) {
                Trigger.customEvent(e.events.onBackYear, e._currentView.year);
            }
        }
    }
    function ge(e, t = true) {
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
            l(e);
            if (t) {
                Trigger.customEvent(e.events.onNextYear, e._currentView.year);
            }
        }
    }
    function ye(e) {
        e._currentView.element.innerHTML = "";
        DomElement.removeClass(e._currentView.element, "heat-js");
        ToolTip.assignToEvents(e, false);
        document.body.removeChild(e._currentView.tooltip);
        if (e._currentView.isInFetchMode && Is.defined(e._currentView.isInFetchModeTimer)) {
            clearInterval(e._currentView.isInFetchModeTimer);
        }
        Trigger.customEvent(e.events.onDestroy, e._currentView.element);
    }
    function pe() {
        if (n.observationMode) {
            if (!Is.defined(o)) {
                o = new MutationObserver((e, t) => {
                    De.renderAll();
                });
                const e = {
                    attributes: true,
                    childList: true,
                    subtree: true
                };
                o.observe(document.body, e);
            }
        } else {
            o.disconnect();
            o = null;
        }
    }
    const De = {
        addDates: function(e, t, o = null, s = true) {
            if (Is.definedString(e) && Is.definedArray(t) && i.hasOwnProperty(e)) {
                const r = i[e].options;
                if (!r._currentView.isInFetchMode) {
                    o = Default2.getString(o, n.text.unknownTrendText);
                    const i = t.length;
                    for (let n = 0; n < i; n++) {
                        De.addDate(e, t[n], o, false);
                    }
                    if (s) {
                        l(r, true);
                    }
                }
            }
            return De;
        },
        addDate: function(e, t, o = null, s = true) {
            if (Is.definedString(e) && Is.definedDate(t) && i.hasOwnProperty(e)) {
                const r = i[e].options;
                if (!r._currentView.isInFetchMode) {
                    o = Default2.getString(o, n.text.unknownTrendText);
                    const a = DateTime.toStorageDate(t);
                    if (!i[e].typeData.hasOwnProperty(o)) {
                        i[e].typeData[o] = {};
                        i[e].totalTypes++;
                    }
                    if (!i[e].typeData[o].hasOwnProperty(a)) {
                        i[e].typeData[o][a] = 0;
                    }
                    i[e].typeData[o][a]++;
                    Trigger.customEvent(r.events.onAdd, r._currentView.element);
                    if (s) {
                        l(r, true);
                    }
                }
            }
            return De;
        },
        updateDate: function(e, t, o, s = null, r = true) {
            if (Is.definedString(e) && Is.definedDate(t) && i.hasOwnProperty(e)) {
                const a = i[e].options;
                if (!a._currentView.isInFetchMode && o > 0) {
                    const c = DateTime.toStorageDate(t);
                    if (i[e].typeData.hasOwnProperty(s)) {
                        s = Default2.getString(s, n.text.unknownTrendText);
                        i[e].typeData[s][c] = o;
                        Trigger.customEvent(a.events.onUpdate, a._currentView.element);
                        if (r) {
                            l(a, true);
                        }
                    }
                }
            }
            return De;
        },
        removeDates: function(e, t, o = null, s = true) {
            if (Is.definedString(e) && Is.definedArray(t) && i.hasOwnProperty(e)) {
                const r = i[e].options;
                if (!r._currentView.isInFetchMode) {
                    o = Default2.getString(o, n.text.unknownTrendText);
                    const i = t.length;
                    for (let n = 0; n < i; n++) {
                        De.removeDate(e, t[n], o, false);
                    }
                    if (s) {
                        l(r, true);
                    }
                }
            }
            return De;
        },
        removeDate: function(e, t, o = null, s = true) {
            if (Is.definedString(e) && Is.definedDate(t) && i.hasOwnProperty(e)) {
                const r = i[e].options;
                if (!r._currentView.isInFetchMode) {
                    const a = DateTime.toStorageDate(t);
                    if (i[e].typeData.hasOwnProperty(o) && i[e].typeData[o].hasOwnProperty(a)) {
                        o = Default2.getString(o, n.text.unknownTrendText);
                        if (i[e].typeData[o][a] > 0) {
                            i[e].typeData[o][a]--;
                        }
                        Trigger.customEvent(r.events.onRemove, r._currentView.element);
                        if (s) {
                            l(r, true);
                        }
                    }
                }
            }
            return De;
        },
        clearDate: function(e, t, o = null, s = true) {
            if (Is.definedString(e) && Is.definedDate(t) && i.hasOwnProperty(e)) {
                const r = i[e].options;
                if (!r._currentView.isInFetchMode) {
                    const a = DateTime.toStorageDate(t);
                    if (i[e].typeData.hasOwnProperty(o) && i[e].typeData[o].hasOwnProperty(a)) {
                        o = Default2.getString(o, n.text.unknownTrendText);
                        delete i[e].typeData[o][a];
                        Trigger.customEvent(r.events.onClear, r._currentView.element);
                        if (s) {
                            l(r, true);
                        }
                    }
                }
            }
            return De;
        },
        resetAll: function(e = true) {
            for (const t in i) {
                if (i.hasOwnProperty(t)) {
                    De.reset(t, e);
                }
            }
            return De;
        },
        reset: function(e, t = true) {
            if (Is.definedString(e) && i.hasOwnProperty(e)) {
                const o = i[e].options;
                if (!o._currentView.isInFetchMode) {
                    o._currentView.type = n.text.unknownTrendText;
                    X(e, o, false);
                    Trigger.customEvent(o.events.onReset, o._currentView.element);
                    if (t) {
                        l(o, true);
                    }
                }
            }
            return De;
        },
        import: function(e, t = null) {
            if (Is.definedString(e) && i.hasOwnProperty(e)) {
                if (Is.definedArray(t)) {
                    me(t, i[e].options);
                } else {
                    de(i[e].options);
                }
            }
            return De;
        },
        export: function(e, t = null) {
            if (Is.definedString(e) && i.hasOwnProperty(e)) {
                const n = i[e].options;
                fe(n, t, null, n.exportOnlyDataBeingViewed);
            }
            return De;
        },
        refresh: function(e) {
            if (Is.definedString(e) && i.hasOwnProperty(e)) {
                const t = i[e].options;
                l(t, true);
                Trigger.customEvent(t.events.onRefresh, t._currentView.element);
            }
            return De;
        },
        refreshAll: function() {
            for (const e in i) {
                if (i.hasOwnProperty(e)) {
                    const t = i[e].options;
                    l(t, true);
                    Trigger.customEvent(t.events.onRefresh, t._currentView.element);
                }
            }
            return De;
        },
        setYear: function(e, t) {
            if (Is.definedString(e) && Is.definedNumber(t) && i.hasOwnProperty(e)) {
                const n = i[e].options;
                n._currentView.year = t;
                if (!Is.yearVisible(n, n._currentView.year)) {
                    ge(n, false);
                } else {
                    l(n);
                }
                Trigger.customEvent(n.events.onSetYear, n._currentView.year);
            }
            return De;
        },
        setYearToHighest: function(e) {
            if (Is.definedString(e) && i.hasOwnProperty(e)) {
                const t = i[e].options;
                const n = q(t);
                let o = 0;
                for (const e in n) {
                    if (n.hasOwnProperty(e)) {
                        o = Math.max(o, parseInt(DateTime.getStorageDateYear(e)));
                    }
                }
                if (o > 0) {
                    t._currentView.year = o;
                    if (!Is.yearVisible(t, t._currentView.year)) {
                        ge(t, false);
                    } else {
                        l(t);
                    }
                    Trigger.customEvent(t.events.onSetYear, t._currentView.year);
                }
            }
            return De;
        },
        setYearToLowest: function(e) {
            if (Is.definedString(e) && i.hasOwnProperty(e)) {
                const t = i[e].options;
                const n = q(t);
                let o = 9999;
                for (const e in n) {
                    if (n.hasOwnProperty(e)) {
                        o = Math.min(o, parseInt(DateTime.getStorageDateYear(e)));
                    }
                }
                if (o < 9999) {
                    t._currentView.year = o;
                    if (!Is.yearVisible(t, t._currentView.year)) {
                        we(t, false);
                    } else {
                        l(t);
                    }
                    Trigger.customEvent(t.events.onSetYear, t._currentView.year);
                }
            }
            return De;
        },
        moveToPreviousYear: function(e) {
            if (Is.definedString(e) && i.hasOwnProperty(e)) {
                we(i[e].options);
            }
            return De;
        },
        moveToNextYear: function(e) {
            if (Is.definedString(e) && i.hasOwnProperty(e)) {
                ge(i[e].options);
            }
            return De;
        },
        moveToCurrentYear: function(e) {
            if (Is.definedString(e) && i.hasOwnProperty(e)) {
                const t = i[e].options;
                t._currentView.year = (new Date).getFullYear();
                if (!Is.yearVisible(t, t._currentView.year)) {
                    ge(t, false);
                } else {
                    l(t);
                }
                Trigger.customEvent(t.events.onSetYear, t._currentView.year);
            }
            return De;
        },
        getYear: function(e) {
            let t = -1;
            if (Is.definedString(e) && i.hasOwnProperty(e)) {
                t = i[e].options._currentView.year;
            }
            return t;
        },
        render: function(e, t) {
            if (Is.definedObject(e) && Is.definedObject(t)) {
                a(Binding.Options.getForNewInstance(n, t, e));
            }
            return De;
        },
        renderAll: function() {
            s();
            return De;
        },
        switchView: function(e, t) {
            if (Is.definedString(e) && Is.definedString(t) && i.hasOwnProperty(e)) {
                const n = i[e].options;
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
                    z(n, o, t);
                }
            }
            return De;
        },
        switchType: function(e, t) {
            if (Is.definedString(e) && Is.definedString(t) && i.hasOwnProperty(e) && i[e].typeData.hasOwnProperty(t)) {
                const n = i[e].options;
                if (n._currentView.type !== t) {
                    n._currentView.type = t;
                    Trigger.customEvent(n.events.onTypeSwitch, t);
                    l(n);
                }
            }
            return De;
        },
        updateOptions: function(e, t) {
            if (Is.definedString(e) && Is.definedObject(t) && i.hasOwnProperty(e)) {
                const n = i[e].options;
                const o = Binding.Options.get(t);
                let s = false;
                for (const e in o) {
                    if (o.hasOwnProperty(e) && n.hasOwnProperty(e) && n[e] !== o[e]) {
                        n[e] = o[e];
                        s = true;
                    }
                }
                if (s) {
                    l(n, true);
                    Trigger.customEvent(n.events.onRefresh, n._currentView.element);
                    Trigger.customEvent(n.events.onOptionsUpdate, n._currentView.element, n);
                }
            }
            return De;
        },
        getActiveView: function(e) {
            let t = "";
            if (Is.definedString(e) && i.hasOwnProperty(e)) {
                const n = i[e].options;
                if (n._currentView.view === 1) {
                    t = "map";
                } else if (n._currentView.view === 2) {
                    t = "chart";
                } else if (n._currentView.view === 3) {
                    t = "days";
                } else if (n._currentView.view === 5) {
                    t = "months";
                } else if (n._currentView.view === 4) {
                    t = "statistics";
                } else {
                    t = "map";
                }
            }
            return t;
        },
        destroyAll: function() {
            for (const e in i) {
                if (i.hasOwnProperty(e)) {
                    ye(i[e].options);
                }
            }
            i = {};
            return De;
        },
        destroy: function(e) {
            if (Is.definedString(e) && i.hasOwnProperty(e)) {
                ye(i[e].options);
                delete i[e];
            }
            return De;
        },
        setConfiguration: function(e, t = true) {
            if (Is.definedObject(e)) {
                let o = false;
                const i = n;
                for (const t in e) {
                    if (e.hasOwnProperty(t) && n.hasOwnProperty(t) && i[t] !== e[t]) {
                        i[t] = e[t];
                        o = true;
                    }
                }
                if (o) {
                    n = Config.Options.get(i);
                    pe();
                    if (t) {
                        De.refreshAll();
                    }
                }
            }
            return De;
        },
        getIds: function() {
            const e = [];
            for (const t in i) {
                if (i.hasOwnProperty(t)) {
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
        n = Config.Options.get();
        document.addEventListener("DOMContentLoaded", () => {
            pe();
            s();
        });
        window.addEventListener("pagehide", () => oe());
        if (!Is.defined(window.$heat)) {
            window.$heat = De;
        }
    })();
})();//# sourceMappingURL=heat.js.map