import {constructorIngredientsReducer} from "./contructorIngredients";
import {
    ADD_CONSTRUCTOR_INGREDIENTS,
    ADD_CONSTRUCTOR_INGREDIENTS_BUN,
    DELETE_CONSTRUCTOR_INGREDIENTS,
    MOVE_CONSTRUCTOR_INGREDIENTS,
    RESET_CONSTRUCTOR,
} from "../types/contructorIngredients";


const testConstructorIngredientsInitialState = {
    constructorIngredients:  [] ,
    isBun: null,
};
const testBun = {
    name: 'Краторная булка N-200i',
};

const testConstructorIngredients = [
    {
        name: 'Говяжий метеорит (отбивная)'
    },
    {
        name: 'Соус Spicy-X'

    }
]

const testFullConstructorIngredients={

    constructorIngredients:
        [
            {
                name: 'Говяжий метеорит (отбивная)'
            },
            {
                name: 'Соус Spicy-X'

            }
        ],
    isBun:{
        name: 'Краторная булка N-200i',
    },
}

const testIngredientItemIndex =0;
const testDragIndex = 1;
const testHoverIndex = 0;

describe('constructorIngredientsReducer', () => {
    it('should return the initial state', () => {
        expect(constructorIngredientsReducer(undefined, {})).toEqual(testConstructorIngredientsInitialState);
    });

    it('should handle  ADD_CONSTRUCTOR_INGREDIENTS', () => {
        expect(
            constructorIngredientsReducer(testConstructorIngredientsInitialState, {
                type:  ADD_CONSTRUCTOR_INGREDIENTS,
                ingredientItem:  testConstructorIngredients,

            }),
        ).toEqual(
            expect.objectContaining({
                constructorIngredients: [
                    ...testConstructorIngredientsInitialState.constructorIngredients,
                    testConstructorIngredients,
                ],
            }),
        );
    });

    it('should handle  ADD_CONSTRUCTOR_INGREDIENTS_BUN', () => {
        expect(
            constructorIngredientsReducer(testConstructorIngredientsInitialState, {
                type:  ADD_CONSTRUCTOR_INGREDIENTS_BUN,
                ingredientItem: testBun,
            }),
        ).toEqual(
            expect.objectContaining({
                isBun: testBun,
            }),
        );
    });

    it('should handle DELETE_CONSTRUCTOR_INGREDIENTS', () => {
        expect(
            constructorIngredientsReducer(testFullConstructorIngredients, {
                type:  DELETE_CONSTRUCTOR_INGREDIENTS,
                ingredientItemIndex: testIngredientItemIndex,

            }),
        ).toEqual(
            expect.objectContaining({
                constructorIngredients:
                    [

                        {
                            name: 'Соус Spicy-X'

                        }
                    ],
                isBun:{
                    name: 'Краторная булка N-200i',
                },
            }),
        );
    });

    it('should handle MOVE_CONSTRUCTOR_INGREDIENTS', () => {
        expect(
            constructorIngredientsReducer(testFullConstructorIngredients, {
                type:  MOVE_CONSTRUCTOR_INGREDIENTS,
                payload: { dragIndex: testDragIndex, hoverIndex: testHoverIndex },
            }),
        ).toEqual(
            expect.objectContaining({
                constructorIngredients:
                    [
                        {
                            name: 'Соус Spicy-X'

                        },
                        {
                            name: 'Говяжий метеорит (отбивная)'
                        },

                    ],
                isBun:{
                    name: 'Краторная булка N-200i',
                },
            }),
        );
    });

    it('should handle RESET_CONSTRUCTOR', () => {
        expect(
            constructorIngredientsReducer(testConstructorIngredientsInitialState, {
                type: RESET_CONSTRUCTOR,
            }),
        ).toEqual(
            expect.objectContaining({
                constructorIngredients:  [] ,
                isBun: null,
            }),
        );
    });
});