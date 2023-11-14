import { createApp,type App as VueApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './routes';
import { 
  renderWithQiankun, 
  qiankunWindow, 
  type QiankunProps
} from 'vite-plugin-qiankun/dist/helper';

let app:VueApp<Element>;

function render(container:any){
  app = createApp(App);
  app.use(router);
  app.use(ElementPlus);
  app.mount(container);
}

if(qiankunWindow.__POWERED_BY_QIANKUN__){
  renderWithQiankun({bootstrap, mount, unmount, update})
}
else{
  render('#app');
}

async function bootstrap(){
  console.log('vite-vue3 app bootstraped');
}

async function mount(props:QiankunProps){
  console.log('vite-vue3 app mount');
  render(props.container?.querySelector('#app'));
}

async function unmount(props:QiankunProps){
  console.log('vite-vue3 app unmount');
  app?.unmount();
}

async function update(){
  console.log('vite-vue3 app update');
}

// createApp(App).use(router).use(ElementPlus).mount('#app')
