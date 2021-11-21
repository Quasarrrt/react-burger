import {TOrder, TOrders} from '../services/types/ws';
import React from 'react';
import { useSelector, useDispatch } from '../services/hooks';
import feedStyles from './feed.module.css'
import {wsActions} from "../services/store";
import { WS_ALL_ORDERS_URL } from '../services/api/api';
import Orders from "../components/Orders/Orders";
interface IOrderFeedPage {
    onCardOrderClick: (order: TOrder)  => void;

}


const OrderFeedPage: React.FC<IOrderFeedPage> = ({ onCardOrderClick }) => {
    const dispatch = useDispatch();
    const { ordersData, wsConnected }:{ordersData: TOrders, wsConnected: boolean} = useSelector((state) => state.webSocket);

    //console.log(ordersData);
    React.useEffect(() => {
        dispatch({ type: wsActions.wsStart, wsUrl: WS_ALL_ORDERS_URL });
        return () => {
            dispatch({ type: wsActions.onClose });
        };
    }, [dispatch]);

    return (
        <main className={feedStyles.orderFeed}>
            <h1 className={`${feedStyles.heading} text text_type_main-large mt-10`}>Лента заказов</h1>
            {ordersData && wsConnected ? (
                <div className={`${feedStyles.container} mt-5`}>
                    <Orders onCardOrderClick={onCardOrderClick} ordersData={ordersData} />
                    <dl className={feedStyles.stats}>
                        <div className={feedStyles.readyWithInProgressContainer}>
                            <div>
                                <dt className="text text_type_main-medium">Готовы:</dt>
                                <dd className={feedStyles.ordersContainer}>
                                    <ul className={`${feedStyles.list} mt-6`}>
                                        {ordersData.orders.map((order: TOrder) => {
                                            if (order.status === 'done')
                                                return (
                                                    <li
                                                        className="text text_type_digits-default text_color_success"
                                                        key={order._id}
                                                    >
                                                        {order.number}
                                                    </li>
                                                );
                                            return null;
                                        })}
                                    </ul>
                                </dd>
                            </div>
                            <div>
                                <dt className="text text_type_main-medium">В работе:</dt>
                                <dd className={feedStyles.ordersContainer}>
                                    <ul className={`${feedStyles.list} mt-6`}>
                                        {ordersData.orders.map((order: TOrder) => {
                                            if (order.status === 'pending')
                                                return (
                                                    <li className="text text_type_digits-default" key={order._id}>
                                                        {order.number}
                                                    </li>
                                                );
                                            return null;
                                        })}
                                    </ul>
                                </dd>
                            </div>
                        </div>
                        <dt className="text text_type_main-medium mt-15">Выполнено за все время:</dt>
                        <dd className={`${feedStyles.numberOfOrders} text text_type_digits-large`}>
                            {ordersData.total.toLocaleString('ru-RU')}
                        </dd>
                        <dt className="text text_type_main-medium mt-15">Выполнено за сегодня</dt>
                        <dd className={`${feedStyles.numberOfOrders} text text_type_digits-large`}>
                            {ordersData.totalToday.toLocaleString('ru-RU')}
                        </dd>
                    </dl>
                </div>
                ):(<></>)}

        </main>
    );
};

export default OrderFeedPage;