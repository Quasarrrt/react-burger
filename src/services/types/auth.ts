export const LOGIN_REQUEST:'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS:'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_FAIL:'LOGIN_FAIL' = 'LOGIN_FAIL';

export const LOGOUT_REQUEST:'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS:'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL:'LOGOUT_FAIL' = 'LOGOUT_FAIL';

export const REGISTER_REQUEST:'REGISTER_REQUEST' = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS:'REGISTER_SUCCESS' = 'REGISTER_SUCCESS';
export const REGISTER_FAIL:'REGISTER_FAIL' = 'REGISTER_FAIL';

export const FORGOT_PASSWORD_REQUEST:'FORGOT_PASSWORD_REQUEST' = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS'= 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAIL:'FORGOT_PASSWORD_FAIL' = 'FORGOT_PASSWORD_FAIL';

export const RESET_PASSWORD_REQUEST:'RESET_PASSWORD_REQUEST' = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS:'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAIL:'RESET_PASSWORD_FAIL' = 'RESET_PASSWORD_FAIL';

export const GET_USER_REQUEST:'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS:'GET_USER_SUCCESS'= 'GET_USER_SUCCESS';
export const GET_USER_FAIL:'GET_USER_FAIL' = 'GET_USER_FAIL';

export const UPDATE_USER_REQUEST:'UPDATE_USER_REQUEST' = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS:'UPDATE_USER_SUCCESS' = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAIL:'UPDATE_USER_FAIL' = 'UPDATE_USER_FAIL';

export const REFRESH_TOKEN_REQUEST:'REFRESH_TOKEN_REQUEST' = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS:'REFRESH_TOKEN_SUCCESS' = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAIL:'REFRESH_TOKEN_ERROR' = 'REFRESH_TOKEN_ERROR';

export type TUser = {
    email: string;
    name: string;
};


type TRegisterStartAction = {
    readonly type: typeof REGISTER_REQUEST;
}

type TRegisterSuccessAction = {
    readonly type: typeof REGISTER_SUCCESS;
    accessToken: string;
    refreshToken: string;
    user: TUser;
}

type TRegisterFailedAction = {
    readonly type: typeof REGISTER_FAIL;

}

type TLoginTypeAction = {
    readonly type: typeof LOGIN_REQUEST;
}

type TLoginSuccessAction = {
    readonly type: typeof LOGIN_SUCCESS;
    accessToken: string;
    refreshToken: string;
    user: TUser;
}

type TLoginFailedAction = {
    readonly type: typeof LOGIN_FAIL;

}

type TGetUserStartAction = {
    readonly type: typeof GET_USER_REQUEST;
}

type TGetUserSuccessAction = {
    readonly type: typeof GET_USER_SUCCESS;
    user: TUser;
}
type TGetUserFailedAction = {
    readonly type: typeof GET_USER_FAIL;

}


type TUpdateUserStartAction = {
    readonly type: typeof UPDATE_USER_REQUEST;
}

type TUpdateUserSuccessAction = {
    readonly type: typeof UPDATE_USER_SUCCESS;
    user: TUser;
}

type TUpdateUserFailedAction = {
    readonly type: typeof UPDATE_USER_FAIL;

}

type TLogoutStartAction = {
    readonly type: typeof LOGOUT_REQUEST;
}

type TLogoutSuccessAction = {
    readonly type: typeof LOGOUT_SUCCESS;
}

type TLogoutFailedAction = {
    readonly type: typeof LOGOUT_FAIL;

}

type TResetPasswordStartAction = {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}

type TResetPasswordSuccessAction = {
    readonly type: typeof RESET_PASSWORD_SUCCESS;

}

type TResetPasswordFailedAction = {
    readonly type: typeof RESET_PASSWORD_FAIL;

}

type TForgotPasswordStartAction = {
    readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

type TForgotPasswordSuccessAction = {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS;

}

type TForgotPasswordFailedAction = {
    readonly type: typeof FORGOT_PASSWORD_FAIL;

}
type TRefreshTokenStartAction = {
    readonly type: typeof REFRESH_TOKEN_REQUEST;
}
type TRefreshTokenSuccessAction = {
    readonly type: typeof REFRESH_TOKEN_SUCCESS;
    accessToken: string;
    refreshToken: string;

}
type TRefreshTokenFailedAction = {
    readonly type: typeof REFRESH_TOKEN_FAIL;

}

export type TAuthState = {
    user: {
        email: string,
        name: string,
    },
    accessToken: string,
    refreshToken: string,
    registerRequest: boolean,
    registerSuccess: boolean,
    registerError: boolean,
    loginRequest: boolean,
    loginSuccess: boolean,
    loginError: boolean,
    forgotPasswordRequest: boolean,
    forgotPasswordSuccess: boolean,
    forgotPasswordError: boolean,
    resetPasswordRequest: boolean,
    resetPasswordSuccess: boolean,
    resetPasswordError: boolean,
    logoutRequest: boolean,
    logoutSuccess: boolean,
    logoutError: boolean,
    refreshTokenRequest: boolean,
    refreshTokenSuccess: boolean,
    refreshTokenError: boolean,
    getUserInfoRequest: boolean,
    getUserInfoSuccess: boolean,
    getUserInfoError: boolean,
    updateUserInfoRequest: boolean,
    updateUserInfoSuccess: boolean,
    updateUserInfoError: boolean,
}

export type TAuthActions =
    | TRegisterStartAction
    | TRegisterSuccessAction
    | TRegisterFailedAction
    | TLoginTypeAction
    | TLoginSuccessAction
    | TLoginFailedAction
    | TGetUserStartAction
    | TGetUserSuccessAction
    | TGetUserFailedAction
    | TUpdateUserStartAction
    | TUpdateUserSuccessAction
    | TUpdateUserFailedAction
    | TLogoutStartAction
    | TLogoutSuccessAction
    | TLogoutFailedAction
    | TResetPasswordStartAction
    | TResetPasswordSuccessAction
    | TResetPasswordFailedAction
    | TForgotPasswordStartAction
    | TForgotPasswordSuccessAction
    | TForgotPasswordFailedAction
    | TRefreshTokenStartAction
    | TRefreshTokenFailedAction
    | TRefreshTokenSuccessAction