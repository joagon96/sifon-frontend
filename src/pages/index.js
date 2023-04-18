// Forms
export function isValidJwt (jwt) {
    return (!jwt || jwt.split('.').length < 3) 
}