import React, { useContext } from 'react';
import classes from './styles.module.scss';
import { Button } from '@material-ui/core';
import { AuthContext } from '../../../context/AuthContext';
import {NavLink} from 'react-router-dom';

const CreatePage = () => {

    const auth = useContext(AuthContext);
    const logout = () => {
        auth.logout();
    }
    return (
        <div>
            <div className={classes.header}>
                <NavLink to={`/detail/${auth.userId}`}>
                    Detail
                </NavLink>
                <Button onClick={logout}>
                    Выйти
                </Button>
            </div>
        </div>
    );
}

export default CreatePage;