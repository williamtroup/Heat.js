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
            let i;
            (e => {
                e.HEAT_JS_DATE = "data-heat-js-chart-date";
                e.HEAT_JS_MINIMUM = "data-heat-js-chart-minimum";
            })(i = e.Chart || (e.Chart = {}));
            let o;
            (e => {
                e.HEAT_JS_NUMBER = "data-heat-js-day-number";
            })(o = e.Days || (e.Days = {}));
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
        const i = {
            matched: false,
            name: null
        };
        const o = t.holidays.length;
        const r = n.getDate();
        const a = n.getMonth() + 1;
        const s = n.getFullYear();
        for (let n = 0; n < o; n++) {
            const o = t.holidays[n];
            if (e.definedString(o.date) && o.showInViews) {
                const e = o.date.split("/");
                if (e.length === 2) {
                    i.matched = r === parseInt(e[0]) && a === parseInt(e[1]);
                } else if (e.length === 3) {
                    i.matched = r === parseInt(e[0]) && a === parseInt(e[1]) && s === parseInt(e[2]);
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
    function r(e, t) {
        return i.definedNumber(e) ? e : t;
    }
    e.getNumber = r;
    function a(e, t, n, o) {
        return i.definedNumber(e) ? e >= t && e <= n ? e : o : o;
    }
    e.getNumberInRange = a;
    function s(e, t) {
        return i.definedFunction(e) ? e : t;
    }
    e.getFunction = s;
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
            const t = e.toString().split(" ");
            if (t.length !== 0) {
                n = t;
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
        const r = n[0].split(".");
        const a = r.pop();
        let s = globalThis;
        let l = true;
        for (const e of r) {
            s = s[e];
            if (!i.defined(s)) {
                l = false;
                break;
            }
        }
        if (l && i.definedFunction(s[a])) {
            t = s[a].apply(s, o);
        }
        return t;
    }
})(o || (o = {}));

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
    function i(e) {
        return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    e.friendlyNumber = i;
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
    function a(e, t, a, s, l = false, c = null) {
        let d = a;
        const u = i.definedNumber(c) ? c : n(s);
        const g = w(s);
        const f = o(t, s.getDate());
        d = d.replace("{dddd}", t.text.dayNames[u]);
        d = d.replace("{dd}", r.padNumber(s.getDate()));
        d = d.replace("{d}", s.getDate().toString());
        d = d.replace("{ww}", r.padNumber(g));
        d = d.replace("{w}", g.toString());
        if (l) {
            if (i.definedString(f)) {
                d = d.replace("{o}", `<sup>${f}</sup>`);
            } else {
                d = d.replace("{o}", "");
            }
        } else {
            d = d.replace("{o}", f);
        }
        if (d.indexOf("{hh}") >= 0) {
            const t = i.holiday(e, s);
            if (t.matched) {
                d = d.replace("{hh}", t.name);
            } else {
                d = d.replace("{hh}", "");
            }
        }
        d = d.replace("{mmmm}", t.text.monthNames[s.getMonth()]);
        d = d.replace("{mm}", r.padNumber(s.getMonth() + 1));
        d = d.replace("{m}", (s.getMonth() + 1).toString());
        d = d.replace("{yyyy}", s.getFullYear().toString());
        d = d.replace("{yyy}", s.getFullYear().toString().substring(1));
        d = d.replace("{yy}", s.getFullYear().toString().substring(2));
        d = d.replace("{y}", parseInt(s.getFullYear().toString().substring(2)).toString());
        d = d.trim();
        return d;
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
        const i = new Date(e);
        i.setDate(e.getDate() + n);
        return i;
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
        const i = new Date(t.getFullYear(), 0, 1);
        const o = Math.ceil(((t.getTime() - i.getTime()) / 864e5 + 1) / 7);
        return o;
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
    function n(e, t, n = "", o = null) {
        const r = t.toLowerCase();
        const a = document.createElement(r);
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
    function o(e, t, i, o, r = null) {
        const a = n(e, t, i, r);
        a.innerHTML = o;
        if (t === "button") {
            const e = a;
            e.type = "button";
        }
        return a;
    }
    e.createWithHTML = o;
    function r(e, t, o, r = null, a = null) {
        const s = n(e, t, o, a);
        s.type = "button";
        if (i.defined(r)) {
            s.innerHTML = r;
        }
        return s;
    }
    e.createButton = r;
    function a(t, i, o, r, a = null) {
        const s = n(t, i, o, a);
        s.type = "button";
        e.create(s, "i", r);
        return s;
    }
    e.createIconButton = a;
    function s(e, t, n = false) {
        const i = getComputedStyle(e);
        let o = i.getPropertyValue(t);
        if (n) {
            o = parseFloat(o);
            o = isNaN(o) ? 0 : o;
        }
        return o;
    }
    e.getStyleValueByName = s;
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
    function g(e, t, n = "block") {
        let i = e.pageX;
        let o = e.pageY;
        const r = w();
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
        if (i < r.left) {
            i = e.pageX + 1;
        }
        if (o < r.top) {
            o = e.pageY + 1;
        }
        t.style.left = `${i}px`;
        t.style.top = `${o}px`;
    }
    e.showElementAtMousePosition = g;
    function f(e) {
        const t = Array.from(e.children);
        t.reverse();
        t.forEach(t => e.appendChild(t));
    }
    e.reverseChildrenOrder = f;
    function h(e, t, i) {
        const r = n(e, "div");
        const a = n(r, "label", "checkbox");
        const s = n(a, "input");
        s.type = "checkbox";
        s.name = i;
        n(a, "span", "check-mark");
        o(a, "span", "text", t);
        return s;
    }
    e.createCheckBox = h;
    function m(t, n) {
        const i = e.getStyleValueByName(t, "background-color");
        const o = e.getStyleValueByName(n, "background-color");
        n.style.background = `linear-gradient(to top, ${i}, ${o})`;
    }
    e.addGradientEffect = m;
})(s || (s = {}));

var l;

(e => {
    function t(e, ...t) {
        let n = null;
        if (i.definedFunction(e)) {
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
        if (!i.defined(e._currentView.tooltip) && e.tooltip.overrideTitle) {
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
    function o(e, t, n) {
        if (i.defined(e)) {
            if (t.tooltip.overrideTitle) {
                e.onmousemove = e => d(e, t, n);
            } else {
                e.title = n.replace(/<\/?[^>]+(>|$)/g, "");
                if (i.definedString(t.tooltip.customAttributeName) && i.definedString(t.tooltip.customAttributeValue)) {
                    e.setAttribute(t.tooltip.customAttributeName, t.tooltip.customAttributeValue);
                }
            }
        }
    }
    e.add = o;
    function c(e, t, n, s, c, d, u, w, g, f, h) {
        if (i.definedFunction(w)) {
            o(n, t, l.customEvent(w, t._currentView.element, s, c, t._currentView.activeYear, g));
        } else {
            const l = [ a.getCustomFormattedDateText(t, e, u, s, true) ];
            if (t.showHolidaysInDayToolTips) {
                const e = i.holiday(t, s);
                if (e.matched && i.definedString(e.name)) {
                    l.push(`${":"}${" "}${e.name}`);
                }
            }
            if (f || h && i.definedString(d)) {
                l.push(`${":"}${" "}`);
            }
            if (f) {
                l.push(`<b class="tooltip-count">${r.friendlyNumber(c)}</b>`);
            }
            if (h && i.definedString(d)) {
                if (f && !t.tooltip.overrideTitle) {
                    l.push(" ");
                }
                const e = !d.startsWith("-") ? "positive" : "negative";
                l.push(`<b class="tooltip-difference ${e}">${d}</b>`);
            }
            o(n, t, l.join(""));
        }
    }
    e.addForDay = c;
    function d(e, n, i) {
        s.cancelBubble(e);
        u(n);
        t = setTimeout(() => {
            n._currentView.tooltip.innerHTML = i;
            s.showElementAtMousePosition(e, n._currentView.tooltip, "flex");
        }, n.tooltip.delay);
    }
    e.show = d;
    function u(e) {
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
    e.hide = u;
    function w(e) {
        if (i.defined(e._currentView.tooltip)) {
            const t = document.getElementsByClassName("heat-js");
            const n = [].slice.call(t);
            if (n.length === 0) {
                document.body.removeChild(e._currentView.tooltip);
            }
        }
    }
    e.remove = w;
    function g(e, t = true) {
        const n = t ? window.addEventListener : window.removeEventListener;
        const i = t ? document.addEventListener : document.removeEventListener;
        n("mousemove", () => u(e));
        n("blur", () => u(e));
        i("scroll", () => u(e));
    }
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
        return `rgba(${t.red}, ${t.green}, ${t.blue}, ${t.alpha})`;
    }
    e.hexToRgba = n;
    function i(e) {
        const t = e.trim().replace("#", "");
        const n = parseInt(t.substring(0, 2), 16);
        const i = parseInt(t.substring(2, 4), 16);
        const o = parseInt(t.substring(4, 6), 16);
        let r = 1;
        if (e.length === 8) {
            r = parseInt(t.substring(6, 8), 16);
        }
        return {
            red: n,
            green: i,
            blue: o,
            alpha: r
        };
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
        e.DefaultDynamicColor = "--heat-js-color-default-dynamic";
        e.ChartViewLineDefaultWidth = "--heat-js-day-chart-width";
    })(t = e.Variables || (e.Variables = {}));
})(u || (u = {}));

var w;

(e => {
    function t(e, t) {
        const n = e.colorRanges.length;
        let i = false;
        for (let r = 0; r < n; r++) {
            const n = e.colorRanges[r];
            if (n.id === t) {
                n.visible = !o.getBoolean(n.visible, true);
                if (y(e, n)) {
                    i = true;
                }
                l.customEvent(e.events.onColorRangeTypeToggle, e._currentView.element, n.id, n.visible);
                break;
            }
        }
        return i;
    }
    e.toggleVisibleState = t;
    function a(e) {
        const t = e.colorRanges.length;
        let n = false;
        for (let i = 0; i < t; i++) {
            const t = e.colorRanges[i];
            t.visible = !t.visible;
            n = y(e, t);
            l.customEvent(e.events.onColorRangeTypeToggle, e._currentView.element, e.colorRanges[i].id, e.colorRanges[i].visible);
        }
        return n;
    }
    e.invertVisibleStates = a;
    function c(e, t) {
        let n = false;
        if (e.guide.useIncrementToggles) {
            const i = h(e);
            const o = i.length;
            if (t) {
                for (let r = 0; r < o; r++) {
                    const o = i[r];
                    if (!o.visible) {
                        o.visible = true;
                        n = y(e, o);
                        l.customEvent(e.events.onColorRangeTypeToggle, e._currentView.element, o.id, t);
                        break;
                    }
                }
            } else {
                for (let r = o; r--; ) {
                    const o = i[r];
                    if (o.visible) {
                        o.visible = false;
                        n = y(e, o);
                        l.customEvent(e.events.onColorRangeTypeToggle, e._currentView.element, o.id, t);
                        break;
                    }
                }
            }
        } else {
            const i = e.colorRanges.length;
            for (let o = 0; o < i; o++) {
                const i = e.colorRanges[o];
                i.visible = t;
                n = y(e, i);
                l.customEvent(e.events.onColorRangeTypeToggle, e._currentView.element, i.id, t);
            }
        }
        return n;
    }
    e.updateAllVisibleStates = c;
    function w(e, t) {
        let i = false;
        if (t === n.COLOR_RANGE_HOLIDAY_ID) {
            i = true;
        } else {
            const n = e.colorRanges.length;
            for (let r = 0; r < n; r++) {
                const n = e.colorRanges[r];
                if (n.id === t && o.getBoolean(n.visible, true)) {
                    i = true;
                    break;
                }
            }
        }
        return i;
    }
    e.isVisible = w;
    function g(e, t, o, r = null) {
        let a = null;
        if (i.defined(r) && i.holiday(e, r).matched) {
            a = {
                cssClassName: "holiday",
                id: n.COLOR_RANGE_HOLIDAY_ID,
                visible: true,
                minimum: 0
            };
        }
        if (!i.defined(a)) {
            const e = t.length;
            for (let n = 0; n < e; n++) {
                const e = t[n];
                if (o >= e.minimum) {
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
    e.getByMinimum = f;
    function h(e) {
        return e.colorRanges.sort((e, t) => e.minimum - t.minimum);
    }
    e.getAllSorted = h;
    function m(e) {
        const t = [];
        const n = d.hexToRgbaValues(e.color);
        const i = 100 / e.totalColors;
        const o = 1 / e.totalColors;
        const a = (e.maximumMinimum - e.startMinimum) / (e.totalColors - 1);
        const l = [];
        let c = n.red;
        let w = n.green;
        let g = n.blue;
        let f = o;
        let h = n.red;
        let m = n.green;
        let p = n.blue;
        let y = e.startMinimum;
        for (let s = 0; s < e.totalColors; s++) {
            const d = s + 1;
            const v = f + o > 1 ? 1 : f + o;
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
            const D = Math.round(n.red / 100 * (d * i));
            const x = Math.round(n.green / 100 * (d * i));
            const S = Math.round(n.blue / 100 * (d * i));
            if (s === e.totalColors - 1) {
                l.push(`:root {`);
                l.push(`${"\t"}${u.Variables.CheckBoxCheckedColor}: ${T};`);
                l.push(`${"\t"}${u.Variables.YearMenuCurrent}: ${T};`);
                l.push("}");
            } else {
                c = n.red + D;
                w = n.green + x;
                g = n.blue + S;
                f += o;
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
        if (e.views.map.enabled && e._currentView.activeView === 1 && i.definedString(t.mapCssClassName)) {
            n = t.mapCssClassName;
        } else if (e.views.line.enabled && e._currentView.activeView === 2 && i.definedString(t.lineCssClassName)) {
            n = t.lineCssClassName;
        } else if (e.views.chart.enabled && e._currentView.activeView === 3 && i.definedString(t.chartCssClassName)) {
            n = t.chartCssClassName;
        } else if (e.views.days.enabled && e._currentView.activeView === 4 && i.definedString(t.daysCssClassName)) {
            n = t.daysCssClassName;
        } else if (e.views.months.enabled && e._currentView.activeView === 5 && i.definedString(t.monthsCssClassName)) {
            n = t.monthsCssClassName;
        } else if (e.views.colorRanges.enabled && e._currentView.activeView === 6 && i.definedString(t.colorRangeCssClassName)) {
            n = t.colorRangeCssClassName;
        }
        return n;
    }
    e.getGuideCssClassName = p;
    function y(e, t) {
        let i = false;
        if (e._currentView.activeView === 1) {
            v(e, t, t.mapCssClassName, n.Attribute.View.Map.HEAT_JS_MINIMUM);
        } else if (e._currentView.activeView === 2) {
            v(e, t, t.lineCssClassName, n.Attribute.View.Line.HEAT_JS_MINIMUM);
        } else if (e._currentView.activeView === 3) {
            v(e, t, t.chartCssClassName, n.Attribute.View.Chart.HEAT_JS_MINIMUM);
        } else if (e._currentView.activeView === 6) {
            v(e, t, t.colorRangeCssClassName, n.Attribute.View.ColorRanges.HEAT_JS_MINIMUM);
        } else {
            i = true;
        }
        return i;
    }
    e.toggleForActiveView = y;
    function v(e, t, o, r) {
        const a = i.definedString(o) ? o : t.cssClassName;
        const l = e._currentView.element.getElementsByTagName("div");
        const c = [].slice.call(l);
        const d = c.length;
        for (let e = 0; e < d; e++) {
            const o = c[e];
            const l = o.getAttribute(r);
            const d = o.getAttribute(n.Attribute.Area.ColorRangeToggle.HEAT_JS_MINIMUM);
            const u = i.definedString(l) && l === t.minimum.toString();
            if (u || d === t.minimum.toString()) {
                if (t.visible) {
                    s.addClass(o, a);
                } else {
                    s.removeClass(o, a);
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
            const o = l(t);
            o._currentView = {};
            o._currentView.initialized = false;
            o._currentView.element = n;
            o._currentView.activeYear = o.defaultYear;
            o._currentView.activeType = e.text.unknownTrendText;
            o._currentView.activeView = 0;
            o._currentView.configurationDialogDayCheckBoxes = [];
            o._currentView.configurationDialogMonthCheckBoxes = [];
            o._currentView.isInFetchMode = i.definedFunction(o.events.onDataFetch);
            o._currentView.isInFetchModeTimer = 0;
            o._currentView.yearsAvailable = [];
            o._currentView.mapDayWidth = 0;
            o._currentView.zoomLevel = -1;
            o._currentView.zoomMapViewIncrement = -1;
            o._currentView.zoomLineViewIncrement = -1;
            o._currentView.yearTextWidth = 0;
            o._currentView.viewsEnabled = 0;
            if (o.views.map.enabled) {
                o._currentView.mapContentsScrollLeft = 0;
                o._currentView.viewsEnabled++;
            }
            if (o.views.line.enabled) {
                o._currentView.lineContentsScrollLeft = 0;
                o._currentView.viewsEnabled++;
            }
            if (o.views.chart.enabled) {
                o._currentView.chartContentsScrollLeft = 0;
                o._currentView.viewsEnabled++;
            }
            if (o.views.days.enabled) {
                o._currentView.daysContentsScrollLeft = 0;
                o._currentView.viewsEnabled++;
            }
            if (o.views.months.enabled) {
                o._currentView.monthsContentsScrollLeft = 0;
                o._currentView.viewsEnabled++;
            }
            if (o.views.colorRanges.enabled) {
                o._currentView.colorRangesContentsScrollLeft = 0;
                o._currentView.viewsEnabled++;
            }
            B(o);
            return o;
        }
        e.getForNewInstance = a;
        function l(e) {
            const t = o.getObject(e, {});
            t.views = o.getObject(t.views, {});
            t.exportOnlyDataBeingViewed = o.getBoolean(t.exportOnlyDataBeingViewed, true);
            t.defaultYear = o.getNumber(t.defaultYear, (new Date).getFullYear());
            t.defaultView = o.getString(t.defaultView, "map");
            t.exportType = o.getString(t.exportType, "json");
            t.useLocalStorageForData = o.getBoolean(t.useLocalStorageForData, false);
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
            e.sideMenu = o.getObject(e.sideMenu, {});
            e.sideMenu.enabled = o.getBoolean(e.sideMenu.enabled, true);
            e.sideMenu.showToolTips = o.getBoolean(e.sideMenu.showToolTips, true);
            return e.sideMenu;
        }
        function d(e) {
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
            e.title.showClearButton = o.getBoolean(e.title.showClearButton, false);
            return e.title;
        }
        function g(e) {
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
        function f(e) {
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
            e.views.map.showDifferences = o.getBoolean(e.views.map.showDifferences, false);
            e.views.map.showDifferencesInToolTips = o.getBoolean(e.views.map.showDifferencesInToolTips, true);
            M(e.views.map);
            return e.views.map;
        }
        function h(e) {
            e.views.line = o.getObject(e.views.line, {});
            e.views.line.enabled = o.getBoolean(e.views.line.enabled, true);
            e.views.line.showMonthNames = o.getBoolean(e.views.line.showMonthNames, true);
            e.views.line.showInReverseOrder = o.getBoolean(e.views.line.showInReverseOrder, false);
            e.views.line.keepScrollPositions = o.getBoolean(e.views.line.keepScrollPositions, false);
            e.views.line.showYearsInMonthNames = o.getBoolean(e.views.line.showYearsInMonthNames, true);
            e.views.line.showToolTips = o.getBoolean(e.views.line.showToolTips, true);
            e.views.line.dayToolTipText = o.getString(e.views.line.dayToolTipText, "{dddd}, {d}{o} {mmmm} {yyyy}");
            e.views.line.showCountsInToolTips = o.getBoolean(e.views.line.showCountsInToolTips, true);
            e.views.line.showDifferencesInToolTips = o.getBoolean(e.views.line.showDifferencesInToolTips, true);
            M(e.views.line);
            return e.views.line;
        }
        function m(e) {
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
            e.views.chart.showDifferences = o.getBoolean(e.views.chart.showDifferences, false);
            e.views.chart.showDifferencesInToolTips = o.getBoolean(e.views.chart.showDifferencesInToolTips, true);
            e.views.chart.usePoints = o.getBoolean(e.views.chart.usePoints, false);
            M(e.views.chart);
            return e.views.chart;
        }
        function p(e) {
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
            e.views.days.dayToolTipText = o.getString(e.views.days.dayToolTipText, "{dddd} {yyyy}");
            M(e.views.days);
            return e.views.days;
        }
        function y(e) {
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
            e.views.months.monthToolTipText = o.getString(e.views.months.monthToolTipText, "{mmmm} {yyyy}");
            M(e.views.months);
            return e.views.months;
        }
        function v(e) {
            e.views.colorRanges = o.getObject(e.views.colorRanges, {});
            e.views.colorRanges.enabled = o.getBoolean(e.views.colorRanges.enabled, true);
            e.views.colorRanges.showChartYLabels = o.getBoolean(e.views.colorRanges.showChartYLabels, true);
            e.views.colorRanges.showColorRangeLabels = o.getBoolean(e.views.colorRanges.showColorRangeLabels, true);
            e.views.colorRanges.useColorRangeNamesForLabels = o.getBoolean(e.views.colorRanges.useColorRangeNamesForLabels, false);
            e.views.colorRanges.showRangeCounts = o.getBoolean(e.views.colorRanges.showRangeCounts, false);
            e.views.colorRanges.showInReverseOrder = o.getBoolean(e.views.colorRanges.showInReverseOrder, false);
            e.views.colorRanges.keepScrollPositions = o.getBoolean(e.views.colorRanges.keepScrollPositions, false);
            e.views.colorRanges.showToolTips = o.getBoolean(e.views.colorRanges.showToolTips, true);
            e.views.colorRanges.useGradients = o.getBoolean(e.views.colorRanges.useGradients, false);
            e.views.colorRanges.showRangeCountPercentages = o.getBoolean(e.views.colorRanges.showRangeCountPercentages, true);
            e.views.colorRanges.showRangeNamesInToolTips = o.getBoolean(e.views.colorRanges.showRangeNamesInToolTips, true);
            M(e.views.colorRanges);
            return e.views.colorRanges;
        }
        function T(e) {
            e.description = o.getObject(e.description, {});
            e.description.text = o.getString(e.description.text, "");
            e.description.url = o.getString(e.description.url, "");
            e.description.urlTarget = o.getString(e.description.urlTarget, "_blank");
            return e.description;
        }
        function b(e) {
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
            e.guide.showColorRangeTogglesInReverseOrder = o.getBoolean(e.guide.showColorRangeTogglesInReverseOrder, false);
            return e.guide;
        }
        function V(e) {
            e.tooltip = o.getObject(e.tooltip, {});
            e.tooltip.overrideTitle = o.getBoolean(e.tooltip.overrideTitle, true);
            e.tooltip.customAttributeName = o.getString(e.tooltip.customAttributeName, "");
            e.tooltip.customAttributeValue = o.getString(e.tooltip.customAttributeValue, "");
            e.tooltip.delay = o.getNumber(e.tooltip.delay, 750);
            return e.tooltip;
        }
        function _(e) {
            e.zooming = o.getObject(e.zooming, {});
            e.zooming.enabled = o.getBoolean(e.zooming.enabled, false);
            e.zooming.defaultLevel = o.getNumber(e.zooming.defaultLevel, 0);
            e.zooming.maximumLevel = o.getNumber(e.zooming.maximumLevel, 0);
            e.zooming.showCloseButton = o.getBoolean(e.zooming.showCloseButton, true);
            e.zooming.showResetButton = o.getBoolean(e.zooming.showResetButton, false);
            e.zooming.showToolTips = o.getBoolean(e.zooming.showToolTips, true);
            return e.zooming;
        }
        function C(e) {
            const t = s.getStyleValueByName(document.documentElement, u.Variables.DefaultDynamicColor);
            e.dynamicColorRange = o.getObject(e.dynamicColorRange, {});
            e.dynamicColorRange.enabled = o.getBoolean(e.dynamicColorRange.enabled, false);
            e.dynamicColorRange.maximumMinimum = o.getNumber(e.dynamicColorRange.maximumMinimum, 25);
            e.dynamicColorRange.color = o.getString(e.dynamicColorRange.color, t);
            e.dynamicColorRange.totalColors = o.getNumber(e.dynamicColorRange.totalColors, 5);
            e.dynamicColorRange.startMinimum = o.getNumber(e.dynamicColorRange.startMinimum, 10);
            return e.dynamicColorRange;
        }
        function D(e) {
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
                        n.colorRangeCssClassName = o.getString(n.colorRangeCssClassName, "");
                        n.tooltipText = o.getString(n.tooltipText, "");
                        n.visible = o.getBoolean(n.visible, true);
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
        function S(e) {
            e.events = o.getObject(e.events, {});
            e.events.onChange = o.getFunction(e.events.onChange, null);
            e.events.onBeforeRender = o.getFunction(e.events.onBeforeRender, null);
            e.events.onRenderComplete = o.getFunction(e.events.onRenderComplete, null);
            e.events.onBackYear = o.getFunction(e.events.onBackYear, null);
            e.events.onNextYear = o.getFunction(e.events.onNextYear, null);
            e.events.onSetYear = o.getFunction(e.events.onSetYear, null);
            e.events.onRefresh = o.getFunction(e.events.onRefresh, null);
            e.events.onDestroy = o.getFunction(e.events.onDestroy, null);
            e.events.onExport = o.getFunction(e.events.onExport, null);
            e.events.onImport = o.getFunction(e.events.onImport, null);
            e.events.onReset = o.getFunction(e.events.onReset, null);
            e.events.onTypeSwitch = o.getFunction(e.events.onTypeSwitch, null);
            e.events.onViewSwitch = o.getFunction(e.events.onViewSwitch, null);
            e.events.onAddType = o.getFunction(e.events.onAddType, null);
            e.events.onRemoveType = o.getFunction(e.events.onRemoveType, null);
            e.events.onAddDate = o.getFunction(e.events.onAddDate, null);
            e.events.onRemoveDate = o.getFunction(e.events.onRemoveDate, null);
            e.events.onColorRangeTypeToggle = o.getFunction(e.events.onColorRangeTypeToggle, null);
            e.events.onDataFetch = o.getFunction(e.events.onDataFetch, null);
            e.events.onClearDate = o.getFunction(e.events.onClearDate, null);
            e.events.onUpdateDate = o.getFunction(e.events.onUpdateDate, null);
            e.events.onBindingOptionsUpdate = o.getFunction(e.events.onBindingOptionsUpdate, null);
            e.events.onMapDayClick = o.getFunction(e.events.onMapDayClick, null);
            e.events.onMapDayDblClick = o.getFunction(e.events.onMapDayDblClick, null);
            e.events.onMapDayToolTipRender = o.getFunction(e.events.onMapDayToolTipRender, null);
            e.events.onLineDayClick = o.getFunction(e.events.onLineDayClick, e.events.onMapDayClick);
            e.events.onLineDayDblClick = o.getFunction(e.events.onLineDayDblClick, e.events.onMapDayDblClick);
            e.events.onLineDayToolTipRender = o.getFunction(e.events.onLineDayToolTipRender, e.events.onMapDayToolTipRender);
            e.events.onChartDayClick = o.getFunction(e.events.onChartDayClick, e.events.onMapDayClick);
            e.events.onChartDayDblClick = o.getFunction(e.events.onChartDayDblClick, e.events.onMapDayDblClick);
            e.events.onChartDayToolTipRender = o.getFunction(e.events.onChartDayToolTipRender, e.events.onMapDayToolTipRender);
            e.events.onWeekDayClick = o.getFunction(e.events.onWeekDayClick, null);
            e.events.onWeekDayDblClick = o.getFunction(e.events.onWeekDayDblClick, null);
            e.events.onMonthClick = o.getFunction(e.events.onMonthClick, null);
            e.events.onMonthDblClick = o.getFunction(e.events.onMonthDblClick, null);
            e.events.onColorRangeClick = o.getFunction(e.events.onColorRangeClick, null);
            e.events.onColorRangeDblClick = o.getFunction(e.events.onColorRangeDblClick, null);
            e.events.onZoomLevelChange = o.getFunction(e.events.onZoomLevelChange, null);
            e.events.onClearViewableData = o.getFunction(e.events.onClearViewableData, null);
            return e.events;
        }
        function M(e) {
            if (i.invalidOptionArray(e.monthsToShow)) {
                e.monthsToShow = t;
            }
            if (i.invalidOptionArray(e.daysToShow)) {
                e.daysToShow = n;
            }
        }
        function B(e) {
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
            const t = o.getObject(e, {});
            t.safeMode = o.getBoolean(t.safeMode, true);
            t.observationMode = o.getBoolean(t.observationMode, true);
            t.domElementTypes = o.getStringOrArray(t.domElementTypes, [ "*" ]);
            t.allowEmptyBindings = o.getBoolean(t.allowEmptyBindings, true);
            t.text = n(t.text);
            return t;
        }
        e.get = t;
        function n(e) {
            e = o.getObject(e, {});
            e.stText = o.getAnyString(e.stText, "st");
            e.ndText = o.getAnyString(e.ndText, "nd");
            e.rdText = o.getAnyString(e.rdText, "rd");
            e.thText = o.getAnyString(e.thText, "th");
            e.backButtonText = o.getAnyString(e.backButtonText, "Back");
            e.nextButtonText = o.getAnyString(e.nextButtonText, "Next");
            e.refreshButtonText = o.getAnyString(e.refreshButtonText, "Refresh");
            e.exportButtonText = o.getAnyString(e.exportButtonText, "Export");
            e.lessText = o.getAnyString(e.lessText, "Less");
            e.moreText = o.getAnyString(e.moreText, "More");
            e.dateText = o.getAnyString(e.dateText, "Date");
            e.countText = o.getAnyString(e.countText, "Count");
            e.mapText = o.getAnyString(e.mapText, "Map");
            e.chartText = o.getAnyString(e.chartText, "Chart");
            e.noChartDataMessage = o.getAnyString(e.noChartDataMessage, "There is currently no data to view.");
            e.statisticsText = o.getAnyString(e.statisticsText, "Statistics");
            e.noColorRangesDataMessage = o.getAnyString(e.noColorRangesDataMessage, "There are currently no color ranges to view.");
            e.unknownTrendText = o.getAnyString(e.unknownTrendText, "Unknown");
            e.importButtonText = o.getAnyString(e.importButtonText, "Import");
            e.noMapDataMessage = o.getAnyString(e.noMapDataMessage, "There is currently no data to view.");
            e.objectErrorText = o.getAnyString(e.objectErrorText, "Errors in object: {{error_1}}, {{error_2}}");
            e.attributeNotValidErrorText = o.getAnyString(e.attributeNotValidErrorText, "The attribute '{{attribute_name}}' is not a valid object.");
            e.attributeNotSetErrorText = o.getAnyString(e.attributeNotSetErrorText, "The attribute '{{attribute_name}}' has not been set correctly.");
            e.closeButtonText = o.getAnyString(e.closeButtonText, "Close");
            e.configurationButtonText = o.getAnyString(e.configurationButtonText, "Configuration");
            e.configurationTitleText = o.getAnyString(e.configurationTitleText, "Configuration");
            e.visibleMonthsText = o.getAnyString(e.visibleMonthsText, "Visible Months");
            e.visibleDaysText = o.getAnyString(e.visibleDaysText, "Visible Days");
            e.dataText = o.getAnyString(e.dataText, "Data");
            e.colorRangesText = o.getAnyString(e.colorRangesText, "Color Ranges");
            e.yearText = o.getAnyString(e.yearText, "Year");
            e.daysText = o.getAnyString(e.daysText, "Days");
            e.noDaysDataMessage = o.getAnyString(e.noDaysDataMessage, "There are currently no days to view.");
            e.currentYearText = o.getAnyString(e.currentYearText, "Current Year");
            e.todayText = o.getAnyString(e.todayText, "Today");
            e.thisWeekText = o.getAnyString(e.thisWeekText, "This Week");
            e.thisMonthText = o.getAnyString(e.thisMonthText, "This Month");
            e.thisYearText = o.getAnyString(e.thisYearText, "This Year");
            e.unavailableText = o.getAnyString(e.unavailableText, "Unavailable");
            e.monthsText = o.getAnyString(e.monthsText, "Months");
            e.noMonthsDataMessage = o.getAnyString(e.noMonthsDataMessage, "There are currently no months to view.");
            e.selectTypeText = o.getAnyString(e.selectTypeText, "Select Type");
            e.filenamePlaceholderText = o.getAnyString(e.filenamePlaceholderText, "Filename (optional)");
            e.onlyDataBeingViewedText = o.getAnyString(e.onlyDataBeingViewedText, "Only data being viewed");
            e.zoomInText = o.getAnyString(e.zoomInText, "Zoom In");
            e.zoomOutText = o.getAnyString(e.zoomOutText, "Zoom Out");
            e.clearButtonText = o.getAnyString(e.clearButtonText, "Clear");
            e.selectFilesText = o.getAnyString(e.selectFilesText, "Select File(s)");
            e.dragAndDropFilesText = o.getAnyString(e.dragAndDropFilesText, "Drag and drop your file(s) here ...");
            e.addTypeText = o.getAnyString(e.addTypeText, "Add Type");
            e.typePlaceholderText = o.getAnyString(e.typePlaceholderText, "Type");
            e.addButtonText = o.getAnyString(e.addButtonText, "Add");
            e.removeButtonText = o.getAnyString(e.removeButtonText, "Remove");
            e.invertText = o.getAnyString(e.invertText, "Invert");
            e.lineText = o.getAnyString(e.lineText, "Line");
            e.noLineDataMessage = o.getAnyString(e.noLineDataMessage, "There is currently no data to view.");
            e.removeTypeText = o.getAnyString(e.removeTypeText, "Remove Type");
            e.openNewTypeText = o.getAnyString(e.openNewTypeText, "Open new type");
            e.clearExistingDataText = o.getAnyString(e.clearExistingDataText, "Clear existing data");
            e.browseButtonText = o.getAnyString(e.browseButtonText, "Browse");
            e.saveButtonText = o.getAnyString(e.saveButtonText, "Save");
            e.resetButtonText = o.getAnyString(e.resetButtonText, "Reset");
            e.copyButtonText = o.getAnyString(e.copyButtonText, "Copy");
            e.yesButtonText = o.getAnyString(e.yesButtonText, "Yes");
            e.noButtonText = o.getAnyString(e.noButtonText, "No");
            e.confirmText = o.getAnyString(e.confirmText, "Confirm");
            e.clearDataConfirmText = o.getAnyString(e.clearDataConfirmText, "Are you sure you want to clear the data?");
            e.removeTypeConfirmText = o.getAnyString(e.removeTypeConfirmText, "Are you sure you want to remove this type?");
            e = r(e);
            return e;
        }
        e.getText = n;
        function r(e) {
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

var h;

(e => {
    let t;
    (e => {
        function t(e) {
            if (!i.definedParentElement(e._currentView.disabledBackground)) {
                e._currentView.disabledBackground = s.create(e._currentView.element, "div", "disabled");
                if (e.sideMenu.enabled) {
                    s.addClass(e._currentView.disabledBackground, "full-view");
                }
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
            if (e.views.colorRanges.enabled && i.defined(e._currentView.colorRangesContents)) {
                e._currentView.colorRangesContentsScrollLeft = e._currentView.colorRangesContents.scrollLeft;
            }
            if (e._currentView.element.innerHTML !== "") {
                e._currentView.element.style.height = `${e._currentView.element.offsetHeight}px`;
                if (!e.resizable) {
                    e._currentView.element.style.width = `${e._currentView.element.offsetWidth}px`;
                }
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
        function o(e, t = null) {
            let n = "";
            const o = i.defined(t) ? t : e._currentView.activeView;
            if (o === 1) {
                n = "map";
            } else if (o === 2) {
                n = "line";
            } else if (o === 3) {
                n = "chart";
            } else if (o === 4) {
                n = "days";
            } else if (o === 5) {
                n = "months";
            } else if (o === 6) {
                n = "color-ranges";
            }
            return n;
        }
        e.getName = o;
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
            if (!e.resizable) {
                e._currentView.element.style.removeProperty("width");
            }
        }
        e.set = a;
    })(o = e.View || (e.View = {}));
})(m || (m = {}));

var p;

(e => {
    function t(e, t, i, o) {
        if (t === "json") {
            n(e, i, o);
        } else if (t === "txt") {
            r(e, i);
        } else if (t === "csv") {
            a(e, i);
        } else if (t === "tsv") {
            s(e, i);
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
        const r = new FileReader;
        let a = {};
        r.onloadend = () => t(e.name, a);
        r.onload = e => {
            const t = o.getObjectFromString(e.target.result, n);
            if (t.parsed && i.definedObject(t.object)) {
                a = t.object;
            }
        };
        r.readAsText(e);
    }
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
    function a(e, t) {
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
    function s(e, t) {
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
            for (let e = 4; e < n; e++) {
                const n = t[e].trim();
                const o = n.substring(1, n.length - 1).trim();
                const r = o.split("|");
                i[r[0].trim()] = parseInt(r[1].trim());
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
        e.getMimeType = t;
        function n(e, t, n, o) {
            let a;
            if (i.definedString(n)) {
                a = `${n}.${o.toLowerCase()}`;
            } else {
                const n = new Date;
                const i = `${r.padNumber(n.getDate())}${"-"}${r.padNumber(n.getMonth() + 1)}${"-"}${n.getFullYear()}`;
                const s = `${r.padNumber(n.getHours())}${"-"}${r.padNumber(n.getMinutes())}`;
                let l = "";
                if (t._currentView.activeType !== e.text.unknownTrendText) {
                    l = `${t._currentView.activeType.toLowerCase().replace(/ /g, "_")}${"_"}`;
                }
                a = `${l}${i}${"_"}${s}.${o.toLowerCase()}`;
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
                g = i(t);
            } else if (e === "xml") {
                g = o(t, a, w);
            } else if (e === "txt") {
                g = r(t, a, w);
            } else if (e === "html") {
                g = s(t, a, w);
            } else if (e === "md") {
                g = l(t, a, w);
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
        function i(e) {
            return JSON.stringify(e, null, 2);
        }
        function o(e, t, n) {
            const i = a.getCustomFormattedDateText(n, t, n.exportDateTimeFormat, new Date);
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
        function r(e, t, n) {
            const i = a.getCustomFormattedDateText(n, t, n.exportDateTimeFormat, new Date);
            const o = [];
            o.push(`Last-Modified${":"}${" "}${i}`);
            for (const t in e) {
                if (Object.prototype.hasOwnProperty.call(e, t)) {
                    o.push(`${t}${":"}${" "}${e[t].toString()}`);
                }
            }
            return o.join("\n");
        }
        function s(e, t, n) {
            const i = [];
            const o = a.getCustomFormattedDateText(n, t, n.exportDateTimeFormat, new Date);
            i.push("<!DOCTYPE html>");
            i.push('<html lang="en">');
            i.push("<head>");
            i.push(`${"  "}<title>${o}</title>`);
            i.push(`${"  "}<meta name="viewport" content="width=device-width, initial-scale=1">`);
            i.push(`${"  "}<meta charset="utf-8">`);
            i.push(`${"  "}<meta http-equiv="Last-Modified" content="${o} GMT">`);
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
        function l(e, t, n) {
            const i = [];
            const o = a.getCustomFormattedDateText(n, t, n.exportDateTimeFormat, new Date);
            i.push(`# Last Modified: ${o}`);
            i.push("");
            i.push("| Full Date | Count |");
            i.push("| --- | --- |");
            for (const t in e) {
                if (Object.prototype.hasOwnProperty.call(e, t)) {
                    i.push(`| ${t} | ${e[t].toString()} |`);
                }
            }
            return i.join("\n");
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
            const o = a.getCustomFormattedDateText(n, t, n.exportDateTimeFormat, new Date);
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
            const o = a.getCustomFormattedDateText(n, t, n.exportDateTimeFormat, new Date);
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
        function g(e) {
            return e.join(",");
        }
    })(n = e.Contents || (e.Contents = {}));
})(y || (y = {}));

var v;

(e => {
    function t(e, t, n, i = true, o = false) {
        if (n > 0) {
            const r = o ? `${n}%` : `${n}px`;
            if (i && e.chartsAnimationDelay > 0) {
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
    function t(e, t, i) {
        if (t.useLocalStorageForData && window.localStorage) {
            const a = window.localStorage.length;
            const s = t._currentView.element.id;
            for (let t = 0; t < a; t++) {
                const a = window.localStorage.key(t);
                if (r.startsWithAnyCase(a, `${n.LOCAL_STORAGE_START_ID}${s}`)) {
                    const t = window.localStorage.getItem(a);
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
            a(e);
            window.localStorage.setItem(`${n.LOCAL_STORAGE_START_ID}${i}`, o);
        }
    }
    e.store = i;
    function a(e) {
        if (e.useLocalStorageForData && window.localStorage) {
            const t = window.localStorage.length;
            const i = [];
            const o = e._currentView.element.id;
            for (let e = 0; e < t; e++) {
                const t = window.localStorage.key(e);
                if (r.startsWithAnyCase(t, `${n.LOCAL_STORAGE_START_ID}${o}`)) {
                    i.push(t);
                }
            }
            const a = i.length;
            for (let e = 0; e < a; e++) {
                window.localStorage.removeItem(i[e]);
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
            document.addEventListener("keydown", e => o(e));
        }
        e.bindEvents = n;
        function i() {
            document.removeEventListener("keydown", o);
        }
        e.unbindEvents = i;
        function o(e) {
            if (e.key === "Escape") {
                t();
            }
        }
    })(t = e.Dialog || (e.Dialog = {}));
    function n(e) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => e());
        } else {
            e();
        }
    }
    e.onContentLoaded = n;
})(V || (V = {}));

var _;

(e => {
    function t(e, t, n, l, w) {
        if (t.zooming.enabled) {
            const g = s.create(n, "div", "zooming");
            let f = null;
            if (t.zooming.showCloseButton) {
                const n = s.create(g, "div", "zoom-close-button");
                if (t.zooming.showToolTips) {
                    c.add(n, t, e.text.closeButtonText);
                }
                n.onclick = () => {
                    t.zooming.enabled = false;
                    t._currentView.mapContents.style.paddingRight = "0px";
                    g.parentNode.removeChild(g);
                };
            }
            if (t.zooming.showResetButton) {
                f = s.createIconButton(g, "button", "reset", "exclamation-mark");
                if (t.zooming.showToolTips) {
                    c.add(f, t, e.text.resetButtonText);
                }
                f.onclick = () => o(t, w);
            }
            const h = s.createIconButton(g, "button", "zoom-out", "minus");
            const m = s.createWithHTML(g, "span", "zoom-level", `+${r.friendlyNumber(t._currentView.zoomLevel * 10)}%`);
            const p = s.createIconButton(g, "button", "zoom-in", "plus");
            const y = s.getStyleValueByName(document.documentElement, u.Variables.Spacing, true);
            if (t.zooming.showToolTips) {
                c.add(p, t, e.text.zoomInText);
                c.add(h, t, e.text.zoomOutText);
            }
            g.style.bottom = n.offsetHeight - l.offsetHeight + "px";
            if (t._currentView.zoomLevel === -1) {
                t._currentView.zoomLevel = 0;
                m.innerText = `+${r.friendlyNumber(t._currentView.zoomLevel * 10)}%`;
            }
            if (i.defined(t._currentView.mapContents)) {
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
        let i = s.getStyleValueByName(document.documentElement, u.Variables.DaySize, true);
        let o = s.getStyleValueByName(document.documentElement, u.Variables.LineWidth, true);
        if (e._currentView.zoomMapViewIncrement === -1) {
            e._currentView.zoomMapViewIncrement = i / 10;
        }
        if (e._currentView.zoomLineViewIncrement === -1) {
            e._currentView.zoomLineViewIncrement = o / 10;
        }
        if (e.zooming.defaultLevel > 0 && e._currentView.zoomLevel === -1) {
            i += parseFloat((e.zooming.defaultLevel * e._currentView.zoomMapViewIncrement).toFixed(1));
            o += parseFloat((e.zooming.defaultLevel * e._currentView.zoomLineViewIncrement).toFixed(1));
            e._currentView.zoomLevel = e.zooming.defaultLevel;
            e._currentView.element.style.setProperty(u.Variables.DaySize, `${i}${t}`);
            e._currentView.element.style.setProperty(u.Variables.LineWidth, `${o}${n}`);
        }
    }
    e.setupDefaults = n;
    function o(e, t) {
        if (e._currentView.zoomLevel > 0) {
            e._currentView.element.style.removeProperty(u.Variables.DaySize);
            e._currentView.element.style.removeProperty(u.Variables.LineWidth);
            e._currentView.zoomLevel = 0;
            e._currentView.mapDayWidth = 0;
            l.customEvent(e.events.onZoomLevelChange, e._currentView.element, e._currentView.zoomLevel);
            t();
        }
    }
    function a(e, t) {
        if (e._currentView.zoomLevel > 0) {
            const n = s.getStyleValueByNameSizingMetic(document.documentElement, u.Variables.DaySize);
            const i = s.getStyleValueByNameSizingMetic(document.documentElement, u.Variables.LineWidth);
            let o = s.getStyleValueByName(e._currentView.element, u.Variables.DaySize, true);
            let r = s.getStyleValueByName(e._currentView.element, u.Variables.LineWidth, true);
            o -= e._currentView.zoomMapViewIncrement;
            o = parseFloat(o.toFixed(1));
            r -= e._currentView.zoomLineViewIncrement;
            r = parseFloat(r.toFixed(1));
            e._currentView.zoomLevel--;
            e._currentView.element.style.setProperty(u.Variables.DaySize, `${o}${n}`);
            e._currentView.element.style.setProperty(u.Variables.LineWidth, `${r}${i}`);
            e._currentView.mapDayWidth = 0;
            l.customEvent(e.events.onZoomLevelChange, e._currentView.element, e._currentView.zoomLevel);
            t();
        }
    }
    function d(e, t) {
        if (e.zooming.maximumLevel === 0 || e._currentView.zoomLevel < e.zooming.maximumLevel) {
            const n = s.getStyleValueByNameSizingMetic(document.documentElement, u.Variables.DaySize);
            const i = s.getStyleValueByNameSizingMetic(document.documentElement, u.Variables.LineWidth);
            let o = s.getStyleValueByName(e._currentView.element, u.Variables.DaySize, true);
            let r = s.getStyleValueByName(e._currentView.element, u.Variables.LineWidth, true);
            o += e._currentView.zoomMapViewIncrement;
            o = parseFloat(o.toFixed(1));
            r += e._currentView.zoomLineViewIncrement;
            r = parseFloat(r.toFixed(1));
            e._currentView.zoomLevel++;
            e._currentView.element.style.setProperty(u.Variables.DaySize, `${o}${n}`);
            e._currentView.element.style.setProperty(u.Variables.LineWidth, `${r}${i}`);
            e._currentView.mapDayWidth = 0;
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
            if (!i.defined(t)) {
                t = new MutationObserver(() => n());
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
    function o(e) {
        if (e.observationMode && i.defined(t)) {
            t.disconnect();
            t = null;
        }
    }
    e.destroy = o;
})(C || (C = {}));

(() => {
    let D = {};
    let x = {};
    function S() {
        const e = D.domElementTypes;
        const t = e.length;
        for (let n = 0; n < t; n++) {
            const t = document.getElementsByTagName(e[n]);
            const i = [].slice.call(t);
            const o = i.length;
            for (let e = 0; e < o; e++) {
                if (!M(i[e])) {
                    break;
                }
            }
        }
    }
    function M(e) {
        let t = true;
        if (i.defined(e) && e.hasAttribute(n.Attribute.HEAT_JS)) {
            const r = e.getAttribute(n.Attribute.HEAT_JS);
            if (i.definedString(r) || D.allowEmptyBindings) {
                const a = o.getObjectFromString(r, D);
                if (a.parsed && i.definedObject(a.object)) {
                    B(g.Options.getForNewInstance(D, a.object, e));
                } else {
                    if (!D.safeMode) {
                        console.error(D.text.attributeNotValidErrorText.replace("{{attribute_name}}", n.Attribute.HEAT_JS));
                        t = false;
                    }
                }
            } else {
                if (!D.safeMode) {
                    console.error(D.text.attributeNotSetErrorText.replace("{{attribute_name}}", n.Attribute.HEAT_JS));
                    t = false;
                }
            }
        }
        return t;
    }
    function B(e) {
        l.customEvent(e.events.onBeforeRender, e._currentView.element);
        if (!i.definedString(e._currentView.element.id)) {
            e._currentView.element.id = crypto.randomUUID();
        }
        s.addClass(e._currentView.element, "heat-js");
        if (e.resizable) {
            s.addClass(e._currentView.element, "resizable");
        }
        e._currentView.element.removeAttribute(n.Attribute.HEAT_JS);
        je(e._currentView.element.id, e);
        O(e);
        _.setupDefaults(e);
        l.customEvent(e.events.onRenderComplete, e._currentView.element);
        e._currentView.initialized = true;
    }
    function O(e, t = false, n = false, i = false) {
        c.hide(e);
        if (t) {
            T.store(e, x[e._currentView.element.id]);
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
            me(e, n, i);
        }
        if (e.views.line.enabled && e._currentView.activeView === 2) {
            be(e, n, i);
        }
        if (e.views.chart.enabled && e._currentView.activeView === 3) {
            _e(e, n, i);
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
        if (e._currentView.initialized) {
            l.customEvent(e.events.onChange, e._currentView.element);
        }
    }
    function N(e) {
        const t = e.sideMenu.enabled && e._currentView.viewsEnabled > 1;
        if (t) {
            e._currentView.sideMenu = s.create(e._currentView.element, "div", "container-side-menu", e._currentView.container);
            if (e.views.map.enabled) {
                A(e, 1, "map", D.text.mapText);
            }
            if (e.views.line.enabled) {
                A(e, 2, "line", D.text.lineText);
            }
            if (e.views.chart.enabled) {
                A(e, 3, "chart", D.text.chartText);
            }
            if (e.views.days.enabled) {
                A(e, 4, "days", D.text.daysText);
            }
            if (e.views.months.enabled) {
                A(e, 5, "months", D.text.monthsText);
            }
            if (e.views.colorRanges.enabled) {
                A(e, 6, "color-ranges", D.text.colorRangesText);
            }
        }
    }
    function A(e, t, n, i) {
        const o = s.create(e._currentView.sideMenu, "div", "menu-tab");
        o.onclick = () => Fe(e, t);
        if (e._currentView.activeView === t) {
            s.addClass(o, "active");
        }
        if (e.sideMenu.showToolTips) {
            c.add(o, e, i);
        }
        s.create(o, "i", n);
    }
    function k(e) {
        h.Background.render(e);
        if (!i.definedParentElement(e._currentView.configurationDialog)) {
            e._currentView.configurationDialog = s.create(e._currentView.disabledBackground, "div", "dialog configuration");
            const t = s.create(e._currentView.configurationDialog, "div", "dialog-title-bar");
            const n = s.create(e._currentView.configurationDialog, "div", "dialog-contents");
            const i = s.create(t, "div", "dialog-close");
            const o = s.create(n, "div", "side-containers");
            const r = s.create(o, "div", "side-container panel");
            const a = s.create(o, "div", "side-container panel");
            s.createWithHTML(t, "span", "dialog-title-bar-text", D.text.configurationTitleText);
            s.createWithHTML(r, "div", "side-container-title-text", `${D.text.visibleDaysText}${":"}`);
            s.createWithHTML(a, "div", "side-container-title-text", `${D.text.visibleMonthsText}${":"}`);
            const l = s.create(a, "div", "side-container");
            const d = s.create(a, "div", "side-container");
            const u = s.create(n, "div", "buttons");
            const w = s.createButton(u, "button", "", D.text.resetButtonText);
            const g = s.createButton(u, "button", "default", D.text.saveButtonText);
            i.onclick = () => R(e);
            w.onclick = () => E(e);
            g.onclick = () => I(e);
            for (let t = 0; t < 7; t++) {
                e._currentView.configurationDialogDayCheckBoxes[t] = s.createCheckBox(r, D.text.dayNames[t], t.toString());
            }
            let f = l;
            let h = 0;
            for (let t = e.startMonth; t < 12 + e.startMonth; t++) {
                let n = t;
                if (e.startMonth > 0 && t > 11) {
                    n = t - 12;
                }
                e._currentView.configurationDialogMonthCheckBoxes[n] = s.createCheckBox(f, D.text.monthNames[n], n.toString());
                h++;
                if (h > 6) {
                    f = d;
                }
            }
            c.add(i, e, D.text.closeButtonText);
        }
    }
    function L(e) {
        k(e);
        h.Background.show(e);
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
        c.hide(e);
        V.Dialog.bindEvents(() => R(e));
    }
    function R(e) {
        h.Background.hide(e);
        if (i.defined(e._currentView.configurationDialog) && e._currentView.configurationDialog.style.display !== "none") {
            e._currentView.configurationDialog.style.display = "none";
        }
        c.hide(e);
        V.Dialog.unbindEvents();
    }
    function I(e) {
        h.Background.hide(e);
        if (i.defined(e._currentView.configurationDialog) && e._currentView.configurationDialog.style.display !== "none") {
            e._currentView.configurationDialog.style.display = "none";
        }
        const t = m.Days.get(e);
        const n = m.Months.get(e);
        const o = [];
        const r = [];
        let a = false;
        for (let t = 0; t < 7; t++) {
            if (e._currentView.configurationDialogDayCheckBoxes[t].checked) {
                o.push(t + 1);
            }
        }
        for (let t = 0; t < 12; t++) {
            if (e._currentView.configurationDialogMonthCheckBoxes[t].checked) {
                r.push(t + 1);
            }
        }
        if (o.length >= 1 && JSON.stringify(o) !== JSON.stringify(t)) {
            m.Days.set(e, o);
            a = true;
        }
        if (r.length >= 1 && JSON.stringify(r) !== JSON.stringify(n)) {
            m.Months.set(e, r);
            a = true;
        }
        if (a) {
            O(e);
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
        if (!i.definedParentElement(e._currentView.exportDialog)) {
            e._currentView.exportDialog = s.create(e._currentView.disabledBackground, "div", "dialog export");
            const t = s.create(e._currentView.exportDialog, "div", "dialog-title-bar");
            const n = s.create(e._currentView.exportDialog, "div", "dialog-contents");
            const i = s.create(t, "div", "dialog-close");
            s.createWithHTML(t, "span", "dialog-title-bar-text", D.text.selectTypeText);
            e._currentView.exportDialogExportTypeSelect = s.create(n, "select", "input-box");
            e._currentView.exportDialogExportTypeSelect.name = crypto.randomUUID();
            e._currentView.exportDialogExportFilenameInput = s.create(n, "input", "input-box filename");
            e._currentView.exportDialogExportFilenameInput.name = crypto.randomUUID();
            e._currentView.exportDialogExportFilenameInput.placeholder = D.text.filenamePlaceholderText;
            e._currentView.exportDialogExportOnlyDataBeingViewedCheckBox = s.createCheckBox(n, D.text.onlyDataBeingViewedText, crypto.randomUUID());
            e._currentView.exportDialogExportOnlyDataBeingViewedCheckBox.checked = e.exportOnlyDataBeingViewed;
            const o = s.create(n, "div", "buttons");
            const r = s.createButton(o, "button", "", D.text.copyButtonText);
            const a = s.createButton(o, "button", "default", D.text.exportButtonText);
            $(e);
            e._currentView.exportDialogExportFilenameInput.onkeydown = t => {
                if (t.key === "Enter") {
                    j(e);
                }
            };
            i.onclick = () => Y(e);
            r.onclick = () => j(e, true);
            a.onclick = () => j(e);
            c.add(i, e, D.text.closeButtonText);
        }
    }
    function $(e) {
        let n;
        const i = [];
        for (n in t) {
            const o = s.createWithNoContainer("option");
            o.value = t[n];
            o.textContent = n.toString().toUpperCase();
            o.selected = n === e.exportType;
            i.push(o);
        }
        i.sort((e, t) => e.text.toLowerCase().localeCompare(t.text.toLowerCase()));
        i.forEach(t => e._currentView.exportDialogExportTypeSelect.add(t));
    }
    function H(e) {
        F(e);
        h.Background.show(e);
        if (i.defined(e._currentView.exportDialog) && e._currentView.exportDialog.style.display !== "block") {
            e._currentView.exportDialogExportFilenameInput.value = "";
            e._currentView.exportDialog.style.display = "block";
            e._currentView.exportDialogExportFilenameInput.focus();
        }
        c.hide(e);
        V.Dialog.bindEvents(() => Y(e));
    }
    function Y(e) {
        h.Background.hide(e);
        if (i.defined(e._currentView.exportDialog) && e._currentView.exportDialog.style.display !== "none") {
            e._currentView.exportDialog.style.display = "none";
        }
        c.hide(e);
        V.Dialog.unbindEvents();
    }
    function j(e, t = false) {
        const n = e._currentView.exportDialogExportTypeSelect.value;
        const i = e._currentView.exportDialogExportFilenameInput.value;
        const o = e._currentView.exportDialogExportOnlyDataBeingViewedCheckBox.checked;
        Y(e);
        W(e, n, i, o, t);
    }
    function W(e, t = null, n = null, r = true, a = false) {
        const c = o.getString(t, e.exportType).toLowerCase();
        const d = P(e, r);
        const u = y.Contents.get(c, d, D, e);
        if (i.definedString(u)) {
            if (a) {
                navigator.clipboard.writeText(u);
            } else {
                const t = y.File.getMimeType(c);
                const i = s.create(document.body, "a");
                i.style.display = "none";
                i.setAttribute("target", "_blank");
                i.setAttribute("href", `data:${t};charset=utf-8,${encodeURIComponent(u)}`);
                i.setAttribute("download", y.File.getFilename(D, e, n, c));
                i.click();
                document.body.removeChild(i);
            }
            l.customEvent(e.events.onExport, e._currentView.element);
        }
    }
    function P(e, t) {
        const n = {};
        const o = We(e);
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
                if (i.monthVisible(s, c)) {
                    const e = a.getTotalDaysInMonth(d, c);
                    for (let t = 0; t < e; t++) {
                        const e = new Date(d, c, t + 1);
                        const s = a.toStorageDate(e);
                        const l = a.getWeekdayNumber(e) + 1;
                        if (i.dayVisible(r, l)) {
                            if (Object.prototype.hasOwnProperty.call(o, s)) {
                                n[s] = o[s];
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
    function z(e) {
        h.Background.render(e);
        if (!i.definedParentElement(e._currentView.importDialog)) {
            e._currentView.importDialog = s.create(e._currentView.disabledBackground, "div", "dialog import");
            const t = s.create(e._currentView.importDialog, "div", "dialog-title-bar");
            const n = s.create(e._currentView.importDialog, "div", "dialog-contents");
            const i = s.create(t, "div", "dialog-close");
            s.createWithHTML(t, "span", "dialog-title-bar-text", D.text.selectFilesText);
            e._currentView.importDialogDragAndDrop = s.create(n, "div", "drag-and-drop-files");
            e._currentView.importDialogClearExistingData = s.createCheckBox(n, D.text.clearExistingDataText, crypto.randomUUID());
            s.createWithHTML(e._currentView.importDialogDragAndDrop, "div", "no-files", D.text.dragAndDropFilesText);
            G(e._currentView.importDialogDragAndDrop, e);
            const o = s.create(n, "div", "buttons");
            const r = s.createButton(o, "button", "", D.text.browseButtonText);
            e._currentView.importDialogImportButton = s.createButton(o, "button", "default", D.text.importButtonText);
            e._currentView.importDialogImportButton.disabled = true;
            i.onclick = () => J(e);
            r.onclick = () => Z(e);
            e._currentView.importDialogImportButton.onclick = () => K(e._currentView.importDialogFileList, e, e._currentView.importDialogClearExistingData.checked);
            c.add(i, e, D.text.closeButtonText);
        }
    }
    function U(e) {
        z(e);
        h.Background.show(e);
        if (i.defined(e._currentView.importDialog) && e._currentView.importDialog.style.display !== "block") {
            e._currentView.importDialog.style.display = "block";
        }
        c.hide(e);
        V.Dialog.bindEvents(() => J(e));
    }
    function J(e) {
        h.Background.hide(e);
        if (i.defined(e._currentView.importDialog) && e._currentView.importDialog.style.display !== "none") {
            e._currentView.importDialogDragAndDrop.innerHTML = "";
            e._currentView.importDialogFileList = null;
            e._currentView.importDialogImportButton.disabled = true;
            e._currentView.importDialog.style.display = "none";
            s.createWithHTML(e._currentView.importDialogDragAndDrop, "div", "no-files", D.text.dragAndDropFilesText);
        }
        c.hide(e);
        V.Dialog.unbindEvents();
    }
    function G(e, t) {
        if (!t._currentView.isInFetchMode) {
            e.ondragover = s.cancelBubble;
            e.ondragenter = s.cancelBubble;
            e.ondragleave = s.cancelBubble;
            e.ondrop = e => {
                s.cancelBubble(e);
                if (i.defined(window.FileReader) && e.dataTransfer.files.length > 0) {
                    const n = new DataTransfer;
                    if (!t.allowMultipleFileImports) {
                        n.items.add(e.dataTransfer.files[0]);
                    } else {
                        const t = e.dataTransfer.files.length;
                        for (let i = 0; i < t; i++) {
                            n.items.add(e.dataTransfer.files[i]);
                        }
                    }
                    X(t, n.files);
                }
            };
        }
    }
    function Z(t) {
        const n = [];
        let i;
        for (i in e) {
            n.push(`.${i}`);
        }
        const o = s.createWithNoContainer("input");
        o.type = "file";
        o.accept = n.join(", ");
        o.multiple = t.allowMultipleFileImports;
        o.onchange = () => X(t, o.files);
        o.click();
    }
    function X(e, t) {
        if (t.length <= 0) {
            e._currentView.importDialogDragAndDrop.innerHTML = "";
            e._currentView.importDialogImportButton.disabled = true;
            s.createWithHTML(e._currentView.importDialogDragAndDrop, "div", "no-files", D.text.dragAndDropFilesText);
        } else {
            e._currentView.importDialogFileList = t;
            e._currentView.importDialogDragAndDrop.innerHTML = "";
            e._currentView.importDialogImportButton.disabled = false;
            const i = Math.min(t.length, n.MAXIMUM_FILE_IMPORTS);
            for (let n = 0; n < i; n++) {
                const i = t[n].name;
                const o = s.createWithHTML(e._currentView.importDialogDragAndDrop, "div", "filename", `<b>${n + 1}</b>. ${i}`);
                const r = s.create(o, "div", "remove");
                c.add(r, e, D.text.removeButtonText);
                r.onclick = () => q(e, n);
            }
        }
    }
    function q(e, t) {
        const n = new DataTransfer;
        const i = e._currentView.importDialogFileList.length;
        for (let o = 0; o < i; o++) {
            if (o !== t) {
                n.items.add(e._currentView.importDialogFileList[o]);
            }
        }
        X(e, n.files);
    }
    function K(e, t, i = false) {
        const o = Math.min(e.length, n.MAXIMUM_FILE_IMPORTS);
        const r = [];
        const a = We(t);
        if (i) {
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
            if (r.length === o) {
                l.customEvent(t.events.onImport, t._currentView.element);
                O(t, true);
            }
        };
        for (let t = 0; t < o; t++) {
            const n = e[t];
            const i = n.name.split(".").pop().toLowerCase();
            p.file(n, i, s, D);
        }
    }
    function Q(e) {
        h.Background.render(e);
        if (!i.definedParentElement(e._currentView.typeAddingDialog)) {
            e._currentView.typeAddingDialog = s.create(e._currentView.disabledBackground, "div", "dialog add-type");
            const t = s.create(e._currentView.typeAddingDialog, "div", "dialog-title-bar");
            const n = s.create(e._currentView.typeAddingDialog, "div", "dialog-contents");
            const i = s.create(t, "div", "dialog-close");
            s.createWithHTML(t, "span", "dialog-title-bar-text", D.text.addTypeText);
            e._currentView.typeAddingDialogTypeInput = s.create(n, "input", "input-box type");
            e._currentView.typeAddingDialogTypeInput.name = crypto.randomUUID();
            e._currentView.typeAddingDialogTypeInput.placeholder = D.text.typePlaceholderText;
            e._currentView.typeAddingOptionNewType = s.createCheckBox(n, D.text.openNewTypeText, crypto.randomUUID());
            e._currentView.typeAddingOptionNewType.checked = true;
            const o = s.create(n, "div", "buttons");
            e._currentView.typeAddingAddButton = s.createButton(o, "button", "default", D.text.addButtonText);
            e._currentView.typeAddingDialogTypeInput.onkeydown = t => {
                if (t.key === "Enter") {
                    ne(e);
                }
            };
            i.onclick = () => te(e);
            e._currentView.typeAddingAddButton.onclick = () => ne(e);
            c.add(i, e, D.text.closeButtonText);
        }
    }
    function ee(e, t = null) {
        Q(e);
        h.Background.show(e);
        if (i.defined(e._currentView.typeAddingDialog) && e._currentView.typeAddingDialog.style.display !== "block") {
            e._currentView.typeAddingDialogTypeInput.value = "";
            e._currentView.typeAddingDialog.style.display = "block";
            e._currentView.typeAddingRenameType = t;
            e._currentView.typeAddingDialogTypeInput.focus();
            if (i.definedString(t)) {
                e._currentView.typeAddingDialogTypeInput.value = t;
                e._currentView.typeAddingAddButton.innerText = D.text.saveButtonText;
                e._currentView.typeAddingDialogTypeInput.select();
            } else {
                e._currentView.typeAddingAddButton.innerText = D.text.addButtonText;
            }
        }
        c.hide(e);
        V.Dialog.bindEvents(() => te(e));
    }
    function te(e) {
        h.Background.hide(e);
        if (i.defined(e._currentView.typeAddingDialog) && e._currentView.typeAddingDialog.style.display !== "none") {
            e._currentView.typeAddingDialog.style.display = "none";
        }
        c.hide(e);
        V.Dialog.unbindEvents();
    }
    function ne(e) {
        const t = e._currentView.typeAddingDialogTypeInput.value.trim();
        const n = e._currentView.element.id;
        if (i.definedString(t) && !Object.prototype.hasOwnProperty.call(x[n].typeData, t)) {
            if (!i.definedString(e._currentView.typeAddingRenameType)) {
                x[n].typeData[t] = {};
                x[n].totalTypes++;
            } else {
                const i = x[n].typeData[e._currentView.typeAddingRenameType];
                delete x[n].typeData[e._currentView.typeAddingRenameType];
                x[n].typeData[t] = i;
            }
            if (e._currentView.typeAddingOptionNewType.checked || e._currentView.activeType === e._currentView.typeAddingRenameType) {
                e._currentView.activeType = t;
                l.customEvent(e.events.onTypeSwitch, e._currentView.element, t);
            }
            l.customEvent(e.events.onAddType, e._currentView.element, t);
            te(e);
            O(e, true);
        } else {
            te(e);
        }
    }
    function ie(e) {
        h.Background.render(e);
        if (!i.definedParentElement(e._currentView.confirmationDialog)) {
            e._currentView.confirmationDialog = s.create(e._currentView.disabledBackground, "div", "dialog confirmation");
            const t = s.create(e._currentView.confirmationDialog, "div", "dialog-title-bar");
            const n = s.create(e._currentView.confirmationDialog, "div", "dialog-contents");
            s.createWithHTML(t, "span", "dialog-title-bar-text", D.text.confirmText);
            e._currentView.confirmationDialogMessage = s.create(n, "div", "message");
            const i = s.create(n, "div", "buttons");
            const o = s.createButton(i, "button", "no", D.text.noButtonText);
            e._currentView.confirmationDialogYesButton = s.createButton(i, "button", "default yes", D.text.yesButtonText);
            o.onclick = () => re(e);
        }
    }
    function oe(e, t, n) {
        ie(e);
        h.Background.show(e);
        if (i.defined(e._currentView.confirmationDialog) && e._currentView.confirmationDialog.style.display !== "block") {
            e._currentView.confirmationDialog.style.display = "block";
            e._currentView.confirmationDialogMessage.innerHTML = t;
            e._currentView.confirmationDialogYesButton.onclick = () => n();
        }
        c.hide(e);
        V.Dialog.bindEvents(() => re(e));
    }
    function re(e) {
        h.Background.hide(e);
        if (i.defined(e._currentView.confirmationDialog) && e._currentView.confirmationDialog.style.display !== "none") {
            e._currentView.confirmationDialog.style.display = "none";
        }
        c.hide(e);
        V.Dialog.unbindEvents();
    }
    function ae(e) {
        if (e.title.showText || e.title.showYearSelector || e.title.showRefreshButton || e.title.showExportButton || e.title.showImportButton || e.title.showClearButton) {
            const t = s.create(e._currentView.container, "div", "title-bar");
            const n = s.create(t, "div", "title");
            const o = !e.sideMenu.enabled && e._currentView.viewsEnabled > 1;
            if (o) {
                if (e.title.showTitleDropDownButton) {
                    s.create(n, "div", "down-arrow");
                }
            } else {
                s.addClass(n, "no-click");
            }
            if (e.title.showText) {
                n.innerHTML = `${n.innerHTML}${e.title.text}`;
                if (e.title.showSectionText) {
                    s.createWithHTML(n, "span", "section-text", "[");
                    s.createWithHTML(n, "span", "section-text-name", m.View.getText(e, D));
                    s.createWithHTML(n, "span", "section-text", "]");
                }
            }
            if (o) {
                le(e, n);
            }
            if (e.title.showImportButton && !e._currentView.isInFetchMode) {
                const n = s.createIconButton(t, "button", "import", "arrow-up");
                n.onclick = () => U(e);
                if (e.title.showToolTips) {
                    c.add(n, e, D.text.importButtonText);
                }
            }
            if (e.title.showExportButton && Pe(e)) {
                const n = s.createIconButton(t, "button", "export", "arrow-down");
                n.onclick = () => H(e);
                if (e.title.showToolTips) {
                    c.add(n, e, D.text.exportButtonText);
                }
            }
            if (e.title.showRefreshButton) {
                const n = s.createIconButton(t, "button", "refresh", "refresh");
                if (e.title.showToolTips) {
                    c.add(n, e, D.text.refreshButtonText);
                }
                n.onclick = () => {
                    O(e);
                    l.customEvent(e.events.onRefresh, e._currentView.element);
                };
            }
            if (e.title.showClearButton && Ge(e) > 0) {
                const n = s.createIconButton(t, "button", "clear", "close");
                if (e.title.showToolTips) {
                    c.add(n, e, D.text.clearButtonText);
                }
                n.onclick = () => {
                    oe(e, D.text.clearDataConfirmText, () => {
                        Ue(e);
                        O(e, true);
                    });
                };
            }
            if (e.title.showYearSelector) {
                const n = s.createIconButton(t, "button", "back", "arrow-line-left");
                n.disabled = i.firstVisibleYear(e, e._currentView.activeYear);
                n.onclick = () => Qe(e);
                if (e.title.showToolTips) {
                    c.add(n, e, D.text.backButtonText);
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
                        c.add(n, e, D.text.configurationButtonText);
                    }
                }
                if (e.title.showCurrentYearButton) {
                    const n = s.createIconButton(t, "button", "current-year", "pin");
                    if (e.title.showToolTips) {
                        c.add(n, e, D.text.currentYearText);
                    }
                    n.onclick = () => {
                        e._currentView.activeYear = (new Date).getFullYear() - 1;
                        et(e, false);
                        l.customEvent(e.events.onSetYear, e._currentView.element, e._currentView.activeYear);
                    };
                }
                const o = s.createIconButton(t, "button", "next", "arrow-line-right");
                o.disabled = i.lastVisibleYear(e, e._currentView.activeYear);
                o.onclick = () => et(e);
                if (e.title.showToolTips) {
                    c.add(o, e, D.text.nextButtonText);
                }
            }
        }
    }
    function se(e, t) {
        let n = e._currentView.activeYear.toString();
        if (e.startMonth > 0) {
            n = `${n} / ${e._currentView.activeYear + 1}`;
        }
        e._currentView.yearText = s.createWithHTML(t, "div", "year-text", n);
        if (e._currentView.yearTextWidth === 0) {
            e._currentView.yearTextWidth = Math.ceil(e._currentView.yearText.offsetWidth + 20);
        }
        e._currentView.yearText.style.width = `${e._currentView.yearTextWidth}px`;
    }
    function le(e, t) {
        const n = s.create(t, "div", "titles-menu-container");
        const o = s.create(n, "div", "titles-menu");
        if (e.title.showTitleDropDownHeaders) {
            s.createWithHTML(o, "div", "title-menu-header", `${D.text.dataText}${":"}`);
        }
        if (e.views.map.enabled) {
            const t = ce(e, o, D.text.mapText);
            de(e, t, 1);
        }
        if (e.views.line.enabled) {
            const t = ce(e, o, D.text.lineText);
            de(e, t, 2);
        }
        if (e.views.chart.enabled) {
            const t = ce(e, o, D.text.chartText);
            de(e, t, 3);
        }
        let r = null;
        if (e.views.days.enabled) {
            if (e.title.showTitleDropDownHeaders) {
                r = s.createWithHTML(o, "div", "title-menu-header", `${D.text.yearText}${":"}`);
            }
            const t = ce(e, o, D.text.daysText);
            de(e, t, 4);
        }
        if (e.views.months.enabled) {
            if (e.title.showTitleDropDownHeaders && !i.defined(r)) {
                s.createWithHTML(o, "div", "title-menu-header", `${D.text.yearText}${":"}`);
            }
            const t = ce(e, o, D.text.monthsText);
            de(e, t, 5);
        }
        if (e.views.colorRanges.enabled) {
            if (e.title.showTitleDropDownHeaders) {
                s.createWithHTML(o, "div", "title-menu-header", `${D.text.statisticsText}${":"}`);
            }
            const t = ce(e, o, D.text.colorRangesText);
            de(e, t, 6);
        }
    }
    function ce(e, t, n) {
        const i = s.createWithHTML(t, "div", "title-menu-item", n);
        if (e.title.showTitleDropDownHeaders) {
            s.addClass(i, "indented");
        }
        return i;
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
        const o = (new Date).getFullYear();
        let r = null;
        t.style.display = "block";
        t.style.visibility = "hidden";
        for (let t = o - e.title.extraSelectionYears; t < o + e.title.extraSelectionYears; t++) {
            if (i.yearVisible(e, t)) {
                const a = we(e, n, t, o);
                if (!i.defined(r)) {
                    r = a;
                }
            }
        }
        if (i.defined(r)) {
            n.scrollTop = r.offsetTop - n.offsetHeight / 2;
        }
        t.style.display = "none";
        t.style.visibility = "visible";
    }
    function we(e, t, n, i) {
        let o = null;
        const r = e.startMonth === 0 ? n.toString() : `${n} / ${n + 1}`;
        const a = s.createWithHTML(t, "div", "year-menu-item", r);
        if (e._currentView.activeYear !== n) {
            a.onclick = () => {
                e._currentView.activeYear = n;
                O(e);
                l.customEvent(e.events.onSetYear, e._currentView.element, e._currentView.activeYear);
            };
            if (n === i) {
                s.addClass(a, "year-menu-item-current");
            }
        } else {
            s.addClass(a, "year-menu-item-active");
            o = a;
        }
        return o;
    }
    function ge(e) {
        const t = new Date;
        const n = e._currentView.activeYear === t.getFullYear();
        if (e.yearlyStatistics.enabled && (!e.yearlyStatistics.showOnlyForCurrentYear || n)) {
            const o = s.create(e._currentView.container, "div", "yearly-statistics");
            const l = m.Days.get(e);
            const c = m.Months.get(e);
            const d = new Date(e._currentView.activeYear, e.startMonth, 1);
            const u = new Date(e._currentView.activeYear + 1, e.startMonth, 1);
            const w = he(e, l, c, d, u);
            if (e.yearlyStatistics.showToday) {
                let c = We(e)[a.toStorageDate(t)];
                const d = s.create(o, "div", "statistics-box");
                const u = a.getWeekdayNumber(t) + 1;
                if (!i.defined(c) || !i.dayVisible(l, u)) {
                    c = 0;
                }
                const g = n ? r.friendlyNumber(c) : D.text.unavailableText;
                s.createWithHTML(d, "div", "statistics-box-title", `${D.text.todayText}${":"}`);
                const f = s.createWithHTML(d, "div", "statistics-box-count", g);
                if (!n) {
                    s.addClass(f, "unavailable");
                }
                fe(e, f, w, c, n);
            }
            if (e.yearlyStatistics.showThisWeek) {
                let t = 0;
                if (n) {
                    const n = a.getDateForMondayOfCurrentWeek();
                    const i = new Date(n);
                    i.setDate(n.getDate() + 7);
                    t = he(e, l, c, n, i);
                }
                const i = n ? r.friendlyNumber(t) : D.text.unavailableText;
                const d = s.create(o, "div", "statistics-box");
                s.createWithHTML(d, "div", "statistics-box-title", `${D.text.thisWeekText}${":"}`);
                const u = s.createWithHTML(d, "div", "statistics-box-count", i);
                if (!n) {
                    s.addClass(u, "unavailable");
                }
                fe(e, u, w, t, n);
            }
            if (e.yearlyStatistics.showThisMonth) {
                let i = 0;
                if (n) {
                    const n = new Date(t.getFullYear(), t.getMonth(), 1);
                    const o = new Date(t.getFullYear(), t.getMonth(), a.getTotalDaysInMonth(t.getFullYear(), t.getMonth()) + 1);
                    i = he(e, l, c, n, o);
                }
                const d = n ? r.friendlyNumber(i) : D.text.unavailableText;
                const u = s.create(o, "div", "statistics-box");
                s.createWithHTML(u, "div", "statistics-box-title", `${D.text.thisMonthText}${":"}`);
                const g = s.createWithHTML(u, "div", "statistics-box-count", d);
                if (!n) {
                    s.addClass(g, "unavailable");
                }
                fe(e, g, w, i, n);
            }
            if (e.yearlyStatistics.showThisYear) {
                const e = s.create(o, "div", "statistics-box");
                s.createWithHTML(e, "div", "statistics-box-title", `${D.text.thisYearText}${":"}`);
                s.createWithHTML(e, "div", "statistics-box-count", r.friendlyNumber(w));
            }
            if (o.innerHTML === "") {
                o.parentNode.removeChild(o);
            }
        }
    }
    function fe(e, t, n, i, o) {
        if (o && e.yearlyStatistics.showPercentages) {
            const o = i / n * 100;
            if (o !== Number.POSITIVE_INFINITY && o !== Number.NEGATIVE_INFINITY && !isNaN(o)) {
                const n = `${o.toFixed(e.percentageDecimalPoints)}%`;
                const i = s.create(t, "span", "percentage");
                s.createWithHTML(i, "span", "percentage-bracket", "(");
                s.createWithHTML(i, "span", "percentage-text", n);
                s.createWithHTML(i, "span", "percentage-bracket", ")");
            }
        }
    }
    function he(e, t, n, o, r) {
        let s = 0;
        const l = new Date(o);
        while (l < r) {
            const o = We(e)[a.toStorageDate(l)];
            const r = a.getWeekdayNumber(l) + 1;
            if (i.monthVisible(n, l.getMonth()) && i.dayVisible(t, r) && i.definedNumber(o)) {
                s += o;
            }
            l.setDate(l.getDate() + 1);
        }
        return s;
    }
    function me(e, t = false, o) {
        e._currentView.mapContentsContainer = s.create(e._currentView.container, "div", "map-contents-container");
        e._currentView.mapContents = s.create(e._currentView.mapContentsContainer, "div", "map-contents");
        if (!Te(e)) {
            e._currentView.mapContents.style.minHeight = `${n.DEFAULT_MINIMUM_HEIGHT}px`;
            const i = s.createWithHTML(e._currentView.mapContents, "div", "no-data-message", D.text.noMapDataMessage);
            if (t) {
                s.addClass(i, "view-switch");
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
                for (let o = 0; o < 7; o++) {
                    if (i.dayVisible(e.views.map.daysToShow, o + 1)) {
                        const i = !n || o % 3 === 0 ? D.text.dayNames[o] : " ";
                        const r = s.createWithHTML(t, "div", "day-name", i);
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
            const u = w.getAllSorted(e);
            for (let t = e.startMonth; t < 12 + e.startMonth; t++) {
                let o = t;
                let r = l;
                if (e.startMonth > 0 && t > 11) {
                    o = t - 12;
                    r++;
                }
                if (i.monthVisible(e.views.map.monthsToShow, o)) {
                    const t = s.create(d, "div", "month");
                    const c = s.create(t, "div", "day-columns");
                    const w = new Date(r, o, 1);
                    const g = a.getWeekdayNumber(w);
                    let f = a.getTotalDaysInMonth(r, o);
                    let h = s.create(c, "div", "day-column");
                    let m = false;
                    let p = 1;
                    t.setAttribute(n.Attribute.View.Map.HEAT_JS_MONTH_NUMBER, `${o + 1}`);
                    f += g;
                    for (let t = 0; t < f; t++) {
                        if (t >= g) {
                            m = true;
                        } else {
                            if (i.dayVisible(e.views.map.daysToShow, p)) {
                                const t = s.create(h, "div", "day-disabled");
                                if (!e.views.map.showSpacing) {
                                    s.addClass(t, "no-spacing");
                                }
                            }
                        }
                        if (m) {
                            let n = null;
                            if (i.dayVisible(e.views.map.daysToShow, p)) {
                                n = ve(e, h, t - g, o, r, u);
                            }
                            if ((t + 1) % 7 === 0) {
                                if (e.views.map.showDaysInReverseOrder) {
                                    s.reverseChildrenOrder(h);
                                }
                                h = s.create(c, "div", "day-column");
                                p = 0;
                                if (e._currentView.mapDayWidth === 0 && i.defined(n)) {
                                    const t = s.getStyleValueByName(n, "margin-left", true);
                                    const i = s.getStyleValueByName(n, "margin-right", true);
                                    e._currentView.mapDayWidth = n.offsetWidth + t + i;
                                }
                            }
                        }
                        p++;
                    }
                    pe(e, p, h);
                    if (e.views.map.showMonthNames) {
                        let n;
                        const i = t.offsetWidth;
                        const d = new Date(l, o, 1);
                        let u = D.text.monthNames[o];
                        if (e.startMonth > 0 && e.views.map.showYearsInMonthNames) {
                            u = `${u}${" "}${r}`;
                        }
                        if (!e.views.map.placeMonthNamesOnTheBottom) {
                            n = s.createWithHTML(t, "div", "month-name", u, c);
                        } else {
                            n = s.createWithHTML(t, "div", "month-name-bottom", u);
                        }
                        if (e.views.map.showMonthDayGaps) {
                            n.style.width = `${i}px`;
                        } else {
                            n.style.width = `${i - e._currentView.mapDayWidth}px`;
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
            _.render(D, e, e._currentView.mapContentsContainer, r, () => {
                O(e, false, false, true);
            });
            if (e.views.map.keepScrollPositions || o) {
                e._currentView.mapContents.scrollLeft = e._currentView.mapContentsScrollLeft;
            }
        }
        e._currentView.mapContentsContainer.style.display = "none";
    }
    function pe(e, t, n) {
        const o = 7 - n.children.length;
        if (o > 0 && o < 7) {
            for (let r = 0; r < o; r++) {
                if (i.dayVisible(e.views.map.daysToShow, t)) {
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
        for (let i = 1; i < n; i++) {
            const n = t.children[i];
            const o = n.getElementsByClassName("day-column");
            const r = [].slice.call(o);
            const a = r[0].getElementsByClassName("day-disabled");
            if (!e.views.map.showMonthDayGaps && a.length > 0) {
                n.style.marginLeft = `${-e._currentView.mapDayWidth}px`;
            } else if (e.views.map.showMonthDayGaps && a.length === 0) {
                n.style.marginLeft = `${e._currentView.mapDayWidth}px`;
            }
        }
    }
    function ve(e, t, d, u, g, f) {
        const h = d + 1;
        const m = s.create(t, "div", "day");
        const p = new Date(g, u, h);
        const y = i.holiday(e, p);
        const v = o.getNumber(We(e)[a.toStorageDate(p)], 0);
        const T = w.get(e, f, v, p);
        const b = Ze(e, p, v);
        m.setAttribute(n.Attribute.View.Map.HEAT_JS_DATE, `${r.padNumber(h)}-${r.padNumber(u + 1)}-${g}`);
        if (i.defined(T)) {
            m.setAttribute(n.Attribute.View.Map.HEAT_JS_MINIMUM, T.minimum.toString());
        }
        if (e.views.map.showToolTips) {
            c.addForDay(D, e, m, p, v, b, e.views.map.dayToolTipText, e.events.onMapDayToolTipRender, y.matched, e.views.map.showCountsInToolTips, e.views.map.showDifferencesInToolTips);
        }
        if (!e.views.map.showSpacing) {
            s.addClass(m, "no-spacing");
        }
        if (e.views.map.showDayDateNumbers) {
            const e = s.createWithHTML(m, "div", "count-date", h.toString());
            s.createWithHTML(e, "sup", "", a.getDayOrdinal(D, h));
        }
        if (e.views.map.showDayCounts && v > 0) {
            s.createWithHTML(m, "div", "count", r.friendlyNumber(v));
        }
        if (e.views.map.showDifferences && i.definedString(b)) {
            s.createWithHTML(m, "div", "difference", b);
        }
        if (i.definedFunction(e.events.onMapDayClick)) {
            m.onclick = () => l.customEvent(e.events.onMapDayClick, e._currentView.element, p, v, e._currentView.activeYear, y.matched);
        } else if (i.definedFunction(e.events.onMapDayDblClick)) {
            m.ondblclick = () => l.customEvent(e.events.onMapDayDblClick, e._currentView.element, p, v, e._currentView.activeYear, y.matched);
        } else {
            s.addClass(m, "no-hover");
        }
        if (i.defined(T) && w.isVisible(e, T.id)) {
            if (i.definedString(T.mapCssClassName)) {
                s.addClass(m, T.mapCssClassName);
            } else {
                s.addClass(m, T.cssClassName);
            }
        }
        if (e.views.map.highlightCurrentDay && a.isToday(p)) {
            s.addClass(m, "today");
        }
        return m;
    }
    function Te(e) {
        let t = false;
        const n = We(e);
        const i = e._currentView.activeYear.toString();
        const o = (e._currentView.activeYear + 1).toString();
        for (const r in n) {
            if (Object.prototype.hasOwnProperty.call(n, r)) {
                if (a.getStorageDateYear(r) === i) {
                    t = true;
                    break;
                } else if (e.startMonth > 0 && a.getStorageDateYear(r) === o) {
                    t = true;
                    break;
                }
            }
        }
        return t;
    }
    function be(e, t, o) {
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
            const i = s.createWithHTML(e._currentView.lineContents, "div", "no-data-message", D.text.noLineDataMessage);
            if (t) {
                s.addClass(i, "view-switch");
            }
        } else {
            const n = e._currentView.activeYear;
            const c = w.getAllSorted(e);
            let d = [];
            for (let o = e.startMonth; o < 12 + e.startMonth; o++) {
                let r = o;
                let s = n;
                if (e.startMonth > 0 && o > 11) {
                    r = o - 12;
                    s++;
                }
                if (i.monthVisible(e.views.line.monthsToShow, r)) {
                    const n = a.getTotalDaysInMonth(s, r);
                    let o = 1;
                    let u = false;
                    for (let w = 0; w < n; w++) {
                        const n = new Date(s, r, o);
                        const g = a.getWeekdayNumber(n) + 1;
                        if (i.dayVisible(e.views.line.daysToShow, g)) {
                            const n = Ve(l, e, w + 1, r, s, c, t);
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
                s.reverseChildrenOrder(l);
                d = d.reverse();
            }
            if (e.views.line.showMonthNames) {
                const t = s.create(e._currentView.lineContents, "div", "line-months");
                let o = 0;
                const r = r => {
                    let l = r + e.startMonth;
                    let c = n;
                    if (e.startMonth > 0 && l > 11) {
                        l -= 12;
                        c++;
                    }
                    if (i.monthVisible(e.views.line.monthsToShow, l)) {
                        const i = new Date(n, l, 1);
                        let r = D.text.monthNames[l];
                        if (e.startMonth > 0 && e.views.line.showYearsInMonthNames) {
                            r = `${r}${" "}${c}`;
                        }
                        const u = s.createWithHTML(t, "div", "month-name", r);
                        if (e.views.line.showInReverseOrder) {
                            let e = d[o].offsetLeft;
                            e -= u.offsetWidth;
                            e += d[o].offsetWidth;
                            u.style.left = `${e}px`;
                        } else {
                            u.style.left = `${d[o].offsetLeft}px`;
                        }
                        if (a.isCurrentMonthAndYear(i)) {
                            s.addClass(u, "current");
                        }
                        if (e.views.months.enabled) {
                            u.ondblclick = () => Fe(e, 5);
                        }
                        o++;
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
            _.render(D, e, e._currentView.lineContentsContainer, r, () => {
                O(e, false, false, true);
            });
            if (e.views.line.keepScrollPositions || o) {
                e._currentView.lineContents.scrollLeft = e._currentView.lineContentsScrollLeft;
            }
        }
        e._currentView.lineContentsContainer.style.display = "none";
    }
    function Ve(e, t, d, u, g, f, h) {
        const m = new Date(g, u, d);
        const p = s.create(e, "div", "day-line");
        const y = i.holiday(t, m);
        const T = o.getNumber(We(t)[a.toStorageDate(m)], 0);
        const b = w.get(t, f, T, m);
        const V = Ze(t, m, T);
        p.setAttribute(n.Attribute.View.Line.HEAT_JS_DATE, `${r.padNumber(d)}-${r.padNumber(u + 1)}-${g}`);
        if (i.defined(b)) {
            p.setAttribute(n.Attribute.View.Line.HEAT_JS_MINIMUM, b.minimum.toString());
        }
        if (t.views.line.showToolTips) {
            c.addForDay(D, t, p, m, T, V, t.views.line.dayToolTipText, t.events.onLineDayToolTipRender, y.matched, t.views.line.showCountsInToolTips, t.views.line.showDifferencesInToolTips);
        }
        if (i.definedFunction(t.events.onLineDayClick)) {
            p.onclick = () => l.customEvent(t.events.onLineDayClick, t._currentView.element, m, T, t._currentView.activeYear, y.matched);
        } else if (i.definedFunction(t.events.onLineDayDblClick)) {
            p.ondblclick = () => l.customEvent(t.events.onLineDayDblClick, t._currentView.element, m, T, t._currentView.activeYear, y.matched);
        } else {
            s.addClass(p, "no-hover");
        }
        if (i.defined(b) && w.isVisible(t, b.id)) {
            if (i.definedString(b.lineCssClassName)) {
                s.addClass(p, b.lineCssClassName);
            } else {
                s.addClass(p, b.cssClassName);
            }
        }
        v.setHeight(t, p, 100, h, true);
        return p;
    }
    function _e(e, t, o) {
        e._currentView.chartContents = s.create(e._currentView.container, "div", "chart-contents");
        e._currentView.chartContents.onscroll = () => c.hide(e);
        const r = s.create(e._currentView.chartContents, "div", "chart");
        const l = s.create(r, "div", "y-labels");
        const d = s.create(r, "div", "day-lines");
        const u = Ge(e);
        let g = 0;
        if (t) {
            s.addClass(r, "view-switch");
        }
        if (u > 0 && e.views.chart.showChartYLabels) {
            const e = s.createWithHTML(l, "div", "label-100", u.toString());
            const t = s.getStyleValueByName(l, "margin-right", true);
            s.createWithHTML(l, "div", "label-75", (Math.floor(u / 4) * 3).toString());
            s.createWithHTML(l, "div", "label-50", Math.floor(u / 2).toString());
            s.createWithHTML(l, "div", "label-25", Math.floor(u / 4).toString());
            s.createWithHTML(l, "div", "label-0", "0");
            l.style.width = `${e.offsetWidth}px`;
            g = l.offsetWidth + t;
        } else {
            l.parentNode.removeChild(l);
        }
        if (u === 0) {
            e._currentView.chartContents.style.minHeight = `${n.DEFAULT_MINIMUM_HEIGHT}px`;
            r.parentNode.removeChild(r);
            const i = s.createWithHTML(e._currentView.chartContents, "div", "no-data-message", D.text.noChartDataMessage);
            if (t) {
                s.addClass(i, "view-switch");
            }
        } else {
            const n = w.getAllSorted(e);
            const r = s.getStyleValueByName(d, "border-bottom-width", true);
            const l = (d.offsetHeight - r) / u;
            const c = e._currentView.activeYear;
            let f = [];
            let h = false;
            for (let o = e.startMonth; o < 12 + e.startMonth; o++) {
                let r = o;
                let u = c;
                if (e.startMonth > 0 && o > 11) {
                    r = o - 12;
                    u++;
                }
                if (i.monthVisible(e.views.chart.monthsToShow, r)) {
                    const o = a.getTotalDaysInMonth(u, r);
                    let c = 1;
                    let w = false;
                    for (let g = 0; g < o; g++) {
                        const o = new Date(u, r, c);
                        const m = a.getWeekdayNumber(o) + 1;
                        if (i.dayVisible(e.views.chart.daysToShow, m)) {
                            const i = Ce(d, e, g + 1, r, u, n, l, t);
                            if (!w && h && e.views.chart.addMonthSpacing) {
                                s.create(d, "div", "month-spacing", i);
                            }
                            if (!w) {
                                f.push(i);
                                w = true;
                            }
                        }
                        if ((g + 1) % 7 === 0) {
                            c = 0;
                        }
                        c++;
                    }
                }
                h = true;
            }
            if (e.views.chart.showInReverseOrder) {
                s.reverseChildrenOrder(d);
                f = f.reverse();
            }
            if (e.views.chart.showMonthNames) {
                const t = s.create(e._currentView.chartContents, "div", "chart-months");
                let n = 0;
                const o = s.create(t, "div", "month-name-space");
                o.style.height = `${t.offsetHeight}px`;
                o.style.width = `${g}px`;
                const r = o => {
                    let r = o + e.startMonth;
                    let l = c;
                    if (e.startMonth > 0 && r > 11) {
                        r -= 12;
                        l++;
                    }
                    if (i.monthVisible(e.views.chart.monthsToShow, r)) {
                        const i = new Date(c, r, 1);
                        let o = D.text.monthNames[r];
                        if (e.startMonth > 0 && e.views.chart.showYearsInMonthNames) {
                            o = `${o}${" "}${l}`;
                        }
                        const d = s.createWithHTML(t, "div", "month-name", o);
                        if (e.views.chart.showInReverseOrder) {
                            let e = f[n].offsetLeft;
                            e -= d.offsetWidth;
                            e += f[n].offsetWidth;
                            d.style.left = `${e}px`;
                        } else {
                            d.style.left = `${f[n].offsetLeft}px`;
                        }
                        if (a.isCurrentMonthAndYear(i)) {
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
            if (e.views.chart.keepScrollPositions || o) {
                e._currentView.chartContents.scrollLeft = e._currentView.chartContentsScrollLeft;
            }
        }
        e._currentView.chartContents.style.display = "none";
    }
    function Ce(e, t, d, g, f, h, m, p) {
        const y = new Date(f, g, d);
        const T = s.create(e, "div", "day-line");
        const b = o.getNumber(We(t)[a.toStorageDate(y)], 0);
        const V = w.get(t, h, b, y);
        const _ = b * m;
        T.setAttribute(n.Attribute.View.Chart.HEAT_JS_DATE, `${r.padNumber(d)}-${r.padNumber(g + 1)}-${f}`);
        if (_ <= 0) {
            T.style.visibility = "hidden";
        }
        if (i.defined(V)) {
            T.setAttribute(n.Attribute.View.Chart.HEAT_JS_MINIMUM, V.minimum.toString());
        }
        if (_ > 0) {
            const e = i.holiday(t, y);
            const n = Ze(t, y, b);
            if (t.views.chart.usePoints) {
                s.addClass(T, "day-point");
                const e = s.getStyleValueByName(document.documentElement, u.Variables.ChartViewLineDefaultWidth, true);
                const t = _ - e;
                if (t >= 0) {
                    T.style.marginBottom = `${t}px`;
                }
            }
            if (t.views.chart.showToolTips) {
                c.addForDay(D, t, T, y, b, n, t.views.chart.dayToolTipText, t.events.onChartDayToolTipRender, e.matched, t.views.chart.showCountsInToolTips, t.views.chart.showDifferencesInToolTips);
            }
            if (!t.views.chart.usePoints) {
                if (t.views.chart.showLineCounts || t.views.chart.showLineDateNumbers) {
                    s.addClass(T, "day-line-count");
                }
                if (t.views.chart.showLineDateNumbers) {
                    const e = s.createWithHTML(T, "div", "count-date", d.toString());
                    s.createWithHTML(e, "sup", "", a.getDayOrdinal(D, d));
                }
                if (t.views.chart.showLineCounts && b > 0) {
                    s.createWithHTML(T, "div", "count", r.friendlyNumber(b));
                }
                if (t.views.chart.showDifferences && i.definedString(n)) {
                    s.createWithHTML(T, "div", "difference", n);
                }
            }
            if (i.definedFunction(t.events.onChartDayClick)) {
                T.onclick = () => l.customEvent(t.events.onChartDayClick, t._currentView.element, y, b, t._currentView.activeYear, e.matched);
            } else if (i.definedFunction(t.events.onChartDayDblClick)) {
                T.ondblclick = () => l.customEvent(t.events.onChartDayDblClick, t._currentView.element, y, b, t._currentView.activeYear, e.matched);
            } else {
                s.addClass(T, "no-hover");
            }
            if (i.defined(V) && w.isVisible(t, V.id)) {
                if (i.definedString(V.chartCssClassName)) {
                    s.addClass(T, V.chartCssClassName);
                } else {
                    s.addClass(T, V.cssClassName);
                }
            }
            if (t.views.chart.highlightCurrentDay && a.isToday(y)) {
                s.addClass(T, "today");
            }
            if (t.views.chart.useGradients) {
                s.addGradientEffect(t._currentView.element, T);
            }
        }
        if (!t.views.chart.usePoints) {
            v.setHeight(t, T, _, p);
        }
        return T;
    }
    function De(e, t) {
        e._currentView.daysContents = s.create(e._currentView.container, "div", "days-contents");
        const o = s.create(e._currentView.daysContents, "div", "days");
        const r = s.create(e._currentView.daysContents, "div", "day-names");
        const l = s.create(o, "div", "y-labels");
        const c = s.create(o, "div", "day-lines");
        const d = w.getAllSorted(e);
        const u = Se(e, d);
        const g = new Date;
        const f = a.getWeekdayNumber(g) + 1;
        if (t && (!e.views.days.useDifferentOpacities || !e.views.days.showDayCounts)) {
            s.addClass(o, "view-switch");
        }
        if (u.largestValue > 0 && e.views.days.showChartYLabels) {
            const e = s.createWithHTML(l, "div", "label-100", u.largestValue.toString());
            const t = s.getStyleValueByName(l, "margin-right", true);
            s.createWithHTML(l, "div", "label-75", (Math.floor(u.largestValue / 4) * 3).toString());
            s.createWithHTML(l, "div", "label-50", Math.floor(u.largestValue / 2).toString());
            s.createWithHTML(l, "div", "label-25", Math.floor(u.largestValue / 4).toString());
            s.createWithHTML(l, "div", "label-0", "0");
            l.style.width = `${e.offsetWidth}px`;
            r.style.paddingLeft = `${l.offsetWidth + t}px`;
        } else {
            l.parentNode.removeChild(l);
        }
        if (u.largestValue === 0) {
            e._currentView.daysContents.style.minHeight = `${n.DEFAULT_MINIMUM_HEIGHT}px`;
            o.parentNode.removeChild(o);
            r.parentNode.removeChild(r);
            const i = s.createWithHTML(e._currentView.daysContents, "div", "no-days-message", D.text.noDaysDataMessage);
            if (t) {
                s.addClass(i, "view-switch");
            }
        } else {
            const n = s.getStyleValueByName(c, "border-bottom-width", true);
            const o = (c.offsetHeight - n) / u.largestValue;
            for (const n in u.values) {
                if (Object.prototype.hasOwnProperty.call(u.values, n) && i.dayVisible(e.views.days.daysToShow, parseInt(n))) {
                    const a = u.valueOpacities[u.values[n].total];
                    const l = xe(c, parseInt(n), u.values[n].total, e, o, a, u.totalValue, t);
                    if (e.views.days.showDayNames) {
                        const t = s.createWithHTML(r, "div", "day-name", D.text.dayNames[parseInt(n) - 1]);
                        if (g.getFullYear() === e._currentView.activeYear && f === parseInt(n)) {
                            s.addClass(t, "current");
                        }
                    }
                    if (e.views.days.showStackedColorRanges) {
                        for (const e in u.values[n].typeTotals) {
                            if (Object.prototype.hasOwnProperty.call(u.values[n].typeTotals, e)) {
                                const t = u.values[n].typeTotals[e];
                                const r = t * o;
                                const a = w.getByMinimum(d, parseInt(e));
                                if (r > 0) {
                                    const e = l.children.length > 0 ? l.children[0] : null;
                                    const t = s.create(l, "div", "stacked-color-range", e);
                                    t.style.height = `${r}px`;
                                    if (i.defined(a)) {
                                        if (i.definedString(a.daysCssClassName)) {
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
    function xe(e, t, o, u, w, g, f, h) {
        const m = s.create(e, "div", "day-line");
        const p = o * w;
        m.setAttribute(n.Attribute.View.Days.HEAT_JS_NUMBER, t.toString());
        if (p <= 0) {
            m.style.visibility = "hidden";
        }
        if (p > 0) {
            let e = null;
            if (!u.views.days.showStackedColorRanges) {
                s.addClass(m, "non-stacked");
            } else {
                s.addClass(m, "stacked");
            }
            if (u.views.days.showToolTips) {
                let e = a.getCustomFormattedDateText(u, D, u.views.days.dayToolTipText, new Date(u._currentView.activeYear, 0, 1), false, t - 1);
                e = `${e}${":"}${" "}<b class="tooltip-count">${r.friendlyNumber(o)}</b>`;
                c.add(m, u, e);
            }
            if (i.definedFunction(u.events.onWeekDayClick)) {
                m.onclick = () => l.customEvent(u.events.onWeekDayClick, u._currentView.element, t, o, u._currentView.activeYear);
            } else if (i.definedFunction(u.events.onWeekDayDblClick)) {
                m.ondblclick = () => l.customEvent(u.events.onWeekDayDblClick, u._currentView.element, t, o, u._currentView.activeYear);
            } else {
                s.addClass(m, "no-hover");
            }
            if (u.views.days.showDayCounts && o > 0) {
                s.addClass(m, "day-line-count");
                e = s.createWithHTML(m, "div", "count", r.friendlyNumber(o));
                if (u.views.days.showDayCountPercentages) {
                    s.createWithHTML(e, "div", "percentage", `${(o / f * 100).toFixed(u.percentageDecimalPoints)}%`);
                }
            }
            if (!u.views.days.showStackedColorRanges) {
                if (u.views.days.useGradients) {
                    s.addGradientEffect(u._currentView.element, m);
                    if (i.defined(e)) {
                        s.addClass(e, "blend-colors");
                    }
                } else if (u.views.days.useDifferentOpacities) {
                    const t = s.getStyleValueByName(m, "background-color");
                    const n = s.getStyleValueByName(m, "border-color");
                    if (i.defined(e)) {
                        s.addClass(e, "blend-colors");
                    }
                    if (i.rgbColor(t)) {
                        m.style.backgroundColor = d.toRgbOpacityColor(t, g);
                    } else if (i.hexColor(t)) {
                        m.style.backgroundColor = d.toRgbOpacityColor(d.hexToRgba(t), g);
                    }
                    if (i.rgbColor(n)) {
                        m.style.borderColor = d.toRgbOpacityColor(n, g);
                    } else if (i.hexColor(n)) {
                        m.style.borderColor = d.toRgbOpacityColor(d.hexToRgba(n), g);
                    }
                }
            }
        }
        v.setHeight(u, m, p, h);
        return m;
    }
    function Se(e, t) {
        const n = {
            values: b.largestValueForViewValues(7),
            valueOpacities: {},
            largestValue: 0,
            totalValue: 0
        };
        const o = We(e);
        const r = e._currentView.activeYear;
        for (let s = e.startMonth; s < 12 + e.startMonth; s++) {
            let l = s;
            let c = r;
            if (e.startMonth > 0 && s > 11) {
                l = s - 12;
                c++;
            }
            if (i.monthVisible(e.views.days.monthsToShow, l)) {
                const r = a.getTotalDaysInMonth(c, l);
                for (let s = 0; s < r; s++) {
                    const r = a.toStorageDate(new Date(c, l, s + 1));
                    if (Object.prototype.hasOwnProperty.call(o, r)) {
                        const d = new Date(c, l, s + 1);
                        const u = a.getWeekdayNumber(d) + 1;
                        if (!i.holiday(e, d).matched && i.dayVisible(e.views.days.daysToShow, u)) {
                            const a = o[r];
                            const s = w.get(e, t, a);
                            if (!i.defined(s) || s.visible) {
                                const e = i.defined(s) ? s.minimum.toString() : "0";
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
        const o = s.create(e._currentView.monthsContents, "div", "months");
        const r = s.create(e._currentView.monthsContents, "div", "month-names");
        const l = s.create(o, "div", "y-labels");
        const c = s.create(o, "div", "month-lines");
        const d = w.getAllSorted(e);
        const u = Oe(e, d);
        if (t && (!e.views.months.useDifferentOpacities || !e.views.months.showMonthCounts)) {
            s.addClass(o, "view-switch");
        }
        if (u.largestValue > 0 && e.views.months.showChartYLabels) {
            const e = s.createWithHTML(l, "div", "label-100", u.largestValue.toString());
            const t = s.getStyleValueByName(l, "margin-right", true);
            s.createWithHTML(l, "div", "label-75", (Math.floor(u.largestValue / 4) * 3).toString());
            s.createWithHTML(l, "div", "label-50", Math.floor(u.largestValue / 2).toString());
            s.createWithHTML(l, "div", "label-25", Math.floor(u.largestValue / 4).toString());
            s.createWithHTML(l, "div", "label-0", "0");
            l.style.width = `${e.offsetWidth}px`;
            r.style.paddingLeft = `${l.offsetWidth + t}px`;
        } else {
            l.parentNode.removeChild(l);
        }
        if (u.largestValue === 0) {
            e._currentView.monthsContents.style.minHeight = `${n.DEFAULT_MINIMUM_HEIGHT}px`;
            o.parentNode.removeChild(o);
            r.parentNode.removeChild(r);
            const i = s.createWithHTML(e._currentView.monthsContents, "div", "no-months-message", D.text.noMonthsDataMessage);
            if (t) {
                s.addClass(i, "view-switch");
            }
        } else {
            const n = s.getStyleValueByName(c, "border-bottom-width", true);
            const o = (c.offsetHeight - n) / u.largestValue;
            const l = e._currentView.activeYear;
            for (let n = e.startMonth; n < 12 + e.startMonth; n++) {
                let g = n;
                if (e.startMonth > 0 && n > 11) {
                    g = n - 12;
                }
                const f = g + 1;
                if (Object.prototype.hasOwnProperty.call(u.values, f) && i.monthVisible(e.views.months.monthsToShow, g)) {
                    const n = u.valueOpacities[u.values[f].total];
                    const h = Be(c, f, u.values[f].total, e, o, n, u.totalValue, t);
                    if (e.views.months.showMonthNames) {
                        const e = s.createWithHTML(r, "div", "month-name", D.text.monthNames[g]);
                        const t = new Date(l, g, 1);
                        if (a.isCurrentMonthAndYear(t)) {
                            s.addClass(e, "current");
                        }
                    }
                    if (e.views.months.showStackedColorRanges) {
                        for (const e in u.values[f].typeTotals) {
                            if (Object.prototype.hasOwnProperty.call(u.values[f].typeTotals, e)) {
                                const t = u.values[f].typeTotals[e];
                                const n = t * o;
                                const r = w.getByMinimum(d, parseInt(e));
                                if (n > 0) {
                                    const e = h.children.length > 0 ? h.children[0] : null;
                                    const t = s.create(h, "div", "stacked-color-range", e);
                                    t.style.height = `${n}px`;
                                    if (i.defined(r)) {
                                        if (i.definedString(r.monthsCssClassName)) {
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
    function Be(e, t, o, u, w, g, f, h) {
        const m = s.create(e, "div", "month-line");
        const p = o * w;
        m.setAttribute(n.Attribute.View.Month.HEAT_JS_NUMBER, t.toString());
        if (p <= 0) {
            m.style.visibility = "hidden";
        }
        if (p > 0) {
            const e = new Date;
            let n = null;
            if (!u.views.months.showStackedColorRanges) {
                s.addClass(m, "non-stacked");
            } else {
                s.addClass(m, "stacked");
            }
            if (u.views.months.showToolTips) {
                let e = a.getCustomFormattedDateText(u, D, u.views.months.monthToolTipText, new Date(u._currentView.activeYear, t - 1, 1));
                e = `${e}${":"}${" "}<b class="tooltip-count">${r.friendlyNumber(o)}</b>`;
                c.add(m, u, e);
            }
            let w = u._currentView.activeYear;
            if (u.startMonth > 0 && t - 1 < u.startMonth) {
                w++;
            }
            if (i.definedFunction(u.events.onMonthClick)) {
                m.onclick = () => l.customEvent(u.events.onMonthClick, u._currentView.element, t, o, w);
            } else if (i.definedFunction(u.events.onMonthDblClick)) {
                m.ondblclick = () => l.customEvent(u.events.onMonthDblClick, u._currentView.element, t, o, w);
            } else {
                s.addClass(m, "no-hover");
            }
            if (u.views.months.showMonthCounts && o > 0 && p > 0) {
                s.addClass(m, "month-line-count");
                n = s.createWithHTML(m, "div", "count", r.friendlyNumber(o));
                if (u.views.months.showMonthCountPercentages) {
                    s.createWithHTML(n, "div", "percentage", `${(o / f * 100).toFixed(u.percentageDecimalPoints)}%`);
                }
            }
            if (u.views.months.highlightCurrentMonth && e.getMonth() === t - 1 && u._currentView.activeYear === e.getFullYear()) {
                s.addClass(m, "today");
            }
            if (!u.views.months.showStackedColorRanges) {
                if (u.views.months.useGradients) {
                    s.addGradientEffect(u._currentView.element, m);
                    if (i.defined(n)) {
                        s.addClass(n, "blend-colors");
                    }
                } else if (u.views.months.useDifferentOpacities) {
                    const e = s.getStyleValueByName(m, "background-color");
                    const t = s.getStyleValueByName(m, "border-color");
                    if (i.defined(n)) {
                        s.addClass(n, "blend-colors");
                    }
                    if (i.rgbColor(e)) {
                        m.style.backgroundColor = d.toRgbOpacityColor(e, g);
                    } else if (i.hexColor(e)) {
                        m.style.backgroundColor = d.toRgbOpacityColor(d.hexToRgba(e), g);
                    }
                    if (i.rgbColor(t)) {
                        m.style.borderColor = d.toRgbOpacityColor(t, g);
                    } else if (i.hexColor(t)) {
                        m.style.borderColor = d.toRgbOpacityColor(d.hexToRgba(t), g);
                    }
                }
            }
        }
        v.setHeight(u, m, p, h);
        return m;
    }
    function Oe(e, t) {
        const n = {
            values: b.largestValueForViewValues(12),
            valueOpacities: {},
            largestValue: 0,
            totalValue: 0
        };
        const o = We(e);
        const r = e._currentView.activeYear;
        for (let s = e.startMonth; s < 12 + e.startMonth; s++) {
            let l = s;
            let c = r;
            if (e.startMonth > 0 && s > 11) {
                l = s - 12;
                c++;
            }
            if (i.monthVisible(e.views.months.monthsToShow, l)) {
                const r = l + 1;
                const s = a.getTotalDaysInMonth(c, l);
                for (let d = 0; d < s; d++) {
                    const s = a.toStorageDate(new Date(c, l, d + 1));
                    if (Object.prototype.hasOwnProperty.call(o, s)) {
                        const u = new Date(c, l, d + 1);
                        const g = a.getWeekdayNumber(u) + 1;
                        if (!i.holiday(e, u).matched && i.dayVisible(e.views.days.daysToShow, g)) {
                            const a = o[s];
                            const l = w.get(e, t, a);
                            if (!i.defined(l) || l.visible) {
                                const e = i.defined(l) ? l.minimum.toString() : "0";
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
        const o = s.create(e._currentView.colorRangesContents, "div", "color-ranges");
        const r = s.create(e._currentView.colorRangesContents, "div", "color-range-names");
        const a = s.create(o, "div", "y-labels");
        const l = s.create(o, "div", "color-range-lines");
        const c = w.getAllSorted(e);
        const d = ke(e, c);
        if (t) {
            s.addClass(o, "view-switch");
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
            o.parentNode.removeChild(o);
            r.parentNode.removeChild(r);
            const i = s.createWithHTML(e._currentView.colorRangesContents, "div", "no-color-ranges-message", D.text.noColorRangesDataMessage);
            if (t) {
                s.addClass(i, "view-switch");
            }
        } else {
            const n = s.getStyleValueByName(l, "border-bottom-width", true);
            const o = (l.offsetHeight - n) / d.largestValue;
            if (!e.views.colorRanges.showColorRangeLabels) {
                r.parentNode.removeChild(r);
            }
            for (const n in d.types) {
                if (Object.prototype.hasOwnProperty.call(d.types, n)) {
                    Ae(parseInt(n), l, d.types[n], e, c, o, d.totalValue, t);
                    const a = w.getByMinimum(c, parseInt(n));
                    if (e.views.colorRanges.showColorRangeLabels) {
                        if (!e.views.colorRanges.useColorRangeNamesForLabels || !i.defined(a) || !i.definedString(a.name)) {
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
    function Ae(e, t, o, a, d, u, g, f) {
        const h = s.create(t, "div", "color-range-line");
        const m = o * u;
        const p = w.getByMinimum(d, e);
        if (i.defined(p) && i.definedString(p.name)) {
            h.setAttribute(n.Attribute.View.ColorRanges.HEAT_JS_COLOR_RANGE_NAME, p.name);
            h.setAttribute(n.Attribute.View.ColorRanges.HEAT_JS_MINIMUM, p.minimum.toString());
        }
        if (m <= 0) {
            h.style.visibility = "hidden";
        }
        if (m > 0) {
            if (a.views.colorRanges.showToolTips) {
                let e;
                if (i.defined(p) && i.definedString(p.name) && a.views.colorRanges.showRangeNamesInToolTips) {
                    e = `${p.name}${":"}${" "}<b class="tooltip-count">${r.friendlyNumber(o)}</b>`;
                } else {
                    e = r.friendlyNumber(o);
                }
                c.add(h, a, e);
            }
            if (a.views.colorRanges.showRangeCounts && o > 0 && m > 0) {
                s.addClass(h, "color-range-line-count");
                const e = s.createWithHTML(h, "div", "count", r.friendlyNumber(o));
                if (a.views.colorRanges.showRangeCountPercentages) {
                    s.createWithHTML(e, "div", "percentage", `${(o / g * 100).toFixed(a.percentageDecimalPoints)}%`);
                }
            }
            if (i.definedFunction(a.events.onColorRangeClick)) {
                h.onclick = () => l.customEvent(a.events.onColorRangeClick, a._currentView.element, p, o, a._currentView.activeYear);
            } else if (i.definedFunction(a.events.onColorRangeDblClick)) {
                h.ondblclick = () => l.customEvent(a.events.onColorRangeDblClick, p, o, a._currentView.activeYear);
            } else {
                s.addClass(h, "no-hover");
            }
            if (i.defined(p) && w.isVisible(a, p.id)) {
                if (i.definedString(p.colorRangeCssClassName)) {
                    s.addClass(h, p.colorRangeCssClassName);
                } else {
                    s.addClass(h, p.cssClassName);
                }
            }
            if (a.views.colorRanges.useGradients) {
                s.addGradientEffect(a._currentView.element, h);
            }
        }
        v.setHeight(a, h, m, f);
    }
    function ke(e, t) {
        const n = We(e);
        const o = e._currentView.activeYear;
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
            let c = o;
            if (e.startMonth > 0 && r > 11) {
                l = r - 12;
                c++;
            }
            if (i.monthVisible(e.views.colorRanges.monthsToShow, l)) {
                const o = a.getTotalDaysInMonth(c, l);
                for (let r = 0; r < o; r++) {
                    const o = a.toStorageDate(new Date(c, l, r + 1));
                    if (Object.prototype.hasOwnProperty.call(n, o)) {
                        const d = new Date(c, l, r + 1);
                        const u = a.getWeekdayNumber(d) + 1;
                        if (!i.holiday(e, d).matched && i.dayVisible(e.views.colorRanges.daysToShow, u)) {
                            const r = w.get(e, t, n[o]);
                            const a = i.defined(r) ? r.minimum.toString() : "0";
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
        const o = Ye(e);
        const r = x[e._currentView.element.id].totalTypes;
        if (r > 1 || e.guide.allowTypeAdding) {
            if (i.definedString(e.description.text)) {
                const n = s.create(e._currentView.container, "div", "description", t);
                Ee(e, n);
            }
            if (r > 1) {
                const t = Object.keys(x[e._currentView.element.id].typeData).sort((e, t) => e.localeCompare(t, void 0, {
                    numeric: true,
                    sensitivity: "base"
                }));
                const i = t.length;
                for (let r = 0; r < i; r++) {
                    const i = t[r];
                    if (i !== D.text.unknownTrendText || o > 0) {
                        Re(e, n, i);
                    }
                }
            }
            if (e.guide.allowTypeAdding) {
                const t = s.createIconButton(n, "button", "add", "plus");
                c.add(t, e, D.text.addTypeText);
                t.onclick = () => ee(e);
            }
        } else {
            Ee(e, n);
        }
        if (e.guide.enabled) {
            const n = s.create(t, "div", "map-toggles");
            if (e.guide.showInvertLabel) {
                const t = s.createWithHTML(n, "div", "invert-text", D.text.invertText);
                if (e.guide.colorRangeTogglesEnabled) {
                    t.onclick = () => {
                        if (w.invertVisibleStates(e)) {
                            O(e, false, false, true);
                        }
                    };
                } else {
                    s.addClass(t, "no-click");
                }
            }
            if (e.guide.showLessAndMoreLabels) {
                const t = s.createWithHTML(n, "div", "less-text", D.text.lessText);
                if (e.guide.colorRangeTogglesEnabled) {
                    t.onclick = () => {
                        if (w.updateAllVisibleStates(e, false)) {
                            O(e, false, false, true);
                        }
                    };
                } else {
                    s.addClass(t, "no-click");
                }
            }
            const i = s.create(n, "div", "toggles");
            const o = w.getAllSorted(e);
            const r = o.length;
            const a = [];
            let l = 0;
            for (let t = 0; t < r; t++) {
                const n = Ie(e, i, o[t]);
                l = Math.max(l, n.offsetWidth);
                a.push(n);
            }
            if (e.guide.showNumbersInGuide) {
                const e = a.length;
                for (let t = 0; t < e; t++) {
                    a[t].style.width = `${l}px`;
                }
            }
            if (e.guide.showColorRangeTogglesInReverseOrder) {
                s.reverseChildrenOrder(i);
            }
            if (e.guide.showLessAndMoreLabels) {
                const t = s.createWithHTML(n, "div", "more-text", D.text.moreText);
                if (e.guide.colorRangeTogglesEnabled) {
                    t.onclick = () => {
                        if (w.updateAllVisibleStates(e, true)) {
                            O(e, false, false, true);
                        }
                    };
                } else {
                    s.addClass(t, "no-click");
                }
            }
        }
    }
    function Re(e, t, n) {
        const i = s.createButton(t, "button", "type", n);
        if (e.guide.allowTypeRemoving) {
            const t = s.create(i, "span", "clear");
            c.add(t, e, D.text.removeTypeText);
            t.onclick = t => {
                s.cancelBubble(t);
                oe(e, D.text.removeTypeConfirmText, () => {
                    Je(e, n);
                    O(e, true);
                });
            };
        }
        if (e._currentView.activeType === n) {
            s.addClass(i, "active");
        }
        i.onclick = () => $e(e, n);
        if (e.guide.allowTypeAdding) {
            i.ondblclick = () => ee(e, n);
        }
    }
    function Ie(e, t, i) {
        const o = s.create(t, "div");
        o.className = "toggle";
        o.setAttribute(n.Attribute.Area.ColorRangeToggle.HEAT_JS_MINIMUM, i.minimum.toString());
        if (e.guide.showToolTips) {
            c.add(o, e, i.tooltipText);
        }
        if (w.isVisible(e, i.id)) {
            s.addClass(o, w.getGuideCssClassName(e, i));
        }
        if (e.guide.showNumbersInGuide) {
            s.addClass(o, "toggle-number");
            o.innerHTML = `${i.minimum}${"+"}`;
        }
        if (e.guide.colorRangeTogglesEnabled) {
            o.onclick = () => {
                if (w.toggleVisibleState(e, i.id)) {
                    O(e, false, false, true);
                }
            };
        } else {
            s.addClass(o, "no-hover");
        }
        return o;
    }
    function Ee(e, t) {
        if (i.definedString(e.description.text)) {
            if (i.definedString(e.description.url)) {
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
            O(e, false, true);
        }
    }
    function $e(e, t) {
        if (e._currentView.activeType !== t) {
            e._currentView.activeType = t;
            l.customEvent(e.events.onTypeSwitch, e._currentView.element, t);
            O(e);
        }
    }
    function He(e) {
        const t = Ye(e);
        if (x[e._currentView.element.id].totalTypes > 1) {
            for (const n in x[e._currentView.element.id].typeData) {
                if (n !== D.text.unknownTrendText || t > 0) {
                    if (t === 0 && e._currentView.activeType === D.text.unknownTrendText) {
                        e._currentView.activeType = n;
                    }
                }
            }
        }
    }
    function Ye(e) {
        let t = 0;
        for (const n in x[e._currentView.element.id].typeData[D.text.unknownTrendText]) {
            if (Object.prototype.hasOwnProperty.call(x[e._currentView.element.id].typeData[D.text.unknownTrendText], n)) {
                t++;
                break;
            }
        }
        return t;
    }
    function je(e, t, n = true) {
        x[e] = {
            options: t,
            typeData: {},
            totalTypes: 1
        };
        x[e].typeData[D.text.unknownTrendText] = {};
        if (n && !t._currentView.isInFetchMode) {
            T.load(D, t, x[e]);
        }
    }
    function We(e) {
        return x[e._currentView.element.id].typeData[e._currentView.activeType];
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
        for (let i = e.startMonth; i < 12 + e.startMonth; i++) {
            let o = i;
            let r = t;
            if (e.startMonth > 0 && i > 11) {
                o = i - 12;
                r++;
            }
            const s = a.getTotalDaysInMonth(r, o);
            for (let e = 0; e < s; e++) {
                const t = new Date(r, o, e + 1);
                const i = a.toStorageDate(t);
                if (Object.prototype.hasOwnProperty.call(n, i)) {
                    delete n[i];
                }
            }
        }
        l.customEvent(e.events.onClearViewableData, e._currentView.element);
    }
    function Je(e, t) {
        delete x[e._currentView.element.id].typeData[t];
        x[e._currentView.element.id].totalTypes--;
        const n = Object.keys(x[e._currentView.element.id].typeData).sort((e, t) => e.localeCompare(t, void 0, {
            numeric: true,
            sensitivity: "base"
        }));
        e._currentView.activeType = n[0];
        l.customEvent(e.events.onRemoveType, e._currentView.element, t);
    }
    function Ge(e) {
        let t = 0;
        const n = We(e);
        const o = e._currentView.activeYear;
        for (let r = e.startMonth; r < 12 + e.startMonth; r++) {
            let s = r;
            let l = o;
            if (e.startMonth > 0 && r > 11) {
                s = r - 12;
                l++;
            }
            if (i.monthVisible(e.views.chart.monthsToShow, s)) {
                const o = a.getTotalDaysInMonth(l, s);
                for (let r = 0; r < o; r++) {
                    const o = new Date(l, s, r + 1);
                    const c = a.toStorageDate(o);
                    const d = a.getWeekdayNumber(o) + 1;
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
    function Ze(e, t, n) {
        let i = null;
        if (n > 0) {
            const r = new Date(t);
            r.setFullYear(r.getFullYear() - 1);
            const s = o.getNumber(We(e)[a.toStorageDate(r)], 0);
            if (s > 0) {
                const t = Math.abs(n - s) / ((n + s) / 2) * 100;
                if (t > 0) {
                    i = `${t.toFixed(e.percentageDecimalPoints)}%`;
                    if (n > s) {
                        i = `+${i}`;
                    } else {
                        i = `-${i}`;
                    }
                }
            }
        }
        return i;
    }
    function Xe(e) {
        if (e._currentView.isInFetchMode) {
            if (e._currentView.isInFetchModeTimer === 0) {
                qe(e);
            }
            if (e._currentView.isInFetchModeTimer === 0) {
                e._currentView.isInFetchModeTimer = setInterval(() => {
                    qe(e);
                    O(e);
                }, e.dataFetchDelay);
            }
        }
    }
    function qe(e) {
        const t = e._currentView.element.id;
        const n = l.customEvent(e.events.onDataFetch, e._currentView.element, t);
        if (i.definedObject(n)) {
            je(t, e, false);
            for (const e in n) {
                if (Object.prototype.hasOwnProperty.call(n, e)) {
                    if (!Object.prototype.hasOwnProperty.call(x[t].typeData[D.text.unknownTrendText], e)) {
                        x[t].typeData[D.text.unknownTrendText][e] = 0;
                    }
                    x[t].typeData[D.text.unknownTrendText][e] += n[e];
                }
            }
        }
    }
    function Ke() {
        for (const e in x) {
            if (Object.prototype.hasOwnProperty.call(x, e)) {
                const t = x[e].options;
                if (i.defined(t._currentView.isInFetchModeTimer)) {
                    clearInterval(t._currentView.isInFetchModeTimer);
                    t._currentView.isInFetchModeTimer = 0;
                }
            }
        }
        C.destroy(D);
    }
    function Qe(e, t = true) {
        let n = true;
        let o = e._currentView.activeYear;
        o--;
        while (!i.yearVisible(e, o)) {
            if (i.firstVisibleYear(e, o)) {
                n = false;
                break;
            }
            o--;
        }
        if (n) {
            e._currentView.activeYear = o;
            O(e);
            if (t) {
                l.customEvent(e.events.onBackYear, e._currentView.element, e._currentView.activeYear);
            }
        }
    }
    function et(e, t = true) {
        let n = true;
        let o = e._currentView.activeYear;
        o++;
        while (!i.yearVisible(e, o)) {
            if (i.lastVisibleYear(e, o)) {
                n = false;
                break;
            }
            o++;
        }
        if (n) {
            e._currentView.activeYear = o;
            O(e);
            if (t) {
                l.customEvent(e.events.onNextYear, e._currentView.element, e._currentView.activeYear);
            }
        }
    }
    function tt(e) {
        e._currentView.element.innerHTML = "";
        if (e._currentView.isInFetchMode && i.defined(e._currentView.isInFetchModeTimer)) {
            clearInterval(e._currentView.isInFetchModeTimer);
        }
        s.removeClass(e._currentView.element, "heat-js");
        c.remove(e);
        l.customEvent(e.events.onDestroy, e._currentView.element);
    }
    const nt = {
        addType: (e, t, n = true) => {
            if (i.definedString(e) && i.definedString(t) && Object.prototype.hasOwnProperty.call(x, e)) {
                const i = x[e].options;
                if (!i._currentView.isInFetchMode) {
                    if (!Object.prototype.hasOwnProperty.call(x[e].typeData, t)) {
                        x[e].typeData[t] = {};
                        x[e].totalTypes++;
                    }
                    l.customEvent(i.events.onAddType, i._currentView.element, t);
                    if (n) {
                        O(i, true);
                    }
                }
            }
            return nt;
        },
        removeType: (e, t, n = true) => {
            if (i.definedString(e) && i.definedString(t) && Object.prototype.hasOwnProperty.call(x, e)) {
                const i = x[e].options;
                if (!i._currentView.isInFetchMode && !Object.prototype.hasOwnProperty.call(x[e].typeData, t)) {
                    Je(i, t);
                    if (n) {
                        O(i, true);
                    }
                }
            }
            return nt;
        },
        addDates: (e, t, n = null, r = true) => {
            if (i.definedString(e) && i.definedArray(t) && Object.prototype.hasOwnProperty.call(x, e)) {
                const i = x[e].options;
                if (!i._currentView.isInFetchMode) {
                    n = o.getString(n, D.text.unknownTrendText);
                    const a = t.length;
                    for (let i = 0; i < a; i++) {
                        nt.addDate(e, t[i], n, false);
                    }
                    if (r) {
                        O(i, true);
                    }
                }
            }
            return nt;
        },
        addDate: (e, t, n = null, r = true) => {
            if (i.definedString(e) && i.definedDate(t) && Object.prototype.hasOwnProperty.call(x, e)) {
                const i = x[e].options;
                if (!i._currentView.isInFetchMode) {
                    n = o.getString(n, D.text.unknownTrendText);
                    const s = a.toStorageDate(t);
                    if (!Object.prototype.hasOwnProperty.call(x[e].typeData, n)) {
                        x[e].typeData[n] = {};
                        x[e].totalTypes++;
                    }
                    if (!Object.prototype.hasOwnProperty.call(x[e].typeData[n], s)) {
                        x[e].typeData[n][s] = 0;
                    }
                    x[e].typeData[n][s]++;
                    l.customEvent(i.events.onAddDate, i._currentView.element, t);
                    if (r) {
                        O(i, true);
                    }
                }
            }
            return nt;
        },
        updateDate: (e, t, n, r = null, s = true) => {
            if (i.definedString(e) && i.definedDate(t) && Object.prototype.hasOwnProperty.call(x, e)) {
                const i = x[e].options;
                if (!i._currentView.isInFetchMode && n > 0) {
                    r = o.getString(r, D.text.unknownTrendText);
                    if (Object.prototype.hasOwnProperty.call(x[e].typeData, r)) {
                        const o = a.toStorageDate(t);
                        x[e].typeData[r][o] = n;
                        l.customEvent(i.events.onUpdateDate, i._currentView.element, t);
                        if (s) {
                            O(i, true);
                        }
                    }
                }
            }
            return nt;
        },
        removeDates: (e, t, n = null, r = true) => {
            if (i.definedString(e) && i.definedArray(t) && Object.prototype.hasOwnProperty.call(x, e)) {
                const i = x[e].options;
                if (!i._currentView.isInFetchMode) {
                    n = o.getString(n, D.text.unknownTrendText);
                    const a = t.length;
                    for (let i = 0; i < a; i++) {
                        nt.removeDate(e, t[i], n, false);
                    }
                    if (r) {
                        O(i, true);
                    }
                }
            }
            return nt;
        },
        removeDate: (e, t, n = null, r = true) => {
            if (i.definedString(e) && i.definedDate(t) && Object.prototype.hasOwnProperty.call(x, e)) {
                const i = x[e].options;
                if (!i._currentView.isInFetchMode) {
                    n = o.getString(n, D.text.unknownTrendText);
                    const s = a.toStorageDate(t);
                    if (Object.prototype.hasOwnProperty.call(x[e].typeData, n) && Object.prototype.hasOwnProperty.call(x[e].typeData[n], s)) {
                        if (x[e].typeData[n][s] > 0) {
                            x[e].typeData[n][s]--;
                        }
                        l.customEvent(i.events.onRemoveDate, i._currentView.element, t);
                        if (r) {
                            O(i, true);
                        }
                    }
                }
            }
            return nt;
        },
        clearDate: (e, t, n = null, r = true) => {
            if (i.definedString(e) && i.definedDate(t) && Object.prototype.hasOwnProperty.call(x, e)) {
                const i = x[e].options;
                if (!i._currentView.isInFetchMode) {
                    n = o.getString(n, D.text.unknownTrendText);
                    const s = a.toStorageDate(t);
                    if (Object.prototype.hasOwnProperty.call(x[e].typeData, n) && Object.prototype.hasOwnProperty.call(x[e].typeData[n], s)) {
                        delete x[e].typeData[n][s];
                        l.customEvent(i.events.onClearDate, i._currentView.element, t);
                        if (r) {
                            O(i, true);
                        }
                    }
                }
            }
            return nt;
        },
        resetAll: (e = true) => {
            for (const t in x) {
                if (Object.prototype.hasOwnProperty.call(x, t)) {
                    nt.reset(t, e);
                }
            }
            return nt;
        },
        reset: (e, t = true) => {
            if (i.definedString(e) && Object.prototype.hasOwnProperty.call(x, e)) {
                const n = x[e].options;
                if (!n._currentView.isInFetchMode) {
                    n._currentView.activeType = D.text.unknownTrendText;
                    je(e, n, false);
                    l.customEvent(n.events.onReset, n._currentView.element);
                    if (t) {
                        O(n, true);
                    }
                }
            }
            return nt;
        },
        import: (e, t = null) => {
            if (i.definedString(e) && Object.prototype.hasOwnProperty.call(x, e)) {
                if (i.definedArray(t)) {
                    K(t, x[e].options);
                } else {
                    Z(x[e].options);
                }
            }
            return nt;
        },
        export: (e, t = null) => {
            if (i.definedString(e) && Object.prototype.hasOwnProperty.call(x, e)) {
                const n = x[e].options;
                W(n, t, null, n.exportOnlyDataBeingViewed);
            }
            return nt;
        },
        refresh: e => {
            if (i.definedString(e) && Object.prototype.hasOwnProperty.call(x, e)) {
                const t = x[e].options;
                O(t, true);
                l.customEvent(t.events.onRefresh, t._currentView.element);
            }
            return nt;
        },
        refreshAll: () => {
            for (const e in x) {
                if (Object.prototype.hasOwnProperty.call(x, e)) {
                    const t = x[e].options;
                    O(t, true);
                    l.customEvent(t.events.onRefresh, t._currentView.element);
                }
            }
            return nt;
        },
        setYear: (e, t) => {
            if (i.definedString(e) && i.definedNumber(t) && Object.prototype.hasOwnProperty.call(x, e)) {
                const n = x[e].options;
                n._currentView.activeYear = t;
                if (!i.yearVisible(n, n._currentView.activeYear)) {
                    et(n, false);
                } else {
                    O(n);
                }
                l.customEvent(n.events.onSetYear, n._currentView.element, n._currentView.activeYear);
            }
            return nt;
        },
        setYearToHighest: e => {
            if (i.definedString(e) && Object.prototype.hasOwnProperty.call(x, e)) {
                const t = x[e].options;
                const n = We(t);
                let o = 0;
                for (const e in n) {
                    if (Object.prototype.hasOwnProperty.call(n, e)) {
                        o = Math.max(o, parseInt(a.getStorageDateYear(e)));
                    }
                }
                if (o > 0) {
                    t._currentView.activeYear = o;
                    if (!i.yearVisible(t, t._currentView.activeYear)) {
                        et(t, false);
                    } else {
                        O(t);
                    }
                    l.customEvent(t.events.onSetYear, t._currentView.element, t._currentView.activeYear);
                }
            }
            return nt;
        },
        setYearToLowest: e => {
            if (i.definedString(e) && Object.prototype.hasOwnProperty.call(x, e)) {
                const t = x[e].options;
                const n = We(t);
                let o = 9999;
                for (const e in n) {
                    if (Object.prototype.hasOwnProperty.call(n, e)) {
                        o = Math.min(o, parseInt(a.getStorageDateYear(e)));
                    }
                }
                if (o < 9999) {
                    t._currentView.activeYear = o;
                    if (!i.yearVisible(t, t._currentView.activeYear)) {
                        Qe(t, false);
                    } else {
                        O(t);
                    }
                    l.customEvent(t.events.onSetYear, t._currentView.element, t._currentView.activeYear);
                }
            }
            return nt;
        },
        moveToPreviousYear: e => {
            if (i.definedString(e) && Object.prototype.hasOwnProperty.call(x, e)) {
                Qe(x[e].options);
            }
            return nt;
        },
        moveToNextYear: e => {
            if (i.definedString(e) && Object.prototype.hasOwnProperty.call(x, e)) {
                et(x[e].options);
            }
            return nt;
        },
        moveToCurrentYear: e => {
            if (i.definedString(e) && Object.prototype.hasOwnProperty.call(x, e)) {
                const t = x[e].options;
                t._currentView.activeYear = (new Date).getFullYear();
                if (!i.yearVisible(t, t._currentView.activeYear)) {
                    et(t, false);
                } else {
                    O(t);
                }
                l.customEvent(t.events.onSetYear, t._currentView.element, t._currentView.activeYear);
            }
            return nt;
        },
        getYear: e => {
            let t = -1;
            if (i.definedString(e) && Object.prototype.hasOwnProperty.call(x, e)) {
                t = x[e].options._currentView.activeYear;
            }
            return t;
        },
        render: (e, t) => {
            if (i.definedObject(e) && i.definedObject(t)) {
                B(g.Options.getForNewInstance(D, t, e));
            }
            return nt;
        },
        renderAll: () => {
            S();
            return nt;
        },
        switchView: (e, t) => {
            if (i.definedString(e) && i.definedString(t) && Object.prototype.hasOwnProperty.call(x, e)) {
                const n = m.View.get(t);
                if (n !== 0) {
                    Fe(x[e].options, n);
                }
            }
            return nt;
        },
        switchType: (e, t) => {
            if (i.definedString(e) && i.definedString(t) && Object.prototype.hasOwnProperty.call(x, e) && Object.prototype.hasOwnProperty.call(x[e].typeData, t)) {
                $e(x[e].options, t);
            }
            return nt;
        },
        updateBindingOptions: (e, t) => {
            if (i.definedString(e) && i.definedObject(t) && Object.prototype.hasOwnProperty.call(x, e)) {
                const n = x[e].options;
                const i = g.Options.get(t);
                let o = false;
                for (const e in i) {
                    if (Object.prototype.hasOwnProperty.call(i, e) && Object.prototype.hasOwnProperty.call(n, e) && n[e] !== i[e]) {
                        n[e] = i[e];
                        o = true;
                    }
                }
                if (o) {
                    O(n, true);
                    l.customEvent(n.events.onRefresh, n._currentView.element);
                    l.customEvent(n.events.onBindingOptionsUpdate, n._currentView.element, n);
                }
            }
            return nt;
        },
        getActiveView: e => {
            let t = "";
            if (i.definedString(e) && Object.prototype.hasOwnProperty.call(x, e)) {
                t = m.View.getName(x[e].options);
            }
            return t;
        },
        destroyAll: () => {
            for (const e in x) {
                if (Object.prototype.hasOwnProperty.call(x, e)) {
                    tt(x[e].options);
                }
            }
            x = {};
            return nt;
        },
        destroy: e => {
            if (i.definedString(e) && Object.prototype.hasOwnProperty.call(x, e)) {
                tt(x[e].options);
                delete x[e];
            }
            return nt;
        },
        setConfiguration: (e, t = true) => {
            if (i.definedObject(e)) {
                const n = D;
                let i = false;
                for (const t in e) {
                    if (Object.prototype.hasOwnProperty.call(e, t) && Object.prototype.hasOwnProperty.call(n, t) && n[t] !== e[t]) {
                        n[t] = e[t];
                        i = true;
                    }
                }
                if (i) {
                    D = f.Options.get(n);
                    C.setup(D, () => S());
                    if (t) {
                        nt.refreshAll();
                    }
                }
            }
            return nt;
        },
        setLocale: (e, t = true) => {
            if (i.definedObject(e)) {
                D.text = f.Options.getText(e);
                if (t) {
                    nt.refreshAll();
                }
            }
            return nt;
        },
        getIds: () => {
            const e = [];
            for (const t in x) {
                if (Object.prototype.hasOwnProperty.call(x, t)) {
                    e.push(t);
                }
            }
            return e;
        },
        getVersion: () => "5.1.0"
    };
    (() => {
        D = f.Options.get();
        V.onContentLoaded(() => {
            S();
            C.setup(D, () => S());
        });
        window.addEventListener("pagehide", () => Ke());
        if (!i.defined(window.$heat)) {
            window.$heat = nt;
        }
    })();
})();//# sourceMappingURL=heat.esm.js.map