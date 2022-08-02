import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { getResponseUsersDataType } from '@interfaces/users';
import Link from '@lib/Link';

interface Column {
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
}

const columns: Column[] = [
    { label: 'id', minWidth: 50 },
    { label: 'username', minWidth: 100, align: 'center' },
    {
        label: 'role',
        minWidth: 170,
        align: 'center',
    },
    {
        label: 'online',
        minWidth: 170,
        align: 'center',
    },
];

export default function GroupingTable({ data }: { data?: getResponseUsersDataType[] }) {
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
        <Paper sx={{ width: { xs: '100%', lg: '50%' } }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={4} sx={{ fontSize: '20px' }}>
                                User list
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            {columns.map((column, idx) => (
                                <TableCell
                                    key={idx}
                                    align={column.align}
                                    sx={{
                                        top: 57,
                                        minWidth: { xs: 0, md: column.minWidth },
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
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Link
                                                href={`/admin/user/${row.id}`}
                                                key={row.id}
                                                sx={{
                                                    textDecoration: 'none',
                                                    color: 'black',
                                                }}
                                            >
                                                {row.username}
                                            </Link>
                                        </TableCell>
                                        {row.lastLogon ? (
                                            <TableCell align="center">{row.lastLogon}</TableCell>
                                        ) : (
                                            <TableCell align="center">3 day</TableCell>
                                        )}
                                        {row.online ? (
                                            <TableCell align="center">online</TableCell>
                                        ) : (
                                            <TableCell align="center">offline</TableCell>
                                        )}
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
