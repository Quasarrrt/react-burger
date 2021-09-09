const api = 'https://norma.nomoreparties.space/api';
const headers= {'Content-Type': 'application/json'};
export const ingredientsRequest = async () => {
    return await fetch(`${api}/ingredients`)
};
export const orderRequest = async (idOrderIngredients) => {
    return await fetch(`${api}/orders`,{
        method: 'POST',
        headers,
        body: JSON.stringify({ ingredients: idOrderIngredients })
    });
};