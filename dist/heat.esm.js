var __getOwnPropNames = Object.getOwnPropertyNames;

var __esm = (e, t) => function n() {
    return e && (t = (0, e[__getOwnPropNames(e)[0]])(e = 0)), t;
};

var __commonJS = (e, t) => function n() {
    return t || (0, e[__getOwnPropNames(e)[0]])((t = {
        exports: {}
    }).exports, t), t.exports;
};

var init_enum = __esm({
    "src/ts/enum.ts"() {}
});

var Constants;

var init_constant = __esm({
    "src/ts/constant.ts"() {
        (e => {
            e.HEAT_JS_ATTRIBUTE_NAME = "data-heat-js";
        })(Constants || (Constants = {}));
    }
});

var Is;

var init_is = __esm({
    "src/ts/is.ts"() {
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
            function a(e) {
                return t(e) && typeof e === "function";
            }
            e.definedFunction = a;
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
            function u(e, t = 1) {
                return !s(e) || e.length < t;
            }
            e.invalidOptionArray = u;
        })(Is || (Is = {}));
    }
});

var Data;

var init_data = __esm({
    "src/ts/data.ts"() {
        init_enum();
        init_is();
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
                function i(e, t) {
                    return e.substring(0, t.length).toLowerCase() === t.toLowerCase();
                }
                e.startsWithAnyCase = i;
            })(t = e.String || (e.String = {}));
            function n(e, t) {
                return typeof e === "string" ? e : t;
            }
            e.getDefaultAnyString = n;
            function i(e, t) {
                return Is.definedString(e) ? e : t;
            }
            e.getDefaultString = i;
            function o(e, t) {
                return Is.definedBoolean(e) ? e : t;
            }
            e.getDefaultBoolean = o;
            function a(e, t) {
                return Is.definedNumber(e) ? e : t;
            }
            e.getDefaultNumber = a;
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
            function u(e, t) {
                let n = t;
                if (Is.definedString(e)) {
                    const i = e.toString().split(" ");
                    if (i.length === 0) {
                        e = t;
                    } else {
                        n = i;
                    }
                } else {
                    n = s(e, t);
                }
                return n;
            }
            e.getDefaultStringOrArray = u;
        })(Data || (Data = {}));
    }
});

var DomElement;

var init_dom = __esm({
    "src/ts/dom.ts"() {
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
                const a = o === "text";
                let r = a ? document.createTextNode("") : document.createElement(o);
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
            function i(e, t, i, o, a = null) {
                const r = n(e, t, i, a);
                r.innerHTML = o;
                return r;
            }
            e.createWithHTML = i;
            function o(e, t, n = false) {
                let i = null;
                if (document.defaultView.getComputedStyle) {
                    i = document.defaultView.getComputedStyle(e, null).getPropertyValue(t);
                } else if (e.currentStyle) {
                    i = e.currentStyle[t];
                }
                if (n) {
                    i = parseFloat(i);
                }
                return i;
            }
            e.getStyleValueByName = o;
            function a(e, t) {
                e.className += " " + t;
                e.className = e.className.trim();
            }
            e.addClass = a;
            function r(e, t) {
                e.className = e.className.replace(t, "");
                e.className = e.className.trim();
            }
            e.removeClass = r;
            function s(e) {
                e.preventDefault();
                e.cancelBubble = true;
            }
            e.cancelBubble = s;
            function l() {
                const e = document.documentElement;
                const t = (window.pageXOffset || e.scrollLeft) - (e.clientLeft || 0);
                const n = (window.pageYOffset || e.scrollTop) - (e.clientTop || 0);
                return {
                    left: t,
                    top: n
                };
            }
            e.getScrollPosition = l;
            function u(e, t) {
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
                t.style.left = n + "px";
                t.style.top = i + "px";
            }
            e.showElementAtMousePosition = u;
            function c(e) {
                const t = e.children;
                let n = t.length - 1;
                for (;n--; ) {
                    e.appendChild(t[n]);
                }
            }
            e.reverseChildrenOrder = c;
            function d(e, t, o = null, a = null) {
                const r = n(e, "div");
                const s = n(r, "label", "checkbox");
                const l = n(s, "input");
                l.type = "checkbox";
                if (Is.defined(a)) {
                    l.onclick = a;
                }
                if (Is.defined(o)) {
                    l.checked = o;
                }
                n(s, "span", "check-mark");
                i(s, "span", "text", t);
                return {
                    input: l,
                    label: s
                };
            }
            e.createCheckBox = d;
        })(DomElement || (DomElement = {}));
    }
});

var DateTime;

var init_datetime = __esm({
    "src/ts/datetime.ts"() {
        init_data();
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
                let n = e.thText;
                if (t === 31 || t === 21 || t === 1) {
                    n = e.stText;
                } else if (t === 22 || t === 2) {
                    n = e.ndText;
                } else if (t === 23 || t === 3) {
                    n = e.rdText;
                }
                return n;
            }
            e.getDayOrdinal = i;
            function o(e, t, o) {
                let a = t;
                const r = n(o);
                a = a.replace("{dddd}", e.dayNames[r]);
                a = a.replace("{dd}", Data.String.padNumber(o.getDate()));
                a = a.replace("{d}", o.getDate().toString());
                a = a.replace("{o}", i(e, o.getDate()));
                a = a.replace("{mmmm}", e.monthNames[o.getMonth()]);
                a = a.replace("{mm}", Data.String.padNumber(o.getMonth() + 1));
                a = a.replace("{m}", (o.getMonth() + 1).toString());
                a = a.replace("{yyyy}", o.getFullYear().toString());
                a = a.replace("{yyy}", o.getFullYear().toString().substring(1));
                a = a.replace("{yy}", o.getFullYear().toString().substring(2));
                a = a.replace("{y}", parseInt(o.getFullYear().toString().substring(2)).toString());
                return a;
            }
            e.getCustomFormattedDateText = o;
        })(DateTime || (DateTime = {}));
    }
});

var require_heat = __commonJS({
    "src/heat.ts"(exports, module) {
        init_enum();
        init_constant();
        init_is();
        init_data();
        init_dom();
        init_datetime();
        (() => {
            let _configuration = {};
            let _elements_Day_Width = 0;
            let _elements_DateCounts = {};
            const _internal_Name_Holiday = "HOLIDAY";
            const _local_Storage_Start_ID = "HJS_";
            const _default_MonthsToShow = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
            const _default_DaysToShow = [ 1, 2, 3, 4, 5, 6, 7 ];
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
                if (Is.defined(e) && e.hasAttribute(Constants.HEAT_JS_ATTRIBUTE_NAME)) {
                    const n = e.getAttribute(Constants.HEAT_JS_ATTRIBUTE_NAME);
                    if (Is.definedString(n)) {
                        const i = getObjectFromString(n);
                        if (i.parsed && Is.definedObject(i.object)) {
                            renderControl(renderBindingOptions(i.object, e));
                        } else {
                            if (!_configuration.safeMode) {
                                console.error(_configuration.attributeNotValidErrorText.replace("{{attribute_name}}", Constants.HEAT_JS_ATTRIBUTE_NAME));
                                t = false;
                            }
                        }
                    } else {
                        if (!_configuration.safeMode) {
                            console.error(_configuration.attributeNotSetErrorText.replace("{{attribute_name}}", Constants.HEAT_JS_ATTRIBUTE_NAME));
                            t = false;
                        }
                    }
                }
                return t;
            }
            function renderBindingOptions(e, t) {
                const n = buildAttributeOptions(e);
                const i = !Is.definedString(n.view) ? "" : n.view.toLowerCase();
                let o = {};
                o.element = t;
                o.disabledBackground = null;
                o.configurationDialog = null;
                o.dayCheckBoxes = [];
                o.monthCheckBoxes = [];
                o.tooltip = null;
                o.tooltipTimer = 0;
                o.mapContents = null;
                o.mapContentsScrollLeft = 0;
                o.year = n.year;
                o.type = _configuration.unknownTrendText;
                o.isInFetchMode = Is.definedFunction(n.events.onDataFetch);
                o.isInFetchModeTimer = 0;
                o.yearsAvailable = [];
                if (n.views.chart.enabled) {
                    o.chartContents = null;
                    o.chartContentsScrollLeft = 0;
                }
                if (n.views.days.enabled) {
                    o.daysContents = null;
                    o.daysContentsScrollLeft = 0;
                }
                if (n.views.statistics.enabled) {
                    o.statisticsContents = null;
                    o.statisticsContentsScrollLeft = 0;
                }
                if (i === "map") {
                    o.view = 1;
                } else if (i === "chart") {
                    o.view = 2;
                } else if (i === "days") {
                    o.view = 3;
                } else if (i === "statistics") {
                    o.view = 4;
                } else {
                    o.view = 1;
                }
                n._currentView = o;
                return n;
            }
            function renderControl(e) {
                fireCustomTriggerEvent(e.events.onBeforeRender, e._currentView.element);
                if (!Is.definedString(e._currentView.element.id)) {
                    e._currentView.element.id = Data.String.newGuid();
                }
                if (e._currentView.element.className.trim() === "") {
                    e._currentView.element.className = "heat-js";
                } else {
                    DomElement.addClass(e._currentView.element, "heat-js");
                }
                e._currentView.element.removeAttribute(Constants.HEAT_JS_ATTRIBUTE_NAME);
                createDateStorageForElement(e._currentView.element.id, e);
                renderControlContainer(e);
                fireCustomTriggerEvent(e.events.onRenderComplete, e._currentView.element);
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
                hideToolTip(e);
                startDataPullTimer(e);
                if (e.title.showConfigurationButton) {
                    renderDisabledBackground(e);
                    renderConfigurationDialog(e);
                }
                renderControlToolTip(e);
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
                const a = DomElement.create(n, "div", "side-container panel");
                DomElement.createWithHTML(t, "span", "dialog-title-bar-text", _configuration.configurationTitleText);
                DomElement.createWithHTML(o, "div", "side-container-title-text", _configuration.visibleDaysText + ":");
                DomElement.createWithHTML(a, "div", "side-container-title-text", _configuration.visibleMonthsText + ":");
                const r = DomElement.create(a, "div", "side-container");
                const s = DomElement.create(a, "div", "side-container");
                i.onclick = () => {
                    hideConfigurationDialog(e);
                };
                for (let t = 0; t < 7; t++) {
                    e._currentView.dayCheckBoxes[t] = DomElement.createCheckBox(o, _configuration.dayNames[t]).input;
                }
                for (let t = 0; t < 7; t++) {
                    e._currentView.monthCheckBoxes[t] = DomElement.createCheckBox(r, _configuration.monthNames[t]).input;
                }
                for (let t = 7; t < 12; t++) {
                    e._currentView.monthCheckBoxes[t] = DomElement.createCheckBox(s, _configuration.monthNames[t]).input;
                }
                addToolTip(i, e, _configuration.closeToolTipText);
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
                hideToolTip(e);
            }
            function hideConfigurationDialog(e) {
                hideDisabledBackground(e);
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
                    fireCustomTriggerEvent(e.events.onOptionsUpdate, e._currentView.element, e);
                } else {
                    hideToolTip(e);
                }
            }
            function renderControlToolTip(e) {
                if (!Is.defined(e._currentView.tooltip)) {
                    e._currentView.tooltip = DomElement.create(document.body, "div", "heat-js-tooltip");
                    e._currentView.tooltip.style.display = "none";
                    assignToolTipEvents(e);
                }
            }
            function assignToolTipEvents(e, t = true) {
                let n = t ? window.addEventListener : window.removeEventListener;
                let i = t ? document.addEventListener : document.removeEventListener;
                n("mousemove", (() => {
                    hideToolTip(e);
                }));
                i("scroll", (() => {
                    hideToolTip(e);
                }));
            }
            function addToolTip(e, t, n) {
                if (e !== null) {
                    e.onmousemove = e => {
                        showToolTip(e, t, n);
                    };
                }
            }
            function showToolTip(e, t, n) {
                DomElement.cancelBubble(e);
                hideToolTip(t);
                t._currentView.tooltipTimer = setTimeout((() => {
                    t._currentView.tooltip.innerHTML = n;
                    t._currentView.tooltip.style.display = "block";
                    DomElement.showElementAtMousePosition(e, t._currentView.tooltip);
                }), t.tooltip.delay);
            }
            function hideToolTip(e) {
                if (Is.defined(e._currentView.tooltip)) {
                    if (Is.defined(e._currentView.tooltipTimer)) {
                        clearTimeout(e._currentView.tooltipTimer);
                        e._currentView.tooltipTimer = null;
                    }
                    if (e._currentView.tooltip.style.display !== "none") {
                        e._currentView.tooltip.style.display = "none";
                    }
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
                        const n = DomElement.createWithHTML(t, "button", "import", _configuration.importButtonText);
                        n.onclick = () => {
                            importFromFilesSelected(e);
                        };
                    }
                    if (e.title.showExportButton) {
                        const n = DomElement.createWithHTML(t, "button", "export", _configuration.exportButtonText);
                        n.onclick = () => {
                            exportAllData(e);
                        };
                    }
                    if (e.title.showRefreshButton) {
                        const n = DomElement.createWithHTML(t, "button", "refresh", _configuration.refreshButtonText);
                        n.onclick = () => {
                            renderControlContainer(e);
                            fireCustomTriggerEvent(e.events.onRefresh, e._currentView.element);
                        };
                    }
                    if (e.title.showYearSelector) {
                        const n = DomElement.createWithHTML(t, "button", "back", _configuration.backButtonText);
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
                            addToolTip(n, e, _configuration.configurationToolTipText);
                            n.onclick = () => {
                                showConfigurationDialog(e);
                            };
                        }
                        const i = DomElement.createWithHTML(t, "button", "next", _configuration.nextButtonText);
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
                    DomElement.createWithHTML(i, "div", "title-menu-header", _configuration.dataText + ":");
                }
                const o = DomElement.createWithHTML(i, "div", "title-menu-item", _configuration.mapText);
                renderTitleDropDownMenuItemClickEvent(e, o, 1, "map");
                if (e.views.chart.enabled) {
                    const t = DomElement.createWithHTML(i, "div", "title-menu-item", _configuration.chartText);
                    renderTitleDropDownMenuItemClickEvent(e, t, 2, "chart");
                }
                if (e.views.days.enabled) {
                    if (e.title.showTitleDropDownHeaders) {
                        DomElement.createWithHTML(i, "div", "title-menu-header", _configuration.yearText + ":");
                    }
                    const t = DomElement.createWithHTML(i, "div", "title-menu-item", _configuration.daysText);
                    renderTitleDropDownMenuItemClickEvent(e, t, 3, "days");
                }
                if (e.views.statistics.enabled) {
                    if (e.title.showTitleDropDownHeaders) {
                        DomElement.createWithHTML(i, "div", "title-menu-header", _configuration.statisticsText + ":");
                    }
                    const t = DomElement.createWithHTML(i, "div", "title-menu-item", _configuration.colorRangesText);
                    renderTitleDropDownMenuItemClickEvent(e, t, 4, "statistics");
                }
            }
            function renderTitleDropDownMenuItemClickEvent(e, t, n, i) {
                if (e._currentView.view === n) {
                    DomElement.addClass(t, "title-menu-item-active");
                } else {
                    t.onclick = () => {
                        e._currentView.view = n;
                        fireCustomTriggerEvent(e.events.onViewSwitch, i);
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
                        let a = renderYearDropDownMenuItem(e, n, t, i);
                        if (!Is.defined(o)) {
                            o = a;
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
                const a = DomElement.createWithHTML(t, "div", "year-menu-item", n.toString());
                if (e._currentView.year !== n) {
                    a.onclick = () => {
                        e._currentView.year = n;
                        renderControlContainer(e);
                        fireCustomTriggerEvent(e.events.onSetYear, e._currentView.year);
                    };
                    if (n === i) {
                        DomElement.addClass(a, "year-menu-item-current");
                    }
                } else {
                    DomElement.addClass(a, "year-menu-item-active");
                    o = a;
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
                    const n = DomElement.createWithHTML(e._currentView.mapContents, "div", "no-data-message", _configuration.noMapDataMessage);
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
                                const e = !i || n % 3 === 0 ? _configuration.dayNames[n] : " ";
                                DomElement.createWithHTML(t, "div", "day-name", e);
                            }
                        }
                        if (e.views.map.showDaysInReverseOrder) {
                            DomElement.reverseChildrenOrder(t);
                        }
                    }
                    const a = DomElement.create(n, "div", "months");
                    const r = getSortedColorRanges(e);
                    for (let t = 0; t < 12; t++) {
                        if (isMonthVisible(e.views.map.monthsToShow, t)) {
                            const n = DomElement.create(a, "div", "month");
                            const s = DomElement.create(n, "div", "day-columns");
                            let l = DateTime.getTotalDaysInMonth(i, t);
                            let u = DomElement.create(s, "div", "day-column");
                            let c = false;
                            const d = new Date(i, t, 1);
                            const f = DateTime.getWeekdayNumber(d);
                            let m = 1;
                            l += f;
                            for (let n = 0; n < l; n++) {
                                if (n >= f) {
                                    c = true;
                                } else {
                                    if (isDayVisible(e.views.map.daysToShow, m)) {
                                        DomElement.create(u, "div", "day-disabled");
                                    }
                                }
                                if (c) {
                                    let o = null;
                                    if (isDayVisible(e.views.map.daysToShow, m)) {
                                        o = renderControlMapMonthDay(e, u, n - f, t, i, r);
                                    }
                                    if ((n + 1) % 7 === 0) {
                                        if (e.views.map.showDaysInReverseOrder) {
                                            DomElement.reverseChildrenOrder(u);
                                        }
                                        u = DomElement.create(s, "div", "day-column");
                                        m = 0;
                                        if (_elements_Day_Width === 0 && Is.defined(o)) {
                                            let e = DomElement.getStyleValueByName(o, "margin-left", true);
                                            let t = DomElement.getStyleValueByName(o, "margin-right", true);
                                            _elements_Day_Width = o.offsetWidth + e + t;
                                        }
                                    }
                                }
                                m++;
                            }
                            if (e.views.map.showMonthNames) {
                                let i;
                                const o = n.offsetWidth;
                                if (!e.views.map.placeMonthNamesOnTheBottom) {
                                    i = DomElement.createWithHTML(n, "div", "month-name", _configuration.monthNames[t], s);
                                } else {
                                    i = DomElement.createWithHTML(n, "div", "month-name-bottom", _configuration.monthNames[t]);
                                }
                                if (Is.defined(i)) {
                                    if (e.views.map.showMonthDayGaps) {
                                        i.style.width = o + "px";
                                    } else {
                                        i.style.width = o - _elements_Day_Width + "px";
                                    }
                                }
                            }
                            if (o && Is.defined(_elements_Day_Width)) {
                                if (f > 0 && !e.views.map.showMonthDayGaps) {
                                    n.style.marginLeft = -_elements_Day_Width + "px";
                                } else if (f === 0 && e.views.map.showMonthDayGaps) {
                                    n.style.marginLeft = _elements_Day_Width + "px";
                                }
                            }
                            if (e.views.map.showMonthsInReverseOrder) {
                                DomElement.reverseChildrenOrder(s);
                            }
                            o = true;
                        }
                    }
                    if (e.views.map.showMonthsInReverseOrder) {
                        DomElement.reverseChildrenOrder(a);
                    }
                    if (e.views.map.keepScrollPositions) {
                        e._currentView.mapContents.scrollLeft = e._currentView.mapContentsScrollLeft;
                    }
                }
            }
            function renderControlMapMonthDay(e, t, n, i, o, a) {
                const r = n + 1;
                const s = DomElement.create(t, "div", "day");
                const l = new Date(o, i, r);
                let u = _elements_DateCounts[e._currentView.element.id].typeData[e._currentView.type][toStorageDate(l)];
                u = Data.getDefaultNumber(u, 0);
                renderDayToolTip(e, s, l, u);
                if (e.views.map.showDayNumbers && u > 0) {
                    s.innerHTML = u.toString();
                }
                if (Is.definedFunction(e.events.onDayClick)) {
                    s.onclick = () => {
                        fireCustomTriggerEvent(e.events.onDayClick, l, u);
                    };
                } else {
                    DomElement.addClass(s, "no-hover");
                }
                const c = getColorRange(e, a, u, l);
                if (Is.defined(c) && isColorRangeVisible(e, c.id)) {
                    if (Is.definedString(c.mapCssClassName)) {
                        DomElement.addClass(s, c.mapCssClassName);
                    } else {
                        DomElement.addClass(s, c.cssClassName);
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
                        if (getStorageDateYear(e) === i) {
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
                const a = getSortedColorRanges(e);
                const r = getLargestValueForChartYear(e);
                const s = e._currentView.year;
                let l = 0;
                if (t) {
                    DomElement.addClass(n, "view-switch");
                }
                if (r > 0 && e.views.chart.showChartYLabels) {
                    const e = DomElement.createWithHTML(i, "div", "label-0", r.toString());
                    DomElement.createWithHTML(i, "div", "label-25", (Math.floor(r / 4) * 3).toString());
                    DomElement.createWithHTML(i, "div", "label-50", Math.floor(r / 2).toString());
                    DomElement.createWithHTML(i, "div", "label-75", Math.floor(r / 4).toString());
                    DomElement.createWithHTML(i, "div", "label-100", "0");
                    i.style.width = e.offsetWidth + "px";
                    l = i.offsetWidth + DomElement.getStyleValueByName(i, "margin-right", true);
                } else {
                    i.parentNode.removeChild(i);
                    i = null;
                }
                if (r === 0) {
                    e._currentView.chartContents.style.minHeight = e._currentView.mapContents.offsetHeight + "px";
                    n.parentNode.removeChild(n);
                    const i = DomElement.createWithHTML(e._currentView.chartContents, "div", "no-data-message", _configuration.noChartDataMessage);
                    if (t) {
                        DomElement.addClass(i, "view-switch");
                    }
                } else {
                    const t = e._currentView.mapContents.offsetHeight / r;
                    let n = 0;
                    let i = 0;
                    for (let r = 0; r < 12; r++) {
                        if (isMonthVisible(e.views.chart.monthsToShow, r)) {
                            const l = DateTime.getTotalDaysInMonth(s, r);
                            let u = 1;
                            n++;
                            for (let n = 0; n < l; n++) {
                                if (isDayVisible(e.views.chart.daysToShow, u)) {
                                    renderControlChartDay(o, e, n + 1, r, s, a, t);
                                }
                                if ((n + 1) % 7 === 0) {
                                    u = 0;
                                }
                                u++;
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
                        let a = 0;
                        const r = n => {
                            if (isMonthVisible(e.views.chart.monthsToShow, n)) {
                                let e = DomElement.createWithHTML(t, "div", "month-name", _configuration.monthNames[n]);
                                e.style.left = l + i * a + "px";
                                a++;
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
                        t.style.width = o.offsetWidth + "px";
                        const s = DomElement.create(t, "div", "month-name-space");
                        s.style.height = t.offsetHeight + "px";
                        s.style.width = l + "px";
                    }
                    if (e.views.chart.keepScrollPositions) {
                        e._currentView.chartContents.scrollLeft = e._currentView.chartContentsScrollLeft;
                    }
                }
            }
            function renderControlChartDay(e, t, n, i, o, a, r) {
                const s = new Date(o, i, n);
                const l = DomElement.create(e, "div", "day-line");
                let u = getCurrentViewData(t)[toStorageDate(s)];
                u = Data.getDefaultNumber(u, 0);
                renderDayToolTip(t, l, s, u);
                if (t.views.chart.showLineNumbers && u > 0) {
                    DomElement.addClass(l, "day-line-number");
                    l.innerHTML = u.toString();
                }
                const c = u * r;
                l.style.height = c + "px";
                if (c <= 0) {
                    l.style.visibility = "hidden";
                }
                if (Is.definedFunction(t.events.onDayClick)) {
                    l.onclick = () => {
                        fireCustomTriggerEvent(t.events.onDayClick, s, u);
                    };
                } else {
                    DomElement.addClass(l, "no-hover");
                }
                const d = getColorRange(t, a, u, s);
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
                    for (let a = 0; a < o; a++) {
                        const o = toStorageDate(new Date(e._currentView.year, i, a + 1));
                        if (n.hasOwnProperty(o)) {
                            if (isMonthVisible(e.views.chart.monthsToShow, i) && isDayVisible(e.views.chart.daysToShow, a + 1)) {
                                t = Math.max(t, n[o]);
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
                const a = DomElement.create(n, "div", "day-lines");
                const r = getLargestValuesForEachDay(e);
                if (t) {
                    DomElement.addClass(n, "view-switch");
                }
                if (r.largestValue > 0 && e.views.days.showChartYLabels) {
                    const e = DomElement.createWithHTML(o, "div", "label-0", r.largestValue.toString());
                    DomElement.createWithHTML(o, "div", "label-25", (Math.floor(r.largestValue / 4) * 3).toString());
                    DomElement.createWithHTML(o, "div", "label-50", Math.floor(r.largestValue / 2).toString());
                    DomElement.createWithHTML(o, "div", "label-75", Math.floor(r.largestValue / 4).toString());
                    DomElement.createWithHTML(o, "div", "label-100", "0");
                    o.style.width = e.offsetWidth + "px";
                    i.style.paddingLeft = o.offsetWidth + DomElement.getStyleValueByName(o, "margin-right", true) + "px";
                } else {
                    o.parentNode.removeChild(o);
                    o = null;
                }
                if (r.largestValue === 0) {
                    e._currentView.daysContents.style.minHeight = e._currentView.mapContents.offsetHeight + "px";
                    n.parentNode.removeChild(n);
                    i.parentNode.removeChild(i);
                    const o = DomElement.createWithHTML(e._currentView.daysContents, "div", "no-days-message", _configuration.noDaysDataMessage);
                    if (t) {
                        DomElement.addClass(o, "view-switch");
                    }
                } else {
                    const t = e._currentView.mapContents.offsetHeight / r.largestValue;
                    for (let n in r.days) {
                        if (r.days.hasOwnProperty(n) && isDayVisible(e.views.days.daysToShow, parseInt(n))) {
                            renderControlDaysDayLine(a, parseInt(n), r.days[n], e, t);
                            if (e.views.days.showDayNames) {
                                DomElement.createWithHTML(i, "div", "day-name", _configuration.dayNames[parseInt(n) - 1]);
                            }
                        }
                    }
                    if (e.views.days.showInReverseOrder) {
                        DomElement.reverseChildrenOrder(a);
                        DomElement.reverseChildrenOrder(i);
                    }
                    if (e.views.days.keepScrollPositions) {
                        e._currentView.daysContents.scrollLeft = e._currentView.daysContentsScrollLeft;
                    }
                }
            }
            function renderControlDaysDayLine(e, t, n, i, o) {
                const a = DomElement.create(e, "div", "day-line");
                const r = n * o;
                a.style.height = r + "px";
                if (r <= 0) {
                    a.style.visibility = "hidden";
                }
                addToolTip(a, i, n.toString());
                if (Is.definedFunction(i.events.onWeekDayClick)) {
                    a.onclick = () => {
                        fireCustomTriggerEvent(i.events.onWeekDayClick, t, n);
                    };
                } else {
                    DomElement.addClass(a, "no-hover");
                }
                if (i.views.days.showDayNumbers && n > 0) {
                    DomElement.addClass(a, "day-line-number");
                    DomElement.createWithHTML(a, "div", "count", n.toString());
                }
            }
            function getLargestValuesForEachDay(e) {
                let t = 0;
                const n = getCurrentViewData(e);
                const i = {
                    1: 0,
                    2: 0,
                    3: 0,
                    4: 0,
                    5: 0,
                    6: 0,
                    7: 0
                };
                for (let o = 0; o < 12; o++) {
                    const a = DateTime.getTotalDaysInMonth(e._currentView.year, o);
                    for (let r = 0; r < a; r++) {
                        const a = toStorageDate(new Date(e._currentView.year, o, r + 1));
                        if (n.hasOwnProperty(a)) {
                            const o = getStorageDate(a);
                            const r = new Date(parseInt(o[2]), parseInt(o[1]), parseInt(o[0]));
                            const s = DateTime.getWeekdayNumber(r) + 1;
                            if (!isHoliday(e, r).matched && isMonthVisible(e.views.days.monthsToShow, r.getMonth()) && isDayVisible(e.views.days.daysToShow, s)) {
                                i[s] += n[a];
                                t = Math.max(t, i[s]);
                            }
                        }
                    }
                }
                return {
                    days: i,
                    largestValue: t
                };
            }
            function renderControlStatisticsContents(e) {
                e._currentView.statisticsContents = DomElement.create(e._currentView.element, "div", "statistics-contents");
                makeAreaDroppable(e._currentView.statisticsContents, e);
            }
            function renderControlStatistics(e, t) {
                const n = DomElement.create(e._currentView.statisticsContents, "div", "statistics");
                const i = DomElement.create(e._currentView.statisticsContents, "div", "statistics-ranges");
                let o = DomElement.create(n, "div", "y-labels");
                const a = DomElement.create(n, "div", "range-lines");
                const r = getSortedColorRanges(e);
                const s = getLargestValuesForEachRangeType(e, r);
                if (t) {
                    DomElement.addClass(n, "view-switch");
                }
                if (s.largestValue > 0 && e.views.statistics.showChartYLabels) {
                    const e = DomElement.createWithHTML(o, "div", "label-0", s.largestValue.toString());
                    DomElement.createWithHTML(o, "div", "label-25", (Math.floor(s.largestValue / 4) * 3).toString());
                    DomElement.createWithHTML(o, "div", "label-50", Math.floor(s.largestValue / 2).toString());
                    DomElement.createWithHTML(o, "div", "label-75", Math.floor(s.largestValue / 4).toString());
                    DomElement.createWithHTML(o, "div", "label-100", "0");
                    o.style.width = e.offsetWidth + "px";
                    i.style.paddingLeft = o.offsetWidth + DomElement.getStyleValueByName(o, "margin-right", true) + "px";
                } else {
                    o.parentNode.removeChild(o);
                    o = null;
                }
                if (s.largestValue === 0) {
                    e._currentView.statisticsContents.style.minHeight = e._currentView.mapContents.offsetHeight + "px";
                    n.parentNode.removeChild(n);
                    i.parentNode.removeChild(i);
                    const o = DomElement.createWithHTML(e._currentView.statisticsContents, "div", "no-statistics-message", _configuration.noStatisticsDataMessage);
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
                            renderControlStatisticsRangeLine(parseInt(n), a, s.types[n], e, r, t);
                            const o = getColorRangeByMinimum(r, parseInt(n));
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
                        DomElement.reverseChildrenOrder(a);
                        DomElement.reverseChildrenOrder(i);
                    }
                    if (e.views.statistics.keepScrollPositions) {
                        e._currentView.statisticsContents.scrollLeft = e._currentView.statisticsContentsScrollLeft;
                    }
                }
            }
            function renderControlStatisticsRangeLine(e, t, n, i, o, a) {
                const r = DomElement.create(t, "div", "range-line");
                const s = getColorRangeByMinimum(o, e);
                const l = n * a;
                r.style.height = l + "px";
                if (l <= 0) {
                    r.style.visibility = "hidden";
                }
                addToolTip(r, i, n.toString());
                if (i.views.statistics.showRangeNumbers && n > 0) {
                    DomElement.addClass(r, "range-line-number");
                    DomElement.createWithHTML(r, "div", "count", n.toString());
                }
                if (Is.definedFunction(i.events.onStatisticClick)) {
                    r.onclick = () => {
                        fireCustomTriggerEvent(i.events.onStatisticClick, s);
                    };
                } else {
                    DomElement.addClass(r, "no-hover");
                }
                if (Is.defined(s) && isColorRangeVisible(i, s.id)) {
                    if (Is.definedString(s.statisticsCssClassName)) {
                        DomElement.addClass(r, s.statisticsCssClassName);
                    } else {
                        DomElement.addClass(r, s.cssClassName);
                    }
                }
            }
            function getLargestValuesForEachRangeType(e, t) {
                const n = {};
                const i = getCurrentViewData(e);
                let o = 0;
                n["0"] = 0;
                for (let a = 0; a < 12; a++) {
                    const r = DateTime.getTotalDaysInMonth(e._currentView.year, a);
                    for (let s = 0; s < r; s++) {
                        const r = toStorageDate(new Date(e._currentView.year, a, s + 1));
                        if (i.hasOwnProperty(r)) {
                            const a = getStorageDate(r);
                            const s = new Date(parseInt(a[2]), parseInt(a[1]), parseInt(a[0]));
                            const l = DateTime.getWeekdayNumber(s) + 1;
                            if (!isHoliday(e, s).matched && isMonthVisible(e.views.statistics.monthsToShow, s.getMonth()) && isDayVisible(e.views.statistics.daysToShow, l)) {
                                const a = getColorRange(e, t, i[r]);
                                if (!Is.defined(a)) {
                                    n["0"]++;
                                } else {
                                    if (!n.hasOwnProperty(a.minimum.toString())) {
                                        n[a.minimum.toString()] = 0;
                                    }
                                    n[a.minimum]++;
                                    o = Math.max(o, n[a.minimum]);
                                }
                            }
                        }
                    }
                }
                return {
                    types: n,
                    largestValue: o
                };
            }
            function renderControlViewGuide(e) {
                const t = DomElement.create(e._currentView.element, "div", "guide");
                const n = DomElement.create(t, "div", "map-types");
                let i = 0;
                for (let t in _elements_DateCounts[e._currentView.element.id].typeData[_configuration.unknownTrendText]) {
                    if (_elements_DateCounts[e._currentView.element.id].typeData[_configuration.unknownTrendText].hasOwnProperty(t)) {
                        i++;
                        break;
                    }
                }
                if (_elements_DateCounts[e._currentView.element.id].totalTypes > 1) {
                    if (Is.definedString(e.description.text)) {
                        const n = DomElement.create(e._currentView.element, "div", "description", t);
                        renderDescription(e, n);
                    }
                    for (let t in _elements_DateCounts[e._currentView.element.id].typeData) {
                        if (t !== _configuration.unknownTrendText || i > 0) {
                            if (i === 0 && e._currentView.type === _configuration.unknownTrendText) {
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
                        let t = DomElement.createWithHTML(n, "div", "less-text", _configuration.lessText);
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
                    const a = o.length;
                    for (let t = 0; t < a; t++) {
                        renderControlViewGuideDay(e, i, o[t]);
                    }
                    if (e.guide.showLessAndMoreLabels) {
                        const t = DomElement.createWithHTML(n, "div", "more-text", _configuration.moreText);
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
                        fireCustomTriggerEvent(e.events.onTypeSwitch, n);
                        renderControlContainer(e);
                    }
                };
            }
            function renderControlViewGuideDay(e, t, n) {
                const i = DomElement.create(t, "div");
                i.className = "day";
                addToolTip(i, e, n.tooltipText);
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
                    addToolTip(t, e, fireCustomTriggerEvent(e.events.onDayToolTipRender, n, i));
                } else {
                    let i = DateTime.getCustomFormattedDateText(_configuration, e.tooltip.dayText, n);
                    if (e.showHolidaysInDayToolTips) {
                        let t = isHoliday(e, n);
                        if (t.matched && Is.definedString(t.name)) {
                            i += ":" + " " + t.name;
                        }
                    }
                    addToolTip(t, e, i);
                }
            }
            function createDateStorageForElement(e, t, n = true) {
                _elements_DateCounts[e] = {
                    options: t,
                    typeData: {},
                    totalTypes: 1
                };
                _elements_DateCounts[e].typeData[_configuration.unknownTrendText] = {};
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
                            let n = parseInt(getStorageDateYear(e));
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
                            const i = getObjectFromString(e);
                            if (i.parsed) {
                                _elements_DateCounts[n].typeData = i.object;
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
                    const i = e._currentView.element.id;
                    for (let e = 0; e < t; e++) {
                        if (Data.String.startsWithAnyCase(window.localStorage.key(e), _local_Storage_Start_ID + i)) {
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
                    if (!Is.defined(e._currentView.isInFetchModeTimer)) {
                        pullDataFromCustomTrigger(e);
                    }
                    if (!Is.defined(e._currentView.isInFetchModeTimer)) {
                        e._currentView.isInFetchModeTimer = setInterval((() => {
                            pullDataFromCustomTrigger(e);
                            renderControlContainer(e);
                        }), e.dataFetchDelay);
                    }
                }
            }
            function pullDataFromCustomTrigger(e) {
                const t = e._currentView.element.id;
                const n = fireCustomTriggerEvent(e.events.onDataFetch, t);
                if (Is.definedObject(n)) {
                    createDateStorageForElement(t, e, false);
                    for (let e in n) {
                        if (n.hasOwnProperty(e)) {
                            if (!_elements_DateCounts[t].typeData[_configuration.unknownTrendText].hasOwnProperty(e)) {
                                _elements_DateCounts[t].typeData[_configuration.unknownTrendText][e] = 0;
                            }
                            _elements_DateCounts[t].typeData[_configuration.unknownTrendText][e] += n[e];
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
                        if (i.id === t && Data.getDefaultBoolean(i.visible, true)) {
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
                    fireCustomTriggerEvent(e.events.onColorRangeTypeToggle, e.colorRanges[i].id, t);
                }
                renderControlContainer(e);
            }
            function toggleColorRangeVisibleState(e, t) {
                const n = e.colorRanges.length;
                for (let i = 0; i < n; i++) {
                    const n = e.colorRanges[i];
                    if (n.id === t) {
                        n.visible = !Data.getDefaultBoolean(n.visible, true);
                        fireCustomTriggerEvent(e.events.onColorRangeTypeToggle, n.id, n.visible);
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
                const a = t.getMonth() + 1;
                const r = t.getFullYear();
                for (let t = 0; t < i; t++) {
                    let i = e.holidays[t];
                    if (Is.definedString(i.date) && i.showInViews) {
                        const e = i.date.split("/");
                        if (e.length === 2) {
                            n.matched = o === parseInt(e[0]) && a === parseInt(e[1]);
                        } else if (e.length === 3) {
                            n.matched = o === parseInt(e[0]) && a === parseInt(e[1]) && r === parseInt(e[2]);
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
                t.multiple = "multiple";
                t.onchange = () => {
                    importFromFiles(t.files, e);
                };
                t.click();
            }
            function importFromFiles(e, t) {
                const n = e.length;
                const i = [];
                const o = getCurrentViewData(t);
                const a = (e, a) => {
                    i.push(e);
                    for (let e in a) {
                        if (a.hasOwnProperty(e)) {
                            if (!o.hasOwnProperty(e)) {
                                o[e] = 0;
                            }
                            o[e] += a[e];
                        }
                    }
                    if (i.length === n) {
                        fireCustomTriggerEvent(t.events.onImport, t._currentView.element);
                        renderControlContainer(t);
                    }
                };
                for (let t = 0; t < n; t++) {
                    const n = e[t];
                    const i = n.name.split(".").pop().toLowerCase();
                    if (i === "json") {
                        importFromJson(n, a);
                    } else if (i === "txt") {
                        importFromTxt(n, a);
                    } else if (i === "csv") {
                        importFromCsv(n, a);
                    }
                }
            }
            function importFromJson(e, t) {
                const n = new FileReader;
                let i = {};
                n.readAsText(e);
                n.onloadend = () => {
                    t(e.name, i);
                };
                n.onload = e => {
                    const t = getObjectFromString(e.target.result);
                    if (t.parsed && Is.definedObject(t.object)) {
                        i = t.object;
                    }
                };
            }
            function importFromTxt(e, t) {
                const n = new FileReader;
                const i = {};
                n.readAsText(e);
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
            }
            function importFromCsv(e, t) {
                const n = new FileReader;
                const i = {};
                n.readAsText(e);
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
            }
            function exportAllData(e, t = null) {
                let n = null;
                const i = getExportMimeType(e);
                const o = Data.getDefaultString(t, e.exportType).toLowerCase();
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
                    t.setAttribute("href", "data:" + i + ";charset=utf-8," + encodeURIComponent(n));
                    t.setAttribute("download", getExportFilename(e));
                    t.click();
                    document.body.removeChild(t);
                    fireCustomTriggerEvent(e.events.onExport, e._currentView.element);
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
                    n.unshift(getCsvValueLine([ getCsvValue(_configuration.dateText), getCsvValue(_configuration.countText) ]));
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
                        n.push("<FullDate>" + e + "</FullDate>");
                        n.push("<Count>" + t[e].toString() + "</Count>");
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
                        for (let a = 0; a < o; a++) {
                            const o = toStorageDate(new Date(e._currentView.year, i, a + 1));
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
                const n = Data.String.padNumber(t.getDate()) + "-" + Data.String.padNumber(t.getMonth() + 1) + "-" + t.getFullYear();
                const i = Data.String.padNumber(t.getHours()) + "-" + Data.String.padNumber(t.getMinutes());
                let o = "";
                if (e._currentView.type !== _configuration.unknownTrendText) {
                    o = e._currentView.type.toLowerCase().replace(" ", "_") + "_";
                }
                return o + n + "_" + i + "." + e.exportType.toLowerCase();
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
            function buildAttributeOptions(e) {
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
                t = buildAttributeOptionColorRanges(t);
                t = buildAttributeOptionHolidays(t);
                t = buildAttributeOptionTitle(t);
                t = buildAttributeOptionDescription(t);
                t = buildAttributeOptionGuide(t);
                t = buildAttributeOptionToolTip(t);
                t = buildAttributeOptionMapView(t);
                t = buildAttributeOptionChartView(t);
                t = buildAttributeOptionDaysView(t);
                t = buildAttributeOptionStatisticsView(t);
                t = buildAttributeOptionCustomTriggers(t);
                return t;
            }
            function buildAttributeOptionColorRanges(e) {
                if (Is.definedArray(e.colorRanges)) {
                    const t = e.colorRanges.length;
                    for (let n = 0; n < t; n++) {
                        const t = e.colorRanges[n];
                        t.id = Data.getDefaultString(t.id, Data.String.newGuid());
                        t.name = Data.getDefaultString(t.name, null);
                        t.minimum = Data.getDefaultNumber(t.minimum, 0);
                        t.cssClassName = Data.getDefaultString(t.cssClassName, null);
                        t.mapCssClassName = Data.getDefaultString(t.mapCssClassName, null);
                        t.chartCssClassName = Data.getDefaultString(t.chartCssClassName, null);
                        t.statisticsCssClassName = Data.getDefaultString(t.statisticsCssClassName, null);
                        t.tooltipText = Data.getDefaultString(t.tooltipText, null);
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
            function buildAttributeOptionHolidays(e) {
                if (Is.definedArray(e.holidays)) {
                    const t = e.holidays.length;
                    for (let n = 0; n < t; n++) {
                        const t = e.holidays[n];
                        t.date = Data.getDefaultString(t.date, null);
                        t.name = Data.getDefaultString(t.name, null);
                        t.showInViews = Data.getDefaultBoolean(t.showInViews, true);
                    }
                } else {
                    e.holidays = [];
                }
                return e;
            }
            function buildAttributeOptionTitle(e) {
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
            function buildAttributeOptionDescription(e) {
                e.description = Data.getDefaultObject(e.description, {});
                e.description.text = Data.getDefaultString(e.description.text, null);
                e.description.url = Data.getDefaultString(e.description.url, null);
                e.description.urlTarget = Data.getDefaultString(e.description.urlTarget, "_blank");
                return e;
            }
            function buildAttributeOptionGuide(e) {
                e.guide = Data.getDefaultObject(e.guide, {});
                e.guide.enabled = Data.getDefaultBoolean(e.guide.enabled, true);
                e.guide.colorRangeTogglesEnabled = Data.getDefaultBoolean(e.guide.colorRangeTogglesEnabled, true);
                e.guide.showLessAndMoreLabels = Data.getDefaultBoolean(e.guide.showLessAndMoreLabels, true);
                e.guide.showNumbersInGuide = Data.getDefaultBoolean(e.guide.showNumbersInGuide, false);
                return e;
            }
            function buildAttributeOptionToolTip(e) {
                e.tooltip = Data.getDefaultObject(e.tooltip, {});
                e.tooltip.delay = Data.getDefaultNumber(e.tooltip.delay, 750);
                e.tooltip.dayText = Data.getDefaultString(e.tooltip.dayText, "{d}{o} {mmmm} {yyyy}");
                return e;
            }
            function buildAttributeOptionMapView(e) {
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
                    e.views.map.monthsToShow = _default_MonthsToShow;
                }
                if (Is.invalidOptionArray(e.views.map.daysToShow)) {
                    e.views.map.daysToShow = _default_DaysToShow;
                }
                return e;
            }
            function buildAttributeOptionChartView(e) {
                e.views.chart = Data.getDefaultObject(e.views.chart, {});
                e.views.chart.enabled = Data.getDefaultBoolean(e.views.chart.enabled, true);
                e.views.chart.showChartYLabels = Data.getDefaultBoolean(e.views.chart.showChartYLabels, true);
                e.views.chart.showMonthNames = Data.getDefaultBoolean(e.views.chart.showMonthNames, true);
                e.views.chart.showLineNumbers = Data.getDefaultBoolean(e.views.chart.showLineNumbers, false);
                e.views.chart.showInReverseOrder = Data.getDefaultBoolean(e.views.chart.showInReverseOrder, false);
                e.views.chart.keepScrollPositions = Data.getDefaultBoolean(e.views.chart.keepScrollPositions, false);
                if (Is.invalidOptionArray(e.views.chart.monthsToShow)) {
                    e.views.chart.monthsToShow = _default_MonthsToShow;
                }
                if (Is.invalidOptionArray(e.views.chart.daysToShow)) {
                    e.views.chart.daysToShow = _default_DaysToShow;
                }
                return e;
            }
            function buildAttributeOptionDaysView(e) {
                e.views.days = Data.getDefaultObject(e.views.days, {});
                e.views.days.enabled = Data.getDefaultBoolean(e.views.days.enabled, true);
                e.views.days.showChartYLabels = Data.getDefaultBoolean(e.views.days.showChartYLabels, true);
                e.views.days.showDayNames = Data.getDefaultBoolean(e.views.days.showDayNames, true);
                e.views.days.showInReverseOrder = Data.getDefaultBoolean(e.views.days.showInReverseOrder, false);
                e.views.days.showDayNumbers = Data.getDefaultBoolean(e.views.days.showDayNumbers, false);
                e.views.days.keepScrollPositions = Data.getDefaultBoolean(e.views.days.keepScrollPositions, false);
                if (Is.invalidOptionArray(e.views.days.monthsToShow)) {
                    e.views.days.monthsToShow = _default_MonthsToShow;
                }
                if (Is.invalidOptionArray(e.views.days.daysToShow)) {
                    e.views.days.daysToShow = _default_DaysToShow;
                }
                return e;
            }
            function buildAttributeOptionStatisticsView(e) {
                e.views.statistics = Data.getDefaultObject(e.views.statistics, {});
                e.views.statistics.enabled = Data.getDefaultBoolean(e.views.statistics.enabled, true);
                e.views.statistics.showChartYLabels = Data.getDefaultBoolean(e.views.statistics.showChartYLabels, true);
                e.views.statistics.showColorRangeLabels = Data.getDefaultBoolean(e.views.statistics.showColorRangeLabels, true);
                e.views.statistics.useColorRangeNamesForLabels = Data.getDefaultBoolean(e.views.statistics.useColorRangeNamesForLabels, false);
                e.views.statistics.showRangeNumbers = Data.getDefaultBoolean(e.views.statistics.showRangeNumbers, false);
                e.views.statistics.showInReverseOrder = Data.getDefaultBoolean(e.views.statistics.showInReverseOrder, false);
                e.views.statistics.keepScrollPositions = Data.getDefaultBoolean(e.views.statistics.keepScrollPositions, false);
                if (Is.invalidOptionArray(e.views.statistics.monthsToShow)) {
                    e.views.statistics.monthsToShow = _default_MonthsToShow;
                }
                if (Is.invalidOptionArray(e.views.statistics.daysToShow)) {
                    e.views.statistics.daysToShow = _default_DaysToShow;
                }
                return e;
            }
            function buildAttributeOptionCustomTriggers(e) {
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
            function fireCustomTriggerEvent(e, ...t) {
                let n = null;
                if (Is.definedFunction(e)) {
                    n = e.apply(null, [].slice.call(t, 0));
                }
                return n;
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
                        result.object = eval("(" + objectString + ")");
                        if (Is.definedFunction(result.object)) {
                            result.object = result.object();
                        }
                    } catch (e) {
                        if (!_configuration.safeMode) {
                            console.error(_configuration.objectErrorText.replace("{{error_1}}", e1.message).replace("{{error_2}}", e.message));
                            result.parsed = false;
                        }
                        result.object = null;
                    }
                }
                return result;
            }
            function toStorageDate(e) {
                return e.getFullYear() + "-" + Data.String.padNumber(e.getMonth() + 1) + "-" + Data.String.padNumber(e.getDate());
            }
            function getStorageDate(e) {
                return e.split("-");
            }
            function getStorageDateYear(e) {
                return e.split("-")[0];
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
                        fireCustomTriggerEvent(e.events.onBackYear, e._currentView.year);
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
                        fireCustomTriggerEvent(e.events.onBackYear, e._currentView.year);
                    }
                }
            }
            function destroyElement(e) {
                e._currentView.element.innerHTML = "";
                DomElement.removeClass(e._currentView.element, "heat-js");
                assignToolTipEvents(e, false);
                document.body.removeChild(e._currentView.tooltip);
                if (e._currentView.isInFetchMode && Is.defined(e._currentView.isInFetchModeTimer)) {
                    clearInterval(e._currentView.isInFetchModeTimer);
                }
                fireCustomTriggerEvent(e.events.onDestroy, e._currentView.element);
            }
            function buildDefaultConfiguration(e = null) {
                _configuration = !Is.definedObject(e) ? {} : e;
                _configuration.safeMode = Data.getDefaultBoolean(_configuration.safeMode, true);
                _configuration.domElementTypes = Data.getDefaultStringOrArray(_configuration.domElementTypes, [ "*" ]);
                buildDefaultConfigurationStrings();
                buildDefaultConfigurationArrays();
            }
            function buildDefaultConfigurationStrings() {
                _configuration.stText = Data.getDefaultAnyString(_configuration.stText, "st");
                _configuration.ndText = Data.getDefaultAnyString(_configuration.ndText, "nd");
                _configuration.rdText = Data.getDefaultAnyString(_configuration.rdText, "rd");
                _configuration.thText = Data.getDefaultAnyString(_configuration.thText, "th");
                _configuration.backButtonText = Data.getDefaultAnyString(_configuration.backButtonText, "Back");
                _configuration.nextButtonText = Data.getDefaultAnyString(_configuration.nextButtonText, "Next");
                _configuration.refreshButtonText = Data.getDefaultAnyString(_configuration.refreshButtonText, "Refresh");
                _configuration.exportButtonText = Data.getDefaultAnyString(_configuration.exportButtonText, "Export");
                _configuration.lessText = Data.getDefaultAnyString(_configuration.lessText, "Less");
                _configuration.moreText = Data.getDefaultAnyString(_configuration.moreText, "More");
                _configuration.dateText = Data.getDefaultAnyString(_configuration.dateText, "Date");
                _configuration.countText = Data.getDefaultAnyString(_configuration.countText, "Count");
                _configuration.mapText = Data.getDefaultAnyString(_configuration.mapText, "Map");
                _configuration.chartText = Data.getDefaultAnyString(_configuration.chartText, "Chart");
                _configuration.noChartDataMessage = Data.getDefaultAnyString(_configuration.noChartDataMessage, "There is currently no data to view.");
                _configuration.statisticsText = Data.getDefaultAnyString(_configuration.statisticsText, "Statistics");
                _configuration.noStatisticsDataMessage = Data.getDefaultAnyString(_configuration.noStatisticsDataMessage, "There are currently no statistics to view.");
                _configuration.unknownTrendText = Data.getDefaultAnyString(_configuration.unknownTrendText, "Unknown");
                _configuration.importButtonText = Data.getDefaultAnyString(_configuration.importButtonText, "Import");
                _configuration.noMapDataMessage = Data.getDefaultAnyString(_configuration.noMapDataMessage, "There is currently no data to view.");
                _configuration.objectErrorText = Data.getDefaultAnyString(_configuration.objectErrorText, "Errors in object: {{error_1}}, {{error_2}}");
                _configuration.attributeNotValidErrorText = Data.getDefaultAnyString(_configuration.attributeNotValidErrorText, "The attribute '{{attribute_name}}' is not a valid object.");
                _configuration.attributeNotSetErrorText = Data.getDefaultAnyString(_configuration.attributeNotSetErrorText, "The attribute '{{attribute_name}}' has not been set correctly.");
                _configuration.closeToolTipText = Data.getDefaultAnyString(_configuration.closeToolTipText, "Close");
                _configuration.configurationToolTipText = Data.getDefaultAnyString(_configuration.configurationToolTipText, "Configuration");
                _configuration.configurationTitleText = Data.getDefaultAnyString(_configuration.configurationTitleText, "Configuration");
                _configuration.visibleMonthsText = Data.getDefaultAnyString(_configuration.visibleMonthsText, "Visible Months");
                _configuration.visibleDaysText = Data.getDefaultAnyString(_configuration.visibleDaysText, "Visible Days");
                _configuration.dataText = Data.getDefaultAnyString(_configuration.dataText, "Data");
                _configuration.colorRangesText = Data.getDefaultAnyString(_configuration.colorRangesText, "Color Ranges");
                _configuration.yearText = Data.getDefaultAnyString(_configuration.yearText, "Year");
                _configuration.daysText = Data.getDefaultAnyString(_configuration.daysText, "Days");
                _configuration.noDaysDataMessage = Data.getDefaultAnyString(_configuration.noDaysDataMessage, "There are currently no days to view.");
            }
            function buildDefaultConfigurationArrays() {
                if (Is.invalidOptionArray(_configuration.monthNames, 12)) {
                    _configuration.monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
                }
                if (Is.invalidOptionArray(_configuration.dayNames, 7)) {
                    _configuration.dayNames = [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ];
                }
            }
            const _public = {
                addDates: function(e, t, n = null, i = true) {
                    if (Is.definedString(e) && Is.definedArray(t) && _elements_DateCounts.hasOwnProperty(e)) {
                        const o = _elements_DateCounts[e].options;
                        if (!o._currentView.isInFetchMode) {
                            n = Data.getDefaultString(n, _configuration.unknownTrendText);
                            const a = t.length;
                            for (let i = 0; i < a; i++) {
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
                    if (Is.definedString(e) && Is.definedDate(t) && _elements_DateCounts.hasOwnProperty(e)) {
                        const o = _elements_DateCounts[e].options;
                        if (!o._currentView.isInFetchMode) {
                            n = Data.getDefaultString(n, _configuration.unknownTrendText);
                            const a = toStorageDate(t);
                            if (!_elements_DateCounts[e].typeData.hasOwnProperty(n)) {
                                _elements_DateCounts[e].typeData[n] = {};
                                _elements_DateCounts[e].totalTypes++;
                            }
                            if (!_elements_DateCounts[e].typeData[n].hasOwnProperty(a)) {
                                _elements_DateCounts[e].typeData[n][a] = 0;
                            }
                            _elements_DateCounts[e].typeData[n][a]++;
                            fireCustomTriggerEvent(o.events.onAdd, o._currentView.element);
                            if (i) {
                                renderControlContainer(o, true);
                            }
                        }
                    }
                    return _public;
                },
                updateDate: function(e, t, n, i = null, o = true) {
                    if (Is.definedString(e) && Is.definedDate(t) && _elements_DateCounts.hasOwnProperty(e)) {
                        const a = _elements_DateCounts[e].options;
                        if (!a._currentView.isInFetchMode && n > 0) {
                            const r = toStorageDate(t);
                            if (_elements_DateCounts[e].typeData.hasOwnProperty(i)) {
                                i = Data.getDefaultString(i, _configuration.unknownTrendText);
                                _elements_DateCounts[e].typeData[i][r] = n;
                                fireCustomTriggerEvent(a.events.onUpdate, a._currentView.element);
                                if (o) {
                                    renderControlContainer(a, true);
                                }
                            }
                        }
                    }
                    return _public;
                },
                removeDates: function(e, t, n = null, i = true) {
                    if (Is.definedString(e) && Is.definedArray(t) && _elements_DateCounts.hasOwnProperty(e)) {
                        const o = _elements_DateCounts[e].options;
                        if (!o._currentView.isInFetchMode) {
                            n = Data.getDefaultString(n, _configuration.unknownTrendText);
                            const a = t.length;
                            for (let i = 0; i < a; i++) {
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
                    if (Is.definedString(e) && Is.definedDate(t) && _elements_DateCounts.hasOwnProperty(e)) {
                        const o = _elements_DateCounts[e].options;
                        if (!o._currentView.isInFetchMode) {
                            const a = toStorageDate(t);
                            if (_elements_DateCounts[e].typeData.hasOwnProperty(n) && _elements_DateCounts[e].typeData[n].hasOwnProperty(a)) {
                                n = Data.getDefaultString(n, _configuration.unknownTrendText);
                                if (_elements_DateCounts[e].typeData[n][a] > 0) {
                                    _elements_DateCounts[e].typeData[n][a]--;
                                }
                                fireCustomTriggerEvent(o.events.onRemove, o._currentView.element);
                                if (i) {
                                    renderControlContainer(o, true);
                                }
                            }
                        }
                    }
                    return _public;
                },
                clearDate: function(e, t, n = null, i = true) {
                    if (Is.definedString(e) && Is.definedDate(t) && _elements_DateCounts.hasOwnProperty(e)) {
                        const o = _elements_DateCounts[e].options;
                        if (!o._currentView.isInFetchMode) {
                            const a = toStorageDate(t);
                            if (_elements_DateCounts[e].typeData.hasOwnProperty(n) && _elements_DateCounts[e].typeData[n].hasOwnProperty(a)) {
                                n = Data.getDefaultString(n, _configuration.unknownTrendText);
                                delete _elements_DateCounts[e].typeData[n][a];
                                fireCustomTriggerEvent(o.events.onClear, o._currentView.element);
                                if (i) {
                                    renderControlContainer(o, true);
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
                            n._currentView.type = _configuration.unknownTrendText;
                            createDateStorageForElement(e, n, false);
                            fireCustomTriggerEvent(n.events.onReset, n._currentView.element);
                            if (t) {
                                renderControlContainer(n, true);
                            }
                        }
                    }
                    return _public;
                },
                import: function(e, t) {
                    if (Is.definedString(e) && _elements_DateCounts.hasOwnProperty(e) && Is.definedArray(t)) {
                        importFromFiles(t, _elements_DateCounts[e].options);
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
                        fireCustomTriggerEvent(t.events.onRefresh, t._currentView.element);
                    }
                    return _public;
                },
                refreshAll: function() {
                    for (let e in _elements_DateCounts) {
                        if (_elements_DateCounts.hasOwnProperty(e)) {
                            const t = _elements_DateCounts[e].options;
                            renderControlContainer(t, true);
                            fireCustomTriggerEvent(t.events.onRefresh, t._currentView.element);
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
                        fireCustomTriggerEvent(n.events.onSetYear, n._currentView.year);
                    }
                    return _public;
                },
                setYearToHighest: function(e) {
                    if (Is.definedString(e) && _elements_DateCounts.hasOwnProperty(e)) {
                        const t = _elements_DateCounts[e].options;
                        const n = getCurrentViewData(t);
                        let i = 0;
                        for (let e in n) {
                            if (n.hasOwnProperty(e)) {
                                i = Math.max(i, parseInt(getStorageDateYear(e)));
                            }
                        }
                        if (i > 0) {
                            t._currentView.year = i;
                            if (!isYearVisible(t, t._currentView.year)) {
                                moveToNextYear(t, false);
                            } else {
                                renderControlContainer(t);
                            }
                            fireCustomTriggerEvent(t.events.onSetYear, t._currentView.year);
                        }
                    }
                    return _public;
                },
                setYearToLowest: function(e) {
                    if (Is.definedString(e) && _elements_DateCounts.hasOwnProperty(e)) {
                        const t = _elements_DateCounts[e].options;
                        const n = getCurrentViewData(t);
                        let i = 9999;
                        for (let e in n) {
                            if (n.hasOwnProperty(e)) {
                                i = Math.min(i, parseInt(getStorageDateYear(e)));
                            }
                        }
                        if (i < 9999) {
                            t._currentView.year = i;
                            if (!isYearVisible(t, t._currentView.year)) {
                                moveToPreviousYear(t, false);
                            } else {
                                renderControlContainer(t);
                            }
                            fireCustomTriggerEvent(t.events.onSetYear, t._currentView.year);
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
                        fireCustomTriggerEvent(t.events.onSetYear, t._currentView.year);
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
                            fireCustomTriggerEvent(n.events.onViewSwitch, t);
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
                            fireCustomTriggerEvent(n.events.onTypeSwitch, t);
                            renderControlContainer(n);
                        }
                    }
                    return _public;
                },
                updateOptions: function(e, t) {
                    if (Is.definedString(e) && Is.definedObject(t) && _elements_DateCounts.hasOwnProperty(e)) {
                        const n = _elements_DateCounts[e].options;
                        const i = buildAttributeOptions(t);
                        let o = false;
                        for (let e in i) {
                            if (i.hasOwnProperty(e) && n.hasOwnProperty(e) && n[e] !== i[e]) {
                                n[e] = i[e];
                                o = true;
                            }
                        }
                        if (o) {
                            renderControlContainer(n, true);
                            fireCustomTriggerEvent(n.events.onRefresh, n._currentView.element);
                            fireCustomTriggerEvent(n.events.onOptionsUpdate, n._currentView.element, n);
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
                        for (let t in e) {
                            if (e.hasOwnProperty(t) && _configuration.hasOwnProperty(t) && _configuration[t] !== e[t]) {
                                _configuration[t] = e[t];
                                n = true;
                            }
                        }
                        if (n) {
                            buildDefaultConfiguration(_configuration);
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
                    return "4.0.0";
                }
            };
            (() => {
                buildDefaultConfiguration();
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