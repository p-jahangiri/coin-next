import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LanguageIcon from '@mui/icons-material/Language';
import { Box, Typography } from '@mui/material';

// import Router from 'next/router';
import ButtonChangeLanguage from '@components/common/change-language';
import Input from '@components/common/input';
import BasicModal from '@components/common/modal';
import FormAdmin from '@components/ui/register/admin-form';
import FormUser from '@components/ui/register/user-form';
import { useTranslation } from '@lib/hooks/useTranslation';
import Link from '@lib/Link';

interface FormProps {
    rules?: boolean;
}

const SITE_KEY = '6Let8rwgAAAAADyAL_BQzFa8FEDfINOajPd8VR2Y';

export default function Register() {
    const { control } = useForm();
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [isRecaptcha, setIsRecaptcha] = useState(false);
    console.log('🚀 ~ file: index.tsx ~ line 29 ~ Register ~ isRecaptcha', isRecaptcha);

    if (!isRecaptcha) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <ReCAPTCHA
                    sitekey="6LfKRr0gAAAAADJ5hssNoaSjuD-cDSg4sEi4hd0u"
                    onChange={() => setIsRecaptcha(true)}
                />
            </Box>
        );
    }

    return (
        <Box
            px={{ xs: 2, sm: 20, md: 35, lg: 55, xl: 71 }}
            pt={1}
            pb={3}
            minHeight="100vh"
            sx={{ backgroundColor: '#daf2fd' }}
        >
            <Box
                p={3}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '5px',
                    backgroundColor: '#fff',
                    boxShadow: '5px 0 20px 5px rgb(0 0 0 / 0.10)',
                }}
            >
                <Box
                    sx={{
                        width: 100,
                        display: 'flex',
                        justifyContent: 'start',
                    }}
                >
                    <ButtonChangeLanguage
                        route="register"
                        icon={<LanguageIcon color="success" />}
                        width={'40px'}
                        height={'40px'}
                    />
                </Box>
                <Box
                    mt={-7}
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <AddCircleOutlineIcon color="success" sx={{ fontSize: 50 }} />

                    <Typography mt={1} variant="h6">
                        {t('Sign Up')}
                    </Typography>
                </Box>
                <BasicModal
                    name={t('Click to read the terms of cooperation')}
                    title={t('Cooperation terms')}
                    description={t(
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, printer et al. It is practical, many books in the past sixty-three percent of the present and the future, require a lot of knowledge of the community and professionals',
                    )}
                />
                <Box width={'100%'} mt={1}>
                    <Input
                        sx={{
                            width: '16px',
                        }}
                        size="small"
                        variant="standard"
                        type="checkbox"
                        onChange={() => setOpen(!open)}
                        control={control}
                        name="remember"
                    />
                    <Typography ml={1} variant="caption">
                        {t('Do you want to cooperate with us?')}
                    </Typography>
                </Box>
                {open ? <FormAdmin /> : <FormUser />}

                <Link
                    href="/"
                    sx={{
                        textDecoration: 'none',
                        textAlign: 'center',
                        mt: 3,
                    }}
                >
                    <Typography variant="caption">{t('Back to Home!')}</Typography>
                </Link>
            </Box>
        </Box>
    );
}
