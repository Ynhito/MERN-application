import React from 'react';
import { Box, Button, TextField, Typography, Snackbar, Grid } from '@material-ui/core';
import { useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import { useRouter } from '../../../../../hooks/router.hook';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { RedirectLessonsConfig } from './../../redirect';

interface FormValues {
    course_id?: number;
    lesson_name: string;
    date: Date,
    teacher_id?: number;
}

const useStyles = makeStyles({
    field: {
        marginBottom: '16px'
    }
});

function LessonCreateForm() {
    const [snak, setSnack] = React.useState(false);
    const classes = useStyles();
    const router = useRouter();
    const [courses, setCourses] = React.useState([]);
    const [teachers, setTeachers] = React.useState([]);

    const getCoursesHandler = async () => {
        const {data} = await Axios.get('/api/school/cources/find', {
            params: {
                order: 'asc',
                page: 0,
                rowPerPage: 100,
            }
        })
        setCourses(data.rows)
    }

    const getTeachersHandler = async () => {
        const {data} = await Axios.get('/api/school/teachers/find', {
            params: {
                order: 'asc',
                page: 0,
                rowPerPage: 100,
            }
        })
        setTeachers(data.rows)
    }

    React.useEffect(() => {
        getCoursesHandler();
        getTeachersHandler();
    }, [])

    const formik = useFormik<FormValues>({
        initialValues: {
            course_id: undefined,
            lesson_name: '',
            date: new Date(),
            teacher_id: undefined,
        },
        onSubmit: async (values) => {
            await Axios.post('/api/school/lessons/create', values)
            setSnack(!snak)
            setTimeout(() => {
                router.history.push(RedirectLessonsConfig.list)
            }, 2000)
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
            <Box width="50%" textAlign="center" display="flex" flexDirection="column">
                <FormControl style={{marginBottom: '16px'}}>
                    <InputLabel id="demo-simple-select-label">Курс</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formik.values.course_id}
                        onChange={(event: React.ChangeEvent<{ value: unknown }>) => formik.setFieldValue('course_id', event.target.value)}
                    >
                        {courses.map((e: any) => (
                            <MenuItem value={e.course_id}>{e.course_name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    className={classes.field}
                    value={formik.values.lesson_name}
                    label="Название"
                    onChange={(e: any) => formik.setFieldValue('lesson_name', e.target.value)}
                    variant="outlined" />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Date picker dialog"
                            format="MM/dd/yyyy"
                            value={formik.values.date}
                            onChange={(date: any) => formik.setFieldValue('date', date)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Преподаватель</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formik.values.teacher_id}
                        onChange={(event: React.ChangeEvent<{ value: unknown }>) => formik.setFieldValue('teacher_id', event.target.value)}
                    >
                        {teachers.map((e: any) => (
                            <MenuItem value={e.teacher_id}>{e.teacher_fullName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
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

export default LessonCreateForm;
