import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { getResponseReporterDataType } from '@interfaces/reporter';
import Link from '@lib/Link';

interface Column {
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
}

const columns: Column[] = [
    { label: 'id', minWidth: 30 },
    { label: 'name', minWidth: 100, align: 'center' },
    {
        label: 'register',
        minWidth: 170,
        align: 'center',
    },
    {
        label: 'created',
        minWidth: 170,
        align: 'center',
    },
];

export default function ReporterTable({ data }: { data?: getResponseReporterDataType[] }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper
            sx={{
                width: { xs: '100%', lg: '50%' },
            }}
        >
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={4} sx={{ fontSize: '20px' }}>
                                reporter list
                            </TableCell>
                        </TableRow>
                        <TableRow
                            sx={{
                                overflowX: 'auto',
                            }}
                        >
                            {columns.map((column, idx) => (
                                <TableCell
                                    key={idx}
                                    align={column.align}
                                    sx={{
                                        top: 57,
                                        minWidth: { xs: 0, lg: column.minWidth },
                                        backgroundColor: '#253137',
                                        color: 'white',
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover key={row.id} role="checkbox" tabIndex={-1}>
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Link
                                                href={`/admin/reporter/${row.id}`}
                                                key={row.id}
                                                sx={{
                                                    padding: '0',
                                                    textDecoration: 'none',
                                                    color: 'black',
                                                }}
                                            >
                                                {row.last_name} {row.first_name}
                                            </Link>
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            sx={{
                                                px: '0',
                                            }}
                                        >
                                            {row.register_date.split(' ')[0]}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            sx={{
                                                px: '0',
                                            }}
                                        >
                                            {row.created_at.split('T')[0]}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data ? data.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
