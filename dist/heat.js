/*! Heat.js v0.9.0 | (c) Bunoon 2024 | MIT License */
(function() {
  function t(a) {
    a.element.className = "heat-js";
    a.element.innerHTML = q.empty;
    X(a);
    Y(a);
  }
  function X(a) {
    P(a.currentView.year) || (a.currentView.year = (new Date()).getFullYear());
    if (a.showTitle || a.showYearSelector || a.showRefreshButton || a.showExportButton) {
      var c = m("div", "title-bar");
      a.element.appendChild(c);
      if (a.showTitle) {
        var b = m("div", "title");
        b.innerHTML = a.titleText;
        c.appendChild(b);
      }
      a.showExportButton && (b = m("button", "export"), b.innerHTML = f.exportButtonText, c.appendChild(b), b.onclick = function() {
        var e = h[a.element.id].type[a.currentView.type];
        var g = [];
        var k = [];
        g.push([G(f.dateText), G(f.countText)].join());
        for (var l in e) {
          e.hasOwnProperty(l) && k.push(l);
        }
        k.sort();
        l = k.length;
        for (var n = 0; n < l; n++) {
          var p = k[n];
          e.hasOwnProperty(p) && g.push([G(p), G(e[p])].join());
        }
        g = g.join(q.newLine);
        g !== q.empty && (e = m("a"), e.style.display = "none", e.setAttribute("target", "_blank"), e.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(g)), g = e.setAttribute, l = new Date(), k = z(l.getDate()) + "-" + z(l.getMonth() + 1) + "-" + l.getFullYear(), l = z(l.getHours()) + "-" + z(l.getMinutes()), n = q.empty, "None" !== a.currentView.type && (n = a.currentView.type.toLowerCase().replace(q.space, "_") + "_"), g.call(e, "download", n + k + "_" + l + ".csv"), A.body.appendChild(e), 
        e.click(), A.body.removeChild(e));
        u(a.onExport, a.element);
      });
      a.showRefreshButton && (b = m("button", "refresh"), b.innerHTML = f.refreshButtonText, c.appendChild(b), b.onclick = function() {
        t(a);
        u(a.onRefresh, a.element);
      });
      a.showYearSelector && (b = m("button", "back"), b.innerHTML = f.backButtonText, c.appendChild(b), b.onclick = function() {
        a.currentView.year--;
        t(a);
        u(a.onBackYear, a.currentView.year);
      }, a.currentView.yearText = m("div", "year-text"), a.currentView.yearText.innerHTML = a.currentView.year, c.appendChild(a.currentView.yearText), b = m("button", "next"), b.innerHTML = f.nextButtonText, c.appendChild(b), b.onclick = function() {
        a.currentView.year++;
        t(a);
        u(a.onNextYear, a.currentView.year);
      });
    }
  }
  function Y(a) {
    var c = m("div", "map-contents");
    a.element.appendChild(c);
    var b = m("div", "map");
    c.appendChild(b);
    Z(a);
    c = a.currentView.year;
    var e = !1;
    if (a.showDayNames) {
      var g = m("div", "days");
      b.appendChild(g);
      if (!a.showMonthNames || a.placeMonthNamesOnTheBottom) {
        g.style.paddingTop = "0px", g.style.marginTop = a.placeMonthNamesOnTheBottom ? "-2px" : "-5px";
      }
      for (var k = 0; 7 > k; k++) {
        if (-1 < a.daysToShow.indexOf(k + 1)) {
          var l = m("div", "day-name");
          l.innerHTML = f.dayNames[k];
          g.appendChild(l);
        }
      }
    }
    g = m("div", "months");
    b.appendChild(g);
    b = a.mapRangeColors.sort(function(aa, ba) {
      return ba.range - aa.range;
    });
    for (k = 0; 12 > k; k++) {
      if (-1 < a.monthsToShow.indexOf(k + 1)) {
        l = m("div", "month");
        g.appendChild(l);
        if (a.showMonthNames && !a.placeMonthNamesOnTheBottom) {
          var n = m("div", "month-name");
          n.innerHTML = f.monthNames[k];
          l.appendChild(n);
        }
        var p = m("div", "day-columns");
        l.appendChild(p);
        var D = (new Date(c, k + 1, 0)).getDate(), d = m("div", "day-column"), E = !1;
        p.appendChild(d);
        n = Q(new Date(c, k, 1));
        var v = 1;
        D += n;
        for (var C = 0; C < D; C++) {
          if (C >= n) {
            E = !0;
          } else {
            var ca = m("div", "day-disabled");
            d.appendChild(ca);
          }
          E && (-1 < a.daysToShow.indexOf(v) && da(a, d, C - n, k, c, b), 0 === (C + 1) % 7 && (d = m("div", "day-column"), p.appendChild(d), v = 0));
          v++;
        }
        a.showMonthNames && a.placeMonthNamesOnTheBottom && (p = m("div", "month-name-bottom"), p.innerHTML = f.monthNames[k], l.appendChild(p));
        e && w(F) && (0 < n && !a.showMonthDayGaps ? l.style.marginLeft = -F + "px" : 0 === n && a.showMonthDayGaps && (l.style.marginLeft = F + "px"));
        e = !0;
      }
    }
  }
  function da(a, c, b, e, g, k) {
    var l = b + 1;
    b = m("div", "day");
    var n = new Date(g, e, l), p = h[a.element.id].type[a.currentView.type][L(n)];
    b.title = ea(a.dayToolTipText, n);
    c.appendChild(b);
    b.onclick = function() {
      u(a.onDayClick, n, p);
    };
    c = a.mapRangeColors.length;
    e = null;
    for (g = 0; g < c; g++) {
      if (l = k[g], p >= l.minimum) {
        e = l;
      } else {
        break;
      }
    }
    w(e) && R(a, e.id) && (b.className += q.space + e.cssClassName);
    w(F) || (k = S(b, "margin-left", !0), c = S(b, "margin-right", !0), F = b.offsetWidth + k + c);
  }
  function Z(a) {
    if (a.showGuide) {
      var c = m("div", "guide");
      a.element.appendChild(c);
      var b = m("div", "map-types");
      c.appendChild(b);
      var e = 0;
      for (k in h[a.element.id].type.None) {
        if (h[a.element.id].type.None.hasOwnProperty(k)) {
          e++;
          break;
        }
      }
      if (1 < h[a.element.id].types) {
        for (var g in h[a.element.id].type) {
          if ("None" !== g || 0 < e) {
            0 === e && "None" === a.currentView.type && (a.currentView.type = g), fa(a, b, g);
          }
        }
      }
      b = m("div", "map-toggles");
      c.appendChild(b);
      c = m("div", "less-text");
      c.innerHTML = f.lessText;
      b.appendChild(c);
      a.mapTogglesEnabled ? c.onclick = function() {
        T(a, !1);
      } : c.className += q.space + "no-click";
      c = m("div", "days");
      b.appendChild(c);
      e = a.mapRangeColors.sort(function(l, n) {
        return n.range - l.range;
      });
      var k = e.length;
      for (g = 0; g < k; g++) {
        ha(a, c, e[g]);
      }
      c = m("div", "more-text");
      c.innerHTML = f.moreText;
      b.appendChild(c);
      a.mapTogglesEnabled ? c.onclick = function() {
        T(a, !0);
      } : c.className += q.space + "no-click";
    }
  }
  function fa(a, c, b) {
    var e = m("button", "type");
    e.innerHTML = b;
    c.appendChild(e);
    a.currentView.type === b && (e.className += q.space + "active");
    e.onclick = function() {
      a.currentView.type !== b && (a.currentView.type = b, u(a.onTypeSwitch, b), t(a));
    };
  }
  function ha(a, c, b) {
    var e = m("div");
    e.title = b.tooltipText;
    c.appendChild(e);
    R(a, b.id) ? e.className = "day " + b.cssClassName : e.className = "day";
    a.mapTogglesEnabled ? e.onclick = function() {
      a.currentView.colorsVisible.hasOwnProperty(b.id) || (a.currentView.colorsVisible[b.id] = !0);
      e.className = a.currentView.colorsVisible[b.id] ? "day" : "day " + b.cssClassName;
      a.currentView.colorsVisible[b.id] = !a.currentView.colorsVisible[b.id];
      t(a);
    } : e.className += q.space + "no-click";
  }
  function R(a, c) {
    return !a.currentView.colorsVisible.hasOwnProperty(c) || a.currentView.colorsVisible[c];
  }
  function U(a, c) {
    h[a] = {options:c, type:{}, types:1};
    h[a].type.None = {};
  }
  function T(a, c) {
    for (var b = a.mapRangeColors.length, e = 0; e < b; e++) {
      a.currentView.colorsVisible[a.mapRangeColors[e].id] = c;
    }
    t(a);
  }
  function G(a) {
    a = a.toString().replace(/(\r\n|\n|\r)/gm, q.empty).replace(/(\s\s)/gm, q.space);
    a = a.replace(/"/g, '""');
    return '"' + a + '"';
  }
  function Q(a) {
    return 0 > a.getDay() - 1 ? 6 : a.getDay() - 1;
  }
  function ea(a, c) {
    var b = a, e = Q(c);
    b = b.replace("{dddd}", f.dayNames[e]);
    b = b.replace("{dd}", z(c.getDate()));
    b = b.replace("{d}", c.getDate());
    e = b.replace;
    var g = c.getDate(), k = f.thText;
    if (31 === g || 21 === g || 1 === g) {
      k = f.stText;
    } else if (22 === g || 2 === g) {
      k = f.ndText;
    } else if (23 === g || 3 === g) {
      k = f.rdText;
    }
    b = e.call(b, "{o}", k);
    b = b.replace("{mmmm}", f.monthNames[c.getMonth()]);
    b = b.replace("{mm}", z(c.getMonth() + 1));
    b = b.replace("{m}", c.getMonth() + 1);
    b = b.replace("{yyyy}", c.getFullYear());
    b = b.replace("{yyy}", c.getFullYear().toString().substring(1));
    b = b.replace("{yy}", c.getFullYear().toString().substring(2));
    return b = b.replace("{y}", parseInt(c.getFullYear().toString().substring(2)).toString());
  }
  function w(a) {
    return null !== a && void 0 !== a && a !== q.empty;
  }
  function H(a) {
    return w(a) && "object" === typeof a;
  }
  function I(a) {
    return w(a) && "boolean" === typeof a;
  }
  function B(a) {
    return w(a) && "string" === typeof a;
  }
  function M(a) {
    return w(a) && "function" === typeof a;
  }
  function P(a) {
    return w(a) && "number" === typeof a;
  }
  function N(a) {
    return H(a) && a instanceof Array;
  }
  function m(a, c) {
    var b = a.toLowerCase();
    var e = "text" === b;
    O.hasOwnProperty(b) || (O[b] = e ? A.createTextNode(q.empty) : A.createElement(b));
    b = O[b].cloneNode(!1);
    w(c) && (b.className = c);
    return b;
  }
  function S(a, c, b) {
    var e = null;
    b = w(b) ? b : !1;
    J.getComputedStyle ? e = A.defaultView.getComputedStyle(a, null).getPropertyValue(c) : a.currentStyle && (e = a.currentStyle[c]);
    b && (e = parseInt(e, 10));
    return e;
  }
  function u(a) {
    M(a) && a.apply(null, [].slice.call(arguments, 1));
  }
  function r(a, c) {
    return B(a) ? a : c;
  }
  function x(a, c) {
    return I(a) ? a : c;
  }
  function y(a, c) {
    return M(a) ? a : c;
  }
  function ia(a) {
    var c = !0, b = null;
    try {
      B(a) && (b = JSON.parse(a));
    } catch (e) {
      try {
        b = eval("(" + a + ")"), M(b) && (b = b());
      } catch (g) {
        f.safeMode || (console.error("Errors in object: " + e.message + ", " + g.message), c = !1), b = null;
      }
    }
    return {parsed:c, result:b};
  }
  function V() {
    for (var a = [], c = 0; 32 > c; c++) {
      8 !== c && 12 !== c && 16 !== c && 20 !== c || a.push("-");
      var b = Math.floor(16 * Math.random()).toString(16);
      a.push(b);
    }
    return a.join(q.empty);
  }
  function z(a) {
    a = a.toString();
    return 1 === a.length ? "0" + a : a;
  }
  function L(a) {
    return a.getFullYear() + "-" + z(a.getMonth() + 1) + "-" + z(a.getDate());
  }
  function W() {
    f.safeMode = x(f.safeMode, !0);
    var a = f, c = f.domElementTypes, b = ["*"];
    B(c) ? (c = c.split(q.space), 0 === c.length && (c = b)) : c = N(c) ? c : b;
    a.domElementTypes = c;
    f.stText = r(f.stText, "st");
    f.ndText = r(f.ndText, "nd");
    f.rdText = r(f.rdText, "rd");
    f.thText = r(f.thText, "th");
    f.backButtonText = r(f.backButtonText, "Back");
    f.nextButtonText = r(f.nextButtonText, "Next");
    f.refreshButtonText = r(f.refreshButtonText, "Refresh");
    f.exportButtonText = r(f.exportButtonText, "Export");
    f.lessText = r(f.lessText, "Less");
    f.moreText = r(f.moreText, "More");
    f.dateText = r(f.dateText, "Date");
    f.countText = r(f.countText, "Count");
    K(f.monthNames, 12) && (f.monthNames = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "));
    K(f.dayNames, 7) && (f.dayNames = "Mon Tue Wed Thu Fri Sat Sun".split(" "));
  }
  function K(a, c) {
    c = P(c) ? c : 1;
    return !N(a) || a.length < c;
  }
  var A = null, J = null, f = {}, q = {empty:"", space:" ", newLine:"\n"}, O = {}, F = null, h = {};
  this.addDate = function(a, c, b, e) {
    h.hasOwnProperty(a) && (e = I(e) ? e : !0, b = B(b) ? b : "None", c = L(c), h[a].type.hasOwnProperty(b) || (h[a].type[b] = {}, h[a].types++), h[a].type[b].hasOwnProperty(c) || (h[a].type[b][c] = 0), h[a].type[b][c]++, e && t(h[a].options));
    return this;
  };
  this.removeDate = function(a, c, b, e) {
    h.hasOwnProperty(a) && (b = B(b) ? b : "None", c = L(c), h[a].type.hasOwnProperty(b) && h[a].type[b].hasOwnProperty(c) && (e = I(e) ? e : !0, 0 < h[a].type[b][c] && h[a].type[b][c]--, e && t(h[a].options)));
    return this;
  };
  this.reset = function(a, c) {
    if (h.hasOwnProperty(a)) {
      c = I(c) ? c : !0;
      var b = h[a].options;
      b.currentView.type = "None";
      U(a, b);
      c && t(h[a].options);
    }
    return this;
  };
  this.refresh = function(a) {
    h.hasOwnProperty(a) && (a = h[a].options, t(a), u(a.onRefresh, a.element));
    return this;
  };
  this.refreshAll = function() {
    for (var a in h) {
      if (h.hasOwnProperty(a)) {
        var c = h[a].options;
        t(c);
        u(c.onRefresh, c.element);
      }
    }
    return this;
  };
  this.setYear = function(a, c) {
    if (h.hasOwnProperty(a)) {
      var b = h[a].options;
      b.currentView.year = c;
      t(b);
      u(b.onSetYear, b.currentView.year);
    }
    return this;
  };
  this.getYear = function(a) {
    var c = null;
    h.hasOwnProperty(a) && (c = h[a].options.currentView.year);
    return c;
  };
  this.destroyAll = function() {
    for (var a in h) {
      if (h.hasOwnProperty(a)) {
        var c = h[a].options;
        c.element.innerHTML = q.empty;
        c.element.className = q.empty;
        u(c.onDestroy, c.element);
      }
    }
    h = {};
    return this;
  };
  this.destroy = function(a) {
    if (h.hasOwnProperty(a)) {
      var c = h[a].options;
      c.element.innerHTML = q.empty;
      c.element.className = q.empty;
      u(c.onDestroy, c.element);
      delete h[a];
    }
    return this;
  };
  this.setConfiguration = function(a) {
    f = H(a) ? a : {};
    W();
    return this;
  };
  this.getVersion = function() {
    return "0.9.0";
  };
  (function(a, c) {
    A = a;
    J = c;
    W();
    A.addEventListener("DOMContentLoaded", function() {
      for (var b = f.domElementTypes, e = b.length, g = 0; g < e; g++) {
        var k = A.getElementsByTagName(b[g]);
        k = [].slice.call(k);
        for (var l = k.length, n = 0; n < l; n++) {
          var p = k[n], D = !0;
          if (w(p) && p.hasAttribute("data-heat-options")) {
            var d = p.getAttribute("data-heat-options");
            if (B(d)) {
              if (d = ia(d), d.parsed && H(d.result)) {
                d = d.result;
                d = H(d) ? d : {};
                d.showDayNames = x(d.showDayNames, !0);
                d.showGuide = x(d.showGuide, !0);
                d.showTitle = x(d.showTitle, !0);
                d.showYearSelector = x(d.showYearSelector, !0);
                d.showMonthDayGaps = x(d.showMonthDayGaps, !0);
                d.showRefreshButton = x(d.showRefreshButton, !1);
                d.showMonthNames = x(d.showMonthNames, !0);
                d.showExportButton = x(d.showExportButton, !1);
                d.mapTogglesEnabled = x(d.mapTogglesEnabled, !0);
                d.placeMonthNamesOnTheBottom = x(d.placeMonthNamesOnTheBottom, !1);
                K(d.monthsToShow) && (d.monthsToShow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
                K(d.daysToShow) && (d.daysToShow = [1, 2, 3, 4, 5, 6, 7]);
                var E = d;
                var v = d.mapRangeColors;
                var C = [{minimum:10, cssClassName:"day-color-1", tooltipText:"Day Color 1"}, {minimum:15, cssClassName:"day-color-2", tooltipText:"Day Color 2"}, {minimum:20, cssClassName:"day-color-3", tooltipText:"Day Color 3"}, {minimum:25, cssClassName:"day-color-4", tooltipText:"Day Color 4"}];
                v = N(v) ? v : C;
                E.mapRangeColors = v;
                E = d.mapRangeColors.length;
                for (v = 0; v < E; v++) {
                  B(d.mapRangeColors[v].id) || (d.mapRangeColors[v].id = V());
                }
                d.titleText = r(d.titleText, "Heat.js");
                d.dayToolTipText = r(d.dayToolTipText, "{d}{o} {mmmm} {yyyy}");
                d.onDayClick = y(d.onDayClick, null);
                d.onBackYear = y(d.onBackYear, null);
                d.onNextYear = y(d.onNextYear, null);
                d.onRefresh = y(d.onRefresh, null);
                d.onBeforeRender = y(d.onBeforeRender, null);
                d.onRenderComplete = y(d.onRenderComplete, null);
                d.onDestroy = y(d.onDestroy, null);
                d.onExport = y(d.onExport, null);
                d.onSetYear = y(d.onSetYear, null);
                d.onTypeSwitch = y(d.onTypeSwitch, null);
                d.element = p;
                d.currentView = {};
                d.currentView.colorsVisible = {};
                d.currentView.year = null;
                d.currentView.type = "None";
                u(d.onBeforeRender, p);
                B(p.id) || (p.id = V());
                p.removeAttribute("data-heat-options");
                U(p.id, d);
                t(d);
                u(d.onRenderComplete, p);
              } else {
                f.safeMode || (console.error("The attribute 'data-heat-options' is not a valid object."), D = !1);
              }
            } else {
              f.safeMode || (console.error("The attribute 'data-heat-options' has not been set correctly."), D = !1);
            }
          }
          if (!D) {
            break;
          }
        }
      }
    });
    w(J.$heat) || (J.$heat = this);
  })(document, window);
})();