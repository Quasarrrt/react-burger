import React from 'react';
import stylesIngredientDetails from "./IngredientDetails.module.css"
import {useSelector} from "react-redux";


const IngredientDetails = () => {

    const {currentIngredient} = useSelector((state) =>({ currentIngredient: state.viewedIngredient.currentIngredient}));
    //console.log(currentIngredient)
    return (
        <div className={stylesIngredientDetails.ingredientContainer}>
            <img src={currentIngredient.image} alt={currentIngredient.name} className={["mb-4",stylesIngredientDetails.image].join(' ')}/>
            <h3 className={["text text_type_main-medium mb-8", stylesIngredientDetails.title].join(' ')}>
                {currentIngredient.name}
            </h3>
            <ul className={["mb-15",stylesIngredientDetails.list ].join(' ')}>
                <li className={["mr-5",stylesIngredientDetails.calories].join(' ')}>
                    <p className="text text_type_main-default">
                        Калории,ккал
                    </p>
                    <p className={["mt-2 text text_type_digits-default", stylesIngredientDetails.caloriesNum].join(' ')}>
                        {currentIngredient.calories}
                    </p>

                </li>
                <li className={["mr-5 text text_type_digits-default",stylesIngredientDetails.calories].join(' ')}>
                    <p className="text text_type_main-default">
                        Белки, г
                    </p>
                    <p className={["mt-2 text text_type_digits-default", stylesIngredientDetails.caloriesNum].join(' ')}>
                        {currentIngredient.proteins}
                    </p>

                </li>
                <li className={["mr-5",stylesIngredientDetails.calories].join(' ')}>
                    <p className="text text_type_main-default">
                        Жиры, г
                    </p>
                    <p className={["mt-2 text text_type_digits-default" , stylesIngredientDetails.caloriesNum].join(' ')}>
                        {currentIngredient.fat}
                    </p>
                </li>
                <li className={stylesIngredientDetails.calories}>
                    <p className="text text_type_main-default">
                        Углеводы, г
                    </p>
                    <p className={["mt-2 text text_type_digits-default", stylesIngredientDetails.caloriesNum].join(' ')}>
                        {currentIngredient.carbohydrates}
                    </p>
                </li>
            </ul>

        </div>
    );
};



export default IngredientDetails;