import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Task from './Task'

class Timetable extends Component {
    
    constructor() {
        super();
        this.state = {
            tasksAdded: new Map()
        }
        this.updateTable = this.updateTable.bind(this)
    }

    updateTable(id, timeFrom, timeTo, toAdd) {
        let duration = (timeTo-timeFrom)/100
        let updated = new Map(this.state.tasksAdded)
        this.setState(prevState => {
            if (toAdd) {
                if (this.state.tasksAdded.has(id)) {
                    // edit task info
                    updated.delete(id)
                    updated.set(id, duration)
                    return {tasksAdded: updated}
                } else {
                    // add brand new task
                    updated.set(id, duration)
                    return {tasksAdded: updated}
                }
            } else {
                // to delete task from table
                updated.delete(id)
                return {tasksAdded: updated}
            }
        })
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
                let colSpan = this.state.tasksAdded.has(cellKey) ? this.state.tasksAdded.get(cellKey) : 1
                row.push(<td key={cellKey} colSpan={colSpan}> 
                            <Task id={cellKey} updateTable={this.updateTable} timeFrom={x===1 ? '0'+(x+8)*100 : ""+(x+8)*100} />
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
        const tableStyle = {
            marginTop: '10%',
            marginLeft: '1%',
        }
        return (
            <Table striped bordered hover variant="dark" style={tableStyle}>
                {this.genTableHead()}
                {this.genTableBody()}
            </Table>
        )
    }
}

export default Timetable