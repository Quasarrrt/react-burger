import React from 'react';
import { ConstructorElement, CurrencyIcon, Button,DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from './BurgerConstructor.module.css';
import PropTypes from 'prop-types';
import {cardPropTypes} from "../../propTypes/propTypes";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {ADD_CONSTRUCTOR_INGREDIENTS, MOVE_CONSTRUCTOR_INGREDIENTS} from "../../services/actions/constructorIngredients";
import {getOrderNum} from "../../services/actions/order";
import IngredientsToSort from "../IngredientsToSort/IngredientsToSort";


const BurgerConstructor = ({onOrderClick}) => {
    const dispatch=useDispatch();
    const { constructorIngredients, isBun } = useSelector(state => ({
        constructorIngredients: state.constructorIngredients.constructorIngredients,
        isBun: state.constructorIngredients.isBun,
    }));

    const [{isHover}, dropTarget] = useDrop({
        accept: "dragIngredient",
        drop(ingredient) {
            dispatch({ type: ADD_CONSTRUCTOR_INGREDIENTS, payload: ingredient });
        },
        collect: (monitor) => ({
            isHover: monitor.isOver(),
        }),
    });
    let totalPrice = 0;
    const order = [...constructorIngredients];
    if (constructorIngredients && !isBun) {
        totalPrice = constructorIngredients.reduce(function (prevValue, item) {
            return prevValue + item.price;
        }, 0);
    }
    if (constructorIngredients && isBun) {
        totalPrice =
            constructorIngredients.reduce(function (prevValue, item) {
                return prevValue + item.price;
            }, 0) +
            isBun.price * 2;
        order.push(isBun._id, isBun._id);
    }
    const handleGetOrder = () => {
        onOrderClick();
        if (isBun) {
            dispatch(getOrderNum(order));
        }
    };
    const moveItem = (dragIndex, hoverIndex) => dispatch({ type: MOVE_CONSTRUCTOR_INGREDIENTS, payload: { dragIndex, hoverIndex } });
    return (
        <>

                <section className={["pt-25 pl-4 pr-4", constructorStyles.items].join(' ')} ref={dropTarget}>
                    <ul className={constructorStyles.ul}>
                        <li className={constructorStyles.item}>
                            {isBun && (
                                <ConstructorElement
                                    type="top"
                                    isLocked={true}
                                    text={`${isBun.name} (верх)`}
                                    price={isBun.price}
                                    thumbnail={isBun.image}
                                />
                            )}
                        </li>
                        <div className={constructorStyles.scroll}>
                            {constructorIngredients.filter(item => item.type !== 'bun').map((item, index) => {
                                return (
                                    <IngredientsToSort
                                        key={item.uniqueId}
                                        index={index}
                                        id={item.uniqueId}
                                        price={item.price}
                                        name={item.name}
                                        image={item.image}
                                        moveItem={moveItem}
                                    />
                                );}
                            )}
                        </div>
                        <li className={["pt-4", constructorStyles.item].join(' ')}>
                            <div className={constructorStyles.itemWrapper}>
                                {isBun && (
                                    <ConstructorElement
                                        type="bottom"
                                        isLocked={true}
                                        text={`${isBun} (низ)`}
                                        price={isBun.price}
                                        thumbnail={isBun.image}
                                    />
                                )}
                            </div>
                        </li>

                    </ul>
                    <div className={["pt-10", constructorStyles.totalWrapper].join(' ')}>
                        <div className={["pr-10", constructorStyles.totalPrice].join(' ')}>
                            <p className="text text_type_digits-medium">{totalPrice}</p>
                            <CurrencyIcon type="primary"/>
                        </div>
                        
                        <Button type="primary" size="large" onClick={handleGetOrder}>
                            Оформить заказ
                        </Button>
                    </div>


                </section>

            </>
    );
};

BurgerConstructor.propTypes = {
   // items: PropTypes.arrayOf(cardPropTypes.isRequired).isRequired,
    //isLoading: PropTypes.bool.isRequired,
    //onClick: PropTypes.func.isRequired,

};

export default BurgerConstructor;