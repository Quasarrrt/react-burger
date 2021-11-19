export const GET_ORDER_REQUEST:'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS:'GET_ORDER_SUCCESS'= 'GET_ORDER_SUCCESS';
export const SET_ORDER_ERROR:'SET_ORDER_ERROR'='SET_ORDER_ERROR';

export type TOrderState = {
    orderNumber: string,
    orderRequest: boolean,
    orderFailed: boolean,
};

export interface IGetOrderNumberRequest {
    readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderNumberSuccess {
    readonly type: typeof GET_ORDER_SUCCESS;
    orderNumber: string;
}

export interface IGetOrderNumberError {
    readonly type: typeof SET_ORDER_ERROR;
}

export type TOrderActions =
    | IGetOrderNumberRequest
    | IGetOrderNumberSuccess
    | IGetOrderNumberError;