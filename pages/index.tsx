import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Layout } from 'layout';
import type { NextPage } from 'next';

import MultiActionAreaCard from '@components/common/card';
import ScrollToTop from '@components/common/scroll-button';
import { Tab, TabIcon } from '@components/ui/home';
import { useTranslation } from '@lib/hooks/useTranslation';

const Home: NextPage = () => {
    const { t } = useTranslation();
    return (
        <Layout footer header>
            <Box mx={{ sm: 1, md: 8, lg: 13 }} my={{ xs: 1, md: 3, lg: 5 }}>
                <Box id="back-to-top-anchor">
                    <img
                        width={'100%'}
                        src="https://images.cointelegraph.com/images/1160_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS9zdG9yYWdlL3VwbG9hZHMvdmlldy81ZjVmYTc5ZDIxZTQyODFhZTYxNzgwOGIwZTFiZDI2ZC5wbmc=.jpg"
                        alt="img"
                    />
                </Box>
                <Tab />
                {/* <Box
                    sx={{
                        boxShadow: '8px 15px 80px 8px rgb(0 0 0 / 0.25)',
                        borderBottom: '2px solid rgb(240, 148, 19)',
                    }}
                >
                    <Slider />
                </Box> */}
                <Box mt={{ xs: 5, md: 8 }}>
                    <Grid
                        container
                        spacing={{ xs: 3, md: 5 }}
                        columns={{ xs: 1, sm: 8, md: 4, lg: 12 }}
                    >
                        {Array.from(Array(6)).map((_, index) => (
                            <Grid item xs={2} sm={4} md={2} lg={4} key={index}>
                                <MultiActionAreaCard />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Box
                    display={'flex'}
                    alignItems="center"
                    height={300}
                    my={2}
                    sx={{
                        background:
                            'url(https://s3.cointelegraph.com/storage/uploads/view/ec631b64fb629dd722190ee537ac2890.jpg)',
                        opacity: '0.9',
                        backgroundSize: 'cover',
                        boxShadow: '5px 0 20px 5px rgb(0 0 0 / 0.10)',
                    }}
                >
                    <Box m={10} width={320} color="white" sx={{ cursor: 'pointer' }}>
                        <Typography fontSize={{ xs: 18, lg: 25 }}>
                            {t(
                                'Social networking platform purchases NFT worth $1,24 million as its brand ambassador',
                            )}
                        </Typography>
                        <Typography mt={2}>
                            {t(
                                'Social networking platform purchases NFT worth $1,24 million as its brand ambassador',
                            )}
                        </Typography>
                    </Box>
                </Box>
                <Grid
                    container
                    spacing={{ xs: 3, md: 5 }}
                    columns={{ xs: 1, sm: 8, md: 4, lg: 12 }}
                >
                    {Array.from(Array(6)).map((_, index) => (
                        <Grid item xs={2} sm={4} md={2} lg={4} key={index}>
                            <MultiActionAreaCard />
                        </Grid>
                    ))}
                </Grid>
                <TabIcon />
                <Grid
                    container
                    spacing={{ xs: 3, md: 5 }}
                    columns={{ xs: 1, sm: 8, md: 4, lg: 12 }}
                >
                    {Array.from(Array(3)).map((_, index) => (
                        <Grid item xs={2} sm={4} md={2} lg={4} key={index}>
                            <MultiActionAreaCard />
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <ScrollToTop />
        </Layout>
    );
};

export default Home;
