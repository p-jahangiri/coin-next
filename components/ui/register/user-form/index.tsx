import React from 'react';
import { useForm } from 'react-hook-form';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, Button, IconButton, Typography } from '@mui/material';
import Router from 'next/router';
import * as yup from 'yup';

import Input from '@components/common/input';
import InputPassword from '@components/common/input-password';
import { useTranslation } from '@lib/hooks/useTranslation';
import { useYupValidationResolver } from '@lib/hooks/useYupValidationResolver';
import Link from '@lib/Link';

interface FormProps {
    username?: string;
    password?: string;
    email?: string;
    confirm?: string;
    rules?: boolean;
}

export default function FormUser() {
    const { t } = useTranslation();

    const schema = yup.object().shape({
        username: yup.string().required(t('user name is required')),

        email: yup
            .string()
            .email(t('email must be a valid email'))
            .required(t('email is required')),
        password: yup
            .string()
            .required(t('password is required'))
            .min(8, t('Your password must be longer than 8 characters.')),
        confirm: yup
            .string()
            .required(t('password is required'))
            .oneOf([yup.ref('password'), null], t("Passwords don't match")),
    });
    const resolver = useYupValidationResolver(schema);

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormProps>({
        defaultValues: {
            username: '',
            password: '',
            email: '',
            rules: false,
        },
        resolver,
        mode: 'all',
    });

    const onSubmit = (data: FormProps) => {
        console.log(data, 'data');
        Router.push('/');
    };
    const data = [
        { name: 'Google', icon: <GoogleIcon /> },
        { name: 'Facebook', icon: <FacebookIcon /> },
        { name: 'Twitter', icon: <TwitterIcon /> },
    ];
    return (
        <>
            <Input
                sx={{
                    mt: 2,
                    width: '100%',
                }}
                control={control}
                name="username"
                label={t('user name')}
                placeholder={t('user name')}
                helperText={errors.username?.message}
            />
            <Input
                sx={{
                    width: '100%',
                    mt: 2,
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
            <InputPassword
                sx={{
                    width: '100%',
                    my: 2,
                }}
                name="confirm"
                label={t('confirm password')}
                control={control}
                helperText={errors.confirm?.message}
            />

            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit((data) => onSubmit(data))}
                type="submit"
                disabled={!isValid}
            >
                {t('Sign Up')}
            </Button>
            <Box
                sx={{
                    mt: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderTop: '1px solid blue',
                }}
            >
                <Typography
                    sx={{
                        width: '30px',
                        textAlign: 'center',
                        mt: -1.5,
                        backgroundColor: '#fff',
                    }}
                    variant="body1"
                >
                    or
                </Typography>
                <Box>
                    {data.map((item, idx) => {
                        return (
                            <React.Fragment key={idx}>
                                <IconButton
                                    sx={{
                                        backgroundColor: '#fff',
                                        ':hover': {
                                            backgroundColor: 'rgb(255, 162, 0)',
                                        },
                                    }}
                                >
                                    {item.icon}
                                </IconButton>
                            </React.Fragment>
                        );
                    })}
                </Box>
            </Box>

            <Box mt={2} textAlign={'center'}>
                <Typography variant="caption">
                    {t('Do you have an account?')}
                    <Link
                        href="/login"
                        sx={{
                            textDecoration: 'none',
                        }}
                    >
                        <Typography variant="caption">{t('Login')}</Typography>
                    </Link>
                </Typography>
            </Box>
        </>
    );
}
