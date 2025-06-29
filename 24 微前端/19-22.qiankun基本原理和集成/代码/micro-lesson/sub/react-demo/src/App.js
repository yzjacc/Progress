import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import About from "./views/About";
import Info from "./views/Info";
import LayoutMain from "./views/LayoutMain";


function App() {
  return (
    <>
      <Router basename={window.__POWERED_BY_QIANKUN__ ? '/app-react-demo':"/"}>
        <Routes>
          <Route path="/" element={<LayoutMain />} > 
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="info" element={<Info />} />
          </Route>
        </Routes>
      </Router>
    </> 
  );
}

export default App;
