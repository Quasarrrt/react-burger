import { Link, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import Price from '../Price/Price';
import { formatDateFromISOStringToLocaleString } from '../../utils/utils';
import cardOrderstyles from './CardOrder.module.css';
import {TOrder} from "../../services/types/ws";
import {TItem, TLocationState} from "../../services/types/otherTypes";
interface ICardOrder {
    order: TOrder;
    onCardOrderClick: (order: TOrder) => void;
}

const CardOrder: React.FC<ICardOrder> = ({ order, onCardOrderClick }) => {
    const location = useLocation<TLocationState>();
    const {allIngredients}:{ allIngredients: TItem[] }  = useSelector((state) => state.allIngredients,
    );
    const date = formatDateFromISOStringToLocaleString(order.createdAt);
    let price = 0;


    const handleClick = () => {

       onCardOrderClick(order);
    };



    return (
        <li className={`${cardOrderstyles.cardOrder} p-6`} >

            <Link
                className={cardOrderstyles.link}
                to={{
                    pathname: `${location.pathname}/${order._id}`,
                    state: { backgroundOrders: location },

                }}
                onClick={handleClick}
            >

                <div className={cardOrderstyles.idWithDateContainer}>
                    <p className="text text_type_digits-default">{`#${order.number}`}</p>
                    <p className="text text_type_main-default text_color_inactive">{date}</p>
                </div>
                <p className="text text_type_main-medium mt-6">{order.name}</p>
                <div className={`${cardOrderstyles.ingredientsWithPriceContainer} mt-6`}>
                    <div className={`${cardOrderstyles.ingredientsContainer} mr-6`}>
                        {order.ingredients.map((ingredient, index) => {
                            const ingredientData = allIngredients.find((element: TItem) => {
                                return ingredient === element._id;
                            });

                            if (ingredientData) {
                                price += +ingredientData.price;
                            }

                            return (
                                <img
                                    className={cardOrderstyles.img}
                                    src={ingredientData ? ingredientData.image : ''}
                                    key={`${order._id} + ${index}`}
                                    style={{ zIndex: Math.abs(index - 100) }}
                                    alt={ingredientData ? ingredientData.name : ' '}
                                />
                            );
                        })}
                    </div>
                    <Price price={price} textType="text_type_digits-default" typeIcon="primary" />
                </div>
            </Link>

        </li>

    );
};

export default CardOrder;
