import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../services/hooks';
import { getOrdersData } from '../services/actions/ordersData';
import OrderInfo from "../components/OrderInfo/OrderInfo";
import styles from './order-info.module.css';
import {TOrder, TOrders} from "../services/types/ws";
import {wsActions} from "../services/store";
import {WS_ALL_ORDERS_URL} from "../services/api/api";


interface IOrderInfo{
    orderDetails:TOrder

}

export const OrderInfoPage: React.FC<IOrderInfo> = ({orderDetails}) => {
    /*const { id } = useParams<{ id: string }>();
    const { ordersData } = useSelector((state) => state.ordersData);

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getOrdersData());
    }, [dispatch]);*/

    const dispatch = useDispatch();
    const { ordersData, wsConnected }:{ordersData: TOrders, wsConnected: boolean} = useSelector((state) => state.webSocket);

    console.log(ordersData);
    React.useEffect(() => {
        dispatch({ type: wsActions.wsStart, wsUrl: WS_ALL_ORDERS_URL });
        return () => {
            dispatch({ type: wsActions.onClose });
        };
    }, [dispatch]);


    return (
        <div className={styles.orderInfo}>
            {ordersData && wsConnected ? (
                <OrderInfo ordersData={ordersData} id='' orderDetailsData={null} />
            ) : (
               <>dfgdgfdgd</>
            )}
        </div>
    );
};