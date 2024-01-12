/*! Heat.js v0.6.0 | (c) Bunoon 2024 | MIT License */
(function() {
  function w(a) {
    a.element.className = "heat-js";
    a.element.innerHTML = q.empty;
    V(a);
    W(a);
    X(a);
  }
  function V(a) {
    P(a.currentView.year) || (a.currentView.year = (new Date()).getFullYear());
    if (a.showTitle || a.showYearSelector || a.showRefreshButton || a.showExportButton) {
      var c = m("div", "year");
      a.element.appendChild(c);
      if (a.showTitle) {
        var b = m("div", "title");
        b.innerHTML = a.titleText;
        c.appendChild(b);
      }
      a.showExportButton && (b = m("button", "export"), b.innerHTML = e.exportButtonText, c.appendChild(b), b.onclick = function() {
        var f = l[a.element.id];
        var g = [];
        var h = [];
        g.push([F(e.dateText), F(e.countText)].join());
        for (var k in f) {
          f.hasOwnProperty(k) && "options" !== k && h.push(k);
        }
        h.sort();
        k = h.length;
        for (var p = 0; p < k; p++) {
          var n = h[p];
          f.hasOwnProperty(n) && "options" !== n && g.push([F(n), F(f[n])].join());
        }
        g = g.join(q.newLine);
        g !== q.empty && (f = m("a"), f.style.display = "none", f.setAttribute("target", "_blank"), f.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(g)), g = f.setAttribute, k = new Date(), h = z(k.getDate()) + "-" + z(k.getMonth() + 1) + "-" + k.getFullYear(), k = z(k.getHours()) + "-" + z(k.getMinutes()), g.call(f, "download", h + "_" + k + ".csv"), C.body.appendChild(f), f.click(), C.body.removeChild(f));
        u(a.onExport, a.element);
      });
      a.showRefreshButton && (b = m("button", "refresh"), b.innerHTML = e.refreshButtonText, c.appendChild(b), b.onclick = function() {
        w(a);
        u(a.onRefresh, a.element);
      });
      a.showYearSelector && (b = m("button", "back"), b.innerHTML = e.backButtonText, c.appendChild(b), b.onclick = function() {
        a.currentView.year--;
        w(a);
        u(a.onBackYear, a.currentView.year);
      }, a.currentView.yearText = m("div", "year-text"), a.currentView.yearText.innerHTML = a.currentView.year, c.appendChild(a.currentView.yearText), b = m("button", "next"), b.innerHTML = e.nextButtonText, c.appendChild(b), b.onclick = function() {
        a.currentView.year++;
        w(a);
        u(a.onNextYear, a.currentView.year);
      });
    }
  }
  function W(a) {
    var c = m("div", "map");
    a.element.appendChild(c);
    var b = a.currentView.year, f = !1;
    if (a.showDayNames) {
      var g = m("div", "days");
      c.appendChild(g);
      a.showMonthNames || (g.style.paddingTop = "0px", g.style.marginTop = "-5px");
      for (var h = 0; 7 > h; h++) {
        if (-1 < a.daysToShow.indexOf(h + 1)) {
          var k = m("div", "day-name");
          k.innerHTML = e.dayNames[h];
          g.appendChild(k);
        }
      }
    }
    g = m("div", "months");
    c.appendChild(g);
    c = a.mapRangeColors.sort(function(Y, Z) {
      return Z.range - Y.range;
    });
    for (h = 0; 12 > h; h++) {
      if (-1 < a.monthsToShow.indexOf(h + 1)) {
        k = m("div", "month");
        g.appendChild(k);
        if (a.showMonthNames) {
          var p = m("div", "month-name");
          p.innerHTML = e.monthNames[h];
          k.appendChild(p);
        }
        p = m("div", "day-columns");
        k.appendChild(p);
        var n = (new Date(b, h + 1, 0)).getDate(), x = m("div", "day-column"), d = !1;
        p.appendChild(x);
        var A = Q(new Date(b, h, 1)), t = 1;
        n += A;
        for (var D = 0; D < n; D++) {
          if (D >= A) {
            d = !0;
          } else {
            var aa = m("div", "day-disabled");
            x.appendChild(aa);
          }
          d && (-1 < a.daysToShow.indexOf(t) && ba(a, x, D - A, h, b, c), 0 === (D + 1) % 7 && (x = m("div", "day-column"), p.appendChild(x), t = 0));
          t++;
        }
        0 < A && v(G) && !a.showMonthDayGaps && f && (k.style.marginLeft = -G + "px");
        f = !0;
      }
    }
  }
  function ba(a, c, b, f, g, h) {
    var k = b + 1;
    b = m("div", "day");
    var p = new Date(g, f, k), n = l[a.element.id][L(p)];
    b.title = ca(a.dayToolTipText, p);
    c.appendChild(b);
    b.onclick = function() {
      u(a.onDayClick, p, n);
    };
    c = a.mapRangeColors.length;
    f = null;
    for (g = 0; g < c; g++) {
      if (k = h[g], n >= k.minimum) {
        f = k;
      } else {
        break;
      }
    }
    v(f) && R(a, f.id) && (b.className += q.space + f.cssClassName);
    v(G) || a.showMonthDayGaps || (h = S(b, "margin-left"), c = S(b, "margin-right"), G = b.offsetWidth + parseInt(h, 10) + parseInt(c, 10));
  }
  function X(a) {
    if (a.showGuide) {
      var c = m("div", "guide");
      a.element.appendChild(c);
      var b = m("div", "less-text");
      b.innerHTML = e.lessText;
      c.appendChild(b);
      b = m("div", "days");
      c.appendChild(b);
      for (var f = a.mapRangeColors.sort(function(k, p) {
        return p.range - k.range;
      }), g = f.length, h = 0; h < g; h++) {
        da(a, b, f[h]);
      }
      a = m("div", "more-text");
      a.innerHTML = e.moreText;
      c.appendChild(a);
    }
  }
  function da(a, c, b) {
    var f = m("div");
    f.title = b.tooltipText;
    c.appendChild(f);
    R(a, b.id) ? f.className = "day " + b.cssClassName : f.className = "day";
    f.onclick = function() {
      a.currentView.colorsVisible.hasOwnProperty(b.id) || (a.currentView.colorsVisible[b.id] = !0);
      f.className = a.currentView.colorsVisible[b.id] ? "day" : "day " + b.cssClassName;
      a.currentView.colorsVisible[b.id] = !a.currentView.colorsVisible[b.id];
      w(a);
    };
  }
  function R(a, c) {
    return !a.currentView.colorsVisible.hasOwnProperty(c) || a.currentView.colorsVisible[c];
  }
  function F(a) {
    a = a.toString().replace(/(\r\n|\n|\r)/gm, q.empty).replace(/(\s\s)/gm, q.space);
    a = a.replace(/"/g, '""');
    return '"' + a + '"';
  }
  function Q(a) {
    return 0 > a.getDay() - 1 ? 6 : a.getDay() - 1;
  }
  function ca(a, c) {
    var b = a, f = Q(c);
    b = b.replace("{dddd}", e.dayNames[f]);
    b = b.replace("{dd}", z(c.getDate()));
    b = b.replace("{d}", c.getDate());
    f = b.replace;
    var g = c.getDate(), h = e.thText;
    if (31 === g || 21 === g || 1 === g) {
      h = e.stText;
    } else if (22 === g || 2 === g) {
      h = e.ndText;
    } else if (23 === g || 3 === g) {
      h = e.rdText;
    }
    b = f.call(b, "{o}", h);
    b = b.replace("{mmmm}", e.monthNames[c.getMonth()]);
    b = b.replace("{mm}", z(c.getMonth() + 1));
    b = b.replace("{m}", c.getMonth() + 1);
    b = b.replace("{yyyy}", c.getFullYear());
    b = b.replace("{yyy}", c.getFullYear().toString().substring(1));
    b = b.replace("{yy}", c.getFullYear().toString().substring(2));
    return b = b.replace("{y}", parseInt(c.getFullYear().toString().substring(2)).toString());
  }
  function v(a) {
    return null !== a && void 0 !== a && a !== q.empty;
  }
  function H(a) {
    return v(a) && "object" === typeof a;
  }
  function I(a) {
    return v(a) && "boolean" === typeof a;
  }
  function E(a) {
    return v(a) && "string" === typeof a;
  }
  function M(a) {
    return v(a) && "function" === typeof a;
  }
  function P(a) {
    return v(a) && "number" === typeof a;
  }
  function N(a) {
    return H(a) && a instanceof Array;
  }
  function m(a, c) {
    var b = a.toLowerCase();
    var f = "text" === b;
    O.hasOwnProperty(b) || (O[b] = f ? C.createTextNode(q.empty) : C.createElement(b));
    b = O[b].cloneNode(!1);
    v(c) && (b.className = c);
    return b;
  }
  function S(a, c) {
    var b = null;
    J.getComputedStyle ? b = document.defaultView.getComputedStyle(a, null).getPropertyValue(c) : a.currentStyle && (b = a.currentStyle[c]);
    return b;
  }
  function u(a) {
    M(a) && a.apply(null, [].slice.call(arguments, 1));
  }
  function r(a, c) {
    return E(a) ? a : c;
  }
  function y(a, c) {
    return I(a) ? a : c;
  }
  function B(a, c) {
    return M(a) ? a : c;
  }
  function ea(a) {
    var c = !0, b = null;
    try {
      E(a) && (b = JSON.parse(a));
    } catch (f) {
      try {
        b = eval("(" + a + ")"), M(b) && (b = b());
      } catch (g) {
        e.safeMode || (console.error("Errors in object: " + f.message + ", " + g.message), c = !1), b = null;
      }
    }
    return {parsed:c, result:b};
  }
  function T() {
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
  function U() {
    e.safeMode = y(e.safeMode, !0);
    var a = e, c = e.domElementTypes, b = ["*"];
    E(c) ? (c = c.split(q.space), 0 === c.length && (c = b)) : c = N(c) ? c : b;
    a.domElementTypes = c;
    e.stText = r(e.stText, "st");
    e.ndText = r(e.ndText, "nd");
    e.rdText = r(e.rdText, "rd");
    e.thText = r(e.thText, "th");
    e.backButtonText = r(e.backButtonText, "Back");
    e.nextButtonText = r(e.nextButtonText, "Next");
    e.refreshButtonText = r(e.refreshButtonText, "Refresh");
    e.exportButtonText = r(e.exportButtonText, "Export");
    e.lessText = r(e.lessText, "Less");
    e.moreText = r(e.moreText, "More");
    e.dateText = r(e.dateText, "Date");
    e.countText = r(e.countText, "Count");
    K(e.monthNames, 12) && (e.monthNames = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "));
    K(e.dayNames, 7) && (e.dayNames = "Mon Tue Wed Thu Fri Sat Sun".split(" "));
  }
  function K(a, c) {
    c = P(c) ? c : 1;
    return !N(a) || a.length < c;
  }
  var C = null, J = null, e = {}, q = {empty:"", space:" ", newLine:"\n"}, O = {}, G = null, l = {};
  this.addDate = function(a, c, b) {
    l.hasOwnProperty(a) && (b = I(b) ? b : !0, c = L(c), l[a].hasOwnProperty(c) || (l[a][c] = 0), l[a][c]++, b && w(l[a].options));
    return this;
  };
  this.removeDate = function(a, c, b) {
    l.hasOwnProperty(a) && (c = L(c), l[a].hasOwnProperty(c) && (b = I(b) ? b : !0, l[a][c]--, b && w(l[a].options)));
    return this;
  };
  this.reset = function(a, c) {
    if (l.hasOwnProperty(a)) {
      c = I(c) ? c : !0;
      var b = l[a].options;
      l[a] = {};
      l[a].options = b;
      c && w(l[a].options);
    }
    return this;
  };
  this.refresh = function(a) {
    l.hasOwnProperty(a) && (a = l[a].options, w(a), u(a.onRefresh, a.element));
    return this;
  };
  this.refreshAll = function() {
    for (var a in l) {
      if (l.hasOwnProperty(a)) {
        var c = l[a].options;
        w(c);
        u(c.onRefresh, c.element);
      }
    }
    return this;
  };
  this.destroyAll = function() {
    for (var a in l) {
      if (l.hasOwnProperty(a)) {
        var c = l[a].options;
        c.element.innerHTML = q.empty;
        c.element.className = q.empty;
        u(c.onDestroy, c.element);
      }
    }
    l = {};
    return this;
  };
  this.destroy = function(a) {
    if (l.hasOwnProperty(a)) {
      var c = l[a].options;
      c.element.innerHTML = q.empty;
      c.element.className = q.empty;
      u(c.onDestroy, c.element);
      delete l[a];
    }
    return this;
  };
  this.setConfiguration = function(a) {
    e = H(a) ? a : {};
    U();
    return this;
  };
  this.getVersion = function() {
    return "0.6.0";
  };
  (function(a, c) {
    C = a;
    J = c;
    U();
    C.addEventListener("DOMContentLoaded", function() {
      for (var b = e.domElementTypes, f = b.length, g = 0; g < f; g++) {
        var h = C.getElementsByTagName(b[g]);
        h = [].slice.call(h);
        for (var k = h.length, p = 0; p < k; p++) {
          var n = h[p], x = !0;
          if (v(n) && n.hasAttribute("data-heat-options")) {
            var d = n.getAttribute("data-heat-options");
            if (E(d)) {
              if (d = ea(d), d.parsed && H(d.result)) {
                d = d.result;
                d = H(d) ? d : {};
                d.showDayNames = y(d.showDayNames, !0);
                d.showGuide = y(d.showGuide, !0);
                d.showTitle = y(d.showTitle, !0);
                d.showYearSelector = y(d.showYearSelector, !0);
                d.showMonthDayGaps = y(d.showMonthDayGaps, !0);
                d.showRefreshButton = y(d.showRefreshButton, !1);
                d.showMonthNames = y(d.showMonthNames, !0);
                d.showExportButton = y(d.showExportButton, !1);
                K(d.monthsToShow) && (d.monthsToShow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
                K(d.daysToShow) && (d.daysToShow = [1, 2, 3, 4, 5, 6, 7]);
                var A = d;
                var t = d.mapRangeColors;
                var D = [{minimum:10, cssClassName:"day-color-1", tooltipText:"Day Color 1"}, {minimum:15, cssClassName:"day-color-2", tooltipText:"Day Color 2"}, {minimum:20, cssClassName:"day-color-3", tooltipText:"Day Color 3"}, {minimum:25, cssClassName:"day-color-4", tooltipText:"Day Color 4"}];
                t = N(t) ? t : D;
                A.mapRangeColors = t;
                A = d.mapRangeColors.length;
                for (t = 0; t < A; t++) {
                  E(d.mapRangeColors[t].id) || (d.mapRangeColors[t].id = T());
                }
                d.titleText = r(d.titleText, "Heat.js");
                d.dayToolTipText = r(d.dayToolTipText, "{d}{o} {mmmm} {yyyy}");
                d.onDayClick = B(d.onDayClick, null);
                d.onBackYear = B(d.onBackYear, null);
                d.onNextYear = B(d.onNextYear, null);
                d.onRefresh = B(d.onRefresh, null);
                d.onBeforeRender = B(d.onBeforeRender, null);
                d.onRenderComplete = B(d.onRenderComplete, null);
                d.onDestroy = B(d.onDestroy, null);
                d.onExport = B(d.onExport, null);
                d.element = n;
                d.currentView = {};
                d.currentView.colorsVisible = {};
                u(d.onBeforeRender, n);
                E(n.id) || (n.id = T());
                n.removeAttribute("data-heat-options");
                l[n.id] = {options:d};
                w(d);
                u(d.onRenderComplete, n);
              } else {
                e.safeMode || (console.error("The attribute 'data-heat-options' is not a valid object."), x = !1);
              }
            } else {
              e.safeMode || (console.error("The attribute 'data-heat-options' has not been set correctly."), x = !1);
            }
          }
          if (!x) {
            break;
          }
        }
      }
    });
    v(J.$heat) || (J.$heat = this);
  })(document, window);
})();