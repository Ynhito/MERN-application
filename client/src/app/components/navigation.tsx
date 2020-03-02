import React, { useContext } from 'react';
import { MenuItem } from '@material-ui/core';
import { AuthContext } from './../../context/AuthContext';
import {withRouter } from 'react-router-dom';

const Navigation = (props: any) => {

    const auth = useContext(AuthContext);
    const logout = () => {
        auth.logout();
    }

    return (
        <>
            <MenuItem onClick={() => {
                props.history.push(`/detail/${auth.userId}`)
            }}>
                Table
            </MenuItem>
            <MenuItem onClick={() => {
                props.history.push(`/chat`)
            }}>
                Chat
            </MenuItem>
            <MenuItem onClick={() => {
                props.history.push(`/create`)
            }}>
                Home
            </MenuItem>
            <MenuItem onClick={() => {
                props.history.push(`/gifts`)
            }}>
                Gifts
            </MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
        </>
    );
}

export default withRouter(Navigation);
