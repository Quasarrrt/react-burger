import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import headerStyles from './AppHeader.module.css';

const AppHeader = () => {
    return (
        <header className={headerStyles.header}>
            <nav  className={headerStyles.nav}>
                <div className={["pt-4 pb-4", headerStyles.menuWrapper].join(' ')}>
                    <div className={["pr-5 pl-5 pt-4 pb-4", headerStyles.menu].join(' ')} >
                        <div className="pr-2">
                            <BurgerIcon type="primary" />
                        </div>
                        <p className="text text_type_main-default">
                        Конструктор
                        </p>
                    </div>
                    <div className={["pr-5 pl-5 pt-4 pb-4", headerStyles.menu].join(' ')}>
                        <div className="pr-2">
                            <ListIcon type="primary" />
                        </div>
                        <p className="text text_type_main-default text_color_inactive">
                        Лента заказов
                        </p>
                    </div>
                </div>
                <div className={["mt-6 mb-6",  headerStyles.logo].join(' ')}>
                    <Logo/>
                </div>
                <div className={["pt-4 pb-4", headerStyles.profile].join(' ')}>
                    <div className={["pr-5 pl-5 pt-4 pb-4", headerStyles.menu].join(' ')}>
                        <div className="pr-2">
                            <ProfileIcon type="primary" />
                        </div>
                        <p className="text text_type_main-default text_color_inactive">
                        Личный кабинет
                        </p>
                    </div>
                </div>
            </nav>
       </header>
    );
};

export default AppHeader;