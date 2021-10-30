import React, {useState} from 'react';
import {  CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from './BurgerConstructor.module.css';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux";
import { RESET_CONSTRUCTOR} from "../../services/actions/constructorIngredients";
import {getOrderNum, SET_ORDER_ERROR} from "../../services/actions/order";
import BurgerConstructorItems from "../BurgerConstructorItems/BurgerConstructorItems";
import {useMemo} from "react";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import {getRefreshTokenFromCookie} from "../../services/cookieFunctions";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";


const BurgerConstructor = ({history}) => {
    const { loginSuccess } = useSelector((state) => state.auth);
    const isRefreshToken = getRefreshTokenFromCookie();
    const dispatch=useDispatch();
    const { constructorIngredients, isBun } = useSelector((state) => ({
        constructorIngredients: state.constructorIngredients.constructorIngredients,
        isBun: state.constructorIngredients.isBun,

    }));

    const [isOpen, setIsOpen] = useState(false)

    const handleCloseModal = () => {
        setIsOpen(false);
    }
    const orderSend=()=>{
        if (loginSuccess || isRefreshToken) {
            if(isBun!==null){
                if (isBun._id) {
            const ingredientsIds = [
                ...constructorIngredients.map((element) => element._id),
                isBun._id,
            ];
            dispatch(getOrderNum(ingredientsIds, setIsOpen));


            dispatch({
                type: RESET_CONSTRUCTOR,
            });

        }
        }
        else {
            dispatch({
                type: SET_ORDER_ERROR,
            });
        }
        }
        else {
            history.push('/login');
        }
    }

    const orderModal= (
        <Modal open={isOpen} onClose={handleCloseModal}  title={""} >
            <OrderDetails/>
        </Modal>
    )

    const totalPrice = useMemo(() => {
        return constructorIngredients.reduce(function (acc, item) {
            let totalPrice = item.price;
            if (item.type === 'bun') {
                totalPrice += item.price;
            }
            return acc + totalPrice;}, 0) + (isBun ? isBun.price * 2 : 0);
    }, [constructorIngredients, isBun]);

    return (

        <>
            <section className={["pt-25 pl-4 pr-4", constructorStyles.items].join(' ')}>
                <BurgerConstructorItems/>
                    <div className={["pt-10", constructorStyles.totalWrapper].join(' ')}>
                        <div className={["pr-10", constructorStyles.totalPrice].join(' ')}>
                            <p className="text text_type_digits-medium">
                                {totalPrice ||0}
                            </p>
                            <CurrencyIcon type="primary"/>
                        </div>
                        
                        <Button type="primary" size="large" onClick={()=>{
                            //onOrderClick();
                            orderSend();
                        }}>
                            Оформить заказ
                        </Button>
                        {isOpen&&orderModal}
                    </div>

            </section>


            </>
    );
};

BurgerConstructor.propTypes = {
  history: PropTypes.object.isRequired,
};

export default BurgerConstructor;