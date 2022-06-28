import * as React from 'react';
import { Box, BoxProps, IconButton } from '@mui/material';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import router from 'next/router';

function ButtonChangeLanguage(
    props: BoxProps & {
        icon?: React.ReactElement;
        route?: string;
        language?: React.Dispatch<React.SetStateAction<string>> | undefined;
    },
): JSX.Element {
    const { icon, route, language, ...otherProps } = props;
    function changeLang(lang: string, popupState: any) {
        if (language && lang === 'en') {
            language('English');
        } else if (language && lang === 'co') {
            language('한국인');
        }
        router.push(
            route ? `/${route}` : '/',
            {
                slashes: false,
            },
            {
                locale: lang,
            },
        );
        popupState.close();
    }

    return (
        <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
                <Box {...otherProps}>
                    <IconButton
                        size="small"
                        color="success"
                        {...bindTrigger(popupState)}
                        sx={{
                            width: '40px',
                            color: 'whitesmoke',
                            '&:hover': { border: '1px solid rgb(236, 147, 13)' },
                        }}
                    >
                        {icon}
                    </IconButton>
                    <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <Box py={2} width={100} textAlign={'center'}>
                            <Typography
                                sx={{
                                    height: '40px',
                                    fontSize: '20px',
                                    display: 'flex',
                                    cursor: 'pointer',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    '&:hover': {
                                        backgroundColor: 'rgb(236, 147, 13)',
                                    },
                                }}
                                variant="h2"
                                fontSize={14}
                                onClick={() => changeLang('en', popupState)}
                            >
                                English
                            </Typography>
                            <Typography
                                sx={{
                                    height: '40px',
                                    fontSize: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: 'rgb(236, 147, 13)',
                                    },
                                }}
                                variant="h2"
                                fontSize={14}
                                onClick={() => changeLang('co', popupState)}
                            >
                                한국인
                            </Typography>
                        </Box>
                    </Popover>
                </Box>
            )}
        </PopupState>
    );
}

export default ButtonChangeLanguage;
