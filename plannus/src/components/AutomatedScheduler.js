import React, { Component } from 'react'
import Popup from 'reactjs-popup'
import Button from 'react-bootstrap/Button'
import moduleslist from '../api/moduleslist.json'
import AutoComplete from './AutoComplete'
import nusmodsAPI from '../api/nusmodsAPI'

class AutomatedScheduler extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
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
                <Popup 
                    trigger={<button> Automated Scheduler</button>}
                    modal
                    closeOnDocumentClick
                >
                    <div style={modalStyle}>
                        <a style={closeStyle} onClick={this.closeModal}>
                            &times;
                        </a>
                        <div style={headerStyle}> Automated Scheduler </div>
                        <div style={contentStyle}>
                            placeholder<br/>
                            placeholder <AutoComplete suggestions={nusmodsAPI.getModuleList(1)} /><br/>
                            placeholder<br/>
                            placeholder<br/>
                            placeholder<br/>
                        </div>
                        
                    </div>
                </Popup>
            </div>
        )
    }
}

export default AutomatedScheduler