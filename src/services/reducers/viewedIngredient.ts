import {ADD_VIEWED_INGREDIENT_DATA, REMOVE_VIEWED_INGREDIENT_DATA} from "../types/viewedIngredient";

import {TViewedIngredientActions} from "../types/viewedIngredient";

export type TViewedIngredientState = {
    currentIngredient: null,
}

export const initialStateViewedIngredient: TViewedIngredientState = {
    currentIngredient:null ,
};
export const viewedIngredientReducer = (state = initialStateViewedIngredient, action: TViewedIngredientActions) => {
    switch (action.type) {

        case ADD_VIEWED_INGREDIENT_DATA: {
            return {
                ...state,
                currentIngredient: action.payload,
            };
        }
        case REMOVE_VIEWED_INGREDIENT_DATA: {
            return {
                ...state,
                currentIngredient: null,
            };
        }
        default: {
            return state;
        }
    }
}