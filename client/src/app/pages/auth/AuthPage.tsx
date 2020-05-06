import React, { useEffect, useState, useContext } from 'react';
import { Button, TextField, Snackbar, Box } from '@material-ui/core';
import classes from './styles.module.scss';
import { Formik } from 'formik';
import { defaultValues, schema, FormValues } from './helpers/form'
import { useHttp } from '../../hooks/http.hook';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
const AuthPage = () => {
    const { loading, error, request, clearError } = useHttp();

    const auth = useContext(AuthContext);

    async function onRegister(values: FormValues) {
        try {
            const data = await request('/api/auth/login', 'POST', {...values})
            auth.login(data.token, data.userId)
            if (!error) {
                toast(data?.message)
            }
        } catch(e) {}
    }

    useEffect(() => {
        if (error) {
            toast(error)
        }
        clearError()
    }, [error, clearError])

    return (
        <div className={classes.wrapper}>
            <div className={classes.content_block}>
                <span>Авторизация</span>
                <Formik
                    initialValues={defaultValues}
                    onSubmit={onRegister}
                    validationSchema={schema}
                >
                    {({ values,
                        handleChange,
                        handleSubmit,
                        errors,
                        touched }) => (
                            <>
                                <form id="auth" onSubmit={handleSubmit} className="mt-6">
                                    <Box display="flex" flexDirection="column">
                                        <TextField
                                            className={classes.input}
                                            name="email"
                                            defaultValue={values.email}
                                            label="Почта"
                                            variant="outlined"
                                            onChange={handleChange}
                                            helperText={touched.email && errors.email && errors.email}
                                            error={(!!errors.email && touched.email) || false}
                                        />
                                        <TextField
                                            type="password"
                                            className={classes.input}
                                            name="password"
                                            defaultValue={values.password}
                                            label="Пароль"
                                            variant="outlined"
                                            onChange={handleChange}
                                            helperText={touched.password && errors.email && errors.password}
                                            error={(!!errors.password && touched.password) || false}
                                        />
                                    </Box>
                                </form>
                            </>
                        )}
                </Formik>
                <div className={classes.content_btns}>
                    <Button
                        disabled={loading}
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        form="auth"
                        type="submit"
                    >
                        Войти
                </Button>
                    <p>Нет аккаунта?</p>
                    <NavLink
                    className={classes.navlink}
                    to="/register">
                        Зарегистрироваться
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;