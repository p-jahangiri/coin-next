import * as React from 'react';
import { useController, useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';

export default function NativeSelectDemo(props: {
    control: any;
    label: string;
    name: string;
    options?: string[];
    defaultValue?: string;
}): JSX.Element {
    const { control: defaultControl } = useForm();
    const { defaultValue, label, name, options, control } = props;
    const { field } = useController({
        control: control ? control : defaultControl,
        defaultValue: defaultValue,
        name,
    });
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    {label}
                </InputLabel>
                <NativeSelect
                    sx={{
                        paddingLeft: '10px',
                    }}
                    defaultValue={options ? options[0] : 'news'}
                    {...field}
                    inputProps={{
                        name: name,
                        id: 'uncontrolled-native',
                    }}
                >
                    {options &&
                        options.map((item, idx) => (
                            <option style={{ marginLeft: '10px' }} key={idx} value={item}>
                                {item}
                            </option>
                        ))}
                </NativeSelect>
            </FormControl>
        </Box>
    );
}
