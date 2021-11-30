import {
    FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS,
    GET_USER_FAIL, GET_USER_REQUEST, GET_USER_SUCCESS,
    LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS,
    LOGOUT_FAIL, LOGOUT_REQUEST, LOGOUT_SUCCESS,
    REFRESH_TOKEN_FAIL, REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS,
    REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS,
    RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS,
    UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS
} from '../types/auth'
import {authReducer} from "./auth";
const testAuthInitialState = {
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
const testUser = {
    email: 'test@test.com',
    name: 'Test',
};

const testAccessToken = 'AccessToken';
const testRefreshToken = 'RefreshToken';


describe('authReducer', () => {
    it('should return the initial state', () => {
        expect(authReducer(undefined, {})).toEqual(testAuthInitialState);
    });

    it('should handle REGISTER_REQUEST', () => {
        expect(
            authReducer(testAuthInitialState, {
                type: REGISTER_REQUEST,
            }),
        ).toEqual(
            expect.objectContaining({
                registerRequest: true,
                registerSuccess: false,
                registerError: false,
            }),
        );
    });

    it('should handle REGISTER_SUCCESS', () => {
        expect(
            authReducer(testAuthInitialState, {
                type: REGISTER_SUCCESS,
                user: testUser,
                accessToken: testAccessToken,
                refreshToken: testRefreshToken,
            }),
        ).toEqual(
            expect.objectContaining({
                registerSuccess: true,
                accessToken: testAccessToken,
                refreshToken: testRefreshToken,
                user: testUser,
            }),
        );
    });

    it('should handle REGISTER_FAIL', () => {
        expect(
            authReducer(testAuthInitialState, {
                type: REGISTER_FAIL,
            }),
        ).toEqual(
            expect.objectContaining({
                registerRequest: false,
                registerSuccess: false,
                registerError: true,
            }),
        );
    });

    it('should handle LOGIN_REQUEST', () => {
        expect(
            authReducer(testAuthInitialState, {
                type: LOGIN_REQUEST,
            }),
        ).toEqual(
            expect.objectContaining({
                loginRequest: true,
                loginSuccess: false,
                loginError: false,
            }),
        );
    });

    it('should handle LOGIN_SUCCESS', () => {
        expect(
            authReducer(testAuthInitialState, {
                type: LOGIN_SUCCESS,
                user: testUser,
                accessToken: testAccessToken,
                refreshToken: testRefreshToken,
            }),
        ).toEqual(
            expect.objectContaining({
                loginRequest: false,
                loginSuccess: true,
                logoutSuccess: false,
                accessToken: testAccessToken,
                refreshToken: testRefreshToken,
                user: testUser,
            }),
        );
    });

    it('should handle LOGIN_FAIL', () => {
        expect(
            authReducer(testAuthInitialState, {
                type: LOGIN_FAIL,
            }),
        ).toEqual(
            expect.objectContaining({
                loginRequest: false,
                loginSuccess: false,
                loginError: true,
            }),
        );
    });

    it('should handle FORGOT_PASSWORD_REQUEST', () => {
        expect(
            authReducer(testAuthInitialState, {
                type: FORGOT_PASSWORD_REQUEST,
            }),
        ).toEqual(
            expect.objectContaining({
                forgotPasswordRequest: true,
                forgotPasswordSuccess: false,
                forgotPasswordError: false,
            }),
        );
    });

    it('should handle FORGOT_PASSWORD_SUCCESS', () => {
        expect(
            authReducer(testAuthInitialState, {
                type: FORGOT_PASSWORD_SUCCESS,
            }),
        ).toEqual(
            expect.objectContaining({
                forgotPasswordRequest: false,
                forgotPasswordSuccess: true,
            }),
        );
    });

    it('should handle FORGOT_PASSWORD_FAIL', () => {
        expect(
            authReducer(testAuthInitialState, {
                type: FORGOT_PASSWORD_FAIL,
            }),
        ).toEqual(
            expect.objectContaining({
                forgotPasswordRequest: false,
                forgotPasswordSuccess: false,
                forgotPasswordError: true,
            }),
        );
    });

    it('should handle RESET_PASSWORD_REQUEST', () => {
        expect(
            authReducer(testAuthInitialState, {
                type: RESET_PASSWORD_REQUEST,
            }),
        ).toEqual(
            expect.objectContaining({
                resetPasswordRequest: true,
                resetPasswordSuccess: false,
                resetPasswordError: false,
            }),
        );
    });

    it('should handle RESET_PASSWORD_SUCCESS', () => {
        expect(
            authReducer(testAuthInitialState, {
                type: RESET_PASSWORD_SUCCESS,
            }),
        ).toEqual(
            expect.objectContaining({
                resetPasswordRequest: false,
                resetPasswordSuccess: true,
            }),
        );
    });

    it('should handle RESET_PASSWORD_FAIL', () => {
        expect(
            authReducer(testAuthInitialState, {
                type: RESET_PASSWORD_FAIL,
            }),
        ).toEqual(
            expect.objectContaining({
                resetPasswordRequest: false,
                resetPasswordSuccess: false,
                resetPasswordError: true,
            }),
        );
    });

    it('should handle LOGOUT_REQUEST', () => {
        expect(
            authReducer(testAuthInitialState, {
                type: LOGOUT_REQUEST,
            }),
        ).toEqual(
            expect.objectContaining({
                logoutRequest: true,
                logoutSuccess: false,
                logoutError: false,
            }),
        );
    });

    it('should handle LOGOUT_SUCCESS', () => {
        expect(
            authReducer(testAuthInitialState, {
                type: LOGOUT_SUCCESS,
            }),
        ).toEqual(
            expect.objectContaining({
                logoutRequest: false,
                logoutSuccess: true,
                loginSuccess: false,
                accessToken: testAuthInitialState.accessToken,
                refreshToken: testAuthInitialState.refreshToken,
                user:testAuthInitialState.user,
            }),
        );
    });

    it('should handle LOGOUT_FAIL', () => {
        expect(
            authReducer(testAuthInitialState, {
                type: LOGOUT_FAIL,
            }),
        ).toEqual(
            expect.objectContaining({
                logoutRequest: false,
                logoutSuccess: false,
                logoutError: true,
            }),
        );
    });

    it('should handle REFRESH_TOKEN_REQUEST', () => {
        expect(
            authReducer(testAuthInitialState, {
                type: REFRESH_TOKEN_REQUEST,
            }),
        ).toEqual(
            expect.objectContaining({
                refreshTokenRequest: true,
                refreshTokenSuccess: false,
                refreshTokenError: false,
            }),
        );
    });

    it('should handle REFRESH_TOKEN_SUCCESS', () => {
        expect(
            authReducer(testAuthInitialState, {
                type: REFRESH_TOKEN_SUCCESS,
                accessToken: testAccessToken,
                refreshToken: testRefreshToken,
            }),
        ).toEqual(
            expect.objectContaining({
                refreshTokenRequest: false,
                refreshTokenSuccess: true,
                accessToken: testAccessToken,
                refreshToken: testRefreshToken,
            }),
        );
    });

    it('should handle REFRESH_TOKEN_FAIL', () => {
        expect(
            authReducer(testAuthInitialState, {
                type: REFRESH_TOKEN_FAIL,
            }),
        ).toEqual(
            expect.objectContaining({
                refreshTokenRequest: false,
                refreshTokenSuccess: false,
                refreshTokenError: true,
            }),
        );
    });

    it('should handle GET_USER_REQUEST', () => {
        expect(
            authReducer(testAuthInitialState, {
                type: GET_USER_REQUEST,
            }),
        ).toEqual(
            expect.objectContaining({
                getUserInfoRequest: true,
                getUserInfoSuccess: false,
                getUserInfoError: false,
            }),
        );
    });

    it('should handle GET_USER_SUCCESS', () => {
        expect(
            authReducer(testAuthInitialState, {
                type: GET_USER_SUCCESS,
                user: testUser,
            }),
        ).toEqual(
            expect.objectContaining({
                getUserInfoRequest: false,
                getUserInfoSuccess: true,
                user: testUser,
            }),
        );
    });

    it('should handle GET_USER_FAIL', () => {
        expect(
            authReducer(testAuthInitialState, {
                type: GET_USER_FAIL,
            }),
        ).toEqual(
            expect.objectContaining({
                getUserInfoRequest: false,
                getUserInfoSuccess: false,
                getUserInfoError: true,
            }),
        );
    });

    it('should handle UPDATE_USER_REQUEST', () => {
        expect(
            authReducer(testAuthInitialState, {
                type: UPDATE_USER_REQUEST,
            }),
        ).toEqual(
            expect.objectContaining({
                updateUserInfoRequest: true,
                updateUserInfoSuccess: false,
                updateUserInfoError: false,
            }),
        );
    });

    it('should handle UPDATE_USER_SUCCESS', () => {
        expect(
            authReducer(testAuthInitialState, {
                type: UPDATE_USER_SUCCESS,
                user: testUser,
            }),
        ).toEqual(
            expect.objectContaining({
                updateUserInfoRequest: false,
                updateUserInfoSuccess: true,
                user: testUser,
            }),
        );
    });

    it('should handle UPDATE_USER_FAIL', () => {
        expect(
            authReducer(testAuthInitialState, {
                type: UPDATE_USER_FAIL,
            }),
        ).toEqual(
            expect.objectContaining({
                updateUserInfoRequest: false,
                updateUserInfoSuccess: false,
                updateUserInfoError: true,
            }),
        );
    });
});