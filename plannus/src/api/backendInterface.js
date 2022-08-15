const serverURL = 'http://localhost:8080/'

const api = {
    getStudentTasks(studentId) {
        return ( 
            fetch(`${serverURL}api/task?` + new URLSearchParams({studentId: studentId}))
                .then(response => response.json()
                    .then(jsonResponse => jsonResponse)
                )
        )
    },
    
    addTask(name, module, timeFrom, timeTo, description, isCompleted, date, diary) {
        return (
            fetch(`${serverURL}api/task`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    studentId: 1,
                    name: name,
                    module: module,
                    timeFrom: timeFrom,
                    timeTo: timeTo,
                    description: description,
                    isCompleted: isCompleted,
                    date: date,
                    diary: diary
                })
            }).then(response => response.json()
                .then(jsonResponse => jsonResponse)
            )
        )
    },
    
    updateTask(id, name, module, timeFrom, timeTo, description, isCompleted, date, diary) {
        console.log(isCompleted)
        return (
            fetch(`${serverURL}api/task?` + new URLSearchParams({id:id}), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    studentId: 1,
                    name: name,
                    module: module,
                    timeFrom: timeFrom,
                    timeTo: timeTo,
                    description: description,
                    isCompleted: isCompleted,
                    date: date,
                    diary: diary
                })
            }).then(response => response.json()
                .then(jsonResponse => jsonResponse)
            )
        )
    },

    deleteTask(id) {
        return (
            fetch(`${serverURL}api/task?` + new URLSearchParams({id:id}), {
                method: 'DELETE'
            }).then(response => response.json()
                .then(jsonResponse => jsonResponse)
            )
                
        )
    },

    getStudentDeadlines(studentId) {
        return (
            fetch(`${serverURL}api/deadline?` + new URLSearchParams({studentId:studentId}))
                .then(response => response.json()
                    .then(jsonResponse => jsonResponse)
                )
        )
    },

    addDeadline(name, module, deadline, description, diary) {
        return (
            fetch(`${serverURL}api/deadline`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    studentId: 1,
                    name: name,
                    module: module,
                    deadline: deadline,
                    description: description,
                    diary: diary
                })             
            }).then(response => response.json()
                .then(jsonResponse => jsonResponse)
            )
        )
    },

    updateDeadline(id, name, module, deadline, description, diary) {
        return (
            fetch(`${serverURL}api/deadline?` + new URLSearchParams({id:id}), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    studentId: 1,
                    name: name,
                    module: module,
                    deadline: deadline,
                    description: description,
                    diary: diary
                })
            }).then(response => response.json()
                .then(jsonResponse => jsonResponse)
            )
        )
    },

    deleteDeadline(id) {
        return (
            fetch(`${serverURL}api/deadline?` + new URLSearchParams({id:id}), {
                method: 'DELETE'
            }).then(response => response.json()
                .then(jsonResponse => jsonResponse)
            )
                
        )
    },

    getsertStudentDiary(studentId, date) {
        return (
            fetch(`${serverURL}api/diary/${date}/?` + new URLSearchParams({studentId:studentId}))
                .then(response => response.json()
                    .then(jsonResponse => jsonResponse)
                )
        )
    },

    updateStudentDiary(id, studentId, date, note) {
        return (
            fetch(`${serverURL}api/diary?` + new URLSearchParams({id:id}), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    studentId: studentId,
                    date: date,
                    note: note
                })
            }).then(response => response.json()
                .then(jsonResponse => jsonResponse)
            )
        )
    }
}

export default api