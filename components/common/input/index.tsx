import { useController, useForm } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

function Input(
    props: TextFieldProps & {
        control?: any;
        name: string;
    },
): JSX.Element {
    const { control: defaultControl } = useForm();
    const { control, helperText, name, ...otherProps } = props;

    const { field } = useController({
        control: control ? control : defaultControl,
        defaultValue: otherProps.defaultValue,
        name,
    });
    return <TextField error={!!helperText} helperText={helperText} {...field} {...otherProps} />;
}

export default Input;
