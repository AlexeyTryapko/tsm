import * as React from 'react';
import { withFormik, Field } from 'formik';
import FormikInput from '../FormikInput';
import * as Yup from 'yup';
import { Pane, Button, Heading } from 'evergreen-ui';

const ClockGenearatorForm = props => {
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
                Clock genearator
            </Heading>
            <Field
                {...defaultProps('samplesPerSignal')}
                label="Number of samples per signal"
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
        samplesPerSignal: Yup.number().required('Field is required'),
    }),
    mapPropsToValues: ({ samplesPerSignal = '' }) => ({
        samplesPerSignal,
    }),
    validateOnChange: false,
    validateOnBlur: false,
})(ClockGenearatorForm);
