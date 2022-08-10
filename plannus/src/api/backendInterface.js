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
    
    addTask(name, module, timeFrom, timeTo, description, isCompleted, date) {
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
                    date: date
                })
            }).then(response => response.json()
                .then(jsonResponse => jsonResponse)
            )
        )
    },
    
    updateTask(id, name, module, timeFrom, timeTo, description, isCompleted, date) {
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
                    date: date
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
    }
}

export default api