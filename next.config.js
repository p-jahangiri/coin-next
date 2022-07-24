/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    i18n: {
        locales: ['en', 'co'],
        defaultLocale: 'en',
        localeDetection: false,
    },
    env: {
        API_BASE_URL: 'https://coinmarketnews.shop:8080/api/',
    },
};
