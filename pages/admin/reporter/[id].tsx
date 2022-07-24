import { useQuery } from 'react-query';
import { Box, Button, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from 'assets/images/user.jpg';
import gate from 'gate';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { LayoutAdminPanel } from '@components/ui/admin/layout';

export default function Reporter() {
    const router = useRouter();
    const { id } = router.query;

    const { data, isLoading } = useQuery(
        ['reporter', id],
        async () => await gate.getReporterById(id),
    );

    const deleteReporter = async (id: any) => {
        await gate.deleteReporter(id);
        router.push('/admin/reporter');
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
            <Box
                mt={5}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                flexDirection={'column'}
            >
                {data && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                            <Box
                                sx={{
                                    width: '150px',
                                    height: '150px',
                                    display: 'flex',
                                    boxShadow: 1,
                                }}
                            >
                                <Image width={150} height="100%" src={Avatar} alt="avatar" />
                            </Box>
                            <Box
                                sx={{
                                    ml: '50px',
                                    mb: '20px',
                                }}
                            >
                                <Typography variant="h6" mb={1}>
                                    name : {data.last_name}
                                </Typography>
                                <Typography variant="h6" mb={1}>
                                    family : {data.first_name}
                                </Typography>
                                <Typography variant="h6" mb={1}>
                                    email : {data.email}
                                </Typography>
                                <Typography variant="h6" mb={1}>
                                    phone number : {data.phonenumber}
                                </Typography>
                                <Typography variant="h6" mb={1}>
                                    birthday : {data.birth_date}
                                </Typography>
                                <Typography variant="h6" mb={1}>
                                    update : {data.updated_at.split('T')[0]}
                                </Typography>
                            </Box>
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => deleteReporter(data.id)}
                        >
                            Delete Reporter
                        </Button>
                    </Box>
                )}
            </Box>
        </LayoutAdminPanel>
    );
}
