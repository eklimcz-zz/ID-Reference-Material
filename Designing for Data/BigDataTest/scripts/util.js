//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function() {
    var n = this,
        t = n._,
        r = {}, e = Array.prototype,
        u = Object.prototype,
        i = Function.prototype,
        a = e.push,
        o = e.slice,
        c = e.concat,
        l = u.toString,
        f = u.hasOwnProperty,
        s = e.forEach,
        p = e.map,
        h = e.reduce,
        v = e.reduceRight,
        g = e.filter,
        d = e.every,
        m = e.some,
        y = e.indexOf,
        b = e.lastIndexOf,
        x = Array.isArray,
        w = Object.keys,
        _ = i.bind,
        j = function(n) {
            return n instanceof j ? n : this instanceof j ? void(this._wrapped = n) : new j(n)
        };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = j), exports._ = j) : n._ = j, j.VERSION = "1.6.0";
    var A = j.each = j.forEach = function(n, t, e) {
        if (null == n) return n;
        if (s && n.forEach === s) n.forEach(t, e);
        else if (n.length === +n.length) {
            for (var u = 0, i = n.length; i > u; u++)
                if (t.call(e, n[u], u, n) === r) return
        } else
            for (var a = j.keys(n), u = 0, i = a.length; i > u; u++)
                if (t.call(e, n[a[u]], a[u], n) === r) return; return n
    };
    j.map = j.collect = function(n, t, r) {
        var e = [];
        return null == n ? e : p && n.map === p ? n.map(t, r) : (A(n, function(n, u, i) {
            e.push(t.call(r, n, u, i))
        }), e)
    };
    var O = "Reduce of empty array with no initial value";
    j.reduce = j.foldl = j.inject = function(n, t, r, e) {
        var u = arguments.length > 2;
        if (null == n && (n = []), h && n.reduce === h) return e && (t = j.bind(t, e)), u ? n.reduce(t, r) : n.reduce(t);
        if (A(n, function(n, i, a) {
            u ? r = t.call(e, r, n, i, a) : (r = n, u = !0)
        }), !u) throw new TypeError(O);
        return r
    }, j.reduceRight = j.foldr = function(n, t, r, e) {
        var u = arguments.length > 2;
        if (null == n && (n = []), v && n.reduceRight === v) return e && (t = j.bind(t, e)), u ? n.reduceRight(t, r) : n.reduceRight(t);
        var i = n.length;
        if (i !== +i) {
            var a = j.keys(n);
            i = a.length
        }
        if (A(n, function(o, c, l) {
            c = a ? a[--i] : --i, u ? r = t.call(e, r, n[c], c, l) : (r = n[c], u = !0)
        }), !u) throw new TypeError(O);
        return r
    }, j.find = j.detect = function(n, t, r) {
        var e;
        return k(n, function(n, u, i) {
            return t.call(r, n, u, i) ? (e = n, !0) : void 0
        }), e
    }, j.filter = j.select = function(n, t, r) {
        var e = [];
        return null == n ? e : g && n.filter === g ? n.filter(t, r) : (A(n, function(n, u, i) {
            t.call(r, n, u, i) && e.push(n)
        }), e)
    }, j.reject = function(n, t, r) {
        return j.filter(n, function(n, e, u) {
            return !t.call(r, n, e, u)
        }, r)
    }, j.every = j.all = function(n, t, e) {
        t || (t = j.identity);
        var u = !0;
        return null == n ? u : d && n.every === d ? n.every(t, e) : (A(n, function(n, i, a) {
            return (u = u && t.call(e, n, i, a)) ? void 0 : r
        }), !! u)
    };
    var k = j.some = j.any = function(n, t, e) {
        t || (t = j.identity);
        var u = !1;
        return null == n ? u : m && n.some === m ? n.some(t, e) : (A(n, function(n, i, a) {
            return u || (u = t.call(e, n, i, a)) ? r : void 0
        }), !! u)
    };
    j.contains = j.include = function(n, t) {
        return null == n ? !1 : y && n.indexOf === y ? n.indexOf(t) != -1 : k(n, function(n) {
            return n === t
        })
    }, j.invoke = function(n, t) {
        var r = o.call(arguments, 2),
            e = j.isFunction(t);
        return j.map(n, function(n) {
            return (e ? t : n[t]).apply(n, r)
        })
    }, j.pluck = function(n, t) {
        return j.map(n, j.property(t))
    }, j.where = function(n, t) {
        return j.filter(n, j.matches(t))
    }, j.findWhere = function(n, t) {
        return j.find(n, j.matches(t))
    }, j.max = function(n, t, r) {
        if (!t && j.isArray(n) && n[0] === +n[0] && n.length < 65535) return Math.max.apply(Math, n);
        var e = -1 / 0,
            u = -1 / 0;
        return A(n, function(n, i, a) {
            var o = t ? t.call(r, n, i, a) : n;
            o > u && (e = n, u = o)
        }), e
    }, j.min = function(n, t, r) {
        if (!t && j.isArray(n) && n[0] === +n[0] && n.length < 65535) return Math.min.apply(Math, n);
        var e = 1 / 0,
            u = 1 / 0;
        return A(n, function(n, i, a) {
            var o = t ? t.call(r, n, i, a) : n;
            u > o && (e = n, u = o)
        }), e
    }, j.shuffle = function(n) {
        var t, r = 0,
            e = [];
        return A(n, function(n) {
            t = j.random(r++), e[r - 1] = e[t], e[t] = n
        }), e
    }, j.sample = function(n, t, r) {
        return null == t || r ? (n.length !== +n.length && (n = j.values(n)), n[j.random(n.length - 1)]) : j.shuffle(n).slice(0, Math.max(0, t))
    };
    var E = function(n) {
        return null == n ? j.identity : j.isFunction(n) ? n : j.property(n)
    };
    j.sortBy = function(n, t, r) {
        return t = E(t), j.pluck(j.map(n, function(n, e, u) {
            return {
                value: n,
                index: e,
                criteria: t.call(r, n, e, u)
            }
        }).sort(function(n, t) {
            var r = n.criteria,
                e = t.criteria;
            if (r !== e) {
                if (r > e || r === void 0) return 1;
                if (e > r || e === void 0) return -1
            }
            return n.index - t.index
        }), "value")
    };
    var F = function(n) {
        return function(t, r, e) {
            var u = {};
            return r = E(r), A(t, function(i, a) {
                var o = r.call(e, i, a, t);
                n(u, o, i)
            }), u
        }
    };
    j.groupBy = F(function(n, t, r) {
        j.has(n, t) ? n[t].push(r) : n[t] = [r]
    }), j.indexBy = F(function(n, t, r) {
        n[t] = r
    }), j.countBy = F(function(n, t) {
        j.has(n, t) ? n[t]++ : n[t] = 1
    }), j.sortedIndex = function(n, t, r, e) {
        r = E(r);
        for (var u = r.call(e, t), i = 0, a = n.length; a > i;) {
            var o = i + a >>> 1;
            r.call(e, n[o]) < u ? i = o + 1 : a = o
        }
        return i
    }, j.toArray = function(n) {
        return n ? j.isArray(n) ? o.call(n) : n.length === +n.length ? j.map(n, j.identity) : j.values(n) : []
    }, j.size = function(n) {
        return null == n ? 0 : n.length === +n.length ? n.length : j.keys(n).length
    }, j.first = j.head = j.take = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[0] : 0 > t ? [] : o.call(n, 0, t)
    }, j.initial = function(n, t, r) {
        return o.call(n, 0, n.length - (null == t || r ? 1 : t))
    }, j.last = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[n.length - 1] : o.call(n, Math.max(n.length - t, 0))
    }, j.rest = j.tail = j.drop = function(n, t, r) {
        return o.call(n, null == t || r ? 1 : t)
    }, j.compact = function(n) {
        return j.filter(n, j.identity)
    };
    var M = function(n, t, r) {
        return t && j.every(n, j.isArray) ? c.apply(r, n) : (A(n, function(n) {
            j.isArray(n) || j.isArguments(n) ? t ? a.apply(r, n) : M(n, t, r) : r.push(n)
        }), r)
    };
    j.flatten = function(n, t) {
        return M(n, t, [])
    }, j.without = function(n) {
        return j.difference(n, o.call(arguments, 1))
    }, j.partition = function(n, t) {
        var r = [],
            e = [];
        return A(n, function(n) {
            (t(n) ? r : e).push(n)
        }), [r, e]
    }, j.uniq = j.unique = function(n, t, r, e) {
        j.isFunction(t) && (e = r, r = t, t = !1);
        var u = r ? j.map(n, r, e) : n,
            i = [],
            a = [];
        return A(u, function(r, e) {
            (t ? e && a[a.length - 1] === r : j.contains(a, r)) || (a.push(r), i.push(n[e]))
        }), i
    }, j.union = function() {
        return j.uniq(j.flatten(arguments, !0))
    }, j.intersection = function(n) {
        var t = o.call(arguments, 1);
        return j.filter(j.uniq(n), function(n) {
            return j.every(t, function(t) {
                return j.contains(t, n)
            })
        })
    }, j.difference = function(n) {
        var t = c.apply(e, o.call(arguments, 1));
        return j.filter(n, function(n) {
            return !j.contains(t, n)
        })
    }, j.zip = function() {
        for (var n = j.max(j.pluck(arguments, "length").concat(0)), t = new Array(n), r = 0; n > r; r++) t[r] = j.pluck(arguments, "" + r);
        return t
    }, j.object = function(n, t) {
        if (null == n) return {};
        for (var r = {}, e = 0, u = n.length; u > e; e++) t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
        return r
    }, j.indexOf = function(n, t, r) {
        if (null == n) return -1;
        var e = 0,
            u = n.length;
        if (r) {
            if ("number" != typeof r) return e = j.sortedIndex(n, t), n[e] === t ? e : -1;
            e = 0 > r ? Math.max(0, u + r) : r
        }
        if (y && n.indexOf === y) return n.indexOf(t, r);
        for (; u > e; e++)
            if (n[e] === t) return e;
        return -1
    }, j.lastIndexOf = function(n, t, r) {
        if (null == n) return -1;
        var e = null != r;
        if (b && n.lastIndexOf === b) return e ? n.lastIndexOf(t, r) : n.lastIndexOf(t);
        for (var u = e ? r : n.length; u--;)
            if (n[u] === t) return u;
        return -1
    }, j.range = function(n, t, r) {
        arguments.length <= 1 && (t = n || 0, n = 0), r = arguments[2] || 1;
        for (var e = Math.max(Math.ceil((t - n) / r), 0), u = 0, i = new Array(e); e > u;) i[u++] = n, n += r;
        return i
    };
    var R = function() {};
    j.bind = function(n, t) {
        var r, e;
        if (_ && n.bind === _) return _.apply(n, o.call(arguments, 1));
        if (!j.isFunction(n)) throw new TypeError;
        return r = o.call(arguments, 2), e = function() {
            if (!(this instanceof e)) return n.apply(t, r.concat(o.call(arguments)));
            R.prototype = n.prototype;
            var u = new R;
            R.prototype = null;
            var i = n.apply(u, r.concat(o.call(arguments)));
            return Object(i) === i ? i : u
        }
    }, j.partial = function(n) {
        var t = o.call(arguments, 1);
        return function() {
            for (var r = 0, e = t.slice(), u = 0, i = e.length; i > u; u++) e[u] === j && (e[u] = arguments[r++]);
            for (; r < arguments.length;) e.push(arguments[r++]);
            return n.apply(this, e)
        }
    }, j.bindAll = function(n) {
        var t = o.call(arguments, 1);
        if (0 === t.length) throw new Error("bindAll must be passed function names");
        return A(t, function(t) {
            n[t] = j.bind(n[t], n)
        }), n
    }, j.memoize = function(n, t) {
        var r = {};
        return t || (t = j.identity),
        function() {
            var e = t.apply(this, arguments);
            return j.has(r, e) ? r[e] : r[e] = n.apply(this, arguments)
        }
    }, j.delay = function(n, t) {
        var r = o.call(arguments, 2);
        return setTimeout(function() {
            return n.apply(null, r)
        }, t)
    }, j.defer = function(n) {
        return j.delay.apply(j, [n, 1].concat(o.call(arguments, 1)))
    }, j.throttle = function(n, t, r) {
        var e, u, i, a = null,
            o = 0;
        r || (r = {});
        var c = function() {
            o = r.leading === !1 ? 0 : j.now(), a = null, i = n.apply(e, u), e = u = null
        };
        return function() {
            var l = j.now();
            o || r.leading !== !1 || (o = l);
            var f = t - (l - o);
            return e = this, u = arguments, 0 >= f ? (clearTimeout(a), a = null, o = l, i = n.apply(e, u), e = u = null) : a || r.trailing === !1 || (a = setTimeout(c, f)), i
        }
    }, j.debounce = function(n, t, r) {
        var e, u, i, a, o, c = function() {
                var l = j.now() - a;
                t > l ? e = setTimeout(c, t - l) : (e = null, r || (o = n.apply(i, u), i = u = null))
            };
        return function() {
            i = this, u = arguments, a = j.now();
            var l = r && !e;
            return e || (e = setTimeout(c, t)), l && (o = n.apply(i, u), i = u = null), o
        }
    }, j.once = function(n) {
        var t, r = !1;
        return function() {
            return r ? t : (r = !0, t = n.apply(this, arguments), n = null, t)
        }
    }, j.wrap = function(n, t) {
        return j.partial(t, n)
    }, j.compose = function() {
        var n = arguments;
        return function() {
            for (var t = arguments, r = n.length - 1; r >= 0; r--) t = [n[r].apply(this, t)];
            return t[0]
        }
    }, j.after = function(n, t) {
        return function() {
            return --n < 1 ? t.apply(this, arguments) : void 0
        }
    }, j.keys = function(n) {
        if (!j.isObject(n)) return [];
        if (w) return w(n);
        var t = [];
        for (var r in n) j.has(n, r) && t.push(r);
        return t
    }, j.values = function(n) {
        for (var t = j.keys(n), r = t.length, e = new Array(r), u = 0; r > u; u++) e[u] = n[t[u]];
        return e
    }, j.pairs = function(n) {
        for (var t = j.keys(n), r = t.length, e = new Array(r), u = 0; r > u; u++) e[u] = [t[u], n[t[u]]];
        return e
    }, j.invert = function(n) {
        for (var t = {}, r = j.keys(n), e = 0, u = r.length; u > e; e++) t[n[r[e]]] = r[e];
        return t
    }, j.functions = j.methods = function(n) {
        var t = [];
        for (var r in n) j.isFunction(n[r]) && t.push(r);
        return t.sort()
    }, j.extend = function(n) {
        return A(o.call(arguments, 1), function(t) {
            if (t)
                for (var r in t) n[r] = t[r]
        }), n
    }, j.pick = function(n) {
        var t = {}, r = c.apply(e, o.call(arguments, 1));
        return A(r, function(r) {
            r in n && (t[r] = n[r])
        }), t
    }, j.omit = function(n) {
        var t = {}, r = c.apply(e, o.call(arguments, 1));
        for (var u in n) j.contains(r, u) || (t[u] = n[u]);
        return t
    }, j.defaults = function(n) {
        return A(o.call(arguments, 1), function(t) {
            if (t)
                for (var r in t) n[r] === void 0 && (n[r] = t[r])
        }), n
    }, j.clone = function(n) {
        return j.isObject(n) ? j.isArray(n) ? n.slice() : j.extend({}, n) : n
    }, j.tap = function(n, t) {
        return t(n), n
    };
    var S = function(n, t, r, e) {
        if (n === t) return 0 !== n || 1 / n == 1 / t;
        if (null == n || null == t) return n === t;
        n instanceof j && (n = n._wrapped), t instanceof j && (t = t._wrapped);
        var u = l.call(n);
        if (u != l.call(t)) return !1;
        switch (u) {
            case "[object String]":
                return n == String(t);
            case "[object Number]":
                return n != +n ? t != +t : 0 == n ? 1 / n == 1 / t : n == +t;
            case "[object Date]":
            case "[object Boolean]":
                return +n == +t;
            case "[object RegExp]":
                return n.source == t.source && n.global == t.global && n.multiline == t.multiline && n.ignoreCase == t.ignoreCase
        }
        if ("object" != typeof n || "object" != typeof t) return !1;
        for (var i = r.length; i--;)
            if (r[i] == n) return e[i] == t;
        var a = n.constructor,
            o = t.constructor;
        if (a !== o && !(j.isFunction(a) && a instanceof a && j.isFunction(o) && o instanceof o) && "constructor" in n && "constructor" in t) return !1;
        r.push(n), e.push(t);
        var c = 0,
            f = !0;
        if ("[object Array]" == u) {
            if (c = n.length, f = c == t.length)
                for (; c-- && (f = S(n[c], t[c], r, e)););
        } else {
            for (var s in n)
                if (j.has(n, s) && (c++, !(f = j.has(t, s) && S(n[s], t[s], r, e)))) break;
            if (f) {
                for (s in t)
                    if (j.has(t, s) && !c--) break;
                f = !c
            }
        }
        return r.pop(), e.pop(), f
    };
    j.isEqual = function(n, t) {
        return S(n, t, [], [])
    }, j.isEmpty = function(n) {
        if (null == n) return !0;
        if (j.isArray(n) || j.isString(n)) return 0 === n.length;
        for (var t in n)
            if (j.has(n, t)) return !1;
        return !0
    }, j.isElement = function(n) {
        return !(!n || 1 !== n.nodeType)
    }, j.isArray = x || function(n) {
        return "[object Array]" == l.call(n)
    }, j.isObject = function(n) {
        return n === Object(n)
    }, A(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(n) {
        j["is" + n] = function(t) {
            return l.call(t) == "[object " + n + "]"
        }
    }), j.isArguments(arguments) || (j.isArguments = function(n) {
        return !(!n || !j.has(n, "callee"))
    }), "function" != typeof / . / && (j.isFunction = function(n) {
        return "function" == typeof n
    }), j.isFinite = function(n) {
        return isFinite(n) && !isNaN(parseFloat(n))
    }, j.isNaN = function(n) {
        return j.isNumber(n) && n != +n
    }, j.isBoolean = function(n) {
        return n === !0 || n === !1 || "[object Boolean]" == l.call(n)
    }, j.isNull = function(n) {
        return null === n
    }, j.isUndefined = function(n) {
        return n === void 0
    }, j.has = function(n, t) {
        return f.call(n, t)
    }, j.noConflict = function() {
        return n._ = t, this
    }, j.identity = function(n) {
        return n
    }, j.constant = function(n) {
        return function() {
            return n
        }
    }, j.property = function(n) {
        return function(t) {
            return t[n]
        }
    }, j.matches = function(n) {
        return function(t) {
            if (t === n) return !0;
            for (var r in n)
                if (n[r] !== t[r]) return !1;
            return !0
        }
    }, j.times = function(n, t, r) {
        for (var e = Array(Math.max(0, n)), u = 0; n > u; u++) e[u] = t.call(r, u);
        return e
    }, j.random = function(n, t) {
        return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1))
    }, j.now = Date.now || function() {
        return (new Date).getTime()
    };
    var T = {
        escape: {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;"
        }
    };
    T.unescape = j.invert(T.escape);
    var I = {
        escape: new RegExp("[" + j.keys(T.escape).join("") + "]", "g"),
        unescape: new RegExp("(" + j.keys(T.unescape).join("|") + ")", "g")
    };
    j.each(["escape", "unescape"], function(n) {
        j[n] = function(t) {
            return null == t ? "" : ("" + t).replace(I[n], function(t) {
                return T[n][t]
            })
        }
    }), j.result = function(n, t) {
        if (null == n) return void 0;
        var r = n[t];
        return j.isFunction(r) ? r.call(n) : r
    }, j.mixin = function(n) {
        A(j.functions(n), function(t) {
            var r = j[t] = n[t];
            j.prototype[t] = function() {
                var n = [this._wrapped];
                return a.apply(n, arguments), z.call(this, r.apply(j, n))
            }
        })
    };
    var N = 0;
    j.uniqueId = function(n) {
        var t = ++N + "";
        return n ? n + t : t
    }, j.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var q = /(.)^/,
        B = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "	": "t",
            "\u2028": "u2028",
            "\u2029": "u2029"
        }, D = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    j.template = function(n, t, r) {
        var e;
        r = j.defaults({}, r, j.templateSettings);
        var u = new RegExp([(r.escape || q).source, (r.interpolate || q).source, (r.evaluate || q).source].join("|") + "|$", "g"),
            i = 0,
            a = "__p+='";
        n.replace(u, function(t, r, e, u, o) {
            return a += n.slice(i, o).replace(D, function(n) {
                return "\\" + B[n]
            }), r && (a += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'"), e && (a += "'+\n((__t=(" + e + "))==null?'':__t)+\n'"), u && (a += "';\n" + u + "\n__p+='"), i = o + t.length, t
        }), a += "';\n", r.variable || (a = "with(obj||{}){\n" + a + "}\n"), a = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";
        try {
            e = new Function(r.variable || "obj", "_", a)
        } catch (o) {
            throw o.source = a, o
        }
        if (t) return e(t, j);
        var c = function(n) {
            return e.call(this, n, j)
        };
        return c.source = "function(" + (r.variable || "obj") + "){\n" + a + "}", c
    }, j.chain = function(n) {
        return j(n).chain()
    };
    var z = function(n) {
        return this._chain ? j(n).chain() : n
    };
    j.mixin(j), A(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(n) {
        var t = e[n];
        j.prototype[n] = function() {
            var r = this._wrapped;
            return t.apply(r, arguments), "shift" != n && "splice" != n || 0 !== r.length || delete r[0], z.call(this, r)
        }
    }), A(["concat", "join", "slice"], function(n) {
        var t = e[n];
        j.prototype[n] = function() {
            return z.call(this, t.apply(this._wrapped, arguments))
        }
    }), j.extend(j.prototype, {
        chain: function() {
            return this._chain = !0, this
        },
        value: function() {
            return this._wrapped
        }
    }), "function" == typeof define && define.amd && define("underscore", [], function() {
        return j
    })
}).call(this);
//# sourceMappingURL=underscore-min.map


var Chart = function(s) {
    function v(a, c, b) {
        a = A((a - c.graphMin) / (c.steps * c.stepValue), 1, 0);
        return b * c.steps * a
    }

    function x(a, c, b, e) {
        function h() {
            g += f;
            var k = a.animation ? A(d(g), null, 0) : 1;
            e.clearRect(0, 0, q, u);
            a.scaleOverlay ? (b(k), c()) : (c(), b(k));
            if (1 >= g) D(h);
            else if ("function" == typeof a.onAnimationComplete) a.onAnimationComplete()
        }
        var f = a.animation ? 1 / A(a.animationSteps, Number.MAX_VALUE, 1) : 1,
            d = B[a.animationEasing],
            g = a.animation ? 0 : 1;
        "function" !== typeof c && (c = function() {});
        D(h)
    }

    function C(a, c, b, e, h, f) {
        var d;
        a =
            Math.floor(Math.log(e - h) / Math.LN10);
        h = Math.floor(h / (1 * Math.pow(10, a))) * Math.pow(10, a);
        e = Math.ceil(e / (1 * Math.pow(10, a))) * Math.pow(10, a) - h;
        a = Math.pow(10, a);
        for (d = Math.round(e / a); d < b || d > c;) a = d < b ? a / 2 : 2 * a, d = Math.round(e / a);
        c = [];
        z(f, c, d, h, a);
        return {
            steps: d,
            stepValue: a,
            graphMin: h,
            labels: c
        }
    }

    function z(a, c, b, e, h) {
        if (a)
            for (var f = 1; f < b + 1; f++) c.push(E(a, {
                value: (e + h * f).toFixed(0 != h % 1 ? h.toString().split(".")[1].length : 0)
            }))
    }

    function A(a, c, b) {
        return !isNaN(parseFloat(c)) && isFinite(c) && a > c ? c : !isNaN(parseFloat(b)) &&
            isFinite(b) && a < b ? b : a
    }

    function y(a, c) {
        var b = {}, e;
        for (e in a) b[e] = a[e];
        for (e in c) b[e] = c[e];
        return b
    }

    function E(a, c) {
        var b = !/\W/.test(a) ? F[a] = F[a] || E(document.getElementById(a).innerHTML) : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + a.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
        return c ?
            b(c) : b
    }
    var r = this,
        B = {
            linear: function(a) {
                return a
            },
            easeInQuad: function(a) {
                return a * a
            },
            easeOutQuad: function(a) {
                return -1 * a * (a - 2)
            },
            easeInOutQuad: function(a) {
                return 1 > (a /= 0.5) ? 0.5 * a * a : -0.5 * (--a * (a - 2) - 1)
            },
            easeInCubic: function(a) {
                return a * a * a
            },
            easeOutCubic: function(a) {
                return 1 * ((a = a / 1 - 1) * a * a + 1)
            },
            easeInOutCubic: function(a) {
                return 1 > (a /= 0.5) ? 0.5 * a * a * a : 0.5 * ((a -= 2) * a * a + 2)
            },
            easeInQuart: function(a) {
                return a * a * a * a
            },
            easeOutQuart: function(a) {
                return -1 * ((a = a / 1 - 1) * a * a * a - 1)
            },
            easeInOutQuart: function(a) {
                return 1 > (a /= 0.5) ?
                    0.5 * a * a * a * a : -0.5 * ((a -= 2) * a * a * a - 2)
            },
            easeInQuint: function(a) {
                return 1 * (a /= 1) * a * a * a * a
            },
            easeOutQuint: function(a) {
                return 1 * ((a = a / 1 - 1) * a * a * a * a + 1)
            },
            easeInOutQuint: function(a) {
                return 1 > (a /= 0.5) ? 0.5 * a * a * a * a * a : 0.5 * ((a -= 2) * a * a * a * a + 2)
            },
            easeInSine: function(a) {
                return -1 * Math.cos(a / 1 * (Math.PI / 2)) + 1
            },
            easeOutSine: function(a) {
                return 1 * Math.sin(a / 1 * (Math.PI / 2))
            },
            easeInOutSine: function(a) {
                return -0.5 * (Math.cos(Math.PI * a / 1) - 1)
            },
            easeInExpo: function(a) {
                return 0 == a ? 1 : 1 * Math.pow(2, 10 * (a / 1 - 1))
            },
            easeOutExpo: function(a) {
                return 1 ==
                    a ? 1 : 1 * (-Math.pow(2, -10 * a / 1) + 1)
            },
            easeInOutExpo: function(a) {
                return 0 == a ? 0 : 1 == a ? 1 : 1 > (a /= 0.5) ? 0.5 * Math.pow(2, 10 * (a - 1)) : 0.5 * (-Math.pow(2, -10 * --a) + 2)
            },
            easeInCirc: function(a) {
                return 1 <= a ? a : -1 * (Math.sqrt(1 - (a /= 1) * a) - 1)
            },
            easeOutCirc: function(a) {
                return 1 * Math.sqrt(1 - (a = a / 1 - 1) * a)
            },
            easeInOutCirc: function(a) {
                return 1 > (a /= 0.5) ? -0.5 * (Math.sqrt(1 - a * a) - 1) : 0.5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
            },
            easeInElastic: function(a) {
                var c = 1.70158,
                    b = 0,
                    e = 1;
                if (0 == a) return 0;
                if (1 == (a /= 1)) return 1;
                b || (b = 0.3);
                e < Math.abs(1) ? (e = 1, c = b / 4) : c = b / (2 *
                    Math.PI) * Math.asin(1 / e);
                return -(e * Math.pow(2, 10 * (a -= 1)) * Math.sin((1 * a - c) * 2 * Math.PI / b))
            },
            easeOutElastic: function(a) {
                var c = 1.70158,
                    b = 0,
                    e = 1;
                if (0 == a) return 0;
                if (1 == (a /= 1)) return 1;
                b || (b = 0.3);
                e < Math.abs(1) ? (e = 1, c = b / 4) : c = b / (2 * Math.PI) * Math.asin(1 / e);
                return e * Math.pow(2, -10 * a) * Math.sin((1 * a - c) * 2 * Math.PI / b) + 1
            },
            easeInOutElastic: function(a) {
                var c = 1.70158,
                    b = 0,
                    e = 1;
                if (0 == a) return 0;
                if (2 == (a /= 0.5)) return 1;
                b || (b = 1 * 0.3 * 1.5);
                e < Math.abs(1) ? (e = 1, c = b / 4) : c = b / (2 * Math.PI) * Math.asin(1 / e);
                return 1 > a ? -0.5 * e * Math.pow(2, 10 *
                    (a -= 1)) * Math.sin((1 * a - c) * 2 * Math.PI / b) : 0.5 * e * Math.pow(2, -10 * (a -= 1)) * Math.sin((1 * a - c) * 2 * Math.PI / b) + 1
            },
            easeInBack: function(a) {
                return 1 * (a /= 1) * a * (2.70158 * a - 1.70158)
            },
            easeOutBack: function(a) {
                return 1 * ((a = a / 1 - 1) * a * (2.70158 * a + 1.70158) + 1)
            },
            easeInOutBack: function(a) {
                var c = 1.70158;
                return 1 > (a /= 0.5) ? 0.5 * a * a * (((c *= 1.525) + 1) * a - c) : 0.5 * ((a -= 2) * a * (((c *= 1.525) + 1) * a + c) + 2)
            },
            easeInBounce: function(a) {
                return 1 - B.easeOutBounce(1 - a)
            },
            easeOutBounce: function(a) {
                return (a /= 1) < 1 / 2.75 ? 1 * 7.5625 * a * a : a < 2 / 2.75 ? 1 * (7.5625 * (a -= 1.5 / 2.75) *
                    a + 0.75) : a < 2.5 / 2.75 ? 1 * (7.5625 * (a -= 2.25 / 2.75) * a + 0.9375) : 1 * (7.5625 * (a -= 2.625 / 2.75) * a + 0.984375)
            },
            easeInOutBounce: function(a) {
                return 0.5 > a ? 0.5 * B.easeInBounce(2 * a) : 0.5 * B.easeOutBounce(2 * a - 1) + 0.5
            }
        }, q = s.canvas.width,
        u = s.canvas.height;
    window.devicePixelRatio && (s.canvas.style.width = q + "px", s.canvas.style.height = u + "px", s.canvas.height = u * window.devicePixelRatio, s.canvas.width = q * window.devicePixelRatio, s.scale(window.devicePixelRatio, window.devicePixelRatio));
    this.PolarArea = function(a, c) {
        r.PolarArea.defaults = {
            scaleOverlay: !0,
            scaleOverride: !1,
            scaleSteps: null,
            scaleStepWidth: null,
            scaleStartValue: null,
            scaleShowLine: !0,
            scaleLineColor: "rgba(0,0,0,.1)",
            scaleLineWidth: 1,
            scaleShowLabels: !0,
            scaleLabel: "<%=value%>",
            scaleFontFamily: "'Arial'",
            scaleFontSize: 12,
            scaleFontStyle: "normal",
            scaleFontColor: "#666",
            scaleShowLabelBackdrop: !0,
            scaleBackdropColor: "rgba(255,255,255,0.75)",
            scaleBackdropPaddingY: 2,
            scaleBackdropPaddingX: 2,
            segmentShowStroke: !0,
            segmentStrokeColor: "#fff",
            segmentStrokeWidth: 2,
            animation: !0,
            animationSteps: 100,
            animationEasing: "easeOutBounce",
            animateRotate: !0,
            animateScale: !1,
            onAnimationComplete: null
        };
        var b = c ? y(r.PolarArea.defaults, c) : r.PolarArea.defaults;
        return new G(a, b, s)
    };
    this.Radar = function(a, c) {
        r.Radar.defaults = {
            scaleOverlay: !1,
            scaleOverride: !1,
            scaleSteps: null,
            scaleStepWidth: null,
            scaleStartValue: null,
            scaleShowLine: !0,
            scaleLineColor: "rgba(0,0,0,.1)",
            scaleLineWidth: 1,
            scaleShowLabels: !1,
            scaleLabel: "<%=value%>",
            scaleFontFamily: "'Arial'",
            scaleFontSize: 12,
            scaleFontStyle: "normal",
            scaleFontColor: "#666",
            scaleShowLabelBackdrop: !0,
            scaleBackdropColor: "rgba(255,255,255,0.75)",
            scaleBackdropPaddingY: 2,
            scaleBackdropPaddingX: 2,
            angleShowLineOut: !0,
            angleLineColor: "rgba(0,0,0,.1)",
            angleLineWidth: 1,
            pointLabelFontFamily: "'Arial'",
            pointLabelFontStyle: "normal",
            pointLabelFontSize: 12,
            pointLabelFontColor: "#666",
            pointDot: !0,
            pointDotRadius: 3,
            pointDotStrokeWidth: 1,
            datasetStroke: !0,
            datasetStrokeWidth: 2,
            datasetFill: !0,
            animation: !0,
            animationSteps: 60,
            animationEasing: "easeOutQuart",
            onAnimationComplete: null
        };
        var b = c ? y(r.Radar.defaults, c) : r.Radar.defaults;
        return new H(a, b, s)
    };
    this.Pie = function(a,
        c) {
        r.Pie.defaults = {
            segmentShowStroke: !0,
            segmentStrokeColor: "#fff",
            segmentStrokeWidth: 2,
            animation: !0,
            animationSteps: 100,
            animationEasing: "easeOutBounce",
            animateRotate: !0,
            animateScale: !1,
            onAnimationComplete: null
        };
        var b = c ? y(r.Pie.defaults, c) : r.Pie.defaults;
        return new I(a, b, s)
    };
    this.Doughnut = function(a, c) {
        r.Doughnut.defaults = {
            segmentShowStroke: !0,
            segmentStrokeColor: "#fff",
            segmentStrokeWidth: 2,
            percentageInnerCutout: 50,
            animation: !0,
            animationSteps: 100,
            animationEasing: "easeOutBounce",
            animateRotate: !0,
            animateScale: !1,
            onAnimationComplete: null
        };
        var b = c ? y(r.Doughnut.defaults, c) : r.Doughnut.defaults;
        return new J(a, b, s)
    };
    this.Line = function(a, c) {
        r.Line.defaults = {
            scaleOverlay: !1,
            scaleOverride: !1,
            scaleSteps: null,
            scaleStepWidth: null,
            scaleStartValue: null,
            scaleLineColor: "rgba(0,0,0,.1)",
            scaleLineWidth: 1,
            scaleShowLabels: !0,
            scaleLabel: "<%=value%>",
            scaleFontFamily: "'Arial'",
            scaleFontSize: 12,
            scaleFontStyle: "normal",
            scaleFontColor: "#666",
            scaleShowGridLines: !0,
            scaleGridLineColor: "rgba(0,0,0,.05)",
            scaleGridLineWidth: 1,
            bezierCurve: !0,
            pointDot: !0,
            pointDotRadius: 4,
            pointDotStrokeWidth: 2,
            datasetStroke: !0,
            datasetStrokeWidth: 2,
            datasetFill: !0,
            animation: !0,
            animationSteps: 60,
            animationEasing: "easeOutQuart",
            onAnimationComplete: null
        };
        var b = c ? y(r.Line.defaults, c) : r.Line.defaults;
        return new K(a, b, s)
    };
    this.Bar = function(a, c) {
        r.Bar.defaults = {
            scaleOverlay: !1,
            scaleOverride: !1,
            scaleSteps: null,
            scaleStepWidth: null,
            scaleStartValue: null,
            scaleLineColor: "rgba(0,0,0,.1)",
            scaleLineWidth: 1,
            scaleShowLabels: !0,
            scaleLabel: "<%=value%>",
            scaleFontFamily: "'Arial'",
            scaleFontSize: 12,
            scaleFontStyle: "normal",
            scaleFontColor: "#666",
            scaleShowGridLines: !0,
            scaleGridLineColor: "rgba(0,0,0,.05)",
            scaleGridLineWidth: 1,
            barShowStroke: !0,
            barStrokeWidth: 2,
            barValueSpacing: 5,
            barDatasetSpacing: 1,
            animation: !0,
            animationSteps: 60,
            animationEasing: "easeOutQuart",
            onAnimationComplete: null
        };
        var b = c ? y(r.Bar.defaults, c) : r.Bar.defaults;
        return new L(a, b, s)
    };
    var G = function(a, c, b) {
        var e, h, f, d, g, k, j, l, m;
        g = Math.min.apply(Math, [q, u]) / 2;
        g -= Math.max.apply(Math, [0.5 * c.scaleFontSize, 0.5 * c.scaleLineWidth]);
        d = 2 * c.scaleFontSize;
        c.scaleShowLabelBackdrop && (d += 2 * c.scaleBackdropPaddingY, g -= 1.5 * c.scaleBackdropPaddingY);
        l = g;
        d = d ? d : 5;
        e = Number.MIN_VALUE;
        h = Number.MAX_VALUE;
        for (f = 0; f < a.length; f++) a[f].value > e && (e = a[f].value), a[f].value < h && (h = a[f].value);
        f = Math.floor(l / (0.66 * d));
        d = Math.floor(0.5 * (l / d));
        m = c.scaleShowLabels ? c.scaleLabel : null;
        c.scaleOverride ? (j = {
            steps: c.scaleSteps,
            stepValue: c.scaleStepWidth,
            graphMin: c.scaleStartValue,
            labels: []
        }, z(m, j.labels, j.steps, c.scaleStartValue, c.scaleStepWidth)) : j = C(l, f, d, e, h,
            m);
        k = g / j.steps;
        x(c, function() {
            for (var a = 0; a < j.steps; a++)
                if (c.scaleShowLine && (b.beginPath(), b.arc(q / 2, u / 2, k * (a + 1), 0, 2 * Math.PI, !0), b.strokeStyle = c.scaleLineColor, b.lineWidth = c.scaleLineWidth, b.stroke()), c.scaleShowLabels) {
                    b.textAlign = "center";
                    b.font = c.scaleFontStyle + " " + c.scaleFontSize + "px " + c.scaleFontFamily;
                    var e = j.labels[a];
                    if (c.scaleShowLabelBackdrop) {
                        var d = b.measureText(e).width;
                        b.fillStyle = c.scaleBackdropColor;
                        b.beginPath();
                        b.rect(Math.round(q / 2 - d / 2 - c.scaleBackdropPaddingX), Math.round(u / 2 - k * (a +
                            1) - 0.5 * c.scaleFontSize - c.scaleBackdropPaddingY), Math.round(d + 2 * c.scaleBackdropPaddingX), Math.round(c.scaleFontSize + 2 * c.scaleBackdropPaddingY));
                        b.fill()
                    }
                    b.textBaseline = "middle";
                    b.fillStyle = c.scaleFontColor;
                    b.fillText(e, q / 2, u / 2 - k * (a + 1))
                }
        }, function(e) {
            var d = -Math.PI / 2,
                g = 2 * Math.PI / a.length,
                f = 1,
                h = 1;
            c.animation && (c.animateScale && (f = e), c.animateRotate && (h = e));
            for (e = 0; e < a.length; e++) b.beginPath(), b.arc(q / 2, u / 2, f * v(a[e].value, j, k), d, d + h * g, !1), b.lineTo(q / 2, u / 2), b.closePath(), b.fillStyle = a[e].color, b.fill(),
            c.segmentShowStroke && (b.strokeStyle = c.segmentStrokeColor, b.lineWidth = c.segmentStrokeWidth, b.stroke()), d += h * g
        }, b)
    }, H = function(a, c, b) {
            var e, h, f, d, g, k, j, l, m;
            a.labels || (a.labels = []);
            g = Math.min.apply(Math, [q, u]) / 2;
            d = 2 * c.scaleFontSize;
            for (e = l = 0; e < a.labels.length; e++) b.font = c.pointLabelFontStyle + " " + c.pointLabelFontSize + "px " + c.pointLabelFontFamily, h = b.measureText(a.labels[e]).width, h > l && (l = h);
            g -= Math.max.apply(Math, [l, 1.5 * (c.pointLabelFontSize / 2)]);
            g -= c.pointLabelFontSize;
            l = g = A(g, null, 0);
            d = d ? d : 5;
            e = Number.MIN_VALUE;
            h = Number.MAX_VALUE;
            for (f = 0; f < a.datasets.length; f++)
                for (m = 0; m < a.datasets[f].data.length; m++) a.datasets[f].data[m] > e && (e = a.datasets[f].data[m]), a.datasets[f].data[m] < h && (h = a.datasets[f].data[m]);
            f = Math.floor(l / (0.66 * d));
            d = Math.floor(0.5 * (l / d));
            m = c.scaleShowLabels ? c.scaleLabel : null;
            c.scaleOverride ? (j = {
                steps: c.scaleSteps,
                stepValue: c.scaleStepWidth,
                graphMin: c.scaleStartValue,
                labels: []
            }, z(m, j.labels, j.steps, c.scaleStartValue, c.scaleStepWidth)) : j = C(l, f, d, e, h, m);
            k = g / j.steps;
            x(c, function() {
                var e = 2 * Math.PI /
                    a.datasets[0].data.length;
                b.save();
                b.translate(q / 2, u / 2);
                if (c.angleShowLineOut) {
                    b.strokeStyle = c.angleLineColor;
                    b.lineWidth = c.angleLineWidth;
                    for (var d = 0; d < a.datasets[0].data.length; d++) b.rotate(e), b.beginPath(), b.moveTo(0, 0), b.lineTo(0, -g), b.stroke()
                }
                for (d = 0; d < j.steps; d++) {
                    b.beginPath();
                    if (c.scaleShowLine) {
                        b.strokeStyle = c.scaleLineColor;
                        b.lineWidth = c.scaleLineWidth;
                        b.moveTo(0, -k * (d + 1));
                        for (var f = 0; f < a.datasets[0].data.length; f++) b.rotate(e), b.lineTo(0, -k * (d + 1));
                        b.closePath();
                        b.stroke()
                    }
                    c.scaleShowLabels &&
                        (b.textAlign = "center", b.font = c.scaleFontStyle + " " + c.scaleFontSize + "px " + c.scaleFontFamily, b.textBaseline = "middle", c.scaleShowLabelBackdrop && (f = b.measureText(j.labels[d]).width, b.fillStyle = c.scaleBackdropColor, b.beginPath(), b.rect(Math.round(-f / 2 - c.scaleBackdropPaddingX), Math.round(-k * (d + 1) - 0.5 * c.scaleFontSize - c.scaleBackdropPaddingY), Math.round(f + 2 * c.scaleBackdropPaddingX), Math.round(c.scaleFontSize + 2 * c.scaleBackdropPaddingY)), b.fill()), b.fillStyle = c.scaleFontColor, b.fillText(j.labels[d], 0, -k * (d +
                        1)))
                }
                for (d = 0; d < a.labels.length; d++) {
                    b.font = c.pointLabelFontStyle + " " + c.pointLabelFontSize + "px " + c.pointLabelFontFamily;
                    b.fillStyle = c.pointLabelFontColor;
                    var f = Math.sin(e * d) * (g + c.pointLabelFontSize),
                        h = Math.cos(e * d) * (g + c.pointLabelFontSize);
                    b.textAlign = e * d == Math.PI || 0 == e * d ? "center" : e * d > Math.PI ? "right" : "left";
                    b.textBaseline = "middle";
                    b.fillText(a.labels[d], f, -h)
                }
                b.restore()
            }, function(d) {
                var e = 2 * Math.PI / a.datasets[0].data.length;
                b.save();
                b.translate(q / 2, u / 2);
                for (var g = 0; g < a.datasets.length; g++) {
                    b.beginPath();
                    b.moveTo(0, d * -1 * v(a.datasets[g].data[0], j, k));
                    for (var f = 1; f < a.datasets[g].data.length; f++) b.rotate(e), b.lineTo(0, d * -1 * v(a.datasets[g].data[f], j, k));
                    b.closePath();
                    b.fillStyle = a.datasets[g].fillColor;
                    b.strokeStyle = a.datasets[g].strokeColor;
                    b.lineWidth = c.datasetStrokeWidth;
                    b.fill();
                    b.stroke();
                    if (c.pointDot) {
                        b.fillStyle = a.datasets[g].pointColor;
                        b.strokeStyle = a.datasets[g].pointStrokeColor;
                        b.lineWidth = c.pointDotStrokeWidth;
                        for (f = 0; f < a.datasets[g].data.length; f++) b.rotate(e), b.beginPath(), b.arc(0, d * -1 *
                            v(a.datasets[g].data[f], j, k), c.pointDotRadius, 2 * Math.PI, !1), b.fill(), b.stroke()
                    }
                    b.rotate(e)
                }
                b.restore()
            }, b)
        }, I = function(a, c, b) {
            for (var e = 0, h = Math.min.apply(Math, [u / 2, q / 2]) - 5, f = 0; f < a.length; f++) e += a[f].value;
            x(c, null, function(d) {
                var g = -Math.PI / 2,
                    f = 1,
                    j = 1;
                c.animation && (c.animateScale && (f = d), c.animateRotate && (j = d));
                for (d = 0; d < a.length; d++) {
                    var l = j * a[d].value / e * 2 * Math.PI;
                    b.beginPath();
                    b.arc(q / 2, u / 2, f * h, g, g + l);
                    b.lineTo(q / 2, u / 2);
                    b.closePath();
                    b.fillStyle = a[d].color;
                    b.fill();
                    c.segmentShowStroke && (b.lineWidth =
                        c.segmentStrokeWidth, b.strokeStyle = c.segmentStrokeColor, b.stroke());
                    g += l
                }
            }, b)
        }, J = function(a, c, b) {
            for (var e = 0, h = Math.min.apply(Math, [u / 2, q / 2]) - 5, f = h * (c.percentageInnerCutout / 100), d = 0; d < a.length; d++) e += a[d].value;
            x(c, null, function(d) {
                var k = -Math.PI / 2,
                    j = 1,
                    l = 1;
                c.animation && (c.animateScale && (j = d), c.animateRotate && (l = d));
                for (d = 0; d < a.length; d++) {
                    var m = l * a[d].value / e * 2 * Math.PI;
                    b.beginPath();
                    b.arc(q / 2, u / 2, j * h, k, k + m, !1);
                    b.arc(q / 2, u / 2, j * f, k + m, k, !0);
                    b.closePath();
                    b.fillStyle = a[d].color;
                    b.fill();
                    c.segmentShowStroke &&
                        (b.lineWidth = c.segmentStrokeWidth, b.strokeStyle = c.segmentStrokeColor, b.stroke());
                    k += m
                }
            }, b)
        }, K = function(a, c, b) {
            var e, h, f, d, g, k, j, l, m, t, r, n, p, s = 0;
            g = u;
            b.font = c.scaleFontStyle + " " + c.scaleFontSize + "px " + c.scaleFontFamily;
            t = 1;
            for (d = 0; d < a.labels.length; d++) e = b.measureText(a.labels[d]).width, t = e > t ? e : t;
            q / a.labels.length < t ? (s = 45, q / a.labels.length < Math.cos(s) * t ? (s = 90, g -= t) : g -= Math.sin(s) * t) : g -= c.scaleFontSize;
            d = c.scaleFontSize;
            g = g - 5 - d;
            e = Number.MIN_VALUE;
            h = Number.MAX_VALUE;
            for (f = 0; f < a.datasets.length; f++)
                for (l =
                    0; l < a.datasets[f].data.length; l++) a.datasets[f].data[l] > e && (e = a.datasets[f].data[l]), a.datasets[f].data[l] < h && (h = a.datasets[f].data[l]);
            f = Math.floor(g / (0.66 * d));
            d = Math.floor(0.5 * (g / d));
            l = c.scaleShowLabels ? c.scaleLabel : "";
            c.scaleOverride ? (j = {
                steps: c.scaleSteps,
                stepValue: c.scaleStepWidth,
                graphMin: c.scaleStartValue,
                labels: []
            }, z(l, j.labels, j.steps, c.scaleStartValue, c.scaleStepWidth)) : j = C(g, f, d, e, h, l);
            k = Math.floor(g / j.steps);
            d = 1;
            if (c.scaleShowLabels) {
                b.font = c.scaleFontStyle + " " + c.scaleFontSize + "px " + c.scaleFontFamily;
                for (e = 0; e < j.labels.length; e++) h = b.measureText(j.labels[e]).width, d = h > d ? h : d;
                d += 10
            }
            r = q - d - t;
            m = Math.floor(r / (a.labels.length - 1));
            n = q - t / 2 - r;
            p = g + c.scaleFontSize / 2;
            x(c, function() {
                b.lineWidth = c.scaleLineWidth;
                b.strokeStyle = c.scaleLineColor;
                b.beginPath();
                b.moveTo(q - t / 2 + 5, p);
                b.lineTo(q - t / 2 - r - 5, p);
                b.stroke();
                0 < s ? (b.save(), b.textAlign = "right") : b.textAlign = "center";
                b.fillStyle = c.scaleFontColor;
                for (var d = 0; d < a.labels.length; d++) b.save(), 0 < s ? (b.translate(n + d * m, p + c.scaleFontSize), b.rotate(-(s * (Math.PI / 180))), b.fillText(a.labels[d],
                    0, 0), b.restore()) : b.fillText(a.labels[d], n + d * m, p + c.scaleFontSize + 3), b.beginPath(), b.moveTo(n + d * m, p + 3), c.scaleShowGridLines && 0 < d ? (b.lineWidth = c.scaleGridLineWidth, b.strokeStyle = c.scaleGridLineColor, b.lineTo(n + d * m, 5)) : b.lineTo(n + d * m, p + 3), b.stroke();
                b.lineWidth = c.scaleLineWidth;
                b.strokeStyle = c.scaleLineColor;
                b.beginPath();
                b.moveTo(n, p + 5);
                b.lineTo(n, 5);
                b.stroke();
                b.textAlign = "right";
                b.textBaseline = "middle";
                for (d = 0; d < j.steps; d++) b.beginPath(), b.moveTo(n - 3, p - (d + 1) * k), c.scaleShowGridLines ? (b.lineWidth = c.scaleGridLineWidth,
                    b.strokeStyle = c.scaleGridLineColor, b.lineTo(n + r + 5, p - (d + 1) * k)) : b.lineTo(n - 0.5, p - (d + 1) * k), b.stroke(), c.scaleShowLabels && b.fillText(j.labels[d], n - 8, p - (d + 1) * k)
            }, function(d) {
                function e(b, c) {
                    return p - d * v(a.datasets[b].data[c], j, k)
                }
                for (var f = 0; f < a.datasets.length; f++) {
                    b.strokeStyle = a.datasets[f].strokeColor;
                    b.lineWidth = c.datasetStrokeWidth;
                    b.beginPath();
                    b.moveTo(n, p - d * v(a.datasets[f].data[0], j, k));
                    for (var g = 1; g < a.datasets[f].data.length; g++) c.bezierCurve ? b.bezierCurveTo(n + m * (g - 0.5), e(f, g - 1), n + m * (g - 0.5),
                        e(f, g), n + m * g, e(f, g)) : b.lineTo(n + m * g, e(f, g));
                    b.stroke();
                    c.datasetFill ? (b.lineTo(n + m * (a.datasets[f].data.length - 1), p), b.lineTo(n, p), b.closePath(), b.fillStyle = a.datasets[f].fillColor, b.fill()) : b.closePath();
                    if (c.pointDot) {
                        b.fillStyle = a.datasets[f].pointColor;
                        b.strokeStyle = a.datasets[f].pointStrokeColor;
                        b.lineWidth = c.pointDotStrokeWidth;
                        for (g = 0; g < a.datasets[f].data.length; g++) b.beginPath(), b.arc(n + m * g, p - d * v(a.datasets[f].data[g], j, k), c.pointDotRadius, 0, 2 * Math.PI, !0), b.fill(), b.stroke()
                    }
                }
            }, b)
        }, L = function(a,
            c, b) {
            var e, h, f, d, g, k, j, l, m, t, r, n, p, s, w = 0;
            g = u;
            b.font = c.scaleFontStyle + " " + c.scaleFontSize + "px " + c.scaleFontFamily;
            t = 1;
            for (d = 0; d < a.labels.length; d++) e = b.measureText(a.labels[d]).width, t = e > t ? e : t;
            q / a.labels.length < t ? (w = 45, q / a.labels.length < Math.cos(w) * t ? (w = 90, g -= t) : g -= Math.sin(w) * t) : g -= c.scaleFontSize;
            d = c.scaleFontSize;
            g = g - 5 - d;
            e = Number.MIN_VALUE;
            h = Number.MAX_VALUE;
            for (f = 0; f < a.datasets.length; f++)
                for (l = 0; l < a.datasets[f].data.length; l++) a.datasets[f].data[l] > e && (e = a.datasets[f].data[l]), a.datasets[f].data[l] <
                    h && (h = a.datasets[f].data[l]);
            f = Math.floor(g / (0.66 * d));
            d = Math.floor(0.5 * (g / d));
            l = c.scaleShowLabels ? c.scaleLabel : "";
            c.scaleOverride ? (j = {
                steps: c.scaleSteps,
                stepValue: c.scaleStepWidth,
                graphMin: c.scaleStartValue,
                labels: []
            }, z(l, j.labels, j.steps, c.scaleStartValue, c.scaleStepWidth)) : j = C(g, f, d, e, h, l);
            k = Math.floor(g / j.steps);
            d = 1;
            if (c.scaleShowLabels) {
                b.font = c.scaleFontStyle + " " + c.scaleFontSize + "px " + c.scaleFontFamily;
                for (e = 0; e < j.labels.length; e++) h = b.measureText(j.labels[e]).width, d = h > d ? h : d;
                d += 10
            }
            r = q - d - t;
            m =
                Math.floor(r / a.labels.length);
            s = (m - 2 * c.scaleGridLineWidth - 2 * c.barValueSpacing - (c.barDatasetSpacing * a.datasets.length - 1) - (c.barStrokeWidth / 2 * a.datasets.length - 1)) / a.datasets.length;
            n = q - t / 2 - r;
            p = g + c.scaleFontSize / 2;
            x(c, function() {
                b.lineWidth = c.scaleLineWidth;
                b.strokeStyle = c.scaleLineColor;
                b.beginPath();
                b.moveTo(q - t / 2 + 5, p);
                b.lineTo(q - t / 2 - r - 5, p);
                b.stroke();
                0 < w ? (b.save(), b.textAlign = "right") : b.textAlign = "center";
                b.fillStyle = c.scaleFontColor;
                for (var d = 0; d < a.labels.length; d++) b.save(), 0 < w ? (b.translate(n +
                    d * m, p + c.scaleFontSize), b.rotate(-(w * (Math.PI / 180))), b.fillText(a.labels[d], 0, 0), b.restore()) : b.fillText(a.labels[d], n + d * m + m / 2, p + c.scaleFontSize + 3), b.beginPath(), b.moveTo(n + (d + 1) * m, p + 3), b.lineWidth = c.scaleGridLineWidth, b.strokeStyle = c.scaleGridLineColor, b.lineTo(n + (d + 1) * m, 5), b.stroke();
                b.lineWidth = c.scaleLineWidth;
                b.strokeStyle = c.scaleLineColor;
                b.beginPath();
                b.moveTo(n, p + 5);
                b.lineTo(n, 5);
                b.stroke();
                b.textAlign = "right";
                b.textBaseline = "middle";
                for (d = 0; d < j.steps; d++) b.beginPath(), b.moveTo(n - 3, p - (d + 1) *
                    k), c.scaleShowGridLines ? (b.lineWidth = c.scaleGridLineWidth, b.strokeStyle = c.scaleGridLineColor, b.lineTo(n + r + 5, p - (d + 1) * k)) : b.lineTo(n - 0.5, p - (d + 1) * k), b.stroke(), c.scaleShowLabels && b.fillText(j.labels[d], n - 8, p - (d + 1) * k)
            }, function(d) {
                b.lineWidth = c.barStrokeWidth;
                for (var e = 0; e < a.datasets.length; e++) {
                    b.fillStyle = a.datasets[e].fillColor;
                    b.strokeStyle = a.datasets[e].strokeColor;
                    for (var f = 0; f < a.datasets[e].data.length; f++) {
                        var g = n + c.barValueSpacing + m * f + s * e + c.barDatasetSpacing * e + c.barStrokeWidth * e;
                        b.beginPath();
                        b.moveTo(g, p);
                        b.lineTo(g, p - d * v(a.datasets[e].data[f], j, k) + c.barStrokeWidth / 2);
                        b.lineTo(g + s, p - d * v(a.datasets[e].data[f], j, k) + c.barStrokeWidth / 2);
                        b.lineTo(g + s, p);
                        c.barShowStroke && b.stroke();
                        b.closePath();
                        b.fill()
                    }
                }
            }, b)
        }, D = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
            window.setTimeout(a, 1E3 / 60)
        }, F = {}
};