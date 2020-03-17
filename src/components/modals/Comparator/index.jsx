import * as React from 'react';
import { Dialog, Pane, Text } from 'evergreen-ui';
import { withTranslation } from 'react-i18next';

const ComparatorModal = ({ isShown, closeModal, sequence, t }) => (
    <Dialog
        isShown={isShown}
        title={t('sequence')}
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

export default withTranslation()(ComparatorModal);
