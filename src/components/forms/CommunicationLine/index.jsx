import * as React from 'react';
import { withFormik, Field } from 'formik';
import FormikInput from '../../FormikInput';
import * as Yup from 'yup';
import { Pane, Button, Heading } from 'evergreen-ui';

const CommunicationLineForm = props => {
    const { submitForm, onDeleteNode, errors, touched } = props;
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
                {...defaultProps('coeffForIncomingSignal')}
                label="Coefficient for the first incoming signal"
                required
            />
            <Field
                {...defaultProps('coeffForTheNoise')}
                label="Coefficient for the noise"
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
                    REMOVE
                </Button>
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
})(CommunicationLineForm);
