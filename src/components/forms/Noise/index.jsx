import * as React from 'react';
import { withFormik, Field } from 'formik';
import FormikInput from '../../FormikInput';
import FormiKSelect from '../../FormikSelect';
import * as Yup from 'yup';
import { Pane, Button, Heading } from 'evergreen-ui';
import { withTranslation } from 'react-i18next';

const NoiseForm = ({ submitForm, onDeleteNode, errors, touched, t }) => {
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
        component: FormiKSelect,
    });

    const types = [
        {
            value: 'whiteNoise',
            label: t('whiteNoise'),
        },
        {
            value: 'pinkNoise',
            label: t('pinkNoise'),
        },
        {
            value: 'blueNoise',
            label: t('blueNoise'),
        },
        {
            value: 'grayNoise',
            label: t('grayNoise'),
        },
        {
            value: 'impulseNoise',
            label: t('impulseNoise'),
        },
        {
            value: 'randomNoise',
            label: t('randomNoise'),
        },
    ];

    return (
        <Pane padding={20}>
            <Heading size={500} marginBottom={20}>
                {t('NOISE')}
            </Heading>
            <Field
                {...defaultSelectProps('noiseType')}
                label={t('noiseType')}
                options={types}
            />
            <Field
                {...defaultProps('amplitude')}
                label={t('amplitude')}
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
            noiseType: Yup.string().required('Field is required'),
            amplitude: Yup.number().required('Field is required'),
        }),
        mapPropsToValues: ({ noiseType = '', amplitude = '' }) => ({
            noiseType,
            amplitude,
        }),
        validateOnChange: false,
        validateOnBlur: false,
    })(NoiseForm)
);
