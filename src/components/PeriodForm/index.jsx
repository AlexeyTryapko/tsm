import * as React from 'react';
import { withTranslation } from 'react-i18next';
import { withFormik, Field } from 'formik';
import FormikInput from '../FormikInput';
import { Pane } from 'evergreen-ui';
import * as Yup from 'yup';

const PeriodForm = ({
    errors,
    touched,
    t,
    submitForm,
    setFieldValue,
    validateForm,
}) => {
    const defaultProps = name => ({
        name,
        invalid: errors[name] && touched[name],
        validationMessage: errors[name],
        inputProps: {
            marginRight: 16,
            onChange: ev => {
                setFieldValue(name, ev.target.value);
                validateForm().then(() => submitForm());
            },
        },
        component: FormikInput,
    });
    return (
        <Pane paddingX={20} display="flex" justifyContent="flex-start">
            <Field {...defaultProps('from')} label={t('from')} />
            <Field {...defaultProps('to')} label={t('to')} />
        </Pane>
    );
};

export default withTranslation()(
    withFormik({
        handleSubmit: (values, { props }) => props.updateAction(values),
        validate: values => {
            const errors = {};
            if (values.to < values.from) {
                errors['to'] = 'Value shoud be greater then from';
                errors['from'] = 'Value should be less then to';
            } else {
                delete errors['to'];
                delete errors['from'];
            }
            return errors;
        },
        validationSchema: Yup.object({
            from: Yup.number()
                .min(0)
                .required('Field is required'),
            to: Yup.number()
                .min(0)
                .required('Field is required'),
        }),
        mapPropsToValues: ({ from = '', to = '' }) => ({
            from,
            to,
        }),
        validateOnChange: false,
    })(PeriodForm)
);
