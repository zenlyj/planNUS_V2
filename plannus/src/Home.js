import React, { Component } from "react";
import Timetable from './components/Timetable'
import Button from 'react-bootstrap/Button'
import moduleslist from './api/moduleslist.json'
import AutoComplete from './components/AutoComplete'
import nusmodsAPI from './api/nusmodsAPI'
import AutomatedScheduler from './components/AutomatedScheduler'
import Deadline from './components/Deadline'
import ImportInput from './components/ImportInput'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            weekNum: this.props.currWeek,
            timetables: this.props.initHome,
            deadlines: this.props.deadlineDB
        }
        this.navWeek = this.navWeek.bind(this)
        this.submitURL = this.submitURL.bind(this)
    }

    submitURL(url) {
        this.props.submitURL(url, this.state.weekNum)
    }

    navWeek(diff) {
        // allow user to navigate between week 1 and 13
        this.setState(prevState => {
            if (prevState.weekNum===1 && diff===-1) {
                return {weekNum: prevState.weekNum}
            } else if (prevState.weekNum===13 && diff===1) {
                return {weekNum: prevState.weekNum}
            } else {
                return {weekNum: prevState.weekNum+diff}
            }
        })
    }

    retrieveTasks() {
        let tasksAdded = new Map()
        if (this.state.timetables.has(this.state.weekNum)) {
            tasksAdded = this.state.timetables.get(this.state.weekNum)
        }
        return tasksAdded
    }

    retrieveDeadlines() {
        let deadlines
        let arr = []
        for (let key of this.state.deadlines.keys()) {
            arr.push(key)
        }
        arr.sort()
        deadlines = arr.map(key => this.state.deadlines.get(key))
        return deadlines
    }

    render() {
        let tasksAdded = this.retrieveTasks()
        let deadlines = this.retrieveDeadlines()
        return (
            <React.Fragment>
                <div style={{marginLeft:'40%', marginTop:'2%'}}> 
                    <Button variant="outline-dark" style={{float:'left', width:'3.5%'}} onClick={()=>this.navWeek(-1)}> {'<'} </Button>
                    <h3 style={{float:'left', textAlign:'center', marginLeft:'5%', width:'10%', color:'#404040'}}> {'Week ' + this.state.weekNum} </h3> 
                    <Button variant="outline-dark" style={{float:'left', marginLeft:"5%", width:'3.5%'}} onClick={()=>this.navWeek(1)}> {'>'} </Button>
                </div>
                <div style={{marginLeft:'13%', paddingTop:'2%'}}>
                    <div style={{marginLeft:'80%', paddingBottom:'1%'}}> <ImportInput submitURL={this.submitURL} /> </div>
                    <div style={{float:'left', width:'85%'}}> <Timetable id={this.state.weekNum} tasksAdded={tasksAdded} updateTaskDatabase={this.props.updateTaskDatabase} loggedIn={this.props.loggedIn} /> </div>
                    <div style={{float:'left', marginLeft:'3%'}}> <Deadline deadlines={deadlines} updateDLDatabase={this.props.updateDLDatabase}/> </div>
                </div>
                <div style={{float:'left', marginLeft:'5%'}}> <AutomatedScheduler key={this.state.weekNum} id={this.state.weekNum} automateSchedule={this.props.automateSchedule} /> </div>
            </React.Fragment>
        )
    }
}

export default Home