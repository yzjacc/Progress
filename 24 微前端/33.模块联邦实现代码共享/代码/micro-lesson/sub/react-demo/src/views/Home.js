import logo from '../logo.svg';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


function Home(props) {

  const navigate = useNavigate();

  useEffect(()=>{
    if(props.pushState){
      navigate(props.pushState)
      return;
    }
  },[props.pushState,navigate])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Home;
