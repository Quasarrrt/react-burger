import React from 'react';
import {useEffect, useState} from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import mainStyles from "./App.module.css"
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import {useDispatch} from "react-redux";
import {getIngredients} from "../../services/actions/allIngredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


function App() {

    const [isOpen, setIsOpen] = useState(false)
    const handleOpenIngredientModal = () => {
        setIsOpen(true);

    }
    const handleCloseModal = () => {
        setIsOpen(false);
    }
    const dispatch=useDispatch();
    useEffect(
        () => {
            dispatch( getIngredients());
        },
        [dispatch]
    );



        return (
        <>
            <AppHeader/>
            <main className={mainStyles.main}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients onCardClick={handleOpenIngredientModal} />
                    <BurgerConstructor/>
                </DndProvider>
                <Modal open={isOpen} onClose={handleCloseModal}  title={ "Детали ингредиента"} >
                     <IngredientDetails/>
                </Modal>

            </main>

        </>


    );
}

export default App;
