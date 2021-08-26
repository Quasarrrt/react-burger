import React from 'react';
import {useEffect, useState} from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import mainStyles from "./App.module.css"
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

function App() {
    const api="https://norma.nomoreparties.space/api/ingredients"

    const [state, setState] = React.useState( {
        isLoading: false,
        hasError: false,
        data: []

    });
    const [isOpen, setIsOpen] = useState(false)

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
    const [cardInModal, setCardInModal]=useState({})
    const handleOpenModal=(card:any)=>{
        setIsOpen(true);
        setCardInModal(card);
    }

    return (
        <>
            <AppHeader/>
            <main className={mainStyles.main}>
                <BurgerIngredients data={state.data}  onIngredientClick={handleOpenModal}/>
                <BurgerConstructor items={state.data} isLoading={state.isLoading} onClick={() => setIsOpen(true)}/>
                <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                    <IngredientDetails card={cardInModal}/>
                </Modal>
            </main>

        </>


    );
}

export default App;
