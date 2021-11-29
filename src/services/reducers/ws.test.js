import {webSocketReducer} from "./ws";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_ORDERS} from "../types/ws";

const testWSInitialState = {
    wsConnected: false,
    ordersData: null,
    error: '',
};

const testOrders = [
    {
        name: 'Люминесцентный краторный бургер',
    },
    {
        name: 'Метеоритный краторный бургер',
    },
]
const testError='Error';


describe('webSocketReducer', () => {
    it('should return the initial state', () => {
        expect(webSocketReducer(undefined, {})).toEqual(testWSInitialState);
    });

    it('should handle WS_CONNECTION_SUCCESS', () => {
        expect(
            webSocketReducer(testWSInitialState, {
                type: WS_CONNECTION_SUCCESS,

            }),
        ).toEqual(
            expect.objectContaining({
                wsConnected: true,
                error: null,
            }),
        );
    });

    it('should handle  WS_CONNECTION_ERROR', () => {
        expect(
            webSocketReducer(testWSInitialState, {
                type:  WS_CONNECTION_ERROR,
                payload: testError,
            }),
        ).toEqual(
            expect.objectContaining({
                error:testError,
                wsConnected: false,
            }),
        );
    });

    it('should handle WS_CONNECTION_CLOSED', () => {
        expect(
            webSocketReducer(testWSInitialState, {
                type:  WS_CONNECTION_CLOSED,
            }),
        ).toEqual(
            expect.objectContaining({
                wsConnected: false,
                error: null,
            }),
        );
    });
    it('should handle WS_GET_ORDERS', () => {
        expect(
            webSocketReducer(testWSInitialState, {
                type:  WS_GET_ORDERS,
                payload: testOrders,
            }),
        ).toEqual(
            expect.objectContaining({
                ordersData: testOrders,
                error: null,
            }),
        );
    });
});