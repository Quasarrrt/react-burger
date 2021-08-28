import React from 'react';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import cardStyles  from './Card.module.css'
import {cardPropTypes} from "../../propTypes/propTypes";
import PropTypes from "prop-types";


const Card = ({card, onClick}) => {
    return (
                <div className={["mr-2 ml-4 mt-6 mb-10",cardStyles.card].join(' ')} onClick={()=>{onClick(card)}}>
                    <div className={cardStyles.counter}>
                        <Counter count={1} size="default" />
                    </div>
                    <img src={card.image} alt={card.name} className={["pr-4 pl-4", cardStyles.pic].join(' ')} />
                    <div className={["pt-1 pb-1", cardStyles.price].join(' ')}>
                        <p className={["pr-2 text text_type_digits-default", cardStyles.priceNum].join(' ')}>{card.price}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <p className={["text text_type_main-default",cardStyles.name].join(' ')}>{card.name}</p>
                </div>
    );
};

Card.propTypes = {
    card: cardPropTypes.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Card;