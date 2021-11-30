import {ordersDataReducer} from "./ordersData";
import {
    GET_ORDERS_DATA_REQUEST,
    GET_ORDERS_DATA_SUCCESS,
    GET_ORDERS_DATA_ERROR,
} from '../types/ordersData';

const testOrdersDataInitialState = {
    ordersData: null,
    ordersDataRequest: false,
    ordersDataError: false,
};

const testOrders = [
    {
        name: 'Люминесцентный краторный бургер',
    },
    {
        name: 'Метеоритный краторный бургер',
    },
]


describe('ordersDataReducer', () => {
    it('should return the initial state', () => {
        expect(ordersDataReducer(undefined, {})).toEqual(testOrdersDataInitialState);
    });

    it('should handle GET_ORDERS_DATA_REQUEST', () => {
        expect(
            ordersDataReducer(testOrdersDataInitialState, {
                type: GET_ORDERS_DATA_REQUEST,

            }),
        ).toEqual(
            expect.objectContaining({
                ordersDataRequest: true,
                ordersDataError: false,
            }),
        );
    });

    it('should handle  GET_ORDERS_DATA_SUCCESS', () => {
        expect(
            ordersDataReducer(testOrdersDataInitialState, {
                type:  GET_ORDERS_DATA_SUCCESS,
                ordersData: testOrders,
            }),
        ).toEqual(
            expect.objectContaining({
                ordersData: testOrders,
                ordersDataRequest: false,
            }),
        );
    });

    it('should handle GET_ORDERS_DATA_ERROR', () => {
        expect(
            ordersDataReducer(testOrdersDataInitialState, {
                type:  GET_ORDERS_DATA_ERROR,
            }),
        ).toEqual(
            expect.objectContaining({
                ordersDataRequest: false,
                ordersDataError: true,
            }),
        );
    });
});