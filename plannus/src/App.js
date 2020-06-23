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
import Home from './Home';
import Diary from './Diary';
import { Stats } from './Stats';
import { Settings } from './Settings';
import { NotFound } from './NotFound';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar';
import Cookies from 'js-cookie';
import Auth from './components/Auth';
import { ProtectedRoute } from "./components/ProtectedRoute";
import nusmodsAPI from "./api/nusmodsAPI";

class App extends Component {

  constructor() {
    super();
    this.state = {
      loggedIn: false,
      taskDB: new Map(),
      deadlineDB: new Map(),
      currWeek: 1
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateTaskDatabase = this.updateTaskDatabase.bind(this);
    this.updateDLDatabase = this.updateDLDatabase.bind(this)
  }

  updateTaskDatabase(id, updatedTimetable) {  
    let taskDB = new Map(this.state.taskDB)
    if (this.state.taskDB.has(id)) {
      taskDB.delete(id)
    }
    taskDB.set(id, updatedTimetable)
    this.setState({taskDB: taskDB, currWeek: id})
  }

  updateDLDatabase(id, updatedDeadline) {
    let deadlineDB = new Map(this.state.deadlineDB)
    if (this.state.deadlineDB.has(id)) {
      deadlineDB.delete(id)
    }
    deadlineDB.set(id, updatedDeadline)
    this.setState({deadlineDB: deadlineDB})
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  readCookie() {
    const user = Cookies.get("user");
    const loggedIn = Cookies.get("loggedIn");
    if (loggedIn === "true") {
      Auth.login(user, () => {this.setState(() => ({loggedIn: true}))});
    } else {
      Auth.logout(() => {this.setState(() => ({loggedIn: false}))});
    }
  }

  useEffect() {
    this.readCookie();
  }

  verifyLogin(nusnet, hash) { 
    let url = 'http://localhost/verifylogin.php?nusnet=' + nusnet + '&hash=' + hash;
    const response = fetch(url).then(res => res.json()).then(obj => obj.success);
    return response;
  }

  async getData() {
    let currentURL = window.location.href;
    let append = currentURL.split('?')[1];
    if (append !== undefined) {
      const type = append.split('&')[0].split('=')[1];
      if (type == "login") { 
        const nusnet = append.split('&')[1].split('=')[1];
        const hash = append.split('&')[2].split('=')[1];
        if (await this.verifyLogin(nusnet, hash)) {
          Cookies.set("user", nusnet);
          Cookies.set("loggedIn", true);
          Auth.login(nusnet, () => {this.setState(() => ({loggedIn: true}))});
        }
      } else if (type == "nusmods") {
        const url = append.split('&')[1].split('=')[1];
        nusmodsAPI.importFromNUSMODS(url).then(taskMap => {
          this.setState({taskDB: taskMap, currWeek: 1});
          console.log(this.state.taskDB);
        });
      }
    }
  }


  componentDidMount() {
    this.readCookie();
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
                <Route exact path="/" component={() => (<Home initHome={this.state.taskDB} 
                                                              currWeek={this.state.currWeek} 
                                                              updateTaskDatabase={this.updateTaskDatabase}
                                                              updateDLDatabase={this.updateDLDatabase}
                                                        />
                                                        )
                                                } 
                />
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
