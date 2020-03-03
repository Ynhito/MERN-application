import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useHttp } from '../../hooks/http.hook';
import { TablePagination } from '@material-ui/core';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

interface item {
    Название: string;
    'Ёмкость батареи': string;
    'Макс скорость': string;
    'Мощность двигателя': number;
    Цена: boolean;
}

interface data {
    rows: item[],
    fields: any[]
}

export default function SimpleTable() {
    const classes = useStyles();
    const { loading, error, request, clearError } = useHttp();
    const [data, setData] = useState<data | null>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    async function onGetData() {
        try {
            const data = await request('/api/users/find', 'GET')
            setData(data)
        } catch (e) { }
    }

    useEffect(() => {
        onGetData()
    }, [])


    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(event.target.value)
    }

    const handleChangePage = (event: any, newPage: number) => {
        setPage(newPage)
    }

    if (!data) {
        return <></>
    }


    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {Object.keys(data.rows[0]).map(e => (
                                <TableCell align="center">{e}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.rows.map(row => (
                            <TableRow key={row.Название}>
                                {Object.values(row).map(e => (
                                    <TableCell align="center">{e}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </>
    );
}