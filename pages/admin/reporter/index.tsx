import { useState } from 'react';
import { useQuery } from 'react-query';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import gate from 'gate';

import { LayoutAdminPanel } from '@components/ui/admin/layout';
import ReporterTable from '@components/ui/admin/reporter/ReporterTabl';

export default function Index() {
    const [errorSearch, setErrorSearch] = useState(false);
    const [value, setValue] = useState('');
    const [listReporter, setListReporter] = useState<any>([]);
    const { data, isLoading, error, isError } = useQuery('reporter', gate.getReporters);

    function onSubmit() {
        if (value) {
            setListReporter(data?.filter((item) => item.last_name.includes(value)));
        } else {
            setErrorSearch(true);
            setListReporter(data);
        }
    }

    if (isLoading) {
        return (
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                {' '}
                <CircularProgress />
            </Box>
        );
    }

    if (isError) {
        return error;
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
                    {errorSearch ? 'User not found' : ''}
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

                <ReporterTable data={listReporter.length > 0 ? listReporter : data} />
            </Box>
        </LayoutAdminPanel>
    );
}
