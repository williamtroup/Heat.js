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
            let s;
            (e => {
                e.HEAT_JS_COLOR_RANGE_NAME = "data-heat-js-color-range-name";
                e.HEAT_JS_MINIMUM = "data-heat-js-color-range-minimum";
            })(s = e.ColorRanges || (e.ColorRanges = {}));
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
    function u(e) {
        return t(e) && document.contains(e);
    }
    e.definedParentElement = u;
    function d(t, n) {
        const o = {
            matched: false,
            name: null
        };
        const i = t.holidays.length;
        const r = n.getDate();
        const s = n.getMonth() + 1;
        const a = n.getFullYear();
        for (let n = 0; n < i; n++) {
            const i = t.holidays[n];
            if (e.definedString(i.date) && i.showInViews) {
                const e = i.date.split("/");
                if (e.length === 2) {
                    o.matched = r === parseInt(e[0]) && s === parseInt(e[1]);
                } else if (e.length === 3) {
                    o.matched = r === parseInt(e[0]) && s === parseInt(e[1]) && a === parseInt(e[2]);
                }
                if (o.matched) {
                    o.name = i.name;
                    break;
                }
            }
        }
        return o;
    }
    e.holiday = d;
    function w(e, t) {
        return e.indexOf(t + 1) > -1;
    }
    e.monthVisible = w;
    function f(e, t) {
        return e.indexOf(t) > -1;
    }
    e.dayVisible = f;
    function g(e, t) {
        return e.yearsToHide.indexOf(t) === -1 && (e._currentView.yearsAvailable.length === 0 || e._currentView.yearsAvailable.indexOf(t) > -1);
    }
    e.yearVisible = g;
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
    function s(e, t, n, i) {
        return o.definedNumber(e) ? e >= t && e <= n ? e : i : i;
    }
    e.getNumberInRange = s;
    function a(e, t) {
        return o.definedFunction(e) ? e : t;
    }
    e.getFunction = a;
    function l(e, t) {
        return o.definedArray(e) ? e : t;
    }
    e.getArray = l;
    function c(e, t) {
        return o.definedObject(e) ? e : t;
    }
    e.getObject = c;
    function u(e, t) {
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
    e.getStringOrArray = u;
    function d(e, t) {
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
    e.getObjectFromString = d;
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
        const s = r.pop();
        let a = globalThis;
        let l = true;
        for (const e of r) {
            a = a[e];
            if (!o.defined(a)) {
                l = false;
                break;
            }
        }
        if (l && o.definedFunction(a[s])) {
            t = a[s].apply(a, i);
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

var s;

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
    function i(e, t, i, s = false) {
        let a = t;
        const l = n(i);
        a = a.replace("{dddd}", e.text.dayNames[l]);
        a = a.replace("{dd}", r.padNumber(i.getDate()));
        a = a.replace("{d}", i.getDate().toString());
        if (s) {
            a = a.replace("{o}", `<sup>${o(e, i.getDate())}</sup>`);
        } else {
            a = a.replace("{o}", o(e, i.getDate()));
        }
        a = a.replace("{mmmm}", e.text.monthNames[i.getMonth()]);
        a = a.replace("{mm}", r.padNumber(i.getMonth() + 1));
        a = a.replace("{m}", (i.getMonth() + 1).toString());
        a = a.replace("{yyyy}", i.getFullYear().toString());
        a = a.replace("{yyy}", i.getFullYear().toString().substring(1));
        a = a.replace("{yy}", i.getFullYear().toString().substring(2));
        a = a.replace("{y}", parseInt(i.getFullYear().toString().substring(2)).toString());
        return a;
    }
    e.getCustomFormattedDateText = i;
    function s(e) {
        return `${e.getFullYear()}${"-"}${r.padNumber(e.getMonth() + 1)}${"-"}${r.padNumber(e.getDate())}`;
    }
    e.toStorageDate = s;
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
    e.isToday = c;
    function u(e) {
        const t = new Date;
        return e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear();
    }
    e.isCurrentMonthAndYear = u;
})(s || (s = {}));

var a;

(e => {
    function t(e) {
        const t = e.toLowerCase();
        const n = document.createElement(t);
        return n;
    }
    e.createWithNoContainer = t;
    function n(e, t, n = "", i = null) {
        const r = t.toLowerCase();
        const s = document.createElement(r);
        if (o.defined(n)) {
            s.className = n;
        }
        if (o.defined(i)) {
            e.insertBefore(s, i);
        } else {
            e.appendChild(s);
        }
        return s;
    }
    e.create = n;
    function i(e, t, o, i, r = null) {
        const s = n(e, t, o, r);
        s.innerHTML = i;
        if (t === "button") {
            const e = s;
            e.type = "button";
        }
        return s;
    }
    e.createWithHTML = i;
    function r(e, t, i, r = null, s = null) {
        const a = n(e, t, i, s);
        a.type = "button";
        if (o.defined(r)) {
            a.innerHTML = r;
        }
        return a;
    }
    e.createButton = r;
    function s(t, o, i, r, s = null) {
        const a = n(t, o, i, s);
        a.type = "button";
        e.create(a, "i", r);
        return a;
    }
    e.createIconButton = s;
    function a(e, t, n = false) {
        const o = getComputedStyle(e);
        let i = o.getPropertyValue(t);
        if (n) {
            i = parseFloat(i);
            i = isNaN(i) ? 0 : i;
        }
        return i;
    }
    e.getStyleValueByName = a;
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
    function u(e, t) {
        e.classList.remove(t);
    }
    e.removeClass = u;
    function d(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    e.cancelBubble = d;
    function w() {
        const e = document.documentElement;
        const t = {
            left: e.scrollLeft - (e.clientLeft || 0),
            top: e.scrollTop - (e.clientTop || 0)
        };
        return t;
    }
    e.getScrollPosition = w;
    function f(e, t, n = "block") {
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
    e.showElementAtMousePosition = f;
    function g(e) {
        const t = Array.from(e.children);
        t.reverse();
        t.forEach(t => e.appendChild(t));
    }
    e.reverseChildrenOrder = g;
    function h(e, t, o) {
        const r = n(e, "div");
        const s = n(r, "label", "checkbox");
        const a = n(s, "input");
        a.type = "checkbox";
        a.name = o;
        n(s, "span", "check-mark");
        i(s, "span", "text", t);
        return a;
    }
    e.createCheckBox = h;
    function m(t, n) {
        const o = e.getStyleValueByName(t, "background-color");
        const i = e.getStyleValueByName(n, "background-color");
        n.style.background = `linear-gradient(to top, ${o}, ${i})`;
    }
    e.addGradientEffect = m;
})(a || (a = {}));

var l;

(e => {
    let t = 0;
    function n(e) {
        if (!o.defined(e._currentView.tooltip)) {
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
    function i(e, t, n) {
        if (e !== null) {
            e.onmousemove = e => r(e, t, n);
        }
    }
    e.add = i;
    function r(e, n, o) {
        a.cancelBubble(e);
        s(n);
        t = setTimeout(() => {
            n._currentView.tooltip.innerHTML = o;
            a.showElementAtMousePosition(e, n._currentView.tooltip, "flex");
        }, n.tooltip.delay);
    }
    e.show = r;
    function s(e) {
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
    e.hide = s;
    function l(e) {
        if (o.defined(e._currentView.tooltip)) {
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
            window.addEventListener("mousemove", () => s(e));
            document.addEventListener("scroll", () => s(e));
        } else {
            window.removeEventListener("mousemove", () => s(e));
            document.removeEventListener("scroll", () => s(e));
        }
    }
})(l || (l = {}));

var c;

(e => {
    function t(e, ...t) {
        let n = null;
        if (o.definedFunction(e)) {
            n = e.apply(null, [].slice.call(t, 0));
        }
        return n;
    }
    e.customEvent = t;
})(c || (c = {}));

var u;

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
})(u || (u = {}));

var d;

(e => {
    let t;
    (e => {
        e.DaySize = "--heat-js-day-size";
        e.Spacing = "--heat-js-spacing";
        e.LineWidth = "--heat-js-day-line-width";
        e.CheckBoxCheckedColor = "--heat-js-checkbox-background-color-checked";
        e.YearMenuCurrent = "--heat-js-years-current-color";
    })(t = e.Variables || (e.Variables = {}));
})(d || (d = {}));

var w;

(e => {
    function t(e, t) {
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
    e.isVisible = t;
    function s(e, t, i, r = null) {
        let s = null;
        if (o.defined(r) && o.holiday(e, r).matched) {
            s = {
                cssClassName: "holiday",
                id: n.COLOR_RANGE_HOLIDAY_ID,
                visible: true,
                minimum: 0
            };
        }
        if (!o.defined(s)) {
            const e = t.length;
            for (let n = 0; n < e; n++) {
                const e = t[n];
                if (i >= e.minimum) {
                    s = e;
                } else {
                    break;
                }
            }
        }
        return s;
    }
    e.get = s;
    function l(e, t) {
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
    e.getByMinimum = l;
    function c(e) {
        return e.colorRanges.sort((e, t) => e.minimum - t.minimum);
    }
    e.getAllSorted = c;
    function w(e) {
        const t = [];
        const n = u.hexToRgbaValues(e.color);
        const o = 100 / e.totalColors;
        const i = 1 / e.totalColors;
        const s = (e.maximumMinimum - e.startMinimum) / (e.totalColors - 1);
        const l = [];
        let c = n.red;
        let w = n.green;
        let f = n.blue;
        let g = i;
        let h = n.red;
        let m = n.green;
        let p = n.blue;
        let y = e.startMinimum;
        for (let a = 0; a < e.totalColors; a++) {
            const u = a + 1;
            const v = g + i > 1 ? 1 : g + i;
            const T = `rgba(${c}, ${w}, ${f}, ${g.toFixed(2)})`;
            const b = `rgba(${c}, ${w}, ${f}, ${v.toFixed(2)})`;
            const V = `rgb(${h}, ${m}, ${p})`;
            const x = `day-color-${r.padNumber(u)}`;
            l.push(`div.${x} {`);
            l.push(`${"\t"}background-color: ${T} !important;`);
            l.push(`${"\t"}border-color: ${b} !important;`);
            l.push(`${"\t"}color: ${V} !important;`);
            l.push("}");
            l.push(`div.${x}:not(.no-hover):hover {`);
            l.push(`${"\t"}opacity: 0.7 !important;`);
            l.push("}");
            const C = {
                id: r.padNumber(u),
                name: `Day Color ${u}`,
                minimum: Math.round(y),
                cssClassName: x,
                tooltipText: `Day Color ${u}`,
                visible: true
            };
            const _ = Math.round(n.red / 100 * (u * o));
            const D = Math.round(n.green / 100 * (u * o));
            const S = Math.round(n.blue / 100 * (u * o));
            if (a === e.totalColors - 1) {
                l.push(`:root {`);
                l.push(`${"\t"}${d.Variables.CheckBoxCheckedColor}: ${T};`);
                l.push(`${"\t"}${d.Variables.YearMenuCurrent}: ${T};`);
                l.push("}");
            } else {
                c = n.red + _;
                w = n.green + D;
                f = n.blue + S;
                g += i;
                h = n.red - _;
                m = n.green - D;
                p = n.blue - S;
                y += s;
                if (y > e.maximumMinimum) {
                    y = e.maximumMinimum;
                }
            }
            t.push(C);
        }
        const v = document.getElementsByTagName("head")[0];
        const T = a.create(v, "style");
        T.appendChild(document.createTextNode(l.join("\n")));
        return t;
    }
    e.buildDynamics = w;
    function f(e, t) {
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
    e.getGuideCssClassName = f;
})(w || (w = {}));

var f;

(e => {
    let t;
    (e => {
        const t = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
        const n = [ 1, 2, 3, 4, 5, 6, 7 ];
        function s(e, t, n) {
            const i = a(t);
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
            _(i);
            return i;
        }
        e.getForNewInstance = s;
        function a(e) {
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
            t.title = l(t);
            t.yearlyStatistics = c(t);
            t.views.map = u(t);
            t.views.line = d(t);
            t.views.chart = f(t);
            t.views.days = g(t);
            t.views.months = h(t);
            t.views.colorRanges = m(t);
            t.description = p(t);
            t.guide = y(t);
            t.tooltip = v(t);
            t.zooming = T(t);
            t.dynamicColorRange = b(t);
            t.colorRanges = V(t);
            t.holidays = x(t);
            t.events = C(t);
            if (t.startMonth > 0) {
                t.yearsToHide = [];
            }
            return t;
        }
        e.get = a;
        function l(e) {
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
            e.title.showTitleDropDownMenu = i.getBoolean(e.title.showTitleDropDownMenu, true);
            e.title.showClearButton = i.getBoolean(e.title.showClearButton, false);
            return e.title;
        }
        function c(e) {
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
        function u(e) {
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
        function d(e) {
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
        function f(e) {
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
        function g(e) {
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
            if (o.invalidOptionArray(e.views.days.monthsToShow)) {
                e.views.days.monthsToShow = t;
            }
            if (o.invalidOptionArray(e.views.days.daysToShow)) {
                e.views.days.daysToShow = n;
            }
            return e.views.days;
        }
        function h(e) {
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
            if (o.invalidOptionArray(e.views.months.monthsToShow)) {
                e.views.months.monthsToShow = t;
            }
            if (o.invalidOptionArray(e.views.months.daysToShow)) {
                e.views.months.daysToShow = n;
            }
            return e.views.months;
        }
        function m(e) {
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
        function p(e) {
            e.description = i.getObject(e.description, {});
            e.description.text = i.getString(e.description.text, "");
            e.description.url = i.getString(e.description.url, "");
            e.description.urlTarget = i.getString(e.description.urlTarget, "_blank");
            return e.description;
        }
        function y(e) {
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
        function v(e) {
            e.tooltip = i.getObject(e.tooltip, {});
            e.tooltip.delay = i.getNumber(e.tooltip.delay, 750);
            return e.tooltip;
        }
        function T(e) {
            e.zooming = i.getObject(e.zooming, {});
            e.zooming.enabled = i.getBoolean(e.zooming.enabled, false);
            e.zooming.defaultLevel = i.getNumber(e.zooming.defaultLevel, 0);
            e.zooming.maximumLevel = i.getNumber(e.zooming.maximumLevel, 0);
            e.zooming.showCloseButton = i.getBoolean(e.zooming.showCloseButton, true);
            return e.zooming;
        }
        function b(e) {
            e.dynamicColorRange = i.getObject(e.dynamicColorRange, {});
            e.dynamicColorRange.enabled = i.getBoolean(e.dynamicColorRange.enabled, false);
            e.dynamicColorRange.maximumMinimum = i.getNumber(e.dynamicColorRange.maximumMinimum, 25);
            e.dynamicColorRange.color = i.getString(e.dynamicColorRange.color, "");
            e.dynamicColorRange.totalColors = i.getNumber(e.dynamicColorRange.totalColors, 7);
            e.dynamicColorRange.startMinimum = i.getNumber(e.dynamicColorRange.startMinimum, 10);
            return e.dynamicColorRange;
        }
        function V(e) {
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
        function C(e) {
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
            e.events.onChartDayToolTipRender = i.getFunction(e.events.onChartDayToolTipRender, e.events.onMapDayToolTipRender);
            e.events.onLineDayToolTipRender = i.getFunction(e.events.onLineDayToolTipRender, e.events.onMapDayToolTipRender);
            e.events.onAdd = i.getFunction(e.events.onAdd, null);
            e.events.onRemove = i.getFunction(e.events.onRemove, null);
            e.events.onReset = i.getFunction(e.events.onReset, null);
            e.events.onViewSwitch = i.getFunction(e.events.onViewSwitch, null);
            e.events.onColorRangeTypeToggle = i.getFunction(e.events.onColorRangeTypeToggle, null);
            e.events.onImport = i.getFunction(e.events.onImport, null);
            e.events.onDataFetch = i.getFunction(e.events.onDataFetch, null);
            e.events.onClear = i.getFunction(e.events.onClear, null);
            e.events.onUpdate = i.getFunction(e.events.onUpdate, null);
            e.events.onOptionsUpdate = i.getFunction(e.events.onOptionsUpdate, null);
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
        function _(e) {
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
})(f || (f = {}));

var g;

(e => {
    let t;
    (e => {
        function t(e = null) {
            const t = i.getObject(e, {});
            t.safeMode = i.getBoolean(t.safeMode, true);
            t.observationMode = i.getBoolean(t.observationMode, true);
            t.domElementTypes = i.getStringOrArray(t.domElementTypes, [ "*" ]);
            t.text = n(t);
            t.text = r(t.text);
            return t;
        }
        e.get = t;
        function n(e) {
            e.text = i.getObject(e.text, {});
            e.text.stText = i.getAnyString(e.text.stText, "st");
            e.text.ndText = i.getAnyString(e.text.ndText, "nd");
            e.text.rdText = i.getAnyString(e.text.rdText, "rd");
            e.text.thText = i.getAnyString(e.text.thText, "th");
            e.text.backButtonText = i.getAnyString(e.text.backButtonText, "Back");
            e.text.nextButtonText = i.getAnyString(e.text.nextButtonText, "Next");
            e.text.refreshButtonText = i.getAnyString(e.text.refreshButtonText, "Refresh");
            e.text.exportButtonText = i.getAnyString(e.text.exportButtonText, "Export");
            e.text.lessText = i.getAnyString(e.text.lessText, "Less");
            e.text.moreText = i.getAnyString(e.text.moreText, "More");
            e.text.dateText = i.getAnyString(e.text.dateText, "Date");
            e.text.countText = i.getAnyString(e.text.countText, "Count");
            e.text.mapText = i.getAnyString(e.text.mapText, "Map");
            e.text.chartText = i.getAnyString(e.text.chartText, "Chart");
            e.text.noChartDataMessage = i.getAnyString(e.text.noChartDataMessage, "There is currently no data to view.");
            e.text.statisticsText = i.getAnyString(e.text.statisticsText, "Statistics");
            e.text.noColorRangesDataMessage = i.getAnyString(e.text.noColorRangesDataMessage, "There are currently no color ranges to view.");
            e.text.unknownTrendText = i.getAnyString(e.text.unknownTrendText, "Unknown");
            e.text.importButtonText = i.getAnyString(e.text.importButtonText, "Import");
            e.text.noMapDataMessage = i.getAnyString(e.text.noMapDataMessage, "There is currently no data to view.");
            e.text.objectErrorText = i.getAnyString(e.text.objectErrorText, "Errors in object: {{error_1}}, {{error_2}}");
            e.text.attributeNotValidErrorText = i.getAnyString(e.text.attributeNotValidErrorText, "The attribute '{{attribute_name}}' is not a valid object.");
            e.text.attributeNotSetErrorText = i.getAnyString(e.text.attributeNotSetErrorText, "The attribute '{{attribute_name}}' has not been set correctly.");
            e.text.closeButtonText = i.getAnyString(e.text.closeButtonText, "Close");
            e.text.configurationButtonText = i.getAnyString(e.text.configurationButtonText, "Configuration");
            e.text.configurationTitleText = i.getAnyString(e.text.configurationTitleText, "Configuration");
            e.text.visibleMonthsText = i.getAnyString(e.text.visibleMonthsText, "Visible Months");
            e.text.visibleDaysText = i.getAnyString(e.text.visibleDaysText, "Visible Days");
            e.text.dataText = i.getAnyString(e.text.dataText, "Data");
            e.text.colorRangesText = i.getAnyString(e.text.colorRangesText, "Color Ranges");
            e.text.yearText = i.getAnyString(e.text.yearText, "Year");
            e.text.daysText = i.getAnyString(e.text.daysText, "Days");
            e.text.noDaysDataMessage = i.getAnyString(e.text.noDaysDataMessage, "There are currently no days to view.");
            e.text.currentYearText = i.getAnyString(e.text.currentYearText, "Current Year");
            e.text.todayText = i.getAnyString(e.text.todayText, "Today");
            e.text.thisWeekText = i.getAnyString(e.text.thisWeekText, "This Week");
            e.text.thisMonthText = i.getAnyString(e.text.thisMonthText, "This Month");
            e.text.thisYearText = i.getAnyString(e.text.thisYearText, "This Year");
            e.text.unavailableText = i.getAnyString(e.text.unavailableText, "Unavailable");
            e.text.monthsText = i.getAnyString(e.text.monthsText, "Months");
            e.text.noMonthsDataMessage = i.getAnyString(e.text.noMonthsDataMessage, "There are currently no months to view.");
            e.text.selectTypeText = i.getAnyString(e.text.selectTypeText, "Select Type");
            e.text.filenamePlaceholderText = i.getAnyString(e.text.filenamePlaceholderText, "Filename (optional)");
            e.text.onlyDataBeingViewedText = i.getAnyString(e.text.onlyDataBeingViewedText, "Only data being viewed");
            e.text.zoomInText = i.getAnyString(e.text.zoomInText, "Zoom In");
            e.text.zoomOutText = i.getAnyString(e.text.zoomOutText, "Zoom Out");
            e.text.clearButtonText = i.getAnyString(e.text.clearButtonText, "Clear");
            e.text.selectFilesText = i.getAnyString(e.text.selectFilesText, "Select File(s)");
            e.text.dragAndDropFilesText = i.getAnyString(e.text.dragAndDropFilesText, "Drag and drop your file(s) here ...");
            e.text.addTypeText = i.getAnyString(e.text.addTypeText, "Add Type");
            e.text.typePlaceholderText = i.getAnyString(e.text.typePlaceholderText, "Type");
            e.text.addButtonText = i.getAnyString(e.text.addButtonText, "Add");
            e.text.removeButtonText = i.getAnyString(e.text.removeButtonText, "Remove");
            e.text.invertText = i.getAnyString(e.text.invertText, "Invert");
            e.text.lineText = i.getAnyString(e.text.lineText, "Line");
            e.text.noLineDataMessage = i.getAnyString(e.text.noLineDataMessage, "There is currently no data to view.");
            e.text.removeTypeText = i.getAnyString(e.text.removeTypeText, "Remove Type");
            e.text.openNewTypeText = i.getAnyString(e.text.openNewTypeText, "Open new type");
            e.text.clearExistingDataText = i.getAnyString(e.text.clearExistingDataText, "Clear existing data");
            e.text.browseButtonText = i.getAnyString(e.text.browseButtonText, "Browse");
            e.text.saveButtonText = i.getAnyString(e.text.saveButtonText, "Save");
            e.text.resetButtonText = i.getAnyString(e.text.resetButtonText, "Reset");
            e.text.copyButtonText = i.getAnyString(e.text.copyButtonText, "Copy");
            return e.text;
        }
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
})(g || (g = {}));

var h;

(e => {
    let t;
    (e => {
        function t(e) {
            if (!o.definedParentElement(e._currentView.disabledBackground)) {
                e._currentView.disabledBackground = a.create(e._currentView.element, "div", "disabled");
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
        function i(e) {
            let t = "";
            if (e._currentView.activeView === 1) {
                t = "map";
            } else if (e._currentView.activeView === 2) {
                t = "line";
            } else if (e._currentView.activeView === 3) {
                t = "chart";
            } else if (e._currentView.activeView === 4) {
                t = "days";
            } else if (e._currentView.activeView === 5) {
                t = "months";
            } else if (e._currentView.activeView === 6) {
                t = "color-ranges";
            }
            return t;
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
        function s(e) {
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
        e.set = s;
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
            s(e, o);
        } else if (t === "tsv") {
            a(e, o);
        } else if (t === "md") {
            l(e, o);
        } else if (t === "yaml") {
            c(e, o);
        } else if (t === "toml") {
            u(e, o);
        }
    }
    e.file = t;
    function n(e, t, n) {
        const r = new FileReader;
        let s = {};
        r.onloadend = () => t(e.name, s);
        r.onload = e => {
            const t = i.getObjectFromString(e.target.result, n);
            if (t.parsed && o.definedObject(t.object)) {
                s = t.object;
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
    function s(e, t) {
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
    function a(e, t) {
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
    function u(e, t) {
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
        e.mimeType = t;
        function n(e, t, n, i) {
            let s = null;
            if (o.definedString(n)) {
                s = `${n}.${i.toLowerCase()}`;
            } else {
                const n = new Date;
                const o = `${r.padNumber(n.getDate())}${"-"}${r.padNumber(n.getMonth() + 1)}${"-"}${n.getFullYear()}`;
                const a = `${r.padNumber(n.getHours())}${"-"}${r.padNumber(n.getMinutes())}`;
                let l = "";
                if (t._currentView.activeType !== e.text.unknownTrendText) {
                    l = `${t._currentView.activeType.toLowerCase().replace(/ /g, "_")}${"_"}`;
                }
                s = `${l}${o}${"_"}${a}.${i.toLowerCase()}`;
            }
            return s;
        }
        e.filename = n;
    })(t = e.File || (e.File = {}));
    let n;
    (e => {
        function t(e, t, s, w) {
            let f = null;
            if (e === "csv") {
                f = n(t, s);
            } else if (e === "json") {
                f = o(t);
            } else if (e === "xml") {
                f = i(t, s, w);
            } else if (e === "txt") {
                f = r(t, s, w);
            } else if (e === "html") {
                f = a(t, s, w);
            } else if (e === "md") {
                f = l(t);
            } else if (e === "tsv") {
                f = c(t);
            } else if (e === "yaml") {
                f = u(t, s, w);
            } else if (e === "toml") {
                f = d(t, s, w);
            }
            return f;
        }
        e.get = t;
        function n(e, t) {
            const n = [];
            for (const t in e) {
                if (Object.prototype.hasOwnProperty.call(e, t)) {
                    n.push(f([ w(t), w(e[t].toString()) ]));
                }
            }
            if (n.length > 0) {
                n.unshift(f([ w(t.text.dateText), w(t.text.countText) ]));
            }
            return n.join("\n");
        }
        function o(e) {
            return JSON.stringify(e, null, 2);
        }
        function i(e, t, n) {
            const o = s.getCustomFormattedDateText(t, n.exportDateTimeFormat, new Date);
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
            const o = s.getCustomFormattedDateText(t, n.exportDateTimeFormat, new Date);
            const i = [];
            i.push(`Last-Modified${":"}${" "}${o}`);
            for (const t in e) {
                if (Object.prototype.hasOwnProperty.call(e, t)) {
                    i.push(`${t}${":"}${" "}${e[t].toString()}`);
                }
            }
            return i.join("\n");
        }
        function a(e, t, n) {
            const o = [];
            const i = s.getCustomFormattedDateText(t, n.exportDateTimeFormat, new Date);
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
        function u(e, t, n) {
            const o = [];
            const i = s.getCustomFormattedDateText(t, n.exportDateTimeFormat, new Date);
            o.push(`Last-Modified:${" "}${i}`);
            for (const t in e) {
                if (Object.prototype.hasOwnProperty.call(e, t)) {
                    o.push(`${t}${":"}${" "}${e[t].toString()}`);
                }
            }
            return o.join("\n");
        }
        function d(e, t, n) {
            const o = [];
            const i = s.getCustomFormattedDateText(t, n.exportDateTimeFormat, new Date);
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
        function f(e) {
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
            const s = window.localStorage.length;
            const a = t._currentView.element.id;
            for (let t = 0; t < s; t++) {
                const s = window.localStorage.key(t);
                if (r.startsWithAnyCase(s, `${n.LOCAL_STORAGE_START_ID}${a}`)) {
                    const t = window.localStorage.getItem(s);
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
            s(e);
            window.localStorage.setItem(`${n.LOCAL_STORAGE_START_ID}${o}`, i);
        }
    }
    e.store = o;
    function s(e) {
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
            const s = o.length;
            for (let e = 0; e < s; e++) {
                window.localStorage.removeItem(o[e]);
            }
        }
    }
    e.clear = s;
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
        e.bind = n;
        function o() {
            document.removeEventListener("keydown", i);
        }
        e.unbind = o;
        function i(e) {
            if (e.key === "Escape") {
                t();
            }
        }
    })(t = e.Dialog || (e.Dialog = {}));
})(V || (V = {}));

(() => {
    let x = {};
    let C = null;
    let _ = {};
    function D() {
        const e = x.domElementTypes;
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
                const s = i.getObjectFromString(r, x);
                if (s.parsed && o.definedObject(s.object)) {
                    M(f.Options.getForNewInstance(x, s.object, e));
                } else {
                    if (!x.safeMode) {
                        console.error(x.text.attributeNotValidErrorText.replace("{{attribute_name}}", n.Attribute.HEAT_JS));
                        t = false;
                    }
                }
            } else {
                if (!x.safeMode) {
                    console.error(x.text.attributeNotSetErrorText.replace("{{attribute_name}}", n.Attribute.HEAT_JS));
                    t = false;
                }
            }
        }
        return t;
    }
    function M(e) {
        c.customEvent(e.events.onBeforeRender, e._currentView.element);
        if (!o.definedString(e._currentView.element.id)) {
            e._currentView.element.id = crypto.randomUUID();
        }
        a.addClass(e._currentView.element, "heat-js");
        if (e.resizable) {
            a.addClass(e._currentView.element, "resizable");
        }
        e._currentView.element.removeAttribute(n.Attribute.HEAT_JS);
        Ye(e._currentView.element.id, e);
        O(e);
        B(e);
        Ae(e);
        c.customEvent(e.events.onRenderComplete, e._currentView.element);
    }
    function O(e, t = false, n = false, o = false) {
        l.hide(e);
        if (t) {
            T.store(e, _[e._currentView.element.id]);
        }
        e._currentView.yearsAvailable = Pe(e);
        m.View.getScrollPositions(e);
        l.render(e);
        Ze(e);
        $e(e);
        te(e);
        le(e);
        if (e.views.map.enabled && e._currentView.activeView === 1) {
            de(e, n, o);
        }
        if (e.views.line.enabled && e._currentView.activeView === 2) {
            me(e, n, o);
        }
        if (e.views.chart.enabled && e._currentView.activeView === 3) {
            ye(e, n, o);
        }
        if (e.views.days.enabled && e._currentView.activeView === 4) {
            Te(e, n);
        }
        if (e.views.months.enabled && e._currentView.activeView === 5) {
            xe(e, n);
        }
        if (e.views.colorRanges.enabled && e._currentView.activeView === 6) {
            De(e, n);
        }
        Oe(e);
        m.View.set(e);
    }
    function B(e, t = true) {
        const n = t ? window.addEventListener : window.removeEventListener;
        n("blur", () => l.hide(e));
    }
    function N(e) {
        h.Background.render(e);
        if (!o.definedParentElement(e._currentView.configurationDialog)) {
            e._currentView.configurationDialog = a.create(e._currentView.disabledBackground, "div", "dialog configuration");
            const t = a.create(e._currentView.configurationDialog, "div", "dialog-title-bar");
            const n = a.create(e._currentView.configurationDialog, "div", "dialog-contents");
            const o = a.create(t, "div", "dialog-close");
            const i = a.create(n, "div", "side-containers");
            const r = a.create(i, "div", "side-container panel");
            const s = a.create(i, "div", "side-container panel");
            a.createWithHTML(t, "span", "dialog-title-bar-text", x.text.configurationTitleText);
            a.createWithHTML(r, "div", "side-container-title-text", `${x.text.visibleDaysText}${":"}`);
            a.createWithHTML(s, "div", "side-container-title-text", `${x.text.visibleMonthsText}${":"}`);
            const c = a.create(s, "div", "side-container");
            const u = a.create(s, "div", "side-container");
            const d = a.create(n, "div", "buttons");
            const w = a.createButton(d, "button", "", x.text.resetButtonText);
            const f = a.createButton(d, "button", "default", x.text.saveButtonText);
            o.onclick = () => L(e);
            w.onclick = () => R(e);
            f.onclick = () => A(e);
            for (let t = 0; t < 7; t++) {
                e._currentView.configurationDialogDayCheckBoxes[t] = a.createCheckBox(r, x.text.dayNames[t], t.toString());
            }
            let g = c;
            let h = 0;
            for (let t = e.startMonth; t < 12 + e.startMonth; t++) {
                let n = t;
                if (e.startMonth > 0 && t > 11) {
                    n = t - 12;
                }
                e._currentView.configurationDialogMonthCheckBoxes[n] = a.createCheckBox(g, x.text.monthNames[n], n.toString());
                h++;
                if (h > 6) {
                    g = u;
                }
            }
            l.add(o, e, x.text.closeButtonText);
        }
    }
    function k(e) {
        N(e);
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
        l.hide(e);
        V.Dialog.bind(() => L(e));
    }
    function L(e) {
        h.Background.hide(e);
        if (o.defined(e._currentView.configurationDialog) && e._currentView.configurationDialog.style.display !== "none") {
            e._currentView.configurationDialog.style.display = "none";
        }
        l.hide(e);
        V.Dialog.unbind();
    }
    function A(e) {
        h.Background.hide(e);
        if (o.defined(e._currentView.configurationDialog) && e._currentView.configurationDialog.style.display !== "none") {
            e._currentView.configurationDialog.style.display = "none";
        }
        const t = m.Days.get(e);
        const n = m.Months.get(e);
        const i = [];
        const r = [];
        let s = false;
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
            s = true;
        }
        if (r.length >= 1 && JSON.stringify(r) !== JSON.stringify(n)) {
            m.Months.set(e, r);
            s = true;
        }
        if (s) {
            O(e);
            c.customEvent(e.events.onOptionsUpdate, e._currentView.element, e);
        } else {
            l.hide(e);
        }
    }
    function R(e) {
        for (let t = 0; t < 7; t++) {
            e._currentView.configurationDialogDayCheckBoxes[t].checked = true;
        }
        for (let t = 0; t < 12; t++) {
            e._currentView.configurationDialogMonthCheckBoxes[t].checked = true;
        }
    }
    function I(e) {
        h.Background.render(e);
        if (!o.definedParentElement(e._currentView.exportDialog)) {
            e._currentView.exportDialog = a.create(e._currentView.disabledBackground, "div", "dialog export");
            const t = a.create(e._currentView.exportDialog, "div", "dialog-title-bar");
            const n = a.create(e._currentView.exportDialog, "div", "dialog-contents");
            const o = a.create(t, "div", "dialog-close");
            a.createWithHTML(t, "span", "dialog-title-bar-text", x.text.selectTypeText);
            e._currentView.exportDialogExportTypeSelect = a.create(n, "select", "input-box");
            e._currentView.exportDialogExportTypeSelect.name = crypto.randomUUID();
            e._currentView.exportDialogExportFilenameInput = a.create(n, "input", "input-box filename");
            e._currentView.exportDialogExportFilenameInput.name = crypto.randomUUID();
            e._currentView.exportDialogExportFilenameInput.placeholder = x.text.filenamePlaceholderText;
            e._currentView.exportDialogExportOnlyDataBeingViewedCheckBox = a.createCheckBox(n, x.text.onlyDataBeingViewedText, crypto.randomUUID());
            e._currentView.exportDialogExportOnlyDataBeingViewedCheckBox.checked = e.exportOnlyDataBeingViewed;
            const i = a.create(n, "div", "buttons");
            const r = a.createButton(i, "button", "", x.text.copyButtonText);
            const s = a.createButton(i, "button", "default", x.text.exportButtonText);
            E(e);
            e._currentView.exportDialogExportFilenameInput.onkeydown = t => {
                if (t.key === "Enter") {
                    H(e);
                }
            };
            o.onclick = () => $(e);
            r.onclick = () => H(e, true);
            s.onclick = () => H(e);
            l.add(o, e, x.text.closeButtonText);
        }
    }
    function E(e) {
        let n;
        const o = [];
        for (n in t) {
            const i = a.createWithNoContainer("option");
            i.value = t[n];
            i.textContent = n.toString().toUpperCase();
            i.selected = n === e.exportType;
            o.push(i);
        }
        o.sort((e, t) => e.text.toLowerCase().localeCompare(t.text.toLowerCase()));
        o.forEach(t => e._currentView.exportDialogExportTypeSelect.add(t));
    }
    function F(e) {
        I(e);
        h.Background.show(e);
        if (o.defined(e._currentView.exportDialog) && e._currentView.exportDialog.style.display !== "block") {
            e._currentView.exportDialogExportFilenameInput.value = "";
            e._currentView.exportDialog.style.display = "block";
            e._currentView.exportDialogExportFilenameInput.focus();
        }
        l.hide(e);
        V.Dialog.bind(() => $(e));
    }
    function $(e) {
        h.Background.hide(e);
        if (o.defined(e._currentView.exportDialog) && e._currentView.exportDialog.style.display !== "none") {
            e._currentView.exportDialog.style.display = "none";
        }
        l.hide(e);
        V.Dialog.unbind();
    }
    function H(e, t = false) {
        const n = e._currentView.exportDialogExportTypeSelect.value;
        const o = e._currentView.exportDialogExportFilenameInput.value;
        const i = e._currentView.exportDialogExportOnlyDataBeingViewedCheckBox.checked;
        $(e);
        Y(e, n, o, i, t);
    }
    function Y(e, t = null, n = null, r = true, s = false) {
        const l = i.getString(t, e.exportType).toLowerCase();
        const u = j(e, r);
        const d = y.Contents.get(l, u, x, e);
        if (o.definedString(d)) {
            if (s) {
                navigator.clipboard.writeText(d);
            } else {
                const t = y.File.mimeType(l);
                const o = a.create(document.body, "a");
                o.style.display = "none";
                o.setAttribute("target", "_blank");
                o.setAttribute("href", `data:${t};charset=utf-8,${encodeURIComponent(d)}`);
                o.setAttribute("download", y.File.filename(x, e, n, l));
                o.click();
                document.body.removeChild(o);
            }
            c.customEvent(e.events.onExport, e._currentView.element);
        }
    }
    function j(e, t) {
        const n = {};
        const i = je(e);
        if (t) {
            const t = e._currentView.activeYear;
            const r = m.Days.get(e);
            const a = m.Months.get(e);
            for (let l = e.startMonth; l < 12 + e.startMonth; l++) {
                let c = l;
                let u = t;
                if (e.startMonth > 0 && l > 11) {
                    c = l - 12;
                    u++;
                }
                if (o.monthVisible(a, c)) {
                    const e = s.getTotalDaysInMonth(u, c);
                    for (let t = 0; t < e; t++) {
                        const e = new Date(u, c, t + 1);
                        const a = s.toStorageDate(e);
                        const l = s.getWeekdayNumber(e) + 1;
                        if (o.dayVisible(r, l)) {
                            if (Object.prototype.hasOwnProperty.call(i, a)) {
                                n[a] = i[a];
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
    function W(e) {
        h.Background.render(e);
        if (!o.definedParentElement(e._currentView.importDialog)) {
            e._currentView.importDialog = a.create(e._currentView.disabledBackground, "div", "dialog import");
            const t = a.create(e._currentView.importDialog, "div", "dialog-title-bar");
            const n = a.create(e._currentView.importDialog, "div", "dialog-contents");
            const o = a.create(t, "div", "dialog-close");
            a.createWithHTML(t, "span", "dialog-title-bar-text", x.text.selectFilesText);
            e._currentView.importDialogDragAndDrop = a.createWithHTML(n, "div", "drag-and-drop-files", x.text.dragAndDropFilesText);
            e._currentView.importDialogClearExistingData = a.createCheckBox(n, x.text.clearExistingDataText, crypto.randomUUID());
            U(e._currentView.importDialogDragAndDrop, e);
            const i = a.create(n, "div", "buttons");
            const r = a.createButton(i, "button", "", x.text.browseButtonText);
            e._currentView.importDialogImportButton = a.createButton(i, "button", "default", x.text.importButtonText);
            e._currentView.importDialogImportButton.disabled = true;
            o.onclick = () => z(e);
            r.onclick = () => J(e);
            e._currentView.importDialogImportButton.onclick = () => X(e._currentView.importDialogFileList, e, e._currentView.importDialogClearExistingData.checked);
            l.add(o, e, x.text.closeButtonText);
        }
    }
    function P(e) {
        W(e);
        h.Background.show(e);
        if (o.defined(e._currentView.importDialog) && e._currentView.importDialog.style.display !== "block") {
            e._currentView.importDialog.style.display = "block";
        }
        l.hide(e);
        V.Dialog.bind(() => z(e));
    }
    function z(e) {
        h.Background.hide(e);
        if (o.defined(e._currentView.importDialog) && e._currentView.importDialog.style.display !== "none") {
            e._currentView.importDialogDragAndDrop.innerHTML = x.text.dragAndDropFilesText;
            e._currentView.importDialogFileList = null;
            e._currentView.importDialogImportButton.disabled = true;
            e._currentView.importDialog.style.display = "none";
        }
        l.hide(e);
        V.Dialog.unbind();
    }
    function U(e, t) {
        if (t.allowFileImports && !t._currentView.isInFetchMode) {
            e.ondragover = a.cancelBubble;
            e.ondragenter = a.cancelBubble;
            e.ondragleave = a.cancelBubble;
            e.ondrop = e => {
                a.cancelBubble(e);
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
                    G(t, n.files);
                }
            };
        }
    }
    function J(t) {
        const n = [];
        let o;
        for (o in e) {
            n.push(`.${o}`);
        }
        const i = a.createWithNoContainer("input");
        i.type = "file";
        i.accept = n.join(", ");
        i.multiple = t.allowMultipleFileImports;
        i.onchange = () => G(t, i.files);
        i.click();
    }
    function G(e, t) {
        if (t.length <= 0) {
            e._currentView.importDialogDragAndDrop.innerHTML = x.text.dragAndDropFilesText;
            e._currentView.importDialogImportButton.disabled = true;
        } else {
            e._currentView.importDialogFileList = t;
            e._currentView.importDialogDragAndDrop.innerHTML = "";
            e._currentView.importDialogImportButton.disabled = false;
            const o = Math.min(t.length, n.MAXIMUM_FILE_IMPORTS);
            for (let n = 0; n < o; n++) {
                const o = t[n].name;
                const i = a.createWithHTML(e._currentView.importDialogDragAndDrop, "div", "filename", `<b>${n + 1}</b>. ${o}`);
                const r = a.create(i, "div", "remove");
                l.add(r, e, x.text.removeButtonText);
                r.onclick = () => Z(e, n);
            }
        }
    }
    function Z(e, t) {
        const n = new DataTransfer;
        const o = e._currentView.importDialogFileList.length;
        for (let i = 0; i < o; i++) {
            if (i !== t) {
                n.items.add(e._currentView.importDialogFileList[i]);
            }
        }
        G(e, n.files);
    }
    function X(e, t, o = false) {
        const i = Math.min(e.length, n.MAXIMUM_FILE_IMPORTS);
        const r = [];
        const s = je(t);
        if (o) {
            for (const e in s) {
                delete s[e];
            }
        }
        const a = (e, n) => {
            r.push(e);
            for (const e in n) {
                if (Object.prototype.hasOwnProperty.call(n, e)) {
                    if (!Object.prototype.hasOwnProperty.call(s, e)) {
                        s[e] = 0;
                    }
                    s[e] += n[e];
                }
            }
            if (r.length === i) {
                c.customEvent(t.events.onImport, t._currentView.element);
                O(t, true);
            }
        };
        for (let t = 0; t < i; t++) {
            const n = e[t];
            const o = n.name.split(".").pop().toLowerCase();
            p.file(n, o, a, x);
        }
    }
    function q(e) {
        h.Background.render(e);
        if (!o.definedParentElement(e._currentView.typeAddingDialog)) {
            e._currentView.typeAddingDialog = a.create(e._currentView.disabledBackground, "div", "dialog add-type");
            const t = a.create(e._currentView.typeAddingDialog, "div", "dialog-title-bar");
            const n = a.create(e._currentView.typeAddingDialog, "div", "dialog-contents");
            const o = a.create(t, "div", "dialog-close");
            a.createWithHTML(t, "span", "dialog-title-bar-text", x.text.addTypeText);
            e._currentView.typeAddingDialogTypeInput = a.create(n, "input", "input-box type");
            e._currentView.typeAddingDialogTypeInput.name = crypto.randomUUID();
            e._currentView.typeAddingDialogTypeInput.placeholder = x.text.typePlaceholderText;
            e._currentView.typeAddingOptionNewType = a.createCheckBox(n, x.text.openNewTypeText, crypto.randomUUID());
            e._currentView.typeAddingOptionNewType.checked = true;
            const i = a.create(n, "div", "buttons");
            const r = a.createButton(i, "button", "default", x.text.addButtonText);
            e._currentView.typeAddingDialogTypeInput.onkeydown = t => {
                if (t.key === "Enter") {
                    ee(e);
                }
            };
            o.onclick = () => Q(e);
            r.onclick = () => ee(e);
            l.add(o, e, x.text.closeButtonText);
        }
    }
    function K(e) {
        q(e);
        h.Background.show(e);
        if (o.defined(e._currentView.typeAddingDialog) && e._currentView.typeAddingDialog.style.display !== "block") {
            e._currentView.typeAddingDialogTypeInput.value = "";
            e._currentView.typeAddingDialog.style.display = "block";
            e._currentView.typeAddingDialogTypeInput.focus();
        }
        l.hide(e);
        V.Dialog.bind(() => Q(e));
    }
    function Q(e) {
        h.Background.hide(e);
        if (o.defined(e._currentView.typeAddingDialog) && e._currentView.typeAddingDialog.style.display !== "none") {
            e._currentView.typeAddingDialog.style.display = "none";
        }
        l.hide(e);
        V.Dialog.unbind();
    }
    function ee(e) {
        const t = e._currentView.typeAddingDialogTypeInput.value.trim();
        const n = e._currentView.element.id;
        if (o.definedString(t) && !Object.prototype.hasOwnProperty.call(_[n].typeData, t)) {
            if (!Object.prototype.hasOwnProperty.call(_[n].typeData, t)) {
                _[n].typeData[t] = {};
                _[n].totalTypes++;
            }
            if (e._currentView.typeAddingOptionNewType.checked) {
                e._currentView.activeType = t;
                c.customEvent(e.events.onTypeSwitch, e._currentView.element, t);
            }
            c.customEvent(e.events.onAddType, e._currentView.element, t);
            Q(e);
            O(e, true);
        } else {
            Q(e);
        }
    }
    function te(e) {
        if (e.title.showText || e.title.showYearSelector || e.title.showRefreshButton || e.title.showExportButton || e.title.showImportButton || e.title.showClearButton) {
            const t = a.create(e._currentView.element, "div", "title-bar");
            const n = a.create(t, "div", "title");
            const i = e.title.showTitleDropDownMenu && e._currentView.viewsEnabled > 1;
            if (i) {
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
            if (i) {
                oe(e, n);
            }
            if (e.title.showImportButton && !e._currentView.isInFetchMode) {
                const n = a.createIconButton(t, "button", "import", "arrow-up");
                n.onclick = () => P(e);
                if (e.title.showToolTips) {
                    l.add(n, e, x.text.importButtonText);
                }
            }
            if (e.title.showExportButton && We(e)) {
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
                    O(e);
                    c.customEvent(e.events.onRefresh, e._currentView.element);
                };
            }
            if (e.title.showClearButton && Je(e) > 0) {
                const n = a.createIconButton(t, "button", "clear", "close");
                if (e.title.showToolTips) {
                    l.add(n, e, x.text.clearButtonText);
                }
                n.onclick = () => {
                    ze(e);
                    O(e, true);
                };
            }
            if (e.title.showYearSelector) {
                const n = a.createIconButton(t, "button", "back", "arrow-line-left");
                n.disabled = o.firstVisibleYear(e, e._currentView.activeYear);
                n.onclick = () => ot(e);
                if (e.title.showToolTips) {
                    l.add(n, e, x.text.backButtonText);
                }
                ne(e, t);
                if (e.title.showYearSelectionDropDown) {
                    se(e);
                } else {
                    a.addClass(e._currentView.yearText, "no-click");
                }
                if (e.title.showConfigurationButton) {
                    const n = a.create(t, "div", "configure");
                    n.onclick = () => k(e);
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
                        e._currentView.activeYear = (new Date).getFullYear() - 1;
                        it(e, false);
                        c.customEvent(e.events.onSetYear, e._currentView.element, e._currentView.activeYear);
                    };
                }
                const i = a.createIconButton(t, "button", "next", "arrow-line-right");
                i.disabled = o.lastVisibleYear(e, e._currentView.activeYear);
                i.onclick = () => it(e);
                if (e.title.showToolTips) {
                    l.add(i, e, x.text.nextButtonText);
                }
            }
        }
    }
    function ne(e, t) {
        let n = e._currentView.activeYear.toString();
        if (e.startMonth > 0) {
            n += ` / ${e._currentView.activeYear + 1}`;
        }
        e._currentView.yearText = a.createWithHTML(t, "div", "year-text", n);
        if (e._currentView.yearTextWidth === 0) {
            e._currentView.yearTextWidth = Math.ceil(e._currentView.yearText.offsetWidth + 20);
        }
        e._currentView.yearText.style.width = `${e._currentView.yearTextWidth}px`;
    }
    function oe(e, t) {
        const n = a.create(t, "div", "titles-menu-container");
        const i = a.create(n, "div", "titles-menu");
        if (e.title.showTitleDropDownHeaders) {
            a.createWithHTML(i, "div", "title-menu-header", `${x.text.dataText}${":"}`);
        }
        if (e.views.map.enabled) {
            const t = ie(e, i, x.text.mapText);
            re(e, t, 1, "map");
        }
        if (e.views.line.enabled) {
            const t = ie(e, i, x.text.lineText);
            re(e, t, 2, "line");
        }
        if (e.views.chart.enabled) {
            const t = ie(e, i, x.text.chartText);
            re(e, t, 3, "chart");
        }
        let r = null;
        if (e.views.days.enabled) {
            if (e.title.showTitleDropDownHeaders) {
                r = a.createWithHTML(i, "div", "title-menu-header", `${x.text.yearText}${":"}`);
            }
            const t = ie(e, i, x.text.daysText);
            re(e, t, 4, "days");
        }
        if (e.views.months.enabled) {
            if (e.title.showTitleDropDownHeaders && !o.defined(r)) {
                r = a.createWithHTML(i, "div", "title-menu-header", `${x.text.yearText}${":"}`);
            }
            const t = ie(e, i, x.text.monthsText);
            re(e, t, 5, "months");
        }
        if (e.views.colorRanges.enabled) {
            if (e.title.showTitleDropDownHeaders) {
                a.createWithHTML(i, "div", "title-menu-header", `${x.text.statisticsText}${":"}`);
            }
            const t = ie(e, i, x.text.colorRangesText);
            re(e, t, 6, "color-ranges");
        }
    }
    function ie(e, t, n) {
        const o = a.createWithHTML(t, "div", "title-menu-item", n);
        if (e.title.showTitleDropDownHeaders) {
            a.addClass(o, "indented");
        }
        return o;
    }
    function re(e, t, n, o) {
        if (e._currentView.activeView === n) {
            a.addClass(t, "title-menu-item-active");
        } else {
            t.onclick = () => Fe(e, n, o);
        }
    }
    function se(e) {
        a.create(e._currentView.yearText, "div", "down-arrow");
        const t = a.create(e._currentView.yearText, "div", "years-menu-container");
        const n = a.create(t, "div", "years-menu");
        const i = (new Date).getFullYear();
        let r = null;
        t.style.display = "block";
        t.style.visibility = "hidden";
        for (let t = i - e.title.extraSelectionYears; t < i + e.title.extraSelectionYears; t++) {
            if (o.yearVisible(e, t)) {
                const s = ae(e, n, t, i);
                if (!o.defined(r)) {
                    r = s;
                }
            }
        }
        if (o.defined(r)) {
            n.scrollTop = r.offsetTop - n.offsetHeight / 2;
        }
        t.style.display = "none";
        t.style.visibility = "visible";
    }
    function ae(e, t, n, o) {
        let i = null;
        const r = e.startMonth === 0 ? n.toString() : `${n} / ${n + 1}`;
        const s = a.createWithHTML(t, "div", "year-menu-item", r);
        if (e._currentView.activeYear !== n) {
            s.onclick = () => {
                e._currentView.activeYear = n;
                O(e);
                c.customEvent(e.events.onSetYear, e._currentView.element, e._currentView.activeYear);
            };
            if (n === o) {
                a.addClass(s, "year-menu-item-current");
            }
        } else {
            a.addClass(s, "year-menu-item-active");
            i = s;
        }
        return i;
    }
    function le(e) {
        const t = new Date;
        const n = e._currentView.activeYear === t.getFullYear();
        if (e.yearlyStatistics.enabled && (!e.yearlyStatistics.showOnlyForCurrentYear || n)) {
            const i = a.create(e._currentView.element, "div", "yearly-statistics");
            const l = m.Days.get(e);
            const c = m.Months.get(e);
            const u = new Date(e._currentView.activeYear, e.startMonth, 1);
            const d = new Date(e._currentView.activeYear + 1, e.startMonth, 1);
            const w = ue(e, l, c, u, d);
            if (e.yearlyStatistics.showToday) {
                let c = je(e)[s.toStorageDate(t)];
                const u = a.create(i, "div", "statistics-box");
                const d = s.getWeekdayNumber(t) + 1;
                if (!o.defined(c) || !o.dayVisible(l, d)) {
                    c = 0;
                }
                const f = n ? r.friendlyNumber(c) : x.text.unavailableText;
                a.createWithHTML(u, "div", "statistics-box-title", `${x.text.todayText}${":"}`);
                const g = a.createWithHTML(u, "div", "statistics-box-count", f);
                if (!n) {
                    a.addClass(g, "unavailable");
                }
                ce(e, g, w, c, n);
            }
            if (e.yearlyStatistics.showThisWeek) {
                let t = 0;
                if (n) {
                    const n = s.getDateForMondayOfCurrentWeek();
                    const o = new Date(n);
                    o.setDate(n.getDate() + 7);
                    t = ue(e, l, c, n, o);
                }
                const o = n ? r.friendlyNumber(t) : x.text.unavailableText;
                const u = a.create(i, "div", "statistics-box");
                a.createWithHTML(u, "div", "statistics-box-title", `${x.text.thisWeekText}${":"}`);
                const d = a.createWithHTML(u, "div", "statistics-box-count", o);
                if (!n) {
                    a.addClass(d, "unavailable");
                }
                ce(e, d, w, t, n);
            }
            if (e.yearlyStatistics.showThisMonth) {
                let o = 0;
                if (n) {
                    const n = new Date(t.getFullYear(), t.getMonth(), 1);
                    const i = new Date(t.getFullYear(), t.getMonth(), s.getTotalDaysInMonth(t.getFullYear(), t.getMonth()) + 1);
                    o = ue(e, l, c, n, i);
                }
                const u = n ? r.friendlyNumber(o) : x.text.unavailableText;
                const d = a.create(i, "div", "statistics-box");
                a.createWithHTML(d, "div", "statistics-box-title", `${x.text.thisMonthText}${":"}`);
                const f = a.createWithHTML(d, "div", "statistics-box-count", u);
                if (!n) {
                    a.addClass(f, "unavailable");
                }
                ce(e, f, w, o, n);
            }
            if (e.yearlyStatistics.showThisYear) {
                const e = a.create(i, "div", "statistics-box");
                a.createWithHTML(e, "div", "statistics-box-title", `${x.text.thisYearText}${":"}`);
                a.createWithHTML(e, "div", "statistics-box-count", r.friendlyNumber(w));
            }
            if (i.innerHTML === "") {
                i.parentNode.removeChild(i);
            }
        }
    }
    function ce(e, t, n, o, i) {
        if (i && e.yearlyStatistics.showPercentages) {
            const i = o / n * 100;
            if (!isNaN(i)) {
                const n = `${i.toFixed(e.percentageDecimalPoints)}%`;
                const o = a.create(t, "span", "percentage");
                a.createWithHTML(o, "span", "percentage-bracket", "(");
                a.createWithHTML(o, "span", "percentage-text", n);
                a.createWithHTML(o, "span", "percentage-bracket", ")");
            }
        }
    }
    function ue(e, t, n, i, r) {
        let a = 0;
        const l = new Date(i);
        while (l < r) {
            const i = je(e)[s.toStorageDate(l)];
            const r = s.getWeekdayNumber(l) + 1;
            if (o.monthVisible(n, l.getMonth()) && o.dayVisible(t, r) && o.definedNumber(i)) {
                a += i;
            }
            l.setDate(l.getDate() + 1);
        }
        return a;
    }
    function de(e, t = false, i) {
        e._currentView.mapContentsContainer = a.create(e._currentView.element, "div", "map-contents-container");
        e._currentView.mapContents = a.create(e._currentView.mapContentsContainer, "div", "map-contents");
        if (!he(e)) {
            e._currentView.mapContents.style.minHeight = `${n.DEFAULT_MINIMUM_HEIGHT}px`;
            const o = a.createWithHTML(e._currentView.mapContents, "div", "no-data-message", x.text.noMapDataMessage);
            if (t) {
                a.addClass(o, "view-switch");
            }
        } else {
            e._currentView.mapContents.style.minHeight = "unset";
            e._currentView.mapContents.onscroll = () => l.hide(e);
            const r = a.create(e._currentView.mapContents, "div", "map");
            const c = e._currentView.activeYear;
            if (t) {
                a.addClass(r, "view-switch");
            }
            if (e.views.map.showDayNames) {
                const t = a.create(r, "div", "days");
                const n = e.views.map.showMinimalDayNames && e.views.map.daysToShow.length === 7;
                if (!e.views.map.showMonthNames || e.views.map.placeMonthNamesOnTheBottom) {
                    t.className = "days-months-bottom";
                }
                for (let i = 0; i < 7; i++) {
                    if (o.dayVisible(e.views.map.daysToShow, i + 1)) {
                        const o = !n || i % 3 === 0 ? x.text.dayNames[i] : " ";
                        const r = a.createWithHTML(t, "div", "day-name", o);
                        if (e.views.days.enabled) {
                            r.ondblclick = () => Fe(e, 4, "days");
                        }
                        if (!e.views.map.showSpacing) {
                            a.addClass(r, "no-spacing");
                        }
                    }
                }
                if (e.views.map.showDaysInReverseOrder) {
                    a.reverseChildrenOrder(t);
                }
            }
            const u = a.create(r, "div", "months");
            const d = w.getAllSorted(e);
            for (let t = e.startMonth; t < 12 + e.startMonth; t++) {
                let i = t;
                let r = c;
                if (e.startMonth > 0 && t > 11) {
                    i = t - 12;
                    r++;
                }
                if (o.monthVisible(e.views.map.monthsToShow, i)) {
                    const t = a.create(u, "div", "month");
                    const l = a.create(t, "div", "day-columns");
                    const w = new Date(r, i, 1);
                    const f = s.getWeekdayNumber(w);
                    let g = s.getTotalDaysInMonth(r, i);
                    let h = a.create(l, "div", "day-column");
                    let m = false;
                    let p = 1;
                    t.setAttribute(n.Attribute.View.Map.HEAT_JS_MONTH_NUMBER, `${i + 1}`);
                    g += f;
                    for (let t = 0; t < g; t++) {
                        if (t >= f) {
                            m = true;
                        } else {
                            if (o.dayVisible(e.views.map.daysToShow, p)) {
                                const t = a.create(h, "div", "day-disabled");
                                if (!e.views.map.showSpacing) {
                                    a.addClass(t, "no-spacing");
                                }
                            }
                        }
                        if (m) {
                            let n = null;
                            if (o.dayVisible(e.views.map.daysToShow, p)) {
                                n = ge(e, h, t - f, i, r, d);
                            }
                            if ((t + 1) % 7 === 0) {
                                if (e.views.map.showDaysInReverseOrder) {
                                    a.reverseChildrenOrder(h);
                                }
                                h = a.create(l, "div", "day-column");
                                p = 0;
                                if (e._currentView.dayWidth === 0 && o.defined(n)) {
                                    const t = a.getStyleValueByName(n, "margin-left", true);
                                    const o = a.getStyleValueByName(n, "margin-right", true);
                                    e._currentView.dayWidth = n.offsetWidth + t + o;
                                }
                            }
                        }
                        p++;
                    }
                    we(e, p, h);
                    if (e.views.map.showMonthNames) {
                        let n;
                        const o = t.offsetWidth;
                        const u = new Date(c, i, 1);
                        let d = x.text.monthNames[i];
                        if (e.startMonth > 0 && e.views.map.showYearsInMonthNames) {
                            d += `${" "}${r}`;
                        }
                        if (!e.views.map.placeMonthNamesOnTheBottom) {
                            n = a.createWithHTML(t, "div", "month-name", d, l);
                        } else {
                            n = a.createWithHTML(t, "div", "month-name-bottom", d);
                        }
                        if (e.views.map.showMonthDayGaps) {
                            n.style.width = `${o}px`;
                        } else {
                            n.style.width = `${o - e._currentView.dayWidth}px`;
                        }
                        if (s.isCurrentMonthAndYear(u)) {
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
                a.reverseChildrenOrder(u);
            }
            fe(e, u);
            Le(e, e._currentView.mapContentsContainer, r);
            if (e.views.map.keepScrollPositions || i) {
                e._currentView.mapContents.scrollLeft = e._currentView.mapContentsScrollLeft;
            }
        }
        e._currentView.mapContentsContainer.style.display = "none";
    }
    function we(e, t, n) {
        const i = 7 - n.children.length;
        if (i > 0 && i < 7) {
            for (let r = 0; r < i; r++) {
                if (o.dayVisible(e.views.map.daysToShow, t)) {
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
    function fe(e, t) {
        const n = t.children.length;
        for (let o = 1; o < n; o++) {
            const n = t.children[o];
            const i = n.getElementsByClassName("day-column");
            const r = [].slice.call(i);
            const s = r[0].getElementsByClassName("day-disabled");
            if (!e.views.map.showMonthDayGaps && s.length > 0) {
                n.style.marginLeft = `${-e._currentView.dayWidth}px`;
            } else if (e.views.map.showMonthDayGaps && s.length === 0) {
                n.style.marginLeft = `${e._currentView.dayWidth}px`;
            }
        }
    }
    function ge(e, t, l, u, d, f) {
        const g = l + 1;
        const h = a.create(t, "div", "day");
        const m = new Date(d, u, g);
        const p = o.holiday(e, m);
        const y = i.getNumber(je(e)[s.toStorageDate(m)], 0);
        const v = w.get(e, f, y, m);
        const T = Ge(e, m, y);
        h.setAttribute(n.Attribute.View.Map.HEAT_JS_DATE, `${r.padNumber(g)}-${r.padNumber(u + 1)}-${d}`);
        if (o.defined(v)) {
            h.setAttribute(n.Attribute.View.Map.HEAT_JS_MINIMUM, v.minimum.toString());
        }
        if (e.views.map.showToolTips) {
            Ee(e, h, m, y, T, e.views.map.dayToolTipText, e.events.onMapDayToolTipRender, p.matched, e.views.map.showCountsInToolTips, e.views.map.showDifferencesInToolTips);
        }
        if (!e.views.map.showSpacing) {
            a.addClass(h, "no-spacing");
        }
        if (e.views.map.showDayDateNumbers) {
            const e = a.createWithHTML(h, "div", "count-date", g.toString());
            a.createWithHTML(e, "sup", "", s.getDayOrdinal(x, g));
        }
        if (e.views.map.showDayCounts && y > 0) {
            a.createWithHTML(h, "div", "count", r.friendlyNumber(y));
        }
        if (e.views.map.showDifferences && o.definedString(T)) {
            a.createWithHTML(h, "div", "difference", T);
        }
        if (o.definedFunction(e.events.onMapDayClick)) {
            h.onclick = () => c.customEvent(e.events.onMapDayClick, e._currentView.element, m, y, e._currentView.activeYear, p.matched);
        } else if (o.definedFunction(e.events.onMapDayDblClick)) {
            h.ondblclick = () => c.customEvent(e.events.onMapDayDblClick, e._currentView.element, m, y, e._currentView.activeYear, p.matched);
        } else {
            a.addClass(h, "no-hover");
        }
        if (o.defined(v) && w.isVisible(e, v.id)) {
            if (o.definedString(v.mapCssClassName)) {
                a.addClass(h, v.mapCssClassName);
            } else {
                a.addClass(h, v.cssClassName);
            }
        }
        if (e.views.map.highlightCurrentDay && s.isToday(m)) {
            a.addClass(h, "today");
        }
        return h;
    }
    function he(e) {
        let t = false;
        const n = je(e);
        const o = e._currentView.activeYear.toString();
        const i = (e._currentView.activeYear + 1).toString();
        for (const r in n) {
            if (Object.prototype.hasOwnProperty.call(n, r)) {
                if (s.getStorageDateYear(r) === o) {
                    t = true;
                    break;
                } else if (e.startMonth > 0 && s.getStorageDateYear(r) === i) {
                    t = true;
                    break;
                }
            }
        }
        return t;
    }
    function me(e, t, i) {
        e._currentView.lineContentsContainer = a.create(e._currentView.element, "div", "line-contents-container");
        e._currentView.lineContents = a.create(e._currentView.lineContentsContainer, "div", "line-contents");
        e._currentView.lineContents.onscroll = () => l.hide(e);
        const r = a.create(e._currentView.lineContents, "div", "line");
        const c = a.create(r, "div", "day-lines");
        const u = Je(e);
        if (t) {
            a.addClass(r, "view-switch");
        }
        if (u === 0) {
            e._currentView.lineContents.style.minHeight = `${n.DEFAULT_MINIMUM_HEIGHT}px`;
            r.parentNode.removeChild(r);
            const o = a.createWithHTML(e._currentView.lineContents, "div", "no-data-message", x.text.noLineDataMessage);
            if (t) {
                a.addClass(o, "view-switch");
            }
        } else {
            const n = e._currentView.activeYear;
            const l = w.getAllSorted(e);
            let u = [];
            for (let i = e.startMonth; i < 12 + e.startMonth; i++) {
                let r = i;
                let a = n;
                if (e.startMonth > 0 && i > 11) {
                    r = i - 12;
                    a++;
                }
                if (o.monthVisible(e.views.line.monthsToShow, r)) {
                    const n = s.getTotalDaysInMonth(a, r);
                    let i = 1;
                    let d = false;
                    for (let w = 0; w < n; w++) {
                        const n = new Date(a, r, i);
                        const f = s.getWeekdayNumber(n) + 1;
                        if (o.dayVisible(e.views.line.daysToShow, f)) {
                            const n = pe(c, e, w + 1, r, a, l, t);
                            if (!d) {
                                u.push(n);
                                d = true;
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
                a.reverseChildrenOrder(c);
                u = u.reverse();
            }
            if (e.views.line.showMonthNames) {
                const t = a.create(e._currentView.lineContents, "div", "line-months");
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
                        let r = x.text.monthNames[l];
                        if (e.startMonth > 0 && e.views.line.showYearsInMonthNames) {
                            r += `${" "}${c}`;
                        }
                        const d = a.createWithHTML(t, "div", "month-name", r);
                        if (e.views.line.showInReverseOrder) {
                            let e = u[i].offsetLeft;
                            e -= d.offsetWidth;
                            e += u[i].offsetWidth;
                            d.style.left = `${e}px`;
                        } else {
                            d.style.left = `${u[i].offsetLeft}px`;
                        }
                        if (s.isCurrentMonthAndYear(o)) {
                            a.addClass(d, "current");
                        }
                        if (e.views.months.enabled) {
                            d.ondblclick = () => Fe(e, 5, "months");
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
                t.style.width = `${c.offsetWidth}px`;
            }
            Le(e, e._currentView.lineContentsContainer, r);
            if (e.views.line.keepScrollPositions || i) {
                e._currentView.lineContents.scrollLeft = e._currentView.lineContentsScrollLeft;
            }
        }
        e._currentView.lineContentsContainer.style.display = "none";
    }
    function pe(e, t, l, u, d, f, g) {
        const h = new Date(d, u, l);
        const m = a.create(e, "div", "day-line");
        const p = o.holiday(t, h);
        const y = i.getNumber(je(t)[s.toStorageDate(h)], 0);
        const T = w.get(t, f, y, h);
        const b = Ge(t, h, y);
        m.setAttribute(n.Attribute.View.Line.HEAT_JS_DATE, `${r.padNumber(l)}-${r.padNumber(u + 1)}-${d}`);
        if (o.defined(T)) {
            m.setAttribute(n.Attribute.View.Line.HEAT_JS_MINIMUM, T.minimum.toString());
        }
        if (t.views.line.showToolTips) {
            Ee(t, m, h, y, b, t.views.line.dayToolTipText, t.events.onLineDayToolTipRender, p.matched, t.views.line.showCountsInToolTips, t.views.line.showDifferencesInToolTips);
        }
        if (o.definedFunction(t.events.onLineDayClick)) {
            m.onclick = () => c.customEvent(t.events.onLineDayClick, t._currentView.element, h, y, t._currentView.activeYear, p.matched);
        } else if (o.definedFunction(t.events.onLineDayDblClick)) {
            m.ondblclick = () => c.customEvent(t.events.onLineDayDblClick, t._currentView.element, h, y, t._currentView.activeYear, p.matched);
        } else {
            a.addClass(m, "no-hover");
        }
        if (o.defined(T) && w.isVisible(t, T.id)) {
            if (o.definedString(T.lineCssClassName)) {
                a.addClass(m, T.lineCssClassName);
            } else {
                a.addClass(m, T.cssClassName);
            }
        }
        v.setHeight(t, m, 100, g, true);
        return m;
    }
    function ye(e, t, i) {
        e._currentView.chartContents = a.create(e._currentView.element, "div", "chart-contents");
        e._currentView.chartContents.onscroll = () => l.hide(e);
        const r = a.create(e._currentView.chartContents, "div", "chart");
        const c = a.create(r, "div", "y-labels");
        const u = a.create(r, "div", "day-lines");
        const d = Je(e);
        let f = 0;
        if (t) {
            a.addClass(r, "view-switch");
        }
        if (d > 0 && e.views.chart.showChartYLabels) {
            const e = a.createWithHTML(c, "div", "label-100", d.toString());
            const t = a.getStyleValueByName(c, "margin-right", true);
            a.createWithHTML(c, "div", "label-75", (Math.floor(d / 4) * 3).toString());
            a.createWithHTML(c, "div", "label-50", Math.floor(d / 2).toString());
            a.createWithHTML(c, "div", "label-25", Math.floor(d / 4).toString());
            a.createWithHTML(c, "div", "label-0", "0");
            c.style.width = `${e.offsetWidth}px`;
            f = c.offsetWidth + t;
        } else {
            c.parentNode.removeChild(c);
        }
        if (d === 0) {
            e._currentView.chartContents.style.minHeight = `${n.DEFAULT_MINIMUM_HEIGHT}px`;
            r.parentNode.removeChild(r);
            const o = a.createWithHTML(e._currentView.chartContents, "div", "no-data-message", x.text.noChartDataMessage);
            if (t) {
                a.addClass(o, "view-switch");
            }
        } else {
            const n = w.getAllSorted(e);
            const r = a.getStyleValueByName(u, "border-bottom-width", true);
            const l = (u.offsetHeight - r) / d;
            const c = e._currentView.activeYear;
            let g = [];
            let h = false;
            for (let i = e.startMonth; i < 12 + e.startMonth; i++) {
                let r = i;
                let d = c;
                if (e.startMonth > 0 && i > 11) {
                    r = i - 12;
                    d++;
                }
                if (o.monthVisible(e.views.chart.monthsToShow, r)) {
                    const i = s.getTotalDaysInMonth(d, r);
                    let c = 1;
                    let w = false;
                    for (let f = 0; f < i; f++) {
                        const i = new Date(d, r, c);
                        const m = s.getWeekdayNumber(i) + 1;
                        if (o.dayVisible(e.views.chart.daysToShow, m)) {
                            const o = ve(u, e, f + 1, r, d, n, l, t);
                            if (!w && h && e.views.chart.addMonthSpacing) {
                                a.create(u, "div", "month-spacing", o);
                            }
                            if (!w) {
                                g.push(o);
                                w = true;
                            }
                        }
                        if ((f + 1) % 7 === 0) {
                            c = 0;
                        }
                        c++;
                    }
                }
                h = true;
            }
            if (e.views.chart.showInReverseOrder) {
                a.reverseChildrenOrder(u);
                g = g.reverse();
            }
            if (e.views.chart.showMonthNames) {
                const t = a.create(e._currentView.chartContents, "div", "chart-months");
                let n = 0;
                const i = a.create(t, "div", "month-name-space");
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
                        let i = x.text.monthNames[r];
                        if (e.startMonth > 0 && e.views.chart.showYearsInMonthNames) {
                            i += `${" "}${l}`;
                        }
                        const u = a.createWithHTML(t, "div", "month-name", i);
                        if (e.views.chart.showInReverseOrder) {
                            let e = g[n].offsetLeft;
                            e -= u.offsetWidth;
                            e += g[n].offsetWidth;
                            u.style.left = `${e}px`;
                        } else {
                            u.style.left = `${g[n].offsetLeft}px`;
                        }
                        if (s.isCurrentMonthAndYear(o)) {
                            a.addClass(u, "current");
                        }
                        if (e.views.months.enabled) {
                            u.ondblclick = () => Fe(e, 5, "months");
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
                t.style.width = `${u.offsetWidth}px`;
            }
            if (e.views.chart.keepScrollPositions || i) {
                e._currentView.chartContents.scrollLeft = e._currentView.chartContentsScrollLeft;
            }
        }
        e._currentView.chartContents.style.display = "none";
    }
    function ve(e, t, l, u, d, f, g, h) {
        const m = new Date(d, u, l);
        const p = a.create(e, "div", "day-line");
        const y = o.holiday(t, m);
        const T = i.getNumber(je(t)[s.toStorageDate(m)], 0);
        const b = w.get(t, f, T, m);
        const V = Ge(t, m, T);
        p.setAttribute(n.Attribute.View.Chart.HEAT_JS_DATE, `${r.padNumber(l)}-${r.padNumber(u + 1)}-${d}`);
        if (o.defined(b)) {
            p.setAttribute(n.Attribute.View.Chart.HEAT_JS_MINIMUM, b.minimum.toString());
        }
        if (t.views.chart.showToolTips) {
            Ee(t, p, m, T, V, t.views.chart.dayToolTipText, t.events.onChartDayToolTipRender, y.matched, t.views.chart.showCountsInToolTips, t.views.chart.showDifferencesInToolTips);
        }
        if (t.views.chart.showLineCounts || t.views.chart.showLineDateNumbers) {
            a.addClass(p, "day-line-count");
        }
        if (t.views.chart.showLineDateNumbers) {
            const e = a.createWithHTML(p, "div", "count-date", l.toString());
            a.createWithHTML(e, "sup", "", s.getDayOrdinal(x, l));
        }
        if (t.views.chart.showLineCounts && T > 0) {
            a.createWithHTML(p, "div", "count", r.friendlyNumber(T));
        }
        if (t.views.chart.showDifferences && o.definedString(V)) {
            a.createWithHTML(p, "div", "difference", V);
        }
        const C = T * g;
        if (C <= 0) {
            p.style.visibility = "hidden";
        }
        if (o.definedFunction(t.events.onChartDayClick)) {
            p.onclick = () => c.customEvent(t.events.onChartDayClick, t._currentView.element, m, T, t._currentView.activeYear, y.matched);
        } else if (o.definedFunction(t.events.onChartDayDblClick)) {
            p.ondblclick = () => c.customEvent(t.events.onChartDayDblClick, t._currentView.element, m, T, t._currentView.activeYear, y.matched);
        } else {
            a.addClass(p, "no-hover");
        }
        if (o.defined(b) && w.isVisible(t, b.id)) {
            if (o.definedString(b.chartCssClassName)) {
                a.addClass(p, b.chartCssClassName);
            } else {
                a.addClass(p, b.cssClassName);
            }
        }
        if (t.views.chart.highlightCurrentDay && s.isToday(m)) {
            a.addClass(p, "today");
        }
        if (t.views.chart.useGradients) {
            a.addGradientEffect(t._currentView.element, p);
        }
        v.setHeight(t, p, C, h);
        return p;
    }
    function Te(e, t) {
        e._currentView.daysContents = a.create(e._currentView.element, "div", "days-contents");
        const i = a.create(e._currentView.daysContents, "div", "days");
        const r = a.create(e._currentView.daysContents, "div", "day-names");
        const s = a.create(i, "div", "y-labels");
        const l = a.create(i, "div", "day-lines");
        const c = w.getAllSorted(e);
        const u = Ve(e, c);
        if (t && (!e.views.days.useDifferentOpacities || !e.views.days.showDayCounts)) {
            a.addClass(i, "view-switch");
        }
        if (u.largestValue > 0 && e.views.days.showChartYLabels) {
            const e = a.createWithHTML(s, "div", "label-100", u.largestValue.toString());
            const t = a.getStyleValueByName(s, "margin-right", true);
            a.createWithHTML(s, "div", "label-75", (Math.floor(u.largestValue / 4) * 3).toString());
            a.createWithHTML(s, "div", "label-50", Math.floor(u.largestValue / 2).toString());
            a.createWithHTML(s, "div", "label-25", Math.floor(u.largestValue / 4).toString());
            a.createWithHTML(s, "div", "label-0", "0");
            s.style.width = `${e.offsetWidth}px`;
            r.style.paddingLeft = `${s.offsetWidth + t}px`;
        } else {
            s.parentNode.removeChild(s);
        }
        if (u.largestValue === 0) {
            e._currentView.daysContents.style.minHeight = `${n.DEFAULT_MINIMUM_HEIGHT}px`;
            i.parentNode.removeChild(i);
            r.parentNode.removeChild(r);
            const o = a.createWithHTML(e._currentView.daysContents, "div", "no-days-message", x.text.noDaysDataMessage);
            if (t) {
                a.addClass(o, "view-switch");
            }
        } else {
            const n = a.getStyleValueByName(l, "border-bottom-width", true);
            const i = (l.offsetHeight - n) / u.largestValue;
            for (const n in u.values) {
                if (Object.prototype.hasOwnProperty.call(u.values, n) && o.dayVisible(e.views.days.daysToShow, parseInt(n))) {
                    const s = u.valueOpacities[u.values[n].total];
                    const d = be(l, parseInt(n), u.values[n].total, e, i, s, u.totalValue, t);
                    if (e.views.days.showDayNames) {
                        a.createWithHTML(r, "div", "day-name", x.text.dayNames[parseInt(n) - 1]);
                    }
                    if (e.views.days.showStackedColorRanges) {
                        for (const e in u.values[n].typeTotals) {
                            if (Object.prototype.hasOwnProperty.call(u.values[n].typeTotals, e)) {
                                const t = u.values[n].typeTotals[e];
                                const r = t * i;
                                const s = w.getByMinimum(c, parseInt(e));
                                if (r > 0) {
                                    const e = d.children.length > 0 ? d.children[0] : null;
                                    const t = a.create(d, "div", "stacked-color-range", e);
                                    t.style.height = `${r}px`;
                                    if (o.defined(s)) {
                                        if (o.definedString(s.daysCssClassName)) {
                                            a.addClass(t, s.daysCssClassName);
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
            if (e.views.days.showInReverseOrder) {
                a.reverseChildrenOrder(l);
                a.reverseChildrenOrder(r);
            }
            if (e.views.days.keepScrollPositions) {
                e._currentView.daysContents.scrollLeft = e._currentView.daysContentsScrollLeft;
            }
        }
        e._currentView.daysContents.style.display = "none";
    }
    function be(e, t, i, s, d, w, f, g) {
        const h = a.create(e, "div", "day-line");
        const m = i * d;
        let p = null;
        h.setAttribute(n.Attribute.View.Days.HEAT_JS_NUMBER, t.toString());
        if (m <= 0) {
            h.style.visibility = "hidden";
        }
        if (!s.views.days.showStackedColorRanges) {
            a.addClass(h, "non-stacked");
        } else {
            a.addClass(h, "stacked");
        }
        if (s.views.days.showToolTips) {
            l.add(h, s, r.friendlyNumber(i));
        }
        if (o.definedFunction(s.events.onWeekDayClick)) {
            h.onclick = () => c.customEvent(s.events.onWeekDayClick, s._currentView.element, t, i, s._currentView.activeYear);
        } else if (o.definedFunction(s.events.onWeekDayDblClick)) {
            h.ondblclick = () => c.customEvent(s.events.onWeekDayDblClick, s._currentView.element, t, i, s._currentView.activeYear);
        } else {
            a.addClass(h, "no-hover");
        }
        if (s.views.days.showDayCounts && i > 0) {
            a.addClass(h, "day-line-count");
            p = a.createWithHTML(h, "div", "count", r.friendlyNumber(i));
            if (s.views.days.showDayCountPercentages) {
                a.createWithHTML(p, "div", "percentage", `${(i / f * 100).toFixed(s.percentageDecimalPoints)}%`);
            }
        }
        if (!s.views.days.showStackedColorRanges) {
            if (s.views.days.useGradients) {
                a.addGradientEffect(s._currentView.element, h);
                if (o.defined(p)) {
                    a.addClass(p, "blend-colors");
                }
            } else if (s.views.days.useDifferentOpacities) {
                const e = a.getStyleValueByName(h, "background-color");
                const t = a.getStyleValueByName(h, "border-color");
                if (o.defined(p)) {
                    a.addClass(p, "blend-colors");
                }
                if (o.rgbColor(e)) {
                    h.style.backgroundColor = u.toRgbOpacityColor(e, w);
                } else if (o.hexColor(e)) {
                    h.style.backgroundColor = u.toRgbOpacityColor(u.hexToRgba(e), w);
                }
                if (o.rgbColor(t)) {
                    h.style.borderColor = u.toRgbOpacityColor(t, w);
                } else if (o.hexColor(t)) {
                    h.style.borderColor = u.toRgbOpacityColor(u.hexToRgba(t), w);
                }
            }
        }
        v.setHeight(s, h, m, g);
        return h;
    }
    function Ve(e, t) {
        const n = {
            values: b.largestValueForViewValues(7),
            valueOpacities: {},
            largestValue: 0,
            totalValue: 0
        };
        const i = je(e);
        const r = e._currentView.activeYear;
        for (let a = e.startMonth; a < 12 + e.startMonth; a++) {
            let l = a;
            let c = r;
            if (e.startMonth > 0 && a > 11) {
                l = a - 12;
                c++;
            }
            if (o.monthVisible(e.views.days.monthsToShow, l)) {
                const r = s.getTotalDaysInMonth(c, l);
                for (let a = 0; a < r; a++) {
                    const r = s.toStorageDate(new Date(c, l, a + 1));
                    if (Object.prototype.hasOwnProperty.call(i, r)) {
                        const u = new Date(c, l, a + 1);
                        const d = s.getWeekdayNumber(u) + 1;
                        if (!o.holiday(e, u).matched && o.dayVisible(e.views.days.daysToShow, d)) {
                            const s = i[r];
                            const a = w.get(e, t, s);
                            if (!o.defined(a) || a.visible) {
                                const e = o.defined(a) ? a.minimum.toString() : "0";
                                n.values[d].total += s;
                                n.totalValue += s;
                                n.largestValue = Math.max(n.largestValue, n.values[d].total);
                                if (!Object.prototype.hasOwnProperty.call(n.values[d].typeTotals, e)) {
                                    n.values[d].typeTotals[e] = 0;
                                }
                                n.values[d].typeTotals[e] += s;
                            }
                        }
                    }
                }
            }
        }
        u.valuesToOpacitiesOrder(n);
        return n;
    }
    function xe(e, t) {
        e._currentView.monthsContents = a.create(e._currentView.element, "div", "months-contents");
        const i = a.create(e._currentView.monthsContents, "div", "months");
        const r = a.create(e._currentView.monthsContents, "div", "month-names");
        const l = a.create(i, "div", "y-labels");
        const c = a.create(i, "div", "month-lines");
        const u = w.getAllSorted(e);
        const d = _e(e, u);
        if (t && (!e.views.months.useDifferentOpacities || !e.views.months.showMonthCounts)) {
            a.addClass(i, "view-switch");
        }
        if (d.largestValue > 0 && e.views.months.showChartYLabels) {
            const e = a.createWithHTML(l, "div", "label-100", d.largestValue.toString());
            const t = a.getStyleValueByName(l, "margin-right", true);
            a.createWithHTML(l, "div", "label-75", (Math.floor(d.largestValue / 4) * 3).toString());
            a.createWithHTML(l, "div", "label-50", Math.floor(d.largestValue / 2).toString());
            a.createWithHTML(l, "div", "label-25", Math.floor(d.largestValue / 4).toString());
            a.createWithHTML(l, "div", "label-0", "0");
            l.style.width = `${e.offsetWidth}px`;
            r.style.paddingLeft = `${l.offsetWidth + t}px`;
        } else {
            l.parentNode.removeChild(l);
        }
        if (d.largestValue === 0) {
            e._currentView.monthsContents.style.minHeight = `${n.DEFAULT_MINIMUM_HEIGHT}px`;
            i.parentNode.removeChild(i);
            r.parentNode.removeChild(r);
            const o = a.createWithHTML(e._currentView.monthsContents, "div", "no-months-message", x.text.noMonthsDataMessage);
            if (t) {
                a.addClass(o, "view-switch");
            }
        } else {
            const n = a.getStyleValueByName(c, "border-bottom-width", true);
            const i = (c.offsetHeight - n) / d.largestValue;
            const l = e._currentView.activeYear;
            for (let n = e.startMonth; n < 12 + e.startMonth; n++) {
                let f = n;
                if (e.startMonth > 0 && n > 11) {
                    f = n - 12;
                }
                const g = f + 1;
                if (Object.prototype.hasOwnProperty.call(d.values, g) && o.monthVisible(e.views.months.monthsToShow, f)) {
                    const n = d.valueOpacities[d.values[g].total];
                    const h = Ce(c, g, d.values[g].total, e, i, n, d.totalValue, t);
                    if (e.views.months.showMonthNames) {
                        const e = a.createWithHTML(r, "div", "month-name", x.text.monthNames[f]);
                        const t = new Date(l, f, 1);
                        if (s.isCurrentMonthAndYear(t)) {
                            a.addClass(e, "current");
                        }
                    }
                    if (e.views.months.showStackedColorRanges) {
                        for (const e in d.values[g].typeTotals) {
                            if (Object.prototype.hasOwnProperty.call(d.values[g].typeTotals, e)) {
                                const t = d.values[g].typeTotals[e];
                                const n = t * i;
                                const r = w.getByMinimum(u, parseInt(e));
                                if (n > 0) {
                                    const e = h.children.length > 0 ? h.children[0] : null;
                                    const t = a.create(h, "div", "stacked-color-range", e);
                                    t.style.height = `${n}px`;
                                    if (o.defined(r)) {
                                        if (o.definedString(r.monthsCssClassName)) {
                                            a.addClass(t, r.monthsCssClassName);
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
            if (e.views.months.showInReverseOrder) {
                a.reverseChildrenOrder(c);
                a.reverseChildrenOrder(r);
            }
            if (e.views.months.keepScrollPositions) {
                e._currentView.monthsContents.scrollLeft = e._currentView.monthsContentsScrollLeft;
            }
        }
        e._currentView.monthsContents.style.display = "none";
    }
    function Ce(e, t, i, s, d, w, f, g) {
        const h = a.create(e, "div", "month-line");
        const m = i * d;
        const p = new Date;
        let y = null;
        h.setAttribute(n.Attribute.View.Month.HEAT_JS_NUMBER, t.toString());
        if (!s.views.months.showStackedColorRanges) {
            a.addClass(h, "non-stacked");
        } else {
            a.addClass(h, "stacked");
        }
        if (m <= 0) {
            h.style.visibility = "hidden";
        }
        if (s.views.months.showToolTips) {
            l.add(h, s, r.friendlyNumber(i));
        }
        let T = s._currentView.activeYear;
        if (s.startMonth > 0 && t - 1 < s.startMonth) {
            T++;
        }
        if (o.definedFunction(s.events.onMonthClick)) {
            h.onclick = () => c.customEvent(s.events.onMonthClick, s._currentView.element, t, i, T);
        } else if (o.definedFunction(s.events.onMonthDblClick)) {
            h.ondblclick = () => c.customEvent(s.events.onMonthDblClick, s._currentView.element, t, i, T);
        } else {
            a.addClass(h, "no-hover");
        }
        if (s.views.months.showMonthCounts && i > 0) {
            a.addClass(h, "month-line-count");
            y = a.createWithHTML(h, "div", "count", r.friendlyNumber(i));
            if (s.views.months.showMonthCountPercentages) {
                a.createWithHTML(y, "div", "percentage", `${(i / f * 100).toFixed(s.percentageDecimalPoints)}%`);
            }
        }
        if (s.views.months.highlightCurrentMonth && p.getMonth() === t - 1 && s._currentView.activeYear === p.getFullYear()) {
            a.addClass(h, "today");
        }
        if (!s.views.months.showStackedColorRanges) {
            if (s.views.months.useGradients) {
                a.addGradientEffect(s._currentView.element, h);
                if (o.defined(y)) {
                    a.addClass(y, "blend-colors");
                }
            } else if (s.views.months.useDifferentOpacities) {
                const e = a.getStyleValueByName(h, "background-color");
                const t = a.getStyleValueByName(h, "border-color");
                if (o.defined(y)) {
                    a.addClass(y, "blend-colors");
                }
                if (o.rgbColor(e)) {
                    h.style.backgroundColor = u.toRgbOpacityColor(e, w);
                } else if (o.hexColor(e)) {
                    h.style.backgroundColor = u.toRgbOpacityColor(u.hexToRgba(e), w);
                }
                if (o.rgbColor(t)) {
                    h.style.borderColor = u.toRgbOpacityColor(t, w);
                } else if (o.hexColor(t)) {
                    h.style.borderColor = u.toRgbOpacityColor(u.hexToRgba(t), w);
                }
            }
        }
        v.setHeight(s, h, m, g);
        return h;
    }
    function _e(e, t) {
        const n = {
            values: b.largestValueForViewValues(12),
            valueOpacities: {},
            largestValue: 0,
            totalValue: 0
        };
        const i = je(e);
        const r = e._currentView.activeYear;
        for (let a = e.startMonth; a < 12 + e.startMonth; a++) {
            let l = a;
            let c = r;
            if (e.startMonth > 0 && a > 11) {
                l = a - 12;
                c++;
            }
            if (o.monthVisible(e.views.months.monthsToShow, l)) {
                const r = l + 1;
                const a = s.getTotalDaysInMonth(c, l);
                for (let u = 0; u < a; u++) {
                    const a = s.toStorageDate(new Date(c, l, u + 1));
                    if (Object.prototype.hasOwnProperty.call(i, a)) {
                        const d = new Date(c, l, u + 1);
                        const f = s.getWeekdayNumber(d) + 1;
                        if (!o.holiday(e, d).matched && o.dayVisible(e.views.days.daysToShow, f)) {
                            const s = i[a];
                            const l = w.get(e, t, s);
                            if (!o.defined(l) || l.visible) {
                                const e = o.defined(l) ? l.minimum.toString() : "0";
                                n.values[r].total += s;
                                n.totalValue += s;
                                n.largestValue = Math.max(n.largestValue, n.values[r].total);
                                if (!Object.prototype.hasOwnProperty.call(n.values[r].typeTotals, e)) {
                                    n.values[r].typeTotals[e] = 0;
                                }
                                n.values[r].typeTotals[e] += s;
                            }
                        }
                    }
                }
            }
        }
        u.valuesToOpacitiesOrder(n);
        return n;
    }
    function De(e, t) {
        e._currentView.colorRangesContents = a.create(e._currentView.element, "div", "color-ranges-contents");
        const i = a.create(e._currentView.colorRangesContents, "div", "color-ranges");
        const r = a.create(e._currentView.colorRangesContents, "div", "color-range-names");
        const s = a.create(i, "div", "y-labels");
        const l = a.create(i, "div", "color-range-lines");
        const c = w.getAllSorted(e);
        const u = Me(e, c);
        if (t) {
            a.addClass(i, "view-switch");
        }
        if (u.largestValue > 0 && e.views.colorRanges.showChartYLabels) {
            const e = a.createWithHTML(s, "div", "label-100", u.largestValue.toString());
            const t = a.getStyleValueByName(s, "margin-right", true);
            a.createWithHTML(s, "div", "label-75", (Math.floor(u.largestValue / 4) * 3).toString());
            a.createWithHTML(s, "div", "label-50", Math.floor(u.largestValue / 2).toString());
            a.createWithHTML(s, "div", "label-25", Math.floor(u.largestValue / 4).toString());
            a.createWithHTML(s, "div", "label-0", "0");
            s.style.width = `${e.offsetWidth}px`;
            r.style.paddingLeft = `${s.offsetWidth + t}px`;
        } else {
            s.parentNode.removeChild(s);
        }
        if (u.largestValue === 0) {
            e._currentView.colorRangesContents.style.minHeight = `${n.DEFAULT_MINIMUM_HEIGHT}px`;
            i.parentNode.removeChild(i);
            r.parentNode.removeChild(r);
            const o = a.createWithHTML(e._currentView.colorRangesContents, "div", "no-color-ranges-message", x.text.noColorRangesDataMessage);
            if (t) {
                a.addClass(o, "view-switch");
            }
        } else {
            const n = a.getStyleValueByName(l, "border-bottom-width", true);
            const i = (l.offsetHeight - n) / u.largestValue;
            if (!e.views.colorRanges.showColorRangeLabels) {
                r.parentNode.removeChild(r);
            }
            for (const n in u.types) {
                if (Object.prototype.hasOwnProperty.call(u.types, n)) {
                    Se(parseInt(n), l, u.types[n], e, c, i, u.totalValue, t);
                    const s = w.getByMinimum(c, parseInt(n));
                    if (e.views.colorRanges.showColorRangeLabels) {
                        if (!e.views.colorRanges.useColorRangeNamesForLabels || !o.defined(s) || !o.definedString(s.name)) {
                            a.createWithHTML(r, "div", "color-range-name", `${n}${"+"}`);
                        } else {
                            a.createWithHTML(r, "div", "color-range-name", s.name);
                        }
                    }
                }
            }
            if (e.views.colorRanges.showInReverseOrder) {
                a.reverseChildrenOrder(l);
                a.reverseChildrenOrder(r);
            }
            if (e.views.colorRanges.keepScrollPositions) {
                e._currentView.colorRangesContents.scrollLeft = e._currentView.colorRangesContentsScrollLeft;
            }
        }
        e._currentView.colorRangesContents.style.display = "none";
    }
    function Se(e, t, i, s, u, d, f, g) {
        const h = a.create(t, "div", "color-range-line");
        const m = i * d;
        const p = w.getByMinimum(u, e);
        if (o.defined(p) && o.definedString(p.name)) {
            h.setAttribute(n.Attribute.View.ColorRanges.HEAT_JS_COLOR_RANGE_NAME, p.name);
            h.setAttribute(n.Attribute.View.ColorRanges.HEAT_JS_MINIMUM, p.minimum.toString());
        }
        if (m <= 0) {
            h.style.visibility = "hidden";
        }
        if (s.views.colorRanges.showToolTips) {
            let e;
            if (o.defined(p) && o.definedString(p.name) && s.views.colorRanges.showRangeNamesInToolTips) {
                e = `${p.name}${":"}${" "}<b class="tooltip-count">${r.friendlyNumber(i)}</b>`;
            } else {
                e = r.friendlyNumber(i);
            }
            l.add(h, s, e);
        }
        if (s.views.colorRanges.showRangeCounts && i > 0) {
            a.addClass(h, "color-range-line-count");
            const e = a.createWithHTML(h, "div", "count", r.friendlyNumber(i));
            if (s.views.colorRanges.showRangeCountPercentages) {
                a.createWithHTML(e, "div", "percentage", `${(i / f * 100).toFixed(s.percentageDecimalPoints)}%`);
            }
        }
        if (o.definedFunction(s.events.onColorRangeClick)) {
            h.onclick = () => c.customEvent(s.events.onColorRangeClick, s._currentView.element, p, i, s._currentView.activeYear);
        } else if (o.definedFunction(s.events.onColorRangeDblClick)) {
            h.ondblclick = () => c.customEvent(s.events.onColorRangeDblClick, p, i, s._currentView.activeYear);
        } else {
            a.addClass(h, "no-hover");
        }
        if (o.defined(p) && w.isVisible(s, p.id)) {
            if (o.definedString(p.colorRangeCssClassName)) {
                a.addClass(h, p.colorRangeCssClassName);
            } else {
                a.addClass(h, p.cssClassName);
            }
        }
        if (s.views.colorRanges.useGradients) {
            a.addGradientEffect(s._currentView.element, h);
        }
        v.setHeight(s, h, m, g);
    }
    function Me(e, t) {
        const n = je(e);
        const i = e._currentView.activeYear;
        const r = t.length;
        const a = {
            types: {},
            largestValue: 0,
            totalValue: 0
        };
        a.types["0"] = 0;
        for (let e = 0; e < r; e++) {
            a.types[t[e].minimum.toString()] = 0;
        }
        for (let r = e.startMonth; r < 12 + e.startMonth; r++) {
            let l = r;
            let c = i;
            if (e.startMonth > 0 && r > 11) {
                l = r - 12;
                c++;
            }
            if (o.monthVisible(e.views.colorRanges.monthsToShow, l)) {
                const i = s.getTotalDaysInMonth(c, l);
                for (let r = 0; r < i; r++) {
                    const i = s.toStorageDate(new Date(c, l, r + 1));
                    if (Object.prototype.hasOwnProperty.call(n, i)) {
                        const u = new Date(c, l, r + 1);
                        const d = s.getWeekdayNumber(u) + 1;
                        if (!o.holiday(e, u).matched && o.dayVisible(e.views.colorRanges.daysToShow, d)) {
                            const r = w.get(e, t, n[i]);
                            const s = o.defined(r) ? r.minimum.toString() : "0";
                            a.types[s]++;
                            a.totalValue++;
                            a.largestValue = Math.max(a.largestValue, a.types[s]);
                        }
                    }
                }
            }
        }
        return a;
    }
    function Oe(e) {
        const t = a.create(e._currentView.element, "div", "guide");
        const n = a.create(t, "div", "map-types");
        const i = He(e);
        if (_[e._currentView.element.id].totalTypes > 1) {
            if (o.definedString(e.description.text)) {
                const n = a.create(e._currentView.element, "div", "description", t);
                ke(e, n);
            }
            const r = Object.keys(_[e._currentView.element.id].typeData).sort((e, t) => e.localeCompare(t, void 0, {
                numeric: true,
                sensitivity: "base"
            }));
            const s = r.length;
            for (let t = 0; t < s; t++) {
                const o = r[t];
                if (o !== x.text.unknownTrendText || i > 0) {
                    Be(e, n, o);
                }
            }
            if (e.guide.allowTypeAdding) {
                const t = a.createIconButton(n, "button", "add", "plus");
                l.add(t, e, x.text.addTypeText);
                t.onclick = () => K(e);
            }
        } else {
            ke(e, n);
        }
        if (e.guide.enabled) {
            const n = a.create(t, "div", "map-toggles");
            if (e.guide.showInvertLabel) {
                const t = a.createWithHTML(n, "div", "invert-text", x.text.invertText);
                if (e.guide.colorRangeTogglesEnabled) {
                    t.onclick = () => Qe(e);
                } else {
                    a.addClass(t, "no-click");
                }
            }
            if (e.guide.showLessAndMoreLabels) {
                const t = a.createWithHTML(n, "div", "less-text", x.text.lessText);
                if (e.guide.colorRangeTogglesEnabled) {
                    t.onclick = () => Ke(e, false);
                } else {
                    a.addClass(t, "no-click");
                }
            }
            const o = a.create(n, "div", "toggles");
            const i = w.getAllSorted(e);
            const r = i.length;
            const s = [];
            let l = 0;
            for (let t = 0; t < r; t++) {
                const n = Ne(e, o, i[t]);
                l = Math.max(l, n.offsetWidth);
                s.push(n);
            }
            if (e.guide.showNumbersInGuide) {
                const e = s.length;
                for (let t = 0; t < e; t++) {
                    s[t].style.width = `${l}px`;
                }
            }
            if (e.guide.showLessAndMoreLabels) {
                const t = a.createWithHTML(n, "div", "more-text", x.text.moreText);
                if (e.guide.colorRangeTogglesEnabled) {
                    t.onclick = () => Ke(e, true);
                } else {
                    a.addClass(t, "no-click");
                }
            }
        }
    }
    function Be(e, t, n) {
        const o = a.createButton(t, "button", "type", n);
        if (e.guide.allowTypeRemoving) {
            const t = a.create(o, "span", "clear");
            l.add(t, e, x.text.removeTypeText);
            t.onclick = t => {
                a.cancelBubble(t);
                Ue(e, n);
                O(e, true);
            };
        }
        if (e._currentView.activeType === n) {
            a.addClass(o, "active");
        }
        o.onclick = () => {
            if (e._currentView.activeType !== n) {
                e._currentView.activeType = n;
                c.customEvent(e.events.onTypeSwitch, e._currentView.element, n);
                O(e);
            }
        };
    }
    function Ne(e, t, o) {
        const i = a.create(t, "div");
        i.className = "toggle";
        i.setAttribute(n.Attribute.Area.ColorRangeToggle.HEAT_JS_MINIMUM, o.minimum.toString());
        if (e.guide.showToolTips) {
            l.add(i, e, o.tooltipText);
        }
        if (w.isVisible(e, o.id)) {
            a.addClass(i, w.getGuideCssClassName(e, o));
        }
        if (e.guide.showNumbersInGuide) {
            a.addClass(i, "toggle-number");
            i.innerHTML = `${o.minimum}${"+"}`;
        }
        if (e.guide.colorRangeTogglesEnabled) {
            i.onclick = () => et(e, o.id);
        } else {
            a.addClass(i, "no-hover");
        }
        return i;
    }
    function ke(e, t) {
        if (o.definedString(e.description.text)) {
            if (o.definedString(e.description.url)) {
                const n = a.createWithHTML(t, "a", "label", e.description.text);
                n.href = e.description.url;
                n.target = e.description.urlTarget;
            } else {
                a.createWithHTML(t, "span", "label", e.description.text);
            }
        }
    }
    function Le(e, t, n) {
        if (e.zooming.enabled) {
            const i = a.create(t, "div", "zooming");
            if (e.zooming.showCloseButton) {
                const t = a.create(i, "div", "zoom-close-button");
                l.add(t, e, x.text.closeButtonText);
                t.onclick = () => {
                    e.zooming.enabled = false;
                    e._currentView.mapContents.style.paddingRight = "0px";
                    i.parentNode.removeChild(i);
                };
            }
            const s = a.createIconButton(i, "button", "zoom-out", "minus");
            const c = a.createWithHTML(i, "span", "zoom-level", `+${r.friendlyNumber(e._currentView.zoomLevel * 10)}%`);
            const u = a.createIconButton(i, "button", "zoom-in", "plus");
            const w = a.getStyleValueByName(document.documentElement, d.Variables.Spacing, true);
            l.add(u, e, x.text.zoomInText);
            l.add(s, e, x.text.zoomOutText);
            i.style.bottom = t.offsetHeight - n.offsetHeight + "px";
            if (e._currentView.zoomLevel === -1) {
                e._currentView.zoomLevel = 0;
                c.innerText = `+${r.friendlyNumber(e._currentView.zoomLevel * 10)}%`;
            }
            if (o.defined(e._currentView.mapContents)) {
                e._currentView.mapContents.style.paddingRight = `${i.offsetWidth + w}px`;
            }
            s.disabled = e._currentView.zoomLevel === 0;
            s.onclick = () => Re(e);
            u.disabled = e.zooming.maximumLevel > 0 && e._currentView.zoomLevel >= e.zooming.maximumLevel;
            u.onclick = () => Ie(e);
        }
    }
    function Ae(e) {
        const t = a.getStyleValueByNameSizingMetic(document.documentElement, d.Variables.DaySize);
        const n = a.getStyleValueByNameSizingMetic(document.documentElement, d.Variables.LineWidth);
        let o = a.getStyleValueByName(document.documentElement, d.Variables.DaySize, true);
        let i = a.getStyleValueByName(document.documentElement, d.Variables.LineWidth, true);
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
            e._currentView.element.style.setProperty(d.Variables.DaySize, `${o}${t}`);
            e._currentView.element.style.setProperty(d.Variables.LineWidth, `${i}${n}`);
        }
    }
    function Re(e) {
        if (e._currentView.zoomLevel > 0) {
            const t = a.getStyleValueByNameSizingMetic(document.documentElement, d.Variables.DaySize);
            const n = a.getStyleValueByNameSizingMetic(document.documentElement, d.Variables.LineWidth);
            let o = a.getStyleValueByName(e._currentView.element, d.Variables.DaySize, true);
            let i = a.getStyleValueByName(e._currentView.element, d.Variables.LineWidth, true);
            o -= e._currentView.mapZoomIncrement;
            o = parseFloat(o.toFixed(1));
            i -= e._currentView.lineZoomIncrement;
            i = parseFloat(i.toFixed(1));
            e._currentView.zoomLevel--;
            e._currentView.element.style.setProperty(d.Variables.DaySize, `${o}${t}`);
            e._currentView.element.style.setProperty(d.Variables.LineWidth, `${i}${n}`);
            e._currentView.dayWidth = 0;
            c.customEvent(e.events.onZoomLevelChange, e._currentView.element, e._currentView.zoomLevel);
            O(e, false, false, true);
        }
    }
    function Ie(e) {
        if (e.zooming.maximumLevel === 0 || e._currentView.zoomLevel < e.zooming.maximumLevel) {
            const t = a.getStyleValueByNameSizingMetic(document.documentElement, d.Variables.DaySize);
            const n = a.getStyleValueByNameSizingMetic(document.documentElement, d.Variables.LineWidth);
            let o = a.getStyleValueByName(e._currentView.element, d.Variables.DaySize, true);
            let i = a.getStyleValueByName(e._currentView.element, d.Variables.LineWidth, true);
            o += e._currentView.mapZoomIncrement;
            o = parseFloat(o.toFixed(1));
            i += e._currentView.lineZoomIncrement;
            i = parseFloat(i.toFixed(1));
            e._currentView.zoomLevel++;
            e._currentView.element.style.setProperty(d.Variables.DaySize, `${o}${t}`);
            e._currentView.element.style.setProperty(d.Variables.LineWidth, `${i}${n}`);
            e._currentView.dayWidth = 0;
            c.customEvent(e.events.onZoomLevelChange, e._currentView.element, e._currentView.zoomLevel);
            O(e, false, false, true);
        }
    }
    function Ee(e, t, n, i, a, u, d, w, f, g) {
        if (o.definedFunction(d)) {
            l.add(t, e, c.customEvent(d, e._currentView.element, n, i, w));
        } else {
            let c = s.getCustomFormattedDateText(x, u, n, true);
            if (e.showHolidaysInDayToolTips) {
                const t = o.holiday(e, n);
                if (t.matched && o.definedString(t.name)) {
                    c += `${":"}${" "}${t.name}`;
                }
            }
            if (f || g && o.definedString(a)) {
                c += `${":"}${" "}`;
            }
            if (f) {
                c += `<b class="tooltip-count">${r.friendlyNumber(i)}</b>`;
            }
            if (g && o.definedString(a)) {
                c += `<b class="tooltip-difference">${a}</b>`;
            }
            l.add(t, e, c);
        }
    }
    function Fe(e, t, n) {
        e._currentView.activeView = t;
        c.customEvent(e.events.onViewSwitch, e._currentView.element, n);
        O(e, false, true);
    }
    function $e(e) {
        const t = He(e);
        if (_[e._currentView.element.id].totalTypes > 1) {
            for (const n in _[e._currentView.element.id].typeData) {
                if (n !== x.text.unknownTrendText || t > 0) {
                    if (t === 0 && e._currentView.activeType === x.text.unknownTrendText) {
                        e._currentView.activeType = n;
                    }
                }
            }
        }
    }
    function He(e) {
        let t = 0;
        for (const n in _[e._currentView.element.id].typeData[x.text.unknownTrendText]) {
            if (Object.prototype.hasOwnProperty.call(_[e._currentView.element.id].typeData[x.text.unknownTrendText], n)) {
                t++;
                break;
            }
        }
        return t;
    }
    function Ye(e, t, n = true) {
        _[e] = {
            options: t,
            typeData: {},
            totalTypes: 1
        };
        _[e].typeData[x.text.unknownTrendText] = {};
        if (n && !t._currentView.isInFetchMode) {
            T.load(x, t, _[e]);
        }
    }
    function je(e) {
        return _[e._currentView.element.id].typeData[e._currentView.activeType];
    }
    function We(e) {
        return Object.keys(je(e)).length > 0;
    }
    function Pe(e) {
        let t = [];
        if (e.showOnlyDataForYearsAvailable) {
            const n = je(e);
            for (const e in n) {
                if (Object.prototype.hasOwnProperty.call(n, e)) {
                    const n = parseInt(s.getStorageDateYear(e));
                    if (t.indexOf(n) === -1) {
                        t.push(n);
                    }
                }
            }
        }
        t = t.sort((e, t) => e - t);
        return t;
    }
    function ze(e) {
        const t = e._currentView.activeYear;
        const n = je(e);
        for (let o = e.startMonth; o < 12 + e.startMonth; o++) {
            let i = o;
            let r = t;
            if (e.startMonth > 0 && o > 11) {
                i = o - 12;
                r++;
            }
            const a = s.getTotalDaysInMonth(r, i);
            for (let e = 0; e < a; e++) {
                const t = new Date(r, i, e + 1);
                const o = s.toStorageDate(t);
                if (Object.prototype.hasOwnProperty.call(n, o)) {
                    delete n[o];
                }
            }
        }
        c.customEvent(e.events.onClearViewableData, e._currentView.element);
    }
    function Ue(e, t) {
        delete _[e._currentView.element.id].typeData[t];
        _[e._currentView.element.id].totalTypes--;
        const n = Object.keys(_[e._currentView.element.id].typeData).sort((e, t) => e.localeCompare(t, void 0, {
            numeric: true,
            sensitivity: "base"
        }));
        e._currentView.activeType = n[0];
        c.customEvent(e.events.onRemoveType, e._currentView.element, t);
    }
    function Je(e) {
        let t = 0;
        const n = je(e);
        const i = e._currentView.activeYear;
        for (let r = e.startMonth; r < 12 + e.startMonth; r++) {
            let a = r;
            let l = i;
            if (e.startMonth > 0 && r > 11) {
                a = r - 12;
                l++;
            }
            if (o.monthVisible(e.views.chart.monthsToShow, a)) {
                const i = s.getTotalDaysInMonth(l, a);
                for (let r = 0; r < i; r++) {
                    const i = new Date(l, a, r + 1);
                    const c = s.toStorageDate(i);
                    const u = s.getWeekdayNumber(i) + 1;
                    if (Object.prototype.hasOwnProperty.call(n, c)) {
                        if (o.dayVisible(e.views.chart.daysToShow, u)) {
                            t = Math.max(t, n[c]);
                        }
                    }
                }
            }
        }
        return t;
    }
    function Ge(e, t, n) {
        let o = null;
        if (n > 0) {
            const r = new Date(t);
            r.setFullYear(r.getFullYear() - 1);
            const a = i.getNumber(je(e)[s.toStorageDate(r)], 0);
            if (a > 0) {
                const t = Math.abs(n - a) / ((n + a) / 2) * 100;
                if (t > 0) {
                    o = `${t.toFixed(e.percentageDecimalPoints)}%`;
                    if (n > a) {
                        o = `+${o}`;
                    } else {
                        o = `-${o}`;
                    }
                }
            }
        }
        return o;
    }
    function Ze(e) {
        if (e._currentView.isInFetchMode) {
            if (e._currentView.isInFetchModeTimer === 0) {
                Xe(e);
            }
            if (e._currentView.isInFetchModeTimer === 0) {
                e._currentView.isInFetchModeTimer = setInterval(() => {
                    Xe(e);
                    O(e);
                }, e.dataFetchDelay);
            }
        }
    }
    function Xe(e) {
        const t = e._currentView.element.id;
        const n = c.customEvent(e.events.onDataFetch, e._currentView.element, t);
        if (o.definedObject(n)) {
            Ye(t, e, false);
            for (const e in n) {
                if (Object.prototype.hasOwnProperty.call(n, e)) {
                    if (!Object.prototype.hasOwnProperty.call(_[t].typeData[x.text.unknownTrendText], e)) {
                        _[t].typeData[x.text.unknownTrendText][e] = 0;
                    }
                    _[t].typeData[x.text.unknownTrendText][e] += n[e];
                }
            }
        }
    }
    function qe() {
        for (const e in _) {
            if (Object.prototype.hasOwnProperty.call(_, e)) {
                const t = _[e].options;
                B(t, false);
                if (o.defined(t._currentView.isInFetchModeTimer)) {
                    clearInterval(t._currentView.isInFetchModeTimer);
                    t._currentView.isInFetchModeTimer = 0;
                }
            }
        }
        if (x.observationMode && o.defined(C)) {
            C.disconnect();
            C = null;
        }
    }
    function Ke(e, t) {
        let n = false;
        if (e.guide.useIncrementToggles) {
            const o = w.getAllSorted(e);
            const i = o.length;
            if (t) {
                for (let r = 0; r < i; r++) {
                    const i = o[r];
                    if (!i.visible) {
                        i.visible = true;
                        n = tt(e, i);
                        c.customEvent(e.events.onColorRangeTypeToggle, e._currentView.element, i.id, t);
                        break;
                    }
                }
            } else {
                for (let r = i; r--; ) {
                    const i = o[r];
                    if (i.visible) {
                        i.visible = false;
                        n = tt(e, i);
                        c.customEvent(e.events.onColorRangeTypeToggle, e._currentView.element, i.id, t);
                        break;
                    }
                }
            }
        } else {
            const o = e.colorRanges.length;
            for (let i = 0; i < o; i++) {
                const o = e.colorRanges[i];
                o.visible = t;
                n = tt(e, o);
                c.customEvent(e.events.onColorRangeTypeToggle, e._currentView.element, o.id, t);
            }
        }
        if (n) {
            O(e, false, false, true);
        }
    }
    function Qe(e) {
        const t = e.colorRanges.length;
        let n = false;
        for (let o = 0; o < t; o++) {
            const t = e.colorRanges[o];
            t.visible = !t.visible;
            n = tt(e, t);
            c.customEvent(e.events.onColorRangeTypeToggle, e._currentView.element, e.colorRanges[o].id, e.colorRanges[o].visible);
        }
        if (n) {
            O(e);
        }
    }
    function et(e, t) {
        const n = e.colorRanges.length;
        for (let o = 0; o < n; o++) {
            const n = e.colorRanges[o];
            if (n.id === t) {
                n.visible = !i.getBoolean(n.visible, true);
                if (tt(e, n)) {
                    O(e, false, false, true);
                }
                c.customEvent(e.events.onColorRangeTypeToggle, e._currentView.element, n.id, n.visible);
                break;
            }
        }
    }
    function tt(e, t) {
        let o = false;
        if (e._currentView.activeView === 1) {
            nt(e, t, t.mapCssClassName, n.Attribute.View.Map.HEAT_JS_MINIMUM);
        } else if (e._currentView.activeView === 2) {
            nt(e, t, t.lineCssClassName, n.Attribute.View.Line.HEAT_JS_MINIMUM);
        } else if (e._currentView.activeView === 3) {
            nt(e, t, t.chartCssClassName, n.Attribute.View.Chart.HEAT_JS_MINIMUM);
        } else if (e._currentView.activeView === 6) {
            nt(e, t, t.colorRangeCssClassName, n.Attribute.View.ColorRanges.HEAT_JS_MINIMUM);
        } else {
            o = true;
        }
        return o;
    }
    function nt(e, t, i, r) {
        const s = o.definedString(i) ? i : t.cssClassName;
        const l = e._currentView.element.getElementsByTagName("div");
        const c = [].slice.call(l);
        const u = c.length;
        for (let e = 0; e < u; e++) {
            const i = c[e];
            const l = i.getAttribute(r);
            const u = i.getAttribute(n.Attribute.Area.ColorRangeToggle.HEAT_JS_MINIMUM);
            const d = o.definedString(l) && l === t.minimum.toString();
            if (d || u === t.minimum.toString()) {
                if (t.visible) {
                    a.addClass(i, s);
                } else {
                    a.removeClass(i, s);
                }
            }
        }
    }
    function ot(e, t = true) {
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
            O(e);
            if (t) {
                c.customEvent(e.events.onBackYear, e._currentView.element, e._currentView.activeYear);
            }
        }
    }
    function it(e, t = true) {
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
            O(e);
            if (t) {
                c.customEvent(e.events.onNextYear, e._currentView.element, e._currentView.activeYear);
            }
        }
    }
    function rt(e) {
        e._currentView.element.innerHTML = "";
        if (e._currentView.isInFetchMode && o.defined(e._currentView.isInFetchModeTimer)) {
            clearInterval(e._currentView.isInFetchModeTimer);
        }
        a.removeClass(e._currentView.element, "heat-js");
        l.remove(e);
        c.customEvent(e.events.onDestroy, e._currentView.element);
    }
    function st() {
        if (x.observationMode) {
            if (!o.defined(C)) {
                C = new MutationObserver(() => {
                    at.renderAll();
                });
                const e = {
                    attributes: true,
                    childList: true,
                    subtree: true
                };
                C.observe(document.body, e);
            }
        } else {
            C.disconnect();
            C = null;
        }
    }
    const at = {
        addType: function(e, t, n = true) {
            if (o.definedString(e) && o.definedString(t) && Object.prototype.hasOwnProperty.call(_, e)) {
                const o = _[e].options;
                if (!o._currentView.isInFetchMode && !Object.prototype.hasOwnProperty.call(_[e].typeData, t)) {
                    if (!Object.prototype.hasOwnProperty.call(_[e].typeData, t)) {
                        _[e].typeData[t] = {};
                        _[e].totalTypes++;
                    }
                    c.customEvent(o.events.onAddType, o._currentView.element, t);
                    if (n) {
                        O(o, true);
                    }
                }
            }
            return at;
        },
        removeType: function(e, t, n = true) {
            if (o.definedString(e) && o.definedString(t) && Object.prototype.hasOwnProperty.call(_, e)) {
                const o = _[e].options;
                if (!o._currentView.isInFetchMode && !Object.prototype.hasOwnProperty.call(_[e].typeData, t)) {
                    Ue(o, t);
                    if (n) {
                        O(o, true);
                    }
                }
            }
            return at;
        },
        addDates: function(e, t, n = null, r = true) {
            if (o.definedString(e) && o.definedArray(t) && Object.prototype.hasOwnProperty.call(_, e)) {
                const o = _[e].options;
                if (!o._currentView.isInFetchMode) {
                    n = i.getString(n, x.text.unknownTrendText);
                    const s = t.length;
                    for (let o = 0; o < s; o++) {
                        at.addDate(e, t[o], n, false);
                    }
                    if (r) {
                        O(o, true);
                    }
                }
            }
            return at;
        },
        addDate: function(e, t, n = null, r = true) {
            if (o.definedString(e) && o.definedDate(t) && Object.prototype.hasOwnProperty.call(_, e)) {
                const o = _[e].options;
                if (!o._currentView.isInFetchMode) {
                    n = i.getString(n, x.text.unknownTrendText);
                    const a = s.toStorageDate(t);
                    if (!Object.prototype.hasOwnProperty.call(_[e].typeData, n)) {
                        _[e].typeData[n] = {};
                        _[e].totalTypes++;
                    }
                    if (!Object.prototype.hasOwnProperty.call(_[e].typeData[n], a)) {
                        _[e].typeData[n][a] = 0;
                    }
                    _[e].typeData[n][a]++;
                    c.customEvent(o.events.onAdd, o._currentView.element);
                    if (r) {
                        O(o, true);
                    }
                }
            }
            return at;
        },
        updateDate: function(e, t, n, r = null, a = true) {
            if (o.definedString(e) && o.definedDate(t) && Object.prototype.hasOwnProperty.call(_, e)) {
                const o = _[e].options;
                if (!o._currentView.isInFetchMode && n > 0) {
                    const l = s.toStorageDate(t);
                    if (Object.prototype.hasOwnProperty.call(_[e].typeData, r)) {
                        r = i.getString(r, x.text.unknownTrendText);
                        _[e].typeData[r][l] = n;
                        c.customEvent(o.events.onUpdate, o._currentView.element);
                        if (a) {
                            O(o, true);
                        }
                    }
                }
            }
            return at;
        },
        removeDates: function(e, t, n = null, r = true) {
            if (o.definedString(e) && o.definedArray(t) && Object.prototype.hasOwnProperty.call(_, e)) {
                const o = _[e].options;
                if (!o._currentView.isInFetchMode) {
                    n = i.getString(n, x.text.unknownTrendText);
                    const s = t.length;
                    for (let o = 0; o < s; o++) {
                        at.removeDate(e, t[o], n, false);
                    }
                    if (r) {
                        O(o, true);
                    }
                }
            }
            return at;
        },
        removeDate: function(e, t, n = null, r = true) {
            if (o.definedString(e) && o.definedDate(t) && Object.prototype.hasOwnProperty.call(_, e)) {
                const o = _[e].options;
                if (!o._currentView.isInFetchMode) {
                    const a = s.toStorageDate(t);
                    if (Object.prototype.hasOwnProperty.call(_[e].typeData, n) && Object.prototype.hasOwnProperty.call(_[e].typeData[n], a)) {
                        n = i.getString(n, x.text.unknownTrendText);
                        if (_[e].typeData[n][a] > 0) {
                            _[e].typeData[n][a]--;
                        }
                        c.customEvent(o.events.onRemove, o._currentView.element);
                        if (r) {
                            O(o, true);
                        }
                    }
                }
            }
            return at;
        },
        clearDate: function(e, t, n = null, r = true) {
            if (o.definedString(e) && o.definedDate(t) && Object.prototype.hasOwnProperty.call(_, e)) {
                const o = _[e].options;
                if (!o._currentView.isInFetchMode) {
                    const a = s.toStorageDate(t);
                    if (Object.prototype.hasOwnProperty.call(_[e].typeData, n) && Object.prototype.hasOwnProperty.call(_[e].typeData[n], a)) {
                        n = i.getString(n, x.text.unknownTrendText);
                        delete _[e].typeData[n][a];
                        c.customEvent(o.events.onClear, o._currentView.element);
                        if (r) {
                            O(o, true);
                        }
                    }
                }
            }
            return at;
        },
        resetAll: function(e = true) {
            for (const t in _) {
                if (Object.prototype.hasOwnProperty.call(_, t)) {
                    at.reset(t, e);
                }
            }
            return at;
        },
        reset: function(e, t = true) {
            if (o.definedString(e) && Object.prototype.hasOwnProperty.call(_, e)) {
                const n = _[e].options;
                if (!n._currentView.isInFetchMode) {
                    n._currentView.activeType = x.text.unknownTrendText;
                    Ye(e, n, false);
                    c.customEvent(n.events.onReset, n._currentView.element);
                    if (t) {
                        O(n, true);
                    }
                }
            }
            return at;
        },
        import: function(e, t = null) {
            if (o.definedString(e) && Object.prototype.hasOwnProperty.call(_, e)) {
                if (o.definedArray(t)) {
                    X(t, _[e].options);
                } else {
                    J(_[e].options);
                }
            }
            return at;
        },
        export: function(e, t = null) {
            if (o.definedString(e) && Object.prototype.hasOwnProperty.call(_, e)) {
                const n = _[e].options;
                Y(n, t, null, n.exportOnlyDataBeingViewed);
            }
            return at;
        },
        refresh: function(e) {
            if (o.definedString(e) && Object.prototype.hasOwnProperty.call(_, e)) {
                const t = _[e].options;
                O(t, true);
                c.customEvent(t.events.onRefresh, t._currentView.element);
            }
            return at;
        },
        refreshAll: function() {
            for (const e in _) {
                if (Object.prototype.hasOwnProperty.call(_, e)) {
                    const t = _[e].options;
                    O(t, true);
                    c.customEvent(t.events.onRefresh, t._currentView.element);
                }
            }
            return at;
        },
        setYear: function(e, t) {
            if (o.definedString(e) && o.definedNumber(t) && Object.prototype.hasOwnProperty.call(_, e)) {
                const n = _[e].options;
                n._currentView.activeYear = t;
                if (!o.yearVisible(n, n._currentView.activeYear)) {
                    it(n, false);
                } else {
                    O(n);
                }
                c.customEvent(n.events.onSetYear, n._currentView.element, n._currentView.activeYear);
            }
            return at;
        },
        setYearToHighest: function(e) {
            if (o.definedString(e) && Object.prototype.hasOwnProperty.call(_, e)) {
                const t = _[e].options;
                const n = je(t);
                let i = 0;
                for (const e in n) {
                    if (Object.prototype.hasOwnProperty.call(n, e)) {
                        i = Math.max(i, parseInt(s.getStorageDateYear(e)));
                    }
                }
                if (i > 0) {
                    t._currentView.activeYear = i;
                    if (!o.yearVisible(t, t._currentView.activeYear)) {
                        it(t, false);
                    } else {
                        O(t);
                    }
                    c.customEvent(t.events.onSetYear, t._currentView.element, t._currentView.activeYear);
                }
            }
            return at;
        },
        setYearToLowest: function(e) {
            if (o.definedString(e) && Object.prototype.hasOwnProperty.call(_, e)) {
                const t = _[e].options;
                const n = je(t);
                let i = 9999;
                for (const e in n) {
                    if (Object.prototype.hasOwnProperty.call(n, e)) {
                        i = Math.min(i, parseInt(s.getStorageDateYear(e)));
                    }
                }
                if (i < 9999) {
                    t._currentView.activeYear = i;
                    if (!o.yearVisible(t, t._currentView.activeYear)) {
                        ot(t, false);
                    } else {
                        O(t);
                    }
                    c.customEvent(t.events.onSetYear, t._currentView.element, t._currentView.activeYear);
                }
            }
            return at;
        },
        moveToPreviousYear: function(e) {
            if (o.definedString(e) && Object.prototype.hasOwnProperty.call(_, e)) {
                ot(_[e].options);
            }
            return at;
        },
        moveToNextYear: function(e) {
            if (o.definedString(e) && Object.prototype.hasOwnProperty.call(_, e)) {
                it(_[e].options);
            }
            return at;
        },
        moveToCurrentYear: function(e) {
            if (o.definedString(e) && Object.prototype.hasOwnProperty.call(_, e)) {
                const t = _[e].options;
                t._currentView.activeYear = (new Date).getFullYear();
                if (!o.yearVisible(t, t._currentView.activeYear)) {
                    it(t, false);
                } else {
                    O(t);
                }
                c.customEvent(t.events.onSetYear, t._currentView.element, t._currentView.activeYear);
            }
            return at;
        },
        getYear: function(e) {
            let t = -1;
            if (o.definedString(e) && Object.prototype.hasOwnProperty.call(_, e)) {
                t = _[e].options._currentView.activeYear;
            }
            return t;
        },
        render: function(e, t) {
            if (o.definedObject(e) && o.definedObject(t)) {
                M(f.Options.getForNewInstance(x, t, e));
            }
            return at;
        },
        renderAll: function() {
            D();
            return at;
        },
        switchView: function(e, t) {
            if (o.definedString(e) && o.definedString(t) && Object.prototype.hasOwnProperty.call(_, e)) {
                const n = _[e].options;
                const o = m.View.get(t);
                if (o !== 0 && n._currentView.activeView !== o) {
                    Fe(n, o, t);
                }
            }
            return at;
        },
        switchType: function(e, t) {
            if (o.definedString(e) && o.definedString(t) && Object.prototype.hasOwnProperty.call(_, e) && Object.prototype.hasOwnProperty.call(_[e].typeData, t)) {
                const n = _[e].options;
                if (n._currentView.activeType !== t) {
                    n._currentView.activeType = t;
                    c.customEvent(n.events.onTypeSwitch, n._currentView.element, t);
                    O(n);
                }
            }
            return at;
        },
        updateOptions: function(e, t) {
            if (o.definedString(e) && o.definedObject(t) && Object.prototype.hasOwnProperty.call(_, e)) {
                const t = _[e].options;
                const n = f.Options.get(t);
                let o = false;
                for (const e in n) {
                    if (Object.prototype.hasOwnProperty.call(n, e) && Object.prototype.hasOwnProperty.call(t, e) && t[e] !== n[e]) {
                        t[e] = n[e];
                        o = true;
                    }
                }
                if (o) {
                    O(t, true);
                    c.customEvent(t.events.onRefresh, t._currentView.element);
                    c.customEvent(t.events.onOptionsUpdate, t._currentView.element, t);
                }
            }
            return at;
        },
        getActiveView: function(e) {
            let t = "";
            if (o.definedString(e) && Object.prototype.hasOwnProperty.call(_, e)) {
                t = m.View.getName(_[e].options);
            }
            return t;
        },
        destroyAll: function() {
            for (const e in _) {
                if (Object.prototype.hasOwnProperty.call(_, e)) {
                    rt(_[e].options);
                }
            }
            _ = {};
            return at;
        },
        destroy: function(e) {
            if (o.definedString(e) && Object.prototype.hasOwnProperty.call(_, e)) {
                rt(_[e].options);
                delete _[e];
            }
            return at;
        },
        setConfiguration: function(e, t = true) {
            if (o.definedObject(e)) {
                const n = x;
                const o = e;
                let i = false;
                for (const e in o) {
                    if (Object.prototype.hasOwnProperty.call(o, e) && Object.prototype.hasOwnProperty.call(x, e) && n[e] !== o[e]) {
                        n[e] = o[e];
                        i = true;
                    }
                }
                if (i) {
                    x = g.Options.get(n);
                    st();
                    if (t) {
                        at.refreshAll();
                    }
                }
            }
            return at;
        },
        getIds: function() {
            const e = [];
            for (const t in _) {
                if (Object.prototype.hasOwnProperty.call(_, t)) {
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
        x = g.Options.get();
        document.addEventListener("DOMContentLoaded", () => {
            st();
            D();
        });
        window.addEventListener("pagehide", () => qe());
        if (!o.defined(window.$heat)) {
            window.$heat = at;
        }
    })();
})();//# sourceMappingURL=heat.esm.js.map