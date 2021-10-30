const api = 'https://norma.nomoreparties.space/api';
const headers= { 'Content-Type': 'application/json'};
export const ingredientsRequest = async () => {
    return await fetch(`${api}/ingredients`)
};
export const getOrder = async (orderItems) => {
    return await fetch(`${api}/orders`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ ingredients:orderItems })
    });
};

export const handleResponse = (res) => {
    if (!res.ok) {
        return Promise.reject(res.status);
    }
    return Promise.resolve(res.json()).then((data) => {
        return data;
    });
};

class AuthApi {
    constructor({ serverUrl, headers }) {
        this._headers = headers;
        this._serverUrl = serverUrl;
    }

    register(email, password, name) {
        return fetch(`${this._serverUrl}/auth/register`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ email, password, name }),
        }).then(handleResponse);
    }

    login(email, password) {
        return fetch(`${this._serverUrl}/auth/login`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ email, password }),
        }).then(handleResponse);
    }

    forgotPassword(email) {
        return fetch(`${this._serverUrl}/password-reset`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ email }),
        }).then(handleResponse);
    }

    resetPassword(password, token) {
        return fetch(`${this._serverUrl}/password-reset/reset`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ password, token }),
        }).then(handleResponse);
    }

    logout(token) {
        return fetch(`${this._serverUrl}/auth/logout`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ token }),
        }).then(handleResponse);
    }

    refreshToken(token) {
        return fetch(`${this._serverUrl}/auth/token`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ token }),
        }).then(handleResponse);
    }

    getUserInfo(token) {
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

    updateUserInfo(token, name, email, password) {
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
    serverUrl: api,
    headers: {
        Authorization: '',
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

export default authApi;