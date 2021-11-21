import {TOrders} from "./ws";

export const GET_ORDERS_DATA_REQUEST:'GET_ORDERS_DATA_REQUEST' = 'GET_ORDERS_DATA_REQUEST' ;
export const GET_ORDERS_DATA_SUCCESS:'GET_ORDERS_DATA_SUCCESS' = 'GET_ORDERS_DATA_SUCCESS';
export const GET_ORDERS_DATA_ERROR :'GET_ORDERS_DATA_ERROR' = 'GET_ORDERS_DATA_ERROR';

export type TOrdersDataState = {
    ordersData: null;
    ordersDataRequest: boolean;
    ordersDataError: boolean;
};

export interface IGetOrdersDataRequest {
    readonly type: typeof GET_ORDERS_DATA_REQUEST;
}

export interface IGetOrdersDataSuccess {
    readonly type: typeof GET_ORDERS_DATA_SUCCESS;
    ordersData: TOrders;
}

export interface IGetOrdersDataError {
    readonly type: typeof GET_ORDERS_DATA_ERROR;
}

export type TOrdersDataActions =
    | IGetOrdersDataRequest
    | IGetOrdersDataSuccess
    | IGetOrdersDataError;