import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../services/hooks';
import OrderInfo from '../components/OrderInfo/OrderInfo';
import {getUserOrdersData} from "../services/actions/userOrdersData";
import {getAccessTokenFromCookie} from "../services/cookieFunctions";

import styles from './profile-order.module.css';

export const ProfileOrderPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { userOrdersData } = useSelector((state) => state.userOrdersData);

    const dispatch = useDispatch();

    React.useEffect(() => {
        const token = getAccessTokenFromCookie();
        dispatch(getUserOrdersData(token));
    }, [dispatch]);

    return (
        <div className={styles.orderInfo}>

                <OrderInfo ordersData={userOrdersData} id={id} orderDetailsData={null} />

        </div>
    );
};