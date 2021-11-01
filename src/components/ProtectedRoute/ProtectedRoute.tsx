import { Route, Redirect } from 'react-router-dom';
import {getRefreshTokenFromCookie} from "../../services/cookieFunctions";
import React, { FC }  from "react";

interface IProtectedRoute {
    path:string;
    exact: boolean;
}

const ProtectedRoute: FC<IProtectedRoute>=({ children, ...rest })=> {
    const isLogin = !!getRefreshTokenFromCookie();
    return (
        <Route
            {...rest}
            render={(location) => {
                return isLogin ? (children) : (<Redirect to={{ pathname: '/login'}} />);
            }}
        />
    );
}

export default ProtectedRoute;