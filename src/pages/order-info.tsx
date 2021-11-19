import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../services/hooks';
import { getOrdersData } from '../services/actions/ordersData';
import OrderInfo from "../components/OrderInfo/OrderInfo";
import Modal from "../components/Modal/Modal";
import styles from './order-info.module.css';

export const OrderInfoPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { ordersData } = useSelector((state) => state.ordersData);

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getOrdersData());
    }, [dispatch]);

    return (
        <div className={styles.orderInfo}>

                <OrderInfo ordersData={ordersData} id={id} orderDetailsData={null} />

        </div>
    );
};