import modulelist from './moduleslist.json';
import Auth from '../components/Auth';

class nusmodsAPI {
    constructor() {
        this.baseLink = "https://api.nusmods.com/v2/";
        this.phpHost = "http://localhost/";
        // this.phpHost = "http://116.14.246.142/";
    }

    /* 
        year (academic year) = "2019/2020" or "2018/2019" or etc..
    */
    getModules(year) {
        const param = year + "/moduleList.json";
        return this.fetchJson(param);
    }

    /* 
        Modules info
        workload A-B-C-D-E
        A => Lecture
        B => Tutorial
        C => Lab
        D => Project/Assignments
        E => Prep work
    */
    getModuleInfo(year, moduleCode) {
        const param = year + "/modules/" + moduleCode + ".json";
        return this.fetchJson(param);
    }

    async fetchJson(param) {
        const url = this.baseLink + param;
        const response = await (await fetch(url)).then(res => res.json());
        return response;
    }

    getModuleList(sem) {
        let moduleList = [];
        let fullList = modulelist.filter(mod => mod.semesters.indexOf(sem) > -1);
        for (var key in fullList) {
            moduleList.push(fullList[key].moduleCode + " " + fullList[key].title);
        }
        return moduleList;
    }

    calculateWorkload(week, modules) {
        const nusnet = Auth.getNUSNET();
        let url = this.phpHost + "calculateworkload.php?nusnet=" + nusnet + "&week=" + week + "&modules=" + modules.toString();
        const response = fetch(url).then(res => res.json()).then(obj => obj.hours);
        return response;
    }

    addTask(id, taskPresent, taskName, module, timeFrom, timeTo, description, week) {
        const nusnet = Auth.getNUSNET();
        let url = this.phpHost + "addtask.php?nusnet="+ nusnet +
                "&id=" + id + "&taskPresent=" + taskPresent + "&taskName=" + taskName +
                "&module=" + module + "&timeFrom=" + timeFrom  + "&timeTo=" + timeTo + 
                "&description=" + description + "&week=" + week;
        const response = fetch(url).then(res => res.json()).then(obj => obj.success);
    }

    removeTask(id, week) {
        const nusnet = Auth.getNUSNET();
        let url = this.phpHost + "removetask.php?nusnet="+ nusnet +
                "&id=" + id + "&week=" + week;
        const response = fetch(url).then(res => res.json()).then(obj => obj.success);
    }

    // USAGE
    /* 
        fields["taskName"] = "newName";
        fields["description"] = "blablabla";
        fields["module"] = "xyz";
        nusmodsAPI.updateTask("FRI5", 1, fields);
    */
    updateTask(id, week, fields) {
        const nusnet = Auth.getNUSNET();
        let url = this.phpHost + "updatetask.php?nusnet="+ nusnet +
                "&id=" + id + "&week=" + week + "&fields=";
        let count = 0;
        for (var key in fields) {
            if (count == 0) {

            } else {
                url += ",";
            }
            url += key + "|" + fields[key];
            count++;

        }
        console.log(url);
        const response = fetch(url).then(res => res.json()).then(obj => obj.success);
        return response;
    }
    
    retrieveTask() {
        const nusnet = Auth.getNUSNET();
        let url = this.phpHost + "retrievetask.php?nusnet=" + nusnet;
        const response = fetch(url).then(res => res.json()).then(json => this.dbtoMap(json));
        return response;

    }

    retrieveDistinctModule(week) {
        const nusnet = Auth.getNUSNET();
        let url = this.phpHost + "retrievedistinctmodule.php?nusnet=" + nusnet + "&week=" + week;
        const response = fetch(url).then(res => res.json()).then(json => json.map(x => x.module));
        return response;
    }

    // usage importFromNUSMODS(https://nusmods.com/timetable/sem-1/share?CS1101S=REC:09,TUT:09B,LEC:2&ES1103=SEC:C01&IS1103=SEC:1,TUT:18&MA1301=LEC:1,TUT:3&PC1221=TUT:6,LEC:1,LAB:9);
    // the url is from nusmods -> share -> copy link
    importFromNUSMODS(nusmodsURL) {
        let url = this.phpHost + "importnusmods.php?url=" + nusmodsURL.split("%3D").join("=").split("%3A").join(":")
        .split("%2F").join("/").split("%3F").join("?").split("%2C").join(",").split("%26").join("&").split("&").join("|");
        const response = fetch(url).then(res => res.json()).then(json => this.dbtoMap(json));
        return response;
    }

    automateSchedule(state) {
        const nusnet = Auth.getNUSNET();
        let url = this.phpHost + "workscheduler.php?nusnet=" + nusnet + "&week=" + state.week + "&modules=" + state.modules.toString();
        for (var key in state.formTabData.days) {
            const day = state.formTabData.days[key];
            url = url + "&" + day + "_hours=" + state.formTabData[day];
            url = url + "&" + day + "_start=" + state.formTabData[day+"_start"];
            url = url + "&" + day + "_end=" + state.formTabData[day+"_end"];
        }
        const response = fetch(url).then(res => res.json()).then(json => this.dbtoMap(json));
        return response;
    }

    dbtoMap(json) {
        let timetableMap = new Map();
        let weekMaps = {};
        json.forEach((taskObj) => {
            let task = {};
            task.description = taskObj.description;
            task.id = taskObj.id;
            task.module = taskObj.module;
            task.taskName = taskObj.taskName;
            task.taskPresent = taskObj.taskPresent;
            task.timeFrom = taskObj.timeFrom;
            task.timeTo = taskObj.timeTo;
            task.completed = taskObj.completed == 1 ? true : false;
            if (weekMaps[taskObj.week] == undefined) {
                weekMaps[taskObj.week] = new Map();
            }
            weekMaps[taskObj.week].set(task.id, task);
        });
        for (var key in weekMaps) {
            timetableMap.set(parseInt(key), weekMaps[key]);
        }
        return timetableMap;
    }
}

export default new nusmodsAPI();