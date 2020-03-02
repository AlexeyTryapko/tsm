import * as React from 'react';
import { withFormik, Field } from 'formik';
import FormikInput from '../../FormikInput';
import * as Yup from 'yup';
import { Pane, Button, Heading } from 'evergreen-ui';

const CorrelatorForm = props => {
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
                Correlator
            </Heading>
            <Field
                {...defaultProps('samplesPerPeriodOrAlphabetChar')}
                label="Number of samples per period / per alphabet character"
                required
            />
            <Field
                {...defaultProps('samplesPerMessage')}
                label="Number of samples per message"
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
        samplesPerPeriodOrAlphabetChar: Yup.number().required(
            'Field is required'
        ),
        samplesPerMessage: Yup.number().required('Field is required'),
    }),
    mapPropsToValues: ({
        samplesPerPeriodOrAlphabetChar = '',
        samplesPerMessage = '',
    }) => ({
        samplesPerPeriodOrAlphabetChar,
        samplesPerMessage,
    }),
    validateOnChange: false,
    validateOnBlur: false,
})(CorrelatorForm);
