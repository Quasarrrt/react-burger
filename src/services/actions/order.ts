import api, {getOrder} from "../api/api";
import {GET_ORDER_REQUEST, GET_ORDER_SUCCESS, SET_ORDER_ERROR} from "../types/order";
import {AppDispatch, AppThunk} from "../store";
import {TOrder} from "../types/ws";

export const getOrderNum: AppThunk =(orderItems: string[]) =>  (dispatch: AppDispatch)=>{
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
                        orderNumber: res.order.number,
                    });

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
