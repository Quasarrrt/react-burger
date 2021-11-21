import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../services/hooks';
import { getOrdersData } from '../services/actions/ordersData';
import OrderInfo from "../components/OrderInfo/OrderInfo";
import styles from './order-info.module.css';

export const OrderInfoPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();


    const dispatch = useDispatch();

   React.useEffect(() => {
        dispatch(getOrdersData());
    }, [dispatch]);

    const { ordersData } = useSelector((state) => state.ordersData);
   // console.log("Данные заказов", ordersData)
    return (
        <div className={styles.orderInfo}>

                <OrderInfo ordersData={ordersData} id={id} orderDetailsData={null} />

        </div>
    );
};