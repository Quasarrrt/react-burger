import React from 'react';
import InrgedientDetails from '../components/IngredientDetails/IngredientDetails';

import styles from './ingredient-details.module.css';

const IngredientDetailsPage = () => {

    return (
        <div className={`${styles.container} mt-30`}>
            <h2 className="text text_type_main-large">Детали ингредиента</h2>
            <InrgedientDetails />
        </div>
    );
};
export default IngredientDetailsPage;