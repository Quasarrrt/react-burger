import {orderDetailsReducer} from './orderDetails'
import {CLEAR_ORDER_DETAILS, SET_ORDER_DETAILS} from "../types/orderDetails";

const testOrderDetailsInitialState = {
    orderDetails: null,
};

const testOrder = {
    name: 'Флюоресцентный space бургер',
};

describe('orderDetailsReducer', () => {
    it('should return the initial state', () => {
        expect(orderDetailsReducer(undefined, {})).toEqual(testOrderDetailsInitialState);
    });

    it('should handle SET_ORDER_DETAILS', () => {
        expect(
            orderDetailsReducer(testOrderDetailsInitialState, {
                type: SET_ORDER_DETAILS,
                order: testOrder,
            }),
        ).toEqual(
            expect.objectContaining({
                orderDetails: testOrder,
            }),
        );
    });

    it('should handle CLEAR_ORDER_DETAILS', () => {
        expect(
            orderDetailsReducer(testOrderDetailsInitialState, {
                type: CLEAR_ORDER_DETAILS,
            }),
        ).toEqual(
            expect.objectContaining({
                orderDetails: null,
            }),
        );
    });
});