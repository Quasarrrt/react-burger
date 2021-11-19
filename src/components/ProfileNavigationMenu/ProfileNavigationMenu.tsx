import { NavLink } from 'react-router-dom';

import profileNavigationStyles from './ProfileNavigationMenu.module.css';

interface IProfileNavigationMenu {
    handleLogout: () => void;
    menuText: string
}

const ProfileNavigationMenu: React.FC<IProfileNavigationMenu> = ({handleLogout, menuText,}) => {
    return (
        <div className={`${profileNavigationStyles.linkContainer} mt-30 mr-15`}>
            <NavLink
                to={'/profile'}
                exact={true}
                className={`${profileNavigationStyles.link} text text_type_main-medium text_color_inactive`}
                activeClassName={profileNavigationStyles.linkActive}
            >
                Профиль
            </NavLink>
            <NavLink
                to={'/profile/orders'}
                exact={true}
                className={`${profileNavigationStyles.link} text text_type_main-medium text_color_inactive`}
                activeClassName={profileNavigationStyles.linkActive}
            >
                История заказов
            </NavLink>
            <button
                className={`${profileNavigationStyles.button} text text_type_main-medium text_color_inactive`}
                onClick={handleLogout}
            >
                Выход
            </button>
            <p className={`${profileNavigationStyles.paragraph} text text_type_main-default text_color_inactive mt-20`}>
                {menuText}
            </p>
        </div>
    );
};

export default ProfileNavigationMenu;
