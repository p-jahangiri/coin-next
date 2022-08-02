import React from 'react';
import { useQuery } from 'react-query';
import { Box, Button, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import UserImg from 'assets/images/user.jpg';
import gate from 'gate';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { LayoutAdminPanel } from '@components/ui/admin/layout';

export default function User() {
    const router = useRouter();
    const { id } = router.query;

    const { data, isLoading } = useQuery(['user', id], async () => await gate.getUserById(id));
    const deleteUser = async (id: any) => {
        await gate.deleteUserById(id);
        router.push('/admin/user');
    };
    if (isLoading) {
        <CircularProgress
            sx={{
                textAlign: 'center',
                marginTop: '20px',
            }}
        />;
    }
    return (
        <LayoutAdminPanel header>
            <Box mt={5} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                {data && (
                    <Box display={'flex'} flexDirection={'column'}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: { xs: 'column', md: 'row' },
                            }}
                        >
                            <Box
                                sx={{
                                    width: '150px',
                                    height: '150px',
                                    boxShadow: 1,
                                    borderRadius: '10px',
                                }}
                            >
                                <Image
                                    style={{ borderRadius: '10px' }}
                                    width="100%"
                                    height="100%"
                                    layout="responsive"
                                    objectFit="contain"
                                    src={UserImg}
                                    alt="avatar"
                                />
                            </Box>
                            <Box
                                sx={{
                                    mt: { xs: '10px', md: '0' },
                                    ml: '20px',
                                    textAlign: 'center',
                                }}
                            >
                                <Typography variant="h6" mb={1}>
                                    username : {data.username}
                                </Typography>
                                <Typography variant="h6" mb={1}>
                                    created_at : {data.created_at.split('T')[0]}
                                </Typography>
                                <Typography variant="h6" mb={1}>
                                    updated_at : {data.updated_at.split('T')[0]}
                                </Typography>
                                <Typography variant="h6" mb={1}>
                                    last Login : {data.lastLogon ? data.lastLogon : '3 day'}
                                </Typography>
                                <Typography variant="h6" mb={1}>
                                    role : user{' '}
                                </Typography>
                                <Typography variant="h6" mb={1}>
                                    login Count : {data.logonCount}
                                </Typography>
                                <Typography variant="h6" mb={1}>
                                    online : {data.online > 0 ? 'online' : 'offline'}
                                </Typography>
                            </Box>
                        </Box>{' '}
                        <Button
                            sx={{ mt: '20px' }}
                            variant="contained"
                            color="primary"
                            onClick={() => deleteUser(data.id)}
                        >
                            Delete user
                        </Button>
                    </Box>
                )}
            </Box>
        </LayoutAdminPanel>
    );
}
