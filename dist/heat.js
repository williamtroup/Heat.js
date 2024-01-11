/*! Heat.js v0.3.0 | (c) Bunoon 2024 | MIT License */
(function() {
  function v(a) {
    a.element.className = "heat-js";
    a.element.innerHTML = y.empty;
    S(a);
    T(a);
    U(a);
  }
  function S(a) {
    N(a.currentView.year) || (a.currentView.year = (new Date()).getFullYear());
    if (a.showTitle || a.showYearSelector || a.showRefreshButton) {
      var c = h("div", "year");
      a.element.appendChild(c);
      if (a.showTitle) {
        var b = h("div", "title");
        b.innerHTML = a.titleText;
        c.appendChild(b);
      }
      a.showRefreshButton && (b = h("button", "refresh"), b.innerHTML = e.refreshButtonText, c.appendChild(b), b.onclick = function() {
        v(a);
        x(a.onRefresh, a.element);
      });
      a.showYearSelector && (b = h("button", "back"), b.innerHTML = e.backButtonText, c.appendChild(b), b.onclick = function() {
        a.currentView.year--;
        v(a);
        x(a.onBackYear, a.currentView.year);
      }, a.currentView.yearText = h("div", "year-text"), a.currentView.yearText.innerHTML = a.currentView.year, c.appendChild(a.currentView.yearText), b = h("button", "next"), b.innerHTML = e.nextButtonText, c.appendChild(b), b.onclick = function() {
        a.currentView.year++;
        v(a);
        x(a.onNextYear, a.currentView.year);
      });
    }
  }
  function T(a) {
    var c = h("div", "map");
    a.element.appendChild(c);
    var b = a.currentView.year, l = !1;
    if (a.showDayNames) {
      var f = h("div", "days");
      c.appendChild(f);
      for (var g = 0; 7 > g; g++) {
        if (-1 < a.daysToShow.indexOf(g + 1)) {
          var m = h("div", "day-name");
          m.innerHTML = e.dayNames[g];
          f.appendChild(m);
        }
      }
    }
    f = h("div", "months");
    c.appendChild(f);
    c = e.mapRangeColors.sort(function(V, W) {
      return W.range - V.range;
    });
    for (g = 0; 12 > g; g++) {
      if (-1 < a.monthsToShow.indexOf(g + 1)) {
        m = h("div", "month");
        f.appendChild(m);
        var n = h("div", "month-name");
        n.innerHTML = e.monthNames[g];
        m.appendChild(n);
        n = h("div", "day-columns");
        m.appendChild(n);
        var p = (new Date(b, g + 1, 0)).getDate(), w = h("div", "day-column"), d = !1;
        n.appendChild(w);
        var t = O(new Date(b, g, 1)), u = 1;
        p += t;
        for (var z = 0; z < p; z++) {
          if (z >= t) {
            d = !0;
          } else {
            var X = h("div", "day-disabled");
            w.appendChild(X);
          }
          d && (-1 < a.daysToShow.indexOf(u) && Y(a, w, z - t, g, b, c), 0 === (z + 1) % 7 && (w = h("div", "day-column"), n.appendChild(w), u = 0));
          u++;
        }
        0 < t && q(E) && !a.showMonthDayGaps && l && (m.style.marginLeft = -E + "px");
        l = !0;
      }
    }
  }
  function Y(a, c, b, l, f, g) {
    var m = b + 1;
    b = h("div", "day");
    var n = new Date(f, l, m);
    l = k[a.element.id][J(n)];
    b.title = Z(a.dayToolTipText, n);
    c.appendChild(b);
    b.onclick = function() {
      x(a.onDayClick, n);
    };
    c = e.mapRangeColors.length;
    f = null;
    for (m = 0; m < c; m++) {
      var p = g[m];
      if (l >= p.minimum) {
        f = y.space + p.cssClassName;
      } else {
        break;
      }
    }
    q(f) && (b.className += y.space + f);
    q(E) || a.showMonthDayGaps || (g = P(b, "margin-left"), c = P(b, "margin-right"), E = b.offsetWidth + parseInt(g, 10) + parseInt(c, 10));
  }
  function U(a) {
    if (a.showGuide) {
      var c = h("div", "guide");
      a.element.appendChild(c);
      a = h("div", "less-text");
      a.innerHTML = e.lessText;
      c.appendChild(a);
      a = h("div", "days");
      c.appendChild(a);
      for (var b = e.mapRangeColors.sort(function(m, n) {
        return n.range - m.range;
      }), l = b.length, f = 0; f < l; f++) {
        var g = h("div", "day " + b[f].cssClassName);
        a.appendChild(g);
      }
      a = h("div", "more-text");
      a.innerHTML = e.moreText;
      c.appendChild(a);
    }
  }
  function O(a) {
    return 0 > a.getDay() - 1 ? 6 : a.getDay() - 1;
  }
  function Z(a, c) {
    var b = a, l = O(c);
    b = b.replace("{dddd}", e.dayNames[l]);
    b = b.replace("{dd}", Q(c.getDate()));
    b = b.replace("{d}", c.getDate());
    l = b.replace;
    var f = c.getDate(), g = e.thText;
    if (31 === f || 21 === f || 1 === f) {
      g = e.stText;
    } else if (22 === f || 2 === f) {
      g = e.ndText;
    } else if (23 === f || 3 === f) {
      g = e.rdText;
    }
    b = l.call(b, "{o}", g);
    b = b.replace("{mmmm}", e.monthNames[c.getMonth()]);
    b = b.replace("{mm}", Q(c.getMonth() + 1));
    b = b.replace("{m}", c.getMonth() + 1);
    b = b.replace("{yyyy}", c.getFullYear());
    b = b.replace("{yyy}", c.getFullYear().toString().substring(1));
    b = b.replace("{yy}", c.getFullYear().toString().substring(2));
    return b = b.replace("{y}", parseInt(c.getFullYear().toString().substring(2)).toString());
  }
  function q(a) {
    return null !== a && void 0 !== a && a !== y.empty;
  }
  function F(a) {
    return q(a) && "object" === typeof a;
  }
  function G(a) {
    return q(a) && "boolean" === typeof a;
  }
  function C(a) {
    return q(a) && "string" === typeof a;
  }
  function K(a) {
    return q(a) && "function" === typeof a;
  }
  function N(a) {
    return q(a) && "number" === typeof a;
  }
  function L(a) {
    return F(a) && a instanceof Array;
  }
  function h(a, c) {
    var b = a.toLowerCase();
    var l = "text" === b;
    M.hasOwnProperty(b) || (M[b] = l ? D.createTextNode(y.empty) : D.createElement(b));
    b = M[b].cloneNode(!1);
    q(c) && (b.className = c);
    return b;
  }
  function P(a, c) {
    var b = null;
    H.getComputedStyle ? b = document.defaultView.getComputedStyle(a, null).getPropertyValue(c) : a.currentStyle && (b = a.currentStyle[c]);
    return b;
  }
  function x(a) {
    K(a) && a.apply(null, [].slice.call(arguments, 1));
  }
  function r(a, c) {
    return C(a) ? a : c;
  }
  function A(a, c) {
    return G(a) ? a : c;
  }
  function B(a, c) {
    return K(a) ? a : c;
  }
  function aa(a) {
    var c = !0, b = null;
    try {
      C(a) && (b = JSON.parse(a));
    } catch (l) {
      try {
        b = eval("(" + a + ")"), K(b) && (b = b());
      } catch (f) {
        e.safeMode || (console.error("Errors in object: " + l.message + ", " + f.message), c = !1), b = null;
      }
    }
    return {parsed:c, result:b};
  }
  function Q(a) {
    a = a.toString();
    return 1 === a.length ? "0" + a : a;
  }
  function J(a) {
    return a.getFullYear() + "-" + a.getMonth() + "-" + a.getDate();
  }
  function R() {
    e.safeMode = A(e.safeMode, !0);
    var a = e, c = e.domElementTypes, b = ["*"];
    C(c) ? (c = c.split(y.space), 0 === c.length && (c = b)) : c = L(c) ? c : b;
    a.domElementTypes = c;
    a = e;
    b = e.mapRangeColors;
    c = [{minimum:10, cssClassName:"day-color-1"}, {minimum:15, cssClassName:"day-color-2"}, {minimum:20, cssClassName:"day-color-3"}, {minimum:25, cssClassName:"day-color-4"}];
    b = L(b) ? b : c;
    a.mapRangeColors = b;
    e.stText = r(e.stText, "st");
    e.ndText = r(e.ndText, "nd");
    e.rdText = r(e.rdText, "rd");
    e.thText = r(e.thText, "th");
    e.backButtonText = r(e.backButtonText, "Back");
    e.nextButtonText = r(e.nextButtonText, "Next");
    e.refreshButtonText = r(e.refreshButtonText, "Refresh");
    e.lessText = r(e.lessText, "Less");
    e.moreText = r(e.moreText, "More");
    I(e.monthNames, 12) && (e.monthNames = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "));
    I(e.dayNames, 7) && (e.dayNames = "Mon Tue Wed Thu Fri Sat Sun".split(" "));
  }
  function I(a, c) {
    c = N(c) ? c : 1;
    return !L(a) || a.length < c;
  }
  var D = null, H = null, e = {}, y = {empty:"", space:" "}, M = {}, E = null, k = {};
  this.addDate = function(a, c, b) {
    k.hasOwnProperty(a) && (b = G(b) ? b : !0, c = J(c), k[a].hasOwnProperty(c) || (k[a][c] = 0), k[a][c]++, b && v(k[a].options));
    return this;
  };
  this.removeDate = function(a, c, b) {
    k.hasOwnProperty(a) && (c = J(c), k[a].hasOwnProperty(c) && (b = G(b) ? b : !0, k[a][c]--, b && v(k[a].options)));
    return this;
  };
  this.reset = function(a, c) {
    if (k.hasOwnProperty(a)) {
      c = G(c) ? c : !0;
      var b = k[a].options;
      k[a] = {};
      k[a].options = b;
      c && v(k[a].options);
    }
    return this;
  };
  this.refresh = function(a) {
    k.hasOwnProperty(a) && (a = k[a].options, v(a), x(a.onRefresh, a.element));
    return this;
  };
  this.refreshAll = function() {
    for (var a in k) {
      if (k.hasOwnProperty(a)) {
        var c = k[a].options;
        v(c);
        x(c.onRefresh, c.element);
      }
    }
    return this;
  };
  this.setConfiguration = function(a) {
    e = F(a) ? a : {};
    R();
    return this;
  };
  this.getVersion = function() {
    return "0.3.0";
  };
  (function(a, c) {
    D = a;
    H = c;
    R();
    D.addEventListener("DOMContentLoaded", function() {
      for (var b = e.domElementTypes, l = b.length, f = 0; f < l; f++) {
        var g = D.getElementsByTagName(b[f]);
        g = [].slice.call(g);
        for (var m = g.length, n = 0; n < m; n++) {
          var p = g[n], w = !0;
          if (q(p) && p.hasAttribute("data-heat-options")) {
            var d = p.getAttribute("data-heat-options");
            if (C(d)) {
              if (d = aa(d), d.parsed && F(d.result)) {
                d = d.result;
                d = F(d) ? d : {};
                d.showDayNames = A(d.showDayNames, !0);
                d.showGuide = A(d.showGuide, !0);
                d.showTitle = A(d.showTitle, !0);
                d.showYearSelector = A(d.showYearSelector, !0);
                d.showMonthDayGaps = A(d.showMonthDayGaps, !0);
                d.showRefreshButton = A(d.showRefreshButton, !1);
                I(d.monthsToShow) && (d.monthsToShow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
                I(d.daysToShow) && (d.daysToShow = [1, 2, 3, 4, 5, 6, 7]);
                d.titleText = r(d.titleText, "Heat.js");
                d.dayToolTipText = r(d.dayToolTipText, "{d}{o} {mmmm} {yyyy}");
                d.onDayClick = B(d.onDayClick, null);
                d.onBackYear = B(d.onBackYear, null);
                d.onNextYear = B(d.onNextYear, null);
                d.onRefresh = B(d.onRefresh, null);
                d.onBeforeRender = B(d.onBeforeRender, null);
                d.onRenderComplete = B(d.onRenderComplete, null);
                d.element = p;
                d.currentView = {};
                x(d.onBeforeRender, p);
                if (!C(p.id)) {
                  var t = [];
                  for (var u = 0; 32 > u; u++) {
                    8 !== u && 12 !== u && 16 !== u && 20 !== u || t.push("-");
                    var z = Math.floor(16 * Math.random()).toString(16);
                    t.push(z);
                  }
                  t = t.join(y.empty);
                  p.id = t;
                }
                p.removeAttribute("data-heat-options");
                k[p.id] = {options:d};
                v(d);
                x(d.onRenderComplete, p);
              } else {
                e.safeMode || (console.error("The attribute 'data-heat-options' is not a valid object."), w = !1);
              }
            } else {
              e.safeMode || (console.error("The attribute 'data-heat-options' has not been set correctly."), w = !1);
            }
          }
          if (!w) {
            break;
          }
        }
      }
    });
    q(H.$heat) || (H.$heat = this);
  })(document, window);
})();