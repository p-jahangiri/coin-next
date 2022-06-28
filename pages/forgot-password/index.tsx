import { useForm } from 'react-hook-form';
import LanguageIcon from '@mui/icons-material/Language';
import { Box, Button, Typography } from '@mui/material';
import Router from 'next/router';
import * as Yup from 'yup';

import ButtonChangeLanguage from '@components/common/change-language';
import Input from '@components/common/input';
import InputPassword from '@components/common/input-password';
import { useTranslation } from '@lib/hooks/useTranslation';
import { useYupValidationResolver } from '@lib/hooks/useYupValidationResolver';
import Link from '@lib/Link';

interface FormProps {
    password?: string;
    email?: string;
    confirm?: string;
}

export default function Login() {
    const { t } = useTranslation();

    const schema = Yup.object().shape({
        email: Yup.string()
            .required(t('email is required'))
            .email(t('email must be a valid email')),
        password: Yup.string()
            .required(t('password is required'))
            .min(8, t('Your password must be longer than 8 characters.')),
        confirm: Yup.string()
            .required(t('password is required'))
            .oneOf([Yup.ref('password'), null], t("Passwords don't match")),
    });
    const resolver = useYupValidationResolver(schema);

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormProps>({
        defaultValues: {
            email: '',
            password: '',
            confirm: '',
        },
        resolver,
        mode: 'all',
    });

    const onSubmit = (data: FormProps) => {
        console.log(data, 'data');
        Router.push('/login');
    };
    return (
        <Box
            height={'100vh'}
            px={{ xs: 2, sm: 20, md: 35, lg: 55, xl: 72 }}
            py={5}
            sx={{ background: '#F4FCD9' }}
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
                        display: 'flex',
                        justifyContent: 'end',
                    }}
                >
                    <ButtonChangeLanguage
                        route="forgot-password"
                        icon={<LanguageIcon color="success" />}
                        width={'40px'}
                        height={'40px'}
                    />
                </Box>

                <Box my={3} textAlign={'center'}>
                    <Typography mb={1.5} variant="body1">
                        {t('Reset Your Password')}
                    </Typography>
                </Box>
                <Input
                    sx={{
                        width: '100%',
                    }}
                    control={control}
                    name="email"
                    label={t('email')}
                    placeholder={t('email')}
                    helperText={errors.email?.message}
                />
                <InputPassword
                    sx={{
                        width: '100%',
                        mt: 2,
                    }}
                    name="password"
                    label={t('new password')}
                    control={control}
                    helperText={errors.password?.message}
                />

                <InputPassword
                    sx={{
                        width: '100%',
                        mt: 2,
                    }}
                    name="confirm"
                    label={t('confirm password')}
                    control={control}
                    helperText={errors.confirm?.message}
                />

                <Box mt={3} textAlign={'center'}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit((data) => onSubmit(data))}
                        type="submit"
                        disabled={!isValid}
                        sx={{ width: '50%' }}
                    >
                        {t('Submit')}
                    </Button>
                </Box>

                <Link
                    href="/login"
                    sx={{
                        textDecoration: 'none',
                        textAlign: 'center',
                        mt: 3,
                    }}
                >
                    <Typography variant="caption">{t('Back to Login!')}</Typography>
                </Link>
            </Box>
        </Box>
    );
}
