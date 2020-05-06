import React, { useContext } from 'react';
import { MenuItem, Button, Menu } from '@material-ui/core';
import { AuthContext } from './../../context/AuthContext';
import {withRouter } from 'react-router-dom';
import { RedirectHandler, RedirectConfig } from './redirect';
import { useRouter } from '../hooks/router.hook';
import { RedirectStudentConfig } from './../pages/School/students/redirect';
import { RedirectLessonsConfig } from './../pages/School/lessons/redirect';

const Navigation = (props: any) => {

    
    const [openMenu, setOpenMenu] = React.useState(false);

    const auth = useContext(AuthContext);
    const logout = () => {
        auth.logout();
    }

    const router = useRouter();

    return (
        <>
            {/* <MenuItem onClick={() => {
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
            </MenuItem> */}
            <MenuItem onClick={() => {
                    router.history.push(RedirectStudentConfig.list)
                }}>
                    Ученики
                </MenuItem>
                <MenuItem onClick={() => {
                    router.history.push(RedirectLessonsConfig.list)
                }}>Занятия</MenuItem>
                <MenuItem onClick={() => {
                    router.history.push(RedirectConfig.teachers())
                }}>Преподаватели</MenuItem>
                <MenuItem onClick={() => {
                    router.history.push(RedirectConfig.cources)
                }}>Курсы</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
            {/* <Button onClick={() => setOpenMenu(!openMenu)}>
                    Робототехника
            </Button>
            <Menu
                open={openMenu}
                onClose={() => setOpenMenu(false)}
            >
                <MenuItem onClick={() => {
                    router.history.push(RedirectStudentConfig.list)
                }}>
                    Ученики
                </MenuItem>
                <MenuItem onClick={() => {
                    router.history.push(RedirectLessonsConfig.list)
                }}>Занятия</MenuItem>
                <MenuItem onClick={() => {
                    router.history.push(RedirectConfig.teachers())
                }}>Преподаватели</MenuItem>
                <MenuItem onClick={() => {
                    router.history.push(RedirectConfig.cources)
                }}>Курсы</MenuItem>
            </Menu> */}
        </>
    );
}

export default withRouter(Navigation);
