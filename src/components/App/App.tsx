import React from 'react';
import {useEffect} from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import mainStyles from "./App.module.css"


function App() {
    const api="https://norma.nomoreparties.space/api/ingredients"

    const [state, setState] = React.useState( {
        isLoading: false,
        hasError: false,
        data: []

    });

    useEffect(()=>{
        getMenu();
    },[])

    const getMenu = () => {
        setState({ ...state, hasError: false, isLoading: true });
        fetch(api)
            .then(res => res.json())
            .then(data =>{

                setState({ ...state, data: data.data, isLoading: false })
            } )
            .catch(e => {
                setState({ ...state, hasError: true, isLoading: false });
                console.log(e)
            });
    };

    return (
        <>
            <AppHeader/>
            <main className={mainStyles.main}>
                <BurgerIngredients data={state.data} />
                <BurgerConstructor items={state.data} isLoading={state.isLoading}/>
            </main>
        </>


    );
}

export default App;
