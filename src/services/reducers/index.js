import {allIngredientsReducer, constructorIngredientsReducer, viewedIngredientReducer, orderReducer} from "./reducers";
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    allIngredients: allIngredientsReducer,
    constructorIngredients: constructorIngredientsReducer,
    viewedIngredient: viewedIngredientReducer,
    order: orderReducer,
});

export default rootReducer;