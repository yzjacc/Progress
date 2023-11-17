import config from "../config";
export default function error() {
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
    const target = event.target;
    console.log('error 监听中...');
    console.log(event);
    //要判断是资源错误，还是js错误，很简单，直接判断事件对象有没有src或者href属性就可以了
    if (target && (target.src || target.href)) {
      console.log('资源错误');
      //上报资源错误 todo...
    }
    else {
      console.log('js错误');
      //上报js错误 todo...
    }
  }, true)
  
  //promise错误
  window.addEventListener('unhandledrejection', function (event) { 
    console.log('promise错误');
    console.log(event);
    //上报promise错误 todo...
  })


  //vue错误
  if (config.vue?.Vue) { 
    console.log('vue错误');
    config.vue.Vue.config.errorHandler = function (err, vm, info) { 
      console.log(err, vm, info);
      //上报vue错误 todo...
    }
  }
}