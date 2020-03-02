import * as React from 'react';
import { withFormik, Field } from 'formik';
import FormikInput from '../../FormikInput';
import * as Yup from 'yup';
import { Pane, Button, Heading } from 'evergreen-ui';

const NoiseForm = props => {
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
                Noise
            </Heading>
            <Field {...defaultProps('amplitude')} label="Amplitude" required />
            <Field
                {...defaultProps('samplesPerAlphabetCharacter')}
                label="Number of samples per alphabet character"
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
        amplitude: Yup.number().required('Field is required'),
        samplesPerAlphabetCharacter: Yup.number().required('Field is required'),
    }),
    mapPropsToValues: ({
        amplitude = '',
        samplesPerAlphabetCharacter = '',
    }) => ({
        amplitude,
        samplesPerAlphabetCharacter,
    }),
    validateOnChange: false,
    validateOnBlur: false,
})(NoiseForm);
