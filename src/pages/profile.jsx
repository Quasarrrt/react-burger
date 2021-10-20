import React from "react";
import profileStyles from './profile.module.css';
import {NavLink, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAccessTokenFromCookie, getRefreshTokenFromCookie, setCookie} from "../services/cookieFunctions";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {getUserInfo, logout, updateUserInfo} from "../services/actions/auth";

 const ProfilePage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [userInfo, setUserInfo] = React.useState({
        name: '',
        email: '',
        password: '',
    });
    const [isUserInfoChanged, setIsUserInfoChanged] = React.useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        const token = getAccessTokenFromCookie();
        dispatch(updateUserInfo(token, userInfo.name, userInfo.email, userInfo.password));
        setIsUserInfoChanged(false);
    };

    const handleLogout = () => {
        const token = getRefreshTokenFromCookie();
        dispatch(logout(token));
        setCookie({
            accessToken: 'Bearer ',
            refreshToken: '',
        });
        setUserInfo({ name: '', email: '', password: '' });
    };

    const handleChangeUserInfo = (e) => {
        const { name: inputName } = e.target;
        setUserInfo((prev) => ({
            ...prev,
            [inputName]: e.target.value,
        }));
        setIsUserInfoChanged(true);
    };

    const { logoutSuccess } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.auth);

    React.useEffect(() => {
        const token = getAccessTokenFromCookie();
        dispatch(getUserInfo(token));
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
        <section className={profileStyles.section}>
            <div className={profileStyles.linkContainer}>
                <NavLink
                    to={'/profile'}
                    exact={true}
                    className={`${profileStyles.link} text text_type_main-medium text_color_inactive`}
                    activeClassName={profileStyles.linkActive}
                >
                    Профиль
                </NavLink>
                <NavLink
                    to={'/profile/orders'}
                    exact={true}
                    className={`${profileStyles.link} text text_type_main-medium text_color_inactive`}
                    activeClassName={profileStyles.linkActive}
                >
                    История заказов
                </NavLink>
                <button
                    className={`${profileStyles.button} text text_type_main-medium text_color_inactive`}
                    onClick={handleLogout}
                >
                    Выход
                </button>
                <p className={`${profileStyles.paragraph} text text_type_main-default text_color_inactive mt-20`}>
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </div>
            <form className={profileStyles.form}>
                <div className={profileStyles.formContainer}>
                    <Input
                        value={userInfo.name}
                        name={'name'}
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={handleChangeUserInfo}
                        size={'default'}
                        icon={'EditIcon'}
                        disabled={true}

                    />
                    <Input
                        value={userInfo.email}
                        name={'email'}
                        type={'email'}
                        placeholder={'Логин'}
                        onChange={handleChangeUserInfo}
                        size={'default'}
                        icon={'EditIcon'}
                        disabled={true}

                    />
                    <Input
                        value={userInfo.password}
                        name={'password'}
                        type={'password'}
                        placeholder={'Пароль'}
                        onChange={handleChangeUserInfo}
                        size={'default'}
                        icon={'EditIcon'}
                        disabled={true}

                    />
                    {isUserInfoChanged && (
                        <div className={profileStyles.buttonContainer}>
                            <Button type="secondary" size="medium">
                                Отмена
                            </Button>
                            <Button type="primary" size="medium" onClick={handleSubmit}>
                                Сохранить
                            </Button>
                        </div>
                    )}
                </div>
            </form>
        </section>
    );
}
export default ProfilePage;