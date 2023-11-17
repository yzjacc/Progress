import { setConfig } from "./config";
import performance from "./performance";
import error from "./error";
import { tracker,autoTracker } from "./action";
const monitor = {
  init(options = {}) {
    console.log('init');
    setConfig(options); //配置全局参数
    error(); //错误监听处理
    performance(); //性能监听处理
    autoTracker(); //自动埋点
  },
  tracker
};

export default monitor;