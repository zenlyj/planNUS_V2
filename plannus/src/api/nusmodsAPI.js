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

    calculateWorkload(modules) {
        let url = this.phpHost + "calculateworkload.php?modules=" + modules.toString();
        const response = fetch(url).then(res => res.json()).then(obj => obj.hours);
        return response;
    }

    addTask(id, taskPresent, taskName, module, timeFrom, timeTo, description, week) {
        const nusnet = Auth.getNUSNET();
        let url = this.phpHost + "addtask.php?nusnet="+ nusnet +
                "&id=" + id + "&taskPresent=" + taskPresent + "&taskName=" + taskName +
                "&module=" + module + "&timeFrom=" + timeFrom  + "&timeTo=" + timeTo + 
                "&description=" + description + "&week=" + week;
        const response = fetch(url).then(res => res.json()).then(obj => console.log(obj.success));
    }

    removeTask(id, week) {
        const nusnet = Auth.getNUSNET();
        let url = this.phpHost + "removetask.php?nusnet="+ nusnet +
                "&id=" + id + "&week=" + week;
        const response = fetch(url).then(res => res.json()).then(obj => console.log(obj.success));
    }

    retrieveTask() {
        const nusnet = Auth.getNUSNET();
        let url = this.phpHost + "retrievetask.php?nusnet=" + nusnet;
        const response = fetch(url).then(res => res.json()).then(json => this.dbtoMap(json));
        return response;

    }

    // usage importFromNUSMODS(https://nusmods.com/timetable/sem-1/share?CS1101S=REC:09,TUT:09B,LEC:2&ES1103=SEC:C01&IS1103=SEC:1,TUT:18&MA1301=LEC:1,TUT:3&PC1221=TUT:6,LEC:1,LAB:9);
    // the url is from nusmods -> share -> copy link
    importFromNUSMODS(nusmodsURL) {
        let url = this.phpHost + "importnusmods.php?url=" + nusmodsURL.split("%3D").join("=").split("%3A").join(":")
        .split("%2F").join("/").split("%3F").join("?").split("%2C").join(",").split("%26").join("&").split("&").join("|");
        console.log(url);
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