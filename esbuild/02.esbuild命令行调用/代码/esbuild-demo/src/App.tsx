import React from 'react';
import Server from 'react-dom/server';
import logo from './assets/react.svg';

let HelloWorldComp = () => (
  <div>
    <h1>hello world!!!</h1>
    <img src={logo} />
  </div>
);
console.log(Server.renderToString(<HelloWorldComp />));