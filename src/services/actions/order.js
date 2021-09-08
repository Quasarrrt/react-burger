import {orderRequest} from "../api/api";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const SET_ORDER_ERROR='SET_ORDER_ERROR';


export function getOrderNum() {
    return function(dispatch) {
        dispatch({
            type: 'GET_ORDER_REQUEST'
        });
        orderRequest()
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .then(data =>{
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    payload: data,
                });
            } )
            .catch(e => {
                dispatch({
                    type: GET_ORDER_FAILED,
                });
                console.log(e)
            });
    };
}
export function orderError(data) {
    return function(dispatch) {
        dispatch({
            type: SET_ORDER_ERROR,
            payload: data,
        });
    };
}