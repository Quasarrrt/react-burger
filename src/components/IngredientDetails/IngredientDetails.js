import React from 'react';
import stylesIngredientDetails from "./IngredientDetails.module.css"
import {cardPropTypes} from "../../propTypes/propTypes";
import Card from "../Card/Card";


const IngredientDetails = ({card}) => {
    return (
        <div className={stylesIngredientDetails.ingredientContainer}>
            <img src={card.image} alt={card.name} className={["mb-4",stylesIngredientDetails.image].join(' ')}/>
            <h3 className={["text text_type_main-medium mb-8", stylesIngredientDetails.title].join(' ')}>
                {card.name}
            </h3>
            <ul className={["mb-15",stylesIngredientDetails.list ].join(' ')}>
                <li className={["mr-5",stylesIngredientDetails.calories].join(' ')}>
                    <p className="text text_type_main-default">
                        Калории,ккал
                    </p>
                    <p className={["mt-2 text text_type_digits-default", stylesIngredientDetails.caloriesNum].join(' ')}>
                        {card.calories}
                    </p>

                </li>
                <li className={["mr-5 text text_type_digits-default",stylesIngredientDetails.calories].join(' ')}>
                    <p className="text text_type_main-default">
                        Белки, г
                    </p>
                    <p className={["mt-2 text text_type_digits-default", stylesIngredientDetails.caloriesNum].join(' ')}>
                        {card.proteins}
                    </p>

                </li>
                <li className={["mr-5",stylesIngredientDetails.calories].join(' ')}>
                    <p className="text text_type_main-default">
                        Жиры, г
                    </p>
                    <p className={["mt-2 text text_type_digits-default" , stylesIngredientDetails.caloriesNum].join(' ')}>
                        {card.fat}
                    </p>
                </li>
                <li className={stylesIngredientDetails.calories}>
                    <p className="text text_type_main-default">
                        Углеводы, г
                    </p>
                    <p className={["mt-2 text text_type_digits-default", stylesIngredientDetails.caloriesNum].join(' ')}>
                        {card.carbohydrates}
                    </p>
                </li>
            </ul>

        </div>
    );
};

Card.propTypes = {
    card: cardPropTypes.isRequired
};

export default IngredientDetails;