import React from 'react';
import styles from "./forgot-password.module.css"
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, Redirect,  useLocation} from 'react-router-dom';
import {forgotPassword} from '../services/actions/auth';
import {useSelector, useDispatch} from "../services/hooks";
import {getRefreshTokenFromCookie} from "../services/cookieFunctions";
import {useState} from "react";
import {TLocationState} from "../services/types/otherTypes";


 const  ForgotPasswordPage = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>('');
    const location = useLocation<TLocationState>();

    const formSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(forgotPassword(email));
        setEmail('');
    };
    const { forgotPasswordSuccess } = useSelector((state) => state.auth);

    const isLogin = !!getRefreshTokenFromCookie();

    if (forgotPasswordSuccess) {
        return <Redirect to={{ pathname: '/reset-password', state: { from: location } }} />;
    }

    return (
        <>
        {isLogin ? (
                <Redirect to="/" />
            ) : (
        <div className={styles.loginWrapper}>
            <div className={styles.loginContent}>
                <p className={`text text_type_main-medium ${styles.formTitle}`}>Восстановление пароля</p>
                <form onSubmit={formSubmit} className={styles.form}>
                    <div className={styles.inputWrapper}>
                        <Input
                            value={email}
                            name={'email'}
                            type={'email'}
                            placeholder={'Укажите e-mail'}
                            onChange={(e) => setEmail(e.target.value)}
                            size={'default'}
                        />
                    </div>
                    <div className={styles.submitWrapper}>
                        <Button type="primary" size="medium">
                            Восстановить
                        </Button>
                    </div>
                </form>
                <div>
                    <p className={`text text_type_main-default ${styles.paragraph}`}>Вспомнили пароль? <Link
                        className={styles.link} to="/login">Войти</Link></p>
                </div>
            </div>
        </div>
            )};
            </>
        );
}
export default ForgotPasswordPage;