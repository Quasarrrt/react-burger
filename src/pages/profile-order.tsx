import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../services/hooks';
import OrderInfo from '../components/OrderInfo/OrderInfo';
import {getUserOrdersData} from "../services/actions/userOrdersData";
import {getAccessTokenFromCookie} from "../services/cookieFunctions";
import styles from './profile-order.module.css';
import {getUserInfo} from "../services/actions/auth";
import {wsActions} from "../services/store";
import {WS_ALL_ORDERS_URL, WS_USER_ORDERS_URL} from "../services/api/api";
import profileOrderStyles from "./profile-orders.module.css";
import {TOrder, TOrders} from "../services/types/ws";
import CardOrder from "../components/CardOrder/CardOrder";

export const ProfileOrderPage: React.FC= () => {
   const { id } = useParams<{ id: string }>();
    /*  const { userOrdersData } = useSelector((state) => state.userOrdersData);
  const dispatch = useDispatch();


      React.useEffect(() => {
          const token = getAccessTokenFromCookie();
          dispatch(getUserOrdersData(token));
      }, [dispatch]);

      //console.log(userOrdersData);*/
   /* const {ordersData}:{ordersData: TOrders} = useSelector((state) => state.webSocket);

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch({ type: wsActions.wsStart, wsUrl: WS_ALL_ORDERS_URL });
        return () => {
            dispatch({ type: wsActions.onClose });
        };
    }, [dispatch]);
   console.log(ordersData);*/
    const dispatch = useDispatch();
    const { ordersData, wsConnected }:{ordersData: TOrders, wsConnected: boolean} = useSelector((state) => state.webSocket);

    console.log(ordersData);
    React.useEffect(() => {
        dispatch({ type: wsActions.wsStart, wsUrl: WS_ALL_ORDERS_URL });
        return () => {
            dispatch({ type: wsActions.onClose });
        };
    }, [dispatch]);

       /* <ul className={profileOrderStyles.orders}>
            {ordersData.orders.map((order: TOrder) => {
                return <CardOrder order={order} key={order._id} onCardOrderClick={onCardOrderClick} />;
            })}*/
    /*const {ordersDetails}:{ordersDetails: TOrder} = useSelector((state) => state.orderDetails);
    console.log(ordersDetails);*/
    return (
        <div className={styles.orderInfo}>
            {(ordersData && wsConnected)&&
            <OrderInfo ordersData={ordersData} id='' orderDetailsData={null}/>
            }
        </div>
    );
};