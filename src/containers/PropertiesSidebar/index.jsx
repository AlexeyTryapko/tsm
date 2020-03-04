import * as React from 'react';
import { SideSheet } from 'evergreen-ui';
import {
    SignalSourceForm,
    NoiseForm,
    ReferenceSourceForm,
    CommunicationLineForm,
    CorrelatorForm,
    ClockGeneratorForm,
    FormNotFound,
    GlobalPropertiesForm,
    DesicionMakerDeviceForm,
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
        case 'CORRELATOR':
            return CorrelatorForm;
        case 'CLOCK GENERATOR':
            return ClockGeneratorForm;
        case 'GLOBAL':
            return GlobalPropertiesForm;
        case 'DECISION MAKER DEVICE':
            return DesicionMakerDeviceForm;
        default:
            return FormNotFound;
    }
};

const getForm = (
    type,
    properties,
    updateProperties,
    closeSidebar,
    openSignalChartModal,
    deleteNode
) => {
    const Component = getFormComponent(type);
    return (
        <Component
            updateAction={updateProperties}
            onConfirmBtnClick={closeSidebar}
            openSignalChartModal={openSignalChartModal}
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
    openSignalChartModal,
    deleteNode,
}) => (
    <SideSheet isShown={isShown} onCloseComplete={closeSidebar}>
        {getForm(
            type,
            properties,
            updateProperties,
            closeSidebar,
            openSignalChartModal,
            deleteNode
        )}
    </SideSheet>
);

export default PropertiesSidebar;
