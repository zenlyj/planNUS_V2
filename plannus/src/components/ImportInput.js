import React, { Component } from 'react'
import Popup from 'reactjs-popup'
import Button from 'react-bootstrap/Button'

class ImportInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open:false,
            nusmodsURL: ""
        }
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.submitURL = this.submitURL.bind(this)
        this.reset = this.reset.bind(this)
    }

    openModal() {
        this.setState({
            open: true,
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

    submitURL() {
        let url = this.state.nusmodsURL
        this.props.submitURL(url)
        this.closeModal()
    }

    reset() {
        this.setState({
            nusmodsURL:""
        })
    }

    render() {
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
        
        return (<div>
                    <Button onClick={this.openModal}> Import </Button>
                    <Popup
                        open={this.state.open}
                        closeOnDocumentClick
                        onClose={this.closeModal}
                    >
                        <div>
                            <a style={closeStyle} onClick={this.closeModal}>
                                &times;
                            </a>
                            <div style={headerStyle}> Import </div>
                            <form style={contentStyle}>
                                <div style={{paddingBottom:'3%'}}>
                                    <div style={{float:'left'}}> Import from: </div>
                                    <div style={{float:'left', marginLeft:'15%'}}> <Button> NUSMods </Button> </div>
                                    <div style={{float:'left', marginLeft:'20%'}}> <Button> PlanNUS </Button> </div>
                                </div>

                                <br />
                                <br />

                                <div style={{paddingBottom:'3%'}}>
                                    <div style={{float:'left'}}> URL: </div>
                                    <div style={{float:'left', paddingLeft:'15%'}}> 
                                            <input 
                                                type='text' 
                                                name='nusmodsURL'
                                                style={{width:'200%'}}
                                                value={this.state.nusmodsURL}
                                                placeholder={"Enter NUSMods URL"}
                                                onChange={this.handleChange}
                                            >
                                            </input> 
                                    </div>
                                </div>

                                <br />
                                <br />

                                <div>
                                    <div style={{float:'left'}}> Load from Template (PlanNUS): </div>
                                </div>

                                <br />
                                <br />
                                <br />

                                <div>
                                    <div style={{float:'left', marginLeft:'85%'}}>
                                        <Button onClick={this.submitURL}> Import </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Popup>
                </div>)
    }
}

export default ImportInput