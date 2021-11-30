import {orderReducer} from './order'
import {GET_ORDER_REQUEST, GET_ORDER_SUCCESS, SET_ORDER_ERROR} from "../types/order"

const testOrderInitialState = {
    orderNumber: "....",
    orderRequest: false,
    orderFailed: false,
};

const testOrderNumber = "6361";

describe('orderReducer', () => {
    it('should return the initial state', () => {
        expect(orderReducer(undefined, {})).toEqual(testOrderInitialState);
    });

    it('should handle GET_ORDER_REQUEST', () => {
        expect(
            orderReducer(testOrderInitialState, {
                type: GET_ORDER_REQUEST,

            }),
        ).toEqual(
            expect.objectContaining({
                orderRequest: true,
                orderFailed: false,
            }),
        );
    });

    it('should handle  GET_ORDER_SUCCESS', () => {
        expect(
            orderReducer(testOrderInitialState, {
                type:  GET_ORDER_SUCCESS,
                orderNumber: testOrderNumber,
            }),
        ).toEqual(
            expect.objectContaining({
                orderNumber: testOrderNumber,
                orderRequest: false,
            }),
        );
    });

    it('should handle SET_ORDER_ERROR', () => {
        expect(
            orderReducer(testOrderInitialState, {
                type:  SET_ORDER_ERROR,
            }),
        ).toEqual(
            expect.objectContaining({
                orderFailed: true,
                orderRequest: false,
            }),
        );
    });
});