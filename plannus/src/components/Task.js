import React, { Component } from 'react'
import TaskInput from './TaskInput'

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            taskPresent: false,
            taskName: "",
            module: "",
            timeFrom: "",
            timeTo: "",
            description: ""
        }
        this.updateTask = this.updateTask.bind(this)
    }

    updateTask(taskPresent, taskName, module, timeFrom, timeTo, description) {
        this.setState({
            taskPresent: taskPresent,
            taskName: taskName,
            module: module,
            timeFrom: timeFrom,
            timeTo: timeTo,
            description: description
        })
        this.props.updateTable(this.state.id, timeFrom, timeTo, taskPresent)
    }   

    render() {
        return (<TaskInput
                    taskPresent={this.state.taskPresent} 
                    taskName={this.state.taskName}
                    module={this.state.module}
                    timeFrom={this.props.timeFrom}
                    timeTo={this.state.timeTo}
                    description={this.state.description}
                    updateTask={this.updateTask}
                />)
    } 
}

export default Task