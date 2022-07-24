import { useController, useForm } from 'react-hook-form';
import { TextareaAutosize, TextareaAutosizeProps } from '@mui/material';

function TextArea(
    props: TextareaAutosizeProps & {
        control?: any;
        name: string;
    },
): JSX.Element {
    const { control: defaultControl } = useForm();
    const { control, name, ...otherProps } = props;

    const { field } = useController({
        control: control ? control : defaultControl,
        defaultValue: otherProps.defaultValue,
        name,
    });
    return (
        <TextareaAutosize
            minRows={2}
            {...field}
            {...otherProps}
            style={{
                width: '100%',
                padding: '10px',
                outline: 'none',
                fontSize: '16px',
            }}
        />
    );
}
export default TextArea;
