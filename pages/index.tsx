import { useState } from 'react';
import { useQuery } from 'react-query';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { Button, Grid, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';
import gate from 'gate';
import { Layout } from 'layout';
import type { NextPage } from 'next';

import MultiActionAreaCard from '@components/common/card';
import SearchInput from '@components/common/input-search';
import ScrollToTop from '@components/common/scroll-button';
import { Tab } from '@components/ui/home';
import TabIcon from '@components/ui/home/tab/tabIcon';
import { getResponseNewsData } from '@interfaces/news/news.interface';
import { useTranslation } from '@lib/hooks/useTranslation';

const Home: NextPage = () => {
    const [open, setOpen] = useState(false);
    const [dataSearch, setDataSearch] = useState<getResponseNewsData[]>();
    console.log('🚀 ~ file: index.tsx ~ line 20 ~ dataSearch', dataSearch);
    const { isLoading, data } = useQuery('news', gate.getNews);

    const handelSearch = (value: string) => {
        if (value) {
            setDataSearch(
                data?.filter((item) => item.body.toLowerCase().includes(value.toLowerCase())),
            );
        }
    };

    const { t } = useTranslation();

    if (isLoading) {
        return (
            <Box mt={20} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                <CircularProgress />
            </Box>
        );
    }
    return (
        <Layout footer header>
            <Box
                sx={{
                    display: { xs: 'none', lg: 'flex' },
                    position: 'absolute',
                    right: 110,
                    top: 130,
                }}
            >
                <SearchInput onClick={handelSearch} />
            </Box>
            <Box mx={{ sm: 1, md: 8, lg: 13 }} my={{ xs: 1, md: 3, lg: 5 }}>
                <Box id="back-to-top-anchor">
                    <img
                        width={'100%'}
                        src="https://images.cointelegraph.com/images/1160_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS9zdG9yYWdlL3VwbG9hZHMvdmlldy81ZjVmYTc5ZDIxZTQyODFhZTYxNzgwOGIwZTFiZDI2ZC5wbmc=.jpg"
                        alt="img"
                    />
                </Box>
                {dataSearch ? (
                    dataSearch.map((item) => {
                        return (
                            <Box
                                my={3}
                                key={item.id}
                                sx={{
                                    display: 'flex',
                                }}
                            >
                                <Box width={'23%'} borderRadius={10} mr={5}>
                                    <img
                                        width={'100%'}
                                        src="https://images.cointelegraph.com/images/370_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMDYvMTVjYjBjYTAtMmVmNy00YjllLTkxYzctZjk5YTVmNzlkNjQ3LmpwZw==.jpg"
                                    />
                                </Box>

                                <Box mt={2}>
                                    <Typography variant="h6">{item.body}</Typography>
                                    <Box display={'flex'} mt={2} ml={5} gap={3}>
                                        <Typography variant="body1">1 hours ago </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                paddingLeft: '10px',
                                                borderLeft: '2px solid #e0e0e0',
                                            }}
                                        >
                                            by {item.title}
                                        </Typography>
                                    </Box>
                                    <Typography mt={3} variant="body1">
                                        {item.description}
                                    </Typography>
                                </Box>
                            </Box>
                        );
                    })
                ) : (
                    <>
                        <Tab data={data} />

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
                                {data?.slice(0, 6).map((list) => (
                                    <Grid item xs={2} sm={4} md={2} lg={4} key={list.id}>
                                        <MultiActionAreaCard data={list} loading={isLoading} />
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
                            {data?.slice(7, 13).map((list) => (
                                <Grid item xs={2} sm={4} md={2} lg={4} key={list.id}>
                                    <MultiActionAreaCard data={list} loading={isLoading} />
                                </Grid>
                            ))}
                        </Grid>
                        <TabIcon />
                        <Grid
                            container
                            spacing={{ xs: 3, md: 5 }}
                            columns={{ xs: 1, sm: 8, md: 4, lg: 12 }}
                        >
                            {data?.slice(13, 28).map((list) => (
                                <Grid item xs={2} sm={4} md={2} lg={4} key={list.id}>
                                    <MultiActionAreaCard data={list} loading={isLoading} />
                                </Grid>
                            ))}
                        </Grid>
                        {open ? (
                            <Grid
                                container
                                spacing={{ xs: 3, md: 5 }}
                                columns={{ xs: 1, sm: 8, md: 4, lg: 12 }}
                            >
                                {data?.slice(28, 49).map((list) => (
                                    <Grid item xs={2} sm={4} md={2} lg={4} key={list.id}>
                                        <MultiActionAreaCard data={list} loading={isLoading} />
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            <Box mt={5} textAlign={'center'}>
                                <Button
                                    variant="outlined"
                                    endIcon={<RotateLeftIcon />}
                                    onClick={() => setOpen(true)}
                                >
                                    load more
                                </Button>
                            </Box>
                        )}
                    </>
                )}
            </Box>
            <ScrollToTop />
        </Layout>
    );
};

export default Home;
