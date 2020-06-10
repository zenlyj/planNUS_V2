import React, { Component } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom"
import Popup from "reactjs-popup";
import { Home } from './Home'
import { Diary } from './Diary'
import { Stats } from './Stats'
import { Settings } from './Settings'
import { NotFound } from './NotFound'
import { Header } from './components/Header'
import { Layout } from './components/Layout'
import { NavigationBar } from './components/NavigationBar'

class App extends Component {
  render(){
    return (
      <React.Fragment>
        <Header />
        <NavigationBar />
        <Layout>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/Diary" component={Diary} />
              <Route path="/Stats" component={Stats} />
              <Route path="/Settings" component={Settings} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </Layout>
      </React.Fragment>
  );
  }
}
export default App;
