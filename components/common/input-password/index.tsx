import React from 'react';
import { useController, useForm } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    FormControl,
    FormControlProps,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextFieldProps,
} from '@mui/material';

function InputPassword(
    props: FormControlProps &
        TextFieldProps & {
            control?: any;
            name: string;
            label?: string;
            helperText?: any;
        },
): JSX.Element {
    const { control: defaultControl } = useForm();
    const { control, helperText, label, name, ...otherProps } = props;
    const { field } = useController({
        control: control ? control : defaultControl,
        defaultValue: otherProps.defaultValue,
        name,
    });
    const [showPassword, setShowPassword] = React.useState(false);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" {...otherProps}>
                <InputLabel>{label}</InputLabel>
                <OutlinedInput
                    type={showPassword ? 'text' : 'password'}
                    {...field}
                    error={!!helperText}
                    placeholder={label}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                <FormHelperText error>{helperText}</FormHelperText>
            </FormControl>
        </>
    );
}

export default InputPassword;
