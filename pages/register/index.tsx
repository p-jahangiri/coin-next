import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LanguageIcon from '@mui/icons-material/Language';
import { Box, Button, FormControlLabel, Radio, Typography } from '@mui/material';
import Router from 'next/router';
import * as yup from 'yup';

import ButtonChangeLanguage from '@components/common/change-language';
import Input from '@components/common/input';
import InputPassword from '@components/common/input-password';
import { useTranslation } from '@lib/hooks/useTranslation';
import { useYupValidationResolver } from '@lib/hooks/useYupValidationResolver';
import Link from '@lib/Link';

interface FormProps {
    username?: string;
    password?: string;
    email?: string;
}

export default function Register() {
    const { t } = useTranslation();
    const [select, setSelect] = useState(false);

    const schema = yup.object().shape({
        username: yup.string().required(t('user name is required')),
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
        resolver,
        mode: 'all',
    });

    const onSubmit = (data: FormProps) => {
        console.log(data, 'data');
        Router.push('/');
    };
    return (
        <Box
            height={'100vh'}
            px={{ xs: 2, sm: 20, md: 35, lg: 55, xl: 72 }}
            py={5}
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
                        display: 'flex',
                        justifyContent: 'end',
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
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <AddCircleOutlineIcon color="success" sx={{ fontSize: 50 }} />

                    <Typography mt={2} variant="h6">
                        {t('Sign Up')}
                    </Typography>
                    <Typography mt={1} mb={3} variant="caption">
                        {t('Please fill this form to create an account!')}
                    </Typography>
                </Box>
                <Input
                    sx={{
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
                <Box
                    sx={{
                        display: ' flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2,
                    }}
                >
                    <FormControlLabel
                        onChange={() => setSelect(!select)}
                        control={<Radio />}
                        label={
                            <Typography variant="caption">
                                {t('I accept the terms and conditions')}
                            </Typography>
                        }
                        sx={{
                            '& .MuiSvgIcon-root': {
                                fontSize: 18,
                            },
                        }}
                    />
                </Box>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit((data) => onSubmit(data))}
                    type="submit"
                    disabled={!isValid}
                >
                    {t('Sign Up')}
                </Button>

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
