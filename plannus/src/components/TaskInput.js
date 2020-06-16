import React, { Component } from 'react'
import Popup from 'reactjs-popup'
import Button from 'react-bootstrap/Button'

class TaskInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            taskName: "",
            module: "",
            timeFrom: "",
            timeTo: "",
            description: "",
            hovered: false
        }
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.editTask = this.editTask.bind(this)
        this.removeTask = this.removeTask.bind(this)
        this.reset = this.reset.bind(this)
    }

    openModal() {
        this.setState({
            open: true,
            taskName: this.props.taskName,
            module: this.props.module,
            timeFrom: this.props.timeFrom,
            timeTo: this.props.timeTo,
            description: this.props.description
        })
    }

    closeModal() {
        this.setState({open: false})
        this.reset()
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name] : value
        })
    }

    reset() {
        this.setState({
            taskName: "",
            module: "",
            timeFrom: "",
            timeTo: "",
            description: "",
        })
    }

    editTask() {
        this.props.updateTask(true, this.state.taskName, this.state.module, this.state.timeFrom, this.state.timeTo, this.state.description)
        this.closeModal()
    }

    removeTask() {
        this.props.updateTask(false, "", "", "", "", "")
        this.closeModal()
    }

    render() {
        const buttonStyle = {   
            background: 'transparent',
            border: 0,
            width:'100%',
            height:'30px',
            color: 'white',
            fontSize: 20
        }

        const modalStyle = {
            font: '12px'
        }
        
        const headerStyle = {
            color: 'black',
            width: '100%',
            borderBottom: '1px solid gray',
            fontSize: '18px',
            textAlign: 'center',
            padding: '5px'
        }

        const contentStyle = {
            color: 'black',
            width: '100%',
            padding: '10px 50px'
        }

        const closeStyle = {
            color: 'black',
            cursor: 'pointer',
            position: 'absolute',
            display: 'block',
            padding: '2px 5px',
            lineHeight: '20px',
            right: '-10px',
            top: '-10px',
            fontSize: '24px',
            background: '#ffffff',
            borderRadius: '18px',
            border: '1px solid #cfcece'
        }

        return (
            <div>
                {this.props.taskPresent ? 
                    <Button style={{width:'100%', fontSize:'12px', whiteSpace:'nowrap'}} onClick={this.openModal}> {this.props.taskName} </Button> :
                    <button style={buttonStyle}
                        onMouseOver={() => this.setState({hovered:true})}
                        onMouseLeave={() => this.setState({hovered:false})}
                        onClick={this.openModal}
                    > 
                        {this.state.hovered ? '+' : null}
                    </button>
                }
                <Popup
                    open={this.state.open}
                    closeOnDocumentClick
                    onClose={this.closeModal}
                >
                    <div style={modalStyle}>
                        <a style={closeStyle} onClick={this.closeModal}>
                            &times;
                        </a>
                        <div style={headerStyle}> {this.props.taskPresent ? this.props.taskName : "New Task"} </div>
                        <form style={contentStyle}>
                           <div>
                               <div style={{float: 'left'}}> Task Name: </div>
                               <div style={{float:'left', paddingLeft:'4.5%'}}> 
                                    <input 
                                        type='text' 
                                        name='taskName'
                                        value={this.state.taskName}
                                        onChange={this.handleChange}
                                    >
                                    </input> 
                                </div>
                            </div>

                            <br />
                            <br />

                            <div>
                                <div style={{float: 'left'}}> Module: </div>
                                <div style={{float:'left', paddingLeft:'7.7%'}}> 
                                    <input 
                                        type='text' 
                                        name="module"
                                        value={this.state.module}
                                        onChange={this.handleChange}
                                    >
                                    </input> 
                                </div>
                            </div>

                            <br />
                            <br />

                            <div>
                                <div style={{float: 'left'}}> From: </div>
                                <div style={{float:'left', paddingLeft:'10.5%'}}> 
                                    <input 
                                        type='text' 
                                        name="timeFrom"
                                        value={this.state.timeFrom}   
                                >        
                                    </input> 
                                </div>

                                <div style={{float: 'left', paddingLeft:"10%"}}> To: </div>
                                <div style={{float:'left', paddingLeft:'10%'}}> 
                                    <input 
                                        type='text' 
                                        name="timeTo"
                                        value={this.state.timeTo}
                                        onChange={this.handleChange}
                                    >
                                    </input> 
                                </div>
                            </div>

                            <br />
                            <br />

                            <div>
                                <div style={{float:'left'}}> 
                                    <textarea style={{height:'100px', width:'350px'}} 
                                        placeholder='Task Description' 
                                        type='text' 
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.handleChange}
                                    >
                                    </textarea> 
                                </div>
                            </div>

                            <br />
                            <br />
                            <br />
                        
                            <div>
                                <div style={{float: 'left', paddingLeft: this.props.taskPresent ? '5%' : '25%'}}> 
                                    <Button variant="primary" 
                                            onClick={this.editTask}
                                    > 
                                        {this.props.taskPresent ? "Save Changes" : "Add Task"} 
                                    </Button>
                                </div>
                                {this.props.taskPresent ? 
                                    <div style={{float:'right'}}>
                                        <Button variant="primary"
                                            onClick={this.removeTask}
                                        >
                                            Remove Task
                                        </Button>
                                    </div> : 
                                    null
                                }
                            </div>
                        </form>
                    </div>
                </Popup>
            </div>
        )
    }
}

export default TaskInput