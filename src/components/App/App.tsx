import React from 'react';
import {useEffect, useState} from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import mainStyles from "./App.module.css"
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import {useDispatch, useSelector} from "react-redux";
import {getIndgredients} from "../../services/actions/allIngredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {getOrderNum} from "../../services/actions/order";

function App() {

    /*const [state, setState] = React.useState( {
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
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .then(data =>{

                setState({ ...state, data: data.data, isLoading: false })
            } )
            .catch(e => {
                setState({ ...state, hasError: true, isLoading: false });
                console.log(e)
            });
    };*/
    const [cardInModal, setCardInModal]=useState({})
    const [isOpen, setIsOpen] = useState(false)
    const handleOpenIngredientModal = () => {
        setIsOpen(true);

    }
    const [isOrderModal, setIsOrderModal ]=useState(false)
    const handleOpenOrder = () => {
        setIsOrderModal(true);
        setIsOpen(true);
    }
    const handleCloseModal = () => {
        setIsOpen(false);
        setIsOrderModal(false);
    }
    const dispatch=useDispatch();
    useEffect(
        () => {
            dispatch(getIndgredients());
        },
        [dispatch]
    );


    return (
        <>
            <AppHeader/>
            <main className={mainStyles.main}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients onCardClick={handleOpenIngredientModal} />
                    <BurgerConstructor onOrderClick={handleOpenOrder}/>
                </DndProvider>
                <Modal open={isOpen} onClose={handleCloseModal}  title={isOrderModal ? "" : "Детали ингредиента"} >
                    {isOrderModal ? <OrderDetails/> : <IngredientDetails/> }
                </Modal>

            </main>

        </>


    );
}

export default App;
