import React from 'react';
import { Box, Button, TextField, Typography, Snackbar } from '@material-ui/core';
import { useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import { useRouter } from '../../../../../hooks/router.hook';
import { RedirectStudentConfig } from './../../redirect';

interface FormValues {
    firstName: string;
    lastName: string;
    age?: number,
    parent_firstName: string;
    parent_lastName: string;
}

const useStyles = makeStyles({
    field: {
        marginBottom: '16px'
    }
});

function StudentCreateForm() {
    const [snak, setSnack] = React.useState(false);
    const classes = useStyles();
    const router = useRouter();
    const formik = useFormik<FormValues>({
        initialValues: {
            firstName: '',
            lastName: '',
            age: undefined,
            parent_firstName: '',
            parent_lastName: '',
        },
        onSubmit: async (values) => {
            await Axios.post('/api/school/students/create', values)
            setSnack(!snak)
            router.history.push(RedirectStudentConfig.list)
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
            <Box width="50%" textAlign="center" display="flex" flexDirection="column">
                <TextField
                    className={classes.field}
                    value={formik.values.firstName}
                    label="Имя"
                    onChange={(e: any) => formik.setFieldValue('firstName', e.target.value)}
                    variant="outlined" />
                <TextField
                    className={classes.field}
                    value={formik.values.lastName}
                    label="Фамилия"
                    onChange={(e: any) => formik.setFieldValue('lastName', e.target.value)}
                    variant="outlined" />
                <TextField
                    className={classes.field}
                    value={formik.values.age}
                    type="number"
                    label="Возраст"
                    onChange={(e: any) => formik.setFieldValue('age', e.target.value)}
                    variant="outlined" />
                {formik.values.age && formik.values.age < 18 && <Box>
                    <Typography>
                        Добавление родителя
                        </Typography>
                    <TextField
                        className={classes.field}
                        value={formik.values.parent_firstName}
                        label="Имя родителя"
                        onChange={(e: any) => formik.setFieldValue('parent_firstName', e.target.value)}
                        variant="outlined" />
                    <TextField
                        className={classes.field}
                        value={formik.values.parent_lastName}
                        label="Фамилия родителя"
                        onChange={(e: any) => formik.setFieldValue('parent_lastName', e.target.value)}
                        variant="outlined" />
                </Box>
                }
                <Button type="submit">Сохранить</Button>
            </Box>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                open={snak}
                onClose={() => setSnack(!snak)}
                message={`Студент ${formik.values.age && formik.values.age >= 18 && 'и родитель'} добавлен`}
            />
        </form>
    )
}

export default StudentCreateForm;
