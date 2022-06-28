import * as React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, IconButton, Popover } from '@mui/material';
import Typography from '@mui/material/Typography';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';

interface Props {
    receiveId?: (id: string) => void;
    data?: { title: string; price: string; id: string }[];
}

const PopoverState: React.FC<Props> = ({ data, receiveId }) => {
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
                        {data?.map((item) => {
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
                        })}
                    </Popover>
                </Box>
            )}
        </PopupState>
    );
};

export default PopoverState;
