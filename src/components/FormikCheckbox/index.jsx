import * as React from 'react';
import { Pane, Checkbox } from 'evergreen-ui';

export const FormikCheckbox = ({ label, field, invalid }) => {
    return (
        <Pane>
            <Checkbox
                {...field}
                value=""
                checked={field.value}
                label={label}
                isInvalid={invalid}
            />
        </Pane>
    );
};

export default FormikCheckbox;
