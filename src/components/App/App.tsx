import React from 'react';
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import {data} from "../../utils/data";
import mainStyles from "./App.module.css"
function App() {
    return (
        <>
            <AppHeader/>
            <main className={mainStyles.main}>
                <BurgerIngredients data={data}/>
                <BurgerConstructor items={data}/>
            </main>
        </>


    );
}

export default App;
