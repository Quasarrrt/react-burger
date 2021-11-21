import {TItem} from "./otherTypes";

export const ADD_CONSTRUCTOR_INGREDIENTS_BUN:'ADD_CONSTRUCTOR_INGREDIENTS_BUN'='ADD_CONSTRUCTOR_INGREDIENTS_BUN';
export const ADD_CONSTRUCTOR_INGREDIENTS:'ADD_CONSTRUCTOR_INGREDIENTS'='ADD_CONSTRUCTOR_INGREDIENTS';
export const DELETE_CONSTRUCTOR_INGREDIENTS:'DELETE_CONSTRUCTOR_INGREDIENTS'='DELETE_CONSTRUCTOR_INGREDIENTS';
export const MOVE_CONSTRUCTOR_INGREDIENTS:'MOVE_CONSTRUCTOR_INGREDIENTS'='MOVE_CONSTRUCTOR_INGREDIENTS';
export const RESET_CONSTRUCTOR:'RESET_CONSTRUCTOR'='RESET_CONSTRUCTOR';

export type TConstructorIngredientsState = {
    constructorIngredients:  Array<TItem> ,
    isBun: null,
};

export interface IMoveIngredient {
    readonly type: typeof MOVE_CONSTRUCTOR_INGREDIENTS;
    payload: { dragIndex: number; hoverIndex: number };
}
export interface IAddBunConstructorIngredients {
    readonly type: typeof ADD_CONSTRUCTOR_INGREDIENTS_BUN;
    ingredientItem:TItem;
}

export interface IAddConstructorIngredients{
    readonly type: typeof ADD_CONSTRUCTOR_INGREDIENTS;
    ingredientItem:TItem;
}

export interface IDeleteConstructorIngredients {
    readonly type: typeof DELETE_CONSTRUCTOR_INGREDIENTS;
    ingredientItemIndex: number;
}
export interface IResetConstructorIngredients {
    readonly type: typeof RESET_CONSTRUCTOR;
}
export type TConstructorIngredientsActions =
    | IMoveIngredient
    | IAddBunConstructorIngredients
    | IAddConstructorIngredients
    | IDeleteConstructorIngredients
    | IResetConstructorIngredients;