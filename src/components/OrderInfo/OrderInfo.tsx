import React from "react";
import { useSelector } from '../../services/hooks';
import orderInfoStyles from './OrderInfo.module.css';
import {TItem} from "../../services/types/otherTypes";
import {TOrders, TOrder} from "../../services/types/ws";
import Price from "../Price/Price";
interface IOrderInfo {
    ordersData: TOrders | null;
    id: string;
    orderDetailsData: TOrder | null;

}
const OrderInfo: React.FC<IOrderInfo> = ({ ordersData, orderDetailsData, id }) => {
    const { allIngredients }: { allIngredients: TItem[] } = useSelector(
        (state) => state.allIngredients,
    );

   const orderInfo:TOrder | null | TOrder[]= !ordersData
        ? orderDetailsData
        : ordersData.orders.filter((item)=>item._id===id)[0];

   //console.log('Заказ orderInfo', orderInfo)

    const formatDateFromISOStringToLocaleString = (ISOString: string) => {
        const dateInMs = Date.parse(ISOString);
        return new Date(dateInMs).toLocaleString();
    };
    const date = formatDateFromISOStringToLocaleString(orderInfo ? orderInfo.createdAt : '');
    let price = 0;

    const status = (order: TOrder) => {
        switch (order.status) {
            case 'done':
                return 'Выполнен';
            case 'pending':
                return 'Готовится';
            case 'cancelled':
                return 'Отменен';
            default:
                break;
        }
    };

    return (
        <section className={orderInfoStyles.orderInfo}>
            <p className={`${orderInfoStyles.orderNumber} text text_type_digits-default`}>{`#${
                orderInfo ? orderInfo.number : ''
            }`}</p>
            <h2 className="text text_type_main-medium mt-10">{orderInfo ? orderInfo.name : ''}</h2>
            <p className={`${orderInfoStyles.orderStatus} text text_type_main-default text_color_success mt-3`}>
                {orderInfo ? status(orderInfo) : ''}
            </p>
            <dl className={`${orderInfoStyles.descriptionList} mt-15`}>
                <dt className="text text_type_main-medium">Состав:</dt>
                <dd className={orderInfoStyles.descriptionDefinition}>
                    <ul className={`${orderInfoStyles.list} mt-6`}>
                        {orderInfo &&
                        orderInfo.ingredients.map((ingredient, index) => {
                            const ingredientData: TItem | undefined = allIngredients.find(
                                (element) => {
                                    return ingredient === element._id;
                                },
                            );

                            if (ingredientData) {
                                price += +ingredientData.price;
                            }

                            return (
                                <li key={`${ingredient} + ${index}`}>
                                    <figure className={`${orderInfoStyles.figure} pr-6`}>
                                        <img
                                            className={orderInfoStyles.img}
                                            src={ingredientData ? ingredientData.image : ''}
                                            alt={ingredientData ? ingredientData.name : ''}
                                        />
                                        <figcaption className={`${orderInfoStyles.figcaption} ml-4`}>
                                            <h3 className={`${orderInfoStyles.ingredientName} text text_type_main-default mt-4`}>
                                                {ingredientData ? ingredientData.name : ''}
                                            </h3>
                                            <Price
                                                price={ingredientData ? ingredientData.price : 0}
                                                textType="text_type_digits-default"
                                                typeIcon="primary"
                                            />
                                        </figcaption>
                                    </figure>
                                </li>
                            );
                        })}
                    </ul>
                </dd>
            </dl>
            <div className={`${orderInfoStyles.info} mt-10 mb-10`}>
                <p className="text text_type_main-default text_color_inactive">{orderInfo ? date : ''}</p>
                <Price price={price} textType="text_type_digits-default" typeIcon="primary" />
            </div>
        </section>
    );
};

export default OrderInfo;
