import {ADD_VIEWED_INGREDIENT_DATA, REMOVE_VIEWED_INGREDIENT_DATA} from "../types/viewedIngredient";
import {TItem} from "../types/otherTypes";
import {TViewedIngredientActions} from "../types/viewedIngredient";

export type TViewedIngredientState = {
    currentIngredient: TItem,
}

export const initialStateViewedIngredient: TViewedIngredientState = {
    currentIngredient: {} as TItem,
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
                currentIngredient: initialStateViewedIngredient.currentIngredient,
            };
        }
        default: {
            return state;
        }
    }
}