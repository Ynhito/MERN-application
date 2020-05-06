import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TablePagination, TableSortLabel, TextField, Typography, Button, Box } from '@material-ui/core';
import axios from 'axios';
import { useHttp } from '../../../../../hooks/http.hook';
import { useRouter } from '../../../../../hooks/router.hook';
import { RedirectConfig } from '../../../../../components/redirect';
import { RedirectCoursesConfig } from '../../redirect';

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
    price: number;
    lesson_count: number;
    date_start: number;
    date_end: number;
}

interface IElectroCardsFind {
    rows: item[],
    count: number,
}

const Labels = [
    {label: 'Название курса', id: 'course_name'},
    {label: 'Кол-во занятий', id: 'lesson_count'},
    {label: 'Цена', id: 'price'},
    {label: 'Длительность'},
]

export default function CoursesTable() {
    const classes = useStyles();
    const router = useRouter();
    const { loading, error, request, clearError } = useHttp();
    const [data, setData] = useState<IElectroCardsFind>({rows: [], count: 0});
    const [orderBy, setOrderBy] = useState<string | undefined>();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [query, setQuery] = useState<string |undefined>();

    async function onGetData(params: {
        page?: number,
        rowsPerPage?: number,
        order?: 'asc' | 'desc',
        orderBy?: string,
        query?: string,
    }) {
        console.log(params)

        try {
            const data = await (await (axios.get<IElectroCardsFind>('/api/school/cources/find', {params}))).data
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
        })
    }, [page, rowsPerPage, orderBy, order, query])


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
            <Typography variant="h3">Курсы</Typography>
            <TableContainer component={Paper}>
                <Box display="flex" justifyContent="space-between" width="100%">
                    <TextField
                        onChange={(e) => setQuery(e.target.value)}
                        style={{width: '100%', margin: '16px'}}
                        label="Поиск"
                        variant="outlined" />
                    <Button
                        onClick={() => router.history.push(RedirectCoursesConfig.create)}
                        variant="contained"
                        color="primary">
                        Добавить курс
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
                                onClick={e.id ? handleChangeSort(e.id) : undefined}
                                >
                                {e.label}
                            </TableSortLabel>
                            </TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.rows.length > 0 ? data.rows.map(row => (
                            <TableRow
                            className={classes.row}
                            onClick={() => {
                                console.log(row.course_id)
                                router.history.push(RedirectCoursesConfig.info(row.course_id))
                            }}
                            >
                                <TableCell align="center">{row.course_name}</TableCell>
                                <TableCell align="center">{row.lesson_count}</TableCell>
                                <TableCell align="center">{row.price}</TableCell>
                                <TableCell align="center">
                                    {new Date(row.date_start).toLocaleDateString()}
                                    - {new Date(row.date_end).toLocaleDateString()}
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