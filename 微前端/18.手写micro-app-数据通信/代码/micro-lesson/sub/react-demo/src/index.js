import "./public-path"
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
console.log(window);
console.log(window.globalStr);

window.microApp.addDataListener((data) => { 
  console.log('子应用接收数据:', data);
})

setTimeout(() => { 
  window.microApp.dispatch({ name: '来自react子应用的数据' });
},3000)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

