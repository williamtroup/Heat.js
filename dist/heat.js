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
        var f = k[a.element.id];
        var g = [];
        var h = [];
        g.push([F(e.dateText), F(e.countText)].join());
        for (var l in f) {
          f.hasOwnProperty(l) && "options" !== l && h.push(l);
        }
        h.sort();
        l = h.length;
        for (var p = 0; p < l; p++) {
          var n = h[p];
          f.hasOwnProperty(n) && "options" !== n && g.push([F(n), F(f[n])].join());
        }
        g = g.join(q.newLine);
        g !== q.empty && (f = m("a"), f.style.display = "none", f.setAttribute("target", "_blank"), f.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(g)), g = f.setAttribute, l = new Date(), h = z(l.getDate()) + "-" + z(l.getMonth() + 1) + "-" + l.getFullYear(), l = z(l.getHours()) + "-" + z(l.getMinutes()), g.call(f, "download", h + "_" + l + ".csv"), A.body.appendChild(f), f.click(), A.body.removeChild(f));
        v(a.onExport, a.element);
      });
      a.showRefreshButton && (b = m("button", "refresh"), b.innerHTML = e.refreshButtonText, c.appendChild(b), b.onclick = function() {
        w(a);
        v(a.onRefresh, a.element);
      });
      a.showYearSelector && (b = m("button", "back"), b.innerHTML = e.backButtonText, c.appendChild(b), b.onclick = function() {
        a.currentView.year--;
        w(a);
        v(a.onBackYear, a.currentView.year);
      }, a.currentView.yearText = m("div", "year-text"), a.currentView.yearText.innerHTML = a.currentView.year, c.appendChild(a.currentView.yearText), b = m("button", "next"), b.innerHTML = e.nextButtonText, c.appendChild(b), b.onclick = function() {
        a.currentView.year++;
        w(a);
        v(a.onNextYear, a.currentView.year);
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
          var l = m("div", "day-name");
          l.innerHTML = e.dayNames[h];
          g.appendChild(l);
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
        l = m("div", "month");
        g.appendChild(l);
        if (a.showMonthNames) {
          var p = m("div", "month-name");
          p.innerHTML = e.monthNames[h];
          l.appendChild(p);
        }
        p = m("div", "day-columns");
        l.appendChild(p);
        var n = (new Date(b, h + 1, 0)).getDate(), x = m("div", "day-column"), d = !1;
        p.appendChild(x);
        var B = Q(new Date(b, h, 1)), t = 1;
        n += B;
        for (var D = 0; D < n; D++) {
          if (D >= B) {
            d = !0;
          } else {
            var aa = m("div", "day-disabled");
            x.appendChild(aa);
          }
          d && (-1 < a.daysToShow.indexOf(t) && ba(a, x, D - B, h, b, c), 0 === (D + 1) % 7 && (x = m("div", "day-column"), p.appendChild(x), t = 0));
          t++;
        }
        0 < B && u(G) && !a.showMonthDayGaps && f && (l.style.marginLeft = -G + "px");
        f = !0;
      }
    }
  }
  function ba(a, c, b, f, g, h) {
    var l = b + 1;
    b = m("div", "day");
    var p = new Date(g, f, l), n = k[a.element.id][L(p)];
    b.title = ca(a.dayToolTipText, p);
    c.appendChild(b);
    b.onclick = function() {
      v(a.onDayClick, p, n);
    };
    c = a.mapRangeColors.length;
    f = null;
    for (g = 0; g < c; g++) {
      if (l = h[g], n >= l.minimum) {
        f = l;
      } else {
        break;
      }
    }
    u(f) && R(a, f.id) && (b.className += q.space + f.cssClassName);
    u(G) || a.showMonthDayGaps || (h = S(b, "margin-left", !0), c = S(b, "margin-right", !0), G = b.offsetWidth + h + c);
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
      for (var f = a.mapRangeColors.sort(function(l, p) {
        return p.range - l.range;
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
  function u(a) {
    return null !== a && void 0 !== a && a !== q.empty;
  }
  function H(a) {
    return u(a) && "object" === typeof a;
  }
  function I(a) {
    return u(a) && "boolean" === typeof a;
  }
  function E(a) {
    return u(a) && "string" === typeof a;
  }
  function M(a) {
    return u(a) && "function" === typeof a;
  }
  function P(a) {
    return u(a) && "number" === typeof a;
  }
  function N(a) {
    return H(a) && a instanceof Array;
  }
  function m(a, c) {
    var b = a.toLowerCase();
    var f = "text" === b;
    O.hasOwnProperty(b) || (O[b] = f ? A.createTextNode(q.empty) : A.createElement(b));
    b = O[b].cloneNode(!1);
    u(c) && (b.className = c);
    return b;
  }
  function S(a, c, b) {
    var f = null;
    b = u(b) ? b : !1;
    J.getComputedStyle ? f = A.defaultView.getComputedStyle(a, null).getPropertyValue(c) : a.currentStyle && (f = a.currentStyle[c]);
    b && (f = parseInt(f, 10));
    return f;
  }
  function v(a) {
    M(a) && a.apply(null, [].slice.call(arguments, 1));
  }
  function r(a, c) {
    return E(a) ? a : c;
  }
  function y(a, c) {
    return I(a) ? a : c;
  }
  function C(a, c) {
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
  var A = null, J = null, e = {}, q = {empty:"", space:" ", newLine:"\n"}, O = {}, G = null, k = {};
  this.addDate = function(a, c, b) {
    k.hasOwnProperty(a) && (b = I(b) ? b : !0, c = L(c), k[a].hasOwnProperty(c) || (k[a][c] = 0), k[a][c]++, b && w(k[a].options));
    return this;
  };
  this.removeDate = function(a, c, b) {
    k.hasOwnProperty(a) && (c = L(c), k[a].hasOwnProperty(c) && (b = I(b) ? b : !0, 0 < k[a][c] && k[a][c]--, b && w(k[a].options)));
    return this;
  };
  this.reset = function(a, c) {
    if (k.hasOwnProperty(a)) {
      c = I(c) ? c : !0;
      var b = k[a].options;
      k[a] = {};
      k[a].options = b;
      c && w(k[a].options);
    }
    return this;
  };
  this.refresh = function(a) {
    k.hasOwnProperty(a) && (a = k[a].options, w(a), v(a.onRefresh, a.element));
    return this;
  };
  this.refreshAll = function() {
    for (var a in k) {
      if (k.hasOwnProperty(a)) {
        var c = k[a].options;
        w(c);
        v(c.onRefresh, c.element);
      }
    }
    return this;
  };
  this.destroyAll = function() {
    for (var a in k) {
      if (k.hasOwnProperty(a)) {
        var c = k[a].options;
        c.element.innerHTML = q.empty;
        c.element.className = q.empty;
        v(c.onDestroy, c.element);
      }
    }
    k = {};
    return this;
  };
  this.destroy = function(a) {
    if (k.hasOwnProperty(a)) {
      var c = k[a].options;
      c.element.innerHTML = q.empty;
      c.element.className = q.empty;
      v(c.onDestroy, c.element);
      delete k[a];
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
    A = a;
    J = c;
    U();
    A.addEventListener("DOMContentLoaded", function() {
      for (var b = e.domElementTypes, f = b.length, g = 0; g < f; g++) {
        var h = A.getElementsByTagName(b[g]);
        h = [].slice.call(h);
        for (var l = h.length, p = 0; p < l; p++) {
          var n = h[p], x = !0;
          if (u(n) && n.hasAttribute("data-heat-options")) {
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
                var B = d;
                var t = d.mapRangeColors;
                var D = [{minimum:10, cssClassName:"day-color-1", tooltipText:"Day Color 1"}, {minimum:15, cssClassName:"day-color-2", tooltipText:"Day Color 2"}, {minimum:20, cssClassName:"day-color-3", tooltipText:"Day Color 3"}, {minimum:25, cssClassName:"day-color-4", tooltipText:"Day Color 4"}];
                t = N(t) ? t : D;
                B.mapRangeColors = t;
                B = d.mapRangeColors.length;
                for (t = 0; t < B; t++) {
                  E(d.mapRangeColors[t].id) || (d.mapRangeColors[t].id = T());
                }
                d.titleText = r(d.titleText, "Heat.js");
                d.dayToolTipText = r(d.dayToolTipText, "{d}{o} {mmmm} {yyyy}");
                d.onDayClick = C(d.onDayClick, null);
                d.onBackYear = C(d.onBackYear, null);
                d.onNextYear = C(d.onNextYear, null);
                d.onRefresh = C(d.onRefresh, null);
                d.onBeforeRender = C(d.onBeforeRender, null);
                d.onRenderComplete = C(d.onRenderComplete, null);
                d.onDestroy = C(d.onDestroy, null);
                d.onExport = C(d.onExport, null);
                d.element = n;
                d.currentView = {};
                d.currentView.colorsVisible = {};
                v(d.onBeforeRender, n);
                E(n.id) || (n.id = T());
                n.removeAttribute("data-heat-options");
                k[n.id] = {options:d};
                w(d);
                v(d.onRenderComplete, n);
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
    u(J.$heat) || (J.$heat = this);
  })(document, window);
})();