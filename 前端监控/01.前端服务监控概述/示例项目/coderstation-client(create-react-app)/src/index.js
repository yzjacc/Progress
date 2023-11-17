import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import zhCN from "antd/es/locale/zh_CN";
import { ConfigProvider } from "antd";

import "antd/dist/antd.min.css";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

// const BrowserLogger = require('@arms/js-sdk');
// const __bl = BrowserLogger.singleton(
//   {
//     pid:"fl8p0dh55g@a457e4796698266",
//     appType:"web",
//     imgUrl:"https://arms-retcode.aliyuncs.com/r.png?",
//     sendResource:true,
//     enableLinkTrace:true,
//     behavior:true,
//     enableSPA:true,
//     useFmp:true
//   }
// );

//  __bl.event({
//  key: 'click', //事件key，必填
// });

import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://9e579cf870e6499795fb21457bd6cf83@o4505514171170816.ingest.sentry.io/4505514172940288",
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ["localhost", "https:yourserver.io/api/"],
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </Provider>
);