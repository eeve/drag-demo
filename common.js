var Common = {
    llq: (function(ua) {
        var s = {};
        s.IE = ua.match(/msie ([\d.]+)/) ? true : false;
        s.Firefox = ua.match(/firefox\/([\d.]+)/) ? true : false;
        s.Chrome = ua.match(/chrome\/([\d.]+)/) ? true : false;
        s.IE6 = (s.IE && ([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 6)) ? true : false;
        s.IE7 = (s.IE && ([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 7)) ? true : false;
        s.IE8 = (s.IE && ([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 8)) ? true : false;
        return s;
    })(navigator.userAgent.toLowerCase()),
    getEvent: function() { //ie/ff
        if (document.all) {
            return window.event;
        }
        func = getEvent.caller;
        while (func != null) {
            var arg0 = func.arguments[0];
            if (arg0) {
                if ((arg0.constructor == Event || arg0.constructor == MouseEvent) || (typeof(arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {
                    return arg0;
                }
            }
            func = func.caller;
        }
        return null;
    },
    getMousePos: function(ev) {
        if (!ev) {
            ev = this.getEvent();
        }
        if (ev.pageX || ev.pageY) {
            return {
                x: ev.pageX,
                y: ev.pageY
            };
        }

        if (document.documentElement && document.documentElement.scrollTop) {
            return {
                x: ev.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft,
                y: ev.clientY + document.documentElement.scrollTop - document.documentElement.clientTop
            };
        } else if (document.body) {
            return {
                x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
                y: ev.clientY + document.body.scrollTop - document.body.clientTop
            };
        }
    },
    getElementPos: function(el) {
        el = this.$(el);
        var _x = 0,
            _y = 0;
        do {
            _x += el.offsetLeft;
            _y += el.offsetTop;
        } while (el = el.offsetParent);
        return {
            x: _x,
            y: _y
        };
    },
    getMousePosInRange: function(ev, el) {
        var pos = this.getMousePos(ev);
        var elPos = this.getElementPos(el);
        return {
            x: pos.x - elPos.x,
            y: pos.y - elPos.y
        };
    },
    $: function(id) {
        return "string" == typeof id ? document.getElementById(id) : id;
    },
    getViewportSize: {
        w: (window.innerWidth) ? window.innerWidth : (document.documentElement && document.documentElement.clientWidth) ? document.documentElement.clientWidth : (document.body ? document.body.offsetWidth : 0),
        h: (window.innerHeight) ? window.innerHeight : (document.documentElement && document.documentElement.clientHeight) ? document.documentElement.clientHeight : (document.body ? document.body.offsetHeight : 0)
    },
    isIE: document.all ? true : false,
    setOuterHtml: function(obj, html) {
        var Objrange = document.createRange();
        obj.innerHTML = html;
        Objrange.selectNodeContents(obj);
        var frag = Objrange.extractContents();
        obj.parentNode.insertBefore(frag, obj);
        obj.parentNode.removeChild(obj);
    },
    firstChild: function(parentObj, tagName) {
        if (Common.isIE) {
            return parentObj.firstChild;
        } else {
            var arr = parentObj.getElementsByTagName(tagName);
            return arr[0];
        }
    },
    lastChild: function(parentObj, tagName) {
        if (Common.isIE) {
            return parentObj.lastChild;
        } else {
            var arr = parentObj.getElementsByTagName(tagName);
            return arr[arr.length - 1];
        }
    },
    setCookie: function(name, value) {
        document.cookie = name + "=" + value;
    },
    getCookie: function(name) {
        var strCookie = document.cookie;
        var arrCookie = strCookie.split("; ");
        for (var i = 0; i < arrCookie.length; i++) {
            var arr = arrCookie[i].split("=");
            if (!arr[1]) {
                return "";
            }
            if (arr[0] == name) {
                return arr[1];
            }
        }
        return "";
    },
    delCookie: function(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(name);
        if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    },
    Css: function(e, o) {
        for (var i in o)
            e.style[i] = o[i];
    },
    Extend: function(destination, source) {
        for (var property in source) {
            destination[property] = source[property];
        }
    },
    Bind: function(object, fun) {
        var args = Array.prototype.slice.call(arguments).slice(2);
        return function() {
            return fun.apply(object, args);
        }
    },
    BindAsEventListener: function(object, fun) {
        var args = Array.prototype.slice.call(arguments).slice(2);
        return function(event) {
            return fun.apply(object, [event || window.event].concat(args));
        }
    },
    CurrentStyle: function(element) {
        return element.currentStyle || document.defaultView.getComputedStyle(element, null);
    },
    addListener: function(element, e, fn) {
        element.addEventListener ? element.addEventListener(e, fn, false) : element.attachEvent("on" + e, fn);
    },
    removeListener: function(element, e, fn) {
        element.removeEventListener ? element.removeEventListener(e, fn, false) : element.detachEvent("on" + e, fn)
    }
}