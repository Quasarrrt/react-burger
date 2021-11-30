import React from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cardStyles from "./Card.module.css";

import { useDispatch, useSelector } from "../../services/hooks";

import { ADD_VIEWED_INGREDIENT_DATA } from "../../services/types/viewedIngredient";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { TItem } from "../../services/types/otherTypes";
interface ICard {
  card: TItem;
  onCardClick: (card: TItem) => void;
}

const Card: React.FC<ICard> = ({ card, onCardClick }) => {
  const dispatch = useDispatch();
  const {
    constructorIngredients,
    isBun,
  }: { constructorIngredients: TItem[]; isBun: TItem } = useSelector(
    (state) => state.constructorIngredients
  );
  const [, dragRef] = useDrag({
    type: "item",
    item: card,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  function handleClick() {
    dispatch({
      type: ADD_VIEWED_INGREDIENT_DATA,
      payload: card,
    });
    onCardClick(card);
    return false;
  }

  const count =
    card.type === "bun" && isBun?._id === card._id
      ? 2
      : card.type !== "bun"
      ? constructorIngredients.filter((item) => item._id === card._id).length
      : 0;

  const location = useLocation();
  const ingredientId = card["_id"];
  return (
    <Link
      className={["mr-2 ml-4 mt-6 mb-10", cardStyles.card].join(" ")}
      ref={dragRef}
      to={{
        pathname: `/ingredients/${ingredientId}`,
        state: { background: location },
      }}
      onClick={handleClick}
    >
      <div className={cardStyles.counter}>
        <Counter count={count} size="default" />
      </div>
      <img
        src={card.image}
        alt={card.name}
        className={["pr-4 pl-4", cardStyles.pic].join(" ")}
      />
      <div className={["pt-1 pb-1", cardStyles.price].join(" ")}>
        <p
          className={[
            "pr-2 text text_type_digits-default",
            cardStyles.priceNum,
          ].join(" ")}
        >
          {card.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={["text text_type_main-default", cardStyles.name].join(" ")}>
        {card.name}
      </p>
    </Link>
  );
};

/*Card.propTypes = {
   card: cardPropTypes.isRequired,
    onCardClick: PropTypes.func.isRequired,
};*/

export default Card;
