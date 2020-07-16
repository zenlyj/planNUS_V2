import React, { Component } from "react";
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Chart from './components/Chart'
import nusmodsAPI from "./api/nusmodsAPI";

class Stats extends Component {
    constructor(props) {
        super(props)
        this.state = {
            from: 1,
            to: 1,
            show: false
        }
        this.genFromMenu = this.genFromMenu.bind(this)
        this.genToMenu = this.genToMenu.bind(this)
        this.handleFromChange = this.handleFromChange.bind(this)
        this.handleToChange = this.handleToChange.bind(this)
        this.genChart = this.genChart.bind(this)
    }

    genFromMenu() {
        let res = []
        for (let x = 1; x <= 13; x++) {
            res.push("Week " + x)
        }
        return res
    }

    genToMenu() {
        let res = []
        for (let x = this.state.from; x <= 13; x++) {
            res.push("Week " + x)
        }
        return res
    }

    handleFromChange(event) {
        let newWeek = event.value.length===6 ? event.value.substring(5,6) : event.value.substring(5,7)
        this.setState({from: parseInt(newWeek), show:false})
    }

    handleToChange(event) {
        let newWeek = event.value.length===6 ? event.value.substring(5,6) : event.value.substring(5,7)
        this.setState({to: parseInt(newWeek), show:false})
    }

    genChart() {
        this.setState({show: true})
    }

    computePlottedHours() {
        let summer = new Map()
        // sum up hours for each module over timespan
        for (let i = this.state.from; i <= this.state.to; i++) {
            for (let value of this.props.taskDB.get(i).values()) {
                let hr = summer.get(value.module)
                let modHours = (value.timeTo-value.timeFrom)/100
                if (hr === undefined) {
                    summer.set(value.module, modHours)
                } else {
                    summer.delete(value.module)
                    summer.set(value.module, hr+modHours)
                }
            }
        }
        let plotted = ["Plotted Workload"]
        let modules = []
        for (let [key, value] of summer) {
            plotted.push(value)
            modules.push(key)
        }
        return {modules: modules, plotted: plotted}
    }

    computeExpectedHours() {
        //find occurences of each module for each week
        let occurences = new Map()
        for (let i = this.state.from; i <= this.state.to; i++) {
            for (let value of this.props.taskDB.get(i).values()) {
                let temp = occurences.get(value.module)
                if (temp === undefined) {
                    occurences.set(value.module, [i])
                } else {
                    let arr = occurences.get(value.module)
                    if (!arr.includes(i)) {
                        arr.push(i)
                    }
                    occurences.delete(value.module)
                    occurences.set(value.module, arr)
                }
            }
        }
        let summer = []
        for (let [key, value] of occurences) {
            let temp = []
            for (let x = 0; x < value.length; x++) {
                temp.push(nusmodsAPI.calculateWorkload(value[x], key))
            }
            let promise = Promise.all(temp).then(arr => {
                let sum = 0
                for (let y = 0; y < arr.length; y++) {
                    sum += arr[y]
                }
                return sum
            })
            summer.push(promise)
        }
        return Promise.all(summer)
    }

    computeCompletedHours() {
        let completedWorkload = ["Completed Workload"]
        let computed = this.computePlottedHours()
        let modules = computed.modules
        for (let y = 0; y < modules.length; y++) {
            completedWorkload.push(0)
        }

        for (let week = this.state.from; week <= this.state.to; week++) {
            let data = this.props.diaryDB.get(week)
            if (data === undefined) {
                continue
            }
            for (let allTasks of data.values()) {
                for (let [slot, completed] of allTasks.taskCompleted) {
                    if (completed) {
                        let task = this.props.taskDB.get(week).get(slot)
                        let mod = task.module
                        let duration = (task.timeTo-task.timeFrom)/100
                        let index = modules.indexOf(mod)
                        completedWorkload[index+1] += duration
                    }
                }
            }
        }
        return completedWorkload
    }

    render() {
        let from = this.genFromMenu()
        let to = this.genToMenu() 
        let data = this.computePlottedHours()
        let expected = this.computeExpectedHours()
        let completed = this.computeCompletedHours()
        return (
            <React.Fragment>
                <div style={{marginLeft:'45%', marginTop:'2%'}}>
                    <h3 style={{color:'#404040'}}> Stats </h3>
                </div>
                <div style={{marginLeft:'13%', marginTop:'3%'}}>
                    <div style={{float:'left', color:'#404040', fontSize:'20px'}}> From </div>
                    <div style={{float:'left', marginLeft:'4%', width:'8%'}}> 
                        {<Dropdown options={from} value={"Week " + this.state.from} onChange={this.handleFromChange}/>}
                    </div>

                    <div style={{float:'left', color:'#404040', fontSize:'20px', marginLeft:'5%'}}> To </div> 
                    <div style={{float:'left', marginLeft:'4%', width:'8%'}}> 
                        {<Dropdown name="to" options={to} value={"Week " + this.state.to} onChange={this.handleToChange}/>}   
                    </div>

                    <div style={{float:'left', marginLeft:'4%', width:'8%'}}> <Button variant="outline-dark" onClick={this.genChart}> Go </Button></div>
                </div>
                <div style={{width:'70%', marginLeft:'13%', marginTop:'10%'}}> <Chart data={data} completed={completed} expected={expected} show={this.state.show}/> </div>
            </React.Fragment>
        )
    }
}

export default Stats