import {AppDispatch, AppThunk} from "../store";

import {
    GET_USER_ORDERS_DATA_ERROR,
    GET_USER_ORDERS_DATA_REQUEST,
    GET_USER_ORDERS_DATA_SUCCESS
} from "../types/userOrdersData";
import {getUserOrders} from "../api/api";

export const getUserOrdersData: AppThunk = (token: string) => (dispatch: AppDispatch) => {
    dispatch({ type: GET_USER_ORDERS_DATA_REQUEST });
    getUserOrders(token)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
        })
        .then((res) => {
            if (res && res.success) {
                dispatch({
                    type: GET_USER_ORDERS_DATA_SUCCESS,
                    userOrdersData: res.data,
                });
            } else {
                dispatch({
                    type: GET_USER_ORDERS_DATA_ERROR,
                });
            }
        })
        .catch((err) => {
            dispatch({
                type: GET_USER_ORDERS_DATA_ERROR ,
            });
        });

};
