import {
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS, GET_USER_FAIL,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    REFRESH_TOKEN_FAIL,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    TAuthActions,
    TAuthState,
    UPDATE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS
} from '../types/auth'

const authInitialState: TAuthState = {
    user: {
        email: '',
        name: '',
    },
    accessToken: '',
    refreshToken: '',
    registerRequest: false,
    registerSuccess: false,
    registerError: false,
    loginRequest: false,
    loginSuccess: false,
    loginError: false,
    forgotPasswordRequest: false,
    forgotPasswordSuccess: false,
    forgotPasswordError: false,
    resetPasswordRequest: false,
    resetPasswordSuccess: false,
    resetPasswordError: false,
    logoutRequest: false,
    logoutSuccess: false,
    logoutError: false,
    refreshTokenRequest: false,
    refreshTokenSuccess: false,
    refreshTokenError: false,
    getUserInfoRequest: false,
    getUserInfoSuccess: false,
    getUserInfoError: false,
    updateUserInfoRequest: false,
    updateUserInfoSuccess: false,
    updateUserInfoError: false,
};

export const authReducer = (state = authInitialState, action:TAuthActions) :TAuthState=> {
    switch (action.type) {
        case REGISTER_REQUEST: {
            return {
                ...state,
                registerRequest: true,
                registerSuccess: false,
                registerError: false,
            };
        }
        case REGISTER_SUCCESS: {
            return {
                ...state,
                registerSuccess: true,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
                user: action.user,
            };
        }
        case REGISTER_FAIL: {
            return {
                ...state,
                registerRequest: false,
                registerSuccess: false,
                registerError: true,
            };
        }
        case LOGIN_REQUEST: {
            return {
                ...state,
                loginRequest: true,
                loginSuccess: false,
                loginError: false,
            };
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                loginRequest: false,
                loginSuccess: true,
                logoutSuccess: false,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
                user: action.user,
            };
        }
        case LOGIN_FAIL: {
            return {
                ...state,
                loginRequest: false,
                loginSuccess: false,
                loginError: true,
            };
        }
        case FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                forgotPasswordRequest: true,
                forgotPasswordSuccess: false,
                forgotPasswordError: false,
            };
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                forgotPasswordRequest: false,
                forgotPasswordSuccess: true,
            };
        }
        case FORGOT_PASSWORD_FAIL: {
            return {
                ...state,
                forgotPasswordRequest: false,
                forgotPasswordSuccess: false,
                forgotPasswordError: true,
            };
        }
        case RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                resetPasswordRequest: true,
                resetPasswordSuccess: false,
                resetPasswordError: false,
            };
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordSuccess: true,
            };
        }
        case RESET_PASSWORD_FAIL: {
            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordSuccess: false,
                resetPasswordError: true,
            };
        }
        case LOGOUT_REQUEST: {
            return {
                ...state,
                logoutRequest: true,
                logoutSuccess: false,
                logoutError: false,
            };
        }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                logoutRequest: false,
                logoutSuccess: true,
                loginSuccess: false,
                accessToken: authInitialState.accessToken,
                refreshToken: authInitialState.refreshToken,
                user: authInitialState.user,
            };
        }
        case LOGOUT_FAIL: {
            return {
                ...state,
                logoutRequest: false,
                logoutSuccess: false,
                logoutError: true,
            };
        }
        case REFRESH_TOKEN_REQUEST: {
            return {
                ...state,
                refreshTokenRequest: true,
                refreshTokenSuccess: false,
                refreshTokenError: false,
            };
        }
        case REFRESH_TOKEN_SUCCESS: {
            return {
                ...state,
                refreshTokenRequest: false,
                refreshTokenSuccess: true,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
            };
        }
        case REFRESH_TOKEN_FAIL: {
            return {
                ...state,
                refreshTokenRequest: false,
                refreshTokenSuccess: false,
                refreshTokenError: true,
            };
        }
        case GET_USER_REQUEST: {
            return {
                ...state,
                getUserInfoRequest: true,
                getUserInfoSuccess: false,
                getUserInfoError: false,
            };
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                getUserInfoRequest: false,
                getUserInfoSuccess: true,
                user: action.user,
            };
        }
        case GET_USER_FAIL: {
            return {
                ...state,
                getUserInfoRequest: false,
                getUserInfoSuccess: false,
                getUserInfoError: true,
            };
        }
        case UPDATE_USER_REQUEST: {
            return {
                ...state,
                updateUserInfoRequest: true,
                updateUserInfoSuccess: false,
                updateUserInfoError: false,
            };
        }
        case UPDATE_USER_SUCCESS: {
            return {
                ...state,
                updateUserInfoRequest: false,
                updateUserInfoSuccess: true,
                user: action.user,
            };
        }
        case UPDATE_USER_FAIL: {
            return {
                ...state,
                updateUserInfoRequest: false,
                updateUserInfoSuccess: false,
                updateUserInfoError: true,
            };
        }
        default: {
            return state;
        }
    }
};
