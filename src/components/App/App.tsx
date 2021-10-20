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
import ForgotPasswordPage from "../../pages/forgot-password";
import ResetPasswordPage from "../../pages/reset-password";
import LoginPage from "../../pages/login";
import ProfileOrderPage from "../../pages/profile-order";
import ProfilePage from "../../pages/profile";
import IngredientDetailsPage from "../../pages/ingredient-details"
import ProfileOrdersPage from "../../pages/profile-orders";
import RegisterPage from "../../pages/register";
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
            <main className={mainStyles.main}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients onCardClick={handleOpenIngredientModal} />
                <BurgerConstructor history={history}/>
            </DndProvider>
            </main>
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

                {background && (
                    <Modal open={isOpen} onClose={handleCloseModal}  title={ "Детали ингредиента"} >
                        <IngredientDetails/>
                    </Modal>
                )}
            </>
    );
}

export default App;
