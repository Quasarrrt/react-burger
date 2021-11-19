import React, { useState, useEffect} from 'react';
import registerStyles from "./register.module.css";
import {Input, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, Redirect, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from "../services/hooks";
import {register} from '../services/actions/auth';
import {getRefreshTokenFromCookie} from "../services/cookieFunctions";

const RegisterPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const isLogin = !!getRefreshTokenFromCookie();
    const { registerSuccess } = useSelector((state) => state.auth);
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(register(email, password, name));
        setEmail('');
        setPassword('');
        setName('');
    };
    useEffect(() => {
        if (registerSuccess) {
            history.push('/login');
        }
    }, [registerSuccess, history]);
    return (
        <>
            {isLogin ? (
                <Redirect to="/" />
            ) : (
                <form className={registerStyles.form} noValidate onSubmit={handleSubmit}>
                    <h2 className="text text_type_main-medium mb-6">Регистрация</h2>
                    <div className={registerStyles.formContainer}>
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            onChange={e => setName(e.target.value)}
                            name={'name'}
                            size={'default'}
                            value={name}
                        />
                        <Input
                            type={'email'}
                            placeholder={'E-mail'}
                            onChange={e => setEmail(e.target.value)}
                            name={'email'}
                            size={'default'}
                            value={email}
                        />
                        <PasswordInput
                            name={'password'}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    <div className={registerStyles.submitWrapper}>
                        <Button type="primary" size="medium">
                            Зарегистрироваться
                        </Button>
                    </div>
                    </div>

                <div>
                    <p className={`text text_type_main-default mt-20 ${registerStyles.paragraph}`}>Уже зарегистрированы? <Link
                        className={registerStyles.link} to="/login">Войти</Link></p>
                </div>
                </form>
            )}
        </>
    );
}
export default RegisterPage;