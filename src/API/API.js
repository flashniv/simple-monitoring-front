import axios from "axios";

export default class API {
    static URL = process.env.REACT_APP_API_URL

    //static URL = 'http://localhost:8080'

    static getUser() {
        return localStorage.getItem('userLogin')
    }

    static getPassword() {
        return localStorage.getItem('userPassword')
    }

    static isLoggedIn() {
        const loggedIn = localStorage.getItem('userLogin')
        return loggedIn != null;

    }

    static setLoggedOut() {
        localStorage.setItem('userLogin', null)
        localStorage.setItem('userPassword', null)
    }

    static setLoggedIn(user, password) {
        localStorage.setItem('userLogin', user)
        localStorage.setItem('userPassword', password)
    }

    static async getContent(path) {
        console.log(this.URL + path)
        return await axios.get(this.URL + path, {
            auth: {
                username: this.getUser(),
                password: this.getPassword()
            }
        });
    }

    static async postContent(path, data) {
        console.log("post " + this.URL + path)
        return await axios.post(this.URL + path, data, {
            auth: {
                username: this.getUser(),
                password: this.getPassword()
            }
        });
    }

    static async getImg(path) {
        console.log(this.URL + path)
        return await axios.get(this.URL + path, {
            auth: {
                username: this.getUser(),
                password: this.getPassword()
            },
            responseType: 'arraybuffer'
        });
    }

    //---------------------------------------------------------------------------------------------------
    static loginUser(user, password, onSuccess, onFailure) {
        this.setLoggedIn(user, password)
        const response = API.getContent("/api/v1/user/login/");
        response.then((value) => {
            onSuccess(value.data)
        }, (reason) => {
            this.setLoggedOut()
            onFailure(reason)
        })
    }

    static getUsers(onSuccess, onFailure) {
        const response = API.getContent("/api/v1/user/");
        response.then((value) => {
            onSuccess(value.data)
        }, (reason) => {
            onFailure(reason)
        })
    }

    static getTriggers(onSuccess, onFailure) {
        const response = API.getContent("/api/v1/trigger/");
        response.then((value) => {
            onSuccess(value.data)
        }, (reason) => {
            onFailure(reason)
        })
    }

    static getTriggerDetail(triggerId, onSuccess, onFailure) {
        const response = API.getContent("/api/v1/trigger/" + triggerId);
        response.then((value) => {
            onSuccess(value.data)
        }, (reason) => {
            onFailure(reason)
        })
    }

    static updateTrigger(newTrigger, onSuccess, onFailure) {
        const response = API.postContent("/api/v1/trigger/", newTrigger);
        response.then((value) => {
            onSuccess(value.data)
        }, (reason) => {
            onFailure(reason)
        })
    }

    static getItems(onSuccess, onFailure) {
        const response = API.getContent("/api/v1/metric/");
        response.then((value) => {
            onSuccess(value.data)
        }, (reason) => {
            onFailure(reason)
        })
    }

    static getParameterGroups(metricId, onSuccess, onFailure) {
        const response = API.getContent("/api/v1/metric/" + metricId + "/parameterGroups");
        response.then((value) => {
            onSuccess(value.data)
        }, (reason) => {
            onFailure(reason)
        })
    }

    static getEventsByParameterGroupId(parameterGroupId, begin, end) {
        const response = API.getContent("/api/v1/event/" + parameterGroupId + "?begin=" + begin.toISOString() + "&end=" + end.toISOString());
        return response
    }
}
