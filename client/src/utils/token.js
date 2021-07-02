/**
 * storing token functions here for now, may move to actions later
 */

import decode from 'jwt-decode';

export const expiredToken = (token) => {
    return decode(token).exp < (Date.now() / 1000);     
}

export const getToken = () => {
    return localStorage.getItem('little_guy_token');
}

export const saveToken = (token) => {
    return localStorage.setItem('little_guy_token', token);
}

export const removeToken = () => {
    return localStorage.removeItem('little_guy_token');
}