import {userOrdersDataReducer} from "./userOrdersData";
import {
    GET_USER_ORDERS_DATA_REQUEST,
    GET_USER_ORDERS_DATA_SUCCESS,
    GET_USER_ORDERS_DATA_ERROR,
} from '../types/userOrdersData';

const testUserOrdersDataInitialState = {
    userOrdersData: null,
    userOrdersDataRequest: false,
    userOrdersDataError: false,
};

const testUserOrders = [
    {
        name: 'Люминесцентный краторный бургер',
    },
    {
        name: 'Метеоритный краторный бургер',
    },
]


describe('userOrdersDataReducer', () => {
    it('should return the initial state', () => {
        expect(userOrdersDataReducer(undefined, {})).toEqual(testUserOrdersDataInitialState);
    });

    it('should handle GET_USER_ORDERS_DATA_REQUEST', () => {
        expect(
            userOrdersDataReducer(testUserOrdersDataInitialState, {
                type:  GET_USER_ORDERS_DATA_REQUEST,

            }),
        ).toEqual(
            expect.objectContaining({
                userOrdersDataRequest: true,
                userOrdersDataError: false,
            }),
        );
    });

    it('should handle  GET_USER_ORDERS_DATA_SUCCESS', () => {
        expect(
            userOrdersDataReducer(testUserOrdersDataInitialState, {
                type:  GET_USER_ORDERS_DATA_SUCCESS,
                userOrdersData: testUserOrders,
            }),
        ).toEqual(
            expect.objectContaining({
                userOrdersData: testUserOrders,
                userOrdersDataRequest: false,
            }),
        );
    });

    it('should handle GET_USER_ORDERS_DATA_ERROR', () => {
        expect(
            userOrdersDataReducer(testUserOrdersDataInitialState, {
                type:  GET_USER_ORDERS_DATA_ERROR,
            }),
        ).toEqual(
            expect.objectContaining({
                userOrdersDataRequest: false,
                userOrdersDataError: true,
            }),
        );
    });
});