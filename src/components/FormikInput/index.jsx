import * as React from 'react';
import { Pane, TextInputField } from 'evergreen-ui';

export const FormikInput = ({
    label,
    hint,
    required,
    description,
    field,
    placeholder,
    validationMessage,
    invalid,
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
                type="number"
                placeholder={placeholder}
                validationMessage={validationMessage}
                inputHeight={40}
                {...inputProps}
            />
        </Pane>
    );
};

export default FormikInput;
