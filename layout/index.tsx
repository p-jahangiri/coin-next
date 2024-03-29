import { ReactNode } from 'react';
import { Box } from '@mui/material';
import Head from 'next/head';

import { Footer, Header } from '@components/ui/layout';

interface layoutProp {
    children: React.ReactNode;
    footer: boolean | ReactNode;
    header: boolean | ReactNode;
}
export function Layout({ children, footer, header }: layoutProp) {
    return (
        <Box>
            <Head>
                <title>CoinMarket News</title>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <meta name="description" content="Generated by create next app" />
            </Head>
            <Box width={'100%'}>
                {typeof header == 'boolean' ? header && <Header /> : header}
                {children}
                {typeof footer == 'boolean' ? footer && <Footer /> : footer}
            </Box>
        </Box>
    );
}
