import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngredientsStyles from './BurgerIngredients.module.css'
import Card from "../Card/Card";
import PropTypes from "prop-types";
import {cardPropTypes} from "../../propTypes/propTypes";


const BurgerIngredients = ({data, onIngredientClick}) => {
    const [current, setCurrent] = React.useState('one')
    return (
        <section className={["mr-10",burgerIngredientsStyles.section].join(' ')}>
            <p className="text text_type_main-large pb-5 pt-10">
                Соберите бургер
            </p>
            <nav>
                <div style={{ display: 'flex' }} className="pb-10">
                    <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                        Булки
                    </Tab>
                    <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                        Соусы
                    </Tab>
                    <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                        Начинки
                    </Tab>
                </div>
            </nav>
            <div>
                <div className={burgerIngredientsStyles.scroll}>
                <section >
                    <p className="text text_type_main-medium">
                        Булки
                    </p>
                    <div className={burgerIngredientsStyles.cards}>
                        {data.map((card) => {
                                if (card.type === "bun") {
                                    return <Card card={card} key={card._id} onClick={onIngredientClick}   />
                                }
                            }
                        )}
                    </div>
                </section>
                <section>
                    <p className="text text_type_main-medium">
                        Соусы
                    </p>
                    <div className={burgerIngredientsStyles.cards}>
                        {data.map((card) => {
                            if (card.type === "sauce") {
                                return <Card card={card} key={card._id} onClick={onIngredientClick}/>
                            }
                        })}
                    </div>
                </section>
                <section>
                    <p className="text text_type_main-medium">
                        Начинки
                    </p>
                    <div className={burgerIngredientsStyles.cards}>
                        {data.map((card) => {
                            if (card.type === "main") {
                                return <Card card={card} key={card._id} onClick={onIngredientClick}/>
                            }
                        }
                    )}
                    </div>
                </section>
                </div>
            </div>

        </section>
    );
};
BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(cardPropTypes.isRequired).isRequired,
    onIngredientClick: PropTypes.func.isRequired,
};

export default BurgerIngredients;