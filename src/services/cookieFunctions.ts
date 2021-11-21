export function setCookie(data: { accessToken: string; refreshToken: string }) {
    const accessToken = data.accessToken.split('Bearer ')[1];
    const refreshToken = data.refreshToken;
    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;
}

export function getRefreshTokenFromCookie() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)refreshToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
}

export function getAccessTokenFromCookie() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
}



