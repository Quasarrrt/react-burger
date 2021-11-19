import {TOrders} from "./ws";

export const GET_USER_ORDERS_DATA_REQUEST:'GET_ORDERS_DATA_REQUEST' = 'GET_ORDERS_DATA_REQUEST' ;
export const GET_USER_ORDERS_DATA_SUCCESS:'GET_ORDERS_DATA_SUCCESS' = 'GET_ORDERS_DATA_SUCCESS';
export const GET_USER_ORDERS_DATA_ERROR :'GET_ORDERS_DATA_ERROR' = 'GET_ORDERS_DATA_ERROR';


export type TUserOrdersDataState = {
    userOrdersData: null;
    userOrdersDataRequest: boolean;
    userOrdersDataError: boolean;
};

export interface IGetUserOrdersDataRequest {
    readonly type: typeof GET_USER_ORDERS_DATA_REQUEST;
}

export interface IGetUserOrdersDataSuccess {
    readonly type: typeof GET_USER_ORDERS_DATA_SUCCESS;
    userOrdersData: TOrders;
}

export interface GetUserOrdersDataError {
    readonly type: typeof GET_USER_ORDERS_DATA_ERROR;
}

export type TUserOrdersDataActions =
    | IGetUserOrdersDataRequest
    | IGetUserOrdersDataSuccess
    | GetUserOrdersDataError;