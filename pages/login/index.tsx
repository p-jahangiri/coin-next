import { useForm } from 'react-hook-form';
import LanguageIcon from '@mui/icons-material/Language';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import Router from 'next/router';
import * as yup from 'yup';

import Img from '@assets/images/pngwing.com.png';
import ButtonChangeLanguage from '@components/common/change-language';
import Input from '@components/common/input';
import InputPassword from '@components/common/input-password';
import { useTranslation } from '@lib/hooks/useTranslation';
import { useYupValidationResolver } from '@lib/hooks/useYupValidationResolver';
import Link from '@lib/Link';

interface FormProps {
    password?: string;
    email?: string;
    remember?: boolean;
}

export default function Login() {
    const { t } = useTranslation();

    const schema = yup.object().shape({
        password: yup
            .string()
            .required(t('password is required'))
            .min(8, t('Your password must be longer than 8 characters.')),
        email: yup
            .string()
            .email(t('email must be a valid email'))
            .required(t('email is required')),
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
            remember: false,
        },
        resolver,
        mode: 'all',
    });

    const onSubmit = (data: FormProps) => {
        console.log(data, 'data');
        Router.push('/admin');
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
                        route="login"
                        icon={<LanguageIcon color="success" />}
                        width={'40px'}
                        height={'40px'}
                    />
                </Box>

                <Box mt={-2} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <Image width={80} height={80} src={Img} alt="logo" />
                </Box>

                <Box my={3}>
                    <Typography mb={1.5} variant="body1">
                        {t('Welcome to Coin Market News')}
                    </Typography>
                    <Typography variant="caption">
                        {t('Please sign-in to your account and start the adventure')}
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
                    label={t('password')}
                    control={control}
                    helperText={errors.password?.message}
                />
                <Box
                    sx={{
                        width: '100%',
                        display: ' flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2,
                    }}
                >
                    <Box mt={1}>
                        <Input
                            sx={{
                                width: '16px',
                            }}
                            type="checkbox"
                            control={control}
                            name="remember"
                            size="small"
                            variant="standard"
                        />
                        <Typography ml={1} variant="caption">
                            {t('Remember Me')}
                        </Typography>
                    </Box>
                    <Link
                        href="/forgot-password"
                        sx={{
                            textDecoration: 'none',
                        }}
                    >
                        <Typography variant="caption">{t('Forgot Password?')}</Typography>
                    </Link>
                </Box>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit((data) => onSubmit(data))}
                    type="submit"
                    disabled={!isValid}
                >
                    {t('Login')}
                </Button>

                <Box mt={2} textAlign={'center'}>
                    <Typography variant="caption">
                        {t("Don't have an account?")}
                        <Link
                            href="/register"
                            sx={{
                                textDecoration: 'none',
                            }}
                        >
                            <Typography variant="caption">{t('Sign Up')}</Typography>
                        </Link>
                    </Typography>
                </Box>

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
