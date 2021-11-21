import {
    GET_ORDERS_DATA_REQUEST,
    GET_ORDERS_DATA_SUCCESS,
    GET_ORDERS_DATA_ERROR,
} from '../types/ordersData';

import { TOrdersDataActions, TOrdersDataState} from '../types/ordersData';

const ordersDataInitialState: TOrdersDataState = {
    ordersData: null,
    ordersDataRequest: false,
    ordersDataError: false,
};

export const ordersDataReducer = (state = ordersDataInitialState, action: TOrdersDataActions) => {
    switch (action.type) {
        case GET_ORDERS_DATA_REQUEST: {
            return {
                ...state,
                ordersDataRequest: true,
                ordersDataError: false,
            };
        }
        case GET_ORDERS_DATA_SUCCESS: {
            return {
                ...state,
                ordersData: action.ordersData,
                ordersDataRequest: false,
            };
        }
        case GET_ORDERS_DATA_ERROR: {
            return {
                ...state,
                ordersDataRequest: false,
                ordersDataError: true,
            };
        }
        default: {
            return state;
        }
    }
};