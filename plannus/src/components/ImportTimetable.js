import React, { Component } from 'react'
import PropTypes from "prop-types";
import Popup from 'reactjs-popup'
import Button from 'react-bootstrap/Button'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import InputRange from 'react-input-range'
import moduleslist from '../api/moduleslist.json'
import AutoComplete from './AutoComplete'
import nusmodsAPI from '../api/nusmodsAPI'


class ImportTimetable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            nusmodsURL: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ open: true });
    }
    
    closeModal() {
        this.setState({ open: false });
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
                <Button onClick={this.openModal}>Import</Button>
                <Popup 
                    open={this.state.open}
                    closeOnDocumentClick
                    modal
                    onClose={this.closeModal}
                >
                    <div>
                        <a style={closeStyle} onClick={this.closeModal}>
                            &times;
                        </a>
                        <div style={headerStyle}> Automated Scheduler </div>
                        <div style={contentStyle}>
                            <form action="/">
                                <table align="left" className="AutomatedForm">
                                    <tbody>
                                        <tr><td colSpan='1'></td><td colSpan='1'>NUSMods:</td><td colSpan='9'><input type="hidden" name="type" value="nusmods"/><input name="url" style={{width: 100 + '%'}} placeholder="Place share link here! eg. https://nusmods.com/timetable/sem-2/share?CS1231S=LEC:1,TUT:05&CS2030=LEC:1,REC:06,LAB:09&CS2100=LEC:1,LAB:14,TUT:14&GER1000=TUT:E73&MA1521=LEC:2,TUT:7"/></td><td colSpan='1'></td></tr>
                                        <tr><td colSpan='7'></td><td colSpan='2'></td><td colSpan='2'><Button type="submit" className="fullButton btn-success">Import</Button></td><td colSpan='1'></td></tr>
                                    </tbody>
                                </table>
                            </form>
                        </div>
                        
                    </div>

                </Popup>
            </div>
        )
    }
}

export default ImportTimetable