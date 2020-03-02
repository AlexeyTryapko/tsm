import * as React from 'react';
import { SideSheet } from 'evergreen-ui';
import {
    SignalSourceForm,
    NoiseForm,
    ReferenceSourceForm,
    CommunicationLineForm,
    CorrelatorForm,
    ClockGeneratorForm,
    MonitorForm,
    FormNotFound,
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
        case 'MONITOR':
            return MonitorForm;
        default:
            return FormNotFound;
    }
};

const getForm = (
    type,
    properties,
    updateProperties,
    closeSidebar,
    openSignalChartModal
) => {
    const Component = getFormComponent(type);
    return (
        <Component
            updateAction={updateProperties}
            onConfirmBtnClick={closeSidebar}
            openSignalChartModal={openSignalChartModal}
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
}) => (
    <SideSheet isShown={isShown} onCloseComplete={closeSidebar}>
        {getForm(
            type,
            properties,
            updateProperties,
            closeSidebar,
            openSignalChartModal
        )}
    </SideSheet>
);

export default PropertiesSidebar;
