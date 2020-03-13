import React, { Component } from 'react';
import {Provider} from 'react-redux'
import store from './Store'
import { BrowserRouter as Router, Route, Link,  Switch} from "react-router-dom";
import routes from './Router';
import Layout from './Components/LayOut/LayOut'
import Login from './Pages/User/Login'

class App extends Component {
  render() {
      let LayOutRouter = (
          <Layout>
              {
                  routes.map((route, key)=>{
                      if(route.exact){
                          return (
                              <Route
                                  key={key}
                                  exact
                                  path={route.path}
                                  render={props=>(
                                      <route.component {...props} />
                                  )}
                              />
                          )
                      }else {
                          return (
                              <Route
                                  key={key}
                                  path={route.path}
                                  render={props=>(
                                      <route.component {...props} />
                                  )}
                              />
                          )
                      }
                  })
              }
          </Layout>
      );
    return (
      <Provider store={store}>
          <Router>
              <Switch>
                  <Route path="/login" component={Login}/>
                  <Route path="/" render={props => LayOutRouter}/>
              </Switch>
          </Router>
      </Provider>
    );
  }
}

export default App;
