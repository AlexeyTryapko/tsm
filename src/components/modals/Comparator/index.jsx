import * as React from 'react';
import { Dialog, Pane, Text } from 'evergreen-ui';

const ComparatorModal = ({ isShown, closeModal, sequence }) => (
    <Dialog
        isShown={isShown}
        title="Sequence"
        onCloseComplete={() => closeModal()}
        hasFooter={false}
    >
        <Pane
            padding={20}
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Text size={400}>{sequence}</Text>
        </Pane>
    </Dialog>
);

export default ComparatorModal;
