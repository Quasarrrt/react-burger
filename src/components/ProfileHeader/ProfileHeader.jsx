import NavigationLink from '../NavigationLink/NavigationLink';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ProfileHeader.module.css'

function ProfileHeader() {
    return (
        <div className={styles.profileLink}>
            <NavigationLink icon={ProfileIcon} text="Личный кабинет" path="/profile" />
        </div>
    );
}

export default ProfileHeader;
