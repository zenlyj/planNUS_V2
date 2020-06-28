import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Task from './Task'
import nusmodsAPI from '../api/nusmodsAPI';

class Timetable extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            tasksAdded: this.props.tasksAdded
        }
        this.updateTable = this.updateTable.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.id !== this.props.id) {
            this.setState({id: this.props.id})
        }
        for (let key of prevProps.tasksAdded.keys()) {
            let curr = this.props.tasksAdded.get(key)
            let prev = prevProps.tasksAdded.get(key)
            if (curr === undefined) {
                this.setState({tasksAdded: this.props.tasksAdded})
                break
            }
            this.compareTasks(prev, curr)
        }

        for (let key of this.props.tasksAdded.keys()) {
            let curr = this.props.tasksAdded.get(key)
            let prev = prevProps.tasksAdded.get(key)
            if (prev === undefined) {
                this.setState({tasksAdded: this.props.tasksAdded})
                break
            }
            this.compareTasks(prev, curr)
        }
    }

    compareTasks(prev, curr) {
        if ((prev.taskPresent !== curr.taskPresent) || 
            (prev.taskName !== curr.taskName) || 
            (prev.module !== curr.module) ||
            (prev.timeTo !== curr.timeTo) ||
            (prev.description !== curr.description)
            ) {
                this.setState({tasksAdded: this.props.tasksAdded})
            }
    }

    updateTable(updatedTask) {
        let updated = new Map(this.state.tasksAdded)
        if (updatedTask.taskPresent) {
            if (this.state.tasksAdded.has(updatedTask.id)) {
                // edit task info
                updated.delete(updatedTask.id)
                nusmodsAPI.removeTask(updatedTask.id, this.state.id)
                updated.set(updatedTask.id, updatedTask)
                nusmodsAPI.addTask(updatedTask.id, updatedTask.taskPresent, updatedTask.taskName, updatedTask.module,
                    updatedTask.timeFrom, updatedTask.timeTo, updatedTask.description, this.state.id)
            } else {
                // add brand new task
                updated.set(updatedTask.id, updatedTask)
                nusmodsAPI.addTask(updatedTask.id, updatedTask.taskPresent, updatedTask.taskName, updatedTask.module,
                    updatedTask.timeFrom, updatedTask.timeTo, updatedTask.description, this.state.id)
            }
        } else {
            // to delete task from table
            updated.delete(updatedTask.id)
            nusmodsAPI.removeTask(updatedTask.id, this.state.id)
        }
        this.props.updateHomeTask(this.state.id, updated)
    }

    genTableHead() {
        let hours = []
        hours.push(<th key="h0000">{"FROM"} <br /> {"TO"}</th>)
        for (let x = 9; x <= 21; x++) {
            let from = "00";
            let to = "00"
            if (x < 10) {
                from = "0" + x + from;
                x < 9 ? to = "0" + (x+1) + to : to = (x+1) + to
            } else {
                from = x + from;
                to = (x+1) + to;
            }
            hours.push(<th style={{textAlign:'center'}} key={"h"+from}>
                {from} <br /> {to}</th>)
        }
        return (<thead>
                    <tr>
                        {hours}
                    </tr>
                </thead>)
    }

    genTableBody() {
        let days = ["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"]
        let daysRows = days.map(day => {
            let row = []
            row.push(<td key={day+"0"}>{day}</td>)
            for (let x = 1; x <= 13; x++) {
                let cellKey = day+x
                let colSpan = 1
                let initTask = {}
                if (this.state.tasksAdded.has(cellKey)) {
                    // determine length of button representing task on timetable
                    let task = this.state.tasksAdded.get(cellKey)
                    colSpan = (task.timeTo-task.timeFrom)/100
                    // initialize task if it has been added previously
                    initTask = task
                } else {
                    // default task initialization
                    initTask = {
                        id: cellKey,
                        taskPresent: false,
                        taskName: "",
                        module: "",
                        timeFrom: x===1 ? '0'+(x+8)*100 : ""+(x+8)*100,
                        timeTo: "",
                        description: ""
                    }
                }
                row.push(<td key={cellKey} colSpan={colSpan}> 
                            <Task initTask={initTask} updateTable={this.updateTable} />
                        </td>)
                x += (colSpan-1)
            }
            return <tr key={day}>{row}</tr>
        });
        return (<tbody>
                    {daysRows}
                </tbody>)
    }

    render() {
        return (
            <Table striped bordered hover variant="light" style={{width:'85%', tableLayout:'fixed'}}>
                {this.genTableHead()}
                {this.genTableBody()}
            </Table>
        )
    }
}

export default Timetable