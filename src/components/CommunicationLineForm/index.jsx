import * as React from 'react';
import { withFormik, Field } from 'formik';
import FormikInput from '../FormikInput';
import * as Yup from 'yup';
import { Pane, Button, Heading } from 'evergreen-ui';

const CommunicationLineForm = props => {
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
                Communication line
            </Heading>
            <Field
                {...defaultProps('coeffForTheFirstIncomingSignal')}
                label="Coefficient for the first incoming signal"
                required
            />
            <Field
                {...defaultProps('coeffForTheSecondIncomingSignal')}
                label="Coefficient for the second incoming signal"
                required
            />
            <Field
                {...defaultProps('samplesPerPeriodOrAlphabetChar')}
                label="Number of samples per period / per alphabet character"
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
        coeffForTheFirstIncomingSignal: Yup.number().required(
            'Field is required'
        ),
        coeffForTheSecondIncomingSignal: Yup.number().required(
            'Field is required'
        ),
        samplesPerPeriodOrAlphabetChar: Yup.number().required(
            'Field is required'
        ),
    }),
    mapPropsToValues: ({
        coeffForTheFirstIncomingSignal = '',
        coeffForTheSecondIncomingSignal = '',
        samplesPerPeriodOrAlphabetChar = '',
    }) => ({
        coeffForTheFirstIncomingSignal,
        coeffForTheSecondIncomingSignal,
        samplesPerPeriodOrAlphabetChar,
    }),
    validateOnChange: false,
    validateOnBlur: false,
})(CommunicationLineForm);
