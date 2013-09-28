// presentation for yahoo hack day 2013
(function (w, d, a) {
  var $ = w[a.k] = {
    'w': w, 'd': d, 'a': a, 's': {}, 'v': {'current':{}},
    'f': (function () {
      return {
        kill: function (obj) {
          if (typeof obj === 'string') {
            obj = $.d.getElementById(obj);
          }
          if (obj && obj.parentNode) {
            obj.parentNode.removeChild(obj);
          }
        },
        get: function (el, att) {
          var v = null;
          if (typeof el[att] === 'string') {
            v = el[att];
          } else {
            v = el.getAttribute(att);
          }
          return v;
        },
        set: function (el, att, string) {
          if (typeof el[att] === 'string') {
            el[att] = string;
          } else {
            el.setAttribute(att, string);
          }
        },
        make: function(obj) {
          var el = false, tag, att;
          for (tag in obj) {
            if (obj[tag].hasOwnProperty) {
              el = $.d.createElement(tag);
              for (att in obj[tag]) {
                if (obj[tag][att].hasOwnProperty) {
                  if (typeof obj[tag][att] === 'string') {
                    $.f.set(el, att, obj[tag][att]);
                  }
                }
              }
              break;
            }
          }
          return el;
        },
        listen : function (el, ev, fn) {
          if (typeof $.w.addEventListener !== 'undefined') {
            el.addEventListener(ev, fn, false);
          } else if (typeof $.w.attachEvent !== 'undefined') {
            el.attachEvent('on' + ev, fn);
          }
        },
        click: function (v) {
          var t = v || $.w.event, el = null;
          if (t.target) {
            el = (t.target.nodeType === 3) ? t.target.parentNode : t.target;
          } else {
            el = t.srcElement;
          }
        },
        show: function () {
          var curr = $.s.li[$.v.current];
          curr.className = 'open';  
          curr.style.fontSize = $.v.fontSize + 'px';
          $.w.location.hash = $.v.current;
          $.w.setTimeout(function () {
            var oh = $.s.li[$.v.current].offsetHeight;
            var wh = $.w.innerHeight;
            var ow = $.s.li[$.v.current].offsetWidth;
            var ww = $.w.innerWidth;
            curr.style.top = (wh - oh) / 2 + 'px';
            curr.style.left = (ww - wh) / 2 + 'px';
          }, 500);
        },
        key: {
          bigger: function () {
            $.v.fontSize = $.v.fontSize + 1;
            $.f.show();
          },
          smaller: function () {
            $.v.fontSize = $.v.fontSize - 1;
            $.f.show();
          },
          up: function () {
          },
          down: function () {
          },
          right: function () {
            $.s.li[$.v.current].className = 'closed';  
            $.v.current = $.v.current + 1;
            if ($.v.current === $.s.li.length) {
              $.v.current = $.s.li.length - 1;
            }
            $.f.show();
         },
         left: function () {
            $.s.li[$.v.current].className = 'closed';  
            $.v.current = $.v.current - 1;
            if ($.v.current < 0) {
              $.v.current = 0;
            }
            $.f.show();
          },
          escape: function () {
          },
          enter: function () {
          }
        },
        keydown: function (v) {
          var t = v || $.w.event, el = null, k = t.keyCode || null;
          if (k) {
            var kc = '' + k;
            if ($.a.keyCode[kc] && typeof $.f.key[$.a.keyCode[kc]] === 'function') {
              $.f.key[$.a.keyCode[kc]]();
            }
          }
        },
        behavior: function () {
          $.f.listen($.d.b, 'click', $.f.click);
          $.f.listen($.d, 'keydown', $.f.keydown);
          $.v.current = 0;
          $.v.fontSize = $.a.fontSize;
          if ($.w.location.hash.split('#')[1]) {
            var p = $.w.location.hash.split('#')[1] - 0;
            if (p){
              $.v.current = p;
            }
          }
          $.f.show();
        },
        structure: function () {
          $.d.b = $.d.getElementsByTagName('BODY')[0];
          $.s.ul = $.d.getElementsByTagName('UL')[0];
          $.s.li = [];
          var e = $.d.getElementsByTagName('LI'), i, n = e.length;
          for (i = 0; i < n; i = i + 1) {
            e[i].className = 'closed';
            $.s.li.push(e[i]);
          } 
          $.s.ul.className = '';
        },
        init : function () {
          $.f.structure();
          $.f.behavior();
        }
      };
    }())
  };
  $.f.init();
}(window, document, {
  'k': 'KB_PRESO',
  'fontSize': 18,
  'keyCode': {
    '13': 'enter',
    '27': 'escape', 
    '37': 'left',
    '38': 'up',
    '39': 'right',
    '40': 'down',
    '187': 'bigger',
    '189': 'smaller'
  }
}));