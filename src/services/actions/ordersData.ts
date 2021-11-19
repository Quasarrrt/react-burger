import {AppDispatch, AppThunk} from "../store";
import {GET_ORDERS_DATA_ERROR, GET_ORDERS_DATA_REQUEST, GET_ORDERS_DATA_SUCCESS} from "../types/ordersData";
import api from "../api/api";



export const getOrdersData: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch({ type: GET_ORDERS_DATA_REQUEST });

    return api
        .getOrdersData()
        .then((data) => {
            dispatch({
                type: GET_ORDERS_DATA_SUCCESS,
                ordersData: data,
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({ type: GET_ORDERS_DATA_ERROR });
        });
};