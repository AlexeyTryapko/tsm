import * as React from 'react';
import { withFormik, Field } from 'formik';
import FormikInput from '../../FormikInput';
import FormikSelect from '../../FormikSelect';
import * as Yup from 'yup';
import { Pane, Button, Heading } from 'evergreen-ui';
import { withTranslation } from 'react-i18next';

const SignalSourceForm = ({
    submitForm,
    onDeleteNode,
    errors,
    touched,
    useSamples,
    t,
}) => {
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
            label: t('manchesterСode'),
        },
        {
            value: 'analogSignal',
            label: t('analogSignal'),
        },
    ];

    return (
        <Pane padding={20}>
            <Heading size={500} marginBottom={20}>
                {t('SIGNAL SOURCE')}
            </Heading>
            <Field
                {...defaultSelectProps('signalType')}
                label={t('signalType')}
                options={signalTypes}
            />
            <Field
                {...defaultProps('amplitude')}
                label={t('amplitude')}
                required
            />
            {useSamples ? (
                <Field
                    {...defaultProps('samplesPerPeriod')}
                    label={t('samplesPerPeriod')}
                    required
                />
            ) : (
                <Field
                    {...defaultProps('frequency')}
                    label={t('frequency')}
                    required
                />
            )}
            <Field
                {...defaultProps('sequence')}
                label={t('sequence')}
                required
            />
            <Pane display="flex" justifyContent="flex-end">
                <Button
                    height={40}
                    marginRight={20}
                    appearance="primary"
                    intent="danger"
                    onClick={onDeleteNode}
                >
                    {t('remove')}
                </Button>
                <Button height={40} appearance="primary" onClick={submitForm}>
                    {t('save')}
                </Button>
            </Pane>
        </Pane>
    );
};

export default withTranslation()(
    withFormik({
        handleSubmit: (values, { props }) => {
            props.updateAction(values);
            props.onConfirmBtnClick();
        },
        validationSchema: Yup.object({
            signalType: Yup.string().required('Field is required'),
            amplitude: Yup.number().required('Field is required'),
            frequency: Yup.number().required('Field is required'),
            sequence: Yup.number().required('Field is required'),
            samplesPerPeriod: Yup.number().required('Field is required'),
        }),
        mapPropsToValues: ({
            signalType = '',
            amplitude = '',
            frequency = '',
            sequence = '',
            samplesPerPeriod = '',
        }) => ({
            signalType,
            amplitude,
            frequency,
            sequence,
            samplesPerPeriod,
        }),
        validateOnChange: false,
        validateOnBlur: false,
    })(SignalSourceForm)
);
