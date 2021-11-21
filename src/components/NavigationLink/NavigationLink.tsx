import { NavLink } from 'react-router-dom';
import styles from './NavigationLink.module.css';
import React from "react";
interface INavigationLink {
    path:string;
    text:string;
    icon:any;
}
const NavigationLink:React.FC<INavigationLink>=({ icon: Component, text, path })=> {
    return (
        <span className={`${styles.link} text_color_inactive pl-5 pr-5 pt-4 pb-4 mt-4 mb-4`}>
      <Component type="secondary" />
      <NavLink
          className={`${styles.linkText} text text_type_main-default text_color_inactive ml-2`}
          activeClassName={styles.linkTextActive}
          to={path}
          exact={true}
      >
        {text}
      </NavLink>
    </span>
    );
}

/*NavigationLink.propTypes = {
    icon: PropTypes.elementType.isRequired,
    text: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
};*/

export default NavigationLink;
