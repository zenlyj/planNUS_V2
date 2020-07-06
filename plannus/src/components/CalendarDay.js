import React, { Component } from 'react'

class CalendarDay extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (<div> {this.props.date} </div>)
    }
}

export default CalendarDay