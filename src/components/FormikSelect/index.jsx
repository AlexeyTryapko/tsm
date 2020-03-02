import * as React from 'react';
import { Pane, SelectField } from 'evergreen-ui';

export const FormikSelect = ({
    label,
    hint,
    required,
    description,
    field,
    placeholder,
    validationMessage,
    invalid,
    options,
}) => {
    return (
        <Pane>
            <SelectField
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
            >
                {options.map(({ label, value }) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </SelectField>
        </Pane>
    );
};

export default FormikSelect;
