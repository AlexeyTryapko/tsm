import React, { useState } from 'react';
import { withFormik, Field } from 'formik';
import FormikInput from '../../FormikInput';
import * as Yup from 'yup';
import { Pane, Button, Heading } from 'evergreen-ui';
import ComporatorModal from '../../modals/Comparator';
import { withTranslation } from 'react-i18next';

const ComparatorForm = ({
    submitForm,
    onDeleteNode,
    errors,
    touched,
    values,
    t,
}) => {
    const [showModal, toggleModal] = useState(false);
    const defaultProps = name => ({
        name,
        invalid: errors[name] && touched[name],
        validationMessage: errors[name],
        component: FormikInput,
    });

    return (
        <Pane padding={20}>
            <Heading size={500} marginBottom={20}>
                {t('COMPARATOR')}
            </Heading>
            <Field
                {...defaultProps('lowLevel1')}
                label={t('lowLevel1')}
                required
            />
            <Field
                {...defaultProps('highLevel0')}
                label={t('highLevel0')}
                required
            />
            <Pane display="flex" justifyContent="space-between">
                <Button height={40} onClick={() => toggleModal(true)}>
                    {t('showOutput')}
                </Button>
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
                    <Button
                        height={40}
                        appearance="primary"
                        onClick={submitForm}
                    >
                        {t('save')}
                    </Button>
                </Pane>
            </Pane>
            <ComporatorModal
                isShown={showModal}
                closeModal={() => toggleModal(false)}
                sequence={values.sequence}
            />
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
            lowLevel1: Yup.number().required('Field is required'),
            highLevel0: Yup.number().required('Field is required'),
        }),
        mapPropsToValues: ({
            lowLevel1 = '',
            highLevel0 = '',
            sequence = '',
        }) => ({
            lowLevel1,
            highLevel0,
            sequence,
        }),
        validateOnChange: false,
        validateOnBlur: false,
    })(ComparatorForm)
);
