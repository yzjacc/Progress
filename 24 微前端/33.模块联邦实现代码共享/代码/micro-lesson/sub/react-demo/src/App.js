import { BrowserRouter, Routes, Route, MemoryRouter } from "react-router-dom";
import Home from "./views/Home";
import About from "./views/About";
import Info from "./views/Info";
import LayoutMain from "./views/LayoutMain";


function App(props) {
  const {routerBase,pushState} = props;
  const Router = pushState ? MemoryRouter : BrowserRouter ;
  return (
    <>
      <Router initialEntries={[routerBase]} basename={window.__POWERED_BY_QIANKUN__ ? routerBase : '/'}>
        <Routes>
          <Route path="/" element={<LayoutMain />} >
            <Route index element={<Home pushState={pushState}/>} />
            <Route path="about" element={<About />} />
            <Route path="info" element={<Info />} />
          </Route>
        </Routes>
      </Router>
    </> 
  );
}

export default App;
