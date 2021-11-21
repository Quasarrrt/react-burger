import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import priceStyles from './Price.module.css';

interface IPrice {
    textType: string;
    price: number;
    typeIcon: 'secondary' | 'primary' | 'error' | 'success';
}

const Price: React.FC<IPrice> = ({ textType, price, typeIcon }) => {
    return (
        <div className={`${priceStyles.price} mt-1 mb-1`}>
            <p className={`text ${textType} pr-2`}>{price}</p>
            <CurrencyIcon type={typeIcon} />
        </div>
    );
};

export default Price;
