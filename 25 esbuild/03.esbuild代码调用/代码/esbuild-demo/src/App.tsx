import React from 'react';
import ReactDOM from 'react-dom/client';
import Comp1 from './components/Comp1';
import Comp2 from './components/Comp2';
import "./style.css"

const App = () => (
  <div>
    <h1 className='title'>Hello World!!!!</h1>
    <Comp1 />
    <Comp2 />
  </div>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);