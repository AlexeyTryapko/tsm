import * as React from 'react';
import { Pane, TextInputField } from 'evergreen-ui';

export const FormikInput = ({
    takeFocus,
    label,
    hint,
    required,
    description,
    type = 'text',
    field,
    placeholder,
    invalid,
    inputRef,
    inputProps,
}) => {
    return (
        <Pane>
            <TextInputField
                {...field}
                label={label}
                required={required}
                hint={hint}
                isInvalid={invalid}
                description={description}
                autoFocus={takeFocus}
                type={type}
                placeholder={placeholder}
                inputHeight={40}
                ref={inputRef}
                {...inputProps}
            />
        </Pane>
    );
};

export default FormikInput;
