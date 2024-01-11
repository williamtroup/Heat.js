/*! Heat.js v0.4.0 | (c) Bunoon 2024 | MIT License */
(function() {
  function x(a) {
    a.element.className = "heat-js";
    a.element.innerHTML = t.empty;
    S(a);
    T(a);
    U(a);
  }
  function S(a) {
    N(a.currentView.year) || (a.currentView.year = (new Date()).getFullYear());
    if (a.showTitle || a.showYearSelector || a.showRefreshButton) {
      var c = k("div", "year");
      a.element.appendChild(c);
      if (a.showTitle) {
        var b = k("div", "title");
        b.innerHTML = a.titleText;
        c.appendChild(b);
      }
      a.showRefreshButton && (b = k("button", "refresh"), b.innerHTML = e.refreshButtonText, c.appendChild(b), b.onclick = function() {
        x(a);
        w(a.onRefresh, a.element);
      });
      a.showYearSelector && (b = k("button", "back"), b.innerHTML = e.backButtonText, c.appendChild(b), b.onclick = function() {
        a.currentView.year--;
        x(a);
        w(a.onBackYear, a.currentView.year);
      }, a.currentView.yearText = k("div", "year-text"), a.currentView.yearText.innerHTML = a.currentView.year, c.appendChild(a.currentView.yearText), b = k("button", "next"), b.innerHTML = e.nextButtonText, c.appendChild(b), b.onclick = function() {
        a.currentView.year++;
        x(a);
        w(a.onNextYear, a.currentView.year);
      });
    }
  }
  function T(a) {
    var c = k("div", "map");
    a.element.appendChild(c);
    var b = a.currentView.year, l = !1;
    if (a.showDayNames) {
      var f = k("div", "days");
      c.appendChild(f);
      for (var g = 0; 7 > g; g++) {
        if (-1 < a.daysToShow.indexOf(g + 1)) {
          var m = k("div", "day-name");
          m.innerHTML = e.dayNames[g];
          f.appendChild(m);
        }
      }
    }
    f = k("div", "months");
    c.appendChild(f);
    c = a.mapRangeColors.sort(function(V, W) {
      return W.range - V.range;
    });
    for (g = 0; 12 > g; g++) {
      if (-1 < a.monthsToShow.indexOf(g + 1)) {
        m = k("div", "month");
        f.appendChild(m);
        var n = k("div", "month-name");
        n.innerHTML = e.monthNames[g];
        m.appendChild(n);
        n = k("div", "day-columns");
        m.appendChild(n);
        var p = (new Date(b, g + 1, 0)).getDate(), y = k("div", "day-column"), d = !1;
        n.appendChild(y);
        var r = O(new Date(b, g, 1)), q = 1;
        p += r;
        for (var z = 0; z < p; z++) {
          if (z >= r) {
            d = !0;
          } else {
            var X = k("div", "day-disabled");
            y.appendChild(X);
          }
          d && (-1 < a.daysToShow.indexOf(q) && Y(a, y, z - r, g, b, c), 0 === (z + 1) % 7 && (y = k("div", "day-column"), n.appendChild(y), q = 0));
          q++;
        }
        0 < r && u(E) && !a.showMonthDayGaps && l && (m.style.marginLeft = -E + "px");
        l = !0;
      }
    }
  }
  function Y(a, c, b, l, f, g) {
    var m = b + 1;
    b = k("div", "day");
    var n = new Date(f, l, m);
    l = h[a.element.id][J(n)];
    b.title = Z(a.dayToolTipText, n);
    c.appendChild(b);
    b.onclick = function() {
      w(a.onDayClick, n);
    };
    c = a.mapRangeColors.length;
    f = null;
    for (m = 0; m < c; m++) {
      var p = g[m];
      if (l >= p.minimum) {
        f = t.space + p.cssClassName;
      } else {
        break;
      }
    }
    u(f) && (b.className += t.space + f);
    u(E) || a.showMonthDayGaps || (g = P(b, "margin-left"), c = P(b, "margin-right"), E = b.offsetWidth + parseInt(g, 10) + parseInt(c, 10));
  }
  function U(a) {
    if (a.showGuide) {
      var c = k("div", "guide");
      a.element.appendChild(c);
      var b = k("div", "less-text");
      b.innerHTML = e.lessText;
      c.appendChild(b);
      b = k("div", "days");
      c.appendChild(b);
      a = a.mapRangeColors.sort(function(m, n) {
        return n.range - m.range;
      });
      for (var l = a.length, f = 0; f < l; f++) {
        var g = k("div", "day " + a[f].cssClassName);
        b.appendChild(g);
      }
      b = k("div", "more-text");
      b.innerHTML = e.moreText;
      c.appendChild(b);
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
  function u(a) {
    return null !== a && void 0 !== a && a !== t.empty;
  }
  function F(a) {
    return u(a) && "object" === typeof a;
  }
  function G(a) {
    return u(a) && "boolean" === typeof a;
  }
  function C(a) {
    return u(a) && "string" === typeof a;
  }
  function K(a) {
    return u(a) && "function" === typeof a;
  }
  function N(a) {
    return u(a) && "number" === typeof a;
  }
  function L(a) {
    return F(a) && a instanceof Array;
  }
  function k(a, c) {
    var b = a.toLowerCase();
    var l = "text" === b;
    M.hasOwnProperty(b) || (M[b] = l ? D.createTextNode(t.empty) : D.createElement(b));
    b = M[b].cloneNode(!1);
    u(c) && (b.className = c);
    return b;
  }
  function P(a, c) {
    var b = null;
    H.getComputedStyle ? b = document.defaultView.getComputedStyle(a, null).getPropertyValue(c) : a.currentStyle && (b = a.currentStyle[c]);
    return b;
  }
  function w(a) {
    K(a) && a.apply(null, [].slice.call(arguments, 1));
  }
  function v(a, c) {
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
    C(c) ? (c = c.split(t.space), 0 === c.length && (c = b)) : c = L(c) ? c : b;
    a.domElementTypes = c;
    e.stText = v(e.stText, "st");
    e.ndText = v(e.ndText, "nd");
    e.rdText = v(e.rdText, "rd");
    e.thText = v(e.thText, "th");
    e.backButtonText = v(e.backButtonText, "Back");
    e.nextButtonText = v(e.nextButtonText, "Next");
    e.refreshButtonText = v(e.refreshButtonText, "Refresh");
    e.lessText = v(e.lessText, "Less");
    e.moreText = v(e.moreText, "More");
    I(e.monthNames, 12) && (e.monthNames = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "));
    I(e.dayNames, 7) && (e.dayNames = "Mon Tue Wed Thu Fri Sat Sun".split(" "));
  }
  function I(a, c) {
    c = N(c) ? c : 1;
    return !L(a) || a.length < c;
  }
  var D = null, H = null, e = {}, t = {empty:"", space:" "}, M = {}, E = null, h = {};
  this.addDate = function(a, c, b) {
    h.hasOwnProperty(a) && (b = G(b) ? b : !0, c = J(c), h[a].hasOwnProperty(c) || (h[a][c] = 0), h[a][c]++, b && x(h[a].options));
    return this;
  };
  this.removeDate = function(a, c, b) {
    h.hasOwnProperty(a) && (c = J(c), h[a].hasOwnProperty(c) && (b = G(b) ? b : !0, h[a][c]--, b && x(h[a].options)));
    return this;
  };
  this.reset = function(a, c) {
    if (h.hasOwnProperty(a)) {
      c = G(c) ? c : !0;
      var b = h[a].options;
      h[a] = {};
      h[a].options = b;
      c && x(h[a].options);
    }
    return this;
  };
  this.refresh = function(a) {
    h.hasOwnProperty(a) && (a = h[a].options, x(a), w(a.onRefresh, a.element));
    return this;
  };
  this.refreshAll = function() {
    for (var a in h) {
      if (h.hasOwnProperty(a)) {
        var c = h[a].options;
        x(c);
        w(c.onRefresh, c.element);
      }
    }
    return this;
  };
  this.destroyAll = function() {
    for (var a in h) {
      if (h.hasOwnProperty(a)) {
        var c = h[a].options;
        c.element.innerHTML = t.empty;
        c.element.className = t.empty;
        w(c.onDestroy, c.element);
      }
    }
    h = {};
    return this;
  };
  this.destroy = function(a) {
    if (h.hasOwnProperty(a)) {
      var c = h[a].options;
      c.element.innerHTML = t.empty;
      c.element.className = t.empty;
      w(c.onDestroy, c.element);
      delete h[a];
    }
    return this;
  };
  this.setConfiguration = function(a) {
    e = F(a) ? a : {};
    R();
    return this;
  };
  this.getVersion = function() {
    return "0.4.0";
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
          var p = g[n], y = !0;
          if (u(p) && p.hasAttribute("data-heat-options")) {
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
                var r = d;
                var q = d.mapRangeColors;
                var z = [{minimum:10, cssClassName:"day-color-1"}, {minimum:15, cssClassName:"day-color-2"}, {minimum:20, cssClassName:"day-color-3"}, {minimum:25, cssClassName:"day-color-4"}];
                q = L(q) ? q : z;
                r.mapRangeColors = q;
                d.titleText = v(d.titleText, "Heat.js");
                d.dayToolTipText = v(d.dayToolTipText, "{d}{o} {mmmm} {yyyy}");
                d.onDayClick = B(d.onDayClick, null);
                d.onBackYear = B(d.onBackYear, null);
                d.onNextYear = B(d.onNextYear, null);
                d.onRefresh = B(d.onRefresh, null);
                d.onBeforeRender = B(d.onBeforeRender, null);
                d.onRenderComplete = B(d.onRenderComplete, null);
                d.onDestroy = B(d.onDestroy, null);
                d.element = p;
                d.currentView = {};
                w(d.onBeforeRender, p);
                if (!C(p.id)) {
                  r = [];
                  for (q = 0; 32 > q; q++) {
                    8 !== q && 12 !== q && 16 !== q && 20 !== q || r.push("-"), z = Math.floor(16 * Math.random()).toString(16), r.push(z);
                  }
                  r = r.join(t.empty);
                  p.id = r;
                }
                p.removeAttribute("data-heat-options");
                h[p.id] = {options:d};
                x(d);
                w(d.onRenderComplete, p);
              } else {
                e.safeMode || (console.error("The attribute 'data-heat-options' is not a valid object."), y = !1);
              }
            } else {
              e.safeMode || (console.error("The attribute 'data-heat-options' has not been set correctly."), y = !1);
            }
          }
          if (!y) {
            break;
          }
        }
      }
    });
    u(H.$heat) || (H.$heat = this);
  })(document, window);
})();