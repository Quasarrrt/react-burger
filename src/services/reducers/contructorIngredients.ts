import {
    ADD_CONSTRUCTOR_INGREDIENTS,
    ADD_CONSTRUCTOR_INGREDIENTS_BUN,
    DELETE_CONSTRUCTOR_INGREDIENTS,
    MOVE_CONSTRUCTOR_INGREDIENTS,
    RESET_CONSTRUCTOR,
    TConstructorIngredientsActions,
    TConstructorIngredientsState
} from "../types/contructorIngredients";


export const initialStateConstructorIngredients: TConstructorIngredientsState={
    constructorIngredients:  [] ,
    isBun: null,
}

export const constructorIngredientsReducer = (state = initialStateConstructorIngredients, action:TConstructorIngredientsActions)=> {
    switch (action.type) {
        case ADD_CONSTRUCTOR_INGREDIENTS_BUN: {
            return {
                ...state,
                isBun: action.ingredientItem,
            };
        }
        case  ADD_CONSTRUCTOR_INGREDIENTS: {
            return {
                ...state,
                constructorIngredients: [...state.constructorIngredients, action.ingredientItem],
            };
        }
        case DELETE_CONSTRUCTOR_INGREDIENTS: {
            return {
                ...state,
                constructorIngredients: state.constructorIngredients.filter((elem, i) => i !== action.ingredientItemIndex),
            }
        }
        case MOVE_CONSTRUCTOR_INGREDIENTS: {
            const { dragIndex, hoverIndex } = action.payload;
            const constructorIngredients = [...state.constructorIngredients];
            constructorIngredients[dragIndex] = constructorIngredients.splice(hoverIndex, 1, constructorIngredients[dragIndex])[0];
            return {
                ...state,
                constructorIngredients,
            };
        }
        case RESET_CONSTRUCTOR: {
            return {
                ...state,
                constructorIngredients: initialStateConstructorIngredients.constructorIngredients,
                isBun: initialStateConstructorIngredients.isBun,
            };
        }

        default: {
            return {
                ...state,
            };
        }
    }
}