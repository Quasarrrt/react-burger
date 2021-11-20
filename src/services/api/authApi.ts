import {apiUrl} from "./api";
const handleResponse = (res: Response) => {
    if (!res.ok) {
        return Promise.reject(res.status);
    }
    return Promise.resolve(res.json()).then((data) => {
        return data;
    });
};

class AuthApi {
    _headers: {};
    _serverUrl: string;

    constructor({ serverUrl, headers }: { serverUrl: string; headers: {} }) {
        this._headers = headers;
        this._serverUrl = serverUrl;
    }

    register(email: string, password: string, name: string) {
        return fetch(`${this._serverUrl}/auth/register`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ email, password, name }),
        }).then(handleResponse);
    }

    login(email: string, password: string) {
        return fetch(`${this._serverUrl}/auth/login`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ email, password }),
        }).then(handleResponse);
    }

    forgotPassword(email: string) {
        return fetch(`${this._serverUrl}/password-reset`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ email }),
        }).then(handleResponse);
    }

    resetPassword(password: string, token: string) {
        return fetch(`${this._serverUrl}/password-reset/reset`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ password, token }),
        }).then(handleResponse);
    }

    logout(token: string) {
        return fetch(`${this._serverUrl}/auth/logout`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ token }),
        }).then(handleResponse);
    }

    refreshToken(token: string) {
        return fetch(`${this._serverUrl}/auth/token`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ token }),
        }).then(handleResponse);
    }

    getUserInfo(token: string) {
        return fetch(`${this._serverUrl}/auth/user`, {
            method: 'GET',
            headers: { ...this._headers, Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                return data;
            });
    }

    updateUserInfo(token: string, name: string, email: string, password: string) {
        return fetch(`${this._serverUrl}/auth/user`, {
            method: 'PATCH',
            headers: { ...this._headers, Authorization: `Bearer ${token}` },
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
    headers: {
        Authorization: '',
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

export default authApi;