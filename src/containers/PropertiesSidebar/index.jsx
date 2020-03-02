import * as React from 'react';
import { SideSheet } from 'evergreen-ui';
import SignalSourceForm from '../../components/SignalSourceForm';
import FormNotFound from '../../components/FormNotFound';

const getForm = (type, properties, updateProperties, closeSidebar) => {
    switch (type) {
        case 'SIGNAL SOURCE':
            return (
                <SignalSourceForm
                    updateAction={updateProperties}
                    onConfirmBtnClick={closeSidebar}
                    {...properties}
                />
            );
        default:
            return <FormNotFound />;
    }
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
