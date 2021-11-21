export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_ORDERS: 'WS_GET_ORDERS' = 'WS_GET_ORDERS';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';
export type TOrder = {
    _id: string;
    ingredients: string[];
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
};
export type TOrders = {
    orders: TOrder[];
    success: boolean;
    total: number;
    totalToday: number;
};
export type TWSState = {
    wsConnected: boolean;
    ordersData: null;
    error: string;
}
export interface IWSConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
    payload: {};
}
export interface IWSConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWSConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSSendMessage {
    readonly type: typeof WS_SEND_MESSAGE;
    payload: string;
}

export interface IWSGetOrders {
    readonly type: typeof WS_GET_ORDERS;
    payload: TOrders;
}

export type TWSActions =
    | IWSConnectionSuccess
    | IWSConnectionError
    | IWSConnectionClosed
    | IWSSendMessage
    | IWSGetOrders;