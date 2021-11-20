import { TOrder } from './ws';

export const  SET_ORDER_DETAILS:' SET_ORDER_DETAILS' = ' SET_ORDER_DETAILS' ;
export const CLEAR_ORDER_DETAILS:'CLEAR_ORDER_DETAILS' = 'CLEAR_ORDER_DETAILS';


export type TOrderDetailsState = {
    orderDetails: null;
};

export interface ISetOrderDetails {
    readonly type: typeof SET_ORDER_DETAILS;
    order: TOrder;
}

export interface IClearOrderDetails {
    readonly type: typeof CLEAR_ORDER_DETAILS;
}

export type TOrderDetailsActions = ISetOrderDetails | IClearOrderDetails;