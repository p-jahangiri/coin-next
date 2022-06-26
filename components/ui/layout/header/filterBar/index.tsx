import * as React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, styled } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useTranslation } from '@lib/hooks/useTranslation';

interface FilterBarProps {
    title: string;
    data?: { name: string }[];
    length?: number | undefined;
}

export default function BasicMenu({ title, data, length }: FilterBarProps) {
    const { t } = useTranslation();
    const width = length ? `${length * 60}px` : '100px';
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Container pt={1} height="50px" onMouseLeave={handleClose}>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                onMouseOver={handleClick}
                className={open ? 'active' : ''}
                sx={{
                    minWidth: '100px',
                    cursor: 'pointer',
                    color: 'black',
                    fontSize: '1rem',
                    '&:hover': {
                        backgroundColor: '#364c57',
                        color: '#fff',
                    },
                }}
            >
                {t(title)}
                {data &&
                    data.length > 0 &&
                    (open ? (
                        <KeyboardArrowUpIcon fontSize={'small'} />
                    ) : (
                        <KeyboardArrowDownIcon fontSize={'small'} />
                    ))}
            </Button>
            {data && data.length > 0 && (
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    onMouseLeave={handleClose}
                    MenuListProps={{ onMouseLeave: handleClose }}
                >
                    <Box
                        width={width}
                        height={{ lg: '132px' }}
                        sx={{
                            overFlowX: 'scroll',
                            display: 'flex',
                            flexDirection: 'column',
                            flexWrap: 'wrap',
                        }}
                    >
                        {data?.map((item, idx) => {
                            return (
                                <React.Fragment key={idx}>
                                    <MenuItem
                                        sx={{
                                            textAlign: 'center',
                                            height: '44px',
                                            minWidth: '100px',
                                            width: '150px',
                                            '&:hover': {
                                                color: '#fff',
                                                backgroundColor: '#364c57',
                                            },
                                        }}
                                        onClick={handleClose}
                                    >
                                        {item.name}
                                    </MenuItem>
                                </React.Fragment>
                            );
                        })}
                    </Box>
                </Menu>
            )}
        </Container>
    );
}
const Container = styled(Box)`
    .active {
        background-color: #364c57;
        color: #fff;
    }
`;
