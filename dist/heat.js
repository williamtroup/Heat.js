/*! Heat.js v0.2.0 | (c) Bunoon 2024 | MIT License */
(function() {
  function r(a) {
    a.element.className = "heat-js";
    a.element.innerHTML = t.empty;
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
        r(a);
        w(a.onBackYear, a.currentView.year);
      }, a.currentView.yearText = g("div", "year-text"), a.currentView.yearText.innerHTML = a.currentView.year, b.appendChild(a.currentView.yearText), c = g("button", "next"), c.innerHTML = d.nextButtonText, b.appendChild(c), c.onclick = function() {
        a.currentView.year++;
        r(a);
        w(a.onNextYear, a.currentView.year);
      });
    }
  }
  function P(a) {
    var b = g("div", "map");
    a.element.appendChild(b);
    var c = a.currentView.year;
    if (a.showDayNames) {
      var k = g("div", "days");
      b.appendChild(k);
      for (var f = 0; 7 > f; f++) {
        var l = g("div", "day-name");
        l.innerHTML = d.dayNames[f];
        k.appendChild(l);
      }
    }
    k = g("div", "months");
    b.appendChild(k);
    b = d.mapRangeColors.sort(function(u, F) {
      return F.range - u.range;
    });
    for (f = 0; 12 > f; f++) {
      if (-1 < a.monthsToShow.indexOf(f + 1)) {
        var n = g("div", "month");
        k.appendChild(n);
        l = g("div", "month-name");
        l.innerHTML = d.monthNames[f];
        n.appendChild(l);
        l = g("div", "day-columns");
        n.appendChild(l);
        n = (new Date(c, f + 1, 0)).getDate();
        var p = g("div", "day-column"), m = !1;
        l.appendChild(p);
        var x = R(new Date(c, f, 1));
        n += x;
        for (var e = 0; e < n; e++) {
          if (e >= x) {
            m = !0;
          } else {
            var y = g("div", "day-disabled");
            p.appendChild(y);
          }
          m && (S(a, p, e - x, f, c, b), 0 === (e + 1) % 7 && (p = g("div", "day-column"), l.appendChild(p)));
        }
      }
    }
  }
  function S(a, b, c, k, f, l) {
    var n = c + 1;
    c = g("div", "day");
    var p = new Date(f, k, n), m = h[a.element.id][G(p)];
    c.title = n.toString() + T(n) + t.space + d.monthNames[k] + t.space + f;
    b.appendChild(c);
    c.onclick = function() {
      w(a.onDayClick, p);
    };
    b = d.mapRangeColors.length;
    for (k = 0; k < b; k++) {
      if (f = l[k], m >= f.minimum) {
        c.className += t.space + f.cssClassName;
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
      for (var c = d.mapRangeColors.sort(function(n, p) {
        return p.range - n.range;
      }), k = c.length, f = 0; f < k; f++) {
        var l = g("div", "day " + c[f].cssClassName);
        a.appendChild(l);
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
  function v(a) {
    return null !== a && void 0 !== a && a !== t.empty;
  }
  function D(a) {
    return v(a) && "object" === typeof a;
  }
  function E(a) {
    return v(a) && "boolean" === typeof a;
  }
  function A(a) {
    return v(a) && "string" === typeof a;
  }
  function H(a) {
    return v(a) && "function" === typeof a;
  }
  function M(a) {
    return v(a) && "number" === typeof a;
  }
  function I(a) {
    return D(a) && a instanceof Array;
  }
  function g(a, b) {
    var c = a.toLowerCase();
    var k = "text" === c;
    J.hasOwnProperty(c) || (J[c] = k ? B.createTextNode(t.empty) : B.createElement(c));
    c = J[c].cloneNode(!1);
    v(b) && (c.className = b);
    return c;
  }
  function w(a) {
    H(a) && a.apply(null, [].slice.call(arguments, 1));
  }
  function q(a, b) {
    return A(a) ? a : b;
  }
  function C(a, b) {
    return E(a) ? a : b;
  }
  function z(a, b) {
    return H(a) ? a : b;
  }
  function U(a) {
    var b = !0, c = null;
    try {
      A(a) && (c = JSON.parse(a));
    } catch (k) {
      try {
        c = eval("(" + a + ")"), H(c) && (c = c());
      } catch (f) {
        d.safeMode || (console.error("Errors in object: " + k.message + ", " + f.message), b = !1), c = null;
      }
    }
    return {parsed:b, result:c};
  }
  function G(a) {
    return a.getFullYear() + "-" + a.getMonth() + "-" + a.getDate();
  }
  function N() {
    d.safeMode = C(d.safeMode, !0);
    var a = d, b = d.domElementTypes, c = ["*"];
    A(b) ? (b = b.split(t.space), 0 === b.length && (b = c)) : b = I(b) ? b : c;
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
  var B = null, L = null, d = {}, t = {empty:"", space:" "}, J = {}, h = {};
  this.addDate = function(a, b, c) {
    h.hasOwnProperty(a) && (c = E(c) ? c : !0, b = G(b), h[a].hasOwnProperty(b) || (h[a][b] = 0), h[a][b]++, c && r(h[a].options));
    return this;
  };
  this.removeDate = function(a, b, c) {
    h.hasOwnProperty(a) && (b = G(b), h[a].hasOwnProperty(b) && (c = E(c) ? c : !0, h[a][b]--, c && r(h[a].options)));
    return this;
  };
  this.reset = function(a, b) {
    if (h.hasOwnProperty(a)) {
      b = E(b) ? b : !0;
      var c = h[a].options;
      h[a] = {};
      h[a].options = c;
      b && r(h[a].options);
    }
    return this;
  };
  this.refresh = function(a) {
    h.hasOwnProperty(a) && (a = h[a].options, r(a), w(a.onRefresh, a.element));
    return this;
  };
  this.refreshAll = function() {
    for (var a in h) {
      if (h.hasOwnProperty(a)) {
        var b = h[a].options;
        r(b);
        w(b.onRefresh, b.element);
      }
    }
    return this;
  };
  this.setConfiguration = function(a) {
    d = D(a) ? a : {};
    N();
    return this;
  };
  this.getVersion = function() {
    return "0.2.0";
  };
  (function(a, b) {
    B = a;
    L = b;
    N();
    B.addEventListener("DOMContentLoaded", function() {
      for (var c = d.domElementTypes, k = c.length, f = 0; f < k; f++) {
        var l = B.getElementsByTagName(c[f]);
        l = [].slice.call(l);
        for (var n = l.length, p = 0; p < n; p++) {
          var m = l[p], x = !0;
          if (v(m) && m.hasAttribute("data-heat-options")) {
            var e = m.getAttribute("data-heat-options");
            if (A(e)) {
              if (e = U(e), e.parsed && D(e.result)) {
                e = e.result;
                e = D(e) ? e : {};
                e.showDayNames = C(e.showDayNames, !0);
                e.showGuide = C(e.showGuide, !0);
                e.showTitle = C(e.showTitle, !0);
                e.showYearSelector = C(e.showYearSelector, !0);
                K(d.monthsToShow, 12) && (e.monthsToShow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
                e.titleText = q(e.titleText, "Heat.js");
                e.onDayClick = z(e.onDayClick, null);
                e.onBackYear = z(e.onBackYear, null);
                e.onNextYear = z(e.onNextYear, null);
                e.onRefresh = z(e.onRefresh, null);
                e.onBeforeRender = z(e.onBeforeRender, null);
                e.onRenderComplete = z(e.onRenderComplete, null);
                e.element = m;
                e.currentView = {};
                w(e.onBeforeRender, m);
                if (!A(m.id)) {
                  var y = [];
                  for (var u = 0; 32 > u; u++) {
                    8 !== u && 12 !== u && 16 !== u && 20 !== u || y.push("-");
                    var F = Math.floor(16 * Math.random()).toString(16);
                    y.push(F);
                  }
                  y = y.join(t.empty);
                  m.id = y;
                }
                m.removeAttribute("data-heat-options");
                h[m.id] = {options:e};
                r(e);
                w(e.onRenderComplete, m);
              } else {
                d.safeMode || (console.error("The attribute 'data-heat-options' is not a valid object."), x = !1);
              }
            } else {
              d.safeMode || (console.error("The attribute 'data-heat-options' has not been set correctly."), x = !1);
            }
          }
          if (!x) {
            break;
          }
        }
      }
    });
    v(L.$heat) || (L.$heat = this);
  })(document, window);
})();