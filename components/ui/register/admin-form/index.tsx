import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Typography } from '@mui/material';
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
    cvFile?: File | null;
    idCard: any;
}

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/pdf'];
export default function FormAdmin() {
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

        cvFile: yup
            .mixed()
            .required(t('cv file is required'))
            .test(
                'fileSize',
                t('File Size must be less than 3MB'),
                (value) => value && value[0].size <= 3000000,
            ),
        idCard: yup
            .mixed()
            .required(t('id card is required'))
            .test(
                'fileSize',
                t('File Size must be less than 3MB'),
                (value) => value && value[0].size <= 3000000,
            )
            .test(
                'fileFormat',
                'File format must be jpg, jpeg, png',
                (value) => value && SUPPORTED_FORMATS.includes(value[0].type),
            ),
    });
    const resolver = useYupValidationResolver(schema);

    const {
        control,
        handleSubmit,
        register,
        formState: { errors, isValid },
    } = useForm<FormProps>({
        defaultValues: {
            username: '',
            password: '',
            email: '',
            cvFile: null,
            idCard: null,
        },
        resolver,
        mode: 'all',
    });

    const onSubmit = (data: FormProps) => {
        console.log(data, 'data');
        if (data.cvFile && data.idCard) {
            alert(
                'Dear ' +
                    data.username +
                    ', thank you for your cooperation.' +
                    '\n' +
                    'The result of your request will be notified via email',
            );
            Router.push('/');
        }
    };

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
                    mt: 1,
                }}
                name="password"
                label={t('password')}
                control={control}
                helperText={errors.password?.message}
            />
            <InputPassword
                sx={{
                    width: '100%',
                    my: 1,
                }}
                name="confirm"
                label={t('confirm password')}
                control={control}
                helperText={errors.confirm?.message}
            />

            <Box>
                <label htmlFor="contained-button-file">
                    <input id="contained-button-file" {...register('cvFile')} type="file" hidden />
                    <Button variant="outlined" component="span">
                        {t('Upload your resume')}
                    </Button>
                </label>
            </Box>
            <Typography variant="caption" color="error">
                {errors.cvFile?.message}
            </Typography>
            <Box mt={1} mb={2}>
                <Box>
                    <label htmlFor="contained-button-idCard">
                        <input
                            id="contained-button-idCard"
                            accept={SUPPORTED_FORMATS.join(',')}
                            {...register('idCard')}
                            type="file"
                            hidden
                        />
                        <Button variant="outlined" component="span">
                            {t('Upload your id card')}
                        </Button>
                    </label>
                </Box>
                <Typography variant="caption" color="error">
                    {errors.idCard?.message}
                </Typography>
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
        </>
    );
}
