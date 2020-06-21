import axios from 'axios';
import modulelist from './moduleslist.json';

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
}

export default new nusmodsAPI();