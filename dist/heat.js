/*! Heat.js v0.3.0 | (c) Bunoon 2024 | MIT License */
(function() {
  function u(a) {
    a.element.className = "heat-js";
    a.element.innerHTML = v.empty;
    S(a);
    T(a);
    U(a);
  }
  function S(a) {
    N(a.currentView.year) || (a.currentView.year = (new Date()).getFullYear());
    if (a.showTitle || a.showYearSelector) {
      var c = h("div", "year");
      a.element.appendChild(c);
      if (a.showTitle) {
        var b = h("div", "title");
        b.innerHTML = a.titleText;
        c.appendChild(b);
      }
      a.showYearSelector && (b = h("button", "back"), b.innerHTML = e.backButtonText, c.appendChild(b), b.onclick = function() {
        a.currentView.year--;
        u(a);
        x(a.onBackYear, a.currentView.year);
      }, a.currentView.yearText = h("div", "year-text"), a.currentView.yearText.innerHTML = a.currentView.year, c.appendChild(a.currentView.yearText), b = h("button", "next"), b.innerHTML = e.nextButtonText, c.appendChild(b), b.onclick = function() {
        a.currentView.year++;
        u(a);
        x(a.onNextYear, a.currentView.year);
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
        g.innerHTML = e.dayNames[f];
        k.appendChild(g);
      }
    }
    k = h("div", "months");
    c.appendChild(k);
    c = e.mapRangeColors.sort(function(H, V) {
      return V.range - H.range;
    });
    for (f = 0; 12 > f; f++) {
      if (-1 < a.monthsToShow.indexOf(f + 1)) {
        g = h("div", "month");
        k.appendChild(g);
        var n = h("div", "month-name");
        n.innerHTML = e.monthNames[f];
        g.appendChild(n);
        n = h("div", "day-columns");
        g.appendChild(n);
        var p = (new Date(b, f + 1, 0)).getDate(), m = h("div", "day-column"), y = !1;
        n.appendChild(m);
        var d = O(new Date(b, f, 1));
        p += d;
        for (var q = 0; q < p; q++) {
          if (q >= d) {
            y = !0;
          } else {
            var w = h("div", "day-disabled");
            m.appendChild(w);
          }
          y && (W(a, m, q - d, f, b, c), 0 === (q + 1) % 7 && (m = h("div", "day-column"), n.appendChild(m)));
        }
        0 < d && r(D) && a.showMonthDayGaps && (g.style.marginLeft = -D + "px");
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
      x(a.onDayClick, p);
    };
    c = e.mapRangeColors.length;
    for (f = 0; f < c; f++) {
      if (n = g[f], k >= n.minimum) {
        b.className += v.space + n.cssClassName;
        break;
      }
    }
    !r(D) && a.showMonthDayGaps && (g = P(b, "margin-left").replace("px", v.empty), c = P(b, "margin-right").replace("px", v.empty), D = b.offsetWidth + parseInt(g) + parseInt(c));
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
      for (var b = e.mapRangeColors.sort(function(n, p) {
        return p.range - n.range;
      }), k = b.length, f = 0; f < k; f++) {
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
  function X(a, c) {
    var b = a, k = O(c);
    b = b.replace("{dddd}", e.dayNames[k]);
    b = b.replace("{dd}", Q(c.getDate()));
    b = b.replace("{d}", c.getDate());
    k = b.replace;
    var f = c.getDate(), g = e.thText;
    if (31 === f || 21 === f || 1 === f) {
      g = e.stText;
    } else if (22 === f || 2 === f) {
      g = e.ndText;
    } else if (23 === f || 3 === f) {
      g = e.rdText;
    }
    b = k.call(b, "{o}", g);
    b = b.replace("{mmmm}", e.monthNames[c.getMonth()]);
    b = b.replace("{mm}", Q(c.getMonth() + 1));
    b = b.replace("{m}", c.getMonth() + 1);
    b = b.replace("{yyyy}", c.getFullYear());
    b = b.replace("{yyy}", c.getFullYear().toString().substring(1));
    b = b.replace("{yy}", c.getFullYear().toString().substring(2));
    return b = b.replace("{y}", parseInt(c.getFullYear().toString().substring(2)).toString());
  }
  function r(a) {
    return null !== a && void 0 !== a && a !== v.empty;
  }
  function E(a) {
    return r(a) && "object" === typeof a;
  }
  function F(a) {
    return r(a) && "boolean" === typeof a;
  }
  function B(a) {
    return r(a) && "string" === typeof a;
  }
  function J(a) {
    return r(a) && "function" === typeof a;
  }
  function N(a) {
    return r(a) && "number" === typeof a;
  }
  function K(a) {
    return E(a) && a instanceof Array;
  }
  function h(a, c) {
    var b = a.toLowerCase();
    var k = "text" === b;
    L.hasOwnProperty(b) || (L[b] = k ? C.createTextNode(v.empty) : C.createElement(b));
    b = L[b].cloneNode(!1);
    r(c) && (b.className = c);
    return b;
  }
  function P(a, c) {
    var b = null;
    G.getComputedStyle ? b = document.defaultView.getComputedStyle(a, null).getPropertyValue(c) : a.currentStyle && (b = a.currentStyle[c]);
    return b;
  }
  function x(a) {
    J(a) && a.apply(null, [].slice.call(arguments, 1));
  }
  function t(a, c) {
    return B(a) ? a : c;
  }
  function z(a, c) {
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
        e.safeMode || (console.error("Errors in object: " + k.message + ", " + f.message), c = !1), b = null;
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
    e.safeMode = z(e.safeMode, !0);
    var a = e, c = e.domElementTypes, b = ["*"];
    B(c) ? (c = c.split(v.space), 0 === c.length && (c = b)) : c = K(c) ? c : b;
    a.domElementTypes = c;
    a = e;
    b = e.mapRangeColors;
    c = [{minimum:10, cssClassName:"day-color-1"}, {minimum:15, cssClassName:"day-color-2"}, {minimum:20, cssClassName:"day-color-3"}, {minimum:25, cssClassName:"day-color-4"}];
    b = K(b) ? b : c;
    a.mapRangeColors = b;
    e.stText = t(e.stText, "st");
    e.ndText = t(e.ndText, "nd");
    e.rdText = t(e.rdText, "rd");
    e.thText = t(e.thText, "th");
    e.backButtonText = t(e.backButtonText, "Back");
    e.nextButtonText = t(e.nextButtonText, "Next");
    e.lessText = t(e.lessText, "Less");
    e.moreText = t(e.moreText, "More");
    M(e.monthNames, 12) && (e.monthNames = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "));
    M(e.dayNames, 7) && (e.dayNames = "Mon Tue Wed Thu Fri Sat Sun".split(" "));
  }
  function M(a, c) {
    c = N(c) ? c : 1;
    return !K(a) || a.length < c;
  }
  var C = null, G = null, e = {}, v = {empty:"", space:" "}, L = {}, D = null, l = {};
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
    l.hasOwnProperty(a) && (a = l[a].options, u(a), x(a.onRefresh, a.element));
    return this;
  };
  this.refreshAll = function() {
    for (var a in l) {
      if (l.hasOwnProperty(a)) {
        var c = l[a].options;
        u(c);
        x(c.onRefresh, c.element);
      }
    }
    return this;
  };
  this.setConfiguration = function(a) {
    e = E(a) ? a : {};
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
      for (var b = e.domElementTypes, k = b.length, f = 0; f < k; f++) {
        var g = C.getElementsByTagName(b[f]);
        g = [].slice.call(g);
        for (var n = g.length, p = 0; p < n; p++) {
          var m = g[p], y = !0;
          if (r(m) && m.hasAttribute("data-heat-options")) {
            var d = m.getAttribute("data-heat-options");
            if (B(d)) {
              if (d = Y(d), d.parsed && E(d.result)) {
                d = d.result;
                d = E(d) ? d : {};
                d.showDayNames = z(d.showDayNames, !0);
                d.showGuide = z(d.showGuide, !0);
                d.showTitle = z(d.showTitle, !0);
                d.showYearSelector = z(d.showYearSelector, !0);
                d.showMonthDayGaps = z(d.showMonthDayGaps, !0);
                M(e.monthsToShow, 12) && (d.monthsToShow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
                d.titleText = t(d.titleText, "Heat.js");
                d.dayToolTipText = t(d.dayToolTipText, "{d}{o} {mmmm} {yyyy}");
                d.onDayClick = A(d.onDayClick, null);
                d.onBackYear = A(d.onBackYear, null);
                d.onNextYear = A(d.onNextYear, null);
                d.onRefresh = A(d.onRefresh, null);
                d.onBeforeRender = A(d.onBeforeRender, null);
                d.onRenderComplete = A(d.onRenderComplete, null);
                d.element = m;
                d.currentView = {};
                x(d.onBeforeRender, m);
                if (!B(m.id)) {
                  var q = [];
                  for (var w = 0; 32 > w; w++) {
                    8 !== w && 12 !== w && 16 !== w && 20 !== w || q.push("-");
                    var H = Math.floor(16 * Math.random()).toString(16);
                    q.push(H);
                  }
                  q = q.join(v.empty);
                  m.id = q;
                }
                m.removeAttribute("data-heat-options");
                l[m.id] = {options:d};
                u(d);
                x(d.onRenderComplete, m);
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
    r(G.$heat) || (G.$heat = this);
  })(document, window);
})();