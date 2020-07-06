import React, { Component } from "react"
import Table from 'react-bootstrap/Table'
import CalendarDay from './CalendarDay'

class Calendar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currMonth: this.props.currMonth,
            startDays: [7, 3, 5, 1],
            dayLen: [31, 31, 30, 31, 30],
            monthLen: [6, 5, 5, 5]
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currMonth != this.props.currMonth) {
            this.setState({currMonth: this.props.currMonth})
        }
    }

    genHead() {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const daysRow = days.map(day => <th>{day}</th>)
        return (<thead>
                    <tr>
                        {daysRow}
                    </tr>
                </thead>)
    }

    genBody() {
        const start = this.state.startDays[this.state.currMonth]; // 1st Aug is on a Saturday
        const len = this.state.monthLen[this.state.currMonth];
        let datesRow = [];
        for (let x = 0; x < len; x++) {
            let dateRow = [];
            for (let y = 1; y <= 7; y++) {
                let date = y+(x*7)-(start-1);
                if (x == 0 && y < start) {
                    date += this.state.dayLen[this.state.currMonth];
                    dateRow.push(<th> <div style={{opacity:'30%'}}> {date} </div> </th>)
                } else if (date > this.state.dayLen[this.state.currMonth+1]) {
                    date -= this.state.dayLen[this.state.currMonth+1];
                    dateRow.push(<th> <div style={{opacity:'30%'}}> {date} </div> </th>)
                } else {
                    dateRow.push(<th> <CalendarDay date={date}/> </th>);
                } 
            }
            datesRow.push(<tr> {dateRow} </tr>);
        }
        return (<tbody>
                    {datesRow}
                </tbody>)
    }

    render() {
        console.log(this.state.currMonth)
        return (
            <Table variant style={{width:'85%'}}>
                {this.genHead()}
                {this.genBody()}
            </Table>
        )
    }
}

export default Calendar