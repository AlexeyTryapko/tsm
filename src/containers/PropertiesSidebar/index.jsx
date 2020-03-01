import * as React from 'react';
import { SideSheet } from 'evergreen-ui';
import SignalSourceForm from '../../components/SignalSourceForm';
import FormNotFound from '../../components/FormNotFound';

const getForm = type => {
    switch (type) {
        case 'SIGNAL SOURCE':
            return <SignalSourceForm />;
        default:
            return <FormNotFound />;
    }
};

const PropertiesSidebar = ({ isShown, closeSidebar, id, type }) => (
    <SideSheet isShown={isShown} onCloseComplete={closeSidebar}>
        {getForm(type)}
    </SideSheet>
);

export default PropertiesSidebar;
