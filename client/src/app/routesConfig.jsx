import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LinksPage from './pages/links/LinksPage';
import CreatePage from './pages/create/CreatePage';
import DetailPage from './pages/detail/DetailPage';
import AuthPage from './pages/auth/AuthPage';
import RegisterPage from './pages/register/RegisterPage';
import ChatPage from './pages/chat/ChatPage';
import GiftsPage from './pages/gifts/GiftsPage';
import GiftView from './pages/gifts/pages/GiftView/index';
import { Menu, MenuItem, Button } from '@material-ui/core';
import StudentsTable from './pages/School/students/index';
import AccountsTable from './pages/School/accounts/index';
import LessonsTable from './pages/School/lessons/lessons';
import CoursesTable from './pages/School/cources/index';
import TeachersTable from './pages/School/teachers/index';

export const useRoutes = isAuth => {

    if (isAuth) {
        return (
            <Switch>
                <Route path="/links" exact>
                    <LinksPage />
                </Route>
                <Route path="/create" exact>
                    <CreatePage />
                </Route>
                <Route path="/detail/:id">
                    <DetailPage />
                </Route>
                <Route path="/chat">
                    <ChatPage />
                </Route>
                <Route path="/gifts" exact>
                    <GiftsPage />
                </Route>
                <Route path="/gifts/view/:id" exact>
                    <GiftView />
                </Route>
                <Route path="/students" exact>
                    <StudentsTable />
                </Route>
                <Route path="/teachers/:id?" exact>
                    <TeachersTable />
                </Route>
                <Route path="/lessons/:id?" exact>
                    <LessonsTable />
                </Route>
                <Route path="/cources/:id?" exact>
                    <CoursesTable />
                </Route>
                <Route path="/accounts/:id" exact>
                    <AccountsTable />
                </Route>
                <Redirect to="/create" />
            </Switch>
        );
    }
    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Route path="/register" exact>
                <RegisterPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    );
}