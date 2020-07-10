import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Popup from 'reactjs-popup'

class DeadlineInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open:false,
            id:"",
            deadlineName:"",
            module:"",
            deadline:"",
            description:""
        }
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.reset = this.reset.bind(this)
        this.addDeadline = this.addDeadline.bind(this)
        this.editDeadline = this.editDeadline.bind(this)
        this.removeDeadline = this.removeDeadline.bind(this)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.viewMode && prevState.open && this.state.open) {
            if ((prevProps.deadlineInfo.id !== this.props.deadlineInfo.id) || 
                (prevProps.deadlineInfo.module !== this.props.deadlineInfo.module) || 
                (prevProps.deadlineInfo.description !== this.props.deadlineInfo.description)) {
                this.setState({
                    id: this.props.deadlineInfo.id,
                    deadlineName: this.props.deadlineInfo.deadlineName,
                    module: this.props.deadlineInfo.module,
                    deadline: this.props.deadlineInfo.deadline,
                    description: this.props.deadlineInfo.description
                })
            }
        }
    }

    openModal() {
        if ((this.props.viewMode && this.props.deadlineInfo) || this.props.calendarView) {
            this.setState({
                open: true,
                id: this.props.deadlineInfo.id,
                deadlineName: this.props.deadlineInfo.deadlineName,
                module: this.props.deadlineInfo.module,
                deadline: this.props.deadlineInfo.deadline,
                description: this.props.deadlineInfo.description
            })
        } else {
            this.setState({open:true})
        }
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
            deadlineName: "",
            module: "",
            deadline: "",
            description: "",
        })
    }

    addDeadline() {
        let addedFields = {id: this.state.deadline + this.state.deadlineName,
                           deadlineName: this.state.deadlineName,
                           module: this.state.module,
                           deadline: this.state.deadline,
                           description: this.state.description
        }
        this.props.updateDeadline(addedFields, false, false)
        this.closeModal()
    }

    editDeadline() {
        let editedFields = {id: this.state.id,
                            deadlineName: this.state.deadlineName, 
                            module: this.state.module, 
                            deadline: this.state.deadline,
                            description: this.state.description}
        this.props.updateDeadline(editedFields, false, true)
        this.closeModal()
    }

    removeDeadline() {
        let removedFields = {id: this.state.id,
                             deadlineName: "", 
                             module: "", 
                             deadline: "",
                             description: ""}
        this.props.updateDeadline(removedFields, true, false)
        this.closeModal()
    }

    render() {
        const buttonAdd = {
            color:'#404040',
            fontSize: 18,
            float:'right',
            marginRight:'5%',
            marginTop:'10%',
            background:'transparent',
            border:0,
            width:'30%'
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
            padding: '3% 50px'
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

        const buttonView ={
            color:'#404040',
            fontSize: 16,
            background:'transparent',
            border:0,
            marginTop:'5%',
            width:'90%',
        }

        return (<div>
                    {this.props.calendarView ? 
                        <Button className="taskButton" onClick={this.openModal}> {this.props.deadlineInfo.deadlineName} </Button> :
                            this.props.viewMode ? <button style={buttonView} onClick={this.openModal}> View Deadlines </button>: 
                            <button style={buttonAdd} onClick={this.openModal}> + </button> }
                    <Popup
                        open={this.state.open}
                        closeOnDocumentClick
                        onClose={this.closeModal}
                    >
                        <div>
                            <a style={closeStyle} onClick={this.closeModal}>
                                &times;
                            </a>

                            {this.props.viewMode && !this.props.deadlineInfo ? <div> No Deadlines </div> :
                            <div>
                            <div style={headerStyle}> {(this.props.viewMode || this.props.calendarView) ? this.props.deadlineInfo.deadlineName : 'New Deadline'} </div>
                            
                            {this.props.viewMode && this.props.deadlineInfo ? 
                                <div>
                                        <div style={{position:'absolute', marginTop:'15%', marginLeft:'-10%'}}> 
                                            <Button size='lg' onClick={()=>this.props.navViewMode(-1)}> {'<'} </Button>
                                        </div>

                                        <div style={{position:'absolute', marginTop:'15%', marginLeft:'102%'}}> 
                                            <Button size='lg' onClick={()=>this.props.navViewMode(1)}> {'>'} </Button>
                                        </div>
                                </div>
                                : null
                            }

                            <form style={contentStyle}>

                                <div style={{paddingBottom:'2%'}}>
                                <div style={{float: 'left'}}> Deadline Name: </div>
                                <div style={{float:'left', paddingLeft:'4.5%'}}> 
                                        <input 
                                            type='text' 
                                            name='deadlineName'
                                            style={{width:'120%'}}
                                            value={this.state.deadlineName}
                                            onChange={this.handleChange}
                                            readOnly={this.props.calendarView}
                                        >
                                        </input> 
                                    </div>
                                </div>

                                <br />
                                <br />

                                <div style={{paddingBottom:'2%'}}>
                                    <div style={{float: 'left'}}> Module: </div>
                                    <div style={{float:'left', paddingLeft:'11.2%'}}> 
                                        <input 
                                            type='text' 
                                            name="module"
                                            style={{width:'120%'}}
                                            value={this.state.module}
                                            onChange={this.handleChange}
                                            readOnly={this.props.calendarView}
                                        >
                                        </input> 
                                    </div>
                                </div>

                                <br />
                                <br />

                                <div style={{paddingBottom:'2%'}}>
                                    <div style={{float: 'left'}}> Deadline: </div>
                                    <div style={{float:'left', paddingLeft:'7%'}}> 
                                        <input 
                                            type='text' 
                                            name="deadline"
                                            style={{width:'70%'}}
                                            value={this.state.deadline}
                                            placeholder={"dd-mm-yyyy"}
                                            onChange={this.handleChange}
                                            readOnly={this.props.calendarView}
                                        >        
                                        </input> 
                                    </div>
                                </div>

                                <br />
                                <br />

                                <div>
                                <div style={{float:'left'}}> 
                                    <textarea style={{height:'100px', width:'390px'}} 
                                        placeholder='Deadline Description' 
                                        type='text' 
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.handleChange}
                                        readOnly={this.props.calendarView}
                                    >
                                    </textarea> 
                                </div>

                                <br />
                                <br />

                                <div>
                                    {this.props.calendarView ? null :
                                        <div style={{float:'left', marginLeft:this.props.viewMode ? '10%' : '25%', marginTop:'3%'}}>
                                            <Button onClick={this.props.viewMode ? this.editDeadline : this.addDeadline}> {this.props.viewMode ? 'Save Changes' : 'Add Deadline'} </Button>
                                        </div>}
                                    {this.props.viewMode ? 
                                    <div style={{float:'left', marginLeft:'8%', marginTop:'3%'}}>
                                        <Button onClick={this.removeDeadline}> Remove Deadline </Button>
                                    </div> : null}
                                </div>
                            </div>

                            </form> </div> }
                        </div>
                    </Popup>
                </div>)
    }
}

export default DeadlineInput