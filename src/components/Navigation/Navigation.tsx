import { BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import NavigationLink from '../NavigationLink/NavigationLink';

import styles from './Navigation.module.css';

function Navigation() {
    return (
        <nav className={styles.navigation}>
            <NavigationLink icon={BurgerIcon} text="Конструктор" path="/" />
            <NavigationLink icon={ListIcon} text="Лента заказов" path="/feed" />
        </nav>
    );
}

export default Navigation;