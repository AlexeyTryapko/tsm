import * as React from 'react';
import { withFormik, Field } from 'formik';
import FormikInput from '../../FormikInput';
import FormikSelect from '../../FormikSelect';
import * as Yup from 'yup';
import { Pane, Button, Heading } from 'evergreen-ui';

const ReferenceSourceForm = props => {
    const { submitForm, onDeleteNode, errors, touched } = props;
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
                Reference source
            </Heading>
            <Field
                {...defaultSelectProps('signalType')}
                label="Signal type"
                options={signalTypes}
            />
            <Field {...defaultProps('amplitude')} label="Amplitude" required />
            <Field
                {...defaultProps('frequency')}
                label="Frequency"
                description="For analog signals"
                required
            />
            <Field
                {...defaultProps('outOfSync')}
                label="Out of sync"
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
        signalType: Yup.string().required('Field is required'),
        amplitude: Yup.number().required('Field is required'),
        frequency: Yup.number().required('Field is required'),
        outOfSync: Yup.number().required('Field is required'),
    }),
    mapPropsToValues: ({
        signalType = 'manchesterСode',
        amplitude = '',
        frequency = '',
        outOfSync = '',
    }) => ({
        signalType,
        amplitude,
        frequency,
        outOfSync,
    }),
    validateOnChange: false,
    validateOnBlur: false,
})(ReferenceSourceForm);
