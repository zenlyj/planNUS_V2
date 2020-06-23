class Auth {
    constructor() {
        this.authenticated = false;
        this.nusnet = "";
    }

    login(nusnet, cb) {
        this.authenticated = true;
        this.nusnet = nusnet;
        cb();
    }

    logout(cb) {
        this.authenticated = false;
        this.nusnet = "";
        cb();
    }

    isAuthenticated() {
        return this.authenticated;
    }

    getNUSNET() {
        return this.nusnet;
    }
}

export default new Auth();