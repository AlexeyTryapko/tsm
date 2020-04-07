import * as React from 'react';
import {componentReferences} from '../../configs/components';


const getModalComponent = type => {
    return componentReferences[type];
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
