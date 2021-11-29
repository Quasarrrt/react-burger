import {TItem} from "./otherTypes";

export const ADD_VIEWED_INGREDIENT_DATA:"ADD_VIEWED_INGREDIENT_DATA" = "ADD_VIEWED_INGREDIENT_DATA";
export const REMOVE_VIEWED_INGREDIENT_DATA:"REMOVE_VIEWED_INGREDIENT_DATA" ="REMOVE_VIEWED_INGREDIENT_DATA";

export interface IAddViewedIngredientAction {
    readonly type: typeof ADD_VIEWED_INGREDIENT_DATA;
    readonly payload: TItem;
}

export interface IDeleteViewedIngredientAction {
    readonly type: typeof REMOVE_VIEWED_INGREDIENT_DATA;
}

export type TViewedIngredientActions =
    | IAddViewedIngredientAction
    | IDeleteViewedIngredientAction
