import axios, {AxiosResponse} from 'axios';
import {AuthenticationResponse} from "../types/AuthenticationResponse";
import {AuthenticationRequest} from "../types/AuthenticationRequest";

export default class API {
    static API_URL = process.env.REACT_APP_API_URL;

    static async postContent<D, R>(path: string, data?: D, config?: any): Promise<AxiosResponse<R>> {
        console.log("post " + this.API_URL + path)
        return await axios.post<R, AxiosResponse<R>, D>(this.API_URL + path, data, config);
    }

    static async getContent<R>(path: string, config?: any): Promise<AxiosResponse<R>> {
        console.log("post " + this.API_URL + path)
        return await axios.get<R, AxiosResponse<R>, string>(this.API_URL + path, config);
    }

    static signIn(authRequest: AuthenticationRequest, onSuccess: (success: AuthenticationResponse) => void, onFailure: (reason: any) => void) {
        API.postContent<AuthenticationRequest, AuthenticationResponse>("/authenticate", authRequest)
            .then(value => {
                onSuccess(value.data);
            }, reason => {
                onFailure(reason);
            })
    }
}
