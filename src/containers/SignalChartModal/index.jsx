import * as React from 'react';
import { Dialog } from 'evergreen-ui';

const SignalChart = ({ isShown, closeModal }) => (
    <Dialog
        isShown={isShown}
        onCloseComplete={closeModal}
        hasFooter={false}
        hasHeader={false}
    >
        Modal for signal render
    </Dialog>
);

export default SignalChart;
