import {AppDispatch, AppThunk} from "../store";
import {GET_ORDERS_DATA_ERROR, GET_ORDERS_DATA_REQUEST, GET_ORDERS_DATA_SUCCESS} from "../types/ordersData";
import {getOrdersDat} from "../api/api";

export const getOrdersData: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch({ type: GET_ORDERS_DATA_REQUEST });

        getOrdersDat()
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
        })
        .then((res) => {
            if (res && res.success) {
                dispatch({
                    type: GET_ORDERS_DATA_SUCCESS,
                    ordersData: res.data,
                });
            } else {
                dispatch({
                    type: GET_ORDERS_DATA_ERROR,
                });
            }
        })
        .catch((err) => {
            dispatch({
                type: GET_ORDERS_DATA_ERROR,
            });
        });

};