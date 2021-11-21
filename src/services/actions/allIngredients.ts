import  {ingredientsRequest} from "../api/api";
import {AppThunk, AppDispatch} from "../store";
import {GET_INGREDIENTS_ERROR, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS} from "../types/allIngredients";


export const getIngredients: AppThunk = () => (dispatch: AppDispatch)=>{

            dispatch({
                type: GET_INGREDIENTS_REQUEST
            });
            ingredientsRequest()
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(`Ошибка ${res.status}`);
                })
                .then((res) => {
                    if (res && res.success) {
                        dispatch({
                            type: GET_INGREDIENTS_SUCCESS,
                            allIngredients: res.data,
                        });
                    } else {
                        dispatch({
                            type: GET_INGREDIENTS_ERROR,
                        });
                    }
                })
                .catch((err) => {
                    dispatch({
                        type: GET_INGREDIENTS_ERROR,
                    });
                });
        };

