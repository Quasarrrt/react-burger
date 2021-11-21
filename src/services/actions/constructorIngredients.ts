import {
    ADD_CONSTRUCTOR_INGREDIENTS,
    ADD_CONSTRUCTOR_INGREDIENTS_BUN,
    DELETE_CONSTRUCTOR_INGREDIENTS,
    IAddBunConstructorIngredients,
    IAddConstructorIngredients,
    IDeleteConstructorIngredients,
    IMoveIngredient,
    MOVE_CONSTRUCTOR_INGREDIENTS
} from "../types/contructorIngredients";
import {TItem} from "../types/otherTypes";
import { v4 as uuidv4 } from 'uuid';

export const addBunConstructorIngredients = (ingredientItem: TItem): IAddBunConstructorIngredients => {
    return {
        type: ADD_CONSTRUCTOR_INGREDIENTS_BUN,
        ingredientItem: ingredientItem,
    };
};

export const addConstructorIngredients = (ingredientItem: TItem): IAddConstructorIngredients => {
    return {
        type: ADD_CONSTRUCTOR_INGREDIENTS,
        ingredientItem: { ...ingredientItem, key: uuidv4() },
    };
};

export const deleteConstructorIngredients = ( ingredientItemIndex: number): IDeleteConstructorIngredients => {
    return {
        type: DELETE_CONSTRUCTOR_INGREDIENTS,
        ingredientItemIndex: ingredientItemIndex,
    };
};


export const moveIngredient = ({dragIndex, hoverIndex,}: { dragIndex: number; hoverIndex: number; }): IMoveIngredient => {
    return {
        type:MOVE_CONSTRUCTOR_INGREDIENTS,
        payload: { dragIndex, hoverIndex },
    };
};