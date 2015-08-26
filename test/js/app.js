define("portal/1.0.0/src/app", [], function(e) {
    var t = e("portal/1.0.0/src/com/utils"), n = e("portal/1.0.0/src/tff/tff.core.pageRouter"), o = e("portal/1.0.0/src/tff/tff.data"), a = e("portal/1.0.0/src/tff/tff.core.jump"), i = (e("portal/1.0.0/src/plugin/template"), e("portal/1.0.0/src/com/backToTop")), r = e("portal/1.0.0/src/com/report"), s = e("portal/1.0.0/src/plugin/heatmap"), c = (e("portal/1.0.0/src/plugin/heatmap"), {index: e("portal/1.0.0/src/page/index"),search: e("portal/1.0.0/src/page/search"),mygames: e("portal/1.0.0/src/page/mygames"),getgifts: e("portal/1.0.0/src/page/getgifts"),mygifts: e("portal/1.0.0/src/page/mygifts"),singlegifts: e("portal/1.0.0/src/page/singlegifts"),giftbagdetail: e("portal/1.0.0/src/page/giftbagdetail"),detail: e("portal/1.0.0/src/page/detail"),special: e("portal/1.0.0/src/page/special"),category: e("portal/1.0.0/src/page/category"),logout: e("portal/1.0.0/src/page/logout")}), d = window.location.search.match(/ch=\w+/);
    null !== d && (window.CH = d[0].substr(3)), t("body").show();
    var l = function() {
        n.registPage({pageName: "index",pageObject: c.index}), n.registPage({pageName: "search",pageObject: c.search}), n.registPage({pageName: "mygames",pageObject: c.mygames}), n.registPage({pageName: "getgifts",pageObject: c.getgifts}), n.registPage({pageName: "mygifts",pageObject: c.mygifts}), n.registPage({pageName: "singlegifts",pageObject: c.singlegifts}), n.registPage({pageName: "giftbagdetail",pageObject: c.giftbagdetail}), n.registPage({pageName: "detail",pageObject: c.detail}), n.registPage({pageName: "special",pageObject: c.special}), n.registPage({pageName: "category",pageObject: c.category}), n.registPage({pageName: "logout",pageObject: c.logout})
    };
    i.createBackToTop(), l(), o.setAjaxUrl("/ajax/"), a.jumpToPage = a.jumpToPage.before(function(e, t, n) {
        r.report("viewpage", e.hashString, t, n)
    }), a.jumpToUrl = a.jumpToUrl.before(function(e, t, n) {
        r.report("viewpage", e, t, n)
    });
    var u = window.location.hash || "#p=index&g=recommend";
    u = u.indexOf("&randTime=") > -1 ? u.replace(/&randTime=[^&]+/gi, "&randTime=" + +new Date) : u + "&randTime=" + +new Date, a.jumpToPage({hashString: u}), t("#join-now").off("click"), t("#join-now").on("click", function() {
        var e = t("#no_longer_show").is(":checked");
        e && void 0 == localStorage.noLongerShow && (localStorage.noLongerShow = !0), t("#double12_campaign_popup").hasClass("hidden") || t("#double12_campaign_popup").addClass("hidden"), window.location.href = "/double12?ch=001809&t=" + (new Date).getTime()
    }), t("#close-now").off("click"), t("#close-now").on("click", function() {
        var e = t("#no_longer_show").is(":checked");
        e && void 0 == localStorage.noLongerShow && (localStorage.noLongerShow = !0), t("#double12_campaign_popup").hasClass("hidden") || t("#double12_campaign_popup").addClass("hidden")
    }), s.start()
}), define("portal/1.0.0/src/com/utils", [], function(e, t, n) {
    var o = e("zepto/1.1.3/index");
    o.jsRuntimeError = function(e, t) {
        console.log(e + t)
    }, o.formatSize = function(e) {
        if (void 0 == e)
            return "--";
        var t = ["B", "KB", "MB", "GB"], e = parseFloat(e), n = 0;
        if (0 > e)
            return "--";
        for (; e >= 1024 && 3 > n; )
            e /= 1024, n++;
        return e.toFixed(0) + t[n]
    }, o.formatCount = function(e) {
        if (void 0 == e)
            return "?";
        var t = ["", "万", "亿"], e = parseInt(e), n = 0;
        if (0 > e)
            return "?";
        for (; e >= 1e4 && 3 > n; )
            e /= 1e4, n++;
        return n > 0 && (e = e.toFixed(1)), e + t[n]
    }, o.formatScore = function(e) {
        e = e || 0, 0 > e && (e = 0);
        var t = 0, n = 0, o = 0, a = 0;
        return t = Math.round(2 * parseFloat(e)), t > 10 && (t = 10), n = Math.floor(t / 2), o = t % 2, a = 5 - n - o, [n, o, a]
    }, o.formatTime = function(e) {
        if (0 >= e)
            return "?";
        var t = ["分钟", "小时", "天"], n = [60, 60, 24];
        timediff = Math.floor(Date.now() / 1e3) - e;
        for (var o = 0; o < t.length - 1 && (timediff /= n[o], !(timediff < n[o + 1])); o++)
            ;
        return Math.ceil(timediff) + t[o]
    }, o.formatDate = function(e) {
        if (0 > e)
            return "?";
        var t = new Date(1e3 * e);
        return t.getFullYear() + "年" + (t.getMonth() + 1) + "月" + t.getDate() + "日"
    }, Function.prototype.before = function(e) {
        var t = this;
        return function() {
            return e.apply(this, arguments) === !1 ? !1 : t.apply(this, arguments)
        }
    }, Function.prototype.after = function(e) {
        var t = this;
        return function() {
            var n = t.apply(this, arguments);
            return 0 == n ? !1 : (e.apply(this, arguments), n)
        }
    }, n.exports = o
}), define("zepto/1.1.3/index", [], function(e, t, n) {
    e("zepto/1.1.3/src/zepto"), e("zepto/1.1.3/src/event"), e("zepto/1.1.3/src/touch"), e("zepto/1.1.3/src/fx"), e("zepto/1.1.3/src/fx_methods"), n.exports = window.Zepto
}), define("zepto/1.1.3/src/zepto", [], function(e, t, n) {
    var o = function() {
        function e(e) {
            return null == e ? String(e) : Q[W.call(e)] || "object"
        }
        function t(t) {
            return "function" == e(t)
        }
        function n(e) {
            return null != e && e == e.window
        }
        function o(e) {
            return null != e && e.nodeType == e.DOCUMENT_NODE
        }
        function a(t) {
            return "object" == e(t)
        }
        function i(e) {
            return a(e) && !n(e) && Object.getPrototypeOf(e) == Object.prototype
        }
        function r(e) {
            return "number" == typeof e.length
        }
        function s(e) {
            return E.call(e, function(e) {
                return null != e
            })
        }
        function c(e) {
            return e.length > 0 ? S.fn.concat.apply([], e) : e
        }
        function d(e) {
            return e.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
        }
        function l(e) {
            return e in B ? B[e] : B[e] = new RegExp("(^|\\s)" + e + "(\\s|$)")
        }
        function u(e, t) {
            return "number" != typeof t || N[d(e)] ? t : t + "px"
        }
        function f(e) {
            var t, n;
            return A[e] || (t = I.createElement(e), I.body.appendChild(t), n = getComputedStyle(t, "").getPropertyValue("display"), t.parentNode.removeChild(t), "none" == n && (n = "block"), A[e] = n), A[e]
        }
        function p(e) {
            return "children" in e ? T.call(e.children) : S.map(e.childNodes, function(e) {
                return 1 == e.nodeType ? e : void 0
            })
        }
        function m(e, t, n) {
            for (k in t)
                n && (i(t[k]) || X(t[k])) ? (i(t[k]) && !i(e[k]) && (e[k] = {}), X(t[k]) && !X(e[k]) && (e[k] = []), m(e[k], t[k], n)) : t[k] !== x && (e[k] = t[k])
        }
        function h(e, t) {
            return null == t ? S(e) : S(e).filter(t)
        }
        function g(e, n, o, a) {
            return t(n) ? n.call(e, o, a) : n
        }
        function v(e, t, n) {
            null == n ? e.removeAttribute(t) : e.setAttribute(t, n)
        }
        function w(e, t) {
            var n = e.className, o = n && n.baseVal !== x;
            return t === x ? o ? n.baseVal : n : void (o ? n.baseVal = t : e.className = t)
        }
        function y(e) {
            var t;
            try {
                return e ? "true" == e || ("false" == e ? !1 : "null" == e ? null : /^0/.test(e) || isNaN(t = Number(e)) ? /^[\[\{]/.test(e) ? S.parseJSON(e) : e : t) : e
            } catch (n) {
                return e
            }
        }
        function b(e, t) {
            t(e);
            for (var n in e.childNodes)
                b(e.childNodes[n], t)
        }
        var x, k, S, C, $, j, L = [], T = L.slice, E = L.filter, I = window.document, A = {}, B = {}, N = {"column-count": 1,columns: 1,"font-weight": 1,"line-height": 1,opacity: 1,"z-index": 1,zoom: 1}, P = /^\s*<(\w+|!)[^>]*>/, U = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, O = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, _ = /^(?:body|html)$/i, D = /([A-Z])/g, H = ["val", "css", "html", "text", "data", "width", "height", "offset"], R = ["after", "prepend", "before", "append"], q = I.createElement("table"), M = I.createElement("tr"), F = {tr: I.createElement("tbody"),tbody: q,thead: q,tfoot: q,td: M,th: M,"*": I.createElement("div")}, G = /complete|loaded|interactive/, z = /^[\w-]*$/, Q = {}, W = Q.toString, Y = {}, K = I.createElement("div"), J = {tabindex: "tabIndex",readonly: "readOnly","for": "htmlFor","class": "className",maxlength: "maxLength",cellspacing: "cellSpacing",cellpadding: "cellPadding",rowspan: "rowSpan",colspan: "colSpan",usemap: "useMap",frameborder: "frameBorder",contenteditable: "contentEditable"}, X = Array.isArray || function(e) {
            return e instanceof Array
        };
        return Y.matches = function(e, t) {
            if (!t || !e || 1 !== e.nodeType)
                return !1;
            var n = e.webkitMatchesSelector || e.mozMatchesSelector || e.oMatchesSelector || e.matchesSelector;
            if (n)
                return n.call(e, t);
            var o, a = e.parentNode, i = !a;
            return i && (a = K).appendChild(e), o = ~Y.qsa(a, t).indexOf(e), i && K.removeChild(e), o
        }, $ = function(e) {
            return e.replace(/-+(.)?/g, function(e, t) {
                return t ? t.toUpperCase() : ""
            })
        }, j = function(e) {
            return E.call(e, function(t, n) {
                return e.indexOf(t) == n
            })
        }, Y.fragment = function(e, t, n) {
            var o, a, r;
            return U.test(e) && (o = S(I.createElement(RegExp.$1))), o || (e.replace && (e = e.replace(O, "<$1></$2>")), t === x && (t = P.test(e) && RegExp.$1), t in F || (t = "*"), r = F[t], r.innerHTML = "" + e, o = S.each(T.call(r.childNodes), function() {
                r.removeChild(this)
            })), i(n) && (a = S(o), S.each(n, function(e, t) {
                H.indexOf(e) > -1 ? a[e](t) : a.attr(e, t)
            })), o
        }, Y.Z = function(e, t) {
            return e = e || [], e.__proto__ = S.fn, e.selector = t || "", e
        }, Y.isZ = function(e) {
            return e instanceof Y.Z
        }, Y.init = function(e, n) {
            var o;
            if (!e)
                return Y.Z();
            if ("string" == typeof e)
                if (e = e.trim(), "<" == e[0] && P.test(e))
                    o = Y.fragment(e, RegExp.$1, n), e = null;
                else {
                    if (n !== x)
                        return S(n).find(e);
                    o = Y.qsa(I, e)
                }
            else {
                if (t(e))
                    return S(I).ready(e);
                if (Y.isZ(e))
                    return e;
                if (X(e))
                    o = s(e);
                else if (a(e))
                    o = [e], e = null;
                else if (P.test(e))
                    o = Y.fragment(e.trim(), RegExp.$1, n), e = null;
                else {
                    if (n !== x)
                        return S(n).find(e);
                    o = Y.qsa(I, e)
                }
            }
            return Y.Z(o, e)
        }, S = function(e, t) {
            return Y.init(e, t)
        }, S.extend = function(e) {
            var t, n = T.call(arguments, 1);
            return "boolean" == typeof e && (t = e, e = n.shift()), n.forEach(function(n) {
                m(e, n, t)
            }), e
        }, Y.qsa = function(e, t) {
            var n, a = "#" == t[0], i = !a && "." == t[0], r = a || i ? t.slice(1) : t, s = z.test(r);
            return o(e) && s && a ? (n = e.getElementById(r)) ? [n] : [] : 1 !== e.nodeType && 9 !== e.nodeType ? [] : T.call(s && !a ? i ? e.getElementsByClassName(r) : e.getElementsByTagName(t) : e.querySelectorAll(t))
        }, S.contains = function(e, t) {
            return e !== t && e.contains(t)
        }, S.type = e, S.isFunction = t, S.isWindow = n, S.isArray = X, S.isPlainObject = i, S.isEmptyObject = function(e) {
            var t;
            for (t in e)
                return !1;
            return !0
        }, S.inArray = function(e, t, n) {
            return L.indexOf.call(t, e, n)
        }, S.camelCase = $, S.trim = function(e) {
            return null == e ? "" : String.prototype.trim.call(e)
        }, S.uuid = 0, S.support = {}, S.expr = {}, S.map = function(e, t) {
            var n, o, a, i = [];
            if (r(e))
                for (o = 0; o < e.length; o++)
                    n = t(e[o], o), null != n && i.push(n);
            else
                for (a in e)
                    n = t(e[a], a), null != n && i.push(n);
            return c(i)
        }, S.each = function(e, t) {
            var n, o;
            if (r(e)) {
                for (n = 0; n < e.length; n++)
                    if (t.call(e[n], n, e[n]) === !1)
                        return e
            } else
                for (o in e)
                    if (t.call(e[o], o, e[o]) === !1)
                        return e;
            return e
        }, S.grep = function(e, t) {
            return E.call(e, t)
        }, window.JSON && (S.parseJSON = JSON.parse), S.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
            Q["[object " + t + "]"] = t.toLowerCase()
        }), S.fn = {forEach: L.forEach,reduce: L.reduce,push: L.push,sort: L.sort,indexOf: L.indexOf,concat: L.concat,map: function(e) {
                return S(S.map(this, function(t, n) {
                    return e.call(t, n, t)
                }))
            },slice: function() {
                return S(T.apply(this, arguments))
            },ready: function(e) {
                return G.test(I.readyState) && I.body ? e(S) : I.addEventListener("DOMContentLoaded", function() {
                    e(S)
                }, !1), this
            },get: function(e) {
                return e === x ? T.call(this) : this[e >= 0 ? e : e + this.length]
            },toArray: function() {
                return this.get()
            },size: function() {
                return this.length
            },remove: function() {
                return this.each(function() {
                    null != this.parentNode && this.parentNode.removeChild(this)
                })
            },each: function(e) {
                return L.every.call(this, function(t, n) {
                    return e.call(t, n, t) !== !1
                }), this
            },filter: function(e) {
                return t(e) ? this.not(this.not(e)) : S(E.call(this, function(t) {
                    return Y.matches(t, e)
                }))
            },add: function(e, t) {
                return S(j(this.concat(S(e, t))))
            },is: function(e) {
                return this.length > 0 && Y.matches(this[0], e)
            },not: function(e) {
                var n = [];
                if (t(e) && e.call !== x)
                    this.each(function(t) {
                        e.call(this, t) || n.push(this)
                    });
                else {
                    var o = "string" == typeof e ? this.filter(e) : r(e) && t(e.item) ? T.call(e) : S(e);
                    this.forEach(function(e) {
                        o.indexOf(e) < 0 && n.push(e)
                    })
                }
                return S(n)
            },has: function(e) {
                return this.filter(function() {
                    return a(e) ? S.contains(this, e) : S(this).find(e).size()
                })
            },eq: function(e) {
                return -1 === e ? this.slice(e) : this.slice(e, +e + 1)
            },first: function() {
                var e = this[0];
                return e && !a(e) ? e : S(e)
            },last: function() {
                var e = this[this.length - 1];
                return e && !a(e) ? e : S(e)
            },find: function(e) {
                var t, n = this;
                return t = e ? "object" == typeof e ? S(e).filter(function() {
                    var e = this;
                    return L.some.call(n, function(t) {
                        return S.contains(t, e)
                    })
                }) : 1 == this.length ? S(Y.qsa(this[0], e)) : this.map(function() {
                    return Y.qsa(this, e)
                }) : []
            },closest: function(e, t) {
                var n = this[0], a = !1;
                for ("object" == typeof e && (a = S(e)); n && !(a ? a.indexOf(n) >= 0 : Y.matches(n, e)); )
                    n = n !== t && !o(n) && n.parentNode;
                return S(n)
            },parents: function(e) {
                for (var t = [], n = this; n.length > 0; )
                    n = S.map(n, function(e) {
                        return (e = e.parentNode) && !o(e) && t.indexOf(e) < 0 ? (t.push(e), e) : void 0
                    });
                return h(t, e)
            },parent: function(e) {
                return h(j(this.pluck("parentNode")), e)
            },children: function(e) {
                return h(this.map(function() {
                    return p(this)
                }), e)
            },contents: function() {
                return this.map(function() {
                    return T.call(this.childNodes)
                })
            },siblings: function(e) {
                return h(this.map(function(e, t) {
                    return E.call(p(t.parentNode), function(e) {
                        return e !== t
                    })
                }), e)
            },empty: function() {
                return this.each(function() {
                    this.innerHTML = ""
                })
            },pluck: function(e) {
                return S.map(this, function(t) {
                    return t[e]
                })
            },show: function() {
                return this.each(function() {
                    "none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = f(this.nodeName))
                })
            },replaceWith: function(e) {
                return this.before(e).remove()
            },wrap: function(e) {
                var n = t(e);
                if (this[0] && !n)
                    var o = S(e).get(0), a = o.parentNode || this.length > 1;
                return this.each(function(t) {
                    S(this).wrapAll(n ? e.call(this, t) : a ? o.cloneNode(!0) : o)
                })
            },wrapAll: function(e) {
                if (this[0]) {
                    S(this[0]).before(e = S(e));
                    for (var t; (t = e.children()).length; )
                        e = t.first();
                    S(e).append(this)
                }
                return this
            },wrapInner: function(e) {
                var n = t(e);
                return this.each(function(t) {
                    var o = S(this), a = o.contents(), i = n ? e.call(this, t) : e;
                    a.length ? a.wrapAll(i) : o.append(i)
                })
            },unwrap: function() {
                return this.parent().each(function() {
                    S(this).replaceWith(S(this).children())
                }), this
            },clone: function() {
                return this.map(function() {
                    return this.cloneNode(!0)
                })
            },hide: function() {
                return this.css("display", "none")
            },toggle: function(e) {
                return this.each(function() {
                    var t = S(this);
                    (e === x ? "none" == t.css("display") : e) ? t.show() : t.hide()
                })
            },prev: function(e) {
                return S(this.pluck("previousElementSibling")).filter(e || "*")
            },next: function(e) {
                return S(this.pluck("nextElementSibling")).filter(e || "*")
            },html: function(e) {
                return 0 === arguments.length ? this.length > 0 ? this[0].innerHTML : null : this.each(function(t) {
                    var n = this.innerHTML;
                    S(this).empty().append(g(this, e, t, n))
                })
            },text: function(e) {
                return 0 === arguments.length ? this.length > 0 ? this[0].textContent : null : this.each(function() {
                    this.textContent = e === x ? "" : "" + e
                })
            },attr: function(e, t) {
                var n;
                return "string" == typeof e && t === x ? 0 == this.length || 1 !== this[0].nodeType ? x : "value" == e && "INPUT" == this[0].nodeName ? this.val() : !(n = this[0].getAttribute(e)) && e in this[0] ? this[0][e] : n : this.each(function(n) {
                    if (1 === this.nodeType)
                        if (a(e))
                            for (k in e)
                                v(this, k, e[k]);
                        else
                            v(this, e, g(this, t, n, this.getAttribute(e)))
                })
            },removeAttr: function(e) {
                return this.each(function() {
                    1 === this.nodeType && v(this, e)
                })
            },prop: function(e, t) {
                return e = J[e] || e, t === x ? this[0] && this[0][e] : this.each(function(n) {
                    this[e] = g(this, t, n, this[e])
                })
            },data: function(e, t) {
                var n = this.attr("data-" + e.replace(D, "-$1").toLowerCase(), t);
                return null !== n ? y(n) : x
            },val: function(e) {
                return 0 === arguments.length ? this[0] && (this[0].multiple ? S(this[0]).find("option").filter(function() {
                    return this.selected
                }).pluck("value") : this[0].value) : this.each(function(t) {
                    this.value = g(this, e, t, this.value)
                })
            },offset: function(e) {
                if (e)
                    return this.each(function(t) {
                        var n = S(this), o = g(this, e, t, n.offset()), a = n.offsetParent().offset(), i = {top: o.top - a.top,left: o.left - a.left};
                        "static" == n.css("position") && (i.position = "relative"), n.css(i)
                    });
                if (0 == this.length)
                    return null;
                var t = this[0].getBoundingClientRect();
                return {left: t.left + window.pageXOffset,top: t.top + window.pageYOffset,width: Math.round(t.width),height: Math.round(t.height)}
            },css: function(t, n) {
                if (arguments.length < 2) {
                    var o = this[0], a = getComputedStyle(o, "");
                    if (!o)
                        return;
                    if ("string" == typeof t)
                        return o.style[$(t)] || a.getPropertyValue(t);
                    if (X(t)) {
                        var i = {};
                        return S.each(X(t) ? t : [t], function(e, t) {
                            i[t] = o.style[$(t)] || a.getPropertyValue(t)
                        }), i
                    }
                }
                var r = "";
                if ("string" == e(t))
                    n || 0 === n ? r = d(t) + ":" + u(t, n) : this.each(function() {
                        this.style.removeProperty(d(t))
                    });
                else
                    for (k in t)
                        t[k] || 0 === t[k] ? r += d(k) + ":" + u(k, t[k]) + ";" : this.each(function() {
                            this.style.removeProperty(d(k))
                        });
                return this.each(function() {
                    this.style.cssText += ";" + r
                })
            },index: function(e) {
                return e ? this.indexOf(S(e)[0]) : this.parent().children().indexOf(this[0])
            },hasClass: function(e) {
                return e ? L.some.call(this, function(e) {
                    return this.test(w(e))
                }, l(e)) : !1
            },addClass: function(e) {
                return e ? this.each(function(t) {
                    C = [];
                    var n = w(this), o = g(this, e, t, n);
                    o.split(/\s+/g).forEach(function(e) {
                        S(this).hasClass(e) || C.push(e)
                    }, this), C.length && w(this, n + (n ? " " : "") + C.join(" "))
                }) : this
            },removeClass: function(e) {
                return this.each(function(t) {
                    return e === x ? w(this, "") : (C = w(this), g(this, e, t, C).split(/\s+/g).forEach(function(e) {
                        C = C.replace(l(e), " ")
                    }), void w(this, C.trim()))
                })
            },toggleClass: function(e, t) {
                return e ? this.each(function(n) {
                    var o = S(this), a = g(this, e, n, w(this));
                    a.split(/\s+/g).forEach(function(e) {
                        (t === x ? !o.hasClass(e) : t) ? o.addClass(e) : o.removeClass(e)
                    })
                }) : this
            },scrollTop: function(e) {
                if (this.length) {
                    var t = "scrollTop" in this[0];
                    return e === x ? t ? this[0].scrollTop : this[0].pageYOffset : this.each(t ? function() {
                        this.scrollTop = e
                    } : function() {
                        this.scrollTo(this.scrollX, e)
                    })
                }
            },scrollLeft: function(e) {
                if (this.length) {
                    var t = "scrollLeft" in this[0];
                    return e === x ? t ? this[0].scrollLeft : this[0].pageXOffset : this.each(t ? function() {
                        this.scrollLeft = e
                    } : function() {
                        this.scrollTo(e, this.scrollY)
                    })
                }
            },position: function() {
                if (this.length) {
                    var e = this[0], t = this.offsetParent(), n = this.offset(), o = _.test(t[0].nodeName) ? {top: 0,left: 0} : t.offset();
                    return n.top -= parseFloat(S(e).css("margin-top")) || 0, n.left -= parseFloat(S(e).css("margin-left")) || 0, o.top += parseFloat(S(t[0]).css("border-top-width")) || 0, o.left += parseFloat(S(t[0]).css("border-left-width")) || 0, {top: n.top - o.top,left: n.left - o.left}
                }
            },offsetParent: function() {
                return this.map(function() {
                    for (var e = this.offsetParent || I.body; e && !_.test(e.nodeName) && "static" == S(e).css("position"); )
                        e = e.offsetParent;
                    return e
                })
            }}, S.fn.detach = S.fn.remove, ["width", "height"].forEach(function(e) {
            var t = e.replace(/./, function(e) {
                return e[0].toUpperCase()
            });
            S.fn[e] = function(a) {
                var i, r = this[0];
                return a === x ? n(r) ? r["inner" + t] : o(r) ? r.documentElement["scroll" + t] : (i = this.offset()) && i[e] : this.each(function(t) {
                    r = S(this), r.css(e, g(this, a, t, r[e]()))
                })
            }
        }), R.forEach(function(t, n) {
            var o = n % 2;
            S.fn[t] = function() {
                var t, a, i = S.map(arguments, function(n) {
                    return t = e(n), "object" == t || "array" == t || null == n ? n : Y.fragment(n)
                }), r = this.length > 1;
                return i.length < 1 ? this : this.each(function(e, t) {
                    a = o ? t : t.parentNode, t = 0 == n ? t.nextSibling : 1 == n ? t.firstChild : 2 == n ? t : null, i.forEach(function(e) {
                        if (r)
                            e = e.cloneNode(!0);
                        else if (!a)
                            return S(e).remove();
                        b(a.insertBefore(e, t), function(e) {
                            null == e.nodeName || "SCRIPT" !== e.nodeName.toUpperCase() || e.type && "text/javascript" !== e.type || e.src || window.eval.call(window, e.innerHTML)
                        })
                    })
                })
            }, S.fn[o ? t + "To" : "insert" + (n ? "Before" : "After")] = function(e) {
                return S(e)[t](this), this
            }
        }), Y.Z.prototype = S.fn, Y.uniq = j, Y.deserializeValue = y, S.zepto = Y, S
    }();
    window.Zepto = o, void 0 === window.$ && (window.$ = o), n.exports = o
}), define("zepto/1.1.3/src/event", [], function() {
    !function(e) {
        function t(e) {
            return e._zid || (e._zid = f++)
        }
        function n(e, n, i, r) {
            if (n = o(n), n.ns)
                var s = a(n.ns);
            return (g[t(e)] || []).filter(function(e) {
                return !(!e || n.e && e.e != n.e || n.ns && !s.test(e.ns) || i && t(e.fn) !== t(i) || r && e.sel != r)
            })
        }
        function o(e) {
            var t = ("" + e).split(".");
            return {e: t[0],ns: t.slice(1).sort().join(" ")}
        }
        function a(e) {
            return new RegExp("(?:^| )" + e.replace(" ", " .* ?") + "(?: |$)")
        }
        function i(e, t) {
            return e.del && !w && e.e in y || !!t
        }
        function r(e) {
            return b[e] || w && y[e] || e
        }
        function s(n, a, s, c, l, f, p) {
            var m = t(n), h = g[m] || (g[m] = []);
            a.split(/\s/).forEach(function(t) {
                if ("ready" == t)
                    return e(document).ready(s);
                var a = o(t);
                a.fn = s, a.sel = l, a.e in b && (s = function(t) {
                    var n = t.relatedTarget;
                    return !n || n !== this && !e.contains(this, n) ? a.fn.apply(this, arguments) : void 0
                }), a.del = f;
                var m = f || s;
                a.proxy = function(e) {
                    if (e = d(e), !e.isImmediatePropagationStopped()) {
                        e.data = c;
                        var t = m.apply(n, e._args == u ? [e] : [e].concat(e._args));
                        return t === !1 && (e.preventDefault(), e.stopPropagation()), t
                    }
                }, a.i = h.length, h.push(a), "addEventListener" in n && n.addEventListener(r(a.e), a.proxy, i(a, p))
            })
        }
        function c(e, o, a, s, c) {
            var d = t(e);
            (o || "").split(/\s/).forEach(function(t) {
                n(e, t, a, s).forEach(function(t) {
                    delete g[d][t.i], "removeEventListener" in e && e.removeEventListener(r(t.e), t.proxy, i(t, c))
                })
            })
        }
        function d(t, n) {
            return (n || !t.isDefaultPrevented) && (n || (n = t), e.each(C, function(e, o) {
                var a = n[e];
                t[e] = function() {
                    return this[o] = x, a && a.apply(n, arguments)
                }, t[o] = k
            }), (n.defaultPrevented !== u ? n.defaultPrevented : "returnValue" in n ? n.returnValue === !1 : n.getPreventDefault && n.getPreventDefault()) && (t.isDefaultPrevented = x)), t
        }
        function l(e) {
            var t, n = {originalEvent: e};
            for (t in e)
                S.test(t) || e[t] === u || (n[t] = e[t]);
            return d(n, e)
        }
        var u, f = 1, p = Array.prototype.slice, m = e.isFunction, h = function(e) {
            return "string" == typeof e
        }, g = {}, v = {}, w = "onfocusin" in window, y = {focus: "focusin",blur: "focusout"}, b = {mouseenter: "mouseover",mouseleave: "mouseout"};
        v.click = v.mousedown = v.mouseup = v.mousemove = "MouseEvents", e.event = {add: s,remove: c}, e.proxy = function(n, o) {
            if (m(n)) {
                var a = function() {
                    return n.apply(o, arguments)
                };
                return a._zid = t(n), a
            }
            if (h(o))
                return e.proxy(n[o], n);
            throw new TypeError("expected function")
        }, e.fn.bind = function(e, t, n) {
            return this.on(e, t, n)
        }, e.fn.unbind = function(e, t) {
            return this.off(e, t)
        }, e.fn.one = function(e, t, n, o) {
            return this.on(e, t, n, o, 1)
        };
        var x = function() {
            return !0
        }, k = function() {
            return !1
        }, S = /^([A-Z]|returnValue$|layer[XY]$)/, C = {preventDefault: "isDefaultPrevented",stopImmediatePropagation: "isImmediatePropagationStopped",stopPropagation: "isPropagationStopped"};
        e.fn.delegate = function(e, t, n) {
            return this.on(t, e, n)
        }, e.fn.undelegate = function(e, t, n) {
            return this.off(t, e, n)
        }, e.fn.live = function(t, n) {
            return e(document.body).delegate(this.selector, t, n), this
        }, e.fn.die = function(t, n) {
            return e(document.body).undelegate(this.selector, t, n), this
        }, e.fn.on = function(t, n, o, a, i) {
            var r, d, f = this;
            return t && !h(t) ? (e.each(t, function(e, t) {
                f.on(e, n, o, t, i)
            }), f) : (h(n) || m(a) || a === !1 || (a = o, o = n, n = u), (m(o) || o === !1) && (a = o, o = u), a === !1 && (a = k), f.each(function(u, f) {
                i && (r = function(e) {
                    return c(f, e.type, a), a.apply(this, arguments)
                }), n && (d = function(t) {
                    var o, i = e(t.target).closest(n, f).get(0);
                    return i && i !== f ? (o = e.extend(l(t), {currentTarget: i,liveFired: f}), (r || a).apply(i, [o].concat(p.call(arguments, 1)))) : void 0
                }), s(f, t, a, o, n, d || r)
            }))
        }, e.fn.off = function(t, n, o) {
            var a = this;
            return t && !h(t) ? (e.each(t, function(e, t) {
                a.off(e, n, t)
            }), a) : (h(n) || m(o) || o === !1 || (o = n, n = u), o === !1 && (o = k), a.each(function() {
                c(this, t, o, n)
            }))
        }, e.fn.trigger = function(t, n) {
            return t = h(t) || e.isPlainObject(t) ? e.Event(t) : d(t), t._args = n, this.each(function() {
                "dispatchEvent" in this ? this.dispatchEvent(t) : e(this).triggerHandler(t, n)
            })
        }, e.fn.triggerHandler = function(t, o) {
            var a, i;
            return this.each(function(r, s) {
                a = l(h(t) ? e.Event(t) : t), a._args = o, a.target = s, e.each(n(s, t.type || t), function(e, t) {
                    return i = t.proxy(a), a.isImmediatePropagationStopped() ? !1 : void 0
                })
            }), i
        }, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(t) {
            e.fn[t] = function(e) {
                return e ? this.bind(t, e) : this.trigger(t)
            }
        }), ["focus", "blur"].forEach(function(t) {
            e.fn[t] = function(e) {
                return e ? this.bind(t, e) : this.each(function() {
                    try {
                        this[t]()
                    } catch (e) {
                    }
                }), this
            }
        }), e.Event = function(e, t) {
            h(e) || (t = e, e = t.type);
            var n = document.createEvent(v[e] || "Events"), o = !0;
            if (t)
                for (var a in t)
                    "bubbles" == a ? o = !!t[a] : n[a] = t[a];
            return n.initEvent(e, o, !0), d(n)
        }
    }(Zepto)
}), define("zepto/1.1.3/src/touch", [], function(e) {
    var t = e("zepto/1.1.3/src/zepto");
    !function(e) {
        function t(e, t, n, o) {
            return Math.abs(e - t) >= Math.abs(n - o) ? e - t > 0 ? "Left" : "Right" : n - o > 0 ? "Up" : "Down"
        }
        function n() {
            l = null, f.last && (f.el.trigger("longTap"), f = {})
        }
        function o() {
            l && clearTimeout(l), l = null
        }
        function a() {
            s && clearTimeout(s), c && clearTimeout(c), d && clearTimeout(d), l && clearTimeout(l), s = c = d = l = null, f = {}
        }
        function i(e) {
            return ("touch" == e.pointerType || e.pointerType == e.MSPOINTER_TYPE_TOUCH) && e.isPrimary
        }
        function r(e, t) {
            return e.type == "pointer" + t || e.type.toLowerCase() == "mspointer" + t
        }
        var s, c, d, l, u, f = {}, p = 750;
        e(document).ready(function() {
            var m, h, g, v, w = 0, y = 0;
            "MSGesture" in window && (u = new MSGesture, u.target = document.body), e(document).bind("MSGestureEnd", function(e) {
                var t = e.velocityX > 1 ? "Right" : e.velocityX < -1 ? "Left" : e.velocityY > 1 ? "Down" : e.velocityY < -1 ? "Up" : null;
                t && (f.el.trigger("swipe"), f.el.trigger("swipe" + t))
            }).on("touchstart MSPointerDown pointerdown", function(t) {
                (!(v = r(t, "down")) || i(t)) && (g = v ? t : t.touches[0], t.touches && 1 === t.touches.length && f.x2 && (f.x2 = void 0, f.y2 = void 0), m = Date.now(), h = m - (f.last || m), f.el = e("tagName" in g.target ? g.target : g.target.parentNode), s && clearTimeout(s), f.x1 = g.pageX, f.y1 = g.pageY, h > 0 && 250 >= h && (f.isDoubleTap = !0), f.last = m, l = setTimeout(n, p), u && v && u.addPointer(t.pointerId))
            }).on("touchmove MSPointerMove pointermove", function(e) {
                (!(v = r(e, "move")) || i(e)) && (g = v ? e : e.touches[0], o(), f.x2 = g.pageX, f.y2 = g.pageY, w += Math.abs(f.x1 - f.x2), y += Math.abs(f.y1 - f.y2))
            }).on("touchend MSPointerUp pointerup", function(n) {
                (!(v = r(n, "up")) || i(n)) && (o(), f.x2 && Math.abs(f.x1 - f.x2) > 30 || f.y2 && Math.abs(f.y1 - f.y2) > 30 ? d = setTimeout(function() {
                    f.el.trigger("swipe"), f.el.trigger("swipe" + t(f.x1, f.x2, f.y1, f.y2)), f = {}
                }, 0) : "last" in f && (30 > w && 30 > y ? c = setTimeout(function() {
                    var t = e.Event("tap");
                    t.cancelTouch = a, f.el.trigger(t), f.isDoubleTap ? (f.el && f.el.trigger("doubleTap"), f = {}) : s = setTimeout(function() {
                        s = null, f.el && f.el.trigger("singleTap"), f = {}
                    }, 250)
                }, 0) : f = {}), w = y = 0)
            }).on("touchcancel MSPointerCancel pointercancel", a), e(window).on("scroll", a)
        }), ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function(t) {
            e.fn[t] = function(e) {
                return this.on(t, e)
            }
        })
    }(t)
}), define("zepto/1.1.3/src/fx", [], function() {
    !function(e, t) {
        function n(e) {
            return e.replace(/([a-z])([A-Z])/, "$1-$2").toLowerCase()
        }
        function o(e) {
            return a ? a + e : e.toLowerCase()
        }
        var a, i, r, s, c, d, l, u, f, p, m = "", h = {Webkit: "webkit",Moz: "",O: "o"}, g = window.document, v = g.createElement("div"), w = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i, y = {};
        e.each(h, function(e, n) {
            return v.style[e + "TransitionProperty"] !== t ? (m = "-" + e.toLowerCase() + "-", a = n, !1) : void 0
        }), i = m + "transform", y[r = m + "transition-property"] = y[s = m + "transition-duration"] = y[d = m + "transition-delay"] = y[c = m + "transition-timing-function"] = y[l = m + "animation-name"] = y[u = m + "animation-duration"] = y[p = m + "animation-delay"] = y[f = m + "animation-timing-function"] = "", e.fx = {off: a === t && v.style.transitionProperty === t,speeds: {_default: 400,fast: 200,slow: 600},cssPrefix: m,transitionEnd: o("TransitionEnd"),animationEnd: o("AnimationEnd")}, e.fn.animate = function(n, o, a, i, r) {
            return e.isFunction(o) && (i = o, a = t, o = t), e.isFunction(a) && (i = a, a = t), e.isPlainObject(o) && (a = o.easing, i = o.complete, r = o.delay, o = o.duration), o && (o = ("number" == typeof o ? o : e.fx.speeds[o] || e.fx.speeds._default) / 1e3), r && (r = parseFloat(r) / 1e3), this.anim(n, o, a, i, r)
        }, e.fn.anim = function(o, a, m, h, g) {
            var v, b, x, k = {}, S = "", C = this, $ = e.fx.transitionEnd, j = !1;
            if (a === t && (a = e.fx.speeds._default / 1e3), g === t && (g = 0), e.fx.off && (a = 0), "string" == typeof o)
                k[l] = o, k[u] = a + "s", k[p] = g + "s", k[f] = m || "linear", $ = e.fx.animationEnd;
            else {
                b = [];
                for (v in o)
                    w.test(v) ? S += v + "(" + o[v] + ") " : (k[v] = o[v], b.push(n(v)));
                S && (k[i] = S, b.push(i)), a > 0 && "object" == typeof o && (k[r] = b.join(", "), k[s] = a + "s", k[d] = g + "s", k[c] = m || "linear")
            }
            return x = function(t) {
                if ("undefined" != typeof t) {
                    if (t.target !== t.currentTarget)
                        return;
                    e(t.target).unbind($, x)
                } else
                    e(this).unbind($, x);
                j = !0, e(this).css(y), h && h.call(this)
            }, a > 0 && (this.bind($, x), setTimeout(function() {
                j || x.call(C)
            }, 1e3 * a + 25)), this.size() && this.get(0).clientLeft, this.css(k), 0 >= a && setTimeout(function() {
                C.each(function() {
                    x.call(this)
                })
            }, 0), this
        }, v = null
    }(Zepto)
}), define("zepto/1.1.3/src/fx_methods", [], function() {
    !function(e, t) {
        function n(n, o, a, i, r) {
            "function" != typeof o || r || (r = o, o = t);
            var s = {opacity: a};
            return i && (s.scale = i, n.css(e.fx.cssPrefix + "transform-origin", "0 0")), n.animate(s, o, null, r)
        }
        function o(t, o, a, i) {
            return n(t, o, 0, a, function() {
                r.call(e(this)), i && i.call(this)
            })
        }
        var a = window.document, i = (a.documentElement, e.fn.show), r = e.fn.hide, s = e.fn.toggle;
        e.fn.show = function(e, o) {
            return i.call(this), e === t ? e = 0 : this.css("opacity", 0), n(this, e, 1, "1,1", o)
        }, e.fn.hide = function(e, n) {
            return e === t ? r.call(this) : o(this, e, "0,0", n)
        }, e.fn.toggle = function(n, o) {
            return n === t || "boolean" == typeof n ? s.call(this, n) : this.each(function() {
                var t = e(this);
                t["none" == t.css("display") ? "show" : "hide"](n, o)
            })
        }, e.fn.fadeTo = function(e, t, o) {
            return n(this, e, t, null, o)
        }, e.fn.fadeIn = function(e, t) {
            var n = this.css("opacity");
            return n > 0 ? this.css("opacity", 0) : n = 1, i.call(this).fadeTo(e, n, t)
        }, e.fn.fadeOut = function(e, t) {
            return o(this, e, null, t)
        }, e.fn.fadeToggle = function(t, n) {
            return this.each(function() {
                var o = e(this);
                o[0 == o.css("opacity") || "none" == o.css("display") ? "fadeIn" : "fadeOut"](t, n)
            })
        }
    }(Zepto)
}), define("portal/1.0.0/src/tff/tff.core.pageRouter", [], function(e, t) {
    !function() {
        var n = null, o = "p", a = [], i = null;
        n = "function" == typeof e ? e("portal/1.0.0/src/tff/tff.core.hash") : "object" == typeof seajs ? seajs.require("./tff.core.hash") : window.tff.core.hash;
        var r = function(e) {
            var t = {pageName: "",pageObject: null};
            for (var n in e)
                e.hasOwnProperty(n) && (t[n] = e[n]);
            t.pageName && t.pageName.length > 0 && a.push(t)
        }, s = function(e) {
            o = e
        };
        n.addHashChangeEventHandler(function(e) {
            var t = e.hashObj[o], n = null;
            if (t && t.length > 0)
                for (var r = a.length - 1; r >= 0; r--)
                    if (a[r].pageName === t) {
                        n = a[r];
                        break
                    }
            n && (i && n !== i && i.pageObject.hide(), n.initialized || (n.initialized = !0, n.pageObject.init(e)), n.pageObject.show(e), i = n, e.scrollY && e.scrollY > 0 && window.scrollTo(0, e.scrollY))
        }), "function" == typeof define ? (t.setDefaultPageIndicator = s, t.registPage = r) : (window.tff = window.tff || {}, window.tff.core = window.tff.core || {}, window.tff.core.pageRouter = {}, window.tff.core.pageRouter.setDefaultPageIndicator = s, window.tff.core.pageRouter.registPage = r)
    }()
}), define("portal/1.0.0/src/tff/tff.core.hash", [], function(e, t) {
    !function() {
        function e(e) {
            var t = decodeURIComponent(e).replace(/[&<>"'\/]/g, function(e) {
                return i[e]
            });
            return encodeURIComponent(t)
        }
        var n = {}, o = [], a = [], i = {"&": "&amp;","<": "&lt;",">": "&gt;",'"': "&quot;","'": "&#39;","/": "&#x2F;"}, r = function(t) {
            "#" === t[0] && (t = t.substr(1));
            for (var n = t.split("&"), o = {}, a = 0; a < n.length; a++)
                if (n[a] && 0 !== n[a].length) {
                    var i = n[a].split("=");
                    2 == i.length ? o[i[0]] = e(i[1]) : 1 == i.length && (o[i[0]] = "")
                }
            return o
        }, s = function() {
            for (var e = location.hash, t = c(), i = d(), r = {hashString: e,hashObj: t,requestObj: i}, s = 0; s < a.length; s++)
                a[s] && a[s](r);
            for (var s = 0; s < o.length; s++)
                o[s] && o[s](r);
            n = r
        }, c = function() {
            var e = location.hash.split("?")[0];
            return "" === e ? {} : r(e)
        }, d = function() {
            var e = location.search, t = {};
            return -1 != e.indexOf("?") && (e = e.substr(1)), t = r(e)
        }, l = function(e) {
            var t = "";
            for (var n in e)
                e.hasOwnProperty(n) && (t += n + "=" + e[n] + "&");
            return t.length > 0 && (t = "#" + t.substr(0, t.length - 1)), t
        }, u = function(e) {
            e && "function" == typeof e && o.push(e)
        }, f = function(e) {
            e && "function" == typeof e && a.push(e)
        };
        window.addEventListener("hashchange", s, !1), "function" == typeof define ? (t.buildObj = r, t.getHashObj = c, t.getRequestObj = d, t.currehtHashInfo = n, t.addHashChangeEventHandler = u, t.addBeforeHashChangeEventHandler = f, t.buildHashString = l) : (window.tff = window.tff || {}, window.tff.core = window.tff.core || {}, window.tff.core.hash = {}, window.tff.core.hash.buildObj = r, window.tff.core.hash.buildHashString = l, window.tff.core.hash.getHashObj = c, window.tff.core.hash.getRequestObj = d, window.tff.core.hash.currehtHashInfo = n, window.tff.core.hash.addHashChangeEventHandler = u, window.tff.core.hash.addBeforeHashChangeEventHandler = f)
    }()
}), define("portal/1.0.0/src/tff/tff.data", [], function(e, t) {
    !function() {
        var n = null;
        if ("function" == typeof e) {
            n = e("portal/1.0.0/src/tff/tff.data.xmlHttpRequest");
            var o = e("when/3.4.4/when")
        } else
            n = window.tff.data.xmlHttpRequest;
        var a = "", i = function(e) {
            a = e
        }, r = function(e, t, n, o) {
            var i = {timeout: 6e3,type: "get",url: "",data: null,dataType: "json",beforeSend: null,onSuccess: null,onError: null,responseDataValidator: null};
            e = e || "";
            var r = a + e + "?";
            null != o && 0 == o && (r = e + "?");
            for (var s in t)
                t.hasOwnProperty(s) && s && t[s] && (r += s + "=" + t[s], r += "&");
            r = r.substr(0, r.length - 1), i.url = r;
            for (var s in n)
                n.hasOwnProperty(s) && (i[s] = n[s]);
            return i
        }, s = function(e, t, a, i) {
            var s, c = new o.defer;
            return s = null != i && 0 == i ? r(e, t, a, i) : r(e, t, a), s.onSuccess = function(e) {
                s.responseDataValidator ? s.responseDataValidator(e.data, e.ajaxOptions) === !0 ? c.resolve(e.data) : c.reject(e.data) : c.resolve(e.data)
            }, s.onError = function(e) {
                c.reject(e.error)
            }, n.ajax(s), c.promise
        };
        "function" == typeof define ? (t.setAjaxUrl = i, t.invokeAjaxCmd = s) : (window.tff = window.tff || {}, window.tff.data = window.tff.data || {}, window.tff.data.setAjaxUrl = i, window.tff.data.invokeAjaxCmd = s)
    }()
}), define("portal/1.0.0/src/tff/tff.data.xmlHttpRequest", [], function(require, exports, module) {
    !function() {
        var staticOnErrorEventHandler = [], staticOnCompleteEventHandler = [], staticOnSuccessEventHandler = [], ajax = function(options, xhr) {
            var onError = function(e, t) {
                for (var n = {xhr: e,ajaxOptions: defaultOptions,error: t,cancel: !1}, o = 0; o < staticOnErrorEventHandler.length; o++)
                    staticOnErrorEventHandler[o] && staticOnErrorEventHandler[o](n);
                n.cancel === !1 && defaultOptions.onError && defaultOptions.onError(n)
            }, onSuccess = function(e, t) {
                for (var n = {data: e,ajaxOptions: defaultOptions,xhr: t,cancel: !1}, o = 0; o < staticOnSuccessEventHandler.length; o++)
                    staticOnSuccessEventHandler[o] && staticOnSuccessEventHandler[o](n);
                n.cancel === !1 && defaultOptions.onSuccess && defaultOptions.onSuccess(n)
            }, onComplete = function(e, t) {
                for (var n = {xhr: e,ajaxOptions: defaultOptions,status: t,cancel: !1}, o = 0; o < staticOnCompleteEventHandler.length; o++)
                    staticOnCompleteEventHandler[o] && staticOnCompleteEventHandler[o](n);
                n.cancel === !1 && options.onComplete && options.onComplete(n)
            }, onStateChange = function(e) {
                if (4 == xhr.readyState)
                    if (timeout > 0 && abortTimeout && (clearTimeout(abortTimeout), abortTimeout = 0), xhr.status >= 200 && xhr.status < 300 || 304 == xhr.status) {
                        var dataType = options.dataType, result = xhr.responseText;
                        try {
                            "json" == dataType && (result = window.JSON ? JSON.parse(result) : eval("(" + result + ")")), onSuccess(result, xhr)
                        } catch (ex) {
                            onError(xhr, ex)
                        }
                        onComplete(xhr, xhr.status)
                    } else
                        onError(xhr, {message: "statu code error"})
            }, defaultOptions = {timeout: 6e3,type: "get",url: "",data: null,dataType: "json",beforeSend: null,onSuccess: null,onError: null,onComplete: null};
            for (x in defaultOptions)
                options.hasOwnProperty(x) && (defaultOptions[x] = options[x]);
            var timeout = defaultOptions.timeout, url = defaultOptions.url, xhr = xhr || new XMLHttpRequest;
            if (xhr.open(defaultOptions.type, url), xhr.onreadystatechange = onStateChange, "post" === defaultOptions.type && xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), defaultOptions.beforeSend) {
                var beforeSendArgs = {cancel: !1};
                if (defaultOptions.beforeSend(beforeSendArgs), beforeSendArgs.cancel)
                    return xhr.onreadystatechange = function() {
                    }, void xhr.abort()
            }
            xhr.send(defaultOptions.data ? defaultOptions.data : null);
            var abortTimeout = 0;
            timeout > 0 && (abortTimeout = setTimeout(function() {
                xhr.onreadystatechange = function() {
                }, xhr.abort(), onError(xhr, {message: "request timeout"})
            }, timeout))
        }, addStaticOnErrorEventHandler = function(e) {
            e && "function" == typeof e && staticOnErrorEventHandler.push(e)
        }, addStaticOnCompleteEventHandler = function(e) {
            e && "function" == typeof e && staticOnCompleteEventHandler.push(e)
        }, addStaticOnSuccessEventHandler = function(e) {
            e && "function" == typeof e && staticOnSuccessEventHandler.push(e)
        };
        "function" == typeof define ? (exports.ajax = ajax, exports.addStaticOnErrorEventHandler = addStaticOnErrorEventHandler, exports.addStaticOnCompleteEventHandler = addStaticOnCompleteEventHandler, exports.addStaticOnSuccessEventHandler = addStaticOnSuccessEventHandler) : (window.tff = window.tff || {}, window.tff.data = window.tff.data || {}, window.tff.data.xmlHttpRequest = {}, window.tff.data.xmlHttpRequest.ajax = ajax, window.tff.data.xmlHttpRequest.addStaticOnErrorEventHandler = addStaticOnErrorEventHandler, window.tff.data.xmlHttpRequest.addStaticOnCompleteEventHandler = addStaticOnCompleteEventHandler, window.tff.data.xmlHttpRequest.addStaticOnSuccessEventHandler = addStaticOnSuccessEventHandler)
    }()
}), define("when/3.4.4/when", [], function(e, t, n) {
    !function(e) {
        "use strict";
        e(function(e) {
            function t(e, t, n) {
                var o = j.resolve(e);
                return arguments.length < 2 ? o : arguments.length > 3 ? o.then(t, n, arguments[3]) : o.then(t, n)
            }
            function n(e) {
                return new j(e)
            }
            function o(e) {
                return function() {
                    return i(e, this, L.call(arguments))
                }
            }
            function a(e) {
                return i(e, this, L.call(arguments, 1))
            }
            function i(e, t, n) {
                return j.all(n).then(function(n) {
                    return e.apply(t, n)
                })
            }
            function r() {
                return new s
            }
            function s() {
                function e(e) {
                    o._handler.resolve(e)
                }
                function t(e) {
                    o._handler.reject(e)
                }
                function n(e) {
                    o._handler.notify(e)
                }
                var o = j._defer();
                this.promise = o, this.resolve = e, this.reject = t, this.notify = n, this.resolver = {resolve: e,reject: t,notify: n}
            }
            function c(e) {
                return e && "function" == typeof e.then
            }
            function d() {
                return j.all(arguments)
            }
            function l(e) {
                return t(e, j.all)
            }
            function u(e) {
                return t(e, j.settle)
            }
            function f(e, n) {
                return t(e, function(e) {
                    return j.map(e, n)
                })
            }
            function p(e, n) {
                return t(e, function(e) {
                    return j.filter(e, n)
                })
            }
            function m(e) {
                var n = L.call(arguments, 1);
                return t(e, function(e) {
                    return n.unshift(e), j.reduce.apply(j, n)
                })
            }
            function h(e) {
                var n = L.call(arguments, 1);
                return t(e, function(e) {
                    return n.unshift(e), j.reduceRight.apply(j, n)
                })
            }
            var g = e("when/3.4.4/lib/decorators/timed"), v = e("when/3.4.4/lib/decorators/array"), w = e("when/3.4.4/lib/decorators/flow"), y = e("when/3.4.4/lib/decorators/fold"), b = e("when/3.4.4/lib/decorators/inspect"), x = e("when/3.4.4/lib/decorators/iterate"), k = e("when/3.4.4/lib/decorators/progress"), S = e("when/3.4.4/lib/decorators/with"), C = e("when/3.4.4/lib/decorators/unhandledRejection"), $ = e("when/3.4.4/lib/TimeoutError"), j = [v, w, y, x, k, b, S, g, C].reduce(function(e, t) {
                return t(e)
            }, e("when/3.4.4/lib/Promise")), L = Array.prototype.slice;
            return t.promise = n, t.resolve = j.resolve, t.reject = j.reject, t.lift = o, t["try"] = a, t.attempt = a, t.iterate = j.iterate, t.unfold = j.unfold, t.join = d, t.all = l, t.settle = u, t.any = o(j.any), t.some = o(j.some), t.race = o(j.race), t.map = f, t.filter = p, t.reduce = m, t.reduceRight = h, t.isPromiseLike = c, t.Promise = j, t.defer = r, t.TimeoutError = $, t
        })
    }("function" == typeof define && define.amd ? define : function(t) {
        n.exports = t(e)
    })
}), define("when/3.4.4/lib/decorators/timed", [], function(e, t, n) {
    !function(e) {
        "use strict";
        e(function(e) {
            function t(e, t, o, a) {
                return n.set(function() {
                    e(o, a, t)
                }, t)
            }
            var n = e("when/3.4.4/lib/timer"), o = e("when/3.4.4/lib/TimeoutError");
            return function(e) {
                function a(e, n, o) {
                    t(i, e, n, o)
                }
                function i(e, t) {
                    t.resolve(e)
                }
                function r(e, t, n) {
                    var a = "undefined" == typeof e ? new o("timed out after " + n + "ms") : e;
                    t.reject(a)
                }
                return e.prototype.delay = function(e) {
                    var t = this._beget();
                    return this._handler.fold(a, e, void 0, t._handler), t
                }, e.prototype.timeout = function(e, o) {
                    var a = this._beget(), i = a._handler, s = t(r, e, o, a._handler);
                    return this._handler.visit(i, function(e) {
                        n.clear(s), this.resolve(e)
                    }, function(e) {
                        n.clear(s), this.reject(e)
                    }, i.notify), a
                }, e
            }
        })
    }("function" == typeof define && define.amd ? define : function(t) {
        n.exports = t(e)
    })
}), define("when/3.4.4/lib/timer", [], function(e, t, n) {
    !function(e) {
        "use strict";
        e(function(e) {
            var t, n, o, a;
            t = e;
            try {
                n = t("vertx"), o = function(e, t) {
                    return n.setTimer(t, e)
                }, a = n.cancelTimer
            } catch (i) {
                o = function(e, t) {
                    return setTimeout(e, 0 | t)
                }, a = function(e) {
                    return clearTimeout(e)
                }
            }
            return {set: o,clear: a}
        })
    }("function" == typeof define && define.amd ? define : function(t) {
        n.exports = t(e)
    })
}), define("when/3.4.4/lib/TimeoutError", [], function(e, t, n) {
    !function(e) {
        "use strict";
        e(function() {
            function e(t) {
                Error.call(this), this.message = t, this.name = e.name, "function" == typeof Error.captureStackTrace && Error.captureStackTrace(this, e)
            }
            return e.prototype = Object.create(Error.prototype), e.prototype.constructor = e, e
        })
    }("function" == typeof define && define.amd ? define : function(e) {
        n.exports = e()
    })
}), define("when/3.4.4/lib/decorators/array", [], function(e, t, n) {
    !function(e) {
        "use strict";
        e(function() {
            return function(e) {
                function t(t) {
                    return new e(function(e, n) {
                        function a(e) {
                            i.push(e), 0 === --r && n(i)
                        }
                        var i = [], r = o(t, e, a);
                        0 === r && n(new RangeError("any() input must not be empty"))
                    })
                }
                function n(t, n) {
                    return new e(function(e, a, i) {
                        function r(t) {
                            u > 0 && (--u, d.push(t), 0 === u && e(d))
                        }
                        function s(e) {
                            c > 0 && (--c, l.push(e), 0 === c && a(l))
                        }
                        var c, d = [], l = [], u = o(t, r, s, i);
                        n = Math.max(n, 0), c = u - n + 1, u = Math.min(n, u), n > u ? a(new RangeError("some() input must contain at least " + n + " element(s), but had " + u)) : 0 === u && e(d)
                    })
                }
                function o(e, t, n, o) {
                    return u.call(e, function(e, a) {
                        return p(a).then(t, n, o), e + 1
                    }, 0)
                }
                function a(e, t) {
                    function n(e, n) {
                        return t(n, e)
                    }
                    return "object" != typeof e ? p([]) : m(l(function(e, t) {
                        return p(e).fold(n, t)
                    }, e))
                }
                function i(e, t) {
                    return m(e).then(function(e) {
                        return m(l(t, e)).then(function(t) {
                            for (var n, o = t.length, a = new Array(o), i = 0, r = 0; o > i; ++i)
                                n = t[i], (void 0 !== n || i in t) && t[i] && (a[r++] = e[i]);
                            return a.length = r, a
                        })
                    })
                }
                function r(e) {
                    return m(l(function(e) {
                        function t() {
                            return e.inspect()
                        }
                        return e = p(e), e.then(t, t)
                    }, e))
                }
                function s(e, t) {
                    var n = d(t);
                    return arguments.length > 2 ? u.call(e, n, arguments[2]) : u.call(e, n)
                }
                function c(e, t) {
                    var n = d(t);
                    return arguments.length > 2 ? f.call(e, n, arguments[2]) : f.call(e, n)
                }
                function d(e) {
                    return function(t, n, o) {
                        return p(t).then(function(t) {
                            return p(n).then(function(n) {
                                return e(t, n, o)
                            })
                        })
                    }
                }
                function l(e, t) {
                    for (var n, o = t.length, a = new Array(o), i = 0; o > i; ++i)
                        n = t[i], (void 0 !== n || i in t) && (a[i] = e(t[i], i));
                    return a
                }
                var u = Array.prototype.reduce, f = Array.prototype.reduceRight, p = e.resolve, m = e.all;
                return e.any = t, e.some = n, e.settle = r, e.map = a, e.filter = i, e.reduce = s, e.reduceRight = c, e.prototype.spread = function(e) {
                    return this.then(m).then(function(t) {
                        return e.apply(void 0, t)
                    })
                }, e
            }
        })
    }("function" == typeof define && define.amd ? define : function(e) {
        n.exports = e()
    })
}), define("when/3.4.4/lib/decorators/flow", [], function(e, t, n) {
    !function(e) {
        "use strict";
        e(function() {
            function e() {
                throw new TypeError("catch predicate must be a function")
            }
            function t(e, t) {
                return n(t) ? e instanceof t : t(e)
            }
            function n(e) {
                return e === Error || null != e && e.prototype instanceof Error
            }
            function o(e) {
                return function() {
                    return e.call(this)
                }
            }
            return function(n) {
                function a(e, n) {
                    return function(o) {
                        return t(o, n) ? e.call(this, o) : i(o)
                    }
                }
                var i = n.reject, r = n.prototype["catch"];
                return n.prototype.done = function(e, t) {
                    this._handler.visit(this._handler.receiver, e, t)
                }, n.prototype["catch"] = n.prototype.otherwise = function(t) {
                    return arguments.length < 2 ? r.call(this, t) : "function" != typeof t ? this.ensure(e) : r.call(this, a(arguments[1], t))
                }, n.prototype["finally"] = n.prototype.ensure = function(e) {
                    if ("function" != typeof e)
                        return this;
                    var t = o(e);
                    return this.then(t, t)["yield"](this)
                }, n.prototype["else"] = n.prototype.orElse = function(e) {
                    return this.then(void 0, function() {
                        return e
                    })
                }, n.prototype["yield"] = function(e) {
                    return this.then(function() {
                        return e
                    })
                }, n.prototype.tap = function(e) {
                    return this.then(e)["yield"](this)
                }, n
            }
        })
    }("function" == typeof define && define.amd ? define : function(e) {
        n.exports = e()
    })
}), define("when/3.4.4/lib/decorators/fold", [], function(e, t, n) {
    !function(e) {
        "use strict";
        e(function() {
            return function(e) {
                return e.prototype.fold = function(t, n) {
                    var o = this._beget();
                    return this._handler.fold(function(n, o, a) {
                        e._handler(n).fold(function(e, n, o) {
                            o.resolve(t.call(this, n, e))
                        }, o, this, a)
                    }, n, o._handler.receiver, o._handler), o
                }, e
            }
        })
    }("function" == typeof define && define.amd ? define : function(e) {
        n.exports = e()
    })
}), define("when/3.4.4/lib/decorators/inspect", [], function(e, t, n) {
    !function(e) {
        "use strict";
        e(function() {
            return function(e) {
                function t(e) {
                    var t = e.state();
                    return 0 === t ? {state: "pending"} : t > 0 ? {state: "fulfilled",value: e.value} : {state: "rejected",reason: e.value}
                }
                return e.prototype.inspect = function() {
                    return t(e._handler(this))
                }, e
            }
        })
    }("function" == typeof define && define.amd ? define : function(e) {
        n.exports = e()
    })
}), define("when/3.4.4/lib/decorators/iterate", [], function(e, t, n) {
    !function(e) {
        "use strict";
        e(function() {
            return function(e) {
                function t(e, t, o, a) {
                    return n(function(t) {
                        return [t, e(t)]
                    }, t, o, a)
                }
                function n(e, t, a, i) {
                    function r(i, r) {
                        return o(a(i)).then(function() {
                            return n(e, t, a, r)
                        })
                    }
                    return o(i).then(function(n) {
                        return o(t(n)).then(function(t) {
                            return t ? n : o(e(n)).spread(r)
                        })
                    })
                }
                var o = e.resolve;
                return e.iterate = t, e.unfold = n, e
            }
        })
    }("function" == typeof define && define.amd ? define : function(e) {
        n.exports = e()
    })
}), define("when/3.4.4/lib/decorators/progress", [], function(e, t, n) {
    !function(e) {
        "use strict";
        e(function() {
            return function(e) {
                return e.prototype.progress = function(e) {
                    return this.then(void 0, void 0, e)
                }, e
            }
        })
    }("function" == typeof define && define.amd ? define : function(e) {
        n.exports = e()
    })
}), define("when/3.4.4/lib/decorators/with", [], function(e, t, n) {
    !function(e) {
        "use strict";
        e(function() {
            return function(e) {
                return e.prototype["with"] = e.prototype.withThis = function(e) {
                    var t = this._beget(), n = t._handler;
                    return n.receiver = e, this._handler.chain(n, e), t
                }, e
            }
        })
    }("function" == typeof define && define.amd ? define : function(e) {
        n.exports = e()
    })
}), define("when/3.4.4/lib/decorators/unhandledRejection", [], function(e, t, n) {
    !function(e) {
        "use strict";
        e(function(e) {
            function t(e) {
                var t = "object" == typeof e && e.stack ? e.stack : n(e);
                return e instanceof Error ? t : t + " (WARNING: non-Error used)"
            }
            function n(e) {
                var t = String(e);
                return "[object Object]" === t && "undefined" != typeof JSON && (t = o(e, t)), t
            }
            function o(e, t) {
                try {
                    return JSON.stringify(e)
                } catch (e) {
                    return t
                }
            }
            function a(e) {
                throw e
            }
            function i() {
            }
            var r = e("when/3.4.4/lib/timer");
            return function(e) {
                function o(e) {
                    e.handled || (p.push(e), l("Potentially unhandled rejection [" + e.id + "] " + t(e.value)))
                }
                function s(e) {
                    var t = p.indexOf(e);
                    t >= 0 && (p.splice(t, 1), u("Handled previous rejection [" + e.id + "] " + n(e.value)))
                }
                function c(e, t) {
                    f.push(e, t), m || (m = !0, m = r.set(d, 0))
                }
                function d() {
                    for (m = !1; f.length > 0; )
                        f.shift()(f.shift())
                }
                var l = i, u = i;
                "undefined" != typeof console && (l = "undefined" != typeof console.error ? function(e) {
                    console.error(e)
                } : function(e) {
                    console.log(e)
                }, u = "undefined" != typeof console.info ? function(e) {
                    console.info(e)
                } : function(e) {
                    console.log(e)
                }), e.onPotentiallyUnhandledRejection = function(e) {
                    c(o, e)
                }, e.onPotentiallyUnhandledRejectionHandled = function(e) {
                    c(s, e)
                }, e.onFatalRejection = function(e) {
                    c(a, e.value)
                };
                var f = [], p = [], m = !1;
                return e
            }
        })
    }("function" == typeof define && define.amd ? define : function(t) {
        n.exports = t(e)
    })
}), define("when/3.4.4/lib/Promise", [], function(e, t, n) {
    !function(e) {
        "use strict";
        e(function(e) {
            var t = e("when/3.4.4/lib/makePromise"), n = e("when/3.4.4/lib/Scheduler"), o = e("when/3.4.4/lib/async");
            return t({scheduler: new n(o)})
        })
    }("function" == typeof define && define.amd ? define : function(t) {
        n.exports = t(e)
    })
}), define("when/3.4.4/lib/makePromise", [], function(e, t, n) {
    !function(e) {
        "use strict";
        e(function() {
            return function(e) {
                function t(e, t) {
                    this._handler = e === u ? t : n(e)
                }
                function n(e) {
                    function t(e) {
                        a.resolve(e)
                    }
                    function n(e) {
                        a.reject(e)
                    }
                    function o(e) {
                        a.notify(e)
                    }
                    var a = new p;
                    try {
                        e(t, n, o)
                    } catch (i) {
                        n(i)
                    }
                    return a
                }
                function o(e) {
                    return $(e) ? e : new t(u, new m(d(e)))
                }
                function a(e) {
                    return new t(u, new m(new v(e)))
                }
                function i() {
                    return R
                }
                function r() {
                    return new t(u, new p)
                }
                function s(e) {
                    function n(e, t, n) {
                        this[e] = t, 0 === --c && n.become(new g(this))
                    }
                    var o, a, i, r, s = new p, c = e.length >>> 0, d = new Array(c);
                    for (o = 0; o < e.length; ++o)
                        if (i = e[o], void 0 !== i || o in e)
                            if (j(i))
                                if (a = $(i) ? i._handler.join() : l(i), r = a.state(), 0 === r)
                                    a.fold(n, o, d, s);
                                else {
                                    if (!(r > 0)) {
                                        s.become(a);
                                        break
                                    }
                                    d[o] = a.value, --c
                                }
                            else
                                d[o] = i, --c;
                        else
                            --c;
                    return 0 === c && s.become(new g(d)), new t(u, s)
                }
                function c(e) {
                    if (Object(e) === e && 0 === e.length)
                        return i();
                    var n, o, a = new p;
                    for (n = 0; n < e.length; ++n)
                        o = e[n], void 0 !== o && n in e && d(o).visit(a, a.resolve, a.reject);
                    return new t(u, a)
                }
                function d(e) {
                    return $(e) ? e._handler.join() : j(e) ? l(e) : new g(e)
                }
                function l(e) {
                    try {
                        var t = e.then;
                        return "function" == typeof t ? new h(t, e) : new g(e)
                    } catch (n) {
                        return new v(n)
                    }
                }
                function u() {
                }
                function f() {
                }
                function p(e, n) {
                    t.createContext(this, n), this.consumers = void 0, this.receiver = e, this.handler = void 0, this.resolved = !1
                }
                function m(e) {
                    this.handler = e
                }
                function h(e, t) {
                    p.call(this), U.enqueue(new S(e, t, this))
                }
                function g(e) {
                    t.createContext(this), this.value = e
                }
                function v(e) {
                    t.createContext(this), this.id = ++D, this.value = e, this.handled = !1, this.reported = !1, this._report()
                }
                function w(e, t) {
                    this.rejection = e, this.context = t
                }
                function y(e) {
                    this.rejection = e
                }
                function b() {
                    return new v(new TypeError("Promise cycle"))
                }
                function x(e, t) {
                    this.continuation = e, this.handler = t
                }
                function k(e, t) {
                    this.handler = t, this.value = e
                }
                function S(e, t, n) {
                    this._then = e, this.thenable = t, this.resolver = n
                }
                function C(e, t, n, o, a) {
                    try {
                        e.call(t, n, o, a)
                    } catch (i) {
                        o(i)
                    }
                }
                function $(e) {
                    return e instanceof t
                }
                function j(e) {
                    return ("object" == typeof e || "function" == typeof e) && null !== e
                }
                function L(e, n, o, a) {
                    return "function" != typeof e ? a.become(n) : (t.enterContext(n), I(e, n.value, o, a), void t.exitContext())
                }
                function T(e, n, o, a, i) {
                    return "function" != typeof e ? i.become(o) : (t.enterContext(o), A(e, n, o.value, a, i), void t.exitContext())
                }
                function E(e, n, o, a, i) {
                    return "function" != typeof e ? i.notify(n) : (t.enterContext(o), B(e, n, a, i), void t.exitContext())
                }
                function I(e, t, n, o) {
                    try {
                        o.become(d(e.call(n, t)))
                    } catch (a) {
                        o.become(new v(a))
                    }
                }
                function A(e, t, n, o, a) {
                    try {
                        e.call(o, t, n, a)
                    } catch (i) {
                        a.become(new v(i))
                    }
                }
                function B(e, t, n, o) {
                    try {
                        o.notify(e.call(n, t))
                    } catch (a) {
                        o.notify(a)
                    }
                }
                function N(e, t) {
                    t.prototype = O(e.prototype), t.prototype.constructor = t
                }
                function P() {
                }
                var U = e.scheduler, O = Object.create || function(e) {
                    function t() {
                    }
                    return t.prototype = e, new t
                };
                t.resolve = o, t.reject = a, t.never = i, t._defer = r, t._handler = d, t.prototype.then = function(e, n) {
                    var o = this._handler;
                    if ("function" != typeof e && o.join().state() > 0)
                        return new t(u, o);
                    var a = this._beget(), i = a._handler;
                    return o.chain(i, o.receiver, e, n, arguments.length > 2 ? arguments[2] : void 0), a
                }, t.prototype["catch"] = function(e) {
                    return this.then(void 0, e)
                }, t.prototype._beget = function() {
                    var e = this._handler, t = new p(e.receiver, e.join().context);
                    return new this.constructor(u, t)
                }, t.all = s, t.race = c, u.prototype.when = u.prototype.become = u.prototype.notify = u.prototype.fail = u.prototype._unreport = u.prototype._report = P, u.prototype._state = 0, u.prototype.state = function() {
                    return this._state
                }, u.prototype.join = function() {
                    for (var e = this; void 0 !== e.handler; )
                        e = e.handler;
                    return e
                }, u.prototype.chain = function(e, t, n, o, a) {
                    this.when({resolver: e,receiver: t,fulfilled: n,rejected: o,progress: a})
                }, u.prototype.visit = function(e, t, n, o) {
                    this.chain(_, e, t, n, o)
                }, u.prototype.fold = function(e, t, n, o) {
                    this.visit(o, function(o) {
                        e.call(n, t, o, this)
                    }, o.reject, o.notify)
                }, N(u, f), f.prototype.become = function(e) {
                    e.fail()
                };
                var _ = new f;
                N(u, p), p.prototype._state = 0, p.prototype.resolve = function(e) {
                    this.become(d(e))
                }, p.prototype.reject = function(e) {
                    this.resolved || this.become(new v(e))
                }, p.prototype.join = function() {
                    if (!this.resolved)
                        return this;
                    for (var e = this; void 0 !== e.handler; )
                        if (e = e.handler, e === this)
                            return this.handler = b();
                    return e
                }, p.prototype.run = function() {
                    var e = this.consumers, t = this.join();
                    this.consumers = void 0;
                    for (var n = 0; n < e.length; ++n)
                        t.when(e[n])
                }, p.prototype.become = function(e) {
                    this.resolved || (this.resolved = !0, this.handler = e, void 0 !== this.consumers && U.enqueue(this), void 0 !== this.context && e._report(this.context))
                }, p.prototype.when = function(e) {
                    this.resolved ? U.enqueue(new x(e, this.handler)) : void 0 === this.consumers ? this.consumers = [e] : this.consumers.push(e)
                }, p.prototype.notify = function(e) {
                    this.resolved || U.enqueue(new k(e, this))
                }, p.prototype.fail = function(e) {
                    var t = "undefined" == typeof e ? this.context : e;
                    this.resolved && this.handler.join().fail(t)
                }, p.prototype._report = function(e) {
                    this.resolved && this.handler.join()._report(e)
                }, p.prototype._unreport = function() {
                    this.resolved && this.handler.join()._unreport()
                }, N(u, m), m.prototype.when = function(e) {
                    U.enqueue(new x(e, this))
                }, m.prototype._report = function(e) {
                    this.join()._report(e)
                }, m.prototype._unreport = function() {
                    this.join()._unreport()
                }, N(p, h), N(u, g), g.prototype._state = 1, g.prototype.fold = function(e, t, n, o) {
                    T(e, t, this, n, o)
                }, g.prototype.when = function(e) {
                    L(e.fulfilled, this, e.receiver, e.resolver)
                };
                var D = 0;
                N(u, v), v.prototype._state = -1, v.prototype.fold = function(e, t, n, o) {
                    o.become(this)
                }, v.prototype.when = function(e) {
                    "function" == typeof e.rejected && this._unreport(), L(e.rejected, this, e.receiver, e.resolver)
                }, v.prototype._report = function(e) {
                    U.afterQueue(new w(this, e))
                }, v.prototype._unreport = function() {
                    this.handled = !0, U.afterQueue(new y(this))
                }, v.prototype.fail = function(e) {
                    t.onFatalRejection(this, void 0 === e ? this.context : e)
                }, w.prototype.run = function() {
                    this.rejection.handled || (this.rejection.reported = !0, t.onPotentiallyUnhandledRejection(this.rejection, this.context))
                }, y.prototype.run = function() {
                    this.rejection.reported && t.onPotentiallyUnhandledRejectionHandled(this.rejection)
                }, t.createContext = t.enterContext = t.exitContext = t.onPotentiallyUnhandledRejection = t.onPotentiallyUnhandledRejectionHandled = t.onFatalRejection = P;
                var H = new u, R = new t(u, H);
                return x.prototype.run = function() {
                    this.handler.join().when(this.continuation)
                }, k.prototype.run = function() {
                    var e = this.handler.consumers;
                    if (void 0 !== e)
                        for (var t, n = 0; n < e.length; ++n)
                            t = e[n], E(t.progress, this.value, this.handler, t.receiver, t.resolver)
                }, S.prototype.run = function() {
                    function e(e) {
                        o.resolve(e)
                    }
                    function t(e) {
                        o.reject(e)
                    }
                    function n(e) {
                        o.notify(e)
                    }
                    var o = this.resolver;
                    C(this._then, this.thenable, e, t, n)
                }, t
            }
        })
    }("function" == typeof define && define.amd ? define : function(e) {
        n.exports = e()
    })
}), define("when/3.4.4/lib/Scheduler", [], function(e, t, n) {
    !function(e) {
        "use strict";
        e(function(e) {
            function t(e) {
                this._async = e, this._queue = new o(15), this._afterQueue = new o(5), this._running = !1;
                var t = this;
                this.drain = function() {
                    t._drain()
                }
            }
            function n(e) {
                for (; e.length > 0; )
                    e.shift().run()
            }
            var o = e("when/3.4.4/lib/Queue");
            return t.prototype.enqueue = function(e) {
                this._add(this._queue, e)
            }, t.prototype.afterQueue = function(e) {
                this._add(this._afterQueue, e)
            }, t.prototype._drain = function() {
                n(this._queue), this._running = !1, n(this._afterQueue)
            }, t.prototype._add = function(e, t) {
                e.push(t), this._running || (this._running = !0, this._async(this.drain))
            }, t
        })
    }("function" == typeof define && define.amd ? define : function(t) {
        n.exports = t(e)
    })
}), define("when/3.4.4/lib/Queue", [], function(e, t, n) {
    !function(e) {
        "use strict";
        e(function() {
            function e(e) {
                this.head = this.tail = this.length = 0, this.buffer = new Array(1 << e)
            }
            return e.prototype.push = function(e) {
                return this.length === this.buffer.length && this._ensureCapacity(2 * this.length), this.buffer[this.tail] = e, this.tail = this.tail + 1 & this.buffer.length - 1, ++this.length, this.length
            }, e.prototype.shift = function() {
                var e = this.buffer[this.head];
                return this.buffer[this.head] = void 0, this.head = this.head + 1 & this.buffer.length - 1, --this.length, e
            }, e.prototype._ensureCapacity = function(e) {
                var t, n = this.head, o = this.buffer, a = new Array(e), i = 0;
                if (0 === n)
                    for (t = this.length; t > i; ++i)
                        a[i] = o[i];
                else {
                    for (e = o.length, t = this.tail; e > n; ++i, ++n)
                        a[i] = o[n];
                    for (n = 0; t > n; ++i, ++n)
                        a[i] = o[n]
                }
                this.buffer = a, this.head = 0, this.tail = this.length
            }, e
        })
    }("function" == typeof define && define.amd ? define : function(e) {
        n.exports = e()
    })
}), define("when/3.4.4/lib/async", [], function(e, t, n) {
    !function(e) {
        "use strict";
        e(function(e) {
            var t, n;
            return t = "undefined" != typeof process && null !== process && "function" == typeof process.nextTick ? function(e) {
                process.nextTick(e)
            } : (n = "function" == typeof MutationObserver && MutationObserver || "function" == typeof WebKitMutationObserver && WebKitMutationObserver) ? function(e, t) {
                function n() {
                    var e = o;
                    o = void 0, e()
                }
                var o, a = e.createElement("div"), i = new t(n);
                return i.observe(a, {attributes: !0}), function(e) {
                    o = e, a.setAttribute("class", "x")
                }
            }(document, n) : function(e) {
                try {
                    return e("vertx").runOnLoop || e("vertx").runOnContext
                } catch (t) {
                }
                var n = setTimeout;
                return function(e) {
                    n(e, 0)
                }
            }(e)
        })
    }("function" == typeof define && define.amd ? define : function(t) {
        n.exports = t(e)
    })
}), define("portal/1.0.0/src/tff/tff.core.jump", [], function(e, t) {
    !function() {
        var n = null;
        n = "function" == typeof e ? e("portal/1.0.0/src/tff/tff.core.hash") : "object" == typeof seajs ? seajs.require("./tff.core.hash") : window.tff.core.hash;
        var o = 0, a = [], i = 0, r = ["ch"], s = !1, c = function(e) {
            if (e.state && a.length > 0) {
                var t = e.state.timeStamp;
                o = 0, s = !1;
                for (var n = 0; n < a.length; n++)
                    if (a[n].timeStamp === t) {
                        o = a[n].scrollY, s = !0;
                        break
                    }
            } else
                o = 0, s = !1
        }, d = function(e) {
            var t = {hashString: "",mergeParams: [],useReplaceVerb: !1,forceScrollY: 0,beforeJump: null};
            for (var o in e)
                e.hasOwnProperty(o) && (t[o] = e[o]);
            t.hashString = t.hashString.replace("#", "");
            var s = n.buildObj(t.hashString), c = n.getHashObj(), d = n.getRequestObj();
            for (var o in s)
                if (c.hasOwnProperty(o)) {
                    for (var l = 0; l < t.mergeParams.length; l++)
                        if (t.mergeParams[l].toString() == o) {
                            s[o] = c[o];
                            break
                        }
                    for (var l = 0; l < r.length; l++)
                        if (r[l].toString() == o) {
                            s[o] = c[o];
                            break
                        }
                }
            var u = Date.now();
            a.push({timeStamp: u,jumpIndex: i,scrollY: t.forceScrollY ? t.forceScrollY : window.scrollY});
            var f = d.ch || c.ch;
            f && !s.ch && (s.ch = f), t.hashString = n.buildHashString(s), t.beforeJump && t.beforeJump(t), i += 1;
            var p = {timeStamp: u,jumpIndex: i,to: t.hashString,action: t.useReplaceVerb ? t.useReplaceVerb : "forward",scrollY: t.forceScrollY ? t.forceScrollY : window.scrollY,circleJump: !1};
            history.replaceState && history.replaceState(p, ""), t.useReplaceVerb ? location.replace(t.hashString) : location.hash = t.hashString
        }, l = function(e) {
            location.href = decodeURIComponent(e)
        };
        window.addEventListener("popstate", c, !1), n && n.addBeforeHashChangeEventHandler(function(e) {
            e.scrollY = o, e.isHistoryBack = s
        });
        var u = {jumpIndex: 0,to: location.hash,action: "forward",scrollY: 0,circleJump: !1};
        history.replaceState && history.replaceState(u, "", location.hash), "function" == typeof define ? (t.jumpToUrl = l, t.jumpToPage = d) : (window.tff = window.tff || {}, window.tff.core = window.tff.core || {}, window.tff.core.jump = {}, window.tff.core.jump.jumpToUrl = l, window.tff.core.jump.jumpToPage = d)
    }()
}), define("portal/1.0.0/src/plugin/template", [], function(e, t, n) {
    !function(e) {
        var o = function(e, t) {
            return "string" == typeof t ? i(t, {cache: !0,filename: e}) : a(e, t)
        };
        o.version = "3.0.0", o.render = function(e, t) {
            return i(e, t)
        };
        var a = o.renderFile = function(e, t) {
            var n = o.get(e) || m({filename: e,name: "Render Error",message: "Template not found"});
            return n(t)
        }, i = o.compile = function(e, t) {
            function n(n) {
                try {
                    return new d(n, c) + ""
                } catch (o) {
                    return t.debug ? m(o)() : (t.debug = !0, i(e, t)(n))
                }
            }
            var a = o.defaults;
            t = t || {};
            for (var s in a)
                void 0 === t[s] && (t[s] = a[s]);
            var c = t.filename;
            try {
                var d = S(e, t)
            } catch (l) {
                return l.filename = c || "anonymous", l.name = "Syntax Error", m(l)
            }
            return n.prototype = d.prototype, n.toString = function() {
                return d.toString()
            }, c && t.cache && (r[c] = n), n
        }, r = o.cache = {};
        o.defaults = {openTag: "<%",closeTag: "%>",escape: !0,cache: !0,compress: !1,parser: null}, o.config = function(e, t) {
            o.defaults[e] = t
        };
        var s = function(e, t) {
            return "string" != typeof e && (t = typeof e, "number" === t ? e += "" : e = "function" === t ? s(e.call(e)) : ""), e
        }, c = {"<": "&#60;",">": "&#62;",'"': "&#34;","'": "&#39;","&": "&#38;"}, d = function(e) {
            return c[e]
        }, l = function(e) {
            return s(e).replace(/&(?![\w#]+;)|[<>"']/g, d)
        }, u = Array.isArray || function(e) {
            return "[object Array]" === {}.toString.call(e)
        }, f = function(e, t) {
            var n, o;
            if (u(e))
                for (n = 0, o = e.length; o > n; n++)
                    t.call(e, e[n], n, e);
            else
                for (n in e)
                    t.call(e, e[n], n)
        }, p = o.helpers = {$include: a,$string: s,$escape: l,$each: f};
        o.helper = function(e, t) {
            p[e] = t
        }, o.onerror = function(t) {
            var n = "Template Error\n\n";
            for (var o in t)
                n += "<" + o + ">\n" + t[o] + "\n\n";
            e.console && console.error(n)
        }, o.get = function(e) {
            var t;
            if (r.hasOwnProperty(e))
                t = r[e];
            else {
                var n = o.readTemplate(e);
                "string" == typeof n && (t = i(n, {filename: e}))
            }
            return t
        }, o.readTemplate = function(t) {
            if ("document" in e) {
                var n = document.getElementById(t);
                if (n)
                    return (n.value || n.innerHTML).replace(/^\s*|\s*$/g, "")
            }
        };
        var m = function(e) {
            return o.onerror(e), function() {
                return "{Template Error}"
            }
        }, h = p.$each, g = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined", v = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|[\s\t\n]*\.[\s\t\n]*[$\w\.]+/g, w = /[^\w$]+/g, y = new RegExp(["\\b" + g.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"), b = /^\d[^,]*|,\d[^,]*/g, x = /^,+|,+$/g, k = function(e) {
            return e.replace(v, "").replace(w, ",").replace(y, "").replace(b, "").replace(x, "").split(/^$|,+/)
        }, S = function(e, t) {
            function n(e) {
                return u += e.split(/\n/).length - 1, d && (e = e.replace(/[\n\r\t\s]+/g, " ").replace(/<!--.*?-->/g, "")), e && (e = v[1] + a(e) + v[2] + "\n"), e
            }
            function o(e) {
                var t = u;
                if (c ? e = c(e) : i && (e = e.replace(/\n/g, function() {
                    return u++, "$line=" + u + ";"
                })), 0 === e.indexOf("=")) {
                    var n = !/^=[=#]/.test(e);
                    if (e = e.replace(/^=[=#]?|[\s;]*$/g, ""), n && l) {
                        var o = e.replace(/\s*\([^\)]+\)/, "");
                        p.hasOwnProperty(o) || /^(include|print)$/.test(o) || (e = "$escape(" + e + ")")
                    } else
                        e = "$string(" + e + ")";
                    e = v[1] + e + v[2]
                }
                return i && (e = "$line=" + t + ";" + e), h(k(e), function(e) {
                    if (e && !f.hasOwnProperty(e)) {
                        var t;
                        "print" === e ? t = y : "include" === e ? (m.$include = p.$include, t = b) : (t = "$data." + e, p.hasOwnProperty(e) && (m[e] = p[e], t = 0 === e.indexOf("$") ? "$helpers." + e : t + "===undefined?$helpers." + e + ":" + t)), x += e + "=" + t + ",", f[e] = !0
                    }
                }), e + "\n"
            }
            function a(e) {
                return "'" + e.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'"
            }
            var i = t.debug, r = t.openTag, s = t.closeTag, c = t.parser, d = t.compress, l = t.escape, u = 1, f = {$data: 1,$filename: 1,$helpers: 1,$out: 1,$line: 1}, m = {}, g = "".trim, v = g ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"], w = g ? "$out+=text;return $out;" : "$out.push(text);", y = "function(){var text=''.concat.apply('',arguments);" + w + "}", b = "function(filename,data){data=data||$data;var text=$helpers.$include(filename,data,$filename);" + w + "}", x = "'use strict';var $helpers=this," + (i ? "$line=0," : ""), S = v[0], C = "return new String(" + v[3] + ");";
            h(e.split(r), function(e) {
                e = e.split(s);
                var t = e[0], a = e[1];
                1 === e.length ? S += n(t) : (S += o(t), a && (S += n(a)))
            });
            var $ = x + S + C;
            i && ($ = "try{" + $ + "}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:" + a(e) + ".split(/\\n/)[$line-1].replace(/^[\\s\\t]+/,'')};}");
            try {
                var j = new Function("$data", "$filename", $);
                return j.prototype = m, j
            } catch (L) {
                throw L.temp = "function anonymous($data,$filename) {" + $ + "}", L
            }
        };
        "function" == typeof define ? n.exports = o : "undefined" != typeof t ? n.exports = o : e.template = o
    }(this.window || global)
}), define("portal/1.0.0/src/com/backToTop", [], function(e, t) {
    !function() {
        var n = e("zepto/1.1.3/index"), o = "#back-top", a = n(o), i = '<a class="btn-back-top hidden" id="back-top"></a>', r = function() {
            try {
                window.scrollY > window.innerHeight ? (null == a && (a = n(o)), a.removeClass("hidden")) : (null == a && (a = n(o)), a.addClass("hidden"))
            } catch (e) {
                n.jsRuntimeError(e, "检查显示回到顶部按钮异常")
            }
        };
        t.createBackToTop = function() {
            try {
                var e = n(o);
                if (!e)
                    return document.body.appendHTML(i), void arguments.callee();
                e.tapped !== !0 && (e.on("click", function() {
                    window.scrollTo(0, 0)
                }), window.addEventListener("scroll", r), window.addEventListener("hashchange", function() {
                    setTimeout(function() {
                        r()
                    }, 400)
                }), e.tapped = !0)
            } catch (t) {
                n.jsRuntimeError(t, "创建回到顶部按钮异常")
            }
        }
    }()
}), define("portal/1.0.0/src/com/report", [], function(e, t) {
    !function() {
        var n = e("portal/1.0.0/src/tff/tff.data"), o = e("portal/1.0.0/src/plugin/plugin.browserInterface"), a = function(e, t) {
            var n = e.match(new RegExp("[?&#]" + t + "=([^&]+)", "i"));
            return null == n || n.length < 1 ? "" : n[1]
        }, i = 0;
        o.getLoginInfo(function(e) {
            e && (i = e.uin || 0)
        });
        var r = a(location.search, "ch");
        t.report = function(e, t, o, a) {
            var s = {};
            switch (s.uin = i, s.pagetype = "web", s.externalchannel = r, s.actiontype = e, s.frontoperation = o && a ? o + "-" + a : o || "", s.contentid = encodeURIComponent(t), e) {
                case "viewpage":
                    s.fromurl = encodeURIComponent(window.location.hash), s.currenturl = encodeURIComponent(t);
                    break;
                case "click-download":
                    s.fromurl = s.currenturl = encodeURIComponent(window.location.hash);
                    break;
                case "search":
                    s.fromurl = s.currenturl = encodeURIComponent(window.location.hash)
            }
            n.invokeAjaxCmd("reportUserAction", s, {dataType: "text"})
        }, t.addReportParams = function(e, t, n) {
            if (!e)
                return "";
            var o, a = encodeURIComponent(window.location.hash);
            return o = t && n ? t + "-" + n : t || "", e += e.indexOf("?") > -1 ? "&" : "?", e += "uin=" + i + "&pagetype=web&ch=" + r + "&frontoperation=" + o + "&fromurl=" + a + "&currenturl=" + a
        }
    }()
}), define("portal/1.0.0/src/plugin/plugin.browserInterface", [], function(require, exports, module) {
    !function() {
        function getUA() {
            var info = x5.android.getBrowserParam && x5.android.getBrowserParam();
            if (info) {
                info = eval("(" + info + ")");
                var qua = info.qua + "";
                if (qua = qua.match(/([0-9\.]+)/gi, ""), qua && qua.length > 0)
                    return qua[0]
            }
            try {
                var ua = navigator.userAgent, reg = /MQQBrowser\/(\d{2})/, regRemoveDot = /\./g;
                ua = ua.replace(regRemoveDot, "");
                var res = reg.exec(ua);
                return res && res.length > 1 ? res[1] : void 0
            } catch (e) {
                return void 0
            }
        }
        function FullScreenSuccBack() {
        }
        function FullScreenErrorBack() {
        }
        var ua = navigator.userAgent, isAndroid = /android/gi.test(ua) && /mqq/gi.test(ua);
        "undefined" != typeof mtt && (isAndroid = !0);
        var isIos = /iphone|ipod/gi.test(ua) && /mqq/gi.test(ua), x5 = {commandQueue: [],commandQueueFlushing: !1,resources: {base: !0}};
        x5.callbackId = 0, x5.callbacks = {}, x5.callbackStatus = {NO_RESULT: 0,OK: 1,CLASS_NOT_FOUND_EXCEPTION: 2,ILLEGAL_ACCESS_EXCEPTION: 3,INSTANTIATION_EXCEPTION: 4,MALFORMED_URL_EXCEPTION: 5,IO_EXCEPTION: 6,INVALID_ACTION: 7,JSON_EXCEPTION: 8,ERROR: 9}, x5.createBridge = function() {
            var e = document.createElement("iframe");
            return e.setAttribute("style", "display:none;"), e.setAttribute("height", "0px"), e.setAttribute("width", "0px"), e.setAttribute("frameborder", "0"), document.documentElement.appendChild(e), e
        }, x5.exec = function(e, t, n, o, a) {
            var i = null, r = {className: n,methodName: o,options: {},arguments: []};
            (e || t) && (i = n + x5.callbackId++, x5.callbacks[i] = {success: e,fail: t}), null != i && r.arguments.push(i);
            for (var s = 0; s < a.length; ++s) {
                var c = a[s];
                void 0 != c && null != c && ("object" == typeof c ? r.options = c : r.arguments.push(c))
            }
            x5.commandQueue.push(JSON.stringify(r)), 1 != x5.commandQueue.length || x5.commandQueueFlushing || (x5.bridge || (x5.bridge = x5.createBridge()), x5.bridge.src = "mtt:" + n + ":" + o)
        }, x5.getAndClearQueuedCommands = function() {
            var e = JSON.stringify(x5.commandQueue);
            return x5.commandQueue = [], e
        }, x5.callbackSuccess = function(e, t) {
            if (x5.callbacks[e]) {
                if (t.status === x5.callbackStatus.OK)
                    try {
                        x5.callbacks[e].success && x5.callbacks[e].success(t.message)
                    } catch (n) {
                        console.log("Error in success callback: " + e + " = " + n)
                    }
                t.keepCallback || delete x5.callbacks[e]
            }
        }, x5.callbackError = function(e, t) {
            if (x5.callbacks[e]) {
                try {
                    x5.callbacks[e].fail && x5.callbacks[e].fail(t.message)
                } catch (n) {
                    console.log("Error in error callback: " + e + " = " + n)
                }
                t.keepCallback || delete x5.callbacks[e]
            }
        }, x5.ios = x5.ios || {}, x5.ios.installApp = function(e, t, n) {
            x5.exec(t, n, "app", "installApp", [e])
        }, x5.ios.getQUAInfo = function(e, t) {
            x5.exec(e, t, "app", "qua", [])
        }, x5.ios.unInstallApp = function(e, t, n) {
            x5.exec(t, n, "app", "unInstallApp", [e])
        }, x5.ios.checkInstalledApp = function(e, t, n) {
            x5.exec(t, n, "app", "checkInstalledApp", [e])
        }, x5.ios.getInstalledApps = function(e, t) {
            x5.exec(function(t) {
                var n = t.value;
                e && e(n)
            }, t, "app", "getInstalledApps", [])
        }, x5.ios.loadAppUrl = function(e, t, n) {
            x5.exec(t, n, "app", "loadAppUrl", [e])
        }, x5.ios.goBackHome = function(e, t) {
            x5.exec(e, t, "app", "startpage", [])
        }, x5.ios.addCustomQuicklink = function(e, t) {
            x5.exec(e, t, "app", "addCustomQuicklink", [])
        }, x5.ios.share = function(e, t, n) {
            x5.exec(t, n, "app", "shareapp", [e])
        }, x5.ios.showLoginPanel = function(e, t) {
            x5.exec(e, t, "app", "showLoginPanel", [])
        }, x5.ios.getUserInfo = function(e, t) {
            x5.exec(e, t, "login", "getUinAndSidInfo", [])
        }, x5.android = x5.android || {}, x5.android.installApp = function(e, t, n) {
            var o = getUA();
            "undefined" != typeof mtt ? 41 == o ? mtt.asyncInstall(t, n, JSON.stringify(e)) : o >= 42 ? (T5Kit && (T5Kit.asyncInstallSucc = t, T5Kit.asyncInstallError = n), mtt.asyncInstall("" + t, "" + n, JSON.stringify(e))) : mtt.asyncInstall(t, n, JSON.stringify(e)) : n && n()
        }, x5.android.checkInstallApps = function() {
            try {
                var e = "";
                return e = "undefined" != typeof mtt ? mtt.checkInstallApps() : ""
            } catch (t) {
                return ""
            }
        }, x5.android.loadAppUrl = function(e, t, n) {
            var o = getUA(), a = {appid: e.key,url: e.url,position: e.position};
            if ("undefined" != typeof mtt)
                try {
                    mtt.loadAppUrl2 ? (mtt.loadAppUrl2(JSON.stringify(e)), t && t()) : o >= 41 ? (mtt.loadAppUrl(JSON.stringify(a)), t && t()) : a.appid && a.url ? (mtt.loadAppUrl(a.appid, a.url), t && t()) : n && n()
                } catch (i) {
                    n && n()
                }
            else
                n && n()
        }, x5.android.getInstalledApps = function(e, t) {
            try {
                var n = "";
                "undefined" != typeof mtt && (n = mtt.checkInstallApps()), e && e(n)
            } catch (o) {
                t && t()
            }
        }, x5.android.getQUAInfo = function(e) {
            e(qb_bridge.exec(null, null, "qb", "qua", null))
        }, x5.android.checkUpdate = function() {
            var checkUpdate;
            return "undefined" != typeof mtt ? (checkUpdate = mtt.checkUpdate(), checkUpdate = eval("(" + checkUpdate + ")")) : []
        }, x5.android.updateApk = function(e) {
            "undefined" != typeof mtt ? mtt.installApk(JSON.stringify(e), function(e) {
                F.x5Myapp.updateApkMsg(e)
            }) : console.log("x5.updateApk  active")
        }, x5.android.installApk = function(e) {
            "undefined" != typeof mtt ? mtt.installApk(JSON.stringify(e), function(e) {
                F.x5AppList.installAppcb(e)
            }) : console.log("mtt is undefined x5.installApk ")
        }, x5.android.delApk = function(e, t, n) {
            "undefined" != typeof mtt ? mtt.installApk('{"oper":' + e + ',"appId":"' + t + '"}', function(e) {
                n(e)
            }) : console.log("mtt is undefined x5.delApk  active")
        }, x5.android.addCustomQuicklink = function(e, t) {
            "undefined" != typeof mtt && mtt.callBookmarkWindow ? (mtt.callBookmarkWindow(), e && e()) : t && t()
        }, x5.android.callQuickLink = function(e, t) {
            "undefined" != typeof mtt && mtt.callQuickLink ? (mtt.callQuickLink(), e && e()) : t && t()
        }, x5.android.getBookmarkInfo = function() {
            var e = "";
            return "undefined" != typeof mtt ? e = mtt.getBookmarkInfo() : ""
        }, x5.android.getHistoryInfo = function() {
            var e = "";
            return "undefined" != typeof mtt ? e = mtt.getHistoryInfo() : ""
        }, x5.android.getSpecificHistory = function(e, t) {
            var n = "";
            return "undefined" == typeof mtt ? "" : (n = x5mtt.getSpecificHistory(e), void (t && t(n)))
        }, x5.android.getLoginInfo = function(e, t) {
            var n = "", o = {};
            return "undefined" != typeof x5mtt ? (n = x5mtt.getLoginInfo() + "", o = "undefined" == n || "{}" == n ? {} : JSON.parse(n), e && e(o), o) : (o = {}, t && t(o), o)
        }, x5.android.getBrowserParam = function() {
            var e = "";
            if ("undefined" == typeof mtt)
                return "";
            try {
                return mtt.getBrowserParam && (e = mtt.getBrowserParam() + ""), e
            } catch (t) {
                return ""
            }
        }, x5.android.addQuickLink = function(e) {
            var t = -1;
            return "undefined" != typeof mtt ? (t = mtt.addQuickLink(JSON.stringify(e)), 0 == t || 1 == t ? t : -1) : -1
        }, x5.android.share = function(e, t, n) {
            if ("undefined" != typeof x5mtt)
                try {
                    var o = x5mtt.share(e);
                    o >= 0 ? t && t() : n && n()
                } catch (a) {
                    n && n()
                }
            else
                n && n()
        }, x5.android.callLogin = function(e, t) {
            var n = getUA();
            if ("undefined" != typeof mtt)
                if (mtt.callLogin && n >= 42)
                    try {
                        mtt.callLogin("" + function() {
                            e && e()
                        })
                    } catch (o) {
                        t && t()
                    }
                else
                    t && t();
            else
                t && t()
        }, x5.android.getLastHistory = function(e) {
            x5mtt || $.jsRuntimeWarning("X51不存在X5MTT@x5mtt.getLastHistory");
            var t = x5mtt.getLastHistory();
            e && e(t)
        }, x5.android.getHistory = function(e, t) {
            x5mtt || $.jsRuntimeWarning("X51不存在X5MTT@x5mtt.getHistory");
            var n = x5mtt.getHistory(e);
            t && t(n)
        }, x5.android.playLastHistory = function(e) {
            x5mtt || $.jsRuntimeWarning("X51不存在X5MTT@x5mtt.playLastHistory"), x5mtt.playLastHistory(), e && e()
        }, x5.android.doFollowShows = function(e, t) {
            x5mtt || $.jsRuntimeWarning("X51不存在X5MTT@x5mtt.doFollowShows"), x5mtt.doFollowShows(e), t && t()
        }, x5.android.deleteFollowShows = function(e, t) {
            x5mtt || $.jsRuntimeWarning("X51不存在X5MTT@x5mtt.deleteFollowShows"), x5mtt.deleteFollowShows(e), t && t()
        }, x5.android.getFollowShows = function(e, t) {
            x5mtt || $.jsRuntimeWarning("X51不存在X5MTT@x5mtt.getFollowShows");
            var n = x5mtt.getFollowShows(e);
            t && t(n)
        }, x5.android.checkIsFollowsUpdate = function(e) {
            x5mtt || $.jsRuntimeWarning("X51不存在X5MTT@x5mtt.checkIsFollowsUpdate");
            var t = x5mtt.checkIsFollowsUpdate();
            e && e(t)
        }, x5.android.canDownload = function(e, t) {
            x5mtt || $.jsRuntimeWarning("X51不存在X5MTT@x5mtt.canDownload");
            var n = x5mtt.canDownload(e);
            t && t(n)
        }, x5.android.doMultiCache = function(e, t) {
            x5mtt || $.jsRuntimeWarning("X51不存在X5MTT@x5mtt.doMultiCache");
            var n = x5mtt.doMultiCache(e);
            t && t(n)
        }, x5.android.playEpisode = function(e, t) {
            x5mtt || $.jsRuntimeWarning("X51不存在X5MTT@x5mtt.playEpisode");
            var n = x5mtt.playEpisode(e);
            t && t(n)
        }, x5.app = x5.app || {}, x5.app.isNotNeedPush = function() {
            var e = navigator.userAgent.toLocaleLowerCase();
            return -1 == e.indexOf("mqqbrowser") ? !0 : !1
        }, x5.app.doTokenFeature = function(e, t) {
            if ("function" == typeof t) {
                var n = t;
                "function" == typeof n && x5.exec(t, n, "app", "doTokenFeature", [e])
            }
        }, x5.app.tokenFeature = function(e, t, n) {
            try {
                void 0 != window.push ? window.push.doTokenFeature(JSON.stringify({uid: e,feature: t}), n) : x5.app.isNotNeedPush() || x5.app.doTokenFeature({uid: e,feature: t}, n)
            } catch (o) {
            }
        };
        var screenOp = {appname: "热门视频"};
        x5.app.requestPageFullScreen = function() {
            x5.exec(FullScreenSuccBack, FullScreenErrorBack, "common", "requestPageFullScreen", screenOp)
        }, x5.app.cancelPageFullScreen = function() {
            x5.exec(FullScreenSuccBack, FullScreenErrorBack, "common", "cancelPageFullScreen", screenOp)
        }, window.T5Kit = {};
        for (var i in x5)
            T5Kit[i] = x5[i];
        x5.installApp = function(e, t, n) {
            isAndroid || isIos ? isAndroid ? x5.android.installApp(e, t, n) : x5.ios.installApp(e, t, n) : n && n()
        }, x5.getQUAInfo = function(e, t) {
            isAndroid || isIos ? isAndroid ? x5.android.getQUAInfo(e, t) : x5.ios.getQUAInfo(e, t) : t && t()
        }, x5.loadAppUrl = function(e, t, n) {
            isAndroid || isIos ? isAndroid ? x5.android.loadAppUrl(e, t, n) : x5.ios.loadAppUrl(e, t, n) : n && n()
        }, x5.getInstalledApps = function(e, t) {
            var n = [], o = void 0;
            isAndroid || isIos ? (o = isAndroid ? x5.android : x5.ios, o.getInstalledApps(function(t) {
                "" != t && (n = t.split("|")), e && e(n)
            }, t)) : t && t()
        }, x5.goBackHome = function(e, t) {
            isIos || isAndroid ? isIos ? x5.ios.goBackHome(e, t) : x5.android.callQuickLink(e, t) : t && t()
        }, x5.share = function(e, t, n) {
            var o = getUA();
            isAndroid || isIos ? isAndroid ? o >= 50 ? x5.android.shareQb(e, t, n) : x5.android.share(e, t, n) : x5.ios.share(e, t, n) : n && n()
        }, x5.showLoginPanel = function(e, t) {
            isIos || isAndroid ? isIos ? x5.ios.showLoginPanel(e, t) : x5.android.callLogin(e, t) : t && t()
        }, x5.addCustomQuicklink = function(e, t) {
            isIos || isAndroid ? isIos ? x5.ios.addCustomQuicklink(e, t) : x5.android.addCustomQuicklink(e, t) : t && t()
        }, x5.getLoginInfo = function(e, t) {
            return isIos || isAndroid ? void (isIos ? x5.ios.getUserInfo(e, t) : x5.android.getLoginInfo(e, t)) : (t && t(), "")
        }, x5.getLastHistory = function(e) {
            isIos || isAndroid ? isIos ? x5.ios.getLastHistory(e) : x5.android.getLastHistory(e) : e && e("")
        }, x5.getHistory = function(e, t) {
            isIos || isAndroid ? isIos ? x5.ios.getHistory(e, t) : x5.android.getHistory(e, t) : t && t(JSON.stringify({history: [],total: -1}))
        }, x5.getSpecificHistory = function(e, t) {
            if (isIos || isAndroid)
                if (isIos)
                    x5.ios.getSpecificHistory(e, t);
                else {
                    var n = JSON.parse(e).videoId.toString();
                    x5.android.getSpecificHistory(n, t)
                }
            else
                t && t(JSON.stringify({title: "",totalcount: 0,currentsubid: 0,totaltime: 0,playtime: 0,src: 0}))
        }, x5.playLastHistory = function(e) {
            isIos || isAndroid ? isIos ? x5.ios.playLastHistory(e) : x5.android.playLastHistory(e) : e && e("")
        }, x5.doFollowShows = function(e, t) {
            isIos || isAndroid ? isIos ? x5.ios.doFollowShows(e, t) : x5.android.doFollowShows(e, t) : t && t("")
        }, x5.deleteFollowShows = function(e, t) {
            isIos || isAndroid ? isIos ? x5.ios.deleteFollowShows(e, t) : x5.android.deleteFollowShows(e, t) : t && t("")
        }, x5.getFollowShows = function(e, t) {
            isIos || isAndroid ? isIos ? x5.ios.getFollowShows(e, t) : x5.android.getFollowShows(e, t) : t && t(!1)
        }, x5.checkIsFollowsUpdate = function(e) {
            isIos || isAndroid ? isIos ? x5.ios.checkIsFollowsUpdate(e) : x5.android.checkIsFollowsUpdate(e) : e && e(!0)
        }, x5.canDownload = function(e, t) {
            isIos || isAndroid ? isIos ? x5.ios.canDownload(e, t) : x5.android.canDownload(e, t) : t && t('{"host":[]}')
        }, x5.doMultiCache = function(e) {
            (isIos || isAndroid) && (isIos ? x5.ios.doMultiCache(e) : x5.android.doMultiCache(e))
        }, x5.playEpisode = function(e, t, n) {
            (isIos || isAndroid) && (isIos ? x5.ios.playEpisode(e, t, n) : x5.android.playEpisode(e, t, n))
        }, x5.getQQBrowerVer = getUA, "function" == typeof define ? module.exports = x5 : window.x5 = x5
    }()
}), define("portal/1.0.0/src/plugin/heatmap", [], function(e, t, n) {
    function o() {
        var e = /p=([^&#]+)/gi, t = /g=([^&#]+)/gi, n = /s=([^&#]+)/gi, o = location.hash, a = e.exec(o), i = t.exec(o), r = n.exec(o), s = "";
        return a && a.length > 1 && (s += "p=" + a[1]), i && i.length > 1 && (s += "_g=" + i[1], "rank" == i[1] && (s += r && r.length > 1 ? "_s=" + r[1] : "_s=download")), s
    }
    function a() {
        var e = document.createElement("script");
        e.src = s, e.onload = i, document.getElementsByTagName("head")[0].appendChild(e)
    }
    function i() {
        window.HeatmapReport && HeatmapReport.init({url: c,businessName: r,onProcessUrl: o})
    }
    var r = "gameportal", s = "http://res.imtt.qq.com/browser_lightapp/heatmap/heatmapReport.min.js", c = "http://statistics.html5.qq.com/click";
    n.exports = {start: a}
}), define("portal/1.0.0/src/page/index", [], function(e, t, n) {
    !function() {
        var t, o = e("zepto/1.1.3/index"), a = e("portal/1.0.0/src/tff/tff.data"), i = e("portal/1.0.0/src/tff/tff.core.jump"), r = e("portal/1.0.0/src/tff/tff.core.hash"), s = e("portal/1.0.0/src/com/report"), c = e("portal/1.0.0/src/com/SoftManage"), d = e("portal/1.0.0/src/com/LoadBar"), l = e("when/3.4.4/when"), u = e("portal/1.0.0/src/plugin/slideup"), f = e("portal/1.0.0/src/plugin/template"), p = e("portal/1.0.0/src/plugin/swipe"), m = e("portal/1.0.0/src/com/push"), h = (e("portal/1.0.0/src/com/user"), f.compile(e("portal/1.0.0/src/tpl/soft-list.tpl"))), g = f.compile(e("portal/1.0.0/src/tpl/banner.tpl")), v = f.compile(e("portal/1.0.0/src/tpl/hot-games-redpoint.tpl")), w = f.compile(e("portal/1.0.0/src/tpl/hot-games.tpl")), y = f.compile(e("portal/1.0.0/src/tpl/ads.tpl")), b = f.compile(e("portal/1.0.0/src/tpl/new-games.tpl")), x = f.compile(e("portal/1.0.0/src/tpl/tencent-games.tpl")), k = f.compile(e("portal/1.0.0/src/tpl/download-rank.tpl")), S = f.compile(e("portal/1.0.0/src/tpl/recommend-special.tpl")), C = f.compile(e("portal/1.0.0/src/tpl/recommend-category.tpl")), $ = f.compile(e("portal/1.0.0/src/tpl/category-list.tpl")), j = f.compile(e("portal/1.0.0/src/tpl/recommend-gifts.tpl")), L = {}, T = {}, E = {}, I = 0, A = function(e, t) {
            e.on("click", function() {
                i.jumpToPage({hashString: t})
            })
        }, B = function(e) {
            console.log(e), o("#index .mod-recommend").removeClass("hidden"), o(".mod-loading").addClass("hidden"), o("#index .mod-recommend").html(f("tplTipsError")), o("#index .tip-error span").on("click", function() {
                z()
            })
        }, N = function(e, t) {
            var n = r.getHashObj().s || "download";
            T[n] = e.nextPage || ++E[n], L[n] = e.hasMore || e.totalPage >= E[n];
            for (var a = e.data, i = 0, s = a.length; s > i; i++)
                a[i].fileSize = o.formatSize(a[i].fileSize), a[i].score = o.formatScore(a[i].score), a[i].downloadUrl = "dl?ref=l" + (r.getHashObj().s || "dl") + "&packageName=" + a[i].packageName;
            c.addSofts(a, t)
        }, P = function(e, t, n) {
            for (var a = e.data, i = 0, r = a.length; r > i; i++)
                a[i].downloadCount = o.formatCount(a[i].downloadCount), a[i].fileSize = o.formatSize(a[i].fileSize), a[i].downloadUrl = "dl?ref=h" + t + "&packageName=" + a[i].packageName;
            c.addSofts(a, n)
        }, U = window.localStorage, O = function(e) {
            for (var n, o = 0; o < e.data.length; o++)
                "1" == e.data[o].redpoint && (U.getItem("redPointPackage") != e.data[o].packageName && U.removeItem("redPoint" + U.getItem("redPointPackage")), n = e.data[o].packageName, U.setItem("redPointPackage", n), t = U.getItem("redPoint" + e.data[o].packageName), null == t || "undefined" == t ? U.setItem("redPoint" + e.data[o].packageName, "false") : "false" == t && U.setItem("redPoint" + e.data[o].packageName, "true"), t = U.getItem("redPoint" + e.data[o].packageName))
        }, _ = function(e) {
            var t;
            t = U.getItem("_redPointFlag"), "true" != t ? (U.setItem("_redPointFlag", "true"), t = U.getItem("_redPointFlag")) : O(e)
        }, D = function() {
            var e = H() + "", t = "redPoint";
            window.browser && window.browser.app && window.browser.app.doTokenFeature && window.browser.app.doTokenFeature(R, {uid: e,feature: t})
        }, H = function() {
            var e = "uid";
            return e
        }, R = function() {
            var e = "http://game.html5.qq.com/";
            -1 != window.location.href.indexOf(e)
        }, q = function(e) {
            for (var n = 0; n < e.length; n++)
                if (e[n].t != I || 0 != e[n].code)
                    return void console.log("ajax response meta mismatch!");
            o(".mod-recommend").html(""), function(e) {
                o(".mod-recommend").append(g(e)), o(".mod-recommend .mod-banner .mod-slidshow a").on("tap", function() {
                    var e = o(this).data("url");
                    i.jumpToUrl(e, "hban", o(this).data("index"))
                });
                var t = new p(document.getElementById("slider"), {startSlide: 0,speed: 400,auto: 5e3,continuous: !0,disableScroll: !0,stopPropagation: !1,callback: function(e) {
                        o(".mod-indicator >a").removeClass("active").eq(e).addClass("active")
                    },transitionEnd: function(e) {
                        e > t.getNumSlides() - 1 && t.slide(0, 1e3)
                    }})
                console.log(t)
            }(e[0]), function(e) {
                P(e, "hot", function() {
                    _(e), null == t || "undefined" == t || "true" != t ? (o(".mod-recommend").append(v(e)), O(e)) : o(".mod-recommend").append(w(e)), o(".mod-recommend .mod-hot-games .mod-software-list li .icon-frame").on("click", function() {
                        i.jumpToPage({hashString: "p=detail&package=" + o(this).parent().parent().data("package")}, "hhot", o(this).parent().parent().data("index"))
                    }), o(".mod-recommend .mod-hot-games .btn-more").on("click", function(e) {
                        e.preventDefault(), i.jumpToPage({hashString: "#p=index&g=rank&s=download"}, "hhot")
                    }), o(".mod-recommend .mod-hot-games .btn-download").on("click", function() {
                        var e = {}, t = o(this).parent().parent(), n = t.data("index"), a = t.data("url");
                        e.packageName = t.data("package"), e.versionCode = t.data("version"), s.report("click-download", e.packageName, "hhot", n), e.downloadUrl = s.addReportParams(a, "hhot", n), c.operSoft(e, this)
                    })
                })
            }(e[1]), function(e) {
                o(".mod-recommend").append(j(e)), o(".mod-recommend .mod-recommend-gifts .mod-software-list li .icon-frame").on("click", function() {
                    i.jumpToPage({hashString: "p=singlegifts&package=" + o(this).parent().parent().data("package")}, "recommend", o(this).parent().parent().data("index"))
                }), o(".mod-recommend .mod-recommend-gifts .btn-more").on("click", function(e) {
                    e.preventDefault(), i.jumpToPage({hashString: "p=getgifts"}, "hrecommend")
                })
            }(e[2]), function(e) {
                o(".mod-recommend").append(y(e)), o(".mod-recommend .mod-pic-show a").on("click", function() {
                    var e = o(this).data("url");
                    i.jumpToUrl(e, "hads", o(this).data("index"))
                })
            }(e[3]), function(e) {
                P(e, "new", function() {
                    o(".mod-recommend").append(b(e)), o(".mod-recommend .mod-new-games .mod-software-list li .icon-frame").on("click", function() {
                        i.jumpToPage({hashString: "p=detail&package=" + o(this).parent().parent().data("package")}, "hnew", o(this).parent().parent().data("index"))
                    }), o(".mod-recommend .mod-new-games .btn-more").on("click", function(e) {
                        e.preventDefault(), i.jumpToPage({hashString: "#p=index&g=rank&s=new"}, "hnew")
                    }), o(".mod-recommend .mod-new-games .btn-download").on("click", function() {
                        var e = {}, t = o(this).parent().parent(), n = t.data("index"), a = t.data("url");
                        e.packageName = t.data("package"), e.versionCode = t.data("version"), s.report("click-download", e.packageName, "hnew", n), e.downloadUrl = s.addReportParams(a, "hnew", n), c.operSoft(e, this)
                    })
                })
            }(e[4]), function(e) {
                P(e, "tencent", function() {
                    o(".mod-recommend").append(x(e)), o(".mod-recommend .mod-tencent-games .mod-software-list li .icon-frame").on("click", function() {
                        i.jumpToPage({hashString: "p=detail&package=" + o(this).parent().parent().data("package")}, "htencent", o(this).parent().parent().data("index"))
                    }), o(".mod-recommend .mod-tencent-games .btn-download").on("click", function() {
                        var e = {}, t = o(this).parent().parent(), n = t.data("index"), a = t.data("url");
                        e.packageName = t.data("package"), e.versionCode = t.data("version"), s.report("click-download", e.packageName, "htencent", n), e.downloadUrl = s.addReportParams(a, "htencent", n), c.operSoft(e, this)
                    })
                })
            }(e[5]), function(e) {
                P(e, "dl", function() {
                    o(".mod-recommend").append(k(e));
                    var t = o(".mod-recommend .mod-download-rank .mod-ranking-list li");
                    t.length > 0 && (t[0].className = "active"), t.on("click", function(e) {
                        "A" != e.target.nodeName && i.jumpToPage({hashString: "p=detail&package=" + o(this).data("package")}, "hdl", o(this).data("index"))
                    }), o(".mod-recommend .mod-download-rank .btn-more").on("click", function() {
                        i.jumpToPage({hashString: "#p=index&g=rank&s=download"}, "hdl")
                    }), o(".mod-recommend .mod-download-rank .btn-download").on("click", function() {
                        var e = {}, t = o(this).parent().parent(), n = t.data("index"), a = t.data("url");
                        e.packageName = t.data("package"), e.version = t.data("version"), s.report("click-download", e.packageName, "hdl", n), e.downloadUrl = s.addReportParams(a, "hdl", n), c.operSoft(e, this)
                    })
                })
            }(e[6]), function(e) {
                o(".mod-recommend").append(S(e)), o(".mod-topic .btn-more").on("click", function(e) {
                    e.preventDefault(), i.jumpToPage({hashString: "p=special"}, "hspec")
                }), o(".mod-recommend .mod-topic .mod-topic-list li").on("click", function() {
                    var e = o(this).data("url"), t = o(this).data("index");
                    s.report("viewpage", e, "hspec", t), setTimeout(function() {
                        window.location = e
                    }, 100)
                })
            }(e[7]), function() {
                o(".mod-recommend").append(C()), o(".mod-recommend .mod-recommend-category .mod-software-list li").on("click", function() {
                    var e = encodeURIComponent(this.querySelector("h3").innerHTML);
                    i.jumpToPage({hashString: "p=category&category=" + o(this).data("id") + "&name=" + e}, "hcat", o(this).data("index"))
                }), o("#index .mod-recommend-category .btn-more").on("click", function(e) {
                    e.preventDefault(), i.jumpToPage({hashString: "p=index&g=category"}, "hcat")
                })
            }(), o(".mod-recommend").append('<footer class="mod-footer">' + f("tplCopyRight") + "</footer>")
        }, M = function() {
            var e = {}, t = [];
            return e.t = I = Date.now(), t[0] = a.invokeAjaxCmd("getBannerList", e), e.s = "hot", t[1] = a.invokeAjaxCmd("getRecommendGames", e), e.c = "recommend", t[2] = a.invokeAjaxCmd("gift-bag", e), t[3] = a.invokeAjaxCmd("getAdsList", e), e.s = "new", t[4] = a.invokeAjaxCmd("getRecommendGames", e), t[5] = a.invokeAjaxCmd("getHomeTx", e), e.s = "download", t[6] = a.invokeAjaxCmd("getRecommendGames", e), t[7] = a.invokeAjaxCmd("getRecommendSpecial", e), l.all(t)
        }, F = function() {
            var e = l.defer(), t = r.getHashObj(), n = t.s || "download", d = {}, u = "";
            return "new" == n ? u = "lnew" : "download" == n && (u = "ldl"), d.t = I = Date.now(), d.sort = n, T[n] && (d.reqPage = T[n]), a.invokeAjaxCmd("getSoftList", d).then(function(t) {
                return t.t != I ? void console.log("timestamp mismatch!") : 0 != t.code ? (console.log(t.msg), void Q[n].updateLoadBar("error")) : (Q[n].resetSlide(), void N(t, function() {
                    t.currentPage = T[n] - 1, o("#index .mod-app-container ." + n).append(h(t)), o("#index .mod-app-list > li").on("click", function(e) {
                        var t = o(this).data("package"), a = "p=detail&ref=" + u + "&package=" + t, r = o(this).data("index");
                        if ("A" == e.target.nodeName) {
                            var d = o(this).data("url"), l = o(this).data("version");
                            return s.report("click-download", t, "l" + n, r), d = s.addReportParams(d, "l" + n, r), void c.operSoft({packageName: t,downloadUrl: d,versionCode: l}, this.querySelector("a"))
                        }
                        i.jumpToPage({hashString: a}, "l" + n, r)
                    }, !1), Q[n].updateLoadBar(L[n] ? "pending" : "nomore"), e.resolve()
                }))
            }, function(t) {
                console.log(t), Q[n].updateLoadBar("error"), e.reject("error")
            }), e.promise
        }, G = function() {
            var e = (r.getHashObj(), {});
            e.t = I = Date.now(), a.invokeAjaxCmd("getCategoryList", e).then(function(e) {
                return e.t != I ? void console.log("timestamp mismatch!") : (o("#index .mod-category").html($(e)), void o(".mod-category .mod-sort-list li .box-inner").on("click", function() {
                    var e = encodeURIComponent(this.querySelector("p").innerHTML), t = o(this).parent().data("index");
                    i.jumpToPage({hashString: "p=category&category=" + o(this).data("id") + "&name=" + e}, "categorylist", t)
                }))
            })
        }, z = function(e) {
            var t = r.getHashObj(), n = t.g || "recommond", a = t.s || "download";
            switch (L[a] = L[a] || !1, T[a] = T[a] || "", E[a] = E[a] || 1, o("#index .mod-view").addClass("hidden"), o(".mod-main-nav a").removeClass("active"), o(".mod-sub-nav a").removeClass("active"), n) {
                case "recommend":
                    o(".mod-main-nav .recommend").addClass("active"), e && e.isHistoryBack ? (o("#index .mod-recommend").removeClass("hidden"), window.scrollTo(0, e.scrollY)) : (o(".mod-loading").removeClass("hidden"), M().then(function(e) {
                        q(e), o("#index .mod-recommend").removeClass("hidden"), o(".mod-loading").addClass("hidden")
                    }, function(e) {
                        B(e)
                    }));
                    break;
                case "rank":
                    o("#index .mod-app-container .mod-app-list").addClass("hidden"), o(".mod-main-nav .rank").addClass("active"), o(".mod-sub-nav ." + a).addClass("active"), o("#index .mod-rank .loadbar").addClass("hidden"), o("#index .mod-app-container ." + a).removeClass("hidden"), o("#index .mod-rank .loadbar-" + a).removeClass("hidden"), o("#index .mod-app-container ." + a)[0].hasChildNodes() === !1 ? (o(".mod-loading").removeClass("hidden"), F().then(function() {
                        o(".mod-loading").addClass("hidden"), o("#index .mod-rank").removeClass("hidden")
                    }, function(e) {
                        B(e)
                    })) : (o("#index .mod-rank").removeClass("hidden"), window.scrollTo(0, 0));
                    break;
                case "category":
                    o(".mod-main-nav .category").addClass("active"), o("#index .mod-category").removeClass("hidden"), 0 == o("#index .mod-category")[0].hasChildNodes() && G()
            }
        }, Q = {}, W = {attachDomId: "index",createrDom: "",getLoadBarHtml: d.getLoadBarHtml,canDragUp: d.canDragUp,hideLoadBar: d.hideLoadBar,showLoadBar_DragUp: d.showLoadBar_DragUp,showLoadBar_Loading: d.showLoadBar_Loading,updateLoadBar: d.updateLoadBarState,callBackFunc: F}, Y = function() {
            var e = function() {
                console.log("index init"), D(), document.getElementById("index").style.display = "none", A(o("#index .btn-search"), "p=search"), A(o("#index .btn-me"), "p=mygames"), A(o("#index .mod-main-nav .recommend"), "p=index&g=recommend"), A(o("#index .mod-main-nav .rank"), "p=index&g=rank"), A(o("#index .mod-main-nav .category"), "p=index&g=category"), A(o("#index .mod-sub-nav .download"), "p=index&g=rank&s=download"), A(o("#index .mod-sub-nav .new"), "p=index&g=rank&s=new"), W.createrDom = "#index .loadbar-download", Q.download = new u(W), W.createrDom = "#index .loadbar-new", Q["new"] = new u(W), m.tryPush()
            }, t = function(e) {
                document.getElementById("index").style.display = "none", z(e), document.getElementById("index").style.display = "block"
            }, n = function() {
                document.getElementById("index").style.display = "none"
            };
            return {init: e,show: t,hide: n}
        }();
        n.exports = Y
    }()
}), define("portal/1.0.0/src/com/SoftManage", [], function(e, t) {
    !function() {
        var n = e("zepto/1.1.3/index"), o = e("portal/1.0.0/src/com/report"), a = {installed: {text: "打开"},update: {text: "更新"},download: {text: "下载"}};
        t.addSofts = function(e, t) {
            "use strict";
            for (var n = 0, o = 0; o < e.length; o++) {
                if ("object" != typeof e[o])
                    return t();
                if (window.browser && window.browser.app && window.browser.app.isInstallApk && window.browser.app.getApkInfo)
                    !function(o) {
                        var i = {packagename: o.packageName};
                        browser.app.isInstallApk(function(i) {
                            if (o.status = "download", o.btnText = a[o.status].text, i)
                                browser.app.getApkInfo(function(i) {
                                    return o.status = i.versioncode < o.versionCode ? "update" : "installed", o.btnText = a[o.status].text, n++, n == e.length && t ? t() : void 0
                                }, o.packageName);
                            else if (n++, n == e.length && t)
                                return t()
                        }, i)
                    }(e[o]);
                else if (e[o].status = "download", e[o].btnText = a[e[o].status].text, n++, n == e.length && t)
                    return t()
            }
        }, t.runSoft = function(e) {
            browser && browser.app && browser.app.runApk && browser.app.runApk(e)
        }, t.operSoft = function(e, t) {
            var a, i = n(t).data("status"), r = new Date, s = new Date(2015, 0, 20, 0, 0, 0), c = new Date(2015, 0, 22, 23, 59, 59), d = !1, l = !0;
            switch (r > s && c > r && (d = !0), localStorage.downloadedGames && (a = localStorage.downloadedGames.split(" "), a.length >= 8 && (l = !1)), i) {
                case "installed":
                    browser && browser.app && browser.app.runApk && browser.app.runApk(e.packageName);
                    break;
                default:
                    setTimeout(function() {
                        window.location = e.downloadUrl
                    }, 200), !localStorage.noLongerShow && d && l && (o.report("show-campaign-popup", e.packageName, "game-protal"), setTimeout(function() {
                        n("#double12_campaign_popup").removeClass("hidden")
                    }, 400))
            }
        }
    }()
}), define("portal/1.0.0/src/com/LoadBar", [], function(e, t) {
    var n = e("portal/1.0.0/src/com/utils"), o = e("portal/1.0.0/src/plugin/template"), a = o.compile(e("portal/1.0.0/src/tpl/load-bar.tpl"));
    !function() {
        var e = function(e) {
            try {
                return a(e)
            } catch (t) {
                return n.jsRuntimeError(t, "获取上拉加载更多HTML失败"), ""
            }
        }, o = function(e) {
            try {
                s(e);
                var t = n(e.createrDom);
                t && (console.log("showLoadBar_DragUp"), n(".icon-loading-pull-up").removeClass("hidden"), n(".loading-container").addClass("hidden"))
            } catch (o) {
                n.jsRuntimeError(o, "显示上拉加载更多的向拉条异常")
            }
        }, i = function(e) {
            try {
                s(e);
                var t = n(e.createrDom);
                t && (console.log("showLoadBar_Loading"), n(".icon-loading-pull-up").addClass("hidden"), n(".loading-container").removeClass("hidden"))
            } catch (o) {
                n.jsRuntimeError(o, "显示上拉加载更多加载中异常")
            }
        }, r = function(e, t) {
            try {
                s(e);
                var o = n(e.createrDom);
                if (o)
                    switch (console.log("updateLoadBarState:" + t), t) {
                        case "initial":
                            n(".loading-container").removeClass("hidden");
                            break;
                        case "pending":
                            n(".icon-loading-pull-up").removeClass("hidden");
                            break;
                        case "error":
                            n(".icon-loading-failed").removeClass("hidden"), setTimeout(function() {
                                n(".icon-loading-failed").addClass("hidden"), n(".icon-loading-pull-up").removeClass("hidden")
                            }, 500);
                            break;
                        case "nomore":
                    }
            } catch (a) {
                n.jsRuntimeError(a, "更新上拉加载更多样式异常")
            }
        }, s = function(e) {
            try {
                var t = n(e.createrDom);
                t && (console.log("hideLoadBar"), n(".icon-loading-failed").addClass("hidden"), n(".loading-container").addClass("hidden"), n(".icon-loading-pull-up").addClass("hidden"))
            } catch (o) {
                n.jsRuntimeError(o, "隐藏指定上拉加载条异常")
            }
        }, c = function(e) {
            try {
                var t = n(e.createrDom);
                if (t && !t.hasClass("hidden")) {
                    var o = n(".icon-loading-pull-up");
                    return o ? o.hasClass("none") || o.hasClass("hidden") ? !1 : !0 : !1
                }
                return !1
            } catch (a) {
                n.jsRuntimeError(a, "测试是否允许用户上拉异常")
            }
        };
        t.getLoadBarHtml = e, t.showLoadBar_DragUp = o, t.showLoadBar_Loading = i, t.updateLoadBarState = r, t.hideLoadBar = s, t.canDragUp = c
    }()
}), define("portal/1.0.0/src/tpl/load-bar.tpl", [], function(e, t, n) {
    n.exports = '<!---#########上拉加载提示模板--><div class="icon-loading-pull-up hidden">上拉加载</div><div class="loading-container"><i class="icon-loading"></i>正在加载...</div><div class="icon-loading-failed hidden">加载失败</div>'
}), define("portal/1.0.0/src/plugin/slideup", [], function(e, t, n) {
    !function(e) {
        var t = "ontouchstart" in window, o = t ? "touchstart" : "mousedown", a = t ? "touchmove" : "mousemove", i = t ? "touchend" : "mouseup", r = function() {
        };
        r.prototype = {E: function(e) {
                return document.getElementById(e)
            },Q: function(e) {
                return document.querySelector(e)
            },classRE: function(e) {
                return new RegExp("(^|\\s)" + e + "(\\s|$)")
            },hasClass: function(e, t) {
                return this.classRE(t).test(e.className)
            },show: function(e, t) {
                t ? this.removeClass(e, "hidden") : this.removeClass(e, "none")
            },removeClass: function(e, t) {
                e && (e.className = e.className.replace(this.classRE(t), " ").trim())
            },hide: function(e, t) {
                t ? this.addClass(e, "hidden") : this.addClass(e, "none")
            },addClass: function(e, t) {
                e && !this.hasClass(e, t) && (e.className = (e.className + " " + t).trim())
            }};
        var s = function(e) {
            this.defaultLoadBarInfo = {attachDomId: "",createrDom: "",getLoadBarHtml: null,hideLoadBar: null,showLoadBar_DragUp: null,showLoadBar_Loading: null,updateLoadBar: null,canDragUp: null,callBackFunc: null,autoDragUp: !1,autoDragUpDistanceIndicator: 0};
            for (var t in e)
                e.hasOwnProperty(t) && (this.defaultLoadBarInfo[t] = e[t]);
            this.isSlideUp = !1, this.isStartMove = !1, this.isStartLoading = !1, this.stouchY = 0, this.etouchY = 0, this.attachedDom = n;
            var n = this.E(this.defaultLoadBarInfo.attachDomId);
            this.defaultLoadBarInfo.autoDragUp !== !0 ? (n.removeEventListener(o, this), n.removeEventListener(a, this), n.removeEventListener(i, this), n.addEventListener(o, this, !1), n.addEventListener(a, this, !1), n.addEventListener(i, this, !1)) : (window.removeEventListener("scroll", this, !1), window.addEventListener("scroll", this, !1)), this.attachDom = n, this.loadBarHtml = this.defaultLoadBarInfo.getLoadBarHtml(this.defaultLoadBarInfo), this.createrDom = this.Q(this.defaultLoadBarInfo.createrDom), this.createrDom && this.loadBarHtml && (this.createrDom.innerHTML = this.loadBarHtml)
        };
        s.prototype = {getUA: function() {
                var e = navigator.userAgent, t = /android/gi.test(e);
                "undefined" != typeof mtt && (t = !0);
                var n = /iphone|ipod/gi.test(e);
                return {isAndroid: t,isIos: n}
            },touchendHandler: function(e) {
                if (this.isSlideUp === !0) {
                    var t = this.getUA().isIos === !0 ? 1 : 0, n = this;
                    setTimeout(function() {
                        n.isStartLoading === !1 && (n.isStartLoading = !0, "undefined" == typeof window.webkitRequestAnimationFrame ? (n.defaultLoadBarInfo.showLoadBar_Loading(n.defaultLoadBarInfo), setTimeout(function() {
                            console.log("SliderInfo: Will Invoke CallBackFunc"), n.defaultLoadBarInfo.callBackFunc(n.defaultLoadBarInfo)
                        }, 50)) : window.webkitRequestAnimationFrame(function() {
                            n.defaultLoadBarInfo.showLoadBar_Loading(n.defaultLoadBarInfo), setTimeout(function() {
                                console.log("SliderInfo: Will Invoke CallBackFunc"), n.defaultLoadBarInfo.callBackFunc(n.defaultLoadBarInfo)
                            }, 50)
                        }))
                    }, t), e.stopPropagation()
                }
            },touchstartHandler: function(e) {
                if (this.isSlideUp = !1, this.createrDom) {
                    if (!this.defaultLoadBarInfo.canDragUp(this.defaultLoadBarInfo))
                        return void (this.isStartMove = !1);
                    this.stouchY = "changedTouches" in e ? e.changedTouches[0].pageY : e.pageY, this.isStartMove = !0
                }
            },touchmoveHandler: function(e) {
                if (this.isStartMove && (this.etouchY = "changedTouches" in e ? e.changedTouches[0].pageY : e.pageY, this.createrDom))
                    if (document.documentElement.scrollHeight - window.innerHeight - document.body.scrollTop <= 1 && this.stouchY - this.etouchY > 0 && !this.isSlideUp) {
                        if (e.preventDefault(), !this.defaultLoadBarInfo.canDragUp(this.defaultLoadBarInfo))
                            return void (this.isSlideUp = !1);
                        this.isSlideUp = !0
                    } else if (this.defaultLoadBarInfo.autoDragUp === !0 && document.documentElement.scrollHeight - window.innerHeight - document.body.scrollTop < this.defaultLoadBarInfo.autoDragUpDistanceIndicator && this.stouchY - this.etouchY > 0 && !this.isSlideUp) {
                        if (!this.defaultLoadBarInfo.canDragUp(this.defaultLoadBarInfo))
                            return void (this.isSlideUp = !1);
                        this.isSlideUp = !0
                    }
            },onScroll: function(e) {
                if (document.documentElement.scrollHeight - window.innerHeight - document.body.scrollTop < this.defaultLoadBarInfo.autoDragUpDistanceIndicator && !this.isSlideUp) {
                    if (!this.defaultLoadBarInfo.canDragUp(this.defaultLoadBarInfo))
                        return void (this.isSlideUp = !1);
                    this.isSlideUp = !0, this.touchendHandler(e)
                }
            },handleEvent: function(e) {
                e.type === o ? this.touchstartHandler(e) : e.type === a ? this.touchmoveHandler(e) : e.type === i ? this.touchendHandler(e) : "scroll" === e.type && this.onScroll(e)
            },resetSlide: function() {
                this.isSlideUp = !1, this.isStartMove = !1, this.isStartLoading = !1, this.defaultLoadBarInfo.hideLoadBar(this.defaultLoadBarInfo), this.defaultLoadBarInfo.showLoadBar_DragUp(this.defaultLoadBarInfo)
            },updateLoadBar: function(e) {
                this.resetSlide(), this.defaultLoadBarInfo.updateLoadBar(this.defaultLoadBarInfo, e)
            },dispose: function() {
                var e = this.Q(this.defaultLoadBarInfo.attacherDom);
                if (e && (this.el.removeEventListener(o, this), this.el.removeEventListener(a, this), this.el.removeEventListener(i, this)), this.defaultLoadBarInfo.createrDom) {
                    var t = this.Q(this.defaultLoadBarInfo.createrDom);
                    t && (t.innerHTML = "")
                }
                window.removeEventListener("scroll", this, !1)
            },__proto__: new r}, "function" == typeof define ? n.exports = s : e.Slide = s
    }(window)
}), define("portal/1.0.0/src/plugin/swipe", [], function(e, t, n) {
    function o(e, t) {
        "use strict";
        function n() {
            h = y.children, w = h.length, h.length < 2 && (t.continuous = !1), m.transitions && t.continuous && h.length < 3 && (y.appendChild(h[0].cloneNode(!0)), y.appendChild(y.children[1].cloneNode(!0)), h = y.children), g = new Array(h.length), v = e.getBoundingClientRect().width || e.offsetWidth, y.style.width = h.length * v + "px";
            for (var n = h.length; n--; ) {
                var o = h[n];
                o.style.width = v + "px", o.setAttribute("data-index", n), m.transitions && (o.style.left = n * -v + "px", s(n, b > n ? -v : n > b ? v : 0, 0))
            }
            t.continuous && m.transitions && (s(i(b - 1), -v, 0), s(i(b + 1), v, 0)), m.transitions || (y.style.left = b * -v + "px"), e.style.visibility = "visible"
        }
        function o() {
            t.continuous ? r(b - 1) : b && r(b - 1)
        }
        function a() {
            t.continuous ? r(b + 1) : b < h.length - 1 && r(b + 1)
        }
        function i(e) {
            return (h.length + e % h.length) % h.length
        }
        function r(e, n) {
            if (b != e) {
                if (m.transitions) {
                    var o = Math.abs(b - e) / (b - e);
                    if (t.continuous) {
                        var a = o;
                        o = -g[i(e)] / v, o !== a && (e = -o * h.length + e)
                    }
                    for (var r = Math.abs(b - e) - 1; r--; )
                        s(i((e > b ? e : b) - r - 1), v * o, 0);
                    e = i(e), s(b, v * o, n || x), s(e, 0, n || x), t.continuous && s(i(e - o), -(v * o), 0)
                } else
                    e = i(e), d(b * -v, e * -v, n || x);
                b = e, p(t.callback && t.callback(b, h[b]))
            }
        }
        function s(e, t, n) {
            c(e, t, n), g[e] = t
        }
        function c(e, t, n) {
            var o = h[e], a = o && o.style;
            a && (a.webkitTransitionDuration = a.MozTransitionDuration = a.msTransitionDuration = a.OTransitionDuration = a.transitionDuration = n + "ms", a.webkitTransform = "translate(" + t + "px,0)translateZ(0)", a.msTransform = a.MozTransform = a.OTransform = "translateX(" + t + "px)")
        }
        function d(e, n, o) {
            if (!o)
                return void (y.style.left = n + "px");
            var a = +new Date, i = setInterval(function() {
                var r = +new Date - a;
                return r > o ? (y.style.left = n + "px", C && l(), t.transitionEnd && t.transitionEnd.call(event, b, h[b]), void clearInterval(i)) : void (y.style.left = (n - e) * (Math.floor(r / o * 100) / 100) + e + "px")
            }, 4)
        }
        function l() {
            k = setTimeout(a, C)
        }
        function u() {
            C = 0, clearTimeout(k)
        }
        var f = function() {
        }, p = function(e) {
            setTimeout(e || f, 0)
        }, m = {addEventListener: !!window.addEventListener,touch: "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch,transitions: function(e) {
                var t = ["transitionProperty", "WebkitTransition", "MozTransition", "OTransition", "msTransition"];
                for (var n in t)
                    if (void 0 !== e.style[t[n]])
                        return !0;
                return !1
            }(document.createElement("swipe"))};
        if (e) {
            var h, g, v, w, y = e.children[0];
            t = t || {};
            var b = parseInt(t.startSlide, 10) || 0, x = t.speed || 300;
            t.continuous = void 0 !== t.continuous ? t.continuous : !0;
            var k, S, C = t.auto || 0, $ = {}, j = {}, L = {handleEvent: function(e) {
                    switch (e.type) {
                        case "touchstart":
                            this.start(e);
                            break;
                        case "touchmove":
                            this.move(e);
                            break;
                        case "touchend":
                            p(this.end(e));
                            break;
                        case "webkitTransitionEnd":
                        case "msTransitionEnd":
                        case "oTransitionEnd":
                        case "otransitionend":
                        case "transitionend":
                            p(this.transitionEnd(e));
                            break;
                        case "resize":
                            p(n)
                    }
                    t.stopPropagation && e.stopPropagation()
                },start: function(e) {
                    var t = e.touches[0];
                    $ = {x: t.pageX,y: t.pageY,time: +new Date}, S = void 0, j = {}, y.addEventListener("touchmove", this, !1), y.addEventListener("touchend", this, !1)
                },move: function(e) {
                    if (!(e.touches.length > 1 || e.scale && 1 !== e.scale)) {
                        t.disableScroll && e.preventDefault();
                        var n = e.touches[0];
                        j = {x: n.pageX - $.x,y: n.pageY - $.y}, "undefined" == typeof S && (S = !!(S || Math.abs(j.x) < Math.abs(j.y))), S || (e.preventDefault(), u(), t.continuous ? (c(i(b - 1), j.x + g[i(b - 1)], 0), c(b, j.x + g[b], 0), c(i(b + 1), j.x + g[i(b + 1)], 0)) : (j.x = j.x / (!b && j.x > 0 || b == h.length - 1 && j.x < 0 ? Math.abs(j.x) / v + 1 : 1), c(b - 1, j.x + g[b - 1], 0), c(b, j.x + g[b], 0), c(b + 1, j.x + g[b + 1], 0)))
                    }
                },end: function() {
                    var e = +new Date - $.time, n = Number(e) < 250 && Math.abs(j.x) > 20 || Math.abs(j.x) > v / 2, o = !b && j.x > 0 || b == h.length - 1 && j.x < 0;
                    t.continuous && (o = !1);
                    var a = j.x < 0;
                    S || (n && !o ? (a ? (t.continuous ? (s(i(b - 1), -v, 0), s(i(b + 2), v, 0)) : s(b - 1, -v, 0), s(b, g[b] - v, x), s(i(b + 1), g[i(b + 1)] - v, x), b = i(b + 1)) : (t.continuous ? (s(i(b + 1), v, 0), s(i(b - 2), -v, 0)) : s(b + 1, v, 0), s(b, g[b] + v, x), s(i(b - 1), g[i(b - 1)] + v, x), b = i(b - 1)), t.callback && t.callback(b, h[b])) : t.continuous ? (s(i(b - 1), -v, x), s(b, 0, x), s(i(b + 1), v, x)) : (s(b - 1, -v, x), s(b, 0, x), s(b + 1, v, x))), y.removeEventListener("touchmove", L, !1), y.removeEventListener("touchend", L, !1)
                },transitionEnd: function(e) {
                    parseInt(e.target.getAttribute("data-index"), 10) == b && (C && l(), t.transitionEnd && t.transitionEnd.call(e, b, h[b]))
                }};
            return n(), C && l(), m.addEventListener ? (m.touch && y.addEventListener("touchstart", L, !1), m.transitions && (y.addEventListener("webkitTransitionEnd", L, !1), y.addEventListener("msTransitionEnd", L, !1), y.addEventListener("oTransitionEnd", L, !1), y.addEventListener("otransitionend", L, !1), y.addEventListener("transitionend", L, !1)), window.addEventListener("resize", L, !1)) : window.onresize = function() {
                n()
            }, {setup: function() {
                    n()
                },slide: function(e, t) {
                    u(), r(e, t)
                },prev: function() {
                    u(), o()
                },next: function() {
                    u(), a()
                },stop: function() {
                    u()
                },getPos: function() {
                    return b
                },getNumSlides: function() {
                    return w
                },kill: function() {
                    u(), y.style.width = "", y.style.left = "";
                    for (var e = h.length; e--; ) {
                        var t = h[e];
                        t.style.width = "", t.style.left = "", m.transitions && c(e, 0, 0)
                    }
                    m.addEventListener ? (y.removeEventListener("touchstart", L, !1), y.removeEventListener("webkitTransitionEnd", L, !1), y.removeEventListener("msTransitionEnd", L, !1), y.removeEventListener("oTransitionEnd", L, !1), y.removeEventListener("otransitionend", L, !1), y.removeEventListener("transitionend", L, !1), window.removeEventListener("resize", L, !1)) : window.onresize = null
                }}
        }
    }
    (window.jQuery || window.Zepto) && !function(e) {
        e.fn.Swipe = function(t) {
            return this.each(function() {
                e(this).data("Swipe", new o(e(this)[0], t))
            })
        }
    }(window.jQuery || window.Zepto), "function" == typeof define ? n.exports = o : window.Swipe = o
}), define("portal/1.0.0/src/com/push", [], function(e, t) {
    var n = e("zepto/1.1.3/index"), o = e("portal/1.0.0/src/plugin/cookie"), a = e("portal/1.0.0/src/tff/tff.data"), i = e("portal/1.0.0/src/plugin/template"), r = e("portal/1.0.0/src/tff/tff.core.jump"), s = e("portal/1.0.0/src/com/report"), c = i.compile(e("portal/1.0.0/src/tpl/push-tip.tpl")), d = "push.counter", l = function(e) {
        "use strict";
        var t = "iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAIAAABt+uBvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAADs9JREFUeNrsW2lsXcd1njMzd3sLH/m4PS6iRUm2JGvxrsapYyRwmhRZigZtumVBmx81svRf8y+/8iMInAZogKSwihZwgGZxnBZJbQSB61iOHe2JY0nWYi2WKNEWRT4+ko9vu8vM9Mx9Wsz9XvJRdos7GFDvie/dmfPNd75zzswQ/vipIkna0o2rBIPlASIqgWi5RhMIEoASgNZZgxIQEgYlYT5hUKJBCYMSgBIXSxiUtCTMJwxKAEpEOmFQAtDtb4qslye0cstVEhJI3aXUzwQgFIBTwvSL1iOCgwgcTqEFilPAtzJ8YdBWDteyMO8KZVDYmmc7ulkhSxGUqqfempXnS+LtWTnrKYNpsFoCjS80Fu0WHW6nWzpZf4amTA3QeEW+PhGcmhBVX9kcWsSgtc9YEU+QHd38L3aY9xS4beIa6smhDb4kDU9dnBZHRoP9V4LRWSSZshisGhovUMjKzR3sA0PsDwaN/jZqcj0c/gofisx1A/ONonj6pHf07YC3gkrw4X8dX5NbaZ6rT95lff5eK+eAJwFn2mQl3DALJ4oWTFTkgSveC28G5yYDBE4TCm5+aIUFCD1Xk2JnD/ujTeZDg7zdoUJp/wK4pT4QgmiCqnvqJye8H51s4GwYXSNAe8fXgo4v1ed2W5/ZbaPSiFB3Fl/6cPYGqHJdHbsavHjRP1MU4zUtVlRDil8MvxqaqJo/1HWhMRkpZNiuHvbBYWNHD3dM4iuQTWxhcUApihEhz7zu/turDUZhLTxak4s1hPrz7eZn77UlCUm+1DzgOkquAscmH9hsvv8O462yvDKDXYyW5URNTjcU+ikyBemGPWNAhwNdKdqfpYM5uiFHezLIQ0DKuCFrljE55BT4inx6p1Xx1H8cd20D4PYDVPfVw4PG391nKwBFIjlLc+qeJCgkAx1sqINJxaUOQ0QIUg9QQZTJwDEQI40BDTsSAIHzblAmkqmh8wYK/ma3jQvw0ojvrFazVxnFUEQKGfr3D9i2pdcq3gKFRoqwN98o0E9IG5BpZjQYsG+QTjR1JSIuC9IOwyRfuN/GSHq1Io1VBQd6PceK03XmJAlKz3An8yXAWiJFuNTaZShpIkXC1xD+5wqoACPUvN7BXJSwSKIN7ezzuy18nopvKfbVSDw6wp4B9qFNhhuXOy1siI6sire+HZz+hLjwuKod1zAthr+r1KPD5vsHOU77dmgQSgb686e2mZapnWvhIiOjqG5hXArTXCF1a3WFpMToN+TYXkItpQ7K6mv8zh+CvYkofz5CCjgnn9pu/vaqTi/i+lnsat4TCldjV5+BzrWQf5wx1/MnSpPF0rTreohTWzbd25XPtaURqWYJ0hL6KP+qLD1LWJZAuMaNC6r8K0htbgrbPIwQl+29/IECe/lK4MREKB6DVLh2jw0blgGeWoQ4l0avnnzj4nS5IpA2SksKZdQ0jY0Dvbu2bXYcWwjRKh/TXjansWWip8HhsU3mwVGMh/FkhcbSLCyChnL0vn6kz3znQoCOn76w/8iJqelZfG1wZhncNDinVPjBmfOX9x34PQLHGGtFPRaA0UPzf4YypHswDc7dkPswWcqRQWdY9/TzO9opmhDL5HgMwrz5fYNGLgXeXHzQs06dHzl++jy+WBjV8L3F2OR0+cBvT3zo4ftt21yNJOFjUUt0ZApCIBQb+CoxC6q8D8wB2vs42HcQ6enJ6BIMhNa+d0AKJGfD+waMs5OuGcfLYmgQCkiKkT0DBpmLAaO0NFM+dfYS13RZkr+WZU7NVE6dv/TArrtio4O8Qw17a1QnmoWCRsr3UZ5Z4XHS9/j1nEd6uprhUKzIWVd0pWnWpt7NyBXmqHsG+U9PeQhv9OKDx6LPXXm2KU+DecELYGR03PMDw1jhaehxo1cntm7akE45MUjEqKrX/Sf/Rex7UUnFHn3U/PI/QDqts281R9EQnV+ebjx1uF6qyU2d7EuPpHcPGDcxCggZ7qDYsQyMvqMQQ7BwCbd30zaHyrnS4/v+5NSMEarLCp3SwA+KU2UaK30yefCz/wr+86fK80jgi//+WfDM08SYr2VY054dD773Sm2sLPDxJ8eC775SK9flzWoePSBj07u7sJKNEUypzoujdRzogX6u5voXvg4CWW/4jDNgK3TKGJa1tZobt76Wr76K9CPov9hNS79dYCNWEufGg6mabJamKRMuFINrFclvjBWmRHBfX7htF93qiGKOPM07sBHLywV1qd6W0PUBjdZBxd/khf5+4vnX9008T79dgLBQpDtLUYCDkOHoWe0OzVog37FdhL/ZmGddKf2ZiIZHdTFfqOF2lk/RebmeCh3HsUysnzCALd/RswzKbMuIh1Eg+V/+Fb17B6nWVKUCd23lf/0Zjce8AshX9w0af7LLDqSadRXy6HMPOX1tzH/HJ3HynSm6sR1LSNXSKAaabkPtNG1RV80XJsNg7blMtdZYJoTd/DA3eHsuGy/M+wHdMGR98wl59Chm4+zBB6G3gDzSugOmCTp5diVmZgqV90uPpPbcYVwrizt7+I4C9+biiG9SFsVs6PDorZ28FkQxJQkyBOPXomZRyvq681fHp5avXFG7RCDy7dn2sOyIWeB4kM/zT35MT8aT+i2WGMBPNs5g72T5h9MPWdQUUsvzI5tMlBlPEG+x6hQR29xBDaqNihIqogGkMz2yJa83txY6vxSit7uj0N0xNjHFOVuOPpxt2diPLilWkSgKoeq3groB/Jflff888WRJTHPCP9L2wa/2fMUCUyrZ8NUyroAmbO7kaA7iHCVSRBJpESp0Z5pKWKJAo/TuO4fQ0bAEg1Br5vXm6du2zRu6O3NizZU9BzYlZr5feroiqm06H7SeL7/0m8ohm6683mhCR4p2pjDVjijSET6Fi1fIUCxQl3Ja1BTHtu7fuaWvt1MvNtap4VYY/mwee9i2tWvb8MbB3pYU9OhfddmYDEpmuAeEwV8QMR4UaTR3QP3uy9AgGkKRXAyLmr4sdTgsU4lrjCzznm3DxdLMOJYelZrnCwzrKdvM57LogOmUJURrdoWEkh0st8PeeqB6NMPSnvKzNLPD3uZHkDb8BBpSyKKbi2hRLNKSqd4MxUQ+WNZvm7Gpt7td+xGCEbIIvQ9LNCwRWoVOWHhJh9pf7v6CIBJFuod3fTb/6XtTO10VRAGII0AZzDq8KCcNKwOEq2JRyKdARjq5IE0g2K19jVZCcyusKX+LNfzN/q8Vg1KKOl2801d+lLgNYWGLGoTlmIqwZbxyHoRPwaDYbtFY6qHW/8/QECMM7UPmAGZAvvKij4eGtDtg0UiBLBKDDIPkHHgP/uUdipEgMekZRtSsRTFXciN8deVzManDKkmbNOLp4Hu/oSFpE2tnIv2VN4YilBrh2ZDJ4f/NXT00BCM9g0j3riJFMUb1botq9TSbaXl4vgzNQ0N1i6JK3ri8oJa+p7BqgEwKEct0Hs1tCW/Jpa3QWhoeF+FPXEOMbzM1UW6IuquwRKj5EjOJlAEpE7vOkXMOMzgVWKSC3omWrQarFdW8al6FUvYaVy3cWzEo1F0xVhEXi96ZMffipD9ZFaWaLHuy5oWhL6xLHAPaLOhIsc4025jnWwvWlm6rJ8tSFsNsUM65gLSKRBzjV3hIp2BlF1MRXAdzPj9ousAqWcNDdN6e9g++WTsyUj99zZtpKEGYAsoocGbiP04a3rF/oKYCWZyWpyfF/hGfkUrWgu295oND9h9uTg92GDI8yQFYJUw+xj/VvCfRChfDqVQ92RUfIJ2JYZ7JYHTS+/nx8gtv1MarSlFmmbbp6DJ2qUQNmD5KwslZTYiVrElxcDQ4MDL7o1fLj92Z+tN72oY6LU+q5e4lLc0gdOeIJ/U8yvN8QcoNScO9gugrpsLwh+nTs6+Vv39k5soMwYLWSTGgNK5BCCXXJYveipwJgh/8vr7vXP1v9+Q+vjurQNfDMTAKPzzrykBEsmVlDUIKeIGaqSuI6VlYavi+3Pvy1DPHqsyw2rJG89LBWsIhYqXPazPGpOs98eL0haL3xUfzRjPLjzw/nMR0Tbq+igLryouJT3EDUqxJBpFNC7njefLb/1P88bG6nUpblnnjjmVLwrQ+hsTH/uR441vPF11kN4n6bL2JDmSiKtEo2hqAdEYPV8u65ISIuoNf8dV39pWeO+Nl0ilK1+U+Pz4WH/6Ls953XpwM/DCGqEgChIZoc6K5RKQNMww0l6eCmichEjo6L9j7m9Kzp9x0KnX9WvD6dHw4DvHsae/JV0ooRRChRkYTaq68XArQqEg3zCLdcKBwYVLM1lcCKJycQeCHh6d//Frdth0I73eua8chHMd55lj9B4enjZv3aZcFCAPOhZLgFFp2LoZYT9XJmWseX0lGbICfHyv/+5GqZTuU3qaEFwcybQcHxaFtWFYplS680RA0J+LsIgGEg6J7HRpx1dIUVpLYFH59tvLdl8vAbUZv698R4XA4KA6NE7AZKLkkxdGCQ5dcN/Ld06i3XA1KD494o6VgURKpMBv83aXat16YdolpMEbW27UWzpAxHBongNNo7hYuSh804ehlz6S0xbdcOYNrFfLciSqfFyzUde4cG6l9/ReTUx63DOPd2sfAoUsex2m8NlLDKWkeqTmriJN/7kRlrKLNicrNoY/+Y/Swem68vq2bDXeZGCmb4RzXBPF46Uz1G8+Xiq5hW+a7u9fDOZtxyaELlb4s29JlQpj9N3N6h8OhN2vf218BbkW/3B0HIICGQD+qFtLQlzP0KZBQV4r+Uwen9h6YrQrrXUfnJkYVD14+V5mq+H1Z3mZTVCXMm185W3niV9PlwDR4jHuS8Mg/jcUa3vV8rtydBd6VorOuOjPuFesUi6ywtHwvbVeLoN5wuxy5rcfMWoCVwOtjQQCYgcdTgNhW4QBS0t+97eEMMHRYppNJs/fgZjUuGE6sEoj9l30pFWOAlbJFY9+xXc2yU8pSjvN/YfcZeNjWuKOY/OH8CjuKSVtzJp0AlLQ17CgmDEpaAlACUKJBSR6UuFgCUKJBCYOSlgCUANT6MJ9oUMKgBKB1DfNJnE/yoMTF1rH9rwADAM7HMqUC98+FAAAAAElFTkSuQmCC";
        window.browser && window.browser.app && window.browser.app.sendToDeskTop && window.browser.app.sendLinkToDesktop(e.url, e.title, t, function() {
        }, function() {
        })
    }, u = function(e) {
        "use strict";
        var t;
        (1 == e.type && window.browser && window.browser.app && window.browser.app.sendToDeskTop || 2 == e.type) && (n("body").append(c(e)), n(".mod-desktop .btn-close").on("click", function() {
            n(this).parent().hide(), o.set(d, "4", 1)
        }), n(".mod-desktop .btn-blue-s").on("click", function() {
            1 == e.type ? l(e) : (t = e.downloadUrl, t = s.addReportParams(t, "push"), window.browser && window.browser.app && window.browser.app.downloadFile ? window.browser.app.downloadFile(t) : window.location.href = t)
        }), n(".mod-desktop .view-detail").on("click", function() {
            r.jumpToUrl(e.url, "push")
        }))
    };
    t.tryPush = function() {
        "use strict";
        var e = parseInt(o.get(d));
        if (e || (e = 0), 3 > e) {
            var t = Date.now();
            a.invokeAjaxCmd("getPushTip", {t: t}).then(function(e) {
                0 == e.code && setTimeout(function() {
                    u(e.data)
                }, 1e3)
            })
        }
        e++, o.set(d, e + "", 1)
    }
}), define("portal/1.0.0/src/plugin/cookie", [], function(e, t) {
    t.set = function(e, t, n) {
        var o = new Date, a = document.domain.split("."), i = a.length, r = "." + a[i - 3] + "." + a[i - 2] + "." + a[i - 1];
        o.setDate(o.getDate() + n), document.cookie = e + "=" + t + (null == n ? "" : ";expires=" + o.toGMTString()) + ";domain=" + r
    }, t.get = function(e) {
        if (document.cookie.length > 0) {
            var t = document.cookie.indexOf(e + "=");
            if (-1 != t) {
                t = t + e.length + 1;
                var n = document.cookie.indexOf(";", t);
                return -1 == n && (n = document.cookie.length), document.cookie.substring(t, n)
            }
        }
        return ""
    }
}), define("portal/1.0.0/src/tpl/push-tip.tpl", [], function(e, t, n) {
    n.exports = '<!--desktop start--><div class="mod-desktop">    <img class="view-detail" src="<%=imgUrl%>" width="60" height="60" alt="<%=title%>"/>    <div class="send-content view-detail">        <h5><%=title%></h5>        <p><%=prompt%></p>    </div>    <a class="btn-blue-s" data-control="<%=type%>"><%if(type==1){%>发送<%}else{%>下载<%}%></a>    <a class="btn-close">关闭</a></div><!--desktop end-->'
}), define("portal/1.0.0/src/com/user", [], function(e, t, n) {
    var o = e("portal/1.0.0/src/plugin/cookie"), a = e("portal/1.0.0/src/tff/tff.data"), i = "http://pt.3g.qq.com/s?aid=touchLogin&bid_code=qb_game_portal&css=HTTP://" + location.host + "/css/login.css&go_url=" + location.href, r = "gp_sid", s = {QBID: {name: "gp_qbid",expire: 1},UIN: {name: "gp_sid",expire: 1},TOKEN: {name: "gp_token",expire: 1},NICKNAME: {name: "gp_nickname",expire: 1},HEAD: {name: "gp_head",expire: 1},TYPE: {name: "gp_type",expire: 1}}, c = function(e) {
        o.set(r, e, 30)
    }, d = function() {
        o.set(r, "", -1)
    }, l = {sid: "",qbid: "",isLogin: !1,userInfo: {uin: 0,avatar: "/img/avatar-default.png",nickname: "未登录用户",origin: ""}};
    l.login = function() {
        l.isLogin || (location.href = i)
    }, l.getUserInfo = function(e) {
        a.invokeAjaxCmd("getUserInfo").then(function(t) {
            return 0 === t.code ? (l.sid = o.get(r), l.isLogin = !0, l.userInfo = t.data) : (l.isLogin = !1, l.sid = ""), e()
        })
    }, l.logout = function() {
        d(), location.href = "http://pt.3g.qq.com/s?sid=" + l.sid + "&aid=nLogout&redir_url=http://" + location.host
    };
    var u = window.location.search.match(/sid=\w+/);
    null !== u && c(u[0].substr(3));
    var f = function(e) {
        l.sid = e.token, l.qbid = e.qbid, l.isLogin = !0, l.userInfo.uin = e.uin, l.userInfo.avatar = e.head, l.userInfo.nickname = e.nickname, l.userInfo.origin = e.type, o.set(s.TOKEN.name, l.sid, 1), o.set(s.QBID.name, l.qbid, 1), o.set(s.UIN.name, l.userInfo.uin, 1), o.set(s.HEAD.name, l.userInfo.avatar, 1), o.set(s.NICKNAME.name, l.userInfo.nickname, 1), o.set(s.TYPE.name, l.userInfo.origin, 1)
    }, p = function(e, t) {
        var n = {};
        window.browser && window.browser.login && window.browser.login.showLoginPanel ? browser.login.showLoginPanel(function(o) {
            o && o.uin && o.token && o.type && o.qbid ? (f(o), e && e()) : 0 == o.res ? m(e, t) : (n = {code: -302,message: "用户登录失败",res: {}}, t && t(n))
        }, function() {
            n = {code: -302,message: "用户登录失败",res: {}}, t && t(n)
        }, {appID: 101}) : (n = {code: -500,message: "非QQ浏览器或者浏览器版本过低",res: {}}, t && t(n))
    }, m = function(e, t, n) {
        var o = {};
        window.browser && window.browser.login && window.browser.login.getAccountInfo ? browser.login.getAccountInfo(function(a) {
            a && a.uin && a.token && a.type && a.qbid ? (f(a), e && e()) : n !== !0 ? p(e, t) : (o = {code: -301,message: "用户没有登录",res: {}}, t && t(o))
        }, function() {
            n !== !0 ? p(e, t) : (o = {code: -301,message: "用户没有登录",res: {}}, t && t(o))
        }, {appID: 101}) : (o = {code: -500,message: "非QQ浏览器或者浏览器版本过低",res: {}}, t && t(o))
    }, h = function(e, t) {
        var n = {};
        if (window.browser && window.browser.login && window.browser.login.authorize) {
            var o = location.origin + "/img/logo.png", a = {authorizeAppID: "101",authorizeType: 7,authorizeAppIconURL: o};
            browser.login.authorize(function(t) {
                f(t), e && e()
            }, function() {
                n = {code: -303,message: "用户授权失败",res: {}}, t && t(n)
            }, a)
        } else
            n = {code: -500,message: "非QQ浏览器或者浏览器版本过低",res: {}}, t && t(n)
    }, g = function(e, t, n) {
        var o = {};
        if (window.browser && window.browser.login && window.browser.login.refreshToken) {
            var a = {uin: e,authorizeAppID: "101"};
            browser.login.refreshToken(a, function(e) {
                "" != e ? (f(e), t && t()) : h(t, n)
            })
        } else
            o = {code: -500,message: "非QQ浏览器或者浏览器版本过低",res: {}}, n && n(o)
    };
    l.checkUserLoginStats = function(e, t, n) {
        "" == o.get(s.TOKEN.name) ? m(e, t, n) : (l.sid = o.get(s.TOKEN.name), l.qbid = o.get(s.QBID.name), l.isLogin = !0, l.userInfo.uin = o.get(s.UIN.name), l.userInfo.avatar = o.get(s.HEAD.name), l.userInfo.nickname = o.get(s.NICKNAME.name), l.userInfo.origin = o.get(s.TYPE.name), e && e())
    };
    var v = function(e, t, n) {
        l.checkUserLoginStats(function() {
            a.invokeAjaxCmd("gate", {c: "check",qbid: l.qbid,uin: l.userInfo.uin,token: l.sid,type: l.userInfo.origin}).then(function(o) {
                0 == o.code ? t && t() : -100 == o.code ? 1 == e ? g(l.userInfo.uin, function() {
                    v(e + 1, t, n)
                }, function() {
                    n && n()
                }) : 2 == e ? h(function() {
                    v(e + 1, t, n)
                }, function() {
                    n && n()
                }) : e >= 3 && n && n() : n && n()
            }, function() {
                n && n()
            })
        }, function() {
            n && n()
        }, !1)
    }, w = function(e, t, n, o, i) {
        var r = {code: 0,message: "成功",res: {}};
        e && "" != e && t ? l.checkUserLoginStats(function() {
            t.qbid = l.qbid, t.uin = l.userInfo.uin, t.token = l.sid, t.type = l.userInfo.origin, a.invokeAjaxCmd(e, t).then(function(a) {
                r.res = a, 0 == a.code ? (r.code = 0, r.message = "成功", o && o(r)) : -100 == a.code ? 1 == n ? g(l.userInfo.uin, function() {
                    w(e, t, n + 1, o, i)
                }, function(e) {
                    i && i(e)
                }) : 2 == n ? h(function() {
                    w(e, t, n + 1, o, i)
                }, function(e) {
                    i && i(e)
                }) : n >= 3 && (r.code = -100, r.message = "登录尝试失败", i && i(r)) : (r.code = -200, r.message = "其他错误", i && i(r))
            }, function(e) {
                r.code = -400, r.message = "网络出错", r.res = e, i && i(r)
            })
        }, function(e) {
            i && i(e)
        }, !1) : i && i()
    };
    l.showLoginPanel = p, l.switchAccount = h, l.updateUserInfo = f, l.verifyToken = v, l.getResourcesWithAuth = w, n.exports = l
}), define("portal/1.0.0/src/tpl/soft-list.tpl", [], function(e, t, n) {
    n.exports = '<!--列表页模板--><% for(i = 0; i < data.length; i ++) { %><li data-package="<%=data[i].packageName%>" data-url="<%=data[i].downloadUrl%>" data-version="<%=data[i].versionCode%>" data-index="<%=i + (currentPage-1)*10 + 1%>"><div class="img-show"><img src="<%=data[i].logoUrl%>" width="48" height="48" alt="<%=data[i].name%>"></div><div class="app-content">    <h3><%=data[i].name%></h3>    <ul class="icon-star-list clearfix">        <% while(data[i].score[0]--) { %>        <li class="icon-star-light" ></li>        <% } %>        <% while(data[i].score[1]--) { %>        <li class="icon-star-half"></li>        <% } %>        <% while(data[i].score[2]--) { %>        <li class="icon-star-disable"></li>        <% } %>    </ul>    <p><%=data[i].categoryName%> <%=data[i].fileSize%></p></div><a class="btn-common-s btn-download" data-status="<%=data[i].status%>" ><%=data[i].btnText%></a></li><% } %>'
}), define("portal/1.0.0/src/tpl/banner.tpl", [], function(e, t, n) {
    n.exports = '<!--首页banner-->    <!-- slideshow start-->    <div class="mod-banner">        <div id="slider" class="mod-slidshow">            <ul>                <% for(var i=0; i<data.length; i++) { %>                <li><a data-url="<%=data[i].url%>" data-index="<%=i + 1 %>"><img src="<%=data[i].imgUrl%>"></a></li>                <% } %>            </ul>        </div>        <nav class="mod-indicator">            <% for(var i=0; i<data.length; i++) { %>                <% if(i==0){ %>                    <a class="active"></a>                <% }else{ %>                    <a></a>                <% } %>            <% } %>        </nav>    </div>    <!--slideshow end-->'
}), define("portal/1.0.0/src/tpl/hot-games-redpoint.tpl", [], function(e, t, n) {
    n.exports = '<!--热门游戏begin-->    <div class="mod-recommend-container mod-hot-games">        <h2>热门游戏</h2>        <ul class="mod-software-list clearfix">            <% for(var i=0; i<data.length; i++) { %>            <li data-package="<%=data[i].packageName%>" data-url="<%=data[i].downloadUrl%>" data-version="<%=data[i].versionCode%>" data-index="<%=i + 1%>">                <div class="box-inner">                    <div class="icon-frame">                        <img src="<%=data[i].logoUrl%>" width="64" height="64" alt="<%=data[i].name%>">                        <%if(data[i].redpoint != 0){%>                        <i class="ico-red-dot"></i>                        <%}else{%>                        <i></i>                        <%}%>                    </div>                    <h3><%=data[i].name%></h3>                    <p><%=data[i].categoryName%> <%=data[i].fileSize%></p>                    <a class="btn-common-s btn-download" data-status="<%=data[i].status%>"><%=data[i].btnText%></a>                </div>            </li>            <% } %>        </ul>        <a class="btn-more">查看更多</a>    </div>'
}), define("portal/1.0.0/src/tpl/hot-games.tpl", [], function(e, t, n) {
    n.exports = '<!--热门游戏begin-->    <div class="mod-recommend-container mod-hot-games">        <h2>热门游戏</h2>        <ul class="mod-software-list clearfix">            <% for(var i=0; i<data.length; i++) { %>            <li data-package="<%=data[i].packageName%>" data-url="<%=data[i].downloadUrl%>" data-version="<%=data[i].versionCode%>" data-index="<%=i + 1%>">                <div class="box-inner">                    <div class="icon-frame"><img src="<%=data[i].logoUrl%>" width="64" height="64" alt="<%=data[i].name%>"></div>                    <h3><%=data[i].name%></h3>                    <!-- <p style="color:blue">小蓝点<%=data[i].redpoint%></p> -->                    <p><%=data[i].categoryName%> <%=data[i].fileSize%></p>                    <a class="btn-common-s btn-download" data-status="<%=data[i].status%>"><%=data[i].btnText%></a>                </div>            </li>            <% } %>        </ul>        <a class="btn-more">查看更多</a>    </div>'
}), define("portal/1.0.0/src/tpl/ads.tpl", [], function(e, t, n) {
    n.exports = '<!--首页广告-->    <ul class="mod-pic-show clearfix">        <% for(var i=0; i<data.length; i++) { %>        <li><a data-url="<%=data[i].url%>" data-index="<%=i + 1%>"><img src="<%=data[i].imgUrl%>"></a></li>        <% } %>    </ul>'
}), define("portal/1.0.0/src/tpl/new-games.tpl", [], function(e, t, n) {
    n.exports = '<!--最新游戏-->    <div class="mod-recommend-container mod-new-games">        <h2>最新游戏</h2>        <ul class="mod-software-list clearfix">            <% for(var i=0; i<data.length; i++) { %>            <li data-package="<%=data[i].packageName%>" data-url="<%=data[i].downloadUrl%>" data-version="<%=data[i].versionCode%>" data-index="<%=i + 1%>">                <div class="box-inner">                    <div class="icon-frame"><img src="<%=data[i].logoUrl%>" width="64" height="64" alt="<%=data[i].name%>"></div>                    <h3><%=data[i].name%></h3>                    <p><%=data[i].categoryName%> <%=data[i].fileSize%></p>                    <a class="btn-common-s btn-download" data-status="<%=data[i].status%>"><%=data[i].btnText%></a>                </div>            </li>            <% } %>        </ul>        <a class="btn-more">查看更多</a>    </div>'
}), define("portal/1.0.0/src/tpl/tencent-games.tpl", [], function(e, t, n) {
    n.exports = '<!--腾讯游戏-->    <div class="mod-recommend-container mod-tencent-games">        <h2>腾讯精品游戏</h2>        <ul class="mod-software-list clearfix">            <% for(var i=0; i<data.length; i++) { %>            <li data-package="<%=data[i].packageName%>" data-url="<%=data[i].downloadUrl%>" data-version="<%=data[i].versionCode%>" data-index="<%=i + 1%>">                <div class="box-inner">                    <div class="icon-frame"><img src="<%=data[i].logoUrl%>" width="64" height="64" alt="<%=data[i].name%>"></div>                    <h3><%=data[i].name%></h3>                    <p><%=data[i].categoryName%> <%=data[i].fileSize%></p>                    <a class="btn-common-s btn-download" data-status="<%=data[i].status%>"><%=data[i].btnText%></a>                </div>            </li>            <% } %>        </ul>    </div>'
}), define("portal/1.0.0/src/tpl/download-rank.tpl", [], function(e, t, n) {
    n.exports = '<!--最多下载-->    <div class="mod-recommend-container mod-download-rank">        <h2>本周下载排行榜</h2>        <ol class="mod-ranking-list clearfix">            <% for(var i=0; i<data.length; i++) { %>            <li data-package="<%=data[i].packageName%>" data-url="<%=data[i].downloadUrl%>" data-version="<%=data[i].versionCode%>" data-index="<%=i + 1%>">                <div class="item-inner">                    <div class="icon-num"><%=i+1%></div>                    <h3><%=data[i].name%></h3>                    <p class="c-tx1"><%=data[i].categoryName%></p>                    <a class="btn-common-s btn-download" data-status="<%=data[i].status%>"><%=data[i].btnText%></a>                </div>                <div class="app-detail">                    <div class="img-show"><img src="<%=data[i].logoUrl%>" width="60" height="60" alt="<%=data[i].name%>"></div>                    <div class="content-info"><%=data[i].description%></div>                </div>            </li>            <% } %>        </ol>        <a class="btn-more">查看更多</a>    </div>'
}), define("portal/1.0.0/src/tpl/recommend-special.tpl", [], function(e, t, n) {
    n.exports = '<!--专题推荐-->    <div class="mod-recommend-container mod-topic">        <h2>专题</h2>        <ul class="mod-topic-list">            <% for(var i=0; i<data.length; i++) { %>            <li data-url="<%=data[i].url%>" data-index="<%=i + 1%>">                <img src="<%=data[i].imgUrl%>" width="125" height="65" alt="<%=data[i].title%>">                <div class="topic-content">                    <h3><%=data[i].title%></h3>                    <p><%=data[i].intro%></p>                </div>            </li>            <% } %>        </ul>        <a class="btn-more">往期专题</a>    </div>'
}), define("portal/1.0.0/src/tpl/recommend-category.tpl", [], function(e, t, n) {
    n.exports = '    <div class="mod-recommend-container mod-recommend-category">        <h2>热门分类</h2>        <ul class="mod-software-list clearfix">            <li data-id="38644" data-index="1">                <div class="box-inner">                    <div class="icon-frame"><img src="/img/category-38644.jpg" width="64" height="64" alt="单机"></div>                    <h3>单机</h3>                </div>            </li>            <li data-id="147" data-index="2">                <div class="box-inner">                    <div class="icon-frame"><img src="/img/category-147.jpg" width="64" height="64" alt="冒险"></div>                    <h3>休闲</h3>                </div>            </li>            <li data-id="151" data-index="3">                <div class="box-inner">                    <div class="icon-frame"><img src="/img/category-151.jpg" width="64" height="64" alt="卡牌"></div>                    <h3>赛车</h3>                </div>            </li>            <li data-id="121" data-index="4">                <div class="box-inner">                    <div class="icon-frame"><img src="/img/category-121.jpg" width="64" height="64" alt="动作"></div>                    <h3>网游</h3>                </div>            </li>            <li data-id="144" data-index="5">                <div class="box-inner">                    <div class="icon-frame"><img src="/img/category-144.jpg" width="64" height="64" alt="即时"></div>                    <h3>动作</h3>                </div>            </li>            <li data-id="149" data-index="6">                <div class="box-inner">                    <div class="icon-frame"><img src="/img/category-149.jpg" width="64" height="64" alt="动作"></div>                    <h3>射击</h3>                </div>            </li>            <li data-id="146" data-index="7">                <div class="box-inner">                    <div class="icon-frame"><img src="/img/category-146.jpg" width="64" height="64" alt="角色"></div>                    <h3>角色</h3>                </div>            </li>            <li data-id="148" data-index="8">                <div class="box-inner">                    <div class="icon-frame"><img src="/img/category-148.jpg" width="64" height="64" alt="策略"></div>                    <h3>棋牌</h3>                </div>            </li>        </ul>        <a class="btn-more">查看更多</a>    </div>'
}), define("portal/1.0.0/src/tpl/category-list.tpl", [], function(e, t, n) {
    n.exports = '    <!--classify start-->    <ul class="mod-sort-list clearfix">        <% for(var i=0; i<data.length; i++) { %>        <li data-id="<%=data[i].categoryId%>" data-index="<%=i + 1%>">            <div class="box-inner" data-id="<%=data[i].categoryId%>">                <img src="/img/category-<%=data[i].categoryId%>.jpg" width="64" height="64" alt="<%=data[i].categoryName%>">                <p><%=data[i].categoryName%></p>            </div>        </li>        <% } %>    </ul>    <!--classify end-->'
}), define("portal/1.0.0/src/tpl/recommend-gifts.tpl", [], function(e, t, n) {
    n.exports = '<!-- recommend-gifts start --><div class="mod-recommend-container mod-recommend-gifts">     <h2>礼包推荐</h2>     <ul class="mod-software-list clearfix four">        <% for(var i=0; i<data.length && i<4; i++) { %>         <li data-package="<%=data[i].packageName%>" data-index="<%=i%>">             <div class="box-inner">                 <div class="icon-frame"><img src="<%=data[i].logoUrl%>" width="64" height="64" alt="<%=data[i].name%>"></div>                 <h3><%=data[i].name%></h3>                 <p><%=data[i].giftCount%>个礼包</p>             </div>         </li>         <% } %>     </ul>     <a class="btn-more" href="javascript:void(0)">查看更多</a></div><!-- recommend-gifts end-->'
}), define("portal/1.0.0/src/page/search", [], function(e, t, n) {
    !function() {
        var t, o, a, i = e("portal/1.0.0/src/tff/tff.data"), r = e("portal/1.0.0/src/tff/tff.core.jump"), s = e("portal/1.0.0/src/com/report"), c = e("portal/1.0.0/src/com/SoftManage"), d = e("portal/1.0.0/src/com/LoadBar"), l = (e("when/3.4.4/when"), e("portal/1.0.0/src/plugin/slideup")), u = e("portal/1.0.0/src/plugin/template"), f = u.compile(e("portal/1.0.0/src/tpl/search-default.tpl")), p = u.compile(e("portal/1.0.0/src/tpl/search-match.tpl")), m = u.compile(e("portal/1.0.0/src/tpl/hot-words.tpl")), h = u.compile(e("portal/1.0.0/src/tpl/search-result.tpl")), g = u.compile(e("portal/1.0.0/src/tpl/soft-list.tpl")), v = 0, w = "", y = "", b = function(e, t, n) {
            for (var o = 0, a = e.length; a > o; o++)
                e[o].fileSize = $.formatSize(e[o].fileSize), e[o].score = $.formatScore(e[o].score), e[o].downloadUrl = "dl?ref=" + t + "&packageName=" + e[o].packageName;
            c.addSofts(e, n)
        }, x = function() {
            var e = $(".mod-search-container .btn-clear"), t = {};
            t.t = v = Date.now(), i.invokeAjaxCmd("getHotWords", t).then(function(t) {
                return t.t != v || 0 != t.code ? void console.log("getHotWords error") : ($(".mod-search-result").html(m(t)), void $(".ns-hot-words-container .mod-hot-words a").on("click", function() {
                    $(".mod-search-container .mod-input").val($(this).html()), e.show(), w = "hotword", S($(this).data("index"))
                }))
            }, function(e) {
                console.log(e)
            })
        }, k = function() {
            var e = $(".mod-search-container .btn-clear"), t = $(".mod-search-container .mod-input").val(), n = {};
            return t.length ? (e.show(), n.t = v = Date.now(), n.keyword = $(".mod-search-container .mod-input").val(), void i.invokeAjaxCmd("getSuggestWords", n).then(function(e) {
                return e.t != v || 0 != e.code ? void console.log("getSuggestWords error") : void (e.data && (w = "suggest", e.words = t, b(e.data, "suggest", function() {
                    $(".mod-search-result").html(p(e)), $(".ns-search-match-container .mod-app-list li").on("click", function(e) {
                        var t = $(this).data("package"), n = "p=detail&package=" + t, o = $(this).data("index");
                        if ("A" == e.target.nodeName) {
                            var a = $(this).data("url"), i = $(this).data("version");
                            return s.report("click-download", t, w, o), a = s.addReportParams(a, w, o), void c.operSoft({packageName: t,downloadUrl: a,versionCode: i}, this.querySelector("a"))
                        }
                        r.jumpToPage({hashString: n}, w, o)
                    }, !1), $(".ns-search-match-container .mod-relative-list li").on("click", function() {
                        $(".mod-search-container .mod-input").val($(this).data("text")), S($(this).data("index"))
                    })
                })))
            }, function(e) {
                console.log(e)
            })) : (e.hide(), void x())
        }, S = function(e) {
            var n = $(".mod-search-container .mod-input");
            return "" === n.val().trim() ? void (n[0].placeholder = "请输入关键词") : ($("#search .mod-search-result").empty(), t = !1, o = "", a = 1, j = null, s.report("search", n.value, w, e), void C())
        }, C = function() {
            var e = $(".mod-search-container .mod-input").val(), n = {};
            n.t = v = Date.now(), n.keyword = e, "" != o && (n.reqPage = o), i.invokeAjaxCmd("search", n).then(function(e) {
                return e.t != v ? void console.log("getSuggestWords error") : 0 != e.code ? (console.log(e.msg), void j.updateLoadBar("error")) : void b(e.data, "search", function() {
                    e.hasFound ? ("" == o ? ($(".mod-search-result").html(h(e)), j = new l(L)) : (e.currentPage = o - 1, console.log(e), $(".mod-search-result .ns-result-container .mod-app-list").append(g(e))), j.resetSlide(), j.updateLoadBar("initial"), o = e.nextPage || ++a, t = e.hasMore || e.totalPage >= a, $("#search .mod-app-list > li").on("click", function(e) {
                        var t = $(this).data("package"), n = "p=detail&package=" + t, o = $(this).data("index");
                        if ("A" == e.target.nodeName) {
                            var a = $(this).data("url"), i = $(this).data("version");
                            return s.report("click-download", t, w, o), a = s.addReportParams(a, w, o), void c.operSoft({packageName: t,downloadUrl: a,versionCode: i}, this.querySelector("a"))
                        }
                        r.jumpToPage({hashString: n}, w, o)
                    }), j.updateLoadBar(t ? "pending" : "nomore")) : ($(".mod-search-result").html(f(e)), $("#search .mod-recommend-container .mod-software-list li").on("click", function(e) {
                        var t = $(this).data("package"), n = "p=detail&package=" + t, o = $(this).data("index");
                        if ("A" == e.target.nodeName) {
                            var a = $(this).data("url"), i = $(this).data("version");
                            return s.report("click-download", t, w, o), a = s.addReportParams(a, w, o), void c.operSoft({packageName: t,downloadUrl: a,versionCode: i}, this.querySelector("a"))
                        }
                        r.jumpToPage({hashString: n}, w, o)
                    }))
                })
            }, function(e) {
                console.log(e), j.updateLoadBar("error")
            })
        }, j = null, L = {attachDomId: "search",createrDom: "#search .loadbar",getLoadBarHtml: d.getLoadBarHtml,canDragUp: d.canDragUp,hideLoadBar: d.hideLoadBar,showLoadBar_DragUp: d.showLoadBar_DragUp,showLoadBar_Loading: d.showLoadBar_Loading,updateLoadBar: d.updateLoadBarState,callBackFunc: C}, T = function() {
            var e = function() {
                var e = $(".mod-search-container .btn-search"), t = $(".mod-search-container .btn-clear");
                $("#search").hide(), $(".mod-search-container .mod-input").on("input", k), t.on("click", function() {
                    $(".mod-search-container .mod-input").val(""), t.hide(), x()
                }), e.on("click", function() {
                    w = "search", S()
                }), $("#search footer.mod-footer").html(u("tplCopyRight")), $("#search .btn-return").on("click", function() {
                    r.jumpToPage({hashString: "p=index&g=recommend"})
                }), console.log("search init")
            }, t = function(e) {
                var t = $(".mod-search-container .btn-clear");
                return $("#search").show(), e.isHistoryBack ? ($(".mod-search-container .mod-input").val(y), console.log(e.scrollY), window.scrollTo(0, e.scrollY), void console.log("isHistoryBack")) : (t.hide(), x(), void $(".mod-search-container .mod-input").focus())
            }, n = function() {
                $("#search").hide(), y = $(".mod-search-container .mod-input").val(), $(".mod-search-container .mod-input").val("")
            };
            return {init: e,show: t,hide: n}
        }();
        n.exports = T
    }()
}), define("portal/1.0.0/src/tpl/search-default.tpl", [], function(e, t, n) {
    n.exports = '<!---搜索－未搜索到结果begin--><!--default status start-->    <div class="ns-search-default">        <div class="tips-prompt">抱歉，未找到相关游戏。</div>        <div class="mod-recommend-container">            <h2>小编推荐</h2>            <ul class="mod-software-list clearfix">                <% for(var i=0; i<data.length; i++) { %>                <li data-package="<%=data[i].packageName%>" data-url="<%=data[i].downloadUrl%>" data-version="<%=data[i].versionCode%>">                    <div class="box-inner">                        <img src="<%=data[i].logoUrl%>" width="64" height="64" alt="<%=data[i].name%>">                        <h3><%=data[i].name%></h3>                        <p><%=data[i].categoryName%> <%=data[i].downloadCount%>下载</p>                        <a class="btn-common-s btn-download" data-status="<%=data[i].status%>"><%=data[i].btnText%></a>                    </div>                </li>                <% } %>            </ul>        </div>    </div>    <!--default status end-->'
}), define("portal/1.0.0/src/tpl/search-match.tpl", [], function(e, t, n) {
    n.exports = '<!--搜索 匹配词提示begin--><!--search match start--><div class="ns-search-match-container">    <ul class="mod-app-list">        <% if(typeof data[0] == "object"){ %>        <li data-package="<%=data[0].packageName%>" data-url="<%=data[0].downloadUrl%>" data-version="<%=data[0].versionCode%>" data-index="1">            <div class="img-show"><img src="<%=data[0].logoUrl%>" width="48" height="48" alt="<%=data[0].name%>"></div>            <div class="app-content">                <h3><%=data[0].name%></h3>                <ul class="icon-star-list clearfix">                    <% while(data[0].score[0]--) { %>                        <li class="icon-star-light"></li>                        <% } %>                            <% while(data[0].score[1]--) { %>                                <li class="icon-star-half"></li>                                <% } %>                                    <% while(data[0].score[2]--) { %>                                        <li class="icon-star-disable"></li>                                        <% } %>                </ul>                <p><%=data[0].categoryName%> <%=data[0].fileSize%></p>            </div>            <a class="btn-common-s btn-download" data-status="<%=data[0].status"><%=data[0].btnText%></a>        </li>        <% } %>    </ul>    <ul class="mod-relative-list">        <% if(typeof data[0] == "string"){ %>        <li data-text="<%=data[0]%>" data-index="1">            <a><%=data[0]%></a>        </li>        <% } %>        <% for(var i=1; i<data.length; i++){ %>        <li data-text="<%=data[i]%>" data-index="<%=i + 1%>">            <a><%=data[i]%></a>        </li>        <% } %>    </ul></div><!--search match end-->'
}), define("portal/1.0.0/src/tpl/hot-words.tpl", [], function(e, t, n) {
    n.exports = '<!--hot words start--><div class="ns-hot-words-container">    <nav class="mod-hot-words">        <% for(var i=0; i<data.length; i++){ %>        <a data-index="<%=i + 1%>"><%=data[i]%></a>        <% } %>    </nav>    <!--    <a class="btn-change">换一批</a>    --></div><!--hot words end-->'
}), define("portal/1.0.0/src/tpl/search-result.tpl", [], function(e, t, n) {
    n.exports = '<!--搜索 搜到结果begin-->    <!--result start-->    <div class="ns-result-container">        <!--        <div class="tips-prompt">搜索到<%=data.length%>条结果。</div>        -->        <ul class="mod-app-list">            <% for(i = 0; i < data.length; i++) { %>            <li data-package="<%=data[i].packageName%>" data-url="<%=data[i].downloadUrl%>" data-version="<%=data[i].versionCode%>" data-index="<%=i + 1%>">                <div class="img-show"><img src="<%=data[i].logoUrl%>" width="48" height="48" alt="<%=data[i].name%>"></div>                <div class="app-content">                    <h3><%=data[i].name%></h3>                    <ul class="icon-star-list clearfix">                        <% while(data[i].score[0]--) { %>                            <li class="icon-star-light"></li>                            <% } %>                                <% while(data[i].score[1]--) { %>                                    <li class="icon-star-half"></li>                                    <% } %>                                        <% while(data[i].score[2]--) { %>                                            <li class="icon-star-disable"></li>                                            <% } %>                    </ul>                    <p><%=data[i].categoryName%> <%=data[i].fileSize%></p>                </div>                <a class="btn-common-s btn-download" data-status="<%=data[i].status%>"><%=data[i].btnText%></a>            </li>            <% } %>        </ul>        <!--loading start-->        <div class="loadbar"></div>        <!--loading end-->    </div>    <!--result end-->'
}), define("portal/1.0.0/src/page/mygames", [], function(e, t, n) {
    !function() {
        var t = e("portal/1.0.0/src/plugin/underscore"), o = e("portal/1.0.0/src/tff/tff.data"), a = e("portal/1.0.0/src/tff/tff.core.jump"), r = (e("portal/1.0.0/src/com/report"), e("portal/1.0.0/src/com/SoftManage")), s = e("when/3.4.4/when"), c = e("portal/1.0.0/src/plugin/template"), d = (e("portal/1.0.0/src/tff/tff.core.hash"), e("portal/1.0.0/src/com/config")), l = e("portal/1.0.0/src/com/user"), u = c.compile(e("portal/1.0.0/src/tpl/my-games.tpl")), f = c.compile(e("portal/1.0.0/src/tpl/my-games-login.tpl")), p = 0, m = function(e) {
            !function(e) {
                var t;
                if (0 == e.code && e.packages.length > 0) {
                    for (t = 0; t < e.packages.length; t++)
                        e.packages[t].giftBagUrl = "/" + e.packages[t].packageName;
                    $("#myGameList").html(""), $("#myGameList").append(u(e)), $("#myGameList .runSoft").off("click"), $("#myGameList .runSoft").on("click", function() {
                        var e = $(this).parent().parent().parent().data("packagename");
                        r.runSoft(e)
                    }), $("#myGameList .gotogiftbags").off("click"), $("#myGameList .gotogiftbags").on("click", function() {
                        var e = $(this).parent().parent().parent().data("packagename");
                        $(this).hasClass("disable") || a.jumpToPage({hashString: "p=singlegifts&package=" + e})
                    }), $(".mod-loading").addClass("hidden"), $("#mygames .wrapper").removeClass("hidden")
                } else
                    $("#myGameList").html(c("tplNoGames")), $(".mod-loading").addClass("hidden"), $("#mygames .wrapper").removeClass("hidden")
            }(e[0]), $("#mygames footer.mod-footer").html(c("tplCopyRight"))
        }, h = function(e) {
            return Object.getOwnPropertyNames(e).map(function(t) {
                return t + "=" + (e[t] ? e[t] : "")
            }).join("&")
        }, g = function(e) {
            var t = [];
            return p = +new Date, t[0] = o.invokeAjaxCmd("getMyGames", {}, {type: "post",data: h({data: JSON.stringify(e),t: p})}), s.all(t)
        }, v = function(e) {
            var n = (Date.now(), d.non_game_packages), o = t.difference(e, n);
            e = {packages: []};
            var a;
            for (a = 0; a < o.length; a++)
                e.packages.push({packagename: o[a]});
            return e
        }, w = function(e, t) {
            var n = {};
            window.browser && window.browser.device && window.browser.device.getAllInstalledApps ? browser.device.getAllInstalledApps(e, t) : (n = {code: -500,message: "非QQ浏览器，或者QQ浏览器版本过低",res: {}}, t && t(n))
        }, y = function() {
            var e = function() {
                console.log("my games init.")
            }, t = function(e) {
                $("#mygames").show(), e && e.isHistoryBack || ($("#mygames .wrapper").addClass("hidden"), $(".mod-loading").removeClass("hidden"), l.checkUserLoginStats(function() {
                    var e = $("#userLogin");
                    e.removeClass("userLogin userUnlogin").addClass("userLogin"), $("#userLogin").html(""), $("#userLogin").append(f(l))
                }, function() {
                    var e = $("#userLogin");
                    e.removeClass("userLogin userUnlogin").addClass("userUnlogin"), $("#userLogin").html(""), $("#userLogin").append(f(l))
                }, !0), $("#mygames footer.mod-footer").html(c("tplCopyRight")), $("#userLogin").off("tap"), $("#userLogin").on("tap", function() {
                    $("#userLogin").hasClass("userUnlogin") ? l.showLoginPanel(function() {
                        $("#userLogin").html(""), $("#userLogin").append(f(l)), $("#userLogin").removeClass("userLogin userUnlogin").addClass("userLogin")
                    }, function(e) {
                        -500 == e.code ? ($("#mygames_totast p").html("无法获取账号信息，请安装新版QQ浏览器"), $("#mygames_totast").fadeIn(3e3, function() {
                            $("#mygames_totast").fadeOut(3e3)
                        })) : -300 == callbackRet.code || -301 == callbackRet.code || -303 == callbackRet.code ? ($("#mygames_totast p").html("账号异常，请稍后重试"), $("#mygames_totast").fadeIn(3e3, function() {
                            $("#mygames_totast").fadeOut(3e3)
                        })) : ($("#mygames_totast p").html("账号异常，请稍后重试"), $("#mygames_totast").fadeIn(3e3, function() {
                            $("#mygames_totast").fadeOut(3e3)
                        }))
                    }) : l.switchAccount(function() {
                        var e = $("#userLogin");
                        e.removeClass("userLogin userUnlogin").addClass("userLogin"), $("#userLogin").html(""), $("#userLogin").append(f(l))
                    }, function(e) {
                        -500 == e.code ? ($("#mygames_totast p").html("无法切换账号，请安装新版QQ浏览器"), $("#mygames_totast").fadeIn(3e3, function() {
                            $("#mygames_totast").fadeOut(3e3)
                        })) : (-300 == callbackRet.code || -301 == callbackRet.code || -303 == callbackRet.code) && ($("#mygames_totast p").html("账号异常，请稍后重试"), $("#mygames_totast").fadeIn(3e3, function() {
                            $("#mygames_totast").fadeOut(3e3)
                        }))
                    })
                }), $("#mygames .btn-return").off("click"), $("#mygames .btn-return").on("click", function(e) {
                    e.preventDefault(), a.jumpToPage({hashString: "p=index&g=recommend"})
                }), $("#myGiftBags").off("click"), $("#myGiftBags").on("click", function(e) {
                    e.preventDefault(), a.jumpToPage({hashString: "p=mygifts"})
                }), w(function(e) {
                    for (packages = [], i = 0; i < e.length; i++)
                        packages.push(e[i].packagename);
                    packages = v(packages), g(packages).then(function(e) {
                        m(e)
                    }, function(e) {
                        console.log(e), $(".mod-loading").addClass("hidden"), $("#mygames .wrapper").removeClass("hidden"), $("#mygames .wrapper").html(c("tplTipsError")), $("#mygames .tip-error span").on("click", function() {
                            t()
                        })
                    })
                }, function(e) {
                    e && -500 == e.code ? ($(".mod-loading").addClass("hidden"), $("#mygames .wrapper").removeClass("hidden"), $("#download_prompt").hasClass("hidden") && $("#download_prompt").removeClass("hidden")) : (console.log(e), $(".mod-loading").addClass("hidden"), $("#mygames .wrapper").removeClass("hidden"), $("#mygames .wrapper").html(c("tplTipsError")), $("#mygames .tip-error span").on("click", function() {
                        t()
                    }))
                }))
            }, n = function() {
                $("#mygames").hide(), $(".mod-loading").addClass("hidden"), $("#mygames footer.mod-footer").empty()
            };
            return {init: e,show: t,hide: n}
        }();
        n.exports = y
    }()
}), define("portal/1.0.0/src/plugin/underscore", [], function(e, t, n) {
    (function() {
        var e = this, o = e._, a = Array.prototype, i = Object.prototype, r = Function.prototype, s = a.push, c = a.slice, d = a.concat, l = i.toString, u = i.hasOwnProperty, f = Array.isArray, p = Object.keys, m = r.bind, h = function(e) {
            return e instanceof h ? e : this instanceof h ? void (this._wrapped = e) : new h(e)
        };
        "undefined" != typeof t ? ("undefined" != typeof n && n.exports && (t = n.exports = h), t._ = h) : e._ = h, h.VERSION = "1.7.0";
        var g = function(e, t, n) {
            if (void 0 === t)
                return e;
            switch (null == n ? 3 : n) {
                case 1:
                    return function(n) {
                        return e.call(t, n)
                    };
                case 2:
                    return function(n, o) {
                        return e.call(t, n, o)
                    };
                case 3:
                    return function(n, o, a) {
                        return e.call(t, n, o, a)
                    };
                case 4:
                    return function(n, o, a, i) {
                        return e.call(t, n, o, a, i)
                    }
            }
            return function() {
                return e.apply(t, arguments)
            }
        };
        h.iteratee = function(e, t, n) {
            return null == e ? h.identity : h.isFunction(e) ? g(e, t, n) : h.isObject(e) ? h.matches(e) : h.property(e)
        }, h.each = h.forEach = function(e, t, n) {
            if (null == e)
                return e;
            t = g(t, n);
            var o, a = e.length;
            if (a === +a)
                for (o = 0; a > o; o++)
                    t(e[o], o, e);
            else {
                var i = h.keys(e);
                for (o = 0, a = i.length; a > o; o++)
                    t(e[i[o]], i[o], e)
            }
            return e
        }, h.map = h.collect = function(e, t, n) {
            if (null == e)
                return [];
            t = h.iteratee(t, n);
            for (var o, a = e.length !== +e.length && h.keys(e), i = (a || e).length, r = Array(i), s = 0; i > s; s++)
                o = a ? a[s] : s, r[s] = t(e[o], o, e);
            return r
        };
        var v = "Reduce of empty array with no initial value";
        h.reduce = h.foldl = h.inject = function(e, t, n, o) {
            null == e && (e = []), t = g(t, o, 4);
            var a, i = e.length !== +e.length && h.keys(e), r = (i || e).length, s = 0;
            if (arguments.length < 3) {
                if (!r)
                    throw new TypeError(v);
                n = e[i ? i[s++] : s++]
            }
            for (; r > s; s++)
                a = i ? i[s] : s, n = t(n, e[a], a, e);
            return n
        }, h.reduceRight = h.foldr = function(e, t, n, o) {
            null == e && (e = []), t = g(t, o, 4);
            var a, i = e.length !== +e.length && h.keys(e), r = (i || e).length;
            if (arguments.length < 3) {
                if (!r)
                    throw new TypeError(v);
                n = e[i ? i[--r] : --r]
            }
            for (; r--; )
                a = i ? i[r] : r, n = t(n, e[a], a, e);
            return n
        }, h.find = h.detect = function(e, t, n) {
            var o;
            return t = h.iteratee(t, n), h.some(e, function(e, n, a) {
                return t(e, n, a) ? (o = e, !0) : void 0
            }), o
        }, h.filter = h.select = function(e, t, n) {
            var o = [];
            return null == e ? o : (t = h.iteratee(t, n), h.each(e, function(e, n, a) {
                t(e, n, a) && o.push(e)
            }), o)
        }, h.reject = function(e, t, n) {
            return h.filter(e, h.negate(h.iteratee(t)), n)
        }, h.every = h.all = function(e, t, n) {
            if (null == e)
                return !0;
            t = h.iteratee(t, n);
            var o, a, i = e.length !== +e.length && h.keys(e), r = (i || e).length;
            for (o = 0; r > o; o++)
                if (a = i ? i[o] : o, !t(e[a], a, e))
                    return !1;
            return !0
        }, h.some = h.any = function(e, t, n) {
            if (null == e)
                return !1;
            t = h.iteratee(t, n);
            var o, a, i = e.length !== +e.length && h.keys(e), r = (i || e).length;
            for (o = 0; r > o; o++)
                if (a = i ? i[o] : o, t(e[a], a, e))
                    return !0;
            return !1
        }, h.contains = h.include = function(e, t) {
            return null == e ? !1 : (e.length !== +e.length && (e = h.values(e)), h.indexOf(e, t) >= 0)
        }, h.invoke = function(e, t) {
            var n = c.call(arguments, 2), o = h.isFunction(t);
            return h.map(e, function(e) {
                return (o ? t : e[t]).apply(e, n)
            })
        }, h.pluck = function(e, t) {
            return h.map(e, h.property(t))
        }, h.where = function(e, t) {
            return h.filter(e, h.matches(t))
        }, h.findWhere = function(e, t) {
            return h.find(e, h.matches(t))
        }, h.max = function(e, t, n) {
            var o, a, i = -1 / 0, r = -1 / 0;
            if (null == t && null != e) {
                e = e.length === +e.length ? e : h.values(e);
                for (var s = 0, c = e.length; c > s; s++)
                    o = e[s], o > i && (i = o)
            } else
                t = h.iteratee(t, n), h.each(e, function(e, n, o) {
                    a = t(e, n, o), (a > r || a === -1 / 0 && i === -1 / 0) && (i = e, r = a)
                });
            return i
        }, h.min = function(e, t, n) {
            var o, a, i = 1 / 0, r = 1 / 0;
            if (null == t && null != e) {
                e = e.length === +e.length ? e : h.values(e);
                for (var s = 0, c = e.length; c > s; s++)
                    o = e[s], i > o && (i = o)
            } else
                t = h.iteratee(t, n), h.each(e, function(e, n, o) {
                    a = t(e, n, o), (r > a || 1 / 0 === a && 1 / 0 === i) && (i = e, r = a)
                });
            return i
        }, h.shuffle = function(e) {
            for (var t, n = e && e.length === +e.length ? e : h.values(e), o = n.length, a = Array(o), i = 0; o > i; i++)
                t = h.random(0, i), t !== i && (a[i] = a[t]), a[t] = n[i];
            return a
        }, h.sample = function(e, t, n) {
            return null == t || n ? (e.length !== +e.length && (e = h.values(e)), e[h.random(e.length - 1)]) : h.shuffle(e).slice(0, Math.max(0, t))
        }, h.sortBy = function(e, t, n) {
            return t = h.iteratee(t, n), h.pluck(h.map(e, function(e, n, o) {
                return {value: e,index: n,criteria: t(e, n, o)}
            }).sort(function(e, t) {
                var n = e.criteria, o = t.criteria;
                if (n !== o) {
                    if (n > o || void 0 === n)
                        return 1;
                    if (o > n || void 0 === o)
                        return -1
                }
                return e.index - t.index
            }), "value")
        };
        var w = function(e) {
            return function(t, n, o) {
                var a = {};
                return n = h.iteratee(n, o), h.each(t, function(o, i) {
                    var r = n(o, i, t);
                    e(a, o, r)
                }), a
            }
        };
        h.groupBy = w(function(e, t, n) {
            h.has(e, n) ? e[n].push(t) : e[n] = [t]
        }), h.indexBy = w(function(e, t, n) {
            e[n] = t
        }), h.countBy = w(function(e, t, n) {
            h.has(e, n) ? e[n]++ : e[n] = 1
        }), h.sortedIndex = function(e, t, n, o) {
            n = h.iteratee(n, o, 1);
            for (var a = n(t), i = 0, r = e.length; r > i; ) {
                var s = i + r >>> 1;
                n(e[s]) < a ? i = s + 1 : r = s
            }
            return i
        }, h.toArray = function(e) {
            return e ? h.isArray(e) ? c.call(e) : e.length === +e.length ? h.map(e, h.identity) : h.values(e) : []
        }, h.size = function(e) {
            return null == e ? 0 : e.length === +e.length ? e.length : h.keys(e).length
        }, h.partition = function(e, t, n) {
            t = h.iteratee(t, n);
            var o = [], a = [];
            return h.each(e, function(e, n, i) {
                (t(e, n, i) ? o : a).push(e)
            }), [o, a]
        }, h.first = h.head = h.take = function(e, t, n) {
            return null == e ? void 0 : null == t || n ? e[0] : 0 > t ? [] : c.call(e, 0, t)
        }, h.initial = function(e, t, n) {
            return c.call(e, 0, Math.max(0, e.length - (null == t || n ? 1 : t)))
        }, h.last = function(e, t, n) {
            return null == e ? void 0 : null == t || n ? e[e.length - 1] : c.call(e, Math.max(e.length - t, 0))
        }, h.rest = h.tail = h.drop = function(e, t, n) {
            return c.call(e, null == t || n ? 1 : t)
        }, h.compact = function(e) {
            return h.filter(e, h.identity)
        };
        var y = function(e, t, n, o) {
            if (t && h.every(e, h.isArray))
                return d.apply(o, e);
            for (var a = 0, i = e.length; i > a; a++) {
                var r = e[a];
                h.isArray(r) || h.isArguments(r) ? t ? s.apply(o, r) : y(r, t, n, o) : n || o.push(r)
            }
            return o
        };
        h.flatten = function(e, t) {
            return y(e, t, !1, [])
        }, h.without = function(e) {
            return h.difference(e, c.call(arguments, 1))
        }, h.uniq = h.unique = function(e, t, n, o) {
            if (null == e)
                return [];
            h.isBoolean(t) || (o = n, n = t, t = !1), null != n && (n = h.iteratee(n, o));
            for (var a = [], i = [], r = 0, s = e.length; s > r; r++) {
                var c = e[r];
                if (t)
                    r && i === c || a.push(c), i = c;
                else if (n) {
                    var d = n(c, r, e);
                    h.indexOf(i, d) < 0 && (i.push(d), a.push(c))
                } else
                    h.indexOf(a, c) < 0 && a.push(c)
            }
            return a
        }, h.union = function() {
            return h.uniq(y(arguments, !0, !0, []))
        }, h.intersection = function(e) {
            if (null == e)
                return [];
            for (var t = [], n = arguments.length, o = 0, a = e.length; a > o; o++) {
                var i = e[o];
                if (!h.contains(t, i)) {
                    for (var r = 1; n > r && h.contains(arguments[r], i); r++)
                        ;
                    r === n && t.push(i)
                }
            }
            return t
        }, h.difference = function(e) {
            var t = y(c.call(arguments, 1), !0, !0, []);
            return h.filter(e, function(e) {
                return !h.contains(t, e)
            })
        }, h.zip = function(e) {
            if (null == e)
                return [];
            for (var t = h.max(arguments, "length").length, n = Array(t), o = 0; t > o; o++)
                n[o] = h.pluck(arguments, o);
            return n
        }, h.object = function(e, t) {
            if (null == e)
                return {};
            for (var n = {}, o = 0, a = e.length; a > o; o++)
                t ? n[e[o]] = t[o] : n[e[o][0]] = e[o][1];
            return n
        }, h.indexOf = function(e, t, n) {
            if (null == e)
                return -1;
            var o = 0, a = e.length;
            if (n) {
                if ("number" != typeof n)
                    return o = h.sortedIndex(e, t), e[o] === t ? o : -1;
                o = 0 > n ? Math.max(0, a + n) : n
            }
            for (; a > o; o++)
                if (e[o] === t)
                    return o;
            return -1
        }, h.lastIndexOf = function(e, t, n) {
            if (null == e)
                return -1;
            var o = e.length;
            for ("number" == typeof n && (o = 0 > n ? o + n + 1 : Math.min(o, n + 1)); --o >= 0; )
                if (e[o] === t)
                    return o;
            return -1
        }, h.range = function(e, t, n) {
            arguments.length <= 1 && (t = e || 0, e = 0), n = n || 1;
            for (var o = Math.max(Math.ceil((t - e) / n), 0), a = Array(o), i = 0; o > i; i++, e += n)
                a[i] = e;
            return a
        };
        var b = function() {
        };
        h.bind = function(e, t) {
            var n, o;
            if (m && e.bind === m)
                return m.apply(e, c.call(arguments, 1));
            if (!h.isFunction(e))
                throw new TypeError("Bind must be called on a function");
            return n = c.call(arguments, 2), o = function() {
                if (!(this instanceof o))
                    return e.apply(t, n.concat(c.call(arguments)));
                b.prototype = e.prototype;
                var a = new b;
                b.prototype = null;
                var i = e.apply(a, n.concat(c.call(arguments)));
                return h.isObject(i) ? i : a
            }
        }, h.partial = function(e) {
            var t = c.call(arguments, 1);
            return function() {
                for (var n = 0, o = t.slice(), a = 0, i = o.length; i > a; a++)
                    o[a] === h && (o[a] = arguments[n++]);
                for (; n < arguments.length; )
                    o.push(arguments[n++]);
                return e.apply(this, o)
            }
        }, h.bindAll = function(e) {
            var t, n, o = arguments.length;
            if (1 >= o)
                throw new Error("bindAll must be passed function names");
            for (t = 1; o > t; t++)
                n = arguments[t], e[n] = h.bind(e[n], e);
            return e
        }, h.memoize = function(e, t) {
            var n = function(o) {
                var a = n.cache, i = t ? t.apply(this, arguments) : o;
                return h.has(a, i) || (a[i] = e.apply(this, arguments)), a[i]
            };
            return n.cache = {}, n
        }, h.delay = function(e, t) {
            var n = c.call(arguments, 2);
            return setTimeout(function() {
                return e.apply(null, n)
            }, t)
        }, h.defer = function(e) {
            return h.delay.apply(h, [e, 1].concat(c.call(arguments, 1)))
        }, h.throttle = function(e, t, n) {
            var o, a, i, r = null, s = 0;
            n || (n = {});
            var c = function() {
                s = n.leading === !1 ? 0 : h.now(), r = null, i = e.apply(o, a), r || (o = a = null)
            };
            return function() {
                var d = h.now();
                s || n.leading !== !1 || (s = d);
                var l = t - (d - s);
                return o = this, a = arguments, 0 >= l || l > t ? (clearTimeout(r), r = null, s = d, i = e.apply(o, a), r || (o = a = null)) : r || n.trailing === !1 || (r = setTimeout(c, l)), i
            }
        }, h.debounce = function(e, t, n) {
            var o, a, i, r, s, c = function() {
                var d = h.now() - r;
                t > d && d > 0 ? o = setTimeout(c, t - d) : (o = null, n || (s = e.apply(i, a), o || (i = a = null)))
            };
            return function() {
                i = this, a = arguments, r = h.now();
                var d = n && !o;
                return o || (o = setTimeout(c, t)), d && (s = e.apply(i, a), i = a = null), s
            }
        }, h.wrap = function(e, t) {
            return h.partial(t, e)
        }, h.negate = function(e) {
            return function() {
                return !e.apply(this, arguments)
            }
        }, h.compose = function() {
            var e = arguments, t = e.length - 1;
            return function() {
                for (var n = t, o = e[t].apply(this, arguments); n--; )
                    o = e[n].call(this, o);
                return o
            }
        }, h.after = function(e, t) {
            return function() {
                return --e < 1 ? t.apply(this, arguments) : void 0
            }
        }, h.before = function(e, t) {
            var n;
            return function() {
                return --e > 0 ? n = t.apply(this, arguments) : t = null, n
            }
        }, h.once = h.partial(h.before, 2), h.keys = function(e) {
            if (!h.isObject(e))
                return [];
            if (p)
                return p(e);
            var t = [];
            for (var n in e)
                h.has(e, n) && t.push(n);
            return t
        }, h.values = function(e) {
            for (var t = h.keys(e), n = t.length, o = Array(n), a = 0; n > a; a++)
                o[a] = e[t[a]];
            return o
        }, h.pairs = function(e) {
            for (var t = h.keys(e), n = t.length, o = Array(n), a = 0; n > a; a++)
                o[a] = [t[a], e[t[a]]];
            return o
        }, h.invert = function(e) {
            for (var t = {}, n = h.keys(e), o = 0, a = n.length; a > o; o++)
                t[e[n[o]]] = n[o];
            return t
        }, h.functions = h.methods = function(e) {
            var t = [];
            for (var n in e)
                h.isFunction(e[n]) && t.push(n);
            return t.sort()
        }, h.extend = function(e) {
            if (!h.isObject(e))
                return e;
            for (var t, n, o = 1, a = arguments.length; a > o; o++) {
                t = arguments[o];
                for (n in t)
                    u.call(t, n) && (e[n] = t[n])
            }
            return e
        }, h.pick = function(e, t, n) {
            var o, a = {};
            if (null == e)
                return a;
            if (h.isFunction(t)) {
                t = g(t, n);
                for (o in e) {
                    var i = e[o];
                    t(i, o, e) && (a[o] = i)
                }
            } else {
                var r = d.apply([], c.call(arguments, 1));
                e = new Object(e);
                for (var s = 0, l = r.length; l > s; s++)
                    o = r[s], o in e && (a[o] = e[o])
            }
            return a
        }, h.omit = function(e, t, n) {
            if (h.isFunction(t))
                t = h.negate(t);
            else {
                var o = h.map(d.apply([], c.call(arguments, 1)), String);
                t = function(e, t) {
                    return !h.contains(o, t)
                }
            }
            return h.pick(e, t, n)
        }, h.defaults = function(e) {
            if (!h.isObject(e))
                return e;
            for (var t = 1, n = arguments.length; n > t; t++) {
                var o = arguments[t];
                for (var a in o)
                    void 0 === e[a] && (e[a] = o[a])
            }
            return e
        }, h.clone = function(e) {
            return h.isObject(e) ? h.isArray(e) ? e.slice() : h.extend({}, e) : e
        }, h.tap = function(e, t) {
            return t(e), e
        };
        var x = function(e, t, n, o) {
            if (e === t)
                return 0 !== e || 1 / e === 1 / t;
            if (null == e || null == t)
                return e === t;
            e instanceof h && (e = e._wrapped), t instanceof h && (t = t._wrapped);
            var a = l.call(e);
            if (a !== l.call(t))
                return !1;
            switch (a) {
                case "[object RegExp]":
                case "[object String]":
                    return "" + e == "" + t;
                case "[object Number]":
                    return +e !== +e ? +t !== +t : 0 === +e ? 1 / +e === 1 / t : +e === +t;
                case "[object Date]":
                case "[object Boolean]":
                    return +e === +t
            }
            if ("object" != typeof e || "object" != typeof t)
                return !1;
            for (var i = n.length; i--; )
                if (n[i] === e)
                    return o[i] === t;
            var r = e.constructor, s = t.constructor;
            if (r !== s && "constructor" in e && "constructor" in t && !(h.isFunction(r) && r instanceof r && h.isFunction(s) && s instanceof s))
                return !1;
            n.push(e), o.push(t);
            var c, d;
            if ("[object Array]" === a) {
                if (c = e.length, d = c === t.length)
                    for (; c-- && (d = x(e[c], t[c], n, o)); )
                        ;
            } else {
                var u, f = h.keys(e);
                if (c = f.length, d = h.keys(t).length === c)
                    for (; c-- && (u = f[c], d = h.has(t, u) && x(e[u], t[u], n, o)); )
                        ;
            }
            return n.pop(), o.pop(), d
        };
        h.isEqual = function(e, t) {
            return x(e, t, [], [])
        }, h.isEmpty = function(e) {
            if (null == e)
                return !0;
            if (h.isArray(e) || h.isString(e) || h.isArguments(e))
                return 0 === e.length;
            for (var t in e)
                if (h.has(e, t))
                    return !1;
            return !0
        }, h.isElement = function(e) {
            return !(!e || 1 !== e.nodeType)
        }, h.isArray = f || function(e) {
            return "[object Array]" === l.call(e)
        }, h.isObject = function(e) {
            var t = typeof e;
            return "function" === t || "object" === t && !!e
        }, h.each(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(e) {
            h["is" + e] = function(t) {
                return l.call(t) === "[object " + e + "]"
            }
        }), h.isArguments(arguments) || (h.isArguments = function(e) {
            return h.has(e, "callee")
        }), "function" != typeof /./ && (h.isFunction = function(e) {
            return "function" == typeof e || !1
        }), h.isFinite = function(e) {
            return isFinite(e) && !isNaN(parseFloat(e))
        }, h.isNaN = function(e) {
            return h.isNumber(e) && e !== +e
        }, h.isBoolean = function(e) {
            return e === !0 || e === !1 || "[object Boolean]" === l.call(e)
        }, h.isNull = function(e) {
            return null === e
        }, h.isUndefined = function(e) {
            return void 0 === e
        }, h.has = function(e, t) {
            return null != e && u.call(e, t)
        }, h.noConflict = function() {
            return e._ = o, this
        }, h.identity = function(e) {
            return e
        }, h.constant = function(e) {
            return function() {
                return e
            }
        }, h.noop = function() {
        }, h.property = function(e) {
            return function(t) {
                return t[e]
            }
        }, h.matches = function(e) {
            var t = h.pairs(e), n = t.length;
            return function(e) {
                if (null == e)
                    return !n;
                e = new Object(e);
                for (var o = 0; n > o; o++) {
                    var a = t[o], i = a[0];
                    if (a[1] !== e[i] || !(i in e))
                        return !1
                }
                return !0
            }
        }, h.times = function(e, t, n) {
            var o = Array(Math.max(0, e));
            t = g(t, n, 1);
            for (var a = 0; e > a; a++)
                o[a] = t(a);
            return o
        }, h.random = function(e, t) {
            return null == t && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1))
        }, h.now = Date.now || function() {
            return (new Date).getTime()
        };
        var k = {"&": "&amp;","<": "&lt;",">": "&gt;",'"': "&quot;","'": "&#x27;","`": "&#x60;"}, S = h.invert(k), C = function(e) {
            var t = function(t) {
                return e[t]
            }, n = "(?:" + h.keys(e).join("|") + ")", o = RegExp(n), a = RegExp(n, "g");
            return function(e) {
                return e = null == e ? "" : "" + e, o.test(e) ? e.replace(a, t) : e
            }
        };
        h.escape = C(k), h.unescape = C(S), h.result = function(e, t) {
            if (null == e)
                return void 0;
            var n = e[t];
            return h.isFunction(n) ? e[t]() : n
        };
        var $ = 0;
        h.uniqueId = function(e) {
            var t = ++$ + "";
            return e ? e + t : t
        }, h.templateSettings = {evaluate: /<%([\s\S]+?)%>/g,interpolate: /<%=([\s\S]+?)%>/g,escape: /<%-([\s\S]+?)%>/g};
        var j = /(.)^/, L = {"'": "'","\\": "\\","\r": "r","\n": "n","\u2028": "u2028","\u2029": "u2029"}, T = /\\|'|\r|\n|\u2028|\u2029/g, E = function(e) {
            return "\\" + L[e]
        };
        h.template = function(e, t, n) {
            !t && n && (t = n), t = h.defaults({}, t, h.templateSettings);
            var o = RegExp([(t.escape || j).source, (t.interpolate || j).source, (t.evaluate || j).source].join("|") + "|$", "g"), a = 0, i = "__p+='";
            e.replace(o, function(t, n, o, r, s) {
                return i += e.slice(a, s).replace(T, E), a = s + t.length, n ? i += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : o ? i += "'+\n((__t=(" + o + "))==null?'':__t)+\n'" : r && (i += "';\n" + r + "\n__p+='"), t
            }), i += "';\n", t.variable || (i = "with(obj||{}){\n" + i + "}\n"), i = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + i + "return __p;\n";
            try {
                var r = new Function(t.variable || "obj", "_", i)
            } catch (s) {
                throw s.source = i, s
            }
            var c = function(e) {
                return r.call(this, e, h)
            }, d = t.variable || "obj";
            return c.source = "function(" + d + "){\n" + i + "}", c
        }, h.chain = function(e) {
            var t = h(e);
            return t._chain = !0, t
        };
        var I = function(e) {
            return this._chain ? h(e).chain() : e
        };
        h.mixin = function(e) {
            h.each(h.functions(e), function(t) {
                var n = h[t] = e[t];
                h.prototype[t] = function() {
                    var e = [this._wrapped];
                    return s.apply(e, arguments), I.call(this, n.apply(h, e))
                }
            })
        }, h.mixin(h), h.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(e) {
            var t = a[e];
            h.prototype[e] = function() {
                var n = this._wrapped;
                return t.apply(n, arguments), "shift" !== e && "splice" !== e || 0 !== n.length || delete n[0], I.call(this, n)
            }
        }), h.each(["concat", "join", "slice"], function(e) {
            var t = a[e];
            h.prototype[e] = function() {
                return I.call(this, t.apply(this._wrapped, arguments))
            }
        }), h.prototype.value = function() {
            return this._wrapped
        }, "function" == typeof define && define.amd && define("underscore", [], function() {
            return h
        })
    }).call(this)
}), define("portal/1.0.0/src/com/config", [], function(e, t) {
    !function() {
        var e = ["com.huawei.floatMms", "com.android.defcontainer", "com.tencent.mm", "com.example.android.notepad", "jp.co.optim.oruhuwe01", "com.huawei.android.powermonitor", "com.android.contacts", "com.huawei.wifihotspot", "cn.com.chinatelecom.account", "com.huawei.membranetouch", "com.huawei.hwid", "com.ikm", "com.huawei.mmitest2", "com.android.phone", "com.android.calculator2", "com.android.phone.recorder", "com.huawei.phoneservice", "com.huawei.android.airsharingcast", "com.android.htmlviewer", "com.huawei.powergenie", "com.huawei.android.internal.app", "com.google.android.gsf.login", "com.android.providers.calendar", "com.android.bluetooth", "com.huawei.bluetooth", "com.android.calendar", "com.android.browser", "com.huawei.magnifier", "com.android.huawei.floatNotepad", "com.jingdong.app.mall", "com.android.huawei.countlapsetime", "com.vlife.huawei.wallpaper", "com.android.providers.downloads.ui", "com.huawei.icos.ar", "com.android.documentsui", "com.android.sharedstoragebackup", "com.android.vpndialogs", "com.Qunar", "com.android.huawei.projectmenu", "com.huawei.gamebox", "com.android.providers.media", "cn.com.cmbc.mbank", "com.huawei.android.pushagent", "com.huawei.motionservice", "com.android.certinstaller", "com.huawei.hwstartupguide", "com.google.android.gms", "com.android.dreams.phototable", "com.android.settings", "org.simalliance.openmobileapi.service", "com.dianping.t", "com.iflytek.speechcloud", "com.huawei.dataservicediagnose", "com.huawei.systemmanager", "com.eg.android.AlipayGphone", "org.zhiboba.sports", "com.android.gallery3d", "com.baidu.input_huawei", "com.android.musicvis", "com.android.exchange", "com.youdao.dict", "myworkspace.mobile.clients.android", "com.android.wallpaper.livepicker", "com.huawei.wallet", "com.huawei.camera", "com.tencent.map", "com.huawei.android.hwouc", "com.qiyi.video", "com.android.packageinstaller", "com.android.providers.telephony", "com.svox.pico", "com.huawei.mmifunction", "com.tencent.rtxlite", "com.android.noisefield", "com.thestore.main", "com.android.email", "com.android.mediacenter", "com.nuance.swype.emui", "com.baidu.BaiduMap", "com.huawei.android.dsdscardmanager", "com.android.wallpapercropper", "com.android.location.fused", "com.android.backupconfirm", "com.tencent.android.qqdownloader", "com.android.magicsmoke", "com.huawei.android.AutoRegSms", "com.android.providers.settings", "com.huawei.android.totemweather", "com.huawei.hwvplayer", "com.huawei.android.karaokeeffect", "com.android.providers.downloads", "com.huawei.ims", "com.huawei.qrcode.dispatcher", "com.huawei.android.airsharing", "com.android.phasebeam", "com.tencent.mtt", "com.android.hwmirror", "com.android.soundrecorder", "com.cootek.smartdialer_oem_module", "com.android.huawei.floatCalculator", "com.huawei.android.ds", "com.android.inputmethod.latin", "com.huawei.cust.android.phone", "com.android.proxyhandler", "com.huawei.privacymode", "com.amap.android.location", "com.futurewei.ecens.mocalite", "com.huawei.KoBackup", "com.android.inputdevices", "com.huawei.transitionengine", "com.android.wallpaper.holospiral", "com.huawei.lcagent", "com.lufax.android", "com.android.stk", "com.huawei.omacp", "com.huawei.android.airsharingcastclient", "org.zhiboba.plugins", "com.android.providers.userdictionary", "com.tencent.mobileqq", "com.android.pacprocessor", "com.huawei.android.calendarFloat", "com.baidu.searchbox_huawei", "com.huawei.android.nff", "androidhwext", "com.netease.newsreader.activity", "com.android.galaxy4", "com.vmall.client", "com.android.printspooler", "android", "com.huawei.android.ctdownloader", "com.android.providers.contacts", "com.huawei.android.apkbatchinstall", "com.android.protips", "com.android.externalstorage", "com.huawei.android.thememanager", "com.android.providers.applications", "com.android.dreams.basic", "com.huawei.bd", "com.android.incallui", "com.huawei.android.hwpay", "com.android.vending", "com.android.apps.tag", "com.huawei.android.FMRadio", "com.android.share.hw.edit", "com.huawei.android.FloatTasks", "com.huawei.android.dualcardwidget", "com.android.systemui", "com.huawei.vassistant", "com.android.keychain", "com.android.smspush", "com.huawei.remoteassistant", "com.huawei.regionalphone", "com.huawei.vdrive", "com.android.wallpaper", "com.ub.main", "com.android.providers.streaming", "fq.router2", "com.cmbchina.ccd.pluto.cmbActivity", "com.android.spare_parts", "com.android.deskclock", "com.tencent.qqmusic", "com.huawei.appmarket", "com.google.android.gsf", "com.huawei.gallery.photoshare", "com.huawei.hidisk", "com.tencent.rdm", "com.huawei.shine.camerarc", "com.android.keyguard", "com.android.facelock", "com.android.chrome", "com.alipay.mobile.scanx", "com.alipay.android.app", "cmb.pb", "com.android.shell", "com.huawei.android.wfdft", "com.taobao.taobao", "com.huawei.android.launcher", "com.miui.gallery", "com.UCMobile", "com.android.quicksearchbox", "com.cubic.autohome.skin.night", "jp.co.fenrir.android.sleipnir", "cn.xiaochuankeji.wread", "com.tencent.navsns", "com.miui.player", "com.xiaomi.mitunes", "com.miui.guardprovider", "com.nvidia.NvCPLSvc", "com.qq.qcloud", "com.trafficctr.miui", "com.miui.yellowpage", "com.milink.service", "com.miui.backup", "com.miui.antispam", "com.miui.cloudservice", "com.miui.notes", "com.android.onetimeinitializer", "com.miui.providers.weather", "com.android.mms", "com.qihoo.appstore", "com.android.provision", "com.miui.tsmclient", "com.miui.voiceassist", "com.cleanmaster.sdk", "com.miui.cit", "com.android.thememanager", "com.miui.compass", "com.android.updater", "com.android.fileexplorer", "com.lbe.security.miui", "com.sinovatech.unicom.ui", "com.xiaomi.o2o", "com.miui.networkassistant", "com.xiaomi.gamecenter", "com.miui.home", "com.miui.cloudappbackup", "com.ijinshan.browser_fast", "com.android.browser.provider", "com.miui.fmradio", "com.android.musicfx", "com.google.android.inputmethod.pinyin", "com.xiaomi.tag", "com.miui.whetstone", "com.xiaomi.account", "com.sohu.inputmethod.sogou", "com.miui.barcodescanner", "com.mipay.wallet", "com.baidu.appsearch", "com.miui.bugreport", "com.miui", "com.apusapps.launcher", "com.android.nfc", "com.miui.miwallpaper", "com.miui.framework", "com.miui.weather2", "com.xiaomi.market", "com.nvidia.NvWFDSvc", "com.miui.securitycenter", "com.cubic.autohome", "com.android.camera", "com.xiaomi.smarthome", "com.nvwfd.server.internal.protocols", "com.xiaomi.gamecenter.sdk.service", "com.qcom.matcli", "com.xiaomi.xmsf", "com.miui.sdk", "com.xiaomi.payment", "com.miui.video", "com.apptizen.voawordbook", "org.videolan.vlc.betav7neon", "com.google.android.apps.gesturesearch", "com.jiubang.goscreenlock.plugin.lockscreen", "com.google.android.apps.docs.editors.docs", "com.google.android.launcher", "com.google.android.apps.cloudprint", "com.google.android.googlequicksearchbox", "com.google.android.apps.fitness", "com.android.providers.partnerbookmarks", "com.android.managedprovisioning", "com.tencent.portfolio", "com.google.android.play.games", "com.google.android.marvin.talkback", "com.google.android.feedback", "com.google.android.inputmethod.latin", "com.google.android.onetimeinitializer", "com.dianping.v1", "com.google.android.inputmethod.korean", "com.qualcomm.timeservice", "com.qualcomm.qcrilmsgtunnel", "com.google.android.apps.photos", "com.starbucks.cn", "com.redbend.vdmc", "cn.amazon.mShop.android", "com.google.android.ears", "com.google.android.apps.maps", "com.google.android.apps.docs.editors.sheets", "com.google.android.street", "com.tencent.lightalk", "com.android.server.telecom", "com.google.android.tag", "com.google.android.apps.translate", "com.estrongs.android.pop", "com.google.android.gm", "com.google.android.gallery3d", "com.google.android.apps.plus", "com.google.android.apps.inputmethod.hindi", "com.android.phasebeamorange", "com.google.android.webview", "com.pingan.pabank.activity", "com.amazon.kindle", "com.tencent.androidqqmail", "com.android.cellbroadcastreceiver", "com.google.android.youtube", "com.coomix.app.bus", "com.google.android.gm.exchange", "com.google.android.apps.inbox", "com.google.android.music", "com.coffeebeanventures.easyvoicerecorder", "com.google.android.email", "com.google.android.apps.enterprise.dmagent", "com.google.android.apps.walletnfcrel", "com.google.android.talk", "com.lge.update", "com.google.android.androidforwork", "com.google.android.deskclock", "com.google.android.apps.magazines", "com.google.android.setupwizard", "com.android36kr.app", "com.google.android.apps.genie.geniewidget", "com.google.android.calendar", "com.sankuai.meituan", "com.google.android.contacts", "com.microsoft.skydrive", "com.qualcomm.shutdownlistner", "jp.co.omronsoft.iwnnime.ml", "com.google.android.dialer", "com.google.android.videos", "com.google.android.syncadapters.contacts", "com.netease.vopen", "com.android.captiveportallogin", "com.google.android.backuptransport", "com.google.android.configupdater", "com.google.android.keep", "com.google.earth", "com.google.android.apps.docs.editors.slides", "de.zorillasoft.musicfolderplayer", "com.google.android.GoogleCamera", "com.google.android.apps.docs", "com.android.mms.service", "com.google.android.tts", "com.google.android.apps.books", "com.lge.SprintHiddenMenu", "com.evernote.world", "com.google.android.partnersetup", "fm.xiami.main", "com.qualcomm.fastdormancy", "com.hunantv.imgo.activity", "com.oppo.weather", "com.oppo.wallpaper", "com.oppo.drivemode", "com.oppo.widget.smallweather", "me.chunyu.ChunyuDoctor", "com.oppo.free.weather", "com.nearme.gamecenter", "com.oppo.gallery3d", "com.tencent.qqpimsecure", "com.oppo.liveweather.newsnow", "com.nearme.themespace", "com.oppo.safe", "com.oppo.oppologkit", "cn.segi.uhome", "com.oppo.LockScreenGlassBoard", "com.ct.client", "com.oppo.logkitsdservice", "com.tencent.news", "com.oppo.reader", "com.oppo.settings", "com.nearme.ocloud", "com.oppo.liveweather.newthundershower", "com.oppo.voicesearch", "com.ubivelox.bluelink_c", "com.oppo.liveweather.newdandelion", "com.oppo.globalthemecontentprovider", "com.tencent.qqpim", "com.nearme.note", "com.oppo.powermanager", "com.oppo.music", "com.oppo.LockScreenWeather", "com.umetrip.android.msky.app", "com.oppo.launcherSystem", "com.oppo.secure", "com.oppo.trafficmonitor", "com.oppo.speechassist.engine", "com.oppo.flashlight", "com.oppo.scratch", "com.android.dialer", "com.ss.android.article.news", "com.oppo.exserviceui", "eyesight.service.service", "com.oppo.autotest", "com.oppo.findmyphone", "com.tc.cm", "com.uroad.yxw", "com.oppo.speechassist", "com.oppo.widget.musicpage", "com.oppo.vistormode", "com.oppo.liveweather.newfog", "com.oppo.c2u", "org.codeaurora.btmultisim", "com.oppo.community", "com.nearme.themespacelib", "com.wangzhi.MaMaHelp", "com.nearme.ds", "com.oppo.providers.permissions", "com.oppo.gesture", "com.oppo.oppofreescreenshots", "com.oppo.weather.locationservice", "com.autonavi.xmgd.navigator", "com.nearme.romupdate", "com.kanchufang.privatedoctor", "com.coloros.wallpapers", "com.taobao.trip", "com.oppo.safeprovider", "com.suning.mobile.ebuy", "im.yixin", "com.etao.kaka.oppo", "com.oppo.phonenoareainquire", "com.oppo.service.account", "com.sdu.didi.psnger", "com.douban.book.reader", "com.douban.radio", "com.oppo.bluetoothtest", "com.qualcomm.networksetting", "cn.futu.trader", "com.qualcomm.qcom_qmi", "com.oppo.activation", "com.oppo.daydreamvideo", "oppo", "com.oppo.widget.digitalclock", "com.oppo.blacklist", "com.oppo.systemhelper", "com.oppo.liveweather.newhaze", "com.oppo.ota", "com.monotype.android.font.mheigb18030cmedium", "com.qualcomm.location.XT", "com.oppo.market", "com.oppo.card", "com.oppo.taskmanager", "com.oppo.holidaymode", "com.chinamworld.bocmbci", "com.qualcomm.atfwd", "com.oppo.usercenter", "com.sohu.newsclient", "com.icbc", "com.sfbest.mapp", "com.hipu.yidian", "com.wacai365", "com.oppo.preventmode", "com.oppo.sdcardservice", "com.qualcomm.gsmtuneaway", "com.oppo.shakeup.custom", "com.dsi.ant.server", "com.android.dlna.service", "com.szchmtech.parkingfee", "com.haier.ics", "com.oppo.virusdetect", "com.color.uiengine", "com.oppo.backuprestore", "com.sohu.sohuvideo", "com.itotem.traffic.broadcasts", "com.jtjr99.jiayoubao", "com.oppo.kinect", "com.color.enginelock", "com.oppo.opposhakegestureservice", "com.youdao.huihui.deals", "com.oppo.widget.moodalbum", "com.oppo.gestureguide", "com.oppo.filemanager", "com.oppo.motionsensing", "com.oppo.liveweather.newsunny", "com.nearme.statistics.rom", "com.oppo.backuprestore.remoteservice", "com.nearme.sync", "com.tmall.wireless", "com.oppo.colorlock", "com.autonavi.minimap", "com.xinyy.parkingwe", "oppo.multimedia.soundrecorder", "com.oppo.usbdebug", "com.oppo.liveweather.newcloudy", "com.oppo.usbselection", "com.oppo.newsimdetect", "com.douban.frodo", "com.oppo.compass", "com.oppo.bootreg", "com.oppo.liveweather.newrain", "com.oppo.camera", "com.oppo.leather", "com.wumii.android.mimi", "org.codeaurora.bluetooth", "com.oppo.proxykeyguard", "com.qualcomm.location", "com.baidu.map.location", "com.qualcomm.wfd.service", "com.chediandian.customer", "com.oppo.datadialog", "com.sina.weibo", "com.oppo.alarmclock", "com.oppo.launcher", "com.tencent.qrobotmini", "com.douban.movie", "com.oppo.travel", "com.baidu.netdisk", "com.oppo.purebackground", "com.oppo.operationManual", "com.sohu.inputmethod.sogouoem", "com.oppo.widget.calendar", "com.oppo.video", "com.android.engineeringmode"];
        t.non_game_packages = e
    }()
}), define("portal/1.0.0/src/tpl/my-games.tpl", [], function(e, t, n) {
    n.exports = '<h2>我的游戏</h2><ul class="mod-game-app-list"><% for(var i=0; i<packages.length; i++) { %> <li data-index="<%=i + 1%>" data-packagename="<%=packages[i].packageName%>">     <div class="icon-frame"><a href="#"><img src="<%=packages[i].imgUrl%>" width="64" height="64" alt="<%=packages[i].title%>"></a></div>     <div class="game-app-content">         <div class="game-app-header">             <h3><a href="javascript:void(0)"><%=packages[i].title%></a></h3>             <a href="javascript:void(0)" class="btn-common-s runSoft">启动</a>         </div>         <div class="game-app-operate">             <% if(packages[i].bgiftbag == 1){ %>                <div class="icon-gift gotogiftbags"><a>礼包</a></div>             <% }else{ %>                <div class="icon-gift disable gotogiftbags"><a>礼包</a></div>             <% } %>             <% if(packages[i].articleUrl!=""){ %>                <div class="icon-raiders"><a data-articleurl="<%=packages[i].articleUrl%>" href="<%=packages[i].articleUrl%>">攻略</a></div>             <% }else{ %>                <div class="icon-raiders disable"><a href="javascript:void(0)">攻略</a></div>             <% } %>             <% if(packages[i].bbsUrl!=""){ %>                <div class="icon-forum"><a data-bbsurl="<%=packages[i].bbsUrl%>" href="<%=packages[i].bbsUrl%>">论坛</a></div>             <% }else{ %>                <div class="icon-raiders disable"><a href="javascript:void(0)">论坛</a></div>             <% } %>         </div>     </div> </li><% } %></ul>'
}), define("portal/1.0.0/src/tpl/my-games-login.tpl", [], function(e, t, n) {
    n.exports = '<% if(isLogin){ %>	<!--login after-->	<a href="javascript:void(0)" class="mod-box mod-login-container after">	    <div class="img-avatar">	    	<% if(userInfo.avatar!=""){ %>	    	<img src="<%=userInfo.avatar%>" alt="用户头像">	    	<% }else{ %>	    	<img src="../img/avatar-default.jpg" alt="用户头像">	    	<% } %>	    </div>	    <div class="login-after">	        <p class="usr-name"><%=userInfo.nickname%></p>	        <p>来自<%=(userInfo.origin==1?"QQ":"微信")%></p>	        <!--<p>点击头像可以切换账号</p>-->	    </div>  	</a>	<!--login after--><% }else{ %>	<!--login start-->	<a href="javascript:void(0)" class="mod-box mod-login-container">	    <div class="img-avatar"><img src="../img/avatar-default.jpg" alt="用户头像"></div>	    <div class="login-content">还未登陆，点此登录</div>  	</a>	<!--login end--><% } %>'
}), define("portal/1.0.0/src/page/getgifts", [], function(e, t, n) {
    !function() {
        var t, o, a, i = e("portal/1.0.0/src/tff/tff.data"), r = e("portal/1.0.0/src/tff/tff.core.jump"), s = e("portal/1.0.0/src/plugin/template"), c = (e("portal/1.0.0/src/com/SoftManage"), e("when/3.4.4/when")), d = e("portal/1.0.0/src/com/LoadBar"), l = e("portal/1.0.0/src/plugin/slideup"), u = s.compile(e("portal/1.0.0/src/tpl/get-gifts.tpl")), f = 0, p = function(e) {
            0 == e.code && e.data.length > 0 ? (e.currentPage = o - 1, $("#allGiftsList").append(u(e)), $(".mod-loading").addClass("hidden"), $("#allGifts .wrapper").removeClass("hidden"), $("#allGifts .mod-gift-info").off("click"), $("#allGifts .mod-gift-info").on("click", function() {
                var t = $(this).data("index"), n = e.data[t].packageName;
                r.jumpToPage({hashString: "p=detail&package=" + n}, "singlegifts", t)
            }), $("#allGifts .mod-gift-detail-list > li").off("click"), $("#allGifts .mod-gift-detail-list > li").on("click", function() {
                var e = $(this).data("index"), t = $(this).data("giftbagid");
                r.jumpToPage({hashString: "p=giftbagdetail&giftbagid=" + t}, "giftbagdetail", e)
            })) : ($("#allGiftsList").html(s("tplNoSingleGiftBag")), $(".mod-loading").addClass("hidden"), $("#allGifts .wrapper").removeClass("hidden"))
        }, m = function(e, n) {
            o = e.nextPage || ++a, t = e.hasMore || e.totalPage >= a, n()
        }, h = function() {
            var e = c.defer();
            return f = +new Date, i.invokeAjaxCmd("gift-bag", {c: "all",reqPage: o,t: f}).then(function(n) {
                return n.t != f ? void console.log("timestamp mismatch!") : 0 != n.code ? (console.log(n.msg), void g.updateLoadBar("error")) : (g.resetSlide(), void m(n, function() {
                    p(n), g.updateLoadBar(t ? "pending" : "nomore"), e.resolve()
                }))
            }).catch(function(t) {
                console.log(t), g.updateLoadBar("error"), e.reject(t)
            }), e.promise
        }, g = {}, v = {attachDomId: "allGifts",createrDom: "#allGifts .loadbar",getLoadBarHtml: d.getLoadBarHtml,canDragUp: d.canDragUp,hideLoadBar: d.hideLoadBar,showLoadBar_DragUp: d.showLoadBar_DragUp,showLoadBar_Loading: d.showLoadBar_Loading,updateLoadBar: d.updateLoadBarState,callBackFunc: h}, w = function() {
            var e = function() {
                console.log("all-gifts init."), g = new l(v), g.updateLoadBar("initial")
            }, n = function(e) {
                $("#allGifts").show(), $("#allGifts .btn-return").on("click", function() {
                    r.jumpToPage({hashString: "p=index&g=recommend"})
                }), e && e.isHistoryBack || e.isHistoryBack || ($("#allGiftsList").html(""), $("#allGifts .wrapper").addClass("hidden"), $(".mod-loading").removeClass("hidden"), t = !1, o = "", a = 1, h().then(function() {
                    $(".mod-loading").addClass("hidden"), $("#allGifts .wrapper").removeClass("hidden")
                }, function(e) {
                    console.log(e), $(".mod-loading").addClass("hidden"), $("#allGifts .wrapper").removeClass("hidden"), $("#allGifts .wrapper").html(s("tplTipsError")), $("#allGifts .tip-error span").on("click", function() {
                        n()
                    })
                }))
            }, i = function() {
                $("#allGifts").hide(), $(".mod-loading").addClass("hidden"), $("#allGifts footer.mod-footer").empty()
            };
            return {init: e,show: n,hide: i}
        }();
        n.exports = w
    }()
}), define("portal/1.0.0/src/tpl/get-gifts.tpl", [], function(e, t, n) {
    n.exports = '<!--gift start--><% for(var i=0; i<data.length; i++){ %> <div class="mod-box mod-gift-item">    <div class="mod-gift-info" data-index="<%=i%>">        <div class="img-show"><img src="<%=data[i].game.logoUrl%>" width="48" height="48" alt="<%=data[i].game.name%>"></div>        <div class="gift-info-content"><%=data[i].game.name%></div>    </div>     <ul class="mod-gift-detail-list">        <% for(var j=0; j<data[i].giftBags.length; j++){ %>        <li data-giftbagid="<%=data[i].giftBags[j].id%>" data-index="<%=i%>">           <div class="gift-detail-content">               <h3><%=data[i].giftBags[j].title%></h3>               <p><%=data[i].giftBags[j].detail%></p>           </div>           <a class="btn-common-s">领取</a>        </li>        <% } %>    </ul>       </div><% } %><!--gift end-->'
}), define("portal/1.0.0/src/page/mygifts", [], function(e, t, n) {
    !function() {
        var t, o, a = e("portal/1.0.0/src/tff/tff.data"), i = e("portal/1.0.0/src/tff/tff.core.jump"), r = e("portal/1.0.0/src/plugin/template"), s = (e("portal/1.0.0/src/com/SoftManage"), e("when/3.4.4/when")), c = e("portal/1.0.0/src/com/user"), d = e("portal/1.0.0/src/com/LoadBar"), l = e("portal/1.0.0/src/plugin/slideup"), u = r.compile(e("portal/1.0.0/src/tpl/my-gifts.tpl")), f = r.compile(e("portal/1.0.0/src/tpl/my-gifts-blank.tpl")), p = 0, m = function(e) {
            for (var n = 0; n < e.length; n++)
                if (e[n].t != p)
                    return void console.log("ajax response meta mismatch!");
            0 == e.code && e.data.length > 0 ? ($("#myGiftsList").append(u(e)), $(".mod-loading").addClass("hidden"), $("#myGifts .wrapper").removeClass("hidden"), $("#myGifts .gift-info-list").on("click", function() {
                var t = $(this).data("index"), n = e.data[t].id;
                i.jumpToPage({hashString: "p=giftbagdetail&giftbagid=" + n}, "giftbagdetail", t)
            })) : (t = !1, $("#myGiftsList").html(""), $("#myGiftsList").append(f(e)), $("#myGiftsBlank").css("height", $(document.body).height() - 48 + "px"), $("#myGiftsNoLogin").hide(), $("#myGiftsNoGifts").show(), $(".mod-loading").addClass("hidden"), $("#myGifts .wrapper").removeClass("hidden"), $("#myGifts .mod-get-gift").on("click", function() {
                i.jumpToPage({hashString: "p=getgifts"})
            }))
        }, h = function(e, n) {
            o = e.nextIndex, t = e.hasMore || -1 != e.nextIndex, n()
        }, g = function() {
            var e = s.defer();
            return p = +new Date, a.invokeAjaxCmd("gift-bag", {c: "my",qbid: c.qbid,uin: c.userInfo.uin,token: c.sid,type: c.userInfo.origin,reqIndex: o,t: p}).then(function(n) {
                v.resetSlide(), h(n, function() {
                    n.currentPage = o - 1, m(n), v.updateLoadBar(t ? "pending" : "nomore"), e.resolve()
                })
            }).catch(function(t) {
                console.log(t), v.updateLoadBar("error"), e.reject(t)
            }), e.promise
        }, v = {}, w = {attachDomId: "myGifts",createrDom: "#myGifts .loadbar",getLoadBarHtml: d.getLoadBarHtml,canDragUp: d.canDragUp,hideLoadBar: d.hideLoadBar,showLoadBar_DragUp: d.showLoadBar_DragUp,showLoadBar_Loading: d.showLoadBar_Loading,updateLoadBar: d.updateLoadBarState,callBackFunc: g}, y = function() {
            var e = function() {
                console.log("my-gifts init."), v = new l(w), v.updateLoadBar("initial")
            }, n = function(e) {
                $("#myGifts").show(), e && e.isHistoryBack || ($("#myGifts .wrapper").addClass("hidden"), $(".mod-loading").removeClass("hidden"), $("#myGifts .btn-return").on("click", function() {
                    i.jumpToPage({hashString: "p=mygames"})
                }), $("#myGiftsList").html(""), t = !1, o = "", c.checkUserLoginStats(function() {
                    g().then(function() {
                        $(".mod-loading").addClass("hidden"), $("#myGifts .wrapper").removeClass("hidden")
                    }, function(e) {
                        console.log(e), $(".mod-loading").addClass("hidden"), $("#myGifts .wrapper").removeClass("hidden"), $("#myGifts .wrapper").html(r("tplTipsError")), $("#myGifts .tip-error span").on("click", function() {
                            n()
                        })
                    })
                }, function() {
                    $("#myGiftsList").append(f()), $("#myGiftsBlank").css("height", $(document.body).height() - 48 + "px"), $("#myGiftsNoGifts").hide(), $("#myGiftsNoLogin").show(), $(".mod-loading").addClass("hidden"), $("#myGifts .wrapper").removeClass("hidden"), $("#myGifts .mod-get-gift").on("click", function() {
                        i.jumpToPage({hashString: "p=mygames"})
                    })
                }, !0))
            }, a = function() {
                $("#myGifts").hide(), $(".mod-loading").addClass("hidden"), $("#myGifts footer.mod-footer").empty()
            };
            return {init: e,show: n,hide: a}
        }();
        n.exports = y
    }()
}), define("portal/1.0.0/src/tpl/my-gifts.tpl", [], function(e, t, n) {
    n.exports = '<ul>	<% for(var i=0; i<data.length; i++){ %>		<li data-index="<%=i%>" class="gift-info-list">		  <div class="img-show"><img src="<%=data[i].icon%>" width="48" height="48" alt="<%=data[i].title%>"></div>		  <div class="gift-info-content">		    <p class="title"><%=data[i].title%></p>		    <!-- <p><%=data[i].detail%></p> -->		    <p>激活码:<%=data[i].cdkey%></p>		  </div>		</li>	<% } %></ul>'
}), define("portal/1.0.0/src/tpl/my-gifts-blank.tpl", [], function(e, t, n) {
    n.exports = '<div class="mod-get-gift" id="myGiftsBlank">	<div class="content no-login" id="myGiftsNoLogin">	  <p>登录浏览器，为您同步礼包</p>	  <p><a >登录QQ浏览器</a></p>	</div>	<div class="content login" id="myGiftsNoGifts">	  <p>暂无礼包</p>	  <p><a id="getGiftsTip">领取礼包</a></p>	</div></div>'
}), define("portal/1.0.0/src/page/singlegifts", [], function(e, t, n) {
    !function() {
        var t = e("portal/1.0.0/src/tff/tff.data"), o = e("portal/1.0.0/src/tff/tff.core.jump"), a = e("portal/1.0.0/src/plugin/template"), i = e("when/3.4.4/when"), r = e("portal/1.0.0/src/tff/tff.core.hash"), s = a.compile(e("portal/1.0.0/src/tpl/single-gifts.tpl")), c = function(e) {
            !function(e) {
                0 == e.code ? ($("#singleGiftsList").html(""), $("#singleGiftsList").append(s(e)), $(".mod-loading").addClass("hidden"), $("#singleGifts .wrapper").removeClass("hidden"), $("#singleGifts .mod-gift-detail-list-li").on("click", function() {
                    var t = $(this).data("index"), n = e.data.giftBags[t].id;
                    o.jumpToPage({hashString: "p=giftbagdetail&giftbagid=" + n}, "giftbagdetail", t)
                })) : ($("#singleGiftsList").html(a("tplNoSingleGiftBag")), $(".mod-loading").addClass("hidden"), $("#singleGifts .wrapper").removeClass("hidden"))
            }(e[0])
        }, d = function() {
            var e = [];
            _t = +new Date;
            {
                var n = r.getHashObj()["package"];
                r.getHashObj().reqPage
            }
            return e[0] = t.invokeAjaxCmd("gift-bag", {c: "game",game: n,t: _t}), i.all(e)
        }, l = function() {
            var e = function() {
                console.log("single-gifts init.")
            }, t = function(e) {
                $("#singleGifts").show(), e && e.isHistoryBack || ($("#singleGifts .btn-return").on("click", function() {
                    window.history.back()
                }), $("#singleGifts .wrapper").addClass("hidden"), $(".mod-loading").removeClass("hidden"), d().then(function(e) {
                    c(e), $(".mod-loading").addClass("hidden"), $("#singleGifts .wrapper").removeClass("hidden")
                }, function(e) {
                    console.log(e), $(".mod-loading").addClass("hidden"), $("#singleGifts .wrapper").removeClass("hidden"), $("#singleGifts .wrapper").html(a("tplTipsError")), $("#singleGifts .tip-error span").on("click", function() {
                        t()
                    })
                }))
            }, n = function() {
                $("#singleGifts").hide(), $(".mod-loading").addClass("hidden"), $("#singleGifts footer.mod-footer").empty()
            };
            return {init: e,show: t,hide: n}
        }();
        n.exports = l
    }()
}), define("portal/1.0.0/src/tpl/single-gifts.tpl", [], function(e, t, n) {
    n.exports = '<!--gift start--> <div class="mod-box mod-gift-item single">    <div class="mod-gift-info">        <div class="img-show"><img src="<%=data.game.logoUrl%>" width="48" height="48" alt="<%=data.game.name%>"></div>        <div class="gift-info-content"><%=data.game.name%></div>    </div>     <ul class="mod-gift-detail-list" id="singleGiftsList">    	<% for(var i=0; i<data.giftBags.length; i++){ %>	        <li class="mod-gift-detail-list-li" data-index="<%=i%>">	           <div class="gift-detail-content">	               <h3><%=data.giftBags[i].title%></h3>	               <p><%=data.giftBags[i].detail%></p>	           </div>	           <a class="btn-common-s">领取</a>	        </li>        <% } %>    </ul>       </div> <!--gift end-->'
}), define("portal/1.0.0/src/page/giftbagdetail", [], function(e, t, n) {
    !function() {
        var t = (e("portal/1.0.0/src/plugin/underscore"), e("portal/1.0.0/src/tff/tff.data")), o = e("portal/1.0.0/src/tff/tff.core.jump"), a = (e("portal/1.0.0/src/com/report"), e("portal/1.0.0/src/com/SoftManage"), e("when/3.4.4/when")), i = e("portal/1.0.0/src/plugin/template"), r = e("portal/1.0.0/src/tff/tff.core.hash"), s = e("portal/1.0.0/src/com/user"), c = i.compile(e("portal/1.0.0/src/tpl/gift-bag-detail.tpl")), d = (i.compile(e("portal/1.0.0/src/tpl/role-select.tpl")), 0), l = function(e) {
            for (var t = 0; t < e.length; t++)
                if (e[t].t != d)
                    return void console.log("ajax response meta mismatch!");
            $("#giftbagcontent .wrapper").html(""), function(e) {
                var t;
                0 == e.code ? (t = new Date(1e3 * e.data.endTime), beginTime = new Date(1e3 * e.data.beginTime), dispEndMonth = t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1, dispEndDate = t.getDate() < 10 ? "0" + t.getDate() : t.getDate(), dispBeginMonth = beginTime.getMonth() + 1 < 10 ? "0" + (beginTime.getMonth() + 1) : beginTime.getMonth() + 1, dispBeginDate = beginTime.getDate() < 10 ? "0" + beginTime.getDate() : beginTime.getDate(), e.data.displayEndTime = t.getFullYear() + "-" + dispEndMonth + "-" + dispEndDate, e.data.displayBeginTime = beginTime.getFullYear() + "-" + dispBeginMonth + "-" + dispBeginDate, $("#giftbagcontent").html(""), $("#giftbagcontent").append(c(e)), $("#collectGift").on("click", function() {
                    var t = (e.data.businessId, e.data.needRole, e.data.wxAppid, e.data.chType), n = e.data.giftType, o = e.data.action, a = e.data.url, i = e.data.id;
                    0 == n || 1 == n && u(i, t, o, a)
                }), $(".mod-loading").addClass("hidden"), $("#giftbagdetail .wrapper").removeClass("hidden")) : ($("#giftbagcontent").html(i("tplNoGiftBag")), $(".mod-loading").addClass("hidden"), $("#giftbagdetail .wrapper").removeClass("hidden"))
            }(e[0]), $("#giftbagdetail footer.mod-footer").html(i("tplCopyRight"))
        }, u = function(e, t, n, a) {
            var i = {c: "give",giftId: e}, r = function() {
                s.getResourcesWithAuth("gift-bag", i, 1, function(e) {
                    0 == e.code && ($("#giftbagdetail_CDkeySucc").hasClass("hidden") && $("#giftbagdetail_CDkeySucc").removeClass("hidden"), $("#giftbagdetail_CDkeySucc .dialog-btn-common").off("tap"), $("#giftbagdetail_CDkeySucc .dialog-btn-common").on("tap", function() {
                        $("#giftbagdetail_CDkeySucc").hasClass("hidden") || $("#giftbagdetail_CDkeySucc").addClass("hidden")
                    }), $("#collectGift").html("已领取"), $("#collectGift").hasClass("btn-gray-pure") || $("#collectGift").addClass("btn-gray-pure"), $("#collectGift").off("click"), $("#cd_key").hasClass("hidden") && ($("#cd_key").removeClass("hidden"), $("#cd_key_span").html(e.res.cdkey)))
                }, function(e) {
                    $("#giftbagdetail_loginPrompt").hasClass("hidden") || $("#giftbagdetail_loginPrompt").addClass("hidden"), -100 == e.code ? ($("#giftbagdetail_totast p").html("账号异常，请稍后重试"), $("#giftbagdetail_totast").fadeIn(3e3, function() {
                        $("#giftbagdetail_totast").fadeOut(3e3)
                    })) : -200 == e.code ? -3 == e.res.code ? ($("#giftbagdetail_totast p").html("激活码已发完"), $("#giftbagdetail_totast").fadeIn(3e3, function() {
                        $("#giftbagdetail_totast").fadeOut(3e3)
                    })) : 10 == e.res.code ? ($("#collectGift").html("已领取"), $("#collectGift").hasClass("btn-gray-pure") || $("#collectGift").addClass("btn-gray-pure"), $("#collectGift").off("click"), $("#giftbagdetail_totast p").html("激活码已领取"), $("#giftbagdetail_totast").fadeIn(3e3, function() {
                        $("#giftbagdetail_totast").fadeOut(3e3)
                    })) : ($("#giftbagdetail_totast p").html("加载失败请稍后重试"), $("#giftbagdetail_totast").fadeIn(3e3, function() {
                        $("#giftbagdetail_totast").fadeOut(3e3)
                    })) : -400 == e.code ? ($("#giftbagdetail_totast p").html("加载失败请稍后重试"), $("#giftbagdetail_totast").fadeIn(3e3, function() {
                        $("#giftbagdetail_totast").fadeOut(3e3)
                    })) : -300 == e.code || -301 == e.code || -303 == e.code ? ($("#giftbagdetail_totast p").html("账号异常，请稍后重试"), $("#giftbagdetail_totast").fadeIn(3e3, function() {
                        $("#giftbagdetail_totast").fadeOut(3e3)
                    })) : -500 == e.code && ($("#giftbagdetail_totast p").html("无法获取帐号信息,请安装新版QQ浏览器"), $("#giftbagdetail_totast").fadeIn(3e3, function() {
                        $("#giftbagdetail_totast").fadeOut(3e3)
                    }))
                })
            };
            1 == t ? s.checkUserLoginStats(function() {
                r()
            }, function() {
                $("#giftbagdetail_loginPrompt").hasClass("hidden") && ($("#giftbagdetail_loginPrompt").removeClass("hidden"), $("#giftbagdetail_loginPrompt .dialog-btn-disable").off("tap"), $("#giftbagdetail_loginPrompt .dialog-btn-disable").on("tap", function() {
                    setTimeout(function() {
                        $("#giftbagdetail_loginPrompt").hasClass("hidden") || $("#giftbagdetail_loginPrompt").addClass("hidden")
                    }, 50)
                }), $("#giftbagdetail_loginPrompt .dialog-btn-common").off("tap"), $("#giftbagdetail_loginPrompt .dialog-btn-common").on("tap", function() {
                    $("#giftbagdetail_loginPrompt").hasClass("hidden") || $("#giftbagdetail_loginPrompt").addClass("hidden"), setTimeout(function() {
                        r()
                    }, 50)
                }))
            }, !0) : 2 == t && o.jumpToUrl(a, "getCdKeyBtn", "")
        }, f = function() {
            var e = [], n = r.getHashObj().giftbagid, o = r.getHashObj().ref;
            return d = +new Date, e[0] = t.invokeAjaxCmd("gift-bag", {id: n,c: "detail",t: d,ref: o}), a.all(e)
        }, p = function() {
            var e = function() {
                console.log("my games init.")
            }, t = function(e) {
                $("#giftbagdetail").show(), e && e.isHistoryBack || ($("#giftbagdetail .wrapper").addClass("hidden"), $(".mod-loading").removeClass("hidden"), $("#giftbagdetail .btn-return").off("click"), $("#giftbagdetail .btn-return").on("click", function() {
                    window.history.back()
                }), f().then(function(e) {
                    l(e), $(".mod-loading").addClass("hidden"), $("#giftbagdetail .wrapper").removeClass("hidden")
                }, function(e) {
                    console.log(e), $(".mod-loading").addClass("hidden"), $("#giftbagdetail .wrapper").removeClass("hidden"), $("#giftbagdetail .wrapper").html(i("tplTipsError")), $("#giftbagdetail .tip-error span").on("click", function() {
                        t()
                    })
                }))
            }, n = function() {
                $("#giftbagdetail").hide(), $(".mod-loading").addClass("hidden"), $("#giftbagdetail footer.mod-footer").empty()
            };
            return {init: e,show: t,hide: n}
        }();
        n.exports = p
    }()
}), define("portal/1.0.0/src/tpl/gift-bag-detail.tpl", [], function(e, t, n) {
    n.exports = '<!--content start-->  <section class="mod-content ns-gift-detail" data-gameid="<%=data.businessId%>">     <div class="mod-gift-container">         <div class="icon-frame"><img src="<%=data.icon%>" width="64" height="64" alt="<%=data.title%>"></div>          <div class="gift-status">             <h3><%=data.title%></h3>              <p>已领取<span class="c-tx4"><%=data.giveCount%></span>个</p>         </div>      </div>      <div class="mod-gift-content">         <div class="ns-gift-info">           <h3>礼包详情：</h3>           <ol class="mod-ordered-list">            <%=#data.detail%>           </ol>         </div>         <div class="ns-gift-deadline">             <h3>兑换期限：</h3>             <p><%=data.displayBeginTime%> - <%=data.displayEndTime%></p>         </div>         <div class="ns-receive-mode">           <%if(data.giftType == 0){%>              <h3>领取方法</h3>           <%}else if(data.giftType == 1){%>              <h3>使用方法</h3>           <%}%>           <ol class="mod-ordered-list">            <%=#data.instructions%>           </ol>         </div>         <%if(data.giftType == 0){%>            <a id="collectGift" href="javascript:void(0)" class="btn-yellow-pure">领取礼包</a>         <%}else if(data.giftType == 1){%>            <div id="cd_key" class="ns-active-code hidden">              <h3>激活码：<span id="cd_key_span"></span></h3>            </div>            <a id="collectGift" href="javascript:void(0)" class="btn-yellow-pure">领取激活码</a>         <%}%>     </div>     </section><!--content end-->'
}), define("portal/1.0.0/src/tpl/role-select.tpl", [], function(e, t, n) {
    n.exports = '<div id="roleSelectorPanel">    <div class="mod-mask"></div>    <section class="mod-dialog dialog-select" id="dialogSelect">        <div class="mod-dialog-content">            <div class="dialog-txt clearfix">                <%=userInfo.nickname%><span class="c-tx3">（来自<%=(userInfo.origin==1?"QQ":"微信")%>）</span><a href="#" class="btn-txt-gray fr">切换</a>            </div>            <div class="mod-select-container" id="channelSelector">                <select class="mod-select-list" id="channelContentId">                    <option value="">选择渠道</option>                </select>             </div>            <div class="mod-select-container" id="systemSelector">                <select class="mod-select-list" id="systemContentId">                    <option value="">选择系统</option>                </select>             </div>            <div class="mod-select-container" id="areaSelector">                <select class="mod-select-list" id="areaContentId">                    <option value="">选择服务器</option>                </select>            </div>            <div class="mod-select-container" id="roleSelector">                  <select class="mod-select-list" id="roleContentId">                    <option value="">选择角色</option>                </select>             </div>             </div>        <div class="mod-dialog-footer two-btn">            <a class="dialog-btn-disable" id="cancelBtn"  href="javascript:void(0)">取消</a>            <a class="dialog-btn-common" id="redeemBtn" href="javascript:void(0)">确定</a>        </div>    </section><div>'
}), define("portal/1.0.0/src/page/detail", [], function(e, t, n) {
    !function() {
        var t = e("portal/1.0.0/src/tff/tff.data"), o = e("portal/1.0.0/src/tff/tff.core.jump"), a = e("portal/1.0.0/src/com/report"), i = e("portal/1.0.0/src/com/SoftManage"), r = e("when/3.4.4/when"), s = e("portal/1.0.0/src/plugin/template"), c = e("portal/1.0.0/src/tff/tff.core.hash"), d = s.compile(e("portal/1.0.0/src/tpl/feeds.tpl")), l = s.compile(e("portal/1.0.0/src/tpl/relative-soft.tpl")), u = s.compile(e("portal/1.0.0/src/tpl/soft-detail.tpl")), f = 0, p = function(e, t) {
            var n = $("#detail ." + e + " .icon-arrow");
            return "ns-feed" == e && t.length < 4 ? void n.hide() : void n.on("click", function() {
                $("#detail ." + e).hasClass("unfold-content") ? $("#detail ." + e).removeClass("unfold-content") : $("#detail ." + e).addClass("unfold-content")
            })
        }, m = function(e) {
            for (var t = 0; t < e.length; t++)
                if (e[t].t != f || 0 != e[t].code)
                    return void console.log("ajax response meta mismatch!");
            $("#detail .wrapper").html("");
            var n = c.getHashObj().origin;
            !function(e) {
                e.data.fileSize = $.formatSize(e.data.fileSize), e.data.score = $.formatScore(e.data.score), e.data.downloadCount = $.formatCount(e.data.downloadCount), e.data.downloadUrl = "dl?ref=detail&packageName=" + e.data.packageName, i.addSofts([e.data], function() {
                    $("#detail .wrapper").append(u(e)), $("#detail .btn-return").on("click", function() {
                        o.jumpToPage({hashString: "p=index&g=recommend"})
                    }), $("#detail .mod-app-intr .btn-download").on("click", function() {
                        var e = {}, t = $(this).parent().parent(), n = t.data("url");
                        e.packageName = t.data("package"), e.versionCode = t.data("version"), a.report("click-download", e.packageName, "detail"), e.downloadUrl = a.addReportParams(n, "detail"), i.operSoft(e, this)
                    }), p("ns-game-intr", e.data)
                });
                var t = $("#detail .game-info .mod-sub-header");
                if ("novel" == n && (t.hasClass("hidden") || t.addClass("hidden"), window.browser && window.browser.bookshelf && window.browser.bookshelf.setBarTitle)) {
                    var r = {barpos: 0,bartitle: "返回"};
                    browser.bookshelf.setBarTitle(function() {
                    }, function() {
                    }, r);
                    var r = {barpos: 1,bartitle: e.data.name};
                    browser.bookshelf.setBarTitle(function() {
                    }, function() {
                    }, r);
                    var r = {barpos: 2,bartitle: ""};
                    browser.bookshelf.setBarTitle(function() {
                    }, function() {
                    }, r)
                }
            }(e[0]), function(e) {
                if (e.data) {
                    for (var t = 0; t < e.data.length; t++)
                        e.data[t].score = $.formatScore(e.data[t].score), e.data[t].createdTime = $.formatDate(e.data[t].createdTime), e.data[t].nickName || (e.data[t].nickName = "游客");
                    $("#detail .wrapper").append(d(e)), p("ns-feed", e.data)
                }
            }(e[1]), function(e) {
                e.data && ($("#detail .wrapper").append(l(e)), $("#detail .ns-relative .mod-game-list li").on("click", function() {
                    "novel" == n ? o.jumpToPage({hashString: "p=detail&ref=relative&package=" + $(this).data("package") + "&origin=novel"}, "relate", $(this).data("index")) : o.jumpToPage({hashString: "p=detail&ref=relative&package=" + $(this).data("package")}, "relate", $(this).data("index"))
                }))
            }(e[2]), $("#detail footer.mod-footer").html(s("tplCopyRight"))
        }, h = function() {
            var e = [], n = c.getHashObj()["package"], o = c.getHashObj().ref;
            return f = Date.now(), e[0] = t.invokeAjaxCmd("getSoftDetailInfo", {packageName: n,t: f,ref: o}), e[1] = t.invokeAjaxCmd("getSoftComments", {packageName: n,t: f}), e[2] = t.invokeAjaxCmd("getRelatedSofts", {packageName: n,t: f}), r.all(e)
        }, g = function() {
            var e = function() {
                console.log("detail init.")
            }, t = function(e) {
                $("#detail").show(), e && e.isHistoryBack || ($("#detail .wrapper").addClass("hidden"), $(".mod-loading").removeClass("hidden"), h().then(function(e) {
                    m(e), $(".mod-loading").addClass("hidden"), $("#detail .wrapper").removeClass("hidden")
                }, function(e) {
                    console.log(e), $(".mod-loading").addClass("hidden"), $("#detail .wrapper").removeClass("hidden"), $("#detail .wrapper").html(s("tplTipsError")), $("#detail .tip-error span").on("click", function() {
                        t()
                    })
                }))
            }, n = function() {
                $("#detail").hide(), $(".mod-loading").addClass("hidden"), $("#detail footer.mod-footer").empty()
            };
            return {init: e,show: t,hide: n}
        }();
        n.exports = g
    }()
}), define("portal/1.0.0/src/tpl/feeds.tpl", [], function(e, t, n) {
    n.exports = '<!--用户评论模板--><div class="mod-fold-box ns-feed clearfix">    <h2>用户评论</h2>    <ol class="mod-feed-list mod-info-content">        <% for(i = 0; i < data.length; i ++) { %>        <li>            <p><%=i+1%>.<%=data[i].content%></p>            <div class="stream-item-footer clearfix">                <ul class="icon-star-list clearfix fl">                    <% while(data[i].score[0]--) { %>                    <li class="icon-star-light"></li>                    <% } %>                    <% while(data[i].score[1]--) { %>                    <li class="icon-star-half"></li>                    <% } %>                    <% while(data[i].score[2]--) { %>                    <li class="icon-star-disable"></li>                    <% } %>                </ul>                <p class="from-time fl">来自“<%=data[i].nickName%>”—— <%=data[i].createdTime%></p>            </div>        </li>        <% } %>    </ol>    <a class="icon-arrow fr"></a></div>'
}), define("portal/1.0.0/src/tpl/relative-soft.tpl", [], function(e, t, n) {
    n.exports = '<!--相关应用模板--><div class="ns-relative mod-app-container">    <h2>相关应用</h2>    <ul class="mod-game-list">        <% for(i = 0; i < data.length; i ++) { %>        <li data-package="<%=data[i].packageName%>" data-index="<%=i + 1%>">            <div class="img-app"><img src="<%=data[i].logoUrl%>" width="48" height="48"></div>            <p><%=data[i].name%></p>        </li>        <% } %>    </ul></div>'
}), define("portal/1.0.0/src/tpl/soft-detail.tpl", [], function(e, t, n) {
    n.exports = '<!--游介绍模板--><!--game info start--><div class="game-info">    <section class="mod-top">        <!--header start-->        <header class="mod-sub-header">            <a class="btn-return">热门游戏</a>            <h1><%=data.name%></h1>        </header>        <!--header end-->        <!--app info start-->        <section class="mod-app-intr" data-package="<%=data.packageName%>" data-url="<%=data.downloadUrl%>" data-version="<%=data.versionCode%>">        <div class="download">            <div class="img-show"><img src="<%=data.logoUrl%>" width="60" height="60" alt="<%=data.name%>"></div>            <div class="app-info">                <h3><%=data.name%></h3>                <ul class="icon-star-list clearfix">                    <% while(data.score[0]--) { %>                        <li class="icon-star-light"></li>                        <% } %>                            <% while(data.score[1]--) { %>                                <li class="icon-star-half"></li>                                <% } %>                                    <% while(data.score[2]--) { %>                                        <li class="icon-star-disable"></li>                                        <% } %>                </ul>                <p class="c-tx1"><%=data.downloadCount%>下载</p>                <p class="c-tx1"><%=data.categoryName%> <%=data.fileSize%></p>            </div>            <a class="btn-yellow-pure btn-download" data-status="<%=data.status%>"><%=data.btnText%></a>            </div>        </section>        <!--app info end-->    </section>    <!--content start-->    <section class="mod-content ns-margin-top">        <!--slide start-->        <div id="viewport">            <div id="wrap">                <ul id="scroller">                    <% for(var i=0; i< data.snapshots.length; i++){ %>                    <li class="slide">                        <div class="painting">                            <div class="img-app">                                <img height="230" width="140" src="<%=data.snapshots[i]%>" data-origin="<%=data.originalSnapshots[i]%>" alt="界面<%=i+1%>"/>                            </div>                        </div>                    </li>                    <% } %>                </ul>            </div>        </div>        <!--slide end-->        <!--box start-->        <div class="mod-fold-box ns-game-intr clearfix">            <h2>游戏简介</h2>            <div class="mod-info-content">                <%=data.description%>            </div>            <a class="icon-arrow fr"></a>        </div>        <!--box end--></div>'
}), define("portal/1.0.0/src/page/special", [], function(e, t, n) {
    !function() {
        var t = e("portal/1.0.0/src/tff/tff.data"), o = e("portal/1.0.0/src/tff/tff.core.jump"), a = e("portal/1.0.0/src/com/report"), i = e("portal/1.0.0/src/com/SoftManage"), r = e("portal/1.0.0/src/plugin/template"), s = e("portal/1.0.0/src/tff/tff.core.hash"), c = (e("when/3.4.4/when"), r.compile(e("portal/1.0.0/src/tpl/special-list.tpl"))), d = r.compile(e("portal/1.0.0/src/tpl/special-detail.tpl")), l = 0, u = function(e) {
            console.log(e), $("#special .mod-content").removeClass("hidden"), $(".mod-loading").addClass("hidden"), $("#special .mod-content").html(r("tplTipsError")), $("#special .tip-error span").on("click", function() {
                h()
            })
        }, f = function(e, t) {
            for (var n = e.data, o = 0; o < n.length; o++)
                n[o].fileSize = $.formatSize(n[o].fileSize), n[o].score = $.formatScore(n[o].score), n[o].downloadUrl = "dl?ref=special&packageName=" + n[o].packageName;
            i.addSofts(n, t)
        }, p = function() {
            var e = {};
            e.t = l = Date.now(), $(".mod-loading").removeClass("hidden"), t.invokeAjaxCmd("getSpecialList", e).then(function(e) {
                return e.t != l ? void console.log("timestamp mismatch!") : ($("#special .mod-content .mod-content-special").html(c(e)), $("#special .mod-content .mod-content-special").removeClass("hidden"), $("#special .mod-special-list li").on("click", function() {
                    var e = $(this).data("index");
                    o.jumpToPage({hashString: "p=special&special=" + $(this).data("special")}, "special", e)
                }), $("#special footer.mod-footer").html(r("tplCopyRight")), void $(".mod-loading").addClass("hidden"))
            }, function(e) {
                u(e)
            })
        }, m = function(e) {
            var n = {};
            n.t = l = Date.now(), n.specialId = e, $(".mod-loading").removeClass("hidden"), t.invokeAjaxCmd("getSpecialDetail", n).then(function(e) {
                return e.t != l ? void console.log("timestamp mismatch!") : void f(e, function() {
                    $("#special .mod-content .mod-content-detail").html(d(e)), $("#special .mod-content .mod-content-detail").removeClass("hidden"), $("#special .mod-content .mod-app-list li").on("click", function(e) {
                        var t = $(this).data("package"), n = "p=detail&package=" + t, r = $(this).data("url"), s = $(this).data("version"), c = $(this).data("index");
                        return "A" == e.target.nodeName ? (a.report("click-download", t, "special", c), r = a.addReportParams(r, "special", c), void i.operSoft({packageName: t,downloadUrl: r,versionCode: s}, this.querySelector("a"))) : void o.jumpToPage({hashString: n}, "special", c)
                    }), $("#special .mod-sub-header h1").html(e.name), $("#special footer.mod-footer").html(r("tplCopyRight")), $(".mod-loading").addClass("hidden")
                })
            }, function(e) {
                u(e)
            })
        }, h = function(e) {
            var t = s.getHashObj(), n = t.special;
            if (n) {
                if ($("#special .mod-sub-header h1").text("专题"), e && e.isHistoryBack)
                    return $("#special .mod-content .mod-content-detail").removeClass("hidden"), void window.scrollTo(0, e.scrollY);
                m(n)
            } else {
                if ($("#special .mod-sub-header h1").text("往期专题"), e && e.isHistoryBack)
                    return $("#special .mod-content .mod-content-special").removeClass("hidden"), void window.scrollTo(0, e.scrollY);
                p()
            }
        }, g = function() {
            var e = function() {
                console.log("special page init."), $("#special").hide(), $("#special .btn-return").on("click", function() {
                    o.jumpToPage({hashString: "p=index&g=recommend"})
                })
            }, t = function(e) {
                $("#special .mod-content .mod-content-special").addClass("hidden"), $("#special .mod-content .mod-content-detail").addClass("hidden"), $("#special").show(), h(e)
            }, n = function() {
                $("#special").hide()
            };
            return {init: e,show: t,hide: n}
        }();
        n.exports = g
    }()
}), define("portal/1.0.0/src/tpl/special-list.tpl", [], function(e, t, n) {
    n.exports = '<!--专题列表-->    <ul class="mod-special-list">        <% for(var i=0; i<data.length; i++){ %>        <li data-special="<%=data[i].specialId%>" data-index="<%=i + 1%>">            <img src="<%=data[i].banner%>" alt="<%=data[i].name%>">            <div class="special-intr">                <em class="tag-yellow">导读</em>                <p><%=data[i].description%></p>            </div>        </li>        <% } %>    </ul>'
}), define("portal/1.0.0/src/tpl/special-detail.tpl", [], function(e, t, n) {
    n.exports = '<!--专题 详情-->    <div class="special-info">        <img  src="<%=banner%>" width="320" height="120" alt="<%=name%>">        <div class="special-intr">            <em class="tag-yellow">导读</em>            <p><%=description%></p>        </div>    </div>    <div class="mod-app-container">        <ul class="mod-app-list">            <% for(i = 0; i < data.length; i++) { %>            <li data-package="<%=data[i].packageName%>" data-url="<%=data[i].downloadUrl%>" data-version="<%=data[i].versionCode%>" data-index="<%=i + 1%>">                <div class="img-show"><img src="<%=data[i].logoUrl%>" width="48" height="48" alt="<%=data[i].name%>"></div>                <div class="app-content">                    <h3><%=data[i].name%></h3>                    <ul class="icon-star-list clearfix">                        <% while(data[i].score[0]--) { %>                        <li class="icon-star-light"></li>                        <% } %>                        <% while(data[i].score[1]--) { %>                        <li class="icon-star-half"></li>                        <% } %>                        <% while(data[i].score[2]--) { %>                        <li class="icon-star-disable"></li>                        <% } %>                    </ul>                    <p><%=data[i].categoryName%> <%=data[i].fileSize%></p>                </div>                <a class="btn-common-s btn-download" data-status="<%=data[i].status%>"><%=data[i].btnText%></a>            </li>            <% } %>        </ul>    </div>'
}), define("portal/1.0.0/src/page/category", [], function(e, t, n) {
    !function() {
        var t, o, a, i = e("portal/1.0.0/src/tff/tff.data"), r = e("portal/1.0.0/src/tff/tff.core.jump"), s = e("portal/1.0.0/src/com/report"), c = e("portal/1.0.0/src/com/SoftManage"), d = e("portal/1.0.0/src/com/LoadBar"), l = e("portal/1.0.0/src/plugin/slideup"), u = e("portal/1.0.0/src/plugin/template"), f = e("portal/1.0.0/src/tff/tff.core.hash"), p = e("when/3.4.4/when"), m = u.compile(e("portal/1.0.0/src/tpl/soft-list.tpl")), h = function(e, n) {
            o = e.nextPage || ++a, t = e.hasMore || e.totalPage >= a;
            for (var i = e.data, r = 0, s = i.length; s > r; r++)
                i[r].fileSize = $.formatSize(i[r].fileSize), i[r].score = $.formatScore(i[r].score), i[r].downloadUrl = "dl?ref=category&packageName=" + i[r].packageName;
            c.addSofts(i, n)
        }, g = function() {
            var e = p.defer(), n = f.getHashObj(), a = n.category, d = {};
            return d.t = _t = Date.now(), d.categoryId = a, "" != o && (d.reqPage = o), i.invokeAjaxCmd("getSoftList", d).then(function(n) {
                return n.t != _t ? void console.log("timestamp mismatch!") : 0 != n.code ? (console.log(n.msg), void v.updateLoadBar("error")) : (v.resetSlide(), void h(n, function() {
                    n.currentPage = o - 1, $("#category .mod-app-list").append(m(n)), $("#category .mod-app-list > li").on("click", function(e) {
                        var t = $(this).data("package"), n = "p=detail&package=" + t, o = $(this).data("index");
                        if ("A" == e.target.nodeName) {
                            var a = $(this).data("url"), i = $(this).data("version");
                            return s.report("click-download", t, "category", o), a = s.addReportParams(a, "category", o), void c.operSoft({packageName: t,downloadUrl: a,versionCode: i}, this.querySelector("a"))
                        }
                        r.jumpToPage({hashString: n}, "category", o)
                    }), v.updateLoadBar(t ? "pending" : "nomore"), e.resolve()
                }))
            }).catch(function(t) {
                console.log(t), v.updateLoadBar("error"), e.reject(t)
            }), e.promise
        }, v = null, w = {attachDomId: "category",createrDom: "#category .loadbar",getLoadBarHtml: d.getLoadBarHtml,canDragUp: d.canDragUp,hideLoadBar: d.hideLoadBar,showLoadBar_DragUp: d.showLoadBar_DragUp,showLoadBar_Loading: d.showLoadBar_Loading,updateLoadBar: d.updateLoadBarState,callBackFunc: g}, y = function() {
            var e = function() {
                $("#category").hide(), v = new l(w), v.updateLoadBar("initial"), $("#category .btn-return").on("click", function() {
                    r.jumpToPage({hashString: "p=index&g=recommend"})
                }), console.log("category init")
            }, n = function(e) {
                $("#category .mod-sub-header h1").html(decodeURIComponent(f.getHashObj().name)), $("#category").show(), e.isHistoryBack || ($("#category .mod-app-list").empty(), $("#category .mod-app-container").addClass("hidden"), t = !1, o = "", a = 1, $(".mod-loading").removeClass("hidden"), g().then(function() {
                    $(".mod-loading").addClass("hidden"), $("#category .mod-app-container").removeClass("hidden")
                }).catch(function(e) {
                    console.log(e), $(".mod-loading").addClass("hidden"), $("#category .mod-app-list").html(u("tplTipsError")), $("#category .loadbar").addClass("hidden"), $("#category .mod-app-container").removeClass("hidden"), $("#category .tip-error span").on("click", function() {
                        n()
                    })
                }))
            }, i = function() {
                $("#category").hide()
            };
            return {init: e,show: n,hide: i}
        }();
        n.exports = y
    }()
}), define("portal/1.0.0/src/page/logout", [], function(e, t, n) {
    var o = e("zepto/1.1.3/index"), a = e("portal/1.0.0/src/com/user"), i = e("portal/1.0.0/src/tff/tff.core.jump"), r = e("portal/1.0.0/src/plugin/template"), s = r.compile(e("portal/1.0.0/src/tpl/logout.tpl")), c = function() {
        var e = function() {
            o("#logout .mod-content").html(s(a)), o("#logout .mod-content .mod-sign-in-container .btn-blue").on("click", function() {
                a.logout()
            }), o("#logout .btn-return").on("click", function() {
                i.jumpToPage({hashString: "p=index&g=recommend"})
            })
        }, t = function() {
            o("#logout").show()
        }, n = function() {
            o("#logout").hide()
        };
        return {init: e,show: t,hide: n}
    }();
    n.exports = c
}), define("portal/1.0.0/src/tpl/logout.tpl", [], function(e, t, n) {
    n.exports = '<!--####退出登录模板####--><div class="mod-sign-in-container">    <div class="user-avatar"><img id="qkbox-u-313030588" src="<%=userInfo.avatar%>" class="head"></div>    <p class="nickname"><%=userInfo.nickname%></p>    <a class="btn-blue">退出登录</a></div>'
});
