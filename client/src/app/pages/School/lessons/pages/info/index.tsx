import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TablePagination, TableSortLabel, TextField, Button, Box } from '@material-ui/core';
import axios from 'axios';
import { useHttp } from '../../../../../hooks/http.hook';
import { useRouter } from '../../../../../hooks/router.hook';
import { RedirectConfig } from '../../../../../components/redirect';
import { RedirectLessonsConfig } from './../../redirect';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    row: {
        '&:hover': {
            backgroundColor: 'rgba(191, 153, 153, 0.5)',
        },
        cursor: 'pointer',
    }
});

interface Info {
    course_id: number;
    date: Date;
    lesson_id: number;
    lesson_name: string;
    teacher_id: number;
}

interface Student {
    age: number;
    arr_id: number;
    course_id: number;
    debt: number;
    name: string;
    parent_id: number;
    payment: number;
    second_name: string;
    student_id: number;
    teacher_id: number;
}

interface item {
    student: Student;
    isPayment: boolean;
    isVisit: boolean;
}

interface ILessonInfo {
    rows: item[],
    count: number,
    info?: Info,
}

const Labels = [
    {label: 'Студент', id: 'lessonId'},
    {label: 'Дата проведения', id: 'title'},
    {label: 'Статус посещения', id: 'fio'},
    {label: 'Статус оплаты', id: 'course_name'}
]
export default function LessonInfoTable() {
    const classes = useStyles();
    const router = useRouter<{courseId: string, lessonId: string}>();
    const { loading, error, request, clearError } = useHttp();
    const [data, setData] = useState<ILessonInfo>({rows: [], count: 0});
    const [orderBy, setOrderBy] = useState<string | undefined>();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [query, setQuery] = useState<string |undefined>();
    const {courseId, lessonId} = router.match.params;

    async function onGetData(params: {
        page?: number,
        rowsPerPage?: number,
        order?: 'asc' | 'desc',
        orderBy?: string,
        query?: string,
        lessonId: number,
        courseId: number,
    }) {
        console.log(params)

        try {
            const data = await (await (axios.get<ILessonInfo>('/api/school/lessons/info', {params}))).data
            setData({rows: data.rows, count: data.count, info: data.info})
        } catch (e) { }
    }

    useEffect(() => {
        onGetData({
            page,
            rowsPerPage,
            orderBy,
            order,
            query,
            lessonId: +lessonId,
            courseId: +courseId,
        })
    }, [page, rowsPerPage, orderBy, order, query, lessonId, courseId])


    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(event.target.value)
    }

    const handleChangePage = (event: any, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeSort = (property: keyof any) => (event: React.MouseEvent<unknown>) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property as string)
    };
    
    const confirmVisit = async (params: {
        lesson_id: number,
        student_id: number,
        courseId: number,
    }) => {
        await axios.post<ILessonInfo>('/api/school/students/confirmVisit', params);
        setTimeout(() => {
            onGetData({
                page,
                rowsPerPage,
                orderBy,
                order,
                query,
                lessonId: +lessonId,
                courseId: +courseId,
            })
        }, 2000)
    }

    const confirmPayment = async (params: {
        lesson_id: number,
        student_id: number,
        courseId: number,
    }) => {
        await axios.post<ILessonInfo>('/api/school/students/confirmPayment', params);
        setTimeout(() => {
            onGetData({
                page,
                rowsPerPage,
                orderBy,
                order,
                query,
                lessonId: +lessonId,
                courseId: +courseId,
            })
        }, 2000)
    }

    return (
        <>
            <TableContainer component={Paper}>
                {/* <Box display="flex" justifyContent="space-between" width="100%">
                    <TextField
                        onChange={(e) => setQuery(e.target.value)}
                        style={{width: '100%', margin: '16px'}}
                        label="Поиск"
                        variant="outlined" />
                    <Button
                        onClick={() => router.history.push(RedirectLessonsConfig.create)}
                        variant="contained"
                        color="primary">
                        Добавить занятие
                    </Button>
                </Box> */}
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {Labels.map(e => 
                            <TableCell align="center">
                            <TableSortLabel
                                active={orderBy === e.id}
                                direction={orderBy === e.id ? order : 'asc'}
                                onClick={handleChangeSort(e.id)}
                                >
                                {e.label}
                            </TableSortLabel>
                            </TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.rows.length > 0 ? data.rows.map(row => (
                            <TableRow
                            >
                                <TableCell align="center">{row.student.name} {row.student.second_name}</TableCell>
                                <TableCell align="center">{new Date(data.info && data.info.date as Date || '').toLocaleDateString()}</TableCell>
                                <TableCell align="center">{
                                    row.isVisit ? 'Посещено' :
                                    <Button
                                    onClick={() => confirmVisit({
                                        lesson_id: data.info!.lesson_id,
                                        courseId: data.info!.course_id,
                                        student_id: row.student.student_id,
                                    })}
                                    variant="contained"
                                    color="primary">
                                        Отметить посещение
                                    </Button>
                                }</TableCell>
                                <TableCell align="center">
                                    {row.isPayment ? 'Оплачено' :
                                    <Button
                                    onClick={() => confirmPayment({
                                        lesson_id: data.info!.lesson_id,
                                        courseId: data.info!.course_id,
                                        student_id: row.student.student_id,
                                    })}
                                    variant="contained"
                                    color="secondary">
                                        Подтвердить оплату
                                    </Button>}
                                    </TableCell>
                            </TableRow>
                        )) :
                        <TableRow>
                            <TableCell>Данных нет</TableCell>
                        </TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                labelRowsPerPage="Строк на странице"
                count={data.count}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </>
    );
}