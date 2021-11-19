import {AppDispatch, AppThunk} from "../store";
import api from "../api/api";
import {
    GET_USER_ORDERS_DATA_ERROR,
    GET_USER_ORDERS_DATA_REQUEST,
    GET_USER_ORDERS_DATA_SUCCESS
} from "../types/userOrdersData";

export const getUserOrdersData: AppThunk = (token: string) => (dispatch: AppDispatch) => {
    dispatch({ type: GET_USER_ORDERS_DATA_REQUEST });

    return api
        .getUserOrdersData(token)
        .then((data) => {
            dispatch({
                type: GET_USER_ORDERS_DATA_SUCCESS,
                userOrdersData: data,
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({ type: GET_USER_ORDERS_DATA_ERROR });
        });
};
