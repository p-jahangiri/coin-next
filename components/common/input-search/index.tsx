import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';

import { useTranslation } from '@lib/hooks/useTranslation';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(2em + ${theme.spacing(2)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('xl')]: {
            width: '10ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function SearchInput() {
    const { t } = useTranslation();
    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder={t('Search…')} inputProps={{ 'aria-label': 'search' }} />
        </Search>
    );
}
{
    /* <Button
                    onClick={() => setShow(!show)}
                    sx={{
                        width: '50px',
                        height: '40px',
                        marginTop: '10px',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#364c57',
                        },
                    }}
                >
                    <SearchIcon /> */
}
{
    /* </Button> */
}
{
    /* {show && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '300px',
                            height: '55px',
                            position: 'absolute',
                            right: '7%',
                            top: '170px',
                            backgroundColor: '#253137',
                        }}
                    >
                        <TextField
                            color="warning"
                            focused
                            sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                            size="small"
                            id="demo-helper-text-aligned"
                        />
                        <Button sx={{ backgroundColor: 'rgb(218, 168, 17)', color: 'white' }}>
                            search
                        </Button>
                    </Box>
                )} */
}
