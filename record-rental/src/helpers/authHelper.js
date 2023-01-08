export function getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
}

export function isAuthenticated() {
    const user = getCurrentUser();
    if (user) {
        return true;
    }
    return false;
}

export function getCurrentUserToken() {
    const user = getCurrentUser();
    let token;
    if (user && user.token) {
        token = user.token;
    }
    return token;
}