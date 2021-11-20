import {TOrder} from "../types/ws";
import {CLEAR_ORDER_DETAILS, IClearOrderDetails, ISetOrderDetails, SET_ORDER_DETAILS} from "../types/orderDetails";

export const setOrderDetails = (order: TOrder): ISetOrderDetails => {
    return {
        type: SET_ORDER_DETAILS,
        order: order,
    };
};

export const clearOrderDetails = (): IClearOrderDetails => {
    return {
        type: CLEAR_ORDER_DETAILS,
    };
};