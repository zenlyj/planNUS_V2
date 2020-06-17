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

    getModuleInfo(year, moduleCode) {
        const param = year + "/modules/" + moduleCode + ".json";
        return this.fetchJson(param);
    }

    fetchJson(param) {
        const url = this.baseLink + param;
        return fetch(url).then(res => res.json());
    }
}

export default new nusmodsAPI();