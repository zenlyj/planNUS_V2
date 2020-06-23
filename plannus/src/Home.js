import React, { Component } from "react";
import Timetable from './components/Timetable'
import Button from 'react-bootstrap/Button'
import moduleslist from './api/moduleslist.json'
import AutoComplete from './components/AutoComplete'
import nusmodsAPI from './api/nusmodsAPI'
import AutomatedScheduler from './components/AutomatedScheduler'
import Deadline from './components/Deadline'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            weekNum: this.props.currWeek,
            timetables: this.props.initHome
        }
        this.navWeek = this.navWeek.bind(this)
        this.updateHomeTask = this.updateHomeTask.bind(this)
        this.updateHomeDeadline = this.updateHomeDeadline.bind(this)
    }

    updateHomeTask(id, updatedTimetable) {
        this.props.updateTaskDatabase(id, updatedTimetable)
    }

    updateHomeDeadline(id, updatedDeadline) {
        this.props.updateDLDatabase(id, updatedDeadline)
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

    render() {
        let tasksAdded = new Map()
        if (this.state.timetables.has(this.state.weekNum)) {
            tasksAdded = this.state.timetables.get(this.state.weekNum)
        }
        return (
            <React.Fragment>
                <div style={{marginTop:'2%', marginLeft:'40%', paddingBottom: '3%'}}> 
                    <Button variant="outline-dark" style={{float:'left', marginRight:"5%"}} onClick={()=>this.navWeek(-1)}> {'<'} </Button>
                    <h3 style={{float:'left', color:'#404040'}}> {'Week ' + this.state.weekNum} </h3> 
                    <Button variant="outline-dark" style={{float:'left', marginLeft:"5%"}} onClick={()=>this.navWeek(1)}> {'>'} </Button>
                </div>
                <div>
                    <div style={{float:'left'}}> <Timetable id={this.state.weekNum} tasksAdded={tasksAdded} updateHomeTask={this.updateHomeTask}/> </div>
                    <div style={{float:'right', marginRight:'0.8%'}}> <Deadline updateHomeDeadline={this.updateHomeDeadline}/> </div>
                </div>
                <div style={{marginTop:'35%', marginLeft:'13.5%'}}>
                    <AutomatedScheduler />
                </div>
            </React.Fragment>
        )
    }
}

export default Home