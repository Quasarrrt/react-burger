import {GET_ORDER_REQUEST, GET_ORDER_SUCCESS, SET_ORDER_ERROR, TOrderActions, TOrderState} from "../types/order"

export const initialStateOrder:  TOrderState={

    orderNumber: "....",
    orderRequest: false,
    orderFailed: false,
};
export const orderReducer = (state = initialStateOrder, action: TOrderActions) => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                orderNumber: initialStateOrder.orderNumber ,
                orderRequest: true,
                orderFailed: false,
            };
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                orderNumber: action.orderNumber,
                orderRequest: false,
            };
        }
        case SET_ORDER_ERROR: {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false,
            };
        }
        default: {
            return state;
        }
    }
}
