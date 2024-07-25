var __getOwnPropNames = Object.getOwnPropertyNames;

var __esm = (e, t) => function n() {
    return e && (t = (0, e[__getOwnPropNames(e)[0]])(e = 0)), t;
};

var __commonJS = (e, t) => function n() {
    return t || (0, e[__getOwnPropNames(e)[0]])((t = {
        exports: {}
    }).exports, t), t.exports;
};

var Constant;

var init_constant = __esm({
    "src/ts/constant.ts"() {
        "use strict";
        (e => {
            e.HEAT_JS_ATTRIBUTE_NAME = "data-heat-js";
        })(Constant || (Constant = {}));
    }
});

var init_enum = __esm({
    "src/ts/data/enum.ts"() {
        "use strict";
    }
});

var Is;

var init_is = __esm({
    "src/ts/data/is.ts"() {
        "use strict";
        init_enum();
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
            function a(e) {
                return t(e) && typeof e === "number";
            }
            e.definedNumber = a;
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
    }
});

var Default;

var init_default = __esm({
    "src/ts/data/default.ts"() {
        "use strict";
        init_enum();
        init_is();
        (e => {
            function t(e, t) {
                return typeof e === "string" ? e : t;
            }
            e.getAnyString = t;
            function n(e, t) {
                return Is.definedString(e) ? e : t;
            }
            e.getString = n;
            function i(e, t) {
                return Is.definedBoolean(e) ? e : t;
            }
            e.getBoolean = i;
            function o(e, t) {
                return Is.definedNumber(e) ? e : t;
            }
            e.getNumber = o;
            function r(e, t) {
                return Is.definedFunction(e) ? e : t;
            }
            e.getFunction = r;
            function a(e, t) {
                return Is.definedArray(e) ? e : t;
            }
            e.getArray = a;
            function s(e, t) {
                return Is.definedObject(e) ? e : t;
            }
            e.getObject = s;
            function l(e, t) {
                let n = t;
                if (Is.definedString(e)) {
                    const i = e.toString().split(" ");
                    if (i.length === 0) {
                        e = t;
                    } else {
                        n = i;
                    }
                } else {
                    n = a(e, t);
                }
                return n;
            }
            e.getStringOrArray = l;
        })(Default || (Default = {}));
    }
});

var Str;

var init_str = __esm({
    "src/ts/data/str.ts"() {
        "use strict";
        init_enum();
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
            function i(e, t) {
                return e.substring(0, t.length).toLowerCase() === t.toLowerCase();
            }
            e.startsWithAnyCase = i;
        })(Str || (Str = {}));
    }
});

var DateTime;

var init_datetime = __esm({
    "src/ts/data/datetime.ts"() {
        "use strict";
        init_enum();
        init_str();
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
            function a(e) {
                return e.split("-");
            }
            e.getStorageDate = a;
            function s(e) {
                return e.split("-")[0];
            }
            e.getStorageDateYear = s;
        })(DateTime || (DateTime = {}));
    }
});

var DomElement;

var init_dom = __esm({
    "src/ts/dom/dom.ts"() {
        "use strict";
        init_enum();
        init_is();
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
                let a = r ? document.createTextNode("") : document.createElement(o);
                if (Is.defined(n)) {
                    a.className = n;
                }
                if (Is.defined(i)) {
                    e.insertBefore(a, i);
                } else {
                    e.appendChild(a);
                }
                return a;
            }
            e.create = n;
            function i(e, t, i, o, r = null) {
                const a = n(e, t, i, r);
                a.innerHTML = o;
                return a;
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
            function a(e, t) {
                e.classList.remove(t);
            }
            e.removeClass = a;
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
            function d(e, t) {
                const o = n(e, "div");
                const r = n(o, "label", "checkbox");
                const a = n(r, "input");
                a.type = "checkbox";
                n(r, "span", "check-mark");
                i(r, "span", "text", t);
                return a;
            }
            e.createCheckBox = d;
        })(DomElement || (DomElement = {}));
    }
});

var ToolTip;

var init_tooltip = __esm({
    "src/ts/area/tooltip.ts"() {
        "use strict";
        init_dom();
        init_is();
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
                n("mousemove", (() => {
                    r(e);
                }));
                i("scroll", (() => {
                    r(e);
                }));
            }
            e.assignToEvents = n;
            function i(e, t, n) {
                if (e !== null) {
                    e.onmousemove = e => {
                        o(e, t, n);
                    };
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
    }
});

var Trigger;

var init_trigger = __esm({
    "src/ts/area/trigger.ts"() {
        "use strict";
        init_is();
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
    }
});

var Binding;

var init_binding = __esm({
    "src/ts/options/binding.ts"() {
        "use strict";
        init_default();
        init_enum();
        init_is();
        init_str();
        (e => {
            let t;
            (e => {
                const t = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
                const n = [ 1, 2, 3, 4, 5, 6, 7 ];
                function i(e, t, n) {
                    const i = o(t);
                    const r = Default.getString(i.view, "").toLowerCase();
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
                    let t = Default.getObject(e, {});
                    t.views = Default.getObject(t.views, {});
                    t.exportOnlyYearBeingViewed = Default.getBoolean(t.exportOnlyYearBeingViewed, true);
                    t.year = Default.getNumber(t.year, (new Date).getFullYear());
                    t.view = Default.getString(t.view, "map");
                    t.exportType = Default.getString(t.exportType, "csv");
                    t.useLocalStorageForData = Default.getBoolean(t.useLocalStorageForData, false);
                    t.allowFileImports = Default.getBoolean(t.allowFileImports, true);
                    t.yearsToHide = Default.getArray(t.yearsToHide, []);
                    t.dataFetchDelay = Default.getNumber(t.dataFetchDelay, 6e4);
                    t.showOnlyDataForYearsAvailable = Default.getBoolean(t.showOnlyDataForYearsAvailable, false);
                    t.showHolidaysInDayToolTips = Default.getBoolean(t.showHolidaysInDayToolTips, false);
                    t = r(t);
                    t = a(t);
                    t = s(t);
                    t = l(t);
                    t = c(t);
                    t = u(t);
                    t = d(t);
                    t = m(t);
                    t = f(t);
                    t = g(t);
                    t = w(t);
                    return t;
                }
                e.get = o;
                function r(e) {
                    if (Is.definedArray(e.colorRanges)) {
                        const t = e.colorRanges.length;
                        for (let n = 0; n < t; n++) {
                            const t = e.colorRanges[n];
                            t.id = Default.getString(t.id, Str.newGuid());
                            t.name = Default.getString(t.name, "");
                            t.minimum = Default.getNumber(t.minimum, 0);
                            t.cssClassName = Default.getString(t.cssClassName, "");
                            t.mapCssClassName = Default.getString(t.mapCssClassName, "");
                            t.chartCssClassName = Default.getString(t.chartCssClassName, "");
                            t.statisticsCssClassName = Default.getString(t.statisticsCssClassName, "");
                            t.tooltipText = Default.getString(t.tooltipText, "");
                            t.visible = Default.getBoolean(t.visible, true);
                        }
                    } else {
                        e.colorRanges = [ {
                            id: Str.newGuid(),
                            name: "Day Color 1",
                            minimum: 10,
                            cssClassName: "day-color-1",
                            tooltipText: "Day Color 1",
                            visible: true
                        }, {
                            id: Str.newGuid(),
                            name: "Day Color 2",
                            minimum: 15,
                            cssClassName: "day-color-2",
                            tooltipText: "Day Color 2",
                            visible: true
                        }, {
                            id: Str.newGuid(),
                            name: "Day Color 3",
                            minimum: 20,
                            cssClassName: "day-color-3",
                            tooltipText: "Day Color 3",
                            visible: true
                        }, {
                            id: Str.newGuid(),
                            name: "Day Color 4",
                            minimum: 25,
                            cssClassName: "day-color-4",
                            tooltipText: "Day Color 4",
                            visible: true
                        } ];
                    }
                    return e;
                }
                function a(e) {
                    if (Is.definedArray(e.holidays)) {
                        const t = e.holidays.length;
                        for (let n = 0; n < t; n++) {
                            const t = e.holidays[n];
                            t.date = Default.getString(t.date, "");
                            t.name = Default.getString(t.name, "");
                            t.showInViews = Default.getBoolean(t.showInViews, true);
                        }
                    } else {
                        e.holidays = [];
                    }
                    return e;
                }
                function s(e) {
                    e.title = Default.getObject(e.title, {});
                    e.title.text = Default.getString(e.title.text, "Heat.js");
                    e.title.showText = Default.getBoolean(e.title.showText, true);
                    e.title.showYearSelector = Default.getBoolean(e.title.showYearSelector, true);
                    e.title.showRefreshButton = Default.getBoolean(e.title.showRefreshButton, false);
                    e.title.showExportButton = Default.getBoolean(e.title.showExportButton, false);
                    e.title.extraSelectionYears = Default.getNumber(e.title.extraSelectionYears, 50);
                    e.title.showYearSelectionDropDown = Default.getBoolean(e.title.showYearSelectionDropDown, true);
                    e.title.showImportButton = Default.getBoolean(e.title.showImportButton, false);
                    e.title.showConfigurationButton = Default.getBoolean(e.title.showConfigurationButton, true);
                    e.title.showTitleDropDownButton = Default.getBoolean(e.title.showTitleDropDownButton, true);
                    e.title.showTitleDropDownHeaders = Default.getBoolean(e.title.showTitleDropDownHeaders, true);
                    return e;
                }
                function l(e) {
                    e.description = Default.getObject(e.description, {});
                    e.description.text = Default.getString(e.description.text, "");
                    e.description.url = Default.getString(e.description.url, "");
                    e.description.urlTarget = Default.getString(e.description.urlTarget, "_blank");
                    return e;
                }
                function c(e) {
                    e.guide = Default.getObject(e.guide, {});
                    e.guide.enabled = Default.getBoolean(e.guide.enabled, true);
                    e.guide.colorRangeTogglesEnabled = Default.getBoolean(e.guide.colorRangeTogglesEnabled, true);
                    e.guide.showLessAndMoreLabels = Default.getBoolean(e.guide.showLessAndMoreLabels, true);
                    e.guide.showNumbersInGuide = Default.getBoolean(e.guide.showNumbersInGuide, false);
                    return e;
                }
                function u(e) {
                    e.tooltip = Default.getObject(e.tooltip, {});
                    e.tooltip.delay = Default.getNumber(e.tooltip.delay, 750);
                    e.tooltip.dayText = Default.getString(e.tooltip.dayText, "{d}{o} {mmmm} {yyyy}");
                    return e;
                }
                function d(e) {
                    e.views.map = Default.getObject(e.views.map, {});
                    e.views.map.showMonthDayGaps = Default.getBoolean(e.views.map.showMonthDayGaps, true);
                    e.views.map.showDayNames = Default.getBoolean(e.views.map.showDayNames, true);
                    e.views.map.placeMonthNamesOnTheBottom = Default.getBoolean(e.views.map.placeMonthNamesOnTheBottom, false);
                    e.views.map.showDayNumbers = Default.getBoolean(e.views.map.showDayNumbers, false);
                    e.views.map.showMonthNames = Default.getBoolean(e.views.map.showMonthNames, true);
                    e.views.map.showDaysInReverseOrder = Default.getBoolean(e.views.map.showDaysInReverseOrder, false);
                    e.views.map.showNoDataMessageWhenDataIsNotAvailable = Default.getBoolean(e.views.map.showNoDataMessageWhenDataIsNotAvailable, false);
                    e.views.map.showMinimalDayNames = Default.getBoolean(e.views.map.showMinimalDayNames, false);
                    e.views.map.showMonthsInReverseOrder = Default.getBoolean(e.views.map.showMonthsInReverseOrder, false);
                    e.views.map.keepScrollPositions = Default.getBoolean(e.views.map.keepScrollPositions, false);
                    if (Is.invalidOptionArray(e.views.map.monthsToShow)) {
                        e.views.map.monthsToShow = t;
                    }
                    if (Is.invalidOptionArray(e.views.map.daysToShow)) {
                        e.views.map.daysToShow = n;
                    }
                    return e;
                }
                function m(e) {
                    e.views.chart = Default.getObject(e.views.chart, {});
                    e.views.chart.enabled = Default.getBoolean(e.views.chart.enabled, true);
                    e.views.chart.showChartYLabels = Default.getBoolean(e.views.chart.showChartYLabels, true);
                    e.views.chart.showMonthNames = Default.getBoolean(e.views.chart.showMonthNames, true);
                    e.views.chart.showLineNumbers = Default.getBoolean(e.views.chart.showLineNumbers, false);
                    e.views.chart.showInReverseOrder = Default.getBoolean(e.views.chart.showInReverseOrder, false);
                    e.views.chart.keepScrollPositions = Default.getBoolean(e.views.chart.keepScrollPositions, false);
                    if (Is.invalidOptionArray(e.views.chart.monthsToShow)) {
                        e.views.chart.monthsToShow = t;
                    }
                    if (Is.invalidOptionArray(e.views.chart.daysToShow)) {
                        e.views.chart.daysToShow = n;
                    }
                    return e;
                }
                function f(e) {
                    e.views.days = Default.getObject(e.views.days, {});
                    e.views.days.enabled = Default.getBoolean(e.views.days.enabled, true);
                    e.views.days.showChartYLabels = Default.getBoolean(e.views.days.showChartYLabels, true);
                    e.views.days.showDayNames = Default.getBoolean(e.views.days.showDayNames, true);
                    e.views.days.showInReverseOrder = Default.getBoolean(e.views.days.showInReverseOrder, false);
                    e.views.days.showDayNumbers = Default.getBoolean(e.views.days.showDayNumbers, false);
                    e.views.days.keepScrollPositions = Default.getBoolean(e.views.days.keepScrollPositions, false);
                    if (Is.invalidOptionArray(e.views.days.monthsToShow)) {
                        e.views.days.monthsToShow = t;
                    }
                    if (Is.invalidOptionArray(e.views.days.daysToShow)) {
                        e.views.days.daysToShow = n;
                    }
                    return e;
                }
                function g(e) {
                    e.views.statistics = Default.getObject(e.views.statistics, {});
                    e.views.statistics.enabled = Default.getBoolean(e.views.statistics.enabled, true);
                    e.views.statistics.showChartYLabels = Default.getBoolean(e.views.statistics.showChartYLabels, true);
                    e.views.statistics.showColorRangeLabels = Default.getBoolean(e.views.statistics.showColorRangeLabels, true);
                    e.views.statistics.useColorRangeNamesForLabels = Default.getBoolean(e.views.statistics.useColorRangeNamesForLabels, false);
                    e.views.statistics.showRangeNumbers = Default.getBoolean(e.views.statistics.showRangeNumbers, false);
                    e.views.statistics.showInReverseOrder = Default.getBoolean(e.views.statistics.showInReverseOrder, false);
                    e.views.statistics.keepScrollPositions = Default.getBoolean(e.views.statistics.keepScrollPositions, false);
                    if (Is.invalidOptionArray(e.views.statistics.monthsToShow)) {
                        e.views.statistics.monthsToShow = t;
                    }
                    if (Is.invalidOptionArray(e.views.statistics.daysToShow)) {
                        e.views.statistics.daysToShow = n;
                    }
                    return e;
                }
                function w(e) {
                    e.events = Default.getObject(e.events, {});
                    e.events.onDayClick = Default.getFunction(e.events.onDayClick, null);
                    e.events.onBackYear = Default.getFunction(e.events.onBackYear, null);
                    e.events.onNextYear = Default.getFunction(e.events.onNextYear, null);
                    e.events.onRefresh = Default.getFunction(e.events.onRefresh, null);
                    e.events.onBeforeRender = Default.getFunction(e.events.onBeforeRender, null);
                    e.events.onRenderComplete = Default.getFunction(e.events.onRenderComplete, null);
                    e.events.onDestroy = Default.getFunction(e.events.onDestroy, null);
                    e.events.onExport = Default.getFunction(e.events.onExport, null);
                    e.events.onSetYear = Default.getFunction(e.events.onSetYear, null);
                    e.events.onTypeSwitch = Default.getFunction(e.events.onTypeSwitch, null);
                    e.events.onDayToolTipRender = Default.getFunction(e.events.onDayToolTipRender, null);
                    e.events.onAdd = Default.getFunction(e.events.onAdd, null);
                    e.events.onRemove = Default.getFunction(e.events.onRemove, null);
                    e.events.onReset = Default.getFunction(e.events.onReset, null);
                    e.events.onViewSwitch = Default.getFunction(e.events.onViewSwitch, null);
                    e.events.onColorRangeTypeToggle = Default.getFunction(e.events.onColorRangeTypeToggle, null);
                    e.events.onImport = Default.getFunction(e.events.onImport, null);
                    e.events.onStatisticClick = Default.getFunction(e.events.onStatisticClick, null);
                    e.events.onDataFetch = Default.getFunction(e.events.onDataFetch, null);
                    e.events.onClear = Default.getFunction(e.events.onClear, null);
                    e.events.onUpdate = Default.getFunction(e.events.onUpdate, null);
                    e.events.onOptionsUpdate = Default.getFunction(e.events.onOptionsUpdate, null);
                    e.events.onWeekDayClick = Default.getFunction(e.events.onWeekDayClick, null);
                    return e;
                }
            })(t = e.Options || (e.Options = {}));
        })(Binding || (Binding = {}));
    }
});

var Config;

var init_config = __esm({
    "src/ts/options/config.ts"() {
        "use strict";
        init_default();
        init_is();
        (e => {
            let t;
            (e => {
                function t(e = null) {
                    let t = Default.getObject(e, {});
                    t.safeMode = Default.getBoolean(t.safeMode, true);
                    t.domElementTypes = Default.getStringOrArray(t.domElementTypes, [ "*" ]);
                    t = n(t);
                    t = i(t);
                    return t;
                }
                e.get = t;
                function n(e) {
                    e.text = Default.getObject(e.text, {});
                    e.text.stText = Default.getAnyString(e.text.stText, "st");
                    e.text.ndText = Default.getAnyString(e.text.ndText, "nd");
                    e.text.rdText = Default.getAnyString(e.text.rdText, "rd");
                    e.text.thText = Default.getAnyString(e.text.thText, "th");
                    e.text.backButtonText = Default.getAnyString(e.text.backButtonText, "Back");
                    e.text.nextButtonText = Default.getAnyString(e.text.nextButtonText, "Next");
                    e.text.refreshButtonText = Default.getAnyString(e.text.refreshButtonText, "Refresh");
                    e.text.exportButtonText = Default.getAnyString(e.text.exportButtonText, "Export");
                    e.text.lessText = Default.getAnyString(e.text.lessText, "Less");
                    e.text.moreText = Default.getAnyString(e.text.moreText, "More");
                    e.text.dateText = Default.getAnyString(e.text.dateText, "Date");
                    e.text.countText = Default.getAnyString(e.text.countText, "Count");
                    e.text.mapText = Default.getAnyString(e.text.mapText, "Map");
                    e.text.chartText = Default.getAnyString(e.text.chartText, "Chart");
                    e.text.noChartDataMessage = Default.getAnyString(e.text.noChartDataMessage, "There is currently no data to view.");
                    e.text.statisticsText = Default.getAnyString(e.text.statisticsText, "Statistics");
                    e.text.noStatisticsDataMessage = Default.getAnyString(e.text.noStatisticsDataMessage, "There are currently no statistics to view.");
                    e.text.unknownTrendText = Default.getAnyString(e.text.unknownTrendText, "Unknown");
                    e.text.importButtonText = Default.getAnyString(e.text.importButtonText, "Import");
                    e.text.noMapDataMessage = Default.getAnyString(e.text.noMapDataMessage, "There is currently no data to view.");
                    e.text.objectErrorText = Default.getAnyString(e.text.objectErrorText, "Errors in object: {{error_1}}, {{error_2}}");
                    e.text.attributeNotValidErrorText = Default.getAnyString(e.text.attributeNotValidErrorText, "The attribute '{{attribute_name}}' is not a valid object.");
                    e.text.attributeNotSetErrorText = Default.getAnyString(e.text.attributeNotSetErrorText, "The attribute '{{attribute_name}}' has not been set correctly.");
                    e.text.closeToolTipText = Default.getAnyString(e.text.closeToolTipText, "Close");
                    e.text.configurationToolTipText = Default.getAnyString(e.text.configurationToolTipText, "Configuration");
                    e.text.configurationTitleText = Default.getAnyString(e.text.configurationTitleText, "Configuration");
                    e.text.visibleMonthsText = Default.getAnyString(e.text.visibleMonthsText, "Visible Months");
                    e.text.visibleDaysText = Default.getAnyString(e.text.visibleDaysText, "Visible Days");
                    e.text.dataText = Default.getAnyString(e.text.dataText, "Data");
                    e.text.colorRangesText = Default.getAnyString(e.text.colorRangesText, "Color Ranges");
                    e.text.yearText = Default.getAnyString(e.text.yearText, "Year");
                    e.text.daysText = Default.getAnyString(e.text.daysText, "Days");
                    e.text.noDaysDataMessage = Default.getAnyString(e.text.noDaysDataMessage, "There are currently no days to view.");
                    e.text.backButtonSymbolText = Default.getAnyString(e.text.backButtonSymbolText, "←");
                    e.text.nextButtonSymbolText = Default.getAnyString(e.text.nextButtonSymbolText, "→");
                    e.text.refreshButtonSymbolText = Default.getAnyString(e.text.refreshButtonSymbolText, "↻");
                    e.text.exportButtonSymbolText = Default.getAnyString(e.text.exportButtonSymbolText, "↓");
                    e.text.importButtonSymbolText = Default.getAnyString(e.text.importButtonSymbolText, "↑");
                    return e;
                }
                function i(e) {
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
    }
});

var Disabled;

var init_disabled = __esm({
    "src/ts/area/disabled.ts"() {
        "use strict";
        init_is();
        init_dom();
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
    }
});

var require_heat = __commonJS({
    "src/heat.ts"(exports, module) {
        init_constant();
        init_enum();
        init_is();
        init_default();
        init_datetime();
        init_dom();
        init_str();
        init_tooltip();
        init_trigger();
        init_binding();
        init_config();
        init_disabled();
        (() => {
            let _configuration = {};
            let _elements_Day_Width = 0;
            let _elements_InstanceData = {};
            const _internal_Name_Holiday = "HOLIDAY";
            const _local_Storage_Start_ID = "HJS_";
            function render() {
                const e = _configuration.domElementTypes;
                const t = e.length;
                for (let n = 0; n < t; n++) {
                    const t = document.getElementsByTagName(e[n]);
                    const i = [].slice.call(t);
                    const o = i.length;
                    for (let e = 0; e < o; e++) {
                        if (!renderElement(i[e])) {
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
                        const i = getObjectFromString(n);
                        if (i.parsed && Is.definedObject(i.object)) {
                            renderControl(Binding.Options.getForNewInstance(_configuration, i.object, e));
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
            function renderControl(e) {
                Trigger.customEvent(e.events.onBeforeRender, e._currentView.element);
                if (!Is.definedString(e._currentView.element.id)) {
                    e._currentView.element.id = Str.newGuid();
                }
                if (e._currentView.element.className.trim() === "") {
                    e._currentView.element.className = "heat-js";
                } else {
                    DomElement.addClass(e._currentView.element, "heat-js");
                }
                e._currentView.element.removeAttribute(Constant.HEAT_JS_ATTRIBUTE_NAME);
                createInstanceDataForElement(e._currentView.element.id, e);
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
                    Disabled.Background.render(e);
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
                const i = DomElement.create(t, "div", "dialog-close");
                const o = DomElement.create(n, "div", "side-container panel");
                const r = DomElement.create(n, "div", "side-container panel");
                DomElement.createWithHTML(t, "span", "dialog-title-bar-text", _configuration.text.configurationTitleText);
                DomElement.createWithHTML(o, "div", "side-container-title-text", _configuration.text.visibleDaysText + ":");
                DomElement.createWithHTML(r, "div", "side-container-title-text", _configuration.text.visibleMonthsText + ":");
                const a = DomElement.create(r, "div", "side-container");
                const s = DomElement.create(r, "div", "side-container");
                i.onclick = () => {
                    hideConfigurationDialog(e);
                };
                for (let t = 0; t < 7; t++) {
                    e._currentView.dayCheckBoxes[t] = DomElement.createCheckBox(o, _configuration.text.dayNames[t]);
                }
                for (let t = 0; t < 7; t++) {
                    e._currentView.monthCheckBoxes[t] = DomElement.createCheckBox(a, _configuration.text.monthNames[t]);
                }
                for (let t = 7; t < 12; t++) {
                    e._currentView.monthCheckBoxes[t] = DomElement.createCheckBox(s, _configuration.text.monthNames[t]);
                }
                ToolTip.add(i, e, _configuration.text.closeToolTipText);
            }
            function showConfigurationDialog(e) {
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
                    e._currentView.dayCheckBoxes[n].checked = isDayVisible(t, n + 1);
                }
                for (let t = 0; t < 12; t++) {
                    e._currentView.monthCheckBoxes[t].checked = isMonthVisible(n, t);
                }
                ToolTip.hide(e);
            }
            function hideConfigurationDialog(e) {
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
                        const i = DomElement.createWithHTML(t, "button", "next", _configuration.text.nextButtonSymbolText);
                        ToolTip.add(i, e, _configuration.text.nextButtonText);
                        i.onclick = () => {
                            moveToNextYear(e);
                        };
                        if (isLastVisibleYear(e, e._currentView.year)) {
                            i.disabled = true;
                        }
                    }
                }
            }
            function renderTitleDropDownMenu(e, t) {
                const n = DomElement.create(t, "div", "titles-menu-container");
                const i = DomElement.create(n, "div", "titles-menu");
                if (e.title.showTitleDropDownHeaders) {
                    DomElement.createWithHTML(i, "div", "title-menu-header", _configuration.text.dataText + ":");
                }
                const o = DomElement.createWithHTML(i, "div", "title-menu-item", _configuration.text.mapText);
                renderTitleDropDownMenuItemClickEvent(e, o, 1, "map");
                if (e.views.chart.enabled) {
                    const t = DomElement.createWithHTML(i, "div", "title-menu-item", _configuration.text.chartText);
                    renderTitleDropDownMenuItemClickEvent(e, t, 2, "chart");
                }
                if (e.views.days.enabled) {
                    if (e.title.showTitleDropDownHeaders) {
                        DomElement.createWithHTML(i, "div", "title-menu-header", _configuration.text.yearText + ":");
                    }
                    const t = DomElement.createWithHTML(i, "div", "title-menu-item", _configuration.text.daysText);
                    renderTitleDropDownMenuItemClickEvent(e, t, 3, "days");
                }
                if (e.views.statistics.enabled) {
                    if (e.title.showTitleDropDownHeaders) {
                        DomElement.createWithHTML(i, "div", "title-menu-header", _configuration.text.statisticsText + ":");
                    }
                    const t = DomElement.createWithHTML(i, "div", "title-menu-item", _configuration.text.colorRangesText);
                    renderTitleDropDownMenuItemClickEvent(e, t, 4, "statistics");
                }
            }
            function renderTitleDropDownMenuItemClickEvent(e, t, n, i) {
                if (e._currentView.view === n) {
                    DomElement.addClass(t, "title-menu-item-active");
                } else {
                    t.onclick = () => {
                        e._currentView.view = n;
                        Trigger.customEvent(e.events.onViewSwitch, i);
                        renderControlContainer(e, false, true);
                    };
                }
            }
            function renderYearDropDownMenu(e) {
                DomElement.create(e._currentView.yearText, "div", "down-arrow");
                const t = DomElement.create(e._currentView.yearText, "div", "years-menu-container");
                const n = DomElement.create(t, "div", "years-menu");
                const i = (new Date).getFullYear();
                let o = null;
                t.style.display = "block";
                t.style.visibility = "hidden";
                for (let t = i - e.title.extraSelectionYears; t < i + e.title.extraSelectionYears; t++) {
                    if (isYearVisible(e, t)) {
                        let r = renderYearDropDownMenuItem(e, n, t, i);
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
            function renderYearDropDownMenuItem(e, t, n, i) {
                let o = null;
                const r = DomElement.createWithHTML(t, "div", "year-menu-item", n.toString());
                if (e._currentView.year !== n) {
                    r.onclick = () => {
                        e._currentView.year = n;
                        renderControlContainer(e);
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
                    const i = e._currentView.year;
                    let o = false;
                    if (t) {
                        DomElement.addClass(n, "view-switch");
                    }
                    if (e.views.map.showDayNames) {
                        const t = DomElement.create(n, "div", "days");
                        const i = e.views.map.showMinimalDayNames && e.views.map.daysToShow.length === 7;
                        if (!e.views.map.showMonthNames || e.views.map.placeMonthNamesOnTheBottom) {
                            t.className = "days-months-bottom";
                        }
                        for (let n = 0; n < 7; n++) {
                            if (isDayVisible(e.views.map.daysToShow, n + 1)) {
                                const e = !i || n % 3 === 0 ? _configuration.text.dayNames[n] : " ";
                                DomElement.createWithHTML(t, "div", "day-name", e);
                            }
                        }
                        if (e.views.map.showDaysInReverseOrder) {
                            DomElement.reverseChildrenOrder(t);
                        }
                    }
                    const r = DomElement.create(n, "div", "months");
                    const a = getSortedColorRanges(e);
                    for (let t = 0; t < 12; t++) {
                        if (isMonthVisible(e.views.map.monthsToShow, t)) {
                            const n = DomElement.create(r, "div", "month");
                            const s = DomElement.create(n, "div", "day-columns");
                            let l = DateTime.getTotalDaysInMonth(i, t);
                            let c = DomElement.create(s, "div", "day-column");
                            let u = false;
                            const d = new Date(i, t, 1);
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
                                    let o = null;
                                    if (isDayVisible(e.views.map.daysToShow, f)) {
                                        o = renderControlMapMonthDay(e, c, n - m, t, i, a);
                                    }
                                    if ((n + 1) % 7 === 0) {
                                        if (e.views.map.showDaysInReverseOrder) {
                                            DomElement.reverseChildrenOrder(c);
                                        }
                                        c = DomElement.create(s, "div", "day-column");
                                        f = 0;
                                        if (_elements_Day_Width === 0 && Is.defined(o)) {
                                            let e = DomElement.getStyleValueByName(o, "margin-left", true);
                                            let t = DomElement.getStyleValueByName(o, "margin-right", true);
                                            _elements_Day_Width = o.offsetWidth + e + t;
                                        }
                                    }
                                }
                                f++;
                            }
                            if (e.views.map.showMonthNames) {
                                let i;
                                const o = n.offsetWidth;
                                if (!e.views.map.placeMonthNamesOnTheBottom) {
                                    i = DomElement.createWithHTML(n, "div", "month-name", _configuration.text.monthNames[t], s);
                                } else {
                                    i = DomElement.createWithHTML(n, "div", "month-name-bottom", _configuration.text.monthNames[t]);
                                }
                                if (Is.defined(i)) {
                                    if (e.views.map.showMonthDayGaps) {
                                        i.style.width = `${o}px`;
                                    } else {
                                        i.style.width = `${o - _elements_Day_Width}px`;
                                    }
                                }
                            }
                            if (o && Is.defined(_elements_Day_Width)) {
                                if (m > 0 && !e.views.map.showMonthDayGaps) {
                                    n.style.marginLeft = `${-_elements_Day_Width}px`;
                                } else if (m === 0 && e.views.map.showMonthDayGaps) {
                                    n.style.marginLeft = `${_elements_Day_Width}px`;
                                }
                            }
                            if (e.views.map.showMonthsInReverseOrder) {
                                DomElement.reverseChildrenOrder(s);
                            }
                            o = true;
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
            function renderControlMapMonthDay(e, t, n, i, o, r) {
                const a = n + 1;
                const s = DomElement.create(t, "div", "day");
                const l = new Date(o, i, a);
                let c = _elements_InstanceData[e._currentView.element.id].typeData[e._currentView.type][DateTime.toStorageDate(l)];
                c = Default.getNumber(c, 0);
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
                const u = getColorRange(e, r, c, l);
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
                const i = e._currentView.year.toString();
                for (let e in n) {
                    if (n.hasOwnProperty(e)) {
                        if (DateTime.getStorageDateYear(e) === i) {
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
                let i = DomElement.create(n, "div", "y-labels");
                const o = DomElement.create(n, "div", "day-lines");
                const r = getSortedColorRanges(e);
                const a = getLargestValueForChartYear(e);
                const s = e._currentView.year;
                let l = 0;
                if (t) {
                    DomElement.addClass(n, "view-switch");
                }
                if (a > 0 && e.views.chart.showChartYLabels) {
                    const e = DomElement.createWithHTML(i, "div", "label-0", a.toString());
                    DomElement.createWithHTML(i, "div", "label-25", (Math.floor(a / 4) * 3).toString());
                    DomElement.createWithHTML(i, "div", "label-50", Math.floor(a / 2).toString());
                    DomElement.createWithHTML(i, "div", "label-75", Math.floor(a / 4).toString());
                    DomElement.createWithHTML(i, "div", "label-100", "0");
                    i.style.width = `${e.offsetWidth}px`;
                    l = i.offsetWidth + DomElement.getStyleValueByName(i, "margin-right", true);
                } else {
                    i.parentNode.removeChild(i);
                    i = null;
                }
                if (a === 0) {
                    e._currentView.chartContents.style.minHeight = `${e._currentView.mapContents.offsetHeight}px`;
                    n.parentNode.removeChild(n);
                    const i = DomElement.createWithHTML(e._currentView.chartContents, "div", "no-data-message", _configuration.text.noChartDataMessage);
                    if (t) {
                        DomElement.addClass(i, "view-switch");
                    }
                } else {
                    const t = e._currentView.mapContents.offsetHeight / a;
                    let n = 0;
                    let i = 0;
                    for (let a = 0; a < 12; a++) {
                        if (isMonthVisible(e.views.chart.monthsToShow, a)) {
                            const l = DateTime.getTotalDaysInMonth(s, a);
                            let c = 1;
                            n++;
                            for (let n = 0; n < l; n++) {
                                if (isDayVisible(e.views.chart.daysToShow, c)) {
                                    renderControlChartDay(o, e, n + 1, a, s, r, t);
                                }
                                if ((n + 1) % 7 === 0) {
                                    c = 0;
                                }
                                c++;
                                i++;
                            }
                        }
                    }
                    if (e.views.chart.showInReverseOrder) {
                        DomElement.reverseChildrenOrder(o);
                    }
                    if (e.views.chart.showMonthNames) {
                        const t = DomElement.create(e._currentView.chartContents, "div", "chart-months");
                        const i = o.offsetWidth / n;
                        let r = 0;
                        const a = n => {
                            if (isMonthVisible(e.views.chart.monthsToShow, n)) {
                                let e = DomElement.createWithHTML(t, "div", "month-name", _configuration.text.monthNames[n]);
                                e.style.left = `${l + i * r}px`;
                                r++;
                            }
                        };
                        if (e.views.chart.showInReverseOrder) {
                            for (let e = 12; e--; ) {
                                a(e);
                            }
                        } else {
                            for (let e = 0; e < 12; e++) {
                                a(e);
                            }
                        }
                        t.style.width = `${o.offsetWidth}px`;
                        const s = DomElement.create(t, "div", "month-name-space");
                        s.style.height = `${t.offsetHeight}px`;
                        s.style.width = `${l}px`;
                    }
                    if (e.views.chart.keepScrollPositions) {
                        e._currentView.chartContents.scrollLeft = e._currentView.chartContentsScrollLeft;
                    }
                }
            }
            function renderControlChartDay(e, t, n, i, o, r, a) {
                const s = new Date(o, i, n);
                const l = DomElement.create(e, "div", "day-line");
                let c = getCurrentViewData(t)[DateTime.toStorageDate(s)];
                c = Default.getNumber(c, 0);
                renderDayToolTip(t, l, s, c);
                if (t.views.chart.showLineNumbers && c > 0) {
                    DomElement.addClass(l, "day-line-number");
                    l.innerHTML = c.toString();
                }
                const u = c * a;
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
                const d = getColorRange(t, r, c, s);
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
                for (let i = 0; i < 12; i++) {
                    const o = DateTime.getTotalDaysInMonth(e._currentView.year, i);
                    for (let r = 0; r < o; r++) {
                        const o = new Date(e._currentView.year, i, r + 1);
                        const a = DateTime.toStorageDate(o);
                        const s = DateTime.getWeekdayNumber(o);
                        if (n.hasOwnProperty(a)) {
                            if (isMonthVisible(e.views.chart.monthsToShow, i) && isDayVisible(e.views.chart.daysToShow, s)) {
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
                const i = DomElement.create(e._currentView.daysContents, "div", "day-names");
                let o = DomElement.create(n, "div", "y-labels");
                const r = DomElement.create(n, "div", "day-lines");
                const a = getLargestValuesForEachDay(e);
                if (t) {
                    DomElement.addClass(n, "view-switch");
                }
                if (a.largestValue > 0 && e.views.days.showChartYLabels) {
                    const e = DomElement.createWithHTML(o, "div", "label-0", a.largestValue.toString());
                    DomElement.createWithHTML(o, "div", "label-25", (Math.floor(a.largestValue / 4) * 3).toString());
                    DomElement.createWithHTML(o, "div", "label-50", Math.floor(a.largestValue / 2).toString());
                    DomElement.createWithHTML(o, "div", "label-75", Math.floor(a.largestValue / 4).toString());
                    DomElement.createWithHTML(o, "div", "label-100", "0");
                    o.style.width = `${e.offsetWidth}px`;
                    i.style.paddingLeft = `${o.offsetWidth + DomElement.getStyleValueByName(o, "margin-right", true)}px`;
                } else {
                    o.parentNode.removeChild(o);
                    o = null;
                }
                if (a.largestValue === 0) {
                    e._currentView.daysContents.style.minHeight = `${e._currentView.mapContents.offsetHeight}px`;
                    n.parentNode.removeChild(n);
                    i.parentNode.removeChild(i);
                    const o = DomElement.createWithHTML(e._currentView.daysContents, "div", "no-days-message", _configuration.text.noDaysDataMessage);
                    if (t) {
                        DomElement.addClass(o, "view-switch");
                    }
                } else {
                    const t = e._currentView.mapContents.offsetHeight / a.largestValue;
                    for (let n in a.days) {
                        if (a.days.hasOwnProperty(n) && isDayVisible(e.views.days.daysToShow, parseInt(n))) {
                            renderControlDaysDayLine(r, parseInt(n), a.days[n], e, t);
                            if (e.views.days.showDayNames) {
                                DomElement.createWithHTML(i, "div", "day-name", _configuration.text.dayNames[parseInt(n) - 1]);
                            }
                        }
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
            function renderControlDaysDayLine(e, t, n, i, o) {
                const r = DomElement.create(e, "div", "day-line");
                const a = n * o;
                r.style.height = `${a}px`;
                if (a <= 0) {
                    r.style.visibility = "hidden";
                }
                ToolTip.add(r, i, n.toString());
                if (Is.definedFunction(i.events.onWeekDayClick)) {
                    r.onclick = () => {
                        Trigger.customEvent(i.events.onWeekDayClick, t, n);
                    };
                } else {
                    DomElement.addClass(r, "no-hover");
                }
                if (i.views.days.showDayNumbers && n > 0) {
                    DomElement.addClass(r, "day-line-number");
                    DomElement.createWithHTML(r, "div", "count", n.toString());
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
                for (let i = 0; i < 12; i++) {
                    const o = DateTime.getTotalDaysInMonth(e._currentView.year, i);
                    for (let r = 0; r < o; r++) {
                        const o = DateTime.toStorageDate(new Date(e._currentView.year, i, r + 1));
                        if (n.hasOwnProperty(o)) {
                            const i = DateTime.getStorageDate(o);
                            const r = new Date(parseInt(i[2]), parseInt(i[1]), parseInt(i[0]));
                            const a = DateTime.getWeekdayNumber(r) + 1;
                            if (!isHoliday(e, r).matched && isMonthVisible(e.views.days.monthsToShow, r.getMonth()) && isDayVisible(e.views.days.daysToShow, a)) {
                                t.days[a] += n[o];
                                t.largestValue = Math.max(t.largestValue, t.days[a]);
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
                const i = DomElement.create(e._currentView.statisticsContents, "div", "statistics-ranges");
                let o = DomElement.create(n, "div", "y-labels");
                const r = DomElement.create(n, "div", "range-lines");
                const a = getSortedColorRanges(e);
                const s = getLargestValuesForEachRangeType(e, a);
                if (t) {
                    DomElement.addClass(n, "view-switch");
                }
                if (s.largestValue > 0 && e.views.statistics.showChartYLabels) {
                    const e = DomElement.createWithHTML(o, "div", "label-0", s.largestValue.toString());
                    DomElement.createWithHTML(o, "div", "label-25", (Math.floor(s.largestValue / 4) * 3).toString());
                    DomElement.createWithHTML(o, "div", "label-50", Math.floor(s.largestValue / 2).toString());
                    DomElement.createWithHTML(o, "div", "label-75", Math.floor(s.largestValue / 4).toString());
                    DomElement.createWithHTML(o, "div", "label-100", "0");
                    o.style.width = `${e.offsetWidth}px`;
                    i.style.paddingLeft = `${o.offsetWidth + DomElement.getStyleValueByName(o, "margin-right", true)}px`;
                } else {
                    o.parentNode.removeChild(o);
                    o = null;
                }
                if (s.largestValue === 0) {
                    e._currentView.statisticsContents.style.minHeight = `${e._currentView.mapContents.offsetHeight}px`;
                    n.parentNode.removeChild(n);
                    i.parentNode.removeChild(i);
                    const o = DomElement.createWithHTML(e._currentView.statisticsContents, "div", "no-statistics-message", _configuration.text.noStatisticsDataMessage);
                    if (t) {
                        DomElement.addClass(o, "view-switch");
                    }
                } else {
                    const t = e._currentView.mapContents.offsetHeight / s.largestValue;
                    if (!e.views.statistics.showColorRangeLabels) {
                        i.parentNode.removeChild(i);
                    }
                    for (let n in s.types) {
                        if (s.types.hasOwnProperty(n)) {
                            renderControlStatisticsRangeLine(parseInt(n), r, s.types[n], e, a, t);
                            const o = getColorRangeByMinimum(a, parseInt(n));
                            if (e.views.statistics.showColorRangeLabels) {
                                if (!e.views.statistics.useColorRangeNamesForLabels || !Is.defined(o) || !Is.definedString(o.name)) {
                                    DomElement.createWithHTML(i, "div", "range-name", n + "+");
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
            function renderControlStatisticsRangeLine(e, t, n, i, o, r) {
                const a = DomElement.create(t, "div", "range-line");
                const s = getColorRangeByMinimum(o, e);
                const l = n * r;
                a.style.height = `${l}px`;
                if (l <= 0) {
                    a.style.visibility = "hidden";
                }
                ToolTip.add(a, i, n.toString());
                if (i.views.statistics.showRangeNumbers && n > 0) {
                    DomElement.addClass(a, "range-line-number");
                    DomElement.createWithHTML(a, "div", "count", n.toString());
                }
                if (Is.definedFunction(i.events.onStatisticClick)) {
                    a.onclick = () => {
                        Trigger.customEvent(i.events.onStatisticClick, s);
                    };
                } else {
                    DomElement.addClass(a, "no-hover");
                }
                if (Is.defined(s) && isColorRangeVisible(i, s.id)) {
                    if (Is.definedString(s.statisticsCssClassName)) {
                        DomElement.addClass(a, s.statisticsCssClassName);
                    } else {
                        DomElement.addClass(a, s.cssClassName);
                    }
                }
            }
            function getLargestValuesForEachRangeType(e, t) {
                const n = getCurrentViewData(e);
                const i = {
                    types: {},
                    largestValue: 0
                };
                i.types["0"] = 0;
                for (let o = 0; o < 12; o++) {
                    const r = DateTime.getTotalDaysInMonth(e._currentView.year, o);
                    for (let a = 0; a < r; a++) {
                        const r = DateTime.toStorageDate(new Date(e._currentView.year, o, a + 1));
                        if (n.hasOwnProperty(r)) {
                            const o = DateTime.getStorageDate(r);
                            const a = new Date(parseInt(o[2]), parseInt(o[1]), parseInt(o[0]));
                            const s = DateTime.getWeekdayNumber(a) + 1;
                            if (!isHoliday(e, a).matched && isMonthVisible(e.views.statistics.monthsToShow, a.getMonth()) && isDayVisible(e.views.statistics.daysToShow, s)) {
                                const o = getColorRange(e, t, n[r]);
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
            function renderControlViewGuide(e) {
                const t = DomElement.create(e._currentView.element, "div", "guide");
                const n = DomElement.create(t, "div", "map-types");
                let i = 0;
                for (let t in _elements_InstanceData[e._currentView.element.id].typeData[_configuration.text.unknownTrendText]) {
                    if (_elements_InstanceData[e._currentView.element.id].typeData[_configuration.text.unknownTrendText].hasOwnProperty(t)) {
                        i++;
                        break;
                    }
                }
                if (_elements_InstanceData[e._currentView.element.id].totalTypes > 1) {
                    if (Is.definedString(e.description.text)) {
                        const n = DomElement.create(e._currentView.element, "div", "description", t);
                        renderDescription(e, n);
                    }
                    for (let t in _elements_InstanceData[e._currentView.element.id].typeData) {
                        if (t !== _configuration.text.unknownTrendText || i > 0) {
                            if (i === 0 && e._currentView.type === _configuration.text.unknownTrendText) {
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
                    const i = DomElement.create(n, "div", "days");
                    const o = getSortedColorRanges(e);
                    const r = o.length;
                    for (let t = 0; t < r; t++) {
                        renderControlViewGuideDay(e, i, o[t]);
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
                const i = DomElement.createWithHTML(t, "button", "type", n);
                if (e._currentView.type === n) {
                    DomElement.addClass(i, "active");
                }
                i.onclick = () => {
                    if (e._currentView.type !== n) {
                        e._currentView.type = n;
                        Trigger.customEvent(e.events.onTypeSwitch, n);
                        renderControlContainer(e);
                    }
                };
            }
            function renderControlViewGuideDay(e, t, n) {
                const i = DomElement.create(t, "div");
                i.className = "day";
                ToolTip.add(i, e, n.tooltipText);
                if (isColorRangeVisible(e, n.id)) {
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
                    i.innerHTML = n.minimum + "+";
                }
                if (e.guide.colorRangeTogglesEnabled) {
                    i.onclick = () => {
                        toggleColorRangeVisibleState(e, n.id);
                    };
                } else {
                    DomElement.addClass(i, "no-hover");
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
            function renderDayToolTip(e, t, n, i) {
                if (Is.definedFunction(e.events.onDayToolTipRender)) {
                    ToolTip.add(t, e, Trigger.customEvent(e.events.onDayToolTipRender, n, i));
                } else {
                    let i = DateTime.getCustomFormattedDateText(_configuration, e.tooltip.dayText, n);
                    if (e.showHolidaysInDayToolTips) {
                        let t = isHoliday(e, n);
                        if (t.matched && Is.definedString(t.name)) {
                            i += ":" + " " + t.name;
                        }
                    }
                    ToolTip.add(t, e, i);
                }
            }
            function createInstanceDataForElement(e, t, n = true) {
                _elements_InstanceData[e] = {
                    options: t,
                    typeData: {},
                    totalTypes: 1
                };
                _elements_InstanceData[e].typeData[_configuration.text.unknownTrendText] = {};
                if (n && !t._currentView.isInFetchMode) {
                    loadDataFromLocalStorage(t);
                }
            }
            function getCurrentViewData(e) {
                return _elements_InstanceData[e._currentView.element.id].typeData[e._currentView.type];
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
                        if (Str.startsWithAnyCase(t, _local_Storage_Start_ID)) {
                            const e = window.localStorage.getItem(t);
                            const i = getObjectFromString(e);
                            if (i.parsed) {
                                _elements_InstanceData[n].typeData = i.object;
                                _elements_InstanceData[n].totalTypes = 0;
                                for (let e in _elements_InstanceData[n].typeData) {
                                    if (_elements_InstanceData[n].typeData.hasOwnProperty(e)) {
                                        _elements_InstanceData[n].totalTypes++;
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
                    const n = JSON.stringify(_elements_InstanceData[t].typeData);
                    window.localStorage.setItem(_local_Storage_Start_ID + t, n);
                }
            }
            function clearLocalStorageObjects(e) {
                if (e.useLocalStorageForData && window.localStorage) {
                    const t = window.localStorage.length;
                    const n = [];
                    const i = e._currentView.element.id;
                    for (let e = 0; e < t; e++) {
                        if (Str.startsWithAnyCase(window.localStorage.key(e), _local_Storage_Start_ID + i)) {
                            n.push(window.localStorage.key(e));
                        }
                    }
                    const o = n.length;
                    for (let e = 0; e < o; e++) {
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
                    createInstanceDataForElement(t, e, false);
                    for (let e in n) {
                        if (n.hasOwnProperty(e)) {
                            if (!_elements_InstanceData[t].typeData[_configuration.text.unknownTrendText].hasOwnProperty(e)) {
                                _elements_InstanceData[t].typeData[_configuration.text.unknownTrendText][e] = 0;
                            }
                            _elements_InstanceData[t].typeData[_configuration.text.unknownTrendText][e] += n[e];
                        }
                    }
                }
            }
            function cancelAllPullDataTimers() {
                for (let e in _elements_InstanceData) {
                    if (_elements_InstanceData.hasOwnProperty(e)) {
                        const t = _elements_InstanceData[e].options;
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
                    const i = e.colorRanges.length;
                    for (let o = 0; o < i; o++) {
                        const i = e.colorRanges[o];
                        if (i.id === t && Default.getBoolean(i.visible, true)) {
                            n = true;
                            break;
                        }
                    }
                }
                return n;
            }
            function updateColorRangeToggles(e, t) {
                const n = e.colorRanges.length;
                for (let i = 0; i < n; i++) {
                    e.colorRanges[i].visible = t;
                    Trigger.customEvent(e.events.onColorRangeTypeToggle, e.colorRanges[i].id, t);
                }
                renderControlContainer(e);
            }
            function toggleColorRangeVisibleState(e, t) {
                const n = e.colorRanges.length;
                for (let i = 0; i < n; i++) {
                    const n = e.colorRanges[i];
                    if (n.id === t) {
                        n.visible = !Default.getBoolean(n.visible, true);
                        Trigger.customEvent(e.events.onColorRangeTypeToggle, n.id, n.visible);
                        renderControlContainer(e);
                        break;
                    }
                }
            }
            function getColorRange(e, t, n, i = null) {
                let o = null;
                if (Is.defined(i) && isHoliday(e, i).matched) {
                    o = {
                        cssClassName: "holiday",
                        id: _internal_Name_Holiday,
                        visible: true,
                        minimum: 0
                    };
                }
                if (!Is.defined(o)) {
                    const e = t.length;
                    for (let i = 0; i < e; i++) {
                        const e = t[i];
                        if (n >= e.minimum) {
                            o = e;
                        } else {
                            break;
                        }
                    }
                }
                return o;
            }
            function getColorRangeByMinimum(e, t) {
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
                const i = e.holidays.length;
                const o = t.getDate();
                const r = t.getMonth() + 1;
                const a = t.getFullYear();
                for (let t = 0; t < i; t++) {
                    let i = e.holidays[t];
                    if (Is.definedString(i.date) && i.showInViews) {
                        const e = i.date.split("/");
                        if (e.length === 2) {
                            n.matched = o === parseInt(e[0]) && r === parseInt(e[1]);
                        } else if (e.length === 3) {
                            n.matched = o === parseInt(e[0]) && r === parseInt(e[1]) && a === parseInt(e[2]);
                        }
                        if (n.matched) {
                            n.name = i.name;
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
                const i = [];
                const o = getCurrentViewData(t);
                const r = (e, r) => {
                    i.push(e);
                    for (let e in r) {
                        if (r.hasOwnProperty(e)) {
                            if (!o.hasOwnProperty(e)) {
                                o[e] = 0;
                            }
                            o[e] += r[e];
                        }
                    }
                    if (i.length === n) {
                        Trigger.customEvent(t.events.onImport, t._currentView.element);
                        renderControlContainer(t);
                    }
                };
                for (let t = 0; t < n; t++) {
                    const n = e[t];
                    const i = n.name.split(".").pop().toLowerCase();
                    if (i === "json") {
                        importFromJson(n, r);
                    } else if (i === "txt") {
                        importFromTxt(n, r);
                    } else if (i === "csv") {
                        importFromCsv(n, r);
                    }
                }
            }
            function importFromJson(e, t) {
                const n = new FileReader;
                let i = {};
                n.onloadend = () => {
                    t(e.name, i);
                };
                n.onload = e => {
                    const t = getObjectFromString(e.target.result);
                    if (t.parsed && Is.definedObject(t.object)) {
                        i = t.object;
                    }
                };
                n.readAsText(e);
            }
            function importFromTxt(e, t) {
                const n = new FileReader;
                const i = {};
                n.onloadend = () => {
                    t(e.name, i);
                };
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
            function importFromCsv(e, t) {
                const n = new FileReader;
                const i = {};
                n.onloadend = () => {
                    t(e.name, i);
                };
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
            function exportAllData(e, t = null) {
                let n = null;
                const i = getExportMimeType(e);
                const o = Default.getString(t, e.exportType).toLowerCase();
                if (o === "csv") {
                    n = getCsvContent(e);
                } else if (o === "json") {
                    n = getJsonContent(e);
                } else if (o === "xml") {
                    n = getXmlContents(e);
                } else if (o === "txt") {
                    n = getTxtContents(e);
                }
                if (Is.definedString(n)) {
                    const t = DomElement.create(document.body, "a");
                    t.style.display = "none";
                    t.setAttribute("target", "_blank");
                    t.setAttribute("href", `data:${i};charset=utf-8,${encodeURIComponent(n)}`);
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
                    for (let t in n) {
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
                const n = Str.padNumber(t.getDate()) + "-" + Str.padNumber(t.getMonth() + 1) + "-" + t.getFullYear();
                const i = Str.padNumber(t.getHours()) + "-" + Str.padNumber(t.getMinutes());
                let o = "";
                if (e._currentView.type !== _configuration.text.unknownTrendText) {
                    o = e._currentView.type.toLowerCase().replace(" ", "_") + "_";
                }
                return `${o + n + "_" + i}.${e.exportType.toLowerCase()}`;
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
                let i = e._currentView.year;
                i--;
                while (!isYearVisible(e, i)) {
                    if (isFirstVisibleYear(e, i)) {
                        n = false;
                        break;
                    }
                    i--;
                }
                if (n) {
                    e._currentView.year = i;
                    renderControlContainer(e);
                    if (t) {
                        Trigger.customEvent(e.events.onBackYear, e._currentView.year);
                    }
                }
            }
            function moveToNextYear(e, t = true) {
                let n = true;
                let i = e._currentView.year;
                i++;
                while (!isYearVisible(e, i)) {
                    if (isLastVisibleYear(e, i)) {
                        n = false;
                        break;
                    }
                    i++;
                }
                if (n) {
                    e._currentView.year = i;
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
                addDates: function(e, t, n = null, i = true) {
                    if (Is.definedString(e) && Is.definedArray(t) && _elements_InstanceData.hasOwnProperty(e)) {
                        const o = _elements_InstanceData[e].options;
                        if (!o._currentView.isInFetchMode) {
                            n = Default.getString(n, _configuration.text.unknownTrendText);
                            const r = t.length;
                            for (let i = 0; i < r; i++) {
                                _public.addDate(e, t[i], n, false);
                            }
                            if (i) {
                                renderControlContainer(o, true);
                            }
                        }
                    }
                    return _public;
                },
                addDate: function(e, t, n = null, i = true) {
                    if (Is.definedString(e) && Is.definedDate(t) && _elements_InstanceData.hasOwnProperty(e)) {
                        const o = _elements_InstanceData[e].options;
                        if (!o._currentView.isInFetchMode) {
                            n = Default.getString(n, _configuration.text.unknownTrendText);
                            const r = DateTime.toStorageDate(t);
                            if (!_elements_InstanceData[e].typeData.hasOwnProperty(n)) {
                                _elements_InstanceData[e].typeData[n] = {};
                                _elements_InstanceData[e].totalTypes++;
                            }
                            if (!_elements_InstanceData[e].typeData[n].hasOwnProperty(r)) {
                                _elements_InstanceData[e].typeData[n][r] = 0;
                            }
                            _elements_InstanceData[e].typeData[n][r]++;
                            Trigger.customEvent(o.events.onAdd, o._currentView.element);
                            if (i) {
                                renderControlContainer(o, true);
                            }
                        }
                    }
                    return _public;
                },
                updateDate: function(e, t, n, i = null, o = true) {
                    if (Is.definedString(e) && Is.definedDate(t) && _elements_InstanceData.hasOwnProperty(e)) {
                        const r = _elements_InstanceData[e].options;
                        if (!r._currentView.isInFetchMode && n > 0) {
                            const a = DateTime.toStorageDate(t);
                            if (_elements_InstanceData[e].typeData.hasOwnProperty(i)) {
                                i = Default.getString(i, _configuration.text.unknownTrendText);
                                _elements_InstanceData[e].typeData[i][a] = n;
                                Trigger.customEvent(r.events.onUpdate, r._currentView.element);
                                if (o) {
                                    renderControlContainer(r, true);
                                }
                            }
                        }
                    }
                    return _public;
                },
                removeDates: function(e, t, n = null, i = true) {
                    if (Is.definedString(e) && Is.definedArray(t) && _elements_InstanceData.hasOwnProperty(e)) {
                        const o = _elements_InstanceData[e].options;
                        if (!o._currentView.isInFetchMode) {
                            n = Default.getString(n, _configuration.text.unknownTrendText);
                            const r = t.length;
                            for (let i = 0; i < r; i++) {
                                _public.removeDate(e, t[i], n, false);
                            }
                            if (i) {
                                renderControlContainer(o, true);
                            }
                        }
                    }
                    return _public;
                },
                removeDate: function(e, t, n = null, i = true) {
                    if (Is.definedString(e) && Is.definedDate(t) && _elements_InstanceData.hasOwnProperty(e)) {
                        const o = _elements_InstanceData[e].options;
                        if (!o._currentView.isInFetchMode) {
                            const r = DateTime.toStorageDate(t);
                            if (_elements_InstanceData[e].typeData.hasOwnProperty(n) && _elements_InstanceData[e].typeData[n].hasOwnProperty(r)) {
                                n = Default.getString(n, _configuration.text.unknownTrendText);
                                if (_elements_InstanceData[e].typeData[n][r] > 0) {
                                    _elements_InstanceData[e].typeData[n][r]--;
                                }
                                Trigger.customEvent(o.events.onRemove, o._currentView.element);
                                if (i) {
                                    renderControlContainer(o, true);
                                }
                            }
                        }
                    }
                    return _public;
                },
                clearDate: function(e, t, n = null, i = true) {
                    if (Is.definedString(e) && Is.definedDate(t) && _elements_InstanceData.hasOwnProperty(e)) {
                        const o = _elements_InstanceData[e].options;
                        if (!o._currentView.isInFetchMode) {
                            const r = DateTime.toStorageDate(t);
                            if (_elements_InstanceData[e].typeData.hasOwnProperty(n) && _elements_InstanceData[e].typeData[n].hasOwnProperty(r)) {
                                n = Default.getString(n, _configuration.text.unknownTrendText);
                                delete _elements_InstanceData[e].typeData[n][r];
                                Trigger.customEvent(o.events.onClear, o._currentView.element);
                                if (i) {
                                    renderControlContainer(o, true);
                                }
                            }
                        }
                    }
                    return _public;
                },
                resetAll: function(e = true) {
                    for (let t in _elements_InstanceData) {
                        if (_elements_InstanceData.hasOwnProperty(t)) {
                            _public.reset(t, e);
                        }
                    }
                    return _public;
                },
                reset: function(e, t = true) {
                    if (Is.definedString(e) && _elements_InstanceData.hasOwnProperty(e)) {
                        const n = _elements_InstanceData[e].options;
                        if (!n._currentView.isInFetchMode) {
                            n._currentView.type = _configuration.text.unknownTrendText;
                            createInstanceDataForElement(e, n, false);
                            Trigger.customEvent(n.events.onReset, n._currentView.element);
                            if (t) {
                                renderControlContainer(n, true);
                            }
                        }
                    }
                    return _public;
                },
                import: function(e, t = null) {
                    if (Is.definedString(e) && _elements_InstanceData.hasOwnProperty(e)) {
                        if (Is.definedArray(t)) {
                            importFromFiles(t, _elements_InstanceData[e].options);
                        } else {
                            importFromFilesSelected(_elements_InstanceData[e].options);
                        }
                    }
                    return _public;
                },
                export: function(e, t = null) {
                    if (Is.definedString(e) && _elements_InstanceData.hasOwnProperty(e)) {
                        exportAllData(_elements_InstanceData[e].options, t);
                    }
                    return _public;
                },
                refresh: function(e) {
                    if (Is.definedString(e) && _elements_InstanceData.hasOwnProperty(e)) {
                        const t = _elements_InstanceData[e].options;
                        renderControlContainer(t, true);
                        Trigger.customEvent(t.events.onRefresh, t._currentView.element);
                    }
                    return _public;
                },
                refreshAll: function() {
                    for (let e in _elements_InstanceData) {
                        if (_elements_InstanceData.hasOwnProperty(e)) {
                            const t = _elements_InstanceData[e].options;
                            renderControlContainer(t, true);
                            Trigger.customEvent(t.events.onRefresh, t._currentView.element);
                        }
                    }
                    return _public;
                },
                setYear: function(e, t) {
                    if (Is.definedString(e) && Is.definedNumber(t) && _elements_InstanceData.hasOwnProperty(e)) {
                        const n = _elements_InstanceData[e].options;
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
                    if (Is.definedString(e) && _elements_InstanceData.hasOwnProperty(e)) {
                        const t = _elements_InstanceData[e].options;
                        const n = getCurrentViewData(t);
                        let i = 0;
                        for (let e in n) {
                            if (n.hasOwnProperty(e)) {
                                i = Math.max(i, parseInt(DateTime.getStorageDateYear(e)));
                            }
                        }
                        if (i > 0) {
                            t._currentView.year = i;
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
                    if (Is.definedString(e) && _elements_InstanceData.hasOwnProperty(e)) {
                        const t = _elements_InstanceData[e].options;
                        const n = getCurrentViewData(t);
                        let i = 9999;
                        for (let e in n) {
                            if (n.hasOwnProperty(e)) {
                                i = Math.min(i, parseInt(DateTime.getStorageDateYear(e)));
                            }
                        }
                        if (i < 9999) {
                            t._currentView.year = i;
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
                    if (Is.definedString(e) && _elements_InstanceData.hasOwnProperty(e)) {
                        moveToPreviousYear(_elements_InstanceData[e].options);
                    }
                    return _public;
                },
                moveToNextYear: function(e) {
                    if (Is.definedString(e) && _elements_InstanceData.hasOwnProperty(e)) {
                        moveToNextYear(_elements_InstanceData[e].options);
                    }
                    return _public;
                },
                moveToCurrentYear: function(e) {
                    if (Is.definedString(e) && _elements_InstanceData.hasOwnProperty(e)) {
                        const t = _elements_InstanceData[e].options;
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
                    if (Is.definedString(e) && _elements_InstanceData.hasOwnProperty(e)) {
                        const n = _elements_InstanceData[e].options;
                        t = n._currentView.year;
                    }
                    return t;
                },
                render: function(e, t) {
                    if (Is.definedObject(e) && Is.definedObject(t)) {
                        renderControl(Binding.Options.getForNewInstance(_configuration, t, e));
                    }
                    return _public;
                },
                renderAll: function() {
                    render();
                    return _public;
                },
                switchView: function(e, t) {
                    if (Is.definedString(e) && Is.definedString(t) && _elements_InstanceData.hasOwnProperty(e)) {
                        const n = _elements_InstanceData[e].options;
                        let i;
                        if (t.toLowerCase() === "map") {
                            i = 1;
                        } else if (t.toLowerCase() === "chart") {
                            i = 2;
                        } else if (t.toLowerCase() === "days") {
                            i = 3;
                        } else if (t.toLowerCase() === "statistics") {
                            i = 4;
                        } else {
                            i = 1;
                        }
                        if (Is.definedNumber(i)) {
                            n._currentView.view = i;
                            Trigger.customEvent(n.events.onViewSwitch, t);
                            renderControlContainer(n, false, true);
                        }
                    }
                    return _public;
                },
                switchType: function(e, t) {
                    if (Is.definedString(e) && Is.definedString(t) && _elements_InstanceData.hasOwnProperty(e) && _elements_InstanceData[e].typeData.hasOwnProperty(t)) {
                        const n = _elements_InstanceData[e].options;
                        if (n._currentView.type !== t) {
                            n._currentView.type = t;
                            Trigger.customEvent(n.events.onTypeSwitch, t);
                            renderControlContainer(n);
                        }
                    }
                    return _public;
                },
                updateOptions: function(e, t) {
                    if (Is.definedString(e) && Is.definedObject(t) && _elements_InstanceData.hasOwnProperty(e)) {
                        const n = _elements_InstanceData[e].options;
                        const i = Binding.Options.get(t);
                        let o = false;
                        for (let e in i) {
                            if (i.hasOwnProperty(e) && n.hasOwnProperty(e) && n[e] !== i[e]) {
                                n[e] = i[e];
                                o = true;
                            }
                        }
                        if (o) {
                            renderControlContainer(n, true);
                            Trigger.customEvent(n.events.onRefresh, n._currentView.element);
                            Trigger.customEvent(n.events.onOptionsUpdate, n._currentView.element, n);
                        }
                    }
                    return _public;
                },
                destroyAll: function() {
                    for (let e in _elements_InstanceData) {
                        if (_elements_InstanceData.hasOwnProperty(e)) {
                            destroyElement(_elements_InstanceData[e].options);
                        }
                    }
                    _elements_InstanceData = {};
                    return _public;
                },
                destroy: function(e) {
                    if (Is.definedString(e) && _elements_InstanceData.hasOwnProperty(e)) {
                        destroyElement(_elements_InstanceData[e].options);
                        delete _elements_InstanceData[e];
                    }
                    return _public;
                },
                setConfiguration: function(e, t = true) {
                    if (Is.definedObject(e)) {
                        let n = false;
                        const i = _configuration;
                        for (let t in e) {
                            if (e.hasOwnProperty(t) && _configuration.hasOwnProperty(t) && i[t] !== e[t]) {
                                i[t] = e[t];
                                n = true;
                            }
                        }
                        if (n) {
                            _configuration = Config.Options.get(i);
                            if (t) {
                                _public.refreshAll();
                            }
                        }
                    }
                    return _public;
                },
                getIds: function() {
                    const e = [];
                    for (let t in _elements_InstanceData) {
                        if (_elements_InstanceData.hasOwnProperty(t)) {
                            e.push(t);
                        }
                    }
                    return e;
                },
                getVersion: function() {
                    return "4.2.0";
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
        })();
    }
});

export default require_heat();//# sourceMappingURL=heat.esm.js.map