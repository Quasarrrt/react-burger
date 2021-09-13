import {ingredientsRequest} from "../api/api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

export function getIngredients() {
    return function(dispatch) {
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
}