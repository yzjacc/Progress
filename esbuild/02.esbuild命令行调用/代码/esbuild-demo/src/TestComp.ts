import * as React from 'react';
import * as Server from 'react-dom/server';

let HelloWorldComp = () => <h1>hello world!!!</h1>;
console.log(Server.renderToString(<HelloWorldComp />));