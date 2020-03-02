import * as React from 'react';
import { withFormik, Field } from 'formik';
import FormikInput from '../../FormikInput';
import * as Yup from 'yup';
import { Pane, Button, Heading } from 'evergreen-ui';

const MonitorForm = props => {
    const { submitForm, errors, touched, openSignalChartModal } = props;
    const defaultProps = name => ({
        name,
        invalid: errors[name] && touched[name],
        validationMessage: errors[name],
        component: FormikInput,
    });

    return (
        <Pane padding={20}>
            <Heading size={500} marginBottom={20}>
                Monitor
            </Heading>
            <Field
                {...defaultProps('property')}
                label="Some property"
                required
            />
            <Pane display="flex" justifyContent="space-between">
                <Button
                    height={40}
                    appearance="minimal"
                    onClick={openSignalChartModal}
                >
                    Show signal chart
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
        property: Yup.number().required('Field is required'),
    }),
    mapPropsToValues: ({ property = '' }) => ({
        property,
    }),
    validateOnChange: false,
    validateOnBlur: false,
})(MonitorForm);
