/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import createEmotionCache from '@lib/createEmotionCache';

import '@assets/styles/slider.css';
import '@assets/styles/base.css';

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

const rtlClientSideEmotionCache = createEmotionCache(false);
const clientSideEmotionCache = createEmotionCache(false);
function MyApp(props: MyAppProps) {
    const { locale } = useRouter();
    const [queryClient] = React.useState(() => new QueryClient());

    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    const memoizedEmotionCache = React.useMemo(() => {
        if (locale === 'en') {
            return rtlClientSideEmotionCache;
        }
        if (locale === 'co') {
            return clientSideEmotionCache;
        }
        return emotionCache;
    }, [locale]);
    React.useLayoutEffect(() => {
        document.body.dir = locale === 'en' ? 'ltr' : 'ltr';
    }, [locale]);

    const memoizedTheme = React.useMemo(() => {
        return {
            direction: locale === 'en' ? 'ltr' : 'ltr',
        };
    }, [locale]);

    return (
        <CacheProvider value={memoizedEmotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            {/* <ThemeProvider theme={memoizedTheme}> */}
            <CssBaseline />
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <Component {...pageProps} />
                </Hydrate>
            </QueryClientProvider>
            {/* </ThemeProvider> */}
        </CacheProvider>
    );
}

export default MyApp;
