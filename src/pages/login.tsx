import React, {useState} from 'react';
import loginStyles from './login.module.css'
import {Link, Redirect} from 'react-router-dom';
import {login} from '../services/actions/auth'
import {useDispatch, useSelector} from "../services/hooks";
import {Input, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {getRefreshTokenFromCookie} from "../services/cookieFunctions";


 const LoginPage = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
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
                <form className={loginStyles.form}  onSubmit={onSubmit}>
                    <h2 className="text text_type_main-medium mb-6">Вход</h2>
                    <div className={loginStyles.formContainer}>
                        <Input
                            value={email}
                            name={'email'}
                            type={'email'}
                            placeholder={'E-mail'}
                            onChange={(e) => setEmail(e.target.value)}
                            size={'default'}
                        />
                        <PasswordInput
                            value={password}
                            name={'password'}
                            size={'default'}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    <div className={loginStyles.submitWrapper}>
                        <Button type="primary" size="medium">
                            Вход
                        </Button>
                    </div>
                </div>
                    <p className={["text text_type_main-default mt-20", loginStyles.text].join(' ')}>
                        Вы — новый пользователь?
                        <Link className={loginStyles.link} to="/register">
                            Зарегистрироваться
                        </Link>
                    </p>
                    <p className={["text text_type_main-default mt-4", loginStyles.text].join(' ')}>
                        Забыли пароль?
                        <Link className={loginStyles.link} to="/forgot-password">
                            Восстановить пароль
                        </Link>
                    </p>
                </form>
            )}
        </>
    );
}
export default LoginPage;