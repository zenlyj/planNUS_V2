import React, { Component } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import axios from "axios";
import Popup from "reactjs-popup";
import { Home } from './Home';
import { Diary } from './Diary';
import { Stats } from './Stats';
import { Settings } from './Settings';
import { NotFound } from './NotFound';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar';
import Cookies from 'js-cookie';
import Auth from './components/Auth';
import { ProtectedRoute } from "./components/ProtectedRoute";

class App extends Component {

  constructor() {
    super();
    this.state = {
      loggedIn: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  readCookie() {
    const user = Cookies.get("user");
    this.setState({loggedIn: true});
  }

  useEffect() {
    this.readCookie();
  }

  getData() {
    let currentURL = window.location.href;
    let append = currentURL.split('?')[1];
    if (append !== undefined) {
      Cookies.set("user", append.split('=')[1]);
      Cookies.set("loggedIn", true);
      Auth.login(() => {this.setState(() => ({loggedIn: true}))});
    }
  }


  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <React.Fragment>
        <Header />
          <Router>
            <NavigationBar />
            <Layout>
              <Switch>
                <Route exact path="/" component={Home} />
                <ProtectedRoute path="/Diary" component={Diary}/>
                <ProtectedRoute path="/Stats" component={Stats}/>
                <ProtectedRoute path="/Settings" component={Settings}/>
                <Route component={NotFound} />
              </Switch>
            </Layout>
          </Router>
      </React.Fragment>
    );
  }
}


export default App;
