import React, { useState } from 'react';
const App = () => { 
  const [count, setCount] = useState(0);
  return (
    <div>
      <h2>Hello World!!!!</h2>
      <button onClick={ 
        () => { 
          setCount(count + 1);
        }
      }>count is { count }</button>
    </div>
  )
}
export default App;