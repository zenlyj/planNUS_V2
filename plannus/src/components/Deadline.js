import React, { Component } from 'react'
import DeadlineInput from './DeadlineInput'

class Deadline extends Component{
    constructor(props) {
        super(props)
        this.state = {
            currDL:0
        }
        this.updateDeadline = this.updateDeadline.bind(this)
        this.navViewMode = this.navViewMode.bind(this)
    }

    updateDeadline(updatedInfo, toRemove) {
        this.props.updateHomeDeadline(updatedInfo, toRemove)
    }

    navViewMode(diff) {
        let res = this.state.currDL+diff
        if (res>=0 && res<this.props.deadlines.length) {
            this.setState({currDL: this.state.currDL+diff})
        }
    }

    render() {
        const deadlineStyle = {
            color:'#404040',
            textAlign:'center', 
            fontWeight:500,
            borderWidth:'thin', 
            border:'2px solid gray', 
            height:'120px', 
            width:'140px',
            paddingTop:'2%'
        }

        let deadlineInfo = this.props.deadlines.length ? this.props.deadlines[this.state.currDL] : null
        console.log(deadlineInfo)
        return (<div style={deadlineStyle}> 
                    <div style={{height:'70px', borderBottom:'2px solid gray'}}> 
                        <div> Deadlines </div>
                        <DeadlineInput viewMode={false} updateDeadline={this.updateDeadline}/>
                    </div>
                    <div> <DeadlineInput viewMode={true} updateDeadline={this.updateDeadline} navViewMode={this.navViewMode} deadlineInfo={deadlineInfo}/> </div>
                </div>)
    }
}

export default Deadline