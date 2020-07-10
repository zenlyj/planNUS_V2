import React, { Component } from "react";
import Button from 'react-bootstrap/Button'
import Calendar from './components/Calendar'

class Diary extends Component{
    constructor(props) {
        super(props)
        this.state = {
            months: ["August", "September", "October", "November"],
            monthNum: this.props.currMonth
        }
    }

    navMonth(diff) {
        if (this.state.monthNum == 0 && diff == -1) {
            return;
        } else if (this.state.monthNum == 3 && diff == 1) {
            return;
        } else {
            this.setState({monthNum: this.state.monthNum+diff})
        }
    }

    render() {
        const month = this.state.months[this.state.monthNum]
        return (
            <React.Fragment>
                <div style={{marginTop:'2%', marginLeft:'40%', paddingBottom:'1.5%'}}> 
                    <Button variant="outline-dark" style={{float:'left', marginRight:"4%"}} onClick={()=>this.navMonth(-1)}> {'<'} </Button>
                    <h3 style={{float:'left', color:'#404040', width:'13%', textAlign:'center'}}> {month} </h3> 
                    <Button variant="outline-dark" style={{float:'left', marginLeft:'4%'}} onClick={()=>this.navMonth(1)}> {'>'} </Button>
                </div>
                <div style={{marginLeft:'13%', marginTop:'3%'}}>
                    <Calendar taskDB={this.props.taskDB} deadlineDB={this.props.deadlineDB} currMonth={this.state.monthNum} updateDiaryDatabase={this.props.updateDiaryDatabase} diaryDB={this.props.diaryDB} />
                </div>
            </React.Fragment>
        )
    }
}

export default Diary