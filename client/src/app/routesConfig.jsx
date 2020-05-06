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
import StudentsTable from './pages/School/students/pages/list/index';
import AccountsTable from './pages/School/visit/index';
import LessonsTable from './pages/School/lessons/pages/list';
import CoursesTable from './pages/School/cources/pages/list/index';
import TeachersTable from './pages/School/teachers/index';
import CoursesInfo from './pages/School/cources/pages/info/info';
import StudentCreateForm from './pages/School/students/pages/create/index';
import CourseCreateForm from './pages/School/cources/pages/create/index';
import { RedirectLessonsConfig } from './pages/School/lessons/redirect';
import LessonCreateForm from './pages/School/lessons/pages/create/index';
import LessonInfoTable from './pages/School/lessons/pages/info/index';

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
                <Route path="/students/list" exact>
                    <StudentsTable />
                </Route>
                <Route path="/teachers/:id?" exact>
                    <TeachersTable />
                </Route>
                <Route path={RedirectLessonsConfig.list} exact>
                    <LessonsTable />
                </Route>
                <Route path={RedirectLessonsConfig.create} exact>
                    <LessonCreateForm />
                </Route>
                <Route path="/lessons/info/:courseId/:lessonId" exact>
                    <LessonInfoTable />
                </Route>
                <Route path="/cources/list" exact>
                    <CoursesTable />
                </Route>
                <Route path="/cources/info/:id" exact>
                    <CoursesInfo />
                </Route>
                <Route path="/cources/create" exact>
                    <CourseCreateForm />
                </Route>
                <Route path="/students/create" exact>
                    <StudentCreateForm />
                </Route>
                <Route path="/accounts/:id" exact>
                    <AccountsTable />
                </Route>
                <Redirect to="/cources/list" />
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