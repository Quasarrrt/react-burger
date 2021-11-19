import { SET_ORDER_DETAILS, CLEAR_ORDER_DETAILS,TOrderDetailsState, TOrderDetailsActions } from '../types/orderDetails';

const orderDetailsInitialState: TOrderDetailsState = {
    orderDetails: null,
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
                orderDetails: null,
            };
        }
        default: {
            return state;
        }
    }
};