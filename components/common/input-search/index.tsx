import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';

import { useTranslation } from '@lib/hooks/useTranslation';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    display: 'flex',

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
    // pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 1),
        paddingLeft: `calc(2em + ${theme.spacing(4)})`,
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

interface Props {
    onClick: (value: string) => void;
}
export default function SearchInput({ onClick }: Props) {
    const [value, setValue] = useState<string>('');
    const { t } = useTranslation();

    return (
        <Search>
            <StyledInputBase
                placeholder={t('Search…')}
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => setValue(e.target.value)}
            />
            <SearchIconWrapper onClick={() => onClick(value)}>
                <SearchIcon />
            </SearchIconWrapper>
        </Search>
    );
}
