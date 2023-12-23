let saveToken = (token) => {
    sessionStorage.setItem('token', token);
}

let logout = () => {
    sessionStorage.removeItem('token');
}

let isLogged = () => {
    let token = sessionStorage.getItem('token');
    return !!token
}


export const accountService = {saveToken, logout, isLogged}