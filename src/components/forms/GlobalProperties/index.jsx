import * as React from 'react';
import { withFormik, Field } from 'formik';
import FormikInput from '../../FormikInput';
import FormikCheckbox from '../../FormikCheckbox';
import * as Yup from 'yup';
import { Pane, Button, Heading } from 'evergreen-ui';
import { withTranslation } from 'react-i18next';

const GlobalPropertiesForm = ({
    submitForm,
    errors,
    touched,
    values: { useSamples },
    t,
}) => {
    const defaultProps = name => ({
        name,
        invalid: errors[name] && touched[name],
        validationMessage: errors[name],
        component: FormikInput,
    });

    const defaultCheckboxProps = name => ({
        name,
        invalid: errors[name] && touched[name],
        component: FormikCheckbox,
    });

    return (
        <Pane padding={20}>
            <Heading size={500} marginBottom={20}>
                {t('GLOBAL')}
            </Heading>
            <Field
                {...defaultCheckboxProps('useSamples')}
                label={t('useSamples')}
                required
            />
            <Field
                {...defaultProps('quantizationPeriod')}
                label={t('quantizationPeriod')}
                required
            />
            {useSamples ? (
                <>
                    <Field
                        {...defaultProps('samplesPerUnit')}
                        label={t('samplesPerUnit')}
                        required
                    />
                    <Field
                        {...defaultProps('numberOfSamples')}
                        label={t('numberOfSamples')}
                        required
                    />
                </>
            ) : (
                <>
                    <Field
                        {...defaultProps('periodOfSignalUnit')}
                        label={t('periodOfSignalUnit')}
                        required
                    />
                    <Field
                        {...defaultProps('executionTime')}
                        label={t('executionTime')}
                        required
                    />
                </>
            )}
            <Pane display="flex" justifyContent="flex-end">
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
            quantizationPeriod: Yup.number().required('Field is required'),
            periodOfSignalUnit: Yup.number().required('Field is required'),
            executionTime: Yup.number().required('Field is required'),
            numberOfSamples: Yup.number().required('Field is required'),
            useSamples: Yup.boolean().required('Field is required'),
            samplesPerUnit: Yup.number().required('Field is required'),
        }),
        mapPropsToValues: ({
            quantizationPeriod = '',
            periodOfSignalUnit = '',
            executionTime = '',
            numberOfSamples = '',
            useSamples = false,
            samplesPerUnit = '',
        }) => ({
            quantizationPeriod,
            periodOfSignalUnit,
            executionTime,
            numberOfSamples,
            useSamples,
            samplesPerUnit,
        }),
        validateOnChange: false,
        validateOnBlur: false,
    })(GlobalPropertiesForm)
);
