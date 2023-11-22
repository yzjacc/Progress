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
        e: function e(_e) {
          throw _e;
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
    e: function e(_e2) {
      didErr = true;
      err = _e2;
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
    };
  }
}
var monitor = {
  init: function init() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    console.log('init');
    setConfig(options); //配置全局参数
    error(); //错误监听处理
  }
};

export { monitor as default };
