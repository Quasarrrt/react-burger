import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {socketMiddleware} from './middlewares/socketMiddleware';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {rootReducer} from "./reducers";
import {
    TWSActions,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS, WS_GET_ORDERS, WS_SEND_MESSAGE
} from "./types/ws";
import {TOrderActions} from "./types/order";
import {TConstructorIngredientsActions} from "./types/contructorIngredients";
import {TAuthActions} from "./types/auth";
import {TOrderDetailsActions} from "./types/orderDetails";
import {TOrdersDataActions} from "./types/ordersData";
import {TUserOrdersDataActions} from "./types/userOrdersData";
import {TViewedIngredientActions} from "./types/viewedIngredient";
import {TGetAllIngredientsActions} from "./types/allIngredients";
export const wsActions = {
    wsStart: WS_CONNECTION_START,
    wsSendMessage: WS_SEND_MESSAGE,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    wsGetOrders: WS_GET_ORDERS,
};

export type TAppActions =
    | TGetAllIngredientsActions
    | TViewedIngredientActions
    | TUserOrdersDataActions
    | TOrdersDataActions
    | TOrderDetailsActions
    | TAuthActions
    | TConstructorIngredientsActions
    | TOrderActions
    | TWSActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
    ThunkAction<ReturnType, Action, RootState, TAppActions>
    >;

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk), applyMiddleware(socketMiddleware()));

export const store = createStore(rootReducer, enhancer);