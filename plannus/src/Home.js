import React, { Component } from "react";
import Timetable from './components/Timetable'
import Button from 'react-bootstrap/Button'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            weekNum: 1,
            timetables: new Map()
        }
        this.navWeek = this.navWeek.bind(this)
        this.updateHome = this.updateHome.bind(this)
    }

    updateHome(id, updatedTimetable) {
        let timetables = new Map(this.state.timetables)
        if (this.state.timetables.has(id)) {
            timetables.delete(id)
        }
        timetables.set(id, updatedTimetable)
        this.setState({timetables: timetables})
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
                <div style={{marginTop:'3%', marginLeft:'40%', paddingBottom: '3%'}}> 
                    <Button variant="outline-dark" style={{float:'left', marginRight:"5%"}} onClick={()=>this.navWeek(-1)}> {'<'} </Button>
                    <h3 style={{float:'left', color:'#404040'}}> {'Week ' + this.state.weekNum} </h3> 
                    <Button variant="outline-dark" style={{float:'left', marginLeft:"5%"}} onClick={()=>this.navWeek(1)}> {'>'} </Button>
                </div>
                <Timetable id={this.state.weekNum} tasksAdded={tasksAdded} updateHome={this.updateHome}/>
            </React.Fragment>
        )
    }
}

export default Home