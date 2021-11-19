import React, {useEffect} from "react";
import profileStyles from './profile.module.css';
import { useHistory} from "react-router-dom";
import {useSelector, useDispatch} from "../services/hooks";
import {getAccessTokenFromCookie, getRefreshTokenFromCookie, setCookie} from "../services/cookieFunctions";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {getUserInfo, logout, updateUserInfo} from "../services/actions/auth";
import ProfileNavigationMenu from "../components/ProfileNavigationMenu/ProfileNavigationMenu";


export interface IUserInfo{
    name: string,
    email:  string,
    password:  string,
}

 const ProfilePage  = () => {
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

    const { logoutSuccess } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.auth);

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
     const nameRef = React.useRef<HTMLInputElement>(null);
     const emailRef = React.useRef<HTMLInputElement>(null);
     const passwordRef = React.useRef<HTMLInputElement>(null);

     const handleIconClick = (ref: React.RefObject<HTMLInputElement>) => {
         ref.current!.classList.remove('input__textfield-disabled');
         ref.current!.disabled = false;
         ref.current!.focus();
     };

     const handleNameIconClick = () => {
         handleIconClick(nameRef);
     };

     const handleEmailIconClick = () => {
         handleIconClick(emailRef);
     };

     const handlePasswordIconClick = () => {
         handleIconClick(passwordRef);
     };
    return (
        <section className={profileStyles.section}>
            <ProfileNavigationMenu
                handleLogout={handleLogout}
                menuText={'В этом разделе вы можете изменить свои персональные данные'}
            />
            <form className={`${profileStyles.form} mt-30`}>
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
                        ref={nameRef}
                        onIconClick={handleNameIconClick}

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
                        ref={emailRef}
                        onIconClick={handleEmailIconClick}

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
                        ref={passwordRef}
                        onIconClick={handlePasswordIconClick}

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