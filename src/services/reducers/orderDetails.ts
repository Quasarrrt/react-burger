import { SET_ORDER_DETAILS, CLEAR_ORDER_DETAILS, TOrderDetailsActions } from '../types/orderDetails';


export type TOrderDetailsState = {
    orderDetails: null;
}

const orderDetailsInitialState: TOrderDetailsState = {
    orderDetails:null,
};

export const orderDetailsReducer = (state = orderDetailsInitialState, action: TOrderDetailsActions,) => {
    switch (action.type) {
        case SET_ORDER_DETAILS: {
            return {
                ...state,
                orderDetails: action.order,
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