import * as React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, IconButton } from '@mui/material';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import router from 'next/router';

interface PopoverProps {
    receiveId?: (id: string) => void;
    data?: { title: string; price: string; id: string }[];
    language?: React.Dispatch<React.SetStateAction<string>> | undefined;
}

const PopoverPopupState: React.FC<PopoverProps> = ({ data, receiveId, language }) => {
    function changeLang(lang: string, popupState: any) {
        if (language && lang === 'en') {
            language('English');
        } else if (language && lang === 'co') {
            language('한국인');
        }
        router.push(
            '/',
            {
                slashes: true,
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
                <Box mr={1}>
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
                        <ExpandMoreIcon />
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
                        {data ? (
                            data?.map((item) => {
                                return (
                                    <Box
                                        width={200}
                                        p={2}
                                        display={'flex'}
                                        justifyContent={'space-between'}
                                        key={item.id}
                                        // onClick={() => receiveId(item.id)}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: 'rgb(236, 147, 13)',
                                            },
                                        }}
                                    >
                                        <Typography variant="h2" fontSize={14}>
                                            {item.title}
                                        </Typography>
                                        <Typography variant="h2" fontSize={14}>
                                            {item.price}
                                        </Typography>
                                    </Box>
                                );
                            })
                        ) : (
                            <Box py={2} width={100} textAlign={'center'}>
                                <Typography
                                    sx={{
                                        height: '40px',
                                        fontSize: '20px',
                                        display: 'flex',
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
                        )}
                    </Popover>
                </Box>
            )}
        </PopupState>
    );
};

export default PopoverPopupState;
