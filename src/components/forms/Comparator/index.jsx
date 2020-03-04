import * as React from 'react';
import { withFormik, Field } from 'formik';
import FormikInput from '../../FormikInput';
import * as Yup from 'yup';
import { Pane, Button, Heading } from 'evergreen-ui';

const ComparatorForm = props => {
    const {
        submitForm,
        onDeleteNode,
        errors,
        touched,
        openComporatorModal,
    } = props;
    const defaultProps = name => ({
        name,
        invalid: errors[name] && touched[name],
        validationMessage: errors[name],
        component: FormikInput,
    });

    return (
        <Pane padding={20}>
            <Heading size={500} marginBottom={20}>
                Comparator
            </Heading>
            <Field
                {...defaultProps('lowLevel1')}
                label="Low lavel 1"
                required
            />
            <Field
                {...defaultProps('highLevel0')}
                label="Hight level 0"
                required
            />
            <Field {...defaultProps('sequence')} label="Sequence" required />
            <Pane display="flex" justifyContent="space-between">
                <Button height={40} onClick={openComporatorModal}>
                    SHOW OUTPUT
                </Button>
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
                    <Button
                        height={40}
                        appearance="primary"
                        onClick={submitForm}
                    >
                        SAVE
                    </Button>
                </Pane>
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
        lowLevel1: Yup.number().required('Field is required'),
        highLevel0: Yup.number().required('Field is required'),
        sequence: Yup.string().required('Field is required'),
    }),
    mapPropsToValues: ({ lowLevel1 = '', highLevel0 = '', sequence = '' }) => ({
        lowLevel1,
        highLevel0,
        sequence,
    }),
    validateOnChange: false,
    validateOnBlur: false,
})(ComparatorForm);
