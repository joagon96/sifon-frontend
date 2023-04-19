
export function isValidJwt (jwt) {
    return (jwt && jwt.split('.').length >= 3) 
}

export function isAdmin (role) {
    return role === 'admin' 
}