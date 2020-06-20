import React, { Component } from 'react'
import PropTypes from "prop-types";
import Popup from 'reactjs-popup'
import Button from 'react-bootstrap/Button'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import moduleslist from '../api/moduleslist.json'
import AutoComplete from './AutoComplete'
import nusmodsAPI from '../api/nusmodsAPI'

class FormTab extends Component {
    render() {
        return (
        <Tabs defaultActiveKey="Monday" id="uncontrolled-tab-example">
        <Tab eventKey="Monday" title="Monday">
            
        <table align="left" className="AutomatedForm">
            <tbody>
                <tr>
                    <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                </tr>
                <tr><td colSpan='1'></td><td colSpan='1'>Workload</td><td colSpan='7'><input /></td><td colSpan='1'></td></tr>
            </tbody>
        </table>
        </Tab>
        <Tab eventKey="Tuesday" title="Tuesday">
        <table align="left" className="AutomatedForm">
            <tbody>
                <tr>
                    <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                </tr>
                <tr><td colSpan='1'></td><td colSpan='1'>Workload</td><td colSpan='7'><input /></td><td colSpan='1'></td></tr>
            </tbody>
        </table>
        </Tab>
        <Tab eventKey="Wednesday" title="Wednesday">
        <table align="left" className="AutomatedForm">
            <tbody>
                <tr>
                    <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                </tr>
                <tr><td colSpan='1'></td><td colSpan='1'>Workload</td><td colSpan='7'><input /></td><td colSpan='1'></td></tr>
            </tbody>
        </table>
        </Tab>
        <Tab eventKey="Thursday" title="Thursday">
        <table align="left" className="AutomatedForm">
            <tbody>
                <tr>
                    <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                </tr>
                <tr><td colSpan='1'></td><td colSpan='1'>Workload</td><td colSpan='7'><input /></td><td colSpan='1'></td></tr>
            </tbody>
        </table>
        </Tab>
        <Tab eventKey="Friday" title="Friday">
        <table align="left" className="AutomatedForm">
            <tbody>
                <tr>
                    <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                </tr>
                <tr><td colSpan='1'></td><td colSpan='1'>Workload</td><td colSpan='7'><input /></td><td colSpan='1'></td></tr>
            </tbody>
        </table>
        </Tab>
        <Tab eventKey="Saturday" title="Saturday">
        <table align="left" className="AutomatedForm">
            <tbody>
                <tr>
                    <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                </tr>
                <tr><td colSpan='1'></td><td colSpan='1'>Workload</td><td colSpan='7'><input /></td><td colSpan='1'></td></tr>
            </tbody>
        </table>
        </Tab>
        <Tab eventKey="Sunday" title="Sunday">
        <table align="left" className="AutomatedForm">
            <tbody>
                <tr>
                    <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                </tr>
                <tr><td colSpan='1'></td><td colSpan='1'>Workload</td><td colSpan='7'><input /></td><td colSpan='1'></td></tr>
            </tbody>
        </table>
        </Tab>
        </Tabs>
        )
    }
}

class AddedModules extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        console.log(e.currentTarget.innerText);
        this.props.onChange(e.currentTarget.innerText);
    }

    render() {
        return this.props.modules.map((mc) =>
        <Button className="btn-success modules" key={mc} onClick={this.handleChange}>{mc}</Button>
      )
    }
}
class AutomatedScheduler extends Component {
    static propTypes = {
        defaultModules: PropTypes.instanceOf(Array)
    };

    static defaultProps = {
        defaultModules: []
    };

    constructor(props) {
        super(props)
        this.state = {
            modules: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.addModule = this.addModule.bind(this)
        this.removeModule = this.removeModule.bind(this)
    }

    handleChange(event) {
    }

    addModule(mc) {
        if (this.state.modules.indexOf(mc) > -1) {
            
        } else {
            let newModules = this.state.modules;
            newModules.push(mc);
            this.setState({
                modules: newModules
            });
        }
        console.log(this.state.modules);
    }

    removeModule(mc) {
        let newModules = this.state.modules.filter(p => p != mc);
        this.setState({
            modules: newModules
        });
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
                    trigger={<Button> Automated Scheduler</Button>}
                    modal
                    closeOnDocumentClick
                >
                    <div style={modalStyle}>
                        <a style={closeStyle} onClick={this.closeModal}>
                            &times;
                        </a>
                        <div style={headerStyle}> Automated Scheduler </div>
                        <div style={contentStyle}>
                            <form>
                                <table align="left" className="AutomatedForm">
                                    <tbody>
                                        <tr>
                                            <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                                        </tr>
                                        <tr><td colSpan='1'></td><td colSpan='1'>Workload</td><td colSpan='7'><input /></td><td colSpan='1'></td></tr>
                                        <tr><td colSpan='1'></td><td colSpan='1'>Modules</td><td colSpan='7'><AutoComplete suggestions={nusmodsAPI.getModuleList(1)} onChange={this.addModule} /></td><td colSpan='1'></td></tr>
                                        <tr><td colSpan='2'></td><td colSpan='7'><AddedModules modules={this.state.modules} onChange={this.removeModule}/></td></tr>
                                        <tr><td colSpan='1'></td><td colSpan='8'><FormTab/></td><td colSpan='1'></td></tr>
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

export default AutomatedScheduler