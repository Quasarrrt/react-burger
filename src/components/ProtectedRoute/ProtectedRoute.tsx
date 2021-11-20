import { Route, Redirect, RouteProps } from 'react-router-dom';
import {getRefreshTokenFromCookie} from "../../services/cookieFunctions";
import React, { FC }  from "react";

const ProtectedRoute: FC<RouteProps>=({ children, ...rest })=> {
    const isLogin = !!getRefreshTokenFromCookie();
    return (
        <Route
            {...rest}
            render={({location}) => {
                return isLogin ? (children) : (<Redirect to={{ pathname: '/login',  state: { from: location }}} />);
            }}
        />
    );
}

export default ProtectedRoute;