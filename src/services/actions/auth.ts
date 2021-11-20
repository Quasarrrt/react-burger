import { getRefreshTokenFromCookie, setCookie} from "../cookieFunctions";
import authApi from "../api/authApi";
import {AppDispatch, AppThunk, TAppActions} from "../store";
import {UPDATE_USER_REQUEST, UPDATE_USER_FAIL, UPDATE_USER_SUCCESS,
    GET_USER_FAIL, GET_USER_REQUEST, GET_USER_SUCCESS,
REFRESH_TOKEN_FAIL, REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS,
    LOGOUT_REQUEST, LOGOUT_FAIL, LOGOUT_SUCCESS,
    REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS,
    LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS,
    FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_REQUEST,
    RESET_PASSWORD_REQUEST, RESET_PASSWORD_FAIL, RESET_PASSWORD_SUCCESS,
} from "../types/auth";


export const register: AppThunk = (email: string, password: string, name: string) =>
    (dispatch: AppDispatch) => {
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


export const login :AppThunk = (email: string, password: string) => (dispatch: AppDispatch) => {

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
                    localStorage.setItem('token', data.accessToken.split('Bearer ')[1]);
                    setCookie(data);
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch({ type: LOGIN_FAIL });
            });
    };

export const forgotPassword: AppThunk = (email:string) => (dispatch: AppDispatch) => {
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


export const resetPassword: AppThunk = (password: string, token: string) => (dispatch: AppDispatch) => {

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
export const logout: AppThunk = (token:string) => (dispatch: AppDispatch) =>{

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


export const refreshToken: AppThunk =(token: string, next: TAppActions) => (dispatch: AppDispatch) => {
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
            if (next) {
                dispatch(next);
            }
        })
        .catch((err) => {
            console.log(err);
            dispatch({ type: REFRESH_TOKEN_FAIL });
        });
};


export const getUserInfo: AppThunk = () => (dispatch: AppDispatch| AppThunk) => {
    const token: string|null = localStorage.getItem('token')
        dispatch({ type: GET_USER_REQUEST });
if(token){
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
                dispatch(refreshToken(tokenRefresh, () => getUserInfo()));
            } else {
                console.log(err);
            }
            dispatch({ type: GET_USER_FAIL });
        });
}

    };


export const updateUserInfo: AppThunk =(token: string, name: string, email: string, password: string) =>
    (dispatch: AppDispatch | AppThunk) => {

        dispatch({ type: UPDATE_USER_REQUEST });
    return authApi
        .updateUserInfo(token, name, email, password)
            .then((data) => {
                if (data.success) {
                    dispatch({
                        type: UPDATE_USER_SUCCESS,
                        user: {name, email, password},
                    });
                } else {
                    throw data;
                }
            })
            .catch((err) => {
                if (err.message === 'jwt expired') {
                    const tokenRefresh = getRefreshTokenFromCookie();
                    dispatch(refreshToken(tokenRefresh, () => getUserInfo()));
                } else {
                    console.log(err);
                }
                dispatch({type: UPDATE_USER_FAIL});
            });
    };





