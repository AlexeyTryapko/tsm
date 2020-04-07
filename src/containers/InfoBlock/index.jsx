import * as React from 'react';
import NodeModal from '../NodeModal';
import PropertiesSidebar from '../PropertiesSidebar';


const InfoBlock = ({
    type,
    data,
    closeInfo,
    updateProperties,
    deleteNode,
    properties,
    useSamples,
}) => (
    <>
        {properties.modal && (
            <NodeModal
                type={type}
                data={data}
                executionTime={properties.executionTime}
                closeModal={closeInfo}
                deleteNode={deleteNode}
            />
        )}{' '}
        {(type==="GLOBAL"||properties.form) && (
            <PropertiesSidebar
                type={type}
                closeSidebar={closeInfo}
                properties={properties}
                deleteNode={deleteNode}
                updateProperties={updateProperties}
                useSamples={useSamples}
            />
        )}
    </>
);

export default InfoBlock;
