/*! Heat.js v0.3.0 | (c) Bunoon 2024 | MIT License */
(function() {
  function u(a) {
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
      a.showRefreshButton && (b = h("button", "refresh"), b.innerHTML = d.refreshButtonText, c.appendChild(b), b.onclick = function() {
        u(a);
        v(a.onRefresh, a.element);
      });
      a.showYearSelector && (b = h("button", "back"), b.innerHTML = d.backButtonText, c.appendChild(b), b.onclick = function() {
        a.currentView.year--;
        u(a);
        v(a.onBackYear, a.currentView.year);
      }, a.currentView.yearText = h("div", "year-text"), a.currentView.yearText.innerHTML = a.currentView.year, c.appendChild(a.currentView.yearText), b = h("button", "next"), b.innerHTML = d.nextButtonText, c.appendChild(b), b.onclick = function() {
        a.currentView.year++;
        u(a);
        v(a.onNextYear, a.currentView.year);
      });
    }
  }
  function T(a) {
    var c = h("div", "map");
    a.element.appendChild(c);
    var b = a.currentView.year;
    if (a.showDayNames) {
      var k = h("div", "days");
      c.appendChild(k);
      for (var f = 0; 7 > f; f++) {
        var g = h("div", "day-name");
        g.innerHTML = d.dayNames[f];
        k.appendChild(g);
      }
    }
    k = h("div", "months");
    c.appendChild(k);
    c = d.mapRangeColors.sort(function(H, V) {
      return V.range - H.range;
    });
    for (f = 0; 12 > f; f++) {
      if (-1 < a.monthsToShow.indexOf(f + 1)) {
        g = h("div", "month");
        k.appendChild(g);
        var n = h("div", "month-name");
        n.innerHTML = d.monthNames[f];
        g.appendChild(n);
        n = h("div", "day-columns");
        g.appendChild(n);
        var p = (new Date(b, f + 1, 0)).getDate(), m = h("div", "day-column"), z = !1;
        n.appendChild(m);
        var e = O(new Date(b, f, 1));
        p += e;
        for (var q = 0; q < p; q++) {
          if (q >= e) {
            z = !0;
          } else {
            var w = h("div", "day-disabled");
            m.appendChild(w);
          }
          z && (W(a, m, q - e, f, b, c), 0 === (q + 1) % 7 && (m = h("div", "day-column"), n.appendChild(m)));
        }
        0 < e && t(D) && !a.showMonthDayGaps && (g.style.marginLeft = -D + "px");
      }
    }
  }
  function W(a, c, b, k, f, g) {
    var n = b + 1;
    b = h("div", "day");
    var p = new Date(f, k, n);
    k = l[a.element.id][I(p)];
    b.title = X(a.dayToolTipText, p);
    c.appendChild(b);
    b.onclick = function() {
      v(a.onDayClick, p);
    };
    c = d.mapRangeColors.length;
    for (f = 0; f < c; f++) {
      if (n = g[f], k >= n.minimum) {
        b.className += y.space + n.cssClassName;
        break;
      }
    }
    t(D) || a.showMonthDayGaps || (g = P(b, "margin-left"), c = P(b, "margin-right"), D = b.offsetWidth + parseInt(g, 10) + parseInt(c, 10));
  }
  function U(a) {
    if (a.showGuide) {
      var c = h("div", "guide");
      a.element.appendChild(c);
      a = h("div", "less-text");
      a.innerHTML = d.lessText;
      c.appendChild(a);
      a = h("div", "days");
      c.appendChild(a);
      for (var b = d.mapRangeColors.sort(function(n, p) {
        return p.range - n.range;
      }), k = b.length, f = 0; f < k; f++) {
        var g = h("div", "day " + b[f].cssClassName);
        a.appendChild(g);
      }
      a = h("div", "more-text");
      a.innerHTML = d.moreText;
      c.appendChild(a);
    }
  }
  function O(a) {
    return 0 > a.getDay() - 1 ? 6 : a.getDay() - 1;
  }
  function X(a, c) {
    var b = a, k = O(c);
    b = b.replace("{dddd}", d.dayNames[k]);
    b = b.replace("{dd}", Q(c.getDate()));
    b = b.replace("{d}", c.getDate());
    k = b.replace;
    var f = c.getDate(), g = d.thText;
    if (31 === f || 21 === f || 1 === f) {
      g = d.stText;
    } else if (22 === f || 2 === f) {
      g = d.ndText;
    } else if (23 === f || 3 === f) {
      g = d.rdText;
    }
    b = k.call(b, "{o}", g);
    b = b.replace("{mmmm}", d.monthNames[c.getMonth()]);
    b = b.replace("{mm}", Q(c.getMonth() + 1));
    b = b.replace("{m}", c.getMonth() + 1);
    b = b.replace("{yyyy}", c.getFullYear());
    b = b.replace("{yyy}", c.getFullYear().toString().substring(1));
    b = b.replace("{yy}", c.getFullYear().toString().substring(2));
    return b = b.replace("{y}", parseInt(c.getFullYear().toString().substring(2)).toString());
  }
  function t(a) {
    return null !== a && void 0 !== a && a !== y.empty;
  }
  function E(a) {
    return t(a) && "object" === typeof a;
  }
  function F(a) {
    return t(a) && "boolean" === typeof a;
  }
  function B(a) {
    return t(a) && "string" === typeof a;
  }
  function J(a) {
    return t(a) && "function" === typeof a;
  }
  function N(a) {
    return t(a) && "number" === typeof a;
  }
  function K(a) {
    return E(a) && a instanceof Array;
  }
  function h(a, c) {
    var b = a.toLowerCase();
    var k = "text" === b;
    L.hasOwnProperty(b) || (L[b] = k ? C.createTextNode(y.empty) : C.createElement(b));
    b = L[b].cloneNode(!1);
    t(c) && (b.className = c);
    return b;
  }
  function P(a, c) {
    var b = null;
    G.getComputedStyle ? b = document.defaultView.getComputedStyle(a, null).getPropertyValue(c) : a.currentStyle && (b = a.currentStyle[c]);
    return b;
  }
  function v(a) {
    J(a) && a.apply(null, [].slice.call(arguments, 1));
  }
  function r(a, c) {
    return B(a) ? a : c;
  }
  function x(a, c) {
    return F(a) ? a : c;
  }
  function A(a, c) {
    return J(a) ? a : c;
  }
  function Y(a) {
    var c = !0, b = null;
    try {
      B(a) && (b = JSON.parse(a));
    } catch (k) {
      try {
        b = eval("(" + a + ")"), J(b) && (b = b());
      } catch (f) {
        d.safeMode || (console.error("Errors in object: " + k.message + ", " + f.message), c = !1), b = null;
      }
    }
    return {parsed:c, result:b};
  }
  function Q(a) {
    a = a.toString();
    return 1 === a.length ? "0" + a : a;
  }
  function I(a) {
    return a.getFullYear() + "-" + a.getMonth() + "-" + a.getDate();
  }
  function R() {
    d.safeMode = x(d.safeMode, !0);
    var a = d, c = d.domElementTypes, b = ["*"];
    B(c) ? (c = c.split(y.space), 0 === c.length && (c = b)) : c = K(c) ? c : b;
    a.domElementTypes = c;
    a = d;
    b = d.mapRangeColors;
    c = [{minimum:10, cssClassName:"day-color-1"}, {minimum:15, cssClassName:"day-color-2"}, {minimum:20, cssClassName:"day-color-3"}, {minimum:25, cssClassName:"day-color-4"}];
    b = K(b) ? b : c;
    a.mapRangeColors = b;
    d.stText = r(d.stText, "st");
    d.ndText = r(d.ndText, "nd");
    d.rdText = r(d.rdText, "rd");
    d.thText = r(d.thText, "th");
    d.backButtonText = r(d.backButtonText, "Back");
    d.nextButtonText = r(d.nextButtonText, "Next");
    d.refreshButtonText = r(d.refreshButtonText, "Refresh");
    d.lessText = r(d.lessText, "Less");
    d.moreText = r(d.moreText, "More");
    M(d.monthNames, 12) && (d.monthNames = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "));
    M(d.dayNames, 7) && (d.dayNames = "Mon Tue Wed Thu Fri Sat Sun".split(" "));
  }
  function M(a, c) {
    c = N(c) ? c : 1;
    return !K(a) || a.length < c;
  }
  var C = null, G = null, d = {}, y = {empty:"", space:" "}, L = {}, D = null, l = {};
  this.addDate = function(a, c, b) {
    l.hasOwnProperty(a) && (b = F(b) ? b : !0, c = I(c), l[a].hasOwnProperty(c) || (l[a][c] = 0), l[a][c]++, b && u(l[a].options));
    return this;
  };
  this.removeDate = function(a, c, b) {
    l.hasOwnProperty(a) && (c = I(c), l[a].hasOwnProperty(c) && (b = F(b) ? b : !0, l[a][c]--, b && u(l[a].options)));
    return this;
  };
  this.reset = function(a, c) {
    if (l.hasOwnProperty(a)) {
      c = F(c) ? c : !0;
      var b = l[a].options;
      l[a] = {};
      l[a].options = b;
      c && u(l[a].options);
    }
    return this;
  };
  this.refresh = function(a) {
    l.hasOwnProperty(a) && (a = l[a].options, u(a), v(a.onRefresh, a.element));
    return this;
  };
  this.refreshAll = function() {
    for (var a in l) {
      if (l.hasOwnProperty(a)) {
        var c = l[a].options;
        u(c);
        v(c.onRefresh, c.element);
      }
    }
    return this;
  };
  this.setConfiguration = function(a) {
    d = E(a) ? a : {};
    R();
    return this;
  };
  this.getVersion = function() {
    return "0.3.0";
  };
  (function(a, c) {
    C = a;
    G = c;
    R();
    C.addEventListener("DOMContentLoaded", function() {
      for (var b = d.domElementTypes, k = b.length, f = 0; f < k; f++) {
        var g = C.getElementsByTagName(b[f]);
        g = [].slice.call(g);
        for (var n = g.length, p = 0; p < n; p++) {
          var m = g[p], z = !0;
          if (t(m) && m.hasAttribute("data-heat-options")) {
            var e = m.getAttribute("data-heat-options");
            if (B(e)) {
              if (e = Y(e), e.parsed && E(e.result)) {
                e = e.result;
                e = E(e) ? e : {};
                e.showDayNames = x(e.showDayNames, !0);
                e.showGuide = x(e.showGuide, !0);
                e.showTitle = x(e.showTitle, !0);
                e.showYearSelector = x(e.showYearSelector, !0);
                e.showMonthDayGaps = x(e.showMonthDayGaps, !0);
                e.showRefreshButton = x(e.showRefreshButton, !1);
                M(d.monthsToShow, 12) && (e.monthsToShow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
                e.titleText = r(e.titleText, "Heat.js");
                e.dayToolTipText = r(e.dayToolTipText, "{d}{o} {mmmm} {yyyy}");
                e.onDayClick = A(e.onDayClick, null);
                e.onBackYear = A(e.onBackYear, null);
                e.onNextYear = A(e.onNextYear, null);
                e.onRefresh = A(e.onRefresh, null);
                e.onBeforeRender = A(e.onBeforeRender, null);
                e.onRenderComplete = A(e.onRenderComplete, null);
                e.element = m;
                e.currentView = {};
                v(e.onBeforeRender, m);
                if (!B(m.id)) {
                  var q = [];
                  for (var w = 0; 32 > w; w++) {
                    8 !== w && 12 !== w && 16 !== w && 20 !== w || q.push("-");
                    var H = Math.floor(16 * Math.random()).toString(16);
                    q.push(H);
                  }
                  q = q.join(y.empty);
                  m.id = q;
                }
                m.removeAttribute("data-heat-options");
                l[m.id] = {options:e};
                u(e);
                v(e.onRenderComplete, m);
              } else {
                d.safeMode || (console.error("The attribute 'data-heat-options' is not a valid object."), z = !1);
              }
            } else {
              d.safeMode || (console.error("The attribute 'data-heat-options' has not been set correctly."), z = !1);
            }
          }
          if (!z) {
            break;
          }
        }
      }
    });
    t(G.$heat) || (G.$heat = this);
  })(document, window);
})();