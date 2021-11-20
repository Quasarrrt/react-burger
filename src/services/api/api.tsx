export const apiUrl = 'https://norma.nomoreparties.space/api';
export const WS_ALL_ORDERS_URL = 'wss://norma.nomoreparties.space/orders/all';
export const WS_USER_ORDERS_URL = 'wss://norma.nomoreparties.space/orders';


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

export const getOrdersDat= async ()=> {
    return await fetch(`${apiUrl}/orders/all`, {
        method: 'GET',
         headers: {
        'Authorization': '',
            'Content-Type': 'application/json'
    }
    })
}

export const getUserOrders=async (token: string)=> {
    return fetch(`${apiUrl}/orders`, {
        method: 'GET',
        headers: {  'Authorization':`Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    })
}
