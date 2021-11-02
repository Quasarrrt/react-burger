import React, {useEffect} from "react";
import profileStyles from './profile.module.css';
import {NavLink, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAccessTokenFromCookie, getRefreshTokenFromCookie, setCookie} from "../services/cookieFunctions";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {getUserInfo, logout, updateUserInfo} from "../services/actions/auth";

interface IUserInfo {
    name: string;
    email: string,
    password: string,
}

 const ProfilePage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [userInfo, setUserInfo] = React.useState<IUserInfo>({
        name: '',
        email: '',
        password: '',
    });
    const [isUserInfoChanged, setIsUserInfoChanged] = React.useState<boolean>(false);
    const handleSubmit = (e:React.SyntheticEvent<Element, Event>) => {
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

    const handleChangeUserInfo = (e:React.SyntheticEvent<Element, Event>) => {
        const target = e.target as HTMLInputElement;
        const { name:  inputName } = target;
        setUserInfo((prev) => ({
            ...prev,
            [inputName]: target.value,
        }));
        setIsUserInfoChanged(true);
    };

    const { logoutSuccess } = useSelector((state:any) => state.auth);
    const { user } = useSelector((state:any) => state.auth);

    useEffect(() => {
        const token = getAccessTokenFromCookie();
        dispatch(getUserInfo(token));
    }, [dispatch]);

    useEffect(() => {
        setUserInfo((prev) => ({
            ...prev,
            name: user.name,
            email: user.email,
        }));
    }, [user]);

    useEffect(() => {
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