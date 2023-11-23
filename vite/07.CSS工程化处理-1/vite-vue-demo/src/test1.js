// import { debounce } from "lodash-es"   //bare import ESM默认不支持

import debounce  from '../node_modules/lodash-es/debounce.js'; // 从node_modules中引入
import test2 from "./test2.js";

debounce(() => console.log("hello"), 1000)();

test2();