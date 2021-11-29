import {allIngredientsReducer} from "./alllIngredients";
import {
    GET_INGREDIENTS_ERROR,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
} from "../types/allIngredients";
const testAllIngredientsInitialState = {
    allIngredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
};

const testAllIngredients = [
    {
        _id: '60666c42cc7b410027a1a9b5',
        name: 'Говяжий метеорит (отбивная)',
        type: 'main',
        proteins: 800,
        fat: 800,
        carbohydrates: 300,
        calories: 2674,
        price: 3000,
        image: 'https://code.s3.yandex.net/react/code/meat-04.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
        __v: 0,
    },
    {
        _id: '60666c42cc7b410027a1a9b6',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0,
    },
]


describe('allIngredientsReducer', () => {
    it('should return the initial state', () => {
        expect(allIngredientsReducer(undefined, {})).toEqual(testAllIngredientsInitialState);
    });

    it('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(
            allIngredientsReducer(testAllIngredientsInitialState, {
                type: GET_INGREDIENTS_REQUEST,

            }),
        ).toEqual(
            expect.objectContaining({
                ingredientsRequest: true,
            }),
        );
    });

    it('should handle  GET_INGREDIENTS_SUCCESS', () => {
        expect(
            allIngredientsReducer(testAllIngredientsInitialState, {
                type:   GET_INGREDIENTS_SUCCESS,
                allIngredients: testAllIngredients,
            }),
        ).toEqual(
            expect.objectContaining({
                allIngredients: testAllIngredients,
                ingredientsFailed: false,
                ingredientsRequest: false,
            }),
        );
    });

    it('should handle GET_INGREDIENTS_ERROR', () => {
        expect(
            allIngredientsReducer(testAllIngredientsInitialState, {
                type:  GET_INGREDIENTS_ERROR,
            }),
        ).toEqual(
            expect.objectContaining({
                ingredientsFailed: true,
                ingredientsRequest: false
            }),
        );
    });
});