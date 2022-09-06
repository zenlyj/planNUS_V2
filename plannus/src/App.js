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
import Stats from './Stats';
import { Settings } from './Settings';
import { NotFound } from './NotFound';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar';
import Cookies from 'js-cookie';
import Auth from './components/Auth';
import { ProtectedRoute } from "./components/ProtectedRoute";
import nusmodsAPI from "./api/nusmodsAPI";
import LoadingOverlay from 'react-loading-overlay'
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage"

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      taskDB: new Map(),
      deadlineDB: new Map(),
      diaryDB: new Map(),
      currWeek: 1,
      loading: false,
      currMonth: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateTaskDatabase = this.updateTaskDatabase.bind(this);
    this.updateDLDatabase = this.updateDLDatabase.bind(this);
    this.updateDiaryDatabase = this.updateDiaryDatabase.bind(this);
    this.retrieveNUSModsTasks = this.retrieveNUSModsTasks.bind(this);
    this.automateSchedule = this.automateSchedule.bind(this);
    this.setLoading = this.setLoading.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.loggedIn===false && this.state.loggedIn===true) {
      nusmodsAPI.retrieveTask().then(taskDB => this.setState({taskDB: taskDB}))
      nusmodsAPI.retrieveDiary().then(diaryDB => {
        this.setState({diaryDB: diaryDB});
      });
      nusmodsAPI.retrieveDeadline().then(deadlineDB => {
        this.setState({deadlineDB: deadlineDB});
      });
    }
  }

  updateTaskDatabase(id, updatedTimetable) {  
    let taskDB = new Map(this.state.taskDB)
    if (this.state.taskDB.has(id)) {
      taskDB.delete(id)
    }
    taskDB.set(id, updatedTimetable)
    this.setState({taskDB: taskDB, currWeek: id})
  }

  updateDLDatabase(updatedDeadline, toRemove, toEdit) {
    let deadlineDB = new Map(this.state.deadlineDB)
    if (this.state.deadlineDB.has(updatedDeadline.id)) {
      deadlineDB.delete(updatedDeadline.id)
    }
    if (!toRemove && !toEdit) {
      nusmodsAPI.addDeadline(updatedDeadline.id, updatedDeadline.deadlineName, updatedDeadline.module,
        updatedDeadline.deadline, updatedDeadline.description);
      deadlineDB.set(updatedDeadline.id, updatedDeadline)
    }
    if (toEdit) {
      const tempDeadlineID = updatedDeadline.id;
      updatedDeadline.id = updatedDeadline.deadline+updatedDeadline.deadlineName;
      nusmodsAPI.updateDeadline(tempDeadlineID, updatedDeadline);
      deadlineDB.set(updatedDeadline.deadline+updatedDeadline.deadlineName, updatedDeadline)
    }
    this.setState({deadlineDB: deadlineDB})
  }

  updateDiaryDatabase(week, date, data) {
    let diaryDB = new Map(this.state.diaryDB)
    let weeklyEntry = diaryDB.get(week)
    if (weeklyEntry === undefined) {
      weeklyEntry = new Map()
      weeklyEntry.set(date, data)
    } else {
      diaryDB.delete(weeklyEntry)
      if (weeklyEntry.has(date)) {
        weeklyEntry.delete(date)
      }
      weeklyEntry.set(date, data)
    }
    diaryDB.set(week, weeklyEntry)
    let currMonth = date.substring(3,5)
    nusmodsAPI.updateDiary(week, date, data);
    this.setState({diaryDB: diaryDB, currMonth:(parseInt(currMonth)-8)})
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  retrieveNUSModsTasks(url, weekNum) {
    this.setLoading(true);

    // import all lessons from nusmods and store them in DB
    try {
      nusmodsAPI.importFromNUSMODS(url).then(imported => {
        if (imported.success) {
          // To remove all existing tasks from DB
          for (let key of this.state.taskDB.keys()) {
            let timetable = this.state.taskDB.get(key)
            for (let k of timetable.keys()) {
              let task = timetable.get(k)
              nusmodsAPI.removeTask(task.id, key)
            }
          }
          return nusmodsAPI.dbtoMap(imported.taskArr);
        } else {
          this.setState({loading: false});
          throw "error";
        }
      }).then(imported => {
        let retrievedDB = new Map()
        for (let key of imported.keys()) {
          let timetable = imported.get(key)
          retrievedDB.set(key, timetable)
          for (let k of timetable.keys()) {
            let task = timetable.get(k)
            if (this.state.loggedIn) {
              nusmodsAPI.addTask(task.id, task.taskPresent, task.taskName, task.module, task.timeFrom, 
              task.timeTo, task.description, key)
            }
          }
        }
        this.setState({taskDB: retrievedDB, loading: false}) 
      })
    } catch(err) {
    }
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
      } 
    }
  }

  automateSchedule(state){
    this.setLoading(true);
    nusmodsAPI.automateSchedule(state).then(imported => {
      let currentDB = this.state.taskDB;
      for (let key of imported.keys()) {
        if (currentDB.get(key) == undefined) {
          currentDB.set(key, imported.get(key));          
        } else {
          var map = currentDB.get(key);
          for (var i of imported.get(key).keys()) {
            let task = imported.get(key).get(i);
            map.set(i, task);
            nusmodsAPI.addTask(task.id, task.taskPresent, task.taskName, task.module, task.timeFrom, 
              task.timeTo, task.description, key);
          }
          currentDB.set(key, map);
        }
      }
      this.setState({taskDB: currentDB, currWeek: state.week, loading: false});
    });
  }

  setLoading(loading) {
    this.setState({
      loading: loading
    });
  }

  componentDidMount() {
    this.readCookie();
    this.getData();
  }

  render() {
    return (
      <LoadingOverlay
          active={this.state.loading}
          styles={{overlay: (base) => ({...base,
            background:'rgba(0,0,0,0.3)'})}}
          spinner
          overlay
          text='Loading...'>
        <Header />
          <Router>
            <NavigationBar />
            <Layout>
              <Switch>
                <Route exact path="/Home" component={() => (<Home initHome={this.state.taskDB} 
                                                              currWeek={this.state.currWeek} 
                                                              loading={this.state.loading}
                                                              updateTaskDatabase={this.updateTaskDatabase}
                                                              updateDLDatabase={this.updateDLDatabase}
                                                              submitURL={this.retrieveNUSModsTasks}
                                                              deadlineDB={this.state.deadlineDB}
                                                              automateSchedule={this.automateSchedule}
                                                              setLoading={this.setLoading}
                                                              loggedIn={this.state.loggedIn}
                                                        />
                                                        )
                                                } 
                />
                <Route path="/Diary" component={() => (<Diary taskDB={this.state.taskDB}
                                                                       deadlineDB={this.state.deadlineDB}
                                                                       diaryDB={this.state.diaryDB}
                                                                       updateDiaryDatabase={this.updateDiaryDatabase}
                                                                       currMonth={this.state.currMonth}
                                                                />
                                                               )
                                                        }
                />
                <Route path="/Stats" component={()=> (<Stats taskDB={this.state.taskDB}
                                                                      diaryDB={this.state.diaryDB}
                                                               />
                                                              )
                                                        }
                />
                <ProtectedRoute path="/Settings" component={Settings}/>
                <Route path="/Login" component={() => <LoginPage />} />
                <Route path="/Register" component={() => <RegisterPage />}/>
                <Route component={NotFound} />
              </Switch>
            </Layout>
          </Router>
      </LoadingOverlay>
    );
  }
}


export default App;
