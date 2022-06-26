import React, { FC } from 'react';
import { Box, Link, Typography } from '@mui/material';
import { dataFilter, dataHeader, dataPop } from 'static/data';

import PopoverPopupState from '@components/common/Popover';
import SearchInput from '@components/common/SearchInput';

import FilterBar from './filterBar';
import MenuLeft from './menu';

const Header: FC = () => {
    const [lang, setLang] = React.useState('English');
    const [id, setId] = React.useState('');
    return (
        <React.Fragment>
            <Box
                px={2}
                display={{ xs: 'flex', md: 'none' }}
                alignItems={'center'}
                justifyContent={'space-between'}
                sx={{ backgroundColor: '#253137' }}
            >
                <MenuLeft>
                    <Box
                        px={2}
                        mt={2}
                        ml={2}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '90%',
                            height: '50px',
                            backgroundColor: '#253137',
                        }}
                    >
                        <PopoverPopupState language={setLang} />
                        <Typography fontSize={20} color={'white'}>
                            {lang}
                        </Typography>
                    </Box>
                </MenuLeft>
                <Box width={130}>
                    <img
                        width={'100%'}
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAU8AAAByCAMAAADkgKMHAAABm1BMVEUlMTf////6zkj4wEX0zUePeDD6zkv///nTjkstSjFqNjvJzM6SmJunXkMlMTUiOXretUdcZWmy2/WqeUV2hDTVxED5//8zOTQzPkP13r5ZUzDXtIysqzp7r9rrt0JBS1BOWFz++OLb+P0wbrP5yVCcgTFJMzlAQjPx8vNMSzC8v8G3kzbdrj/W2Np3f4KSdz/EnDnwtFB1Zi+usrVnXC9XNDmCby/j5eapijQkNVufpagjNmgxVzJpcXWEi453NzyEOT28c0fN7/1cVzz37uFidDVlfjGnU0J2ZzyHWT/K3/GTUUC4qkDOmErboEoqQTLSikuFlDVMQzn14b6XyOje7Peia0Pu283WrHaXlTqMSD7HvT9sRTyIYUCJaT3oqE46azBTZjVXhKeTtdDCp4rYvZ03fLRWN1xhd2xOWnuSg38vWGrSr1JBlca/v8orXqXTt2lwaV9VeIN5eGH83o6FRz6vbEW/sUA9dS+knTn96ra20detknFdbZulgkYfPZOHrbyKv+G4pmrAkkvBmWjSyavZx7vjzpEybJvI0uB9AAALS0lEQVR4nO1cC1sT2RmeyUAiTJAMCIS4JGENJIQkQCKQjSYCi4roqgvipdXqrsu2W7tVt7au7dbt1u62P7vfdy4zZyZnwgTG5cGc93k0c65zzpvvdi5B0xQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFIIg04wXzYIOKJjFeDN53OM50cg2VnUPyvHMcY/qpKK1SsUyXrEsK2NZlXiR5JjWcY/sJKKC3JUrHmnMtMqK0UMgC7QV5KqdqYE5bShD2g0qBWDTl7JMDSRXERocceCro9uxgO/srzSYk4+KrtcOEL9kWS8oCQ0GC+iU5af6Rbx69aK/E863dzBwI5fLpd/Z6QcJSH42SBOXE4nEdfb5V8y4kUiM0iTHZ6QNB1QeYG1o7656rPvc4nWeIFgcdYZzw65JnknxXTs5ygZVWu6SPi+SBd2UFswb3WClrf2ZCIWxRuc/RpPRv/HS6BCrtQSfp6H4lNMowrI/4gmsfLGPtiGAhFDPTkYpZ3a79CVWfwAq5Fji9JjddtZ5N3l7bvCIfMb9NDlt1DtKpAjDmPM2F+bLx8xm/Bsvn9F1e05XOvE5IPI54OJT6H7IxSdlG/A5Jta9fIrfZTh8FvS4ND9vGIH7SBnptrzfwmBvPqyOUbrIdHJ3P30NH4+xWOQzklu251RdWHiALeHzkUZ4WfrdAmK5nc/oO1LyiHVv3N15wwmk7ep9nF9GISMXE/CGN1h8NVw+LT/xrBqLgTvpN+a9WSg+SNwt+LwJn2NM24Dm6Jrm4RNmY8+JNmWPhBexTzefV+0i6Da3xj4HnXZXbD6fCLphv4wVh8ln3Md6anWjP3An8+3m8wy3lK8TiXWHXnuGDp9RMs9D8WknsDXp/ot6/e2sJuETMnJR3i9/2UX6pjD5bOgNeUHJSAXuJN1uPs9EhOlSjm7zh1OaVz5h8r58RqKIIU1iP7GA8HaRd6857ZZmd4i1ISJJKINMY9lOwcdrRz7JSyJH59MMwXzOScynhM9T4oPAZ+4N2lh/Pm0vI/dHS3aTW8RGcn13+SMiqN/zMTECeW3BPYXAZ1Ga3435XGk3n13xuYzGtc+XzxxMPXdd85HPKOo5VVwaUrj5JMEFWB0QTccqCNHAOk+GJp9laX7dmAnch8R8OnxuLSw8tC0V8QtkDiKfgyxKOrw/GiBeb2AsHXX4jOYc707Iz+UizClyPqNLJPwP036aui5dupcMyYrHB2mJqX3CSDlNHREOOc0cBaHBxSeKz2H4dPmjHJrG70X/jl8ibf25o9BcIE9pOztC6xD5lK02wXxOBO1CamrJDGG+GEyip0AFvEndD+HVzeetvqB8XpUmSPePod83rnjpI6YMmmAgXQG8M9YQ+dSz7dnnjVLgLuSmFkUimibB0JrG3AfRODpDN59UgOR8RqPcwZMlI0ncFhJ9PMyN5BJ9ERefKKDGLFWWxzs7O7Ovqb9/z3yutkf0M8Z8ygWxcMJdNC+PVF+LJl9Ymd/kSZFPYtHYFC9K/Dtfb0ZsS+tebwoL/8esHV+u3qbfCrENlyPugJMiXD6LuiSkL3m2O1zS2u/dDJFHqg/IjJeuseQXCeJ9WZh42bGjZApPHBJB1th34MdndL2NT9Z9ND3K23G/v0T4cgLPJfohhKt28koo8Welfft9wsuYy9l7yfaNVLcebj0Ukre2XMmwAd1vzb7H/gMB43kgtNDxyC3hcvZVSbipwEDi+WwBvLzviYe1aRh5Ib3oDqXygQOBXgCN55NgRPVaVlahYup/d5lP9+qyuhg87u8FgH8nqm6hoy+3sq7CZLOBd29eGXUhU1g55ftLRkmJpwigkS3gKya7H9K0rGTSsuKNMrlyU7RK4npywlb+VN3ft/cskETuizIt03t/qVhJIoPCdlw/Vf6JFerlg2+S9gaQwYLjipJWvGaSa0tls9aiRLtPM9JGFWxoPQ0x6bzRxSqqRwD+vXDA7Q/XaUYVFvbVRRDMxepESXIM1+uA+LOpd779sSgqdclIg2ga9Tlck0r26XodGM9b4MRb/lVEn5NCm5nuz9PH4FvOPQMaz4MnX6341EiJ60lw6aUqiZBA29N5nyY9DLY/H8dtppZkiZRsvRLEMG8sclkFba/+GgM8YeDxPF5KxOvdTZFTCwOonGA+52yJBKlVq3gJTHu3LhNnt+dNQAP+0eRqWnbygdquFkYSYPxpW85s3BPQl+PZOenJB2h78POlXoKpe+7K4kqTokmyV2Qxe8ro4vhTmyoU9n0Lv9zTx38O3td77ubIgHip2DH8nHdthlBMHLgNcmHDlvFJbUrXd/0qnhsnVURY1qedxxysm+MB8ImXj/2CJba+9GDmwIXR8Mc2n7vIp+9U7+h6zC293x6GmPZujglFiOeTpv8vOPLuvWSC1MHbIBf+US5DUBuD/7/qyOeIrt9353Sq7Yv2bo4J9H5dQ/f7gUe13Xyitgfp+vm4Pk1OwYChzT1dv0dO5p7CYiz2FasyvIF6unlteKMQu4v19rURLHfl4OOePj0IXxKUbb61XzC8jekfnG5oNnBbhtdN/nOP1346zt75455+bxuefxBHMqUXJmfxVWHYX0tfJR8QHBVqzfbyenuYOWOkA22DgE2bJqeFU1zzZ4liIs7SKswsjMJnbJRK5khbDq00PfgJtckxfid+eI/2dd/uhuaPiBEKjmCEG3Lt63H6GLsmjAQyY0PaRjj2N8m3P8kP5Fb5Hh1BttIo59r2PFJBt0FcfN7bI0x8O05ldXqN1nmKcmteE9j7F0qVK4fz+RP0sFpwpo2EoCBOX+Ld0PwRtDPI9eY2fSe+Hh/fEre1WR5HFp2RoO+8/+M4loeAmn363izqTkDPwvlpwfNMVPERtD3gNojI5652gRO0q4Gg2UJGDZ/AHvvfw+ckrbpPjAg9IkdxPUvqvXPbzxHMx5df0siL7pDmQi55FEYCX9QukD591J92EGSEeD7ZZGccDAXz3/Zecn4mTQL7mcDbICKfk4wgWxf57MncDuQTTKkTMsTor1xoDdbBiG1CBOYG4ZG+8yzrludChjASzN3GLysUgC9y2U3y02KAZWWQPSqMqXl2SSQVfGHUkU8++4B8jop8UtnGdBh8ntWoYY6Ntk/hUCh2uM1QwshookrPiuaJtgfeBpHxCbq3+/s/fFP8Iw/ZHT6H2vgccvGJs95/1vyy+JJeAqGaDmZE/8+BfO4zayHwKY7kJ+4tQwHE8z6XvvEoLoWKbhh/+pkEnTNdbIPI+CS+obGtT/LBUyLQJWz++WPO53TxkZDD+CQx+y+1PVsvMV3cpr6tE5/4zl+gHvAu8CmO5Pm4oDFHB95mMLOykvMglLgh/yJWS+E2faqb82EZn1zNYvwqLCOCBS/I5zk6OSeH88kVnvuN5yy9r0n4/Nrhk8VZrG/Op2skG7ZVDge4nSy7cDND7tb9F49D+g1jArS9i20QKZ8kthaCckbEMMpPwfbj6LjtHDscIFn6PfsG3P8wKIrtC90Q3MFnupggfGoXSDsUxHMsl1QWRtJph+FQyOJGnVnxLpEWQdF3oSCDjyWgN4TbIJ9UKi8l2d+1/sIfn7VeenI4vqlUXHsl31Uqgazes0pLssfijGQkTHWnIBdudLPhbNBDOG+8mOZ/7iJtzKc+0PPhKVyOroXerfPnbcqmSeLQGKyYGllSOGcYM6UP9DbIlB5a8OlBtlUTAvrVonM/bAXs6Id6G2Rqde99bvVBQI/IujKJm/8gtf14kJb+zQCFQyJvqNsgYaJqqPPhMFFX58OhoottEIWDkVfX5EPFeXVNPlTMqB/FhIq60nYFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQWFcPB/eJR0FkMwvHQAAAAASUVORK5CYII="
                        alt="logo"
                    />
                </Box>
                <Box my={1} width={150}>
                    <SearchInput />
                </Box>
            </Box>
            <Box
                px={{ xs: '0', md: '60px', lg: '80px' }}
                pr={{ lg: '110px' }}
                justifyContent={{ xs: 'center', lg: 'space-between' }}
                sx={{
                    width: '100%',
                    height: '120px',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#253137',
                }}
            >
                <Box display={{ xs: 'none', lg: 'flex' }}>
                    <img
                        src="data:image/png;base64,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"
                        alt="logo"
                    />
                </Box>
                <Box
                    display={'flex'}
                    alignItems="center"
                    ml={{ xs: 0, lg: 10 }}
                    sx={{ backgroundColor: '' }}
                >
                    <PopoverPopupState data={dataPop} receiveId={setId} />
                    {dataHeader.map((item, idx) => {
                        return (
                            <Link
                                key={idx}
                                href={item.url}
                                px={{ xs: 1, md: 2 }}
                                sx={{
                                    textDecoration: 'none',
                                    borderLeft: '1px solid rgb(104, 106, 106)',
                                    '&:last-child': {
                                        border: 'none',
                                    },
                                }}
                            >
                                <Typography
                                    fontSize={{
                                        lg: 16,
                                        md: 16,
                                        xs: 12,
                                    }}
                                    color="rgb(255, 162, 0)"
                                >
                                    {item.title}
                                </Typography>
                                <Typography fontSize={{ xs: 12, md: 14, lg: 14 }} color="white">
                                    {item.price}
                                </Typography>
                                {Number(item.change.slice(0, -1)) > 0 ? (
                                    <Typography fontSize={{ xs: 11, md: 12 }} color="greenYellow">
                                        {item.change}
                                    </Typography>
                                ) : (
                                    <Typography color="red" fontSize={{ xs: 11, md: 12 }}>
                                        {item.change}
                                    </Typography>
                                )}
                            </Link>
                        );
                    })}
                </Box>
                <Box display={{ xs: 'none', md: 'flex' }} alignItems={'center'}>
                    <PopoverPopupState language={setLang} />
                    <Typography fontSize={20} color={'white'}>
                        {lang}
                    </Typography>
                </Box>
            </Box>
            <Box
                px={{ lg: '100px' }}
                display={{ xs: 'none', lg: 'flex' }}
                justifyContent="space-between"
                sx={{ backgroundColor: 'rgb(218, 168, 17)' }}
            >
                <Box display={'flex'}>
                    {dataFilter.map((item, idx) => {
                        return (
                            <React.Fragment key={idx}>
                                <FilterBar
                                    title={item.title}
                                    data={item.item}
                                    length={item.item?.length}
                                />
                            </React.Fragment>
                        );
                    })}
                </Box>
                <Box my={1}>
                    <SearchInput />
                </Box>
            </Box>
        </React.Fragment>
    );
};

export default Header;
