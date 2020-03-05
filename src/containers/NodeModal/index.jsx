import * as React from 'react';
import {
    ComparatorModal,
    MonitorModal,
    SpectreModal,
} from '../../components/modals';

const getModalComponent = type => {
    switch (type) {
        case 'MONITOR':
            return MonitorModal;
        case 'SPECTRE':
            return SpectreModal;
        case 'COMPORATOR':
            return ComparatorModal;
    }
};

const NodeModal = ({ type, data, closeModal, deleteNode }) => {
    const Component = getModalComponent(type);
    return (
        <Component
            closeModal={closeModal}
            deleteNode={deleteNode}
            data={data}
        />
    );
};

export default NodeModal;
