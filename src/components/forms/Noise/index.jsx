import * as React from 'react';
import { withFormik, Field } from 'formik';
import FormikInput from '../../FormikInput';
import FormiKSelect from '../../FormikSelect';
import * as Yup from 'yup';
import { Pane, Button, Heading } from 'evergreen-ui';

const NoiseForm = props => {
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
        component: FormiKSelect,
    });

    const types = [
        {
            value: 'whiteNoise',
            label: 'White noise',
        },
        {
            value: 'pinkNoise',
            label: 'Pink noise',
        },
        {
            value: 'blueNoise',
            label: 'Blue noise',
        },
        {
            value: 'grayNoise',
            label: 'Gray noise',
        },
        {
            value: 'impulseNoise',
            label: 'Impulse noise',
        },
        {
            value: 'randomNoise',
            label: 'Random noise',
        },
    ];

    return (
        <Pane padding={20}>
            <Heading size={500} marginBottom={20}>
                Noise
            </Heading>
            <Field
                {...defaultSelectProps('type')}
                label="Noise type"
                options={types}
            />
            <Field {...defaultProps('amplitude')} label="Amplitude" required />
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
        type: Yup.string().required('Field is required'),
        amplitude: Yup.number().required('Field is required'),
    }),
    mapPropsToValues: ({ type = 'whiteNoise', amplitude = '' }) => ({
        type,
        amplitude,
    }),
    validateOnChange: false,
    validateOnBlur: false,
})(NoiseForm);
