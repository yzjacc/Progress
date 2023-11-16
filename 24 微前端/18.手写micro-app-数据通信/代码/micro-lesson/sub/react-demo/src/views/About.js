import React from 'react'

export default function About() {
  return (
    <div>
      <h2>About</h2>
      <button onClick={() => { 
        window.globalStr = 'hello react 子应用';
        console.log(window.globalStr);
        console.log(window);
      }}>点击改变globalStr</button>
    </div>
  )
}
