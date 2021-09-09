import { GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, SET_ORDER_ERROR} from "../actions/order";
import {ADD_VIEWED_INGREDIENT_DATA, REMOVE_VIEWED_INGREDIENT_DATA} from "../actions/viewedIngredient";
import {GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS} from "../actions/allIngredients";
import {MOVE_CONSTRUCTOR_INGREDIENTS, ADD_CONSTRUCTOR_INGREDIENTS, DELETE_CONSTRUCTOR_INGREDIENTS} from "../actions/constructorIngredients";

const initialStateAllIngredients= {
    allIngredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
}
const initialStateConstructorIngredients={
   constructorIngredients: [],
    isBun: {},
    total: 0,
}
const initialStateViewedIngredient = {
    currentIngredient: {},
};
const initialStateOrder={
    order: {},
    number: {},
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
                allIngredients: action.items,
                ingredientsRequest: false,
            };
        }
        case GET_INGREDIENTS_FAILED: {
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
        case ADD_CONSTRUCTOR_INGREDIENTS: {
            if (action.payload.type === 'bun') {
                return {
                        ...state,
                        isBun: action.payload,
                    };
                }
            return {
                ...state,
                constructorIngredients: [...state.constructorIngredients, {...action.payload, uniqueId: action.uniqueId}]
                };
        }
        case DELETE_CONSTRUCTOR_INGREDIENTS: {
                return {
                    ...state,
                    constructorIngredients: [...state.constructorIngredients].filter((item) => item.uniqueId !== action.uniqueId)
                }
        }
        case MOVE_CONSTRUCTOR_INGREDIENTS: {
            const {dragIndex, hoverIndex} = action.payload;
            const ingredients = [...state.constructorIngredients];
            ingredients.splice(dragIndex, 0, ingredients.splice(hoverIndex, 1)[0]);
            return {
                ...state,
                constructorIngredients: ingredients,
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
            };
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                orderFailed: false,
                order: action.payload,
                number: action.payload.order.number,
                orderRequest: false,
            };
        }
        case GET_ORDER_FAILED: {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false,
            };
        }
        case SET_ORDER_ERROR: {
            return {
                ...state,
                orderFailed: false,
                orderRequest: false,
                order: null,
            };
        }
        default: {
            return state;
        }
    }
}

