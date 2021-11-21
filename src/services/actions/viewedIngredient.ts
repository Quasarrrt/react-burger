import {TItem} from "../types/otherTypes";
import {
    ADD_VIEWED_INGREDIENT_DATA,
    IAddViewedIngredientAction, IDeleteViewedIngredientAction,
    REMOVE_VIEWED_INGREDIENT_DATA
} from "../types/viewedIngredient";

export const getViewedIngredient = (ingredientItem: TItem): IAddViewedIngredientAction => ({
    type: ADD_VIEWED_INGREDIENT_DATA,
    payload: ingredientItem
})

export const removeViewedIngredient = (): IDeleteViewedIngredientAction => ({
    type: REMOVE_VIEWED_INGREDIENT_DATA
})
