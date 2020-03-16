import * as React from 'react';
import { SideSheet } from 'evergreen-ui';
import {
    SignalSourceForm,
    NoiseForm,
    ReferenceSourceForm,
    CommunicationLineForm,
    FormNotFound,
    GlobalPropertiesForm,
    ComparatorForm,
} from '../../components/forms';

const getFormComponent = type => {
    switch (type) {
        case 'SIGNAL SOURCE':
            return SignalSourceForm;
        case 'NOISE':
            return NoiseForm;
        case 'REFERENCE SOURCE':
            return ReferenceSourceForm;
        case 'COMMUNICATION LINE':
            return CommunicationLineForm;
        case 'GLOBAL':
            return GlobalPropertiesForm;
        case 'COMPARATOR':
            return ComparatorForm;
        default:
            return FormNotFound;
    }
};

const getForm = (
    type,
    properties,
    updateProperties,
    closeSidebar,
    deleteNode,
    useSamples
) => {
    const Component = getFormComponent(type);
    return (
        <Component
            updateAction={updateProperties}
            onConfirmBtnClick={closeSidebar}
            onDeleteNode={deleteNode}
            useSamples={useSamples}
            {...properties}
        />
    );
};

const PropertiesSidebar = ({
    type,
    properties,
    closeSidebar,
    updateProperties,
    deleteNode,
    useSamples,
}) => (
    <SideSheet isShown={true} onCloseComplete={closeSidebar}>
        {getForm(
            type,
            properties,
            updateProperties,
            closeSidebar,
            deleteNode,
            useSamples
        )}
    </SideSheet>
);

export default PropertiesSidebar;
