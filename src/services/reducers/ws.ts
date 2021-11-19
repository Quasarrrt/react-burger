import {TWSActions, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_ORDERS} from "../types/ws";
import {TWSState} from "../types/ws";
export const initialStateWS: TWSState = {
    wsConnected: false,
    ordersData: null,
    error: '',
}
export const webSocketReducer = (state = initialStateWS, action: TWSActions) => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS: {
            return {
                ...state,
                wsConnected: true,
                error: null,
            };
        }
        case WS_CONNECTION_ERROR: {
            return {
                ...state,
                wsConnected: false,
                error: action.payload,
            };
        }
        case WS_CONNECTION_CLOSED: {
            return {
                ...state,
                wsConnected: false,
                error: null,
            };
        }
        case WS_GET_ORDERS: {
            return {
                ...state,
                ordersData: action.payload,
                error: null,
            };
        }
        default: {
            return state;
        }
    }
};
