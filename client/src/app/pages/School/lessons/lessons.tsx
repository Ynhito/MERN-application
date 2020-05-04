import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TablePagination, TableSortLabel, TextField } from '@material-ui/core';
import axios from 'axios';
import { useHttp } from '../../../hooks/http.hook';
import { useRouter } from '../../../hooks/router.hook';
import { RedirectConfig } from './../../../components/redirect';

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
    lessonId: number;
    title: string;
    course_name: string;
    teacherId: number;
    courseId: number;
    fio: string;
    phone: number;
    lessonPrice: number;
    lessonAmount: number;
    date: Date;
}

interface IElectroCardsFind {
    rows: item[],
    count: number,
}

const Labels = [
    {label: '№ Занятия', id: 'lessonId'},
    {label: 'Название', id: 'title'},
    {label: 'Имя преподавателя', id: 'fio'},
    {label: 'Курс', id: 'course_name'},
    {label: 'Дата проведения', id: 'date'},
]

export default function LessonsTable() {
    const classes = useStyles();
    const router = useRouter<{id: string}>();
    const { loading, error, request, clearError } = useHttp();
    const [data, setData] = useState<IElectroCardsFind>({rows: [], count: 0});
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
            const data = await (await (axios.get<IElectroCardsFind>('/api/school/lessons/find', {params}))).data
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
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        {/* <TextField
                        onChange={(e) => setQuery(e.target.value)}
                        style={{width: '100%', margin: '16px'}}
                        label="Поиск"
                        variant="outlined" /> */}
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
                                <TableCell align="center">{row.lessonId}</TableCell>
                                <TableCell align="center">{row.title}</TableCell>
                                <TableCell
                                className={classes.row}
                                onClick={() => router.history.push(RedirectConfig.teachers(row.teacherId))}
                                align="center">{row.fio}</TableCell>
                                <TableCell
                                className={classes.row}
                                onClick={() => router.history.push(RedirectConfig.cources(row.courseId))}
                                align="center">{row.course_name}</TableCell>
                                <TableCell align="center">{new Date(row.date).toLocaleDateString()}</TableCell>
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