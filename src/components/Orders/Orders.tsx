import CardOrder from '../CardOrder/CardOrder';

import styles from './Orders.module.css';

import { TOrder, TOrders } from '../../services/types/ws';
import React from "react";

interface IOrders {
    onCardOrderClick: (order: TOrder) => void;
    ordersData: TOrders;
}

const Orders: React.FC<IOrders> = ({ onCardOrderClick, ordersData }) => {



    return (
        <>


            {ordersData && (
                <ul className={styles.orders}>
                    {ordersData.orders.map((order: TOrder) => {
                        return(
                            <CardOrder order={order} key={order._id} onCardOrderClick={onCardOrderClick} />

                        )
                    })}
                </ul>
            )}
        </>
    );
};

export default Orders;