import React, { useState} from 'react';
import resetPasswordStyles from "./reset-password.module.css";
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, Redirect, useHistory, useLocation} from 'react-router-dom';
import {resetPassword} from '../services/actions/auth';
import {useSelector, useDispatch} from "../services/hooks";
import {getRefreshTokenFromCookie} from "../services/cookieFunctions";
import {TLocationState} from "../services/types/otherTypes";

const ResetPasswordPage = () => {
    const [password, setPassword] = useState<string>('');
    const [token, setToken] = useState<string>('');
    const history = useHistory();
    const location = useLocation<TLocationState>();
    const isLogin = !!getRefreshTokenFromCookie();
    const dispatch = useDispatch();
    const formSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(resetPassword(password, token));
        setPassword('');
        setToken('');
    };
    const { resetPasswordSuccess } = useSelector((state) => state.auth);

    if (resetPasswordSuccess) {
        return <Redirect to="/login" />;
    }

    if (!location.state) {
        history.push('/');
    }
    return (
        <>
            {isLogin ? (
                <Redirect to="/"/>
            ) : (
                <div className={resetPasswordStyles.loginWrapper}>
                    <div className={resetPasswordStyles.loginContent}>
                        <p className={`text text_type_main-medium ${resetPasswordStyles.formTitle}`}>Восстановление пароля</p>
                        <form onSubmit={formSubmit} className={resetPasswordStyles.form}>
                            <div className={resetPasswordStyles.inputWrapper}>
                                <PasswordInput
                                    name={'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div className={resetPasswordStyles.inputWrapper}>
                                <Input
                                    type={'text'}
                                    placeholder={'Введите код из письма'}
                                    onChange={e => setToken(e.target.value)}
                                    name={'code'}
                                    size={'default'}
                                    value={token}
                                />
                            </div>
                            <div className={resetPasswordStyles.buttonWrapper}>
                                <Button type="primary" size="medium">
                                    Сохранить
                                </Button>
                            </div>
                        </form>
                        <div>
                            <p className={`text text_type_main-default ${resetPasswordStyles.paragraph}`}>Вспомнили пароль? <Link
                                className={resetPasswordStyles.link} to="/login">Войти</Link></p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
export default ResetPasswordPage;