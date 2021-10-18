import React, {useState} from 'react';
import loginStyles from './login.module.css'
import {Link, Redirect} from 'react-router-dom';
import {login} from '../services/actions/auth'
import {useDispatch, useSelector} from "react-redux";
import {Input, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {getRefreshTokenFromCookie} from "../services/cookieFunctions";



export const LoginPage = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
        setEmail('');
        setPassword('');
    }
    const { loginSuccess } = useSelector((state) => state.auth);

    if (loginSuccess) {
        return <Redirect to="/" />;
    }
    const isLogin = !!getRefreshTokenFromCookie();

    return (
        <>
            {isLogin ? (
                <Redirect to="/" />
            ) : (
        <div className={loginStyles.loginWrapper}>
            <div className={loginStyles.loginContent}>
                <p className={`text text_type_main-medium ${loginStyles.formTitle}`}>Вход</p>
                <form onSubmit={onSubmit} className={loginStyles.form}>
                    <div className={'mb-6'}>
                        <Input
                            value={email}
                            name={'email'}
                            type={'email'}
                            placeholder={'E-mail'}
                            onChange={(e) => setEmail(e.target.value)}
                            size={'default'}
                        />
                    </div>
                    <div className={'mb-6'}>
                        <PasswordInput
                            value={password}
                            name={'password'}
                            size={'default'}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={loginStyles.submitWrapper}>
                        <Button type="primary" size="medium">
                            Вход
                        </Button>
                    </div>
                </form>
                <div>

                    <p className={["text text_type_main-default", loginStyles.text].join(' ')}>
                        Вы — новый пользователь?
                        <Link className={loginStyles.link} to="/register">
                            Зарегистрироваться
                        </Link>
                    </p>
                    <p className={["text text_type_main-default", loginStyles.text].join(' ')}>
                        Забыли пароль?
                        <Link className={loginStyles.link} to="/forgot-password">
                            Восстановить пароль
                        </Link>
                    </p>
                </div>
            </div>
        </div>
            )}
        </>
    );
}