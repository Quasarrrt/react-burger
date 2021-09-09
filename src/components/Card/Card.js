import React from 'react';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import cardStyles  from './Card.module.css'
import {cardPropTypes} from "../../propTypes/propTypes";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import {ADD_VIEWED_INGREDIENT_DATA} from "../../services/actions/viewedIngredient";
import {useDrag} from "react-dnd";

const Card = ({card, onCardClick, itemCount}) => {
    const dispatch=useDispatch();
    function handleClick() {
        dispatch({
            type: ADD_VIEWED_INGREDIENT_DATA,
            payload: card,
        });
        onCardClick(card);
        return false;
    };
    const [{isDrag}, dragRef] = useDrag({
        type: 'dragIngredient',
        item: card,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });
    return (
                <div className={["mr-2 ml-4 mt-6 mb-10",cardStyles.card].join(' ')} onClick={handleClick} ref={dragRef}>
                    <div className={cardStyles.counter}>
                        {itemCount && (itemCount > 0) ?  <Counter count={itemCount} size="default" /> : null}
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
    onCardClick: PropTypes.func.isRequired,
};

export default Card;