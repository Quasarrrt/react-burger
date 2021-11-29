import {viewedIngredientReducer} from "./viewedIngredient"
import {ADD_VIEWED_INGREDIENT_DATA, REMOVE_VIEWED_INGREDIENT_DATA} from "../types/viewedIngredient";

const testViewedIngredientInitialState = {
    currentIngredient: {},
};

const testViewedIngredient = {
    name: 'Краторная булка N-200i',
    type: 'bun',
}


describe('viewedIngredientReducer', () => {
    it('should return the initial state', () => {
        expect(viewedIngredientReducer(undefined, {})).toEqual(testViewedIngredientInitialState);
    });

    it('should handle ADD_VIEWED_INGREDIENT_DATA', () => {
        expect(
            viewedIngredientReducer(testViewedIngredientInitialState, {
                type: ADD_VIEWED_INGREDIENT_DATA,
                payload: testViewedIngredient,

            }),
        ).toEqual(
            expect.objectContaining({
                currentIngredient: testViewedIngredient,
            }),
        );
    });

    it('should handle  REMOVE_VIEWED_INGREDIENT_DATA', () => {
        expect(
            viewedIngredientReducer(testViewedIngredientInitialState, {
                type:  REMOVE_VIEWED_INGREDIENT_DATA,

            }),
        ).toEqual(
            expect.objectContaining({
                currentIngredient: {},
            }),
        );
    });


});