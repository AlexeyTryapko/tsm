import * as React from 'react';
import { withTranslation } from 'react-i18next';
import { withFormik, Field } from 'formik';
import FormikSelect from '../../FormikSelect';
import { Pane } from 'evergreen-ui';
import * as Yup from 'yup';

const ChartTypeSelect = ({
    errors,
    touched,
    t,
    submitForm,
    setFieldValue,
    validateForm,
}) => {
    const types = [
        {
            value: 'linear',
            label: t('linear'),
        },
        {
            value: 'logarithmic',
            label: t('logarithmic'),
        },
    ];

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
        component: FormikSelect,
    });
    return (
        <Pane paddingLeft={20}>
            <Field
                {...defaultProps('type')}
                label={t('ChartTypeSelect')}
                options={types}
            />
        </Pane>
    );
};

export default withTranslation()(
    withFormik({
        handleSubmit: (values, { props }) => props.updateAction(values),
        validationSchema: Yup.object({
            type: Yup.string().required('Field is required'),
        }),
        mapPropsToValues: ({ type = '' }) => ({
            type,
        }),
        validateOnChange: false,
    })(ChartTypeSelect)
);
