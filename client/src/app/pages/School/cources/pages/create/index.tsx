import React from 'react';
import { Box, Button, TextField, Typography, Snackbar, Grid } from '@material-ui/core';
import { useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import { useRouter } from '../../../../../hooks/router.hook';
import { RedirectCoursesConfig } from './../../redirect';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

interface FormValues {
    course_name: string;
    price?: number;
    lesson_count?: number,
    date_start: Date;
    date_end: Date;
}

const useStyles = makeStyles({
    field: {
        marginBottom: '16px'
    }
});

function CourseCreateForm() {
    const [snak, setSnack] = React.useState(false);
    const classes = useStyles();
    const router = useRouter();
    const formik = useFormik<FormValues>({
        initialValues: {
            course_name: '',
            price: undefined,
            lesson_count: undefined,
            date_start: new Date(),
            date_end: new Date(),
        },
        onSubmit: async (values) => {
            await Axios.post('/api/school/cources/create', values)
            setSnack(!snak)
            router.history.push(RedirectCoursesConfig.list)
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
            <Box width="50%" textAlign="center" display="flex" flexDirection="column">
                <TextField
                    className={classes.field}
                    value={formik.values.course_name}
                    label="Название"
                    onChange={(e: any) => formik.setFieldValue('course_name', e.target.value)}
                    variant="outlined" />
                <TextField
                    className={classes.field}
                    value={formik.values.price}
                    type="number"
                    label="Цена"
                    onChange={(e: any) => formik.setFieldValue('price', e.target.value)}
                    variant="outlined" />
                <TextField
                    className={classes.field}
                    value={formik.values.lesson_count}
                    type="number"
                    label="Кол-во занятий"
                    onChange={(e: any) => formik.setFieldValue('lesson_count', e.target.value)}
                    variant="outlined" />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Date picker dialog"
                            format="MM/dd/yyyy"
                            value={formik.values.date_start}
                            onChange={(date: any) => formik.setFieldValue('date_start', date)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Date picker dialog"
                            format="MM/dd/yyyy"
                            value={formik.values.date_end}
                            onChange={(date: any) => formik.setFieldValue('date_end', date)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
                <Button type="submit">Сохранить</Button>
            </Box>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={snak}
                onClose={() => setSnack(!snak)}
                message={`Курс добавлен`}
            />
        </form>
    )
}

export default CourseCreateForm;
