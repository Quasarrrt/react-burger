import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../services/hooks';
import OrderInfo from '../components/OrderInfo/OrderInfo';
import {getUserOrdersData} from "../services/actions/userOrdersData";
import styles from './profile-order.module.css';
import {getUserInfo} from "../services/actions/auth";

export const ProfileOrderPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { userOrdersData } = useSelector((state) => state.userOrdersData);

    const dispatch = useDispatch();

    React.useEffect(() => {
        const token=localStorage.getItem('token');
      //console.log('Token user', token)
        dispatch(getUserInfo(token));
        dispatch(getUserOrdersData(token));
    }, [dispatch]);

    //console.log(userOrdersData);
    return (
        <div className={styles.orderInfo}>
            {userOrdersData ? (
                <OrderInfo ordersData={ userOrdersData } id={id} orderDetailsData={null} />
                ):(<></>)}
        </div>
    );
};