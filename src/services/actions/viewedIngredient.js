export const ADD_VIEWED_INGREDIENT_DATA = "ADD_VIEWED_INGREDIENT_DATA";
export const REMOVE_VIEWED_INGREDIENT_DATA ="REMOVE_VIEWED_INGREDIENT_DATA";

export function addViewedIngredient(ingredient) {
    return {
        type: ADD_VIEWED_INGREDIENT_DATA,
        payload: ingredient,
    };
}

export function removeViewedIngredient() {
    return {
        type: REMOVE_VIEWED_INGREDIENT_DATA,
    };
}