import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import SignalWifi3BarIcon from '@mui/icons-material/SignalWifi3Bar';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, IconButton, Link, Typography } from '@mui/material';

import { useTranslation } from '@lib/hooks/useTranslation';

export default function Footer() {
    const { t } = useTranslation();
    const data = [
        { title: 'About', href: '' },
        { title: 'Contact', href: '' },
        { title: 'Privacy', href: '' },
        { title: 'Terms', href: '' },
    ];
    const dataFollow = [
        {
            url: 'https://www.google.com/',
            icon: <SignalWifi3BarIcon />,
        },
        {
            url: 'https://t.me/joinchat/AAAAAEZ-X-Z-Z-Z-Z-Z',
            icon: <TelegramIcon />,
        },
        {
            url: 'https://www.facebook.com/',
            icon: <FacebookIcon />,
        },
        {
            url: 'https://www.instagram.com/',
            icon: <InstagramIcon />,
        },
        {
            url: 'https://twitter.com/',
            icon: <TwitterIcon />,
        },
        {
            url: 'https://www.youtube.com/',
            icon: <YouTubeIcon />,
        },
    ];
    return (
        <Box
            py={{ xs: 8 }}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            sx={{ backgroundColor: 'black' }}
            px={{ lg: 20 }}
        >
            <Box pb={2} sx={{ width: '90%', borderBottom: 1, textAlign: 'center' }}>
                <img
                    width={150}
                    src="https://coinmarketnews.shop/themes/default/img/logo.png"
                    alt="img"
                />
            </Box>
            <Box
                mt={3}
                display={{ lg: 'flex' }}
                justifyContent={'space-between'}
                textAlign={'center'}
            >
                <Box mr={{ lg: 15 }} textAlign={'center'}>
                    {dataFollow.map((item, index) => {
                        return (
                            <Link key={index} href={item.url} mx={1}>
                                <IconButton
                                    sx={{
                                        backgroundColor: '#fff',
                                        ':hover': {
                                            backgroundColor: 'rgb(255, 162, 0)',
                                        },
                                    }}
                                >
                                    {item.icon}
                                </IconButton>
                            </Link>
                        );
                    })}
                    <Typography
                        display={{ xs: 'none', lg: 'inherit' }}
                        pt={3}
                        color={'white'}
                        fontSize={18}
                    >
                        Follow us
                    </Typography>
                </Box>
                <Box mt={{ xs: 5, lg: 0 }}>
                    {data.map((item, index) => {
                        return (
                            <Link
                                key={index}
                                onClick={() => alert('It will be launched soon')}
                                px={{ xs: 1, lg: 3 }}
                                sx={{
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                    color: 'whitesmoke',
                                    '&:hover': {
                                        color: 'rgb(255, 162, 0)',
                                    },
                                }}
                            >
                                {t(item.title)}
                            </Link>
                        );
                    })}
                </Box>
            </Box>
            <Box mt={5}>
                <Typography fontSize={12} color={'rgb(153, 148, 142)'}>
                    저작권 © 2020 coin market news. 판권 소유
                </Typography>
            </Box>
        </Box>
    );
}
