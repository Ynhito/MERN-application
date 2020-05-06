import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TablePagination, TableSortLabel, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import { useRouter } from '../../../../../hooks/router.hook';

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
    course_id: number,
    course_name: string;
    date_end: Date,
    date_start: Date,
    lesson_count: number,
    price: number,
}

interface item {
    student: any;
    payment: number;
    visit: number;
    monthVisit: number;
    debt: number;
}

interface ICourseInfoFind {
    rows: item[],
    count: number,
    info?: Info;
}

const Labels = [
    {label: 'Студент'},
    {label: 'Оплачено'},
    {label: 'Посетили', id: 'visit'},
    {label: 'За текущий месяц'},
    {label: 'Долг'},
]

export default function CoursesInfo() {
    const classes = useStyles();
    const router = useRouter<{id: string}>();
    const [data, setData] = useState<ICourseInfoFind>({rows: [], count: 0});
    const [orderBy, setOrderBy] = useState<string | undefined>();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [query, setQuery] = useState<string |undefined>();
    const {id} = router.match.params;
    console.log(router.match.params)

    console.log(id)
    async function onGetData(params: {
        page?: number,
        rowsPerPage?: number,
        order?: 'asc' | 'desc',
        orderBy?: string,
        query?: string,
        courseId?: number,
    }) {
        console.log(params)

        try {
            const data = await (await (axios.get<ICourseInfoFind>(`/api/school/cources/info/${params.courseId}`, {params}))).data
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
            courseId: id === 'undefined' ? undefined : +id,
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
            <Typography variant="h3">{data.info && data.info.course_name}</Typography>
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
                                {e.label}
                            {/* <TableSortLabel
                                active={orderBy === e.id}
                                direction={orderBy === e.id ? order : 'asc'}
                                onClick={e.id ? handleChangeSort(e.id) : undefined}
                                >
                                {e.label}
                            </TableSortLabel> */}
                            </TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.rows.length > 0 ? data.rows.map(row => (
                            <TableRow
                            className={classes.row}
                            // onClick={() => router.history.push(RedirectConfig.accounts(row.accountId))}
                            >
                                <TableCell align="center">
                                    {row.student.name} {row.student.second_name}
                                </TableCell>
                                <TableCell align="center">{row.payment}</TableCell>
                                <TableCell align="center">{row.visit}</TableCell>
                                <TableCell align="center">{row.monthVisit}</TableCell>
                                <TableCell align="center">{row.debt}</TableCell>
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