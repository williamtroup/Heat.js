"use strict";

var e;

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
})(e || (e = {}));

var t = (e => {
    e["csv"] = "csv";
    e["json"] = "json";
    e["txt"] = "txt";
    e["md"] = "md";
    e["tsv"] = "tsv";
    e["yaml"] = "yaml";
    e["toml"] = "toml";
    return e;
})(t || {});

var n = (e => {
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
})(n || {});

var i;

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
    function d(t, n) {
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
    e.holiday = d;
    function u(e, t) {
        return e.indexOf(t + 1) > -1;
    }
    e.monthVisible = u;
    function w(e, t) {
        return e.indexOf(t) > -1;
    }
    e.dayVisible = w;
    function h(e, t) {
        return e.yearsToHide.indexOf(t) === -1 && (e._currentView.yearsAvailable.length === 0 || e._currentView.yearsAvailable.indexOf(t) > -1);
    }
    e.yearVisible = h;
    function f(e, t) {
        return e._currentView.yearsAvailable.length > 0 && t <= e._currentView.yearsAvailable[0];
    }
    e.firstVisibleYear = f;
    function g(e, t) {
        return e._currentView.yearsAvailable.length > 0 && t >= e._currentView.yearsAvailable[e._currentView.yearsAvailable.length - 1];
    }
    e.lastVisibleYear = g;
    function m(e) {
        return e.startsWith("rgba") || e.startsWith("rgb");
    }
    e.rgbColor = m;
    function p(e) {
        return e.startsWith("#") && (e.length === 6 || e.length === 8);
    }
    e.hexColor = p;
})(i || (i = {}));

var o;

(e => {
    function t(e, t) {
        return typeof e === "string" ? e : t;
    }
    e.getAnyString = t;
    function n(e, t) {
        return i.definedString(e) ? e : t;
    }
    e.getString = n;
    function o(e, t) {
        return i.definedBoolean(e) ? e : t;
    }
    e.getBoolean = o;
    function s(e, t) {
        return i.definedNumber(e) ? e : t;
    }
    e.getNumber = s;
    function r(e, t, n, o) {
        return i.definedNumber(e) ? e >= t && e <= n ? e : o : o;
    }
    e.getNumberInRange = r;
    function a(e, t) {
        return i.definedFunction(e) ? e : t;
    }
    e.getFunction = a;
    function l(e, t) {
        return i.definedArray(e) ? e : t;
    }
    e.getArray = l;
    function c(e, t) {
        return i.definedObject(e) ? e : t;
    }
    e.getObject = c;
    function d(e, t) {
        let n = t;
        if (i.definedString(e)) {
            const i = e.toString().split(" ");
            if (i.length === 0) {
                e = t;
            } else {
                n = i;
            }
        } else {
            n = l(e, t);
        }
        return n;
    }
    e.getStringOrArray = d;
    function u(e, t) {
        const n = {
            parsed: true,
            object: null
        };
        try {
            if (i.definedString(e)) {
                try {
                    n.object = JSON.parse(e);
                } catch (t) {
                    n.object = JSON.parse(e.replace(/'/g, '"'));
                }
            }
        } catch (i) {
            try {
                n.object = w(e);
            } catch (e) {
                if (!t.safeMode) {
                    console.error(t.text.objectErrorText.replace("{{error_1}}", i.message).replace("{{error_2}}", e.message));
                    n.parsed = false;
                }
                n.object = null;
            }
        }
        return n;
    }
    e.getObjectFromString = u;
    function w(e) {
        let t = null;
        const n = e.split("(");
        let o = [];
        if (n.length > 1) {
            o = n[1].replace(")", "").replace(";", "").trim().split(",");
            if (o.length === 1 && o[0] === "") {
                o = [];
            }
        }
        const s = n[0].split(".");
        const r = s.pop();
        let a = globalThis;
        let l = true;
        for (const e of s) {
            a = a[e];
            if (!i.defined(a)) {
                l = false;
                break;
            }
        }
        if (l && i.definedFunction(a[r])) {
            t = a[r].apply(a, o);
        }
        return t;
    }
})(o || (o = {}));

var s;

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
})(s || (s = {}));

var r;

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
        const a = n(o);
        r = r.replace("{dddd}", e.text.dayNames[a]);
        r = r.replace("{dd}", s.padNumber(o.getDate()));
        r = r.replace("{d}", o.getDate().toString());
        r = r.replace("{o}", i(e, o.getDate()));
        r = r.replace("{mmmm}", e.text.monthNames[o.getMonth()]);
        r = r.replace("{mm}", s.padNumber(o.getMonth() + 1));
        r = r.replace("{m}", (o.getMonth() + 1).toString());
        r = r.replace("{yyyy}", o.getFullYear().toString());
        r = r.replace("{yyy}", o.getFullYear().toString().substring(1));
        r = r.replace("{yy}", o.getFullYear().toString().substring(2));
        r = r.replace("{y}", parseInt(o.getFullYear().toString().substring(2)).toString());
        return r;
    }
    e.getCustomFormattedDateText = o;
    function r(e) {
        return `${e.getFullYear()}${"-"}${s.padNumber(e.getMonth() + 1)}${"-"}${s.padNumber(e.getDate())}`;
    }
    e.toStorageDate = r;
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
})(r || (r = {}));

var a;

(e => {
    function t(e) {
        const t = e.toLowerCase();
        const n = t === "text";
        let i = n ? document.createTextNode("") : document.createElement(t);
        return i;
    }
    e.createWithNoContainer = t;
    function n(e, t, n = "", o = null) {
        const s = t.toLowerCase();
        const r = s === "text";
        let a = r ? document.createTextNode("") : document.createElement(s);
        if (i.defined(n)) {
            a.className = n;
        }
        if (i.defined(o)) {
            e.insertBefore(a, o);
        } else {
            e.appendChild(a);
        }
        return a;
    }
    e.create = n;
    function o(e, t, i, o, s = null) {
        const r = n(e, t, i, s);
        r.innerHTML = o;
        if (t === "button") {
            const e = r;
            e.type = "button";
        }
        return r;
    }
    e.createWithHTML = o;
    function s(e, t, o, s = null, r = null) {
        const a = n(e, t, o, r);
        a.type = "button";
        if (i.defined(s)) {
            a.innerHTML = s;
        }
        return a;
    }
    e.createButton = s;
    function r(t, i, o, s, r = null) {
        const a = n(t, i, o, r);
        a.type = "button";
        e.create(a, "i", s);
        return a;
    }
    e.createIconButton = r;
    function a(e, t, n = false) {
        const i = getComputedStyle(e);
        let o = i.getPropertyValue(t);
        if (n) {
            o = parseFloat(o);
            o = isNaN(o) ? 0 : o;
        }
        return o;
    }
    e.getStyleValueByName = a;
    function l(e, t) {
        const n = getComputedStyle(e);
        const i = n.getPropertyValue(t);
        const o = parseFloat(i);
        return i.replace(o.toString(), "");
    }
    e.getStyleValueByNameSizingMetic = l;
    function c(e, t) {
        e.classList.add(t);
    }
    e.addClass = c;
    function d(e, t) {
        e.classList.remove(t);
    }
    e.removeClass = d;
    function u(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    e.cancelBubble = u;
    function w() {
        const e = document.documentElement;
        const t = {
            left: e.scrollLeft - (e.clientLeft || 0),
            top: e.scrollTop - (e.clientTop || 0)
        };
        return t;
    }
    e.getScrollPosition = w;
    function h(e, t) {
        let n = e.pageX;
        let i = e.pageY;
        const o = w();
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
    e.showElementAtMousePosition = h;
    function f(e) {
        const t = Array.from(e.children);
        t.reverse();
        t.forEach(t => e.appendChild(t));
    }
    e.reverseChildrenOrder = f;
    function g(e, t, i) {
        const s = n(e, "div");
        const r = n(s, "label", "checkbox");
        const a = n(r, "input");
        a.type = "checkbox";
        a.name = i;
        n(r, "span", "check-mark");
        o(r, "span", "text", t);
        return a;
    }
    e.createCheckBox = g;
    function m(t, n) {
        const i = e.getStyleValueByName(t, "background-color");
        const o = e.getStyleValueByName(n, "background-color");
        n.style.background = `linear-gradient(to top, ${i}, ${o})`;
    }
    e.addGradientEffect = m;
})(a || (a = {}));

var l;

(e => {
    function t(e) {
        if (!i.defined(e._currentView.tooltip)) {
            e._currentView.tooltip = a.create(document.body, "div", "heat-js-tooltip");
            e._currentView.tooltip.style.display = "none";
            n(e);
        }
    }
    e.render = t;
    function n(e, t = true) {
        let n = t ? window.addEventListener : window.removeEventListener;
        let i = t ? document.addEventListener : document.removeEventListener;
        n("mousemove", () => r(e));
        i("scroll", () => r(e));
    }
    e.assignToEvents = n;
    function o(e, t, n) {
        if (e !== null) {
            e.onmousemove = e => s(e, t, n);
        }
    }
    e.add = o;
    function s(e, t, n) {
        a.cancelBubble(e);
        r(t);
        t._currentView.tooltipTimer = setTimeout(() => {
            t._currentView.tooltip.innerHTML = n;
            t._currentView.tooltip.style.display = "block";
            a.showElementAtMousePosition(e, t._currentView.tooltip);
        }, t.tooltip.delay);
    }
    e.show = s;
    function r(e) {
        if (i.defined(e._currentView.tooltip)) {
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
})(l || (l = {}));

var c;

(e => {
    function t(e, ...t) {
        let n = null;
        if (i.definedFunction(e)) {
            n = e.apply(null, [].slice.call(t, 0));
        }
        return n;
    }
    e.customEvent = t;
})(c || (c = {}));

var d;

(e => {
    let t;
    (e => {
        const t = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
        const n = [ 1, 2, 3, 4, 5, 6, 7 ];
        function s(e, t, n) {
            const s = r(t);
            const a = o.getString(s.view, "").toLowerCase();
            s._currentView = {};
            s._currentView.element = n;
            s._currentView.disabledBackground = null;
            s._currentView.configurationDialog = null;
            s._currentView.configurationDialogDayCheckBoxes = [];
            s._currentView.configurationDialogMonthCheckBoxes = [];
            s._currentView.tooltip = null;
            s._currentView.tooltipTimer = 0;
            s._currentView.mapContents = null;
            s._currentView.mapContentsScrollLeft = 0;
            s._currentView.year = s.year;
            s._currentView.type = e.text.unknownTrendText;
            s._currentView.isInFetchMode = i.definedFunction(s.events.onDataFetch);
            s._currentView.isInFetchModeTimer = 0;
            s._currentView.yearsAvailable = [];
            s._currentView.dayWidth = 0;
            s._currentView.mapZoomLevel = -1;
            s._currentView.mapZoomIncrement = -1;
            if (s.views.chart.enabled) {
                s._currentView.chartContents = null;
                s._currentView.chartContentsScrollLeft = 0;
            }
            if (s.views.days.enabled) {
                s._currentView.daysContents = null;
                s._currentView.daysContentsScrollLeft = 0;
            }
            if (s.views.statistics.enabled) {
                s._currentView.statisticsContents = null;
                s._currentView.statisticsContentsScrollLeft = 0;
            }
            if (a === "map") {
                s._currentView.view = 1;
            } else if (a === "chart") {
                s._currentView.view = 2;
            } else if (a === "days") {
                s._currentView.view = 3;
            } else if (a === "statistics") {
                s._currentView.view = 4;
            } else {
                s._currentView.view = 1;
            }
            return s;
        }
        e.getForNewInstance = s;
        function r(e) {
            const t = o.getObject(e, {});
            t.views = o.getObject(t.views, {});
            t.exportOnlyDataBeingViewed = o.getBoolean(t.exportOnlyDataBeingViewed, true);
            t.year = o.getNumber(t.year, (new Date).getFullYear());
            t.view = o.getString(t.view, "map");
            t.exportType = o.getString(t.exportType, "json");
            t.useLocalStorageForData = o.getBoolean(t.useLocalStorageForData, false);
            t.allowFileImports = o.getBoolean(t.allowFileImports, true);
            t.yearsToHide = o.getArray(t.yearsToHide, []);
            t.dataFetchDelay = o.getNumber(t.dataFetchDelay, 6e4);
            t.showOnlyDataForYearsAvailable = o.getBoolean(t.showOnlyDataForYearsAvailable, false);
            t.showHolidaysInDayToolTips = o.getBoolean(t.showHolidaysInDayToolTips, false);
            t.resizable = o.getBoolean(t.resizable, false);
            t.startMonth = o.getNumberInRange(t.startMonth, 0, 11, 0);
            t.allowMultipleFileImports = o.getBoolean(t.allowMultipleFileImports, true);
            t.percentageDecimalPoints = o.getNumber(t.percentageDecimalPoints, 2);
            t.allowTypeAdding = o.getBoolean(t.allowTypeAdding, false);
            t.chartsAnimationDelay = o.getNumber(t.chartsAnimationDelay, 50);
            t.exportDateTimeFormat = o.getString(t.exportDateTimeFormat, "{dddd}, {d}{o} {mmmm} {yyyy}");
            t.colorRanges = a(t);
            t.holidays = l(t);
            t.title = c(t);
            t.description = d(t);
            t.guide = u(t);
            t.tooltip = w(t);
            t.views.map = h(t);
            t.views.chart = f(t);
            t.views.days = g(t);
            t.views.months = m(t);
            t.views.statistics = p(t);
            t.yearlyStatistics = y(t);
            t.events = v(t);
            if (t.startMonth > 0) {
                t.yearsToHide = [];
            }
            return t;
        }
        e.get = r;
        function a(e) {
            let t = [];
            if (i.definedArray(e.colorRanges)) {
                const n = e.colorRanges.length;
                for (let i = 0; i < n; i++) {
                    const n = e.colorRanges[i];
                    n.id = o.getString(n.id, crypto.randomUUID());
                    n.name = o.getString(n.name, "");
                    n.minimum = o.getNumber(n.minimum, 0);
                    n.cssClassName = o.getString(n.cssClassName, "");
                    n.mapCssClassName = o.getString(n.mapCssClassName, "");
                    n.chartCssClassName = o.getString(n.chartCssClassName, "");
                    n.statisticsCssClassName = o.getString(n.statisticsCssClassName, "");
                    n.tooltipText = o.getString(n.tooltipText, "");
                    n.visible = o.getBoolean(n.visible, true);
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
        function l(e) {
            let t = [];
            if (i.definedArray(e.holidays)) {
                const n = e.holidays.length;
                for (let i = 0; i < n; i++) {
                    const n = e.holidays[i];
                    n.date = o.getString(n.date, "");
                    n.name = o.getString(n.name, "");
                    n.showInViews = o.getBoolean(n.showInViews, true);
                    t.push(n);
                }
            }
            return t;
        }
        function c(e) {
            e.title = o.getObject(e.title, {});
            e.title.text = o.getString(e.title.text, "Heat.js");
            e.title.showText = o.getBoolean(e.title.showText, true);
            e.title.showYearSelector = o.getBoolean(e.title.showYearSelector, true);
            e.title.showRefreshButton = o.getBoolean(e.title.showRefreshButton, false);
            e.title.showExportButton = o.getBoolean(e.title.showExportButton, false);
            e.title.extraSelectionYears = o.getNumber(e.title.extraSelectionYears, 50);
            e.title.showYearSelectionDropDown = o.getBoolean(e.title.showYearSelectionDropDown, true);
            e.title.showImportButton = o.getBoolean(e.title.showImportButton, false);
            e.title.showConfigurationButton = o.getBoolean(e.title.showConfigurationButton, true);
            e.title.showTitleDropDownButton = o.getBoolean(e.title.showTitleDropDownButton, true);
            e.title.showTitleDropDownHeaders = o.getBoolean(e.title.showTitleDropDownHeaders, true);
            e.title.showCurrentYearButton = o.getBoolean(e.title.showCurrentYearButton, true);
            e.title.showSectionText = o.getBoolean(e.title.showSectionText, true);
            e.title.showToolTips = o.getBoolean(e.title.showToolTips, true);
            e.title.showTitleDropDownMenu = o.getBoolean(e.title.showTitleDropDownMenu, true);
            e.title.showClearButton = o.getBoolean(e.title.showClearButton, false);
            return e.title;
        }
        function d(e) {
            e.description = o.getObject(e.description, {});
            e.description.text = o.getString(e.description.text, "");
            e.description.url = o.getString(e.description.url, "");
            e.description.urlTarget = o.getString(e.description.urlTarget, "_blank");
            return e.description;
        }
        function u(e) {
            e.guide = o.getObject(e.guide, {});
            e.guide.enabled = o.getBoolean(e.guide.enabled, true);
            e.guide.colorRangeTogglesEnabled = o.getBoolean(e.guide.colorRangeTogglesEnabled, true);
            e.guide.showLessAndMoreLabels = o.getBoolean(e.guide.showLessAndMoreLabels, true);
            e.guide.showNumbersInGuide = o.getBoolean(e.guide.showNumbersInGuide, false);
            e.guide.showToolTips = o.getBoolean(e.guide.showToolTips, true);
            e.guide.showInvertLabel = o.getBoolean(e.guide.showInvertLabel, false);
            return e.guide;
        }
        function w(e) {
            e.tooltip = o.getObject(e.tooltip, {});
            e.tooltip.delay = o.getNumber(e.tooltip.delay, 750);
            return e.tooltip;
        }
        function h(e) {
            e.views.map = o.getObject(e.views.map, {});
            e.views.map.showMonthDayGaps = o.getBoolean(e.views.map.showMonthDayGaps, true);
            e.views.map.showDayNames = o.getBoolean(e.views.map.showDayNames, true);
            e.views.map.placeMonthNamesOnTheBottom = o.getBoolean(e.views.map.placeMonthNamesOnTheBottom, false);
            e.views.map.showDayCounts = o.getBoolean(e.views.map.showDayCounts, false);
            e.views.map.showMonthNames = o.getBoolean(e.views.map.showMonthNames, true);
            e.views.map.showDaysInReverseOrder = o.getBoolean(e.views.map.showDaysInReverseOrder, false);
            e.views.map.showNoDataMessageWhenDataIsNotAvailable = o.getBoolean(e.views.map.showNoDataMessageWhenDataIsNotAvailable, false);
            e.views.map.showMinimalDayNames = o.getBoolean(e.views.map.showMinimalDayNames, false);
            e.views.map.showMonthsInReverseOrder = o.getBoolean(e.views.map.showMonthsInReverseOrder, false);
            e.views.map.keepScrollPositions = o.getBoolean(e.views.map.keepScrollPositions, false);
            e.views.map.showDayDateNumbers = o.getBoolean(e.views.map.showDayDateNumbers, false);
            e.views.map.showToolTips = o.getBoolean(e.views.map.showToolTips, true);
            e.views.map.highlightCurrentDay = o.getBoolean(e.views.map.highlightCurrentDay, false);
            e.views.map.dayToolTipText = o.getString(e.views.map.dayToolTipText, "{dddd}, {d}{o} {mmmm} {yyyy}");
            e.views.map.showYearsInMonthNames = o.getBoolean(e.views.map.showYearsInMonthNames, true);
            e.views.map.allowZooming = o.getBoolean(e.views.map.allowZooming, false);
            e.views.map.zoomLevel = o.getNumber(e.views.map.zoomLevel, 0);
            e.views.map.showCountsInToolTips = o.getBoolean(e.views.map.showCountsInToolTips, true);
            if (i.invalidOptionArray(e.views.map.monthsToShow)) {
                e.views.map.monthsToShow = t;
            }
            if (i.invalidOptionArray(e.views.map.daysToShow)) {
                e.views.map.daysToShow = n;
            }
            return e.views.map;
        }
        function f(e) {
            e.views.chart = o.getObject(e.views.chart, {});
            e.views.chart.enabled = o.getBoolean(e.views.chart.enabled, true);
            e.views.chart.showChartYLabels = o.getBoolean(e.views.chart.showChartYLabels, true);
            e.views.chart.showMonthNames = o.getBoolean(e.views.chart.showMonthNames, true);
            e.views.chart.showLineCounts = o.getBoolean(e.views.chart.showLineCounts, false);
            e.views.chart.showInReverseOrder = o.getBoolean(e.views.chart.showInReverseOrder, false);
            e.views.chart.keepScrollPositions = o.getBoolean(e.views.chart.keepScrollPositions, false);
            e.views.chart.showLineDateNumbers = o.getBoolean(e.views.chart.showLineDateNumbers, false);
            e.views.chart.showToolTips = o.getBoolean(e.views.chart.showToolTips, true);
            e.views.chart.useGradients = o.getBoolean(e.views.chart.useGradients, false);
            e.views.chart.highlightCurrentDay = o.getBoolean(e.views.chart.highlightCurrentDay, false);
            e.views.chart.dayToolTipText = o.getString(e.views.chart.dayToolTipText, "{dddd}, {d}{o} {mmmm} {yyyy}");
            e.views.chart.showYearsInMonthNames = o.getBoolean(e.views.chart.showYearsInMonthNames, true);
            e.views.chart.showCountsInToolTips = o.getBoolean(e.views.chart.showCountsInToolTips, true);
            e.views.chart.addMonthSpacing = o.getBoolean(e.views.chart.addMonthSpacing, false);
            if (i.invalidOptionArray(e.views.chart.monthsToShow)) {
                e.views.chart.monthsToShow = t;
            }
            if (i.invalidOptionArray(e.views.chart.daysToShow)) {
                e.views.chart.daysToShow = n;
            }
            return e.views.chart;
        }
        function g(e) {
            e.views.days = o.getObject(e.views.days, {});
            e.views.days.enabled = o.getBoolean(e.views.days.enabled, true);
            e.views.days.showChartYLabels = o.getBoolean(e.views.days.showChartYLabels, true);
            e.views.days.showDayNames = o.getBoolean(e.views.days.showDayNames, true);
            e.views.days.showInReverseOrder = o.getBoolean(e.views.days.showInReverseOrder, false);
            e.views.days.showDayCounts = o.getBoolean(e.views.days.showDayCounts, false);
            e.views.days.keepScrollPositions = o.getBoolean(e.views.days.keepScrollPositions, false);
            e.views.days.showToolTips = o.getBoolean(e.views.days.showToolTips, true);
            e.views.days.useGradients = o.getBoolean(e.views.days.useGradients, false);
            e.views.days.useDifferentOpacities = o.getBoolean(e.views.days.useDifferentOpacities, true);
            e.views.days.showDayCountPercentages = o.getBoolean(e.views.days.showDayCountPercentages, true);
            if (i.invalidOptionArray(e.views.days.monthsToShow)) {
                e.views.days.monthsToShow = t;
            }
            if (i.invalidOptionArray(e.views.days.daysToShow)) {
                e.views.days.daysToShow = n;
            }
            return e.views.days;
        }
        function m(e) {
            e.views.months = o.getObject(e.views.months, {});
            e.views.months.enabled = o.getBoolean(e.views.months.enabled, true);
            e.views.months.showChartYLabels = o.getBoolean(e.views.months.showChartYLabels, true);
            e.views.months.showMonthNames = o.getBoolean(e.views.months.showMonthNames, true);
            e.views.months.showInReverseOrder = o.getBoolean(e.views.months.showInReverseOrder, false);
            e.views.months.showMonthCounts = o.getBoolean(e.views.months.showMonthCounts, false);
            e.views.months.keepScrollPositions = o.getBoolean(e.views.months.keepScrollPositions, false);
            e.views.months.showToolTips = o.getBoolean(e.views.months.showToolTips, true);
            e.views.months.useGradients = o.getBoolean(e.views.months.useGradients, false);
            e.views.months.useDifferentOpacities = o.getBoolean(e.views.months.useDifferentOpacities, true);
            e.views.months.highlightCurrentMonth = o.getBoolean(e.views.months.highlightCurrentMonth, false);
            e.views.months.showMonthCountPercentages = o.getBoolean(e.views.months.showMonthCountPercentages, true);
            if (i.invalidOptionArray(e.views.months.monthsToShow)) {
                e.views.months.monthsToShow = t;
            }
            if (i.invalidOptionArray(e.views.months.daysToShow)) {
                e.views.months.daysToShow = n;
            }
            return e.views.months;
        }
        function p(e) {
            e.views.statistics = o.getObject(e.views.statistics, {});
            e.views.statistics.enabled = o.getBoolean(e.views.statistics.enabled, true);
            e.views.statistics.showChartYLabels = o.getBoolean(e.views.statistics.showChartYLabels, true);
            e.views.statistics.showColorRangeLabels = o.getBoolean(e.views.statistics.showColorRangeLabels, true);
            e.views.statistics.useColorRangeNamesForLabels = o.getBoolean(e.views.statistics.useColorRangeNamesForLabels, false);
            e.views.statistics.showRangeCounts = o.getBoolean(e.views.statistics.showRangeCounts, false);
            e.views.statistics.showInReverseOrder = o.getBoolean(e.views.statistics.showInReverseOrder, false);
            e.views.statistics.keepScrollPositions = o.getBoolean(e.views.statistics.keepScrollPositions, false);
            e.views.statistics.showToolTips = o.getBoolean(e.views.statistics.showToolTips, true);
            e.views.statistics.useGradients = o.getBoolean(e.views.statistics.useGradients, false);
            e.views.statistics.showRangeCountPercentages = o.getBoolean(e.views.statistics.showRangeCountPercentages, true);
            e.views.statistics.showRangeNamesInToolTips = o.getBoolean(e.views.statistics.showRangeNamesInToolTips, true);
            if (i.invalidOptionArray(e.views.statistics.monthsToShow)) {
                e.views.statistics.monthsToShow = t;
            }
            if (i.invalidOptionArray(e.views.statistics.daysToShow)) {
                e.views.statistics.daysToShow = n;
            }
            return e.views.statistics;
        }
        function y(e) {
            e.yearlyStatistics = o.getObject(e.yearlyStatistics, {});
            e.yearlyStatistics.enabled = o.getBoolean(e.yearlyStatistics.enabled, false);
            e.yearlyStatistics.showToday = o.getBoolean(e.yearlyStatistics.showToday, true);
            e.yearlyStatistics.showThisWeek = o.getBoolean(e.yearlyStatistics.showThisWeek, true);
            e.yearlyStatistics.showThisMonth = o.getBoolean(e.yearlyStatistics.showThisMonth, true);
            e.yearlyStatistics.showThisYear = o.getBoolean(e.yearlyStatistics.showThisYear, true);
            e.yearlyStatistics.showOnlyForCurrentYear = o.getBoolean(e.yearlyStatistics.showOnlyForCurrentYear, false);
            e.yearlyStatistics.showPercentages = o.getBoolean(e.yearlyStatistics.showPercentages, true);
            return e.yearlyStatistics;
        }
        function v(e) {
            e.events = o.getObject(e.events, {});
            e.events.onBackYear = o.getFunction(e.events.onBackYear, null);
            e.events.onNextYear = o.getFunction(e.events.onNextYear, null);
            e.events.onRefresh = o.getFunction(e.events.onRefresh, null);
            e.events.onBeforeRender = o.getFunction(e.events.onBeforeRender, null);
            e.events.onRenderComplete = o.getFunction(e.events.onRenderComplete, null);
            e.events.onDestroy = o.getFunction(e.events.onDestroy, null);
            e.events.onExport = o.getFunction(e.events.onExport, null);
            e.events.onSetYear = o.getFunction(e.events.onSetYear, null);
            e.events.onTypeSwitch = o.getFunction(e.events.onTypeSwitch, null);
            e.events.onMapDayToolTipRender = o.getFunction(e.events.onMapDayToolTipRender, null);
            e.events.onChartDayToolTipRender = o.getFunction(e.events.onChartDayToolTipRender, e.events.onMapDayToolTipRender);
            e.events.onAdd = o.getFunction(e.events.onAdd, null);
            e.events.onRemove = o.getFunction(e.events.onRemove, null);
            e.events.onReset = o.getFunction(e.events.onReset, null);
            e.events.onViewSwitch = o.getFunction(e.events.onViewSwitch, null);
            e.events.onColorRangeTypeToggle = o.getFunction(e.events.onColorRangeTypeToggle, null);
            e.events.onImport = o.getFunction(e.events.onImport, null);
            e.events.onDataFetch = o.getFunction(e.events.onDataFetch, null);
            e.events.onClear = o.getFunction(e.events.onClear, null);
            e.events.onUpdate = o.getFunction(e.events.onUpdate, null);
            e.events.onOptionsUpdate = o.getFunction(e.events.onOptionsUpdate, null);
            e.events.onMapDayClick = o.getFunction(e.events.onMapDayClick, null);
            e.events.onMapDayDblClick = o.getFunction(e.events.onMapDayDblClick, null);
            e.events.onChartDayClick = o.getFunction(e.events.onChartDayClick, e.events.onMapDayClick);
            e.events.onChartDayDblClick = o.getFunction(e.events.onChartDayDblClick, e.events.onMapDayDblClick);
            e.events.onWeekDayClick = o.getFunction(e.events.onWeekDayClick, null);
            e.events.onWeekDayDblClick = o.getFunction(e.events.onWeekDayDblClick, null);
            e.events.onMonthClick = o.getFunction(e.events.onMonthClick, null);
            e.events.onMonthDblClick = o.getFunction(e.events.onMonthDblClick, null);
            e.events.onStatisticClick = o.getFunction(e.events.onStatisticClick, null);
            e.events.onStatisticDblClick = o.getFunction(e.events.onStatisticDblClick, null);
            e.events.onMapZoomLevelChange = o.getFunction(e.events.onMapZoomLevelChange, null);
            return e.events;
        }
    })(t = e.Options || (e.Options = {}));
})(d || (d = {}));

var u;

(e => {
    let t;
    (e => {
        function t(e = null) {
            const t = o.getObject(e, {});
            t.safeMode = o.getBoolean(t.safeMode, true);
            t.observationMode = o.getBoolean(t.observationMode, true);
            t.domElementTypes = o.getStringOrArray(t.domElementTypes, [ "*" ]);
            t.text = n(t);
            t.text = s(t.text);
            return t;
        }
        e.get = t;
        function n(e) {
            e.text = o.getObject(e.text, {});
            e.text.stText = o.getAnyString(e.text.stText, "st");
            e.text.ndText = o.getAnyString(e.text.ndText, "nd");
            e.text.rdText = o.getAnyString(e.text.rdText, "rd");
            e.text.thText = o.getAnyString(e.text.thText, "th");
            e.text.backButtonText = o.getAnyString(e.text.backButtonText, "Back");
            e.text.nextButtonText = o.getAnyString(e.text.nextButtonText, "Next");
            e.text.refreshButtonText = o.getAnyString(e.text.refreshButtonText, "Refresh");
            e.text.exportButtonText = o.getAnyString(e.text.exportButtonText, "Export");
            e.text.lessText = o.getAnyString(e.text.lessText, "Less");
            e.text.moreText = o.getAnyString(e.text.moreText, "More");
            e.text.dateText = o.getAnyString(e.text.dateText, "Date");
            e.text.countText = o.getAnyString(e.text.countText, "Count");
            e.text.mapText = o.getAnyString(e.text.mapText, "Map");
            e.text.chartText = o.getAnyString(e.text.chartText, "Chart");
            e.text.noChartDataMessage = o.getAnyString(e.text.noChartDataMessage, "There is currently no data to view.");
            e.text.statisticsText = o.getAnyString(e.text.statisticsText, "Statistics");
            e.text.noStatisticsDataMessage = o.getAnyString(e.text.noStatisticsDataMessage, "There are currently no statistics to view.");
            e.text.unknownTrendText = o.getAnyString(e.text.unknownTrendText, "Unknown");
            e.text.importButtonText = o.getAnyString(e.text.importButtonText, "Import");
            e.text.noMapDataMessage = o.getAnyString(e.text.noMapDataMessage, "There is currently no data to view.");
            e.text.objectErrorText = o.getAnyString(e.text.objectErrorText, "Errors in object: {{error_1}}, {{error_2}}");
            e.text.attributeNotValidErrorText = o.getAnyString(e.text.attributeNotValidErrorText, "The attribute '{{attribute_name}}' is not a valid object.");
            e.text.attributeNotSetErrorText = o.getAnyString(e.text.attributeNotSetErrorText, "The attribute '{{attribute_name}}' has not been set correctly.");
            e.text.closeButtonText = o.getAnyString(e.text.closeButtonText, "Close");
            e.text.configurationButtonText = o.getAnyString(e.text.configurationButtonText, "Configuration");
            e.text.configurationTitleText = o.getAnyString(e.text.configurationTitleText, "Configuration");
            e.text.visibleMonthsText = o.getAnyString(e.text.visibleMonthsText, "Visible Months");
            e.text.visibleDaysText = o.getAnyString(e.text.visibleDaysText, "Visible Days");
            e.text.dataText = o.getAnyString(e.text.dataText, "Data");
            e.text.colorRangesText = o.getAnyString(e.text.colorRangesText, "Color Ranges");
            e.text.yearText = o.getAnyString(e.text.yearText, "Year");
            e.text.daysText = o.getAnyString(e.text.daysText, "Days");
            e.text.noDaysDataMessage = o.getAnyString(e.text.noDaysDataMessage, "There are currently no days to view.");
            e.text.currentYearText = o.getAnyString(e.text.currentYearText, "Current Year");
            e.text.todayText = o.getAnyString(e.text.todayText, "Today");
            e.text.thisWeekText = o.getAnyString(e.text.thisWeekText, "This Week");
            e.text.thisMonthText = o.getAnyString(e.text.thisMonthText, "This Month");
            e.text.thisYearText = o.getAnyString(e.text.thisYearText, "This Year");
            e.text.unavailableText = o.getAnyString(e.text.unavailableText, "Unavailable");
            e.text.monthsText = o.getAnyString(e.text.monthsText, "Months");
            e.text.noMonthsDataMessage = o.getAnyString(e.text.noMonthsDataMessage, "There are currently no months to view.");
            e.text.selectTypeText = o.getAnyString(e.text.selectTypeText, "Select Type");
            e.text.filenamePlaceholderText = o.getAnyString(e.text.filenamePlaceholderText, "Filename (optional)");
            e.text.onlyDataBeingViewedText = o.getAnyString(e.text.onlyDataBeingViewedText, "Only data being viewed");
            e.text.zoomInText = o.getAnyString(e.text.zoomInText, "Zoom In");
            e.text.zoomOutText = o.getAnyString(e.text.zoomOutText, "Zoom Out");
            e.text.clearButtonText = o.getAnyString(e.text.clearButtonText, "Clear");
            e.text.selectFilesText = o.getAnyString(e.text.selectFilesText, "Select File(s)");
            e.text.dragAndDropFilesText = o.getAnyString(e.text.dragAndDropFilesText, "Drag and drop your file(s) here ...");
            e.text.addTypeText = o.getAnyString(e.text.addTypeText, "Add Type");
            e.text.typePlaceholderText = o.getAnyString(e.text.typePlaceholderText, "Type");
            e.text.addButtonText = o.getAnyString(e.text.addButtonText, "Add");
            e.text.removeButtonText = o.getAnyString(e.text.removeButtonText, "Remove");
            e.text.invertText = o.getAnyString(e.text.invertText, "Invert");
            return e.text;
        }
        function s(e) {
            if (i.invalidOptionArray(e.monthNames, 12)) {
                e.monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
            }
            if (i.invalidOptionArray(e.dayNames, 7)) {
                e.dayNames = [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ];
            }
            return e;
        }
    })(t = e.Options || (e.Options = {}));
})(u || (u = {}));

var w;

(e => {
    let t;
    (e => {
        function t(e) {
            e._currentView.disabledBackground = a.create(e._currentView.element, "div", "disabled");
        }
        e.render = t;
        function n(e) {
            if (i.defined(e._currentView.disabledBackground) && e._currentView.disabledBackground.style.display !== "block") {
                e._currentView.disabledBackground.style.display = "block";
            }
        }
        e.show = n;
        function o(e) {
            if (i.defined(e._currentView.disabledBackground) && e._currentView.disabledBackground.style.display !== "none") {
                e._currentView.disabledBackground.style.display = "none";
            }
        }
        e.hide = o;
    })(t = e.Background || (e.Background = {}));
})(w || (w = {}));

var h;

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
})(h || (h = {}));

var f;

(e => {
    function t(e, t, i, o) {
        if (t === "json") {
            n(e, i, o);
        } else if (t === "txt") {
            s(e, i);
        } else if (t === "csv") {
            r(e, i);
        } else if (t === "tsv") {
            a(e, i);
        } else if (t === "md") {
            l(e, i);
        } else if (t === "yaml") {
            c(e, i);
        } else if (t === "toml") {
            d(e, i);
        }
    }
    e.file = t;
    function n(e, t, n) {
        const s = new FileReader;
        let r = {};
        s.onloadend = () => t(e.name, r);
        s.onload = e => {
            const t = o.getObjectFromString(e.target.result, n);
            if (t.parsed && i.definedObject(t.object)) {
                r = t.object;
            }
        };
        s.readAsText(e);
    }
    function s(e, t) {
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
    function r(e, t) {
        const n = new FileReader;
        const i = {};
        n.onloadend = () => t(e.name, i);
        n.onload = e => {
            const t = e.target.result.toString().replace(new RegExp('"', "g"), "");
            const n = t.split("\n");
            const o = n.length;
            for (let e = 1; e < o; e++) {
                let t = n[e].split(",");
                i[t[0].trim()] = parseInt(t[1].trim());
            }
        };
        n.readAsText(e);
    }
    function a(e, t) {
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
    function l(e, t) {
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
    function c(e, t) {
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
    function d(e, t) {
        const n = new FileReader;
        const i = {};
        n.onloadend = () => t(e.name, i);
        n.onload = e => {
            const t = e.target.result.toString().split("\n");
            const n = t.length;
            for (let e = 3; e < n; e++) {
                const n = t[e].split("=");
                i[n[0].trim()] = parseInt(n[1].trim());
            }
        };
        n.readAsText(e);
    }
})(f || (f = {}));

var g;

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
            let r = null;
            if (i.definedString(n)) {
                r = `${n}.${o.toLowerCase()}`;
            } else {
                const n = new Date;
                const i = `${s.padNumber(n.getDate())}${"-"}${s.padNumber(n.getMonth() + 1)}${"-"}${n.getFullYear()}`;
                const a = `${s.padNumber(n.getHours())}${"-"}${s.padNumber(n.getMinutes())}`;
                let l = "";
                if (t._currentView.type !== e.text.unknownTrendText) {
                    l = `${t._currentView.type.toLowerCase().replace(/ /g, "_")}${"_"}`;
                }
                r = `${l}${i}${"_"}${a}.${o.toLowerCase()}`;
            }
            return r;
        }
        e.filename = n;
    })(t = e.File || (e.File = {}));
    let n;
    (e => {
        function t(e, t, r, w) {
            let h = null;
            if (e === "csv") {
                h = n(t, r);
            } else if (e === "json") {
                h = i(t);
            } else if (e === "xml") {
                h = o(t);
            } else if (e === "txt") {
                h = s(t);
            } else if (e === "html") {
                h = a(t, r, w);
            } else if (e === "md") {
                h = l(t);
            } else if (e === "tsv") {
                h = c(t);
            } else if (e === "yaml") {
                h = d(t, r, w);
            } else if (e === "toml") {
                h = u(t, r, w);
            }
            return h;
        }
        e.get = t;
        function n(e, t) {
            const n = [];
            for (const t in e) {
                if (e.hasOwnProperty(t)) {
                    n.push(h([ w(t), w(e[t].toString()) ]));
                }
            }
            if (n.length > 0) {
                n.unshift(h([ w(t.text.dateText), w(t.text.countText) ]));
            }
            return n.join("\n");
        }
        function i(e) {
            return JSON.stringify(e);
        }
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
        function s(e) {
            const t = [];
            for (const n in e) {
                if (e.hasOwnProperty(n)) {
                    t.push(`${n}${":"}${" "}${e[n].toString()}`);
                }
            }
            return t.join("\n");
        }
        function a(e, t, n) {
            const i = [];
            const o = r.getCustomFormattedDateText(t, n.exportDateTimeFormat, new Date);
            i.push("<!DOCTYPE html>");
            i.push("<html>");
            i.push("<head>");
            i.push('<meta charset="utf-8" />');
            i.push(`<meta http-equiv="Last-Modified" content="${o} GMT" />`);
            i.push("</head>");
            i.push("<body>");
            i.push("<ul>");
            for (const t in e) {
                if (e.hasOwnProperty(t)) {
                    i.push(`<li><b>${t}:</b> ${e[t].toString()}</li>`);
                }
            }
            i.push("</ul>");
            i.push("</body>");
            i.push("</html>");
            return i.join("\n");
        }
        function l(e) {
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
        function c(e) {
            const t = [];
            t.push(`Full Date${"\t"}Count`);
            for (const n in e) {
                if (e.hasOwnProperty(n)) {
                    t.push(`${n}${"\t"}${e[n].toString()}`);
                }
            }
            return t.join("\n");
        }
        function d(e, t, n) {
            const i = [];
            const o = r.getCustomFormattedDateText(t, n.exportDateTimeFormat, new Date);
            i.push(`Last-Modified:${" "}${o}`);
            for (const t in e) {
                if (e.hasOwnProperty(t)) {
                    i.push(`${t}${":"}${" "}${e[t].toString()}`);
                }
            }
            return i.join("\n");
        }
        function u(e, t, n) {
            const i = [];
            const o = r.getCustomFormattedDateText(t, n.exportDateTimeFormat, new Date);
            i.push(`last_modified = "${o}"`);
            i.push("");
            i.push("[dates]");
            for (const t in e) {
                if (e.hasOwnProperty(t)) {
                    i.push(`${t} = ${e[t].toString()}`);
                }
            }
            return i.join("\n");
        }
        function w(e) {
            let t = e.toString().replace(/(\r\n|\n|\r)/gm, "").replace(/(\s\s)/gm, " ");
            t = t.replace(/"/g, '""');
            t = `"${t}"`;
            return t;
        }
        function h(e) {
            return e.join(",");
        }
    })(n = e.Contents || (e.Contents = {}));
})(g || (g = {}));

var m;

(e => {
    function t(e, t) {
        const n = e.indexOf(") ") > -1 ? `${e.split(") ")[0]})` : e;
        let i = n.replace("rgba(", "").replace("rgb(", "").replace(")", "").split(",");
        if (n.startsWith("rgba")) {
            i[i.length - 1] = t.toString();
        } else {
            i.push(t.toString());
        }
        return `rgba(${i.join()})`;
    }
    e.toRgbOpacityColor = t;
    function n(e) {
        const t = e.trim().replace("#", "");
        let n = 1;
        const i = parseInt(t.substring(0, 2), 16);
        const o = parseInt(t.substring(2, 4), 16);
        const s = parseInt(t.substring(4, 6), 16);
        if (e.length === 8) {
            n = parseInt(t.substring(6, 8), 16);
        }
        return `rgba(${i}, ${o}, ${s}, ${n})`;
    }
    e.hexToRgba = n;
    function i(e) {
        const t = Object.values(e.values).sort((e, t) => e - t);
        const n = t.length;
        const i = 1 / n;
        for (let o = 0; o < n; o++) {
            e.valueOpacities[t[o]] = parseFloat((i * (o + 1)).toFixed(2));
        }
    }
    e.valuesToOpacitiesOrder = i;
})(m || (m = {}));

var p;

(e => {
    let t;
    (e => {
        e.DaySize = "--heat-js-day-size";
        e.Spacing = "--heat-js-spacing";
    })(t = e.Variables || (e.Variables = {}));
})(p || (p = {}));

var y;

(e => {
    function t(e, t, n, i = true) {
        if (n > 0) {
            if (i && e.chartsAnimationDelay > 0) {
                setTimeout(() => {
                    t.style.height = `${n}px`;
                }, e.chartsAnimationDelay);
            } else {
                t.style.height = `${n}px`;
            }
        }
    }
    e.setHeight = t;
})(y || (y = {}));

(() => {
    let v = {};
    let T = null;
    let x = {};
    function b() {
        const e = v.domElementTypes;
        const t = e.length;
        for (let n = 0; n < t; n++) {
            const t = document.getElementsByTagName(e[n]);
            const i = [].slice.call(t);
            const o = i.length;
            for (let e = 0; e < o; e++) {
                if (!V(i[e])) {
                    break;
                }
            }
        }
    }
    function V(t) {
        let n = true;
        if (i.defined(t) && t.hasAttribute(e.HEAT_JS_ATTRIBUTE_NAME)) {
            const s = t.getAttribute(e.HEAT_JS_ATTRIBUTE_NAME);
            if (i.definedString(s)) {
                const r = o.getObjectFromString(s, v);
                if (r.parsed && i.definedObject(r.object)) {
                    _(d.Options.getForNewInstance(v, r.object, t));
                } else {
                    if (!v.safeMode) {
                        console.error(v.text.attributeNotValidErrorText.replace("{{attribute_name}}", e.HEAT_JS_ATTRIBUTE_NAME));
                        n = false;
                    }
                }
            } else {
                if (!v.safeMode) {
                    console.error(v.text.attributeNotSetErrorText.replace("{{attribute_name}}", e.HEAT_JS_ATTRIBUTE_NAME));
                    n = false;
                }
            }
        }
        return n;
    }
    function _(t) {
        c.customEvent(t.events.onBeforeRender, t._currentView.element);
        if (!i.definedString(t._currentView.element.id)) {
            t._currentView.element.id = crypto.randomUUID();
        }
        if (t._currentView.element.className.trim() === "") {
            t._currentView.element.className = "heat-js";
        } else {
            a.addClass(t._currentView.element, "heat-js");
        }
        if (t.resizable) {
            a.addClass(t._currentView.element, "resizable");
        }
        t._currentView.element.removeAttribute(e.HEAT_JS_ATTRIBUTE_NAME);
        Me(t._currentView.element.id, t);
        D(t);
        C(t);
        c.customEvent(t.events.onRenderComplete, t._currentView.element);
    }
    function D(e, t = false, n = false, o = false) {
        if (t) {
            Le(e);
        }
        if (i.defined(e._currentView.mapContents)) {
            e._currentView.mapContentsScrollLeft = e._currentView.mapContents.scrollLeft;
        }
        if (e.views.chart.enabled && i.defined(e._currentView.chartContents)) {
            e._currentView.chartContentsScrollLeft = e._currentView.chartContents.scrollLeft;
        }
        if (e.views.days.enabled && i.defined(e._currentView.daysContents)) {
            e._currentView.daysContentsScrollLeft = e._currentView.daysContents.scrollLeft;
        }
        if (e.views.statistics.enabled && i.defined(e._currentView.statisticsContents)) {
            e._currentView.statisticsContentsScrollLeft = e._currentView.statisticsContents.scrollLeft;
        }
        e._currentView.element.innerHTML = "";
        e._currentView.yearsAvailable = Ae(e);
        l.hide(e);
        Ie(e);
        Ce(e);
        if (e.title.showConfigurationButton || e.title.showExportButton || e.title.showImportButton || e.allowTypeAdding) {
            w.Background.render(e);
        }
        if (e.title.showConfigurationButton) {
            S(e);
        }
        if (e.title.showExportButton) {
            A(e);
        }
        if (e.title.showImportButton) {
            E(e);
        }
        if (e.allowTypeAdding) {
            j(e);
        }
        l.render(e);
        Z(e);
        Q(e);
        ne(e, n, o);
        if (e.views.chart.enabled) {
            le(e, n);
        }
        if (e.views.days.enabled) {
            ue(e, n);
        }
        if (e.views.months.enabled) {
            fe(e, n);
        }
        if (e.views.statistics.enabled) {
            pe(e, n);
        }
        Te(e);
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
    function C(e, t = true) {
        const n = t ? window.addEventListener : window.removeEventListener;
        n("blur", () => l.hide(e));
    }
    function S(e) {
        e._currentView.configurationDialog = a.create(e._currentView.disabledBackground, "div", "dialog configuration");
        const t = a.create(e._currentView.configurationDialog, "div", "dialog-title-bar");
        const n = a.create(e._currentView.configurationDialog, "div", "dialog-contents");
        const i = a.create(t, "div", "dialog-close");
        const o = a.create(n, "div", "side-container panel");
        const s = a.create(n, "div", "side-container panel");
        a.createWithHTML(t, "span", "dialog-title-bar-text", v.text.configurationTitleText);
        a.createWithHTML(o, "div", "side-container-title-text", `${v.text.visibleDaysText}${":"}`);
        a.createWithHTML(s, "div", "side-container-title-text", `${v.text.visibleMonthsText}${":"}`);
        const r = a.create(s, "div", "side-container");
        const c = a.create(s, "div", "side-container");
        i.onclick = () => B(e);
        for (let t = 0; t < 7; t++) {
            e._currentView.configurationDialogDayCheckBoxes[t] = a.createCheckBox(o, v.text.dayNames[t], t.toString());
        }
        let d = r;
        let u = 0;
        for (let t = e.startMonth; t < 12 + e.startMonth; t++) {
            let n = t;
            if (e.startMonth > 0 && t > 11) {
                n = t - 12;
            }
            e._currentView.configurationDialogMonthCheckBoxes[n] = a.createCheckBox(d, v.text.monthNames[n], n.toString());
            u++;
            if (u > 6) {
                d = c;
            }
        }
        l.add(i, e, v.text.closeButtonText);
    }
    function M(e) {
        w.Background.show(e);
        if (i.defined(e._currentView.configurationDialog) && e._currentView.configurationDialog.style.display !== "block") {
            e._currentView.configurationDialog.style.display = "block";
        }
        const t = h.days(e);
        const n = h.months(e);
        for (let n = 0; n < 7; n++) {
            e._currentView.configurationDialogDayCheckBoxes[n].checked = i.dayVisible(t, n + 1);
        }
        for (let t = 0; t < 12; t++) {
            e._currentView.configurationDialogMonthCheckBoxes[t].checked = i.monthVisible(n, t);
        }
        l.hide(e);
    }
    function B(e) {
        w.Background.hide(e);
        if (i.defined(e._currentView.configurationDialog) && e._currentView.configurationDialog.style.display !== "none") {
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
            D(e);
            c.customEvent(e.events.onOptionsUpdate, e._currentView.element, e);
        } else {
            l.hide(e);
        }
    }
    function A(e) {
        e._currentView.exportDialog = a.create(e._currentView.disabledBackground, "div", "dialog export");
        const t = a.create(e._currentView.exportDialog, "div", "dialog-title-bar");
        const n = a.create(e._currentView.exportDialog, "div", "dialog-contents");
        const i = a.create(t, "div", "dialog-close");
        a.createWithHTML(t, "span", "dialog-title-bar-text", v.text.selectTypeText);
        e._currentView.exportDialogExportTypeSelect = a.create(n, "select", "input-box");
        e._currentView.exportDialogExportTypeSelect.name = crypto.randomUUID();
        e._currentView.exportDialogExportFilenameInput = a.create(n, "input", "input-box filename");
        e._currentView.exportDialogExportFilenameInput.name = crypto.randomUUID();
        e._currentView.exportDialogExportFilenameInput.placeholder = v.text.filenamePlaceholderText;
        e._currentView.exportDialogExportOnlyDataBeingViewedCheckBox = a.createCheckBox(n, v.text.onlyDataBeingViewedText, crypto.randomUUID());
        e._currentView.exportDialogExportOnlyDataBeingViewedCheckBox.checked = e.exportOnlyDataBeingViewed;
        const o = a.create(n, "div", "buttons");
        const s = a.createButton(o, "button", "default", v.text.exportButtonText);
        N(e);
        const r = () => {
            const t = e._currentView.exportDialogExportTypeSelect.value;
            const n = e._currentView.exportDialogExportFilenameInput.value;
            const i = e._currentView.exportDialogExportOnlyDataBeingViewedCheckBox.checked;
            L(e);
            O(e, t, n, i);
        };
        e._currentView.exportDialogExportFilenameInput.onkeydown = e => {
            if (e.key === "Enter") {
                r();
            }
        };
        s.onclick = () => r();
        i.onclick = () => L(e);
        l.add(i, e, v.text.closeButtonText);
    }
    function N(e) {
        let t;
        let i = [];
        for (t in n) {
            const o = a.createWithNoContainer("option");
            o.value = n[t];
            o.textContent = t.toString().toUpperCase();
            o.selected = t === e.exportType;
            i.push(o);
        }
        i.sort((e, t) => e.text.toLowerCase().localeCompare(t.text.toLowerCase()));
        i.forEach(t => e._currentView.exportDialogExportTypeSelect.add(t));
    }
    function k(e) {
        w.Background.show(e);
        if (i.defined(e._currentView.exportDialog) && e._currentView.exportDialog.style.display !== "block") {
            e._currentView.exportDialogExportFilenameInput.value = "";
            e._currentView.exportDialog.style.display = "block";
            e._currentView.exportDialogExportFilenameInput.focus();
        }
        l.hide(e);
    }
    function L(e) {
        w.Background.hide(e);
        if (i.defined(e._currentView.exportDialog) && e._currentView.exportDialog.style.display !== "none") {
            e._currentView.exportDialog.style.display = "none";
        }
        l.hide(e);
    }
    function O(e, t = null, n = null, s = true) {
        const r = o.getString(t, e.exportType).toLowerCase();
        const l = g.File.mimeType(r);
        const d = I(e, s);
        const u = g.Contents.get(r, d, v, e);
        if (i.definedString(u)) {
            const t = a.create(document.body, "a");
            t.style.display = "none";
            t.setAttribute("target", "_blank");
            t.setAttribute("href", `data:${l};charset=utf-8,${encodeURIComponent(u)}`);
            t.setAttribute("download", g.File.filename(v, e, n, r));
            t.click();
            document.body.removeChild(t);
            c.customEvent(e.events.onExport, e._currentView.element);
        }
    }
    function I(e, t) {
        const n = {};
        const o = Be(e);
        if (t) {
            const t = e._currentView.year;
            const s = h.days(e);
            const a = h.months(e);
            for (let l = e.startMonth; l < 12 + e.startMonth; l++) {
                let c = l;
                let d = t;
                if (e.startMonth > 0 && l > 11) {
                    c = l - 12;
                    d++;
                }
                if (i.monthVisible(a, c)) {
                    const e = r.getTotalDaysInMonth(d, c);
                    for (let t = 0; t < e; t++) {
                        const e = new Date(d, c, t + 1);
                        const a = r.toStorageDate(e);
                        const l = r.getWeekdayNumber(e) + 1;
                        if (i.dayVisible(s, l)) {
                            if (o.hasOwnProperty(a)) {
                                n[a] = o[a];
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
    function E(e) {
        e._currentView.importDialog = a.create(e._currentView.disabledBackground, "div", "dialog import");
        const t = a.create(e._currentView.importDialog, "div", "dialog-title-bar");
        const n = a.create(e._currentView.importDialog, "div", "dialog-contents");
        const i = a.create(t, "div", "dialog-close");
        a.createWithHTML(t, "span", "dialog-title-bar-text", v.text.selectFilesText);
        e._currentView.importDialogDragAndDrop = a.createWithHTML(n, "div", "drag-and-drop-files", v.text.dragAndDropFilesText);
        H(e._currentView.importDialogDragAndDrop, e);
        const o = a.create(n, "div", "buttons");
        const s = a.createButton(o, "button", "", "...");
        e._currentView.importDialogImportButton = a.createButton(o, "button", "default", v.text.importButtonText);
        e._currentView.importDialogImportButton.disabled = true;
        i.onclick = () => R(e);
        s.onclick = () => $(e);
        e._currentView.importDialogImportButton.onclick = () => Y(e._currentView.importDialogFileList, e);
        l.add(i, e, v.text.closeButtonText);
    }
    function F(e) {
        w.Background.show(e);
        if (i.defined(e._currentView.importDialog) && e._currentView.importDialog.style.display !== "block") {
            e._currentView.importDialog.style.display = "block";
        }
        l.hide(e);
    }
    function R(e) {
        w.Background.hide(e);
        if (i.defined(e._currentView.importDialog) && e._currentView.importDialog.style.display !== "none") {
            e._currentView.importDialogFileList = null;
            e._currentView.importDialogImportButton.disabled = true;
            e._currentView.importDialog.style.display = "none";
        }
        l.hide(e);
    }
    function H(e, t) {
        if (t.allowFileImports && !t._currentView.isInFetchMode) {
            e.ondragover = a.cancelBubble;
            e.ondragenter = a.cancelBubble;
            e.ondragleave = a.cancelBubble;
            e.ondrop = e => {
                a.cancelBubble(e);
                if (i.defined(window.FileReader) && e.dataTransfer.files.length > 0) {
                    const n = new DataTransfer;
                    if (!t.allowFileImports) {
                        n.items.add(e.dataTransfer.files[0]);
                    } else {
                        const t = e.dataTransfer.files.length;
                        for (let i = 0; i < t; i++) {
                            n.items.add(e.dataTransfer.files[i]);
                        }
                    }
                    W(t, n.files);
                }
            };
        }
    }
    function $(e) {
        const n = [];
        let i;
        for (i in t) {
            n.push(`.${i}`);
        }
        const o = a.createWithNoContainer("input");
        o.type = "file";
        o.accept = n.join(", ");
        o.multiple = e.allowMultipleFileImports;
        o.onchange = () => W(e, o.files);
        o.click();
    }
    function W(e, t) {
        if (t.length <= 0) {
            e._currentView.importDialogDragAndDrop.innerHTML = v.text.dragAndDropFilesText;
            e._currentView.importDialogImportButton.disabled = true;
        } else {
            e._currentView.importDialogFileList = t;
            e._currentView.importDialogDragAndDrop.innerHTML = "";
            e._currentView.importDialogImportButton.disabled = false;
            const n = t.length;
            for (let i = 0; i < n; i++) {
                const n = t[i].name;
                const o = a.createWithHTML(e._currentView.importDialogDragAndDrop, "div", "filename", `<b>${i + 1}</b>. ${n}`);
                const s = a.create(o, "div", "remove");
                l.add(s, e, v.text.removeButtonText);
                s.onclick = () => P(e, i);
            }
        }
    }
    function P(e, t) {
        const n = new DataTransfer;
        const i = e._currentView.importDialogFileList.length;
        for (let o = 0; o < i; o++) {
            if (o !== t) {
                n.items.add(e._currentView.importDialogFileList[o]);
            }
        }
        W(e, n.files);
    }
    function Y(e, t) {
        const n = e.length;
        const i = [];
        const o = Be(t);
        const s = (e, s) => {
            i.push(e);
            for (const e in s) {
                if (s.hasOwnProperty(e)) {
                    if (!o.hasOwnProperty(e)) {
                        o[e] = 0;
                    }
                    o[e] += s[e];
                }
            }
            if (i.length === n) {
                c.customEvent(t.events.onImport, t._currentView.element);
                D(t, true);
            }
        };
        for (let t = 0; t < n; t++) {
            const n = e[t];
            const i = n.name.split(".").pop().toLowerCase();
            f.file(n, i, s, v);
        }
    }
    function j(e) {
        e._currentView.typeAddingDialog = a.create(e._currentView.disabledBackground, "div", "dialog add-type");
        const t = a.create(e._currentView.typeAddingDialog, "div", "dialog-title-bar");
        const n = a.create(e._currentView.typeAddingDialog, "div", "dialog-contents");
        const o = a.create(t, "div", "dialog-close");
        a.createWithHTML(t, "span", "dialog-title-bar-text", v.text.addTypeText);
        e._currentView.typeAddingDialogTypeInput = a.create(n, "input", "input-box type");
        e._currentView.typeAddingDialogTypeInput.name = crypto.randomUUID();
        e._currentView.typeAddingDialogTypeInput.placeholder = v.text.typePlaceholderText;
        const s = a.create(n, "div", "buttons");
        const r = a.createButton(s, "button", "default", v.text.addButtonText);
        const d = () => {
            const t = e._currentView.typeAddingDialogTypeInput.value.trim();
            if (i.definedString(t)) {
                const n = e._currentView.element.id;
                if (!x[n].typeData.hasOwnProperty(t)) {
                    x[n].typeData[t] = {};
                    x[n].totalTypes++;
                }
                e._currentView.type = t;
                c.customEvent(e.events.onTypeSwitch, t);
                L(e);
                D(e, true);
            } else {
                L(e);
            }
        };
        e._currentView.typeAddingDialogTypeInput.onkeydown = e => {
            if (e.key === "Enter") {
                d();
            }
        };
        r.onclick = () => d();
        o.onclick = () => G(e);
        l.add(o, e, v.text.closeButtonText);
    }
    function U(e) {
        w.Background.show(e);
        if (i.defined(e._currentView.typeAddingDialog) && e._currentView.typeAddingDialog.style.display !== "block") {
            e._currentView.typeAddingDialogTypeInput.value = "";
            e._currentView.typeAddingDialog.style.display = "block";
            e._currentView.typeAddingDialogTypeInput.focus();
        }
        l.hide(e);
    }
    function G(e) {
        w.Background.hide(e);
        if (i.defined(e._currentView.typeAddingDialog) && e._currentView.typeAddingDialog.style.display !== "none") {
            e._currentView.typeAddingDialog.style.display = "none";
        }
        l.hide(e);
    }
    function Z(e) {
        if (e.title.showText || e.title.showYearSelector || e.title.showRefreshButton || e.title.showExportButton || e.title.showImportButton || e.title.showClearButton) {
            const t = a.create(e._currentView.element, "div", "title-bar");
            const n = a.create(t, "div", "title");
            const o = e.title.showTitleDropDownMenu && (e.views.chart.enabled || e.views.days.enabled || e.views.statistics.enabled || e.views.months.enabled);
            if (o) {
                if (e.title.showTitleDropDownButton) {
                    a.create(n, "div", "down-arrow");
                }
            } else {
                a.addClass(n, "no-click");
            }
            if (e.title.showText) {
                n.innerHTML += e.title.text;
                if (e.title.showSectionText) {
                    a.createWithHTML(n, "span", "section-text", "[");
                    if (e._currentView.view === 1) {
                        a.createWithHTML(n, "span", "section-text-name", v.text.mapText);
                    } else if (e.views.chart.enabled && e._currentView.view === 2) {
                        a.createWithHTML(n, "span", "section-text-name", v.text.chartText);
                    } else if (e.views.days.enabled && e._currentView.view === 3) {
                        a.createWithHTML(n, "span", "section-text-name", v.text.daysText);
                    } else if (e.views.months.enabled && e._currentView.view === 5) {
                        a.createWithHTML(n, "span", "section-text-name", v.text.monthsText);
                    } else if (e.views.statistics.enabled && e._currentView.view === 4) {
                        a.createWithHTML(n, "span", "section-text-name", v.text.colorRangesText);
                    } else {
                        a.createWithHTML(n, "span", "section-text-name", v.text.mapText);
                    }
                    a.createWithHTML(n, "span", "section-text", "]");
                }
            }
            if (o) {
                z(e, n);
            }
            if (e.title.showImportButton && !e._currentView.isInFetchMode) {
                const n = a.createIconButton(t, "button", "import", "arrow-up");
                n.onclick = () => F(e);
                if (e.title.showToolTips) {
                    l.add(n, e, v.text.importButtonText);
                }
            }
            if (e.title.showExportButton) {
                const n = a.createIconButton(t, "button", "export", "arrow-down");
                n.onclick = () => k(e);
                if (e.title.showToolTips) {
                    l.add(n, e, v.text.exportButtonText);
                }
            }
            if (e.title.showRefreshButton) {
                const n = a.createIconButton(t, "button", "refresh", "refresh");
                if (e.title.showToolTips) {
                    l.add(n, e, v.text.refreshButtonText);
                }
                n.onclick = () => {
                    D(e);
                    c.customEvent(e.events.onRefresh, e._currentView.element);
                };
            }
            if (e.title.showClearButton) {
                const n = a.createIconButton(t, "button", "clear", "close");
                if (e.title.showToolTips) {
                    l.add(n, e, v.text.clearButtonText);
                }
                n.onclick = () => {
                    Ne(e);
                    D(e, true);
                };
            }
            if (e.title.showYearSelector) {
                const n = a.createIconButton(t, "button", "back", "arrow-left");
                n.onclick = () => Ue(e);
                if (e.title.showToolTips) {
                    l.add(n, e, v.text.backButtonText);
                }
                if (i.firstVisibleYear(e, e._currentView.year)) {
                    n.disabled = true;
                }
                let o = e._currentView.year.toString();
                if (e.startMonth > 0) {
                    o += ` / ${e._currentView.year + 1}`;
                }
                e._currentView.yearText = a.createWithHTML(t, "div", "year-text", o);
                if (e.title.showYearSelectionDropDown) {
                    q(e);
                } else {
                    a.addClass(e._currentView.yearText, "no-click");
                }
                if (e.title.showConfigurationButton) {
                    let n = a.create(t, "div", "configure");
                    n.onclick = () => M(e);
                    if (e.title.showToolTips) {
                        l.add(n, e, v.text.configurationButtonText);
                    }
                }
                if (e.title.showCurrentYearButton) {
                    const n = a.createIconButton(t, "button", "current", "pin");
                    if (e.title.showToolTips) {
                        l.add(n, e, v.text.currentYearText);
                    }
                    n.onclick = () => {
                        e._currentView.year = (new Date).getFullYear() - 1;
                        Ge(e, false);
                        c.customEvent(e.events.onSetYear, e._currentView.year);
                    };
                }
                const s = a.createIconButton(t, "button", "next", "arrow-right");
                s.onclick = () => Ge(e);
                if (e.title.showToolTips) {
                    l.add(s, e, v.text.nextButtonText);
                }
                if (i.lastVisibleYear(e, e._currentView.year)) {
                    s.disabled = true;
                }
            }
        }
    }
    function z(e, t) {
        const n = a.create(t, "div", "titles-menu-container");
        const o = a.create(n, "div", "titles-menu");
        if (e.title.showTitleDropDownHeaders) {
            a.createWithHTML(o, "div", "title-menu-header", `${v.text.dataText}${":"}`);
        }
        const s = J(e, o, v.text.mapText);
        X(e, s, 1, "map");
        if (e.views.chart.enabled) {
            const t = J(e, o, v.text.chartText);
            X(e, t, 2, "chart");
        }
        let r = null;
        if (e.views.days.enabled) {
            if (e.title.showTitleDropDownHeaders) {
                r = a.createWithHTML(o, "div", "title-menu-header", `${v.text.yearText}${":"}`);
            }
            const t = J(e, o, v.text.daysText);
            X(e, t, 3, "days");
        }
        if (e.views.months.enabled) {
            if (e.title.showTitleDropDownHeaders && !i.defined(r)) {
                r = a.createWithHTML(o, "div", "title-menu-header", `${v.text.yearText}${":"}`);
            }
            const t = J(e, o, v.text.monthsText);
            X(e, t, 5, "months");
        }
        if (e.views.statistics.enabled) {
            if (e.title.showTitleDropDownHeaders) {
                a.createWithHTML(o, "div", "title-menu-header", `${v.text.statisticsText}${":"}`);
            }
            const t = J(e, o, v.text.colorRangesText);
            X(e, t, 4, "statistics");
        }
    }
    function J(e, t, n) {
        const i = a.createWithHTML(t, "div", "title-menu-item", n);
        if (e.title.showTitleDropDownHeaders) {
            a.addClass(i, "indented");
        }
        return i;
    }
    function X(e, t, n, i) {
        if (e._currentView.view === n) {
            a.addClass(t, "title-menu-item-active");
        } else {
            t.onclick = () => De(e, n, i);
        }
    }
    function q(e) {
        a.create(e._currentView.yearText, "div", "down-arrow");
        const t = a.create(e._currentView.yearText, "div", "years-menu-container");
        const n = a.create(t, "div", "years-menu");
        const o = (new Date).getFullYear();
        let s = null;
        t.style.display = "block";
        t.style.visibility = "hidden";
        for (let t = o - e.title.extraSelectionYears; t < o + e.title.extraSelectionYears; t++) {
            if (i.yearVisible(e, t)) {
                let r = K(e, n, t, o);
                if (!i.defined(s)) {
                    s = r;
                }
            }
        }
        if (i.defined(s)) {
            n.scrollTop = s.offsetTop - n.offsetHeight / 2;
        }
        t.style.display = "none";
        t.style.visibility = "visible";
    }
    function K(e, t, n, i) {
        let o = null;
        const s = e.startMonth === 0 ? n.toString() : `${n} / ${n + 1}`;
        const r = a.createWithHTML(t, "div", "year-menu-item", s);
        if (e._currentView.year !== n) {
            r.onclick = () => {
                e._currentView.year = n;
                D(e);
                c.customEvent(e.events.onSetYear, e._currentView.year);
            };
            if (n === i) {
                a.addClass(r, "year-menu-item-current");
            }
        } else {
            a.addClass(r, "year-menu-item-active");
            o = r;
        }
        return o;
    }
    function Q(e) {
        const t = new Date;
        const n = e._currentView.year === t.getFullYear();
        if (e.yearlyStatistics.enabled && (!e.yearlyStatistics.showOnlyForCurrentYear || n)) {
            const o = a.create(e._currentView.element, "div", "yearly-statistics");
            const l = h.days(e);
            const c = h.months(e);
            const d = new Date(e._currentView.year, e.startMonth, 1);
            const u = new Date(e._currentView.year + 1, e.startMonth, 1);
            const w = te(e, l, c, d, u);
            if (e.yearlyStatistics.showToday) {
                let c = Be(e)[r.toStorageDate(t)];
                const d = a.create(o, "div", "statistics-box");
                const u = r.getWeekdayNumber(t) + 1;
                if (!i.defined(c) || !i.dayVisible(l, u)) {
                    c = 0;
                }
                const h = n ? s.friendlyNumber(c) : v.text.unavailableText;
                a.createWithHTML(d, "div", "statistics-box-title", `${v.text.todayText}${":"}`);
                const f = a.createWithHTML(d, "div", "statistics-box-count", h);
                if (!n) {
                    a.addClass(f, "unavailable");
                }
                ee(e, f, w, c, n);
            }
            if (e.yearlyStatistics.showThisWeek) {
                let t = 0;
                if (n) {
                    const n = r.getDateForMondayOfCurrentWeek();
                    const i = new Date(n);
                    i.setDate(n.getDate() + 7);
                    t = te(e, l, c, n, i);
                }
                const i = n ? s.friendlyNumber(t) : v.text.unavailableText;
                const d = a.create(o, "div", "statistics-box");
                a.createWithHTML(d, "div", "statistics-box-title", `${v.text.thisWeekText}${":"}`);
                const u = a.createWithHTML(d, "div", "statistics-box-count", i);
                if (!n) {
                    a.addClass(u, "unavailable");
                }
                ee(e, u, w, t, n);
            }
            if (e.yearlyStatistics.showThisMonth) {
                let i = 0;
                if (n) {
                    const n = new Date(t.getFullYear(), t.getMonth(), 1);
                    const o = new Date(t.getFullYear(), t.getMonth(), r.getTotalDaysInMonth(t.getFullYear(), t.getMonth()) + 1);
                    i = te(e, l, c, n, o);
                }
                const d = n ? s.friendlyNumber(i) : v.text.unavailableText;
                const u = a.create(o, "div", "statistics-box");
                a.createWithHTML(u, "div", "statistics-box-title", `${v.text.thisMonthText}${":"}`);
                const h = a.createWithHTML(u, "div", "statistics-box-count", d);
                if (!n) {
                    a.addClass(h, "unavailable");
                }
                ee(e, h, w, i, n);
            }
            if (e.yearlyStatistics.showThisYear) {
                const e = a.create(o, "div", "statistics-box");
                a.createWithHTML(e, "div", "statistics-box-title", `${v.text.thisYearText}${":"}`);
                a.createWithHTML(e, "div", "statistics-box-count", s.friendlyNumber(w));
            }
            if (o.innerHTML === "") {
                o.parentNode.removeChild(o);
            }
        }
    }
    function ee(e, t, n, i, o) {
        if (o && e.yearlyStatistics.showPercentages) {
            const o = i / n * 100;
            if (!isNaN(o)) {
                const n = `${o.toFixed(e.percentageDecimalPoints)}%`;
                const i = a.create(t, "span", "percentage");
                a.createWithHTML(i, "span", "percentage-bracket", "(");
                a.createWithHTML(i, "span", "percentage-text", n);
                a.createWithHTML(i, "span", "percentage-bracket", ")");
            }
        }
    }
    function te(e, t, n, o, s) {
        let a = 0;
        let l = new Date(o);
        while (l < s) {
            const o = Be(e)[r.toStorageDate(l)];
            const s = r.getWeekdayNumber(l) + 1;
            if (i.monthVisible(n, l.getMonth()) && i.dayVisible(t, s) && i.definedNumber(o)) {
                a += o;
            }
            l.setDate(l.getDate() + 1);
        }
        return a;
    }
    function ne(t, n = false, o) {
        t._currentView.mapContentsContainer = a.create(t._currentView.element, "div", "map-contents-container");
        t._currentView.mapContents = a.create(t._currentView.mapContentsContainer, "div", "map-contents");
        if (t.views.map.showNoDataMessageWhenDataIsNotAvailable && !ae(t)) {
            const e = a.createWithHTML(t._currentView.mapContents, "div", "no-data-message", v.text.noMapDataMessage);
            if (n) {
                a.addClass(e, "view-switch");
            }
        } else {
            t._currentView.mapContents.style.minHeight = "unset";
            const s = a.create(t._currentView.mapContents, "div", "map");
            const l = t._currentView.year;
            if (n) {
                a.addClass(s, "view-switch");
            }
            if (t.views.map.showDayNames) {
                const e = a.create(s, "div", "days");
                const n = t.views.map.showMinimalDayNames && t.views.map.daysToShow.length === 7;
                if (!t.views.map.showMonthNames || t.views.map.placeMonthNamesOnTheBottom) {
                    e.className = "days-months-bottom";
                }
                for (let o = 0; o < 7; o++) {
                    if (i.dayVisible(t.views.map.daysToShow, o + 1)) {
                        const i = !n || o % 3 === 0 ? v.text.dayNames[o] : " ";
                        const s = a.createWithHTML(e, "div", "day-name", i);
                        if (t.views.days.enabled) {
                            s.ondblclick = () => De(t, 3, "days");
                        }
                    }
                }
                if (t.views.map.showDaysInReverseOrder) {
                    a.reverseChildrenOrder(e);
                }
            }
            const c = a.create(s, "div", "months");
            const d = je(t);
            for (let n = t.startMonth; n < 12 + t.startMonth; n++) {
                let o = n;
                let s = l;
                if (t.startMonth > 0 && n > 11) {
                    o = n - 12;
                    s++;
                }
                if (i.monthVisible(t.views.map.monthsToShow, o)) {
                    const n = a.create(c, "div", "month");
                    const l = a.create(n, "div", "day-columns");
                    const u = new Date(s, o, 1);
                    const w = r.getWeekdayNumber(u);
                    let h = r.getTotalDaysInMonth(s, o);
                    let f = a.create(l, "div", "day-column");
                    let g = false;
                    let m = 1;
                    n.setAttribute(e.HEAT_JS_MAP_MONTH_NUMBER_ATTRIBUTE_NAME, `${o + 1}`);
                    h += w;
                    for (let e = 0; e < h; e++) {
                        if (e >= w) {
                            g = true;
                        } else {
                            if (i.dayVisible(t.views.map.daysToShow, m)) {
                                a.create(f, "div", "day-disabled");
                            }
                        }
                        if (g) {
                            let n = null;
                            if (i.dayVisible(t.views.map.daysToShow, m)) {
                                n = re(t, f, e - w, o, s, d);
                            }
                            if ((e + 1) % 7 === 0) {
                                if (t.views.map.showDaysInReverseOrder) {
                                    a.reverseChildrenOrder(f);
                                }
                                f = a.create(l, "div", "day-column");
                                m = 0;
                                if (t._currentView.dayWidth === 0 && i.defined(n)) {
                                    let e = a.getStyleValueByName(n, "margin-left", true);
                                    let i = a.getStyleValueByName(n, "margin-right", true);
                                    t._currentView.dayWidth = n.offsetWidth + e + i;
                                }
                            }
                        }
                        m++;
                    }
                    ie(t, m, f);
                    if (t.views.map.showMonthNames) {
                        let e;
                        const i = n.offsetWidth;
                        let r = v.text.monthNames[o];
                        if (t.startMonth > 0 && t.views.map.showYearsInMonthNames) {
                            r += `${" "}${s}`;
                        }
                        if (!t.views.map.placeMonthNamesOnTheBottom) {
                            e = a.createWithHTML(n, "div", "month-name", r, l);
                        } else {
                            e = a.createWithHTML(n, "div", "month-name-bottom", r);
                        }
                        if (t.views.map.showMonthDayGaps) {
                            e.style.width = `${i}px`;
                        } else {
                            e.style.width = `${i - t._currentView.dayWidth}px`;
                        }
                        if (t.views.months.enabled) {
                            e.ondblclick = () => De(t, 5, "months");
                        }
                    }
                    if (t.views.map.showMonthsInReverseOrder) {
                        a.reverseChildrenOrder(l);
                    }
                }
            }
            if (t.views.map.showMonthsInReverseOrder) {
                a.reverseChildrenOrder(c);
            }
            oe(t, c);
            se(t, s);
            if (t.views.map.keepScrollPositions || o) {
                t._currentView.mapContents.scrollLeft = t._currentView.mapContentsScrollLeft;
            }
        }
    }
    function ie(e, t, n) {
        const o = 7 - n.children.length;
        if (o > 0 && o < 7) {
            for (let s = 0; s < o; s++) {
                if (i.dayVisible(e.views.map.daysToShow, t)) {
                    a.create(n, "div", "day-disabled");
                }
                t++;
            }
        }
        if (e.views.map.showDaysInReverseOrder) {
            a.reverseChildrenOrder(n);
        }
    }
    function oe(e, t) {
        const n = t.children.length;
        for (let i = 1; i < n; i++) {
            const n = t.children[i];
            const o = n.getElementsByClassName("day-column");
            const s = [].slice.call(o);
            const r = s[0].getElementsByClassName("day-disabled");
            if (!e.views.map.showMonthDayGaps && r.length > 0) {
                n.style.marginLeft = `${-e._currentView.dayWidth}px`;
            } else if (e.views.map.showMonthDayGaps && r.length === 0) {
                n.style.marginLeft = `${e._currentView.dayWidth}px`;
            }
        }
    }
    function se(e, t) {
        const n = a.getStyleValueByNameSizingMetic(document.documentElement, p.Variables.DaySize);
        let i = a.getStyleValueByName(document.documentElement, p.Variables.DaySize, true);
        if (e._currentView.mapZoomIncrement === -1) {
            e._currentView.mapZoomIncrement = i / 10;
        }
        if (e.views.map.allowZooming) {
            const o = a.create(e._currentView.mapContentsContainer, "div", "zooming");
            const r = a.create(o, "div", "zoom-close-button");
            const d = a.createIconButton(o, "button", "zoom-out", "minus");
            const u = a.createWithHTML(o, "span", "zoom-level", `+${s.friendlyNumber(e._currentView.mapZoomLevel * 10)}%`);
            const w = a.createIconButton(o, "button", "zoom-in", "plus");
            const h = a.getStyleValueByName(document.documentElement, p.Variables.Spacing, true);
            i = a.getStyleValueByName(e._currentView.element, p.Variables.DaySize, true);
            if (i === 0) {
                i = a.getStyleValueByName(document.documentElement, p.Variables.DaySize, true);
            }
            l.add(r, e, v.text.closeButtonText);
            l.add(w, e, v.text.zoomInText);
            l.add(d, e, v.text.zoomOutText);
            o.style.bottom = e._currentView.mapContentsContainer.offsetHeight - t.offsetHeight + "px";
            if (e.views.map.zoomLevel > 0 && e._currentView.mapZoomLevel === -1) {
                i += parseFloat((e.views.map.zoomLevel * e._currentView.mapZoomIncrement).toFixed(1));
                e._currentView.mapZoomLevel = e.views.map.zoomLevel;
                e._currentView.element.style.setProperty(p.Variables.DaySize, `${i}${n}`);
                e._currentView.dayWidth = 0;
                u.innerText = `+${s.friendlyNumber(e._currentView.mapZoomLevel * 10)}%`;
                D(e, false, false, true);
            }
            if (e._currentView.mapZoomLevel === -1) {
                e._currentView.mapZoomLevel = 0;
                u.innerText = `+${s.friendlyNumber(e._currentView.mapZoomLevel * 10)}%`;
            }
            e._currentView.mapContents.style.paddingRight = `${o.offsetWidth + h}px`;
            d.disabled = e._currentView.mapZoomLevel === 0;
            r.onclick = () => {
                e.views.map.allowZooming = false;
                e._currentView.mapContents.style.paddingRight = "0px";
                o.parentNode.removeChild(o);
            };
            w.onclick = () => {
                i += e._currentView.mapZoomIncrement;
                i = parseFloat(i.toFixed(1));
                e._currentView.mapZoomLevel++;
                e._currentView.element.style.setProperty(p.Variables.DaySize, `${i}${n}`);
                e._currentView.dayWidth = 0;
                d.disabled = false;
                u.innerText = `+${s.friendlyNumber(e._currentView.mapZoomLevel * 10)}%`;
                c.customEvent(e.events.onMapZoomLevelChange, e._currentView.element, e._currentView.mapZoomLevel);
                D(e, false, false, true);
            };
            d.onclick = () => {
                if (e._currentView.mapZoomLevel > 0) {
                    i -= e._currentView.mapZoomIncrement;
                    i = parseFloat(i.toFixed(1));
                    e._currentView.mapZoomLevel--;
                    e._currentView.element.style.setProperty(p.Variables.DaySize, `${i}${n}`);
                    e._currentView.dayWidth = 0;
                    d.disabled = e._currentView.mapZoomLevel === 0;
                    u.innerText = `+${s.friendlyNumber(e._currentView.mapZoomLevel * 10)}%`;
                    c.customEvent(e.events.onMapZoomLevelChange, e._currentView.element, e._currentView.mapZoomLevel);
                    D(e, false, false, true);
                }
            };
        } else {
            if (e.views.map.zoomLevel > 0 && e._currentView.mapZoomLevel === -1) {
                i += parseFloat((e.views.map.zoomLevel * e._currentView.mapZoomIncrement).toFixed(1));
                e._currentView.mapZoomLevel = e.views.map.zoomLevel;
                e._currentView.element.style.setProperty(p.Variables.DaySize, `${i}${n}`);
            }
        }
    }
    function re(t, n, l, d, u, w) {
        const h = l + 1;
        const f = a.create(n, "div", "day");
        const g = new Date(u, d, h);
        const m = i.holiday(t, g);
        let p = Be(t)[r.toStorageDate(g)];
        p = o.getNumber(p, 0);
        f.setAttribute(e.HEAT_JS_MAP_DATE_ATTRIBUTE_NAME, `${s.padNumber(h)}-${s.padNumber(d + 1)}-${u}`);
        if (t.views.map.showToolTips) {
            _e(t, f, g, p, t.views.map.dayToolTipText, t.events.onMapDayToolTipRender, m.matched, t.views.map.showCountsInToolTips);
        }
        if (t.views.map.showDayDateNumbers) {
            a.createWithHTML(f, "div", "count-date", `${h.toString()}<sup>${r.getDayOrdinal(v, h)}</sup>`);
        }
        if (t.views.map.showDayCounts && p > 0) {
            a.createWithHTML(f, "div", "count", s.friendlyNumber(p));
        }
        if (i.definedFunction(t.events.onMapDayClick)) {
            f.onclick = () => c.customEvent(t.events.onMapDayClick, g, p, m.matched);
        } else if (i.definedFunction(t.events.onMapDayDblClick)) {
            f.ondblclick = () => c.customEvent(t.events.onMapDayDblClick, g, p, m.matched);
        } else {
            a.addClass(f, "no-hover");
        }
        const y = Pe(t, w, p, g);
        if (i.defined(y) && Re(t, y.id)) {
            if (i.definedString(y.mapCssClassName)) {
                a.addClass(f, y.mapCssClassName);
            } else {
                a.addClass(f, y.cssClassName);
            }
        }
        if (t.views.map.highlightCurrentDay && r.isTodaysDate(g)) {
            a.addClass(f, "today");
        }
        return f;
    }
    function ae(e) {
        let t = false;
        const n = Be(e);
        const i = e._currentView.year.toString();
        const o = (e._currentView.year + 1).toString();
        for (const s in n) {
            if (n.hasOwnProperty(s)) {
                if (r.getStorageDateYear(s) === i) {
                    t = true;
                    break;
                } else if (e.startMonth > 0 && r.getStorageDateYear(s) === o) {
                    t = true;
                    break;
                }
            }
        }
        return t;
    }
    function le(e, t) {
        e._currentView.chartContents = a.create(e._currentView.element, "div", "chart-contents");
        const n = a.create(e._currentView.chartContents, "div", "chart");
        let o = a.create(n, "div", "y-labels");
        const s = a.create(n, "div", "day-lines");
        const l = je(e);
        const c = de(e);
        const d = e._currentView.year;
        let u = 0;
        if (t) {
            a.addClass(n, "view-switch");
        }
        if (c > 0 && e.views.chart.showChartYLabels) {
            const e = a.createWithHTML(o, "div", "label-0", c.toString());
            a.createWithHTML(o, "div", "label-25", (Math.floor(c / 4) * 3).toString());
            a.createWithHTML(o, "div", "label-50", Math.floor(c / 2).toString());
            a.createWithHTML(o, "div", "label-75", Math.floor(c / 4).toString());
            a.createWithHTML(o, "div", "label-100", "0");
            o.style.width = `${e.offsetWidth}px`;
            u = o.offsetWidth + a.getStyleValueByName(o, "margin-right", true);
        } else {
            o.parentNode.removeChild(o);
            o = null;
        }
        if (c === 0) {
            e._currentView.chartContents.style.minHeight = `${e._currentView.mapContents.offsetHeight}px`;
            n.parentNode.removeChild(n);
            const i = a.createWithHTML(e._currentView.chartContents, "div", "no-data-message", v.text.noChartDataMessage);
            if (t) {
                a.addClass(i, "view-switch");
            }
        } else {
            const n = a.getStyleValueByName(s, "border-bottom-width", true);
            const o = (s.offsetHeight - n) / c;
            let w = 0;
            let h = 0;
            let f = [];
            let g = false;
            for (let n = e.startMonth; n < 12 + e.startMonth; n++) {
                let c = n;
                let u = d;
                if (e.startMonth > 0 && n > 11) {
                    c = n - 12;
                    u++;
                }
                if (i.monthVisible(e.views.chart.monthsToShow, c)) {
                    const n = r.getTotalDaysInMonth(u, c);
                    let d = 1;
                    let m = false;
                    w++;
                    for (let w = 0; w < n; w++) {
                        const n = new Date(u, c, d);
                        const p = r.getWeekdayNumber(n) + 1;
                        if (i.dayVisible(e.views.chart.daysToShow, p)) {
                            const n = ce(s, e, w + 1, c, u, l, o, t);
                            if (!m && g && e.views.chart.addMonthSpacing) {
                                a.create(s, "div", "month-spacing", n);
                            }
                            if (!m) {
                                f.push(n);
                                m = true;
                            }
                        }
                        if ((w + 1) % 7 === 0) {
                            d = 0;
                        }
                        d++;
                        h++;
                    }
                }
                g = true;
            }
            if (e.views.chart.showInReverseOrder) {
                a.reverseChildrenOrder(s);
                f = f.reverse();
            }
            if (e.views.chart.showMonthNames) {
                const t = a.create(e._currentView.chartContents, "div", "chart-months");
                let n = 0;
                const o = o => {
                    let s = o + e.startMonth;
                    let r = d;
                    if (e.startMonth > 0 && s > 11) {
                        s -= 12;
                        r++;
                    }
                    if (i.monthVisible(e.views.chart.monthsToShow, s)) {
                        let i = v.text.monthNames[s];
                        if (e.startMonth > 0 && e.views.chart.showYearsInMonthNames) {
                            i += `${" "}${r}`;
                        }
                        let o = a.createWithHTML(t, "div", "month-name", i);
                        o.style.left = `${f[n].offsetLeft}px`;
                        if (e.views.months.enabled) {
                            o.ondblclick = () => De(e, 5, "months");
                        }
                        n++;
                    }
                };
                if (e.views.chart.showInReverseOrder) {
                    for (let e = 12; e--; ) {
                        o(e);
                    }
                } else {
                    for (let e = 0; e < 12; e++) {
                        o(e);
                    }
                }
                t.style.width = `${s.offsetWidth}px`;
                const r = a.create(t, "div", "month-name-space");
                r.style.height = `${t.offsetHeight}px`;
                r.style.width = `${u}px`;
            }
            if (e.views.chart.keepScrollPositions) {
                e._currentView.chartContents.scrollLeft = e._currentView.chartContentsScrollLeft;
            }
        }
        e._currentView.chartContents.style.display = "none";
    }
    function ce(t, n, l, d, u, w, h, f) {
        const g = new Date(u, d, l);
        const m = a.create(t, "div", "day-line");
        const p = i.holiday(n, g);
        let T = Be(n)[r.toStorageDate(g)];
        T = o.getNumber(T, 0);
        m.setAttribute(e.HEAT_JS_CHART_DATE_ATTRIBUTE_NAME, `${s.padNumber(l)}-${s.padNumber(d + 1)}-${u}`);
        if (n.views.chart.showToolTips) {
            _e(n, m, g, T, n.views.chart.dayToolTipText, n.events.onChartDayToolTipRender, p.matched, n.views.chart.showCountsInToolTips);
        }
        if (n.views.chart.showLineCounts || n.views.chart.showLineDateNumbers) {
            a.addClass(m, "day-line-count");
        }
        if (n.views.chart.showLineDateNumbers) {
            a.createWithHTML(m, "div", "count-date", `${l.toString()}<sup>${r.getDayOrdinal(v, l)}</sup>`);
        }
        if (n.views.chart.showLineCounts && T > 0) {
            a.createWithHTML(m, "div", "count", s.friendlyNumber(T));
        }
        const x = T * h;
        if (x <= 0) {
            m.style.visibility = "hidden";
        }
        if (i.definedFunction(n.events.onChartDayClick)) {
            m.onclick = () => c.customEvent(n.events.onChartDayClick, g, T, p.matched);
        } else if (i.definedFunction(n.events.onChartDayDblClick)) {
            m.ondblclick = () => c.customEvent(n.events.onChartDayDblClick, g, T, p.matched);
        } else {
            a.addClass(m, "no-hover");
        }
        const b = Pe(n, w, T, g);
        if (i.defined(b) && Re(n, b.id)) {
            if (i.definedString(b.chartCssClassName)) {
                a.addClass(m, b.chartCssClassName);
            } else {
                a.addClass(m, b.cssClassName);
            }
        }
        if (n.views.chart.highlightCurrentDay && r.isTodaysDate(g)) {
            a.addClass(m, "today");
        }
        if (n.views.chart.useGradients) {
            a.addGradientEffect(n._currentView.element, m);
        }
        y.setHeight(n, m, x, f);
        return m;
    }
    function de(e) {
        let t = 0;
        const n = Be(e);
        const o = e._currentView.year;
        for (let s = e.startMonth; s < 12 + e.startMonth; s++) {
            let a = s;
            let l = o;
            if (e.startMonth > 0 && s > 11) {
                a = s - 12;
                l++;
            }
            if (i.monthVisible(e.views.chart.monthsToShow, a)) {
                const o = r.getTotalDaysInMonth(l, a);
                for (let s = 0; s < o; s++) {
                    const o = new Date(l, a, s + 1);
                    const c = r.toStorageDate(o);
                    const d = r.getWeekdayNumber(o) + 1;
                    if (n.hasOwnProperty(c)) {
                        if (i.dayVisible(e.views.chart.daysToShow, d)) {
                            t = Math.max(t, n[c]);
                        }
                    }
                }
            }
        }
        return t;
    }
    function ue(e, t) {
        e._currentView.daysContents = a.create(e._currentView.element, "div", "days-contents");
        const n = a.create(e._currentView.daysContents, "div", "days");
        const o = a.create(e._currentView.daysContents, "div", "day-names");
        let s = a.create(n, "div", "y-labels");
        const r = a.create(n, "div", "day-lines");
        const l = je(e);
        const c = he(e, l);
        if (t && (!e.views.days.useDifferentOpacities || !e.views.days.showDayCounts)) {
            a.addClass(n, "view-switch");
        }
        if (c.largestValue > 0 && e.views.days.showChartYLabels) {
            const e = a.createWithHTML(s, "div", "label-0", c.largestValue.toString());
            a.createWithHTML(s, "div", "label-25", (Math.floor(c.largestValue / 4) * 3).toString());
            a.createWithHTML(s, "div", "label-50", Math.floor(c.largestValue / 2).toString());
            a.createWithHTML(s, "div", "label-75", Math.floor(c.largestValue / 4).toString());
            a.createWithHTML(s, "div", "label-100", "0");
            s.style.width = `${e.offsetWidth}px`;
            o.style.paddingLeft = `${s.offsetWidth + a.getStyleValueByName(s, "margin-right", true)}px`;
        } else {
            s.parentNode.removeChild(s);
            s = null;
        }
        if (c.largestValue === 0) {
            e._currentView.daysContents.style.minHeight = `${e._currentView.mapContents.offsetHeight}px`;
            n.parentNode.removeChild(n);
            o.parentNode.removeChild(o);
            const i = a.createWithHTML(e._currentView.daysContents, "div", "no-days-message", v.text.noDaysDataMessage);
            if (t) {
                a.addClass(i, "view-switch");
            }
        } else {
            const t = a.getStyleValueByName(r, "border-bottom-width", true);
            const n = (r.offsetHeight - t) / c.largestValue;
            for (const t in c.values) {
                if (c.values.hasOwnProperty(t) && i.dayVisible(e.views.days.daysToShow, parseInt(t))) {
                    const i = c.valueOpacities[c.values[t]];
                    we(r, parseInt(t), c.values[t], e, n, i, c.totalValue);
                    if (e.views.days.showDayNames) {
                        a.createWithHTML(o, "div", "day-name", v.text.dayNames[parseInt(t) - 1]);
                    }
                }
            }
            if (e.views.days.showInReverseOrder) {
                a.reverseChildrenOrder(r);
                a.reverseChildrenOrder(o);
            }
            if (e.views.days.keepScrollPositions) {
                e._currentView.daysContents.scrollLeft = e._currentView.daysContentsScrollLeft;
            }
        }
        e._currentView.daysContents.style.display = "none";
    }
    function we(t, n, o, r, d, u, w) {
        const h = a.create(t, "div", "day-line");
        const f = o * d;
        let g = null;
        h.setAttribute(e.HEAT_JS_DAY_NUMBER_ATTRIBUTE_NAME, n.toString());
        if (f <= 0) {
            h.style.visibility = "hidden";
        }
        if (r.views.days.showToolTips) {
            l.add(h, r, s.friendlyNumber(o));
        }
        if (i.definedFunction(r.events.onWeekDayClick)) {
            h.onclick = () => c.customEvent(r.events.onWeekDayClick, n, o, r._currentView.year);
        } else if (i.definedFunction(r.events.onWeekDayDblClick)) {
            h.ondblclick = () => c.customEvent(r.events.onWeekDayDblClick, n, o, r._currentView.year);
        } else {
            a.addClass(h, "no-hover");
        }
        if (r.views.days.showDayCounts && o > 0) {
            a.addClass(h, "day-line-count");
            g = a.createWithHTML(h, "div", "count", s.friendlyNumber(o));
            if (r.views.days.showDayCountPercentages) {
                a.createWithHTML(g, "div", "percentage", `${(o / w * 100).toFixed(r.percentageDecimalPoints)}%`);
            }
        }
        if (r.views.days.useGradients) {
            a.addGradientEffect(r._currentView.element, h);
            if (i.defined(g)) {
                a.addClass(g, "blend-colors");
            }
        } else if (r.views.days.useDifferentOpacities) {
            const e = a.getStyleValueByName(h, "background-color");
            const t = a.getStyleValueByName(h, "border-color");
            if (i.defined(g)) {
                a.addClass(g, "blend-colors");
            }
            if (i.rgbColor(e)) {
                h.style.backgroundColor = m.toRgbOpacityColor(e, u);
            } else if (i.hexColor(e)) {
                h.style.backgroundColor = m.toRgbOpacityColor(m.hexToRgba(e), u);
            }
            if (i.rgbColor(t)) {
                h.style.borderColor = m.toRgbOpacityColor(t, u);
            } else if (i.hexColor(t)) {
                h.style.borderColor = m.toRgbOpacityColor(m.hexToRgba(t), u);
            }
        }
        y.setHeight(r, h, f);
    }
    function he(e, t) {
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
        const o = Be(e);
        const s = e._currentView.year;
        for (let a = e.startMonth; a < 12 + e.startMonth; a++) {
            let l = a;
            let c = s;
            if (e.startMonth > 0 && a > 11) {
                l = a - 12;
                c++;
            }
            if (i.monthVisible(e.views.days.monthsToShow, l)) {
                const s = r.getTotalDaysInMonth(c, l);
                for (let a = 0; a < s; a++) {
                    const s = r.toStorageDate(new Date(c, l, a + 1));
                    if (o.hasOwnProperty(s)) {
                        const d = new Date(c, l, a + 1);
                        const u = r.getWeekdayNumber(d) + 1;
                        if (!i.holiday(e, d).matched && i.dayVisible(e.views.days.daysToShow, u)) {
                            const r = o[s];
                            const a = Pe(e, t, r);
                            if (!i.defined(a) || a.visible) {
                                n.values[u] += r;
                                n.totalValue += r;
                                n.largestValue = Math.max(n.largestValue, n.values[u]);
                            }
                        }
                    }
                }
            }
        }
        m.valuesToOpacitiesOrder(n);
        return n;
    }
    function fe(e, t) {
        e._currentView.monthsContents = a.create(e._currentView.element, "div", "months-contents");
        const n = a.create(e._currentView.monthsContents, "div", "months");
        const o = a.create(e._currentView.monthsContents, "div", "month-names");
        let s = a.create(n, "div", "y-labels");
        const r = a.create(n, "div", "month-lines");
        const l = je(e);
        const c = me(e, l);
        if (t && (!e.views.months.useDifferentOpacities || !e.views.months.showMonthCounts)) {
            a.addClass(n, "view-switch");
        }
        if (c.largestValue > 0 && e.views.months.showChartYLabels) {
            const e = a.createWithHTML(s, "div", "label-0", c.largestValue.toString());
            a.createWithHTML(s, "div", "label-25", (Math.floor(c.largestValue / 4) * 3).toString());
            a.createWithHTML(s, "div", "label-50", Math.floor(c.largestValue / 2).toString());
            a.createWithHTML(s, "div", "label-75", Math.floor(c.largestValue / 4).toString());
            a.createWithHTML(s, "div", "label-100", "0");
            s.style.width = `${e.offsetWidth}px`;
            o.style.paddingLeft = `${s.offsetWidth + a.getStyleValueByName(s, "margin-right", true)}px`;
        } else {
            s.parentNode.removeChild(s);
            s = null;
        }
        if (c.largestValue === 0) {
            e._currentView.monthsContents.style.minHeight = `${e._currentView.mapContents.offsetHeight}px`;
            n.parentNode.removeChild(n);
            o.parentNode.removeChild(o);
            const i = a.createWithHTML(e._currentView.monthsContents, "div", "no-months-message", v.text.noMonthsDataMessage);
            if (t) {
                a.addClass(i, "view-switch");
            }
        } else {
            const t = a.getStyleValueByName(r, "border-bottom-width", true);
            const n = (r.offsetHeight - t) / c.largestValue;
            for (let t = e.startMonth; t < 12 + e.startMonth; t++) {
                let s = t;
                if (e.startMonth > 0 && t > 11) {
                    s = t - 12;
                }
                const l = s + 1;
                if (c.values.hasOwnProperty(l) && i.monthVisible(e.views.months.monthsToShow, s)) {
                    const t = c.valueOpacities[c.values[l]];
                    ge(r, l, c.values[l], e, n, t, c.totalValue);
                    if (e.views.months.showMonthNames) {
                        a.createWithHTML(o, "div", "month-name", v.text.monthNames[s]);
                    }
                }
            }
            if (e.views.months.showInReverseOrder) {
                a.reverseChildrenOrder(r);
                a.reverseChildrenOrder(o);
            }
            if (e.views.months.keepScrollPositions) {
                e._currentView.monthsContents.scrollLeft = e._currentView.monthsContentsScrollLeft;
            }
        }
        e._currentView.monthsContents.style.display = "none";
    }
    function ge(t, n, o, r, d, u, w) {
        const h = a.create(t, "div", "month-line");
        const f = o * d;
        const g = new Date;
        let p = null;
        h.setAttribute(e.HEAT_JS_MONTH_NUMBER_ATTRIBUTE_NAME, n.toString());
        if (f <= 0) {
            h.style.visibility = "hidden";
        }
        if (r.views.months.showToolTips) {
            l.add(h, r, s.friendlyNumber(o));
        }
        let v = r._currentView.year;
        if (r.startMonth > 0 && n - 1 < r.startMonth) {
            v++;
        }
        if (i.definedFunction(r.events.onMonthClick)) {
            h.onclick = () => c.customEvent(r.events.onMonthClick, n, o, v);
        } else if (i.definedFunction(r.events.onMonthDblClick)) {
            h.ondblclick = () => c.customEvent(r.events.onMonthDblClick, n, o, v);
        } else {
            a.addClass(h, "no-hover");
        }
        if (r.views.months.showMonthCounts && o > 0) {
            a.addClass(h, "month-line-count");
            p = a.createWithHTML(h, "div", "count", s.friendlyNumber(o));
            if (r.views.months.showMonthCountPercentages) {
                a.createWithHTML(p, "div", "percentage", `${(o / w * 100).toFixed(r.percentageDecimalPoints)}%`);
            }
        }
        if (r.views.months.highlightCurrentMonth && g.getMonth() === n - 1 && r._currentView.year === g.getFullYear()) {
            a.addClass(h, "today");
        }
        if (r.views.months.useGradients) {
            a.addGradientEffect(r._currentView.element, h);
            if (i.defined(p)) {
                a.addClass(p, "blend-colors");
            }
        } else if (r.views.months.useDifferentOpacities) {
            const e = a.getStyleValueByName(h, "background-color");
            const t = a.getStyleValueByName(h, "border-color");
            if (i.defined(p)) {
                a.addClass(p, "blend-colors");
            }
            if (i.rgbColor(e)) {
                h.style.backgroundColor = m.toRgbOpacityColor(e, u);
            } else if (i.hexColor(e)) {
                h.style.backgroundColor = m.toRgbOpacityColor(m.hexToRgba(e), u);
            }
            if (i.rgbColor(t)) {
                h.style.borderColor = m.toRgbOpacityColor(t, u);
            } else if (i.hexColor(t)) {
                h.style.borderColor = m.toRgbOpacityColor(m.hexToRgba(t), u);
            }
        }
        y.setHeight(r, h, f);
    }
    function me(e, t) {
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
        const o = Be(e);
        const s = e._currentView.year;
        for (let a = e.startMonth; a < 12 + e.startMonth; a++) {
            let l = a;
            let c = s;
            if (e.startMonth > 0 && a > 11) {
                l = a - 12;
                c++;
            }
            if (i.monthVisible(e.views.months.monthsToShow, l)) {
                const s = l + 1;
                const a = r.getTotalDaysInMonth(c, l);
                for (let d = 0; d < a; d++) {
                    const a = r.toStorageDate(new Date(c, l, d + 1));
                    if (o.hasOwnProperty(a)) {
                        const u = new Date(c, l, d + 1);
                        const w = r.getWeekdayNumber(u) + 1;
                        if (!i.holiday(e, u).matched && i.dayVisible(e.views.days.daysToShow, w)) {
                            const r = o[a];
                            const l = Pe(e, t, r);
                            if (!i.defined(l) || l.visible) {
                                n.values[s] += r;
                                n.totalValue += r;
                                n.largestValue = Math.max(n.largestValue, n.values[s]);
                            }
                        }
                    }
                }
            }
        }
        m.valuesToOpacitiesOrder(n);
        return n;
    }
    function pe(e, t) {
        e._currentView.statisticsContents = a.create(e._currentView.element, "div", "statistics-contents");
        const n = a.create(e._currentView.statisticsContents, "div", "statistics");
        const o = a.create(e._currentView.statisticsContents, "div", "statistics-ranges");
        let s = a.create(n, "div", "y-labels");
        const r = a.create(n, "div", "range-lines");
        const l = je(e);
        const c = ve(e, l);
        if (t) {
            a.addClass(n, "view-switch");
        }
        if (c.largestValue > 0 && e.views.statistics.showChartYLabels) {
            const e = a.createWithHTML(s, "div", "label-0", c.largestValue.toString());
            a.createWithHTML(s, "div", "label-25", (Math.floor(c.largestValue / 4) * 3).toString());
            a.createWithHTML(s, "div", "label-50", Math.floor(c.largestValue / 2).toString());
            a.createWithHTML(s, "div", "label-75", Math.floor(c.largestValue / 4).toString());
            a.createWithHTML(s, "div", "label-100", "0");
            s.style.width = `${e.offsetWidth}px`;
            o.style.paddingLeft = `${s.offsetWidth + a.getStyleValueByName(s, "margin-right", true)}px`;
        } else {
            s.parentNode.removeChild(s);
            s = null;
        }
        if (c.largestValue === 0) {
            e._currentView.statisticsContents.style.minHeight = `${e._currentView.mapContents.offsetHeight}px`;
            n.parentNode.removeChild(n);
            o.parentNode.removeChild(o);
            const i = a.createWithHTML(e._currentView.statisticsContents, "div", "no-statistics-message", v.text.noStatisticsDataMessage);
            if (t) {
                a.addClass(i, "view-switch");
            }
        } else {
            const n = a.getStyleValueByName(r, "border-bottom-width", true);
            const s = (r.offsetHeight - n) / c.largestValue;
            if (!e.views.statistics.showColorRangeLabels) {
                o.parentNode.removeChild(o);
            }
            for (const n in c.types) {
                if (c.types.hasOwnProperty(n)) {
                    ye(parseInt(n), r, c.types[n], e, l, s, c.totalValue, t);
                    const d = Ye(l, parseInt(n));
                    if (e.views.statistics.showColorRangeLabels) {
                        if (!e.views.statistics.useColorRangeNamesForLabels || !i.defined(d) || !i.definedString(d.name)) {
                            a.createWithHTML(o, "div", "range-name", `${n}${"+"}`);
                        } else {
                            a.createWithHTML(o, "div", "range-name", d.name);
                        }
                    }
                }
            }
            if (e.views.statistics.showInReverseOrder) {
                a.reverseChildrenOrder(r);
                a.reverseChildrenOrder(o);
            }
            if (e.views.statistics.keepScrollPositions) {
                e._currentView.statisticsContents.scrollLeft = e._currentView.statisticsContentsScrollLeft;
            }
        }
        e._currentView.statisticsContents.style.display = "none";
    }
    function ye(t, n, o, r, d, u, w, h) {
        const f = a.create(n, "div", "range-line");
        const g = Ye(d, t);
        const m = o * u;
        if (i.defined(g) && i.definedString(g.name)) {
            f.setAttribute(e.HEAT_JS_STATISTICS_COLOR_RANGE_NAME_ATTRIBUTE_NAME, g.name);
        }
        if (m <= 0) {
            f.style.visibility = "hidden";
        }
        if (r.views.statistics.showToolTips) {
            let e;
            if (i.defined(g) && i.definedString(g.name) && r.views.statistics.showRangeNamesInToolTips) {
                e = `${g.name}${":"}${" "}<b class="tooltip-count">${s.friendlyNumber(o)}</b>`;
            } else {
                e = s.friendlyNumber(o);
            }
            l.add(f, r, e);
        }
        if (r.views.statistics.showRangeCounts && o > 0) {
            a.addClass(f, "range-line-count");
            const e = a.createWithHTML(f, "div", "count", s.friendlyNumber(o));
            if (r.views.statistics.showRangeCountPercentages) {
                a.createWithHTML(e, "div", "percentage", `${(o / w * 100).toFixed(r.percentageDecimalPoints)}%`);
            }
        }
        if (i.definedFunction(r.events.onStatisticClick)) {
            f.onclick = () => c.customEvent(r.events.onStatisticClick, g, o, r._currentView.year);
        } else if (i.definedFunction(r.events.onStatisticDblClick)) {
            f.ondblclick = () => c.customEvent(r.events.onStatisticDblClick, g, o, r._currentView.year);
        } else {
            a.addClass(f, "no-hover");
        }
        if (i.defined(g) && Re(r, g.id)) {
            if (i.definedString(g.statisticsCssClassName)) {
                a.addClass(f, g.statisticsCssClassName);
            } else {
                a.addClass(f, g.cssClassName);
            }
        }
        if (r.views.statistics.useGradients) {
            a.addGradientEffect(r._currentView.element, f);
        }
        y.setHeight(r, f, m, h);
    }
    function ve(e, t) {
        const n = Be(e);
        const o = e._currentView.year;
        const s = {
            types: {},
            largestValue: 0,
            totalValue: 0
        };
        for (let a = e.startMonth; a < 12 + e.startMonth; a++) {
            let l = a;
            let c = o;
            if (e.startMonth > 0 && a > 11) {
                l = a - 12;
                c++;
            }
            if (i.monthVisible(e.views.statistics.monthsToShow, l)) {
                const o = r.getTotalDaysInMonth(c, l);
                for (let a = 0; a < o; a++) {
                    const o = r.toStorageDate(new Date(c, l, a + 1));
                    if (n.hasOwnProperty(o)) {
                        const d = new Date(c, l, a + 1);
                        const u = r.getWeekdayNumber(d) + 1;
                        if (!i.holiday(e, d).matched && i.dayVisible(e.views.statistics.daysToShow, u)) {
                            const r = Pe(e, t, n[o]);
                            const a = i.defined(r) ? r.minimum.toString() : "0";
                            if (!s.types.hasOwnProperty(a)) {
                                s.types[a] = 0;
                            }
                            s.types[a]++;
                            s.totalValue++;
                            s.largestValue = Math.max(s.largestValue, s.types[a]);
                        }
                    }
                }
            }
        }
        return s;
    }
    function Te(e) {
        const t = a.create(e._currentView.element, "div", "guide");
        const n = a.create(t, "div", "map-types");
        const o = Se(e);
        if (x[e._currentView.element.id].totalTypes > 1) {
            if (i.definedString(e.description.text)) {
                const n = a.create(e._currentView.element, "div", "description", t);
                Ve(e, n);
            }
            const s = Object.keys(x[e._currentView.element.id].typeData).sort();
            const r = s.length;
            for (let t = 0; t < r; t++) {
                const i = s[t];
                if (i !== v.text.unknownTrendText || o > 0) {
                    xe(e, n, i);
                }
            }
            if (e.allowTypeAdding) {
                const t = a.createIconButton(n, "button", "add", "plus");
                l.add(t, e, v.text.addTypeText);
                t.onclick = () => U(e);
            }
        } else {
            Ve(e, n);
        }
        if (e.guide.enabled) {
            const n = a.create(t, "div", "map-toggles");
            if (e.guide.showInvertLabel) {
                const t = a.createWithHTML(n, "div", "invert-text", v.text.invertText);
                if (e.guide.colorRangeTogglesEnabled) {
                    t.onclick = () => $e(e);
                } else {
                    a.addClass(t, "no-click");
                }
            }
            if (e.guide.showLessAndMoreLabels) {
                let t = a.createWithHTML(n, "div", "less-text", v.text.lessText);
                if (e.guide.colorRangeTogglesEnabled) {
                    t.onclick = () => He(e, false);
                } else {
                    a.addClass(t, "no-click");
                }
            }
            const i = a.create(n, "div", "days");
            const o = je(e);
            const s = o.length;
            const r = [];
            let l = 0;
            for (let t = 0; t < s; t++) {
                const n = be(e, i, o[t]);
                l = Math.max(l, n.offsetWidth);
                r.push(n);
            }
            if (e.guide.showNumbersInGuide) {
                const e = r.length;
                for (let t = 0; t < e; t++) {
                    r[t].style.width = `${l}px`;
                }
            }
            if (e.guide.showLessAndMoreLabels) {
                const t = a.createWithHTML(n, "div", "more-text", v.text.moreText);
                if (e.guide.colorRangeTogglesEnabled) {
                    t.onclick = () => He(e, true);
                } else {
                    a.addClass(t, "no-click");
                }
            }
        }
    }
    function xe(e, t, n) {
        const i = a.createButton(t, "button", "type", n);
        if (e._currentView.type === n) {
            a.addClass(i, "active");
        }
        i.onclick = () => {
            if (e._currentView.type !== n) {
                e._currentView.type = n;
                c.customEvent(e.events.onTypeSwitch, n);
                D(e);
            }
        };
    }
    function be(e, t, n) {
        const o = a.create(t, "div");
        o.className = "day";
        if (e.guide.showToolTips) {
            l.add(o, e, n.tooltipText);
        }
        if (Re(e, n.id)) {
            if (e._currentView.view === 1 && i.definedString(n.mapCssClassName)) {
                a.addClass(o, n.mapCssClassName);
            } else if (e.views.chart.enabled && e._currentView.view === 2 && i.definedString(n.chartCssClassName)) {
                a.addClass(o, n.chartCssClassName);
            } else if (e.views.statistics.enabled && e._currentView.view === 4 && i.definedString(n.statisticsCssClassName)) {
                a.addClass(o, n.statisticsCssClassName);
            } else {
                a.addClass(o, n.cssClassName);
            }
        }
        if (e.guide.showNumbersInGuide) {
            a.addClass(o, "day-number");
            o.innerHTML = `${n.minimum}${"+"}`;
        }
        if (e.guide.colorRangeTogglesEnabled) {
            o.onclick = () => We(e, n.id);
        } else {
            a.addClass(o, "no-hover");
        }
        return o;
    }
    function Ve(e, t) {
        if (i.definedString(e.description.text)) {
            if (i.definedString(e.description.url)) {
                const n = a.createWithHTML(t, "a", "label", e.description.text);
                n.href = e.description.url;
                n.target = e.description.urlTarget;
            } else {
                a.createWithHTML(t, "span", "label", e.description.text);
            }
        }
    }
    function _e(e, t, n, o, a, d, u, w) {
        if (i.definedFunction(d)) {
            l.add(t, e, c.customEvent(d, n, o, u));
        } else {
            let c = r.getCustomFormattedDateText(v, a, n);
            if (e.showHolidaysInDayToolTips) {
                let t = i.holiday(e, n);
                if (t.matched && i.definedString(t.name)) {
                    c += `${":"}${" "}${t.name}`;
                }
            }
            if (w) {
                c += `${":"}${" "}<b class="tooltip-count">${s.friendlyNumber(o)}</b>`;
            }
            l.add(t, e, c);
        }
    }
    function De(e, t, n) {
        e._currentView.view = t;
        c.customEvent(e.events.onViewSwitch, n);
        D(e, false, true);
    }
    function Ce(e) {
        const t = Se(e);
        if (x[e._currentView.element.id].totalTypes > 1) {
            for (const n in x[e._currentView.element.id].typeData) {
                if (n !== v.text.unknownTrendText || t > 0) {
                    if (t === 0 && e._currentView.type === v.text.unknownTrendText) {
                        e._currentView.type = n;
                    }
                }
            }
        }
    }
    function Se(e) {
        let t = 0;
        for (const n in x[e._currentView.element.id].typeData[v.text.unknownTrendText]) {
            if (x[e._currentView.element.id].typeData[v.text.unknownTrendText].hasOwnProperty(n)) {
                t++;
                break;
            }
        }
        return t;
    }
    function Me(e, t, n = true) {
        x[e] = {
            options: t,
            typeData: {},
            totalTypes: 1
        };
        x[e].typeData[v.text.unknownTrendText] = {};
        if (n && !t._currentView.isInFetchMode) {
            ke(t);
        }
    }
    function Be(e) {
        return x[e._currentView.element.id].typeData[e._currentView.type];
    }
    function Ae(e) {
        let t = [];
        if (e.showOnlyDataForYearsAvailable) {
            let n = Be(e);
            for (const e in n) {
                if (n.hasOwnProperty(e)) {
                    let n = parseInt(r.getStorageDateYear(e));
                    if (t.indexOf(n) === -1) {
                        t.push(n);
                    }
                }
            }
        }
        t = t.sort((e, t) => e - t);
        return t;
    }
    function Ne(e) {
        const t = e._currentView.year;
        let n = Be(e);
        for (let i = e.startMonth; i < 12 + e.startMonth; i++) {
            let o = i;
            let s = t;
            if (e.startMonth > 0 && i > 11) {
                o = i - 12;
                s++;
            }
            const a = r.getTotalDaysInMonth(s, o);
            for (let e = 0; e < a; e++) {
                const t = new Date(s, o, e + 1);
                const i = r.toStorageDate(t);
                if (n.hasOwnProperty(i)) {
                    delete n[i];
                }
            }
        }
    }
    function ke(t) {
        if (t.useLocalStorageForData && window.localStorage) {
            const n = window.localStorage.length;
            const i = t._currentView.element.id;
            for (let t = 0; t < n; t++) {
                const n = window.localStorage.key(t);
                if (s.startsWithAnyCase(n, e.LOCAL_STORAGE_START_ID)) {
                    const e = window.localStorage.getItem(n);
                    const t = o.getObjectFromString(e, v);
                    if (t.parsed) {
                        x[i].typeData = t.object;
                        x[i].totalTypes = 0;
                        for (const e in x[i].typeData) {
                            if (x[i].typeData.hasOwnProperty(e)) {
                                x[i].totalTypes++;
                            }
                        }
                    }
                }
            }
        }
    }
    function Le(t) {
        if (t.useLocalStorageForData && window.localStorage) {
            const n = t._currentView.element.id;
            Oe(t);
            const i = JSON.stringify(x[n].typeData);
            window.localStorage.setItem(`${e.LOCAL_STORAGE_START_ID}${n}`, i);
        }
    }
    function Oe(t) {
        if (t.useLocalStorageForData && window.localStorage) {
            const n = window.localStorage.length;
            const i = [];
            const o = t._currentView.element.id;
            for (let t = 0; t < n; t++) {
                if (s.startsWithAnyCase(window.localStorage.key(t), `${e.LOCAL_STORAGE_START_ID}${o}`)) {
                    i.push(window.localStorage.key(t));
                }
            }
            const r = i.length;
            for (let e = 0; e < r; e++) {
                window.localStorage.removeItem(i[e]);
            }
        }
    }
    function Ie(e) {
        if (e._currentView.isInFetchMode) {
            if (e._currentView.isInFetchModeTimer === 0) {
                Ee(e);
            }
            if (e._currentView.isInFetchModeTimer === 0) {
                e._currentView.isInFetchModeTimer = setInterval(() => {
                    Ee(e);
                    D(e);
                }, e.dataFetchDelay);
            }
        }
    }
    function Ee(e) {
        const t = e._currentView.element.id;
        const n = c.customEvent(e.events.onDataFetch, t);
        if (i.definedObject(n)) {
            Me(t, e, false);
            for (const e in n) {
                if (n.hasOwnProperty(e)) {
                    if (!x[t].typeData[v.text.unknownTrendText].hasOwnProperty(e)) {
                        x[t].typeData[v.text.unknownTrendText][e] = 0;
                    }
                    x[t].typeData[v.text.unknownTrendText][e] += n[e];
                }
            }
        }
    }
    function Fe() {
        for (const e in x) {
            if (x.hasOwnProperty(e)) {
                const t = x[e].options;
                C(t, false);
                if (i.defined(t._currentView.isInFetchModeTimer)) {
                    clearInterval(t._currentView.isInFetchModeTimer);
                    t._currentView.isInFetchModeTimer = 0;
                }
            }
        }
        if (v.observationMode && i.defined(T)) {
            T.disconnect();
            T = null;
        }
    }
    function Re(t, n) {
        let i = false;
        if (n === e.COLOR_RANGE_HOLIDAY_ID) {
            i = true;
        } else {
            const e = t.colorRanges.length;
            for (let s = 0; s < e; s++) {
                const e = t.colorRanges[s];
                if (e.id === n && o.getBoolean(e.visible, true)) {
                    i = true;
                    break;
                }
            }
        }
        return i;
    }
    function He(e, t) {
        const n = e.colorRanges.length;
        for (let i = 0; i < n; i++) {
            e.colorRanges[i].visible = t;
            c.customEvent(e.events.onColorRangeTypeToggle, e.colorRanges[i].id, t);
        }
        D(e);
    }
    function $e(e) {
        const t = e.colorRanges.length;
        for (let n = 0; n < t; n++) {
            e.colorRanges[n].visible = !e.colorRanges[n].visible;
            c.customEvent(e.events.onColorRangeTypeToggle, e.colorRanges[n].id, e.colorRanges[n].visible);
        }
        D(e);
    }
    function We(e, t) {
        const n = e.colorRanges.length;
        for (let i = 0; i < n; i++) {
            const n = e.colorRanges[i];
            if (n.id === t) {
                n.visible = !o.getBoolean(n.visible, true);
                c.customEvent(e.events.onColorRangeTypeToggle, n.id, n.visible);
                D(e);
                break;
            }
        }
    }
    function Pe(t, n, o, s = null) {
        let r = null;
        if (i.defined(s) && i.holiday(t, s).matched) {
            r = {
                cssClassName: "holiday",
                id: e.COLOR_RANGE_HOLIDAY_ID,
                visible: true,
                minimum: 0
            };
        }
        if (!i.defined(r)) {
            const e = n.length;
            for (let t = 0; t < e; t++) {
                const e = n[t];
                if (o >= e.minimum) {
                    r = e;
                } else {
                    break;
                }
            }
        }
        return r;
    }
    function Ye(e, t) {
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
    function je(e) {
        return e.colorRanges.sort((e, t) => e.minimum - t.minimum);
    }
    function Ue(e, t = true) {
        let n = true;
        let o = e._currentView.year;
        o--;
        while (!i.yearVisible(e, o)) {
            if (i.firstVisibleYear(e, o)) {
                n = false;
                break;
            }
            o--;
        }
        if (n) {
            e._currentView.year = o;
            D(e);
            if (t) {
                c.customEvent(e.events.onBackYear, e._currentView.year);
            }
        }
    }
    function Ge(e, t = true) {
        let n = true;
        let o = e._currentView.year;
        o++;
        while (!i.yearVisible(e, o)) {
            if (i.lastVisibleYear(e, o)) {
                n = false;
                break;
            }
            o++;
        }
        if (n) {
            e._currentView.year = o;
            D(e);
            if (t) {
                c.customEvent(e.events.onNextYear, e._currentView.year);
            }
        }
    }
    function Ze(e) {
        e._currentView.element.innerHTML = "";
        a.removeClass(e._currentView.element, "heat-js");
        l.assignToEvents(e, false);
        document.body.removeChild(e._currentView.tooltip);
        if (e._currentView.isInFetchMode && i.defined(e._currentView.isInFetchModeTimer)) {
            clearInterval(e._currentView.isInFetchModeTimer);
        }
        c.customEvent(e.events.onDestroy, e._currentView.element);
    }
    function ze() {
        if (v.observationMode) {
            if (!i.defined(T)) {
                T = new MutationObserver((e, t) => {
                    Je.renderAll();
                });
                const e = {
                    attributes: true,
                    childList: true,
                    subtree: true
                };
                T.observe(document.body, e);
            }
        } else {
            T.disconnect();
            T = null;
        }
    }
    const Je = {
        addType: function(e, t, n = true) {
            if (i.definedString(e) && i.definedString(t) && x.hasOwnProperty(e)) {
                const i = x[e].options;
                if (!i._currentView.isInFetchMode && i.allowTypeAdding) {
                    if (!x[e].typeData.hasOwnProperty(t)) {
                        x[e].typeData[t] = {};
                        x[e].totalTypes++;
                    }
                    if (n) {
                        D(i, true);
                    }
                }
            }
            return Je;
        },
        addDates: function(e, t, n = null, s = true) {
            if (i.definedString(e) && i.definedArray(t) && x.hasOwnProperty(e)) {
                const i = x[e].options;
                if (!i._currentView.isInFetchMode) {
                    n = o.getString(n, v.text.unknownTrendText);
                    const r = t.length;
                    for (let i = 0; i < r; i++) {
                        Je.addDate(e, t[i], n, false);
                    }
                    if (s) {
                        D(i, true);
                    }
                }
            }
            return Je;
        },
        addDate: function(e, t, n = null, s = true) {
            if (i.definedString(e) && i.definedDate(t) && x.hasOwnProperty(e)) {
                const i = x[e].options;
                if (!i._currentView.isInFetchMode) {
                    n = o.getString(n, v.text.unknownTrendText);
                    const a = r.toStorageDate(t);
                    if (!x[e].typeData.hasOwnProperty(n)) {
                        x[e].typeData[n] = {};
                        x[e].totalTypes++;
                    }
                    if (!x[e].typeData[n].hasOwnProperty(a)) {
                        x[e].typeData[n][a] = 0;
                    }
                    x[e].typeData[n][a]++;
                    c.customEvent(i.events.onAdd, i._currentView.element);
                    if (s) {
                        D(i, true);
                    }
                }
            }
            return Je;
        },
        updateDate: function(e, t, n, s = null, a = true) {
            if (i.definedString(e) && i.definedDate(t) && x.hasOwnProperty(e)) {
                const i = x[e].options;
                if (!i._currentView.isInFetchMode && n > 0) {
                    const l = r.toStorageDate(t);
                    if (x[e].typeData.hasOwnProperty(s)) {
                        s = o.getString(s, v.text.unknownTrendText);
                        x[e].typeData[s][l] = n;
                        c.customEvent(i.events.onUpdate, i._currentView.element);
                        if (a) {
                            D(i, true);
                        }
                    }
                }
            }
            return Je;
        },
        removeDates: function(e, t, n = null, s = true) {
            if (i.definedString(e) && i.definedArray(t) && x.hasOwnProperty(e)) {
                const i = x[e].options;
                if (!i._currentView.isInFetchMode) {
                    n = o.getString(n, v.text.unknownTrendText);
                    const r = t.length;
                    for (let i = 0; i < r; i++) {
                        Je.removeDate(e, t[i], n, false);
                    }
                    if (s) {
                        D(i, true);
                    }
                }
            }
            return Je;
        },
        removeDate: function(e, t, n = null, s = true) {
            if (i.definedString(e) && i.definedDate(t) && x.hasOwnProperty(e)) {
                const i = x[e].options;
                if (!i._currentView.isInFetchMode) {
                    const a = r.toStorageDate(t);
                    if (x[e].typeData.hasOwnProperty(n) && x[e].typeData[n].hasOwnProperty(a)) {
                        n = o.getString(n, v.text.unknownTrendText);
                        if (x[e].typeData[n][a] > 0) {
                            x[e].typeData[n][a]--;
                        }
                        c.customEvent(i.events.onRemove, i._currentView.element);
                        if (s) {
                            D(i, true);
                        }
                    }
                }
            }
            return Je;
        },
        clearDate: function(e, t, n = null, s = true) {
            if (i.definedString(e) && i.definedDate(t) && x.hasOwnProperty(e)) {
                const i = x[e].options;
                if (!i._currentView.isInFetchMode) {
                    const a = r.toStorageDate(t);
                    if (x[e].typeData.hasOwnProperty(n) && x[e].typeData[n].hasOwnProperty(a)) {
                        n = o.getString(n, v.text.unknownTrendText);
                        delete x[e].typeData[n][a];
                        c.customEvent(i.events.onClear, i._currentView.element);
                        if (s) {
                            D(i, true);
                        }
                    }
                }
            }
            return Je;
        },
        resetAll: function(e = true) {
            for (const t in x) {
                if (x.hasOwnProperty(t)) {
                    Je.reset(t, e);
                }
            }
            return Je;
        },
        reset: function(e, t = true) {
            if (i.definedString(e) && x.hasOwnProperty(e)) {
                const n = x[e].options;
                if (!n._currentView.isInFetchMode) {
                    n._currentView.type = v.text.unknownTrendText;
                    Me(e, n, false);
                    c.customEvent(n.events.onReset, n._currentView.element);
                    if (t) {
                        D(n, true);
                    }
                }
            }
            return Je;
        },
        import: function(e, t = null) {
            if (i.definedString(e) && x.hasOwnProperty(e)) {
                if (i.definedArray(t)) {
                    Y(t, x[e].options);
                } else {
                    $(x[e].options);
                }
            }
            return Je;
        },
        export: function(e, t = null) {
            if (i.definedString(e) && x.hasOwnProperty(e)) {
                const n = x[e].options;
                O(n, t, null, n.exportOnlyDataBeingViewed);
            }
            return Je;
        },
        refresh: function(e) {
            if (i.definedString(e) && x.hasOwnProperty(e)) {
                const t = x[e].options;
                D(t, true);
                c.customEvent(t.events.onRefresh, t._currentView.element);
            }
            return Je;
        },
        refreshAll: function() {
            for (const e in x) {
                if (x.hasOwnProperty(e)) {
                    const t = x[e].options;
                    D(t, true);
                    c.customEvent(t.events.onRefresh, t._currentView.element);
                }
            }
            return Je;
        },
        setYear: function(e, t) {
            if (i.definedString(e) && i.definedNumber(t) && x.hasOwnProperty(e)) {
                const n = x[e].options;
                n._currentView.year = t;
                if (!i.yearVisible(n, n._currentView.year)) {
                    Ge(n, false);
                } else {
                    D(n);
                }
                c.customEvent(n.events.onSetYear, n._currentView.year);
            }
            return Je;
        },
        setYearToHighest: function(e) {
            if (i.definedString(e) && x.hasOwnProperty(e)) {
                const t = x[e].options;
                const n = Be(t);
                let o = 0;
                for (const e in n) {
                    if (n.hasOwnProperty(e)) {
                        o = Math.max(o, parseInt(r.getStorageDateYear(e)));
                    }
                }
                if (o > 0) {
                    t._currentView.year = o;
                    if (!i.yearVisible(t, t._currentView.year)) {
                        Ge(t, false);
                    } else {
                        D(t);
                    }
                    c.customEvent(t.events.onSetYear, t._currentView.year);
                }
            }
            return Je;
        },
        setYearToLowest: function(e) {
            if (i.definedString(e) && x.hasOwnProperty(e)) {
                const t = x[e].options;
                const n = Be(t);
                let o = 9999;
                for (const e in n) {
                    if (n.hasOwnProperty(e)) {
                        o = Math.min(o, parseInt(r.getStorageDateYear(e)));
                    }
                }
                if (o < 9999) {
                    t._currentView.year = o;
                    if (!i.yearVisible(t, t._currentView.year)) {
                        Ue(t, false);
                    } else {
                        D(t);
                    }
                    c.customEvent(t.events.onSetYear, t._currentView.year);
                }
            }
            return Je;
        },
        moveToPreviousYear: function(e) {
            if (i.definedString(e) && x.hasOwnProperty(e)) {
                Ue(x[e].options);
            }
            return Je;
        },
        moveToNextYear: function(e) {
            if (i.definedString(e) && x.hasOwnProperty(e)) {
                Ge(x[e].options);
            }
            return Je;
        },
        moveToCurrentYear: function(e) {
            if (i.definedString(e) && x.hasOwnProperty(e)) {
                const t = x[e].options;
                t._currentView.year = (new Date).getFullYear();
                if (!i.yearVisible(t, t._currentView.year)) {
                    Ge(t, false);
                } else {
                    D(t);
                }
                c.customEvent(t.events.onSetYear, t._currentView.year);
            }
            return Je;
        },
        getYear: function(e) {
            let t = -1;
            if (i.definedString(e) && x.hasOwnProperty(e)) {
                t = x[e].options._currentView.year;
            }
            return t;
        },
        render: function(e, t) {
            if (i.definedObject(e) && i.definedObject(t)) {
                _(d.Options.getForNewInstance(v, t, e));
            }
            return Je;
        },
        renderAll: function() {
            b();
            return Je;
        },
        switchView: function(e, t) {
            if (i.definedString(e) && i.definedString(t) && x.hasOwnProperty(e)) {
                const n = x[e].options;
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
                if (i.definedNumber(o)) {
                    De(n, o, t);
                }
            }
            return Je;
        },
        switchType: function(e, t) {
            if (i.definedString(e) && i.definedString(t) && x.hasOwnProperty(e) && x[e].typeData.hasOwnProperty(t)) {
                const n = x[e].options;
                if (n._currentView.type !== t) {
                    n._currentView.type = t;
                    c.customEvent(n.events.onTypeSwitch, t);
                    D(n);
                }
            }
            return Je;
        },
        updateOptions: function(e, t) {
            if (i.definedString(e) && i.definedObject(t) && x.hasOwnProperty(e)) {
                const t = x[e].options;
                const n = d.Options.get(t);
                let i = false;
                for (const e in n) {
                    if (n.hasOwnProperty(e) && t.hasOwnProperty(e) && t[e] !== n[e]) {
                        t[e] = n[e];
                        i = true;
                    }
                }
                if (i) {
                    D(t, true);
                    c.customEvent(t.events.onRefresh, t._currentView.element);
                    c.customEvent(t.events.onOptionsUpdate, t._currentView.element, t);
                }
            }
            return Je;
        },
        getActiveView: function(e) {
            let t = "";
            if (i.definedString(e) && x.hasOwnProperty(e)) {
                const n = x[e].options;
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
            for (const e in x) {
                if (x.hasOwnProperty(e)) {
                    Ze(x[e].options);
                }
            }
            x = {};
            return Je;
        },
        destroy: function(e) {
            if (i.definedString(e) && x.hasOwnProperty(e)) {
                Ze(x[e].options);
                delete x[e];
            }
            return Je;
        },
        setConfiguration: function(e, t = true) {
            if (i.definedObject(e)) {
                const n = v;
                const i = e;
                let o = false;
                for (const e in i) {
                    if (i.hasOwnProperty(e) && v.hasOwnProperty(e) && n[e] !== i[e]) {
                        n[e] = i[e];
                        o = true;
                    }
                }
                if (o) {
                    v = u.Options.get(n);
                    ze();
                    if (t) {
                        Je.refreshAll();
                    }
                }
            }
            return Je;
        },
        getIds: function() {
            const e = [];
            for (const t in x) {
                if (x.hasOwnProperty(t)) {
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
        v = u.Options.get();
        document.addEventListener("DOMContentLoaded", () => {
            ze();
            b();
        });
        window.addEventListener("pagehide", () => Fe());
        if (!i.defined(window.$heat)) {
            window.$heat = Je;
        }
    })();
})();//# sourceMappingURL=heat.js.map