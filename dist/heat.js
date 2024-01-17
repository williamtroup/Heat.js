/*! Heat.js v0.9.0 | (c) Bunoon 2024 | MIT License */
(function() {
  function t(a) {
    a.element.className = "heat-js";
    a.element.innerHTML = p.empty;
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
        var d = h[a.element.id].type[a.currentView.type];
        var g = [];
        var k = [];
        g.push([G(f.dateText), G(f.countText)].join());
        for (var l in d) {
          d.hasOwnProperty(l) && k.push(l);
        }
        k.sort();
        l = k.length;
        for (var n = 0; n < l; n++) {
          var q = k[n];
          d.hasOwnProperty(q) && g.push([G(q), G(d[q])].join());
        }
        g = g.join(p.newLine);
        g !== p.empty && (d = m("a"), d.style.display = "none", d.setAttribute("target", "_blank"), d.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(g)), g = d.setAttribute, l = new Date(), k = B(l.getDate()) + "-" + B(l.getMonth() + 1) + "-" + l.getFullYear(), l = B(l.getHours()) + "-" + B(l.getMinutes()), n = p.empty, "None" !== a.currentView.type && (n = a.currentView.type.toLowerCase().replace(p.space, "_") + "_"), g.call(d, "download", n + k + "_" + l + ".csv"), C.body.appendChild(d), 
        d.click(), C.body.removeChild(d));
        v(a.onExport, a.element);
      });
      a.showRefreshButton && (b = m("button", "refresh"), b.innerHTML = f.refreshButtonText, c.appendChild(b), b.onclick = function() {
        t(a);
        v(a.onRefresh, a.element);
      });
      a.showYearSelector && (b = m("button", "back"), b.innerHTML = f.backButtonText, c.appendChild(b), b.onclick = function() {
        a.currentView.year--;
        t(a);
        v(a.onBackYear, a.currentView.year);
      }, a.currentView.yearText = m("div", "year-text"), a.currentView.yearText.innerHTML = a.currentView.year, c.appendChild(a.currentView.yearText), b = m("button", "next"), b.innerHTML = f.nextButtonText, c.appendChild(b), b.onclick = function() {
        a.currentView.year++;
        t(a);
        v(a.onNextYear, a.currentView.year);
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
    var d = !1;
    if (a.showDayNames) {
      var g = m("div", "days");
      b.appendChild(g);
      a.showMonthNames || (g.style.paddingTop = "0px", g.style.marginTop = "-5px");
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
        if (a.showMonthNames) {
          var n = m("div", "month-name");
          n.innerHTML = f.monthNames[k];
          l.appendChild(n);
        }
        n = m("div", "day-columns");
        l.appendChild(n);
        var q = (new Date(c, k + 1, 0)).getDate(), y = m("div", "day-column"), e = !1;
        n.appendChild(y);
        var z = Q(new Date(c, k, 1)), u = 1;
        q += z;
        for (var E = 0; E < q; E++) {
          if (E >= z) {
            e = !0;
          } else {
            var ca = m("div", "day-disabled");
            y.appendChild(ca);
          }
          e && (-1 < a.daysToShow.indexOf(u) && da(a, y, E - z, k, c, b), 0 === (E + 1) % 7 && (y = m("div", "day-column"), n.appendChild(y), u = 0));
          u++;
        }
        d && w(F) && (0 < z && !a.showMonthDayGaps ? l.style.marginLeft = -F + "px" : 0 === z && a.showMonthDayGaps && (l.style.marginLeft = F + "px"));
        d = !0;
      }
    }
  }
  function da(a, c, b, d, g, k) {
    var l = b + 1;
    b = m("div", "day");
    var n = new Date(g, d, l), q = h[a.element.id].type[a.currentView.type][L(n)];
    b.title = ea(a.dayToolTipText, n);
    c.appendChild(b);
    b.onclick = function() {
      v(a.onDayClick, n, q);
    };
    c = a.mapRangeColors.length;
    d = null;
    for (g = 0; g < c; g++) {
      if (l = k[g], q >= l.minimum) {
        d = l;
      } else {
        break;
      }
    }
    w(d) && R(a, d.id) && (b.className += p.space + d.cssClassName);
    w(F) || (k = S(b, "margin-left", !0), c = S(b, "margin-right", !0), F = b.offsetWidth + k + c);
  }
  function Z(a) {
    if (a.showGuide) {
      var c = m("div", "guide");
      a.element.appendChild(c);
      var b = m("div", "map-types");
      c.appendChild(b);
      var d = 0;
      for (k in h[a.element.id].type.None) {
        if (h[a.element.id].type.None.hasOwnProperty(k)) {
          d++;
          break;
        }
      }
      if (1 < h[a.element.id].types) {
        for (var g in h[a.element.id].type) {
          if ("None" !== g || 0 < d) {
            0 === d && "None" === a.currentView.type && (a.currentView.type = g), fa(a, b, g);
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
      } : c.className += p.space + "no-click";
      c = m("div", "days");
      b.appendChild(c);
      d = a.mapRangeColors.sort(function(l, n) {
        return n.range - l.range;
      });
      var k = d.length;
      for (g = 0; g < k; g++) {
        ha(a, c, d[g]);
      }
      c = m("div", "more-text");
      c.innerHTML = f.moreText;
      b.appendChild(c);
      a.mapTogglesEnabled ? c.onclick = function() {
        T(a, !0);
      } : c.className += p.space + "no-click";
    }
  }
  function fa(a, c, b) {
    var d = m("button", "type");
    d.innerHTML = b;
    c.appendChild(d);
    a.currentView.type === b && (d.className += p.space + "active");
    d.onclick = function() {
      a.currentView.type !== b && (a.currentView.type = b, t(a));
    };
  }
  function ha(a, c, b) {
    var d = m("div");
    d.title = b.tooltipText;
    c.appendChild(d);
    R(a, b.id) ? d.className = "day " + b.cssClassName : d.className = "day";
    a.mapTogglesEnabled ? d.onclick = function() {
      a.currentView.colorsVisible.hasOwnProperty(b.id) || (a.currentView.colorsVisible[b.id] = !0);
      d.className = a.currentView.colorsVisible[b.id] ? "day" : "day " + b.cssClassName;
      a.currentView.colorsVisible[b.id] = !a.currentView.colorsVisible[b.id];
      t(a);
    } : d.className += p.space + "no-click";
  }
  function R(a, c) {
    return !a.currentView.colorsVisible.hasOwnProperty(c) || a.currentView.colorsVisible[c];
  }
  function U(a, c) {
    h[a] = {options:c, type:{}, types:1};
    h[a].type.None = {};
  }
  function T(a, c) {
    for (var b = a.mapRangeColors.length, d = 0; d < b; d++) {
      a.currentView.colorsVisible[a.mapRangeColors[d].id] = c;
    }
    t(a);
  }
  function G(a) {
    a = a.toString().replace(/(\r\n|\n|\r)/gm, p.empty).replace(/(\s\s)/gm, p.space);
    a = a.replace(/"/g, '""');
    return '"' + a + '"';
  }
  function Q(a) {
    return 0 > a.getDay() - 1 ? 6 : a.getDay() - 1;
  }
  function ea(a, c) {
    var b = a, d = Q(c);
    b = b.replace("{dddd}", f.dayNames[d]);
    b = b.replace("{dd}", B(c.getDate()));
    b = b.replace("{d}", c.getDate());
    d = b.replace;
    var g = c.getDate(), k = f.thText;
    if (31 === g || 21 === g || 1 === g) {
      k = f.stText;
    } else if (22 === g || 2 === g) {
      k = f.ndText;
    } else if (23 === g || 3 === g) {
      k = f.rdText;
    }
    b = d.call(b, "{o}", k);
    b = b.replace("{mmmm}", f.monthNames[c.getMonth()]);
    b = b.replace("{mm}", B(c.getMonth() + 1));
    b = b.replace("{m}", c.getMonth() + 1);
    b = b.replace("{yyyy}", c.getFullYear());
    b = b.replace("{yyy}", c.getFullYear().toString().substring(1));
    b = b.replace("{yy}", c.getFullYear().toString().substring(2));
    return b = b.replace("{y}", parseInt(c.getFullYear().toString().substring(2)).toString());
  }
  function w(a) {
    return null !== a && void 0 !== a && a !== p.empty;
  }
  function H(a) {
    return w(a) && "object" === typeof a;
  }
  function I(a) {
    return w(a) && "boolean" === typeof a;
  }
  function D(a) {
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
    var d = "text" === b;
    O.hasOwnProperty(b) || (O[b] = d ? C.createTextNode(p.empty) : C.createElement(b));
    b = O[b].cloneNode(!1);
    w(c) && (b.className = c);
    return b;
  }
  function S(a, c, b) {
    var d = null;
    b = w(b) ? b : !1;
    J.getComputedStyle ? d = C.defaultView.getComputedStyle(a, null).getPropertyValue(c) : a.currentStyle && (d = a.currentStyle[c]);
    b && (d = parseInt(d, 10));
    return d;
  }
  function v(a) {
    M(a) && a.apply(null, [].slice.call(arguments, 1));
  }
  function r(a, c) {
    return D(a) ? a : c;
  }
  function x(a, c) {
    return I(a) ? a : c;
  }
  function A(a, c) {
    return M(a) ? a : c;
  }
  function ia(a) {
    var c = !0, b = null;
    try {
      D(a) && (b = JSON.parse(a));
    } catch (d) {
      try {
        b = eval("(" + a + ")"), M(b) && (b = b());
      } catch (g) {
        f.safeMode || (console.error("Errors in object: " + d.message + ", " + g.message), c = !1), b = null;
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
    return a.join(p.empty);
  }
  function B(a) {
    a = a.toString();
    return 1 === a.length ? "0" + a : a;
  }
  function L(a) {
    return a.getFullYear() + "-" + B(a.getMonth() + 1) + "-" + B(a.getDate());
  }
  function W() {
    f.safeMode = x(f.safeMode, !0);
    var a = f, c = f.domElementTypes, b = ["*"];
    D(c) ? (c = c.split(p.space), 0 === c.length && (c = b)) : c = N(c) ? c : b;
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
  var C = null, J = null, f = {}, p = {empty:"", space:" ", newLine:"\n"}, O = {}, F = null, h = {};
  this.addDate = function(a, c, b, d) {
    h.hasOwnProperty(a) && (d = I(d) ? d : !0, b = D(b) ? b : "None", c = L(c), h[a].type.hasOwnProperty(b) || (h[a].type[b] = {}, h[a].types++), h[a].type[b].hasOwnProperty(c) || (h[a].type[b][c] = 0), h[a].type[b][c]++, d && t(h[a].options));
    return this;
  };
  this.removeDate = function(a, c, b, d) {
    h.hasOwnProperty(a) && (b = D(b) ? b : "None", c = L(c), h[a].type.hasOwnProperty(b) && h[a].type[b].hasOwnProperty(c) && (d = I(d) ? d : !0, 0 < h[a].type[b][c] && h[a].type[b][c]--, d && t(h[a].options)));
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
    h.hasOwnProperty(a) && (a = h[a].options, t(a), v(a.onRefresh, a.element));
    return this;
  };
  this.refreshAll = function() {
    for (var a in h) {
      if (h.hasOwnProperty(a)) {
        var c = h[a].options;
        t(c);
        v(c.onRefresh, c.element);
      }
    }
    return this;
  };
  this.setYear = function(a, c) {
    if (h.hasOwnProperty(a)) {
      var b = h[a].options;
      b.currentView.year = c;
      t(b);
      v(b.onSetYear, b.currentView.year);
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
        c.element.innerHTML = p.empty;
        c.element.className = p.empty;
        v(c.onDestroy, c.element);
      }
    }
    h = {};
    return this;
  };
  this.destroy = function(a) {
    if (h.hasOwnProperty(a)) {
      var c = h[a].options;
      c.element.innerHTML = p.empty;
      c.element.className = p.empty;
      v(c.onDestroy, c.element);
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
    C = a;
    J = c;
    W();
    C.addEventListener("DOMContentLoaded", function() {
      for (var b = f.domElementTypes, d = b.length, g = 0; g < d; g++) {
        var k = C.getElementsByTagName(b[g]);
        k = [].slice.call(k);
        for (var l = k.length, n = 0; n < l; n++) {
          var q = k[n], y = !0;
          if (w(q) && q.hasAttribute("data-heat-options")) {
            var e = q.getAttribute("data-heat-options");
            if (D(e)) {
              if (e = ia(e), e.parsed && H(e.result)) {
                e = e.result;
                e = H(e) ? e : {};
                e.showDayNames = x(e.showDayNames, !0);
                e.showGuide = x(e.showGuide, !0);
                e.showTitle = x(e.showTitle, !0);
                e.showYearSelector = x(e.showYearSelector, !0);
                e.showMonthDayGaps = x(e.showMonthDayGaps, !0);
                e.showRefreshButton = x(e.showRefreshButton, !1);
                e.showMonthNames = x(e.showMonthNames, !0);
                e.showExportButton = x(e.showExportButton, !1);
                e.mapTogglesEnabled = x(e.mapTogglesEnabled, !0);
                K(e.monthsToShow) && (e.monthsToShow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
                K(e.daysToShow) && (e.daysToShow = [1, 2, 3, 4, 5, 6, 7]);
                var z = e;
                var u = e.mapRangeColors;
                var E = [{minimum:10, cssClassName:"day-color-1", tooltipText:"Day Color 1"}, {minimum:15, cssClassName:"day-color-2", tooltipText:"Day Color 2"}, {minimum:20, cssClassName:"day-color-3", tooltipText:"Day Color 3"}, {minimum:25, cssClassName:"day-color-4", tooltipText:"Day Color 4"}];
                u = N(u) ? u : E;
                z.mapRangeColors = u;
                z = e.mapRangeColors.length;
                for (u = 0; u < z; u++) {
                  D(e.mapRangeColors[u].id) || (e.mapRangeColors[u].id = V());
                }
                e.titleText = r(e.titleText, "Heat.js");
                e.dayToolTipText = r(e.dayToolTipText, "{d}{o} {mmmm} {yyyy}");
                e.onDayClick = A(e.onDayClick, null);
                e.onBackYear = A(e.onBackYear, null);
                e.onNextYear = A(e.onNextYear, null);
                e.onRefresh = A(e.onRefresh, null);
                e.onBeforeRender = A(e.onBeforeRender, null);
                e.onRenderComplete = A(e.onRenderComplete, null);
                e.onDestroy = A(e.onDestroy, null);
                e.onExport = A(e.onExport, null);
                e.onSetYear = A(e.onSetYear, null);
                e.element = q;
                e.currentView = {};
                e.currentView.colorsVisible = {};
                e.currentView.year = null;
                e.currentView.type = "None";
                v(e.onBeforeRender, q);
                D(q.id) || (q.id = V());
                q.removeAttribute("data-heat-options");
                U(q.id, e);
                t(e);
                v(e.onRenderComplete, q);
              } else {
                f.safeMode || (console.error("The attribute 'data-heat-options' is not a valid object."), y = !1);
              }
            } else {
              f.safeMode || (console.error("The attribute 'data-heat-options' has not been set correctly."), y = !1);
            }
          }
          if (!y) {
            break;
          }
        }
      }
    });
    w(J.$heat) || (J.$heat = this);
  })(document, window);
})();