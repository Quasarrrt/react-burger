import { SET_ORDER_DETAILS, CLEAR_ORDER_DETAILS, TOrderDetailsActions } from '../types/orderDetails';
import {TOrder} from "../types/ws";

export type TOrderDetailsState = {
    orderDetails:TOrder;
}

const orderDetailsInitialState: TOrderDetailsState = {
    orderDetails:{} as TOrder,
};

export const orderDetailsReducer = (state = orderDetailsInitialState, action: TOrderDetailsActions,) => {
    switch (action.type) {
        case SET_ORDER_DETAILS: {
            return {
                ...state,
                orderDetails: action.payload,
            };
        }
        case CLEAR_ORDER_DETAILS: {
            return {
                ...state,
                orderDetails: orderDetailsInitialState.orderDetails,
            };
        }
        default: {
            return state;
        }
    }
};