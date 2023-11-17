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
function error() {
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
    //要判断是资源错误，还是js错误，很简单，直接判断事件对象有没有src或者href属性就可以了
    if (target && (target.src || target.href)) {
      console.log('资源错误');
      //上报资源错误
    } else {
      console.log('js错误');
      //上报js错误
    }
  }, true);

  //promise错误
  window.addEventListener('unhandledrejection', function (event) {
    console.log('promise错误');
    console.log(event);
    //上报promise错误
  });
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
