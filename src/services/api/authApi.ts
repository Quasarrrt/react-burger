import {apiUrl, handleResponse} from "./api";

class AuthApi {
    private serverUrl: string;
    constructor({ serverUrl}:{serverUrl:string}) {
        this.serverUrl = serverUrl;
    }

    register(email:string, password:string, name:string) {
        return fetch(`${this.serverUrl}/auth/register`, {
            method: 'POST',
            headers: {
                Authorization: '',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, name }),
        }).then(handleResponse);
    }

    login(email:string, password:string) {
        return fetch(`${this.serverUrl}/auth/login`, {
            method: 'POST',
            headers: {
                Authorization: '',
                Accept: 'application/json',
                'Content-Type': 'application/json',},
            body: JSON.stringify({ email, password }),
        }).then(handleResponse);
    }

    forgotPassword(email:string) {
        return fetch(`${this.serverUrl}/password-reset`, {
            method: 'POST',
            headers:{
                Authorization: '',
                Accept: 'application/json',
                'Content-Type': 'application/json',},
            body: JSON.stringify({ email }),
        }).then(handleResponse);
    }

    resetPassword(password:string, token:string) {
        return fetch(`${this.serverUrl}/password-reset/reset`, {
            method: 'POST',
            headers: {
                Authorization: '',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password, token }),
        }).then(handleResponse);
    }

    logout(token:string) {
        return fetch(`${this.serverUrl}/auth/logout`, {
            method: 'POST',
            headers:{
                Authorization: '',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        }).then(handleResponse);
    }

    refreshToken(token:string) {
        return fetch(`${this.serverUrl}/auth/token`, {
            method: 'POST',
            headers: {
                Authorization: '',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        }).then(handleResponse);
    }

    getUserInfo(token:string) {
        return fetch(`${this.serverUrl}/auth/user`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json', },
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                return data;
            });
    }

    updateUserInfo(token:string, name:string, email:string, password:string) {
        return fetch(`${this.serverUrl}/auth/user`, {
            method: 'PATCH',
            headers:
                { Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json', },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                return data;
            });
    }
}

const authApi = new AuthApi({
    serverUrl: apiUrl,
});
export default authApi;