import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'

class Timetable extends Component {
    
    constructor() {
        super();
        this.state = {
            buttonToShow: null
        }
        this.handleMouseOver = this.handleMouseOver.bind(this); 
        this.handleMouseOut = this.handleMouseOut.bind(this)
    }

    genTableHead() {
        let hours = []
        hours.push(<th key="h0000">FROM TO</th>)
        for (let x = 7; x <= 22; x++) {
            let from = "00";
            let to = "00"
            if (x < 10) {
                from = "0" + x + from;
                x < 9 ? to = "0" + (x+1) + to : to = (x+1) + to
            } else {
                from = x + from;
                to = (x+1) + to;
            }
            hours.push(<th key={"h"+from}>
                {from + "  " + to}</th>)
        }
        return (<thead>
                    <tr>
                        {hours}
                    </tr>
                </thead>)
    }

    handleMouseOver(cellKey) {
        this.setState({
            buttonToShow: cellKey
        })
    }

    handleMouseOut() {
        this.setState({
            buttonToShow: null
        })
    }

    genTableBody() {
        let buttonStyle = {
            background: 'transparent',
            border: 0,
            color: 'white',
            fontSize: 18
        }
        let days = ["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"]
        let daysRows = days.map(day => {
            let row = []
            row.push(<td key={day+"0"}>{day}</td>)
            for (let x = 1; x <= 16; x++) {
                let cellKey = day+x
                row.push(<td key={cellKey} onMouseOver={() => this.handleMouseOver(cellKey)} onMouseOut={this.handleMouseOut}> 
                <button style={buttonStyle}> {this.state.buttonToShow===cellKey ? '+' : null} </button>
                    </td>)
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