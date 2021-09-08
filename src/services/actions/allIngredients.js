import {ingredientsRequest} from "../api/api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export function getIndgredients() {
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
            .then(data =>{
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    items: data.data
                });
            } )
            .catch(e => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                });
                console.log(e)
            });
    };
}