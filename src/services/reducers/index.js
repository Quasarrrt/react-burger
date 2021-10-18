import {allIngredientsReducer, constructorIngredientsReducer, viewedIngredientReducer, orderReducer} from "./reducers";
import { combineReducers } from 'redux';
import {authReducer} from "./auth";
const rootReducer = combineReducers({
    allIngredients: allIngredientsReducer,
    constructorIngredients: constructorIngredientsReducer,
    viewedIngredient: viewedIngredientReducer,
    order: orderReducer,
    auth: authReducer,
});

export default rootReducer;