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
import {Router, Route, Switch, useHistory, useLocation} from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {ForgotPasswordPage,ProfileOrdersPage,ProfileOrderPage, IngredientDetailsPage, LoginPage,ProfilePage, RegisterPage, ResetPasswordPage} from '../../pages'
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
    const history = useHistory();
    const action = history.action === 'PUSH' || history.action === 'REPLACE';

    let location = useLocation();
    // @ts-ignore
    let background = action && location.state && location.state.background;

        return (
            <>
            <AppHeader/>
    <Switch location={background || location}>
        <Route path="/" exact={true}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients onCardClick={handleOpenIngredientModal} />
                <BurgerConstructor/>
            </DndProvider>
        </Route>
        <Route path="/login" exact={true}>
            <LoginPage />
        </Route>
        <Route path="/register" exact={true}>
            <RegisterPage />
        </Route>
        <Route path="/forgot-password" exact={true}>
            <ForgotPasswordPage />
        </Route>
        <Route path="/reset-password" exact={true}>
            <ResetPasswordPage />
        </Route>
        <ProtectedRoute path="/profile" exact={true}>
            <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact={true}>
            <ProfileOrdersPage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:id" exact={true}>
            <ProfileOrderPage />
        </ProtectedRoute>
        <Route path="/ingredients/:id" exact={true}>
            <IngredientDetailsPage />
        </Route>
    </Switch>
                {isOrderDetailsModalContent && (
                    <Modal onClose={closeAllModals} modalHeader={modalHeader} isGoBack={false}>
                        <OrderDetails onClose={closeAllModals} />
                    </Modal>
                )}

                {background && (
                    <Modal onClose={closeAllModals} modalHeader={modalHeader} isGoBack={true}>
                        <InrgedientDetails ingredientDetails={ingredientDetails} />
                    </Modal>
                )}
            </>
    );
}

export default App;
