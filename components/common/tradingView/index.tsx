import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

export default function MyTradingViewWidget() {
    const widiget = useRef<HTMLDivElement>(null);
    const options = {
        container_id: 'tv-medium-widget',
        symbols: [
            {
                'description': 'Bitcoin',
                'proName': 'BINANCE:BTCUSDT',
            },
            {
                'description': 'Ethereum',
                'proName': 'BINANCE:ETHUSDT',
            },
            {
                'description': 'Ripple',
                'proName': 'BINANCE:XRPUSDT',
            },
            {
                'description': 'Solana',
                'proName': 'BINANCE:SOLUSDT',
            },
            {
                'description': 'CARDANO',
                'proName': 'BINANCE:ADAUSDT',
            },
            {
                'description': 'Dogecoin',
                'proName': 'BINANCE:DOGEUSDT',
            },
            {
                'description': 'Tether',
                'proName': 'COINBASE:USDTUSD',
            },
        ],
        isTransparent: false,
        showSymbolLogo: true,
        'largeChartUrl': 'https://bitsomon.com/',
        locale: 'en',
    };
    const scriptUrlForMobile =
        'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';

    const scriptUrl = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';

    function createScritp(url: string, id: string) {
        const currentScript = document.getElementById(id);
        if (currentScript) {
            return currentScript;
        } else {
            const script = document.createElement('script');
            script.setAttribute('id', id);
            script.src = url;
            script.async = true;
            script.innerHTML = JSON.stringify(options);

            return script;
        }
    }
    // useEffect(() => {
    //     const mobileWidget = createScritp(scriptUrlForMobile, 'mobile') as HTMLScriptElement;
    //     const desktopWidget = createScritp(scriptUrl, 'desktop') as HTMLScriptElement;
    //     widiget.current?.appendChild(desktopWidget);
    // }, []);

    useEffect(() => {
        const mobileWidget = createScritp(scriptUrlForMobile, 'mobile') as HTMLScriptElement;
        const desktopWidget = createScritp(scriptUrl, 'desktop') as HTMLScriptElement;
        // mobileWidget?.remove();
        widiget.current?.appendChild(desktopWidget);
    }, []);

    return (
        <>
            <Box className="relative">
                <Box ref={widiget}></Box>
            </Box>
        </>
    );
}
