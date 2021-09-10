import React from 'react';
import {  CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from './BurgerConstructor.module.css';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux";
import { RESET_CONSTRUCTOR} from "../../services/actions/constructorIngredients";
import {getOrderNum, SET_ORDER_ERROR} from "../../services/actions/order";
import BurgerConstructorItems from "../BurgerConstructorItems/BurgerConstructorItems";
import {useMemo} from "react";



const BurgerConstructor = ({onOrderClick}) => {

    const dispatch=useDispatch();
    const { constructorIngredients, isBun } = useSelector((state) => ({
        constructorIngredients: state.constructorIngredients.constructorIngredients,
        isBun: state.constructorIngredients.isBun,

    }));

    const orderSend=()=>{
        if(isBun!==null){
        if (isBun._id) {
            const ingredientsIds = [
                ...constructorIngredients.map((element) => element._id),
                isBun._id,
            ];
            dispatch(getOrderNum(ingredientsIds));
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
                            onOrderClick();
                            orderSend();
                        }}>
                            Оформить заказ
                        </Button>
                    </div>

            </section>


            </>
    );
};

BurgerConstructor.propTypes = {
    onOrderClick: PropTypes.func.isRequired,

};

export default BurgerConstructor;