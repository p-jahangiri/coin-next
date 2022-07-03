import * as React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import Accordion from '@components/common/accordion';
import MenuLeft from '@components/common/menu-driwer';
import Link from '@lib/Link';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const HeaderAdminPanel = () => {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box
            px={{ xs: 2, md: 5, lg: 10 }}
            width={'100%'}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '100px',
                backgroundColor: '#253137',
            }}
        >
            <MenuLeft
                header={
                    <Box mr={13} display="flex" alignItems="center">
                        <Link href="/">
                            <IconButton edge="end" color="inherit">
                                <HomeIcon />
                            </IconButton>
                        </Link>
                    </Box>
                }
            >
                {settings.map((setting) => (
                    <Accordion key={setting} title={setting}>
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                    </Accordion>
                ))}
            </MenuLeft>
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        </Box>
    );
};
export default HeaderAdminPanel;
