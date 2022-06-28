import React from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Fade, useScrollTrigger } from '@mui/material';

export default function ScrollToTop() {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        );

        if (anchor) {
            anchor.scrollIntoView({
                block: 'center',
            });
        }
    };

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                display={{ xs: 'none', md: 'flex' }}
                sx={{
                    right: 20,
                    bottom: 50,
                    width: '50px',
                    height: '50px',
                    position: 'fixed',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    boxShadow: '5px 0 20px 5px rgb(0 0 0 / 0.10)',
                    '&:hover': {
                        border: '1px solid rgb(255, 162, 0)',
                    },
                }}
            >
                <KeyboardArrowUpIcon />
            </Box>
        </Fade>
    );
}
