import {allIngredientsReducer} from "./alllIngredients";
import {constructorIngredientsReducer} from "./contructorIngredients";
import {viewedIngredientReducer} from "./viewedIngredient";
import {orderReducer} from "./order";
import { combineReducers } from 'redux';
import {authReducer} from "./auth";
import {webSocketReducer} from "./ws";
import {ordersDataReducer} from "./ordersData";
import {userOrdersDataReducer} from "./userOrdersData";
import {orderDetailsReducer} from "./orderDetails";

export const rootReducer = combineReducers({
    allIngredients: allIngredientsReducer,
    constructorIngredients: constructorIngredientsReducer,
    viewedIngredient: viewedIngredientReducer,
    order: orderReducer,
    auth: authReducer,
    webSocket: webSocketReducer,
    ordersData: ordersDataReducer,
    userOrdersData: userOrdersDataReducer,
    orderDetails: orderDetailsReducer,
});
