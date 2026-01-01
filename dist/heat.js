"use strict";

var e = (e => {
    e["csv"] = "csv";
    e["json"] = "json";
    e["txt"] = "txt";
    e["md"] = "md";
    e["tsv"] = "tsv";
    e["yaml"] = "yaml";
    e["toml"] = "toml";
    return e;
})(e || {});

var t = (e => {
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
})(t || {});

var n;

(e => {
    e.HEAT_JS_ATTRIBUTE_NAME = "data-heat-js";
    e.HEAT_JS_MAP_DATE_ATTRIBUTE_NAME = "data-heat-js-map-date";
    e.HEAT_JS_MAP_MINIMUM_ATTRIBUTE_NAME = "data-heat-js-map-minimum";
    e.HEAT_JS_MAP_MONTH_NUMBER_ATTRIBUTE_NAME = "data-heat-js-map-month-number";
    e.HEAT_JS_CHART_DATE_ATTRIBUTE_NAME = "data-heat-js-chart-date";
    e.HEAT_JS_CHART_MINIMUM_ATTRIBUTE_NAME = "data-heat-js-chart-minimum";
    e.HEAT_JS_LINE_DATE_ATTRIBUTE_NAME = "data-heat-js-line-date";
    e.HEAT_JS_LINE_MINIMUM_ATTRIBUTE_NAME = "data-heat-js-line-minimum";
    e.HEAT_JS_DAY_NUMBER_ATTRIBUTE_NAME = "data-heat-js-day-number";
    e.HEAT_JS_MONTH_NUMBER_ATTRIBUTE_NAME = "data-heat-js-month-number";
    e.HEAT_JS_STATISTICS_COLOR_RANGE_NAME_ATTRIBUTE_NAME = "data-heat-js-statistics-color-range-name";
    e.HEAT_JS_STATISTICS_MINIMUM_ATTRIBUTE_NAME = "data-heat-js-statistics-minimum";
    e.LOCAL_STORAGE_START_ID = "HJS_";
    e.COLOR_RANGE_HOLIDAY_ID = "HOLIDAY";
    e.DEFAULT_MINIMUM_HEIGHT = 213;
    e.MAXIMUM_FILE_IMPORTS = 5;
})(n || (n = {}));

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
    function d(e) {
        return t(e) && document.contains(e);
    }
    e.definedParentElement = d;
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
            const o = t.holidays[n];
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
    function w(e, t) {
        return e.indexOf(t + 1) > -1;
    }
    e.monthVisible = w;
    function h(e, t) {
        return e.indexOf(t) > -1;
    }
    e.dayVisible = h;
    function f(e, t) {
        return e.yearsToHide.indexOf(t) === -1 && (e._currentView.yearsAvailable.length === 0 || e._currentView.yearsAvailable.indexOf(t) > -1);
    }
    e.yearVisible = f;
    function g(e, t) {
        return e._currentView.yearsAvailable.length > 0 && t <= e._currentView.yearsAvailable[0];
    }
    e.firstVisibleYear = g;
    function m(e, t) {
        return e._currentView.yearsAvailable.length > 0 && t >= e._currentView.yearsAvailable[e._currentView.yearsAvailable.length - 1];
    }
    e.lastVisibleYear = m;
    function p(e) {
        return e.startsWith("rgba") || e.startsWith("rgb");
    }
    e.rgbColor = p;
    function y(e) {
        return e.startsWith("#") && (e.length === 7 || e.length === 9);
    }
    e.hexColor = y;
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
                } catch {
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
    function o(e, t, o, r = false) {
        let a = t;
        const l = n(o);
        a = a.replace("{dddd}", e.text.dayNames[l]);
        a = a.replace("{dd}", s.padNumber(o.getDate()));
        a = a.replace("{d}", o.getDate().toString());
        if (r) {
            a = a.replace("{o}", `<sup>${i(e, o.getDate())}</sup>`);
        } else {
            a = a.replace("{o}", i(e, o.getDate()));
        }
        a = a.replace("{mmmm}", e.text.monthNames[o.getMonth()]);
        a = a.replace("{mm}", s.padNumber(o.getMonth() + 1));
        a = a.replace("{m}", (o.getMonth() + 1).toString());
        a = a.replace("{yyyy}", o.getFullYear().toString());
        a = a.replace("{yyy}", o.getFullYear().toString().substring(1));
        a = a.replace("{yy}", o.getFullYear().toString().substring(2));
        a = a.replace("{y}", parseInt(o.getFullYear().toString().substring(2)).toString());
        return a;
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
    e.isToday = c;
    function d(e) {
        const t = new Date;
        return e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
    }
    e.isCurrentMonthAndYear = d;
})(r || (r = {}));

var a;

(e => {
    function t(e) {
        const t = e.toLowerCase();
        const n = document.createElement(t);
        return n;
    }
    e.createWithNoContainer = t;
    function n(e, t, n = "", o = null) {
        const s = t.toLowerCase();
        const r = document.createElement(s);
        if (i.defined(n)) {
            r.className = n;
        }
        if (i.defined(o)) {
            e.insertBefore(r, o);
        } else {
            e.appendChild(r);
        }
        return r;
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
    function h(e, t, n = "block") {
        let i = e.pageX;
        let o = e.pageY;
        const s = w();
        t.style.display = n;
        if (i + t.offsetWidth > window.innerWidth) {
            i -= t.offsetWidth;
        } else {
            i++;
        }
        if (o + t.offsetHeight > window.innerHeight) {
            o -= t.offsetHeight;
        } else {
            o++;
        }
        if (i < s.left) {
            i = e.pageX + 1;
        }
        if (o < s.top) {
            o = e.pageY + 1;
        }
        t.style.left = `${i}px`;
        t.style.top = `${o}px`;
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
    let t = 0;
    function n(e) {
        if (!i.defined(e._currentView.tooltip)) {
            const t = document.getElementsByClassName("heat-js-tooltip");
            const n = [].slice.call(t);
            if (n.length > 0) {
                e._currentView.tooltip = n[0];
            } else {
                e._currentView.tooltip = a.create(document.body, "div", "heat-js-tooltip");
                c(e);
            }
            e._currentView.tooltip.style.display = "none";
        }
    }
    e.render = n;
    function o(e, t, n) {
        if (e !== null) {
            e.onmousemove = e => s(e, t, n);
        }
    }
    e.add = o;
    function s(e, n, i) {
        a.cancelBubble(e);
        r(n);
        t = setTimeout(() => {
            n._currentView.tooltip.innerHTML = i;
            a.showElementAtMousePosition(e, n._currentView.tooltip, "flex");
        }, n.tooltip.delay);
    }
    e.show = s;
    function r(e) {
        if (i.defined(e._currentView.tooltip)) {
            if (t !== 0) {
                clearTimeout(t);
                t = 0;
            }
            if (e._currentView.tooltip.style.display !== "none") {
                e._currentView.tooltip.style.display = "none";
            }
        }
    }
    e.hide = r;
    function l(e) {
        if (i.defined(e._currentView.tooltip)) {
            const t = document.getElementsByClassName("heat-js");
            const n = [].slice.call(t);
            if (n.length === 0) {
                document.body.removeChild(e._currentView.tooltip);
            }
        }
    }
    e.remove = l;
    function c(e, t = true) {
        if (t) {
            window.addEventListener("mousemove", () => r(e));
            document.addEventListener("scroll", () => r(e));
        } else {
            window.removeEventListener("mousemove", () => r(e));
            document.removeEventListener("scroll", () => r(e));
        }
    }
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
    function t(e, t) {
        const n = e.indexOf(") ") > -1 ? `${e.split(") ")[0]})` : e;
        const i = n.replace("rgba(", "").replace("rgb(", "").replace(")", "").split(",");
        if (n.startsWith("rgba")) {
            i[i.length - 1] = t.toString();
        } else {
            i.push(t.toString());
        }
        return `rgba(${i.join()})`;
    }
    e.toRgbOpacityColor = t;
    function n(e) {
        const t = i(e);
        const n = t[0];
        const o = t[1];
        const s = t[2];
        const r = t[3];
        return `rgba(${n}, ${o}, ${s}, ${r})`;
    }
    e.hexToRgba = n;
    function i(e) {
        const t = e.trim().replace("#", "");
        let n = 1;
        const i = parseInt(t.substring(0, 2), 16);
        const o = parseInt(t.substring(2, 4), 16);
        const s = parseInt(t.substring(4, 6), 16);
        if (e.length === 8) {
            n = parseInt(t.substring(6, 8), 16);
        }
        return [ i, o, s, n ];
    }
    e.hexToRgbaValues = i;
    function o(e) {
        const t = Object.values(e.values).sort((e, t) => e.total - t.total);
        const n = t.length;
        const i = 1 / n;
        for (let o = 0; o < n; o++) {
            e.valueOpacities[t[o].total] = parseFloat((i * (o + 1)).toFixed(2));
        }
    }
    e.valuesToOpacitiesOrder = o;
})(d || (d = {}));

var u;

(e => {
    let t;
    (e => {
        e.DaySize = "--heat-js-day-size";
        e.Spacing = "--heat-js-spacing";
        e.LineWidth = "--heat-js-day-line-width";
        e.CheckBoxCheckedColor = "--heat-js-checkbox-background-color-checked";
        e.YearMenuCurrent = "--heat-js-years-current-color";
    })(t = e.Variables || (e.Variables = {}));
})(u || (u = {}));

var w;

(e => {
    function t(e, t) {
        let i = false;
        if (t === n.COLOR_RANGE_HOLIDAY_ID) {
            i = true;
        } else {
            const n = e.colorRanges.length;
            for (let s = 0; s < n; s++) {
                const n = e.colorRanges[s];
                if (n.id === t && o.getBoolean(n.visible, true)) {
                    i = true;
                    break;
                }
            }
        }
        return i;
    }
    e.isVisible = t;
    function s(e, t, o, s = null) {
        let r = null;
        if (i.defined(s) && i.holiday(e, s).matched) {
            r = {
                cssClassName: "holiday",
                id: n.COLOR_RANGE_HOLIDAY_ID,
                visible: true,
                minimum: 0
            };
        }
        if (!i.defined(r)) {
            const e = t.length;
            for (let n = 0; n < e; n++) {
                const e = t[n];
                if (o >= e.minimum) {
                    r = e;
                } else {
                    break;
                }
            }
        }
        return r;
    }
    e.get = s;
    function r(e, t) {
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
    e.getByMinimum = r;
    function l(e) {
        return e.colorRanges.sort((e, t) => e.minimum - t.minimum);
    }
    e.getAllSorted = l;
    function c(e) {
        const t = [];
        const n = d.hexToRgbaValues(e.color);
        const i = 100 / e.totalColors;
        const o = 1 / e.totalColors;
        const s = Math.floor(e.maximumMinimum / e.totalColors);
        const r = [];
        let l = n[0];
        let c = n[1];
        let w = n[2];
        let h = o;
        let f = n[0];
        let g = n[1];
        let m = n[2];
        let p = 0;
        for (let a = 0; a < e.totalColors; a++) {
            const d = a + 1;
            const y = h + o > 1 ? 1 : h + o;
            const v = `rgba(${l}, ${c}, ${w}, ${h.toFixed(2)})`;
            const T = `rgba(${l}, ${c}, ${w}, ${y.toFixed(2)})`;
            const b = `rgb(${f}, ${g}, ${m})`;
            const _ = `day-color-${crypto.randomUUID().replace(/-/g, "")}`;
            r.push(`div.${_} {`);
            r.push(`${"\t"}background-color: ${v} !important;`);
            r.push(`${"\t"}border-color: ${T} !important;`);
            r.push(`${"\t"}color: ${b} !important;`);
            r.push("}");
            r.push(`div.${_}:not(.no-hover):hover {`);
            r.push(`${"\t"}opacity: 0.7 !important;`);
            r.push("}");
            const x = {
                id: _,
                name: `Day Color ${d}`,
                minimum: p,
                cssClassName: _,
                tooltipText: `Day Color ${d}`,
                visible: true
            };
            const V = Math.round(n[0] / 100 * (d * i));
            const C = Math.round(n[1] / 100 * (d * i));
            const D = Math.round(n[2] / 100 * (d * i));
            if (a === e.totalColors - 1) {
                r.push(`:root {`);
                r.push(`${"\t"}${u.Variables.CheckBoxCheckedColor}: ${v};`);
                r.push(`${"\t"}${u.Variables.YearMenuCurrent}: ${v};`);
                r.push("}");
            } else {
                l = n[0] + V;
                c = n[1] + C;
                w = n[2] + D;
                h += o;
                f = n[0] - V;
                g = n[1] - C;
                m = n[2] - D;
                p += s;
            }
            t.push(x);
        }
        const y = document.getElementsByTagName("head")[0];
        const v = a.create(y, "style");
        v.appendChild(document.createTextNode(r.join("\n")));
        return t;
    }
    e.buildDynamics = c;
    function w(e, t) {
        let n = t.cssClassName;
        if (e.views.map.enabled && e._currentView.view === 1 && i.definedString(t.mapCssClassName)) {
            n = t.mapCssClassName;
        } else if (e.views.line.enabled && e._currentView.view === 2 && i.definedString(t.lineCssClassName)) {
            n = t.lineCssClassName;
        } else if (e.views.chart.enabled && e._currentView.view === 3 && i.definedString(t.chartCssClassName)) {
            n = t.chartCssClassName;
        } else if (e.views.days.enabled && e._currentView.view === 4 && i.definedString(t.daysCssClassName)) {
            n = t.daysCssClassName;
        } else if (e.views.months.enabled && e._currentView.view === 5 && i.definedString(t.monthsCssClassName)) {
            n = t.monthsCssClassName;
        } else if (e.views.statistics.enabled && e._currentView.view === 6 && i.definedString(t.statisticsCssClassName)) {
            n = t.statisticsCssClassName;
        }
        return n;
    }
    e.getGuideCssClassName = w;
})(w || (w = {}));

var h;

(e => {
    let t;
    (e => {
        const t = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
        const n = [ 1, 2, 3, 4, 5, 6, 7 ];
        function s(e, t, n) {
            const o = r(t);
            o._currentView = {};
            o._currentView.element = n;
            o._currentView.disabledBackground = null;
            o._currentView.configurationDialog = null;
            o._currentView.configurationDialogDayCheckBoxes = [];
            o._currentView.configurationDialogMonthCheckBoxes = [];
            o._currentView.tooltip = null;
            o._currentView.year = o.defaultYear;
            o._currentView.type = e.text.unknownTrendText;
            o._currentView.isInFetchMode = i.definedFunction(o.events.onDataFetch);
            o._currentView.isInFetchModeTimer = 0;
            o._currentView.yearsAvailable = [];
            o._currentView.dayWidth = 0;
            o._currentView.zoomLevel = -1;
            o._currentView.mapZoomIncrement = -1;
            o._currentView.lineZoomIncrement = -1;
            o._currentView.yearTextWidth = 0;
            o._currentView.view = 0;
            o._currentView.viewsEnabled = 0;
            if (o.views.map.enabled) {
                o._currentView.mapContentsContainer = null;
                o._currentView.mapContents = null;
                o._currentView.mapContentsScrollLeft = 0;
                o._currentView.viewsEnabled++;
            }
            if (o.views.line.enabled) {
                o._currentView.lineContentsContainer = null;
                o._currentView.lineContents = null;
                o._currentView.lineContentsScrollLeft = 0;
                o._currentView.viewsEnabled++;
            }
            if (o.views.chart.enabled) {
                o._currentView.chartContents = null;
                o._currentView.chartContentsScrollLeft = 0;
                o._currentView.viewsEnabled++;
            }
            if (o.views.days.enabled) {
                o._currentView.daysContents = null;
                o._currentView.daysContentsScrollLeft = 0;
                o._currentView.viewsEnabled++;
            }
            if (o.views.months.enabled) {
                o._currentView.monthsContents = null;
                o._currentView.monthsContentsScrollLeft = 0;
                o._currentView.viewsEnabled++;
            }
            if (o.views.statistics.enabled) {
                o._currentView.statisticsContents = null;
                o._currentView.statisticsContentsScrollLeft = 0;
                o._currentView.viewsEnabled++;
            }
            V(o);
            return o;
        }
        e.getForNewInstance = s;
        function r(e) {
            const t = o.getObject(e, {});
            t.views = o.getObject(t.views, {});
            t.exportOnlyDataBeingViewed = o.getBoolean(t.exportOnlyDataBeingViewed, true);
            t.defaultYear = o.getNumber(t.defaultYear, (new Date).getFullYear());
            t.defaultView = o.getString(t.defaultView, "map");
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
            t.chartsAnimationDelay = o.getNumber(t.chartsAnimationDelay, 50);
            t.exportDateTimeFormat = o.getString(t.exportDateTimeFormat, "{dddd}, {d}{o} {mmmm} {yyyy}");
            t.title = a(t);
            t.yearlyStatistics = l(t);
            t.views.map = c(t);
            t.views.line = d(t);
            t.views.chart = u(t);
            t.views.days = h(t);
            t.views.months = f(t);
            t.views.statistics = g(t);
            t.description = m(t);
            t.guide = p(t);
            t.tooltip = y(t);
            t.zooming = v(t);
            t.dynamicColorRange = T(t);
            t.colorRanges = b(t);
            t.holidays = _(t);
            t.events = x(t);
            if (t.startMonth > 0) {
                t.yearsToHide = [];
            }
            return t;
        }
        e.get = r;
        function a(e) {
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
        function l(e) {
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
        function c(e) {
            e.views.map = o.getObject(e.views.map, {});
            e.views.map.enabled = o.getBoolean(e.views.map.enabled, true);
            e.views.map.showMonthDayGaps = o.getBoolean(e.views.map.showMonthDayGaps, true);
            e.views.map.showDayNames = o.getBoolean(e.views.map.showDayNames, true);
            e.views.map.placeMonthNamesOnTheBottom = o.getBoolean(e.views.map.placeMonthNamesOnTheBottom, false);
            e.views.map.showDayCounts = o.getBoolean(e.views.map.showDayCounts, false);
            e.views.map.showMonthNames = o.getBoolean(e.views.map.showMonthNames, true);
            e.views.map.showDaysInReverseOrder = o.getBoolean(e.views.map.showDaysInReverseOrder, false);
            e.views.map.showMinimalDayNames = o.getBoolean(e.views.map.showMinimalDayNames, false);
            e.views.map.showMonthsInReverseOrder = o.getBoolean(e.views.map.showMonthsInReverseOrder, false);
            e.views.map.keepScrollPositions = o.getBoolean(e.views.map.keepScrollPositions, false);
            e.views.map.showDayDateNumbers = o.getBoolean(e.views.map.showDayDateNumbers, false);
            e.views.map.showToolTips = o.getBoolean(e.views.map.showToolTips, true);
            e.views.map.highlightCurrentDay = o.getBoolean(e.views.map.highlightCurrentDay, false);
            e.views.map.dayToolTipText = o.getString(e.views.map.dayToolTipText, "{dddd}, {d}{o} {mmmm} {yyyy}");
            e.views.map.showYearsInMonthNames = o.getBoolean(e.views.map.showYearsInMonthNames, true);
            e.views.map.showCountsInToolTips = o.getBoolean(e.views.map.showCountsInToolTips, true);
            e.views.map.showSpacing = o.getBoolean(e.views.map.showSpacing, true);
            if (i.invalidOptionArray(e.views.map.monthsToShow)) {
                e.views.map.monthsToShow = t;
            }
            if (i.invalidOptionArray(e.views.map.daysToShow)) {
                e.views.map.daysToShow = n;
            }
            return e.views.map;
        }
        function d(e) {
            e.views.line = o.getObject(e.views.line, {});
            e.views.line.enabled = o.getBoolean(e.views.line.enabled, true);
            e.views.line.showMonthNames = o.getBoolean(e.views.line.showMonthNames, true);
            e.views.line.showInReverseOrder = o.getBoolean(e.views.line.showInReverseOrder, false);
            e.views.line.keepScrollPositions = o.getBoolean(e.views.line.keepScrollPositions, false);
            e.views.line.showYearsInMonthNames = o.getBoolean(e.views.line.showYearsInMonthNames, true);
            e.views.line.showToolTips = o.getBoolean(e.views.line.showToolTips, true);
            e.views.line.dayToolTipText = o.getString(e.views.line.dayToolTipText, "{dddd}, {d}{o} {mmmm} {yyyy}");
            e.views.line.showCountsInToolTips = o.getBoolean(e.views.line.showCountsInToolTips, true);
            if (i.invalidOptionArray(e.views.line.monthsToShow)) {
                e.views.line.monthsToShow = t;
            }
            if (i.invalidOptionArray(e.views.line.daysToShow)) {
                e.views.line.daysToShow = n;
            }
            return e.views.line;
        }
        function u(e) {
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
        function h(e) {
            e.views.days = o.getObject(e.views.days, {});
            e.views.days.enabled = o.getBoolean(e.views.days.enabled, true);
            e.views.days.showChartYLabels = o.getBoolean(e.views.days.showChartYLabels, true);
            e.views.days.showDayNames = o.getBoolean(e.views.days.showDayNames, true);
            e.views.days.showInReverseOrder = o.getBoolean(e.views.days.showInReverseOrder, false);
            e.views.days.showDayCounts = o.getBoolean(e.views.days.showDayCounts, false);
            e.views.days.keepScrollPositions = o.getBoolean(e.views.days.keepScrollPositions, false);
            e.views.days.showToolTips = o.getBoolean(e.views.days.showToolTips, true);
            e.views.days.useGradients = o.getBoolean(e.views.days.useGradients, false);
            e.views.days.useDifferentOpacities = o.getBoolean(e.views.days.useDifferentOpacities, false);
            e.views.days.showDayCountPercentages = o.getBoolean(e.views.days.showDayCountPercentages, true);
            e.views.days.showStackedColorRanges = o.getBoolean(e.views.days.showStackedColorRanges, true);
            if (i.invalidOptionArray(e.views.days.monthsToShow)) {
                e.views.days.monthsToShow = t;
            }
            if (i.invalidOptionArray(e.views.days.daysToShow)) {
                e.views.days.daysToShow = n;
            }
            return e.views.days;
        }
        function f(e) {
            e.views.months = o.getObject(e.views.months, {});
            e.views.months.enabled = o.getBoolean(e.views.months.enabled, true);
            e.views.months.showChartYLabels = o.getBoolean(e.views.months.showChartYLabels, true);
            e.views.months.showMonthNames = o.getBoolean(e.views.months.showMonthNames, true);
            e.views.months.showInReverseOrder = o.getBoolean(e.views.months.showInReverseOrder, false);
            e.views.months.showMonthCounts = o.getBoolean(e.views.months.showMonthCounts, false);
            e.views.months.keepScrollPositions = o.getBoolean(e.views.months.keepScrollPositions, false);
            e.views.months.showToolTips = o.getBoolean(e.views.months.showToolTips, true);
            e.views.months.useGradients = o.getBoolean(e.views.months.useGradients, false);
            e.views.months.useDifferentOpacities = o.getBoolean(e.views.months.useDifferentOpacities, false);
            e.views.months.highlightCurrentMonth = o.getBoolean(e.views.months.highlightCurrentMonth, false);
            e.views.months.showMonthCountPercentages = o.getBoolean(e.views.months.showMonthCountPercentages, true);
            e.views.months.showStackedColorRanges = o.getBoolean(e.views.months.showStackedColorRanges, true);
            if (i.invalidOptionArray(e.views.months.monthsToShow)) {
                e.views.months.monthsToShow = t;
            }
            if (i.invalidOptionArray(e.views.months.daysToShow)) {
                e.views.months.daysToShow = n;
            }
            return e.views.months;
        }
        function g(e) {
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
        function m(e) {
            e.description = o.getObject(e.description, {});
            e.description.text = o.getString(e.description.text, "");
            e.description.url = o.getString(e.description.url, "");
            e.description.urlTarget = o.getString(e.description.urlTarget, "_blank");
            return e.description;
        }
        function p(e) {
            e.guide = o.getObject(e.guide, {});
            e.guide.enabled = o.getBoolean(e.guide.enabled, true);
            e.guide.colorRangeTogglesEnabled = o.getBoolean(e.guide.colorRangeTogglesEnabled, true);
            e.guide.showLessAndMoreLabels = o.getBoolean(e.guide.showLessAndMoreLabels, true);
            e.guide.showNumbersInGuide = o.getBoolean(e.guide.showNumbersInGuide, false);
            e.guide.showToolTips = o.getBoolean(e.guide.showToolTips, true);
            e.guide.showInvertLabel = o.getBoolean(e.guide.showInvertLabel, false);
            e.guide.useIncrementToggles = o.getBoolean(e.guide.useIncrementToggles, false);
            e.guide.allowTypeAdding = o.getBoolean(e.guide.allowTypeAdding, false);
            e.guide.allowTypeRemoving = o.getBoolean(e.guide.allowTypeRemoving, false);
            return e.guide;
        }
        function y(e) {
            e.tooltip = o.getObject(e.tooltip, {});
            e.tooltip.delay = o.getNumber(e.tooltip.delay, 750);
            return e.tooltip;
        }
        function v(e) {
            e.zooming = o.getObject(e.zooming, {});
            e.zooming.enabled = o.getBoolean(e.zooming.enabled, false);
            e.zooming.defaultLevel = o.getNumber(e.zooming.defaultLevel, 0);
            e.zooming.maximumLevel = o.getNumber(e.zooming.maximumLevel, 0);
            e.zooming.showCloseButton = o.getBoolean(e.zooming.showCloseButton, true);
            return e.zooming;
        }
        function T(e) {
            e.dynamicColorRange = o.getObject(e.dynamicColorRange, {});
            e.dynamicColorRange.enabled = o.getBoolean(e.dynamicColorRange.enabled, false);
            e.dynamicColorRange.maximumMinimum = o.getNumber(e.dynamicColorRange.maximumMinimum, 25);
            e.dynamicColorRange.color = o.getString(e.dynamicColorRange.color, "");
            e.dynamicColorRange.totalColors = o.getNumber(e.dynamicColorRange.totalColors, 7);
            return e.dynamicColorRange;
        }
        function b(e) {
            let t = [];
            if (e.dynamicColorRange.enabled && i.hexColor(e.dynamicColorRange.color)) {
                t = w.buildDynamics(e.dynamicColorRange);
            } else {
                if (i.definedArray(e.colorRanges)) {
                    const n = e.colorRanges.length;
                    for (let i = 0; i < n; i++) {
                        const n = e.colorRanges[i];
                        n.id = o.getString(n.id, crypto.randomUUID());
                        n.name = o.getString(n.name, "");
                        n.minimum = o.getNumber(n.minimum, 0);
                        n.cssClassName = o.getString(n.cssClassName, "");
                        n.mapCssClassName = o.getString(n.mapCssClassName, "");
                        n.lineCssClassName = o.getString(n.lineCssClassName, "");
                        n.chartCssClassName = o.getString(n.chartCssClassName, "");
                        n.daysCssClassName = o.getString(n.daysCssClassName, "");
                        n.monthsCssClassName = o.getString(n.monthsCssClassName, "");
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
            }
            return t;
        }
        function _(e) {
            const t = [];
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
        function x(e) {
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
            e.events.onLineDayToolTipRender = o.getFunction(e.events.onLineDayToolTipRender, e.events.onMapDayToolTipRender);
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
            e.events.onLineDayClick = o.getFunction(e.events.onLineDayClick, e.events.onMapDayClick);
            e.events.onLineDayDblClick = o.getFunction(e.events.onLineDayDblClick, e.events.onMapDayDblClick);
            e.events.onChartDayClick = o.getFunction(e.events.onChartDayClick, e.events.onMapDayClick);
            e.events.onChartDayDblClick = o.getFunction(e.events.onChartDayDblClick, e.events.onMapDayDblClick);
            e.events.onWeekDayClick = o.getFunction(e.events.onWeekDayClick, null);
            e.events.onWeekDayDblClick = o.getFunction(e.events.onWeekDayDblClick, null);
            e.events.onMonthClick = o.getFunction(e.events.onMonthClick, null);
            e.events.onMonthDblClick = o.getFunction(e.events.onMonthDblClick, null);
            e.events.onStatisticClick = o.getFunction(e.events.onStatisticClick, null);
            e.events.onStatisticDblClick = o.getFunction(e.events.onStatisticDblClick, null);
            e.events.onZoomLevelChange = o.getFunction(e.events.onZoomLevelChange, null);
            e.events.onClearViewableData = o.getFunction(e.events.onClearViewableData, null);
            e.events.onAddType = o.getFunction(e.events.onAddType, null);
            e.events.onRemoveType = o.getFunction(e.events.onRemoveType, null);
            return e.events;
        }
        function V(e) {
            if (e.views.map.enabled && e.defaultView === "map") {
                e._currentView.view = 1;
            } else if (e.views.line.enabled && e.defaultView === "line") {
                e._currentView.view = 2;
            } else if (e.views.chart.enabled && e.defaultView === "chart") {
                e._currentView.view = 3;
            } else if (e.views.days.enabled && e.defaultView === "days") {
                e._currentView.view = 4;
            } else if (e.views.months.enabled && e.defaultView === "months") {
                e._currentView.view = 5;
            } else if (e.views.statistics.enabled && e.defaultView === "statistics") {
                e._currentView.view = 6;
            }
            if (e._currentView.view === 0) {
                if (e.views.map.enabled) {
                    e._currentView.view = 1;
                } else if (e.views.line.enabled) {
                    e._currentView.view = 2;
                } else if (e.views.chart.enabled) {
                    e._currentView.view = 3;
                } else if (e.views.days.enabled) {
                    e._currentView.view = 4;
                } else if (e.views.months.enabled) {
                    e._currentView.view = 5;
                } else if (e.views.statistics.enabled) {
                    e._currentView.view = 6;
                }
                if (e._currentView.view === 0) {
                    e.views.map.enabled = true;
                    e._currentView.view = 1;
                }
            }
        }
    })(t = e.Options || (e.Options = {}));
})(h || (h = {}));

var f;

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
            e.text.lineText = o.getAnyString(e.text.lineText, "Line");
            e.text.noLineDataMessage = o.getAnyString(e.text.noLineDataMessage, "There is currently no data to view.");
            e.text.removeTypeText = o.getAnyString(e.text.removeTypeText, "Remove Type");
            e.text.openNewTypeText = o.getAnyString(e.text.openNewTypeText, "Open new type");
            e.text.clearExistingDataText = o.getAnyString(e.text.clearExistingDataText, "Clear existing data");
            e.text.browseButtonText = o.getAnyString(e.text.browseButtonText, "Browse");
            e.text.saveButtonText = o.getAnyString(e.text.saveButtonText, "Save");
            e.text.resetButtonText = o.getAnyString(e.text.resetButtonText, "Reset");
            e.text.copyButtonText = o.getAnyString(e.text.copyButtonText, "Copy");
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
})(f || (f = {}));

var g;

(e => {
    let t;
    (e => {
        function t(e) {
            if (!i.definedParentElement(e._currentView.disabledBackground)) {
                e._currentView.disabledBackground = a.create(e._currentView.element, "div", "disabled");
            }
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
})(g || (g = {}));

var m;

(e => {
    let t;
    (e => {
        function t(e) {
            let t = [];
            if (e.views.map.enabled && e._currentView.view === 1) {
                t = e.views.map.monthsToShow;
            } else if (e.views.line.enabled && e._currentView.view === 2) {
                t = e.views.line.monthsToShow;
            } else if (e.views.chart.enabled && e._currentView.view === 3) {
                t = e.views.chart.monthsToShow;
            } else if (e.views.days.enabled && e._currentView.view === 4) {
                t = e.views.days.monthsToShow;
            } else if (e.views.months.enabled && e._currentView.view === 5) {
                t = e.views.months.monthsToShow;
            } else if (e.views.statistics.enabled && e._currentView.view === 6) {
                t = e.views.statistics.monthsToShow;
            }
            return t;
        }
        e.get = t;
        function n(e, t) {
            if (e.views.map.enabled && e._currentView.view === 1) {
                e.views.map.monthsToShow = t;
            } else if (e.views.line.enabled && e._currentView.view === 2) {
                e.views.line.monthsToShow = t;
            } else if (e.views.chart.enabled && e._currentView.view === 3) {
                e.views.chart.monthsToShow = t;
            } else if (e.views.days.enabled && e._currentView.view === 4) {
                e.views.days.monthsToShow = t;
            } else if (e.views.months.enabled && e._currentView.view === 5) {
                e.views.months.monthsToShow = t;
            } else if (e.views.statistics.enabled && e._currentView.view === 6) {
                e.views.statistics.monthsToShow = t;
            }
        }
        e.set = n;
    })(t = e.Months || (e.Months = {}));
    let n;
    (e => {
        function t(e) {
            let t = [];
            if (e.views.map.enabled && e._currentView.view === 1) {
                t = e.views.map.daysToShow;
            } else if (e.views.line.enabled && e._currentView.view === 2) {
                t = e.views.line.daysToShow;
            } else if (e.views.chart.enabled && e._currentView.view === 3) {
                t = e.views.chart.daysToShow;
            } else if (e.views.days.enabled && e._currentView.view === 4) {
                t = e.views.days.daysToShow;
            } else if (e.views.months.enabled && e._currentView.view === 5) {
                t = e.views.months.daysToShow;
            } else if (e.views.statistics.enabled && e._currentView.view === 6) {
                t = e.views.statistics.daysToShow;
            }
            return t;
        }
        e.get = t;
        function n(e, t) {
            if (e.views.map.enabled && e._currentView.view === 1) {
                e.views.map.daysToShow = t;
            } else if (e.views.line.enabled && e._currentView.view === 2) {
                e.views.line.daysToShow = t;
            } else if (e.views.chart.enabled && e._currentView.view === 3) {
                e.views.chart.daysToShow = t;
            } else if (e.views.days.enabled && e._currentView.view === 4) {
                e.views.days.daysToShow = t;
            } else if (e.views.months.enabled && e._currentView.view === 5) {
                e.views.months.daysToShow = t;
            } else if (e.views.statistics.enabled && e._currentView.view === 6) {
                e.views.statistics.daysToShow = t;
            }
        }
        e.set = n;
    })(n = e.Days || (e.Days = {}));
    let o;
    (e => {
        function t(e) {
            if (e.views.map.enabled && i.defined(e._currentView.mapContents)) {
                e._currentView.mapContentsScrollLeft = e._currentView.mapContents.scrollLeft;
            }
            if (e.views.line.enabled && i.defined(e._currentView.lineContents)) {
                e._currentView.lineContentsScrollLeft = e._currentView.lineContents.scrollLeft;
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
            if (e._currentView.element.innerHTML !== "") {
                e._currentView.element.style.height = `${e._currentView.element.offsetHeight}px`;
            }
            e._currentView.element.innerHTML = "";
        }
        e.getScrollPositions = t;
        function n(e) {
            let t = 0;
            if (e.toLowerCase() === "map") {
                t = 1;
            } else if (e.toLowerCase() === "line") {
                t = 2;
            } else if (e.toLowerCase() === "chart") {
                t = 3;
            } else if (e.toLowerCase() === "days") {
                t = 4;
            } else if (e.toLowerCase() === "months") {
                t = 5;
            } else if (e.toLowerCase() === "statistics") {
                t = 6;
            }
            return t;
        }
        e.get = n;
        function o(e) {
            let t = "";
            if (e._currentView.view === 1) {
                t = "map";
            } else if (e._currentView.view === 2) {
                t = "line";
            } else if (e._currentView.view === 3) {
                t = "chart";
            } else if (e._currentView.view === 4) {
                t = "days";
            } else if (e._currentView.view === 5) {
                t = "months";
            } else if (e._currentView.view === 6) {
                t = "statistics";
            }
            return t;
        }
        e.getName = o;
        function s(e, t) {
            let n = "";
            if (e.views.map.enabled && e._currentView.view === 1) {
                n = t.text.mapText;
            } else if (e.views.line.enabled && e._currentView.view === 2) {
                n = t.text.lineText;
            } else if (e.views.chart.enabled && e._currentView.view === 3) {
                n = t.text.chartText;
            } else if (e.views.days.enabled && e._currentView.view === 4) {
                n = t.text.daysText;
            } else if (e.views.months.enabled && e._currentView.view === 5) {
                n = t.text.monthsText;
            } else if (e.views.statistics.enabled && e._currentView.view === 6) {
                n = t.text.colorRangesText;
            }
            return n;
        }
        e.getText = s;
        function r(e) {
            if (e.views.map.enabled && e._currentView.view === 1) {
                e._currentView.mapContentsContainer.style.display = "block";
            } else if (e.views.line.enabled && e._currentView.view === 2) {
                e._currentView.lineContentsContainer.style.display = "block";
            } else if (e.views.chart.enabled && e._currentView.view === 3) {
                e._currentView.chartContents.style.display = "block";
            } else if (e.views.days.enabled && e._currentView.view === 4) {
                e._currentView.daysContents.style.display = "block";
            } else if (e.views.months.enabled && e._currentView.view === 5) {
                e._currentView.monthsContents.style.display = "block";
            } else if (e.views.statistics.enabled && e._currentView.view === 6) {
                e._currentView.statisticsContents.style.display = "block";
            }
            e._currentView.element.style.removeProperty("height");
        }
        e.set = r;
    })(o = e.View || (e.View = {}));
})(m || (m = {}));

var p;

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
            for (let e = 1; e < n; e++) {
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
                const t = n[e].split(",");
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
})(p || (p = {}));

var y;

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
                h = o(t, r, w);
            } else if (e === "txt") {
                h = s(t, r, w);
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
                if (Object.prototype.hasOwnProperty.call(e, t)) {
                    n.push(h([ w(t), w(e[t].toString()) ]));
                }
            }
            if (n.length > 0) {
                n.unshift(h([ w(t.text.dateText), w(t.text.countText) ]));
            }
            return n.join("\n");
        }
        function i(e) {
            return JSON.stringify(e, null, 2);
        }
        function o(e, t, n) {
            const i = r.getCustomFormattedDateText(t, n.exportDateTimeFormat, new Date);
            const o = [];
            o.push('<?xml version="1.0" ?>');
            o.push("<LastModified>");
            o.push(`${"  "}<FullDate>${i}</FullDate>`);
            o.push("</LastModified>");
            o.push("<Dates>");
            for (const t in e) {
                if (Object.prototype.hasOwnProperty.call(e, t)) {
                    o.push("<Date>");
                    o.push(`${"  "}<FullDate>${t}</FullDate>`);
                    o.push(`${"  "}<Count>${e[t].toString()}</Count>`);
                    o.push("</Date>");
                }
            }
            o.push("</Dates>");
            return o.join("\n");
        }
        function s(e, t, n) {
            const i = r.getCustomFormattedDateText(t, n.exportDateTimeFormat, new Date);
            const o = [];
            o.push(`Last-Modified${":"}${" "}${i}`);
            for (const t in e) {
                if (Object.prototype.hasOwnProperty.call(e, t)) {
                    o.push(`${t}${":"}${" "}${e[t].toString()}`);
                }
            }
            return o.join("\n");
        }
        function a(e, t, n) {
            const i = [];
            const o = r.getCustomFormattedDateText(t, n.exportDateTimeFormat, new Date);
            i.push("<!DOCTYPE html>");
            i.push("<html>");
            i.push("<head>");
            i.push(`${"  "}<meta charset="utf-8" />`);
            i.push(`${"  "}<meta http-equiv="Last-Modified" content="${o} GMT" />`);
            i.push("</head>");
            i.push("<body>");
            i.push(`${"  "}<ul>`);
            for (const t in e) {
                if (Object.prototype.hasOwnProperty.call(e, t)) {
                    i.push(`${"  "}${"  "}<li><b>${t}:</b> ${e[t].toString()}</li>`);
                }
            }
            i.push(`${"  "}</ul>`);
            i.push("</body>");
            i.push("</html>");
            return i.join("\n");
        }
        function l(e) {
            const t = [];
            t.push("| Full Date | Count |");
            t.push("| --- | --- |");
            for (const n in e) {
                if (Object.prototype.hasOwnProperty.call(e, n)) {
                    t.push(`| ${n} | ${e[n].toString()} |`);
                }
            }
            return t.join("\n");
        }
        function c(e) {
            const t = [];
            t.push(`Full Date${"\t"}Count`);
            for (const n in e) {
                if (Object.prototype.hasOwnProperty.call(e, n)) {
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
                if (Object.prototype.hasOwnProperty.call(e, t)) {
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
                if (Object.prototype.hasOwnProperty.call(e, t)) {
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
})(y || (y = {}));

var v;

(e => {
    function t(e, t, n, i = true, o = false) {
        if (n > 0) {
            const s = o ? `${n}%` : `${n}px`;
            if (i && e.chartsAnimationDelay > 0) {
                setTimeout(() => {
                    t.style.height = s;
                }, e.chartsAnimationDelay);
            } else {
                t.style.height = s;
            }
        }
    }
    e.setHeight = t;
})(v || (v = {}));

var T;

(e => {
    function t(e, t, i) {
        if (t.useLocalStorageForData && window.localStorage) {
            const r = window.localStorage.length;
            const a = t._currentView.element.id;
            for (let t = 0; t < r; t++) {
                const r = window.localStorage.key(t);
                if (s.startsWithAnyCase(r, `${n.LOCAL_STORAGE_START_ID}${a}`)) {
                    const t = window.localStorage.getItem(r);
                    const n = o.getObjectFromString(t, e);
                    if (n.parsed) {
                        i.typeData = n.object;
                        i.totalTypes = 0;
                        for (const e in i.typeData) {
                            if (Object.prototype.hasOwnProperty.call(i.typeData, e)) {
                                i.totalTypes++;
                            }
                        }
                    }
                    break;
                }
            }
        }
    }
    e.load = t;
    function i(e, t) {
        if (e.useLocalStorageForData && window.localStorage) {
            const i = e._currentView.element.id;
            const o = JSON.stringify(t.typeData);
            r(e);
            window.localStorage.setItem(`${n.LOCAL_STORAGE_START_ID}${i}`, o);
        }
    }
    e.store = i;
    function r(e) {
        if (e.useLocalStorageForData && window.localStorage) {
            const t = window.localStorage.length;
            const i = [];
            const o = e._currentView.element.id;
            for (let e = 0; e < t; e++) {
                const t = window.localStorage.key(e);
                if (s.startsWithAnyCase(t, `${n.LOCAL_STORAGE_START_ID}${o}`)) {
                    i.push(t);
                }
            }
            const r = i.length;
            for (let e = 0; e < r; e++) {
                window.localStorage.removeItem(i[e]);
            }
        }
    }
    e.clear = r;
})(T || (T = {}));

var b;

(e => {
    function t(e) {
        const t = {};
        for (let n = 0; n <= e; n++) {
            t[n + 1] = {
                total: 0,
                typeTotals: {}
            };
        }
        return t;
    }
    e.largestValueForViewValues = t;
})(b || (b = {}));

var _;

(e => {
    let t;
    (e => {
        let t = null;
        function n(e) {
            t = e;
            document.addEventListener("keydown", e => o(e));
        }
        e.bind = n;
        function i() {
            document.removeEventListener("keydown", o);
        }
        e.unbind = i;
        function o(e) {
            if (e.key === "Escape") {
                t();
            }
        }
    })(t = e.Dialog || (e.Dialog = {}));
})(_ || (_ = {}));

(() => {
    let x = {};
    let V = null;
    let C = {};
    function D() {
        const e = x.domElementTypes;
        const t = e.length;
        for (let n = 0; n < t; n++) {
            const t = document.getElementsByTagName(e[n]);
            const i = [].slice.call(t);
            const o = i.length;
            for (let e = 0; e < o; e++) {
                if (!S(i[e])) {
                    break;
                }
            }
        }
    }
    function S(e) {
        let t = true;
        if (i.defined(e) && e.hasAttribute(n.HEAT_JS_ATTRIBUTE_NAME)) {
            const s = e.getAttribute(n.HEAT_JS_ATTRIBUTE_NAME);
            if (i.definedString(s)) {
                const r = o.getObjectFromString(s, x);
                if (r.parsed && i.definedObject(r.object)) {
                    M(h.Options.getForNewInstance(x, r.object, e));
                } else {
                    if (!x.safeMode) {
                        console.error(x.text.attributeNotValidErrorText.replace("{{attribute_name}}", n.HEAT_JS_ATTRIBUTE_NAME));
                        t = false;
                    }
                }
            } else {
                if (!x.safeMode) {
                    console.error(x.text.attributeNotSetErrorText.replace("{{attribute_name}}", n.HEAT_JS_ATTRIBUTE_NAME));
                    t = false;
                }
            }
        }
        return t;
    }
    function M(e) {
        c.customEvent(e.events.onBeforeRender, e._currentView.element);
        if (!i.definedString(e._currentView.element.id)) {
            e._currentView.element.id = crypto.randomUUID();
        }
        a.addClass(e._currentView.element, "heat-js");
        if (e.resizable) {
            a.addClass(e._currentView.element, "resizable");
        }
        e._currentView.element.removeAttribute(n.HEAT_JS_ATTRIBUTE_NAME);
        je(e._currentView.element.id, e);
        B(e);
        O(e);
        Ie(e);
        c.customEvent(e.events.onRenderComplete, e._currentView.element);
    }
    function B(e, t = false, n = false, i = false) {
        l.hide(e);
        if (t) {
            T.store(e, C[e._currentView.element.id]);
        }
        e._currentView.yearsAvailable = Ye(e);
        m.View.getScrollPositions(e);
        l.render(e);
        Je(e);
        $e(e);
        te(e);
        le(e);
        if (e.views.map.enabled && e._currentView.view === 1) {
            ue(e, n, i);
        }
        if (e.views.line.enabled && e._currentView.view === 2) {
            me(e, n, i);
        }
        if (e.views.chart.enabled && e._currentView.view === 3) {
            ye(e, n, i);
        }
        if (e.views.days.enabled && e._currentView.view === 4) {
            Te(e, n);
        }
        if (e.views.months.enabled && e._currentView.view === 5) {
            xe(e, n);
        }
        if (e.views.statistics.enabled && e._currentView.view === 6) {
            De(e, n);
        }
        Be(e);
        m.View.set(e);
    }
    function O(e, t = true) {
        const n = t ? window.addEventListener : window.removeEventListener;
        n("blur", () => l.hide(e));
    }
    function A(e) {
        g.Background.render(e);
        if (!i.definedParentElement(e._currentView.configurationDialog)) {
            e._currentView.configurationDialog = a.create(e._currentView.disabledBackground, "div", "dialog configuration");
            const t = a.create(e._currentView.configurationDialog, "div", "dialog-title-bar");
            const n = a.create(e._currentView.configurationDialog, "div", "dialog-contents");
            const i = a.create(t, "div", "dialog-close");
            const o = a.create(n, "div", "side-containers");
            const s = a.create(o, "div", "side-container panel");
            const r = a.create(o, "div", "side-container panel");
            a.createWithHTML(t, "span", "dialog-title-bar-text", x.text.configurationTitleText);
            a.createWithHTML(s, "div", "side-container-title-text", `${x.text.visibleDaysText}${":"}`);
            a.createWithHTML(r, "div", "side-container-title-text", `${x.text.visibleMonthsText}${":"}`);
            const c = a.create(r, "div", "side-container");
            const d = a.create(r, "div", "side-container");
            const u = a.create(n, "div", "buttons");
            const w = a.createButton(u, "button", "", x.text.resetButtonText);
            const h = a.createButton(u, "button", "default", x.text.saveButtonText);
            i.onclick = () => k(e);
            w.onclick = () => L(e);
            h.onclick = () => I(e);
            for (let t = 0; t < 7; t++) {
                e._currentView.configurationDialogDayCheckBoxes[t] = a.createCheckBox(s, x.text.dayNames[t], t.toString());
            }
            let f = c;
            let g = 0;
            for (let t = e.startMonth; t < 12 + e.startMonth; t++) {
                let n = t;
                if (e.startMonth > 0 && t > 11) {
                    n = t - 12;
                }
                e._currentView.configurationDialogMonthCheckBoxes[n] = a.createCheckBox(f, x.text.monthNames[n], n.toString());
                g++;
                if (g > 6) {
                    f = d;
                }
            }
            l.add(i, e, x.text.closeButtonText);
        }
    }
    function N(e) {
        A(e);
        g.Background.show(e);
        if (i.defined(e._currentView.configurationDialog) && e._currentView.configurationDialog.style.display !== "block") {
            e._currentView.configurationDialog.style.display = "block";
        }
        const t = m.Days.get(e);
        const n = m.Months.get(e);
        for (let n = 0; n < 7; n++) {
            e._currentView.configurationDialogDayCheckBoxes[n].checked = i.dayVisible(t, n + 1);
        }
        for (let t = 0; t < 12; t++) {
            e._currentView.configurationDialogMonthCheckBoxes[t].checked = i.monthVisible(n, t);
        }
        l.hide(e);
        _.Dialog.bind(() => k(e));
    }
    function k(e) {
        g.Background.hide(e);
        if (i.defined(e._currentView.configurationDialog) && e._currentView.configurationDialog.style.display !== "none") {
            e._currentView.configurationDialog.style.display = "none";
        }
        l.hide(e);
        _.Dialog.unbind();
    }
    function I(e) {
        g.Background.hide(e);
        if (i.defined(e._currentView.configurationDialog) && e._currentView.configurationDialog.style.display !== "none") {
            e._currentView.configurationDialog.style.display = "none";
        }
        const t = m.Days.get(e);
        const n = m.Months.get(e);
        const o = [];
        const s = [];
        let r = false;
        for (let t = 0; t < 7; t++) {
            if (e._currentView.configurationDialogDayCheckBoxes[t].checked) {
                o.push(t + 1);
            }
        }
        for (let t = 0; t < 12; t++) {
            if (e._currentView.configurationDialogMonthCheckBoxes[t].checked) {
                s.push(t + 1);
            }
        }
        if (o.length >= 1 && JSON.stringify(o) !== JSON.stringify(t)) {
            m.Days.set(e, o);
            r = true;
        }
        if (s.length >= 1 && JSON.stringify(s) !== JSON.stringify(n)) {
            m.Months.set(e, s);
            r = true;
        }
        if (r) {
            B(e);
            c.customEvent(e.events.onOptionsUpdate, e._currentView.element, e);
        } else {
            l.hide(e);
        }
    }
    function L(e) {
        for (let t = 0; t < 7; t++) {
            e._currentView.configurationDialogDayCheckBoxes[t].checked = true;
        }
        for (let t = 0; t < 12; t++) {
            e._currentView.configurationDialogMonthCheckBoxes[t].checked = true;
        }
    }
    function E(e) {
        g.Background.render(e);
        if (!i.definedParentElement(e._currentView.exportDialog)) {
            e._currentView.exportDialog = a.create(e._currentView.disabledBackground, "div", "dialog export");
            const t = a.create(e._currentView.exportDialog, "div", "dialog-title-bar");
            const n = a.create(e._currentView.exportDialog, "div", "dialog-contents");
            const i = a.create(t, "div", "dialog-close");
            a.createWithHTML(t, "span", "dialog-title-bar-text", x.text.selectTypeText);
            e._currentView.exportDialogExportTypeSelect = a.create(n, "select", "input-box");
            e._currentView.exportDialogExportTypeSelect.name = crypto.randomUUID();
            e._currentView.exportDialogExportFilenameInput = a.create(n, "input", "input-box filename");
            e._currentView.exportDialogExportFilenameInput.name = crypto.randomUUID();
            e._currentView.exportDialogExportFilenameInput.placeholder = x.text.filenamePlaceholderText;
            e._currentView.exportDialogExportOnlyDataBeingViewedCheckBox = a.createCheckBox(n, x.text.onlyDataBeingViewedText, crypto.randomUUID());
            e._currentView.exportDialogExportOnlyDataBeingViewedCheckBox.checked = e.exportOnlyDataBeingViewed;
            const o = a.create(n, "div", "buttons");
            const s = a.createButton(o, "button", "", x.text.copyButtonText);
            const r = a.createButton(o, "button", "default", x.text.exportButtonText);
            R(e);
            e._currentView.exportDialogExportFilenameInput.onkeydown = t => {
                if (t.key === "Enter") {
                    H(e);
                }
            };
            i.onclick = () => $(e);
            s.onclick = () => H(e, true);
            r.onclick = () => H(e);
            l.add(i, e, x.text.closeButtonText);
        }
    }
    function R(e) {
        let n;
        const i = [];
        for (n in t) {
            const o = a.createWithNoContainer("option");
            o.value = t[n];
            o.textContent = n.toString().toUpperCase();
            o.selected = n === e.exportType;
            i.push(o);
        }
        i.sort((e, t) => e.text.toLowerCase().localeCompare(t.text.toLowerCase()));
        i.forEach(t => e._currentView.exportDialogExportTypeSelect.add(t));
    }
    function F(e) {
        E(e);
        g.Background.show(e);
        if (i.defined(e._currentView.exportDialog) && e._currentView.exportDialog.style.display !== "block") {
            e._currentView.exportDialogExportFilenameInput.value = "";
            e._currentView.exportDialog.style.display = "block";
            e._currentView.exportDialogExportFilenameInput.focus();
        }
        l.hide(e);
        _.Dialog.bind(() => $(e));
    }
    function $(e) {
        g.Background.hide(e);
        if (i.defined(e._currentView.exportDialog) && e._currentView.exportDialog.style.display !== "none") {
            e._currentView.exportDialog.style.display = "none";
        }
        l.hide(e);
        _.Dialog.unbind();
    }
    function H(e, t = false) {
        const n = e._currentView.exportDialogExportTypeSelect.value;
        const i = e._currentView.exportDialogExportFilenameInput.value;
        const o = e._currentView.exportDialogExportOnlyDataBeingViewedCheckBox.checked;
        $(e);
        j(e, n, i, o, t);
    }
    function j(e, t = null, n = null, s = true, r = false) {
        const l = o.getString(t, e.exportType).toLowerCase();
        const d = W(e, s);
        const u = y.Contents.get(l, d, x, e);
        if (i.definedString(u)) {
            if (r) {
                navigator.clipboard.writeText(u);
            } else {
                const t = y.File.mimeType(l);
                const i = a.create(document.body, "a");
                i.style.display = "none";
                i.setAttribute("target", "_blank");
                i.setAttribute("href", `data:${t};charset=utf-8,${encodeURIComponent(u)}`);
                i.setAttribute("download", y.File.filename(x, e, n, l));
                i.click();
                document.body.removeChild(i);
            }
            c.customEvent(e.events.onExport, e._currentView.element);
        }
    }
    function W(e, t) {
        const n = {};
        const o = We(e);
        if (t) {
            const t = e._currentView.year;
            const s = m.Days.get(e);
            const a = m.Months.get(e);
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
                            if (Object.prototype.hasOwnProperty.call(o, a)) {
                                n[a] = o[a];
                            }
                        }
                    }
                }
            }
        } else {
            const e = [];
            for (const t in o) {
                if (Object.prototype.hasOwnProperty.call(o, t)) {
                    e.push(t);
                }
            }
            e.sort();
            const t = e.length;
            for (let i = 0; i < t; i++) {
                const t = e[i];
                if (Object.prototype.hasOwnProperty.call(o, t)) {
                    n[t] = o[t];
                }
            }
        }
        return n;
    }
    function P(e) {
        g.Background.render(e);
        if (!i.definedParentElement(e._currentView.importDialog)) {
            e._currentView.importDialog = a.create(e._currentView.disabledBackground, "div", "dialog import");
            const t = a.create(e._currentView.importDialog, "div", "dialog-title-bar");
            const n = a.create(e._currentView.importDialog, "div", "dialog-contents");
            const i = a.create(t, "div", "dialog-close");
            a.createWithHTML(t, "span", "dialog-title-bar-text", x.text.selectFilesText);
            e._currentView.importDialogDragAndDrop = a.createWithHTML(n, "div", "drag-and-drop-files", x.text.dragAndDropFilesText);
            e._currentView.importDialogClearExistingData = a.createCheckBox(n, x.text.clearExistingDataText, crypto.randomUUID());
            z(e._currentView.importDialogDragAndDrop, e);
            const o = a.create(n, "div", "buttons");
            const s = a.createButton(o, "button", "", x.text.browseButtonText);
            e._currentView.importDialogImportButton = a.createButton(o, "button", "default", x.text.importButtonText);
            e._currentView.importDialogImportButton.disabled = true;
            i.onclick = () => U(e);
            s.onclick = () => G(e);
            e._currentView.importDialogImportButton.onclick = () => X(e._currentView.importDialogFileList, e, e._currentView.importDialogClearExistingData.checked);
            l.add(i, e, x.text.closeButtonText);
        }
    }
    function Y(e) {
        P(e);
        g.Background.show(e);
        if (i.defined(e._currentView.importDialog) && e._currentView.importDialog.style.display !== "block") {
            e._currentView.importDialog.style.display = "block";
        }
        l.hide(e);
        _.Dialog.bind(() => U(e));
    }
    function U(e) {
        g.Background.hide(e);
        if (i.defined(e._currentView.importDialog) && e._currentView.importDialog.style.display !== "none") {
            e._currentView.importDialogDragAndDrop.innerHTML = x.text.dragAndDropFilesText;
            e._currentView.importDialogFileList = null;
            e._currentView.importDialogImportButton.disabled = true;
            e._currentView.importDialog.style.display = "none";
        }
        l.hide(e);
        _.Dialog.unbind();
    }
    function z(e, t) {
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
                    J(t, n.files);
                }
            };
        }
    }
    function G(t) {
        const n = [];
        let i;
        for (i in e) {
            n.push(`.${i}`);
        }
        const o = a.createWithNoContainer("input");
        o.type = "file";
        o.accept = n.join(", ");
        o.multiple = t.allowMultipleFileImports;
        o.onchange = () => J(t, o.files);
        o.click();
    }
    function J(e, t) {
        if (t.length <= 0) {
            e._currentView.importDialogDragAndDrop.innerHTML = x.text.dragAndDropFilesText;
            e._currentView.importDialogImportButton.disabled = true;
        } else {
            e._currentView.importDialogFileList = t;
            e._currentView.importDialogDragAndDrop.innerHTML = "";
            e._currentView.importDialogImportButton.disabled = false;
            const i = Math.min(t.length, n.MAXIMUM_FILE_IMPORTS);
            for (let n = 0; n < i; n++) {
                const i = t[n].name;
                const o = a.createWithHTML(e._currentView.importDialogDragAndDrop, "div", "filename", `<b>${n + 1}</b>. ${i}`);
                const s = a.create(o, "div", "remove");
                l.add(s, e, x.text.removeButtonText);
                s.onclick = () => Z(e, n);
            }
        }
    }
    function Z(e, t) {
        const n = new DataTransfer;
        const i = e._currentView.importDialogFileList.length;
        for (let o = 0; o < i; o++) {
            if (o !== t) {
                n.items.add(e._currentView.importDialogFileList[o]);
            }
        }
        J(e, n.files);
    }
    function X(e, t, i = false) {
        const o = Math.min(e.length, n.MAXIMUM_FILE_IMPORTS);
        const s = [];
        const r = We(t);
        if (i) {
            for (const e in r) {
                delete r[e];
            }
        }
        const a = (e, n) => {
            s.push(e);
            for (const e in n) {
                if (Object.prototype.hasOwnProperty.call(n, e)) {
                    if (!Object.prototype.hasOwnProperty.call(r, e)) {
                        r[e] = 0;
                    }
                    r[e] += n[e];
                }
            }
            if (s.length === o) {
                c.customEvent(t.events.onImport, t._currentView.element);
                B(t, true);
            }
        };
        for (let t = 0; t < o; t++) {
            const n = e[t];
            const i = n.name.split(".").pop().toLowerCase();
            p.file(n, i, a, x);
        }
    }
    function q(e) {
        g.Background.render(e);
        if (!i.definedParentElement(e._currentView.typeAddingDialog)) {
            e._currentView.typeAddingDialog = a.create(e._currentView.disabledBackground, "div", "dialog add-type");
            const t = a.create(e._currentView.typeAddingDialog, "div", "dialog-title-bar");
            const n = a.create(e._currentView.typeAddingDialog, "div", "dialog-contents");
            const i = a.create(t, "div", "dialog-close");
            a.createWithHTML(t, "span", "dialog-title-bar-text", x.text.addTypeText);
            e._currentView.typeAddingDialogTypeInput = a.create(n, "input", "input-box type");
            e._currentView.typeAddingDialogTypeInput.name = crypto.randomUUID();
            e._currentView.typeAddingDialogTypeInput.placeholder = x.text.typePlaceholderText;
            e._currentView.typeAddingOptionNewType = a.createCheckBox(n, x.text.openNewTypeText, crypto.randomUUID());
            e._currentView.typeAddingOptionNewType.checked = true;
            const o = a.create(n, "div", "buttons");
            const s = a.createButton(o, "button", "default", x.text.addButtonText);
            e._currentView.typeAddingDialogTypeInput.onkeydown = t => {
                if (t.key === "Enter") {
                    ee(e);
                }
            };
            i.onclick = () => Q(e);
            s.onclick = () => ee(e);
            l.add(i, e, x.text.closeButtonText);
        }
    }
    function K(e) {
        q(e);
        g.Background.show(e);
        if (i.defined(e._currentView.typeAddingDialog) && e._currentView.typeAddingDialog.style.display !== "block") {
            e._currentView.typeAddingDialogTypeInput.value = "";
            e._currentView.typeAddingDialog.style.display = "block";
            e._currentView.typeAddingDialogTypeInput.focus();
        }
        l.hide(e);
        _.Dialog.bind(() => Q(e));
    }
    function Q(e) {
        g.Background.hide(e);
        if (i.defined(e._currentView.typeAddingDialog) && e._currentView.typeAddingDialog.style.display !== "none") {
            e._currentView.typeAddingDialog.style.display = "none";
        }
        l.hide(e);
        _.Dialog.unbind();
    }
    function ee(e) {
        const t = e._currentView.typeAddingDialogTypeInput.value.trim();
        const n = e._currentView.element.id;
        if (i.definedString(t) && !Object.prototype.hasOwnProperty.call(C[n].typeData, t)) {
            if (!Object.prototype.hasOwnProperty.call(C[n].typeData, t)) {
                C[n].typeData[t] = {};
                C[n].totalTypes++;
            }
            if (e._currentView.typeAddingOptionNewType.checked) {
                e._currentView.type = t;
                c.customEvent(e.events.onTypeSwitch, e._currentView.element, t);
            }
            c.customEvent(e.events.onAddType, e._currentView.element, t);
            Q(e);
            B(e, true);
        } else {
            Q(e);
        }
    }
    function te(e) {
        if (e.title.showText || e.title.showYearSelector || e.title.showRefreshButton || e.title.showExportButton || e.title.showImportButton || e.title.showClearButton) {
            const t = a.create(e._currentView.element, "div", "title-bar");
            const n = a.create(t, "div", "title");
            const o = e.title.showTitleDropDownMenu && e._currentView.viewsEnabled > 1;
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
                    a.createWithHTML(n, "span", "section-text-name", m.View.getText(e, x));
                    a.createWithHTML(n, "span", "section-text", "]");
                }
            }
            if (o) {
                ie(e, n);
            }
            if (e.title.showImportButton && !e._currentView.isInFetchMode) {
                const n = a.createIconButton(t, "button", "import", "arrow-up");
                n.onclick = () => Y(e);
                if (e.title.showToolTips) {
                    l.add(n, e, x.text.importButtonText);
                }
            }
            if (e.title.showExportButton && Pe(e)) {
                const n = a.createIconButton(t, "button", "export", "arrow-down");
                n.onclick = () => F(e);
                if (e.title.showToolTips) {
                    l.add(n, e, x.text.exportButtonText);
                }
            }
            if (e.title.showRefreshButton) {
                const n = a.createIconButton(t, "button", "refresh", "refresh");
                if (e.title.showToolTips) {
                    l.add(n, e, x.text.refreshButtonText);
                }
                n.onclick = () => {
                    B(e);
                    c.customEvent(e.events.onRefresh, e._currentView.element);
                };
            }
            if (e.title.showClearButton && Ge(e) > 0) {
                const n = a.createIconButton(t, "button", "clear", "close");
                if (e.title.showToolTips) {
                    l.add(n, e, x.text.clearButtonText);
                }
                n.onclick = () => {
                    Ue(e);
                    B(e, true);
                };
            }
            if (e.title.showYearSelector) {
                const n = a.createIconButton(t, "button", "back", "arrow-line-left");
                n.disabled = i.firstVisibleYear(e, e._currentView.year);
                n.onclick = () => tt(e);
                if (e.title.showToolTips) {
                    l.add(n, e, x.text.backButtonText);
                }
                ne(e, t);
                if (e.title.showYearSelectionDropDown) {
                    re(e);
                } else {
                    a.addClass(e._currentView.yearText, "no-click");
                }
                if (e.title.showConfigurationButton) {
                    const n = a.create(t, "div", "configure");
                    n.onclick = () => N(e);
                    if (e.title.showToolTips) {
                        l.add(n, e, x.text.configurationButtonText);
                    }
                }
                if (e.title.showCurrentYearButton) {
                    const n = a.createIconButton(t, "button", "current-year", "pin");
                    if (e.title.showToolTips) {
                        l.add(n, e, x.text.currentYearText);
                    }
                    n.onclick = () => {
                        e._currentView.year = (new Date).getFullYear() - 1;
                        nt(e, false);
                        c.customEvent(e.events.onSetYear, e._currentView.element, e._currentView.year);
                    };
                }
                const o = a.createIconButton(t, "button", "next", "arrow-line-right");
                o.disabled = i.lastVisibleYear(e, e._currentView.year);
                o.onclick = () => nt(e);
                if (e.title.showToolTips) {
                    l.add(o, e, x.text.nextButtonText);
                }
            }
        }
    }
    function ne(e, t) {
        let n = e._currentView.year.toString();
        if (e.startMonth > 0) {
            n += ` / ${e._currentView.year + 1}`;
        }
        e._currentView.yearText = a.createWithHTML(t, "div", "year-text", n);
        if (e._currentView.yearTextWidth === 0) {
            e._currentView.yearTextWidth = Math.ceil(e._currentView.yearText.offsetWidth + 20);
        }
        e._currentView.yearText.style.width = `${e._currentView.yearTextWidth}px`;
    }
    function ie(e, t) {
        const n = a.create(t, "div", "titles-menu-container");
        const o = a.create(n, "div", "titles-menu");
        if (e.title.showTitleDropDownHeaders) {
            a.createWithHTML(o, "div", "title-menu-header", `${x.text.dataText}${":"}`);
        }
        if (e.views.map.enabled) {
            const t = oe(e, o, x.text.mapText);
            se(e, t, 1, "map");
        }
        if (e.views.line.enabled) {
            const t = oe(e, o, x.text.lineText);
            se(e, t, 2, "line");
        }
        if (e.views.chart.enabled) {
            const t = oe(e, o, x.text.chartText);
            se(e, t, 3, "chart");
        }
        let s = null;
        if (e.views.days.enabled) {
            if (e.title.showTitleDropDownHeaders) {
                s = a.createWithHTML(o, "div", "title-menu-header", `${x.text.yearText}${":"}`);
            }
            const t = oe(e, o, x.text.daysText);
            se(e, t, 4, "days");
        }
        if (e.views.months.enabled) {
            if (e.title.showTitleDropDownHeaders && !i.defined(s)) {
                s = a.createWithHTML(o, "div", "title-menu-header", `${x.text.yearText}${":"}`);
            }
            const t = oe(e, o, x.text.monthsText);
            se(e, t, 5, "months");
        }
        if (e.views.statistics.enabled) {
            if (e.title.showTitleDropDownHeaders) {
                a.createWithHTML(o, "div", "title-menu-header", `${x.text.statisticsText}${":"}`);
            }
            const t = oe(e, o, x.text.colorRangesText);
            se(e, t, 6, "statistics");
        }
    }
    function oe(e, t, n) {
        const i = a.createWithHTML(t, "div", "title-menu-item", n);
        if (e.title.showTitleDropDownHeaders) {
            a.addClass(i, "indented");
        }
        return i;
    }
    function se(e, t, n, i) {
        if (e._currentView.view === n) {
            a.addClass(t, "title-menu-item-active");
        } else {
            t.onclick = () => Fe(e, n, i);
        }
    }
    function re(e) {
        a.create(e._currentView.yearText, "div", "down-arrow");
        const t = a.create(e._currentView.yearText, "div", "years-menu-container");
        const n = a.create(t, "div", "years-menu");
        const o = (new Date).getFullYear();
        let s = null;
        t.style.display = "block";
        t.style.visibility = "hidden";
        for (let t = o - e.title.extraSelectionYears; t < o + e.title.extraSelectionYears; t++) {
            if (i.yearVisible(e, t)) {
                const r = ae(e, n, t, o);
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
    function ae(e, t, n, i) {
        let o = null;
        const s = e.startMonth === 0 ? n.toString() : `${n} / ${n + 1}`;
        const r = a.createWithHTML(t, "div", "year-menu-item", s);
        if (e._currentView.year !== n) {
            r.onclick = () => {
                e._currentView.year = n;
                B(e);
                c.customEvent(e.events.onSetYear, e._currentView.element, e._currentView.year);
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
    function le(e) {
        const t = new Date;
        const n = e._currentView.year === t.getFullYear();
        if (e.yearlyStatistics.enabled && (!e.yearlyStatistics.showOnlyForCurrentYear || n)) {
            const o = a.create(e._currentView.element, "div", "yearly-statistics");
            const l = m.Days.get(e);
            const c = m.Months.get(e);
            const d = new Date(e._currentView.year, e.startMonth, 1);
            const u = new Date(e._currentView.year + 1, e.startMonth, 1);
            const w = de(e, l, c, d, u);
            if (e.yearlyStatistics.showToday) {
                let c = We(e)[r.toStorageDate(t)];
                const d = a.create(o, "div", "statistics-box");
                const u = r.getWeekdayNumber(t) + 1;
                if (!i.defined(c) || !i.dayVisible(l, u)) {
                    c = 0;
                }
                const h = n ? s.friendlyNumber(c) : x.text.unavailableText;
                a.createWithHTML(d, "div", "statistics-box-title", `${x.text.todayText}${":"}`);
                const f = a.createWithHTML(d, "div", "statistics-box-count", h);
                if (!n) {
                    a.addClass(f, "unavailable");
                }
                ce(e, f, w, c, n);
            }
            if (e.yearlyStatistics.showThisWeek) {
                let t = 0;
                if (n) {
                    const n = r.getDateForMondayOfCurrentWeek();
                    const i = new Date(n);
                    i.setDate(n.getDate() + 7);
                    t = de(e, l, c, n, i);
                }
                const i = n ? s.friendlyNumber(t) : x.text.unavailableText;
                const d = a.create(o, "div", "statistics-box");
                a.createWithHTML(d, "div", "statistics-box-title", `${x.text.thisWeekText}${":"}`);
                const u = a.createWithHTML(d, "div", "statistics-box-count", i);
                if (!n) {
                    a.addClass(u, "unavailable");
                }
                ce(e, u, w, t, n);
            }
            if (e.yearlyStatistics.showThisMonth) {
                let i = 0;
                if (n) {
                    const n = new Date(t.getFullYear(), t.getMonth(), 1);
                    const o = new Date(t.getFullYear(), t.getMonth(), r.getTotalDaysInMonth(t.getFullYear(), t.getMonth()) + 1);
                    i = de(e, l, c, n, o);
                }
                const d = n ? s.friendlyNumber(i) : x.text.unavailableText;
                const u = a.create(o, "div", "statistics-box");
                a.createWithHTML(u, "div", "statistics-box-title", `${x.text.thisMonthText}${":"}`);
                const h = a.createWithHTML(u, "div", "statistics-box-count", d);
                if (!n) {
                    a.addClass(h, "unavailable");
                }
                ce(e, h, w, i, n);
            }
            if (e.yearlyStatistics.showThisYear) {
                const e = a.create(o, "div", "statistics-box");
                a.createWithHTML(e, "div", "statistics-box-title", `${x.text.thisYearText}${":"}`);
                a.createWithHTML(e, "div", "statistics-box-count", s.friendlyNumber(w));
            }
            if (o.innerHTML === "") {
                o.parentNode.removeChild(o);
            }
        }
    }
    function ce(e, t, n, i, o) {
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
    function de(e, t, n, o, s) {
        let a = 0;
        const l = new Date(o);
        while (l < s) {
            const o = We(e)[r.toStorageDate(l)];
            const s = r.getWeekdayNumber(l) + 1;
            if (i.monthVisible(n, l.getMonth()) && i.dayVisible(t, s) && i.definedNumber(o)) {
                a += o;
            }
            l.setDate(l.getDate() + 1);
        }
        return a;
    }
    function ue(e, t = false, o) {
        e._currentView.mapContentsContainer = a.create(e._currentView.element, "div", "map-contents-container");
        e._currentView.mapContents = a.create(e._currentView.mapContentsContainer, "div", "map-contents");
        if (!ge(e)) {
            e._currentView.mapContents.style.minHeight = `${n.DEFAULT_MINIMUM_HEIGHT}px`;
            const i = a.createWithHTML(e._currentView.mapContents, "div", "no-data-message", x.text.noMapDataMessage);
            if (t) {
                a.addClass(i, "view-switch");
            }
        } else {
            e._currentView.mapContents.style.minHeight = "unset";
            e._currentView.mapContents.onscroll = () => l.hide(e);
            const s = a.create(e._currentView.mapContents, "div", "map");
            const c = e._currentView.year;
            if (t) {
                a.addClass(s, "view-switch");
            }
            if (e.views.map.showDayNames) {
                const t = a.create(s, "div", "days");
                const n = e.views.map.showMinimalDayNames && e.views.map.daysToShow.length === 7;
                if (!e.views.map.showMonthNames || e.views.map.placeMonthNamesOnTheBottom) {
                    t.className = "days-months-bottom";
                }
                for (let o = 0; o < 7; o++) {
                    if (i.dayVisible(e.views.map.daysToShow, o + 1)) {
                        const i = !n || o % 3 === 0 ? x.text.dayNames[o] : " ";
                        const s = a.createWithHTML(t, "div", "day-name", i);
                        if (e.views.days.enabled) {
                            s.ondblclick = () => Fe(e, 4, "days");
                        }
                        if (!e.views.map.showSpacing) {
                            a.addClass(s, "no-spacing");
                        }
                    }
                }
                if (e.views.map.showDaysInReverseOrder) {
                    a.reverseChildrenOrder(t);
                }
            }
            const d = a.create(s, "div", "months");
            const u = w.getAllSorted(e);
            for (let t = e.startMonth; t < 12 + e.startMonth; t++) {
                let o = t;
                let s = c;
                if (e.startMonth > 0 && t > 11) {
                    o = t - 12;
                    s++;
                }
                if (i.monthVisible(e.views.map.monthsToShow, o)) {
                    const t = a.create(d, "div", "month");
                    const l = a.create(t, "div", "day-columns");
                    const w = new Date(s, o, 1);
                    const h = r.getWeekdayNumber(w);
                    let f = r.getTotalDaysInMonth(s, o);
                    let g = a.create(l, "div", "day-column");
                    let m = false;
                    let p = 1;
                    t.setAttribute(n.HEAT_JS_MAP_MONTH_NUMBER_ATTRIBUTE_NAME, `${o + 1}`);
                    f += h;
                    for (let t = 0; t < f; t++) {
                        if (t >= h) {
                            m = true;
                        } else {
                            if (i.dayVisible(e.views.map.daysToShow, p)) {
                                const t = a.create(g, "div", "day-disabled");
                                if (!e.views.map.showSpacing) {
                                    a.addClass(t, "no-spacing");
                                }
                            }
                        }
                        if (m) {
                            let n = null;
                            if (i.dayVisible(e.views.map.daysToShow, p)) {
                                n = fe(e, g, t - h, o, s, u);
                            }
                            if ((t + 1) % 7 === 0) {
                                if (e.views.map.showDaysInReverseOrder) {
                                    a.reverseChildrenOrder(g);
                                }
                                g = a.create(l, "div", "day-column");
                                p = 0;
                                if (e._currentView.dayWidth === 0 && i.defined(n)) {
                                    const t = a.getStyleValueByName(n, "margin-left", true);
                                    const i = a.getStyleValueByName(n, "margin-right", true);
                                    e._currentView.dayWidth = n.offsetWidth + t + i;
                                }
                            }
                        }
                        p++;
                    }
                    we(e, p, g);
                    if (e.views.map.showMonthNames) {
                        let n;
                        const i = t.offsetWidth;
                        const d = new Date(c, o, 1);
                        let u = x.text.monthNames[o];
                        if (e.startMonth > 0 && e.views.map.showYearsInMonthNames) {
                            u += `${" "}${s}`;
                        }
                        if (!e.views.map.placeMonthNamesOnTheBottom) {
                            n = a.createWithHTML(t, "div", "month-name", u, l);
                        } else {
                            n = a.createWithHTML(t, "div", "month-name-bottom", u);
                        }
                        if (e.views.map.showMonthDayGaps) {
                            n.style.width = `${i}px`;
                        } else {
                            n.style.width = `${i - e._currentView.dayWidth}px`;
                        }
                        if (r.isCurrentMonthAndYear(d)) {
                            a.addClass(n, "current");
                        }
                        if (e.views.months.enabled) {
                            n.ondblclick = () => Fe(e, 5, "months");
                        }
                    }
                    if (e.views.map.showMonthsInReverseOrder) {
                        a.reverseChildrenOrder(l);
                    }
                }
            }
            if (e.views.map.showMonthsInReverseOrder) {
                a.reverseChildrenOrder(d);
            }
            he(e, d);
            ke(e, e._currentView.mapContentsContainer, s);
            if (e.views.map.keepScrollPositions || o) {
                e._currentView.mapContents.scrollLeft = e._currentView.mapContentsScrollLeft;
            }
        }
        e._currentView.mapContentsContainer.style.display = "none";
    }
    function we(e, t, n) {
        const o = 7 - n.children.length;
        if (o > 0 && o < 7) {
            for (let s = 0; s < o; s++) {
                if (i.dayVisible(e.views.map.daysToShow, t)) {
                    const t = a.create(n, "div", "day-disabled");
                    if (!e.views.map.showSpacing) {
                        a.addClass(t, "no-spacing");
                    }
                }
                t++;
            }
        }
        if (e.views.map.showDaysInReverseOrder) {
            a.reverseChildrenOrder(n);
        }
    }
    function he(e, t) {
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
    function fe(e, t, l, d, u, h) {
        const f = l + 1;
        const g = a.create(t, "div", "day");
        const m = new Date(u, d, f);
        const p = i.holiday(e, m);
        let y = We(e)[r.toStorageDate(m)];
        const v = w.get(e, h, y, m);
        y = o.getNumber(y, 0);
        g.setAttribute(n.HEAT_JS_MAP_DATE_ATTRIBUTE_NAME, `${s.padNumber(f)}-${s.padNumber(d + 1)}-${u}`);
        if (i.defined(v)) {
            g.setAttribute(n.HEAT_JS_MAP_MINIMUM_ATTRIBUTE_NAME, v.minimum.toString());
        }
        if (e.views.map.showToolTips) {
            Re(e, g, m, y, e.views.map.dayToolTipText, e.events.onMapDayToolTipRender, p.matched, e.views.map.showCountsInToolTips);
        }
        if (!e.views.map.showSpacing) {
            a.addClass(g, "no-spacing");
        }
        if (e.views.map.showDayDateNumbers) {
            const e = a.createWithHTML(g, "div", "count-date", f.toString());
            a.createWithHTML(e, "sup", "", r.getDayOrdinal(x, f));
        }
        if (e.views.map.showDayCounts && y > 0) {
            a.createWithHTML(g, "div", "count", s.friendlyNumber(y));
        }
        if (i.definedFunction(e.events.onMapDayClick)) {
            g.onclick = () => c.customEvent(e.events.onMapDayClick, e._currentView.element, m, y, p.matched);
        } else if (i.definedFunction(e.events.onMapDayDblClick)) {
            g.ondblclick = () => c.customEvent(e.events.onMapDayDblClick, e._currentView.element, m, y, p.matched);
        } else {
            a.addClass(g, "no-hover");
        }
        if (i.defined(v) && w.isVisible(e, v.id)) {
            if (i.definedString(v.mapCssClassName)) {
                a.addClass(g, v.mapCssClassName);
            } else {
                a.addClass(g, v.cssClassName);
            }
        }
        if (e.views.map.highlightCurrentDay && r.isToday(m)) {
            a.addClass(g, "today");
        }
        return g;
    }
    function ge(e) {
        let t = false;
        const n = We(e);
        const i = e._currentView.year.toString();
        const o = (e._currentView.year + 1).toString();
        for (const s in n) {
            if (Object.prototype.hasOwnProperty.call(n, s)) {
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
    function me(e, t, o) {
        e._currentView.lineContentsContainer = a.create(e._currentView.element, "div", "line-contents-container");
        e._currentView.lineContents = a.create(e._currentView.lineContentsContainer, "div", "line-contents");
        e._currentView.lineContents.onscroll = () => l.hide(e);
        const s = a.create(e._currentView.lineContents, "div", "line");
        const c = a.create(s, "div", "day-lines");
        const d = Ge(e);
        if (t) {
            a.addClass(s, "view-switch");
        }
        if (d === 0) {
            e._currentView.lineContents.style.minHeight = `${n.DEFAULT_MINIMUM_HEIGHT}px`;
            s.parentNode.removeChild(s);
            const i = a.createWithHTML(e._currentView.lineContents, "div", "no-data-message", x.text.noLineDataMessage);
            if (t) {
                a.addClass(i, "view-switch");
            }
        } else {
            const n = e._currentView.year;
            const l = w.getAllSorted(e);
            let d = [];
            for (let o = e.startMonth; o < 12 + e.startMonth; o++) {
                let s = o;
                let a = n;
                if (e.startMonth > 0 && o > 11) {
                    s = o - 12;
                    a++;
                }
                if (i.monthVisible(e.views.line.monthsToShow, s)) {
                    const n = r.getTotalDaysInMonth(a, s);
                    let o = 1;
                    let u = false;
                    for (let w = 0; w < n; w++) {
                        const n = new Date(a, s, o);
                        const h = r.getWeekdayNumber(n) + 1;
                        if (i.dayVisible(e.views.line.daysToShow, h)) {
                            const n = pe(c, e, w + 1, s, a, l, t);
                            if (!u) {
                                d.push(n);
                                u = true;
                            }
                        }
                        if ((w + 1) % 7 === 0) {
                            o = 0;
                        }
                        o++;
                    }
                }
            }
            if (e.views.line.showInReverseOrder) {
                a.reverseChildrenOrder(c);
                d = d.reverse();
            }
            if (e.views.line.showMonthNames) {
                const t = a.create(e._currentView.lineContents, "div", "line-months");
                let o = 0;
                const s = s => {
                    let l = s + e.startMonth;
                    let c = n;
                    if (e.startMonth > 0 && l > 11) {
                        l -= 12;
                        c++;
                    }
                    if (i.monthVisible(e.views.line.monthsToShow, l)) {
                        const i = new Date(n, l, 1);
                        let s = x.text.monthNames[l];
                        if (e.startMonth > 0 && e.views.line.showYearsInMonthNames) {
                            s += `${" "}${c}`;
                        }
                        const u = a.createWithHTML(t, "div", "month-name", s);
                        if (e.views.line.showInReverseOrder) {
                            let e = d[o].offsetLeft;
                            e -= u.offsetWidth;
                            e += d[o].offsetWidth;
                            u.style.left = `${e}px`;
                        } else {
                            u.style.left = `${d[o].offsetLeft}px`;
                        }
                        if (r.isCurrentMonthAndYear(i)) {
                            a.addClass(u, "current");
                        }
                        if (e.views.months.enabled) {
                            u.ondblclick = () => Fe(e, 5, "months");
                        }
                        o++;
                    }
                };
                if (e.views.line.showInReverseOrder) {
                    for (let e = 12; e--; ) {
                        s(e);
                    }
                } else {
                    for (let e = 0; e < 12; e++) {
                        s(e);
                    }
                }
                t.style.width = `${c.offsetWidth}px`;
            }
            ke(e, e._currentView.lineContentsContainer, s);
            if (e.views.line.keepScrollPositions || o) {
                e._currentView.lineContents.scrollLeft = e._currentView.lineContentsScrollLeft;
            }
        }
        e._currentView.lineContentsContainer.style.display = "none";
    }
    function pe(e, t, l, d, u, h, f) {
        const g = new Date(u, d, l);
        const m = a.create(e, "div", "day-line");
        const p = i.holiday(t, g);
        let y = We(t)[r.toStorageDate(g)];
        const T = w.get(t, h, y, g);
        y = o.getNumber(y, 0);
        m.setAttribute(n.HEAT_JS_LINE_DATE_ATTRIBUTE_NAME, `${s.padNumber(l)}-${s.padNumber(d + 1)}-${u}`);
        if (i.defined(T)) {
            m.setAttribute(n.HEAT_JS_LINE_MINIMUM_ATTRIBUTE_NAME, T.minimum.toString());
        }
        if (t.views.line.showToolTips) {
            Re(t, m, g, y, t.views.line.dayToolTipText, t.events.onLineDayToolTipRender, p.matched, t.views.line.showCountsInToolTips);
        }
        if (i.definedFunction(t.events.onLineDayClick)) {
            m.onclick = () => c.customEvent(t.events.onLineDayClick, t._currentView.element, g, y, p.matched);
        } else if (i.definedFunction(t.events.onLineDayDblClick)) {
            m.ondblclick = () => c.customEvent(t.events.onLineDayDblClick, t._currentView.element, g, y, p.matched);
        } else {
            a.addClass(m, "no-hover");
        }
        if (i.defined(T) && w.isVisible(t, T.id)) {
            if (i.definedString(T.lineCssClassName)) {
                a.addClass(m, T.lineCssClassName);
            } else {
                a.addClass(m, T.cssClassName);
            }
        }
        v.setHeight(t, m, 100, f, true);
        return m;
    }
    function ye(e, t, o) {
        e._currentView.chartContents = a.create(e._currentView.element, "div", "chart-contents");
        e._currentView.chartContents.onscroll = () => l.hide(e);
        const s = a.create(e._currentView.chartContents, "div", "chart");
        const c = a.create(s, "div", "y-labels");
        const d = a.create(s, "div", "day-lines");
        const u = Ge(e);
        let h = 0;
        if (t) {
            a.addClass(s, "view-switch");
        }
        if (u > 0 && e.views.chart.showChartYLabels) {
            const e = a.createWithHTML(c, "div", "label-100", u.toString());
            const t = a.getStyleValueByName(c, "margin-right", true);
            a.createWithHTML(c, "div", "label-75", (Math.floor(u / 4) * 3).toString());
            a.createWithHTML(c, "div", "label-50", Math.floor(u / 2).toString());
            a.createWithHTML(c, "div", "label-25", Math.floor(u / 4).toString());
            a.createWithHTML(c, "div", "label-0", "0");
            c.style.width = `${e.offsetWidth}px`;
            h = c.offsetWidth + t;
        } else {
            c.parentNode.removeChild(c);
        }
        if (u === 0) {
            e._currentView.chartContents.style.minHeight = `${n.DEFAULT_MINIMUM_HEIGHT}px`;
            s.parentNode.removeChild(s);
            const i = a.createWithHTML(e._currentView.chartContents, "div", "no-data-message", x.text.noChartDataMessage);
            if (t) {
                a.addClass(i, "view-switch");
            }
        } else {
            const n = w.getAllSorted(e);
            const s = a.getStyleValueByName(d, "border-bottom-width", true);
            const l = (d.offsetHeight - s) / u;
            const c = e._currentView.year;
            let f = [];
            let g = false;
            for (let o = e.startMonth; o < 12 + e.startMonth; o++) {
                let s = o;
                let u = c;
                if (e.startMonth > 0 && o > 11) {
                    s = o - 12;
                    u++;
                }
                if (i.monthVisible(e.views.chart.monthsToShow, s)) {
                    const o = r.getTotalDaysInMonth(u, s);
                    let c = 1;
                    let w = false;
                    for (let h = 0; h < o; h++) {
                        const o = new Date(u, s, c);
                        const m = r.getWeekdayNumber(o) + 1;
                        if (i.dayVisible(e.views.chart.daysToShow, m)) {
                            const i = ve(d, e, h + 1, s, u, n, l, t);
                            if (!w && g && e.views.chart.addMonthSpacing) {
                                a.create(d, "div", "month-spacing", i);
                            }
                            if (!w) {
                                f.push(i);
                                w = true;
                            }
                        }
                        if ((h + 1) % 7 === 0) {
                            c = 0;
                        }
                        c++;
                    }
                }
                g = true;
            }
            if (e.views.chart.showInReverseOrder) {
                a.reverseChildrenOrder(d);
                f = f.reverse();
            }
            if (e.views.chart.showMonthNames) {
                const t = a.create(e._currentView.chartContents, "div", "chart-months");
                let n = 0;
                const o = a.create(t, "div", "month-name-space");
                o.style.height = `${t.offsetHeight}px`;
                o.style.width = `${h}px`;
                const s = o => {
                    let s = o + e.startMonth;
                    let l = c;
                    if (e.startMonth > 0 && s > 11) {
                        s -= 12;
                        l++;
                    }
                    if (i.monthVisible(e.views.chart.monthsToShow, s)) {
                        const i = new Date(c, s, 1);
                        let o = x.text.monthNames[s];
                        if (e.startMonth > 0 && e.views.chart.showYearsInMonthNames) {
                            o += `${" "}${l}`;
                        }
                        const d = a.createWithHTML(t, "div", "month-name", o);
                        if (e.views.chart.showInReverseOrder) {
                            let e = f[n].offsetLeft;
                            e -= d.offsetWidth;
                            e += f[n].offsetWidth;
                            d.style.left = `${e}px`;
                        } else {
                            d.style.left = `${f[n].offsetLeft}px`;
                        }
                        if (r.isCurrentMonthAndYear(i)) {
                            a.addClass(d, "current");
                        }
                        if (e.views.months.enabled) {
                            d.ondblclick = () => Fe(e, 5, "months");
                        }
                        n++;
                    }
                };
                if (e.views.chart.showInReverseOrder) {
                    for (let e = 12; e--; ) {
                        s(e);
                    }
                } else {
                    for (let e = 0; e < 12; e++) {
                        s(e);
                    }
                }
                t.style.width = `${d.offsetWidth}px`;
            }
            if (e.views.chart.keepScrollPositions || o) {
                e._currentView.chartContents.scrollLeft = e._currentView.chartContentsScrollLeft;
            }
        }
        e._currentView.chartContents.style.display = "none";
    }
    function ve(e, t, l, d, u, h, f, g) {
        const m = new Date(u, d, l);
        const p = a.create(e, "div", "day-line");
        const y = i.holiday(t, m);
        let T = We(t)[r.toStorageDate(m)];
        const b = w.get(t, h, T, m);
        T = o.getNumber(T, 0);
        p.setAttribute(n.HEAT_JS_CHART_DATE_ATTRIBUTE_NAME, `${s.padNumber(l)}-${s.padNumber(d + 1)}-${u}`);
        if (i.defined(b)) {
            p.setAttribute(n.HEAT_JS_CHART_MINIMUM_ATTRIBUTE_NAME, b.minimum.toString());
        }
        if (t.views.chart.showToolTips) {
            Re(t, p, m, T, t.views.chart.dayToolTipText, t.events.onChartDayToolTipRender, y.matched, t.views.chart.showCountsInToolTips);
        }
        if (t.views.chart.showLineCounts || t.views.chart.showLineDateNumbers) {
            a.addClass(p, "day-line-count");
        }
        if (t.views.chart.showLineDateNumbers) {
            const e = a.createWithHTML(p, "div", "count-date", l.toString());
            a.createWithHTML(e, "sup", "", r.getDayOrdinal(x, l));
        }
        if (t.views.chart.showLineCounts && T > 0) {
            a.createWithHTML(p, "div", "count", s.friendlyNumber(T));
        }
        const _ = T * f;
        if (_ <= 0) {
            p.style.visibility = "hidden";
        }
        if (i.definedFunction(t.events.onChartDayClick)) {
            p.onclick = () => c.customEvent(t.events.onChartDayClick, t._currentView.element, m, T, y.matched);
        } else if (i.definedFunction(t.events.onChartDayDblClick)) {
            p.ondblclick = () => c.customEvent(t.events.onChartDayDblClick, t._currentView.element, m, T, y.matched);
        } else {
            a.addClass(p, "no-hover");
        }
        if (i.defined(b) && w.isVisible(t, b.id)) {
            if (i.definedString(b.chartCssClassName)) {
                a.addClass(p, b.chartCssClassName);
            } else {
                a.addClass(p, b.cssClassName);
            }
        }
        if (t.views.chart.highlightCurrentDay && r.isToday(m)) {
            a.addClass(p, "today");
        }
        if (t.views.chart.useGradients) {
            a.addGradientEffect(t._currentView.element, p);
        }
        v.setHeight(t, p, _, g);
        return p;
    }
    function Te(e, t) {
        e._currentView.daysContents = a.create(e._currentView.element, "div", "days-contents");
        const o = a.create(e._currentView.daysContents, "div", "days");
        const s = a.create(e._currentView.daysContents, "div", "day-names");
        const r = a.create(o, "div", "y-labels");
        const l = a.create(o, "div", "day-lines");
        const c = w.getAllSorted(e);
        const d = _e(e, c);
        if (t && (!e.views.days.useDifferentOpacities || !e.views.days.showDayCounts)) {
            a.addClass(o, "view-switch");
        }
        if (d.largestValue > 0 && e.views.days.showChartYLabels) {
            const e = a.createWithHTML(r, "div", "label-100", d.largestValue.toString());
            const t = a.getStyleValueByName(r, "margin-right", true);
            a.createWithHTML(r, "div", "label-75", (Math.floor(d.largestValue / 4) * 3).toString());
            a.createWithHTML(r, "div", "label-50", Math.floor(d.largestValue / 2).toString());
            a.createWithHTML(r, "div", "label-25", Math.floor(d.largestValue / 4).toString());
            a.createWithHTML(r, "div", "label-0", "0");
            r.style.width = `${e.offsetWidth}px`;
            s.style.paddingLeft = `${r.offsetWidth + t}px`;
        } else {
            r.parentNode.removeChild(r);
        }
        if (d.largestValue === 0) {
            e._currentView.daysContents.style.minHeight = `${n.DEFAULT_MINIMUM_HEIGHT}px`;
            o.parentNode.removeChild(o);
            s.parentNode.removeChild(s);
            const i = a.createWithHTML(e._currentView.daysContents, "div", "no-days-message", x.text.noDaysDataMessage);
            if (t) {
                a.addClass(i, "view-switch");
            }
        } else {
            const n = a.getStyleValueByName(l, "border-bottom-width", true);
            const o = (l.offsetHeight - n) / d.largestValue;
            for (const n in d.values) {
                if (Object.prototype.hasOwnProperty.call(d.values, n) && i.dayVisible(e.views.days.daysToShow, parseInt(n))) {
                    const r = d.valueOpacities[d.values[n].total];
                    const u = be(l, parseInt(n), d.values[n].total, e, o, r, d.totalValue, t);
                    if (e.views.days.showDayNames) {
                        a.createWithHTML(s, "div", "day-name", x.text.dayNames[parseInt(n) - 1]);
                    }
                    if (e.views.days.showStackedColorRanges) {
                        for (const e in d.values[n].typeTotals) {
                            if (Object.prototype.hasOwnProperty.call(d.values[n].typeTotals, e)) {
                                const t = d.values[n].typeTotals[e];
                                const s = t * o;
                                const r = w.getByMinimum(c, parseInt(e));
                                if (s > 0) {
                                    const e = u.children.length > 0 ? u.children[0] : null;
                                    const t = a.create(u, "div", "stacked-color-range", e);
                                    t.style.height = `${s}px`;
                                    if (i.defined(r)) {
                                        if (i.definedString(r.daysCssClassName)) {
                                            a.addClass(t, r.daysCssClassName);
                                        } else {
                                            a.addClass(t, r.cssClassName);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (e.views.days.showInReverseOrder) {
                a.reverseChildrenOrder(l);
                a.reverseChildrenOrder(s);
            }
            if (e.views.days.keepScrollPositions) {
                e._currentView.daysContents.scrollLeft = e._currentView.daysContentsScrollLeft;
            }
        }
        e._currentView.daysContents.style.display = "none";
    }
    function be(e, t, o, r, u, w, h, f) {
        const g = a.create(e, "div", "day-line");
        const m = o * u;
        let p = null;
        g.setAttribute(n.HEAT_JS_DAY_NUMBER_ATTRIBUTE_NAME, t.toString());
        if (m <= 0) {
            g.style.visibility = "hidden";
        }
        if (!r.views.days.showStackedColorRanges) {
            a.addClass(g, "non-stacked");
        } else {
            a.addClass(g, "stacked");
        }
        if (r.views.days.showToolTips) {
            l.add(g, r, s.friendlyNumber(o));
        }
        if (i.definedFunction(r.events.onWeekDayClick)) {
            g.onclick = () => c.customEvent(r.events.onWeekDayClick, r._currentView.element, t, o, r._currentView.year);
        } else if (i.definedFunction(r.events.onWeekDayDblClick)) {
            g.ondblclick = () => c.customEvent(r.events.onWeekDayDblClick, r._currentView.element, t, o, r._currentView.year);
        } else {
            a.addClass(g, "no-hover");
        }
        if (r.views.days.showDayCounts && o > 0) {
            a.addClass(g, "day-line-count");
            p = a.createWithHTML(g, "div", "count", s.friendlyNumber(o));
            if (r.views.days.showDayCountPercentages) {
                a.createWithHTML(p, "div", "percentage", `${(o / h * 100).toFixed(r.percentageDecimalPoints)}%`);
            }
        }
        if (!r.views.days.showStackedColorRanges) {
            if (r.views.days.useGradients) {
                a.addGradientEffect(r._currentView.element, g);
                if (i.defined(p)) {
                    a.addClass(p, "blend-colors");
                }
            } else if (r.views.days.useDifferentOpacities) {
                const e = a.getStyleValueByName(g, "background-color");
                const t = a.getStyleValueByName(g, "border-color");
                if (i.defined(p)) {
                    a.addClass(p, "blend-colors");
                }
                if (i.rgbColor(e)) {
                    g.style.backgroundColor = d.toRgbOpacityColor(e, w);
                } else if (i.hexColor(e)) {
                    g.style.backgroundColor = d.toRgbOpacityColor(d.hexToRgba(e), w);
                }
                if (i.rgbColor(t)) {
                    g.style.borderColor = d.toRgbOpacityColor(t, w);
                } else if (i.hexColor(t)) {
                    g.style.borderColor = d.toRgbOpacityColor(d.hexToRgba(t), w);
                }
            }
        }
        v.setHeight(r, g, m, f);
        return g;
    }
    function _e(e, t) {
        const n = {
            values: b.largestValueForViewValues(7),
            valueOpacities: {},
            largestValue: 0,
            totalValue: 0
        };
        const o = We(e);
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
                    if (Object.prototype.hasOwnProperty.call(o, s)) {
                        const d = new Date(c, l, a + 1);
                        const u = r.getWeekdayNumber(d) + 1;
                        if (!i.holiday(e, d).matched && i.dayVisible(e.views.days.daysToShow, u)) {
                            const r = o[s];
                            const a = w.get(e, t, r);
                            if (!i.defined(a) || a.visible) {
                                const e = i.defined(a) ? a.minimum.toString() : "0";
                                n.values[u].total += r;
                                n.totalValue += r;
                                n.largestValue = Math.max(n.largestValue, n.values[u].total);
                                if (!Object.prototype.hasOwnProperty.call(n.values[u].typeTotals, e)) {
                                    n.values[u].typeTotals[e] = 0;
                                }
                                n.values[u].typeTotals[e] += r;
                            }
                        }
                    }
                }
            }
        }
        d.valuesToOpacitiesOrder(n);
        return n;
    }
    function xe(e, t) {
        e._currentView.monthsContents = a.create(e._currentView.element, "div", "months-contents");
        const o = a.create(e._currentView.monthsContents, "div", "months");
        const s = a.create(e._currentView.monthsContents, "div", "month-names");
        const l = a.create(o, "div", "y-labels");
        const c = a.create(o, "div", "month-lines");
        const d = w.getAllSorted(e);
        const u = Ce(e, d);
        if (t && (!e.views.months.useDifferentOpacities || !e.views.months.showMonthCounts)) {
            a.addClass(o, "view-switch");
        }
        if (u.largestValue > 0 && e.views.months.showChartYLabels) {
            const e = a.createWithHTML(l, "div", "label-100", u.largestValue.toString());
            const t = a.getStyleValueByName(l, "margin-right", true);
            a.createWithHTML(l, "div", "label-75", (Math.floor(u.largestValue / 4) * 3).toString());
            a.createWithHTML(l, "div", "label-50", Math.floor(u.largestValue / 2).toString());
            a.createWithHTML(l, "div", "label-25", Math.floor(u.largestValue / 4).toString());
            a.createWithHTML(l, "div", "label-0", "0");
            l.style.width = `${e.offsetWidth}px`;
            s.style.paddingLeft = `${l.offsetWidth + t}px`;
        } else {
            l.parentNode.removeChild(l);
        }
        if (u.largestValue === 0) {
            e._currentView.monthsContents.style.minHeight = `${n.DEFAULT_MINIMUM_HEIGHT}px`;
            o.parentNode.removeChild(o);
            s.parentNode.removeChild(s);
            const i = a.createWithHTML(e._currentView.monthsContents, "div", "no-months-message", x.text.noMonthsDataMessage);
            if (t) {
                a.addClass(i, "view-switch");
            }
        } else {
            const n = a.getStyleValueByName(c, "border-bottom-width", true);
            const o = (c.offsetHeight - n) / u.largestValue;
            const l = e._currentView.year;
            for (let n = e.startMonth; n < 12 + e.startMonth; n++) {
                let h = n;
                if (e.startMonth > 0 && n > 11) {
                    h = n - 12;
                }
                const f = h + 1;
                if (Object.prototype.hasOwnProperty.call(u.values, f) && i.monthVisible(e.views.months.monthsToShow, h)) {
                    const n = u.valueOpacities[u.values[f].total];
                    const g = Ve(c, f, u.values[f].total, e, o, n, u.totalValue, t);
                    if (e.views.months.showMonthNames) {
                        const e = a.createWithHTML(s, "div", "month-name", x.text.monthNames[h]);
                        const t = new Date(l, h, 1);
                        if (r.isCurrentMonthAndYear(t)) {
                            a.addClass(e, "current");
                        }
                    }
                    if (e.views.months.showStackedColorRanges) {
                        for (const e in u.values[f].typeTotals) {
                            if (Object.prototype.hasOwnProperty.call(u.values[f].typeTotals, e)) {
                                const t = u.values[f].typeTotals[e];
                                const n = t * o;
                                const s = w.getByMinimum(d, parseInt(e));
                                if (n > 0) {
                                    const e = g.children.length > 0 ? g.children[0] : null;
                                    const t = a.create(g, "div", "stacked-color-range", e);
                                    t.style.height = `${n}px`;
                                    if (i.defined(s)) {
                                        if (i.definedString(s.monthsCssClassName)) {
                                            a.addClass(t, s.monthsCssClassName);
                                        } else {
                                            a.addClass(t, s.cssClassName);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (e.views.months.showInReverseOrder) {
                a.reverseChildrenOrder(c);
                a.reverseChildrenOrder(s);
            }
            if (e.views.months.keepScrollPositions) {
                e._currentView.monthsContents.scrollLeft = e._currentView.monthsContentsScrollLeft;
            }
        }
        e._currentView.monthsContents.style.display = "none";
    }
    function Ve(e, t, o, r, u, w, h, f) {
        const g = a.create(e, "div", "month-line");
        const m = o * u;
        const p = new Date;
        let y = null;
        g.setAttribute(n.HEAT_JS_MONTH_NUMBER_ATTRIBUTE_NAME, t.toString());
        if (!r.views.months.showStackedColorRanges) {
            a.addClass(g, "non-stacked");
        } else {
            a.addClass(g, "stacked");
        }
        if (m <= 0) {
            g.style.visibility = "hidden";
        }
        if (r.views.months.showToolTips) {
            l.add(g, r, s.friendlyNumber(o));
        }
        let T = r._currentView.year;
        if (r.startMonth > 0 && t - 1 < r.startMonth) {
            T++;
        }
        if (i.definedFunction(r.events.onMonthClick)) {
            g.onclick = () => c.customEvent(r.events.onMonthClick, r._currentView.element, t, o, T);
        } else if (i.definedFunction(r.events.onMonthDblClick)) {
            g.ondblclick = () => c.customEvent(r.events.onMonthDblClick, r._currentView.element, t, o, T);
        } else {
            a.addClass(g, "no-hover");
        }
        if (r.views.months.showMonthCounts && o > 0) {
            a.addClass(g, "month-line-count");
            y = a.createWithHTML(g, "div", "count", s.friendlyNumber(o));
            if (r.views.months.showMonthCountPercentages) {
                a.createWithHTML(y, "div", "percentage", `${(o / h * 100).toFixed(r.percentageDecimalPoints)}%`);
            }
        }
        if (r.views.months.highlightCurrentMonth && p.getMonth() === t - 1 && r._currentView.year === p.getFullYear()) {
            a.addClass(g, "today");
        }
        if (!r.views.months.showStackedColorRanges) {
            if (r.views.months.useGradients) {
                a.addGradientEffect(r._currentView.element, g);
                if (i.defined(y)) {
                    a.addClass(y, "blend-colors");
                }
            } else if (r.views.months.useDifferentOpacities) {
                const e = a.getStyleValueByName(g, "background-color");
                const t = a.getStyleValueByName(g, "border-color");
                if (i.defined(y)) {
                    a.addClass(y, "blend-colors");
                }
                if (i.rgbColor(e)) {
                    g.style.backgroundColor = d.toRgbOpacityColor(e, w);
                } else if (i.hexColor(e)) {
                    g.style.backgroundColor = d.toRgbOpacityColor(d.hexToRgba(e), w);
                }
                if (i.rgbColor(t)) {
                    g.style.borderColor = d.toRgbOpacityColor(t, w);
                } else if (i.hexColor(t)) {
                    g.style.borderColor = d.toRgbOpacityColor(d.hexToRgba(t), w);
                }
            }
        }
        v.setHeight(r, g, m, f);
        return g;
    }
    function Ce(e, t) {
        const n = {
            values: b.largestValueForViewValues(12),
            valueOpacities: {},
            largestValue: 0,
            totalValue: 0
        };
        const o = We(e);
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
                    if (Object.prototype.hasOwnProperty.call(o, a)) {
                        const u = new Date(c, l, d + 1);
                        const h = r.getWeekdayNumber(u) + 1;
                        if (!i.holiday(e, u).matched && i.dayVisible(e.views.days.daysToShow, h)) {
                            const r = o[a];
                            const l = w.get(e, t, r);
                            if (!i.defined(l) || l.visible) {
                                const e = i.defined(l) ? l.minimum.toString() : "0";
                                n.values[s].total += r;
                                n.totalValue += r;
                                n.largestValue = Math.max(n.largestValue, n.values[s].total);
                                if (!Object.prototype.hasOwnProperty.call(n.values[s].typeTotals, e)) {
                                    n.values[s].typeTotals[e] = 0;
                                }
                                n.values[s].typeTotals[e] += r;
                            }
                        }
                    }
                }
            }
        }
        d.valuesToOpacitiesOrder(n);
        return n;
    }
    function De(e, t) {
        e._currentView.statisticsContents = a.create(e._currentView.element, "div", "statistics-contents");
        const o = a.create(e._currentView.statisticsContents, "div", "statistics");
        const s = a.create(e._currentView.statisticsContents, "div", "statistics-ranges");
        const r = a.create(o, "div", "y-labels");
        const l = a.create(o, "div", "range-lines");
        const c = w.getAllSorted(e);
        const d = Me(e, c);
        if (t) {
            a.addClass(o, "view-switch");
        }
        if (d.largestValue > 0 && e.views.statistics.showChartYLabels) {
            const e = a.createWithHTML(r, "div", "label-100", d.largestValue.toString());
            const t = a.getStyleValueByName(r, "margin-right", true);
            a.createWithHTML(r, "div", "label-75", (Math.floor(d.largestValue / 4) * 3).toString());
            a.createWithHTML(r, "div", "label-50", Math.floor(d.largestValue / 2).toString());
            a.createWithHTML(r, "div", "label-25", Math.floor(d.largestValue / 4).toString());
            a.createWithHTML(r, "div", "label-0", "0");
            r.style.width = `${e.offsetWidth}px`;
            s.style.paddingLeft = `${r.offsetWidth + t}px`;
        } else {
            r.parentNode.removeChild(r);
        }
        if (d.largestValue === 0) {
            e._currentView.statisticsContents.style.minHeight = `${n.DEFAULT_MINIMUM_HEIGHT}px`;
            o.parentNode.removeChild(o);
            s.parentNode.removeChild(s);
            const i = a.createWithHTML(e._currentView.statisticsContents, "div", "no-statistics-message", x.text.noStatisticsDataMessage);
            if (t) {
                a.addClass(i, "view-switch");
            }
        } else {
            const n = a.getStyleValueByName(l, "border-bottom-width", true);
            const o = (l.offsetHeight - n) / d.largestValue;
            if (!e.views.statistics.showColorRangeLabels) {
                s.parentNode.removeChild(s);
            }
            for (const n in d.types) {
                if (Object.prototype.hasOwnProperty.call(d.types, n)) {
                    Se(parseInt(n), l, d.types[n], e, c, o, d.totalValue, t);
                    const r = w.getByMinimum(c, parseInt(n));
                    if (e.views.statistics.showColorRangeLabels) {
                        if (!e.views.statistics.useColorRangeNamesForLabels || !i.defined(r) || !i.definedString(r.name)) {
                            a.createWithHTML(s, "div", "range-name", `${n}${"+"}`);
                        } else {
                            a.createWithHTML(s, "div", "range-name", r.name);
                        }
                    }
                }
            }
            if (e.views.statistics.showInReverseOrder) {
                a.reverseChildrenOrder(l);
                a.reverseChildrenOrder(s);
            }
            if (e.views.statistics.keepScrollPositions) {
                e._currentView.statisticsContents.scrollLeft = e._currentView.statisticsContentsScrollLeft;
            }
        }
        e._currentView.statisticsContents.style.display = "none";
    }
    function Se(e, t, o, r, d, u, h, f) {
        const g = a.create(t, "div", "range-line");
        const m = w.getByMinimum(d, e);
        const p = o * u;
        if (i.defined(m) && i.definedString(m.name)) {
            g.setAttribute(n.HEAT_JS_STATISTICS_COLOR_RANGE_NAME_ATTRIBUTE_NAME, m.name);
            g.setAttribute(n.HEAT_JS_STATISTICS_MINIMUM_ATTRIBUTE_NAME, m.minimum.toString());
        }
        if (p <= 0) {
            g.style.visibility = "hidden";
        }
        if (r.views.statistics.showToolTips) {
            let e;
            if (i.defined(m) && i.definedString(m.name) && r.views.statistics.showRangeNamesInToolTips) {
                e = `${m.name}${":"}${" "}<b class="tooltip-count">${s.friendlyNumber(o)}</b>`;
            } else {
                e = s.friendlyNumber(o);
            }
            l.add(g, r, e);
        }
        if (r.views.statistics.showRangeCounts && o > 0) {
            a.addClass(g, "range-line-count");
            const e = a.createWithHTML(g, "div", "count", s.friendlyNumber(o));
            if (r.views.statistics.showRangeCountPercentages) {
                a.createWithHTML(e, "div", "percentage", `${(o / h * 100).toFixed(r.percentageDecimalPoints)}%`);
            }
        }
        if (i.definedFunction(r.events.onStatisticClick)) {
            g.onclick = () => c.customEvent(r.events.onStatisticClick, r._currentView.element, m, o, r._currentView.year);
        } else if (i.definedFunction(r.events.onStatisticDblClick)) {
            g.ondblclick = () => c.customEvent(r.events.onStatisticDblClick, m, o, r._currentView.year);
        } else {
            a.addClass(g, "no-hover");
        }
        if (i.defined(m) && w.isVisible(r, m.id)) {
            if (i.definedString(m.statisticsCssClassName)) {
                a.addClass(g, m.statisticsCssClassName);
            } else {
                a.addClass(g, m.cssClassName);
            }
        }
        if (r.views.statistics.useGradients) {
            a.addGradientEffect(r._currentView.element, g);
        }
        v.setHeight(r, g, p, f);
    }
    function Me(e, t) {
        const n = We(e);
        const o = e._currentView.year;
        const s = t.length;
        const a = {
            types: {},
            largestValue: 0,
            totalValue: 0
        };
        a.types["0"] = 0;
        for (let e = 0; e < s; e++) {
            a.types[t[e].minimum.toString()] = 0;
        }
        for (let s = e.startMonth; s < 12 + e.startMonth; s++) {
            let l = s;
            let c = o;
            if (e.startMonth > 0 && s > 11) {
                l = s - 12;
                c++;
            }
            if (i.monthVisible(e.views.statistics.monthsToShow, l)) {
                const o = r.getTotalDaysInMonth(c, l);
                for (let s = 0; s < o; s++) {
                    const o = r.toStorageDate(new Date(c, l, s + 1));
                    if (Object.prototype.hasOwnProperty.call(n, o)) {
                        const d = new Date(c, l, s + 1);
                        const u = r.getWeekdayNumber(d) + 1;
                        if (!i.holiday(e, d).matched && i.dayVisible(e.views.statistics.daysToShow, u)) {
                            const s = w.get(e, t, n[o]);
                            const r = i.defined(s) ? s.minimum.toString() : "0";
                            a.types[r]++;
                            a.totalValue++;
                            a.largestValue = Math.max(a.largestValue, a.types[r]);
                        }
                    }
                }
            }
        }
        return a;
    }
    function Be(e) {
        const t = a.create(e._currentView.element, "div", "guide");
        const n = a.create(t, "div", "map-types");
        const o = He(e);
        if (C[e._currentView.element.id].totalTypes > 1) {
            if (i.definedString(e.description.text)) {
                const n = a.create(e._currentView.element, "div", "description", t);
                Ne(e, n);
            }
            const s = Object.keys(C[e._currentView.element.id].typeData).sort((e, t) => e.localeCompare(t, void 0, {
                numeric: true,
                sensitivity: "base"
            }));
            const r = s.length;
            for (let t = 0; t < r; t++) {
                const i = s[t];
                if (i !== x.text.unknownTrendText || o > 0) {
                    Oe(e, n, i);
                }
            }
            if (e.guide.allowTypeAdding) {
                const t = a.createIconButton(n, "button", "add", "plus");
                l.add(t, e, x.text.addTypeText);
                t.onclick = () => K(e);
            }
        } else {
            Ne(e, n);
        }
        if (e.guide.enabled) {
            const n = a.create(t, "div", "map-toggles");
            if (e.guide.showInvertLabel) {
                const t = a.createWithHTML(n, "div", "invert-text", x.text.invertText);
                if (e.guide.colorRangeTogglesEnabled) {
                    t.onclick = () => Ke(e);
                } else {
                    a.addClass(t, "no-click");
                }
            }
            if (e.guide.showLessAndMoreLabels) {
                const t = a.createWithHTML(n, "div", "less-text", x.text.lessText);
                if (e.guide.colorRangeTogglesEnabled) {
                    t.onclick = () => qe(e, false);
                } else {
                    a.addClass(t, "no-click");
                }
            }
            const i = a.create(n, "div", "toggles");
            const o = w.getAllSorted(e);
            const s = o.length;
            const r = [];
            let l = 0;
            for (let t = 0; t < s; t++) {
                const n = Ae(e, i, o[t]);
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
                const t = a.createWithHTML(n, "div", "more-text", x.text.moreText);
                if (e.guide.colorRangeTogglesEnabled) {
                    t.onclick = () => qe(e, true);
                } else {
                    a.addClass(t, "no-click");
                }
            }
        }
    }
    function Oe(e, t, n) {
        const i = a.createButton(t, "button", "type", n);
        if (e.guide.allowTypeRemoving) {
            const t = a.create(i, "span", "clear");
            l.add(t, e, x.text.removeTypeText);
            t.onclick = t => {
                a.cancelBubble(t);
                ze(e, n);
                B(e, true);
            };
        }
        if (e._currentView.type === n) {
            a.addClass(i, "active");
        }
        i.onclick = () => {
            if (e._currentView.type !== n) {
                e._currentView.type = n;
                c.customEvent(e.events.onTypeSwitch, e._currentView.element, n);
                B(e);
            }
        };
    }
    function Ae(e, t, n) {
        const i = a.create(t, "div");
        i.className = "toggle";
        if (e.guide.showToolTips) {
            l.add(i, e, n.tooltipText);
        }
        if (w.isVisible(e, n.id)) {
            a.addClass(i, w.getGuideCssClassName(e, n));
        }
        if (e.guide.showNumbersInGuide) {
            a.addClass(i, "toggle-number");
            i.innerHTML = `${n.minimum}${"+"}`;
        }
        if (e.guide.colorRangeTogglesEnabled) {
            i.onclick = () => Qe(i, e, n.id);
        } else {
            a.addClass(i, "no-hover");
        }
        return i;
    }
    function Ne(e, t) {
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
    function ke(e, t, n) {
        if (e.zooming.enabled) {
            const o = a.create(t, "div", "zooming");
            if (e.zooming.showCloseButton) {
                const t = a.create(o, "div", "zoom-close-button");
                l.add(t, e, x.text.closeButtonText);
                t.onclick = () => {
                    e.zooming.enabled = false;
                    e._currentView.mapContents.style.paddingRight = "0px";
                    o.parentNode.removeChild(o);
                };
            }
            const r = a.createIconButton(o, "button", "zoom-out", "minus");
            const c = a.createWithHTML(o, "span", "zoom-level", `+${s.friendlyNumber(e._currentView.zoomLevel * 10)}%`);
            const d = a.createIconButton(o, "button", "zoom-in", "plus");
            const w = a.getStyleValueByName(document.documentElement, u.Variables.Spacing, true);
            l.add(d, e, x.text.zoomInText);
            l.add(r, e, x.text.zoomOutText);
            o.style.bottom = t.offsetHeight - n.offsetHeight + "px";
            if (e._currentView.zoomLevel === -1) {
                e._currentView.zoomLevel = 0;
                c.innerText = `+${s.friendlyNumber(e._currentView.zoomLevel * 10)}%`;
            }
            if (i.defined(e._currentView.mapContents)) {
                e._currentView.mapContents.style.paddingRight = `${o.offsetWidth + w}px`;
            }
            r.disabled = e._currentView.zoomLevel === 0;
            r.onclick = () => Le(e);
            d.disabled = e.zooming.maximumLevel > 0 && e._currentView.zoomLevel >= e.zooming.maximumLevel;
            d.onclick = () => Ee(e);
        }
    }
    function Ie(e) {
        const t = a.getStyleValueByNameSizingMetic(document.documentElement, u.Variables.DaySize);
        const n = a.getStyleValueByNameSizingMetic(document.documentElement, u.Variables.LineWidth);
        let i = a.getStyleValueByName(document.documentElement, u.Variables.DaySize, true);
        let o = a.getStyleValueByName(document.documentElement, u.Variables.LineWidth, true);
        if (e._currentView.mapZoomIncrement === -1) {
            e._currentView.mapZoomIncrement = i / 10;
        }
        if (e._currentView.lineZoomIncrement === -1) {
            e._currentView.lineZoomIncrement = o / 10;
        }
        if (e.zooming.defaultLevel > 0 && e._currentView.zoomLevel === -1) {
            i += parseFloat((e.zooming.defaultLevel * e._currentView.mapZoomIncrement).toFixed(1));
            o += parseFloat((e.zooming.defaultLevel * e._currentView.lineZoomIncrement).toFixed(1));
            e._currentView.zoomLevel = e.zooming.defaultLevel;
            e._currentView.element.style.setProperty(u.Variables.DaySize, `${i}${t}`);
            e._currentView.element.style.setProperty(u.Variables.LineWidth, `${o}${n}`);
        }
    }
    function Le(e) {
        if (e._currentView.zoomLevel > 0) {
            const t = a.getStyleValueByNameSizingMetic(document.documentElement, u.Variables.DaySize);
            const n = a.getStyleValueByNameSizingMetic(document.documentElement, u.Variables.LineWidth);
            let i = a.getStyleValueByName(e._currentView.element, u.Variables.DaySize, true);
            let o = a.getStyleValueByName(e._currentView.element, u.Variables.LineWidth, true);
            i -= e._currentView.mapZoomIncrement;
            i = parseFloat(i.toFixed(1));
            o -= e._currentView.lineZoomIncrement;
            o = parseFloat(o.toFixed(1));
            e._currentView.zoomLevel--;
            e._currentView.element.style.setProperty(u.Variables.DaySize, `${i}${t}`);
            e._currentView.element.style.setProperty(u.Variables.LineWidth, `${o}${n}`);
            e._currentView.dayWidth = 0;
            c.customEvent(e.events.onZoomLevelChange, e._currentView.element, e._currentView.zoomLevel);
            B(e, false, false, true);
        }
    }
    function Ee(e) {
        if (e.zooming.maximumLevel === 0 || e._currentView.zoomLevel < e.zooming.maximumLevel) {
            const t = a.getStyleValueByNameSizingMetic(document.documentElement, u.Variables.DaySize);
            const n = a.getStyleValueByNameSizingMetic(document.documentElement, u.Variables.LineWidth);
            let i = a.getStyleValueByName(e._currentView.element, u.Variables.DaySize, true);
            let o = a.getStyleValueByName(e._currentView.element, u.Variables.LineWidth, true);
            i += e._currentView.mapZoomIncrement;
            i = parseFloat(i.toFixed(1));
            o += e._currentView.lineZoomIncrement;
            o = parseFloat(o.toFixed(1));
            e._currentView.zoomLevel++;
            e._currentView.element.style.setProperty(u.Variables.DaySize, `${i}${t}`);
            e._currentView.element.style.setProperty(u.Variables.LineWidth, `${o}${n}`);
            e._currentView.dayWidth = 0;
            c.customEvent(e.events.onZoomLevelChange, e._currentView.element, e._currentView.zoomLevel);
            B(e, false, false, true);
        }
    }
    function Re(e, t, n, o, a, d, u, w) {
        if (i.definedFunction(d)) {
            l.add(t, e, c.customEvent(d, e._currentView.element, n, o, u));
        } else {
            let c = r.getCustomFormattedDateText(x, a, n, true);
            if (e.showHolidaysInDayToolTips) {
                const t = i.holiday(e, n);
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
    function Fe(e, t, n) {
        e._currentView.view = t;
        c.customEvent(e.events.onViewSwitch, e._currentView.element, n);
        B(e, false, true);
    }
    function $e(e) {
        const t = He(e);
        if (C[e._currentView.element.id].totalTypes > 1) {
            for (const n in C[e._currentView.element.id].typeData) {
                if (n !== x.text.unknownTrendText || t > 0) {
                    if (t === 0 && e._currentView.type === x.text.unknownTrendText) {
                        e._currentView.type = n;
                    }
                }
            }
        }
    }
    function He(e) {
        let t = 0;
        for (const n in C[e._currentView.element.id].typeData[x.text.unknownTrendText]) {
            if (Object.prototype.hasOwnProperty.call(C[e._currentView.element.id].typeData[x.text.unknownTrendText], n)) {
                t++;
                break;
            }
        }
        return t;
    }
    function je(e, t, n = true) {
        C[e] = {
            options: t,
            typeData: {},
            totalTypes: 1
        };
        C[e].typeData[x.text.unknownTrendText] = {};
        if (n && !t._currentView.isInFetchMode) {
            T.load(x, t, C[e]);
        }
    }
    function We(e) {
        return C[e._currentView.element.id].typeData[e._currentView.type];
    }
    function Pe(e) {
        return Object.keys(We(e)).length > 0;
    }
    function Ye(e) {
        let t = [];
        if (e.showOnlyDataForYearsAvailable) {
            const n = We(e);
            for (const e in n) {
                if (Object.prototype.hasOwnProperty.call(n, e)) {
                    const n = parseInt(r.getStorageDateYear(e));
                    if (t.indexOf(n) === -1) {
                        t.push(n);
                    }
                }
            }
        }
        t = t.sort((e, t) => e - t);
        return t;
    }
    function Ue(e) {
        const t = e._currentView.year;
        const n = We(e);
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
                if (Object.prototype.hasOwnProperty.call(n, i)) {
                    delete n[i];
                }
            }
        }
        c.customEvent(e.events.onClearViewableData, e._currentView.element);
    }
    function ze(e, t) {
        delete C[e._currentView.element.id].typeData[t];
        C[e._currentView.element.id].totalTypes--;
        const n = Object.keys(C[e._currentView.element.id].typeData).sort((e, t) => e.localeCompare(t, void 0, {
            numeric: true,
            sensitivity: "base"
        }));
        e._currentView.type = n[0];
        c.customEvent(e.events.onRemoveType, e._currentView.element, t);
    }
    function Ge(e) {
        let t = 0;
        const n = We(e);
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
                    if (Object.prototype.hasOwnProperty.call(n, c)) {
                        if (i.dayVisible(e.views.chart.daysToShow, d)) {
                            t = Math.max(t, n[c]);
                        }
                    }
                }
            }
        }
        return t;
    }
    function Je(e) {
        if (e._currentView.isInFetchMode) {
            if (e._currentView.isInFetchModeTimer === 0) {
                Ze(e);
            }
            if (e._currentView.isInFetchModeTimer === 0) {
                e._currentView.isInFetchModeTimer = setInterval(() => {
                    Ze(e);
                    B(e);
                }, e.dataFetchDelay);
            }
        }
    }
    function Ze(e) {
        const t = e._currentView.element.id;
        const n = c.customEvent(e.events.onDataFetch, e._currentView.element, t);
        if (i.definedObject(n)) {
            je(t, e, false);
            for (const e in n) {
                if (Object.prototype.hasOwnProperty.call(n, e)) {
                    if (!Object.prototype.hasOwnProperty.call(C[t].typeData[x.text.unknownTrendText], e)) {
                        C[t].typeData[x.text.unknownTrendText][e] = 0;
                    }
                    C[t].typeData[x.text.unknownTrendText][e] += n[e];
                }
            }
        }
    }
    function Xe() {
        for (const e in C) {
            if (Object.prototype.hasOwnProperty.call(C, e)) {
                const t = C[e].options;
                O(t, false);
                if (i.defined(t._currentView.isInFetchModeTimer)) {
                    clearInterval(t._currentView.isInFetchModeTimer);
                    t._currentView.isInFetchModeTimer = 0;
                }
            }
        }
        if (x.observationMode && i.defined(V)) {
            V.disconnect();
            V = null;
        }
    }
    function qe(e, t) {
        if (e.guide.useIncrementToggles) {
            const n = w.getAllSorted(e);
            const i = n.length;
            if (t) {
                for (let e = 0; e < i; e++) {
                    const t = n[e];
                    if (!t.visible) {
                        t.visible = true;
                        break;
                    }
                }
            } else {
                for (let e = i; e--; ) {
                    const t = n[e];
                    if (t.visible) {
                        t.visible = false;
                        break;
                    }
                }
            }
        } else {
            const n = e.colorRanges.length;
            for (let i = 0; i < n; i++) {
                e.colorRanges[i].visible = t;
                c.customEvent(e.events.onColorRangeTypeToggle, e._currentView.element, e.colorRanges[i].id, t);
            }
        }
        B(e, false, false, true);
    }
    function Ke(e) {
        const t = e.colorRanges.length;
        for (let n = 0; n < t; n++) {
            e.colorRanges[n].visible = !e.colorRanges[n].visible;
            c.customEvent(e.events.onColorRangeTypeToggle, e._currentView.element, e.colorRanges[n].id, e.colorRanges[n].visible);
        }
        B(e);
    }
    function Qe(e, t, i) {
        const s = t.colorRanges.length;
        for (let r = 0; r < s; r++) {
            const s = t.colorRanges[r];
            if (s.id === i) {
                s.visible = !o.getBoolean(s.visible, true);
                if (t._currentView.view === 1) {
                    et(e, t, s, s.mapCssClassName, n.HEAT_JS_MAP_MINIMUM_ATTRIBUTE_NAME);
                } else if (t._currentView.view === 2) {
                    et(e, t, s, s.lineCssClassName, n.HEAT_JS_LINE_MINIMUM_ATTRIBUTE_NAME);
                } else if (t._currentView.view === 3) {
                    et(e, t, s, s.chartCssClassName, n.HEAT_JS_CHART_MINIMUM_ATTRIBUTE_NAME);
                } else if (t._currentView.view === 6) {
                    et(e, t, s, s.statisticsCssClassName, n.HEAT_JS_STATISTICS_MINIMUM_ATTRIBUTE_NAME);
                } else {
                    B(t, false, false, true);
                }
                c.customEvent(t.events.onColorRangeTypeToggle, t._currentView.element, s.id, s.visible);
                break;
            }
        }
    }
    function et(e, t, n, o, s) {
        let r;
        if (i.definedString(o)) {
            r = o;
        } else {
            r = n.cssClassName;
        }
        const l = t._currentView.element.getElementsByTagName("div");
        const c = [].slice.call(l);
        const d = c.length;
        for (let e = 0; e < d; e++) {
            const t = c[e];
            const o = t.getAttribute(s);
            if (i.definedString(o) && o === n.minimum.toString()) {
                if (n.visible) {
                    a.addClass(t, r);
                } else {
                    a.removeClass(t, r);
                }
            }
        }
        if (n.visible) {
            a.addClass(e, r);
        } else {
            a.removeClass(e, r);
        }
    }
    function tt(e, t = true) {
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
            B(e);
            if (t) {
                c.customEvent(e.events.onBackYear, e._currentView.element, e._currentView.year);
            }
        }
    }
    function nt(e, t = true) {
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
            B(e);
            if (t) {
                c.customEvent(e.events.onNextYear, e._currentView.element, e._currentView.year);
            }
        }
    }
    function it(e) {
        e._currentView.element.innerHTML = "";
        if (e._currentView.isInFetchMode && i.defined(e._currentView.isInFetchModeTimer)) {
            clearInterval(e._currentView.isInFetchModeTimer);
        }
        a.removeClass(e._currentView.element, "heat-js");
        l.remove(e);
        c.customEvent(e.events.onDestroy, e._currentView.element);
    }
    function ot() {
        if (x.observationMode) {
            if (!i.defined(V)) {
                V = new MutationObserver(() => {
                    st.renderAll();
                });
                const e = {
                    attributes: true,
                    childList: true,
                    subtree: true
                };
                V.observe(document.body, e);
            }
        } else {
            V.disconnect();
            V = null;
        }
    }
    const st = {
        addType: function(e, t, n = true) {
            if (i.definedString(e) && i.definedString(t) && Object.prototype.hasOwnProperty.call(C, e)) {
                const i = C[e].options;
                if (!i._currentView.isInFetchMode && !Object.prototype.hasOwnProperty.call(C[e].typeData, t)) {
                    if (!Object.prototype.hasOwnProperty.call(C[e].typeData, t)) {
                        C[e].typeData[t] = {};
                        C[e].totalTypes++;
                    }
                    c.customEvent(i.events.onAddType, i._currentView.element, t);
                    if (n) {
                        B(i, true);
                    }
                }
            }
            return st;
        },
        removeType: function(e, t, n = true) {
            if (i.definedString(e) && i.definedString(t) && Object.prototype.hasOwnProperty.call(C, e)) {
                const i = C[e].options;
                if (!i._currentView.isInFetchMode && !Object.prototype.hasOwnProperty.call(C[e].typeData, t)) {
                    ze(i, t);
                    if (n) {
                        B(i, true);
                    }
                }
            }
            return st;
        },
        addDates: function(e, t, n = null, s = true) {
            if (i.definedString(e) && i.definedArray(t) && Object.prototype.hasOwnProperty.call(C, e)) {
                const i = C[e].options;
                if (!i._currentView.isInFetchMode) {
                    n = o.getString(n, x.text.unknownTrendText);
                    const r = t.length;
                    for (let i = 0; i < r; i++) {
                        st.addDate(e, t[i], n, false);
                    }
                    if (s) {
                        B(i, true);
                    }
                }
            }
            return st;
        },
        addDate: function(e, t, n = null, s = true) {
            if (i.definedString(e) && i.definedDate(t) && Object.prototype.hasOwnProperty.call(C, e)) {
                const i = C[e].options;
                if (!i._currentView.isInFetchMode) {
                    n = o.getString(n, x.text.unknownTrendText);
                    const a = r.toStorageDate(t);
                    if (!Object.prototype.hasOwnProperty.call(C[e].typeData, n)) {
                        C[e].typeData[n] = {};
                        C[e].totalTypes++;
                    }
                    if (!Object.prototype.hasOwnProperty.call(C[e].typeData[n], a)) {
                        C[e].typeData[n][a] = 0;
                    }
                    C[e].typeData[n][a]++;
                    c.customEvent(i.events.onAdd, i._currentView.element);
                    if (s) {
                        B(i, true);
                    }
                }
            }
            return st;
        },
        updateDate: function(e, t, n, s = null, a = true) {
            if (i.definedString(e) && i.definedDate(t) && Object.prototype.hasOwnProperty.call(C, e)) {
                const i = C[e].options;
                if (!i._currentView.isInFetchMode && n > 0) {
                    const l = r.toStorageDate(t);
                    if (Object.prototype.hasOwnProperty.call(C[e].typeData, s)) {
                        s = o.getString(s, x.text.unknownTrendText);
                        C[e].typeData[s][l] = n;
                        c.customEvent(i.events.onUpdate, i._currentView.element);
                        if (a) {
                            B(i, true);
                        }
                    }
                }
            }
            return st;
        },
        removeDates: function(e, t, n = null, s = true) {
            if (i.definedString(e) && i.definedArray(t) && Object.prototype.hasOwnProperty.call(C, e)) {
                const i = C[e].options;
                if (!i._currentView.isInFetchMode) {
                    n = o.getString(n, x.text.unknownTrendText);
                    const r = t.length;
                    for (let i = 0; i < r; i++) {
                        st.removeDate(e, t[i], n, false);
                    }
                    if (s) {
                        B(i, true);
                    }
                }
            }
            return st;
        },
        removeDate: function(e, t, n = null, s = true) {
            if (i.definedString(e) && i.definedDate(t) && Object.prototype.hasOwnProperty.call(C, e)) {
                const i = C[e].options;
                if (!i._currentView.isInFetchMode) {
                    const a = r.toStorageDate(t);
                    if (Object.prototype.hasOwnProperty.call(C[e].typeData, n) && Object.prototype.hasOwnProperty.call(C[e].typeData[n], a)) {
                        n = o.getString(n, x.text.unknownTrendText);
                        if (C[e].typeData[n][a] > 0) {
                            C[e].typeData[n][a]--;
                        }
                        c.customEvent(i.events.onRemove, i._currentView.element);
                        if (s) {
                            B(i, true);
                        }
                    }
                }
            }
            return st;
        },
        clearDate: function(e, t, n = null, s = true) {
            if (i.definedString(e) && i.definedDate(t) && Object.prototype.hasOwnProperty.call(C, e)) {
                const i = C[e].options;
                if (!i._currentView.isInFetchMode) {
                    const a = r.toStorageDate(t);
                    if (Object.prototype.hasOwnProperty.call(C[e].typeData, n) && Object.prototype.hasOwnProperty.call(C[e].typeData[n], a)) {
                        n = o.getString(n, x.text.unknownTrendText);
                        delete C[e].typeData[n][a];
                        c.customEvent(i.events.onClear, i._currentView.element);
                        if (s) {
                            B(i, true);
                        }
                    }
                }
            }
            return st;
        },
        resetAll: function(e = true) {
            for (const t in C) {
                if (Object.prototype.hasOwnProperty.call(C, t)) {
                    st.reset(t, e);
                }
            }
            return st;
        },
        reset: function(e, t = true) {
            if (i.definedString(e) && Object.prototype.hasOwnProperty.call(C, e)) {
                const n = C[e].options;
                if (!n._currentView.isInFetchMode) {
                    n._currentView.type = x.text.unknownTrendText;
                    je(e, n, false);
                    c.customEvent(n.events.onReset, n._currentView.element);
                    if (t) {
                        B(n, true);
                    }
                }
            }
            return st;
        },
        import: function(e, t = null) {
            if (i.definedString(e) && Object.prototype.hasOwnProperty.call(C, e)) {
                if (i.definedArray(t)) {
                    X(t, C[e].options);
                } else {
                    G(C[e].options);
                }
            }
            return st;
        },
        export: function(e, t = null) {
            if (i.definedString(e) && Object.prototype.hasOwnProperty.call(C, e)) {
                const n = C[e].options;
                j(n, t, null, n.exportOnlyDataBeingViewed);
            }
            return st;
        },
        refresh: function(e) {
            if (i.definedString(e) && Object.prototype.hasOwnProperty.call(C, e)) {
                const t = C[e].options;
                B(t, true);
                c.customEvent(t.events.onRefresh, t._currentView.element);
            }
            return st;
        },
        refreshAll: function() {
            for (const e in C) {
                if (Object.prototype.hasOwnProperty.call(C, e)) {
                    const t = C[e].options;
                    B(t, true);
                    c.customEvent(t.events.onRefresh, t._currentView.element);
                }
            }
            return st;
        },
        setYear: function(e, t) {
            if (i.definedString(e) && i.definedNumber(t) && Object.prototype.hasOwnProperty.call(C, e)) {
                const n = C[e].options;
                n._currentView.year = t;
                if (!i.yearVisible(n, n._currentView.year)) {
                    nt(n, false);
                } else {
                    B(n);
                }
                c.customEvent(n.events.onSetYear, n._currentView.element, n._currentView.year);
            }
            return st;
        },
        setYearToHighest: function(e) {
            if (i.definedString(e) && Object.prototype.hasOwnProperty.call(C, e)) {
                const t = C[e].options;
                const n = We(t);
                let o = 0;
                for (const e in n) {
                    if (Object.prototype.hasOwnProperty.call(n, e)) {
                        o = Math.max(o, parseInt(r.getStorageDateYear(e)));
                    }
                }
                if (o > 0) {
                    t._currentView.year = o;
                    if (!i.yearVisible(t, t._currentView.year)) {
                        nt(t, false);
                    } else {
                        B(t);
                    }
                    c.customEvent(t.events.onSetYear, t._currentView.element, t._currentView.year);
                }
            }
            return st;
        },
        setYearToLowest: function(e) {
            if (i.definedString(e) && Object.prototype.hasOwnProperty.call(C, e)) {
                const t = C[e].options;
                const n = We(t);
                let o = 9999;
                for (const e in n) {
                    if (Object.prototype.hasOwnProperty.call(n, e)) {
                        o = Math.min(o, parseInt(r.getStorageDateYear(e)));
                    }
                }
                if (o < 9999) {
                    t._currentView.year = o;
                    if (!i.yearVisible(t, t._currentView.year)) {
                        tt(t, false);
                    } else {
                        B(t);
                    }
                    c.customEvent(t.events.onSetYear, t._currentView.element, t._currentView.year);
                }
            }
            return st;
        },
        moveToPreviousYear: function(e) {
            if (i.definedString(e) && Object.prototype.hasOwnProperty.call(C, e)) {
                tt(C[e].options);
            }
            return st;
        },
        moveToNextYear: function(e) {
            if (i.definedString(e) && Object.prototype.hasOwnProperty.call(C, e)) {
                nt(C[e].options);
            }
            return st;
        },
        moveToCurrentYear: function(e) {
            if (i.definedString(e) && Object.prototype.hasOwnProperty.call(C, e)) {
                const t = C[e].options;
                t._currentView.year = (new Date).getFullYear();
                if (!i.yearVisible(t, t._currentView.year)) {
                    nt(t, false);
                } else {
                    B(t);
                }
                c.customEvent(t.events.onSetYear, t._currentView.element, t._currentView.year);
            }
            return st;
        },
        getYear: function(e) {
            let t = -1;
            if (i.definedString(e) && Object.prototype.hasOwnProperty.call(C, e)) {
                t = C[e].options._currentView.year;
            }
            return t;
        },
        render: function(e, t) {
            if (i.definedObject(e) && i.definedObject(t)) {
                M(h.Options.getForNewInstance(x, t, e));
            }
            return st;
        },
        renderAll: function() {
            D();
            return st;
        },
        switchView: function(e, t) {
            if (i.definedString(e) && i.definedString(t) && Object.prototype.hasOwnProperty.call(C, e)) {
                const n = C[e].options;
                const i = m.View.get(t);
                if (i !== 0 && n._currentView.view !== i) {
                    Fe(n, i, t);
                }
            }
            return st;
        },
        switchType: function(e, t) {
            if (i.definedString(e) && i.definedString(t) && Object.prototype.hasOwnProperty.call(C, e) && Object.prototype.hasOwnProperty.call(C[e].typeData, t)) {
                const n = C[e].options;
                if (n._currentView.type !== t) {
                    n._currentView.type = t;
                    c.customEvent(n.events.onTypeSwitch, n._currentView.element, t);
                    B(n);
                }
            }
            return st;
        },
        updateOptions: function(e, t) {
            if (i.definedString(e) && i.definedObject(t) && Object.prototype.hasOwnProperty.call(C, e)) {
                const t = C[e].options;
                const n = h.Options.get(t);
                let i = false;
                for (const e in n) {
                    if (Object.prototype.hasOwnProperty.call(n, e) && Object.prototype.hasOwnProperty.call(t, e) && t[e] !== n[e]) {
                        t[e] = n[e];
                        i = true;
                    }
                }
                if (i) {
                    B(t, true);
                    c.customEvent(t.events.onRefresh, t._currentView.element);
                    c.customEvent(t.events.onOptionsUpdate, t._currentView.element, t);
                }
            }
            return st;
        },
        getActiveView: function(e) {
            let t = "";
            if (i.definedString(e) && Object.prototype.hasOwnProperty.call(C, e)) {
                t = m.View.getName(C[e].options);
            }
            return t;
        },
        destroyAll: function() {
            for (const e in C) {
                if (Object.prototype.hasOwnProperty.call(C, e)) {
                    it(C[e].options);
                }
            }
            C = {};
            return st;
        },
        destroy: function(e) {
            if (i.definedString(e) && Object.prototype.hasOwnProperty.call(C, e)) {
                it(C[e].options);
                delete C[e];
            }
            return st;
        },
        setConfiguration: function(e, t = true) {
            if (i.definedObject(e)) {
                const n = x;
                const i = e;
                let o = false;
                for (const e in i) {
                    if (Object.prototype.hasOwnProperty.call(i, e) && Object.prototype.hasOwnProperty.call(x, e) && n[e] !== i[e]) {
                        n[e] = i[e];
                        o = true;
                    }
                }
                if (o) {
                    x = f.Options.get(n);
                    ot();
                    if (t) {
                        st.refreshAll();
                    }
                }
            }
            return st;
        },
        getIds: function() {
            const e = [];
            for (const t in C) {
                if (Object.prototype.hasOwnProperty.call(C, t)) {
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
        x = f.Options.get();
        document.addEventListener("DOMContentLoaded", () => {
            ot();
            D();
        });
        window.addEventListener("pagehide", () => Xe());
        if (!i.defined(window.$heat)) {
            window.$heat = st;
        }
    })();
})();//# sourceMappingURL=heat.js.map