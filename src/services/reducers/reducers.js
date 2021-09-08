import { GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, SET_ORDER_ERROR} from "../actions/order";
import {ADD_VIEWED_INGREDIENT_DATA, REMOVE_VIEWED_INGREDIENT_DATA} from "../actions/viewedIngredient";
import {GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS} from "../actions/allIngredients";

const initialStateAllIngredients= {
    allIngredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
}
const initialStateConstructorIngredients={
   constructorIngredients: [],
    isBun: null,
}
const initialStateViewedIngredient = {
    currentIngredient: {},
};
const initialStateOrder={
    order: {},
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
                ingredients: action.payload,
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


{/*export const constructorIngredientsReducer = (state = initialStateConstructorIngredients, action) => {

}*/}


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

