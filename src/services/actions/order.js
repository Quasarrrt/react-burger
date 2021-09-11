import {getOrder} from "../api/api";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const SET_ORDER_ERROR='SET_ORDER_ERROR';

export const getOrderNum=(orderItems, openOrder) => {
    return function(dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST,
        });
        getOrder(orderItems)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: GET_ORDER_SUCCESS,
                        number: res.order.number,
                    });
                    openOrder(true);

                } else {
                    dispatch({
                        type: SET_ORDER_ERROR,
                    });
                }
            })
            .catch((err) => {
                dispatch({
                    type: SET_ORDER_ERROR,
                });
            });
    };
}
