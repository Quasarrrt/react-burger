import { Route, Redirect } from 'react-router-dom';
import {getRefreshTokenFromCookie} from "../../services/cookieFunctions";


function ProtectedRoute({ children, ...rest }) {
    const isLogin = !!getRefreshTokenFromCookie();

    return (
        <Route
            {...rest}
            render={(location) => {
                return isLogin ? children : <Redirect to={{ pathname: '/login', from: location }} />;
            }}
        />
    );
}

export default ProtectedRoute;