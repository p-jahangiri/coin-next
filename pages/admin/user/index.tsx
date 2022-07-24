import React, { useState } from 'react';
import { useQuery } from 'react-query';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import gate from 'gate';

import Table from '@components/common/table';
import { LayoutAdminPanel } from '@components/ui/admin/layout';

export default function Index() {
    const [error, setError] = useState(false);
    const [value, setValue] = useState('');
    const [listUser, setListUser] = useState<any>([]);
    const { data, isLoading } = useQuery('users', gate.getUsers);

    function onSubmit() {
        if (value) {
            setListUser(data?.filter((item) => item.username.includes(value.toLowerCase())));
        } else {
            setError(true);
            setListUser(data);
        }
    }

    if (isLoading) {
        return (
            <Box mt={20} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <CircularProgress />
            </Box>
        );
    }
    return (
        <LayoutAdminPanel header>
            <Box
                my={2}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" mb={1} color="error">
                    {error ? 'User not found' : ''}
                </Typography>
                <Box width={'100%'} textAlign={'center'}>
                    <input
                        style={{ width: '20%', padding: '10px 5px ', outline: 'none' }}
                        type="text"
                        placeholder="search user ..."
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <Button
                        onClick={() => onSubmit()}
                        variant="contained"
                        sx={{ py: '10px' }}
                        endIcon={<SearchIcon fontSize="large" />}
                    ></Button>
                </Box>
            </Box>
            <Box display={'flex'} justifyContent={'center'}>
                <Table data={listUser.length > 0 ? listUser : data} />
            </Box>
        </LayoutAdminPanel>
    );
}
