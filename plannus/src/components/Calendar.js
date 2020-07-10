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
        const daysRow = days.map(day => <th key={day}>{day}</th>)
        return (<thead>
                    <tr style={{textAlign:'center'}}>
                        {daysRow}
                    </tr>
                </thead>)
    }

    genBody() {
        const start = this.state.startDays[this.state.currMonth]; // 1st Aug is on a Saturday
        const len = this.state.monthLen[this.state.currMonth];
        const defaultStyle = {color: '#a2b2d3', fontSize: 20, opacity:'50%', textAlign:'center'}
        let datesRow = [];
        for (let x = 0; x < len; x++) {
            let dateRow = [];
            for (let y = 1; y <= 7; y++) {
                let date = y+(x*7)-(start-1);
                if (x == 0 && y < start) {
                    date += this.state.dayLen[this.state.currMonth];
                    let key = this.state.currMonth+7+"-"+date
                    dateRow.push(<th key={key}> <div style={defaultStyle}> {date} </div> </th>)
                } else if (date > this.state.dayLen[this.state.currMonth+1]) {
                    date -= this.state.dayLen[this.state.currMonth+1];
                    let key = this.state.currMonth+9+"-"+date
                    dateRow.push(<th key={key}> <div style={defaultStyle}> {date} </div> </th>)
                } else {
                    let key = this.state.currMonth+8+"-"+date
                    let shortNote = this.props.diaryDB.get(this.computeFullDate(date))
                    if (shortNote===undefined) {
                        shortNote = ""
                    }
                    dateRow.push(<th key={key}> <CalendarDay taskDB={this.props.taskDB} deadlineDB={this.props.deadlineDB} fullDate={this.computeFullDate(date)} updateDiaryDatabase={this.props.updateDiaryDatabase} shortNote={shortNote}/> </th>);
                } 
            }
            datesRow.push(<tr key={this.state.currMonth+"row"+x}>{dateRow}</tr>);
        }
        return (<tbody>
                    {datesRow}
                </tbody>)
    }

    computeFullDate(day) {
        // given a day and a month, represent it in a string of "xx-xx-xxxx" format
        let fullDate = "";
        if (day < 10) {
            fullDate += "0";
        }
        fullDate += (day + "-");
        let month = this.state.currMonth+8;
        fullDate += month>=10 ? month+"-" : "0"+month+"-";
        fullDate += ("2020");
        return fullDate;
    }

    render() {
        return (
            <Table variant style={{width:'85%', tableLayout:'fixed'}}>
                {this.genHead()}
                {this.genBody()}
            </Table>
        )
    }
}

export default Calendar