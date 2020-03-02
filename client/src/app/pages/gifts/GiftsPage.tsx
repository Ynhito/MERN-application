import React, { useState, useEffect } from 'react';
import { TablePagination, Table, Paper, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHttp } from '../../hooks/http.hook';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    row: {
        '&:hover': {
            backgroundColor: '#bf9999',
        }
    }
});

interface item {
    title: string;
    type: string;
    startedAt: number;
    expiredAt: number;
    value: number;
    description: string;
    author: string;
    id: number;
}

interface data {
    rows: item[],
    fields: any[]
}

const GiftsPage = (props: any) => {
    const classes = useStyles();
    const { loading, error, request, clearError } = useHttp();
    const [data, setData] = useState<data | null>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    
    async function onGetData() {
        try {
            const data = await request('/api/gifts/find', 'GET')
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
    
    const onRowClick = (id: number) => {
        props.history.push(`/gifts/view/${id}`);
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
                            <TableRow
                            className={classes.row}
                            style={{cursor: 'pointer'}}
                            onClick={() => onRowClick(row.id)}
                            key={row.id}>
                                {Object.values(row).map(e => (
                                    <TableCell
                                    style={{maxWidth: '300px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'}}
                                    align="center">{e}</TableCell>
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

export default withRouter(GiftsPage);
