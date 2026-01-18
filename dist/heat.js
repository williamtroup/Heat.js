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
    e.LOCAL_STORAGE_START_ID = "HJS_";
    e.COLOR_RANGE_HOLIDAY_ID = "HOLIDAY";
    e.DEFAULT_MINIMUM_HEIGHT = 213;
    e.MAXIMUM_FILE_IMPORTS = 5;
    let t;
    (e => {
        e.HEAT_JS = "data-heat-js";
        let t;
        (e => {
            let t;
            (e => {
                e.HEAT_JS_DATE = "data-heat-js-map-date";
                e.HEAT_JS_MINIMUM = "data-heat-js-map-minimum";
                e.HEAT_JS_MONTH_NUMBER = "data-heat-js-map-month-number";
            })(t = e.Map || (e.Map = {}));
            let n;
            (e => {
                e.HEAT_JS_DATE = "data-heat-js-line-date";
                e.HEAT_JS_MINIMUM = "data-heat-js-line-minimum";
            })(n = e.Line || (e.Line = {}));
            let o;
            (e => {
                e.HEAT_JS_DATE = "data-heat-js-chart-date";
                e.HEAT_JS_MINIMUM = "data-heat-js-chart-minimum";
            })(o = e.Chart || (e.Chart = {}));
            let i;
            (e => {
                e.HEAT_JS_NUMBER = "data-heat-js-day-number";
            })(i = e.Days || (e.Days = {}));
            let r;
            (e => {
                e.HEAT_JS_NUMBER = "data-heat-js-month-number";
            })(r = e.Month || (e.Month = {}));
            let a;
            (e => {
                e.HEAT_JS_COLOR_RANGE_NAME = "data-heat-js-color-range-name";
                e.HEAT_JS_MINIMUM = "data-heat-js-color-range-minimum";
            })(a = e.ColorRanges || (e.ColorRanges = {}));
        })(t = e.View || (e.View = {}));
        let n;
        (e => {
            let t;
            (e => {
                e.HEAT_JS_MINIMUM = "data-heat-js-color-range-toggle-minimum";
            })(t = e.ColorRangeToggle || (e.ColorRangeToggle = {}));
        })(n = e.Area || (e.Area = {}));
    })(t = e.Attribute || (e.Attribute = {}));
})(n || (n = {}));

var o;

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
    function d(e) {
        return t(e) && document.contains(e);
    }
    e.definedParentElement = d;
    function u(t, n) {
        const o = {
            matched: false,
            name: null
        };
        const i = t.holidays.length;
        const r = n.getDate();
        const a = n.getMonth() + 1;
        const s = n.getFullYear();
        for (let n = 0; n < i; n++) {
            const i = t.holidays[n];
            if (e.definedString(i.date) && i.showInViews) {
                const e = i.date.split("/");
                if (e.length === 2) {
                    o.matched = r === parseInt(e[0]) && a === parseInt(e[1]);
                } else if (e.length === 3) {
                    o.matched = r === parseInt(e[0]) && a === parseInt(e[1]) && s === parseInt(e[2]);
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
    function w(e, t) {
        return e.indexOf(t + 1) > -1;
    }
    e.monthVisible = w;
    function g(e, t) {
        return e.indexOf(t) > -1;
    }
    e.dayVisible = g;
    function f(e, t) {
        return e.yearsToHide.indexOf(t) === -1 && (e._currentView.yearsAvailable.length === 0 || e._currentView.yearsAvailable.indexOf(t) > -1);
    }
    e.yearVisible = f;
    function h(e, t) {
        return e._currentView.yearsAvailable.length > 0 && t <= e._currentView.yearsAvailable[0];
    }
    e.firstVisibleYear = h;
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
})(o || (o = {}));

var i;

(e => {
    function t(e, t) {
        return typeof e === "string" ? e : t;
    }
    e.getAnyString = t;
    function n(e, t) {
        return o.definedString(e) ? e : t;
    }
    e.getString = n;
    function i(e, t) {
        return o.definedBoolean(e) ? e : t;
    }
    e.getBoolean = i;
    function r(e, t) {
        return o.definedNumber(e) ? e : t;
    }
    e.getNumber = r;
    function a(e, t, n, i) {
        return o.definedNumber(e) ? e >= t && e <= n ? e : i : i;
    }
    e.getNumberInRange = a;
    function s(e, t) {
        return o.definedFunction(e) ? e : t;
    }
    e.getFunction = s;
    function l(e, t) {
        return o.definedArray(e) ? e : t;
    }
    e.getArray = l;
    function c(e, t) {
        return o.definedObject(e) ? e : t;
    }
    e.getObject = c;
    function d(e, t) {
        let n = t;
        if (o.definedString(e)) {
            const o = e.toString().split(" ");
            if (o.length === 0) {
                e = t;
            } else {
                n = o;
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
            if (o.definedString(e)) {
                try {
                    n.object = JSON.parse(e);
                } catch {
                    n.object = JSON.parse(e.replace(/'/g, '"'));
                }
            }
        } catch (o) {
            try {
                n.object = w(e);
            } catch (e) {
                if (!t.safeMode) {
                    console.error(t.text.objectErrorText.replace("{{error_1}}", o.message).replace("{{error_2}}", e.message));
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
        let i = [];
        if (n.length > 1) {
            i = n[1].replace(")", "").replace(";", "").trim().split(",");
            if (i.length === 1 && i[0] === "") {
                i = [];
            }
        }
        const r = n[0].split(".");
        const a = r.pop();
        let s = globalThis;
        let l = true;
        for (const e of r) {
            s = s[e];
            if (!o.defined(s)) {
                l = false;
                break;
            }
        }
        if (l && o.definedFunction(s[a])) {
            t = s[a].apply(s, i);
        }
        return t;
    }
})(i || (i = {}));

var r;

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
})(r || (r = {}));

var a;

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
    function a(e, t, a, s = false, l = null) {
        let c = t;
        const d = o.definedNumber(l) ? l : n(a);
        const u = w(a);
        const g = i(e, a.getDate());
        c = c.replace("{dddd}", e.text.dayNames[d]);
        c = c.replace("{dd}", r.padNumber(a.getDate()));
        c = c.replace("{d}", a.getDate().toString());
        c = c.replace("{ww}", r.padNumber(u));
        c = c.replace("{w}", u.toString());
        if (s) {
            if (o.definedString(g)) {
                c = c.replace("{o}", `<sup>${g}</sup>`);
            } else {
                c = c.replace("{o}", "");
            }
        } else {
            c = c.replace("{o}", g);
        }
        c = c.replace("{mmmm}", e.text.monthNames[a.getMonth()]);
        c = c.replace("{mm}", r.padNumber(a.getMonth() + 1));
        c = c.replace("{m}", (a.getMonth() + 1).toString());
        c = c.replace("{yyyy}", a.getFullYear().toString());
        c = c.replace("{yyy}", a.getFullYear().toString().substring(1));
        c = c.replace("{yy}", a.getFullYear().toString().substring(2));
        c = c.replace("{y}", parseInt(a.getFullYear().toString().substring(2)).toString());
        return c;
    }
    e.getCustomFormattedDateText = a;
    function s(e) {
        return `${e.getFullYear()}${"-"}${r.padNumber(e.getMonth() + 1)}${"-"}${r.padNumber(e.getDate())}`;
    }
    e.toStorageDate = s;
    function l(e) {
        return e.split("-")[0];
    }
    e.getStorageDateYear = l;
    function c() {
        const e = new Date;
        const t = e.getDay();
        const n = (t === 0 ? -6 : 1) - t;
        const o = new Date(e);
        o.setDate(e.getDate() + n);
        return o;
    }
    e.getDateForMondayOfCurrentWeek = c;
    function d(e) {
        const t = new Date;
        return e.getDate() === t.getDate() && e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
    }
    e.isToday = d;
    function u(e) {
        const t = new Date;
        return e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
    }
    e.isCurrentMonthAndYear = u;
    function w(e) {
        const t = new Date(e.getFullYear(), e.getMonth(), e.getDate());
        const n = t.getDay() || 7;
        t.setDate(t.getDate() + 4 - n);
        const o = new Date(t.getFullYear(), 0, 1);
        const i = Math.ceil(((t.getTime() - o.getTime()) / 864e5 + 1) / 7);
        return i;
    }
    e.getWeekNumber = w;
})(a || (a = {}));

var s;

(e => {
    function t(e) {
        const t = e.toLowerCase();
        const n = document.createElement(t);
        return n;
    }
    e.createWithNoContainer = t;
    function n(e, t, n = "", i = null) {
        const r = t.toLowerCase();
        const a = document.createElement(r);
        if (o.defined(n)) {
            a.className = n;
        }
        if (o.defined(i)) {
            e.insertBefore(a, i);
        } else {
            e.appendChild(a);
        }
        return a;
    }
    e.create = n;
    function i(e, t, o, i, r = null) {
        const a = n(e, t, o, r);
        a.innerHTML = i;
        if (t === "button") {
            const e = a;
            e.type = "button";
        }
        return a;
    }
    e.createWithHTML = i;
    function r(e, t, i, r = null, a = null) {
        const s = n(e, t, i, a);
        s.type = "button";
        if (o.defined(r)) {
            s.innerHTML = r;
        }
        return s;
    }
    e.createButton = r;
    function a(t, o, i, r, a = null) {
        const s = n(t, o, i, a);
        s.type = "button";
        e.create(s, "i", r);
        return s;
    }
    e.createIconButton = a;
    function s(e, t, n = false) {
        const o = getComputedStyle(e);
        let i = o.getPropertyValue(t);
        if (n) {
            i = parseFloat(i);
            i = isNaN(i) ? 0 : i;
        }
        return i;
    }
    e.getStyleValueByName = s;
    function l(e, t) {
        const n = getComputedStyle(e);
        const o = n.getPropertyValue(t);
        const i = parseFloat(o);
        return o.replace(i.toString(), "");
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
    function g(e, t, n = "block") {
        let o = e.pageX;
        let i = e.pageY;
        const r = w();
        t.style.display = n;
        if (o + t.offsetWidth > window.innerWidth) {
            o -= t.offsetWidth;
        } else {
            o++;
        }
        if (i + t.offsetHeight > window.innerHeight) {
            i -= t.offsetHeight;
        } else {
            i++;
        }
        if (o < r.left) {
            o = e.pageX + 1;
        }
        if (i < r.top) {
            i = e.pageY + 1;
        }
        t.style.left = `${o}px`;
        t.style.top = `${i}px`;
    }
    e.showElementAtMousePosition = g;
    function f(e) {
        const t = Array.from(e.children);
        t.reverse();
        t.forEach(t => e.appendChild(t));
    }
    e.reverseChildrenOrder = f;
    function h(e, t, o) {
        const r = n(e, "div");
        const a = n(r, "label", "checkbox");
        const s = n(a, "input");
        s.type = "checkbox";
        s.name = o;
        n(a, "span", "check-mark");
        i(a, "span", "text", t);
        return s;
    }
    e.createCheckBox = h;
    function m(t, n) {
        const o = e.getStyleValueByName(t, "background-color");
        const i = e.getStyleValueByName(n, "background-color");
        n.style.background = `linear-gradient(to top, ${o}, ${i})`;
    }
    e.addGradientEffect = m;
})(s || (s = {}));

var l;

(e => {
    function t(e, ...t) {
        let n = null;
        if (o.definedFunction(e)) {
            n = e.apply(null, [].slice.call(t, 0));
        }
        return n;
    }
    e.customEvent = t;
})(l || (l = {}));

var c;

(e => {
    let t = 0;
    function n(e) {
        if (!o.defined(e._currentView.tooltip)) {
            const t = document.getElementsByClassName("heat-js-tooltip");
            const n = [].slice.call(t);
            if (n.length > 0) {
                e._currentView.tooltip = n[0];
            } else {
                e._currentView.tooltip = s.create(document.body, "div", "heat-js-tooltip");
                g(e);
            }
            e._currentView.tooltip.style.display = "none";
        }
    }
    e.render = n;
    function i(e, t, n) {
        if (e !== null) {
            e.onmousemove = e => d(e, t, n);
        }
    }
    e.add = i;
    function c(e, t, n, s, c, d, u, w, g, f, h) {
        if (o.definedFunction(w)) {
            i(n, t, l.customEvent(w, t._currentView.element, s, c, t._currentView.activeYear, g));
        } else {
            let l = a.getCustomFormattedDateText(e, u, s, true);
            if (t.showHolidaysInDayToolTips) {
                const e = o.holiday(t, s);
                if (e.matched && o.definedString(e.name)) {
                    l += `${":"}${" "}${e.name}`;
                }
            }
            if (f || h && o.definedString(d)) {
                l += `${":"}${" "}`;
            }
            if (f) {
                l += `<b class="tooltip-count">${r.friendlyNumber(c)}</b>`;
            }
            if (h && o.definedString(d)) {
                l += `<b class="tooltip-difference">${d}</b>`;
            }
            i(n, t, l);
        }
    }
    e.addForDay = c;
    function d(e, n, o) {
        s.cancelBubble(e);
        u(n);
        t = setTimeout(() => {
            n._currentView.tooltip.innerHTML = o;
            s.showElementAtMousePosition(e, n._currentView.tooltip, "flex");
        }, n.tooltip.delay);
    }
    e.show = d;
    function u(e) {
        if (o.defined(e._currentView.tooltip)) {
            if (t !== 0) {
                clearTimeout(t);
                t = 0;
            }
            if (e._currentView.tooltip.style.display !== "none") {
                e._currentView.tooltip.style.display = "none";
            }
        }
    }
    e.hide = u;
    function w(e) {
        if (o.defined(e._currentView.tooltip)) {
            const t = document.getElementsByClassName("heat-js");
            const n = [].slice.call(t);
            if (n.length === 0) {
                document.body.removeChild(e._currentView.tooltip);
            }
        }
    }
    e.remove = w;
    function g(e, t = true) {
        if (t) {
            window.addEventListener("mousemove", () => u(e));
            document.addEventListener("scroll", () => u(e));
        } else {
            window.removeEventListener("mousemove", () => u(e));
            document.removeEventListener("scroll", () => u(e));
        }
    }
})(c || (c = {}));

var d;

(e => {
    function t(e, t) {
        const n = e.indexOf(") ") > -1 ? `${e.split(") ")[0]})` : e;
        const o = n.replace("rgba(", "").replace("rgb(", "").replace(")", "").split(",");
        if (n.startsWith("rgba")) {
            o[o.length - 1] = t.toString();
        } else {
            o.push(t.toString());
        }
        return `rgba(${o.join()})`;
    }
    e.toRgbOpacityColor = t;
    function n(e) {
        const t = o(e);
        return `rgba(${t.red}, ${t.green}, ${t.blue}, ${t.alpha})`;
    }
    e.hexToRgba = n;
    function o(e) {
        const t = e.trim().replace("#", "");
        const n = parseInt(t.substring(0, 2), 16);
        const o = parseInt(t.substring(2, 4), 16);
        const i = parseInt(t.substring(4, 6), 16);
        let r = 1;
        if (e.length === 8) {
            r = parseInt(t.substring(6, 8), 16);
        }
        return {
            red: n,
            green: o,
            blue: i,
            alpha: r
        };
    }
    e.hexToRgbaValues = o;
    function i(e) {
        const t = Object.values(e.values).sort((e, t) => e.total - t.total);
        const n = t.length;
        const o = 1 / n;
        for (let i = 0; i < n; i++) {
            e.valueOpacities[t[i].total] = parseFloat((o * (i + 1)).toFixed(2));
        }
    }
    e.valuesToOpacitiesOrder = i;
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
        e.DefaultDynamicColor = "--heat-js-color-default-dynamic";
    })(t = e.Variables || (e.Variables = {}));
})(u || (u = {}));

var w;

(e => {
    function t(e, t) {
        const n = e.colorRanges.length;
        let o = false;
        for (let r = 0; r < n; r++) {
            const n = e.colorRanges[r];
            if (n.id === t) {
                n.visible = !i.getBoolean(n.visible, true);
                if (y(e, n)) {
                    o = true;
                }
                l.customEvent(e.events.onColorRangeTypeToggle, e._currentView.element, n.id, n.visible);
                break;
            }
        }
        return o;
    }
    e.toggleVisibleState = t;
    function a(e) {
        const t = e.colorRanges.length;
        let n = false;
        for (let o = 0; o < t; o++) {
            const t = e.colorRanges[o];
            t.visible = !t.visible;
            n = y(e, t);
            l.customEvent(e.events.onColorRangeTypeToggle, e._currentView.element, e.colorRanges[o].id, e.colorRanges[o].visible);
        }
        return n;
    }
    e.invertVisibleStates = a;
    function c(e, t) {
        let n = false;
        if (e.guide.useIncrementToggles) {
            const o = h(e);
            const i = o.length;
            if (t) {
                for (let r = 0; r < i; r++) {
                    const i = o[r];
                    if (!i.visible) {
                        i.visible = true;
                        n = y(e, i);
                        l.customEvent(e.events.onColorRangeTypeToggle, e._currentView.element, i.id, t);
                        break;
                    }
                }
            } else {
                for (let r = i; r--; ) {
                    const i = o[r];
                    if (i.visible) {
                        i.visible = false;
                        n = y(e, i);
                        l.customEvent(e.events.onColorRangeTypeToggle, e._currentView.element, i.id, t);
                        break;
                    }
                }
            }
        } else {
            const o = e.colorRanges.length;
            for (let i = 0; i < o; i++) {
                const o = e.colorRanges[i];
                o.visible = t;
                n = y(e, o);
                l.customEvent(e.events.onColorRangeTypeToggle, e._currentView.element, o.id, t);
            }
        }
        return n;
    }
    e.updateAllVisibleStates = c;
    function w(e, t) {
        let o = false;
        if (t === n.COLOR_RANGE_HOLIDAY_ID) {
            o = true;
        } else {
            const n = e.colorRanges.length;
            for (let r = 0; r < n; r++) {
                const n = e.colorRanges[r];
                if (n.id === t && i.getBoolean(n.visible, true)) {
                    o = true;
                    break;
                }
            }
        }
        return o;
    }
    e.isVisible = w;
    function g(e, t, i, r = null) {
        let a = null;
        if (o.defined(r) && o.holiday(e, r).matched) {
            a = {
                cssClassName: "holiday",
                id: n.COLOR_RANGE_HOLIDAY_ID,
                visible: true,
                minimum: 0
            };
        }
        if (!o.defined(a)) {
            const e = t.length;
            for (let n = 0; n < e; n++) {
                const e = t[n];
                if (i >= e.minimum) {
                    a = e;
                } else {
                    break;
                }
            }
        }
        return a;
    }
    e.get = g;
    function f(e, t) {
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
    e.getByMinimum = f;
    function h(e) {
        return e.colorRanges.sort((e, t) => e.minimum - t.minimum);
    }
    e.getAllSorted = h;
    function m(e) {
        const t = [];
        const n = d.hexToRgbaValues(e.color);
        const o = 100 / e.totalColors;
        const i = 1 / e.totalColors;
        const a = (e.maximumMinimum - e.startMinimum) / (e.totalColors - 1);
        const l = [];
        let c = n.red;
        let w = n.green;
        let g = n.blue;
        let f = i;
        let h = n.red;
        let m = n.green;
        let p = n.blue;
        let y = e.startMinimum;
        for (let s = 0; s < e.totalColors; s++) {
            const d = s + 1;
            const v = f + i > 1 ? 1 : f + i;
            const T = `rgba(${c}, ${w}, ${g}, ${f.toFixed(2)})`;
            const b = `rgba(${c}, ${w}, ${g}, ${v.toFixed(2)})`;
            const V = `rgb(${h}, ${m}, ${p})`;
            const _ = `day-color-${r.padNumber(d)}`;
            l.push(`div.${_} {`);
            l.push(`${"\t"}background-color: ${T} !important;`);
            l.push(`${"\t"}border-color: ${b} !important;`);
            l.push(`${"\t"}color: ${V} !important;`);
            l.push("}");
            l.push(`div.${_}:not(.no-hover):hover {`);
            l.push(`${"\t"}opacity: 0.7 !important;`);
            l.push("}");
            const C = {
                id: r.padNumber(d),
                name: `Day Color ${d}`,
                minimum: Math.round(y),
                cssClassName: _,
                tooltipText: `Day Color ${d}`,
                visible: true
            };
            const D = Math.round(n.red / 100 * (d * o));
            const x = Math.round(n.green / 100 * (d * o));
            const S = Math.round(n.blue / 100 * (d * o));
            if (s === e.totalColors - 1) {
                l.push(`:root {`);
                l.push(`${"\t"}${u.Variables.CheckBoxCheckedColor}: ${T};`);
                l.push(`${"\t"}${u.Variables.YearMenuCurrent}: ${T};`);
                l.push("}");
            } else {
                c = n.red + D;
                w = n.green + x;
                g = n.blue + S;
                f += i;
                h = n.red - D;
                m = n.green - x;
                p = n.blue - S;
                y += a;
                if (y > e.maximumMinimum) {
                    y = e.maximumMinimum;
                }
            }
            t.push(C);
        }
        const v = document.getElementsByTagName("head")[0];
        const T = s.create(v, "style");
        T.appendChild(document.createTextNode(l.join("\n")));
        return t;
    }
    e.buildDynamics = m;
    function p(e, t) {
        let n = t.cssClassName;
        if (e.views.map.enabled && e._currentView.activeView === 1 && o.definedString(t.mapCssClassName)) {
            n = t.mapCssClassName;
        } else if (e.views.line.enabled && e._currentView.activeView === 2 && o.definedString(t.lineCssClassName)) {
            n = t.lineCssClassName;
        } else if (e.views.chart.enabled && e._currentView.activeView === 3 && o.definedString(t.chartCssClassName)) {
            n = t.chartCssClassName;
        } else if (e.views.days.enabled && e._currentView.activeView === 4 && o.definedString(t.daysCssClassName)) {
            n = t.daysCssClassName;
        } else if (e.views.months.enabled && e._currentView.activeView === 5 && o.definedString(t.monthsCssClassName)) {
            n = t.monthsCssClassName;
        } else if (e.views.colorRanges.enabled && e._currentView.activeView === 6 && o.definedString(t.colorRangeCssClassName)) {
            n = t.colorRangeCssClassName;
        }
        return n;
    }
    e.getGuideCssClassName = p;
    function y(e, t) {
        let o = false;
        if (e._currentView.activeView === 1) {
            v(e, t, t.mapCssClassName, n.Attribute.View.Map.HEAT_JS_MINIMUM);
        } else if (e._currentView.activeView === 2) {
            v(e, t, t.lineCssClassName, n.Attribute.View.Line.HEAT_JS_MINIMUM);
        } else if (e._currentView.activeView === 3) {
            v(e, t, t.chartCssClassName, n.Attribute.View.Chart.HEAT_JS_MINIMUM);
        } else if (e._currentView.activeView === 6) {
            v(e, t, t.colorRangeCssClassName, n.Attribute.View.ColorRanges.HEAT_JS_MINIMUM);
        } else {
            o = true;
        }
        return o;
    }
    e.toggleForActiveView = y;
    function v(e, t, i, r) {
        const a = o.definedString(i) ? i : t.cssClassName;
        const l = e._currentView.element.getElementsByTagName("div");
        const c = [].slice.call(l);
        const d = c.length;
        for (let e = 0; e < d; e++) {
            const i = c[e];
            const l = i.getAttribute(r);
            const d = i.getAttribute(n.Attribute.Area.ColorRangeToggle.HEAT_JS_MINIMUM);
            const u = o.definedString(l) && l === t.minimum.toString();
            if (u || d === t.minimum.toString()) {
                if (t.visible) {
                    s.addClass(i, a);
                } else {
                    s.removeClass(i, a);
                }
            }
        }
    }
})(w || (w = {}));

var g;

(e => {
    let t;
    (e => {
        const t = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
        const n = [ 1, 2, 3, 4, 5, 6, 7 ];
        function a(e, t, n) {
            const i = l(t);
            i._currentView = {};
            i._currentView.element = n;
            i._currentView.activeYear = i.defaultYear;
            i._currentView.activeType = e.text.unknownTrendText;
            i._currentView.activeView = 0;
            i._currentView.configurationDialogDayCheckBoxes = [];
            i._currentView.configurationDialogMonthCheckBoxes = [];
            i._currentView.isInFetchMode = o.definedFunction(i.events.onDataFetch);
            i._currentView.isInFetchModeTimer = 0;
            i._currentView.yearsAvailable = [];
            i._currentView.dayWidth = 0;
            i._currentView.zoomLevel = -1;
            i._currentView.mapZoomIncrement = -1;
            i._currentView.lineZoomIncrement = -1;
            i._currentView.yearTextWidth = 0;
            i._currentView.viewsEnabled = 0;
            if (i.views.map.enabled) {
                i._currentView.mapContentsScrollLeft = 0;
                i._currentView.viewsEnabled++;
            }
            if (i.views.line.enabled) {
                i._currentView.lineContentsScrollLeft = 0;
                i._currentView.viewsEnabled++;
            }
            if (i.views.chart.enabled) {
                i._currentView.chartContentsScrollLeft = 0;
                i._currentView.viewsEnabled++;
            }
            if (i.views.days.enabled) {
                i._currentView.daysContentsScrollLeft = 0;
                i._currentView.viewsEnabled++;
            }
            if (i.views.months.enabled) {
                i._currentView.monthsContentsScrollLeft = 0;
                i._currentView.viewsEnabled++;
            }
            if (i.views.colorRanges.enabled) {
                i._currentView.colorRangesContentsScrollLeft = 0;
                i._currentView.viewsEnabled++;
            }
            M(i);
            return i;
        }
        e.getForNewInstance = a;
        function l(e) {
            const t = i.getObject(e, {});
            t.views = i.getObject(t.views, {});
            t.exportOnlyDataBeingViewed = i.getBoolean(t.exportOnlyDataBeingViewed, true);
            t.defaultYear = i.getNumber(t.defaultYear, (new Date).getFullYear());
            t.defaultView = i.getString(t.defaultView, "map");
            t.exportType = i.getString(t.exportType, "json");
            t.useLocalStorageForData = i.getBoolean(t.useLocalStorageForData, false);
            t.allowFileImports = i.getBoolean(t.allowFileImports, true);
            t.yearsToHide = i.getArray(t.yearsToHide, []);
            t.dataFetchDelay = i.getNumber(t.dataFetchDelay, 6e4);
            t.showOnlyDataForYearsAvailable = i.getBoolean(t.showOnlyDataForYearsAvailable, false);
            t.showHolidaysInDayToolTips = i.getBoolean(t.showHolidaysInDayToolTips, false);
            t.resizable = i.getBoolean(t.resizable, false);
            t.startMonth = i.getNumberInRange(t.startMonth, 0, 11, 0);
            t.allowMultipleFileImports = i.getBoolean(t.allowMultipleFileImports, true);
            t.percentageDecimalPoints = i.getNumber(t.percentageDecimalPoints, 2);
            t.chartsAnimationDelay = i.getNumber(t.chartsAnimationDelay, 50);
            t.exportDateTimeFormat = i.getString(t.exportDateTimeFormat, "{dddd}, {d}{o} {mmmm} {yyyy}");
            t.sideMenu = c(t);
            t.title = d(t);
            t.yearlyStatistics = g(t);
            t.views.map = f(t);
            t.views.line = h(t);
            t.views.chart = m(t);
            t.views.days = p(t);
            t.views.months = y(t);
            t.views.colorRanges = v(t);
            t.description = T(t);
            t.guide = b(t);
            t.tooltip = V(t);
            t.zooming = _(t);
            t.dynamicColorRange = C(t);
            t.colorRanges = D(t);
            t.holidays = x(t);
            t.events = S(t);
            if (t.startMonth > 0) {
                t.yearsToHide = [];
            }
            return t;
        }
        e.get = l;
        function c(e) {
            e.sideMenu = i.getObject(e.sideMenu, {});
            e.sideMenu.enabled = i.getBoolean(e.sideMenu.enabled, true);
            e.sideMenu.showToolTips = i.getBoolean(e.sideMenu.showToolTips, true);
            return e.sideMenu;
        }
        function d(e) {
            e.title = i.getObject(e.title, {});
            e.title.text = i.getString(e.title.text, "Heat.js");
            e.title.showText = i.getBoolean(e.title.showText, true);
            e.title.showYearSelector = i.getBoolean(e.title.showYearSelector, true);
            e.title.showRefreshButton = i.getBoolean(e.title.showRefreshButton, false);
            e.title.showExportButton = i.getBoolean(e.title.showExportButton, false);
            e.title.extraSelectionYears = i.getNumber(e.title.extraSelectionYears, 50);
            e.title.showYearSelectionDropDown = i.getBoolean(e.title.showYearSelectionDropDown, true);
            e.title.showImportButton = i.getBoolean(e.title.showImportButton, false);
            e.title.showConfigurationButton = i.getBoolean(e.title.showConfigurationButton, true);
            e.title.showTitleDropDownButton = i.getBoolean(e.title.showTitleDropDownButton, true);
            e.title.showTitleDropDownHeaders = i.getBoolean(e.title.showTitleDropDownHeaders, true);
            e.title.showCurrentYearButton = i.getBoolean(e.title.showCurrentYearButton, true);
            e.title.showSectionText = i.getBoolean(e.title.showSectionText, true);
            e.title.showToolTips = i.getBoolean(e.title.showToolTips, true);
            e.title.showClearButton = i.getBoolean(e.title.showClearButton, false);
            return e.title;
        }
        function g(e) {
            e.yearlyStatistics = i.getObject(e.yearlyStatistics, {});
            e.yearlyStatistics.enabled = i.getBoolean(e.yearlyStatistics.enabled, false);
            e.yearlyStatistics.showToday = i.getBoolean(e.yearlyStatistics.showToday, true);
            e.yearlyStatistics.showThisWeek = i.getBoolean(e.yearlyStatistics.showThisWeek, true);
            e.yearlyStatistics.showThisMonth = i.getBoolean(e.yearlyStatistics.showThisMonth, true);
            e.yearlyStatistics.showThisYear = i.getBoolean(e.yearlyStatistics.showThisYear, true);
            e.yearlyStatistics.showOnlyForCurrentYear = i.getBoolean(e.yearlyStatistics.showOnlyForCurrentYear, false);
            e.yearlyStatistics.showPercentages = i.getBoolean(e.yearlyStatistics.showPercentages, true);
            return e.yearlyStatistics;
        }
        function f(e) {
            e.views.map = i.getObject(e.views.map, {});
            e.views.map.enabled = i.getBoolean(e.views.map.enabled, true);
            e.views.map.showMonthDayGaps = i.getBoolean(e.views.map.showMonthDayGaps, true);
            e.views.map.showDayNames = i.getBoolean(e.views.map.showDayNames, true);
            e.views.map.placeMonthNamesOnTheBottom = i.getBoolean(e.views.map.placeMonthNamesOnTheBottom, false);
            e.views.map.showDayCounts = i.getBoolean(e.views.map.showDayCounts, false);
            e.views.map.showMonthNames = i.getBoolean(e.views.map.showMonthNames, true);
            e.views.map.showDaysInReverseOrder = i.getBoolean(e.views.map.showDaysInReverseOrder, false);
            e.views.map.showMinimalDayNames = i.getBoolean(e.views.map.showMinimalDayNames, false);
            e.views.map.showMonthsInReverseOrder = i.getBoolean(e.views.map.showMonthsInReverseOrder, false);
            e.views.map.keepScrollPositions = i.getBoolean(e.views.map.keepScrollPositions, false);
            e.views.map.showDayDateNumbers = i.getBoolean(e.views.map.showDayDateNumbers, false);
            e.views.map.showToolTips = i.getBoolean(e.views.map.showToolTips, true);
            e.views.map.highlightCurrentDay = i.getBoolean(e.views.map.highlightCurrentDay, false);
            e.views.map.dayToolTipText = i.getString(e.views.map.dayToolTipText, "{dddd}, {d}{o} {mmmm} {yyyy}");
            e.views.map.showYearsInMonthNames = i.getBoolean(e.views.map.showYearsInMonthNames, true);
            e.views.map.showCountsInToolTips = i.getBoolean(e.views.map.showCountsInToolTips, true);
            e.views.map.showSpacing = i.getBoolean(e.views.map.showSpacing, true);
            e.views.map.showDifferences = i.getBoolean(e.views.map.showDifferences, false);
            e.views.map.showDifferencesInToolTips = i.getBoolean(e.views.map.showDifferencesInToolTips, true);
            if (o.invalidOptionArray(e.views.map.monthsToShow)) {
                e.views.map.monthsToShow = t;
            }
            if (o.invalidOptionArray(e.views.map.daysToShow)) {
                e.views.map.daysToShow = n;
            }
            return e.views.map;
        }
        function h(e) {
            e.views.line = i.getObject(e.views.line, {});
            e.views.line.enabled = i.getBoolean(e.views.line.enabled, true);
            e.views.line.showMonthNames = i.getBoolean(e.views.line.showMonthNames, true);
            e.views.line.showInReverseOrder = i.getBoolean(e.views.line.showInReverseOrder, false);
            e.views.line.keepScrollPositions = i.getBoolean(e.views.line.keepScrollPositions, false);
            e.views.line.showYearsInMonthNames = i.getBoolean(e.views.line.showYearsInMonthNames, true);
            e.views.line.showToolTips = i.getBoolean(e.views.line.showToolTips, true);
            e.views.line.dayToolTipText = i.getString(e.views.line.dayToolTipText, "{dddd}, {d}{o} {mmmm} {yyyy}");
            e.views.line.showCountsInToolTips = i.getBoolean(e.views.line.showCountsInToolTips, true);
            e.views.line.showDifferencesInToolTips = i.getBoolean(e.views.line.showDifferencesInToolTips, true);
            if (o.invalidOptionArray(e.views.line.monthsToShow)) {
                e.views.line.monthsToShow = t;
            }
            if (o.invalidOptionArray(e.views.line.daysToShow)) {
                e.views.line.daysToShow = n;
            }
            return e.views.line;
        }
        function m(e) {
            e.views.chart = i.getObject(e.views.chart, {});
            e.views.chart.enabled = i.getBoolean(e.views.chart.enabled, true);
            e.views.chart.showChartYLabels = i.getBoolean(e.views.chart.showChartYLabels, true);
            e.views.chart.showMonthNames = i.getBoolean(e.views.chart.showMonthNames, true);
            e.views.chart.showLineCounts = i.getBoolean(e.views.chart.showLineCounts, false);
            e.views.chart.showInReverseOrder = i.getBoolean(e.views.chart.showInReverseOrder, false);
            e.views.chart.keepScrollPositions = i.getBoolean(e.views.chart.keepScrollPositions, false);
            e.views.chart.showLineDateNumbers = i.getBoolean(e.views.chart.showLineDateNumbers, false);
            e.views.chart.showToolTips = i.getBoolean(e.views.chart.showToolTips, true);
            e.views.chart.useGradients = i.getBoolean(e.views.chart.useGradients, false);
            e.views.chart.highlightCurrentDay = i.getBoolean(e.views.chart.highlightCurrentDay, false);
            e.views.chart.dayToolTipText = i.getString(e.views.chart.dayToolTipText, "{dddd}, {d}{o} {mmmm} {yyyy}");
            e.views.chart.showYearsInMonthNames = i.getBoolean(e.views.chart.showYearsInMonthNames, true);
            e.views.chart.showCountsInToolTips = i.getBoolean(e.views.chart.showCountsInToolTips, true);
            e.views.chart.addMonthSpacing = i.getBoolean(e.views.chart.addMonthSpacing, false);
            e.views.chart.showDifferences = i.getBoolean(e.views.chart.showDifferences, false);
            e.views.chart.showDifferencesInToolTips = i.getBoolean(e.views.chart.showDifferencesInToolTips, true);
            if (o.invalidOptionArray(e.views.chart.monthsToShow)) {
                e.views.chart.monthsToShow = t;
            }
            if (o.invalidOptionArray(e.views.chart.daysToShow)) {
                e.views.chart.daysToShow = n;
            }
            return e.views.chart;
        }
        function p(e) {
            e.views.days = i.getObject(e.views.days, {});
            e.views.days.enabled = i.getBoolean(e.views.days.enabled, true);
            e.views.days.showChartYLabels = i.getBoolean(e.views.days.showChartYLabels, true);
            e.views.days.showDayNames = i.getBoolean(e.views.days.showDayNames, true);
            e.views.days.showInReverseOrder = i.getBoolean(e.views.days.showInReverseOrder, false);
            e.views.days.showDayCounts = i.getBoolean(e.views.days.showDayCounts, false);
            e.views.days.keepScrollPositions = i.getBoolean(e.views.days.keepScrollPositions, false);
            e.views.days.showToolTips = i.getBoolean(e.views.days.showToolTips, true);
            e.views.days.useGradients = i.getBoolean(e.views.days.useGradients, false);
            e.views.days.useDifferentOpacities = i.getBoolean(e.views.days.useDifferentOpacities, false);
            e.views.days.showDayCountPercentages = i.getBoolean(e.views.days.showDayCountPercentages, true);
            e.views.days.showStackedColorRanges = i.getBoolean(e.views.days.showStackedColorRanges, true);
            e.views.days.dayToolTipText = i.getString(e.views.days.dayToolTipText, "{dddd} {yyyy}");
            if (o.invalidOptionArray(e.views.days.monthsToShow)) {
                e.views.days.monthsToShow = t;
            }
            if (o.invalidOptionArray(e.views.days.daysToShow)) {
                e.views.days.daysToShow = n;
            }
            return e.views.days;
        }
        function y(e) {
            e.views.months = i.getObject(e.views.months, {});
            e.views.months.enabled = i.getBoolean(e.views.months.enabled, true);
            e.views.months.showChartYLabels = i.getBoolean(e.views.months.showChartYLabels, true);
            e.views.months.showMonthNames = i.getBoolean(e.views.months.showMonthNames, true);
            e.views.months.showInReverseOrder = i.getBoolean(e.views.months.showInReverseOrder, false);
            e.views.months.showMonthCounts = i.getBoolean(e.views.months.showMonthCounts, false);
            e.views.months.keepScrollPositions = i.getBoolean(e.views.months.keepScrollPositions, false);
            e.views.months.showToolTips = i.getBoolean(e.views.months.showToolTips, true);
            e.views.months.useGradients = i.getBoolean(e.views.months.useGradients, false);
            e.views.months.useDifferentOpacities = i.getBoolean(e.views.months.useDifferentOpacities, false);
            e.views.months.highlightCurrentMonth = i.getBoolean(e.views.months.highlightCurrentMonth, false);
            e.views.months.showMonthCountPercentages = i.getBoolean(e.views.months.showMonthCountPercentages, true);
            e.views.months.showStackedColorRanges = i.getBoolean(e.views.months.showStackedColorRanges, true);
            e.views.months.monthToolTipText = i.getString(e.views.months.monthToolTipText, "{mmmm} {yyyy}");
            if (o.invalidOptionArray(e.views.months.monthsToShow)) {
                e.views.months.monthsToShow = t;
            }
            if (o.invalidOptionArray(e.views.months.daysToShow)) {
                e.views.months.daysToShow = n;
            }
            return e.views.months;
        }
        function v(e) {
            e.views.colorRanges = i.getObject(e.views.colorRanges, {});
            e.views.colorRanges.enabled = i.getBoolean(e.views.colorRanges.enabled, true);
            e.views.colorRanges.showChartYLabels = i.getBoolean(e.views.colorRanges.showChartYLabels, true);
            e.views.colorRanges.showColorRangeLabels = i.getBoolean(e.views.colorRanges.showColorRangeLabels, true);
            e.views.colorRanges.useColorRangeNamesForLabels = i.getBoolean(e.views.colorRanges.useColorRangeNamesForLabels, false);
            e.views.colorRanges.showRangeCounts = i.getBoolean(e.views.colorRanges.showRangeCounts, false);
            e.views.colorRanges.showInReverseOrder = i.getBoolean(e.views.colorRanges.showInReverseOrder, false);
            e.views.colorRanges.keepScrollPositions = i.getBoolean(e.views.colorRanges.keepScrollPositions, false);
            e.views.colorRanges.showToolTips = i.getBoolean(e.views.colorRanges.showToolTips, true);
            e.views.colorRanges.useGradients = i.getBoolean(e.views.colorRanges.useGradients, false);
            e.views.colorRanges.showRangeCountPercentages = i.getBoolean(e.views.colorRanges.showRangeCountPercentages, true);
            e.views.colorRanges.showRangeNamesInToolTips = i.getBoolean(e.views.colorRanges.showRangeNamesInToolTips, true);
            if (o.invalidOptionArray(e.views.colorRanges.monthsToShow)) {
                e.views.colorRanges.monthsToShow = t;
            }
            if (o.invalidOptionArray(e.views.colorRanges.daysToShow)) {
                e.views.colorRanges.daysToShow = n;
            }
            return e.views.colorRanges;
        }
        function T(e) {
            e.description = i.getObject(e.description, {});
            e.description.text = i.getString(e.description.text, "");
            e.description.url = i.getString(e.description.url, "");
            e.description.urlTarget = i.getString(e.description.urlTarget, "_blank");
            return e.description;
        }
        function b(e) {
            e.guide = i.getObject(e.guide, {});
            e.guide.enabled = i.getBoolean(e.guide.enabled, true);
            e.guide.colorRangeTogglesEnabled = i.getBoolean(e.guide.colorRangeTogglesEnabled, true);
            e.guide.showLessAndMoreLabels = i.getBoolean(e.guide.showLessAndMoreLabels, true);
            e.guide.showNumbersInGuide = i.getBoolean(e.guide.showNumbersInGuide, false);
            e.guide.showToolTips = i.getBoolean(e.guide.showToolTips, true);
            e.guide.showInvertLabel = i.getBoolean(e.guide.showInvertLabel, false);
            e.guide.useIncrementToggles = i.getBoolean(e.guide.useIncrementToggles, false);
            e.guide.allowTypeAdding = i.getBoolean(e.guide.allowTypeAdding, false);
            e.guide.allowTypeRemoving = i.getBoolean(e.guide.allowTypeRemoving, false);
            return e.guide;
        }
        function V(e) {
            e.tooltip = i.getObject(e.tooltip, {});
            e.tooltip.delay = i.getNumber(e.tooltip.delay, 750);
            return e.tooltip;
        }
        function _(e) {
            e.zooming = i.getObject(e.zooming, {});
            e.zooming.enabled = i.getBoolean(e.zooming.enabled, false);
            e.zooming.defaultLevel = i.getNumber(e.zooming.defaultLevel, 0);
            e.zooming.maximumLevel = i.getNumber(e.zooming.maximumLevel, 0);
            e.zooming.showCloseButton = i.getBoolean(e.zooming.showCloseButton, true);
            e.zooming.showResetButton = i.getBoolean(e.zooming.showResetButton, false);
            return e.zooming;
        }
        function C(e) {
            const t = s.getStyleValueByName(document.documentElement, u.Variables.DefaultDynamicColor);
            e.dynamicColorRange = i.getObject(e.dynamicColorRange, {});
            e.dynamicColorRange.enabled = i.getBoolean(e.dynamicColorRange.enabled, false);
            e.dynamicColorRange.maximumMinimum = i.getNumber(e.dynamicColorRange.maximumMinimum, 25);
            e.dynamicColorRange.color = i.getString(e.dynamicColorRange.color, t);
            e.dynamicColorRange.totalColors = i.getNumber(e.dynamicColorRange.totalColors, 5);
            e.dynamicColorRange.startMinimum = i.getNumber(e.dynamicColorRange.startMinimum, 10);
            return e.dynamicColorRange;
        }
        function D(e) {
            let t = [];
            if (e.dynamicColorRange.enabled && o.hexColor(e.dynamicColorRange.color)) {
                t = w.buildDynamics(e.dynamicColorRange);
            } else {
                if (o.definedArray(e.colorRanges)) {
                    const n = e.colorRanges.length;
                    for (let o = 0; o < n; o++) {
                        const n = e.colorRanges[o];
                        n.id = i.getString(n.id, crypto.randomUUID());
                        n.name = i.getString(n.name, "");
                        n.minimum = i.getNumber(n.minimum, 0);
                        n.cssClassName = i.getString(n.cssClassName, "");
                        n.mapCssClassName = i.getString(n.mapCssClassName, "");
                        n.lineCssClassName = i.getString(n.lineCssClassName, "");
                        n.chartCssClassName = i.getString(n.chartCssClassName, "");
                        n.daysCssClassName = i.getString(n.daysCssClassName, "");
                        n.monthsCssClassName = i.getString(n.monthsCssClassName, "");
                        n.colorRangeCssClassName = i.getString(n.colorRangeCssClassName, "");
                        n.tooltipText = i.getString(n.tooltipText, "");
                        n.visible = i.getBoolean(n.visible, true);
                        t.push(n);
                    }
                } else {
                    t = [ {
                        id: r.padNumber(1),
                        name: "Day Color 1",
                        minimum: 10,
                        cssClassName: "day-color-1",
                        tooltipText: "Day Color 1",
                        visible: true
                    }, {
                        id: r.padNumber(2),
                        name: "Day Color 2",
                        minimum: 15,
                        cssClassName: "day-color-2",
                        tooltipText: "Day Color 2",
                        visible: true
                    }, {
                        id: r.padNumber(3),
                        name: "Day Color 3",
                        minimum: 20,
                        cssClassName: "day-color-3",
                        tooltipText: "Day Color 3",
                        visible: true
                    }, {
                        id: r.padNumber(4),
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
        function x(e) {
            const t = [];
            if (o.definedArray(e.holidays)) {
                const n = e.holidays.length;
                for (let o = 0; o < n; o++) {
                    const n = e.holidays[o];
                    n.date = i.getString(n.date, "");
                    n.name = i.getString(n.name, "");
                    n.showInViews = i.getBoolean(n.showInViews, true);
                    t.push(n);
                }
            }
            return t;
        }
        function S(e) {
            e.events = i.getObject(e.events, {});
            e.events.onBackYear = i.getFunction(e.events.onBackYear, null);
            e.events.onNextYear = i.getFunction(e.events.onNextYear, null);
            e.events.onRefresh = i.getFunction(e.events.onRefresh, null);
            e.events.onBeforeRender = i.getFunction(e.events.onBeforeRender, null);
            e.events.onRenderComplete = i.getFunction(e.events.onRenderComplete, null);
            e.events.onDestroy = i.getFunction(e.events.onDestroy, null);
            e.events.onExport = i.getFunction(e.events.onExport, null);
            e.events.onSetYear = i.getFunction(e.events.onSetYear, null);
            e.events.onTypeSwitch = i.getFunction(e.events.onTypeSwitch, null);
            e.events.onMapDayToolTipRender = i.getFunction(e.events.onMapDayToolTipRender, null);
            e.events.onLineDayToolTipRender = i.getFunction(e.events.onLineDayToolTipRender, e.events.onMapDayToolTipRender);
            e.events.onChartDayToolTipRender = i.getFunction(e.events.onChartDayToolTipRender, e.events.onMapDayToolTipRender);
            e.events.onAddDate = i.getFunction(e.events.onAddDate, null);
            e.events.onRemoveDate = i.getFunction(e.events.onRemoveDate, null);
            e.events.onReset = i.getFunction(e.events.onReset, null);
            e.events.onViewSwitch = i.getFunction(e.events.onViewSwitch, null);
            e.events.onColorRangeTypeToggle = i.getFunction(e.events.onColorRangeTypeToggle, null);
            e.events.onImport = i.getFunction(e.events.onImport, null);
            e.events.onDataFetch = i.getFunction(e.events.onDataFetch, null);
            e.events.onClearDate = i.getFunction(e.events.onClearDate, null);
            e.events.onUpdateDate = i.getFunction(e.events.onUpdateDate, null);
            e.events.onBindingOptionsUpdate = i.getFunction(e.events.onBindingOptionsUpdate, null);
            e.events.onMapDayClick = i.getFunction(e.events.onMapDayClick, null);
            e.events.onMapDayDblClick = i.getFunction(e.events.onMapDayDblClick, null);
            e.events.onLineDayClick = i.getFunction(e.events.onLineDayClick, e.events.onMapDayClick);
            e.events.onLineDayDblClick = i.getFunction(e.events.onLineDayDblClick, e.events.onMapDayDblClick);
            e.events.onChartDayClick = i.getFunction(e.events.onChartDayClick, e.events.onMapDayClick);
            e.events.onChartDayDblClick = i.getFunction(e.events.onChartDayDblClick, e.events.onMapDayDblClick);
            e.events.onWeekDayClick = i.getFunction(e.events.onWeekDayClick, null);
            e.events.onWeekDayDblClick = i.getFunction(e.events.onWeekDayDblClick, null);
            e.events.onMonthClick = i.getFunction(e.events.onMonthClick, null);
            e.events.onMonthDblClick = i.getFunction(e.events.onMonthDblClick, null);
            e.events.onColorRangeClick = i.getFunction(e.events.onColorRangeClick, null);
            e.events.onColorRangeDblClick = i.getFunction(e.events.onColorRangeDblClick, null);
            e.events.onZoomLevelChange = i.getFunction(e.events.onZoomLevelChange, null);
            e.events.onClearViewableData = i.getFunction(e.events.onClearViewableData, null);
            e.events.onAddType = i.getFunction(e.events.onAddType, null);
            e.events.onRemoveType = i.getFunction(e.events.onRemoveType, null);
            return e.events;
        }
        function M(e) {
            if (e.views.map.enabled && e.defaultView === "map") {
                e._currentView.activeView = 1;
            } else if (e.views.line.enabled && e.defaultView === "line") {
                e._currentView.activeView = 2;
            } else if (e.views.chart.enabled && e.defaultView === "chart") {
                e._currentView.activeView = 3;
            } else if (e.views.days.enabled && e.defaultView === "days") {
                e._currentView.activeView = 4;
            } else if (e.views.months.enabled && e.defaultView === "months") {
                e._currentView.activeView = 5;
            } else if (e.views.colorRanges.enabled && e.defaultView === "color-ranges") {
                e._currentView.activeView = 6;
            }
            if (e._currentView.activeView === 0) {
                if (e.views.map.enabled) {
                    e._currentView.activeView = 1;
                } else if (e.views.line.enabled) {
                    e._currentView.activeView = 2;
                } else if (e.views.chart.enabled) {
                    e._currentView.activeView = 3;
                } else if (e.views.days.enabled) {
                    e._currentView.activeView = 4;
                } else if (e.views.months.enabled) {
                    e._currentView.activeView = 5;
                } else if (e.views.colorRanges.enabled) {
                    e._currentView.activeView = 6;
                }
                if (e._currentView.activeView === 0) {
                    e.views.map.enabled = true;
                    e._currentView.activeView = 1;
                }
            }
        }
    })(t = e.Options || (e.Options = {}));
})(g || (g = {}));

var f;

(e => {
    let t;
    (e => {
        function t(e = null) {
            const t = i.getObject(e, {});
            t.safeMode = i.getBoolean(t.safeMode, true);
            t.observationMode = i.getBoolean(t.observationMode, true);
            t.domElementTypes = i.getStringOrArray(t.domElementTypes, [ "*" ]);
            t.text = n(t.text);
            return t;
        }
        e.get = t;
        function n(e) {
            e = i.getObject(e, {});
            e.stText = i.getAnyString(e.stText, "st");
            e.ndText = i.getAnyString(e.ndText, "nd");
            e.rdText = i.getAnyString(e.rdText, "rd");
            e.thText = i.getAnyString(e.thText, "th");
            e.backButtonText = i.getAnyString(e.backButtonText, "Back");
            e.nextButtonText = i.getAnyString(e.nextButtonText, "Next");
            e.refreshButtonText = i.getAnyString(e.refreshButtonText, "Refresh");
            e.exportButtonText = i.getAnyString(e.exportButtonText, "Export");
            e.lessText = i.getAnyString(e.lessText, "Less");
            e.moreText = i.getAnyString(e.moreText, "More");
            e.dateText = i.getAnyString(e.dateText, "Date");
            e.countText = i.getAnyString(e.countText, "Count");
            e.mapText = i.getAnyString(e.mapText, "Map");
            e.chartText = i.getAnyString(e.chartText, "Chart");
            e.noChartDataMessage = i.getAnyString(e.noChartDataMessage, "There is currently no data to view.");
            e.statisticsText = i.getAnyString(e.statisticsText, "Statistics");
            e.noColorRangesDataMessage = i.getAnyString(e.noColorRangesDataMessage, "There are currently no color ranges to view.");
            e.unknownTrendText = i.getAnyString(e.unknownTrendText, "Unknown");
            e.importButtonText = i.getAnyString(e.importButtonText, "Import");
            e.noMapDataMessage = i.getAnyString(e.noMapDataMessage, "There is currently no data to view.");
            e.objectErrorText = i.getAnyString(e.objectErrorText, "Errors in object: {{error_1}}, {{error_2}}");
            e.attributeNotValidErrorText = i.getAnyString(e.attributeNotValidErrorText, "The attribute '{{attribute_name}}' is not a valid object.");
            e.attributeNotSetErrorText = i.getAnyString(e.attributeNotSetErrorText, "The attribute '{{attribute_name}}' has not been set correctly.");
            e.closeButtonText = i.getAnyString(e.closeButtonText, "Close");
            e.configurationButtonText = i.getAnyString(e.configurationButtonText, "Configuration");
            e.configurationTitleText = i.getAnyString(e.configurationTitleText, "Configuration");
            e.visibleMonthsText = i.getAnyString(e.visibleMonthsText, "Visible Months");
            e.visibleDaysText = i.getAnyString(e.visibleDaysText, "Visible Days");
            e.dataText = i.getAnyString(e.dataText, "Data");
            e.colorRangesText = i.getAnyString(e.colorRangesText, "Color Ranges");
            e.yearText = i.getAnyString(e.yearText, "Year");
            e.daysText = i.getAnyString(e.daysText, "Days");
            e.noDaysDataMessage = i.getAnyString(e.noDaysDataMessage, "There are currently no days to view.");
            e.currentYearText = i.getAnyString(e.currentYearText, "Current Year");
            e.todayText = i.getAnyString(e.todayText, "Today");
            e.thisWeekText = i.getAnyString(e.thisWeekText, "This Week");
            e.thisMonthText = i.getAnyString(e.thisMonthText, "This Month");
            e.thisYearText = i.getAnyString(e.thisYearText, "This Year");
            e.unavailableText = i.getAnyString(e.unavailableText, "Unavailable");
            e.monthsText = i.getAnyString(e.monthsText, "Months");
            e.noMonthsDataMessage = i.getAnyString(e.noMonthsDataMessage, "There are currently no months to view.");
            e.selectTypeText = i.getAnyString(e.selectTypeText, "Select Type");
            e.filenamePlaceholderText = i.getAnyString(e.filenamePlaceholderText, "Filename (optional)");
            e.onlyDataBeingViewedText = i.getAnyString(e.onlyDataBeingViewedText, "Only data being viewed");
            e.zoomInText = i.getAnyString(e.zoomInText, "Zoom In");
            e.zoomOutText = i.getAnyString(e.zoomOutText, "Zoom Out");
            e.clearButtonText = i.getAnyString(e.clearButtonText, "Clear");
            e.selectFilesText = i.getAnyString(e.selectFilesText, "Select File(s)");
            e.dragAndDropFilesText = i.getAnyString(e.dragAndDropFilesText, "Drag and drop your file(s) here ...");
            e.addTypeText = i.getAnyString(e.addTypeText, "Add Type");
            e.typePlaceholderText = i.getAnyString(e.typePlaceholderText, "Type");
            e.addButtonText = i.getAnyString(e.addButtonText, "Add");
            e.removeButtonText = i.getAnyString(e.removeButtonText, "Remove");
            e.invertText = i.getAnyString(e.invertText, "Invert");
            e.lineText = i.getAnyString(e.lineText, "Line");
            e.noLineDataMessage = i.getAnyString(e.noLineDataMessage, "There is currently no data to view.");
            e.removeTypeText = i.getAnyString(e.removeTypeText, "Remove Type");
            e.openNewTypeText = i.getAnyString(e.openNewTypeText, "Open new type");
            e.clearExistingDataText = i.getAnyString(e.clearExistingDataText, "Clear existing data");
            e.browseButtonText = i.getAnyString(e.browseButtonText, "Browse");
            e.saveButtonText = i.getAnyString(e.saveButtonText, "Save");
            e.resetButtonText = i.getAnyString(e.resetButtonText, "Reset");
            e.copyButtonText = i.getAnyString(e.copyButtonText, "Copy");
            e.yesButtonText = i.getAnyString(e.yesButtonText, "Yes");
            e.noButtonText = i.getAnyString(e.noButtonText, "No");
            e.confirmText = i.getAnyString(e.confirmText, "Confirm");
            e.clearDataConfirmText = i.getAnyString(e.clearDataConfirmText, "Are you sure you want to clear the data?");
            e.removeTypeConfirmText = i.getAnyString(e.removeTypeConfirmText, "Are you sure you want to remove this type?");
            e = r(e);
            return e;
        }
        e.getText = n;
        function r(e) {
            if (o.invalidOptionArray(e.monthNames, 12)) {
                e.monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
            }
            if (o.invalidOptionArray(e.dayNames, 7)) {
                e.dayNames = [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ];
            }
            return e;
        }
    })(t = e.Options || (e.Options = {}));
})(f || (f = {}));

var h;

(e => {
    let t;
    (e => {
        function t(e) {
            if (!o.definedParentElement(e._currentView.disabledBackground)) {
                e._currentView.disabledBackground = s.create(e._currentView.element, "div", "disabled");
                if (e.showSideMenu) {
                    s.addClass(e._currentView.disabledBackground, "full-view");
                }
            }
        }
        e.render = t;
        function n(e) {
            if (o.defined(e._currentView.disabledBackground) && e._currentView.disabledBackground.style.display !== "block") {
                e._currentView.disabledBackground.style.display = "block";
            }
        }
        e.show = n;
        function i(e) {
            if (o.defined(e._currentView.disabledBackground) && e._currentView.disabledBackground.style.display !== "none") {
                e._currentView.disabledBackground.style.display = "none";
            }
        }
        e.hide = i;
    })(t = e.Background || (e.Background = {}));
})(h || (h = {}));

var m;

(e => {
    let t;
    (e => {
        function t(e) {
            let t = [];
            if (e.views.map.enabled && e._currentView.activeView === 1) {
                t = e.views.map.monthsToShow;
            } else if (e.views.line.enabled && e._currentView.activeView === 2) {
                t = e.views.line.monthsToShow;
            } else if (e.views.chart.enabled && e._currentView.activeView === 3) {
                t = e.views.chart.monthsToShow;
            } else if (e.views.days.enabled && e._currentView.activeView === 4) {
                t = e.views.days.monthsToShow;
            } else if (e.views.months.enabled && e._currentView.activeView === 5) {
                t = e.views.months.monthsToShow;
            } else if (e.views.colorRanges.enabled && e._currentView.activeView === 6) {
                t = e.views.colorRanges.monthsToShow;
            }
            return t;
        }
        e.get = t;
        function n(e, t) {
            if (e.views.map.enabled && e._currentView.activeView === 1) {
                e.views.map.monthsToShow = t;
            } else if (e.views.line.enabled && e._currentView.activeView === 2) {
                e.views.line.monthsToShow = t;
            } else if (e.views.chart.enabled && e._currentView.activeView === 3) {
                e.views.chart.monthsToShow = t;
            } else if (e.views.days.enabled && e._currentView.activeView === 4) {
                e.views.days.monthsToShow = t;
            } else if (e.views.months.enabled && e._currentView.activeView === 5) {
                e.views.months.monthsToShow = t;
            } else if (e.views.colorRanges.enabled && e._currentView.activeView === 6) {
                e.views.colorRanges.monthsToShow = t;
            }
        }
        e.set = n;
    })(t = e.Months || (e.Months = {}));
    let n;
    (e => {
        function t(e) {
            let t = [];
            if (e.views.map.enabled && e._currentView.activeView === 1) {
                t = e.views.map.daysToShow;
            } else if (e.views.line.enabled && e._currentView.activeView === 2) {
                t = e.views.line.daysToShow;
            } else if (e.views.chart.enabled && e._currentView.activeView === 3) {
                t = e.views.chart.daysToShow;
            } else if (e.views.days.enabled && e._currentView.activeView === 4) {
                t = e.views.days.daysToShow;
            } else if (e.views.months.enabled && e._currentView.activeView === 5) {
                t = e.views.months.daysToShow;
            } else if (e.views.colorRanges.enabled && e._currentView.activeView === 6) {
                t = e.views.colorRanges.daysToShow;
            }
            return t;
        }
        e.get = t;
        function n(e, t) {
            if (e.views.map.enabled && e._currentView.activeView === 1) {
                e.views.map.daysToShow = t;
            } else if (e.views.line.enabled && e._currentView.activeView === 2) {
                e.views.line.daysToShow = t;
            } else if (e.views.chart.enabled && e._currentView.activeView === 3) {
                e.views.chart.daysToShow = t;
            } else if (e.views.days.enabled && e._currentView.activeView === 4) {
                e.views.days.daysToShow = t;
            } else if (e.views.months.enabled && e._currentView.activeView === 5) {
                e.views.months.daysToShow = t;
            } else if (e.views.colorRanges.enabled && e._currentView.activeView === 6) {
                e.views.colorRanges.daysToShow = t;
            }
        }
        e.set = n;
    })(n = e.Days || (e.Days = {}));
    let i;
    (e => {
        function t(e) {
            if (e.views.map.enabled && o.defined(e._currentView.mapContents)) {
                e._currentView.mapContentsScrollLeft = e._currentView.mapContents.scrollLeft;
            }
            if (e.views.line.enabled && o.defined(e._currentView.lineContents)) {
                e._currentView.lineContentsScrollLeft = e._currentView.lineContents.scrollLeft;
            }
            if (e.views.chart.enabled && o.defined(e._currentView.chartContents)) {
                e._currentView.chartContentsScrollLeft = e._currentView.chartContents.scrollLeft;
            }
            if (e.views.days.enabled && o.defined(e._currentView.daysContents)) {
                e._currentView.daysContentsScrollLeft = e._currentView.daysContents.scrollLeft;
            }
            if (e.views.colorRanges.enabled && o.defined(e._currentView.colorRangesContents)) {
                e._currentView.colorRangesContentsScrollLeft = e._currentView.colorRangesContents.scrollLeft;
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
            } else if (e.toLowerCase() === "color-ranges") {
                t = 6;
            }
            return t;
        }
        e.get = n;
        function i(e, t = null) {
            let n = "";
            const i = o.defined(t) ? t : e._currentView.activeView;
            if (i === 1) {
                n = "map";
            } else if (i === 2) {
                n = "line";
            } else if (i === 3) {
                n = "chart";
            } else if (i === 4) {
                n = "days";
            } else if (i === 5) {
                n = "months";
            } else if (i === 6) {
                n = "color-ranges";
            }
            return n;
        }
        e.getName = i;
        function r(e, t) {
            let n = "";
            if (e.views.map.enabled && e._currentView.activeView === 1) {
                n = t.text.mapText;
            } else if (e.views.line.enabled && e._currentView.activeView === 2) {
                n = t.text.lineText;
            } else if (e.views.chart.enabled && e._currentView.activeView === 3) {
                n = t.text.chartText;
            } else if (e.views.days.enabled && e._currentView.activeView === 4) {
                n = t.text.daysText;
            } else if (e.views.months.enabled && e._currentView.activeView === 5) {
                n = t.text.monthsText;
            } else if (e.views.colorRanges.enabled && e._currentView.activeView === 6) {
                n = t.text.colorRangesText;
            }
            return n;
        }
        e.getText = r;
        function a(e) {
            if (e.views.map.enabled && e._currentView.activeView === 1) {
                e._currentView.mapContentsContainer.style.display = "block";
            } else if (e.views.line.enabled && e._currentView.activeView === 2) {
                e._currentView.lineContentsContainer.style.display = "block";
            } else if (e.views.chart.enabled && e._currentView.activeView === 3) {
                e._currentView.chartContents.style.display = "block";
            } else if (e.views.days.enabled && e._currentView.activeView === 4) {
                e._currentView.daysContents.style.display = "block";
            } else if (e.views.months.enabled && e._currentView.activeView === 5) {
                e._currentView.monthsContents.style.display = "block";
            } else if (e.views.colorRanges.enabled && e._currentView.activeView === 6) {
                e._currentView.colorRangesContents.style.display = "block";
            }
            e._currentView.element.style.removeProperty("height");
        }
        e.set = a;
    })(i = e.View || (e.View = {}));
})(m || (m = {}));

var p;

(e => {
    function t(e, t, o, i) {
        if (t === "json") {
            n(e, o, i);
        } else if (t === "txt") {
            r(e, o);
        } else if (t === "csv") {
            a(e, o);
        } else if (t === "tsv") {
            s(e, o);
        } else if (t === "md") {
            l(e, o);
        } else if (t === "yaml") {
            c(e, o);
        } else if (t === "toml") {
            d(e, o);
        }
    }
    e.file = t;
    function n(e, t, n) {
        const r = new FileReader;
        let a = {};
        r.onloadend = () => t(e.name, a);
        r.onload = e => {
            const t = i.getObjectFromString(e.target.result, n);
            if (t.parsed && o.definedObject(t.object)) {
                a = t.object;
            }
        };
        r.readAsText(e);
    }
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
    function a(e, t) {
        const n = new FileReader;
        const o = {};
        n.onloadend = () => t(e.name, o);
        n.onload = e => {
            const t = e.target.result.toString().replace(new RegExp('"', "g"), "");
            const n = t.split("\n");
            const i = n.length;
            for (let e = 1; e < i; e++) {
                const t = n[e].split(",");
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
    function l(e, t) {
        const n = new FileReader;
        const o = {};
        n.onloadend = () => t(e.name, o);
        n.onload = e => {
            const t = e.target.result.toString().split("\n");
            const n = t.length;
            for (let e = 2; e < n; e++) {
                const n = t[e].trim();
                const i = n.substring(1, n.length - 1).trim();
                const r = i.split("|");
                o[r[0].trim()] = parseInt(r[1].trim());
            }
        };
        n.readAsText(e);
    }
    function c(e, t) {
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
    function d(e, t) {
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
        e.getMimeType = t;
        function n(e, t, n, i) {
            let a = null;
            if (o.definedString(n)) {
                a = `${n}.${i.toLowerCase()}`;
            } else {
                const n = new Date;
                const o = `${r.padNumber(n.getDate())}${"-"}${r.padNumber(n.getMonth() + 1)}${"-"}${n.getFullYear()}`;
                const s = `${r.padNumber(n.getHours())}${"-"}${r.padNumber(n.getMinutes())}`;
                let l = "";
                if (t._currentView.activeType !== e.text.unknownTrendText) {
                    l = `${t._currentView.activeType.toLowerCase().replace(/ /g, "_")}${"_"}`;
                }
                a = `${l}${o}${"_"}${s}.${i.toLowerCase()}`;
            }
            return a;
        }
        e.getFilename = n;
    })(t = e.File || (e.File = {}));
    let n;
    (e => {
        function t(e, t, a, w) {
            let g = null;
            if (e === "csv") {
                g = n(t, a);
            } else if (e === "json") {
                g = o(t);
            } else if (e === "xml") {
                g = i(t, a, w);
            } else if (e === "txt") {
                g = r(t, a, w);
            } else if (e === "html") {
                g = s(t, a, w);
            } else if (e === "md") {
                g = l(t);
            } else if (e === "tsv") {
                g = c(t);
            } else if (e === "yaml") {
                g = d(t, a, w);
            } else if (e === "toml") {
                g = u(t, a, w);
            }
            return g;
        }
        e.get = t;
        function n(e, t) {
            const n = [];
            for (const t in e) {
                if (Object.prototype.hasOwnProperty.call(e, t)) {
                    n.push(g([ w(t), w(e[t].toString()) ]));
                }
            }
            if (n.length > 0) {
                n.unshift(g([ w(t.text.dateText), w(t.text.countText) ]));
            }
            return n.join("\n");
        }
        function o(e) {
            return JSON.stringify(e, null, 2);
        }
        function i(e, t, n) {
            const o = a.getCustomFormattedDateText(t, n.exportDateTimeFormat, new Date);
            const i = [];
            i.push('<?xml version="1.0" ?>');
            i.push("<LastModified>");
            i.push(`${"  "}<FullDate>${o}</FullDate>`);
            i.push("</LastModified>");
            i.push("<Dates>");
            for (const t in e) {
                if (Object.prototype.hasOwnProperty.call(e, t)) {
                    i.push("<Date>");
                    i.push(`${"  "}<FullDate>${t}</FullDate>`);
                    i.push(`${"  "}<Count>${e[t].toString()}</Count>`);
                    i.push("</Date>");
                }
            }
            i.push("</Dates>");
            return i.join("\n");
        }
        function r(e, t, n) {
            const o = a.getCustomFormattedDateText(t, n.exportDateTimeFormat, new Date);
            const i = [];
            i.push(`Last-Modified${":"}${" "}${o}`);
            for (const t in e) {
                if (Object.prototype.hasOwnProperty.call(e, t)) {
                    i.push(`${t}${":"}${" "}${e[t].toString()}`);
                }
            }
            return i.join("\n");
        }
        function s(e, t, n) {
            const o = [];
            const i = a.getCustomFormattedDateText(t, n.exportDateTimeFormat, new Date);
            o.push("<!DOCTYPE html>");
            o.push("<html>");
            o.push("<head>");
            o.push(`${"  "}<meta charset="utf-8" />`);
            o.push(`${"  "}<meta http-equiv="Last-Modified" content="${i} GMT" />`);
            o.push("</head>");
            o.push("<body>");
            o.push(`${"  "}<ul>`);
            for (const t in e) {
                if (Object.prototype.hasOwnProperty.call(e, t)) {
                    o.push(`${"  "}${"  "}<li><b>${t}:</b> ${e[t].toString()}</li>`);
                }
            }
            o.push(`${"  "}</ul>`);
            o.push("</body>");
            o.push("</html>");
            return o.join("\n");
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
            const o = [];
            const i = a.getCustomFormattedDateText(t, n.exportDateTimeFormat, new Date);
            o.push(`Last-Modified:${" "}${i}`);
            for (const t in e) {
                if (Object.prototype.hasOwnProperty.call(e, t)) {
                    o.push(`${t}${":"}${" "}${e[t].toString()}`);
                }
            }
            return o.join("\n");
        }
        function u(e, t, n) {
            const o = [];
            const i = a.getCustomFormattedDateText(t, n.exportDateTimeFormat, new Date);
            o.push(`last_modified = "${i}"`);
            o.push("");
            o.push("[dates]");
            for (const t in e) {
                if (Object.prototype.hasOwnProperty.call(e, t)) {
                    o.push(`${t} = ${e[t].toString()}`);
                }
            }
            return o.join("\n");
        }
        function w(e) {
            let t = e.toString().replace(/(\r\n|\n|\r)/gm, "").replace(/(\s\s)/gm, " ");
            t = t.replace(/"/g, '""');
            t = `"${t}"`;
            return t;
        }
        function g(e) {
            return e.join(",");
        }
    })(n = e.Contents || (e.Contents = {}));
})(y || (y = {}));

var v;

(e => {
    function t(e, t, n, o = true, i = false) {
        if (n > 0) {
            const r = i ? `${n}%` : `${n}px`;
            if (o && e.chartsAnimationDelay > 0) {
                setTimeout(() => {
                    t.style.height = r;
                }, e.chartsAnimationDelay);
            } else {
                t.style.height = r;
            }
        }
    }
    e.setHeight = t;
})(v || (v = {}));

var T;

(e => {
    function t(e, t, o) {
        if (t.useLocalStorageForData && window.localStorage) {
            const a = window.localStorage.length;
            const s = t._currentView.element.id;
            for (let t = 0; t < a; t++) {
                const a = window.localStorage.key(t);
                if (r.startsWithAnyCase(a, `${n.LOCAL_STORAGE_START_ID}${s}`)) {
                    const t = window.localStorage.getItem(a);
                    const n = i.getObjectFromString(t, e);
                    if (n.parsed) {
                        o.typeData = n.object;
                        o.totalTypes = 0;
                        for (const e in o.typeData) {
                            if (Object.prototype.hasOwnProperty.call(o.typeData, e)) {
                                o.totalTypes++;
                            }
                        }
                    }
                    break;
                }
            }
        }
    }
    e.load = t;
    function o(e, t) {
        if (e.useLocalStorageForData && window.localStorage) {
            const o = e._currentView.element.id;
            const i = JSON.stringify(t.typeData);
            a(e);
            window.localStorage.setItem(`${n.LOCAL_STORAGE_START_ID}${o}`, i);
        }
    }
    e.store = o;
    function a(e) {
        if (e.useLocalStorageForData && window.localStorage) {
            const t = window.localStorage.length;
            const o = [];
            const i = e._currentView.element.id;
            for (let e = 0; e < t; e++) {
                const t = window.localStorage.key(e);
                if (r.startsWithAnyCase(t, `${n.LOCAL_STORAGE_START_ID}${i}`)) {
                    o.push(t);
                }
            }
            const a = o.length;
            for (let e = 0; e < a; e++) {
                window.localStorage.removeItem(o[e]);
            }
        }
    }
    e.clear = a;
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

var V;

(e => {
    let t;
    (e => {
        let t = null;
        function n(e) {
            t = e;
            document.addEventListener("keydown", e => i(e));
        }
        e.bindEvents = n;
        function o() {
            document.removeEventListener("keydown", i);
        }
        e.unbindEvents = o;
        function i(e) {
            if (e.key === "Escape") {
                t();
            }
        }
    })(t = e.Dialog || (e.Dialog = {}));
})(V || (V = {}));

var _;

(e => {
    function t(e, t, n, l, w) {
        if (t.zooming.enabled) {
            const g = s.create(n, "div", "zooming");
            let f = null;
            if (t.zooming.showCloseButton) {
                const n = s.create(g, "div", "zoom-close-button");
                c.add(n, t, e.text.closeButtonText);
                n.onclick = () => {
                    t.zooming.enabled = false;
                    t._currentView.mapContents.style.paddingRight = "0px";
                    g.parentNode.removeChild(g);
                };
            }
            if (t.zooming.showResetButton) {
                f = s.createIconButton(g, "button", "reset", "exclamation-mark");
                c.add(f, t, e.text.resetButtonText);
                f.onclick = () => i(t, w);
            }
            const h = s.createIconButton(g, "button", "zoom-out", "minus");
            const m = s.createWithHTML(g, "span", "zoom-level", `+${r.friendlyNumber(t._currentView.zoomLevel * 10)}%`);
            const p = s.createIconButton(g, "button", "zoom-in", "plus");
            const y = s.getStyleValueByName(document.documentElement, u.Variables.Spacing, true);
            c.add(p, t, e.text.zoomInText);
            c.add(h, t, e.text.zoomOutText);
            g.style.bottom = n.offsetHeight - l.offsetHeight + "px";
            if (t._currentView.zoomLevel === -1) {
                t._currentView.zoomLevel = 0;
                m.innerText = `+${r.friendlyNumber(t._currentView.zoomLevel * 10)}%`;
            }
            if (o.defined(t._currentView.mapContents)) {
                t._currentView.mapContents.style.paddingRight = `${g.offsetWidth + y}px`;
            }
            if (t.zooming.showResetButton) {
                f.disabled = t._currentView.zoomLevel === 0;
            }
            h.disabled = t._currentView.zoomLevel === 0;
            h.onclick = () => a(t, w);
            p.disabled = t.zooming.maximumLevel > 0 && t._currentView.zoomLevel >= t.zooming.maximumLevel;
            p.onclick = () => d(t, w);
        }
    }
    e.render = t;
    function n(e) {
        const t = s.getStyleValueByNameSizingMetic(document.documentElement, u.Variables.DaySize);
        const n = s.getStyleValueByNameSizingMetic(document.documentElement, u.Variables.LineWidth);
        let o = s.getStyleValueByName(document.documentElement, u.Variables.DaySize, true);
        let i = s.getStyleValueByName(document.documentElement, u.Variables.LineWidth, true);
        if (e._currentView.mapZoomIncrement === -1) {
            e._currentView.mapZoomIncrement = o / 10;
        }
        if (e._currentView.lineZoomIncrement === -1) {
            e._currentView.lineZoomIncrement = i / 10;
        }
        if (e.zooming.defaultLevel > 0 && e._currentView.zoomLevel === -1) {
            o += parseFloat((e.zooming.defaultLevel * e._currentView.mapZoomIncrement).toFixed(1));
            i += parseFloat((e.zooming.defaultLevel * e._currentView.lineZoomIncrement).toFixed(1));
            e._currentView.zoomLevel = e.zooming.defaultLevel;
            e._currentView.element.style.setProperty(u.Variables.DaySize, `${o}${t}`);
            e._currentView.element.style.setProperty(u.Variables.LineWidth, `${i}${n}`);
        }
    }
    e.setupDefaults = n;
    function i(e, t) {
        if (e._currentView.zoomLevel > 0) {
            e._currentView.element.style.removeProperty(u.Variables.DaySize);
            e._currentView.element.style.removeProperty(u.Variables.LineWidth);
            e._currentView.zoomLevel = 0;
            e._currentView.dayWidth = 0;
            l.customEvent(e.events.onZoomLevelChange, e._currentView.element, e._currentView.zoomLevel);
            t();
        }
    }
    function a(e, t) {
        if (e._currentView.zoomLevel > 0) {
            const n = s.getStyleValueByNameSizingMetic(document.documentElement, u.Variables.DaySize);
            const o = s.getStyleValueByNameSizingMetic(document.documentElement, u.Variables.LineWidth);
            let i = s.getStyleValueByName(e._currentView.element, u.Variables.DaySize, true);
            let r = s.getStyleValueByName(e._currentView.element, u.Variables.LineWidth, true);
            i -= e._currentView.mapZoomIncrement;
            i = parseFloat(i.toFixed(1));
            r -= e._currentView.lineZoomIncrement;
            r = parseFloat(r.toFixed(1));
            e._currentView.zoomLevel--;
            e._currentView.element.style.setProperty(u.Variables.DaySize, `${i}${n}`);
            e._currentView.element.style.setProperty(u.Variables.LineWidth, `${r}${o}`);
            e._currentView.dayWidth = 0;
            l.customEvent(e.events.onZoomLevelChange, e._currentView.element, e._currentView.zoomLevel);
            t();
        }
    }
    function d(e, t) {
        if (e.zooming.maximumLevel === 0 || e._currentView.zoomLevel < e.zooming.maximumLevel) {
            const n = s.getStyleValueByNameSizingMetic(document.documentElement, u.Variables.DaySize);
            const o = s.getStyleValueByNameSizingMetic(document.documentElement, u.Variables.LineWidth);
            let i = s.getStyleValueByName(e._currentView.element, u.Variables.DaySize, true);
            let r = s.getStyleValueByName(e._currentView.element, u.Variables.LineWidth, true);
            i += e._currentView.mapZoomIncrement;
            i = parseFloat(i.toFixed(1));
            r += e._currentView.lineZoomIncrement;
            r = parseFloat(r.toFixed(1));
            e._currentView.zoomLevel++;
            e._currentView.element.style.setProperty(u.Variables.DaySize, `${i}${n}`);
            e._currentView.element.style.setProperty(u.Variables.LineWidth, `${r}${o}`);
            e._currentView.dayWidth = 0;
            l.customEvent(e.events.onZoomLevelChange, e._currentView.element, e._currentView.zoomLevel);
            t();
        }
    }
})(_ || (_ = {}));

var C;

(e => {
    let t = null;
    function n(e, n) {
        if (e.observationMode) {
            if (!o.defined(t)) {
                t = new MutationObserver(() => {
                    n();
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
    e.setup = n;
    function i(e) {
        if (e.observationMode && o.defined(t)) {
            t.disconnect();
            t = null;
        }
    }
    e.destroy = i;
})(C || (C = {}));

(() => {
    let u = {};
    let D = {};
    function x() {
        const e = u.domElementTypes;
        const t = e.length;
        for (let n = 0; n < t; n++) {
            const t = document.getElementsByTagName(e[n]);
            const o = [].slice.call(t);
            const i = o.length;
            for (let e = 0; e < i; e++) {
                if (!S(o[e])) {
                    break;
                }
            }
        }
    }
    function S(e) {
        let t = true;
        if (o.defined(e) && e.hasAttribute(n.Attribute.HEAT_JS)) {
            const r = e.getAttribute(n.Attribute.HEAT_JS);
            if (o.definedString(r)) {
                const a = i.getObjectFromString(r, u);
                if (a.parsed && o.definedObject(a.object)) {
                    M(g.Options.getForNewInstance(u, a.object, e));
                } else {
                    if (!u.safeMode) {
                        console.error(u.text.attributeNotValidErrorText.replace("{{attribute_name}}", n.Attribute.HEAT_JS));
                        t = false;
                    }
                }
            } else {
                if (!u.safeMode) {
                    console.error(u.text.attributeNotSetErrorText.replace("{{attribute_name}}", n.Attribute.HEAT_JS));
                    t = false;
                }
            }
        }
        return t;
    }
    function M(e) {
        l.customEvent(e.events.onBeforeRender, e._currentView.element);
        if (!o.definedString(e._currentView.element.id)) {
            e._currentView.element.id = crypto.randomUUID();
        }
        s.addClass(e._currentView.element, "heat-js");
        if (e.resizable) {
            s.addClass(e._currentView.element, "resizable");
        }
        e._currentView.element.removeAttribute(n.Attribute.HEAT_JS);
        je(e._currentView.element.id, e);
        B(e);
        O(e);
        _.setupDefaults(e);
        l.customEvent(e.events.onRenderComplete, e._currentView.element);
    }
    function B(e, t = false, n = false, o = false) {
        c.hide(e);
        if (t) {
            T.store(e, D[e._currentView.element.id]);
        }
        m.View.getScrollPositions(e);
        c.render(e);
        e._currentView.yearsAvailable = ze(e);
        e._currentView.container = s.create(e._currentView.element, "div", "container-contents");
        if (!e.sideMenu.enabled) {
            s.addClass(e._currentView.element, "no-side-menu");
        } else {
            s.removeClass(e._currentView.element, "no-side-menu");
        }
        Xe(e);
        He(e);
        N(e);
        ae(e);
        ge(e);
        if (e.views.map.enabled && e._currentView.activeView === 1) {
            me(e, n, o);
        }
        if (e.views.line.enabled && e._currentView.activeView === 2) {
            be(e, n, o);
        }
        if (e.views.chart.enabled && e._currentView.activeView === 3) {
            _e(e, n, o);
        }
        if (e.views.days.enabled && e._currentView.activeView === 4) {
            De(e, n);
        }
        if (e.views.months.enabled && e._currentView.activeView === 5) {
            Me(e, n);
        }
        if (e.views.colorRanges.enabled && e._currentView.activeView === 6) {
            Ne(e, n);
        }
        Le(e);
        m.View.set(e);
    }
    function O(e, t = true) {
        const n = t ? window.addEventListener : window.removeEventListener;
        n("blur", () => c.hide(e));
    }
    function N(e) {
        const t = e.sideMenu.enabled && e._currentView.viewsEnabled > 1;
        if (t) {
            e._currentView.sideMenu = s.create(e._currentView.element, "div", "container-side-menu", e._currentView.container);
            if (e.views.map.enabled) {
                A(e, 1, "map", u.text.mapText);
            }
            if (e.views.line.enabled) {
                A(e, 2, "line", u.text.lineText);
            }
            if (e.views.chart.enabled) {
                A(e, 3, "chart", u.text.chartText);
            }
            if (e.views.days.enabled) {
                A(e, 4, "days", u.text.daysText);
            }
            if (e.views.months.enabled) {
                A(e, 5, "months", u.text.monthsText);
            }
            if (e.views.colorRanges.enabled) {
                A(e, 6, "color-ranges", u.text.colorRangesText);
            }
        }
    }
    function A(e, t, n, o) {
        const i = s.create(e._currentView.sideMenu, "div", "menu-tab");
        i.onclick = () => Fe(e, t);
        if (e._currentView.activeView === t) {
            s.addClass(i, "active");
        }
        if (e.sideMenu.showToolTips) {
            c.add(i, e, o);
        }
        s.create(i, "i", n);
    }
    function k(e) {
        h.Background.render(e);
        if (!o.definedParentElement(e._currentView.configurationDialog)) {
            e._currentView.configurationDialog = s.create(e._currentView.disabledBackground, "div", "dialog configuration");
            const t = s.create(e._currentView.configurationDialog, "div", "dialog-title-bar");
            const n = s.create(e._currentView.configurationDialog, "div", "dialog-contents");
            const o = s.create(t, "div", "dialog-close");
            const i = s.create(n, "div", "side-containers");
            const r = s.create(i, "div", "side-container panel");
            const a = s.create(i, "div", "side-container panel");
            s.createWithHTML(t, "span", "dialog-title-bar-text", u.text.configurationTitleText);
            s.createWithHTML(r, "div", "side-container-title-text", `${u.text.visibleDaysText}${":"}`);
            s.createWithHTML(a, "div", "side-container-title-text", `${u.text.visibleMonthsText}${":"}`);
            const l = s.create(a, "div", "side-container");
            const d = s.create(a, "div", "side-container");
            const w = s.create(n, "div", "buttons");
            const g = s.createButton(w, "button", "", u.text.resetButtonText);
            const f = s.createButton(w, "button", "default", u.text.saveButtonText);
            o.onclick = () => R(e);
            g.onclick = () => E(e);
            f.onclick = () => I(e);
            for (let t = 0; t < 7; t++) {
                e._currentView.configurationDialogDayCheckBoxes[t] = s.createCheckBox(r, u.text.dayNames[t], t.toString());
            }
            let h = l;
            let m = 0;
            for (let t = e.startMonth; t < 12 + e.startMonth; t++) {
                let n = t;
                if (e.startMonth > 0 && t > 11) {
                    n = t - 12;
                }
                e._currentView.configurationDialogMonthCheckBoxes[n] = s.createCheckBox(h, u.text.monthNames[n], n.toString());
                m++;
                if (m > 6) {
                    h = d;
                }
            }
            c.add(o, e, u.text.closeButtonText);
        }
    }
    function L(e) {
        k(e);
        h.Background.show(e);
        if (o.defined(e._currentView.configurationDialog) && e._currentView.configurationDialog.style.display !== "block") {
            e._currentView.configurationDialog.style.display = "block";
        }
        const t = m.Days.get(e);
        const n = m.Months.get(e);
        for (let n = 0; n < 7; n++) {
            e._currentView.configurationDialogDayCheckBoxes[n].checked = o.dayVisible(t, n + 1);
        }
        for (let t = 0; t < 12; t++) {
            e._currentView.configurationDialogMonthCheckBoxes[t].checked = o.monthVisible(n, t);
        }
        c.hide(e);
        V.Dialog.bindEvents(() => R(e));
    }
    function R(e) {
        h.Background.hide(e);
        if (o.defined(e._currentView.configurationDialog) && e._currentView.configurationDialog.style.display !== "none") {
            e._currentView.configurationDialog.style.display = "none";
        }
        c.hide(e);
        V.Dialog.unbindEvents();
    }
    function I(e) {
        h.Background.hide(e);
        if (o.defined(e._currentView.configurationDialog) && e._currentView.configurationDialog.style.display !== "none") {
            e._currentView.configurationDialog.style.display = "none";
        }
        const t = m.Days.get(e);
        const n = m.Months.get(e);
        const i = [];
        const r = [];
        let a = false;
        for (let t = 0; t < 7; t++) {
            if (e._currentView.configurationDialogDayCheckBoxes[t].checked) {
                i.push(t + 1);
            }
        }
        for (let t = 0; t < 12; t++) {
            if (e._currentView.configurationDialogMonthCheckBoxes[t].checked) {
                r.push(t + 1);
            }
        }
        if (i.length >= 1 && JSON.stringify(i) !== JSON.stringify(t)) {
            m.Days.set(e, i);
            a = true;
        }
        if (r.length >= 1 && JSON.stringify(r) !== JSON.stringify(n)) {
            m.Months.set(e, r);
            a = true;
        }
        if (a) {
            B(e);
            l.customEvent(e.events.onBindingOptionsUpdate, e._currentView.element, e);
        } else {
            c.hide(e);
        }
    }
    function E(e) {
        for (let t = 0; t < 7; t++) {
            e._currentView.configurationDialogDayCheckBoxes[t].checked = true;
        }
        for (let t = 0; t < 12; t++) {
            e._currentView.configurationDialogMonthCheckBoxes[t].checked = true;
        }
    }
    function F(e) {
        h.Background.render(e);
        if (!o.definedParentElement(e._currentView.exportDialog)) {
            e._currentView.exportDialog = s.create(e._currentView.disabledBackground, "div", "dialog export");
            const t = s.create(e._currentView.exportDialog, "div", "dialog-title-bar");
            const n = s.create(e._currentView.exportDialog, "div", "dialog-contents");
            const o = s.create(t, "div", "dialog-close");
            s.createWithHTML(t, "span", "dialog-title-bar-text", u.text.selectTypeText);
            e._currentView.exportDialogExportTypeSelect = s.create(n, "select", "input-box");
            e._currentView.exportDialogExportTypeSelect.name = crypto.randomUUID();
            e._currentView.exportDialogExportFilenameInput = s.create(n, "input", "input-box filename");
            e._currentView.exportDialogExportFilenameInput.name = crypto.randomUUID();
            e._currentView.exportDialogExportFilenameInput.placeholder = u.text.filenamePlaceholderText;
            e._currentView.exportDialogExportOnlyDataBeingViewedCheckBox = s.createCheckBox(n, u.text.onlyDataBeingViewedText, crypto.randomUUID());
            e._currentView.exportDialogExportOnlyDataBeingViewedCheckBox.checked = e.exportOnlyDataBeingViewed;
            const i = s.create(n, "div", "buttons");
            const r = s.createButton(i, "button", "", u.text.copyButtonText);
            const a = s.createButton(i, "button", "default", u.text.exportButtonText);
            $(e);
            e._currentView.exportDialogExportFilenameInput.onkeydown = t => {
                if (t.key === "Enter") {
                    j(e);
                }
            };
            o.onclick = () => Y(e);
            r.onclick = () => j(e, true);
            a.onclick = () => j(e);
            c.add(o, e, u.text.closeButtonText);
        }
    }
    function $(e) {
        let n;
        const o = [];
        for (n in t) {
            const i = s.createWithNoContainer("option");
            i.value = t[n];
            i.textContent = n.toString().toUpperCase();
            i.selected = n === e.exportType;
            o.push(i);
        }
        o.sort((e, t) => e.text.toLowerCase().localeCompare(t.text.toLowerCase()));
        o.forEach(t => e._currentView.exportDialogExportTypeSelect.add(t));
    }
    function H(e) {
        F(e);
        h.Background.show(e);
        if (o.defined(e._currentView.exportDialog) && e._currentView.exportDialog.style.display !== "block") {
            e._currentView.exportDialogExportFilenameInput.value = "";
            e._currentView.exportDialog.style.display = "block";
            e._currentView.exportDialogExportFilenameInput.focus();
        }
        c.hide(e);
        V.Dialog.bindEvents(() => Y(e));
    }
    function Y(e) {
        h.Background.hide(e);
        if (o.defined(e._currentView.exportDialog) && e._currentView.exportDialog.style.display !== "none") {
            e._currentView.exportDialog.style.display = "none";
        }
        c.hide(e);
        V.Dialog.unbindEvents();
    }
    function j(e, t = false) {
        const n = e._currentView.exportDialogExportTypeSelect.value;
        const o = e._currentView.exportDialogExportFilenameInput.value;
        const i = e._currentView.exportDialogExportOnlyDataBeingViewedCheckBox.checked;
        Y(e);
        W(e, n, o, i, t);
    }
    function W(e, t = null, n = null, r = true, a = false) {
        const c = i.getString(t, e.exportType).toLowerCase();
        const d = P(e, r);
        const w = y.Contents.get(c, d, u, e);
        if (o.definedString(w)) {
            if (a) {
                navigator.clipboard.writeText(w);
            } else {
                const t = y.File.getMimeType(c);
                const o = s.create(document.body, "a");
                o.style.display = "none";
                o.setAttribute("target", "_blank");
                o.setAttribute("href", `data:${t};charset=utf-8,${encodeURIComponent(w)}`);
                o.setAttribute("download", y.File.getFilename(u, e, n, c));
                o.click();
                document.body.removeChild(o);
            }
            l.customEvent(e.events.onExport, e._currentView.element);
        }
    }
    function P(e, t) {
        const n = {};
        const i = We(e);
        if (t) {
            const t = e._currentView.activeYear;
            const r = m.Days.get(e);
            const s = m.Months.get(e);
            for (let l = e.startMonth; l < 12 + e.startMonth; l++) {
                let c = l;
                let d = t;
                if (e.startMonth > 0 && l > 11) {
                    c = l - 12;
                    d++;
                }
                if (o.monthVisible(s, c)) {
                    const e = a.getTotalDaysInMonth(d, c);
                    for (let t = 0; t < e; t++) {
                        const e = new Date(d, c, t + 1);
                        const s = a.toStorageDate(e);
                        const l = a.getWeekdayNumber(e) + 1;
                        if (o.dayVisible(r, l)) {
                            if (Object.prototype.hasOwnProperty.call(i, s)) {
                                n[s] = i[s];
                            }
                        }
                    }
                }
            }
        } else {
            const e = [];
            for (const t in i) {
                if (Object.prototype.hasOwnProperty.call(i, t)) {
                    e.push(t);
                }
            }
            e.sort();
            const t = e.length;
            for (let o = 0; o < t; o++) {
                const t = e[o];
                if (Object.prototype.hasOwnProperty.call(i, t)) {
                    n[t] = i[t];
                }
            }
        }
        return n;
    }
    function z(e) {
        h.Background.render(e);
        if (!o.definedParentElement(e._currentView.importDialog)) {
            e._currentView.importDialog = s.create(e._currentView.disabledBackground, "div", "dialog import");
            const t = s.create(e._currentView.importDialog, "div", "dialog-title-bar");
            const n = s.create(e._currentView.importDialog, "div", "dialog-contents");
            const o = s.create(t, "div", "dialog-close");
            s.createWithHTML(t, "span", "dialog-title-bar-text", u.text.selectFilesText);
            e._currentView.importDialogDragAndDrop = s.create(n, "div", "drag-and-drop-files");
            e._currentView.importDialogClearExistingData = s.createCheckBox(n, u.text.clearExistingDataText, crypto.randomUUID());
            s.createWithHTML(e._currentView.importDialogDragAndDrop, "div", "no-files", u.text.dragAndDropFilesText);
            G(e._currentView.importDialogDragAndDrop, e);
            const i = s.create(n, "div", "buttons");
            const r = s.createButton(i, "button", "", u.text.browseButtonText);
            e._currentView.importDialogImportButton = s.createButton(i, "button", "default", u.text.importButtonText);
            e._currentView.importDialogImportButton.disabled = true;
            o.onclick = () => J(e);
            r.onclick = () => Z(e);
            e._currentView.importDialogImportButton.onclick = () => K(e._currentView.importDialogFileList, e, e._currentView.importDialogClearExistingData.checked);
            c.add(o, e, u.text.closeButtonText);
        }
    }
    function U(e) {
        z(e);
        h.Background.show(e);
        if (o.defined(e._currentView.importDialog) && e._currentView.importDialog.style.display !== "block") {
            e._currentView.importDialog.style.display = "block";
        }
        c.hide(e);
        V.Dialog.bindEvents(() => J(e));
    }
    function J(e) {
        h.Background.hide(e);
        if (o.defined(e._currentView.importDialog) && e._currentView.importDialog.style.display !== "none") {
            e._currentView.importDialogDragAndDrop.innerHTML = "";
            e._currentView.importDialogFileList = null;
            e._currentView.importDialogImportButton.disabled = true;
            e._currentView.importDialog.style.display = "none";
            s.createWithHTML(e._currentView.importDialogDragAndDrop, "div", "no-files", u.text.dragAndDropFilesText);
        }
        c.hide(e);
        V.Dialog.unbindEvents();
    }
    function G(e, t) {
        if (t.allowFileImports && !t._currentView.isInFetchMode) {
            e.ondragover = s.cancelBubble;
            e.ondragenter = s.cancelBubble;
            e.ondragleave = s.cancelBubble;
            e.ondrop = e => {
                s.cancelBubble(e);
                if (o.defined(window.FileReader) && e.dataTransfer.files.length > 0) {
                    const n = new DataTransfer;
                    if (!t.allowFileImports) {
                        n.items.add(e.dataTransfer.files[0]);
                    } else {
                        const t = e.dataTransfer.files.length;
                        for (let o = 0; o < t; o++) {
                            n.items.add(e.dataTransfer.files[o]);
                        }
                    }
                    X(t, n.files);
                }
            };
        }
    }
    function Z(t) {
        const n = [];
        let o;
        for (o in e) {
            n.push(`.${o}`);
        }
        const i = s.createWithNoContainer("input");
        i.type = "file";
        i.accept = n.join(", ");
        i.multiple = t.allowMultipleFileImports;
        i.onchange = () => X(t, i.files);
        i.click();
    }
    function X(e, t) {
        if (t.length <= 0) {
            e._currentView.importDialogDragAndDrop.innerHTML = "";
            e._currentView.importDialogImportButton.disabled = true;
            s.createWithHTML(e._currentView.importDialogDragAndDrop, "div", "no-files", u.text.dragAndDropFilesText);
        } else {
            e._currentView.importDialogFileList = t;
            e._currentView.importDialogDragAndDrop.innerHTML = "";
            e._currentView.importDialogImportButton.disabled = false;
            const o = Math.min(t.length, n.MAXIMUM_FILE_IMPORTS);
            for (let n = 0; n < o; n++) {
                const o = t[n].name;
                const i = s.createWithHTML(e._currentView.importDialogDragAndDrop, "div", "filename", `<b>${n + 1}</b>. ${o}`);
                const r = s.create(i, "div", "remove");
                c.add(r, e, u.text.removeButtonText);
                r.onclick = () => q(e, n);
            }
        }
    }
    function q(e, t) {
        const n = new DataTransfer;
        const o = e._currentView.importDialogFileList.length;
        for (let i = 0; i < o; i++) {
            if (i !== t) {
                n.items.add(e._currentView.importDialogFileList[i]);
            }
        }
        X(e, n.files);
    }
    function K(e, t, o = false) {
        const i = Math.min(e.length, n.MAXIMUM_FILE_IMPORTS);
        const r = [];
        const a = We(t);
        if (o) {
            for (const e in a) {
                delete a[e];
            }
        }
        const s = (e, n) => {
            r.push(e);
            for (const e in n) {
                if (Object.prototype.hasOwnProperty.call(n, e)) {
                    if (!Object.prototype.hasOwnProperty.call(a, e)) {
                        a[e] = 0;
                    }
                    a[e] += n[e];
                }
            }
            if (r.length === i) {
                l.customEvent(t.events.onImport, t._currentView.element);
                B(t, true);
            }
        };
        for (let t = 0; t < i; t++) {
            const n = e[t];
            const o = n.name.split(".").pop().toLowerCase();
            p.file(n, o, s, u);
        }
    }
    function Q(e) {
        h.Background.render(e);
        if (!o.definedParentElement(e._currentView.typeAddingDialog)) {
            e._currentView.typeAddingDialog = s.create(e._currentView.disabledBackground, "div", "dialog add-type");
            const t = s.create(e._currentView.typeAddingDialog, "div", "dialog-title-bar");
            const n = s.create(e._currentView.typeAddingDialog, "div", "dialog-contents");
            const o = s.create(t, "div", "dialog-close");
            s.createWithHTML(t, "span", "dialog-title-bar-text", u.text.addTypeText);
            e._currentView.typeAddingDialogTypeInput = s.create(n, "input", "input-box type");
            e._currentView.typeAddingDialogTypeInput.name = crypto.randomUUID();
            e._currentView.typeAddingDialogTypeInput.placeholder = u.text.typePlaceholderText;
            e._currentView.typeAddingOptionNewType = s.createCheckBox(n, u.text.openNewTypeText, crypto.randomUUID());
            e._currentView.typeAddingOptionNewType.checked = true;
            const i = s.create(n, "div", "buttons");
            e._currentView.typeAddingAddButton = s.createButton(i, "button", "default", u.text.addButtonText);
            e._currentView.typeAddingDialogTypeInput.onkeydown = t => {
                if (t.key === "Enter") {
                    ne(e);
                }
            };
            o.onclick = () => te(e);
            e._currentView.typeAddingAddButton.onclick = () => ne(e);
            c.add(o, e, u.text.closeButtonText);
        }
    }
    function ee(e, t = null) {
        Q(e);
        h.Background.show(e);
        if (o.defined(e._currentView.typeAddingDialog) && e._currentView.typeAddingDialog.style.display !== "block") {
            e._currentView.typeAddingDialogTypeInput.value = "";
            e._currentView.typeAddingDialog.style.display = "block";
            e._currentView.typeAddingRenameType = t;
            e._currentView.typeAddingDialogTypeInput.focus();
            if (o.definedString(t)) {
                e._currentView.typeAddingDialogTypeInput.value = t;
                e._currentView.typeAddingAddButton.innerText = u.text.saveButtonText;
                e._currentView.typeAddingDialogTypeInput.select();
            } else {
                e._currentView.typeAddingAddButton.innerText = u.text.addButtonText;
            }
        }
        c.hide(e);
        V.Dialog.bindEvents(() => te(e));
    }
    function te(e) {
        h.Background.hide(e);
        if (o.defined(e._currentView.typeAddingDialog) && e._currentView.typeAddingDialog.style.display !== "none") {
            e._currentView.typeAddingDialog.style.display = "none";
        }
        c.hide(e);
        V.Dialog.unbindEvents();
    }
    function ne(e) {
        const t = e._currentView.typeAddingDialogTypeInput.value.trim();
        const n = e._currentView.element.id;
        if (o.definedString(t) && !Object.prototype.hasOwnProperty.call(D[n].typeData, t)) {
            if (!o.definedString(e._currentView.typeAddingRenameType)) {
                D[n].typeData[t] = {};
                D[n].totalTypes++;
            } else {
                const o = D[n].typeData[e._currentView.typeAddingRenameType];
                delete D[n].typeData[e._currentView.typeAddingRenameType];
                D[n].typeData[t] = o;
            }
            if (e._currentView.typeAddingOptionNewType.checked) {
                e._currentView.activeType = t;
                l.customEvent(e.events.onTypeSwitch, e._currentView.element, t);
            }
            l.customEvent(e.events.onAddType, e._currentView.element, t);
            te(e);
            B(e, true);
        } else {
            te(e);
        }
    }
    function oe(e) {
        h.Background.render(e);
        if (!o.definedParentElement(e._currentView.confirmationDialog)) {
            e._currentView.confirmationDialog = s.create(e._currentView.disabledBackground, "div", "dialog confirmation");
            const t = s.create(e._currentView.confirmationDialog, "div", "dialog-title-bar");
            const n = s.create(e._currentView.confirmationDialog, "div", "dialog-contents");
            s.createWithHTML(t, "span", "dialog-title-bar-text", u.text.confirmText);
            e._currentView.confirmationDialogMessage = s.create(n, "div", "message");
            const o = s.create(n, "div", "buttons");
            const i = s.createButton(o, "button", "", u.text.noButtonText);
            e._currentView.confirmationDialogYesButton = s.createButton(o, "button", "default", u.text.yesButtonText);
            i.onclick = () => re(e);
        }
    }
    function ie(e, t, n) {
        oe(e);
        h.Background.show(e);
        if (o.defined(e._currentView.confirmationDialog) && e._currentView.confirmationDialog.style.display !== "block") {
            e._currentView.confirmationDialog.style.display = "block";
            e._currentView.confirmationDialogMessage.innerHTML = t;
            e._currentView.confirmationDialogYesButton.onclick = () => n();
        }
        c.hide(e);
        V.Dialog.bindEvents(() => re(e));
    }
    function re(e) {
        h.Background.hide(e);
        if (o.defined(e._currentView.confirmationDialog) && e._currentView.confirmationDialog.style.display !== "none") {
            e._currentView.confirmationDialog.style.display = "none";
        }
        c.hide(e);
        V.Dialog.unbindEvents();
    }
    function ae(e) {
        if (e.title.showText || e.title.showYearSelector || e.title.showRefreshButton || e.title.showExportButton || e.title.showImportButton || e.title.showClearButton) {
            const t = s.create(e._currentView.container, "div", "title-bar");
            const n = s.create(t, "div", "title");
            const i = !e.sideMenu.enabled && e._currentView.viewsEnabled > 1;
            if (i) {
                if (e.title.showTitleDropDownButton) {
                    s.create(n, "div", "down-arrow");
                }
            } else {
                s.addClass(n, "no-click");
            }
            if (e.title.showText) {
                n.innerHTML += e.title.text;
                if (e.title.showSectionText) {
                    s.createWithHTML(n, "span", "section-text", "[");
                    s.createWithHTML(n, "span", "section-text-name", m.View.getText(e, u));
                    s.createWithHTML(n, "span", "section-text", "]");
                }
            }
            if (i) {
                le(e, n);
            }
            if (e.title.showImportButton && !e._currentView.isInFetchMode) {
                const n = s.createIconButton(t, "button", "import", "arrow-up");
                n.onclick = () => U(e);
                if (e.title.showToolTips) {
                    c.add(n, e, u.text.importButtonText);
                }
            }
            if (e.title.showExportButton && Pe(e)) {
                const n = s.createIconButton(t, "button", "export", "arrow-down");
                n.onclick = () => H(e);
                if (e.title.showToolTips) {
                    c.add(n, e, u.text.exportButtonText);
                }
            }
            if (e.title.showRefreshButton) {
                const n = s.createIconButton(t, "button", "refresh", "refresh");
                if (e.title.showToolTips) {
                    c.add(n, e, u.text.refreshButtonText);
                }
                n.onclick = () => {
                    B(e);
                    l.customEvent(e.events.onRefresh, e._currentView.element);
                };
            }
            if (e.title.showClearButton && Ge(e) > 0) {
                const n = s.createIconButton(t, "button", "clear", "close");
                if (e.title.showToolTips) {
                    c.add(n, e, u.text.clearButtonText);
                }
                n.onclick = () => {
                    ie(e, u.text.clearDataConfirmText, () => {
                        Ue(e);
                        B(e, true);
                    });
                };
            }
            if (e.title.showYearSelector) {
                const n = s.createIconButton(t, "button", "back", "arrow-line-left");
                n.disabled = o.firstVisibleYear(e, e._currentView.activeYear);
                n.onclick = () => Qe(e);
                if (e.title.showToolTips) {
                    c.add(n, e, u.text.backButtonText);
                }
                se(e, t);
                if (e.title.showYearSelectionDropDown) {
                    ue(e);
                } else {
                    s.addClass(e._currentView.yearText, "no-click");
                }
                if (e.title.showConfigurationButton) {
                    const n = s.create(t, "div", "configure");
                    n.onclick = () => L(e);
                    if (e.title.showToolTips) {
                        c.add(n, e, u.text.configurationButtonText);
                    }
                }
                if (e.title.showCurrentYearButton) {
                    const n = s.createIconButton(t, "button", "current-year", "pin");
                    if (e.title.showToolTips) {
                        c.add(n, e, u.text.currentYearText);
                    }
                    n.onclick = () => {
                        e._currentView.activeYear = (new Date).getFullYear() - 1;
                        et(e, false);
                        l.customEvent(e.events.onSetYear, e._currentView.element, e._currentView.activeYear);
                    };
                }
                const i = s.createIconButton(t, "button", "next", "arrow-line-right");
                i.disabled = o.lastVisibleYear(e, e._currentView.activeYear);
                i.onclick = () => et(e);
                if (e.title.showToolTips) {
                    c.add(i, e, u.text.nextButtonText);
                }
            }
        }
    }
    function se(e, t) {
        let n = e._currentView.activeYear.toString();
        if (e.startMonth > 0) {
            n += ` / ${e._currentView.activeYear + 1}`;
        }
        e._currentView.yearText = s.createWithHTML(t, "div", "year-text", n);
        if (e._currentView.yearTextWidth === 0) {
            e._currentView.yearTextWidth = Math.ceil(e._currentView.yearText.offsetWidth + 20);
        }
        e._currentView.yearText.style.width = `${e._currentView.yearTextWidth}px`;
    }
    function le(e, t) {
        const n = s.create(t, "div", "titles-menu-container");
        const i = s.create(n, "div", "titles-menu");
        if (e.title.showTitleDropDownHeaders) {
            s.createWithHTML(i, "div", "title-menu-header", `${u.text.dataText}${":"}`);
        }
        if (e.views.map.enabled) {
            const t = ce(e, i, u.text.mapText);
            de(e, t, 1);
        }
        if (e.views.line.enabled) {
            const t = ce(e, i, u.text.lineText);
            de(e, t, 2);
        }
        if (e.views.chart.enabled) {
            const t = ce(e, i, u.text.chartText);
            de(e, t, 3);
        }
        let r = null;
        if (e.views.days.enabled) {
            if (e.title.showTitleDropDownHeaders) {
                r = s.createWithHTML(i, "div", "title-menu-header", `${u.text.yearText}${":"}`);
            }
            const t = ce(e, i, u.text.daysText);
            de(e, t, 4);
        }
        if (e.views.months.enabled) {
            if (e.title.showTitleDropDownHeaders && !o.defined(r)) {
                r = s.createWithHTML(i, "div", "title-menu-header", `${u.text.yearText}${":"}`);
            }
            const t = ce(e, i, u.text.monthsText);
            de(e, t, 5);
        }
        if (e.views.colorRanges.enabled) {
            if (e.title.showTitleDropDownHeaders) {
                s.createWithHTML(i, "div", "title-menu-header", `${u.text.statisticsText}${":"}`);
            }
            const t = ce(e, i, u.text.colorRangesText);
            de(e, t, 6);
        }
    }
    function ce(e, t, n) {
        const o = s.createWithHTML(t, "div", "title-menu-item", n);
        if (e.title.showTitleDropDownHeaders) {
            s.addClass(o, "indented");
        }
        return o;
    }
    function de(e, t, n) {
        if (e._currentView.activeView === n) {
            s.addClass(t, "title-menu-item-active");
        } else {
            t.onclick = () => Fe(e, n);
        }
    }
    function ue(e) {
        s.create(e._currentView.yearText, "div", "down-arrow");
        const t = s.create(e._currentView.yearText, "div", "years-menu-container");
        const n = s.create(t, "div", "years-menu");
        const i = (new Date).getFullYear();
        let r = null;
        t.style.display = "block";
        t.style.visibility = "hidden";
        for (let t = i - e.title.extraSelectionYears; t < i + e.title.extraSelectionYears; t++) {
            if (o.yearVisible(e, t)) {
                const a = we(e, n, t, i);
                if (!o.defined(r)) {
                    r = a;
                }
            }
        }
        if (o.defined(r)) {
            n.scrollTop = r.offsetTop - n.offsetHeight / 2;
        }
        t.style.display = "none";
        t.style.visibility = "visible";
    }
    function we(e, t, n, o) {
        let i = null;
        const r = e.startMonth === 0 ? n.toString() : `${n} / ${n + 1}`;
        const a = s.createWithHTML(t, "div", "year-menu-item", r);
        if (e._currentView.activeYear !== n) {
            a.onclick = () => {
                e._currentView.activeYear = n;
                B(e);
                l.customEvent(e.events.onSetYear, e._currentView.element, e._currentView.activeYear);
            };
            if (n === o) {
                s.addClass(a, "year-menu-item-current");
            }
        } else {
            s.addClass(a, "year-menu-item-active");
            i = a;
        }
        return i;
    }
    function ge(e) {
        const t = new Date;
        const n = e._currentView.activeYear === t.getFullYear();
        if (e.yearlyStatistics.enabled && (!e.yearlyStatistics.showOnlyForCurrentYear || n)) {
            const i = s.create(e._currentView.container, "div", "yearly-statistics");
            const l = m.Days.get(e);
            const c = m.Months.get(e);
            const d = new Date(e._currentView.activeYear, e.startMonth, 1);
            const w = new Date(e._currentView.activeYear + 1, e.startMonth, 1);
            const g = he(e, l, c, d, w);
            if (e.yearlyStatistics.showToday) {
                let c = We(e)[a.toStorageDate(t)];
                const d = s.create(i, "div", "statistics-box");
                const w = a.getWeekdayNumber(t) + 1;
                if (!o.defined(c) || !o.dayVisible(l, w)) {
                    c = 0;
                }
                const f = n ? r.friendlyNumber(c) : u.text.unavailableText;
                s.createWithHTML(d, "div", "statistics-box-title", `${u.text.todayText}${":"}`);
                const h = s.createWithHTML(d, "div", "statistics-box-count", f);
                if (!n) {
                    s.addClass(h, "unavailable");
                }
                fe(e, h, g, c, n);
            }
            if (e.yearlyStatistics.showThisWeek) {
                let t = 0;
                if (n) {
                    const n = a.getDateForMondayOfCurrentWeek();
                    const o = new Date(n);
                    o.setDate(n.getDate() + 7);
                    t = he(e, l, c, n, o);
                }
                const o = n ? r.friendlyNumber(t) : u.text.unavailableText;
                const d = s.create(i, "div", "statistics-box");
                s.createWithHTML(d, "div", "statistics-box-title", `${u.text.thisWeekText}${":"}`);
                const w = s.createWithHTML(d, "div", "statistics-box-count", o);
                if (!n) {
                    s.addClass(w, "unavailable");
                }
                fe(e, w, g, t, n);
            }
            if (e.yearlyStatistics.showThisMonth) {
                let o = 0;
                if (n) {
                    const n = new Date(t.getFullYear(), t.getMonth(), 1);
                    const i = new Date(t.getFullYear(), t.getMonth(), a.getTotalDaysInMonth(t.getFullYear(), t.getMonth()) + 1);
                    o = he(e, l, c, n, i);
                }
                const d = n ? r.friendlyNumber(o) : u.text.unavailableText;
                const w = s.create(i, "div", "statistics-box");
                s.createWithHTML(w, "div", "statistics-box-title", `${u.text.thisMonthText}${":"}`);
                const f = s.createWithHTML(w, "div", "statistics-box-count", d);
                if (!n) {
                    s.addClass(f, "unavailable");
                }
                fe(e, f, g, o, n);
            }
            if (e.yearlyStatistics.showThisYear) {
                const e = s.create(i, "div", "statistics-box");
                s.createWithHTML(e, "div", "statistics-box-title", `${u.text.thisYearText}${":"}`);
                s.createWithHTML(e, "div", "statistics-box-count", r.friendlyNumber(g));
            }
            if (i.innerHTML === "") {
                i.parentNode.removeChild(i);
            }
        }
    }
    function fe(e, t, n, o, i) {
        if (i && e.yearlyStatistics.showPercentages) {
            const i = o / n * 100;
            if (i !== Number.POSITIVE_INFINITY && i !== Number.NEGATIVE_INFINITY && !isNaN(i)) {
                const n = `${i.toFixed(e.percentageDecimalPoints)}%`;
                const o = s.create(t, "span", "percentage");
                s.createWithHTML(o, "span", "percentage-bracket", "(");
                s.createWithHTML(o, "span", "percentage-text", n);
                s.createWithHTML(o, "span", "percentage-bracket", ")");
            }
        }
    }
    function he(e, t, n, i, r) {
        let s = 0;
        const l = new Date(i);
        while (l < r) {
            const i = We(e)[a.toStorageDate(l)];
            const r = a.getWeekdayNumber(l) + 1;
            if (o.monthVisible(n, l.getMonth()) && o.dayVisible(t, r) && o.definedNumber(i)) {
                s += i;
            }
            l.setDate(l.getDate() + 1);
        }
        return s;
    }
    function me(e, t = false, i) {
        e._currentView.mapContentsContainer = s.create(e._currentView.container, "div", "map-contents-container");
        e._currentView.mapContents = s.create(e._currentView.mapContentsContainer, "div", "map-contents");
        if (!Te(e)) {
            e._currentView.mapContents.style.minHeight = `${n.DEFAULT_MINIMUM_HEIGHT}px`;
            const o = s.createWithHTML(e._currentView.mapContents, "div", "no-data-message", u.text.noMapDataMessage);
            if (t) {
                s.addClass(o, "view-switch");
            }
        } else {
            e._currentView.mapContents.style.minHeight = "unset";
            e._currentView.mapContents.onscroll = () => c.hide(e);
            const r = s.create(e._currentView.mapContents, "div", "map");
            const l = e._currentView.activeYear;
            if (t) {
                s.addClass(r, "view-switch");
            }
            if (e.views.map.showDayNames) {
                const t = s.create(r, "div", "days");
                const n = e.views.map.showMinimalDayNames && e.views.map.daysToShow.length === 7;
                if (!e.views.map.showMonthNames || e.views.map.placeMonthNamesOnTheBottom) {
                    t.className = "days-months-bottom";
                }
                for (let i = 0; i < 7; i++) {
                    if (o.dayVisible(e.views.map.daysToShow, i + 1)) {
                        const o = !n || i % 3 === 0 ? u.text.dayNames[i] : " ";
                        const r = s.createWithHTML(t, "div", "day-name", o);
                        if (e.views.days.enabled) {
                            r.ondblclick = () => Fe(e, 4);
                        }
                        if (!e.views.map.showSpacing) {
                            s.addClass(r, "no-spacing");
                        }
                    }
                }
                if (e.views.map.showDaysInReverseOrder) {
                    s.reverseChildrenOrder(t);
                }
            }
            const d = s.create(r, "div", "months");
            const g = w.getAllSorted(e);
            for (let t = e.startMonth; t < 12 + e.startMonth; t++) {
                let i = t;
                let r = l;
                if (e.startMonth > 0 && t > 11) {
                    i = t - 12;
                    r++;
                }
                if (o.monthVisible(e.views.map.monthsToShow, i)) {
                    const t = s.create(d, "div", "month");
                    const c = s.create(t, "div", "day-columns");
                    const w = new Date(r, i, 1);
                    const f = a.getWeekdayNumber(w);
                    let h = a.getTotalDaysInMonth(r, i);
                    let m = s.create(c, "div", "day-column");
                    let p = false;
                    let y = 1;
                    t.setAttribute(n.Attribute.View.Map.HEAT_JS_MONTH_NUMBER, `${i + 1}`);
                    h += f;
                    for (let t = 0; t < h; t++) {
                        if (t >= f) {
                            p = true;
                        } else {
                            if (o.dayVisible(e.views.map.daysToShow, y)) {
                                const t = s.create(m, "div", "day-disabled");
                                if (!e.views.map.showSpacing) {
                                    s.addClass(t, "no-spacing");
                                }
                            }
                        }
                        if (p) {
                            let n = null;
                            if (o.dayVisible(e.views.map.daysToShow, y)) {
                                n = ve(e, m, t - f, i, r, g);
                            }
                            if ((t + 1) % 7 === 0) {
                                if (e.views.map.showDaysInReverseOrder) {
                                    s.reverseChildrenOrder(m);
                                }
                                m = s.create(c, "div", "day-column");
                                y = 0;
                                if (e._currentView.dayWidth === 0 && o.defined(n)) {
                                    const t = s.getStyleValueByName(n, "margin-left", true);
                                    const o = s.getStyleValueByName(n, "margin-right", true);
                                    e._currentView.dayWidth = n.offsetWidth + t + o;
                                }
                            }
                        }
                        y++;
                    }
                    pe(e, y, m);
                    if (e.views.map.showMonthNames) {
                        let n;
                        const o = t.offsetWidth;
                        const d = new Date(l, i, 1);
                        let w = u.text.monthNames[i];
                        if (e.startMonth > 0 && e.views.map.showYearsInMonthNames) {
                            w += `${" "}${r}`;
                        }
                        if (!e.views.map.placeMonthNamesOnTheBottom) {
                            n = s.createWithHTML(t, "div", "month-name", w, c);
                        } else {
                            n = s.createWithHTML(t, "div", "month-name-bottom", w);
                        }
                        if (e.views.map.showMonthDayGaps) {
                            n.style.width = `${o}px`;
                        } else {
                            n.style.width = `${o - e._currentView.dayWidth}px`;
                        }
                        if (a.isCurrentMonthAndYear(d)) {
                            s.addClass(n, "current");
                        }
                        if (e.views.months.enabled) {
                            n.ondblclick = () => Fe(e, 5);
                        }
                    }
                    if (e.views.map.showMonthsInReverseOrder) {
                        s.reverseChildrenOrder(c);
                    }
                }
            }
            if (e.views.map.showMonthsInReverseOrder) {
                s.reverseChildrenOrder(d);
            }
            ye(e, d);
            _.render(u, e, e._currentView.mapContentsContainer, r, () => {
                B(e, false, false, true);
            });
            if (e.views.map.keepScrollPositions || i) {
                e._currentView.mapContents.scrollLeft = e._currentView.mapContentsScrollLeft;
            }
        }
        e._currentView.mapContentsContainer.style.display = "none";
    }
    function pe(e, t, n) {
        const i = 7 - n.children.length;
        if (i > 0 && i < 7) {
            for (let r = 0; r < i; r++) {
                if (o.dayVisible(e.views.map.daysToShow, t)) {
                    const t = s.create(n, "div", "day-disabled");
                    if (!e.views.map.showSpacing) {
                        s.addClass(t, "no-spacing");
                    }
                }
                t++;
            }
        }
        if (e.views.map.showDaysInReverseOrder) {
            s.reverseChildrenOrder(n);
        }
    }
    function ye(e, t) {
        const n = t.children.length;
        for (let o = 1; o < n; o++) {
            const n = t.children[o];
            const i = n.getElementsByClassName("day-column");
            const r = [].slice.call(i);
            const a = r[0].getElementsByClassName("day-disabled");
            if (!e.views.map.showMonthDayGaps && a.length > 0) {
                n.style.marginLeft = `${-e._currentView.dayWidth}px`;
            } else if (e.views.map.showMonthDayGaps && a.length === 0) {
                n.style.marginLeft = `${e._currentView.dayWidth}px`;
            }
        }
    }
    function ve(e, t, d, g, f, h) {
        const m = d + 1;
        const p = s.create(t, "div", "day");
        const y = new Date(f, g, m);
        const v = o.holiday(e, y);
        const T = i.getNumber(We(e)[a.toStorageDate(y)], 0);
        const b = w.get(e, h, T, y);
        const V = Ze(e, y, T);
        p.setAttribute(n.Attribute.View.Map.HEAT_JS_DATE, `${r.padNumber(m)}-${r.padNumber(g + 1)}-${f}`);
        if (o.defined(b)) {
            p.setAttribute(n.Attribute.View.Map.HEAT_JS_MINIMUM, b.minimum.toString());
        }
        if (e.views.map.showToolTips) {
            c.addForDay(u, e, p, y, T, V, e.views.map.dayToolTipText, e.events.onMapDayToolTipRender, v.matched, e.views.map.showCountsInToolTips, e.views.map.showDifferencesInToolTips);
        }
        if (!e.views.map.showSpacing) {
            s.addClass(p, "no-spacing");
        }
        if (e.views.map.showDayDateNumbers) {
            const e = s.createWithHTML(p, "div", "count-date", m.toString());
            s.createWithHTML(e, "sup", "", a.getDayOrdinal(u, m));
        }
        if (e.views.map.showDayCounts && T > 0) {
            s.createWithHTML(p, "div", "count", r.friendlyNumber(T));
        }
        if (e.views.map.showDifferences && o.definedString(V)) {
            s.createWithHTML(p, "div", "difference", V);
        }
        if (o.definedFunction(e.events.onMapDayClick)) {
            p.onclick = () => l.customEvent(e.events.onMapDayClick, e._currentView.element, y, T, e._currentView.activeYear, v.matched);
        } else if (o.definedFunction(e.events.onMapDayDblClick)) {
            p.ondblclick = () => l.customEvent(e.events.onMapDayDblClick, e._currentView.element, y, T, e._currentView.activeYear, v.matched);
        } else {
            s.addClass(p, "no-hover");
        }
        if (o.defined(b) && w.isVisible(e, b.id)) {
            if (o.definedString(b.mapCssClassName)) {
                s.addClass(p, b.mapCssClassName);
            } else {
                s.addClass(p, b.cssClassName);
            }
        }
        if (e.views.map.highlightCurrentDay && a.isToday(y)) {
            s.addClass(p, "today");
        }
        return p;
    }
    function Te(e) {
        let t = false;
        const n = We(e);
        const o = e._currentView.activeYear.toString();
        const i = (e._currentView.activeYear + 1).toString();
        for (const r in n) {
            if (Object.prototype.hasOwnProperty.call(n, r)) {
                if (a.getStorageDateYear(r) === o) {
                    t = true;
                    break;
                } else if (e.startMonth > 0 && a.getStorageDateYear(r) === i) {
                    t = true;
                    break;
                }
            }
        }
        return t;
    }
    function be(e, t, i) {
        e._currentView.lineContentsContainer = s.create(e._currentView.container, "div", "line-contents-container");
        e._currentView.lineContents = s.create(e._currentView.lineContentsContainer, "div", "line-contents");
        e._currentView.lineContents.onscroll = () => c.hide(e);
        const r = s.create(e._currentView.lineContents, "div", "line");
        const l = s.create(r, "div", "day-lines");
        const d = Ge(e);
        if (t) {
            s.addClass(r, "view-switch");
        }
        if (d === 0) {
            e._currentView.lineContents.style.minHeight = `${n.DEFAULT_MINIMUM_HEIGHT}px`;
            r.parentNode.removeChild(r);
            const o = s.createWithHTML(e._currentView.lineContents, "div", "no-data-message", u.text.noLineDataMessage);
            if (t) {
                s.addClass(o, "view-switch");
            }
        } else {
            const n = e._currentView.activeYear;
            const c = w.getAllSorted(e);
            let d = [];
            for (let i = e.startMonth; i < 12 + e.startMonth; i++) {
                let r = i;
                let s = n;
                if (e.startMonth > 0 && i > 11) {
                    r = i - 12;
                    s++;
                }
                if (o.monthVisible(e.views.line.monthsToShow, r)) {
                    const n = a.getTotalDaysInMonth(s, r);
                    let i = 1;
                    let u = false;
                    for (let w = 0; w < n; w++) {
                        const n = new Date(s, r, i);
                        const g = a.getWeekdayNumber(n) + 1;
                        if (o.dayVisible(e.views.line.daysToShow, g)) {
                            const n = Ve(l, e, w + 1, r, s, c, t);
                            if (!u) {
                                d.push(n);
                                u = true;
                            }
                        }
                        if ((w + 1) % 7 === 0) {
                            i = 0;
                        }
                        i++;
                    }
                }
            }
            if (e.views.line.showInReverseOrder) {
                s.reverseChildrenOrder(l);
                d = d.reverse();
            }
            if (e.views.line.showMonthNames) {
                const t = s.create(e._currentView.lineContents, "div", "line-months");
                let i = 0;
                const r = r => {
                    let l = r + e.startMonth;
                    let c = n;
                    if (e.startMonth > 0 && l > 11) {
                        l -= 12;
                        c++;
                    }
                    if (o.monthVisible(e.views.line.monthsToShow, l)) {
                        const o = new Date(n, l, 1);
                        let r = u.text.monthNames[l];
                        if (e.startMonth > 0 && e.views.line.showYearsInMonthNames) {
                            r += `${" "}${c}`;
                        }
                        const w = s.createWithHTML(t, "div", "month-name", r);
                        if (e.views.line.showInReverseOrder) {
                            let e = d[i].offsetLeft;
                            e -= w.offsetWidth;
                            e += d[i].offsetWidth;
                            w.style.left = `${e}px`;
                        } else {
                            w.style.left = `${d[i].offsetLeft}px`;
                        }
                        if (a.isCurrentMonthAndYear(o)) {
                            s.addClass(w, "current");
                        }
                        if (e.views.months.enabled) {
                            w.ondblclick = () => Fe(e, 5);
                        }
                        i++;
                    }
                };
                if (e.views.line.showInReverseOrder) {
                    for (let e = 12; e--; ) {
                        r(e);
                    }
                } else {
                    for (let e = 0; e < 12; e++) {
                        r(e);
                    }
                }
                t.style.width = `${l.offsetWidth}px`;
            }
            _.render(u, e, e._currentView.lineContentsContainer, r, () => {
                B(e, false, false, true);
            });
            if (e.views.line.keepScrollPositions || i) {
                e._currentView.lineContents.scrollLeft = e._currentView.lineContentsScrollLeft;
            }
        }
        e._currentView.lineContentsContainer.style.display = "none";
    }
    function Ve(e, t, d, g, f, h, m) {
        const p = new Date(f, g, d);
        const y = s.create(e, "div", "day-line");
        const T = o.holiday(t, p);
        const b = i.getNumber(We(t)[a.toStorageDate(p)], 0);
        const V = w.get(t, h, b, p);
        const _ = Ze(t, p, b);
        y.setAttribute(n.Attribute.View.Line.HEAT_JS_DATE, `${r.padNumber(d)}-${r.padNumber(g + 1)}-${f}`);
        if (o.defined(V)) {
            y.setAttribute(n.Attribute.View.Line.HEAT_JS_MINIMUM, V.minimum.toString());
        }
        if (t.views.line.showToolTips) {
            c.addForDay(u, t, y, p, b, _, t.views.line.dayToolTipText, t.events.onLineDayToolTipRender, T.matched, t.views.line.showCountsInToolTips, t.views.line.showDifferencesInToolTips);
        }
        if (o.definedFunction(t.events.onLineDayClick)) {
            y.onclick = () => l.customEvent(t.events.onLineDayClick, t._currentView.element, p, b, t._currentView.activeYear, T.matched);
        } else if (o.definedFunction(t.events.onLineDayDblClick)) {
            y.ondblclick = () => l.customEvent(t.events.onLineDayDblClick, t._currentView.element, p, b, t._currentView.activeYear, T.matched);
        } else {
            s.addClass(y, "no-hover");
        }
        if (o.defined(V) && w.isVisible(t, V.id)) {
            if (o.definedString(V.lineCssClassName)) {
                s.addClass(y, V.lineCssClassName);
            } else {
                s.addClass(y, V.cssClassName);
            }
        }
        v.setHeight(t, y, 100, m, true);
        return y;
    }
    function _e(e, t, i) {
        e._currentView.chartContents = s.create(e._currentView.container, "div", "chart-contents");
        e._currentView.chartContents.onscroll = () => c.hide(e);
        const r = s.create(e._currentView.chartContents, "div", "chart");
        const l = s.create(r, "div", "y-labels");
        const d = s.create(r, "div", "day-lines");
        const g = Ge(e);
        let f = 0;
        if (t) {
            s.addClass(r, "view-switch");
        }
        if (g > 0 && e.views.chart.showChartYLabels) {
            const e = s.createWithHTML(l, "div", "label-100", g.toString());
            const t = s.getStyleValueByName(l, "margin-right", true);
            s.createWithHTML(l, "div", "label-75", (Math.floor(g / 4) * 3).toString());
            s.createWithHTML(l, "div", "label-50", Math.floor(g / 2).toString());
            s.createWithHTML(l, "div", "label-25", Math.floor(g / 4).toString());
            s.createWithHTML(l, "div", "label-0", "0");
            l.style.width = `${e.offsetWidth}px`;
            f = l.offsetWidth + t;
        } else {
            l.parentNode.removeChild(l);
        }
        if (g === 0) {
            e._currentView.chartContents.style.minHeight = `${n.DEFAULT_MINIMUM_HEIGHT}px`;
            r.parentNode.removeChild(r);
            const o = s.createWithHTML(e._currentView.chartContents, "div", "no-data-message", u.text.noChartDataMessage);
            if (t) {
                s.addClass(o, "view-switch");
            }
        } else {
            const n = w.getAllSorted(e);
            const r = s.getStyleValueByName(d, "border-bottom-width", true);
            const l = (d.offsetHeight - r) / g;
            const c = e._currentView.activeYear;
            let h = [];
            let m = false;
            for (let i = e.startMonth; i < 12 + e.startMonth; i++) {
                let r = i;
                let u = c;
                if (e.startMonth > 0 && i > 11) {
                    r = i - 12;
                    u++;
                }
                if (o.monthVisible(e.views.chart.monthsToShow, r)) {
                    const i = a.getTotalDaysInMonth(u, r);
                    let c = 1;
                    let w = false;
                    for (let g = 0; g < i; g++) {
                        const i = new Date(u, r, c);
                        const f = a.getWeekdayNumber(i) + 1;
                        if (o.dayVisible(e.views.chart.daysToShow, f)) {
                            const o = Ce(d, e, g + 1, r, u, n, l, t);
                            if (!w && m && e.views.chart.addMonthSpacing) {
                                s.create(d, "div", "month-spacing", o);
                            }
                            if (!w) {
                                h.push(o);
                                w = true;
                            }
                        }
                        if ((g + 1) % 7 === 0) {
                            c = 0;
                        }
                        c++;
                    }
                }
                m = true;
            }
            if (e.views.chart.showInReverseOrder) {
                s.reverseChildrenOrder(d);
                h = h.reverse();
            }
            if (e.views.chart.showMonthNames) {
                const t = s.create(e._currentView.chartContents, "div", "chart-months");
                let n = 0;
                const i = s.create(t, "div", "month-name-space");
                i.style.height = `${t.offsetHeight}px`;
                i.style.width = `${f}px`;
                const r = i => {
                    let r = i + e.startMonth;
                    let l = c;
                    if (e.startMonth > 0 && r > 11) {
                        r -= 12;
                        l++;
                    }
                    if (o.monthVisible(e.views.chart.monthsToShow, r)) {
                        const o = new Date(c, r, 1);
                        let i = u.text.monthNames[r];
                        if (e.startMonth > 0 && e.views.chart.showYearsInMonthNames) {
                            i += `${" "}${l}`;
                        }
                        const d = s.createWithHTML(t, "div", "month-name", i);
                        if (e.views.chart.showInReverseOrder) {
                            let e = h[n].offsetLeft;
                            e -= d.offsetWidth;
                            e += h[n].offsetWidth;
                            d.style.left = `${e}px`;
                        } else {
                            d.style.left = `${h[n].offsetLeft}px`;
                        }
                        if (a.isCurrentMonthAndYear(o)) {
                            s.addClass(d, "current");
                        }
                        if (e.views.months.enabled) {
                            d.ondblclick = () => Fe(e, 5);
                        }
                        n++;
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
                t.style.width = `${d.offsetWidth}px`;
            }
            if (e.views.chart.keepScrollPositions || i) {
                e._currentView.chartContents.scrollLeft = e._currentView.chartContentsScrollLeft;
            }
        }
        e._currentView.chartContents.style.display = "none";
    }
    function Ce(e, t, d, g, f, h, m, p) {
        const y = new Date(f, g, d);
        const T = s.create(e, "div", "day-line");
        const b = o.holiday(t, y);
        const V = i.getNumber(We(t)[a.toStorageDate(y)], 0);
        const _ = w.get(t, h, V, y);
        const C = Ze(t, y, V);
        T.setAttribute(n.Attribute.View.Chart.HEAT_JS_DATE, `${r.padNumber(d)}-${r.padNumber(g + 1)}-${f}`);
        if (o.defined(_)) {
            T.setAttribute(n.Attribute.View.Chart.HEAT_JS_MINIMUM, _.minimum.toString());
        }
        if (t.views.chart.showToolTips) {
            c.addForDay(u, t, T, y, V, C, t.views.chart.dayToolTipText, t.events.onChartDayToolTipRender, b.matched, t.views.chart.showCountsInToolTips, t.views.chart.showDifferencesInToolTips);
        }
        if (t.views.chart.showLineCounts || t.views.chart.showLineDateNumbers) {
            s.addClass(T, "day-line-count");
        }
        if (t.views.chart.showLineDateNumbers) {
            const e = s.createWithHTML(T, "div", "count-date", d.toString());
            s.createWithHTML(e, "sup", "", a.getDayOrdinal(u, d));
        }
        if (t.views.chart.showLineCounts && V > 0) {
            s.createWithHTML(T, "div", "count", r.friendlyNumber(V));
        }
        if (t.views.chart.showDifferences && o.definedString(C)) {
            s.createWithHTML(T, "div", "difference", C);
        }
        const D = V * m;
        if (D <= 0) {
            T.style.visibility = "hidden";
        }
        if (o.definedFunction(t.events.onChartDayClick)) {
            T.onclick = () => l.customEvent(t.events.onChartDayClick, t._currentView.element, y, V, t._currentView.activeYear, b.matched);
        } else if (o.definedFunction(t.events.onChartDayDblClick)) {
            T.ondblclick = () => l.customEvent(t.events.onChartDayDblClick, t._currentView.element, y, V, t._currentView.activeYear, b.matched);
        } else {
            s.addClass(T, "no-hover");
        }
        if (o.defined(_) && w.isVisible(t, _.id)) {
            if (o.definedString(_.chartCssClassName)) {
                s.addClass(T, _.chartCssClassName);
            } else {
                s.addClass(T, _.cssClassName);
            }
        }
        if (t.views.chart.highlightCurrentDay && a.isToday(y)) {
            s.addClass(T, "today");
        }
        if (t.views.chart.useGradients) {
            s.addGradientEffect(t._currentView.element, T);
        }
        v.setHeight(t, T, D, p);
        return T;
    }
    function De(e, t) {
        e._currentView.daysContents = s.create(e._currentView.container, "div", "days-contents");
        const i = s.create(e._currentView.daysContents, "div", "days");
        const r = s.create(e._currentView.daysContents, "div", "day-names");
        const l = s.create(i, "div", "y-labels");
        const c = s.create(i, "div", "day-lines");
        const d = w.getAllSorted(e);
        const g = Se(e, d);
        const f = new Date;
        const h = a.getWeekdayNumber(f) + 1;
        if (t && (!e.views.days.useDifferentOpacities || !e.views.days.showDayCounts)) {
            s.addClass(i, "view-switch");
        }
        if (g.largestValue > 0 && e.views.days.showChartYLabels) {
            const e = s.createWithHTML(l, "div", "label-100", g.largestValue.toString());
            const t = s.getStyleValueByName(l, "margin-right", true);
            s.createWithHTML(l, "div", "label-75", (Math.floor(g.largestValue / 4) * 3).toString());
            s.createWithHTML(l, "div", "label-50", Math.floor(g.largestValue / 2).toString());
            s.createWithHTML(l, "div", "label-25", Math.floor(g.largestValue / 4).toString());
            s.createWithHTML(l, "div", "label-0", "0");
            l.style.width = `${e.offsetWidth}px`;
            r.style.paddingLeft = `${l.offsetWidth + t}px`;
        } else {
            l.parentNode.removeChild(l);
        }
        if (g.largestValue === 0) {
            e._currentView.daysContents.style.minHeight = `${n.DEFAULT_MINIMUM_HEIGHT}px`;
            i.parentNode.removeChild(i);
            r.parentNode.removeChild(r);
            const o = s.createWithHTML(e._currentView.daysContents, "div", "no-days-message", u.text.noDaysDataMessage);
            if (t) {
                s.addClass(o, "view-switch");
            }
        } else {
            const n = s.getStyleValueByName(c, "border-bottom-width", true);
            const i = (c.offsetHeight - n) / g.largestValue;
            for (const n in g.values) {
                if (Object.prototype.hasOwnProperty.call(g.values, n) && o.dayVisible(e.views.days.daysToShow, parseInt(n))) {
                    const a = g.valueOpacities[g.values[n].total];
                    const l = xe(c, parseInt(n), g.values[n].total, e, i, a, g.totalValue, t);
                    if (e.views.days.showDayNames) {
                        const t = s.createWithHTML(r, "div", "day-name", u.text.dayNames[parseInt(n) - 1]);
                        if (f.getFullYear() === e._currentView.activeYear && h === parseInt(n)) {
                            s.addClass(t, "current");
                        }
                    }
                    if (e.views.days.showStackedColorRanges) {
                        for (const e in g.values[n].typeTotals) {
                            if (Object.prototype.hasOwnProperty.call(g.values[n].typeTotals, e)) {
                                const t = g.values[n].typeTotals[e];
                                const r = t * i;
                                const a = w.getByMinimum(d, parseInt(e));
                                if (r > 0) {
                                    const e = l.children.length > 0 ? l.children[0] : null;
                                    const t = s.create(l, "div", "stacked-color-range", e);
                                    t.style.height = `${r}px`;
                                    if (o.defined(a)) {
                                        if (o.definedString(a.daysCssClassName)) {
                                            s.addClass(t, a.daysCssClassName);
                                        } else {
                                            s.addClass(t, a.cssClassName);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (e.views.days.showInReverseOrder) {
                s.reverseChildrenOrder(c);
                s.reverseChildrenOrder(r);
            }
            if (e.views.days.keepScrollPositions) {
                e._currentView.daysContents.scrollLeft = e._currentView.daysContentsScrollLeft;
            }
        }
        e._currentView.daysContents.style.display = "none";
    }
    function xe(e, t, i, w, g, f, h, m) {
        const p = s.create(e, "div", "day-line");
        const y = i * g;
        let T = null;
        p.setAttribute(n.Attribute.View.Days.HEAT_JS_NUMBER, t.toString());
        if (y <= 0) {
            p.style.visibility = "hidden";
        }
        if (!w.views.days.showStackedColorRanges) {
            s.addClass(p, "non-stacked");
        } else {
            s.addClass(p, "stacked");
        }
        if (w.views.days.showToolTips) {
            let e = a.getCustomFormattedDateText(u, w.views.days.dayToolTipText, new Date(w._currentView.activeYear, 0, 1), false, t - 1);
            e += `${":"}${" "}<b class="tooltip-count">${r.friendlyNumber(i)}</b>`;
            c.add(p, w, e);
        }
        if (o.definedFunction(w.events.onWeekDayClick)) {
            p.onclick = () => l.customEvent(w.events.onWeekDayClick, w._currentView.element, t, i, w._currentView.activeYear);
        } else if (o.definedFunction(w.events.onWeekDayDblClick)) {
            p.ondblclick = () => l.customEvent(w.events.onWeekDayDblClick, w._currentView.element, t, i, w._currentView.activeYear);
        } else {
            s.addClass(p, "no-hover");
        }
        if (w.views.days.showDayCounts && i > 0) {
            s.addClass(p, "day-line-count");
            T = s.createWithHTML(p, "div", "count", r.friendlyNumber(i));
            if (w.views.days.showDayCountPercentages) {
                s.createWithHTML(T, "div", "percentage", `${(i / h * 100).toFixed(w.percentageDecimalPoints)}%`);
            }
        }
        if (!w.views.days.showStackedColorRanges) {
            if (w.views.days.useGradients) {
                s.addGradientEffect(w._currentView.element, p);
                if (o.defined(T)) {
                    s.addClass(T, "blend-colors");
                }
            } else if (w.views.days.useDifferentOpacities) {
                const e = s.getStyleValueByName(p, "background-color");
                const t = s.getStyleValueByName(p, "border-color");
                if (o.defined(T)) {
                    s.addClass(T, "blend-colors");
                }
                if (o.rgbColor(e)) {
                    p.style.backgroundColor = d.toRgbOpacityColor(e, f);
                } else if (o.hexColor(e)) {
                    p.style.backgroundColor = d.toRgbOpacityColor(d.hexToRgba(e), f);
                }
                if (o.rgbColor(t)) {
                    p.style.borderColor = d.toRgbOpacityColor(t, f);
                } else if (o.hexColor(t)) {
                    p.style.borderColor = d.toRgbOpacityColor(d.hexToRgba(t), f);
                }
            }
        }
        v.setHeight(w, p, y, m);
        return p;
    }
    function Se(e, t) {
        const n = {
            values: b.largestValueForViewValues(7),
            valueOpacities: {},
            largestValue: 0,
            totalValue: 0
        };
        const i = We(e);
        const r = e._currentView.activeYear;
        for (let s = e.startMonth; s < 12 + e.startMonth; s++) {
            let l = s;
            let c = r;
            if (e.startMonth > 0 && s > 11) {
                l = s - 12;
                c++;
            }
            if (o.monthVisible(e.views.days.monthsToShow, l)) {
                const r = a.getTotalDaysInMonth(c, l);
                for (let s = 0; s < r; s++) {
                    const r = a.toStorageDate(new Date(c, l, s + 1));
                    if (Object.prototype.hasOwnProperty.call(i, r)) {
                        const d = new Date(c, l, s + 1);
                        const u = a.getWeekdayNumber(d) + 1;
                        if (!o.holiday(e, d).matched && o.dayVisible(e.views.days.daysToShow, u)) {
                            const a = i[r];
                            const s = w.get(e, t, a);
                            if (!o.defined(s) || s.visible) {
                                const e = o.defined(s) ? s.minimum.toString() : "0";
                                n.values[u].total += a;
                                n.totalValue += a;
                                n.largestValue = Math.max(n.largestValue, n.values[u].total);
                                if (!Object.prototype.hasOwnProperty.call(n.values[u].typeTotals, e)) {
                                    n.values[u].typeTotals[e] = 0;
                                }
                                n.values[u].typeTotals[e] += a;
                            }
                        }
                    }
                }
            }
        }
        d.valuesToOpacitiesOrder(n);
        return n;
    }
    function Me(e, t) {
        e._currentView.monthsContents = s.create(e._currentView.container, "div", "months-contents");
        const i = s.create(e._currentView.monthsContents, "div", "months");
        const r = s.create(e._currentView.monthsContents, "div", "month-names");
        const l = s.create(i, "div", "y-labels");
        const c = s.create(i, "div", "month-lines");
        const d = w.getAllSorted(e);
        const g = Oe(e, d);
        if (t && (!e.views.months.useDifferentOpacities || !e.views.months.showMonthCounts)) {
            s.addClass(i, "view-switch");
        }
        if (g.largestValue > 0 && e.views.months.showChartYLabels) {
            const e = s.createWithHTML(l, "div", "label-100", g.largestValue.toString());
            const t = s.getStyleValueByName(l, "margin-right", true);
            s.createWithHTML(l, "div", "label-75", (Math.floor(g.largestValue / 4) * 3).toString());
            s.createWithHTML(l, "div", "label-50", Math.floor(g.largestValue / 2).toString());
            s.createWithHTML(l, "div", "label-25", Math.floor(g.largestValue / 4).toString());
            s.createWithHTML(l, "div", "label-0", "0");
            l.style.width = `${e.offsetWidth}px`;
            r.style.paddingLeft = `${l.offsetWidth + t}px`;
        } else {
            l.parentNode.removeChild(l);
        }
        if (g.largestValue === 0) {
            e._currentView.monthsContents.style.minHeight = `${n.DEFAULT_MINIMUM_HEIGHT}px`;
            i.parentNode.removeChild(i);
            r.parentNode.removeChild(r);
            const o = s.createWithHTML(e._currentView.monthsContents, "div", "no-months-message", u.text.noMonthsDataMessage);
            if (t) {
                s.addClass(o, "view-switch");
            }
        } else {
            const n = s.getStyleValueByName(c, "border-bottom-width", true);
            const i = (c.offsetHeight - n) / g.largestValue;
            const l = e._currentView.activeYear;
            for (let n = e.startMonth; n < 12 + e.startMonth; n++) {
                let f = n;
                if (e.startMonth > 0 && n > 11) {
                    f = n - 12;
                }
                const h = f + 1;
                if (Object.prototype.hasOwnProperty.call(g.values, h) && o.monthVisible(e.views.months.monthsToShow, f)) {
                    const n = g.valueOpacities[g.values[h].total];
                    const m = Be(c, h, g.values[h].total, e, i, n, g.totalValue, t);
                    if (e.views.months.showMonthNames) {
                        const e = s.createWithHTML(r, "div", "month-name", u.text.monthNames[f]);
                        const t = new Date(l, f, 1);
                        if (a.isCurrentMonthAndYear(t)) {
                            s.addClass(e, "current");
                        }
                    }
                    if (e.views.months.showStackedColorRanges) {
                        for (const e in g.values[h].typeTotals) {
                            if (Object.prototype.hasOwnProperty.call(g.values[h].typeTotals, e)) {
                                const t = g.values[h].typeTotals[e];
                                const n = t * i;
                                const r = w.getByMinimum(d, parseInt(e));
                                if (n > 0) {
                                    const e = m.children.length > 0 ? m.children[0] : null;
                                    const t = s.create(m, "div", "stacked-color-range", e);
                                    t.style.height = `${n}px`;
                                    if (o.defined(r)) {
                                        if (o.definedString(r.monthsCssClassName)) {
                                            s.addClass(t, r.monthsCssClassName);
                                        } else {
                                            s.addClass(t, r.cssClassName);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (e.views.months.showInReverseOrder) {
                s.reverseChildrenOrder(c);
                s.reverseChildrenOrder(r);
            }
            if (e.views.months.keepScrollPositions) {
                e._currentView.monthsContents.scrollLeft = e._currentView.monthsContentsScrollLeft;
            }
        }
        e._currentView.monthsContents.style.display = "none";
    }
    function Be(e, t, i, w, g, f, h, m) {
        const p = s.create(e, "div", "month-line");
        const y = i * g;
        const T = new Date;
        let b = null;
        p.setAttribute(n.Attribute.View.Month.HEAT_JS_NUMBER, t.toString());
        if (!w.views.months.showStackedColorRanges) {
            s.addClass(p, "non-stacked");
        } else {
            s.addClass(p, "stacked");
        }
        if (y <= 0) {
            p.style.visibility = "hidden";
        }
        if (w.views.months.showToolTips) {
            let e = a.getCustomFormattedDateText(u, w.views.months.monthToolTipText, new Date(w._currentView.activeYear, t - 1, 1));
            e += `${":"}${" "}<b class="tooltip-count">${r.friendlyNumber(i)}</b>`;
            c.add(p, w, e);
        }
        let V = w._currentView.activeYear;
        if (w.startMonth > 0 && t - 1 < w.startMonth) {
            V++;
        }
        if (o.definedFunction(w.events.onMonthClick)) {
            p.onclick = () => l.customEvent(w.events.onMonthClick, w._currentView.element, t, i, V);
        } else if (o.definedFunction(w.events.onMonthDblClick)) {
            p.ondblclick = () => l.customEvent(w.events.onMonthDblClick, w._currentView.element, t, i, V);
        } else {
            s.addClass(p, "no-hover");
        }
        if (w.views.months.showMonthCounts && i > 0) {
            s.addClass(p, "month-line-count");
            b = s.createWithHTML(p, "div", "count", r.friendlyNumber(i));
            if (w.views.months.showMonthCountPercentages) {
                s.createWithHTML(b, "div", "percentage", `${(i / h * 100).toFixed(w.percentageDecimalPoints)}%`);
            }
        }
        if (w.views.months.highlightCurrentMonth && T.getMonth() === t - 1 && w._currentView.activeYear === T.getFullYear()) {
            s.addClass(p, "today");
        }
        if (!w.views.months.showStackedColorRanges) {
            if (w.views.months.useGradients) {
                s.addGradientEffect(w._currentView.element, p);
                if (o.defined(b)) {
                    s.addClass(b, "blend-colors");
                }
            } else if (w.views.months.useDifferentOpacities) {
                const e = s.getStyleValueByName(p, "background-color");
                const t = s.getStyleValueByName(p, "border-color");
                if (o.defined(b)) {
                    s.addClass(b, "blend-colors");
                }
                if (o.rgbColor(e)) {
                    p.style.backgroundColor = d.toRgbOpacityColor(e, f);
                } else if (o.hexColor(e)) {
                    p.style.backgroundColor = d.toRgbOpacityColor(d.hexToRgba(e), f);
                }
                if (o.rgbColor(t)) {
                    p.style.borderColor = d.toRgbOpacityColor(t, f);
                } else if (o.hexColor(t)) {
                    p.style.borderColor = d.toRgbOpacityColor(d.hexToRgba(t), f);
                }
            }
        }
        v.setHeight(w, p, y, m);
        return p;
    }
    function Oe(e, t) {
        const n = {
            values: b.largestValueForViewValues(12),
            valueOpacities: {},
            largestValue: 0,
            totalValue: 0
        };
        const i = We(e);
        const r = e._currentView.activeYear;
        for (let s = e.startMonth; s < 12 + e.startMonth; s++) {
            let l = s;
            let c = r;
            if (e.startMonth > 0 && s > 11) {
                l = s - 12;
                c++;
            }
            if (o.monthVisible(e.views.months.monthsToShow, l)) {
                const r = l + 1;
                const s = a.getTotalDaysInMonth(c, l);
                for (let d = 0; d < s; d++) {
                    const s = a.toStorageDate(new Date(c, l, d + 1));
                    if (Object.prototype.hasOwnProperty.call(i, s)) {
                        const u = new Date(c, l, d + 1);
                        const g = a.getWeekdayNumber(u) + 1;
                        if (!o.holiday(e, u).matched && o.dayVisible(e.views.days.daysToShow, g)) {
                            const a = i[s];
                            const l = w.get(e, t, a);
                            if (!o.defined(l) || l.visible) {
                                const e = o.defined(l) ? l.minimum.toString() : "0";
                                n.values[r].total += a;
                                n.totalValue += a;
                                n.largestValue = Math.max(n.largestValue, n.values[r].total);
                                if (!Object.prototype.hasOwnProperty.call(n.values[r].typeTotals, e)) {
                                    n.values[r].typeTotals[e] = 0;
                                }
                                n.values[r].typeTotals[e] += a;
                            }
                        }
                    }
                }
            }
        }
        d.valuesToOpacitiesOrder(n);
        return n;
    }
    function Ne(e, t) {
        e._currentView.colorRangesContents = s.create(e._currentView.container, "div", "color-ranges-contents");
        const i = s.create(e._currentView.colorRangesContents, "div", "color-ranges");
        const r = s.create(e._currentView.colorRangesContents, "div", "color-range-names");
        const a = s.create(i, "div", "y-labels");
        const l = s.create(i, "div", "color-range-lines");
        const c = w.getAllSorted(e);
        const d = ke(e, c);
        if (t) {
            s.addClass(i, "view-switch");
        }
        if (d.largestValue > 0 && e.views.colorRanges.showChartYLabels) {
            const e = s.createWithHTML(a, "div", "label-100", d.largestValue.toString());
            const t = s.getStyleValueByName(a, "margin-right", true);
            s.createWithHTML(a, "div", "label-75", (Math.floor(d.largestValue / 4) * 3).toString());
            s.createWithHTML(a, "div", "label-50", Math.floor(d.largestValue / 2).toString());
            s.createWithHTML(a, "div", "label-25", Math.floor(d.largestValue / 4).toString());
            s.createWithHTML(a, "div", "label-0", "0");
            a.style.width = `${e.offsetWidth}px`;
            r.style.paddingLeft = `${a.offsetWidth + t}px`;
        } else {
            a.parentNode.removeChild(a);
        }
        if (d.largestValue === 0) {
            e._currentView.colorRangesContents.style.minHeight = `${n.DEFAULT_MINIMUM_HEIGHT}px`;
            i.parentNode.removeChild(i);
            r.parentNode.removeChild(r);
            const o = s.createWithHTML(e._currentView.colorRangesContents, "div", "no-color-ranges-message", u.text.noColorRangesDataMessage);
            if (t) {
                s.addClass(o, "view-switch");
            }
        } else {
            const n = s.getStyleValueByName(l, "border-bottom-width", true);
            const i = (l.offsetHeight - n) / d.largestValue;
            if (!e.views.colorRanges.showColorRangeLabels) {
                r.parentNode.removeChild(r);
            }
            for (const n in d.types) {
                if (Object.prototype.hasOwnProperty.call(d.types, n)) {
                    Ae(parseInt(n), l, d.types[n], e, c, i, d.totalValue, t);
                    const a = w.getByMinimum(c, parseInt(n));
                    if (e.views.colorRanges.showColorRangeLabels) {
                        if (!e.views.colorRanges.useColorRangeNamesForLabels || !o.defined(a) || !o.definedString(a.name)) {
                            s.createWithHTML(r, "div", "color-range-name", `${n}${"+"}`);
                        } else {
                            s.createWithHTML(r, "div", "color-range-name", a.name);
                        }
                    }
                }
            }
            if (e.views.colorRanges.showInReverseOrder) {
                s.reverseChildrenOrder(l);
                s.reverseChildrenOrder(r);
            }
            if (e.views.colorRanges.keepScrollPositions) {
                e._currentView.colorRangesContents.scrollLeft = e._currentView.colorRangesContentsScrollLeft;
            }
        }
        e._currentView.colorRangesContents.style.display = "none";
    }
    function Ae(e, t, i, a, d, u, g, f) {
        const h = s.create(t, "div", "color-range-line");
        const m = i * u;
        const p = w.getByMinimum(d, e);
        if (o.defined(p) && o.definedString(p.name)) {
            h.setAttribute(n.Attribute.View.ColorRanges.HEAT_JS_COLOR_RANGE_NAME, p.name);
            h.setAttribute(n.Attribute.View.ColorRanges.HEAT_JS_MINIMUM, p.minimum.toString());
        }
        if (m <= 0) {
            h.style.visibility = "hidden";
        }
        if (a.views.colorRanges.showToolTips) {
            let e;
            if (o.defined(p) && o.definedString(p.name) && a.views.colorRanges.showRangeNamesInToolTips) {
                e = `${p.name}${":"}${" "}<b class="tooltip-count">${r.friendlyNumber(i)}</b>`;
            } else {
                e = r.friendlyNumber(i);
            }
            c.add(h, a, e);
        }
        if (a.views.colorRanges.showRangeCounts && i > 0) {
            s.addClass(h, "color-range-line-count");
            const e = s.createWithHTML(h, "div", "count", r.friendlyNumber(i));
            if (a.views.colorRanges.showRangeCountPercentages) {
                s.createWithHTML(e, "div", "percentage", `${(i / g * 100).toFixed(a.percentageDecimalPoints)}%`);
            }
        }
        if (o.definedFunction(a.events.onColorRangeClick)) {
            h.onclick = () => l.customEvent(a.events.onColorRangeClick, a._currentView.element, p, i, a._currentView.activeYear);
        } else if (o.definedFunction(a.events.onColorRangeDblClick)) {
            h.ondblclick = () => l.customEvent(a.events.onColorRangeDblClick, p, i, a._currentView.activeYear);
        } else {
            s.addClass(h, "no-hover");
        }
        if (o.defined(p) && w.isVisible(a, p.id)) {
            if (o.definedString(p.colorRangeCssClassName)) {
                s.addClass(h, p.colorRangeCssClassName);
            } else {
                s.addClass(h, p.cssClassName);
            }
        }
        if (a.views.colorRanges.useGradients) {
            s.addGradientEffect(a._currentView.element, h);
        }
        v.setHeight(a, h, m, f);
    }
    function ke(e, t) {
        const n = We(e);
        const i = e._currentView.activeYear;
        const r = t.length;
        const s = {
            types: {},
            largestValue: 0,
            totalValue: 0
        };
        s.types["0"] = 0;
        for (let e = 0; e < r; e++) {
            s.types[t[e].minimum.toString()] = 0;
        }
        for (let r = e.startMonth; r < 12 + e.startMonth; r++) {
            let l = r;
            let c = i;
            if (e.startMonth > 0 && r > 11) {
                l = r - 12;
                c++;
            }
            if (o.monthVisible(e.views.colorRanges.monthsToShow, l)) {
                const i = a.getTotalDaysInMonth(c, l);
                for (let r = 0; r < i; r++) {
                    const i = a.toStorageDate(new Date(c, l, r + 1));
                    if (Object.prototype.hasOwnProperty.call(n, i)) {
                        const d = new Date(c, l, r + 1);
                        const u = a.getWeekdayNumber(d) + 1;
                        if (!o.holiday(e, d).matched && o.dayVisible(e.views.colorRanges.daysToShow, u)) {
                            const r = w.get(e, t, n[i]);
                            const a = o.defined(r) ? r.minimum.toString() : "0";
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
    function Le(e) {
        const t = s.create(e._currentView.container, "div", "guide");
        const n = s.create(t, "div", "map-types");
        const i = Ye(e);
        const r = D[e._currentView.element.id].totalTypes;
        if (r > 1 || e.guide.allowTypeAdding) {
            if (o.definedString(e.description.text)) {
                const n = s.create(e._currentView.container, "div", "description", t);
                Ee(e, n);
            }
            if (r > 1) {
                const t = Object.keys(D[e._currentView.element.id].typeData).sort((e, t) => e.localeCompare(t, void 0, {
                    numeric: true,
                    sensitivity: "base"
                }));
                const o = t.length;
                for (let r = 0; r < o; r++) {
                    const o = t[r];
                    if (o !== u.text.unknownTrendText || i > 0) {
                        Re(e, n, o);
                    }
                }
            }
            if (e.guide.allowTypeAdding) {
                const t = s.createIconButton(n, "button", "add", "plus");
                c.add(t, e, u.text.addTypeText);
                t.onclick = () => ee(e);
            }
        } else {
            Ee(e, n);
        }
        if (e.guide.enabled) {
            const n = s.create(t, "div", "map-toggles");
            if (e.guide.showInvertLabel) {
                const t = s.createWithHTML(n, "div", "invert-text", u.text.invertText);
                if (e.guide.colorRangeTogglesEnabled) {
                    t.onclick = () => {
                        if (w.invertVisibleStates(e)) {
                            B(e, false, false, true);
                        }
                    };
                } else {
                    s.addClass(t, "no-click");
                }
            }
            if (e.guide.showLessAndMoreLabels) {
                const t = s.createWithHTML(n, "div", "less-text", u.text.lessText);
                if (e.guide.colorRangeTogglesEnabled) {
                    t.onclick = () => {
                        if (w.updateAllVisibleStates(e, false)) {
                            B(e, false, false, true);
                        }
                    };
                } else {
                    s.addClass(t, "no-click");
                }
            }
            const o = s.create(n, "div", "toggles");
            const i = w.getAllSorted(e);
            const r = i.length;
            const a = [];
            let l = 0;
            for (let t = 0; t < r; t++) {
                const n = Ie(e, o, i[t]);
                l = Math.max(l, n.offsetWidth);
                a.push(n);
            }
            if (e.guide.showNumbersInGuide) {
                const e = a.length;
                for (let t = 0; t < e; t++) {
                    a[t].style.width = `${l}px`;
                }
            }
            if (e.guide.showLessAndMoreLabels) {
                const t = s.createWithHTML(n, "div", "more-text", u.text.moreText);
                if (e.guide.colorRangeTogglesEnabled) {
                    t.onclick = () => {
                        if (w.updateAllVisibleStates(e, true)) {
                            B(e, false, false, true);
                        }
                    };
                } else {
                    s.addClass(t, "no-click");
                }
            }
        }
    }
    function Re(e, t, n) {
        const o = s.createButton(t, "button", "type", n);
        if (e.guide.allowTypeRemoving) {
            const t = s.create(o, "span", "clear");
            c.add(t, e, u.text.removeTypeText);
            t.onclick = t => {
                s.cancelBubble(t);
                ie(e, u.text.removeTypeConfirmText, () => {
                    Je(e, n);
                    B(e, true);
                });
            };
        }
        if (e._currentView.activeType === n) {
            s.addClass(o, "active");
        }
        o.onclick = () => {
            if (e._currentView.activeType !== n) {
                e._currentView.activeType = n;
                l.customEvent(e.events.onTypeSwitch, e._currentView.element, n);
                B(e);
            }
        };
        if (e.guide.allowTypeAdding) {
            o.ondblclick = () => ee(e, n);
        }
    }
    function Ie(e, t, o) {
        const i = s.create(t, "div");
        i.className = "toggle";
        i.setAttribute(n.Attribute.Area.ColorRangeToggle.HEAT_JS_MINIMUM, o.minimum.toString());
        if (e.guide.showToolTips) {
            c.add(i, e, o.tooltipText);
        }
        if (w.isVisible(e, o.id)) {
            s.addClass(i, w.getGuideCssClassName(e, o));
        }
        if (e.guide.showNumbersInGuide) {
            s.addClass(i, "toggle-number");
            i.innerHTML = `${o.minimum}${"+"}`;
        }
        if (e.guide.colorRangeTogglesEnabled) {
            i.onclick = () => {
                if (w.toggleVisibleState(e, o.id)) {
                    B(e, false, false, true);
                }
            };
        } else {
            s.addClass(i, "no-hover");
        }
        return i;
    }
    function Ee(e, t) {
        if (o.definedString(e.description.text)) {
            if (o.definedString(e.description.url)) {
                const n = s.createWithHTML(t, "a", "label", e.description.text);
                n.href = e.description.url;
                n.target = e.description.urlTarget;
            } else {
                s.createWithHTML(t, "span", "label", e.description.text);
            }
        }
    }
    function Fe(e, t) {
        if (e._currentView.activeView !== t) {
            e._currentView.activeView = t;
            l.customEvent(e.events.onViewSwitch, e._currentView.element, m.View.getName(e, t));
            B(e, false, true);
        }
    }
    function $e(e, t) {
        if (e._currentView.activeType !== t) {
            e._currentView.activeType = t;
            l.customEvent(e.events.onTypeSwitch, e._currentView.element, t);
            B(e);
        }
    }
    function He(e) {
        const t = Ye(e);
        if (D[e._currentView.element.id].totalTypes > 1) {
            for (const n in D[e._currentView.element.id].typeData) {
                if (n !== u.text.unknownTrendText || t > 0) {
                    if (t === 0 && e._currentView.activeType === u.text.unknownTrendText) {
                        e._currentView.activeType = n;
                    }
                }
            }
        }
    }
    function Ye(e) {
        let t = 0;
        for (const n in D[e._currentView.element.id].typeData[u.text.unknownTrendText]) {
            if (Object.prototype.hasOwnProperty.call(D[e._currentView.element.id].typeData[u.text.unknownTrendText], n)) {
                t++;
                break;
            }
        }
        return t;
    }
    function je(e, t, n = true) {
        D[e] = {
            options: t,
            typeData: {},
            totalTypes: 1
        };
        D[e].typeData[u.text.unknownTrendText] = {};
        if (n && !t._currentView.isInFetchMode) {
            T.load(u, t, D[e]);
        }
    }
    function We(e) {
        return D[e._currentView.element.id].typeData[e._currentView.activeType];
    }
    function Pe(e) {
        return Object.keys(We(e)).length > 0;
    }
    function ze(e) {
        let t = [];
        if (e.showOnlyDataForYearsAvailable) {
            const n = We(e);
            for (const e in n) {
                if (Object.prototype.hasOwnProperty.call(n, e)) {
                    const n = parseInt(a.getStorageDateYear(e));
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
        const t = e._currentView.activeYear;
        const n = We(e);
        for (let o = e.startMonth; o < 12 + e.startMonth; o++) {
            let i = o;
            let r = t;
            if (e.startMonth > 0 && o > 11) {
                i = o - 12;
                r++;
            }
            const s = a.getTotalDaysInMonth(r, i);
            for (let e = 0; e < s; e++) {
                const t = new Date(r, i, e + 1);
                const o = a.toStorageDate(t);
                if (Object.prototype.hasOwnProperty.call(n, o)) {
                    delete n[o];
                }
            }
        }
        l.customEvent(e.events.onClearViewableData, e._currentView.element);
    }
    function Je(e, t) {
        delete D[e._currentView.element.id].typeData[t];
        D[e._currentView.element.id].totalTypes--;
        const n = Object.keys(D[e._currentView.element.id].typeData).sort((e, t) => e.localeCompare(t, void 0, {
            numeric: true,
            sensitivity: "base"
        }));
        e._currentView.activeType = n[0];
        l.customEvent(e.events.onRemoveType, e._currentView.element, t);
    }
    function Ge(e) {
        let t = 0;
        const n = We(e);
        const i = e._currentView.activeYear;
        for (let r = e.startMonth; r < 12 + e.startMonth; r++) {
            let s = r;
            let l = i;
            if (e.startMonth > 0 && r > 11) {
                s = r - 12;
                l++;
            }
            if (o.monthVisible(e.views.chart.monthsToShow, s)) {
                const i = a.getTotalDaysInMonth(l, s);
                for (let r = 0; r < i; r++) {
                    const i = new Date(l, s, r + 1);
                    const c = a.toStorageDate(i);
                    const d = a.getWeekdayNumber(i) + 1;
                    if (Object.prototype.hasOwnProperty.call(n, c)) {
                        if (o.dayVisible(e.views.chart.daysToShow, d)) {
                            t = Math.max(t, n[c]);
                        }
                    }
                }
            }
        }
        return t;
    }
    function Ze(e, t, n) {
        let o = null;
        if (n > 0) {
            const r = new Date(t);
            r.setFullYear(r.getFullYear() - 1);
            const s = i.getNumber(We(e)[a.toStorageDate(r)], 0);
            if (s > 0) {
                const t = Math.abs(n - s) / ((n + s) / 2) * 100;
                if (t > 0) {
                    o = `${t.toFixed(e.percentageDecimalPoints)}%`;
                    if (n > s) {
                        o = `+${o}`;
                    } else {
                        o = `-${o}`;
                    }
                }
            }
        }
        return o;
    }
    function Xe(e) {
        if (e._currentView.isInFetchMode) {
            if (e._currentView.isInFetchModeTimer === 0) {
                qe(e);
            }
            if (e._currentView.isInFetchModeTimer === 0) {
                e._currentView.isInFetchModeTimer = setInterval(() => {
                    qe(e);
                    B(e);
                }, e.dataFetchDelay);
            }
        }
    }
    function qe(e) {
        const t = e._currentView.element.id;
        const n = l.customEvent(e.events.onDataFetch, e._currentView.element, t);
        if (o.definedObject(n)) {
            je(t, e, false);
            for (const e in n) {
                if (Object.prototype.hasOwnProperty.call(n, e)) {
                    if (!Object.prototype.hasOwnProperty.call(D[t].typeData[u.text.unknownTrendText], e)) {
                        D[t].typeData[u.text.unknownTrendText][e] = 0;
                    }
                    D[t].typeData[u.text.unknownTrendText][e] += n[e];
                }
            }
        }
    }
    function Ke() {
        for (const e in D) {
            if (Object.prototype.hasOwnProperty.call(D, e)) {
                const t = D[e].options;
                O(t, false);
                if (o.defined(t._currentView.isInFetchModeTimer)) {
                    clearInterval(t._currentView.isInFetchModeTimer);
                    t._currentView.isInFetchModeTimer = 0;
                }
            }
        }
        C.destroy(u);
    }
    function Qe(e, t = true) {
        let n = true;
        let i = e._currentView.activeYear;
        i--;
        while (!o.yearVisible(e, i)) {
            if (o.firstVisibleYear(e, i)) {
                n = false;
                break;
            }
            i--;
        }
        if (n) {
            e._currentView.activeYear = i;
            B(e);
            if (t) {
                l.customEvent(e.events.onBackYear, e._currentView.element, e._currentView.activeYear);
            }
        }
    }
    function et(e, t = true) {
        let n = true;
        let i = e._currentView.activeYear;
        i++;
        while (!o.yearVisible(e, i)) {
            if (o.lastVisibleYear(e, i)) {
                n = false;
                break;
            }
            i++;
        }
        if (n) {
            e._currentView.activeYear = i;
            B(e);
            if (t) {
                l.customEvent(e.events.onNextYear, e._currentView.element, e._currentView.activeYear);
            }
        }
    }
    function tt(e) {
        e._currentView.element.innerHTML = "";
        if (e._currentView.isInFetchMode && o.defined(e._currentView.isInFetchModeTimer)) {
            clearInterval(e._currentView.isInFetchModeTimer);
        }
        s.removeClass(e._currentView.element, "heat-js");
        c.remove(e);
        l.customEvent(e.events.onDestroy, e._currentView.element);
    }
    const nt = {
        addType: (e, t, n = true) => {
            if (o.definedString(e) && o.definedString(t) && Object.prototype.hasOwnProperty.call(D, e)) {
                const o = D[e].options;
                if (!o._currentView.isInFetchMode && !Object.prototype.hasOwnProperty.call(D[e].typeData, t)) {
                    if (!Object.prototype.hasOwnProperty.call(D[e].typeData, t)) {
                        D[e].typeData[t] = {};
                        D[e].totalTypes++;
                    }
                    l.customEvent(o.events.onAddType, o._currentView.element, t);
                    if (n) {
                        B(o, true);
                    }
                }
            }
            return nt;
        },
        removeType: (e, t, n = true) => {
            if (o.definedString(e) && o.definedString(t) && Object.prototype.hasOwnProperty.call(D, e)) {
                const o = D[e].options;
                if (!o._currentView.isInFetchMode && !Object.prototype.hasOwnProperty.call(D[e].typeData, t)) {
                    Je(o, t);
                    if (n) {
                        B(o, true);
                    }
                }
            }
            return nt;
        },
        addDates: (e, t, n = null, r = true) => {
            if (o.definedString(e) && o.definedArray(t) && Object.prototype.hasOwnProperty.call(D, e)) {
                const o = D[e].options;
                if (!o._currentView.isInFetchMode) {
                    n = i.getString(n, u.text.unknownTrendText);
                    const a = t.length;
                    for (let o = 0; o < a; o++) {
                        nt.addDate(e, t[o], n, false);
                    }
                    if (r) {
                        B(o, true);
                    }
                }
            }
            return nt;
        },
        addDate: (e, t, n = null, r = true) => {
            if (o.definedString(e) && o.definedDate(t) && Object.prototype.hasOwnProperty.call(D, e)) {
                const o = D[e].options;
                if (!o._currentView.isInFetchMode) {
                    n = i.getString(n, u.text.unknownTrendText);
                    const s = a.toStorageDate(t);
                    if (!Object.prototype.hasOwnProperty.call(D[e].typeData, n)) {
                        D[e].typeData[n] = {};
                        D[e].totalTypes++;
                    }
                    if (!Object.prototype.hasOwnProperty.call(D[e].typeData[n], s)) {
                        D[e].typeData[n][s] = 0;
                    }
                    D[e].typeData[n][s]++;
                    l.customEvent(o.events.onAddDate, o._currentView.element);
                    if (r) {
                        B(o, true);
                    }
                }
            }
            return nt;
        },
        updateDate: (e, t, n, r = null, s = true) => {
            if (o.definedString(e) && o.definedDate(t) && Object.prototype.hasOwnProperty.call(D, e)) {
                const o = D[e].options;
                if (!o._currentView.isInFetchMode && n > 0) {
                    r = i.getString(r, u.text.unknownTrendText);
                    if (Object.prototype.hasOwnProperty.call(D[e].typeData, r)) {
                        const i = a.toStorageDate(t);
                        D[e].typeData[r][i] = n;
                        l.customEvent(o.events.onUpdateDate, o._currentView.element);
                        if (s) {
                            B(o, true);
                        }
                    }
                }
            }
            return nt;
        },
        removeDates: (e, t, n = null, r = true) => {
            if (o.definedString(e) && o.definedArray(t) && Object.prototype.hasOwnProperty.call(D, e)) {
                const o = D[e].options;
                if (!o._currentView.isInFetchMode) {
                    n = i.getString(n, u.text.unknownTrendText);
                    const a = t.length;
                    for (let o = 0; o < a; o++) {
                        nt.removeDate(e, t[o], n, false);
                    }
                    if (r) {
                        B(o, true);
                    }
                }
            }
            return nt;
        },
        removeDate: (e, t, n = null, r = true) => {
            if (o.definedString(e) && o.definedDate(t) && Object.prototype.hasOwnProperty.call(D, e)) {
                const o = D[e].options;
                if (!o._currentView.isInFetchMode) {
                    const s = a.toStorageDate(t);
                    if (Object.prototype.hasOwnProperty.call(D[e].typeData, n) && Object.prototype.hasOwnProperty.call(D[e].typeData[n], s)) {
                        n = i.getString(n, u.text.unknownTrendText);
                        if (D[e].typeData[n][s] > 0) {
                            D[e].typeData[n][s]--;
                        }
                        l.customEvent(o.events.onRemoveDate, o._currentView.element);
                        if (r) {
                            B(o, true);
                        }
                    }
                }
            }
            return nt;
        },
        clearDate: (e, t, n = null, r = true) => {
            if (o.definedString(e) && o.definedDate(t) && Object.prototype.hasOwnProperty.call(D, e)) {
                const o = D[e].options;
                if (!o._currentView.isInFetchMode) {
                    const s = a.toStorageDate(t);
                    if (Object.prototype.hasOwnProperty.call(D[e].typeData, n) && Object.prototype.hasOwnProperty.call(D[e].typeData[n], s)) {
                        n = i.getString(n, u.text.unknownTrendText);
                        delete D[e].typeData[n][s];
                        l.customEvent(o.events.onClearDate, o._currentView.element);
                        if (r) {
                            B(o, true);
                        }
                    }
                }
            }
            return nt;
        },
        resetAll: (e = true) => {
            for (const t in D) {
                if (Object.prototype.hasOwnProperty.call(D, t)) {
                    nt.reset(t, e);
                }
            }
            return nt;
        },
        reset: (e, t = true) => {
            if (o.definedString(e) && Object.prototype.hasOwnProperty.call(D, e)) {
                const n = D[e].options;
                if (!n._currentView.isInFetchMode) {
                    n._currentView.activeType = u.text.unknownTrendText;
                    je(e, n, false);
                    l.customEvent(n.events.onReset, n._currentView.element);
                    if (t) {
                        B(n, true);
                    }
                }
            }
            return nt;
        },
        import: (e, t = null) => {
            if (o.definedString(e) && Object.prototype.hasOwnProperty.call(D, e)) {
                if (o.definedArray(t)) {
                    K(t, D[e].options);
                } else {
                    Z(D[e].options);
                }
            }
            return nt;
        },
        export: (e, t = null) => {
            if (o.definedString(e) && Object.prototype.hasOwnProperty.call(D, e)) {
                const n = D[e].options;
                W(n, t, null, n.exportOnlyDataBeingViewed);
            }
            return nt;
        },
        refresh: e => {
            if (o.definedString(e) && Object.prototype.hasOwnProperty.call(D, e)) {
                const t = D[e].options;
                B(t, true);
                l.customEvent(t.events.onRefresh, t._currentView.element);
            }
            return nt;
        },
        refreshAll: () => {
            for (const e in D) {
                if (Object.prototype.hasOwnProperty.call(D, e)) {
                    const t = D[e].options;
                    B(t, true);
                    l.customEvent(t.events.onRefresh, t._currentView.element);
                }
            }
            return nt;
        },
        setYear: (e, t) => {
            if (o.definedString(e) && o.definedNumber(t) && Object.prototype.hasOwnProperty.call(D, e)) {
                const n = D[e].options;
                n._currentView.activeYear = t;
                if (!o.yearVisible(n, n._currentView.activeYear)) {
                    et(n, false);
                } else {
                    B(n);
                }
                l.customEvent(n.events.onSetYear, n._currentView.element, n._currentView.activeYear);
            }
            return nt;
        },
        setYearToHighest: e => {
            if (o.definedString(e) && Object.prototype.hasOwnProperty.call(D, e)) {
                const t = D[e].options;
                const n = We(t);
                let i = 0;
                for (const e in n) {
                    if (Object.prototype.hasOwnProperty.call(n, e)) {
                        i = Math.max(i, parseInt(a.getStorageDateYear(e)));
                    }
                }
                if (i > 0) {
                    t._currentView.activeYear = i;
                    if (!o.yearVisible(t, t._currentView.activeYear)) {
                        et(t, false);
                    } else {
                        B(t);
                    }
                    l.customEvent(t.events.onSetYear, t._currentView.element, t._currentView.activeYear);
                }
            }
            return nt;
        },
        setYearToLowest: e => {
            if (o.definedString(e) && Object.prototype.hasOwnProperty.call(D, e)) {
                const t = D[e].options;
                const n = We(t);
                let i = 9999;
                for (const e in n) {
                    if (Object.prototype.hasOwnProperty.call(n, e)) {
                        i = Math.min(i, parseInt(a.getStorageDateYear(e)));
                    }
                }
                if (i < 9999) {
                    t._currentView.activeYear = i;
                    if (!o.yearVisible(t, t._currentView.activeYear)) {
                        Qe(t, false);
                    } else {
                        B(t);
                    }
                    l.customEvent(t.events.onSetYear, t._currentView.element, t._currentView.activeYear);
                }
            }
            return nt;
        },
        moveToPreviousYear: e => {
            if (o.definedString(e) && Object.prototype.hasOwnProperty.call(D, e)) {
                Qe(D[e].options);
            }
            return nt;
        },
        moveToNextYear: e => {
            if (o.definedString(e) && Object.prototype.hasOwnProperty.call(D, e)) {
                et(D[e].options);
            }
            return nt;
        },
        moveToCurrentYear: e => {
            if (o.definedString(e) && Object.prototype.hasOwnProperty.call(D, e)) {
                const t = D[e].options;
                t._currentView.activeYear = (new Date).getFullYear();
                if (!o.yearVisible(t, t._currentView.activeYear)) {
                    et(t, false);
                } else {
                    B(t);
                }
                l.customEvent(t.events.onSetYear, t._currentView.element, t._currentView.activeYear);
            }
            return nt;
        },
        getYear: e => {
            let t = -1;
            if (o.definedString(e) && Object.prototype.hasOwnProperty.call(D, e)) {
                t = D[e].options._currentView.activeYear;
            }
            return t;
        },
        render: (e, t) => {
            if (o.definedObject(e) && o.definedObject(t)) {
                M(g.Options.getForNewInstance(u, t, e));
            }
            return nt;
        },
        renderAll: () => {
            x();
            return nt;
        },
        switchView: (e, t) => {
            if (o.definedString(e) && o.definedString(t) && Object.prototype.hasOwnProperty.call(D, e)) {
                const n = m.View.get(t);
                if (n !== 0) {
                    Fe(D[e].options, n);
                }
            }
            return nt;
        },
        switchType: (e, t) => {
            if (o.definedString(e) && o.definedString(t) && Object.prototype.hasOwnProperty.call(D, e) && Object.prototype.hasOwnProperty.call(D[e].typeData, t)) {
                $e(D[e].options, t);
            }
            return nt;
        },
        updateBindingOptions: (e, t) => {
            if (o.definedString(e) && o.definedObject(t) && Object.prototype.hasOwnProperty.call(D, e)) {
                const n = D[e].options;
                const o = g.Options.get(t);
                let i = false;
                for (const e in o) {
                    if (Object.prototype.hasOwnProperty.call(o, e) && Object.prototype.hasOwnProperty.call(n, e) && n[e] !== o[e]) {
                        n[e] = o[e];
                        i = true;
                    }
                }
                if (i) {
                    B(n, true);
                    l.customEvent(n.events.onRefresh, n._currentView.element);
                    l.customEvent(n.events.onBindingOptionsUpdate, n._currentView.element, n);
                }
            }
            return nt;
        },
        getActiveView: e => {
            let t = "";
            if (o.definedString(e) && Object.prototype.hasOwnProperty.call(D, e)) {
                t = m.View.getName(D[e].options);
            }
            return t;
        },
        destroyAll: () => {
            for (const e in D) {
                if (Object.prototype.hasOwnProperty.call(D, e)) {
                    tt(D[e].options);
                }
            }
            D = {};
            return nt;
        },
        destroy: e => {
            if (o.definedString(e) && Object.prototype.hasOwnProperty.call(D, e)) {
                tt(D[e].options);
                delete D[e];
            }
            return nt;
        },
        setConfiguration: (e, t = true) => {
            if (o.definedObject(e)) {
                const n = u;
                const o = e;
                let i = false;
                for (const e in o) {
                    if (Object.prototype.hasOwnProperty.call(o, e) && Object.prototype.hasOwnProperty.call(u, e) && n[e] !== o[e]) {
                        n[e] = o[e];
                        i = true;
                    }
                }
                if (i) {
                    u = f.Options.get(n);
                    C.setup(u, () => {
                        x();
                    });
                    if (t) {
                        nt.refreshAll();
                    }
                }
            }
            return nt;
        },
        setLocale: (e, t = true) => {
            if (o.definedObject(e)) {
                u.text = f.Options.getText(e);
                if (t) {
                    nt.refreshAll();
                }
            }
            return nt;
        },
        getIds: () => {
            const e = [];
            for (const t in D) {
                if (Object.prototype.hasOwnProperty.call(D, t)) {
                    e.push(t);
                }
            }
            return e;
        },
        getVersion: () => "5.0.0 - Beta 2"
    };
    (() => {
        u = f.Options.get();
        const e = () => {
            x();
            C.setup(u, () => {
                x();
            });
        };
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => e());
        } else {
            e();
        }
        window.addEventListener("pagehide", () => Ke());
        if (!o.defined(window.$heat)) {
            window.$heat = nt;
        }
    })();
})();//# sourceMappingURL=heat.js.map