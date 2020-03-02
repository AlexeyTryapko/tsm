import * as React from 'react';
import { SideSheet } from 'evergreen-ui';
import SignalSourceForm from '../../components/SignalSourceForm';
import NoiseForm from '../../components/NoiseForm';
import ReferenceSourceForm from '../../components/ReferenceSourceForm';
import FormNotFound from '../../components/FormNotFound';

const getFormComponent = type => {
    switch (type) {
        case 'SIGNAL SOURCE':
            return SignalSourceForm;
        case 'NOISE':
            return NoiseForm;
        case 'REFERENCE SOURCE':
            return ReferenceSourceForm;
        default:
            return FormNotFound;
    }
};

const getForm = (type, properties, updateProperties, closeSidebar) => {
    const Component = getFormComponent(type);
    return (
        <Component
            updateAction={updateProperties}
            onConfirmBtnClick={closeSidebar}
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
}) => (
    <SideSheet isShown={isShown} onCloseComplete={closeSidebar}>
        {getForm(type, properties, updateProperties, closeSidebar)}
    </SideSheet>
);

export default PropertiesSidebar;
