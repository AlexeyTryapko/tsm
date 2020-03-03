import * as React from 'react';
import { withFormik, Field } from 'formik';
import FormikInput from '../../FormikInput';
import * as Yup from 'yup';
import { Pane, Button, Heading } from 'evergreen-ui';

const GlobalPropertiesForm = props => {
    const { submitForm, errors, touched } = props;
    const defaultProps = name => ({
        name,
        invalid: errors[name] && touched[name],
        validationMessage: errors[name],
        component: FormikInput,
    });

    return (
        <Pane padding={20}>
            <Heading size={500} marginBottom={20}>
                Global properties
            </Heading>
            <Field
                {...defaultProps('quantizationPeriod')}
                label="Quantization period"
                required
            />
            <Field
                {...defaultProps('periodOfSignalUnit')}
                label="Period of signal unit"
                required
            />
            <Field
                {...defaultProps('executionTime')}
                label="Time of execution"
                required
            />
            <Pane display="flex" justifyContent="flex-end">
                <Button height={40} appearance="primary" onClick={submitForm}>
                    SAVE
                </Button>
            </Pane>
        </Pane>
    );
};

export default withFormik({
    handleSubmit: (values, { props }) => {
        props.updateAction(values);
        props.onConfirmBtnClick();
    },
    validationSchema: Yup.object({
        quantizationPeriod: Yup.number().required('Field is required'),
        periodOfSignalUnit: Yup.number().required('Field is required'),
        executionTime: Yup.number().required('Field is required'),
    }),
    mapPropsToValues: ({
        quantizationPeriod = '',
        periodOfSignalUnit = '',
        executionTime = '',
    }) => ({
        quantizationPeriod,
        periodOfSignalUnit,
        executionTime,
    }),
    validateOnChange: false,
    validateOnBlur: false,
})(GlobalPropertiesForm);
