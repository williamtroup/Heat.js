/*! Heat.js v0.2.0 | (c) Bunoon 2024 | MIT License */
(function() {
  function x(a) {
    a.element.className = "heat-js";
    a.element.innerHTML = r.empty;
    O(a);
    P(a);
    Q(a);
  }
  function O(a) {
    K(a.currentView.year) || (a.currentView.year = (new Date()).getFullYear());
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
        x(a);
        C(a.onBackYear, a.currentView.year);
      }, a.currentView.yearText = g("div", "year-text"), a.currentView.yearText.innerHTML = a.currentView.year, b.appendChild(a.currentView.yearText), c = g("button", "next"), c.innerHTML = d.nextButtonText, b.appendChild(c), c.onclick = function() {
        a.currentView.year++;
        x(a);
        C(a.onNextYear, a.currentView.year);
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
    b = d.mapRangeColors.sort(function(t, D) {
      return D.range - t.range;
    });
    for (f = 0; 12 > f; f++) {
      if (-1 < a.monthsToShow.indexOf(f + 1)) {
        var l = g("div", "month");
        h.appendChild(l);
        k = g("div", "month-name");
        k.innerHTML = d.monthNames[f];
        l.appendChild(k);
        k = g("div", "day-columns");
        l.appendChild(k);
        l = (new Date(c, f + 1, 0)).getDate();
        var m = g("div", "day-column"), n = !1;
        k.appendChild(m);
        var v = R(new Date(c, f, 1));
        l += v;
        for (var e = 0; e < l; e++) {
          if (e >= v) {
            n = !0;
          } else {
            var w = g("div", "day-disabled");
            m.appendChild(w);
          }
          n && (S(a, m, e - v, f, c, b), 0 === (e + 1) % 7 && (m = g("div", "day-column"), k.appendChild(m)));
        }
      }
    }
  }
  function S(a, b, c, h, f, k) {
    var l = c + 1;
    c = g("div", "day");
    var m = new Date(f, h, l), n = p[a.element.id][L(m)];
    c.title = l.toString() + T(l) + r.space + d.monthNames[h] + r.space + f;
    b.appendChild(c);
    c.onclick = function() {
      C(a.onDayClick, m);
    };
    b = d.mapRangeColors.length;
    for (h = 0; h < b; h++) {
      if (f = k[h], n >= f.minimum) {
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
      for (var c = d.mapRangeColors.sort(function(l, m) {
        return m.range - l.range;
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
  function B(a) {
    return u(a) && "object" === typeof a;
  }
  function M(a) {
    return u(a) && "boolean" === typeof a;
  }
  function y(a) {
    return u(a) && "string" === typeof a;
  }
  function E(a) {
    return u(a) && "function" === typeof a;
  }
  function K(a) {
    return u(a) && "number" === typeof a;
  }
  function F(a) {
    return B(a) && a instanceof Array;
  }
  function g(a, b) {
    var c = a.toLowerCase();
    var h = "text" === c;
    G.hasOwnProperty(c) || (G[c] = h ? z.createTextNode(r.empty) : z.createElement(c));
    c = G[c].cloneNode(!1);
    u(b) && (c.className = b);
    return c;
  }
  function C(a) {
    E(a) && a.apply(null, [].slice.call(arguments, 1));
  }
  function q(a, b) {
    return y(a) ? a : b;
  }
  function A(a, b) {
    return M(a) ? a : b;
  }
  function H(a, b) {
    return E(a) ? a : b;
  }
  function U(a) {
    var b = !0, c = null;
    try {
      y(a) && (c = JSON.parse(a));
    } catch (h) {
      try {
        c = eval("(" + a + ")"), E(c) && (c = c());
      } catch (f) {
        d.safeMode || (console.error("Errors in object: " + h.message + ", " + f.message), b = !1), c = null;
      }
    }
    return {parsed:b, result:c};
  }
  function L(a) {
    return a.getFullYear() + "-" + a.getMonth() + "-" + a.getDate();
  }
  function N() {
    d.safeMode = A(d.safeMode, !0);
    var a = d, b = d.domElementTypes, c = ["*"];
    y(b) ? (b = b.split(r.space), 0 === b.length && (b = c)) : b = F(b) ? b : c;
    a.domElementTypes = b;
    a = d;
    c = d.mapRangeColors;
    b = [{minimum:10, cssClassName:"day-color-1"}, {minimum:15, cssClassName:"day-color-2"}, {minimum:20, cssClassName:"day-color-3"}, {minimum:25, cssClassName:"day-color-4"}];
    c = F(c) ? c : b;
    a.mapRangeColors = c;
    d.stText = q(d.stText, "st");
    d.ndText = q(d.ndText, "nd");
    d.rdText = q(d.rdText, "rd");
    d.thText = q(d.thText, "th");
    d.backButtonText = q(d.backButtonText, "Back");
    d.nextButtonText = q(d.nextButtonText, "Next");
    d.lessText = q(d.lessText, "Less");
    d.moreText = q(d.moreText, "More");
    I(d.monthNames, 12) && (d.monthNames = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "));
    I(d.dayNames, 7) && (d.dayNames = "Mon Tue Wed Thu Fri Sat Sun".split(" "));
  }
  function I(a, b) {
    b = K(b) ? b : 1;
    return !F(a) || a.length < b;
  }
  var z = null, J = null, d = {}, r = {empty:"", space:" "}, G = {}, p = {};
  this.addDate = function(a, b, c) {
    p.hasOwnProperty(a) && (c = M(c) ? c : !0, b = L(b), p[a].hasOwnProperty(b) || (p[a][b] = 0), p[a][b]++, c && x(p[a].options));
    return this;
  };
  this.refresh = function(a) {
    p.hasOwnProperty(a) && x(p[a].options);
    return this;
  };
  this.refreshAll = function() {
    for (var a in p) {
      p.hasOwnProperty(a) && x(p[a].options);
    }
    return this;
  };
  this.setConfiguration = function(a) {
    d = B(a) ? a : {};
    N();
    return this;
  };
  this.getVersion = function() {
    return "0.2.0";
  };
  (function(a, b) {
    z = a;
    J = b;
    N();
    z.addEventListener("DOMContentLoaded", function() {
      for (var c = d.domElementTypes, h = c.length, f = 0; f < h; f++) {
        var k = z.getElementsByTagName(c[f]);
        k = [].slice.call(k);
        for (var l = k.length, m = 0; m < l; m++) {
          var n = k[m], v = !0;
          if (u(n) && n.hasAttribute("data-heat-options")) {
            var e = n.getAttribute("data-heat-options");
            if (y(e)) {
              if (e = U(e), e.parsed && B(e.result)) {
                e = e.result;
                e = B(e) ? e : {};
                e.showDayNames = A(e.showDayNames, !0);
                e.showGuide = A(e.showGuide, !0);
                e.showTitle = A(e.showTitle, !0);
                e.showYearSelector = A(e.showYearSelector, !0);
                I(d.monthsToShow, 12) && (e.monthsToShow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
                e.titleText = q(e.titleText, "Heat.js");
                e.onDayClick = H(e.onDayClick, null);
                e.onBackYear = H(e.onBackYear, null);
                e.onNextYear = H(e.onNextYear, null);
                e.element = n;
                e.currentView = {};
                if (!y(n.id)) {
                  var w = [];
                  for (var t = 0; 32 > t; t++) {
                    8 !== t && 12 !== t && 16 !== t && 20 !== t || w.push("-");
                    var D = Math.floor(16 * Math.random()).toString(16);
                    w.push(D);
                  }
                  w = w.join(r.empty);
                  n.id = w;
                }
                n.removeAttribute("data-heat-options");
                p[n.id] = {options:e};
                x(e);
              } else {
                d.safeMode || (console.error("The attribute 'data-heat-options' is not a valid object."), v = !1);
              }
            } else {
              d.safeMode || (console.error("The attribute 'data-heat-options' has not been set correctly."), v = !1);
            }
          }
          if (!v) {
            break;
          }
        }
      }
    });
    u(J.$heat) || (J.$heat = this);
  })(document, window);
})();