import {createContext} from 'react';

function noop(token?:any, userId?:any) {};

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuthenticated: false
})