import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {getIngredients} from '../services/actions/allIngredients'
import InrgedientDetails from '../components/IngredientDetails/IngredientDetails';

import styles from './ingredient-details.module.css';

const IngredientDetailsPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { allIngredients } = useSelector((state) => state.allIngredients);
    const ingredientDetails = allIngredients.filter(({ _id }) => {
        return _id === id;
    })[0];

    React.useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    return (
        <div className={`${styles.container} mt-30`}>
            <h2 className="text text_type_main-large">Детали ингредиента</h2>
            <InrgedientDetails ingredientDetails={ingredientDetails} />
        </div>
    );
};
export default IngredientDetailsPage;