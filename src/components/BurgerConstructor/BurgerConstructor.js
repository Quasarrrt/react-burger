import React from 'react';
import { ConstructorElement, CurrencyIcon, Button,DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyles from './BurgerConstructor.module.css';
import PropTypes from 'prop-types';
import {cardPropTypes} from "../../propTypes/propTypes";

const BurgerConstructor = ({items, isLoading}) => {
const bunElem=items[0];
    return (
        <>
            {!isLoading && (
                <section className={["pt-25 pl-4 pr-4", constructorStyles.items].join(' ')}>
                    <ul className={constructorStyles.ul}>
                        <li className={constructorStyles.item}>
                    <span className={["pb-4", constructorStyles.itemWrapper].join(' ')}>
                        <ConstructorElement
                            type='top'
                            isLocked={true}
                            text={(bunElem?.name + ' (верх)') || ""}
                            price={(bunElem?.price) || ""}
                            thumbnail={(bunElem?.image) || ""}
                        />
                    </span>
                        </li>
                        <div className={constructorStyles.scroll}>
                            {items.map((item) => {
                                    return (
                                        item.type !== "bun" && (
                                            <li className={["pb-4", constructorStyles.item].join(' ')} key={item._id}>
                                                <DragIcon type="primary"/>
                                                <span className={constructorStyles.itemWrapper}>
                                    <ConstructorElement
                                        isLocked={false}
                                        text={item.name}
                                        price={item.price}
                                        thumbnail={item.image}
                                    />
                                </span>
                                            </li>))
                                }
                            )}
                        </div>
                        <li className={["pt-4", constructorStyles.item].join(' ')}>
                            <div className={constructorStyles.itemWrapper}>
                                <ConstructorElement
                                    type='bottom'
                                    isLocked={true}
                                    text={(bunElem?.name + ' (низ)') || ""}
                                    price={(bunElem?.price) || ""}
                                    thumbnail={(bunElem?.image) || ""}
                                />
                            </div>
                        </li>

                    </ul>
                    <div className={["pt-10", constructorStyles.totalWrapper].join(' ')}>
                        <div className={["pr-10", constructorStyles.totalPrice].join(' ')}>
                            <p className="text text_type_digits-medium">610</p>
                            <CurrencyIcon type="primary"/>
                        </div>
                        <Button type="primary" size="large">
                            Оформить заказ
                        </Button>
                    </div>


                </section>
            )
            }</>
    );
};

BurgerConstructor.propTypes = {
    items: PropTypes.arrayOf(cardPropTypes.isRequired).isRequired,
    isLoading: PropTypes.bool.isRequired,

};

export default BurgerConstructor;