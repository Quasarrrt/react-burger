import {TItem} from "./otherTypes";

export const GET_INGREDIENTS_REQUEST:'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS:'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR:'GET_INGREDIENTS_ERROR' = 'GET_INGREDIENTS_ERROR';

export type TAllIngredientsState = {
    allIngredients: [];
    ingredientsRequest: boolean;
    ingredientsFailed: boolean;
};
export type TAllIngredients = {
    success: boolean;
    data: TItem[];
};
export interface IGetAllIngredientsRequest {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetAllIngredientsSuccess {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    allIngredients: TAllIngredients;
}
export interface IGetAllIngredientsError {
    readonly type: typeof GET_INGREDIENTS_ERROR;
}

export type TGetAllIngredientsActions =
    | IGetAllIngredientsRequest
    | IGetAllIngredientsSuccess
    | IGetAllIngredientsError;