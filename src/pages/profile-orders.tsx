import React from 'react';
import { useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from "../services/hooks";

import profileOrderStyles from './profile-orders.module.css'
import {
    setCookie,
    getRefreshTokenFromCookie,
} from '../services/cookieFunctions';

import {wsActions} from "../services/store";
import {WS_USER_ORDERS_URL} from "../services/api/api";
import {TOrder, TOrders} from "../services/types/ws";
import {getUserInfo, logout} from "../services/actions/auth";
import CardOrder from "../components/CardOrder/CardOrder";
import ProfileNavigationMenu from "../components/ProfileNavigationMenu/ProfileNavigationMenu";
import {IUserInfo} from "./profile";

interface IProfileOrdersPage {
    onCardOrderClick: (order: TOrder) => void;
}

export const ProfileOrdersPage: React.FC<IProfileOrdersPage> = ({ onCardOrderClick }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { logoutSuccess } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.auth);
    const {ordersData}:{ordersData: TOrders} = useSelector((state) => state.webSocket);

    const [, setUserInfo] = React.useState<IUserInfo>({
        name: '',
        email: '',
        password: '',
    });
    const handleLogout = () => {
        const token = getRefreshTokenFromCookie();
        dispatch(logout(token));
        setCookie({
            accessToken: 'Bearer ',
            refreshToken: '',
        });
        setUserInfo({ name: '', email: '', password: '' });
    };


    React.useEffect(() => {
        const token=localStorage.getItem('token');
        dispatch(getUserInfo(token));
        dispatch({ type: wsActions.wsStart, wsUrl: `${WS_USER_ORDERS_URL}?token=${token}` });
        return () => {
            dispatch({ type: wsActions.onClose });
        };
    }, [dispatch]);

    React.useEffect(() => {
        setUserInfo((prev) => ({
            ...prev,
            name: user.name,
            email: user.email,
        }));
    }, [user]);

    React.useEffect(() => {
        if (logoutSuccess) {
            history.push('/login');
        }
    }, [logoutSuccess, history]);

    return (
        <section className={profileOrderStyles.section}>
            <ProfileNavigationMenu
                handleLogout={handleLogout}
                menuText={'В этом разделе вы можете просмотреть свою историю заказов'}
            />
            <div className={`${profileOrderStyles.container} mt-10`}>
                    {ordersData&& (
                        <ul className={profileOrderStyles.orders}>
                            {ordersData.orders.map((order: TOrder) => {
                                return <CardOrder order={order} key={order._id} onCardOrderClick={onCardOrderClick} />;
                            })}

                        </ul>
                    )}
            </div>

        </section>
    );
};
