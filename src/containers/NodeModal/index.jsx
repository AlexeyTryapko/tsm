import * as React from 'react';
import {nodesConfig} from '../../configs/nodes';


const getModalComponent = type => {
    let ret = undefined;
    nodesConfig.forEach((node)=>{

        if(node.type===type){
            ret = node.component;
        }
    })

    return ret;
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
