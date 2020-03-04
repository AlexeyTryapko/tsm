import * as React from 'react';
import { SideSheet } from 'evergreen-ui';
import {
    SignalSourceForm,
    NoiseForm,
    ReferenceSourceForm,
    CommunicationLineForm,
    ClockGeneratorForm,
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
        case 'CLOCK GENERATOR':
            return ClockGeneratorForm;
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
    openComporatorModal,
    deleteNode
) => {
    const Component = getFormComponent(type);
    return (
        <Component
            updateAction={updateProperties}
            onConfirmBtnClick={closeSidebar}
            openComporatorModal={openComporatorModal}
            onDeleteNode={deleteNode}
            {...properties}
        />
    );
};

const PropertiesSidebar = ({
    isShown,
    type,
    properties,
    closeSidebar,
    updateProperties,
    openComporatorModal,
    deleteNode,
}) => (
    <SideSheet isShown={isShown} onCloseComplete={closeSidebar}>
        {getForm(
            type,
            properties,
            updateProperties,
            closeSidebar,
            openComporatorModal,
            deleteNode
        )}
    </SideSheet>
);

export default PropertiesSidebar;
