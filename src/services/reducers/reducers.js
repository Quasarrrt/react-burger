import { SET_ORDER_ERROR, GET_ORDER_REQUEST, GET_ORDER_SUCCESS} from "../actions/order";
import {ADD_VIEWED_INGREDIENT_DATA, REMOVE_VIEWED_INGREDIENT_DATA} from "../actions/viewedIngredient";
import {GET_INGREDIENTS_ERROR, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS} from "../actions/allIngredients";
import {MOVE_CONSTRUCTOR_INGREDIENTS, ADD_CONSTRUCTOR_INGREDIENTS,RESET_CONSTRUCTOR, DELETE_CONSTRUCTOR_INGREDIENTS, ADD_CONSTRUCTOR_INGREDIENTS_BUN} from "../actions/constructorIngredients";

const initialStateAllIngredients= {
    allIngredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
}
const initialStateConstructorIngredients={
   constructorIngredients:  [] ,
    isBun: null,
}
const initialStateViewedIngredient = {
    currentIngredient: {},
};
const initialStateOrder={
    order: {
        number: null,
    },
    orderRequest: false,
    orderFailed: false,
};

export const allIngredientsReducer = (state = initialStateAllIngredients, action) => {
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


export const constructorIngredientsReducer = (state = initialStateConstructorIngredients, action) => {
    switch (action.type) {
        case ADD_CONSTRUCTOR_INGREDIENTS_BUN: {
                return {
                        ...state,
                        isBun: action.item,
                    };
        }
        case  ADD_CONSTRUCTOR_INGREDIENTS: {
            return {
                ...state,
                constructorIngredients: [...state.constructorIngredients, action.item],
            };
        }
        case DELETE_CONSTRUCTOR_INGREDIENTS: {
                return {
                    ...state,
                    constructorIngredients: state.constructorIngredients.filter((elem, i) => i !== action.index),
                }
        }
        case MOVE_CONSTRUCTOR_INGREDIENTS: {
            const { dragIndex, hoverIndex } = action.payload;
            const arr = [...state.constructorIngredients];
            const dragEl = arr[dragIndex];
            const hoverEl = arr[hoverIndex];
            arr[hoverIndex] = dragEl;
            arr[dragIndex] = hoverEl;
            return {
                ...state,
                constructorIngredients: arr,
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


export const viewedIngredientReducer = (state = initialStateViewedIngredient, action) => {
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


export const orderReducer = (state = initialStateOrder, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
                orderFailed: false,
                order: {
                    ...state.order,
                   number: initialStateOrder.order.number,
                },

            };
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                orderFailed: false,
                order: {
                    ...state.order,
                    number: action.number,
                },
                orderRequest: false,
            };
        }
        case SET_ORDER_ERROR: {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false,
                order: {
                    ...state.order,
                   number: initialStateOrder.order.number,
                },
            };
        }
        default: {
            return state;
        }
    }
}

