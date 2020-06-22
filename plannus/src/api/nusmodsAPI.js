import modulelist from './moduleslist.json';
import Auth from '../components/Auth';

class nusmodsAPI {
    constructor() {
        this.baseLink = "https://api.nusmods.com/v2/";
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
        let url = 'http://116.14.246.142/calculateworkload.php?modules=' + modules.toString();
        const response = fetch(url).then(res => res.json()).then(obj => obj.hours);
        return response;
    }

    addTask(id, taskPresent, taskName, module, timeFrom, timeTo, description, week) {
        const nusnet = Auth.getNUSNET();
        let url = "http://116.14.246.142/addtask.php?nusnet="+ nusnet +
                "&id=" + id + "&taskPresent=" + taskPresent + "&taskName=" + taskName +
                "&module=" + module + "&timeFrom=" + timeFrom  + "&timeTo=" + timeTo + 
                "&description=" + description + "&week=" + week;
        const response = fetch(url).then(res => res.json()).then(obj => console.log(obj.success));
    }

    retrieveTask() {
        const nusnet = Auth.getNUSNET();
        let url = "http://116.14.246.142/retrievetask.php?nusnet=" + nusnet;
        const response = fetch(url).then(res => res.json());
        return response;

    }
}

export default new nusmodsAPI();