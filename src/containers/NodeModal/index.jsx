import * as React from 'react';
import {
    ComparatorModal,
    MonitorModal,
    SpectreModal,
    SignalEnergy,
} from '../../components/modals';

const getModalComponent = type => {
    switch (type) {
        case 'MONITOR':
            return MonitorModal;
        case 'SPECTRE':
            return SpectreModal;
        case 'COMPORATOR':
            return ComparatorModal;
        case 'SIGNAL ENREGY':
            return SignalEnergy;
        default:
            return undefined;
    }
};

const NodeModal = ({ type, data, closeModal, deleteNode, ...props }) => {
    const Component = getModalComponent(type);
    return (
        <Component
            closeModal={closeModal}
            deleteNode={deleteNode}
            data={data}
            {...props}
        />
    );
};

export default NodeModal;
