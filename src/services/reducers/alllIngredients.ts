
import {
    GET_INGREDIENTS_ERROR,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    TAllIngredientsState, TGetAllIngredientsActions
} from "../types/allIngredients";


export const initialStateAllIngredients: TAllIngredientsState= {
    allIngredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
}

export const allIngredientsReducer = (state = initialStateAllIngredients, action:TGetAllIngredientsActions ) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientsFailed: false,
                allIngredients: action.allIngredients,
                ingredientsRequest: false,
            };
        }
        case GET_INGREDIENTS_ERROR: {
            return {
                ...state,
                ingredientsFailed: true,
                ingredientsRequest: false
            };
        }
        default: {
            return state;
        }
    }
}