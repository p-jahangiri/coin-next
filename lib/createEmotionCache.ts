import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

// prepend: true moves MUI styles to the top of the <head> so they're loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
export default function createEmotionCache(isRtl: boolean) {
    return createCache({
        key: 'css' + '-' + isRtl,
        prepend: true,
        stylisPlugins: isRtl ? [prefixer, rtlPlugin] : [],
    });
}
