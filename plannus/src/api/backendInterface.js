import session from "../SessionUtil"

const serverURL = 'http://localhost:8080/'

const execute = (apiCall) => {
    // verify JWT token before calling server
    const accessToken = session.accessToken()
    return api.verifyToken(accessToken)
        .then(response => response.json())
        .then(body => {
            const tokenExpired = JSON.parse(body.data).isExpired
            if (tokenExpired) {
                return api.refreshToken().then(response => {
                    if (!response.ok) return response
                    return response.json().then(body => apiCall(body.access_token))
                })
            } else {
                return apiCall(accessToken)
            }
        })
}

const api = {
    getStudentTasks(studentId) {
        const tasks = (accessToken) => 
            fetch(`${serverURL}api/task?` + new URLSearchParams({studentId: studentId}), {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            })
            .then(response => response.json())
            .then(body => body)
        return execute(tasks)
    },
    
    addTask(studentId, name, module, timeFrom, timeTo, description, isCompleted, date, diary) {
        const call = (accessToken) =>
            fetch(`${serverURL}api/task`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                },
                body: JSON.stringify({
                    studentId: studentId,
                    name: name,
                    module: module,
                    timeFrom: timeFrom,
                    timeTo: timeTo,
                    description: description,
                    isCompleted: isCompleted,
                    date: date,
                    diary: diary
                })
            })
            .then(response => response.json())
            .then(body => body)
        return execute(call)
    },
    
    updateTask(studentId, id, name, module, timeFrom, timeTo, description, isCompleted, date, diary) {
        const call = (accessToken) => 
            fetch(`${serverURL}api/task?` + new URLSearchParams({id:id}), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                },
                body: JSON.stringify({
                    studentId: studentId,
                    name: name,
                    module: module,
                    timeFrom: timeFrom,
                    timeTo: timeTo,
                    description: description,
                    isCompleted: isCompleted,
                    date: date,
                    diary: diary
                })
            })
            .then(response => response.json())
            .then(body => body)
        return execute(call)
    },

    deleteTask(id) {
        const call = (accessToken) =>
            fetch(`${serverURL}api/task?` + new URLSearchParams({id:id}), {
                method: 'DELETE',
                headers: {
                    'Authorization' : 'Bearer ' + accessToken
                }
            })
            .then(response => response.json())
            .then(body => body)
        return execute(call)
    },

    getStudentDeadlines(studentId) {
        const call = (accessToken) =>
            fetch(`${serverURL}api/deadline?` + new URLSearchParams({studentId:studentId}), {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            })
            .then(response => response.json())
            .then(body => body)
        return execute(call)
    },

    addDeadline(studentId, name, module, deadline, description, diary) {
        const call = (accessToken) =>
            fetch(`${serverURL}api/deadline`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                },
                body: JSON.stringify({
                    studentId: studentId,
                    name: name,
                    module: module,
                    deadline: deadline,
                    description: description,
                    diary: diary
                })             
            })
            .then(response => response.json())
            .then(body => body)
        return execute(call)
    },

    updateDeadline(studentId, id, name, module, deadline, description, diary) {
        const call = (accessToken) =>
            fetch(`${serverURL}api/deadline?` + new URLSearchParams({id:id}), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                },
                body: JSON.stringify({
                    studentId: studentId,
                    name: name,
                    module: module,
                    deadline: deadline,
                    description: description,
                    diary: diary
                })
            })
            .then(response => response.json())
            .then(body => body)
        return execute(call)
    },

    deleteDeadline(id) {
        const call = (accessToken) =>
            fetch(`${serverURL}api/deadline?` + new URLSearchParams({id:id}), {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            })
            .then(response => response.json())
            .then(body => body)
        return execute(call)
    },

    getsertStudentDiary(studentId, date) {
        const call = (accessToken) =>
            fetch(`${serverURL}api/diary/${date}/?` + new URLSearchParams({studentId:studentId}), {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            })
            .then(response => response.json())
            .then(body => body)
        return execute(call)
    },

    updateStudentDiary(id, studentId, date, note) {
        const call = (accessToken) =>
            fetch(`${serverURL}api/diary?` + new URLSearchParams({id:id}), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                },
                body: JSON.stringify({
                    studentId: studentId,
                    date: date,
                    note: note
                })
            })
            .then(response => response.json())
            .then(body => body)
        return execute(call)
    },

    registerStudentAccount(username, password) {
        return (
            fetch(`${serverURL}api/student/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: username,
                    password: password
                })
            })
            .then(response => response.json())
            .then(body => body)
        )
    },

    authenticateStudent(username, password) {
        return (
            fetch(`${serverURL}api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    'username': username,
                    'password': password
                })
            })
            .then(response => response.json())
            .then(body => body)
        )
    },

    importNusMods(studentId, link) {
        const call = (accessToken) =>
            fetch(`${serverURL}api/task/import?` + new URLSearchParams({studentId:studentId, link:link}), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                }
            })
            .then(response => response.json())
            .then(body => body)
        return execute(call)
    },

    getStudent(username, accessToken) {
        return (
            fetch(`${serverURL}api/student/${username}`, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            })
            .then(response => response.json())
            .then(jsonResponse => jsonResponse)
        )
    },

    refreshToken() {
        const refreshToken = session.refreshToken()
        return fetch(`${serverURL}api/student/token/refresh`, {
            headers: {
                'Authorization': 'Bearer ' + refreshToken
            }
        })
    },

    verifyToken(accessToken) {
        return fetch(`${serverURL}api/student/token/verify?` + new URLSearchParams({token:accessToken}))
    }
}

export default api