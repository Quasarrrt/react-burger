import {
    GET_USER_ORDERS_DATA_REQUEST,
    GET_USER_ORDERS_DATA_SUCCESS,
    GET_USER_ORDERS_DATA_ERROR,
    TUserOrdersDataState, TUserOrdersDataActions
} from '../types/userOrdersData';


const userOrdersDataInitialState: TUserOrdersDataState = {
    userOrdersData: null,
    userOrdersDataRequest: false,
    userOrdersDataError: false,
};

export const userOrdersDataReducer = (state = userOrdersDataInitialState, action: TUserOrdersDataActions,) => {
    switch (action.type) {
        case GET_USER_ORDERS_DATA_REQUEST: {
            return {
                ...state,
                userOrdersDataRequest: true,
                userOrdersDataError: false,
            };
        }
        case GET_USER_ORDERS_DATA_SUCCESS: {
            return {
                ...state,
                userOrdersData: action.userOrdersData,
                userOrdersDataRequest: false,
            };
        }
        case GET_USER_ORDERS_DATA_ERROR: {
            return {
                ...state,
                userOrdersDataRequest: false,
                userOrdersDataError: true,
            };
        }
        default: {
            return state;
        }
    }
};