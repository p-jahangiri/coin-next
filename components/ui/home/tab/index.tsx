import * as React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';

import { getResponseNewsData } from '@interfaces/news/news.interface';
import { useTranslation } from '@lib/hooks/useTranslation';

interface Props {
    data: getResponseNewsData[] | undefined;
}

const LabTabs: React.FC<Props> = ({ data }) => {
    const { t } = useTranslation();
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const MostVisited = data?.sort((a, b) => b.view_count - a.view_count);
    return (
        <Box my={3} sx={{ boxShadow: '5px 5px 20px 2px rgb(0 0 0 / 0.25)' }}>
            <Grid
                px={2}
                container
                spacing={2}
                columnSpacing={{ xs: 1, md: 5 }}
                sx={{ width: '100%', typography: 'body1' }}
            >
                <Grid item display={{ xs: 'none', md: 'flex', lg: 'flex' }} md={7} lg={8}>
                    <img
                        width={'100%'}
                        src="https://images.cointelegraph.com/images/740_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMDYvZmI0MmRhZmUtOTMwMy00MjQ0LWE5MDAtNmZlNmRjY2M2MGU5LmpwZw==.jpg"
                        alt="img"
                    />
                </Grid>
                <Grid item xs={12} md={5} lg={4}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label={t("EDITOR'S CHOICE")} value="1" />
                                <Tab label={t('HOT STORIES')} value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1" sx={{ width: '100%' }}>
                            {data?.slice(0, 5).map((item) => {
                                return (
                                    <Box
                                        key={item.id}
                                        sx={{
                                            alignItems: 'center',
                                            height: '100px',

                                            borderBottom: 1,
                                            '&:last-child': {
                                                border: 'none',
                                            },
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                padding: '10px 10px',
                                                color: 'black',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {item.body}
                                        </Typography>
                                    </Box>
                                );
                            })}
                        </TabPanel>
                        <TabPanel value="2">
                            {MostVisited?.slice(0, 5).map((item) => {
                                return (
                                    <Box
                                        key={item.id}
                                        height={'100px'}
                                        display={'flex'}
                                        justifyContent={'space-between'}
                                        sx={{
                                            borderBottom: 1,
                                            '&:last-child': {
                                                border: 'none',
                                            },
                                        }}
                                    >
                                        <Box
                                            width={'100%'}
                                            px={2}
                                            mt={1}
                                            display={'flex'}
                                            flexDirection={'column'}
                                        >
                                            <Typography sx={{ color: 'black', cursor: 'pointer' }}>
                                                {item.body}
                                            </Typography>
                                            <Box
                                                display={'flex'}
                                                justifyContent={'flex-end'}
                                                mt={1}
                                                fontSize={'13px'}
                                                gap={1}
                                            >
                                                <VisibilityIcon fontSize="small" />
                                                {item.view_count}
                                            </Box>
                                        </Box>
                                    </Box>
                                );
                            })}
                        </TabPanel>
                    </TabContext>
                </Grid>
            </Grid>
        </Box>
    );
};
export default LabTabs;
