import React from 'react';
import {useEffect, useState} from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import mainStyles from "./App.module.css"
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {OrderInfoPage} from "../../pages/order-info";
import OrderFeedPage from "../../pages/feed";
import {useDispatch} from "react-redux";
import {getIngredients} from "../../services/actions/allIngredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, Switch, useHistory, useLocation} from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ForgotPasswordPage from "../../pages/forgot-password";
import ResetPasswordPage from "../../pages/reset-password";
import LoginPage from "../../pages/login";
import ProfilePage from "../../pages/profile";
import IngredientDetailsPage from "../../pages/ingredient-details"
import {ProfileOrdersPage} from "../../pages/profile-orders";
import RegisterPage from "../../pages/register";
import {TLocationState} from "../../services/types/otherTypes"
import {TOrder} from "../../services/types/ws";
import {setOrderDetails} from "../../services/actions/orderDetails";
import OrderInfo from "../OrderInfo/OrderInfo";
import {useSelector} from "../../services/hooks";
//import {getOrdersData} from "../../services/actions/ordersData";
import {ProfileOrderPage} from "../../pages/profile-order";
function App() {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleOpenIngredientModal = () => {
        setIsOpen(true);
    }



    const dispatch=useDispatch();
    useEffect(
        () => {
            dispatch( getIngredients());
        },
        [dispatch]
    );

    const history = useHistory();

    let location = useLocation<TLocationState>();
    let action=(history.action === 'PUSH' || history.action === 'REPLACE');
    let background = action && location.state && location.state.background;
    let backgroundOrders =action && location.state && location.state.backgroundOrders;

    const { orderDetails } = useSelector((state) => state.orderDetails);
    const handleCardOrderClick = (order: TOrder) => {
        dispatch(setOrderDetails(order));
        setIsOpen(true);
    };

    /*React.useEffect(() => {
        dispatch(getOrdersData());
    }, [dispatch]);*/

    const handleCloseModal = React.useCallback(
        (isGoBack) => {

            setIsOpen(false);
            if (isGoBack) {
                history.goBack();
            }
        },
        [history],
    );



        return (
            <>
            <AppHeader/>
    <Switch location={background || location|| backgroundOrders}>
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
        <Route path="/feed" exact={true}>
            <OrderFeedPage onCardOrderClick={handleCardOrderClick} />
        </Route>
        <Route path="/feed/:id" exact={true}>
            <OrderInfoPage />
        </Route>
        <ProtectedRoute path="/profile/orders" exact={true}>
            <ProfileOrdersPage  onCardOrderClick={handleCardOrderClick}  />
        </ProtectedRoute>
        <Route path="/profile/orders/:id" exact={true}>
            <ProfileOrderPage />
        </Route>
        <Route path="/ingredients/:id" exact={true}>
            <IngredientDetailsPage />
        </Route>
    </Switch>

                {background && (

                    <Modal open={isOpen} onClose={handleCloseModal}  title={ "Детали ингредиента"} isGoBack={true}>
                        <IngredientDetails/>
                    </Modal>


                )}
                {backgroundOrders&&  (

                            <Modal open={isOpen} onClose={handleCloseModal} title=""  isGoBack={true}>
                                <OrderInfo ordersData={null} orderDetailsData={orderDetails} id="" />
                            </Modal>
                )}

            </>
    );
}

export default App;
