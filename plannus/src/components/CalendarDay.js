import React, { Component } from 'react'
import Popup from 'reactjs-popup'
import Task from './Task'
import Deadline from './Deadline'

class CalendarDay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open:false,
            days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            taskPage: 1,
            maxTaskPage: 1,
            DLpage : 1,
            maxDLPage: 1,
            shortNote: this.props.shortNote,
            taskCompleted: this.props.taskCompleted
        }

        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.navTask = this.navTask.bind(this)
        this.navDL = this.navDL.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.markTaskCompleted = this.markTaskCompleted.bind(this)
    }

    componentDidUpdate(prevProps) {
        let retrievedTasks = []
        let week = this.computeWeek()
        let day = this.computeDay().substring(0,3).toUpperCase()
        let weekTasks = this.props.taskDB.get(week)
        if (weekTasks) {
            for (let [key, value] of weekTasks) {
                if (key.substring(0,3) == day) {
                    retrievedTasks.push(value)
                }
            }
        }
        if (Math.floor(retrievedTasks.length/4)+1 != this.state.maxTaskPage) {
            this.setState({maxTaskPage: Math.floor(retrievedTasks.length/4)+1})
        }
        let retrievedDL = this.retrieveDL();
        if (Math.floor(retrievedDL.length/4)+1 != this.state.maxDLPage) {
            this.setState({maxDLPage: Math.floor(retrievedDL.length/4)+1})
        }
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name] : value
        })
    }

    openModal() {
        this.setState({open:true})
    }

    closeModal(){
        this.setState({open:false})
        this.props.updateDiaryDatabase(this.props.fullDate, [this.state.shortNote, this.state.taskCompleted])
    }

    markTaskCompleted(id) {
        let taskCompleted = new Map(this.state.taskCompleted)
        let status = false
        if (taskCompleted.has(id)) {
            status = taskCompleted.get(id)
            taskCompleted.delete(id)
            taskCompleted.set(id, !status)
        } else {
            taskCompleted.set(id, status)
        }
        this.setState({taskCompleted: taskCompleted})
    }

    computeWeek() {
        // calendar is synced with NUS academic calendar AY20/21 sem 1 http://www.nus.edu.sg/registrar/info/calendar/AY2020-2021.pdf
        let day = this.props.fullDate.substring(0,2)
        let month = this.props.fullDate.substring(3,5)
        let res = 0;
        if (month === "09" && parseInt(day) >= 21 && parseInt(day) <= 27) {
            return res;
        }
        if (month === "08") {
            for (let cnt = 10; cnt <= day; cnt+=7) {
                res++;
            }
        } else if (month === "09") {
            res = 4
            for (let cnt = 7; cnt <= day; cnt+=7) {
                if (cnt===21) {
                    cnt+=7;
                }
                res++
            }
        } else if (month === "10") {
            res = 7
            for (let cnt = 5; cnt <= day; cnt+=7) {
                res++
            }
        } else {
            res = 11
            for (let cnt = 2; cnt <= day; cnt+=7) {
                res++
            }
        }
        return res;
    }

    computeDay() {
        let day = this.props.fullDate.substring(0,2)
        let month = this.props.fullDate.substring(3,5)
        if (month === "08") {
            if (day%7 == 0) {
                day = 6
            } else {
                day = (day%7)-1
            }
        } else if (month === "09") {
            day = (day%7)+2
            if (day > 6) {
                day -= 7
            }
        } else if (month === "10") {
            day = (day%7)+4
            if (day > 6) {
                day -= 7
            }
        } else {
            day %= 7
            if (day > 6) {
                day -= 7
            }
        }
        return this.state.days[day];
    }

    retrieveTasks() {
        let retrieved = []
        let week = this.computeWeek()
        let day = this.computeDay().substring(0,3).toUpperCase()
        let weekTasks = this.props.taskDB.get(week)
        if (weekTasks) {
            for (let [key, value] of weekTasks) {
                if (key.substring(0,3) == day) {
                    let completed = this.state.taskCompleted.get(key)
                    if (completed === undefined) {
                        retrieved.push([value, true])
                    } else {
                        retrieved.push([value, completed])
                    }
                }
            }
        }
        retrieved.sort((a, b) => {
            const day = a[0].id.substring(0,3)
            let idA = "" 
            let idB = ""
            if (day === "MON" || day === "WED" || day === "FRI" || day === "SAT" || day === "SUN") {
                idA = a[0].id.length === 4 ? a[0].id.substring(3, 4) : a[0].id.substring(3, 5)
                idB = b[0].id.length === 4 ? b[0].id.substring(3, 4) : b[0].id.substring(3, 5)
            } else if (day === "TUE") {
                idA = a[0].id.length === 5 ? a[0].id.substring(4, 5) : a[0].id.substring(4, 6)
                idB = b[0].id.length === 5 ? b[0].id.substring(4, 5) : b[0].id.substring(4, 6)
            } else {
                idA = a[0].id.length === 6 ? a[0].id.substring(5, 6) : a[0].id.substring(5, 7)
                idB = b[0].id.length === 6 ? b[0].id.substring(5, 6) : b[0].id.substring(5, 7)
            }
            idA = parseInt(idA)
            idB = parseInt(idB)
            if (idA < idB) {
                return -1
            }
            if (idA > idB) {
                return 1
            }
            return 0
        })
        return retrieved
    }

    taskDisplay() {
        let tasks = this.retrieveTasks()
        let display = []
        for (let x = 0; x < this.state.taskPage && tasks.length!=0; x++) {
            for (let y = 0; y < 4; y++) {
                let index = x*4+y
                if (x != 0 && index<tasks.length) {
                    display.shift()
                }
                display.push(<div key={this.props.fullDate+"-"+x+y+"-task"} style={{float:'left', marginLeft:'4%', width:'20%'}}> {index < tasks.length ? <Task initTask={tasks[index][0]} calendarView={true} markTaskCompleted={this.markTaskCompleted} taskCompleted={tasks[index][1]} /> : null} </div>)
            }
        }
        return <div style={{float:'left', width:'80%', textAlign:'center'}}> 
                    {display.length!=0 ? display : "No Tasks"}
                </div>
    }
    
    retrieveDL() {
        let retrieved = []
        for (let [key, value] of this.props.deadlineDB) {
            if (key.substring(0,10) === this.props.fullDate) {
                retrieved.push(value)
            }
        }
        return retrieved
    }

    deadlineDisplay() {
        let deadlines = this.retrieveDL()
        let display = []
        for (let x = 0; x < this.state.DLpage && deadlines.length!=0; x++) {
            for (let y = 0; y < 4; y++) {
                let index = x*4+y
                if (x != 0 && index<deadlines.length) {
                    display.shift()
                }
                display.push(<div key={this.props.fullDate+"-"+x+y+"-dl"} style={{float:'left', marginLeft:'4%', width:'20%'}}> {index < deadlines.length ? <Deadline deadlineInfo={deadlines[index]} calendarView={true} /> : null} </div>)
            }
        }
        return <div style={{float:'left', width:'80%', textAlign:'center'}}> 
                    {display.length!=0 ? display : "No Deadlines"}
                </div>
    }

    navTask(diff) {
        if (this.state.taskPage == 1 && diff == -1) {
            return;
        } else if (this.state.taskPage == this.state.maxTaskPage && diff == 1) {
            return;
        } else {
            this.setState({taskPage: this.state.taskPage+diff})
        }
    }

    navDL(diff) {
        if (this.state.DLpage == 1 && diff == -1) {
            return;
        } else if (this.state.DLpage == this.state.maxDLPage && diff == 1){
            return;
        } else {
            this.setState({DLpage: this.state.DLpage+diff})
        }
    }

    render() {
        const defaultButtonStyle = {   
            background: 'transparent',
            border: 0,
            width:'100%',
            height:'30px',
            color: '#404040',
            fontSize: 20
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
            border: '1px solid #cfcece',
            opacity: '80%'
        }

        const headerStyle = {
            color: 'black',
            width: '100%',
            borderBottom: '1px solid gray',
            fontSize: '18px',
            textAlign: 'center',
            padding: '5px'
        }

        return (
            <div>
                <button style={defaultButtonStyle} onClick={this.openModal}> 
                    {this.props.fullDate.indexOf(0) == "0" ? this.props.fullDate.substring(1,2) : this.props.fullDate.substring(0,2)} 
                </button>
                <Popup
                    open={this.state.open}
                    closeOnDocumentClick
                    onClose={this.closeModal}
                >
                    <div>
                        <a style={closeStyle} onClick={this.closeModal}>
                            &times;
                        </a>
                        <div style={headerStyle}>
                            {this.computeDay() + " " + this.props.fullDate}
                        </div>
                        <div style={{marginTop:'5%', marginLeft:'13%', fontSize:'20px', color:'#404040'}}>
                            Tasks
                        </div>
                        <div style={{marginTop:'3%'}}>
                            <div style={{float:'left', marginLeft:'5%', width:'5%', textAlign:'right'}}> <button style={defaultButtonStyle} onClick={()=>this.navTask(-1)}> {'<'} </button> </div>
                            {this.taskDisplay()}
                            <div style={{float:'right', marginRight:'5%', width:'5%'}}> <button style={defaultButtonStyle} onClick={()=>this.navTask(1)}> {'>'} </button> </div>
                        </div>
                        <div style={{marginTop:'15%', marginLeft:'13%', fontSize:'20px', color:'#404040'}}>
                            Deadlines
                        </div>
                        <div style={{marginTop:'3%'}}>
                            <div style={{float:'left', marginLeft:'5%', width:'5%', textAlign:'right'}}> <button style={defaultButtonStyle} onClick={()=>this.navDL(-1)}> {'<'} </button> </div>
                            {this.deadlineDisplay()}
                            <div style={{float:'right', marginRight:'5%', width:'5%'}}> <button style={defaultButtonStyle} onClick={()=>this.navDL(1)}> {'>'} </button> </div>
                        </div>
                        <div style={{marginTop:'15%', marginLeft:'13%'}}>
                            <textarea
                                style={{width:'50%', height:'80px'}}
                                type="text"
                                name="shortNote"
                                value={this.state.shortNote}
                                onChange={this.handleChange}
                                placeholder="Note to Self"
                            >    
                            </textarea>
                        </div>
                    </div>

                </Popup>
            </div>
        )
    }
}

export default CalendarDay