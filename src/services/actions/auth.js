import {getAccessTokenFromCookie, getRefreshTokenFromCookie, setCookie} from "../cookieFunctions";
import authApi from "../api/api";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAIL = 'FORGOT_PASSWORD_FAIL';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAIL = 'RESET_PASSWORD_FAIL';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAIL = 'GET_USER_FAIL';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';

export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAIL = 'REFRESH_TOKEN_ERROR';

export function register(email, password, name) {
    return function (dispatch) {
        dispatch({ type: REGISTER_REQUEST });

        return authApi
            .register(email, password, name)
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: REGISTER_SUCCESS,
                        user: data.user,
                        accessToken: data.accessToken.split('Bearer ')[1],
                        refreshToken: data.refreshToken,
                    });
                    setCookie(data);
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch({ type: REGISTER_FAIL });
            });
    };
}

export function login(email, password) {
    return function (dispatch) {
        dispatch({ type: LOGIN_REQUEST });

        return authApi
            .login(email, password)
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: LOGIN_SUCCESS,
                        user: data.user,
                        accessToken: data.accessToken.split('Bearer ')[1],
                        refreshToken: data.refreshToken,
                    });
                    setCookie(data);
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch({ type: LOGIN_FAIL });
            });
    };
}

export function forgotPassword(email) {
    return function (dispatch) {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        return authApi
            .forgotPassword(email)
            .then((data) => {
                if (data.success) {
                    console.log(data.message);
                    dispatch({
                        type: FORGOT_PASSWORD_SUCCESS,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch({ type: FORGOT_PASSWORD_FAIL });
            });
    };
}

export function resetPassword(password, token) {
    return function (dispatch) {
        dispatch({ type: RESET_PASSWORD_REQUEST });

        return authApi
            .resetPassword(password, token)
            .then((data) => {
                if (data.success) {
                    console.log(data.message);
                    dispatch({
                        type: RESET_PASSWORD_SUCCESS,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch({ type: RESET_PASSWORD_FAIL });
            });
    };
}
export function logout(token) {
    return function (dispatch) {
        dispatch({ type: LOGOUT_REQUEST });

        return authApi
            .logout(token)
            .then((data) => {
                if (data.success) {
                    console.log(data.message);
                    dispatch({
                        type: LOGOUT_SUCCESS,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch({ type: LOGOUT_FAIL });
            });
    };
}

export function refreshToken(token) {
    return function (dispatch) {
        dispatch({ type: REFRESH_TOKEN_REQUEST });

        return authApi
            .refreshToken(token)
            .then((data) => {
                if (data.success) {
                    const accessToken = data.accessToken.split('Bearer ')[1];
                    const refreshToken = data.refreshToken;
                    document.cookie = `accessToken=${accessToken}`;
                    document.cookie = `refreshToken=${refreshToken}`;
                    dispatch({
                        type: REFRESH_TOKEN_SUCCESS,
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch({ type: REFRESH_TOKEN_FAIL });
            });
    };
}

export function getUserInfo(token) {
    return function (dispatch) {
        dispatch({ type: GET_USER_REQUEST });

        return authApi
            .getUserInfo(token)
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: GET_USER_SUCCESS,
                        user: data.user,
                    });
                } else {
                    throw data;
                }
            })
            .catch((err) => {
                if (err.message === 'jwt expired') {
                    const tokenRefresh = getRefreshTokenFromCookie();
                    dispatch(refreshToken(tokenRefresh));
                    const tokenAccess = getAccessTokenFromCookie();
                    dispatch(getUserInfo(tokenAccess));
                } else {
                    console.log(err);
                }
                dispatch({ type: GET_USER_FAIL });
            });
    };
}

export function updateUserInfo(token, name, email, password) {
    return function (dispatch) {
        dispatch({ type: UPDATE_USER_REQUEST });

        return authApi
            .updateUserInfo(token, name, email, password)
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: UPDATE_USER_SUCCESS,
                        user: { name, email, password },
                    });
                } else {
                    throw data;
                }
            })
            .catch((err) => {
                if (err.message === 'jwt expired') {
                    const tokenRefresh = getRefreshTokenFromCookie();
                    dispatch(refreshToken(tokenRefresh));
                    const tokenAccess = getAccessTokenFromCookie();
                    dispatch(updateUserInfo(tokenAccess, name, email, password));
                } else {
                    console.log(err);
                }
                dispatch({ type: UPDATE_USER_FAIL });
            });
    };
}




