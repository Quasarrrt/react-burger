export const apiUrl = 'https://norma.nomoreparties.space/api';
export const WS_ALL_ORDERS_URL = 'wss://norma.nomoreparties.space/orders/all';
export const WS_USER_ORDERS_URL = 'wss://norma.nomoreparties.space/orders';

export const handleResponse=(res: Response) =>{
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const ingredientsRequest = async () => {
    return await fetch(`${apiUrl}/ingredients`)
};
export const getOrder = async (orderItems:string[], token: string) => {
    return await fetch(`${apiUrl}/orders`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ingredients:orderItems })
    });
};




class Api {
    _headers: {};
    _serverUrl: string;

    constructor({ serverUrl, headers }: { serverUrl: string; headers: {} }) {
        this._headers = headers;
        this._serverUrl = serverUrl;
    }

    getOrdersData() {
        return fetch(`${this._serverUrl}/orders/all`, {
            method: 'GET',
            headers: this._headers,
        }).then(handleResponse);
    }

    getUserOrdersData(token: string) {
        return fetch(`${this._serverUrl}/orders`, {
            method: 'GET',
            headers: { ...this._headers, Authorization: `Bearer ${token}` },
        }).then(handleResponse);
    }


}

const api = new Api({
    serverUrl: apiUrl,
    headers: {
        Authorization: '',
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});





export default api;