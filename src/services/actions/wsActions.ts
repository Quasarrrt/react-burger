import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_ORDERS, WS_SEND_MESSAGE, IWSSendMessage, TOrders, IWSGetOrders
} from '../types/ws';



export const wsConnectionSuccess = () => ({
    type: WS_CONNECTION_SUCCESS
})

export const wsConnectionError = (event: Event | undefined) => ({
    type: WS_CONNECTION_ERROR,
    payload: event
})

export const wsConnectionClosed = () => ({
    type: WS_CONNECTION_CLOSED
})

export const wsSendMessage = (message: string): IWSSendMessage => {
    return {
        type: WS_SEND_MESSAGE,
        payload: message,
    };
};

export const wsGetOrders = (orders: TOrders): IWSGetOrders => {
    return {
        type: WS_GET_ORDERS,
        payload: orders,
    };
};