import { createI18n } from 'vue-i18n'
// import enUS from "./locales/en-US.json"
// import zhCN from "./locales/zh-CN.json"
import messages from "@intlify/unplugin-vue-i18n/messages";
import numberFormats from './rules/number'
import datetimeFormats from './rules/datetime'

// const messages = {
//   "zh-CN": {
//     "nav": {
//       "home": "首页",
//       "about": "关于",
//     },
//     "home": {
//       "header": "欢迎使用Vue3 I18n 教学",
//       "content": "这个教学教导大家在Vue3中使用vue-I18n---{company}"
//     }
//   },
//   "zh-TW": {
//     "nav": {
//       "home": "首頁",
//       "about": "關於",
//     },
//     "home": {
//       "header": "歡迎使用Vue3 I18n 教學",
//       "content": "這個教學程式教導大家在Vue3中使用vue-I18n---{company}"
//     }
//   },
//   "en-US": {
//     "nav": {
//       "home": "Home",
//       "about": "About",
//     },
//     "home": {
//       "header": "Welcome to Vue3 I18n Tutorial",
//       "content": "This tutorial teaches you how to use vue-I18n in Vue3---{company}"
//     }
//   },
// }

export default createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackFormat: import.meta.env.VITE_FALLBACK_LOCALE,
  legacy: false, // 将legacy设置为false，表示可以使用组合式API
  // messages: {
  //   'en-US': enUS,
  //   'zh-CN': zhCN,
  // },
  messages,
  globalInjection: true,
  numberFormats,
  datetimeFormats
})