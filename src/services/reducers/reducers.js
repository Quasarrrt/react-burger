

const initialStateAllIngredients= {
    allIngredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
}
const initialStateConstructorIngredients={
   constructorIngredients: [],
    isBun: null,
}
const initialStateViewedIngredient = {
    currentIngredient: {},
};
const initialStateOrder={
    order: {},
    orderRequest: false,
    orderFailed: false,
};

export const allIngredientsReducer = (state = initialStateAllIngredients, action) => {

}
export const constructorIngredientsReducer = (state = initialStateConstructorIngredients, action) => {

}
export const viewedIngredientReducer = (state = initialStateViewedIngredient, action) => {

}
export const orderReducer = (state = initialStateOrder, action) => {

}