import * as React from 'react';
import { withFormik, Field } from 'formik';
import FormikInput from '../../FormikInput';
import * as Yup from 'yup';
import { Pane, Button, Heading } from 'evergreen-ui';
import { withTranslation } from 'react-i18next';

const CommunicationLineForm = ({
    submitForm,
    onDeleteNode,
    errors,
    touched,
    t,
}) => {
    const defaultProps = name => ({
        name,
        invalid: errors[name] && touched[name],
        validationMessage: errors[name],
        component: FormikInput,
    });

    return (
        <Pane padding={20}>
            <Heading size={500} marginBottom={20}>
                {t('COMMUNICATION LINE')}
            </Heading>
            <Field
                {...defaultProps('coeffForIncomingSignal')}
                label={t('coeffForIncomingSignal')}
                required
            />
            <Field
                {...defaultProps('coeffForTheNoise')}
                label={t('coeffForTheNoise')}
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
            coeffForIncomingSignal: Yup.number().required('Field is required'),
            coeffForTheNoise: Yup.number().required('Field is required'),
        }),
        mapPropsToValues: ({
            coeffForIncomingSignal = '',
            coeffForTheNoise = '',
        }) => ({
            coeffForIncomingSignal,
            coeffForTheNoise,
        }),
        validateOnChange: false,
        validateOnBlur: false,
    })(CommunicationLineForm)
);
