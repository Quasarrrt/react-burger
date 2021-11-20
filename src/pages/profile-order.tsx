import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../services/hooks';
import OrderInfo from '../components/OrderInfo/OrderInfo';
import {getUserOrdersData} from "../services/actions/userOrdersData";
import {getAccessTokenFromCookie} from "../services/cookieFunctions";
import styles from './profile-order.module.css';
import {getUserInfo} from "../services/actions/auth";
import {getViewedIngredient} from "../services/actions/viewedIngredient";
import {TItem} from "../services/types/otherTypes";
import {TOrder, TOrders} from "../services/types/ws";



export const ProfileOrderPage: React.FC= () => {
   /*const { id } = useParams<{ id: string }>();
    const { userOrdersData } = useSelector((state) => state.userOrdersData);

    const dispatch = useDispatch();

    React.useEffect(() => {
        const token = getAccessTokenFromCookie();
        dispatch(getUserOrdersData(token));
    }, [dispatch]);*/

    //console.log(userOrdersData);
    return (
        <div className={styles.orderInfo}>

                <OrderInfo ordersData={null} id='' orderDetailsData={null} />

        </div>
    );
};