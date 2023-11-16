import "./public-path"
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

let root = null;

function render(props) {
  console.log('react 子应用---render')
  const {container} = props;
  root = ReactDOM.createRoot(container ? container.querySelector('#root') : document.querySelector('#root')); 
  root.render(<App />);
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log('react 子应用---bootstrap')
}
export async function mount(props) {
  console.log('react 子应用---mount',props)
  render(props);
}
export async function unmount(props) {
  console.log('react 子应用---unmount',props)
  const {container} = props;
  root.unmount(container ? container.querySelector('#root') : document.querySelector('#root'));
  container.innerHTML = "";
}