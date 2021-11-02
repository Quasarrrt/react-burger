import React, { useState} from 'react';
import styles from "./reset-password.module.css";
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, Redirect, useHistory, useLocation} from 'react-router-dom';
import {resetPassword} from '../services/actions/auth';
import {useDispatch, useSelector} from "react-redux";
import {getRefreshTokenFromCookie} from "../services/cookieFunctions";
import {TLocationState} from "../services/types/types";

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
    const { resetPasswordSuccess } = useSelector((state:any) => state.auth);

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
                <div className={styles.loginWrapper}>
                    <div className={styles.loginContent}>
                        <p className={`text text_type_main-medium ${styles.formTitle}`}>Восстановление пароля</p>
                        <form onSubmit={formSubmit} className={styles.form}>
                            <div className={styles.inputWrapper}>
                                <PasswordInput
                                    name={'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div className={styles.inputWrapper}>
                                <Input
                                    type={'text'}
                                    placeholder={'Введите код из письма'}
                                    onChange={e => setToken(e.target.value)}
                                    name={'code'}
                                    size={'default'}
                                    value={token}
                                />
                            </div>
                            <div className={styles.submitWrapper}>
                                <Button type="primary" size="medium">
                                    Сохранить
                                </Button>
                            </div>
                        </form>
                        <div>
                            <p className={`text text_type_main-default ${styles.paragraph}`}>Вспомнили пароль? <Link
                                className={styles.link} to="/login">Войти</Link></p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
export default ResetPasswordPage;