import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import * as yup from 'yup';

import TextArea from '@components/common/textarea';
import { LayoutAdminPanel } from '@components/ui/admin/layout';
import { useYupValidationResolver } from '@lib/hooks/useYupValidationResolver';

interface FormProps {
    title: string;
    description: string;
    imgNews: File;
}

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
export default function AddNews() {
    const [data, setData] = useState<FormProps>();
    console.log('🚀 ~ file: index.tsx ~ line 21 ~ AddNews ~ data', data);

    const schema = yup.object().shape({
        title: yup
            .string()
            .required('title is required')
            .max(50, 'description must be less than 100 characters'),
        description: yup
            .string()
            .required('description is required')
            .min(100, 'description must be less than 100 characters'),
        imgNews: yup
            .mixed()
            .required('id card is required')
            .test(
                'fileSize',
                'File Size must be less than 3MB',
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
        resolver,
        mode: 'all',
    });

    const onSubmit = (data: FormProps) => {
        console.log(data.imgNews.name);
        setData(data);
    };

    return (
        <LayoutAdminPanel header>
            <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                sx={{
                    '& p': {
                        color: 'red',
                        fontSize: '12px',
                        m: '2px',
                    },
                }}
            >
                <Box width={'40%'} mt={6}>
                    <TextArea control={control} name="title" placeholder="title of the article " />
                    {errors?.title && <p>{errors.title.message}</p>}
                    <TextArea
                        control={control}
                        name="description"
                        placeholder="Description of the article "
                    />
                    {errors?.description && <p>{errors.description.message}</p>}
                    <Box>
                        <label htmlFor="contained-button-file">
                            <input
                                id="contained-button-file"
                                {...register('imgNews')}
                                type="file"
                                hidden
                            />
                            <Button variant="outlined" component="span">
                                Upload article image
                            </Button>
                        </label>
                        {errors?.imgNews && <p>{errors.imgNews.message}</p>}
                    </Box>
                    <Box mt={3} display={'flex'} justifyContent={'center'}>
                        <Button
                            sx={{
                                width: '50%',
                            }}
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit((data) => onSubmit(data))}
                            type="submit"
                            disabled={!isValid}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Box>
        </LayoutAdminPanel>
    );
}
