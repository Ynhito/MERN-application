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
    accountId: number;
    fio: string;
    phone: number;
}

interface IElectroCardsFind {
    rows: item[],
    count: number,
}

const Labels = [
    {label: '№ счёта', id: 'accountId'},
    {label: 'ФИО', id: 'fio'},
    {label: 'Телефон', id: 'payment'},
]

export default function StudentsTable() {
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

        try {
            const data = await (await (axios.get<IElectroCardsFind>('/api/school/students/find', {params}))).data
            setData({rows: data.rows, count: data.count})
        } catch (e) { }
    }

    useEffect(() => {
        onGetData({
            page,
            rowsPerPage,
            orderBy,
            order,
            query
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
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TextField
                        onChange={(e) => setQuery(e.target.value)}
                        style={{width: '100%', margin: '16px'}}
                        label="Поиск"
                        variant="outlined" />
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
                            className={classes.row}
                            onClick={() => router.history.push(RedirectConfig.accounts(row.accountId))}>
                                <TableCell align="center">{row.accountId}</TableCell>
                                <TableCell align="center">{row.fio}</TableCell>
                                <TableCell align="center">{row.phone}</TableCell>
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