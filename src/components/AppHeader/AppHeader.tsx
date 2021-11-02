import { Link } from 'react-router-dom';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import Navigation from '../Navigation/Navigation';
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import styles from './AppHeader.module.css';

function AppHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <Navigation />
                <Link to="/">
                    <Logo />
                </Link>
                <ProfileHeader/>
            </div>
        </header>
    );
}

export default AppHeader;
