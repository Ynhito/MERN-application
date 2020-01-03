import React, { useEffect, useState } from 'react';
import { Button, TextField, Snackbar} from '@material-ui/core';
import classes from './styles.module.scss';
import { Formik } from 'formik';
import { defaultValues, schema, FormValues } from './helpers/form'
import { useHttp } from '../../hooks/http.hook';
import { registerHandler } from '../../api/register';
import { toast } from 'react-toastify';
const RegisterPage = () => {
    const {loading, error, request, clearError} = useHttp();
    
    async function onRegister(values: FormValues) {
        const data = await registerHandler(request, values);
        if (!error) {
            toast(data?.message)
        }
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
                <span>Регистрация</span>
                <Formik
                    initialValues={defaultValues}
                    onSubmit={onRegister}
                    validationSchema={schema}
                >
                    {({ values,
                    handleChange,
                    handleSubmit,
                    errors,
                    touched}) => (
                        <>
                            <form id="auth" onSubmit={handleSubmit} className="mt-6">
                                <div className="flex flex-col">
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
                                        className={classes.input}
                                        name="password"
                                        defaultValue={values.password}
                                        label="Пароль"
                                        variant="outlined"
                                        onChange={handleChange}
                                        helperText={touched.password && errors.email && errors.password}
                                        error={(!!errors.password && touched.password) || false}
                                        />
                                </div>
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
                    type="submit">
                        Зарегистрироваться
                </Button>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;