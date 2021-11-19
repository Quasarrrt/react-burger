import React from 'react';
import stylesIngredientDetails from "./IngredientDetails.module.css"
import {useSelector, useDispatch} from "../../services/hooks";
import  {useEffect} from "react";
import { useParams } from "react-router-dom";
import {getViewedIngredient} from "../../services/actions/viewedIngredient";
import {TItem} from "../../services/types/otherTypes";



const IngredientDetails = () => {

    const { id } = useParams<{id: string}>();
    const dispatch = useDispatch();
    const {  allIngredients }:{ allIngredients: TItem[] } = useSelector((state) => (state.allIngredients));

    useEffect(() => {
            const itemData = allIngredients.find((item) => item._id === id);
            itemData && dispatch(getViewedIngredient(itemData));
        }, [id, allIngredients, dispatch]
    );


    const {currentIngredient}:{currentIngredient: TItem} = useSelector((state) => state.viewedIngredient);



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