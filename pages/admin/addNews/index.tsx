import { useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import * as yup from 'yup';

import Select from '@components/common/select';
import TextArea from '@components/common/textarea';
import { LayoutAdminPanel } from '@components/ui/admin/layout';
import { useYupValidationResolver } from '@lib/hooks/useYupValidationResolver';

interface FormProps {
    title: string;
    description: string;
    imgNews: File;
}
const options = ['News', 'Market Update', 'newsLetter', 'interView'];
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
export default function AddNews() {
    const schema = yup.object().shape({
        title: yup
            .string()
            .required('title is required')
            .max(100, 'description must be less than 100 characters'),
        description: yup
            .string()
            .required('description is required')
            .max(100, 'description must be less than 100 characters'),
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
        console.log('🚀 ~ file: index.tsx ~ line 53 ~ onSubmit ~ data', data);
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
                <Box width={'40%'} mt={4}>
                    <Box my={3} textAlign={'center'} width={'50%'}>
                        <Select
                            defaultValue="news"
                            name="newsGroup"
                            control={control}
                            label="news Groups"
                            options={options}
                        />
                    </Box>
                    <TextArea control={control} name="title" placeholder="title of the news " />
                    {errors?.title && <p>{errors.title.message}</p>}
                    <TextArea
                        control={control}
                        name="description"
                        placeholder="Description of the news "
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
                                Upload news image
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
