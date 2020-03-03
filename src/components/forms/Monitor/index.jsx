import * as React from 'react';
import { withFormik } from 'formik';
import { Pane, Button, Heading } from 'evergreen-ui';

const MonitorForm = props => {
    const { submitForm, onDeleteNode, openSignalChartModal } = props;

    return (
        <Pane padding={20}>
            <Heading size={500} marginBottom={20}>
                Monitor
            </Heading>
            <Pane display="flex" justifyContent="space-between">
                <Button
                    height={40}
                    appearance="minimal"
                    onClick={openSignalChartModal}
                >
                    Show signal chart
                </Button>
                <Pane display="flex">
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
    mapPropsToValues: () => ({}),
    validateOnChange: false,
    validateOnBlur: false,
})(MonitorForm);
