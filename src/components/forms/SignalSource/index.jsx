import * as React from 'react';
import { withFormik, Field } from 'formik';
import FormikInput from '../../FormikInput';
import FormikSelect from '../../FormikSelect';
import * as Yup from 'yup';
import { Pane, Button, Heading } from 'evergreen-ui';

const SignalSourceForm = props => {
    const { submitForm, errors, touched } = props;
    const defaultProps = name => ({
        name,
        invalid: errors[name] && touched[name],
        validationMessage: errors[name],
        component: FormikInput,
    });

    const defaultSelectProps = name => ({
        name,
        invalid: errors[name] && touched[name],
        validationMessage: errors[name],
        component: FormikSelect,
    });

    const signalTypes = [
        {
            value: 'manchesterСode',
            label: 'Manchester сode',
        },
        {
            value: 'analogSignal',
            label: 'Analog signal',
        },
    ];
    return (
        <Pane padding={20}>
            <Heading size={500} marginBottom={20}>
                Signal source
            </Heading>
            <Field
                {...defaultSelectProps('signalType')}
                label="Signal type"
                options={signalTypes}
            />
            <Field
                {...defaultProps('signalAmplitude')}
                label="Signal amplitude"
                required
            />
            <Field
                {...defaultProps('signalFrequency')}
                label="Signal frequency"
                description="For analog signals"
                required
            />
            <Field
                {...defaultProps('periodsPerLogicalSymbol')}
                label="The number of periods per logical symbol of the alphabet"
                description="For analog harmonic signals of type sin x"
                required
            />
            <Field
                {...defaultProps('samplesPerPeriod')}
                label="Number of samples per period"
                description="For analog signals"
                required
            />
            <Field
                {...defaultProps('samplesPerAlphabetCharacter')}
                label="Number of samples per alphabet character"
                description="For discrete signals"
                required
            />
            <Field {...defaultProps('sequece')} label="Sequece" required />
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
        signalType: Yup.string().required('Field is required'),
        signalAmplitude: Yup.number().required('Field is required'),
        signalFrequency: Yup.number().required('Field is required'),
        periodsPerLogicalSymbol: Yup.number().required('Field is required'),
        samplesPerPeriod: Yup.number().required('Field is required'),
        samplesPerAlphabetCharacter: Yup.number().required('Field is required'),
        sequece: Yup.number().required('Field is required'),
    }),
    mapPropsToValues: ({
        signalType = '',
        signalAmplitude = '',
        signalFrequency = '',
        periodsPerLogicalSymbol = '',
        samplesPerPeriod = '',
        samplesPerAlphabetCharacter = '',
        sequece = '',
    }) => ({
        signalType,
        signalAmplitude,
        signalFrequency,
        periodsPerLogicalSymbol,
        samplesPerPeriod,
        samplesPerAlphabetCharacter,
        sequece,
    }),
    validateOnChange: false,
    validateOnBlur: false,
})(SignalSourceForm);
