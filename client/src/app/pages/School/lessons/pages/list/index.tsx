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

interface item {
    course_id: number;
    course_name: string;
    date: Date;
    date_end: Date;
    date_start: Date;
    lesson_count: number;
    lesson_id: number;
    lesson_name: string;
    price: number;
    teacher_fullName: string;
    teacher_id: number;
    teacher_phone: number;
}

interface ILessonFind {
    rows: item[],
    count: number,
}

const Labels = [
    {label: 'Название', id: 'lessonId'},
    {label: 'Дата проведения', id: 'title'},
    {label: 'Имя преподавателя', id: 'fio'},
    {label: 'Курс', id: 'course_name'}
]

export default function LessonsTable() {
    const classes = useStyles();
    const router = useRouter<{id: string}>();
    const { loading, error, request, clearError } = useHttp();
    const [data, setData] = useState<ILessonFind>({rows: [], count: 0});
    const [orderBy, setOrderBy] = useState<string | undefined>();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [query, setQuery] = useState<string |undefined>();
    const {id} = router.match.params;

    console.log(id)
    async function onGetData(params: {
        page?: number,
        rowsPerPage?: number,
        order?: 'asc' | 'desc',
        orderBy?: string,
        query?: string,
        lessonId?: number,
    }) {
        console.log(params)

        try {
            const data = await (await (axios.get<ILessonFind>('/api/school/lessons/find', {params}))).data
            setData({rows: data.rows, count: data.count})
        } catch (e) { }
    }

    useEffect(() => {
        onGetData({
            page,
            rowsPerPage,
            orderBy,
            order,
            query,
            lessonId: id === 'undefined' ? undefined : +id,
        })
    }, [page, rowsPerPage, orderBy, order, query, id])


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

    return (
        <>
            <TableContainer component={Paper}>
                <Box display="flex" justifyContent="space-between" width="100%">
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
                </Box>
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
                            onClick={() => router.history.push(RedirectLessonsConfig.info(row.course_id, row.lesson_id))}
                            >
                                <TableCell align="center">{row.lesson_name}</TableCell>
                                <TableCell align="center">{new Date(row.date).toLocaleDateString()}</TableCell>
                                <TableCell align="center">{row.teacher_fullName}</TableCell>
                                <TableCell align="center">{row.course_name}</TableCell>
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