import * as React from 'react';
import NodeModal from '../NodeModal';
import PropertiesSidebar from '../PropertiesSidebar';

const NODES_WITH_MODAL = [
    'MONITOR',
    'SPECTRE',
    'SIGNAL ENREGY',
    'POWER_SPECTRAL_DENSITY_OF_SIGNAL',
];
const NODES_WITH_SIDEBAR = [
    'SIGNAL SOURCE',
    'NOISE',
    'REFERENCE SOURCE',
    'COMMUNICATION LINE',
    'GLOBAL',
    'COMPARATOR',
];

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
        {NODES_WITH_MODAL.includes(type) && (
            <NodeModal
                type={type}
                data={data}
                executionTime={properties.executionTime}
                closeModal={closeInfo}
                deleteNode={deleteNode}
            />
        )}{' '}
        {NODES_WITH_SIDEBAR.includes(type) && (
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
