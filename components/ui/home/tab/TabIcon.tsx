import * as React from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { dataTab1, dataTab2 } from 'static/data';

import { useTranslation } from '@lib/hooks/useTranslation';

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box
                    width={300}
                    height={250}
                    sx={{
                        textAlign: 'center',
                        'img': {
                            borderRadius: '5px',
                        },
                    }}
                >
                    <Box>{children}</Box>
                </Box>
            )}
        </div>
    );
}

const icons = [{ icon: <ChevronLeftIcon /> }, { icon: <ChevronRightIcon /> }];
export default function TabIcon() {
    const { t } = useTranslation();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box
            my={2}
            sx={{
                height: '400px',
                display: { xs: 'none', lg: 'flex' },
                flexDirection: 'column',
                borderTop: '2px solid #fabf2c',
                boxShadow: '5px 0 20px 5px rgb(0 0 0 / 0.10)',
            }}
        >
            <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                mx={3}
                my={1}
            >
                <Box>
                    <Typography color={'black'}>{t('MARKETS NEWS')}</Typography>
                </Box>
                <Tabs value={value} onChange={handleChange}>
                    {icons.map((item, idx) => (
                        <Tab
                            key={idx}
                            icon={item.icon}
                            sx={{
                                marginLeft: '10px',
                                minWidth: 2,
                                borderRadius: '5px',
                                border: '1px solid rgb(135, 135, 138)',
                                outline: 'none',
                                boxShadow: '5px 0 20px 5px rgb(0 0 0 / 0.10)',
                            }}
                        />
                    ))}
                </Tabs>
            </Box>
            <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
                px={2}
                mt={2}
            >
                {dataTab1.map((item, idx) => {
                    return (
                        <React.Fragment key={idx}>
                            <TabPanel value={value} index={0} dir={theme.direction}>
                                <img width={'100%'} src={item.url} alt="img" />
                                <Typography fontSize={15} color={'black'}>
                                    {t(item.title)}
                                </Typography>
                            </TabPanel>
                        </React.Fragment>
                    );
                })}
                {dataTab2.map((item, idx) => {
                    return (
                        <React.Fragment key={idx}>
                            <TabPanel value={value} index={1} dir={theme.direction}>
                                <img width={'100%'} src={item.url} alt="img" />
                                <Typography fontSize={15} color={'black'}>
                                    {t(item.title)}
                                </Typography>
                            </TabPanel>
                        </React.Fragment>
                    );
                })}
            </Box>
        </Box>
    );
}
