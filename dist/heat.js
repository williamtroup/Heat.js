/*! Heat.js v0.2.0 | (c) Bunoon 2024 | MIT License */
(function() {
  function v(a) {
    a.element.className = "heat-js";
    a.element.innerHTML = r.empty;
    O(a);
    P(a);
    Q(a);
  }
  function O(a) {
    M(a.currentView.year) || (a.currentView.year = (new Date()).getFullYear());
    if (a.showTitle || a.showYearSelector) {
      var b = g("div", "year");
      a.element.appendChild(b);
      if (a.showTitle) {
        var c = g("div", "title");
        c.innerHTML = a.titleText;
        b.appendChild(c);
      }
      a.showYearSelector && (c = g("button", "back"), c.innerHTML = d.backButtonText, b.appendChild(c), c.onclick = function() {
        a.currentView.year--;
        v(a);
        y(a.onBackYear, a.currentView.year);
      }, a.currentView.yearText = g("div", "year-text"), a.currentView.yearText.innerHTML = a.currentView.year, b.appendChild(a.currentView.yearText), c = g("button", "next"), c.innerHTML = d.nextButtonText, b.appendChild(c), c.onclick = function() {
        a.currentView.year++;
        v(a);
        y(a.onNextYear, a.currentView.year);
      });
    }
  }
  function P(a) {
    var b = g("div", "map");
    a.element.appendChild(b);
    var c = a.currentView.year;
    if (a.showDayNames) {
      var h = g("div", "days");
      b.appendChild(h);
      for (var f = 0; 7 > f; f++) {
        var k = g("div", "day-name");
        k.innerHTML = d.dayNames[f];
        h.appendChild(k);
      }
    }
    h = g("div", "months");
    b.appendChild(h);
    b = d.mapRangeColors.sort(function(t, E) {
      return E.range - t.range;
    });
    for (f = 0; 12 > f; f++) {
      if (-1 < a.monthsToShow.indexOf(f + 1)) {
        var m = g("div", "month");
        h.appendChild(m);
        k = g("div", "month-name");
        k.innerHTML = d.monthNames[f];
        m.appendChild(k);
        k = g("div", "day-columns");
        m.appendChild(k);
        m = (new Date(c, f + 1, 0)).getDate();
        var n = g("div", "day-column"), p = !1;
        k.appendChild(n);
        var w = R(new Date(c, f, 1));
        m += w;
        for (var e = 0; e < m; e++) {
          if (e >= w) {
            p = !0;
          } else {
            var x = g("div", "day-disabled");
            n.appendChild(x);
          }
          p && (S(a, n, e - w, f, c, b), 0 === (e + 1) % 7 && (n = g("div", "day-column"), k.appendChild(n)));
        }
      }
    }
  }
  function S(a, b, c, h, f, k) {
    var m = c + 1;
    c = g("div", "day");
    var n = new Date(f, h, m), p = l[a.element.id][F(n)];
    c.title = m.toString() + T(m) + r.space + d.monthNames[h] + r.space + f;
    b.appendChild(c);
    c.onclick = function() {
      y(a.onDayClick, n);
    };
    b = d.mapRangeColors.length;
    for (h = 0; h < b; h++) {
      if (f = k[h], p >= f.minimum) {
        c.className += r.space + f.cssClassName;
        break;
      }
    }
  }
  function Q(a) {
    if (a.showGuide) {
      var b = g("div", "guide");
      a.element.appendChild(b);
      a = g("div", "less-text");
      a.innerHTML = d.lessText;
      b.appendChild(a);
      a = g("div", "days");
      b.appendChild(a);
      for (var c = d.mapRangeColors.sort(function(m, n) {
        return n.range - m.range;
      }), h = c.length, f = 0; f < h; f++) {
        var k = g("div", "day " + c[f].cssClassName);
        a.appendChild(k);
      }
      a = g("div", "more-text");
      a.innerHTML = d.moreText;
      b.appendChild(a);
    }
  }
  function R(a) {
    return 0 > a.getDay() - 1 ? 6 : a.getDay() - 1;
  }
  function T(a) {
    var b = d.thText;
    if (31 === a || 21 === a || 1 === a) {
      b = d.stText;
    } else if (22 === a || 2 === a) {
      b = d.ndText;
    } else if (23 === a || 3 === a) {
      b = d.rdText;
    }
    return b;
  }
  function u(a) {
    return null !== a && void 0 !== a && a !== r.empty;
  }
  function C(a) {
    return u(a) && "object" === typeof a;
  }
  function G(a) {
    return u(a) && "boolean" === typeof a;
  }
  function z(a) {
    return u(a) && "string" === typeof a;
  }
  function H(a) {
    return u(a) && "function" === typeof a;
  }
  function M(a) {
    return u(a) && "number" === typeof a;
  }
  function I(a) {
    return C(a) && a instanceof Array;
  }
  function g(a, b) {
    var c = a.toLowerCase();
    var h = "text" === c;
    J.hasOwnProperty(c) || (J[c] = h ? A.createTextNode(r.empty) : A.createElement(c));
    c = J[c].cloneNode(!1);
    u(b) && (c.className = b);
    return c;
  }
  function y(a) {
    H(a) && a.apply(null, [].slice.call(arguments, 1));
  }
  function q(a, b) {
    return z(a) ? a : b;
  }
  function B(a, b) {
    return G(a) ? a : b;
  }
  function D(a, b) {
    return H(a) ? a : b;
  }
  function U(a) {
    var b = !0, c = null;
    try {
      z(a) && (c = JSON.parse(a));
    } catch (h) {
      try {
        c = eval("(" + a + ")"), H(c) && (c = c());
      } catch (f) {
        d.safeMode || (console.error("Errors in object: " + h.message + ", " + f.message), b = !1), c = null;
      }
    }
    return {parsed:b, result:c};
  }
  function F(a) {
    return a.getFullYear() + "-" + a.getMonth() + "-" + a.getDate();
  }
  function N() {
    d.safeMode = B(d.safeMode, !0);
    var a = d, b = d.domElementTypes, c = ["*"];
    z(b) ? (b = b.split(r.space), 0 === b.length && (b = c)) : b = I(b) ? b : c;
    a.domElementTypes = b;
    a = d;
    c = d.mapRangeColors;
    b = [{minimum:10, cssClassName:"day-color-1"}, {minimum:15, cssClassName:"day-color-2"}, {minimum:20, cssClassName:"day-color-3"}, {minimum:25, cssClassName:"day-color-4"}];
    c = I(c) ? c : b;
    a.mapRangeColors = c;
    d.stText = q(d.stText, "st");
    d.ndText = q(d.ndText, "nd");
    d.rdText = q(d.rdText, "rd");
    d.thText = q(d.thText, "th");
    d.backButtonText = q(d.backButtonText, "Back");
    d.nextButtonText = q(d.nextButtonText, "Next");
    d.lessText = q(d.lessText, "Less");
    d.moreText = q(d.moreText, "More");
    K(d.monthNames, 12) && (d.monthNames = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "));
    K(d.dayNames, 7) && (d.dayNames = "Mon Tue Wed Thu Fri Sat Sun".split(" "));
  }
  function K(a, b) {
    b = M(b) ? b : 1;
    return !I(a) || a.length < b;
  }
  var A = null, L = null, d = {}, r = {empty:"", space:" "}, J = {}, l = {};
  this.addDate = function(a, b, c) {
    l.hasOwnProperty(a) && (c = G(c) ? c : !0, b = F(b), l[a].hasOwnProperty(b) || (l[a][b] = 0), l[a][b]++, c && v(l[a].options));
    return this;
  };
  this.removeDate = function(a, b, c) {
    l.hasOwnProperty(a) && (b = F(b), l[a].hasOwnProperty(b) && (c = G(c) ? c : !0, l[a][b]--, c && v(l[a].options)));
    return this;
  };
  this.refresh = function(a) {
    l.hasOwnProperty(a) && (a = l[a].options, v(a), y(a.onRefresh, a.element));
    return this;
  };
  this.refreshAll = function() {
    for (var a in l) {
      if (l.hasOwnProperty(a)) {
        var b = l[a].options;
        v(b);
        y(b.onRefresh, b.element);
      }
    }
    return this;
  };
  this.setConfiguration = function(a) {
    d = C(a) ? a : {};
    N();
    return this;
  };
  this.getVersion = function() {
    return "0.2.0";
  };
  (function(a, b) {
    A = a;
    L = b;
    N();
    A.addEventListener("DOMContentLoaded", function() {
      for (var c = d.domElementTypes, h = c.length, f = 0; f < h; f++) {
        var k = A.getElementsByTagName(c[f]);
        k = [].slice.call(k);
        for (var m = k.length, n = 0; n < m; n++) {
          var p = k[n], w = !0;
          if (u(p) && p.hasAttribute("data-heat-options")) {
            var e = p.getAttribute("data-heat-options");
            if (z(e)) {
              if (e = U(e), e.parsed && C(e.result)) {
                e = e.result;
                e = C(e) ? e : {};
                e.showDayNames = B(e.showDayNames, !0);
                e.showGuide = B(e.showGuide, !0);
                e.showTitle = B(e.showTitle, !0);
                e.showYearSelector = B(e.showYearSelector, !0);
                K(d.monthsToShow, 12) && (e.monthsToShow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
                e.titleText = q(e.titleText, "Heat.js");
                e.onDayClick = D(e.onDayClick, null);
                e.onBackYear = D(e.onBackYear, null);
                e.onNextYear = D(e.onNextYear, null);
                e.onRefresh = D(e.onRefresh, null);
                e.element = p;
                e.currentView = {};
                if (!z(p.id)) {
                  var x = [];
                  for (var t = 0; 32 > t; t++) {
                    8 !== t && 12 !== t && 16 !== t && 20 !== t || x.push("-");
                    var E = Math.floor(16 * Math.random()).toString(16);
                    x.push(E);
                  }
                  x = x.join(r.empty);
                  p.id = x;
                }
                p.removeAttribute("data-heat-options");
                l[p.id] = {options:e};
                v(e);
              } else {
                d.safeMode || (console.error("The attribute 'data-heat-options' is not a valid object."), w = !1);
              }
            } else {
              d.safeMode || (console.error("The attribute 'data-heat-options' has not been set correctly."), w = !1);
            }
          }
          if (!w) {
            break;
          }
        }
      }
    });
    u(L.$heat) || (L.$heat = this);
  })(document, window);
})();