import { ReactNode } from 'react';
import { Box } from '@mui/material';

import HeaderAdminPanel from '@components/ui/admin/header';

interface layoutProp {
    children?: React.ReactNode;

    header: boolean | ReactNode;
}
export function LayoutAdminPanel({ children, header }: layoutProp) {
    return (
        <Box width={'100%'}>
            {typeof header == 'boolean' ? header && <HeaderAdminPanel /> : header}
            {children}
        </Box>
    );
}
