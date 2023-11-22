var config = {
  // 项目名称
  appId: 'monitor-sdk-demo',
  userId: 'ys',
  //上报地址
  reportUrl: 'http://localhost:3001/report/actions',
  //是否全埋点
  trackerAll: false,
  vue: {
    Vue: null,
    router: null
  },
  ua: navigator.userAgent
};
function setConfig(options) {
  for (var key in config) {
    if (options[key]) {
      config[key] = options[key];
    }
  }
}
var e,
  n,
  t,
  r,
  a = -1,
  o = function o(e) {
    addEventListener("pageshow", function (n) {
      n.persisted && (a = n.timeStamp, e(n));
    }, !0);
  },
  c = function c() {
    return window.performance && performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
  },
  u = function u() {
    var e = c();
    return e && e.activationStart || 0;
  },
  f = function f(e, n) {
    var t = c(),
      r = "navigate";
    a >= 0 ? r = "back-forward-cache" : t && (document.prerendering || u() > 0 ? r = "prerender" : document.wasDiscarded ? r = "restore" : t.type && (r = t.type.replace(/_/g, "-")));
    return {
      name: e,
      value: void 0 === n ? -1 : n,
      rating: "good",
      delta: 0,
      entries: [],
      id: "v3-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12),
      navigationType: r
    };
  },
  s = function s(e, n, t) {
    try {
      if (PerformanceObserver.supportedEntryTypes.includes(e)) {
        var r = new PerformanceObserver(function (e) {
          Promise.resolve().then(function () {
            n(e.getEntries());
          });
        });
        return r.observe(Object.assign({
          type: e,
          buffered: !0
        }, t || {})), r;
      }
    } catch (e) {}
  },
  d = function d(e, n, t, r) {
    var i, a;
    return function (o) {
      n.value >= 0 && (o || r) && ((a = n.value - (i || 0)) || void 0 === i) && (i = n.value, n.delta = a, n.rating = function (e, n) {
        return e > n[1] ? "poor" : e > n[0] ? "needs-improvement" : "good";
      }(n.value, t), e(n));
    };
  },
  l = function l(e) {
    requestAnimationFrame(function () {
      return requestAnimationFrame(function () {
        return e();
      });
    });
  },
  p = function p(e) {
    var n = function n(_n2) {
      "pagehide" !== _n2.type && "hidden" !== document.visibilityState || e(_n2);
    };
    addEventListener("visibilitychange", n, !0), addEventListener("pagehide", n, !0);
  },
  v = function v(e) {
    var n = !1;
    return function (t) {
      n || (e(t), n = !0);
    };
  },
  m = -1,
  h = function h() {
    return "hidden" !== document.visibilityState || document.prerendering ? 1 / 0 : 0;
  },
  g = function g(e) {
    "hidden" === document.visibilityState && m > -1 && (m = "visibilitychange" === e.type ? e.timeStamp : 0, T());
  },
  y = function y() {
    addEventListener("visibilitychange", g, !0), addEventListener("prerenderingchange", g, !0);
  },
  T = function T() {
    removeEventListener("visibilitychange", g, !0), removeEventListener("prerenderingchange", g, !0);
  },
  E = function E() {
    return m < 0 && (m = h(), y(), o(function () {
      setTimeout(function () {
        m = h(), y();
      }, 0);
    })), {
      get firstHiddenTime() {
        return m;
      }
    };
  },
  C = function C(e) {
    document.prerendering ? addEventListener("prerenderingchange", function () {
      return e();
    }, !0) : e();
  },
  L = [1800, 3e3],
  b = function b(e, n) {
    n = n || {}, C(function () {
      var t,
        r = E(),
        i = f("FCP"),
        a = s("paint", function (e) {
          e.forEach(function (e) {
            "first-contentful-paint" === e.name && (a.disconnect(), e.startTime < r.firstHiddenTime && (i.value = Math.max(e.startTime - u(), 0), i.entries.push(e), t(!0)));
          });
        });
      a && (t = d(e, i, L, n.reportAllChanges), o(function (r) {
        i = f("FCP"), t = d(e, i, L, n.reportAllChanges), l(function () {
          i.value = performance.now() - r.timeStamp, t(!0);
        });
      }));
    });
  },
  w = [.1, .25],
  S = function S(e, n) {
    n = n || {}, b(v(function () {
      var t,
        r = f("CLS", 0),
        i = 0,
        a = [],
        c = function c(e) {
          e.forEach(function (e) {
            if (!e.hadRecentInput) {
              var n = a[0],
                t = a[a.length - 1];
              i && e.startTime - t.startTime < 1e3 && e.startTime - n.startTime < 5e3 ? (i += e.value, a.push(e)) : (i = e.value, a = [e]);
            }
          }), i > r.value && (r.value = i, r.entries = a, t());
        },
        u = s("layout-shift", c);
      u && (t = d(e, r, w, n.reportAllChanges), p(function () {
        c(u.takeRecords()), t(!0);
      }), o(function () {
        i = 0, r = f("CLS", 0), t = d(e, r, w, n.reportAllChanges), l(function () {
          return t();
        });
      }), setTimeout(t, 0));
    }));
  },
  A = {
    passive: !0,
    capture: !0
  },
  I = new Date(),
  P = function P(r, i) {
    e || (e = i, n = r, t = new Date(), k(removeEventListener), F());
  },
  F = function F() {
    if (n >= 0 && n < t - I) {
      var i = {
        entryType: "first-input",
        name: e.type,
        target: e.target,
        cancelable: e.cancelable,
        startTime: e.timeStamp,
        processingStart: e.timeStamp + n
      };
      r.forEach(function (e) {
        e(i);
      }), r = [];
    }
  },
  M = function M(e) {
    if (e.cancelable) {
      var n = (e.timeStamp > 1e12 ? new Date() : performance.now()) - e.timeStamp;
      "pointerdown" == e.type ? function (e, n) {
        var t = function t() {
            P(e, n), i();
          },
          r = function r() {
            i();
          },
          i = function i() {
            removeEventListener("pointerup", t, A), removeEventListener("pointercancel", r, A);
          };
        addEventListener("pointerup", t, A), addEventListener("pointercancel", r, A);
      }(n, e) : P(n, e);
    }
  },
  k = function k(e) {
    ["mousedown", "keydown", "touchstart", "pointerdown"].forEach(function (n) {
      return e(n, M, A);
    });
  },
  D = [100, 300],
  x = function x(t, i) {
    i = i || {}, C(function () {
      var a,
        c = E(),
        u = f("FID"),
        l = function l(e) {
          e.startTime < c.firstHiddenTime && (u.value = e.processingStart - e.startTime, u.entries.push(e), a(!0));
        },
        m = function m(e) {
          e.forEach(l);
        },
        h = s("first-input", m);
      a = d(t, u, D, i.reportAllChanges), h && p(v(function () {
        m(h.takeRecords()), h.disconnect();
      })), h && o(function () {
        var o;
        u = f("FID"), a = d(t, u, D, i.reportAllChanges), r = [], n = -1, e = null, k(addEventListener), o = l, r.push(o), F();
      });
    });
  },
  U = [2500, 4e3],
  V = {},
  W = function W(e, n) {
    n = n || {}, C(function () {
      var t,
        r = E(),
        i = f("LCP"),
        a = function a(e) {
          var n = e[e.length - 1];
          n && n.startTime < r.firstHiddenTime && (i.value = Math.max(n.startTime - u(), 0), i.entries = [n], t());
        },
        c = s("largest-contentful-paint", a);
      if (c) {
        t = d(e, i, U, n.reportAllChanges);
        var m = v(function () {
          V[i.id] || (a(c.takeRecords()), c.disconnect(), V[i.id] = !0, t(!0));
        });
        ["keydown", "click"].forEach(function (e) {
          addEventListener(e, m, !0);
        }), p(m), o(function (r) {
          i = f("LCP"), t = d(e, i, U, n.reportAllChanges), l(function () {
            i.value = performance.now() - r.timeStamp, V[i.id] = !0, t(!0);
          });
        });
      }
    });
  },
  X = [800, 1800],
  Y = function e(n) {
    document.prerendering ? C(function () {
      return e(n);
    }) : "complete" !== document.readyState ? addEventListener("load", function () {
      return e(n);
    }, !0) : setTimeout(n, 0);
  },
  Z = function Z(e, n) {
    n = n || {};
    var t = f("TTFB"),
      r = d(e, t, X, n.reportAllChanges);
    Y(function () {
      var i = c();
      if (i) {
        var a = i.responseStart;
        if (a <= 0 || a > performance.now()) return;
        t.value = Math.max(a - u(), 0), t.entries = [i], r(!0), o(function () {
          t = f("TTFB", 0), (r = d(e, t, X, n.reportAllChanges))(!0);
        });
      }
    });
  };
function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e2) {
          throw _e2;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e3) {
      didErr = true;
      err = _e3;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
function getUniqueID() {
  return "ys-".concat(Date.now(), "-").concat(Math.floor(Math.random() * (9e12 - 1)) + 1e12);
}

//把上报的数据存储在map键值对中
//key就是上报的类型
//value就是上报的数据,是一个数组
var cache = new Map();
function getCache() {
  return cache;
}
function addCache(type, data) {
  //如果有这个类型的数据，就往数组中添加
  //没有就在map中创建新的类型，并且将data放入到数组中
  cache.get(type) ? cache.get(type).push(data) : cache.set(type, [data]);
}
function clearCache() {
  cache.clear();
}
var uniqueID = getUniqueID();
/**
 * 由于我们有很多内容需要上报，
 * 所以我这里为了简单区分和上报
 * 用type来区分上报的内容是什么
 * @param {string} type 上报类型 “error” | "action" | "behavior" | "api" | "performance"
 * @param {Object} data 上报信息
 * @param {boolean} isImmediate 是否立即上报，默认为false
 */
function report(type, data) {
  var isImmediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (config.reportUrl === null) {
    console.error("请先配置上报地址");
    return;
  }
  var reportData = JSON.stringify({
    id: uniqueID,
    appId: config.appId,
    //应用id
    userId: config.userId,
    //用户id
    currentTime: Date.now(),
    //当前事件
    type: type,
    //上报类型
    data: data,
    //上报信息
    currentPage: window.location.href,
    //当前页面
    ua: config.ua //用户浏览器和系统
  });

  // fetch直接上报
  /*
  fetch(config.reportUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: reportData,
  })
    .then(res => res.text())
    .then(res => console.log(res))
    .catch(err => console.log(err))
  */

  //立即上传
  if (isImmediate) {
    sendBeacon(config.reportUrl, reportData);
    return;
  }

  // 浏览器空闲时间进行上报
  if (window.requestIdleCallback) {
    window.requestIdleCallback(function () {
      sendBeacon(config.reportUrl, reportData);
    }, {
      timeout: 3000
    });
  } else {
    setTimeout(function () {
      sendBeacon(config.reportUrl, reportData);
    });
  }
}
var timer = null;
//延迟上传,一定时间之后再进行上传
function lazyReportCache(type, data) {
  var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3000;
  //把数据加入到map缓存中
  addCache(type, data);
  clearTimeout(timer);
  timer = setTimeout(function () {
    //获取缓存中的数据
    var dataMap = getCache();
    if (dataMap.size) {
      var _iterator = _createForOfIteratorHelper(dataMap),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
            _type = _step$value[0],
            _data = _step$value[1];
          console.log(_type, _data); //error [xxx,xx,xx], api [xx,xx,xxx]
          report(_type, _data);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      clearCache();
    }
  }, timeout);
}

//Navigator.sendBeacon()方式上报
function sendBeacon(reportUrl, reportData) {
  if (navigator.sendBeacon) {
    navigator.sendBeacon(reportUrl, reportData);
  } else {
    reportWithXHR(reportUrl, reportData);
  }
}

// XMLHttpRequest方式上报
function reportWithXHR(reportUrl, reportData) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', reportUrl, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(reportData);
}
function performance$1() {
  /*
  const {
    fetchStart,
    connectStart,
    connectEnd,
    requestStart,
    responseStart,
    responseEnd,
    domLoading,
    domInteractive,
    domContentLoadedEventStart,
    domContentLoadedEventEnd,
    loadEventStart,
    domainLookupStart,
    domainLookupEnd,
    navigationStart
  } = window.performance.timing;
   console.log(fetchStart,
    connectStart,
    connectEnd,
    requestStart,
    responseStart,
    responseEnd,
    domLoading,
    domInteractive,
    domContentLoadedEventStart,
    domContentLoadedEventEnd,
    loadEventStart,
    domainLookupStart,
    domainLookupEnd,
    navigationStart)
  
    const tcp = connectEnd - connectStart; // TCP连接耗时
    const dns = domainLookupEnd - domainLookupStart; // dns 解析时长
    const ttfbTime = responseStart - requestStart; // 首字节到达时间
    const responseTime = responseEnd - responseStart; // response响应耗时
    const parseDOMTime = loadEventStart - domLoading; // DOM解析渲染的时间
    const domContentLoadedTime = domContentLoadedEventEnd - domContentLoadedEventStart; // DOMContentLoaded事件回调耗时
    const timeToInteractive = domInteractive - fetchStart; // 首次可交互时间
    const loadTime = loadEventStart - fetchStart; // 完整的加载时间
    const whiteScreen = domLoading - navigationStart; // 白屏时间
    
  
    console.log(tcp,dns,ttfbTime,responseTime,parseDOMTime,domContentLoadedTime,timeToInteractive,loadTime,whiteScreen)
  */

  /*
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntriesByName("first-contentful-paint")) {
      console.log("FCP====", entry.startTime, entry);
    }
  }).observe({ type: "paint", buffered: true });
   //每一个资源的响应时间
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    for (const entry of entries) {
      if (entry.responseStart > 0) {
        console.log(
          `TTFB === ${entry.responseStart - entry.requestStart}`,
          entry.name
        );
      }
    }
  }).observe({ type: "resource", buffered: true });
  */

  S(sendToAnalytics);
  x(sendToAnalytics);
  W(sendToAnalytics);
  b(sendToAnalytics);
  Z(sendToAnalytics);
}
function sendToAnalytics(metric) {
  console.log(metric);
  var data = {
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta
  };
  lazyReportCache('performance', data);
}
var lastCaptureEvent;
['click', 'mousedown', 'keyup', 'scroll', 'mouseover', 'mousewheel'].forEach(function (eventType) {
  document.addEventListener(eventType, function (event) {
    lastCaptureEvent = event;
  }, {
    capture: true,
    passive: true
  });
});
var lastCaptureEvent$1 = function lastCaptureEvent$1() {
  return lastCaptureEvent;
};
var getComposedPathEle = function getComposedPathEle(e) {
  if (!e) return [];
  //如果支持path属性，直接返回path属性
  //如果不支持，就通过composedPath方法获取
  var pathArr = e.path || e.composedPath && e.composedPath();
  if ((pathArr || []).length) {
    return pathArr;
  }

  //composedPath方法不兼容，手动获取
  var target = e.target;
  var composedPath = [];
  while (target && target.parentNode) {
    composedPath.push(target);
    target = target.parentNode;
  }
  composedPath.push(document, window);
  return composedPath;
};
var getComposedPath = function getComposedPath(e) {
  if (!e) return [];
  var composedPathEle = getComposedPathEle(e);
  var composedPath = composedPathEle.reverse().slice(2).map(function (ele) {
    var selector = ele.tagName.toLowerCase();
    if (ele.id) {
      selector += "#".concat(ele.id);
    }
    if (ele.className) {
      selector += ".".concat(ele.className);
    }
    return selector;
  });
  return composedPath;
};
var getPaths = function getPaths(e) {
  if (!e) return '';
  var composedPath = getComposedPath(e);
  var selectors = composedPath.join(' > ');
  return selectors;
};

/**
 * 这个正则表达式用于匹配 JavaScript 错误栈中的堆栈跟踪信息中的单个条目，其中包含文件名、行号和列号等信息。
 * 具体来说，它匹配以下格式的文本：
 * at functionName (filename:lineNumber:columnNumber)
 * at filename:lineNumber:columnNumber
 * at http://example.com/filename:lineNumber:columnNumber
 * at https://example.com/filename:lineNumber:columnNumber
 */
var FULL_MATCH = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;

//限制追溯的错误堆栈数量
var STACK_TRACE_LIMIT = 10;

//通过正则表达式解析一行的错误信息
function parseStackLine(line) {
  var lineMatch = line.match(FULL_MATCH);
  if (!lineMatch) return {};
  var filename = lineMatch[2] || '<anonymous>';
  var functionName = lineMatch[1] || '';
  var lineno = parseInt(lineMatch[3], 10) || undefined;
  var colno = parseInt(lineMatch[4], 10) || undefined;
  return {
    filename: filename,
    functionName: functionName,
    lineno: lineno,
    colno: colno
  };
}

//解析错误堆栈
function parseStackFrames(error) {
  var stack = error.stack;
  //如果没有stack直接返回[]
  if (!stack) return [];
  var frames = [];
  var _iterator = _createForOfIteratorHelper(stack.split('\n').slice(1)),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var line = _step.value;
      var frame = parseStackLine(line); //分析一行的错误信息
      if (frame.filename) {
        //放入到堆栈错误信息数组中
        frames.push(frame);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return frames.slice(0, STACK_TRACE_LIMIT);
}
function error() {
  var _config$vue;
  console.log('error');
  /*
  const rawOnError = window.onerror;
  window.onerror = function (message, url, lineno, colno, error) { 
    if (rawOnError) { 
      rawOnError.call(window, message, url, lineno, colno, error);
    }
     console.log('onerror 监听中...');
    console.log(message, url, lineno, colno);
    console.log(error);
  }
  */

  //资源错误没有冒泡，所以只能在捕获阶段采集获取错误
  window.addEventListener('error', function (event) {
    var target = event.target;
    console.log('error 监听中...');
    console.log(event);

    //获取执行的事件
    var lastEvent = lastCaptureEvent$1();

    //获取事件的执行路径
    var paths = getPaths(lastEvent);
    console.log(paths);

    //要判断是资源错误，还是js错误，很简单，直接判断事件对象有没有src或者href属性就可以了
    if (target && (target.src || target.href)) {
      console.log('资源错误');
      //上报资源错误 todo...
      var data = {
        errorType: 'resourceError',
        filename: target.src || target.href,
        tagName: target.tagName,
        message: "\u52A0\u8F7D".concat(target.tagName, "\u5931\u8D25")
      };
      console.log(data);
      lazyReportCache('error', data);
    } else {
      console.log('js错误');
      //上报js错误 todo...
      var errs = parseStackFrames(event.error);
      console.log(errs);
      var _errs$ = errs[0],
        filename = _errs$.filename,
        functionName = _errs$.functionName,
        lineno = _errs$.lineno,
        colno = _errs$.colno;
      var _data = {
        errorType: 'jsError',
        filename: filename,
        functionName: functionName,
        lineno: lineno,
        colno: colno,
        message: event.message,
        stack: event.error.stack,
        paths: paths
      };
      console.log(_data);
      lazyReportCache('error', _data);
    }
  }, true);

  //promise错误
  window.addEventListener('unhandledrejection', function (event) {
    console.log('promise错误');
    console.log(event);
    //获取执行的事件
    var lastEvent = lastCaptureEvent$1();

    //获取事件的执行路径
    var paths = getPaths(lastEvent);
    console.log(paths);
    //上报promise错误 todo...
    var reason = event.reason;
    var errs = parseStackFrames(reason);
    console.log(errs);
    var _errs$2 = errs[0],
      filename = _errs$2.filename,
      functionName = _errs$2.functionName,
      lineno = _errs$2.lineno,
      colno = _errs$2.colno;
    var data = {
      errorType: 'promiseError',
      filename: filename,
      functionName: functionName,
      lineno: lineno,
      colno: colno,
      message: reason.message,
      stack: reason.stack,
      paths: paths
    };
    console.log(data);
    lazyReportCache('error', data);
  });

  //vue错误
  if ((_config$vue = config.vue) !== null && _config$vue !== void 0 && _config$vue.Vue) {
    console.log('vue错误');
    config.vue.Vue.config.errorHandler = function (err, vm, info) {
      console.log(err);

      //获取执行的事件
      var lastEvent = lastCaptureEvent$1();

      //获取事件的执行路径
      var paths = getPaths(lastEvent);
      console.log(paths);

      //上报vue错误 todo...
      var errs = parseStackFrames(err);
      var _errs$3 = errs[0],
        filename = _errs$3.filename,
        functionName = _errs$3.functionName,
        lineno = _errs$3.lineno,
        colno = _errs$3.colno;
      var data = {
        errorType: 'vueError',
        filename: filename,
        functionName: functionName,
        lineno: lineno,
        colno: colno,
        message: err.message,
        stack: err.stack,
        paths: paths
      };
      console.log(data);
      lazyReportCache('error', data);
    };
  }
}
var tracker = function tracker(event) {
  //如果是全自动上报，则不需要手动上报
  if (config.trackerAll) return;
  var target = event.target;
  var data = {
    eventType: event.type,
    tagName: target.tagName,
    x: event.x,
    y: event.y,
    paths: getPaths(event),
    value: target.value || target.innerText
  };
  lazyReportCache('action', data);
};
var autoTracker = function autoTracker() {
  ['click', 'keydown', 'blur', 'focus', 'touchstart', 'touchend'].forEach(function (eventType) {
    var timer = null;
    document.addEventListener(eventType, function (event) {
      clearTimeout(timer);
      //防抖
      timer = setTimeout(function () {
        var target = event.target;
        var dataTracker = target.getAttribute('data-tracker');

        //如果配置项中config.trackerAll为true，则所有元素都需要上报
        //如果元素上有data-tracker属性，则上报
        if (config.trackerAll || dataTracker) {
          var data = {
            eventType: event.type,
            tagName: target.tagName || 'window',
            x: event.x,
            y: event.y,
            paths: getPaths(event),
            value: target.value || target.innerText || ''
          };
          lazyReportCache('action', data);
        }
      }, 500);
    }, false);
  });
};
var connection = navigator.connection;
function pv() {
  lazyReportCache('behavior', {
    subType: 'pv',
    referrer: document.referrer,
    effectiveType: connection ? connection.effectiveType : '',
    //网络环境
    rtt: connection ? connection.rtt : '' //往返时间
  });
}

//页面停留时间
function pageStayTime() {
  var startTime = Date.now();
  //unload和beforeunload会在窗口卸载的时候触发
  //要注意窗口卸载的时候，如果你使用ajax提交会出现问题
  window.addEventListener('beforeunload', function () {
    var stayTime = Date.now() - startTime;
    report('behavior', [{
      subType: 'pageStayTime',
      effectiveType: connection ? connection.effectiveType : '',
      //网络环境
      stayTime: stayTime
    }], true);
  }, true);
}

//首先记录一开始的时间
window.pageViewStartTime = Date.now();
//通过vue的路由来记录页面切换
function onVueRouter() {
  if (!config.vue || !config.vue.router) return;
  config.vue.router.beforeEach(function (to, from, next) {
    //如果是首次加载页面不需要统计
    if (!from.name) return next();
    var stayTime = Date.now() - window.pageViewStartTime;
    console.log("\u9875\u9762\u505C\u7559\u65F6\u95F4 ".concat(from.name, ": ").concat(stayTime, "ms"));
    console.log(to);
    console.log(from);
    window.pageViewStartTime = Date.now();
    lazyReportCache('behavior', {
      subType: 'vueRouterChange',
      params: to.params,
      query: to.query,
      name: to.name || to.path,
      from: from.fullPath,
      to: to.fullPath,
      stayTime: stayTime
    });
    next();
  });
}
function pageChange() {
  var from = document.referrer;
  window.addEventListener('popstate', function () {
    var to = window.location.href;
    console.log(to, from);
    lazyReportCache('behavior', {
      subType: 'pageChange',
      from: from,
      to: to
    });
    from = to;
  }, true);
  var oldURL = document.referrer;
  window.addEventListener('hashchange', function (event) {
    var newURL = event.newURL;
    lazyReportCache('behavior', {
      subType: 'pageChange',
      from: oldURL,
      to: newURL
    });
    oldURL = newURL;
  }, true);
}
var monitor = {
  init: function init() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    console.log("init");
    setConfig(options); //配置全局参数
    error(); //错误监听处理
    performance$1(); //性能监听处理
    autoTracker(); //自动埋点
    pv(); //page view
  },

  tracker: tracker,
  pageStayTime: pageStayTime,
  pageChange: pageChange,
  onVueRouter: onVueRouter
};
export { monitor as default };
