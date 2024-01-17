/*! Heat.js v0.8.0 | (c) Bunoon 2024 | MIT License */
(function() {
  function u(a) {
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
        var d = h[a.element.id].type[a.currentView.type];
        var g = [];
        var k = [];
        g.push([F(f.dateText), F(f.countText)].join());
        for (var l in d) {
          d.hasOwnProperty(l) && k.push(l);
        }
        k.sort();
        l = k.length;
        for (var n = 0; n < l; n++) {
          var p = k[n];
          d.hasOwnProperty(p) && g.push([F(p), F(d[p])].join());
        }
        g = g.join(q.newLine);
        g !== q.empty && (d = m("a"), d.style.display = "none", d.setAttribute("target", "_blank"), d.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(g)), g = d.setAttribute, l = new Date(), k = z(l.getDate()) + "-" + z(l.getMonth() + 1) + "-" + l.getFullYear(), l = z(l.getHours()) + "-" + z(l.getMinutes()), n = q.empty, "None" !== a.currentView.type && (n = a.currentView.type.toLowerCase().replace(q.space, "_") + "_"), g.call(d, "download", n + k + "_" + l + ".csv"), A.body.appendChild(d), 
        d.click(), A.body.removeChild(d));
        w(a.onExport, a.element);
      });
      a.showRefreshButton && (b = m("button", "refresh"), b.innerHTML = f.refreshButtonText, c.appendChild(b), b.onclick = function() {
        u(a);
        w(a.onRefresh, a.element);
      });
      a.showYearSelector && (b = m("button", "back"), b.innerHTML = f.backButtonText, c.appendChild(b), b.onclick = function() {
        a.currentView.year--;
        u(a);
        w(a.onBackYear, a.currentView.year);
      }, a.currentView.yearText = m("div", "year-text"), a.currentView.yearText.innerHTML = a.currentView.year, c.appendChild(a.currentView.yearText), b = m("button", "next"), b.innerHTML = f.nextButtonText, c.appendChild(b), b.onclick = function() {
        a.currentView.year++;
        u(a);
        w(a.onNextYear, a.currentView.year);
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
        var p = (new Date(c, k + 1, 0)).getDate(), x = m("div", "day-column"), e = !1;
        n.appendChild(x);
        var B = Q(new Date(c, k, 1)), t = 1;
        p += B;
        for (var E = 0; E < p; E++) {
          if (E >= B) {
            e = !0;
          } else {
            var ca = m("div", "day-disabled");
            x.appendChild(ca);
          }
          e && (-1 < a.daysToShow.indexOf(t) && da(a, x, E - B, k, c, b), 0 === (E + 1) % 7 && (x = m("div", "day-column"), n.appendChild(x), t = 0));
          t++;
        }
        0 < B && v(G) && !a.showMonthDayGaps && d && (l.style.marginLeft = -G + "px");
        d = !0;
      }
    }
  }
  function da(a, c, b, d, g, k) {
    var l = b + 1;
    b = m("div", "day");
    var n = new Date(g, d, l), p = h[a.element.id].type[a.currentView.type][L(n)];
    b.title = ea(a.dayToolTipText, n);
    c.appendChild(b);
    b.onclick = function() {
      w(a.onDayClick, n, p);
    };
    c = a.mapRangeColors.length;
    d = null;
    for (g = 0; g < c; g++) {
      if (l = k[g], p >= l.minimum) {
        d = l;
      } else {
        break;
      }
    }
    v(d) && R(a, d.id) && (b.className += q.space + d.cssClassName);
    v(G) || a.showMonthDayGaps || (k = S(b, "margin-left", !0), c = S(b, "margin-right", !0), G = b.offsetWidth + k + c);
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
      c.onclick = function() {
        T(a, !1);
      };
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
      c.onclick = function() {
        T(a, !0);
      };
    }
  }
  function fa(a, c, b) {
    var d = m("button", "type");
    d.innerHTML = b;
    c.appendChild(d);
    a.currentView.type === b && (d.className += q.space + "active");
    d.onclick = function() {
      a.currentView.type !== b && (a.currentView.type = b, u(a));
    };
  }
  function ha(a, c, b) {
    var d = m("div");
    d.title = b.tooltipText;
    c.appendChild(d);
    R(a, b.id) ? d.className = "day " + b.cssClassName : d.className = "day";
    d.onclick = function() {
      a.currentView.colorsVisible.hasOwnProperty(b.id) || (a.currentView.colorsVisible[b.id] = !0);
      d.className = a.currentView.colorsVisible[b.id] ? "day" : "day " + b.cssClassName;
      a.currentView.colorsVisible[b.id] = !a.currentView.colorsVisible[b.id];
      u(a);
    };
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
    u(a);
  }
  function F(a) {
    a = a.toString().replace(/(\r\n|\n|\r)/gm, q.empty).replace(/(\s\s)/gm, q.space);
    a = a.replace(/"/g, '""');
    return '"' + a + '"';
  }
  function Q(a) {
    return 0 > a.getDay() - 1 ? 6 : a.getDay() - 1;
  }
  function ea(a, c) {
    var b = a, d = Q(c);
    b = b.replace("{dddd}", f.dayNames[d]);
    b = b.replace("{dd}", z(c.getDate()));
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
  function C(a) {
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
    var d = "text" === b;
    O.hasOwnProperty(b) || (O[b] = d ? A.createTextNode(q.empty) : A.createElement(b));
    b = O[b].cloneNode(!1);
    v(c) && (b.className = c);
    return b;
  }
  function S(a, c, b) {
    var d = null;
    b = v(b) ? b : !1;
    J.getComputedStyle ? d = A.defaultView.getComputedStyle(a, null).getPropertyValue(c) : a.currentStyle && (d = a.currentStyle[c]);
    b && (d = parseInt(d, 10));
    return d;
  }
  function w(a) {
    M(a) && a.apply(null, [].slice.call(arguments, 1));
  }
  function r(a, c) {
    return C(a) ? a : c;
  }
  function y(a, c) {
    return I(a) ? a : c;
  }
  function D(a, c) {
    return M(a) ? a : c;
  }
  function ia(a) {
    var c = !0, b = null;
    try {
      C(a) && (b = JSON.parse(a));
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
    f.safeMode = y(f.safeMode, !0);
    var a = f, c = f.domElementTypes, b = ["*"];
    C(c) ? (c = c.split(q.space), 0 === c.length && (c = b)) : c = N(c) ? c : b;
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
  var A = null, J = null, f = {}, q = {empty:"", space:" ", newLine:"\n"}, O = {}, G = null, h = {};
  this.addDate = function(a, c, b, d) {
    h.hasOwnProperty(a) && (d = I(d) ? d : !0, b = C(b) ? b : "None", c = L(c), h[a].type.hasOwnProperty(b) || (h[a].type[b] = {}, h[a].types++), h[a].type[b].hasOwnProperty(c) || (h[a].type[b][c] = 0), h[a].type[b][c]++, d && u(h[a].options));
    return this;
  };
  this.removeDate = function(a, c, b, d) {
    h.hasOwnProperty(a) && (b = C(b) ? b : "None", c = L(c), h[a].type.hasOwnProperty(b) && h[a].type[b].hasOwnProperty(c) && (d = I(d) ? d : !0, 0 < h[a].type[b][c] && h[a].type[b][c]--, d && u(h[a].options)));
    return this;
  };
  this.reset = function(a, c) {
    if (h.hasOwnProperty(a)) {
      c = I(c) ? c : !0;
      var b = h[a].options;
      b.currentView.type = "None";
      U(a, b);
      c && u(h[a].options);
    }
    return this;
  };
  this.refresh = function(a) {
    h.hasOwnProperty(a) && (a = h[a].options, u(a), w(a.onRefresh, a.element));
    return this;
  };
  this.refreshAll = function() {
    for (var a in h) {
      if (h.hasOwnProperty(a)) {
        var c = h[a].options;
        u(c);
        w(c.onRefresh, c.element);
      }
    }
    return this;
  };
  this.destroyAll = function() {
    for (var a in h) {
      if (h.hasOwnProperty(a)) {
        var c = h[a].options;
        c.element.innerHTML = q.empty;
        c.element.className = q.empty;
        w(c.onDestroy, c.element);
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
      w(c.onDestroy, c.element);
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
    return "0.8.0";
  };
  (function(a, c) {
    A = a;
    J = c;
    W();
    A.addEventListener("DOMContentLoaded", function() {
      for (var b = f.domElementTypes, d = b.length, g = 0; g < d; g++) {
        var k = A.getElementsByTagName(b[g]);
        k = [].slice.call(k);
        for (var l = k.length, n = 0; n < l; n++) {
          var p = k[n], x = !0;
          if (v(p) && p.hasAttribute("data-heat-options")) {
            var e = p.getAttribute("data-heat-options");
            if (C(e)) {
              if (e = ia(e), e.parsed && H(e.result)) {
                e = e.result;
                e = H(e) ? e : {};
                e.showDayNames = y(e.showDayNames, !0);
                e.showGuide = y(e.showGuide, !0);
                e.showTitle = y(e.showTitle, !0);
                e.showYearSelector = y(e.showYearSelector, !0);
                e.showMonthDayGaps = y(e.showMonthDayGaps, !0);
                e.showRefreshButton = y(e.showRefreshButton, !1);
                e.showMonthNames = y(e.showMonthNames, !0);
                e.showExportButton = y(e.showExportButton, !1);
                K(e.monthsToShow) && (e.monthsToShow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
                K(e.daysToShow) && (e.daysToShow = [1, 2, 3, 4, 5, 6, 7]);
                var B = e;
                var t = e.mapRangeColors;
                var E = [{minimum:10, cssClassName:"day-color-1", tooltipText:"Day Color 1"}, {minimum:15, cssClassName:"day-color-2", tooltipText:"Day Color 2"}, {minimum:20, cssClassName:"day-color-3", tooltipText:"Day Color 3"}, {minimum:25, cssClassName:"day-color-4", tooltipText:"Day Color 4"}];
                t = N(t) ? t : E;
                B.mapRangeColors = t;
                B = e.mapRangeColors.length;
                for (t = 0; t < B; t++) {
                  C(e.mapRangeColors[t].id) || (e.mapRangeColors[t].id = V());
                }
                e.titleText = r(e.titleText, "Heat.js");
                e.dayToolTipText = r(e.dayToolTipText, "{d}{o} {mmmm} {yyyy}");
                e.onDayClick = D(e.onDayClick, null);
                e.onBackYear = D(e.onBackYear, null);
                e.onNextYear = D(e.onNextYear, null);
                e.onRefresh = D(e.onRefresh, null);
                e.onBeforeRender = D(e.onBeforeRender, null);
                e.onRenderComplete = D(e.onRenderComplete, null);
                e.onDestroy = D(e.onDestroy, null);
                e.onExport = D(e.onExport, null);
                e.element = p;
                e.currentView = {};
                e.currentView.colorsVisible = {};
                e.currentView.year = null;
                e.currentView.type = "None";
                w(e.onBeforeRender, p);
                C(p.id) || (p.id = V());
                p.removeAttribute("data-heat-options");
                U(p.id, e);
                u(e);
                w(e.onRenderComplete, p);
              } else {
                f.safeMode || (console.error("The attribute 'data-heat-options' is not a valid object."), x = !1);
              }
            } else {
              f.safeMode || (console.error("The attribute 'data-heat-options' has not been set correctly."), x = !1);
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